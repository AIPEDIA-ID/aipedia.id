# Codex Plugin Engineering Rules

> **Scope**: Rules for creating and modifying the `.md` skills consumed by the Codex Plugin ecosystem.

## 1. Directory Structure
- All Codex Plugin skills live in `products/codex-plugin-marketplace/plugins/aipedia-specialists/skills/<specialist_name>/SKILL.md`.
- Supporting knowledge base files must be stored in `products/codex-plugin-marketplace/plugins/aipedia-specialists/skills/<specialist_name>/references/`. Note the plural `references`.

## 2. YAML Frontmatter (MANDATORY)
Every `SKILL.md` must begin with YAML frontmatter containing:
- `name`: e.g., `mita-meta-ads`
- `description`: A concise summary of the skill's capabilities.
*Example:*
```yaml
---
name: hima-local-seo
description: Design Local SEO strategies and optimize Google Business Profiles for Indonesian SMEs.
---
```

## 3. Content Style & Language
- Keep it significantly more concise than CustomGPT prompts.
- Omit complex "Superior Reasoning" and "Interaction Mode" templates unless absolutely necessary.
- Instruct the AI to respond in **Bahasa Indonesia** directly in the first paragraph.
- Focus strictly on the core tasks and actionable steps.

## 4. Reference Linking
- Explicitly instruct the AI to read the reference files.
- Use standard markdown links pointing directly to the `references/` directory.
- *Format:* `- Read [filename.md](references/filename.md) when providing tactics on X.`
