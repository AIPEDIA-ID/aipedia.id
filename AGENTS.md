# Agent Rules & Guidelines (aipedia.id)

## 1. Architecture Separation
- **Web App**: Root files, `src/`, `resources/`, `db/`, `public/`.
- **Business SSOT**: `_docs/` is the sole Single Source of Truth for strategy, marketing, and the database (`database/assistants.json`).
- **Operations & Manufacturing**: `ops/` centralizes product packaging, build scripts, and the content generator.

## 2. Language Convention
- **Mandatory English**: All code, code comments, docstrings, variable/type naming, developer docs, and tests located **outside** of `_docs/` and `ops/` **must be written in English**.
- **Indonesian Allowed**:
  - `_docs/`: Business strategies, market research, and task tracking for the Indonesian market.
  - `ops/`: Customer deliverables for Indonesian buyers (CustomGPT instructions, buyer guides) and marketing content generators for Indonesian social media.
  - User-facing UI copy on `aipedia.id` meant for Indonesian visitors.

## 3. Architecture & Knowledge Index
- For the complete project map, directory purposes, Apple HIG design tokens, and CLI automation commands, refer to `.agents/INDEX.md`.

