import type { APIRoute } from 'astro';
import { db, schema } from '../../../../db';
import { eq } from 'drizzle-orm';
import crypto from 'node:crypto';

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

        // If paid and order is associated with a user, grant access immediately
        if (isPaid && order.userId) {
          await db.insert(schema.entitlements).values({
            userId: order.userId,
            grant: order.productSlug,
          });
          console.log(`[Midtrans Webhook] Granted access for ${order.productSlug} to user ${order.userId}`);
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
