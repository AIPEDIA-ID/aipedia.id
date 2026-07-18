# AIPEDIA Strategy Log

> This document captures **why** we make certain decisions, not **what** the product currently is (see `SUMMARY.md` for that). Update this file whenever a major strategic decision is made, validated, or reversed.

---

## 1. Core Commitment

- The domain **aipedia.id** and the mission - "AI solutions for Indonesian businesses" - is a **long-term commitment (5-year horizon)**. This does not change.
- What *can* change: the product form, the target vertical, the packaging. We are stubborn on the mission, flexible on execution.
- Reason: avoid shiny object syndrome from repeatedly switching to entirely new domains/ideas. Instead, iterate within one durable brand.

---

## 2. Business Model (Simplified)

We operate on exactly **two pillars**. Anything that doesn't fall into one of these two is out of scope until proven necessary.

| Pillar | Scope |
|---|---|
| **1. Product R&D** | Market research, specialist development (`assistants.json`), asset generation, quality evaluation |
| **2. Ads & Campaign** | Content creation, campaign setup (incl. landing pages), budgeting, optimization, analysis |

Distribution channel: **Meta Ads only**. Product type: **digital products only**. No other sales channels or business lines unless explicitly decided here.

---

## 3. AIPEDIA Factory Loop v2.0 (The Strategy)

We have pivoted from running Meta Ads for the generic bundle to a **Single Product Launch & Backend Bundle Strategy**.

### The Pipeline (Risk Managed, High Reward)

**1. [IDEATION 30m]**
- Filter criteria: Is there a generic enemy? Is there a panic keyword (e.g., Coretax/Denda)? Is it a 1-hour recurring problem?
- **FAIL** -> [TRASH] -> Back to IDEATION
- **PASS** -> Move to BUILD

**2. [BUILD 60m] - Factory**
- **Template Setup**: e.g., Hero > Problem > Comparison WAJIB > Capability > Pricing (e.g. 87k vs 128k)
- **Output**: Update `assistants.json` + Landing page
- Move to LAUNCH

**3. [LAUNCH 15m] - Sniper**
- 1 Campaign per product / 1 Adset Broad / 2 Videos (testing angles like Denda vs Coretax)
- Budget: Rp50k/day

**4. [MONITOR 72 Jam]**
- **CTR < 0.8%** = Change Hook
- **CPA > 95k** = KILL (Max Loss Rp200k)
- **CPA < 65k** = SCALE
- **KILL** -> [BANK SAMPAH] -> Back to IDEATION
- **SCALE** -> Move to BANK

**5. [BANK] - Vault Assets & Backend**
- Every buyer -> Track with Pixel + Google Sheet + Email
- **Friday Email Blast**: "You have [Specialist], here is the rest of the gang (Bundle Offer)"
- **Goal**: Frontend profit (Sniper) + Backend profit (Bank) = Maximum LTV.

---

## 4. Pivot & Optimization Criteria

- **Frontend Strategy**: Meta Ads are now optimized for single, highly specific specialist products.
- **Backend Strategy**: The 17-specialist generic bundle is primarily sold via email marketing as a follow-up offer to individual buyers.
- **Max Loss**: Strictly limit loss to Rp200k per product launch. Kill fast, scale fast.

---

## 5. Ownership Mapping

| Question / Problem | Owner Document |
|---|---|
| "What is AIPEDIA today?" | `SUMMARY.md` |
| "Why did we decide X?" / "What are we testing now?" | `strategy.md` (this file) |
| Product quality, specialist development issues | `_docs/task/product.md` |
| Ads performance, campaign, landing page issues | `_docs/task/marketing.md` |
| Website/UI changes | `_docs/task/website.md` (executed as sub-tasks triggered by marketing needs) |

---

## 6. Decision Log

> Add a new entry every time a significant strategic call is made.

- **[Date]** - Decided to simplify business model to 2 pillars (Product R&D + Ads & Campaign), removing ambiguity around other operational activities.
- **[Date]** - Committed to long-term (5-year) ownership of aipedia.id domain regardless of individual product outcomes.
