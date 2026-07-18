# AIPEDIA Project Summary

> **Single Source of Truth (SSOT)** for AIPEDIA - a business focused on delivering productized AI CustomGPTs to Indonesian businesses.

---

## 1. Executive Summary

**AIPEDIA** is a digital product business offering a bundle of specialized AI Specialists (CustomGPTs). Instead of selling a generic ChatGPT subscription, AIPEDIA provides pre-trained, ready-to-use AI specialists focused on solving specific problems for Bisnis Indonesia.

Website: https://aipedia.id

**Business Model:**
- **Basic Offer**: CustomGPT access.
- **Pro Offer**: CustomGPT access + AI Agents Plugins/Skills.
- **Goal**: Fast profit generation, optimized for Meta Ads conversion.

### Directory Structure (Business & Product Context)

```text
aipedia.id/
├── _docs/                        # 🧠 Business & Operations Brain
│   ├── database/               
│   │   └── assistants.json       # 📍 Single Source of Truth (SSOT)
│   ├── assets/                   # Raw assets & vendor icons
│   ├── task/                     # Live operational tasks (product, marketing, website)
│   ├── evaluation/               # Quality acceptance scenarios & testing
│   ├── REFERENCES.md             # External references & learning materials
│   ├── strategy.md               # Business strategy & decision logs
│   ├── SUMMARY.md                # Business executive summary & ecosystem
│
├── products/                     # 📦 Customer Deliverables & Packaging
│   ├── mita-x/                   # Mita specific extended skills and prompts (-x means special)
│   ├── codex-plugin-marketplace/ # Plugin registry & skills (Pro tier)
│   ├── customgpt/                # Generated CustomGPT Instructions
│   ├── delivery/                 # Final ZIP packages ready for distribution
│   ├── guide/                    # PDF markdown sources (ASISTANT, GUIDE_Basic, GUIDE_Pro)
│   ├── prompts/                  # Generated system prompts & settings
│   └── build.sh                  # PDF compilation & packaging automation
│
└── scripts/                      # ⚙️ Business Logic Automation
    ├── manager.py                # SSOT parser, generator, & icon compressor
    ├── reorder_assistants.py     # Utility to reorder assistants in JSON
    └── character_image_prompts.txt # Auto-generated visual prompts for Midjourney/DALL-E
```
---

## 2. Product Ecosystem

The core value lies in the **17 AI Specialists**, categorized into two main domains:

### 🥇 Tier 1 - Core Engine (Acquisition & Conversion)
*Directly impacts CAC and conversion. This is the lifeblood of the business.*
- **Mita** - Meta Ads & Funnel Specialist (Single acquisition channel)
- **Wita** - Copywriting & Content Specialist (Angles/hooks for ads & LP)
- **Gita** - Visual Ads & Design Specialist (Combats creative fatigue)
- **Wilo** - Website Specialist (Landing page technical execution)
- **Sona** - Social Media Content Specialist

### 🥈 Tier 2 - Universal Pain Points (Easy to Sell)
*Clear, concrete value for the majority of MSMEs.*
- **Fina** - Finance Specialist (Cash flow is the #1 pain point)
- **Wanda** - WhatsApp Business Specialist (Majority of sales close via WA)
- **Tira** - Pajak UMKM Specialist (Real seasonal pain point)

### 🥉 Tier 3 - Supporting/Niche (Still Sells)
*Relevant but requires clear differentiation or targets specific verticals.*
- **Loka** - Marketplace Specialist (Relevant for E-commerce vertical)
- **Dany** - Data Analyst Specialist (Abstract value for MSMEs)
- **Hima** - Local SEO Specialist (Too niche, overlaps with Selo)

### ⚠️ Tier 4 - Hard to Demonstrate (Abstract Value)
*Value proposition is abstract or takes too long to show results.*
- **Beny** - Business Strategist (Abstract strategy, hard to prove in ads)
- **Selo** - SEO Specialist (Slow results, clashes with instant buyers)
- **Cisa** - Customer Relationship Specialist (Abstract value)

### ⬇️ Tier 5 - Low Priority (Narrow Audience)
*Very specific niches, not the majority of the target market.*
- **Viko** - Video Script Writer Specialist (Content creators only)
- **Lila** - Live Selling Specialist (Live commerce only)
- **Prima** - Operations & SOP Specialist (Corporate-sounding)

---

## 3. Project Architecture

This project is not just a standard web application; it is a full **Product Generation Engine** combined with a **Marketing Frontend**.

### A. Frontend (AstroJS)
- Located in `src/`, `public/`.
- Built with Astro and Tailwind CSS.
- **Purpose**: Serve as the high-converting landing page for cold traffic and retargeting ads.
- **Data Driven**: The UI consumes JSON data generated directly from the central database.

### B. Product Deliverables (`products/`)
- Contains the final assets delivered to customers:
    - **PDF Guides** (`products/guide/ASISTANT.md`, `GUIDE_Basic.md`, `GUIDE_Pro.md`)
    - **Skills** (`products/codex-plugin-marketplace/`, `products/mita-x/`)
    - **Delivery Packages** (`products/delivery/`)
- Managed by `products/build.sh` which compiles Markdown into PDFs using Puppeteer and zips the final product packages.

### C. Documentation & Prompts (`_docs/`)
- **Internal Knowledge**: Business summary (`SUMMARY.md`) and external references (`REFERENCES.md`).
- **Task Management**: Modular task tracking for product, marketing, and website (`tasks/`).
- **Evaluations**: Acceptance scenarios and quality testing guidelines (`evaluations/`).
- **Prompt Library**: System prompts (`prompts/system/`) and Character image prompts.

---

## 4. Single Source of Truth: `assistants.json`

The entire project revolves around one central database:
**`📍 _docs/database/assistants.json`**

Whenever a new specialist is added or modified in this JSON file, it automatically propagates to:
1. **The Website**: Automatically updates the Astro UI.
2. **The Deliverables**: Automatically injects into the PDF generation (`products/guide/ASISTANT.md`) and settings in `products/customgpt/` & `products/prompts/`.
3. **Internal Tools**: Updates system prompts and image generation prompts.

*Never hardcode character details in the Astro components or Markdown files. Always update the JSON.*

---

## 5. Core Workflows (SOPs)

### Adding a New Specialist
1. **Update SSOT**: Add the specialist's data block (ID, Name, Role, Color, Prompts) into `_docs/database/assistants.json`.
2. **Generate System Updates**: 
   Run `make project-generate-all` to sync the Web data, Product Markdown (`products/guide/ASISTANT.md`), and Internal Prompts.
3. **Generate & Prepare Assets**:
   - Run `make project-visual-prompt` to generate the Midjourney/DALL-E prompt.
   - Generate the image, remove background, and save as `[id].png` in `_docs/assets/raw_icons/`.
   - Run `make project-compress` to optimize and move the icon to the `public/` directory.
4. **Build Product Deliverables**:
   - Run `make build-products` to compile the PDFs and ZIP packages for customer delivery.

---

## 6. Task Management (Source of Truth for Agents)

All operational tasks for AI Agents and human developers are modularized inside the `_docs/task/` directory. This acts as the *Source of Truth* for what needs to be done.

### Task Format
We use Markdown checkboxes to track progress:
- `- [ ]` Uncompleted tasks.
- `- [/]` In progress tasks (Agent or Me is currently working on this).
- `- [x]` Completed tasks.

*Agents SHOULD update these checkboxes whenever they start or finish a task.*

### Task Categories
1. **`_docs/task/product.md`**: Tasks related to AI Specialists, Codex/Claude Plugins, Prompt engineering, and PDF/ZIP generation.
2. **`_docs/task/website.md`**: Tasks related to AstroJS frontend, UI/UX changes, components, and SEO optimizations.
3. **`_docs/task/marketing.md`**: Tasks related to Meta Ads, analytics, copywriting strategies, and ad creatives.

---

## 7. Marketing Strategy

**1. Frontend Acquisition (Sniper)**
- **Meta Ads** is the primary acquisition channel. 
- Campaigns are run **per single product** (e.g., one campaign for TIRA) using a broad adset to test specific hooks (e.g., Coretax vs Denda).
- All frontend development and creatives must be aggressively optimized for single-product Meta Ads conversion. 

**2. Backend Monetization (Bank)**
- After acquiring a buyer for a single product, we capture their Pixel, Google Sheet record, and Email.
- **Email Marketing** is used to follow up and sell the full **AIPEDIA Bundle**.
- Refer to `_docs/strategy.md` for the detailed "Factory Loop v2.0" metrics and pipeline.

---

## 8. Brand & Design Guidelines (Global)

Since AIPEDIA is a premium digital product, the visual identity across **all touchpoints** (Website, Meta Ads creatives, Social Media, and PDF Deliverables) must convey trust, modern technology, and high value. We use a **Dark Mode First** approach, relying strictly on our core brand colors: **Purple (Ungu)** and **Black (Hitam)**.

### Color Palette
- **Primary / Brand Color**: **Premium Purple / Violet (`#8b5cf6` / Tailwind `primary-500`)** - Represents AI intelligence, premium quality, and authority. This is our core brand color used for accents, text highlights, and brand identity.
- **Background**: **Deep Black / Dark Neutral (`#000000` / `#020617` / Tailwind `neutral-950`)** - A clean, sleek, and high-contrast backdrop that keeps the user focused and makes our purple brand elements pop.
- **Surface / Cards**: **Glassmorphism** - Frosted glass effect on dark backgrounds. In Tailwind: `bg-white/5 backdrop-blur-md border border-white/10`.
- **Text Colors**: 
  - **Headings**: Crisp White (`#fafafa` / `text-zinc-50`).
  - **Body Text**: High-contrast light gray (`#d4d4d8` / `text-zinc-300`). *Crucial Rule: Avoid using text that is too dark/faded to ensure readability across all screens.*

### Typography
- Use modern, clean sans-serif fonts like **Inter**, **Plus Jakarta Sans**, or **Outfit** to give it a tech startup vibe.
- Maintain strong hierarchy: Bold/ExtraBold for headings (to grab attention in ads and web), Regular/Medium for highly readable body paragraphs.

### UI & Visual Effects (Web & Ads)
- **Gradients**: Use subtle purple gradients for text highlights or background accents (e.g., Purple-400 to Purple-600 gradients).
- **Glow Effects**: Utilize soft purple glow shadows to emphasize key elements (like product mockups in ads or active states).
- **Interactions (Web)**: Smooth micro-animations (`hover:scale-105`, `transition-all duration-300`) to make the interface feel responsive and alive.
