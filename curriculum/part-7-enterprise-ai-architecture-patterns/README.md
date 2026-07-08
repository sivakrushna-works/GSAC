# Part 7 — Enterprise AI Architecture Patterns

A pattern language for GenAI systems. Each pattern chapter uses a consistent form: **Context → Problem → Forces → Solution → Structure (diagram) → Consequences → Known uses → Related patterns**. Patterns are how architects compress experience; this part is the curriculum's reference core, cross-linked from every case study.

**Maturity target:** Level 4 · **Estimated effort:** 4–5 weeks

## Chapters

| # | Chapter | Level | Patterns covered |
|---|---------|-------|------------------|
| 7.1 | A Pattern Language for GenAI | 3 | How to read, apply, and combine patterns; the catalog map |
| 7.2 | RAG Patterns | 4 | Basic RAG, hybrid retrieval, reranked RAG, agentic retrieval, GraphRAG-style knowledge patterns, citation-first design |
| 7.3 | Workflow Patterns | 4 | Prompt chaining, routing, parallelization, orchestrator–workers, evaluator–optimizer |
| 7.4 | Agentic Patterns | 4 | Bounded agent loop, planner–executor, reflection, tool sandbox, checkpoint & resume |
| 7.5 | Human-in-the-Loop Patterns | 4 | Approval gate, review sampling, escalation, confidence-based routing, draft-not-send |
| 7.6 | Safety & Guardrail Patterns | 4 | Layered filters, dual-model verification, constrained decoding, output quarantine, kill switch |
| 7.7 | Knowledge & Data Patterns | 4 | Freshness pipeline, ACL-propagated index, tenant isolation, forgetting/deletion, feedback-to-dataset loop |
| 7.8 | Cost & Performance Patterns | 4 | Model tiering/routing, semantic caching, prompt compression, batch lanes, budget enforcement |
| 7.9 | Platform & Multi-tenancy Patterns | 4 | GenAI gateway, shared eval service, prompt registry, usage metering & chargeback, central model governance |
| 7.10 | Anti-patterns | 4 | Agent-for-everything, demo-driven architecture, eval-free shipping, prompt spaghetti, framework lock-in, unbounded autonomy |

## Exit criteria

- For three case studies from the [catalog](../../case-studies/), name the patterns in play and one pattern that would have improved the outcome

**Previous:** [Part 6](../part-6-enterprise-architecture/) · **Next:** [Part 8 — Professional Excellence & Career Development](../part-8-professional-excellence/)
