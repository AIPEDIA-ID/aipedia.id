import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { POST as checkoutHandler } from "../src/pages/api/checkout";

function createMockCookies(initial: Record<string, string> = {}) {
  const store = new Map<string, string>(Object.entries(initial));
  return {
    get: vi.fn((key: string) => (store.has(key) ? { value: store.get(key)! } : undefined)),
    set: vi.fn((key: string, value: string) => {
      store.set(key, value);
    }),
    delete: vi.fn((key: string) => {
      store.delete(key);
    }),
    has: vi.fn((key: string) => store.has(key)),
  } as any;
}

describe("POST /api/checkout", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetAllMocks();
    process.env = { ...originalEnv };
    delete process.env.MIDTRANS_SERVER_KEY;
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

  it("returns 400 if productSlug is missing", async () => {
    const cookies = createMockCookies();
    const req = new Request("http://localhost:4321/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "user@example.com" }),
    });

    const res = await checkoutHandler({ request: req, cookies } as any);
    expect(res.status).toBe(400);

    const data = await res.json();
    expect(data.error).toMatch(/Missing productSlug/i);
  });

  it("returns 404 for non-existent product", async () => {
    const cookies = createMockCookies();
    const req = new Request("http://localhost:4321/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productSlug: "non-existent-product-12345" }),
    });

    const res = await checkoutHandler({ request: req, cookies } as any);
    expect(res.status).toBe(404);

    const data = await res.json();
    expect(data.error).toMatch(/Product not found/i);
  });

  describe("Demo / Sandbox Mode (No MIDTRANS_SERVER_KEY)", () => {
    it("handles checkout for an AI Specialist (e.g. Mita)", async () => {
      const cookies = createMockCookies();
      const req = new Request("http://localhost:4321/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productSlug: "mita", email: "buyer@business.id" }),
      });

      const res = await checkoutHandler({ request: req, cookies } as any);
      expect(res.status).toBe(200);

      const data = await res.json();
      expect(data.success).toBe(true);
      expect(data.demoMode).toBe(true);
      expect(data.productTitle).toContain("Mita");
      expect(data.amount).toBe(86000);
      expect(data.redirectUrl).toContain("/payment/success?status=paid");
      expect(data.redirectUrl).toContain("slug=mita");
    });

    it("handles checkout for a catalog product (e.g. Starter Pack Prompt)", async () => {
      const cookies = createMockCookies();
      const req = new Request("http://localhost:4321/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productSlug: "starter-pack-prompt", email: "umkm@toko.id" }),
      });

      const res = await checkoutHandler({ request: req, cookies } as any);
      expect(res.status).toBe(200);

      const data = await res.json();
      expect(data.success).toBe(true);
      expect(data.demoMode).toBe(true);
      expect(data.productTitle).toContain("Starter Pack Prompt");
      expect(data.amount).toBe(199000);
      expect(data.redirectUrl).toContain("slug=starter-pack-prompt");
    });

    it("handles checkout for All-Access Bundle via 'pro' alias", async () => {
      const cookies = createMockCookies();
      const req = new Request("http://localhost:4321/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productSlug: "pro", email: "pro@founder.id" }),
      });

      const res = await checkoutHandler({ request: req, cookies } as any);
      expect(res.status).toBe(200);

      const data = await res.json();
      expect(data.success).toBe(true);
      expect(data.demoMode).toBe(true);
      expect(data.redirectUrl).toContain("slug=bundle-all-access");
    });
  });

  describe("Live Midtrans Mode (Mocked Snap Gateway)", () => {
    beforeEach(() => {
      process.env.MIDTRANS_SERVER_KEY = "SB-Mid-server-test-key-mock";
      process.env.MIDTRANS_IS_PRODUCTION = "false";
    });

    it("sends correct payload to Midtrans Snap and returns token", async () => {
      const mockSnapResponse = {
        token: "snap-token-mock-987654",
        redirect_url: "https://app.sandbox.midtrans.com/snap/v2/vtweb/snap-token-mock-987654",
      };

      const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
        ok: true,
        json: async () => mockSnapResponse,
      } as any);

      const cookies = createMockCookies();
      const req = new Request("http://localhost:4321/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productSlug: "mita",
          email: "mita.buyer@client.id",
          name: "Budi Marketer",
        }),
      });

      const res = await checkoutHandler({ request: req, cookies } as any);
      expect(res.status).toBe(200);

      const data = await res.json();
      expect(data.success).toBe(true);
      expect(data.token).toBe("snap-token-mock-987654");
      expect(data.redirectUrl).toBe(mockSnapResponse.redirect_url);

      // Verify Snap API fetch call
      expect(fetchSpy).toHaveBeenCalledTimes(1);
      const [url, options] = fetchSpy.mock.calls[0];
      expect(url).toBe("https://app.sandbox.midtrans.com/snap/v1/transactions");
      expect(options?.headers).toHaveProperty("Authorization");

      const sentBody = JSON.parse(options?.body as string);
      expect(sentBody.transaction_details.gross_amount).toBe(86000);
      expect(sentBody.customer_details.email).toBe("mita.buyer@client.id");
      expect(sentBody.customer_details.first_name).toBe("Budi Marketer");
      expect(sentBody.item_details[0].id).toBe("mita");
    });

    it("handles Midtrans API failure gracefully (502)", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
        ok: false,
        text: async () => "Midtrans Sandbox Gateway Timeout",
      } as any);

      const cookies = createMockCookies();
      const req = new Request("http://localhost:4321/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productSlug: "mita", email: "test@example.com" }),
      });

      const res = await checkoutHandler({ request: req, cookies } as any);
      expect(res.status).toBe(502);

      const data = await res.json();
      expect(data.error).toMatch(/Failed to create payment transaction with Midtrans/i);
    });
  });
});
