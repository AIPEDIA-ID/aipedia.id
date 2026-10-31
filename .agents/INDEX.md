# AIPEDIA Agent Knowledge Base & Architecture Index

> **Primary Audience:** AI Agents & Developers working on `aipedia.id`.  
> **Purpose:** Comprehensive architecture map, directory purposes, design system standards, CLI workflows, and token-saving cheatsheet.  
> **Rule Compliance:** Written strictly in English per workspace language guidelines (`AGENTS.md`).

---

## 1. Project Mission & Platform Scope: The Ultimate AI Resource Hub

**AIPEDIA** (`https://aipedia.id`) is a comprehensive **AI Resource Center, Marketplace, and Enablement Hub** for Indonesian businesses, founders, creators, and professionals.

It is **NOT** merely a CustomGPT vendor. AI Specialists are just one pillar of an expansive AI productivity ecosystem:

1. **Prompt Packs & Frameworks (`src/data/catalog.ts`, `src/data/resources.ts`)**:
   - **LLM Prompts**: Battle-tested text prompts for ChatGPT, Claude, and Gemini (marketing, WhatsApp CS closing, email copywriting, SOPs, business proposals).
   - **Visual Prompts**: High-converting Midjourney & visual AI prompt libraries (commercial product shots, tech logos, advertising banners).
2. **AI Specialists & Custom Agents (`_docs/database/assistants.json`, `src/pages/spesialis.astro`)**:
   - 17 tailored AI Employee Personas solving specific business pain points (Meta Ads, Tax, Copywriting, Accounting, Automation, etc.).
   - Delivered as ChatGPT CustomGPTs and Claude/Codex Agent Skills (`ops/products/skills/`).
3. **Tutorials, Playbooks & Video Courses (`src/data/resources.ts`)**:
   - Step-by-step implementation playbooks (AI for Beginners, Prompt Mastery, Workflow Automation).
4. **Templates, SOPs & Content Engines (`src/data/catalog.ts`, `ops/content-generator/`)**:
   - Ready-to-use business templates, viral hook frameworks, and automated social media carousel generators.
5. **Curated Tools & Integrations Directory (`src/pages/tools.astro`, `public/vendors/`)**:
   - Comprehensive directory of verified AI models, platforms, and automation tools (OpenAI, Anthropic, Gemini, DeepSeek, Zapier, Make, etc.).

### Go-To-Market Strategy (Factory Loop v2.0)
- **Frontend (Sniper):** High-converting single-specialist or single-pack entry offers (e.g., *Mita* Meta Ads, *Tira* Pajak, *Starter Pack Prompt*) marketed via Meta Ads cold traffic.
- **Backend (Bank):** Retention, email marketing funnels, and upselling the **All-Access Bundle** (Full 17 Specialists + Complete Prompt Pack Library + All Skills).

---

## 2. The 3 Architectural Pillars (Strict Separation)

The codebase is organized into 3 distinct layers that must never blur:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        AIPEDIA ARCHITECTURE                            │
├────────────────────┬────────────────────┬──────────────────────────────┤
│    1. WEB APP      │ 2. BUSINESS SSOT   │ 3. OPS & MANUFACTURING       │
│  src/, public/, db │ _docs/             │ ops/                         │
│                    │                    │                              │
│ • Astro + Tailwind │ • Single Source of │ • Packaging automation       │
│ • Frontend routes  │   Truth database   │ • Customer PDF/ZIP delivery  │
│ • Apple HIG tokens │ • Marketing & funnels│ • Social media content gen │
│ • Customer portal  │ • Live task boards │ • Python build scripts       │
│ [MANDATORY ENGLISH]│ [INDONESIAN ALLOWED│ [INDONESIAN DELIVERABLES]    │
└────────────────────┴────────────────────┴──────────────────────────────┘
```

1. **Web Application (`src/`, `public/`, `db/`)**: Astro 5 SSR/Static, Tailwind CSS, TypeScript. Customer-facing landing pages, catalog, tools directory, and authenticated user dashboard.
2. **Business SSOT (`_docs/`)**: Sole Single Source of Truth for product definitions (`database/assistants.json`), pricing, business strategy (`strategy.md`), design reviews (`notes/`), and task tracking (`task/`).
3. **Operations & Manufacturing (`ops/`)**: Tooling and scripts that transform raw prompt instructions into customer deliverables (`ops/delivery/`), downloadable ZIPs, and marketing creatives.

---

## 3. Single Source of Truth: `assistants.json`

The central heart of the entire product catalog is:
📍 **`_docs/database/assistants.json`**

Whenever adding, updating, or debugging an AI Specialist (pricing, name, tier, theme color, prompt instructions, avatar):
- **ALWAYS edit `_docs/database/assistants.json` first.**
- **NEVER hardcode character attributes inside Astro components or TypeScript data files.**
- Propagate changes across the ecosystem by running:
  ```bash
  python3 ops/scripts/manager.py generate-all
  ```
  This automatically syncs:
  - `src/data/characters.json` (consumed by frontend UI)
  - `ops/products/customgpt/` (ChatGPT system prompt templates)
  - `ops/products/guide/ASISTANT.md` (Customer delivery guide documentation)

---

## 4. Directory & File Reference Map

### Root Files
- `AGENTS.md` — Core behavioral rules for agents (Architecture separation & language convention). Keep lean.
- `.agents/` — Agent tooling, skills (`apple-hig`, `liquid-glass`), rules (`language.md`), and this `INDEX.md`.
- `astro.config.mjs` — Astro build configuration (Vite plugins, Tailwind integration).
- `tailwind.config.mjs` — Tailwind CSS token mappings and theme extensions.
- `package.json` — Dependencies (Astro, Tailwind, Vitest, Lucide, Supabase).

### `_docs/` — Business Brain & SSOT (Indonesian Allowed)
- `_docs/database/assistants.json` — **SSOT** for all 17 AI Specialists (IDs, tiers, roles, prompts, colors, pricing).
- `_docs/SUMMARY.md` — Comprehensive executive business overview, product ecosystem, and marketing loop.
- `_docs/strategy.md` — In-depth marketing math (CAC, conversion rates, frontend vs backend economics).
- `_docs/task/`
  - `ACTIVE.md` — Active operational and engineering tasks.
- `_docs/notes/`
  - `image-assets.md` — Complete static image inventory and Apple HIG visual overhaul guide.
  - `review-desain-per-halaman.md` — Detailed page-by-page visual review and UX feedback.
  - `plan_refactor_content.md` — Content catalog refactor strategy.
- `_docs/assets/`
  - `raw_icons/` — Source high-resolution master PNGs of specialist avatars.
  - `vendor_icons/` — Raw platform and vendor logo assets.
  - `screenshot/` — Internal UI reference screenshots.

### `ops/` — Operations, Manufacturing & Tooling
- `ops/scripts/manager.py` — Primary CLI management tool (see CLI section below).
- `ops/scripts/builder.py` — Compiles Markdown documentation into customer PDF deliverables.
- `ops/products/`
  - `build.sh` — Bash packaging automation script.
  - `router.yaml` — Routing configuration mapping specialist tiers to downloadable bundles.
  - `customgpt/` — Generated markdown prompts for CustomGPT creation.
  - `guide/` — Markdown sources for user guides (`ASISTANT.md`, `GUIDE_Basic.md`, `GUIDE_Pro.md`).
  - `skills/` — Codex & Claude specialist skills with manifest files.
- `ops/content-generator/` — Automation engine generating Instagram/LinkedIn carousel slides and captions.
- `ops/delivery/` — Generated release packages (ZIP & compiled PDFs) ready for customer fulfillment.

### `src/` — Web Application (Mandatory English Code)
- `src/styles/`
  - `tokens.css` — **SSOT for Apple HIG Design System**: tactile buttons, cards, chips, badges, dropdowns, pagination, scrollbars, and semantic CSS variables.
  - `global.css` — Base typography, CSS resets, and Tailwind directives.
- `src/pages/`
  - `index.astro` — Public homepage (Hero conversion, live workflow demo, bundle showcase, testimonials).
  - `catalog/` & `catalog.astro` — Filterable product catalog with pagination.
  - `spesialis.astro` — Directory of all 17 AI Specialists with tier groupings.
  - `tools.astro` — Directory of supported AI platforms, tools, and integrations.
  - `mita.astro` & `teja.astro` — Dedicated high-conversion single-specialist landing pages.
  - `about.astro`, `contact.astro`, `services.astro`, `pro.astro` — Marketing & company pages.
  - `app/` — Authenticated member area (`dashboard.astro`, `account.astro`, `library/`, `my-library/`).
  - `api/` — Server endpoints (`api/checkout.ts`, `api/auth/`, `api/webhook/`).
- `src/components/`
  - `nav/` — `Navbar.astro`, `NavLinks.astro`, `UserMenu.astro`.
  - `sidebar/` — `SidebarNav.astro`, `SidebarPromo.astro`, `SidebarUser.astro`.
  - `cards/` — `CourseCard.astro`, `StandardCard.astro`, `PromptImageCard.astro`, `SpecialistCard.astro`, `ProductCard.astro`.
  - `Pagination.astro` — Centralized tactile pagination component.
  - `ToolBadge.astro` — Platform integration pill badge with SVG vendor icons.
  - `PlatformGrid.astro` — Supported vendor/tool logo grid.
  - `ComparisonTable.astro` — Feature matrix table (AIPEDIA vs alternatives).
  - `TabBar.astro` — Tactile segmented switch / tab navigation.
- `src/data/`
  - `characters.json` — Auto-generated frontend dataset derived from `assistants.json`.
  - `assistants.ts` — TypeScript wrappers, helper methods, and tier categorization.
  - `catalog.ts` — Catalog items, courses, and prompt packs.
  - `resources.ts` — Free and premium resource library database.
  - `news.ts` — AI industry updates and editorial articles.
- `src/layouts/`
  - `Base.astro` — Root HTML shell with SEO meta tags, fonts, and dark mode base.
  - `DashboardLayout.astro` — App workspace layout with collapsible sidebar and topbar.
  - `SalesLayout.astro` — Focused, distraction-free landing page layout for single-product sales.
- `src/lib/`
  - `access.ts` — Access control logic (determines resource unlock permissions).
  - `auth.ts` — Supabase session and user authentication utilities.
  - `content.ts` — Content filtering and collection helpers.

### `public/` — Static Web Assets
- `character/` — 17 specialist avatar PNGs rendered across UI.
- `card-*.webp` — 6 fallback cover thumbnails for resource categories.
- `vendors/` — Tool & platform logos (ChatGPT, Claude, Gemini, DeepSeek, etc.).
- `screenshots/` — Mockups and UI screenshots for landing pages.
- `favicon.svg` — Brand mark favicon.

---

## 5. Design System SSOT (`src/styles/tokens.css`)

All interface components adhere to **Apple Human Interface Guidelines (HIG)** with **Tactile / Liquid Glass** aesthetics.

### Key CSS Token Classes
- **Tactile Buttons:**
  - `.btn-tactile-primary` — Apple-style embossed blue button with top highlight reflection and bottom bevel shadow.
  - `.btn-tactile-secondary` — Frosted neutral glass button with tactile pressed state.
  - `.btn-tactile-gold` — High-impact gold accent for checkout/PRO tiers.
- **Tactile Cards:**
  - `.card-tactile` — Surface card with subtle border `rgba(255,255,255,0.08)`, frosted background, and elevation hover.
- **Capsule Chips & Pills:**
  - `.chip-tactile` — Mac OS Finder-style tactile pill for categories and filters.
  - `.pagination-btn`, `.pagination-page-pill` — Standardized pagination buttons.
- **Inputs & Search:**
  - `.input-recessed` — Sunken/recessed inner shadow input field.
- **Section Spacing Standards (Homepage & Landings):**
  - Section vertical margin: `--space-section: clamp(3rem, 5vw, 4.25rem)`.
  - Section heading margin bottom: `--space-section-heading: 1.25rem`.
  - Grid card gap: `--space-card-grid: 1.25rem`.
  - Always clean up last section margin: `.section-container:last-child { margin-bottom: 0; }`.

---

## 6. CLI Commands & Automation Cheatsheet

A top-level [`Makefile`](file:///Users/aji/Projects/aipedia.id/Makefile) acts as the **single official entrypoint** for all actions, organized by domain namespaces:

```bash
# 📖 General
make help                    # Display command matrix and descriptions

# 🌐 Web App (web-*)
make web-dev                 # Start Astro dev server on http://localhost:4321
make web-build               # Build Cloudflare Worker production bundle
make web-preview             # Preview production build locally
make web-clean               # Clean dist/, .astro/, and Vite caches

# 🧪 Testing (test-*)
make test                    # Run all 34 Vitest unit tests (alias: make test-run)
make test-watch              # Run tests in interactive watch mode
make test-file FILE=<path>   # Run single test (e.g. make test-file FILE=test/checkout.test.ts)

# ⚙️ Operations & SSOT (ops-*)
make ops-sync                # Full sync: assistants.json -> web characters, prompts, guides
make ops-sync-web            # Sync only characters.json for Astro web UI
make ops-icons               # Compress specialist avatars into public/character/
make ops-prompts             # Generate AI visual prompts for all 17 specialists
make ops-build               # Compile PDF delivery guides and packaged ZIPs
make ops-content             # Generate social media carousel slides & captions

# 🗄️ Database & Drizzle (db-*)
make db-generate             # Generate SQL migrations from db/schema.ts
make db-push                 # Push schema changes to PostgreSQL
make db-studio               # Open local Drizzle Studio database GUI

# ⚡ Fast Shortcuts
make dev                     # Alias for 'make web-dev'
make build                   # Alias for 'make web-build'
make sync                    # Alias for 'make ops-sync'
make clean                   # Alias for 'make web-clean'
```

### Direct CLI Commands (Under the Hood)
```bash
# Start local dev server (http://localhost:4321)
yarn dev

# Run unit tests (access control, auth, checkout, webhook)
yarn test

# Build production bundle
yarn build
```

### Operations & Product Automation (`ops/scripts/manager.py`)
```bash
# 1. Sync master assistants.json across the entire codebase:
python3 ops/scripts/manager.py generate-all

# 2. Sync only characters.json for Astro web UI:
python3 ops/scripts/manager.py sync-web

# 3. Generate image prompts for all specialists:
python3 ops/scripts/manager.py generate-visual-prompts

# 4. Optimize raw icons from _docs/assets/raw_icons/ into public/character/:
python3 ops/scripts/manager.py compress-icons
```

### Packaging & Customer Deliverables
```bash
# Build customer delivery packages (PDFs and ZIPs):
python3 ops/scripts/builder.py all

# Run bash packaging pipeline:
bash ops/products/build.sh
```

---

## 7. Product Ecosystem & Resource Taxonomy

AIPEDIA offers a multi-dimensional catalog designed for both single purchases and all-access membership:

### A. Resource Library Taxonomy (`src/data/resources.ts`)
Items in the digital resource library are classified into primary categories:
- `llm-prompt` — Text prompts for ChatGPT/Claude/Gemini with step-by-step implementation instructions.
- `visual-prompt` — Image generation prompts (Midjourney, DALL-E) with parameter settings and style recipes.
- `custom-ai` / `skill-agent` — Specialized AI agents, CustomGPT instructions, and Codex/Claude skills.
- `tutorial` — Practical execution guides, video walkthroughs, and setup tutorials.
- `founder-space` — High-level business strategy frameworks, SOPs, and financial models.
- `course` — Structured multi-module courses (e.g. *AI for Beginners*).
- `resource` — General curated assets, swipe files, and downloadable presets.

### B. Commercial Products & Bundles (`src/data/catalog.ts`)
- **Single Products:** Targeted prompt packs (e.g., *Starter Pack Prompt Bisnis & UMKM*, *Copywriting & Social Media Engine*, *Visual & Branding Creator Pack*).
- **Bundles:**
  - `bundle-all-access` — Flagship bundle granting full lifetime access to all 17 specialists, prompt libraries, and future additions.
  - `bundle-starter` — Entry-level bundle containing essential prompts and guides for beginner entrepreneurs.

### C. The 17 AI Specialists Roster (`_docs/database/assistants.json`)
The 17 departmental AI Employees are categorized into 5 operational tiers:

| Tier | Focus | Specialists | Core Value Proposition |
|---|---|---|---|
| **Tier 1: Core Engine** | Acquisition & Conversion | **Mita** (Meta Ads), **Wita** (Copywriting), **Gita** (Visual Ads), **Wilo** (Website LP), **Sona** (Social Media) | Directly lowers CAC and drives customer acquisition. |
| **Tier 2: Pain Points** | Universal MSME Need | **Fina** (Finance & Cashflow), **Wanda** (WhatsApp Closing), **Tira** (Pajak UMKM / Tax) | Concrete daily problems with immediate ROI. |
| **Tier 3: Supporting** | Niche Business Ops | **Loka** (Marketplace E-commerce), **Dany** (Data Analytics), **Hima** (Local SEO & Maps) | High value for specific verticals. |
| **Tier 4: Growth** | Strategy & Retention | **Beny** (Business Strategy), **Selo** (Organic SEO), **Cisa** (Customer Relations) | Medium-to-long term compounding growth. |
| **Tier 5: Specialized** | Content Formats | **Viko** (Short Video Scripts), **Lila** (Live Selling Script), **Prima** (SOP & Operations) | Targeted media creation. |

---

## 8. Agent Operating Rules & Token Economy Best Practices

1. **Rule of File Independence:**
   - **Do not crawl or read every file in `src/` or `_docs/`.**
   - Look up the specific path in this `INDEX.md`, then read only the targeted lines using `read_file(StartLine, EndLine)`.
2. **Language Rule:**
   - All code, comments, commit messages, and documentation outside `_docs/` and `ops/` **must be written in English**.
   - Indonesian is reserved for `_docs/` (business strategies), `ops/` (customer deliverables), and end-user marketing strings.
3. **No Unprompted Git Commits:**
   - Always leave changes in the working tree uncommitted unless the user explicitly commands a commit.
4. **Token Conservation:**
   - When referencing design tokens, consult `src/styles/tokens.css`.
   - When modifying specialist metadata, consult `_docs/database/assistants.json`.
   - When investigating image assets, consult `_docs/notes/image-assets.md`.

