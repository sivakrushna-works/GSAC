# Chapter 6.9 — Architecture Governance: Boards, Reviews & Standards

| | |
|---|---|
| **Part** | 6 — Enterprise Architecture |
| **Maturity level** | 4 — Architect |
| **Difficulty** | Advanced |
| **Estimated study time** | 3 hours (reading 90 min, exercise 90 min) |
| **Prerequisites** | [1.8 Leadership & Influence](../part-1-professional-foundation/chapter-08-leadership-influence.md); [6.3](chapter-03-adrs-decision-governance.md) |

## Learning Objectives

After this chapter you will be able to:

1. Run architecture review boards that help instead of block: the review that adds value, the standards that enable, the exceptions that flex.
2. Establish the governance that a large GenAI portfolio needs: the review process, the standards, the exception process, and the AI-specific governance.
3. Design governance that scales through enabling rather than gating: the paved-road governance (1.8/5.10) that makes the right thing easy rather than the mandate that gets routed around.
4. Integrate the AI governance into the enterprise governance, and connect it to the responsible-AI and compliance governance (2.8/4.14).

## Introduction

This chapter is the governance function that oversees the GenAI portfolio — the review boards, the standards, and the exception processes that keep the portfolio coherent, well-architected, and governed. It's been referenced throughout Part 6 (the review boards of 6.3's decision governance, the standards of 6.1, the governance of 4.14's compliance) and Parts 4–5 (the governance gates, the golden-path governance of 5.10); this chapter builds the governance function itself, with the recurring lesson from 1.8 and 5.10: **governance scales through enabling, not gating** — the review that helps, the standards that enable, the paved road (5.10) that makes the right thing easy — versus the review that blocks, the standards that constrain, the mandate that gets routed around.

The framing: **architecture governance helps by enabling, not blocking by gating** — the review board that adds value (the help — the expertise, the coordination, the risk-surfacing), the standards that enable (the golden paths — 5.10, the reusable capabilities), and the exception process that flexes (the standards that flex where warranted) — the enabling governance that scales (1.8's influence, 5.10's paved road), versus the blocking governance that gets routed around (the mandate teams evade — 1.8/2.8/4.14/5.10's integrate-don't-parallel).

## Business Motivation

Architecture governance is what keeps a large GenAI portfolio coherent and well-architected — the governance that prevents the sprawl, the risk, and the incoherence that scale otherwise brings. Without it: the portfolio sprawls (the un-governed proliferation — the recurring Part 4/5 anti-pattern), the risks are un-surfaced (the un-reviewed systems with the un-caught risks — 4.9's security, 4.14's compliance, 2.8's responsible-AI), and the portfolio is incoherent (the inconsistent architectures, the un-shared capabilities — the platform-that-wasn't). But *bad* governance is as costly as none: the blocking governance (the review board that gates and delays, the standards that constrain, the mandate that gets routed around — 1.8's routed-around mandate) slows the portfolio (the delay), obstructs the teams (the friction), and gets evaded (the shadow AI — the un-governed systems the blocking governance drove underground). The business case is the enabling-governance one: the governance that helps (the review that adds value, the standards that enable via golden paths — 5.10, the exceptions that flex) keeps the portfolio coherent and well-architected *and* moves fast (the enabling governance the teams adopt because it helps — 1.8/5.10), while the blocking governance slows and gets evaded — the difference between governance that scales the portfolio and governance that obstructs it. The architect who builds enabling governance (the help, the paved road, the flex) makes the portfolio governable *and* fast, which is the governance that scales GenAI (1.8/5.10's paved road, at the governance-function level).

## Theory

### Review boards that help, not block

The review that adds value:

- **The value-adding review** — the review board that helps (the expertise — the architects' review surfacing the risks and the improvements, the coordination — the review connecting the initiative to the related work and the shared capabilities, the risk-surfacing — the review catching the security — 4.9, compliance — 4.14, and responsible-AI — 2.8 risks); the review that adds value (the teams want the review because it helps — 1.8's influence, the review as a help not a gate).
- **The blocking anti-pattern** (1.8) — the review board that gates and delays (the review as a bureaucratic gate, the delay, the friction), which the teams route around (the shadow AI — 1.8/5.10); the blocking governance that gets evaded, the anti-pattern the value-adding review avoids.
- **The review scoped to significance** (6.3) — the review scoped to the architecturally-significant (the significant initiatives reviewed, not every initiative — the review scaled by significance — 6.3), so the review adds value where it matters (the significant) without gating everything (the everything-reviewed ceremony — 6.1).

### Standards that enable, not constrain

The standards as enablers:

- **The enabling standard** (5.10) — the standard as an enabler (the golden path — 5.10, the reusable capability, the paved road that makes the right thing easy — 1.8/5.10), so the teams adopt the standard because it helps (the golden-path standard the teams take because it's easier — 5.10's governance-at-scale mechanism); the standard as an enabler, not a constraint.
- **The constraining anti-pattern** — the standard as a constraint (the mandate the teams must follow, the constraint the teams evade — 1.8's routed-around mandate); the constraining standard that gets evaded, the anti-pattern the enabling standard avoids.
- **The standard as a paved road** (5.10) — the standard embodied in the golden path (5.10 — the standard pre-wired into the reusable template, the compliant-by-default), so the standard is the easy path (the paved road, the make-the-right-thing-easy — 1.8/5.10); the standard as the paved road, the governance-at-scale mechanism.

### The exception process that flexes

The standards that flex:

- **The exception process** — the process for the exceptions (the cases where the standard doesn't fit — the warranted deviation), so the standards flex (the exception granted where warranted, the standard not a rigid constraint); the flex that keeps the standards enabling (the standard flexes for the warranted exception, not a rigid mandate).
- **The exception as a signal** — the exception as a signal (the frequent exception signaling the standard needs updating — the standard evolving from the exceptions); the exception process that improves the standards (the exceptions informing the standard's evolution).
- **The balance** — the balance between the standard (the coherence, the reuse) and the flex (the warranted deviation), so the governance is neither rigid (the everything-must-conform) nor loose (the anything-goes) — the balanced governance (the standard that enables, the exception that flexes).

### The AI-specific governance

The governance the GenAI portfolio specifically needs:

- **The responsible-AI governance** (2.8) — the classification (the risk-tier — 2.8), the fairness and oversight review (2.8), the AI-specific risk governance; the responsible-AI governance the AI portfolio needs (2.8's governance, in the governance function).
- **The compliance governance** (4.14) — the classification register (4.14), the review gates (4.14), the model-risk-management (4.14); the compliance governance the AI portfolio needs (4.14's governance, in the governance function).
- **The integration** (2.8/4.14's integrate-don't-parallel) — the AI-specific governance integrated into the enterprise governance (the responsible-AI and compliance governance part of the enterprise governance function, not a parallel AI governance) — the integrate-don't-parallel (governance edition), so the AI governance is coherent (part of the enterprise governance) and enabling (the help, the paved road).

## Architecture Perspective

```mermaid
flowchart TD
    subgraph GOV [Architecture governance — enabling, not blocking]
        REVIEW[Review boards<br/>help: expertise, coordination, risk-surface]
        STANDARDS[Standards as enablers<br/>golden paths — 5.10]
        EXCEPTION[Exception process<br/>flexes, signals]
    end
    REVIEW -.scoped to significance — 6.3.-> SIGNIFICANT[Significant initiatives]
    STANDARDS -.embodied in.-> PAVEDROAD[Paved road — 5.10<br/>make right thing easy — 1.8]
    EXCEPTION -.improves.-> STANDARDS
    AIGOV[AI-specific governance<br/>responsible-AI 2.8, compliance 4.14] -.integrated into.-> GOV
    GOV -.enables.-> COHERENT[Coherent, well-architected,<br/>governed portfolio — fast]
    BLOCKING[Blocking governance<br/>gate, constrain, mandate] -.routed around.-> SHADOW[Shadow AI — 1.8/5.10]
```

Readings. **Governance scales through enabling, not gating** — the review that helps (the value-adding expertise, coordination, risk-surfacing — the teams want it), the standards that enable (the golden paths — 5.10, the make-the-right-thing-easy — 1.8), and the exceptions that flex (the warranted deviation) are the enabling governance the teams adopt (1.8's influence, 5.10's paved road), versus the blocking governance (the gate, the constraint, the mandate) that gets routed around (the shadow AI — 1.8/5.10's integrate-don't-parallel) — the enabling-vs-blocking distinction is the governance-that-scales lesson. **The paved road is the governance-at-scale mechanism** (5.10) — the standards embodied in the golden paths (5.10 — the compliant-by-default, the make-the-right-thing-easy) are how the governance scales (the teams adopt the golden path because it helps, getting the governance by default — 5.10's governance-at-scale), the culmination of the recurring paved-road lesson (1.8/5.10). **And the AI-specific governance integrates into the enterprise governance** — the responsible-AI (2.8) and compliance (4.14) governance integrated (integrate-don't-parallel, governance edition), so the AI governance is coherent (part of the enterprise governance) and enabling (the help, the paved road) — the AI governance not a parallel blocking bureaucracy but part of the enabling enterprise governance.

## Real-world Example

**Vantora Systems** (the platform arc — 1.8 through 5.10) built the architecture governance for its GenAI portfolio, and the governance is where 1.8's influence and 5.10's paved road became the enabling governance function. The enabling-vs-blocking lesson was learned from the contrast (1.8's pre-platform era): the early era had no governance (the scattered eleven-teams-six-models chaos — 1.8), and the naive fix would have been blocking governance (a review board that gates every AI initiative, standards that mandate) — which Vantora explicitly avoided (the blocking governance would have been routed around — the shadow AI — 1.8's routed-around mandate). Instead, Vantora built enabling governance: the review boards helped (the architects' review surfacing the risks — 4.9/4.14/2.8 — and the improvements, connecting the initiatives to the shared platform — 5.10, the value-adding review the teams wanted — 1.8), scoped to the significant (6.3 — the significant initiatives reviewed, not every one); the standards enabled via the golden paths (5.10 — the golden-path template with the governance pre-wired, the compliant-by-default, the make-the-right-thing-easy — 1.8/5.10's governance-at-scale); and the exception process flexed (the warranted deviations granted, the frequent exceptions informing the standards' evolution). The AI-specific governance integrated (2.8/4.14's integrate-don't-parallel, governance edition): the responsible-AI classification and review (2.8) and the compliance governance (4.14 — the classification register, the review gates) were part of the enterprise governance function (not a parallel AI governance), so the AI governance was coherent and enabling. The adoption told the enabling-governance story (1.8's Marek-pilot-to-platform, governance edition): the teams adopted the golden-path governance (nine of eleven — 5.10) because it helped (the paved road easier than reinventing, the governance by default — 5.10), not because it was mandated — the enabling governance the teams took, versus the blocking governance they'd have evaded. Adaeze's governance note: *"Governance scales by enabling, not blocking. The blocking governance — the gate, the mandate — gets routed around (the shadow AI — 1.8). The enabling governance — the review that helps, the standards embodied in the golden paths — 5.10, the exceptions that flex — the teams adopt because it helps. We built the enabling governance: the value-adding review, the paved-road standards (the compliant-by-default golden path — 5.10), the flexing exceptions, the AI-specific governance (2.8/4.14) integrated into the enterprise governance. The teams took the governance because it was the easy path — that's how governance scales GenAI: help, don't block; pave the road, don't mandate."*

## Hands-on Exercise

**Design the enabling governance.** ~90 minutes. Analysis-primary, for a GenAI portfolio (real or a case study's).

1. **The review board (25 min).** Design a value-adding review board: what value it adds (expertise, coordination, risk-surfacing — 4.9/4.14/2.8), scoped to significance (6.3 — the significant initiatives), and how it helps rather than blocks (1.8). Contrast with the blocking anti-pattern.
2. **The enabling standards (30 min).** Design the standards as enablers (the golden paths — 5.10 — with the governance pre-wired, the compliant-by-default, the make-the-right-thing-easy — 1.8/5.10). Show how the teams adopt them because they help (versus the constraining mandate they'd evade).
3. **The exception process (20 min).** Design the exception process (the warranted deviations, the flex), and how the exceptions inform the standards' evolution (the exception as a signal). Show the balance (neither rigid nor loose).
4. **The AI-specific governance (15 min).** Integrate the AI-specific governance (responsible-AI — 2.8, compliance — 4.14) into the enterprise governance (integrate-don't-parallel, governance edition), and show how it's enabling (the help, the paved road) not blocking.

**Acceptance criteria:**
- [ ] The review board adds value (expertise, coordination, risk-surfacing), scoped to significance, helps not blocks
- [ ] The standards enable via golden paths (5.10 — compliant-by-default, make-right-thing-easy); the teams adopt because it helps
- [ ] The exception process flexes and signals; the balance (neither rigid nor loose)
- [ ] The AI-specific governance (2.8/4.14) integrated into the enterprise governance, enabling not blocking

## Enterprise Considerations

Architecture governance is a core enterprise-governance function that the AI governance integrates with. **It's part of the enterprise governance** (6.1, 2.8/4.14's integrate-don't-parallel): the enterprise has an architecture-governance function (the review boards, the standards, the EA function — 6.1), and the AI governance is part of it (the AI review integrated with the enterprise review, the AI standards part of the enterprise standards, the AI-specific governance — 2.8/4.14 — integrated) — the integrate-don't-parallel (governance edition), so the AI governance is coherent (part of the enterprise governance) and enabling. **The enabling-governance discipline is a cultural-and-organizational capability** (1.8, 8.8): building enabling governance (the help, the paved road, the flex) rather than blocking governance is a cultural capability (the governance that helps, that the teams adopt — 1.8's influence, 5.10's paved road), which is a principal-level contribution (8.8 — the enabling governance the principal architect builds) — the enabling-vs-blocking is an organizational-maturity capability. **The governance serves the responsible-AI and compliance obligations** (2.8/4.14): the AI governance (the responsible-AI classification and review — 2.8, the compliance governance — 4.14) is how the enterprise meets the responsible-AI and compliance obligations at the portfolio level (2.8/4.14's governance, the review gates, the classification register), so the governance is a compliance-and-responsible-AI function (the governance serving the obligations). **And the governance is the portfolio-coherence mechanism** (6.1): the governance (the review, the standards, the exceptions) keeps the portfolio coherent (the consistent architectures, the shared capabilities — 5.10, the well-architected systems), which is the portfolio-coherence the EA function (6.1) depends on — the governance as the portfolio-coherence mechanism.

## Trade-offs

| Decision | Option A | Option B | Choose A when… | Choose B when… |
|----------|----------|----------|----------------|----------------|
| Governance approach | Enabling (help, paved road, flex) | Blocking (gate, constrain, mandate) | Always — the enabling governance scales, the teams adopt it (1.8/5.10) | Never blocking; the blocking governance gets routed around (shadow AI) |
| Standards | Enablers (golden paths — 5.10) | Constraints (mandates) | Always — the golden path the teams take because it helps | Never constraining-mandates; they get evaded (1.8) |
| Review scope | Scoped to significance (6.3) | Everything reviewed | Always — the significant reviewed, adds value where it matters | Never everything; the everything-reviewed is the ceremony (6.1) |
| AI governance | Integrated into the enterprise governance | A parallel AI governance | Always — integrate-don't-parallel (governance edition) | Never; the parallel AI governance is a blocking bureaucracy |

## Common Mistakes

1. **Blocking governance** — the review board that gates and delays, the standards that mandate, the governance the teams route around (the shadow AI — 1.8/5.10); the enabling governance (help, paved road, flex) is what scales.
2. **Standards as constraints** — the standards as mandates the teams must follow and evade (1.8's routed-around mandate); the standards as enablers (the golden paths — 5.10, the make-the-right-thing-easy).
3. **Everything reviewed** — the review board reviewing every initiative (the everything-reviewed ceremony — 6.1); scope the review to significance (6.3 — the significant).
4. **No exception process** — the standards rigid (the everything-must-conform), no flex for the warranted deviation; the exception process flexes (the warranted deviation, the exception as a signal).
5. **The parallel AI governance** — an AI governance disconnected from the enterprise governance (a parallel blocking bureaucracy); integrate-don't-parallel (governance edition — 2.8/4.14).
6. **Governance that doesn't add value** — the review that's a bureaucratic gate, not a help (no expertise, coordination, or risk-surfacing); the value-adding review (the help the teams want — 1.8).
7. **Missing the paved-road mechanism** — the governance by mandate-and-review, not by the golden paths (5.10 — the compliant-by-default, the make-the-right-thing-easy); the paved road is the governance-at-scale mechanism.

## Best Practices

1. **Build enabling governance** — the review that helps (expertise, coordination, risk-surfacing), the standards that enable (the golden paths — 5.10), the exceptions that flex; the enabling governance that scales (1.8/5.10), not the blocking governance that gets routed around.
2. **Embody the standards in the golden paths** — the standards pre-wired into the reusable templates (5.10 — the compliant-by-default, the make-the-right-thing-easy — 1.8), the governance-at-scale mechanism.
3. **Scope the review to significance** — the significant initiatives reviewed (6.3), adding value where it matters, not the everything-reviewed ceremony.
4. **Provide an exception process that flexes and signals** — the warranted deviations granted, the frequent exceptions informing the standards' evolution; the balance (neither rigid nor loose).
5. **Integrate the AI-specific governance** — the responsible-AI (2.8) and compliance (4.14) governance part of the enterprise governance (integrate-don't-parallel, governance edition), enabling not blocking.
6. **Make the review value-adding** — the review the teams want (the help — 1.8's influence), not the gate they evade; the value-adding review.
7. **Build the enabling-governance culture** — the governance that helps, that the teams adopt (1.8/5.10), a principal-level cultural capability (8.8).

## Architecture Checklist

For GenAI portfolio architecture governance:

- [ ] The governance is enabling (help, paved road, flex), not blocking (gate, constrain, mandate)
- [ ] The review boards add value (expertise, coordination, risk-surfacing — 4.9/4.14/2.8), scoped to significance (6.3)
- [ ] The standards enable via golden paths (5.10 — compliant-by-default, make-right-thing-easy); the teams adopt because it helps
- [ ] The exception process flexes (warranted deviations) and signals (informs the standards' evolution); the balance
- [ ] The AI-specific governance (responsible-AI — 2.8, compliance — 4.14) integrated into the enterprise governance (integrate-don't-parallel)
- [ ] The governance serves the responsible-AI and compliance obligations (2.8/4.14) at the portfolio level
- [ ] The governance keeps the portfolio coherent (the EA function's — 6.1); the enabling-governance culture built (8.8)

## Interview Questions

1. *"How do you run an architecture review board that helps instead of blocks?"* — Strong answers give the value-adding review (the expertise, coordination, risk-surfacing — 4.9/4.14/2.8 — the teams want it — 1.8), scoped to significance (6.3), and contrast with the blocking anti-pattern (the gate the teams route around — the shadow AI — 1.8/5.10), stressing that governance scales through enabling, not gating.
2. *"How do you make architecture standards that teams actually follow?"* — Strong answers give the enabling standards (the golden paths — 5.10 — with the governance pre-wired, the compliant-by-default, the make-the-right-thing-easy — 1.8/5.10's governance-at-scale), so the teams adopt them because they help (the paved road easier than reinventing), versus the constraining mandates that get evaded (1.8's routed-around mandate).
3. *"How does AI-specific governance relate to enterprise governance?"* — Strong answers give the integrate-don't-parallel (governance edition — 2.8/4.14): the responsible-AI (2.8) and compliance (4.14) governance integrated into the enterprise governance (not a parallel AI governance), enabling not blocking (the help, the paved road), so the AI governance is coherent and adopted, serving the responsible-AI and compliance obligations at the portfolio level.
4. *"What's the difference between governance that scales and governance that obstructs?"* — Strong answers give the enabling-vs-blocking distinction: the enabling governance (help, paved road — 5.10, flex) the teams adopt because it helps (1.8/5.10), versus the blocking governance (gate, mandate, constraint) the teams route around (the shadow AI) — the enabling governance scales the portfolio, the blocking governance obstructs and gets evaded.

## Further Reading

- 1.8 Leadership & Influence (the paved-road, make-the-right-thing-easy) and 5.10 IaC & Platform Engineering (the golden paths, the governance-at-scale) — the enabling-governance mechanisms this chapter's governance function embodies.
- 2.8 Responsible AI (the classification, review, oversight) and 4.14 Privacy, Compliance & Governance (the classification register, review gates) — the AI-specific governance this function integrates.
- The architecture-governance literature (the EA governance references, the architecture-review-board practices) — the classical governance this chapter makes enabling.
- 6.3 ADRs & Decision Governance (the decision governance the review boards flow) and 8.8 Operating as a Principal Architect (the enabling-governance culture) — the connected chapters.

## Summary

- Architecture governance **helps by enabling, not blocks by gating** — the review that adds value (expertise, coordination, risk-surfacing), the standards that enable (the golden paths — 5.10), and the exceptions that flex — the enabling governance the teams adopt (1.8/5.10), versus the blocking governance (gate, constrain, mandate) that gets routed around (the shadow AI).
- **The paved road is the governance-at-scale mechanism** (5.10) — the standards embodied in the golden paths (the compliant-by-default, the make-the-right-thing-easy — 1.8) are how the governance scales, the culmination of the recurring paved-road lesson (1.8/5.10).
- **The review is scoped to significance** (6.3), the **exception process flexes and signals** (the warranted deviation, the standards' evolution), and the balance keeps the governance neither rigid nor loose.
- The **AI-specific governance** (responsible-AI — 2.8, compliance — 4.14) integrates into the enterprise governance (integrate-don't-parallel, governance edition), serving the responsible-AI and compliance obligations at the portfolio level, enabling not blocking.
- Enabling governance makes the portfolio **governable *and* fast** — the governance that scales GenAI (1.8/5.10's paved road, at the governance-function level), a principal-level cultural capability (8.8). The business case and TCO that justify the whole portfolio are next: **TCO & the business case for AI** (6.10).

---

**Previous:** [Chapter 6.8 — Legacy Modernization & AI Adoption Strategy](chapter-08-legacy-modernization-ai-adoption.md) · **Next:** [Chapter 6.10 — TCO & the Business Case for AI](chapter-10-tco-business-case.md) · **Related:** [1.8 Leadership & Influence](../part-1-professional-foundation/chapter-08-leadership-influence.md), [5.10 IaC & Platform Engineering](../part-5-cloud-infrastructure-platform/chapter-10-iac-platform-engineering.md), [6.3 ADRs & Decision Governance](chapter-03-adrs-decision-governance.md)
