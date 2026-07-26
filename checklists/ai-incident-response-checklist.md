# AI Incident Response Checklist

Use this to *build* the AI-specific incident response capability the [security checklist](security-checklist.md) requires, and to *run* an incident when one lands. AI incidents differ from classic outages in kind: the system can be fully "up" while confidently wrong at scale, the blast radius includes trust and compliance rather than just availability, and the evidence is in traces, not stack traces. Applies to both lanes — GenAI (injection breach, mass hallucination, data leak via completions) and classical (silent drift, corrupted-batch scoring, discriminatory pattern).

## Preparation (before any incident)

- [ ] AI incident **taxonomy defined and severity-mapped**: quality collapse (mass hallucination / silent drift), security breach (injection success, data exfiltration via completions or tools), safety/harm event (harmful output reached a user), compliance event (PII in logs, adverse decisions from a defective model), cost runaway (agent loop, retry storm), provider incident (outage, silent model change)
- [ ] **Detection wired to the taxonomy**: eval-in-production/quality alerts, injection and abuse monitors, drift alarms (PSI, calibration), cost anomaly alerts, provider status feeds — each incident class has at least one alarm that fires without a human noticing first
- [ ] **Kill switches and degradation paths exist and are rehearsed**: model rollback, prompt rollback, index rollback, tool/agent disablement, full service degradation to human-only — each with a named owner and a tested runbook (a kill switch never pulled is a hypothesis, not a control)
- [ ] **Trace retention supports forensics**: request/response traces, retrieval provenance, tool-call logs, and model/prompt/index versions retained long enough to reconstruct any incident within the compliance window — with access controls, since traces are themselves sensitive
- [ ] **Roles assigned**: incident commander, model owner, prompt/eval owner, security lead, communications owner, and — for regulated systems — the compliance/MRM contact ([6.11](../curriculum/part-6-enterprise-architecture/chapter-11-model-risk-management.md)); an on-call rotation actually staffs them
- [ ] **Regulatory notification obligations pre-mapped**: which incident classes trigger which clocks (data-protection breach notification, EU AI Act serious-incident reporting for high-risk systems, sectoral regulators) — decided with counsel *before* the first incident, not during it
- [ ] **Blast-radius query ready**: for any given defect window (model version × prompt version × index state × time range), you can enumerate affected users, decisions, and outputs — the "which answers were wrong" query is written and tested in advance

## Detection & triage (first hour)

- [ ] Classify against the taxonomy; assign severity by **user harm and decision impact**, not by infrastructure health (the service being "up" is not evidence of a low-severity incident)
- [ ] Freeze the moving parts: pin the current model/prompt/index versions, snapshot relevant traces, stop any auto-retraining or auto-promotion pipelines
- [ ] Decide containment on the rehearsed ladder: full kill vs degrade (disable tools, narrow scope, human-approval mode, fallback model/heuristic) vs monitor — bias toward degrading early; a wrong answer at scale compounds faster than downtime
- [ ] For security incidents: treat the model as a compromised component — revoke/rotate the credentials it could reach, disable its tools, and preserve the injection artifacts as evidence

## Investigation & remediation

- [ ] Reconstruct the defect window from traces: first bad output, last bad output, versions in play, triggering change (deploy, provider-side model update, data batch, corpus change, attack onset)
- [ ] Run the blast-radius query; quantify affected outputs/decisions and identify those needing **remediation, not just fixing** — wrong decisions already acted on (denied claims, sent letters, executed tool calls) need reversal or notification, and the business owner decides that, on the record
- [ ] Reproduce the failure as an eval case *before* shipping the fix; the fix ships only when the new case passes and the standing suite holds (the incident becomes a permanent regression test)
- [ ] Verify containment didn't cause a second incident: fallback quality measured, queues drained, suppressed traffic accounted for

## Post-incident

- [ ] Blameless postmortem within the standing SLA: timeline, root cause, detection gap (why didn't an alarm fire earlier?), containment friction, action items with owners and dates
- [ ] Feed the machinery, both lanes: new eval/golden-set cases, new monitors or tightened limits, threat-model update for novel attack classes, drift-threshold recalibration
- [ ] Compliance closure where triggered: notifications sent within their clocks, MRM findings filed, model inventory and validation records updated ([mrm-fairness checklist](mrm-fairness-checklist.md))
- [ ] Rehearsal debt paid: if any runbook step was improvised during the incident, it is now written, owned, and scheduled for a drill
