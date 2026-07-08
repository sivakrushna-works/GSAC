# ADR-0002: Eight-part structure ordered mindset → fundamentals → systems → enterprise → career

| | |
|---|---|
| **Status** | Accepted |
| **Date** | 2026-07-08 |
| **Deciders** | Curriculum author |

## Context

The target learner is an experienced engineer (5–15 years) becoming an enterprise GenAI Solution Architect. The gap is rarely coding ability; it is (a) architect mindset and business fluency, (b) AI fundamentals, (c) production/enterprise discipline. The ordering of material determines whether learners build judgment or just accumulate techniques.

## Options Considered

### Option 1 — Technology-first (start with LLMs/RAG, add "soft skills" at the end)
- Pros: fast gratification; matches most online courses.
- Cons: produces builders, not architects; learners design systems for weeks before learning trade-off analysis, the tool they need to design anything well.

### Option 2 — Mindset-first, eight parts: Foundation → AI → GenAI blocks → Enterprise systems → Cloud/platform → EA → Patterns → Career
- Pros: judgment tools (trade-offs, business framing, communication) arrive before design work begins; fundamentals precede applications; patterns arrive last, once learners have the experience to compress; career material lands when there is a portfolio to present.
- Cons: delayed gratification; experienced architects must skim Part 1.

## Decision

Option 2. Eight parts: 1) Professional Foundation, 2) Artificial Intelligence, 3) Core Building Blocks of GenAI, 4) Enterprise GenAI Systems, 5) Cloud/Infrastructure/Platform, 6) Enterprise Architecture, 7) Enterprise AI Architecture Patterns, 8) Professional Excellence. The [ROADMAP](../ROADMAP.md) gives explicit skip guidance so experienced readers aren't held hostage by the ordering.

## Consequences

**Positive:** every design exercise from Part 3 onward can assume trade-off and communication skills; Part 7 patterns can reference concrete chapters instead of introducing concepts.

**Negative / accepted risks:** learners who ignore skip guidance may stall in familiar material; parts are interdependent, so structural changes ripple (mitigated by ADR discipline).

**Revisit when:** learner feedback shows systematic drop-off in Parts 1–2, or the role itself splits (e.g., AI platform architect vs. AI solution architect become distinct curricula).
