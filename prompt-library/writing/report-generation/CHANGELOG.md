# Changelog: Report Generation

> **Illustrative history.** This changelog models the eval-evidence discipline the library requires ([Rules](../../README.md)): every change justified by a before/after measurement. The runs, sample sizes, and deltas below are worked examples, not records of executed evaluations — no golden sets or harnesses ship with this repository. Your fork's changelog should contain real ones.

## v1.1 — 2026-07-10
- Added the explicit "figures from data only, do not compute new figures" rule and the exact-figure requirement, after the model rounded/cleaned figures.
- **Eval evidence:** figure-faithfulness (numbers match data) rose from 89% to 99.5% on the 100-report golden set; the downstream figure-check rejection rate dropped correspondingly.

## v1.0 — 2026-05-20
- Initial version: templated report generation with house style and forecast disclaimers.
- **Eval evidence:** format/style consistency good; identified figure rounding/transposition (11% of reports had a non-matching figure) — addressed in v1.1.
