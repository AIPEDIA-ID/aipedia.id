import type { APIRoute } from 'astro';
import { db, schema } from '../../../../../db';
import { createSession, createMockSession } from '../../../../lib/auth';
import { eq } from 'drizzle-orm';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  try {
    const formData = await request.formData();
    const rawEmail = (formData.get('email')?.toString() || '').trim().toLowerCase();

    if (!rawEmail) {
      return redirect('/login?error=email_required', 302);
    }

    if (db) {
      try {
        const existing = await db
          .select()
          .from(schema.users)
          .where(eq(schema.users.email, rawEmail))
          .limit(1);

        let user = existing[0];
        if (!user) {
          const newId = `u_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
          const inserted = await db
            .insert(schema.users)
            .values({
              id: newId,
              email: rawEmail,
              name: rawEmail.split('@')[0],
              image: null,
            })
            .returning();
          user = inserted[0];
        }

        if (user) {
          await createSession(user.id, cookies);
          return redirect('/dashboard', 302);
        }
      } catch (dbErr) {
        console.warn('[Auth Email] DB sign-in fallback to mock session:', dbErr);
      }
    }

    // Fallback demo/mock session
    createMockSession(cookies);
    return redirect('/dashboard', 302);
  } catch (_e) {
    createMockSession(cookies);
    return redirect('/dashboard', 302);
  }
};
