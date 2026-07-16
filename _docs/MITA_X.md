# PRD — Mita-X

Version: 1.0

---

# Product

Name:
Mita-X

Brand:
AIPEDIA

Landing Page:
https://aipedia.id/mita

Category:
AI Specialist

---

# Vision

Build the best AI Meta Ads Consultant for Indonesian businesses.

Mita-X helps business owners diagnose Meta Ads campaigns,
identify bottlenecks,
evaluate landing pages,
and improve conversion using practical frameworks.

---

# Target Market

Primary

- Indonesian SMEs
- Indonesian Digital Marketers
- Agency
- Freelancer

Secondary

- Startup Founder
- Content Creator

---

# Supported Language

Default Output

Bahasa Indonesia

Prompt Language

English

Knowledge Language

Bahasa Indonesia + English

Reason

- English prompt produces more reliable instruction following.
- Indonesian knowledge provides local context.
- Users interact naturally in Indonesian.

---

# Product Structure

You have to build this product inside `products/mita-x/`

products/mita-x/
├── customgpt/
│   ├── NAME.md
│   ├── DESCRIPTION.md
│   ├── PROMPT.md
│   └── knowledge/*
│
├── claude-plugin/ # Please follow format Claude plugin which have several Skills?
│
└── codex-plugin/ # Please follow format Claude plugin which have several Skills?

==================================================
CUSTOM GPT
==================================================

Required Assets

- Name
- Description
- Prompt
- Knowledge

Knowledge/

- philosophy.md
- metrics.md
- creative.md
- funnel.md
- landing-page.md
- offer.md
- scaling.md
- checklist.md
- examples.md
- glossary.md
- references.md

==================================================
KNOWLEDGE PRINCIPLES
==================================================

Knowledge should NOT become documentation.

Knowledge should become:

- decision framework

- practical examples

- checklist

- evaluation rules

- Indonesian best practices

Every knowledge file must answer:

"What decision should the AI make using this file?"

instead of

"What information does this file contain?"

==================================================
CLAUDE SKILLS
==================================================

Purpose

Task-specific workflows.

Each Skill solves ONE problem only.

Example

Audit Campaign

Landing Page Review

Offer Evaluation

Creative Evaluation

Scaling Decision

Weekly Performance Review

==================================================
GEMINI GEM
==================================================

Purpose

Generate high-converting visual concepts.

Output

- Design Brief
- Image Prompt
- Visual Direction
- Layout
- CTA Placement

==================================================
CODEX PLUGIN
==================================================

Purpose

Developer workflow.

Generate

- Markdown Audit Report

- Campaign Checklist

- Landing Page Report

- Creative Report

==================================================
WEBSITE
==================================================

Path

aipedia.id/mita

Purpose

Sell Mita-X

NOT sell AIPEDIA.

AIPEDIA becomes the ecosystem.

==================================================
CORE PRINCIPLE
==================================================

Mita never guesses.

Mita diagnoses first.

Every recommendation must be backed by metrics,
framework,
or best practice.

No hype.

No fake certainty.

No vanity metrics.

Only actionable recommendations.

==================================================
SUCCESS

User should be able to:

✓ Understand why campaigns fail.

✓ Identify bottlenecks.

✓ Read Meta Ads metrics.

✓ Improve landing pages.

✓ Create action plans.

✓ Think like a Media Buyer.
