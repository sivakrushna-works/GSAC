# Architecture Review Checklist

Use in every design review of an AI system — GenAI or classical ML. A "no" is not a blocker by itself — an *unconsidered* item is. Items marked *(GenAI)* or *(trained model)* apply to that lane; hybrid systems ([P22](../projects/p22-hybrid-claims-intake/README.md)) apply both.

## Problem & scope
- [ ] The business problem is stated in the customer's terms, with a KPI
- [ ] Success criteria are measurable and agreed with stakeholders
- [ ] "Do nothing" and "non-AI solution" were considered and rejected for stated reasons
- [ ] The approach sits on the right rung of the capability ladder — rules / classical ML / perception / GenAI — with the [2.11](../curriculum/part-2-artificial-intelligence/chapter-11-choosing-the-right-ai-approach.md) triage recorded
- [ ] Scope boundaries are explicit (what this system will *not* do)

## Requirements
- [ ] Functional requirements are numbered and testable
- [ ] NFRs cover latency, availability, throughput, cost ceiling, languages, accessibility
- [ ] Compliance and data-residency requirements are identified with the responsible party named
- [ ] Load profile is estimated (requests/day, peak factor, growth)

## Design
- [ ] A container-level diagram exists and matches the prose
- [ ] Every component has one owner and one responsibility
- [ ] *(GenAI)* Workflow vs. agent choice is justified (start with the simplest control flow that works)
- [ ] Model choice is justified against at least one alternative (capability, latency, cost)
- [ ] *(trained model)* Batch vs. online serving justified by decision cadence, not fashion ([2.9](../curriculum/part-2-artificial-intelligence/chapter-09-classical-ml-system-design.md))
- [ ] *(trained model)* Label source, lag, and censoring/action-bias identified ([data-quality & labeling checklist](data-quality-labeling-checklist.md))
- [ ] Data flow diagram shows where sensitive data travels and rests
- [ ] Failure modes per component are listed with degradation behavior (fallbacks, timeouts, circuit breakers)
- [ ] Humans-in-the-loop points are explicit for consequential actions

## Quality & evaluation
- [ ] An eval strategy exists before build starts ([evaluation checklist](evaluation-checklist.md))
- [ ] *(GenAI)* Hallucination risk is assessed; grounding/citation strategy defined where needed
- [ ] *(trained model)* [ML model validation checklist](ml-model-validation-checklist.md) applied; baselines beaten at the chosen operating point

## Security
- [ ] [Security checklist](security-checklist.md) applied; threat model documented
- [ ] Prompt injection surfaces enumerated (user input, retrieved docs, tool results)

## Operations
- [ ] [Deployment checklist](deployment-checklist.md) applied
- [ ] Monitoring covers quality, latency, cost, and safety — not just uptime
- [ ] *(trained model)* [Drift & model monitoring checklist](drift-model-monitoring-checklist.md) applied; retraining trigger owned
- [ ] Runbook exists; on-call ownership assigned

## Cost
- [ ] Monthly cost estimated with stated assumptions (tokens/requests for GenAI; serving, data licensing, labeling, and governance labor for trained models — [6.10](../curriculum/part-6-enterprise-architecture/chapter-10-tco-business-case.md))
- [ ] Dominant cost driver identified with first optimization lever
- [ ] Cost alerts configured before launch

## Decisions & governance
- [ ] Architecturally significant decisions captured as ADRs
- [ ] *(regulated decisions)* [MRM & fairness checklist](mrm-fairness-checklist.md) applied; model registered in the inventory
- [ ] Vendor lock-in surfaces identified; exit cost acknowledged
- [ ] Review sign-offs recorded (security, data, business owner)
