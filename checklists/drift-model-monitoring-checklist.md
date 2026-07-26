# Drift & Model Monitoring Checklist

A deployed model decays by default; monitoring is how you find out before the P&L does. The classical counterpart of LLM observability ([4.10](../curriculum/part-4-enterprise-genai-systems/chapter-10-observability.md)) — three layers, ordered by detection speed ([2.9](../curriculum/part-2-artificial-intelligence/chapter-09-classical-ml-system-design.md)). Apply before go-live: a model without monitoring is not done.

## Layer 1 — System health (minutes)
- [ ] Pipeline/batch completion, scoring latency, and error rates monitored with the same seriousness as any service
- [ ] Feature freshness tracked per feature (stale velocity counters score wrong exactly during incidents — [CS52](../case-studies/cs52-card-fraud-scoring.md))
- [ ] Fallback behavior defined and *tested*: what serves when the model can't? (incumbent rule, fail-open, cached scores) — and fallback activation is itself alerted
- [ ] Online/offline feature parity checked on sampled traffic (training–serving skew detection, [2.9](../curriculum/part-2-artificial-intelligence/chapter-09-classical-ml-system-design.md))

## Layer 2 — Drift (days)
- [ ] Input feature distributions monitored vs. training baseline (PSI or equivalent), per segment — aggregate drift hides segment drift
- [ ] Prediction/score distribution monitored — a shifting score distribution is the earliest cheap warning while labels mature
- [ ] Fleet-wide shifts triaged as *data* first: a simultaneous everywhere-shift usually means an upstream change, not a changed world ([CS53](../case-studies/cs53-predictive-maintenance.md), [CS56](../case-studies/cs56-network-anomaly-detection.md))
- [ ] Adaptive baselines guarded against learning "sick as normal": long-window trends or peer-cohort references beside short-window baselines ([CS56](../case-studies/cs56-network-anomaly-detection.md))
- [ ] Drift alerts have a runbook: who investigates, what gets frozen (threshold changes, retrains) while they do
- [ ] Drift response tested: a corrupted-column / shifted-distribution drill actually fires the alert (P21's testable DoD)

## Layer 3 — Outcome quality (label-lagged truth)
- [ ] Realized performance computed at the operating point as labels mature; every chart states its label-maturity window
- [ ] Early-warning proxies bridge long label lags (30/60-day delinquency for credit, demand-issued for recoveries) with their correlation to the final outcome tracked
- [ ] Performance reported by segment and vintage/cohort, not only in aggregate
- [ ] Decay visible: performance-over-model-age tracked, feeding the retraining trigger
- [ ] Calibration re-checked on matured data, not only at launch

## Retraining and promotion
- [ ] Retraining triggers defined (drift breach, decay threshold, scheduled cadence) — and the trigger's owner named
- [ ] Champion–challenger always on: challengers scored in shadow on live traffic, compared on matured labels ([2.10](../curriculum/part-2-artificial-intelligence/chapter-10-mlops-vs-llmops.md))
- [ ] Demotion path exists: the champion losing to a baseline for N periods pages someone ([CS51](../case-studies/cs51-demand-forecasting-replenishment.md))
- [ ] Human override/exception lanes measured as a parallel decision system — the unmeasured override channel is the unmanaged risk ([CS55](../case-studies/cs55-credit-risk-scoring-mrm.md))

## Adversarial settings (fraud, abuse, security)
- [ ] Drift assumed hostile: decay measured after each attack innovation; retraining cadence tied to observed decay, not the calendar
- [ ] A fast lane exists for novelty (rules deployable in hours) alongside the model's slow lane ([CS52](../case-studies/cs52-card-fraud-scoring.md))
- [ ] Probing behavior (threshold-mapping patterns) itself monitored as a signal
