# Changelog: Meeting Minutes

> **Illustrative history.** This changelog models the eval-evidence discipline the library requires ([Rules](../../README.md)): every change justified by a before/after measurement. The runs, sample sizes, and deltas below are worked examples, not records of executed evaluations — no golden sets or harnesses ship with this repository. Your fork's changelog should contain real ones.

## v1.2 — 2026-07-10
- Added the explicit "faithful over complete: omit rather than invent" rule and the no-attribution-without-assignment rule.
- **Eval evidence:** invented-action-item rate dropped from 8% to 1.5%; owner-misattribution dropped from 6% to <1% on the 100-transcript golden set.

## v1.1 — 2026-06-10
- Added null handling for unstated owner/due (was guessing).
- Added supporting-span requirement for decisions.
- **Eval evidence:** owner-guessing eliminated; decision faithfulness up to 95%.

## v1.0 — 2026-05-05
- Initial version: structured minutes.
- **Eval evidence:** summary quality good, but identified action-fabrication and owner-guessing (addressed in v1.1/v1.2).
