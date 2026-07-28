# Antigravity System Rules for AIPEDIA

> This is the primary rules (Customizations) file for AI agents (especially Antigravity) working on the AIPEDIA project.
> This project is a *Product Generation Engine* and *Marketing Frontend* built with Astro 5 + Tailwind.

---

## 1. IDENTITY & CONTEXT
- You are working on **AIPEDIA.id** (A bundle of 17+ AI Specialists for Indonesian Businesses).
- **Core Architecture** (Lean Structure):
  - `src/` & `public/`: AstroJS Landing Page (Frontend).
  - `products/`: Source code factory for CustomGPT Prompts & AI Skills.
  - `delivery/`: Final PDF & ZIP deliverables (Ready for customers).
  - `_docs/`: Internal knowledge (`SUMMARY.md`), Task management (`task/`), SSOT Database.
  - `scripts/`: Python automation & build generators (`manager.py`, `build.sh`).
  - `.agents/`: AI configuration and specialized Skills.

## 2. THE GOLDEN RULES (SINGLE SOURCE OF TRUTH)
- ALL AI Specialist data (name, role, description, price, theme color, prompt, id) MUST **ONLY** be modified in `_docs/database/assistants.json`.
- **STRICTLY PROHIBITED**: Do not hardcode data (copy) inside Astro components (`src/components/`) or product Markdown files (`products/guide/ASISTANT.md`).
- The Astro Frontend UI is *data-driven*, so Astro components must consume data directly from the generated JSON files.

## 3. CORE WORKFLOW (PIPELINE)
Whenever there is a task to add or modify an AI Specialist, you **MUST** follow this automation pipeline:

1. **Update SSOT**: Modify `_docs/database/assistants.json`.
2. **Sync Data**: Run `make generate-all` via terminal to resolve and distribute the SSOT JSON into web JSON files and Internal Prompts.
3. **Generate Assets (If adding a New AI)**:
   - Run `make project-visual-prompt` to generate the Midjourney/DALL-E prompt.
   - Place the raw image (transparent PNG) into `_docs/assets/raw_icons/[id].png`.
   - Run `make project-compress` to optimize the icon and move it to `public/`.
4. **Build Deliverables**: Run `bash products/build.sh` or `make build-products` to package them into ZIP files in the `delivery/` folder.

## 4. TASK MANAGEMENT & EVALUATIONS
- To check pending work, read the `_docs/task/ACTIVE.md` file.
- Ensure any feature/skill modifications meet quality criteria. If evaluating an AI, trigger the **"Evaluate AIPEDIA Specialist"** agent skill.
- Specialized workflows (Building Campaign Pages, Generating Prompts, creating Codex Skills) are managed via **Agent Skills**. They will be triggered automatically when you ask the AI to perform these specific tasks.

## 5. UI/UX & STYLING RULES (SALES PAGE)
- Use Tailwind CSS (avoid custom CSS/style tags whenever possible).
- **Typography & Clarity**: Since this is a *Sales Page*, the content must be highly readable. Avoid using extremely small fonts (`text-xs`) or faded colors (`text-gray-500` in dark mode) for long paragraphs. Standardize descriptions using `text-sm` or `text-base` with high contrast (e.g., `text-gray-600` for light mode, `text-gray-300` for dark mode).
- **Aesthetics**: The design MUST feel premium. Use gradients, *glassmorphism*, dark mode, subtle micro-animations, and smooth responsive components.

## 6. STYLING REFERENCE
Whenever you are asked to edit UI components, Astro files, or write CSS, you MUST first read `.agents/rules/styles.md` to ensure compliance with the Design System.
