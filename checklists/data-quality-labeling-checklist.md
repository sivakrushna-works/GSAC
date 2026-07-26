# Data Quality & Labeling Checklist

The data quality is the model's ceiling ([2.2](../curriculum/part-2-artificial-intelligence/chapter-02-machine-learning-fundamentals.md)); labels are where most ML systems quietly fail. Apply when designing any trained system, and again whenever "the model got worse" — the cause is usually upstream.

## Sources and contracts
- [ ] Every input source has a named owner and a schema/data contract; upstream changes reach the ML team *before* they reach production
- [ ] Data-quality gates run before training and scoring: completeness, ranges, category validity, volume anomalies — failures are loud (block + alert), never silent imputation at scale
- [ ] Late-arriving and corrected data handled explicitly (as-of reconstruction windows; see [CS51](../case-studies/cs51-demand-forecasting-replenishment.md)'s 48h POS corrections)
- [ ] Missingness understood per feature: random, structural, or meaningful (missing-not-at-random is signal *and* trap); the imputation policy is written down
- [ ] Instrumentation/sensor health monitored as a peer concern — a drifting sensor or broken tracker is indistinguishable from a changing world until checked ([CS53](../case-studies/cs53-predictive-maintenance.md))

## Label acquisition
- [ ] Where do labels come from, how delayed, at what cost? (The [2.9](../curriculum/part-2-artificial-intelligence/chapter-09-classical-ml-system-design.md) question — answered in writing before the first model)
- [ ] Label lag stated on every dashboard that reports "current" performance ([CS52](../case-studies/cs52-card-fraud-scoring.md): today's numbers describe last quarter's model)
- [ ] Action bias and censoring mapped: does acting on predictions bias the next training set (treated customers, declined applicants, blocked transactions)? Control slices / exploration budgets in place where it does (P21, [CS30](../case-studies/cs30-subrogation-opportunity-detection.md))
- [ ] The label pipeline is designed to *produce* future labels: dispositions coded, feedback captured, "prevented outcome" credit defined ([CS53](../case-studies/cs53-predictive-maintenance.md)'s disposition taxonomy)

## Human labeling (where used)
- [ ] Labeling instructions written with worked examples and contested-case rulings; versioned
- [ ] Inter-annotator agreement measured on overlap samples; disagreement triggers calibration, not averaging ([CS24](../case-studies/cs24-ediscovery-triage.md): when humans produce labels in-line, labeler QC *is* model QC)
- [ ] Labeler drift tracked over long campaigns; gold-question seeding where volume warrants
- [ ] Label provenance retained (who/when/instruction-version) so bad batches are traceable and revocable

## Dataset hygiene
- [ ] Training datasets versioned and snapshotted; any reported metric names its dataset version
- [ ] Class balance, segment coverage, and time coverage of the training set compared against production reality — and re-checked at each retrain
- [ ] Duplicates, near-duplicates, and entity overlap across splits eliminated
- [ ] Known-bad periods (outages, migrations, policy changes) flagged and excluded or modeled deliberately
