import type { APIRoute } from 'astro';
import { db, schema } from '../../../../../db';
import { createSession } from '../../../../lib/auth';

export const prerender = false;

interface GoogleUserInfo {
  sub: string;
  name: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
  email: string;
  email_verified: boolean;
}

export const GET: APIRoute = async ({ request, redirect, cookies }) => {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const savedState = cookies.get('oauth_state')?.value;

  cookies.delete('oauth_state', { path: '/' });

  if (!code || !state || state !== savedState) {
    return new Response('Invalid or expired OAuth state. Please try logging in again.', { status: 400 });
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return new Response('Google OAuth credentials not configured in server .env', { status: 500 });
  }

  const redirectUri = `${url.origin}/api/auth/callback/google`;

  try {
    // 1. Exchange authorization code for tokens
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });

    if (!tokenRes.ok) {
      const errText = await tokenRes.text();
      console.error('[Google OAuth] Token exchange error:', errText);
      return new Response('Failed to exchange authorization code with Google.', { status: 502 });
    }

    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;

    // 2. Fetch authenticated user profile
    const userRes = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!userRes.ok) {
      return new Response('Failed to fetch user info from Google.', { status: 502 });
    }

    const profile: GoogleUserInfo = await userRes.json();

    if (!profile.email) {
      return new Response('Google account does not have an associated email address.', { status: 400 });
    }

    // 3. Upsert user in database
    const userId = `usr_${profile.sub}`;

    if (db) {
      await db
        .insert(schema.users)
        .values({
          id: userId,
          email: profile.email,
          name: profile.name || profile.email.split('@')[0],
          image: profile.picture || null,
        })
        .onConflictDoUpdate({
          target: schema.users.id,
          set: {
            name: profile.name || profile.email.split('@')[0],
            image: profile.picture || null,
            updatedAt: new Date(),
          },
        });
    }

    // 4. Create session and set httpOnly cookie
    await createSession(userId, cookies);

    // 5. Redirect smoothly to Dashboard
    return redirect('/dashboard', 302);
  } catch (error) {
    console.error('[Google OAuth] Unexpected error:', error);
    return new Response('Internal error during authentication callback.', { status: 500 });
  }
};
