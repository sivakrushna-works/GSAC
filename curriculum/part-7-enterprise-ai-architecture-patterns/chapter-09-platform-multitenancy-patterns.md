# Chapter 7.9 — Platform & Multi-tenancy Patterns

| | |
|---|---|
| **Part** | 7 — Enterprise AI Architecture Patterns |
| **Maturity level** | 4 — Architect |
| **Difficulty** | Advanced |
| **Estimated study time** | 3 hours (reading 90 min, exercise 90 min) |
| **Prerequisites** | [5.4 API & Integration Layer](../part-5-cloud-infrastructure-platform/chapter-04-api-integration-layer.md); [5.10](../part-5-cloud-infrastructure-platform/chapter-10-iac-platform-engineering.md) |

## Learning Objectives

After this chapter you will be able to:

1. Apply the platform & multi-tenancy pattern family in pattern-language form: GenAI gateway, shared eval service, prompt registry, usage metering/chargeback, and central model governance.
2. Select the platform pattern matched to the platform need, using each pattern's context, forces, and consequences.
3. Compose platform patterns into the internal GenAI platform (5.10).
4. Recognize the platform patterns in the case studies, the patterns that make GenAI scale across the enterprise.

## Introduction

This chapter catalogs the platform & multi-tenancy pattern family — the platform patterns that Parts 4–5 built and that recurred throughout as "the platform" (4.7's shared eval, 4.10's observability, 5.4's gateway, 5.10's internal platform), in pattern-language form (7.1). These patterns make GenAI scale across the enterprise — the shared capabilities the application teams consume rather than reinvent (5.10) — and this chapter is the reference for the platform patterns.

The framing: **platform & multi-tenancy patterns make GenAI scale across the enterprise via shared capabilities** — the patterns (GenAI gateway, shared eval service, prompt registry, usage metering/chargeback, central model governance) that provide the shared capabilities the application teams consume (5.10's platform, the amortization), and this chapter is the reference for the platform that scales GenAI.

## Business Motivation

The platform & multi-tenancy patterns are what make GenAI scale beyond a few systems — the shared capabilities that amortize across the enterprise (5.10's platform economics). Without them: every team reinvents the capabilities (the gateway, the eval, the observability — badly and inconsistently — the sprawl anti-pattern), and GenAI doesn't scale (the per-team duplication). With them: the platform provides the capabilities (the gateway, the eval, the observability, the metering — shared), and GenAI scales (the amortization, the golden paths — 5.10). The business case is the scale one: the platform patterns make GenAI scale across the enterprise (5.10 — the amortization, the coherence, the governance-by-default), and the platform pattern family is the reference for the internal GenAI platform — the patterns that turn per-team sprawl into a coherent, scaling platform.

## Theory — The Platform & Multi-tenancy Pattern Catalog

### Pattern: GenAI Gateway

- **Context** — an enterprise with multiple GenAI applications (5.4).
- **Problem** — the per-app cross-cutting concerns (the routing, auth, cost, observability, guardrails re-implemented per app — 5.4).
- **Forces** — the centralization (the shared capabilities) vs. the dependency (the gateway on every path — 5.4).
- **Solution** — the GenAI gateway (5.4 — the control point where the cross-cutting concerns converge: routing — 3.10, auth — 6.6, rate limits, caching — 4.11, observability — 4.10, guardrails — 4.8, cost attribution — 4.11, provider failover — 5.9), applications calling by task class (5.4).
- **Structure** — applications → gateway (the cross-cutting concerns) → providers (5.4).
- **Consequences** — the shared cross-cutting capabilities (the amortization — 5.4); the critical dependency (the gateway's reliability — 5.9).
- **Known uses** — Vantora's gateway (5.4 — the platform arc), all enterprise GenAI platforms (5.4/7.9).
- **Related** — all the cost/performance patterns (7.8, at the gateway), the model tiering (3.10), the observability (4.10).

### Pattern: Shared Eval Service

- **Context** — an enterprise with multiple GenAI systems needing evaluation (4.7).
- **Problem** — the per-team eval reinvention (4.7's nine-systems-nine-approaches).
- **Forces** — the shared machinery vs. the per-team content (4.7's platform/content split).
- **Solution** — the shared eval platform (4.7 — the supply chain, the judge fleet, the gates, the dashboards — shared; the golden sets, rubrics, thresholds — per-team), the CI gates wired into the change paths (4.7/5.7).
- **Structure** — the shared eval platform (4.7) consumed by the teams (their content) (4.7).
- **Consequences** — the shared eval capability (the amortization, the calibration program — 4.7); the platform investment (4.7).
- **Known uses** — Meridian's consolidated eval platform (4.7), P10 (the evaluation harness), all mature GenAI estates (4.7).
- **Related** — the evaluation patterns (4.7), the LLMOps (5.7 — the gates), the observability (4.10 — the quality plane).

### Pattern: Prompt Registry

- **Context** — an enterprise with many versioned prompts (3.3).
- **Problem** — the prompts scattered, un-versioned, un-governed (3.3's live-edit anti-pattern, at scale).
- **Forces** — the central registry vs. the team ownership (3.3's ownership).
- **Solution** — the prompt registry (3.3/5.7 — the versioned prompts, the model assumptions, the runtime source of truth — applications reference versions), part of the LLMOps composite (5.7).
- **Structure** — the registry (versioned prompts) → the applications reference versions (3.3/5.7).
- **Consequences** — the versioned, governed prompts (3.3 — the rollback, the audit); the registry as the source of truth (3.3/5.7).
- **Known uses** — the LLMOps prompt versioning (5.7), all disciplined GenAI estates (3.3).
- **Related** — the LLMOps (5.7 — the composite manifest), the prompt engineering (3.3), the model governance (the model version tracking).

### Pattern: Usage Metering/Chargeback

- **Context** — a shared GenAI platform whose costs must be attributed (4.11/5.4).
- **Problem** — the un-attributed shared-platform cost (4.11 — the tragedy of the commons).
- **Forces** — the attribution (the accountability) vs. the metering complexity (4.11 — the per-consumer attribution).
- **Solution** — the usage metering (4.10/4.11 — the per-consumer cost attribution) and chargeback/showback (4.11 — the teams see/pay their cost — the incentive alignment), at the gateway (5.4).
- **Structure** — the gateway meters per consumer → chargeback/showback (4.11).
- **Consequences** — the cost accountability and incentive alignment (4.11 — the team that pays optimizes); the metering (4.10's attribution).
- **Known uses** — Vantora's showback (4.11 — the incentive alignment), all shared GenAI platforms (7.9).
- **Related** — the cost patterns (7.8), the observability (4.10 — the attribution), the budget enforcement (7.8).

### Pattern: Central Model Governance

- **Context** — an enterprise with a model portfolio to govern (3.10/6.9).
- **Problem** — the ungoverned model proliferation (3.10's pre-portfolio chaos, the shadow selection).
- **Forces** — the central governance vs. the team autonomy (6.9's enabling governance).
- **Solution** — the central model governance (3.10/6.9 — the model portfolio, the routing policy, the selection authority, the re-evaluation triggers — the central governance; the golden-path enabling — 5.10/6.9), at the gateway (5.4).
- **Structure** — the model portfolio governed centrally (3.10) → the gateway routes (5.4) (3.10/6.9).
- **Consequences** — the governed model portfolio (3.10 — the reversibility, the coherence); the governance (6.9 — enabling, not blocking).
- **Known uses** — Vantora's model portfolio (3.10), all mature GenAI platforms (7.9).
- **Related** — the model selection (3.10), the gateway (5.4), the governance (6.9).

## Architecture Perspective

```mermaid
flowchart TD
    subgraph PLATFORM [The internal GenAI platform — 5.10]
        GATEWAY[GenAI Gateway — 5.4<br/>the control point]
        EVAL[Shared Eval Service — 4.7]
        REGISTRY[Prompt Registry — 3.3/5.7]
        METERING[Usage Metering/Chargeback — 4.11]
        MODELGOV[Central Model Governance — 3.10/6.9]
    end
    GATEWAY -.hosts.-> METERING & MODELGOV
    APPS[Application teams] -.consume.-> PLATFORM
    PLATFORM -.golden paths — 5.10.-> APPS
    PLATFORM -.amortize.-> SCALE[GenAI scales across the enterprise]
```

Readings. **The platform patterns are the shared capabilities** — the GenAI gateway (the control point — 5.4), the shared eval service (the evaluation — 4.7), the prompt registry (the prompts — 3.3/5.7), the usage metering/chargeback (the cost accountability — 4.11), the central model governance (the model portfolio — 3.10/6.9) — the shared capabilities the application teams consume (5.10's platform, the amortization). **The gateway is the platform keystone** — the gateway (5.4) hosts many of the platform capabilities (the metering, the model governance, the cost/performance patterns — 7.8, the observability — 4.10, the guardrails — 4.8), the control point where the platform capabilities converge (5.4's keystone). **And the platform patterns compose into the internal GenAI platform** — the gateway + eval + registry + metering + model governance (the internal platform — 5.10), offered as self-service with golden paths (5.10), the platform patterns as the components of the internal platform (7.1's combination, 5.10's culmination).

## Real-world Example

**Vantora Systems** (the recurring platform arc — 5.10) is the platform pattern family's fullest example — the internal GenAI platform (5.10) is a platform-pattern composition. The composition was the platform: the GenAI gateway (5.4 — the control point, the cross-cutting concerns), the shared eval service (4.7 — the consolidated eval platform), the prompt registry (3.3/5.7 — the versioned prompts), the usage metering/chargeback (4.11 — the showback, the incentive alignment), the central model governance (3.10/6.9 — the model portfolio, the routing). The platform-pattern composition was the internal GenAI platform (5.10): the gateway + eval + registry + metering + model governance, offered as self-service with golden paths (5.10 — the compliant-by-default templates), amortized across the eleven teams (5.10 — the platform economics). The gateway was the keystone (5.4): it hosted the metering, the model governance, the cost/performance patterns (7.8), the observability (4.10), the guardrails (4.8) — the control point where the platform capabilities converged. Adaeze's platform-patterns note (closing the Vantora arc, echoing 5.10): *"Our internal GenAI platform is a platform-pattern composition: the gateway (the control point), the shared eval service, the prompt registry, the usage metering/chargeback, the central model governance. Offered as self-service with golden paths (5.10), amortized across the teams. The gateway is the keystone — it hosts the metering, the model governance, the cost/performance patterns (7.8), the observability, the guardrails. The platform patterns are the shared capabilities that make GenAI scale — the teams consume them rather than reinventing (the sprawl avoided). That's the platform: the patterns composed into the internal GenAI platform, the reference core's platform family, the culmination of the whole arc from scattered pilots to a coherent, scaling platform."*

## Hands-on Exercise

**Compose platform patterns.** ~90 minutes. For an enterprise GenAI platform (real or a case study).

1. **Platform-need analysis (25 min).** For an enterprise with multiple GenAI systems, analyze the platform needs: the cross-cutting concerns (needs a gateway), the evaluation (needs a shared eval service), the prompts (needs a prompt registry), the cost accountability (needs metering/chargeback), the model portfolio (needs central model governance). Map the needs to the patterns.
2. **The pattern-language form (20 min).** For one selected pattern (e.g., GenAI gateway), write its full pattern-language form.
3. **The composition (30 min).** Compose the platform patterns into the internal GenAI platform (5.10 — self-service, golden paths). Show how the gateway is the keystone (hosting the platform capabilities — 5.4), and how the platform amortizes across the teams (5.10).
4. **The golden path (15 min).** Design a golden path (5.10 — the compliant-by-default template) that wires the platform patterns (the gateway integration, the eval harness, the observability, the guardrails), making the teams compliant-and-observable by default.

**Acceptance criteria:**
- [ ] Platform needs mapped to the platform patterns
- [ ] One pattern in the full pattern-language form
- [ ] The platform patterns composed into the internal GenAI platform (5.10 — self-service, golden paths), the gateway as keystone
- [ ] A golden path wiring the platform patterns (compliant-by-default — 5.10)

## Enterprise Considerations

The platform & multi-tenancy patterns are the enterprise's platform reference. **They're the platform reference** (5.10/7.1): the platform pattern family is the enterprise's reference for the internal GenAI platform (5.10), the patterns that make GenAI scale (P16 — the multi-tenant platform). **They're the governance-at-scale mechanism** (5.10/6.9): the platform patterns (the gateway, the golden paths — 5.10) are the governance-at-scale mechanism (6.9 — the enabling governance, the compliant-by-default), so the platform patterns are how the governance scales (6.9/5.10's paved road). **They require the platform team** (5.10/8.7): the platform patterns require the platform team (5.10 — the platform/product split, the platform-engineering skills), so the platform patterns connect to the org design (8.7). **And the multi-tenancy is a security-and-compliance concern** (4.1/6.5/4.14): the multi-tenancy patterns (the tenant isolation — 7.7, the metering — the per-tenant attribution) are security-and-compliance concerns (4.1's isolation, 4.14's data protection), so the platform patterns connect to the security and compliance (6.5/4.14).

## Trade-offs

| Decision | Option A | Option B | Choose A when… | Choose B when… |
|----------|----------|----------|----------------|----------------|
| Platform | Build the internal platform | Per-team infrastructure | Beyond a few systems — the sprawl compounds (5.10) | Genuinely one/two systems — plan the platform before the sprawl |
| Gateway | Non-bypassable (5.4) | Bypassable | Always — the governance/cost enforcement needs it (5.4) | Never bypassable where governance depends on it |
| Cost accountability | Chargeback (teams pay) | Showback (teams see) | Mature, trustworthy attribution (4.11) | Early stage — showback first (4.11) |
| Governance | Golden paths (enabling — 5.10/6.9) | Mandates (blocking) | Always — the enabling governance the teams adopt (6.9) | Never blocking-mandates; the routed-around (6.9) |

## Common Mistakes

1. **No platform, infrastructure sprawl** — every team reinventing the capabilities (5.10's sprawl); the platform patterns (the shared capabilities).
2. **The bypassable gateway** — the applications bypassing the gateway (5.4's governance holes); the non-bypassable gateway (5.4).
3. **Per-team eval/prompts** — the reinvented eval (4.7) and prompts (3.3) per team; the shared eval service (4.7) and prompt registry (3.3/5.7).
4. **Un-attributed platform cost** — the shared-platform cost un-metered (4.11's tragedy of the commons); the usage metering/chargeback (4.11).
5. **Ungoverned model proliferation** — the shadow model selection (3.10); the central model governance (3.10/6.9).
6. **Mandates instead of golden paths** — the blocking governance (6.9's routed-around); the golden paths (5.10/6.9 — enabling).
7. **The un-composed platform** — the platform patterns applied without composing them into the internal platform (5.10); the composition (the self-service platform).

## Best Practices

1. **Build the gateway as the platform keystone** — the control point (5.4), non-bypassable, hosting the platform capabilities (the metering, the model governance, the cost/performance patterns — 7.8, the observability, the guardrails).
2. **Share the eval service and prompt registry** — the shared eval (4.7) and prompt registry (3.3/5.7), the platform/content split.
3. **Meter and chargeback/showback** — the per-consumer cost attribution (4.11), the incentive alignment.
4. **Govern the model portfolio centrally** — the central model governance (3.10/6.9), the reversibility and coherence.
5. **Offer the platform as self-service with golden paths** — the compliant-by-default templates (5.10), the governance-at-scale (6.9).
6. **Compose the patterns into the internal platform** — the gateway + eval + registry + metering + model governance (5.10), amortized across the teams.
7. **Build the platform team** — the platform/product split (5.10/8.7), the platform-engineering skills concentrated.

## Architecture Checklist

For applying the platform & multi-tenancy patterns:

- [ ] The GenAI gateway as the keystone (5.4), non-bypassable, hosting the platform capabilities
- [ ] The shared eval service (4.7) and prompt registry (3.3/5.7), the platform/content split
- [ ] Usage metering and chargeback/showback (4.11), the incentive alignment
- [ ] Central model governance (3.10/6.9), the reversibility and coherence
- [ ] The platform offered as self-service with golden paths (5.10), the governance-at-scale
- [ ] The platform patterns composed into the internal GenAI platform (5.10), amortized
- [ ] The platform team (5.10/8.7); the multi-tenancy as a security-and-compliance concern (4.1/6.5/4.14)

## Interview Questions

1. *"Walk me through the platform patterns for an enterprise GenAI platform."* — Strong answers give the family (GenAI gateway — the control point, shared eval service — the evaluation, prompt registry — the prompts, usage metering/chargeback — the cost accountability, central model governance — the model portfolio), composed into the internal platform (5.10), the gateway as keystone.
2. *"Why is the gateway the platform keystone?"* — Strong answers give the control point (5.4 — the cross-cutting concerns converge: routing, auth, cost, observability, guardrails, metering, model governance), hosting many platform capabilities, non-bypassable (the governance/cost enforcement), on every path (the critical dependency — 5.9) — the keystone the platform builds on.
3. *"How do platform patterns make GenAI scale?"* — Strong answers give the amortization (5.10 — the shared capabilities the teams consume rather than reinvent, the sprawl avoided), the golden paths (5.10/6.9 — the compliant-by-default, the governance-at-scale), and the platform/content split (the platform shared, the content per-team) — the platform that turns per-team sprawl into a coherent, scaling platform.
4. *"How do you handle cost accountability on a shared GenAI platform?"* — Strong answers give the usage metering/chargeback pattern (4.11 — the per-consumer cost attribution at the gateway, the chargeback/showback — the incentive alignment — the team that pays optimizes), requiring the per-tenant attribution (4.10/4.11).

## Further Reading

- 5.4 API & Integration Layer (the gateway), 5.10 IaC & Platform Engineering (the internal platform), 4.7 Evaluation Systems (the shared eval) — the chapters this pattern family formalizes.
- Team Topologies (re-linked from 5.10) — the platform-team model the platform patterns require.
- The [P16 multi-tenant GenAI platform](../../projects/README.md) — the project that builds the platform patterns.
- 7.8 Cost & Performance Patterns (the gateway capabilities) and 6.9 Architecture Governance (the golden-path governance) — the related patterns.

## Summary

- The **platform & multi-tenancy pattern family** provides the shared capabilities that make GenAI scale — GenAI gateway (the control point — 5.4), shared eval service (the evaluation — 4.7), prompt registry (the prompts — 3.3/5.7), usage metering/chargeback (the cost accountability — 4.11), central model governance (the model portfolio — 3.10/6.9).
- **The gateway is the platform keystone** (5.4) — the control point where the platform capabilities converge (the metering, model governance, cost/performance patterns — 7.8, observability, guardrails), non-bypassable, on every path.
- The patterns **compose into the internal GenAI platform** (5.10) — offered as self-service with golden paths (the compliant-by-default, the governance-at-scale — 6.9), amortized across the teams (the sprawl avoided).
- The platform patterns are the **governance-at-scale mechanism** (5.10/6.9 — the golden paths, the enabling governance), require the **platform team** (5.10/8.7), and connect the multi-tenancy to security and compliance (4.1/6.5/4.14).
- The platform patterns are the enterprise's **platform reference** (P16) — the culmination of the recurring "the platform" (Vantora's arc). The patterns to avoid are next: **anti-patterns** (7.10).

---

**Previous:** [Chapter 7.8 — Cost & Performance Patterns](chapter-08-cost-performance-patterns.md) · **Next:** [Chapter 7.10 — Anti-patterns](chapter-10-anti-patterns.md) · **Related:** [5.4 API & Integration Layer](../part-5-cloud-infrastructure-platform/chapter-04-api-integration-layer.md), [5.10 IaC & Platform Engineering](../part-5-cloud-infrastructure-platform/chapter-10-iac-platform-engineering.md), [7.10 Anti-patterns](chapter-10-anti-patterns.md)
