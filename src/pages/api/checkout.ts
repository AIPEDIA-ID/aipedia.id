import type { APIRoute } from 'astro';
import { db, schema } from '../../../db';
import { validateSession } from '../../lib/auth';
import { getCatalog } from '../../lib/data';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const body = await request.json().catch(() => null);
    if (!body || !body.productSlug) {
      return new Response(JSON.stringify({ error: 'Missing productSlug in request body' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { productSlug } = body;

    // 1. Resolve product / bundle details from Git catalog
    const { products, bundles } = await getCatalog();
    const allItems = [...(products || []), ...(bundles || [])];
    const targetItem = allItems.find((item) => item.slug === productSlug);

    if (!targetItem) {
      return new Response(JSON.stringify({ error: `Product not found: ${productSlug}` }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 2. Resolve user (session or guest details from body)
    const { user } = await validateSession(cookies);
    const customerEmail = user?.email || body.email || 'customer@aipedia.id';
    const customerName = user?.name || body.name || 'Pelanggan AIPEDIA';

    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    if (!serverKey) {
      return new Response(
        JSON.stringify({
          error: 'MIDTRANS_SERVER_KEY is not configured in .env',
          demoMode: true,
          mockRedirect: `/payment/success?status=paid&order=ORD-MOCK-${Date.now()}`,
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const isProduction = process.env.MIDTRANS_IS_PRODUCTION === 'true';
    const snapApiUrl = isProduction
      ? 'https://app.midtrans.com/snap/v1/transactions'
      : 'https://app.sandbox.midtrans.com/snap/v1/transactions';

    const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // 3. Request Snap Token from Midtrans
    const authHeader = 'Basic ' + Buffer.from(serverKey + ':').toString('base64');
    const midtransPayload = {
      transaction_details: {
        order_id: orderId,
        gross_amount: targetItem.price,
      },
      item_details: [
        {
          id: targetItem.slug,
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

    // 4. Record order in database
    if (db) {
      await db.insert(schema.orders).values({
        id: orderId,
        userId: user?.id || null,
        productSlug: targetItem.slug,
        amount: targetItem.price,
        status: 'pending',
        snapToken: snapData.token,
      });
    }

    return new Response(
      JSON.stringify({
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
