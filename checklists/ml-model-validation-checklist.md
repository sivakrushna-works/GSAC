# ML Model Validation Checklist

For any trained model (classification, regression, forecasting, ranking) before it earns production traffic. The classical counterpart of the [evaluation checklist](evaluation-checklist.md) — apply at design time, revisit at every promotion. Anchored in [2.7](../curriculum/part-2-artificial-intelligence/chapter-07-evaluating-ml-systems.md) and [2.9](../curriculum/part-2-artificial-intelligence/chapter-09-classical-ml-system-design.md).

## Problem framing
- [ ] The prediction target is written down precisely (what, for whom, as of when, usable how) — and the business action that consumes it is named
- [ ] Baselines established *first*: naive/majority, seasonal-naive (forecasting), incumbent rule or process — the model's value is the delta over these, not its absolute score
- [ ] The "do nothing" and non-ML options were considered and the rejection is recorded ([2.11](../curriculum/part-2-artificial-intelligence/chapter-11-choosing-the-right-ai-approach.md))

## Data splits and leakage
- [ ] Split strategy matches deployment reality: **out-of-time** validation for anything time-dependent (random splits flatter the model); grouped splits where entities repeat (no customer in both train and test)
- [ ] Every feature audited for leakage: computable *as of prediction time*, from data that will exist in production ([2.9](../curriculum/part-2-artificial-intelligence/chapter-09-classical-ml-system-design.md)'s point-in-time rule)
- [ ] Post-outcome fields (updated statuses, backfilled corrections) excluded or reconstructed as-of
- [ ] Label censoring identified and addressed: whose outcomes are systematically missing (declined applicants, unpursued cases, stocked-out days), and what does that do to the model? (See [CS30](../case-studies/cs30-subrogation-opportunity-detection.md), [CS52](../case-studies/cs52-card-fraud-scoring.md), [CS55](../case-studies/cs55-credit-risk-scoring-mrm.md))

## Metrics and operating point
- [ ] Metric matches the decision: ranking metrics for queues (precision@capacity, lift), calibration for consumed probabilities, interval coverage for forecasts feeding quantities — not AUC by reflex
- [ ] The **operating point** (threshold/cut-line) chosen with the business against the cost of each error direction, and performance reported *at that point* ([2.7](../curriculum/part-2-artificial-intelligence/chapter-07-evaluating-ml-systems.md))
- [ ] Error asymmetry stated explicitly (which mistake is expensive, by how much)
- [ ] Class imbalance handled honestly (base rates reported; precision/recall not quoted against a balanced fiction)
- [ ] Results reported by segment, not only aggregate — the aggregate hides where the model wins and loses ([CS51](../case-studies/cs51-demand-forecasting-replenishment.md))
- [ ] Noise floor known: is the improvement larger than the metric's variance on this dataset size? ([2.7](../curriculum/part-2-artificial-intelligence/chapter-07-evaluating-ml-systems.md))

## Calibration and uncertainty
- [ ] If a probability or interval is consumed downstream, calibration is tested (reliability by band; interval coverage) — a sharper miscalibrated model can be worse than a duller calibrated one
- [ ] Uncertainty surfaced where the consumer can use it (bands, confidence, "learning" states for cold-start entities)

## Reproducibility and promotion
- [ ] Training is a versioned, re-runnable pipeline: data snapshot, features, code, params, seed — a reviewer can reproduce the reported numbers
- [ ] Champion–challenger comparison on identical evaluation data; promotion gated, recorded, reversible ([2.10](../curriculum/part-2-artificial-intelligence/chapter-10-mlops-vs-llmops.md))
- [ ] Model registered (version, training-data window, metrics at operating point, known limitations) before deployment, not after
- [ ] For regulated uses: independent validation planned, documentation pack producible from system artifacts ([mrm-fairness checklist](mrm-fairness-checklist.md))
