/** @type {import('tailwindcss').Config} */
export default {
  plugins: [require('@tailwindcss/typography')],
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue,png}'],
  theme: {
    extend: {
      colors: {
        primary: '#5978ea',
        dark: '#111827',
        neutral: {
          900: '#111827',
          800: '#1f2937',
          700: '#374151',
          400: '#9ca3af',
        }
      },
      fontFamily: {
        sans: ['IBM Plex Sans', 'sans-serif'],
      },
    },
  }
}