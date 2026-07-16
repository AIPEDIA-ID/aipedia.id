# Scaling — Budget Rules, Learning Phase & Scale Decision Framework

## Decision Rule
Use this file when: (1) user asks whether/how to scale, (2) ROAS is profitable and user wants to grow.
Never recommend scaling before these conditions are met:
- CPA is at or below break-even.
- At least 15–20 conversion events in the past 7 days.
- Frequency < 3 (for cold audience).
- LP CVR is stable (not declining).

## The Learning Phase (Critical to Understand)

Meta's algorithm needs data to exit "learning" mode:
- **Entry trigger**: Any significant change to active ad sets (new ad, budget change > 30%, targeting edit, bid strategy change).
- **Exit condition**: ~50 optimization events (purchases/leads) within 7 days.
- **During learning**: Performance is unstable. Do NOT evaluate or make changes.
- **If learning is stuck**: Budget may be too low, audience too small, or conversion event too rare. Consider switching to a higher-funnel objective.

## Budget Scaling Rules

| Action | Rule | Reason |
|---|---|---|
| Scale up | Max 20–30% increase per 2–3 days | Larger jumps reset learning phase |
| Scale up quickly | Duplicate winning ad set with new budget | Preserves original, tests at new budget |
| Scale audience | Lookalike 1% → 2-3% → 5–10% | Maintain creative, expand reach |
| Kill underperformers | After 3× target CPA spend with 0 conversions | Cut, don't wait for miracle |
| Hold | During learning phase | No decisions until data is stable |

## The Scale Decision Framework

```
Step 1: Is CPA ≤ break-even?
  NO → Do NOT scale. Fix the funnel or offer first.
  YES → Proceed to Step 2.

Step 2: Are there ≥ 15 conversions in the past 7 days?
  NO → Hold budget. Wait for more signal.
  YES → Proceed to Step 3.

Step 3: Is frequency < 3?
  NO → Creative refresh needed. Don't scale — audience is fatigued.
  YES → Scale budget 20–30%.

Step 4: After scaling, monitor for 2–3 days.
  CPA stable or better → Continue scaling.
  CPA rising significantly → Scale back, let algorithm restabilize.
```

## Horizontal vs Vertical Scaling

| Method | How | When |
|---|---|---|
| **Vertical** | Increase budget on existing ad set | Low risk, use first |
| **Horizontal** | Duplicate ad set into new audience (lookalike, interest) | When vertical hits ceiling |
| **Creative scaling** | New creative with same offer/LP | When frequency > 3 |

## Warning Signs After Scaling

- CPA increases > 30% within first 48 hours → likely re-entered learning phase.
- Frequency spike → audience exhaustion faster than expected.
- LP CVR drops → traffic quality changed after audience expansion.
# Checklists — Pre-Launch & Pre-Scale Audit

## Pre-Launch Checklist (Before Running Any Ads)

### Pixel & Tracking
- [ ] Meta Pixel is installed and firing correctly on the thank-you/confirmation page.
- [ ] Test events show purchase event firing (use Meta Pixel Helper Chrome extension).
- [ ] CAPI (Conversions API) is set up if possible — reduces iOS tracking loss.
- [ ] UTM parameters are set on ad URLs for analytics tracking.

### Landing Page
- [ ] Page loads under 3 seconds on mobile (test with PageSpeed Insights).
- [ ] Mobile layout is clean — no broken elements, text not too small.
- [ ] Checkout/payment flow works end-to-end (test with real Rp1 transaction if possible).
- [ ] LP URL is the destination URL in all ads (not homepage).
- [ ] LP matches ad's promise — same product, same offer, same angle.

### Ad Creative
- [ ] Creative is approved and active (not rejected).
- [ ] Primary text, headline, and CTA are complete.
- [ ] No policy-violating claims (health claims, income guarantees, "No. 1" unqualified).
- [ ] At least 2 creative variants ready (to rotate and compare).

### Campaign Settings
- [ ] Correct campaign objective (Sales → Purchase, not Traffic or Engagement).
- [ ] Conversion event is set to Purchase (not Add to Cart or View Content).
- [ ] Attribution window is set (typically 7-day click, 1-day view for products).
- [ ] Budget is sufficient for at least 10 estimated conversions/week.
- [ ] Audience exclusions applied (existing buyers excluded from cold campaigns).

---

## Pre-Scale Checklist (Before Increasing Budget)

- [ ] CPA is at or below break-even for the past 7 days.
- [ ] At least 15–20 conversion events in the past 7 days.
- [ ] Ad set is out of learning phase (no warning label in Ads Manager).
- [ ] Frequency < 3 for cold audiences.
- [ ] LP CVR is stable (not declining week-over-week).
- [ ] No pending creative or policy reviews that could pause delivery.
- [ ] Budget increase planned: max 20–30% (not 2× in one step).

---

## Weekly Performance Review Checklist

Every 7 days, check:
- [ ] Compare this week's CPA vs last week's CPA. Trend?
- [ ] CTR trend — declining? Creative may need refresh.
- [ ] Frequency — approaching 3? Plan creative refresh.
- [ ] Any ad sets stuck in learning? Check why (low budget, small audience, rare conversions).
- [ ] Winning ad set identified? Allocate more budget to it.
- [ ] Losing ad sets (3× CPA with 0 conversions)? Pause them.
- [ ] Note what changed this week (new creative, budget change, audience change) for future reference.
