# Antigravity System Rules for AIPEDIA

> This is the primary rules (Customizations) file for AI agents (especially Antigravity) working on the AIPEDIA project.
> This project is a *Product Generation Engine* and *Marketing Frontend* built with Astro 5 + Tailwind.

---

## 1. IDENTITY & CONTEXT
- You are working on **AIPEDIA.id** (A bundle of 17+ AI Specialists for Indonesian Businesses).
- **Core Architecture**:
  - `src/` & `public/`: AstroJS Landing Page (Frontend).
  - `products/`: Final PDF & ZIP deliverables + Codex Plugins/Skills.
  - `_docs/`: Internal knowledge (`SUMMARY.md`), Prompts, Task management (`tasks/`), SSOT Database.
  - `scripts/`: Python automation & generators.

## 2. THE GOLDEN RULES (SINGLE SOURCE OF TRUTH)
- ALL AI Specialist data (name, role, description, price, theme color, prompt, id) MUST **ONLY** be modified in `_docs/database/assistants.json`.
- **STRICTLY PROHIBITED**: Do not hardcode data (copy) inside Astro components (`src/components/`) or product Markdown files (`products/ASISTANT.md`).
- The Astro Frontend UI is *data-driven*, so Astro components must consume data directly from the generated JSON files.

## 3. CORE WORKFLOW (PIPELINE)
Whenever there is a task to add or modify an AI Specialist, you **MUST** follow this automation pipeline (Makefile) via the terminal:

1. **Update SSOT**: Modify `_docs/database/assistants.json`.
2. **Sync Data**: Run `make project-generate-all` to resolve and distribute the SSOT JSON into web JSON files (`src/data/*.json`), Product Markdown, and Internal Prompts.
3. **Generate Assets (If adding a New AI)**:
   - Run `make project-visual-prompt` to generate the Midjourney/DALL-E prompt.
   - Place the raw image (transparent PNG) into `_docs/assets/raw_icons/[id].png`.
   - Run `make project-compress` to optimize the icon and move it to `public/`.
4. **Build Deliverables**: Run `make build-products` (requires Puppeteer) to build the final PDF Guides and package them into ZIP files in `products/delivery/`.

## 4. TASK MANAGEMENT & EVALUATIONS
- To check pending work, read the modular TODOs in `_docs/tasks/` (`product.md`, `marketing.md`, `website.md`).
- Ensure any feature/skill modifications meet the quality criteria defined in the *acceptance scenarios* within `_docs/evaluations/aipedia-scenarios.md`.
- Read external business references and context in `_docs/REFERENCES.md` and `_docs/SUMMARY.md`.

## 5. UI/UX & STYLING RULES (SALES PAGE)
- Use Tailwind CSS (avoid custom CSS/style tags whenever possible).
- **Typography & Clarity**: Since this is a *Sales Page*, the content must be highly readable. Avoid using extremely small fonts (`text-xs`) or faded colors (`text-gray-500` in dark mode) for long paragraphs. Standardize descriptions using `text-sm` or `text-base` with high contrast (e.g., `text-gray-600` for light mode, `text-gray-300` for dark mode).
- **Aesthetics**: The design MUST feel premium. Use gradients, *glassmorphism*, dark mode, subtle micro-animations, and smooth responsive components.
