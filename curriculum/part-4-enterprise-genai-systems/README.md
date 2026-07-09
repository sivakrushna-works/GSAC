# Part 4 — Enterprise GenAI Systems

The distance between a demo and a system: evaluation, security, observability, cost, governance. This is the core of the architect's day job and the largest part of the curriculum.

**Maturity target:** Level 3 · **Estimated effort:** 7–8 weeks

## Chapters

| # | Chapter | Level | What you'll be able to do |
|---|---------|-------|---------------------------|
| 4.1 | [Production RAG Architecture](chapter-01-production-rag.md) | 3 | Design RAG for scale: ingestion pipelines, index lifecycle, ACL-aware retrieval |
| 4.2 | [Advanced Retrieval](chapter-02-advanced-retrieval.md) | 3 | Apply hybrid search, reranking, query rewriting, and structure-aware chunking; measure the gain |
| 4.3 | [Document Ingestion at Enterprise Scale](chapter-03-document-ingestion.md) | 3 | Handle messy real-world corpora: formats, tables, OCR, dedup, freshness, deletion |
| 4.4 | [Agent Architectures in Production](chapter-04-agent-architectures-production.md) | 3 | Ship agents with budgets, sandboxing, approvals, and full traceability |
| 4.5 | [Multi-Agent Systems](chapter-05-multi-agent-systems.md) | 3 | Choose coordination patterns (orchestrator–workers, handoff) and know when *not* to use them |
| 4.6 | [Orchestration & Workflow Design](chapter-06-orchestration-workflows.md) | 3 | Design durable, resumable LLM workflows: queues, retries, idempotency, human steps |
| 4.7 | [Evaluation Systems & LLM-as-Judge](chapter-07-evaluation-systems.md) | 3 | Build eval pipelines: golden sets, judges, CI gates, online correlation |
| 4.8 | [Guardrails & Content Safety](chapter-08-guardrails-content-safety.md) | 3 | Layer input/output controls: schema validation, policy checks, PII detection, moderation |
| 4.9 | [GenAI Security & Threat Modeling](chapter-09-genai-security-threat-modeling.md) | 3 | Threat-model LLM systems (prompt injection, exfiltration, tool abuse); design mitigations |
| 4.10 | [Observability for LLM Systems](chapter-10-observability.md) | 3 | Instrument traces, quality metrics, and cost per request; debug from telemetry |
| 4.11 | [Cost Engineering](chapter-11-cost-engineering.md) | 3 | Model, monitor, and reduce inference cost: caching, routing, batching, prompt slimming, model tiering |
| 4.12 | [Latency & Performance Engineering](chapter-12-latency-performance.md) | 3 | Hit latency SLOs: streaming, parallelism, prompt caching, speculative techniques |
| 4.13 | [Prompting vs. RAG vs. Fine-tuning: the Decision Framework](chapter-13-prompting-rag-finetuning.md) | 3 | Choose the knowledge/behavior strategy with a defensible decision tree |
| 4.14 | [Privacy, Compliance & AI Governance](chapter-14-privacy-compliance-governance.md) | 3 | Map GDPR/HIPAA-class obligations and AI-specific regulation into architecture; build the governance paper trail |

## Exit criteria

- One project (P06–P12) taken to "production grade": CI evals, dashboards, threat model, runbook, cost model
- All four relevant [checklists](../../checklists/) applied and archived with the project

**Previous:** [Part 3](../part-3-core-building-blocks-of-genai/) · **Next:** [Part 5 — Cloud, Infrastructure & Platform Engineering](../part-5-cloud-infrastructure-platform/)
