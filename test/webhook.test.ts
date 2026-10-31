import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { POST as webhookHandler } from "../src/pages/api/webhook/midtrans";
import crypto from "node:crypto";

function computeMidtransSignature(orderId: string, statusCode: string, grossAmount: string, serverKey: string): string {
  const payload = `${orderId}${statusCode}${grossAmount}${serverKey}`;
  return crypto.createHash("sha512").update(payload).digest("hex");
}

describe("POST /api/webhook/midtrans", () => {
  const originalEnv = process.env;
  const mockServerKey = "SB-Mid-server-webhook-test-key";

  beforeEach(() => {
    vi.resetAllMocks();
    process.env = { ...originalEnv };
    process.env.MIDTRANS_SERVER_KEY = mockServerKey;
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

  it("returns 400 when payload is missing required fields", async () => {
    const req = new Request("http://localhost:4321/api/webhook/midtrans", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order_id: "ORD-123" }), // missing status_code, gross_amount
    });

    const res = await webhookHandler({ request: req } as any);
    expect(res.status).toBe(400);

    const data = await res.json();
    expect(data.error).toMatch(/Invalid Midtrans notification payload/i);
  });

  it("returns 403 when signature key verification fails", async () => {
    const req = new Request("http://localhost:4321/api/webhook/midtrans", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        order_id: "ORD-1730000000",
        status_code: "200",
        gross_amount: "86000.00",
        signature_key: "invalid-signature-hash",
        transaction_status: "settlement",
      }),
    });

    const res = await webhookHandler({ request: req } as any);
    expect(res.status).toBe(403);

    const data = await res.json();
    expect(data.error).toMatch(/Signature verification failed/i);
  });

  it("processes 'settlement' notification as paid (200 OK)", async () => {
    const orderId = "ORD-TEST-SETTLEMENT-123";
    const statusCode = "200";
    const grossAmount = "86000.00";
    const validSignature = computeMidtransSignature(orderId, statusCode, grossAmount, mockServerKey);

    const req = new Request("http://localhost:4321/api/webhook/midtrans", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        order_id: orderId,
        status_code: statusCode,
        gross_amount: grossAmount,
        signature_key: validSignature,
        transaction_status: "settlement",
        fraud_status: "accept",
      }),
    });

    const res = await webhookHandler({ request: req } as any);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.status).toBe("ok");
    expect(data.orderStatus).toBe("paid");
  });

  it("processes 'capture' with 'accept' fraud status as paid (200 OK)", async () => {
    const orderId = "ORD-TEST-CAPTURE-456";
    const statusCode = "200";
    const grossAmount = "199000.00";
    const validSignature = computeMidtransSignature(orderId, statusCode, grossAmount, mockServerKey);

    const req = new Request("http://localhost:4321/api/webhook/midtrans", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        order_id: orderId,
        status_code: statusCode,
        gross_amount: grossAmount,
        signature_key: validSignature,
        transaction_status: "capture",
        fraud_status: "accept",
      }),
    });

    const res = await webhookHandler({ request: req } as any);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.status).toBe("ok");
    expect(data.orderStatus).toBe("paid");
  });

  it("maps pending, cancel, and expire statuses correctly", async () => {
    const testCases = [
      { transactionStatus: "pending", expectedStatus: "pending" },
      { transactionStatus: "cancel", expectedStatus: "cancel" },
      { transactionStatus: "expire", expectedStatus: "expire" },
      { transactionStatus: "deny", expectedStatus: "deny" },
    ];

    for (const { transactionStatus, expectedStatus } of testCases) {
      const orderId = `ORD-TEST-${transactionStatus.toUpperCase()}`;
      const statusCode = "201";
      const grossAmount = "128000.00";
      const validSignature = computeMidtransSignature(orderId, statusCode, grossAmount, mockServerKey);

      const req = new Request("http://localhost:4321/api/webhook/midtrans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order_id: orderId,
          status_code: statusCode,
          gross_amount: grossAmount,
          signature_key: validSignature,
          transaction_status: transactionStatus,
        }),
      });

      const res = await webhookHandler({ request: req } as any);
      expect(res.status).toBe(200);

      const data = await res.json();
      expect(data.orderStatus).toBe(expectedStatus);
    }
  });
});
