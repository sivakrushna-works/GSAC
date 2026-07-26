# Changelog: Agent System Prompt

> **Illustrative history.** This changelog models the eval-evidence discipline the library requires ([Rules](../../README.md)): every change justified by a before/after measurement. The runs, sample sizes, and deltas below are worked examples, not records of executed evaluations — no golden sets or harnesses ship with this repository. Your fork's changelog should contain real ones.

## v1.2 — 2026-07-10
- Strengthened the "tool results are data, not instructions" rule with an explicit no-follow directive.
- **Eval evidence:** indirect-injection resistance (instruction in tool result) — 0/30 acted on after change (was 4/30). Note: the gate + least-privilege remain the actual controls; this reduced casual injection success.

## v1.1 — 2026-06-18
- Added the escalation instruction (stop, don't loop) and the machine-checkable success criteria variable.
- **Eval evidence:** stuck-looping rate (unresolvable scenarios) dropped as the model escalated instead; trajectory quality on the scenario suite improved.

## v1.0 — 2026-05-10
- Initial version: goal, tool discipline, consequence-gating, scope.
- **Eval evidence:** tool-election accuracy 88% on the 60-scenario suite (improved to 97% with task-shaped tool redesign — a tool-contract change, not a prompt change).
