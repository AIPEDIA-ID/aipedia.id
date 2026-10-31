import type { APIRoute } from 'astro';
import { db, schema } from '../../../db';
import { validateSession, createSession, createMockSession, SESSION_COOKIE_NAME } from '../../lib/auth';
import { getCatalog } from '../../lib/data';
import { assistants } from '../../data/assistants';
import { eq } from 'drizzle-orm';

export const prerender = false;

interface CheckoutItem {
  slug: string;
  title: string;
  price: number;
  includes: string[];
}

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const body = await request.json().catch(() => null);
    if (!body || !body.productSlug) {
      return new Response(JSON.stringify({ error: 'Missing productSlug in request body' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const rawSlug = String(body.productSlug).trim();

    // 1. Resolve Target Item (Catalog Product, Bundle, or AI Specialist)
    const { products, bundles } = await getCatalog();
    const allCatalogItems = [...(products || []), ...(bundles || [])];

    let targetItem: CheckoutItem | null = null;

    // Check catalog products / bundles
    const catalogMatch = allCatalogItems.find(
      (item) => item.slug === rawSlug || (rawSlug === 'pro' && item.slug === 'bundle-all-access')
    );

    if (catalogMatch) {
      targetItem = {
        slug: catalogMatch.slug,
        title: catalogMatch.title,
        price: catalogMatch.price,
        includes: catalogMatch.includes || [catalogMatch.slug],
      };
    } else {
      // Check AI Specialists
      const cleanSpecialistId = rawSlug.replace(/^spesialis-/, '');
      const assistant = assistants.find((a) => a.id === cleanSpecialistId || a.id === rawSlug);

      if (assistant) {
        // Parse price like "86k" -> 86000
        const priceNum = parseInt(assistant.price.replace(/[^\d]/g, ''), 10) * 1000 || 86000;
        targetItem = {
          slug: assistant.id,
          title: `Spesialis AI: ${assistant.name} (${assistant.role})`,
          price: priceNum,
          includes: [`custom-ai/${assistant.id}`, `skills/${assistant.id}`, assistant.id],
        };
      }
    }

    if (!targetItem) {
      return new Response(JSON.stringify({ error: `Product not found: ${rawSlug}` }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 2. Resolve or Provision User
    const auth = await validateSession(cookies);
    let user = auth.user;
    const customerEmail = (user?.email || body.email || 'customer@aipedia.id').trim();
    const customerName = (user?.name || body.name || customerEmail.split('@')[0] || 'Pelanggan AIPEDIA').trim();

    if (!user && db && customerEmail) {
      try {
        const existingUsers = await db
          .select()
          .from(schema.users)
          .where(eq(schema.users.email, customerEmail))
          .limit(1);

        if (existingUsers.length > 0) {
          user = existingUsers[0];
        } else {
          const newUserId = `u_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
          const inserted = await db
            .insert(schema.users)
            .values({
              id: newUserId,
              email: customerEmail,
              name: customerName,
              image: null,
            })
            .returning();
          if (inserted.length > 0) user = inserted[0];
        }

        // Attach session cookie for user so they remain authenticated
        if (user) {
          await createSession(user.id, cookies);
        }
      } catch (dbErr) {
        console.warn('[Checkout] Guest user DB provisioning skipped:', dbErr);
      }
    }

    const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const serverKey = process.env.MIDTRANS_SERVER_KEY;

    // 3. Demo / Sandbox Fallback Mode (No Server Key Configured)
    if (!serverKey) {
      // If DB is connected, record order and grant entitlements immediately for demo
      if (db && user) {
        try {
          await db.insert(schema.orders).values({
            id: orderId,
            userId: user.id,
            customerEmail,
            customerName,
            productSlug: targetItem.slug,
            amount: targetItem.price,
            status: 'paid',
            snapToken: 'mock_snap_token',
          });

          // Insert entitlements
          const grantsToInsert = [targetItem.slug, ...(targetItem.includes || [])];
          for (const grant of grantsToInsert) {
            await db
              .insert(schema.entitlements)
              .values({
                userId: user.id,
                grant,
              })
              .onConflictDoNothing?.()
              .catch(() => {});
          }
        } catch (dbErr) {
          console.warn('[Checkout Demo] DB recording skipped:', dbErr);
        }
      } else if (!cookies.get(SESSION_COOKIE_NAME)?.value) {
        // Ensure guest gets at least a demo session
        createMockSession(cookies);
      }

      const redirectTarget = `/payment/success?status=paid&order=${orderId}&slug=${encodeURIComponent(targetItem.slug)}`;

      return new Response(
        JSON.stringify({
          success: true,
          demoMode: true,
          orderId,
          productTitle: targetItem.title,
          amount: targetItem.price,
          redirectUrl: redirectTarget,
          mockRedirect: redirectTarget,
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 4. Production / Live Midtrans Snap Integration
    const isProduction = process.env.MIDTRANS_IS_PRODUCTION === 'true';
    const snapApiUrl = isProduction
      ? 'https://app.midtrans.com/snap/v1/transactions'
      : 'https://app.sandbox.midtrans.com/snap/v1/transactions';

    const authHeader = 'Basic ' + Buffer.from(serverKey + ':').toString('base64');
    const midtransPayload = {
      transaction_details: {
        order_id: orderId,
        gross_amount: targetItem.price,
      },
      item_details: [
        {
          id: targetItem.slug.slice(0, 50),
          price: targetItem.price,
          quantity: 1,
          name: targetItem.title.substring(0, 50),
        },
      ],
      customer_details: {
        first_name: customerName,
        email: customerEmail,
      },
    };

    const midtransRes = await fetch(snapApiUrl, {
      method: 'POST',
      headers: {
        Authorization: authHeader,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(midtransPayload),
    });

    if (!midtransRes.ok) {
      const errBody = await midtransRes.text();
      console.error('[Midtrans Snap] API Error:', errBody);
      return new Response(JSON.stringify({ error: 'Failed to create payment transaction with Midtrans' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const snapData = await midtransRes.json();

    // Record pending order in database
    if (db) {
      try {
        await db.insert(schema.orders).values({
          id: orderId,
          userId: user?.id || null,
          customerEmail,
          customerName,
          productSlug: targetItem.slug,
          amount: targetItem.price,
          status: 'pending',
          snapToken: snapData.token,
        });
      } catch (dbErr) {
        console.error('[Checkout] Failed to record order in DB:', dbErr);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        orderId,
        token: snapData.token,
        redirectUrl: snapData.redirect_url,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    console.error('[Checkout API] Error:', err);
    return new Response(JSON.stringify({ error: 'Internal checkout error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
