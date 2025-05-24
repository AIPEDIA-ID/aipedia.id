/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#ff0', // Warna kuning dari template asli
        dark: '#111827',
        neutral: {
          900: '#111827',
          800: '#1f2937',
          700: '#374151',
          400: '#9ca3af',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}