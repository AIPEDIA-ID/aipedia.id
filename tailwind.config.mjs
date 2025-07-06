/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        white: '#ffffff',
        text: '#111826',
        primary: '#5978ea',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}