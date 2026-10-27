// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  adapter: node({
    mode: 'standalone',
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
