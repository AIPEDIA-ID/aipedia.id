# AIPEDIA Project Summary

> **Single Source of Truth (SSOT)** for AIPEDIA — a business focused on delivering productized AI CustomGPTs to Indonesian businesses.

---

## 1. Executive Summary

**AIPEDIA** is a digital product business offering a bundle of specialized AI Specialists (CustomGPTs). Instead of selling a generic ChatGPT subscription, AIPEDIA provides pre-trained, ready-to-use AI specialists focused on solving specific business and marketing problems for Indonesian MSMEs, Solopreneurs, and Creators.

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
│   ├── SUMMARY.md                # Business executive summary & ecosystem
│
├── products/                     # 📦 Customer Deliverables & Packaging
│   ├── codex-plugin-marketplace/ # Plugin registry & skills (Pro tier)
│   ├── delivery/                 # Final ZIP packages ready for distribution
│   ├── ASISTANT.md               # Auto-generated product catalog
│   ├── GUIDE_Basic.md            # Customer onboarding guide (Basic)
│   ├── GUIDE_Pro.md              # Customer onboarding guide (Pro)
│   └── build.sh                  # PDF compilation & packaging automation
│
└── scripts/                      # ⚙️ Business Logic Automation
    ├── manager.py                # SSOT parser, generator, & icon compressor
    └── character_image_prompts.txt # Auto-generated visual prompts for Midjourney/DALL-E

---

## 2. Product Ecosystem

The core value lies in the **17 AI Specialists**, categorized into two main domains:

### 🏢 Business & Operations
- **Beny** — Business Strategist
- **Fina** — Finance Specialist
- **Cisa** — Customer Relationship Specialist
- **Dany** — Data Analyst Specialist
- **Hima** — HR Specialist
- **Wilo** — Website Specialist
- **Prima** — Operations & SOP Specialist
- **Tira** — Pajak UMKM Specialist

### 📈 Marketing
- **Sona** — Social Media Content Specialist
- **Viko** — Video Script Writer Specialist
- **Wita** — Copywriting & Content Specialist
- **Mita** — Meta Ads Specialist
- **Selo** — SEO Specialist
- **Gita** — Visual Ads & Design Specialist
- **Wanda** — WhatsApp Business Specialist
- **Loka** — Marketplace Specialist
- **Lila** — Live Selling Specialist

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
    - **PDF Guides** (`ASISTANT.md`, `GUIDE_Basic.md`, `GUIDE_Pro.md`)
    - **Skills** (`products/skills/`)
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
2. **The Deliverables**: Automatically injects into the PDF generation (`products/ASISTANT.md`).
3. **Internal Tools**: Updates system prompts and image generation prompts.

*Never hardcode character details in the Astro components or Markdown files. Always update the JSON.*

---

## 5. Core Workflows (SOPs)

### Adding a New Specialist
1. **Update SSOT**: Add the specialist's data block (ID, Name, Role, Color, Prompts) into `_docs/database/assistants.json`.
2. **Generate System Updates**: 
   Run `make project-generate-all` to sync the Web data, Product Markdown (`ASISTANT.md`), and Internal Prompts.
3. **Generate & Prepare Assets**:
   - Run `make project-visual-prompt` to generate the Midjourney/DALL-E prompt.
   - Generate the image, remove background, and save as `[id].png` in `_docs/assets/raw_icons/`.
   - Run `make project-compress` to optimize and move the icon to the `public/` directory.
4. **Build Product Deliverables**:
   - Run `make build-products` to compile the PDFs and ZIP packages for customer delivery.
