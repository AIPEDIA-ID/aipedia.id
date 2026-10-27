import { db, schema } from '../../db';
import { eq, and, gt } from 'drizzle-orm';
import type { AstroCookies } from 'astro';

export const SESSION_COOKIE_NAME = 'aipedia_session';
export const SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 days in seconds
export const BYPASS_COOKIE_NAME = 'aipedia_bypass';

export interface AuthContext {
  user: typeof schema.users.$inferSelect | null;
  session: typeof schema.sessions.$inferSelect | null;
  grants: string[];
}

/**
 * Creates a mock session for demo/testing without database connection.
 */
export function createMockSession(cookies: AstroCookies): string {
  const token = 'mock_session_demo';
  cookies.set(SESSION_COOKIE_NAME, token, {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_MAX_AGE,
  });
  return token;
}

/**
 * Creates a new session in DB and attaches it to response cookies.
 */
export async function createSession(userId: string, cookies: AstroCookies): Promise<string> {
  const token = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + SESSION_MAX_AGE * 1000);

  if (db) {
    await db.insert(schema.sessions).values({
      id: token,
      userId,
      expiresAt,
    });
  }

  cookies.set(SESSION_COOKIE_NAME, token, {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_MAX_AGE,
  });

  return token;
}

/**
 * Validates session token from request cookies and returns user + grants.
 */
export async function validateSession(cookies: AstroCookies): Promise<AuthContext> {
  const token = cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!token) {
    return { user: null, session: null, grants: [] };
  }

  // Handle mock session
  if (token.startsWith('mock_') || token === 'demo') {
    return {
      user: {
        id: 'u_demo',
        email: 'demo@aipedia.id',
        name: 'Pengguna Demo',
        avatarUrl: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      session: {
        id: token,
        userId: 'u_demo',
        expiresAt: new Date(Date.now() + SESSION_MAX_AGE * 1000),
        createdAt: new Date(),
      },
      grants: [
        'course/',
        'prompts/',
        'tutorial/',
        'founder-space/',
        'custom-ai/',
        'resource/',
      ],
    };
  }

  if (!db) {
    return { user: null, session: null, grants: [] };
  }

  try {
    const now = new Date();
    const sessionList = await db
      .select()
      .from(schema.sessions)
      .where(and(eq(schema.sessions.id, token), gt(schema.sessions.expiresAt, now)))
      .limit(1);

    if (sessionList.length === 0) {
      cookies.delete(SESSION_COOKIE_NAME, { path: '/' });
      return { user: null, session: null, grants: [] };
    }

    const currentSession = sessionList[0];

    const userList = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, currentSession.userId))
      .limit(1);

    if (userList.length === 0) {
      return { user: null, session: null, grants: [] };
    }

    const currentUser = userList[0];

    // Fetch user grants/entitlements
    const userEntitlements = await db
      .select({ grant: schema.entitlements.grant })
      .from(schema.entitlements)
      .where(eq(schema.entitlements.userId, currentUser.id));

    const grants = userEntitlements.map((e) => e.grant);

    return {
      user: currentUser,
      session: currentSession,
      grants,
    };
  } catch (error) {
    console.error('[Auth] Failed to validate session:', error);
    return { user: null, session: null, grants: [] };
  }
}

/**
 * Destroys current session and clears cookies.
 */
export async function destroySession(cookies: AstroCookies): Promise<void> {
  const token = cookies.get(SESSION_COOKIE_NAME)?.value;
  if (token && db && !token.startsWith('mock_')) {
    try {
      await db.delete(schema.sessions).where(eq(schema.sessions.id, token));
    } catch (e) {
      console.error('[Auth] Error deleting session:', e);
    }
  }

  cookies.delete(SESSION_COOKIE_NAME, { path: '/' });
  // Set bypass cookie to false explicitly so logged out state is observed
  cookies.set(BYPASS_COOKIE_NAME, 'false', {
    path: '/',
    sameSite: 'lax',
    maxAge: SESSION_MAX_AGE,
  });
}
