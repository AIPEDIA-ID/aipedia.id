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

## 3. Vertical Validation Log

Current hypothesis: if the generic 17-specialist bundle underperforms, narrow into vertical-specific packs instead of abandoning the domain.

| Vertical | Status | Notes | Date |
|---|---|---|---|
| Generic Bundle (Basic/Pro, 17 specialists) | Active / Testing | Original offer, optimized for Meta Ads conversion | - |
| AIPEDIA for Creator | Not started | Candidate for next test if generic bundle underperforms | - |
| AIPEDIA for F&B | Not started | Candidate - recommended to test ONE vertical at a time before expanding | - |
| AIPEDIA for E-commerce | Not started | Candidate | - |

**Rule:** Only one new vertical is tested at a time. Do not run multiple vertical experiments in parallel - this creates the same focus-diluting effect as switching entire products.

---

## 4. Pivot Criteria (Objective, Not Emotional)

| Metric | Threshold | Rationale |
|---|---|---|
| Max CAC (Basic, Rp118rb) | ≤ Rp50rb | Biar margin masih sehat setelah fee myr.id + residual cost |
| Max CAC (Pro, Rp239rb) | ≤ Rp90rb | Sama, proporsional ke harga |
| Min Landing Page Conversion | ≥ 1.5% (visitor→checkout) | Standar kasar cold traffic Meta Ads produk digital SEA |
| Min ROAS (breakeven) | ≥ 1.3x | HPP digital nyaris 0, tapi ads spend + fee harus balik dulu |
| Evaluation period | Rp1.5jt spend PER pairing, min 7 hari | Biar bukan noise dari sample kecil |
| Total test budget sebelum keputusan | Rp2jt (sesuai capital lo) | Kalau abis dan belum ada satupun pairing nembus threshold → itu sinyal pivot ke vertical baru |

**Keputusan otomatis:**
- Kalau ada 1 pairing yang tembus semua threshold → scale itu, matikan yang lain.
- Kalau Rp2jt habis dan TIDAK ADA yang tembus → itu bukan "gagal", itu sinyal pivot ke 1 vertical test (sesuai section 3), bukan ganti brand.

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
