---
name: Build Campaign Landing Page
description: Use this skill to design, build, or modify an Astro frontend landing page (campaign page or specialist page).
---

# Instructions

When asked to build or modify a landing page for a campaign or a specialist in the Astro frontend, you MUST adhere to the project's strict Design System and UI/UX rules.

1. **Read the Rules**: 
   - Read `references/specialist.md` to understand data-driven rendering (frontmatter loops), copywriting rules, and standardized page structures.
   - Read `references/single_campaign.md` to understand styling rules (typography, glassmorphism, responsive grid layouts).
   - Read `.agents/rules/styles.md` for global styling tokens and tailwind classes.
2. **Read the Database**: Fetch character themes, prices, and features from `_docs/database/assistants.json` or `src/data/*.json`. DO NOT hardcode text in HTML.
3. **Implement**: Write or modify the `.astro` components following the premium aesthetic guidelines (gradients, hover states, micro-animations).
