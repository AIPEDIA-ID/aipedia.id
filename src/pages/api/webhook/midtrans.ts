import type { APIRoute } from 'astro';
import { db, schema } from '../../../../db';
import { eq } from 'drizzle-orm';
import crypto from 'node:crypto';
import { getCatalog } from '../../../lib/data';
import { assistants } from '../../../data/assistants';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const payload = await request.json().catch(() => null);
    if (!payload || !payload.order_id || !payload.status_code || !payload.gross_amount) {
      return new Response(JSON.stringify({ error: 'Invalid Midtrans notification payload' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const serverKey = process.env.MIDTRANS_SERVER_KEY || '';

    // 1. Verify Midtrans SHA512 Signature
    if (serverKey && payload.signature_key) {
      const signaturePayload = `${payload.order_id}${payload.status_code}${payload.gross_amount}${serverKey}`;
      const expectedSignature = crypto.createHash('sha512').update(signaturePayload).digest('hex');

      if (payload.signature_key !== expectedSignature) {
        console.error('[Midtrans Webhook] Invalid signature key');
        return new Response(JSON.stringify({ error: 'Signature verification failed' }), { status: 403 });
      }
    }

    const orderId = payload.order_id;
    const transactionStatus = payload.transaction_status;
    const fraudStatus = payload.fraud_status;

    let orderStatus = 'pending';
    const isPaid =
      transactionStatus === 'settlement' ||
      (transactionStatus === 'capture' && fraudStatus === 'accept');

    if (isPaid) {
      orderStatus = 'paid';
    } else if (['cancel', 'deny', 'expire'].includes(transactionStatus)) {
      orderStatus = transactionStatus;
    }

    // 2. Update Order and Grant Entitlements
    if (db) {
      const existingOrders = await db
        .select()
        .from(schema.orders)
        .where(eq(schema.orders.id, orderId))
        .limit(1);

      if (existingOrders.length > 0) {
        const order = existingOrders[0];

        await db
          .update(schema.orders)
          .set({
            status: orderStatus,
            updatedAt: new Date(),
          })
          .where(eq(schema.orders.id, orderId));

        // If paid, ensure user exists and grant entitlements
        if (isPaid) {
          let targetUserId = order.userId;

          // If no userId on order, try matching by customerEmail
          if (!targetUserId && order.customerEmail) {
            const userMatch = await db
              .select()
              .from(schema.users)
              .where(eq(schema.users.email, order.customerEmail))
              .limit(1);

            if (userMatch.length > 0) {
              targetUserId = userMatch[0].id;
            } else {
              // Auto-create user for customer
              targetUserId = `u_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
              await db.insert(schema.users).values({
                id: targetUserId,
                email: order.customerEmail,
                name: order.customerName || order.customerEmail.split('@')[0],
                image: null,
              });
            }

            // Link back to order
            await db
              .update(schema.orders)
              .set({ userId: targetUserId })
              .where(eq(schema.orders.id, orderId));
          }

          if (targetUserId) {
            // Determine all grants for this product/specialist
            const grantsToApply = new Set<string>();
            grantsToApply.add(order.productSlug);

            // If it's a catalog product or bundle
            const { products, bundles } = await getCatalog();
            const catalogItem = [...products, ...bundles].find((item) => item.slug === order.productSlug);
            if (catalogItem?.includes) {
              catalogItem.includes.forEach((inc) => grantsToApply.add(inc));
            }

            // If it's an AI Specialist
            const cleanSpecialistId = order.productSlug.replace(/^spesialis-/, '');
            const assistant = assistants.find((a) => a.id === cleanSpecialistId || a.id === order.productSlug);
            if (assistant) {
              grantsToApply.add(`custom-ai/${assistant.id}`);
              grantsToApply.add(`skills/${assistant.id}`);
              grantsToApply.add(assistant.id);
            }

            // Insert each grant
            for (const grant of grantsToApply) {
              await db
                .insert(schema.entitlements)
                .values({
                  userId: targetUserId,
                  grant,
                })
                .catch(() => {}); // catch duplicate inserts gracefully
            }

            console.log(
              `[Midtrans Webhook] Successfully granted [${Array.from(grantsToApply).join(', ')}] to user ${targetUserId}`
            );
          }
        }
      }
    }

    return new Response(JSON.stringify({ status: 'ok', orderStatus }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('[Midtrans Webhook] Error processing notification:', error);
    return new Response(JSON.stringify({ error: 'Internal webhook error' }), { status: 500 });
  }
};
