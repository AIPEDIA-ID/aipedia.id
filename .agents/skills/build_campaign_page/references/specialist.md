# Rules for Building Specialist Landing Pages (Campaigns)

When creating or modifying a dedicated landing page for a specific AI Specialist (e.g., `mita.astro`, `wita.astro`), follow these strict structural, styling, and copywriting rules:

## 1. Data-Driven Content (Frontmatter)
- **Do not hardcode content** directly into the HTML structure.
- Define `pricing`, `features`, `platforms`, and `faqs` as Javascript arrays in the Astro frontmatter.
- Use `.map()` loops in the HTML to render these sections. This ensures consistency and makes future updates easier.

## 2. Theming & Aesthetics (Specialist Colors)
- **Specialist Accent Colors**: Replace the global Aipedia purple (`primary-400` to `primary-600`) with the specific Specialist's brand color (e.g., `blue-500` to `blue-700` for Mita) for gradients, glowing borders, badges, and icon highlights.
- **Global CTA Exception**: The main Call-To-Action buttons MUST retain the global parent class `.btn-cta`. Do NOT inject custom gradients or overwrite the main CTA's theming. It must align with the global Aipedia brand.
- **Icons, Not Emojis**: Always use minimal, clean SVG icons (like Lucide or Heroicons) instead of standard emojis. Apply the Specialist's theme color to these SVGs (e.g., `text-blue-600`).

## 3. Copywriting Rules
- **Benefit-Driven Features**: Focus on the direct benefit to the user. Instead of technical terms (e.g., "Diagnostic Mode"), use punchy, problem-solving copy (e.g., "Audit Iklan Boncos 5 Menit").
- **Pricing Copy**: Never use technical backend names like "Claude", "Codex", or "Gemini" in the pricing table, as it distracts and lowers perceived value. Use branded terms like "Mita Skills" and highlight the *number* of skills (e.g., "6 Mita Skills: Campaign Audit, LP Review...").
- **Bump Offer Strategy**: Ensure the Pricing section supports the upsell flow. The Bundle tier must mention the Bump Offer clearly in the subtext (e.g., `*Tersedia bump offer: Full 17 Agent Skills (+160k) saat checkout`).

## 4. Standardized Page Structure
Every Specialist landing page must contain the following flow:
1. **Hero Section**: Includes a glassy-border visual featuring the Specialist's character icon.
2. **Problem Section**: 3-column grid highlighting the user's pain points (with SVG icons).
3. **Demo Section**: Video element demonstrating the AI in action.
4. **Features Grid**: Mapped from the `features` array.
5. **Multi-Platform Section**: A 3-column grid showing where the AI works (ChatGPT, Claude, IDE/Codex Plugin). **CRITICAL**: Do not wrap the platform logos in bulky background containers. Just use the raw `<img />` tags directly (`w-10 h-10 object-contain`) to keep it clean.
6. **Pricing Section**: 2-column grid. Left for "Specialist Only", Right for "Bundle 17 Spesialis" (Best Value).
7. **Guarantee**: Must include the text `"Garansi 7 Hari Uang Kembali. Gak puas? Chat aja."` below the pricing block.
8. **FAQ Section**: Mapped from the `faqs` array.

By following these rules, all AI Specialists will have high-converting, consistent, and premium landing pages without redundant code.
