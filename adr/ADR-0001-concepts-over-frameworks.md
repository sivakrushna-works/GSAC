# ADR-0001: Organize around timeless concepts, not tools or frameworks

| | |
|---|---|
| **Status** | Accepted |
| **Date** | 2026-07-08 |
| **Deciders** | Curriculum author |

## Context

GenAI tooling churns quarterly: orchestration frameworks, vector databases, and model APIs rise and fall within a single cohort's study period. A curriculum organized around specific tools would need continuous rewrites and would train learners in vocabulary that expires. Meanwhile, the concepts underneath — retrieval, grounding, evaluation, trade-off analysis, threat modeling — have been stable across every wave of tooling and predate GenAI in most cases.

## Options Considered

### Option 1 — Framework-first (e.g., structure parts around popular stacks)
- Pros: immediately practical; matches job-ad keywords; easy to produce runnable examples.
- Cons: expires within 12–18 months; teaches recipes, not judgment; couples every chapter to vendor decisions.

### Option 2 — Concepts-first, frameworks as illustrations
- Pros: durable; transfers across providers and clouds; matches how architects are actually evaluated (judgment, trade-offs).
- Cons: exercises need periodic refresh anyway; learners wanting copy-paste recipes must adapt examples.

## Decision

Concepts-first. Chapters are named after concepts (e.g., "Embeddings & Semantic Search," never "Working with <vendor DB>"). Frameworks and providers may appear only in *Real-world Example* and *Hands-on Exercise* sections, clearly marked as interchangeable, with official documentation linked rather than paraphrased.

## Consequences

**Positive:** the curriculum survives tool churn; terminology stays consistent; chapters cross-link cleanly because concepts don't overlap the way tool features do.

**Negative / accepted risks:** hands-on exercises still reference concrete tools and will need refresh passes (~2×/year); some learners will find the on-ramp slower than a framework tutorial.

**Revisit when:** a concept-level shift occurs (as transformers were to RNNs), not when a new framework trends.
