# Business Data Analysis Playbook

## Before analysis

Define the decision, grain (one row represents what), time zone, date range, population, metric numerator/denominator, and exclusions. Run a data-quality audit before calculating outcomes.

## Select the analysis path

| Question | Primary view | Minimum cuts |
|---|---|---|
| Where is growth changing? | Time series | channel, product, customer segment |
| Why are customers leaving? | Cohort retention and churn | acquisition cohort, plan/product, tenure |
| Where does conversion leak? | Funnel | channel, device, landing page, new/returning |
| Which customers matter most? | Segmentation and LTV | recency, frequency, monetary value |
| Which initiative worked? | Before/after with comparison group | cohort, geography/channel, period |

## Quality checks

- Measure missingness, duplicate identifiers, impossible values, inconsistent categories, and date gaps.
- Do not sum distinct users across overlapping periods.
- Separate completed transactions from refunds, cancellations, and test records.
- State when a metric has too little volume or too short a period for a strong conclusion.

## Insight standard

For each finding, write: **observation → likely driver/hypothesis → decision implication → validation step**. Distinguish correlation from causation. Rank recommendations by expected impact, confidence, effort, and time to learn.
