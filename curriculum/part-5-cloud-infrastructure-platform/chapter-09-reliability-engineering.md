# Chapter 5.9 — Reliability Engineering: SLOs, Failover & DR

| | |
|---|---|
| **Part** | 5 — Cloud, Infrastructure & Platform Engineering |
| **Maturity level** | 3 — Engineer |
| **Difficulty** | Advanced |
| **Estimated study time** | 3 hours (reading 90 min, exercise 90 min) |
| **Prerequisites** | [3.10](../part-3-core-building-blocks-of-genai/chapter-10-model-selection-benchmarking.md); [5.4](chapter-04-api-integration-layer.md); [5.8](chapter-08-scalability-patterns.md) |

## Learning Objectives

After this chapter you will be able to:

1. Set SLOs for GenAI systems across the dimensions that matter — availability, latency, and quality — and design to meet them.
2. Design for the GenAI-specific reliability risk: provider dependency, and the failover that makes it survivable.
3. Apply the resilience patterns — timeouts, retries, circuit breakers, fallbacks, graceful degradation — to the LLM failure modes.
4. Plan disaster recovery for GenAI systems: what to back up (the derived and the irreplaceable), and the recovery of the stateful and provider-dependent parts.

## Introduction

Reliability engineering for GenAI systems is classical SRE (SLOs, failover, disaster recovery) with a defining GenAI-specific risk: **the model provider is a critical external dependency you don't control**, and its outages, degradations, and deprecations are reliability events the architecture must survive. This chapter is about making GenAI systems reliable — meeting availability, latency (4.12), and *quality* SLOs (the GenAI-specific SLO dimension — a system can be up and fast and giving bad answers, which is a reliability failure classical SRE doesn't measure) — and the through-line is the provider dependency: the resilience patterns (timeouts, retries, circuit breakers, fallbacks) and the failover (to alternate providers — 3.10) that turn the un-controllable provider into a survivable dependency.

The framing: **reliability for GenAI means surviving the provider dependency and meeting the quality SLO** — the two things classical SRE didn't have to do, layered onto the availability and latency reliability it did.

## Business Motivation

Reliability is the difference between a GenAI system the business can depend on and one that fails when it matters. The provider-dependency risk is the sharp one: model provider outages and degradations happen (every critical external dependency has them), and a GenAI system with no failover is down when its provider is down — for a business-critical system (the customer assistant, the internal copilot the organization now relies on), that's a business outage caused by a dependency the enterprise doesn't control (4.14's operational-resilience concern, and increasingly a regulatory one in sectors with third-party-dependency rules). The quality-SLO dimension is the subtle one: a system that's up and fast but degraded in quality (a model change dropped its accuracy, a retrieval failure — 4.1, a bad deploy — 5.7) is failing its users even though the availability dashboard is green (4.10's quality plane, as a reliability concern) — quality is a reliability dimension for GenAI. The business case for reliability engineering is the standard one (availability protects revenue and trust, latency protects adoption — 4.12) plus the GenAI-specific two: the provider failover that makes the system survive its critical dependency's outages, and the quality SLO that ensures "reliable" means "giving good answers" not just "responding." Getting reliability right is what lets the business *depend* on the GenAI system for the workflows its value case assumed.

## Theory

### SLOs across three dimensions

GenAI systems need SLOs on three dimensions (classical two plus the GenAI one):

- **Availability** — the system responds (classical): uptime targets, error-budget discipline (SRE's error budget — the allowed unreliability that balances reliability against velocity — 5.7), measured across the request path including the provider dependency.
- **Latency** (4.12) — the system responds *fast enough*: the TTFT and total SLOs at the tail (4.12), a reliability dimension (a system too slow to use is unreliable for its purpose).
- **Quality** — the system gives *good* answers (the GenAI-specific dimension): the quality signals (4.7/4.10's quality plane) as SLO — a quality-regression is a reliability event, caught by the quality-plane monitoring (4.10) and the eval gates (5.7), because "up and fast but wrong" is a failure the availability SLO misses. This is the reliability dimension classical SRE doesn't have, and it's why 4.7's evaluation and 4.10's quality plane are reliability infrastructure.

### The provider dependency and failover

The GenAI-specific reliability core:

- **The provider as critical dependency** — the model provider is external, uncontrolled, and on the critical path; its outages, degradations (slower, or quality-shifted — 2.6's silent re-releases), and deprecations (3.10's fire drill) are reliability events. The dependency risk is concentrated (everything routed to one provider fails together — 5.8's single-provider limit, reliability edition).
- **Multi-provider failover** (3.10, 5.4) — the primary mitigation: the gateway (5.4) routes to a fallback provider (a different provider's comparable model — 3.10's portfolio) when the primary degrades, transparent to applications (they call by task class — 5.4). The failover's prerequisites (from 3.10): the fallback must be eval-evidenced *before* the outage (a fallback never tested against the suite is a hope), and the prompts must be portable across the primary/fallback pair (the design constraint 3.10 flagged). Failover is what turns the concentrated provider risk into a survivable one.
- **The circuit breaker** (5.4) — detecting provider degradation and failing over: the circuit breaker trips on sustained provider failure (errors, timeouts, rate-limit exhaustion) and routes to the fallback, with the half-open recovery testing when to route back — the classical pattern, applied to the provider dependency.

### The resilience patterns for LLM failure modes

The classical resilience patterns, matched to LLM failure modes (4.6's matched retries, reliability edition):

- **Timeouts** — per-call, respecting the latency SLO (4.12); the long-tail request (4.12) that would hang gets a timeout with graceful degradation (a partial, an acknowledgment — 3.1's fallback ladder, 4.12's tail management).
- **Retries** — matched to the failure mode (4.6): transport/5xx/rate-limit with backoff and jitter (avoiding the retry storm — 4.6/5.8), *not* blind-retrying refusals or validation failures (4.6's matched policy).
- **Circuit breakers and fallbacks** — the provider failover (above), plus fallback behaviors within a system (a degraded-but-working response, a cached answer, a simpler capability — 3.1's fallback ladder) when the full path fails.
- **Graceful degradation** — the system-level version of 3.1's ladder and 4.6's backpressure: when a component fails (retrieval down, a tool unavailable, the provider degraded), the system degrades to a reduced capability (answer without retrieval and say so, skip the unavailable tool, use the fallback provider) rather than failing entirely — the difference between a partial outage and a full one.

### Disaster recovery for GenAI

DR planning for the GenAI-specific data and dependencies:

- **What to back up** — the *irreplaceable* (the source data — 5.5, the golden sets — 4.7, the training data — 2.6, the manifests — 5.7) and the *expensive-to-rebuild* (the vector index — 5.6, rebuildable from sources but at re-embedding cost); the *derived-and-cheap* (caches, some traces) need not be backed up (rebuildable). The DR discipline (5.5's rebuildability) is knowing what's truth (back up) vs. derived (rebuild).
- **Recovery of the stateful and provider-dependent** — recovering the stateful stores (vector, state — from backup or rebuild), and the provider dependency (the multi-provider failover *is* the provider-outage DR — the system stays up on the fallback while the primary recovers).
- **The DR plan** — RTO/RPO targets (classical), the recovery runbook (rehearsed — the DR drill, like 3.10's migration and 4.9's incident rehearsals), and the multi-region considerations (5.1, 5.11) for regional-outage survival.

## Architecture Perspective

```mermaid
flowchart LR
    REQ[Request] --> GW[Gateway — 5.4]
    GW --> CB{Circuit breaker}
    CB -->|healthy| PRIMARY[(Primary provider)]
    CB -->|degraded| FALLBACK[(Fallback provider — 3.10<br/>eval-evidenced, prompt-portable)]
    GW --> RESIL[Resilience: timeouts, matched retries,<br/>graceful degradation — 4.6/3.1]
    subgraph SLO [Three-dimension SLOs]
        AVAIL[Availability + error budget]
        LAT[Latency — 4.12]
        QUAL[Quality — 4.7/4.10<br/>GenAI-specific]
    end
    SLO -.monitored, alerted — 4.10.-> GW
    subgraph DR [Disaster recovery]
        BACKUP[Back up the irreplaceable:<br/>sources, golden sets, manifests]
        REBUILD[Rebuild the derived:<br/>vector index — 5.6]
    end
    QUAL -.regression = reliability event.-> ALERT[Quality-plane alerts — 4.10]
```

Readings. **Quality is a reliability dimension** — the GenAI-specific SLO that classical SRE doesn't have, which makes the evaluation (4.7) and quality-plane monitoring (4.10) *reliability infrastructure*: a quality regression (a model change, a retrieval failure, a bad deploy) is a reliability event caught by the quality SLO, and "up and fast but wrong" is a failure the availability SLO structurally misses. **The multi-provider failover is the provider-outage DR** — the failover that survives the provider's routine degradation (5.4's circuit breaker) is the same mechanism that survives its outage (the provider-dependency DR), which is why the failover (eval-evidenced, prompt-portable — 3.10) is the reliability keystone for the GenAI-specific dependency risk, and why 3.10's portfolio and 5.4's gateway are reliability infrastructure. **And DR discipline is the truth-vs-derived judgment** (5.5): back up the irreplaceable (sources, golden sets, manifests) and rebuild the derived (the vector index — expensive but reconstructable — 5.6), the same rebuildability that made 4.1's indexes cattle now serving DR — knowing what must be preserved vs. what can be regenerated.

## Real-world Example

**Kestrel Assurance** (1.6, 2.6, 3.3, 4.6) engineered reliability for the claims-correspondence system because it was business-critical (regulatory response deadlines — 4.6's durable-workflow story) and provider-dependent, and the reliability engineering is where 4.6's durability met the provider-dependency risk. The three-dimension SLOs were set: availability (the system must be up for the deadline-bound claims workflow), latency (4.12's adjuster-facing responsiveness), and *quality* (the correspondence must meet the tone and liability-line bar — 3.3/4.8 — a quality regression being a reliability event, because a system producing bad letters is failing even if it's up). The provider-dependency reliability was the sharp lesson: the Monday-peak provider brownout (4.6's incident) was a reliability event, survived by the multi-provider failover (the gateway's circuit breaker routing the drafting to the fallback provider — 3.10's portfolio, eval-evidenced before the outage, prompts portable across the pair) — the system stayed up on the fallback while the primary recovered, the adjusters never knew, and the deadline-bound claims flowed. The quality-SLO dimension caught a different reliability event: a model upgrade (2.6) subtly shifted the correspondence tone (3.3's Kestrel story), which the availability and latency dashboards showed as green but the quality-plane monitoring (4.10) and the eval gates (5.7) flagged as a quality regression — a reliability event invisible to classical SRE, caught by the GenAI-specific quality SLO. The DR plan applied the truth-vs-derived discipline: the source claim data, the golden sets, the fine-tune training data (2.6), and the deployment manifests (5.7) backed up (irreplaceable); the vector index (4.1/5.6) marked rebuildable-from-sources (derived, expensive but reconstructable); and the DR runbook rehearsed. Marta's reliability-review note: *"Reliable doesn't just mean up — it means up, fast, and giving good letters, and surviving the provider we don't control. The failover kept us up through the brownout; the quality SLO caught the regression the uptime dashboard couldn't see. Both are reliability, and the second one is the one classical SRE never taught us."*

## Hands-on Exercise

**Design GenAI reliability.** ~90 minutes. Analysis-primary with optional resilience-pattern implementation.

1. **Three-dimension SLOs (25 min).** For a GenAI system you know, set SLOs on availability, latency (4.12), and quality (4.7/4.10). For the quality SLO specifically, state the signal (acceptance, eval score) and the threshold that constitutes a reliability event, and how it's monitored (4.10's quality plane).
2. **Provider failover (30 min).** Design the multi-provider failover: the circuit breaker (trip conditions), the fallback provider (eval-evidenced — 3.10), the prompt portability (3.10's constraint), and the transparency to applications (call by task class — 5.4). Implement a simple version (a circuit breaker failing over to a fallback on simulated provider failure) if coding.
3. **Resilience patterns (20 min).** Design the resilience for the LLM failure modes: timeouts with graceful degradation (4.12's tail), matched retries (4.6 — backoff for transport, no blind-retry for refusals), and the graceful-degradation behavior when a component (retrieval, a tool) fails (reduced capability, not full failure).
4. **DR plan (15 min).** Apply the truth-vs-derived discipline: list what to back up (irreplaceable: sources, golden sets, manifests, training data) vs. rebuild (derived: vector index). State the RTO/RPO and the provider-outage recovery (the failover as DR).

**Acceptance criteria:**
- [ ] SLOs on all three dimensions; the quality SLO has a signal, threshold, and monitoring
- [ ] Provider failover designed with circuit breaker, eval-evidenced fallback, prompt portability, and app transparency
- [ ] Resilience patterns matched to LLM failure modes; graceful degradation designed
- [ ] DR plan applies truth-vs-derived (back up vs. rebuild) with RTO/RPO and provider-outage recovery

## Enterprise Considerations

Enterprise GenAI reliability is a critical-system and regulatory concern. **The provider dependency is an operational-resilience and third-party-risk concern** (4.14, 6.10): regulated sectors have third-party-dependency and operational-resilience rules (financial services especially) that a critical GenAI system's provider dependency falls under — the multi-provider failover is partly a regulatory requirement (demonstrable ability to survive a provider outage), and the provider-concentration risk is a board-and-audit-committee concern (3.10's concentration risk, reliability edition). **Reliability is a platform capability** (7.9, 5.4): the failover, the resilience patterns, and the SLO monitoring live at the gateway and the observability platform (5.4/4.10), so reliability is inherited by consuming systems from the platform rather than each team engineering its own — the platform's reliability tier is the estate's floor. **The quality SLO needs organizational recognition** (4.7): treating quality as a reliability dimension (not just a nice-to-have measured occasionally) means the quality-plane monitoring (4.10) and the eval gates (5.7) are on-call-worthy reliability infrastructure — a quality regression pages someone, like an availability incident — which is an operational-maturity step many organizations haven't taken. **And DR and incident response integrate** (4.9, 4.14): the DR plan, the provider-outage runbook, and the AI-incident runbooks (4.9's injection, 4.14's breach, 2.8's bias) are the enterprise's GenAI operational-readiness posture, rehearsed together (6.9's readiness).

## Trade-offs

| Decision | Option A | Option B | Choose A when… | Choose B when… |
|----------|----------|----------|----------------|----------------|
| Provider dependency | Multi-provider failover | Single provider | Business-critical systems; regulated operational-resilience | Non-critical, tolerant of provider-outage downtime — with the risk accepted |
| Quality as SLO | Quality is a monitored, paged reliability dimension | Quality checked occasionally | Any system the business depends on for good answers | Never for critical systems — "up but wrong" is a failure |
| DR for the index | Rebuild from sources (derived) | Back up the index | Default — the index is derived (5.5's rebuildability) | Rebuild time exceeds RTO — then back up the expensive-to-rebuild index too |
| Degradation | Graceful (reduced capability) | Hard failure | Interactive/critical UX — degrade, don't fail | Where a wrong partial answer is worse than no answer (then fail cleanly) |

## Common Mistakes

1. **Single-provider dependency for a critical system** — no failover, so the system is down when the provider is down (an outage caused by an uncontrolled dependency); multi-provider failover (3.10/5.4) for business-critical systems.
2. **Availability-only SLOs** — measuring up/down but not quality, so the "up but wrong" reliability event (the model regression, the retrieval failure) is invisible; quality is a reliability dimension (4.7/4.10).
3. **Untested failover** — a fallback provider never eval-evidenced before the outage (3.10), so the failover routes to an unvalidated model in the crisis; the fallback is evidenced and prompt-portable ahead of need.
4. **Blind retries causing storms** — un-matched retries (4.6) that retry refusals or synchronize into storms under provider degradation (5.8); matched policies with backoff and jitter.
5. **Hard failure instead of graceful degradation** — a component failure (retrieval, tool) taking the whole system down instead of degrading to reduced capability (3.1's ladder); degrade and say so.
6. **Backing up the derived, not the irreplaceable** — DR that backs up the rebuildable index (5.6) while neglecting the irreplaceable sources/golden sets/manifests; truth-vs-derived (5.5).
7. **Unrehearsed DR and provider-outage recovery** — the failover and DR runbooks untested until the crisis; rehearse (like 3.10's migration and 4.9's incidents).

## Best Practices

1. **Set three-dimension SLOs** — availability, latency (4.12), and quality (4.7/4.10); the quality SLO makes "up but wrong" a monitored, paged reliability event.
2. **Design multi-provider failover for critical systems** — the circuit breaker (5.4) routing to an eval-evidenced, prompt-portable fallback (3.10), transparent to applications; the provider-dependency keystone.
3. **Match resilience patterns to LLM failure modes** — timeouts with graceful degradation (4.12's tail), matched retries with backoff/jitter (4.6), circuit breakers and fallbacks (3.1's ladder).
4. **Degrade gracefully** — reduced capability when a component fails (answer without retrieval and say so, skip the tool, use the fallback), not full failure.
5. **Apply truth-vs-derived to DR** — back up the irreplaceable (sources, golden sets, manifests, training data), rebuild the derived (index — 5.6); know which is which (5.5).
6. **Make reliability a platform capability** — failover, resilience, and SLO monitoring at the gateway and observability platform (5.4/4.10), inherited by consuming systems.
7. **Rehearse DR, failover, and incident runbooks** — the provider-outage recovery, the DR drill, the AI-incident runbooks (4.9/4.14) tested together (6.9's readiness).

## Architecture Checklist

For reliability of any critical GenAI system:

- [ ] SLOs on availability (with error budget), latency (4.12), and quality (4.7/4.10 — the GenAI-specific dimension)
- [ ] Quality regressions are monitored, alerted, and treated as reliability events (quality plane — 4.10, eval gates — 5.7)
- [ ] Multi-provider failover for critical systems: circuit breaker, eval-evidenced and prompt-portable fallback (3.10/5.4), app-transparent
- [ ] Resilience patterns matched to LLM failure modes: timeouts with graceful degradation, matched retries (backoff/jitter, no blind refusal-retry — 4.6)
- [ ] Graceful degradation designed: reduced capability on component failure, not full outage (3.1)
- [ ] DR plan: back up the irreplaceable (sources, golden sets, manifests, training), rebuild the derived (index); RTO/RPO set
- [ ] Provider-outage recovery (the failover) and DR runbook rehearsed
- [ ] Reliability inherited from the platform (gateway, observability — 5.4/4.10); regulatory operational-resilience addressed where applicable (4.14)

## Interview Questions

1. *"What SLOs do you set for a GenAI system, and how do they differ from classical services?"* — Strong answers give three dimensions — availability, latency (4.12), and the GenAI-specific *quality* — and stress that quality is a reliability dimension ("up and fast but wrong" is a failure classical availability SLOs miss), monitored via the quality plane (4.10) and eval gates (5.7) as reliability infrastructure.
2. *"How do you make a GenAI system survive a model provider outage?"* — Strong answers give multi-provider failover: the gateway's circuit breaker routing to an eval-evidenced, prompt-portable fallback provider (3.10/5.4), transparent to applications (call by task class) — with the fallback validated *before* the outage, and note it's partly a regulatory operational-resilience requirement for critical systems (4.14).
3. *"Design disaster recovery for a RAG system."* — Strong answers apply truth-vs-derived (5.5): back up the irreplaceable (source data, golden sets, manifests, any training data), rebuild the derived (the vector index — expensive but reconstructable from sources — 5.6); set RTO/RPO, and note the multi-provider failover as the provider-outage DR.
4. *"Your GenAI system's uptime is 99.9% but users are complaining about bad answers. Is it reliable?"* — Strong answers say no: reliability includes the quality dimension, and a system that's up but giving degraded answers (a model regression, a retrieval failure) is failing its users — the quality SLO and quality-plane monitoring (4.10) exist precisely to catch this reliability event the availability SLO misses.

## Further Reading

- Google SRE book and SRE Workbook (sre.google) — the SLO, error-budget, and failover discipline this chapter extends for GenAI; the definitive reliability-engineering reference.
- Your provider's status, SLA, and reliability documentation (official docs) — the provider dependency's reliability characteristics; the SLA you're depending on and its limits.
- Release-It! (Nygard) — the resilience patterns (circuit breakers, timeouts, bulkheads) this chapter applies to the LLM failure modes; the classical stability-patterns reference.
- 3.10 Model Selection (the cross-provider fallback), 5.4 API Layer (the circuit breaker), 4.10 Observability (the quality plane) — the specific reliability machinery this chapter organizes.

## Summary

- GenAI reliability is **classical SRE plus two GenAI-specific things**: the **quality SLO** (a system up and fast but giving bad answers is failing — a reliability dimension classical SRE doesn't have, making 4.7/4.10 reliability infrastructure) and surviving the **provider dependency** (the critical external dependency you don't control).
- **Multi-provider failover is the provider-dependency keystone**: the gateway's circuit breaker (5.4) routing to an eval-evidenced, prompt-portable fallback (3.10), transparent to applications — the same mechanism surviving routine degradation and outage (the provider-outage DR).
- **Resilience patterns match the LLM failure modes**: timeouts with graceful degradation (4.12's tail), matched retries (backoff/jitter, no blind refusal-retry — 4.6), circuit breakers and fallbacks, and system-level graceful degradation (reduced capability, not full failure — 3.1's ladder).
- **DR applies truth-vs-derived** (5.5): back up the irreplaceable (sources, golden sets, manifests, training), rebuild the derived (the index — 5.6); rehearse the recovery.
- Reliability is a **platform capability** (5.4/4.10) inherited by consuming systems, and a **regulatory operational-resilience concern** for critical systems (4.14). The infrastructure that codifies and provisions all of this reliably is next: **infrastructure as code & platform engineering** (5.10).

---

**Previous:** [Chapter 5.8 — Scalability Patterns](chapter-08-scalability-patterns.md) · **Next:** [Chapter 5.10 — Infrastructure as Code & Platform Engineering](chapter-10-iac-platform-engineering.md) · **Related:** [3.10 Model Selection](../part-3-core-building-blocks-of-genai/chapter-10-model-selection-benchmarking.md), [5.4 API & Integration Layer](chapter-04-api-integration-layer.md), [4.10 Observability](../part-4-enterprise-genai-systems/chapter-10-observability.md)
