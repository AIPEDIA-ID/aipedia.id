import type { APIRoute } from 'astro';
import { createMockSession } from '../../../../lib/auth';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  try {
    const formData = await request.formData();
    const email = formData.get('email')?.toString() || '';
    
    // In mock setup, any non-empty input or demo submission creates mock session
    createMockSession(cookies);
    return redirect('/dashboard', 302);
  } catch (e) {
    createMockSession(cookies);
    return redirect('/dashboard', 302);
  }
};
