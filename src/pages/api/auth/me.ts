import type { APIRoute } from 'astro';
import { validateSession } from '../../../lib/auth';

export const prerender = false;

export const GET: APIRoute = async ({ cookies }) => {
  const { user, grants } = await validateSession(cookies);

  if (!user) {
    return new Response(JSON.stringify({ authenticated: false, user: null, grants: [] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(
    JSON.stringify({
      authenticated: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
      },
      grants,
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
};
