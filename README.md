# AIPEDIA

AIPEDIA is a product generation engine and marketing frontend for productized AI CustomGPTs. It is built using AstroJS and Tailwind CSS.

## Project Structure

This repository contains both the web frontend and the product delivery pipeline.

- `src/` & `public/` - The AstroJS frontend application (Landing Page).
- `products/` - The generated deliverables (PDFs, ZIPs) and the build scripts.
  - `products/delivery/` - **The final products ready to be distributed to customers.** This is where the generated `.zip` files (Basic and Pro bundles) are outputted.
  - `products/skills/` - The raw markdown files and plugins for the Pro bundle.
- `_docs/` - Internal knowledge base, detailed documentation, and system prompts.
- `scripts/` - Python automation scripts for generating assets and configurations.

## Single Source of Truth

The core data for all AI assistants (names, roles, pricing, etc.) is centrally managed in:
**`📍 _docs/database/assistants.json`**

This JSON file drives the Astro UI, PDF generation, and internal prompts. **Do not hardcode character details in components.**

## Development Setup

### Requirements
- Node.js (v18+)
- Python 3 (for automation scripts)
- Make (for running build pipelines)
- Puppeteer (installed automatically via build scripts, used for PDF generation)

### Running Locally

```bash
# Install dependencies
yarn install

# Start the Astro development server
yarn dev
```

## How to Use This Project

This project operates as an automated pipeline. Whenever you need to add a new AI Specialist or update an existing one, follow this workflow:

### 1. Update the Database
Always start by modifying `_docs/database/assistants.json`. This is the only place you should manually type out copy, roles, and pricing.

### 2. Sync the System
Run the synchronization command to push your JSON changes into the Astro frontend, product markdown files, and internal prompts.
```bash
make project-generate-all
```

### 3. Generate & Optimize Assets
If you added a new assistant, you need a character image:
1. Run `make project-visual-prompt` to get the Midjourney/DALL-E prompt.
2. Generate the image and place the raw transparent PNG in `_docs/assets/raw_icons/`.
3. Compress and move it to the public folder by running:
```bash
make project-compress
```
*(You can verify if all assets are present and synced by running `make project-status`)*

### 4. Build the Deliverables
Once the data and assets are synced, compile the final products for your customers.
```bash
make build-products
```
This script will use Puppeteer to convert the Markdown guides into PDFs and package them into ZIP files alongside the skills. 
**You can find the ready-to-distribute `.zip` packages in `products/delivery/basic/` and `products/delivery/pro/`.**

### Install the Codex Plugin Manually

The Pro package also includes `codex-plugin-marketplace/`: a local Codex marketplace containing one `aipedia-specialists` plugin. It bundles the router and all AIPEDIA specialist skills, including their references and scripts.

After extracting the Pro ZIP, run these commands from a terminal (replace the path with the extracted folder):

```bash
codex plugin marketplace add /absolute/path/to/codex-plugin-marketplace
codex plugin add aipedia-specialists@aipedia
```

Start a new Codex task after installation so Codex loads the newly installed skills. To update an existing installation, rebuild/extract the package, then reinstall the same plugin command.

---

For more detailed documentation on business strategies, prompt engineering, or architecture, please refer to [`_docs/SUMMARY.md`](_docs/SUMMARY.md).
