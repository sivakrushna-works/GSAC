# Changelog: Input Screening

## v1.2 — 2026-07-10
- Added the fence label (classify-as-data) after an early version was itself manipulated by input claiming to be policy.
- **Eval evidence:** classifier-manipulation probe 0/20 after change; per-category precision/recall unchanged (within noise).

## v1.1 — 2026-06-25
- Split the recall-tuning: high-severity categories recall-tuned (flag when uncertain), others precision-balanced — after over-blocking legitimate questions (7% false-positive rate).
- **Eval evidence:** over-block rate on the borderline/legitimate set dropped from 7% to 1.4%; high-severity recall held at 98% (the LLM checker's nuance caught the real cases the loosened classifier tier flagged — the Bellhaven funnel-tuning episode, 4.8).

## v1.0 — 2026-05-15
- Initial version: multi-category input screening.
- **Eval evidence:** high-severity recall 97%, but 7% over-block rate identified (addressed in v1.1).
