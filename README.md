# AIPEDIA

AIPEDIA is a product generation engine and marketing frontend for productized AI CustomGPTs. It is built using AstroJS and Tailwind CSS.

## Project Structure

This repository contains both the web frontend and the product delivery pipeline.

- `src/` & `public/` - The AstroJS frontend application (Landing Page).
- `products/` - The generated deliverables (PDFs, ZIPs) and the build scripts.
- `.docs/` - Internal knowledge base, detailed documentation, and system prompts.
- `scripts/` - Python automation scripts for generating assets and configurations.

## Single Source of Truth

The core data for all AI assistants (names, roles, pricing, etc.) is centrally managed in:
**`📍 .docs/database/assistants.json`**

This JSON file drives the Astro UI, PDF generation, and internal prompts. **Do not hardcode character details in components.**

## Development Setup

### Requirements
- Node.js (v18+)
- Python 3 (for automation scripts)
- Make

### Running Locally

```bash
# Install dependencies
yarn install

# Start the Astro development server
yarn dev
```

## Core Workflows

We use `make` commands to automate the generation of products and assets.

- `make project-status` - Check the synchronization status of assets and prompts.
- `make project-generate-all` - Sync the web data, markdown, and internal prompts based on the JSON database.
- `make project-visual-prompt` - Generate text prompts for creating character images.
- `make project-compress` - Compress raw icons and move them to the public web folder.
- `make build-products` - Build the final PDF and ZIP deliverables for customers.

For more detailed documentation on adding new assistants, product architecture, or business strategies, please refer to [`.docs/SUMMARY.md`](.docs/SUMMARY.md).
