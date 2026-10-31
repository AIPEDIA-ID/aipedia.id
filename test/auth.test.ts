import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  validateSession,
  createMockSession,
  destroySession,
  SESSION_COOKIE_NAME,
  BYPASS_COOKIE_NAME,
} from "../src/lib/auth";
import { isMockBypassActive } from "../src/lib/data/server";
import { GET as meHandler } from "../src/pages/api/auth/me";

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

describe("Authentication & Session Logic (src/lib/auth)", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("validateSession returns unauthenticated context when no session cookie is present", async () => {
    const cookies = createMockCookies();
    const result = await validateSession(cookies);

    expect(result.user).toBeNull();
    expect(result.session).toBeNull();
    expect(result.grants).toEqual([]);
  });

  it("validateSession returns demo user and full access grants for mock session token", async () => {
    const cookies = createMockCookies({
      [SESSION_COOKIE_NAME]: "mock_session_demo",
    });

    const result = await validateSession(cookies);

    expect(result.user).not.toBeNull();
    expect(result.user?.id).toBe("u_demo");
    expect(result.user?.email).toBe("demo@aipedia.id");
    expect(result.grants).toContain("course/");
    expect(result.grants).toContain("prompts/");
    expect(result.grants).toContain("custom-ai/");
  });

  it("createMockSession sets standard httpOnly session cookie", () => {
    const cookies = createMockCookies();
    const token = createMockSession(cookies);

    expect(token).toBe("mock_session_demo");
    expect(cookies.set).toHaveBeenCalledWith(
      SESSION_COOKIE_NAME,
      "mock_session_demo",
      expect.objectContaining({
        path: "/",
        httpOnly: true,
        maxAge: expect.any(Number),
      })
    );
  });

  it("destroySession removes session cookie and sets bypass cookie to false", async () => {
    const cookies = createMockCookies({
      [SESSION_COOKIE_NAME]: "mock_session_demo",
    });

    await destroySession(cookies);

    expect(cookies.delete).toHaveBeenCalledWith(SESSION_COOKIE_NAME, { path: "/" });
    expect(cookies.set).toHaveBeenCalledWith(
      BYPASS_COOKIE_NAME,
      "false",
      expect.objectContaining({
        path: "/",
        maxAge: expect.any(Number),
      })
    );
  });

  describe("isMockBypassActive", () => {
    it("respects explicit bypass cookie when set to true", () => {
      const cookies = createMockCookies({ [BYPASS_COOKIE_NAME]: "true" });
      expect(isMockBypassActive(cookies)).toBe(true);
    });

    it("respects explicit bypass cookie when set to false", () => {
      const cookies = createMockCookies({ [BYPASS_COOKIE_NAME]: "false" });
      expect(isMockBypassActive(cookies)).toBe(false);
    });
  });

  describe("GET /api/auth/me", () => {
    it("returns authenticated: false when no session exists", async () => {
      const cookies = createMockCookies();
      const res = await meHandler({ cookies } as any);
      expect(res.status).toBe(200);

      const data = await res.json();
      expect(data.authenticated).toBe(false);
      expect(data.user).toBeNull();
      expect(data.grants).toEqual([]);
    });

    it("returns authenticated: true with user details and grants when session exists", async () => {
      const cookies = createMockCookies({
        [SESSION_COOKIE_NAME]: "mock_session_demo",
      });

      const res = await meHandler({ cookies } as any);
      expect(res.status).toBe(200);

      const data = await res.json();
      expect(data.authenticated).toBe(true);
      expect(data.user?.id).toBe("u_demo");
      expect(data.user?.email).toBe("demo@aipedia.id");
      expect(data.grants.length).toBeGreaterThan(0);
    });
  });
});
