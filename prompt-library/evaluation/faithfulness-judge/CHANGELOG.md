# Changelog: Faithfulness Judge

## v1.3 — 2026-07-10
- Added explicit causal-claim anchors after a judge-model upgrade dropped agreement (the new model was laxer about "X caused Y" vs. "Y occurred after X").
- **Eval evidence:** human-agreement restored from 71% to 88% on the calibration set after adding the anchors. (Triggered by the mandatory re-calibration on judge-model change.)

## v1.2 — 2026-06-22
- Added the "do not reward length" instruction and the unsupported-claims list output (diagnosability).
- **Eval evidence:** verbosity-bias probe (padded vs. terse faithful answers) — score inflation eliminated; agreement with human labels up 4 points.

## v1.1 — 2026-06-01
- Isolated the dimension explicitly ("only support-by-context, not helpfulness").
- **Eval evidence:** reduced faithfulness/helpfulness conflation; agreement improved.

## v1.0 — 2026-05-12
- Initial version: 5-point faithfulness rubric.
- **Eval evidence:** 82% agreement with human labels on the initial calibration set; established the 80% gate bar.
