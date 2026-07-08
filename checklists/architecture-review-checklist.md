# Architecture Review Checklist

Use in every design review of a GenAI system. A "no" is not a blocker by itself — an *unconsidered* item is.

## Problem & scope
- [ ] The business problem is stated in the customer's terms, with a KPI
- [ ] Success criteria are measurable and agreed with stakeholders
- [ ] "Do nothing" and "non-AI solution" were considered and rejected for stated reasons
- [ ] Scope boundaries are explicit (what this system will *not* do)

## Requirements
- [ ] Functional requirements are numbered and testable
- [ ] NFRs cover latency, availability, throughput, cost ceiling, languages, accessibility
- [ ] Compliance and data-residency requirements are identified with the responsible party named
- [ ] Load profile is estimated (requests/day, peak factor, growth)

## Design
- [ ] A container-level diagram exists and matches the prose
- [ ] Every component has one owner and one responsibility
- [ ] Workflow vs. agent choice is justified (start with the simplest control flow that works)
- [ ] Model choice is justified against at least one alternative (capability, latency, cost)
- [ ] Data flow diagram shows where sensitive data travels and rests
- [ ] Failure modes per component are listed with degradation behavior (fallbacks, timeouts, circuit breakers)
- [ ] Humans-in-the-loop points are explicit for consequential actions

## Quality & evaluation
- [ ] An eval strategy exists before build starts ([evaluation checklist](evaluation-checklist.md))
- [ ] Hallucination risk is assessed; grounding/citation strategy defined where needed

## Security
- [ ] [Security checklist](security-checklist.md) applied; threat model documented
- [ ] Prompt injection surfaces enumerated (user input, retrieved docs, tool results)

## Operations
- [ ] [Deployment checklist](deployment-checklist.md) applied
- [ ] Monitoring covers quality, latency, cost, and safety — not just uptime
- [ ] Runbook exists; on-call ownership assigned

## Cost
- [ ] Monthly cost estimated with stated assumptions (tokens, requests, storage)
- [ ] Dominant cost driver identified with first optimization lever
- [ ] Cost alerts configured before launch

## Decisions & governance
- [ ] Architecturally significant decisions captured as ADRs
- [ ] Vendor lock-in surfaces identified; exit cost acknowledged
- [ ] Review sign-offs recorded (security, data, business owner)
