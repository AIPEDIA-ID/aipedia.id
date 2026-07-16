# Website & Astro Development Rules

> **Scope**: Rules for building and modifying the Aipedia Frontend (Sales Pages, Landing Pages).

## 1. Tech Stack
- **Core**: Astro 5 + HTML/JS.
- **Styling**: Vanilla Tailwind CSS. Avoid custom CSS files or `<style>` tags unless strictly necessary for complex animations.

## 2. Data-Driven UI
- The Astro Frontend is *data-driven*. Components in `src/components/` MUST consume data directly from the generated JSON files in `src/data/*.json`.
- **STRICT RULE**: Do not hardcode AI Specialist data (names, roles, prices, colors) into the Astro components.

## 3. Premium UI/UX & Aesthetics
- **Wow Factor**: The design must feel extremely premium and state-of-the-art. Avoid "minimum viable product" looks.
- **Styling Directives**:
  - Use vibrant, curated harmonious color palettes (no default red/blue/green).
  - Implement sleek dark modes and glassmorphism.
  - Add smooth gradients and subtle micro-animations (hover states, transitions).
- **Typography**: Use modern Google Fonts (e.g., Inter, Roboto, Outfit) instead of browser defaults.

## 4. Sales Readability & Accessibility
- Because this is a *Sales Page*, clarity is paramount.
- **Contrast**: Maintain high contrast (e.g., `text-gray-600` for light mode, `text-gray-300` for dark mode).
- **Sizing**: Avoid extremely small fonts (`text-xs`) for long paragraphs. Standardize readable descriptions using `text-sm` or `text-base`.
