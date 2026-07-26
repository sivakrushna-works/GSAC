# Part 7 — Enterprise AI Architecture Patterns

A pattern language for AI systems — the GenAI families (7.2–7.9), the classical predictive & scoring family (7.11), and the anti-patterns (7.10). Each pattern chapter uses a consistent form: **Context → Problem → Forces → Solution → Structure (diagram) → Consequences → Known uses → Related patterns**. Patterns are how architects compress experience; this part is the curriculum's reference core, cross-linked from every case study. (7.11 is numbered after the anti-patterns to preserve existing links; read it with the family chapters, and keep 7.10 as the closing read.)

**Maturity target:** Level 4 · **Estimated effort:** 4–5 weeks

## Chapters

| # | Chapter | Level | Patterns covered |
|---|---------|-------|------------------|
| 7.1 | [A Pattern Language for GenAI](chapter-01-pattern-language.md) | 3 | How to read, apply, and combine patterns; the catalog map |
| 7.2 | [RAG Patterns](chapter-02-rag-patterns.md) | 4 | Basic RAG, hybrid retrieval, reranked RAG, agentic retrieval, GraphRAG-style knowledge patterns, citation-first design |
| 7.3 | [Workflow Patterns](chapter-03-workflow-patterns.md) | 4 | Prompt chaining, routing, parallelization, orchestrator–workers, evaluator–optimizer |
| 7.4 | [Agentic Patterns](chapter-04-agentic-patterns.md) | 4 | Bounded agent loop, planner–executor, reflection, tool sandbox, checkpoint & resume |
| 7.5 | [Human-in-the-Loop Patterns](chapter-05-human-in-the-loop-patterns.md) | 4 | Approval gate, review sampling, escalation, confidence-based routing, draft-not-send |
| 7.6 | [Safety & Guardrail Patterns](chapter-06-safety-guardrail-patterns.md) | 4 | Layered filters, dual-model verification, constrained decoding, output quarantine, kill switch |
| 7.7 | [Knowledge & Data Patterns](chapter-07-knowledge-data-patterns.md) | 4 | Freshness pipeline, ACL-propagated index, tenant isolation, forgetting/deletion, feedback-to-dataset loop |
| 7.8 | [Cost & Performance Patterns](chapter-08-cost-performance-patterns.md) | 4 | Model tiering/routing, semantic caching, prompt compression, batch lanes, budget enforcement |
| 7.9 | [Platform & Multi-tenancy Patterns](chapter-09-platform-multitenancy-patterns.md) | 4 | GenAI gateway, shared eval service, prompt registry, usage metering & chargeback, central model governance |
| 7.10 | [Anti-patterns](chapter-10-anti-patterns.md) | 4 | Agent-for-everything, demo-driven architecture, eval-free shipping, prompt spaghetti, framework lock-in, unbounded autonomy |
| 7.11 | [Predictive & Scoring Patterns](chapter-11-predictive-scoring-patterns.md) | 4 | Batch scoring, online feature-served inference, two-stage retrieve-then-rank, champion–challenger, shadow scoring, drift-triggered retraining, exploration slice |

## Exit criteria

- For three case studies from the [catalog](../../case-studies/), name the patterns in play and one pattern that would have improved the outcome

**Previous:** [Part 6](../part-6-enterprise-architecture/) · **Next:** [Part 8 — Professional Excellence & Career Development](../part-8-professional-excellence/)
