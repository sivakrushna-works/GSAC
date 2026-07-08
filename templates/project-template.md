# Project PXX — {Title}

| | |
|---|---|
| **Tier** | {Beginner / Intermediate / Advanced / Architect} |
| **Maturity level** | {2 Build / 3 Engineer / 4 Architect} |
| **Estimated effort** | {e.g., 2 weekends} |
| **Prerequisite chapters** | {links} |
| **Skills exercised** | {comma-separated} |

## Business Problem

{The problem in the customer's words. Who is hurting, how badly, what "solved" looks like. Include the business KPI this project moves.}

## Requirements

### Functional
- FR-1: {…}
- FR-2: {…}

### Non-functional
- NFR-1 (Latency): {…}
- NFR-2 (Availability): {…}
- NFR-3 (Security/Compliance): {…}
- NFR-4 (Cost ceiling): {…}

## Architecture Diagram

```mermaid
%% Component/container diagram (C4-style) of the target system
```

{Prose walkthrough of the diagram: each component's responsibility and the reason it exists.}

## Technology Choices

| Concern | Choice | Alternatives considered | Why |
|---------|--------|------------------------|-----|
| {LLM} | {…} | {…} | {…} |
| {Retrieval} | {…} | {…} | {…} |
| {Hosting} | {…} | {…} | {…} |

## Security

{Threat surface for this project specifically: prompt injection paths, data exposure, authn/z, secrets. Apply the [security checklist](../checklists/security-checklist.md) and record the results here.}

## Deployment

{Environments, IaC approach, rollout strategy, rollback plan. Apply the [deployment checklist](../checklists/deployment-checklist.md).}

## Monitoring

{What you measure and where you look: traces, quality metrics, cost dashboards, alerts with thresholds. Apply the [evaluation checklist](../checklists/evaluation-checklist.md).}

## Estimated Cost

| Item | Assumption | Monthly estimate |
|------|-----------|------------------|
| Inference | {req/day × tokens × price} | {…} |
| Vector store / search | {…} | {…} |
| Compute / hosting | {…} | {…} |
| **Total** | | **{…}** |

{One paragraph: the dominant cost driver and the first optimization you'd make.}

## Future Improvements

1. {…}
2. {…}

## Definition of Done

- [ ] All functional requirements demonstrated end-to-end
- [ ] Evals exist and pass in CI
- [ ] Threat model reviewed; high risks mitigated
- [ ] Dashboards live; alerts tested
- [ ] Cost measured against estimate
- [ ] README written so another engineer can run it in <15 minutes
