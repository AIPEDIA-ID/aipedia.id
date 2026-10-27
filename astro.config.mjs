// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://aipedia.id',
  adapter: cloudflare({
    imageService: 'passthrough',
  }),
  output: 'static',
  redirects: {
    '/masuk': '/login',
    '/daftar': '/register',
    '/tentang': '/about',
    '/kontak': '/contact',
    '/akun': '/account',
    '/lupa-password': '/forgot-password',
    '/katalog': '/catalog',
    '/pembayaran/selesai': '/payment/success',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
