# Main Architectural Rules & Pipeline

> **Scope**: Universal rules for Aipedia AI Agents regarding data flow, source of truth, and project architecture.

## 1. Single Source of Truth (SSOT)
- **Rule**: ALL AI Specialist data (name, role, description, price, theme color, prompt strings, etc.) MUST **ONLY** be modified in `_docs/database/assistants.json`.
- **Constraint**: **STRICTLY PROHIBITED** to hardcode data or copy text inside Astro components (`src/components/`) or product Markdown files (`products/ASISTANT.md`).

## 2. Automation Pipeline
Whenever you modify an AI Specialist in the SSOT, you **MUST** run the pipeline to sync data:
- Run `make generate-all` via terminal. 
- This resolves and distributes the SSOT JSON into web JSON files (`src/data/*.json`), Product Markdown, and Internal Prompts.

## 3. Directory Discipline
- `src/` & `public/`: AstroJS Landing Page (Frontend).
- `products/`: Final PDF & ZIP deliverables, plus Codex Plugins and CustomGPT data.
- `_docs/`: Internal knowledge, task management (`tasks/`), SSOT Database.
- `scripts/`: Python automation & build generators.

## 4. Task Management
- Before starting work on new features, check for pending tasks in `_docs/tasks/`.
- Maintain modularity and verify quality against scenarios in `_docs/evaluations/aipedia-scenarios.md`.
