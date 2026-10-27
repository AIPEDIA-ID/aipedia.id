import type { APIRoute } from 'astro';
import { BYPASS_COOKIE_NAME, SESSION_MAX_AGE } from '../../../lib/auth';
import { AUTH_CONFIG } from '../../../config/auth';

export const prerender = false;

export const GET: APIRoute = async ({ cookies, url, request, redirect }) => {
  const enableParam = url.searchParams.get('enable');
  let currentVal = cookies.get(BYPASS_COOKIE_NAME)?.value;
  let nextState: boolean;

  if (enableParam === 'true') {
    nextState = true;
  } else if (enableParam === 'false') {
    nextState = false;
  } else {
    // Toggle
    const isActive = currentVal === 'true' || (currentVal !== 'false' && AUTH_CONFIG.mockBypass);
    nextState = !isActive;
  }

  cookies.set(BYPASS_COOKIE_NAME, nextState ? 'true' : 'false', {
    path: '/',
    sameSite: 'lax',
    maxAge: SESSION_MAX_AGE,
  });

  const referer = request.headers.get('referer');
  const target = referer || (nextState ? '/dashboard' : '/login');
  return redirect(target, 302);
};
