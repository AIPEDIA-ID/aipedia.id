import type { APIRoute } from 'astro';
import { createMockSession } from '../../../lib/auth';

export const prerender = false;

export const GET: APIRoute = async ({ cookies, url, redirect }) => {
  createMockSession(cookies);
  const target = url.searchParams.get('redirect') || '/dashboard';
  return redirect(target, 302);
};

export const POST: APIRoute = async ({ cookies, url, redirect }) => {
  createMockSession(cookies);
  const target = url.searchParams.get('redirect') || '/dashboard';
  return redirect(target, 302);
};
