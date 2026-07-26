# Projects — Twenty-five projects across four tiers.

Twenty-five projects across four tiers — nineteen on the GenAI lane, five on the classical-ML lane (P21, P23 in Tier 2; P22, P24, P25 in Tier 3), one portfolio capstone spanning both (P20). Every project uses the [project template](../templates/project-template.md) and must satisfy its **Definition of Done** — including evals, threat model, monitoring, and a cost estimate. Do them in tier order; within a tier, pick by interest.

Each project gets its own directory (`p01-document-qa-assistant/`, …) containing the filled template plus source code.

## Tier 1 — Beginner (Level 2: Build)

*After Part 3 chapters 3.1–3.6. Goal: working systems with honest limitations.*

| # | Project | Core skills | Anchor chapters |
|---|---------|-------------|-----------------|
| P01 | **Document Q&A Assistant** — RAG over a small policy/handbook corpus with citations | Chunking, embeddings, grounding, "I don't know" behavior | 3.5, 3.6 |
| P02 | **Support Email Triage & Draft** — classify incoming email, extract fields, draft replies for human review | Structured outputs, classification, draft-not-send | 3.3, 3.4 |
| P03 | **Meeting Intelligence Pipeline** — transcripts → structured minutes, decisions, action items | Summarization, schema outputs, long-input handling | 3.2, 3.4 |
| P04 | **Report Generator** — data + template → recurring narrative business report | Prompt templates, few-shot, factual grounding in data | 3.3 |
| P05 | **Internal Knowledge Search** — semantic search across a team wiki with metadata filters | Embeddings, indexing, retrieval quality measurement | 3.5 |

## Tier 2 — Intermediate (Level 2→3: Build → Engineer)

*After Part 3 complete + Part 4 chapters 4.1–4.7. Goal: quality you can measure. P21 additionally requires the classical track (chapters 2.9–2.10) — complete those first.*

| # | Project | Core skills | Anchor chapters |
|---|---------|-------------|-----------------|
| P06 | **Production RAG Service** — hybrid search + reranking, ACL-aware, with a retrieval eval harness | Advanced retrieval, access control, component evals | 4.1, 4.2 |
| P07 | **IT Helpdesk Agent** — tool-using agent (ticket lookup, KB search, password-reset request) with approval gates | Tool design, bounded loops, human approval | 3.8, 4.4 |
| P08 | **Contract Analysis Pipeline** — clause extraction, risk flags, comparison against playbook | Document ingestion, structured extraction, review UX | 4.3 |
| P09 | **Multilingual Support Assistant** — customer-facing bot with language detection, guardrails, escalation | Guardrails, safety, multilingual evals | 4.8 |
| P10 | **Evaluation Harness** — reusable eval service: golden sets, LLM-as-judge, CI gate, dashboards | Eval design, judge validation, regression detection | 4.7 |
| P21 | **Churn Prediction Service** — classical ML end-to-end: point-in-time features, GBT, batch scoring, drift, champion–challenger | Classical ML systems, MLOps, drift monitoring | 2.9, 2.10 |
| P23 | **Demand Forecasting Service** — quantile forecasts with an honest rolling-origin backtest harness, baselines-forever, censoring handling | Forecasting, backtesting, calibration, batch pipelines | 2.13, 2.12 |

## Tier 3 — Advanced (Level 3: Engineer)

*After Part 4 complete + Part 5 in progress. Goal: production-grade operations.*

| # | Project | Core skills | Anchor chapters |
|---|---------|-------------|-----------------|
| P11 | **Multi-agent Research Assistant** — orchestrator–workers research with source verification and a final cited brief | Multi-agent coordination, trajectory evals | 4.5 |
| P12 | **Enterprise Ingestion Platform** — messy corpus at scale: formats, tables, OCR, dedup, freshness, deletion | Pipelines, idempotency, index lifecycle | 4.3, 5.5 |
| P13 | **GenAI Gateway** — routing, semantic caching, quotas, cost metering, and failover across model providers | Model tiering, caching, resilience, metering | 4.11, 5.4 |
| P14 | **Compliance-aware RAG** — PII redaction, audit trail, retention, right-to-be-forgotten | Privacy engineering, governance evidence | 4.14 |
| P15 | **Real-time Voice Assistant** — speech in/out with latency budget, barge-in, and graceful degradation | Streaming, latency engineering, multimodal | 3.9, 4.12 |
| P22 | **Hybrid Claims Intake** — vision extraction → rules → classical risk scoring → routing → grounded letters with human approval | Per-stage approach assignment, hybrid architecture, per-stage evals | 2.11, 2.9, 4.3 |
| P24 | **Two-Stage Product Recommender** — impression logging first, candidate generation + GBT ranking, funnel diagnostics, simulated A/B harness | Implicit feedback, funnel localization, guarded metrics, experimentation | 2.14, 2.17 |
| P25 | **ML Delivery Platform** — orchestrated pipelines, tracking, registry, gated promotion, shadow lane, and drift-triggered retraining serving P21+P23 | MLOps platform engineering, failure drills, risk-scaled autonomy | 2.15, 2.12 |

## Tier 4 — Architect (Level 4: Architect)

*After Parts 5–6. Goal: portfolio capstones — the architecture document is the primary deliverable; implementation may be a vertical slice.*

| # | Project | Core skills | Anchor chapters |
|---|---------|-------------|-----------------|
| P16 | **Multi-tenant GenAI Platform** — the internal platform: gateway, prompt registry, eval service, metering/chargeback, governance | Platform patterns, tenancy, org design | 7.9 |
| P17 | **Regulated-industry Assistant (Banking)** — advisor copilot under strict compliance: auditability, model risk management, sign-offs | Regulated architecture, governance paper trail | 4.14, 6.5 |
| P18 | **Sovereign / Hybrid RAG** — data-residency-constrained deployment spanning on-prem data and cloud inference | Hybrid architecture, data perimeters | 5.11 |
| P19 | **Agent Orchestration Platform** — durable, resumable long-running agents with checkpoints, approvals, and fleet observability | Durable execution, agent ops at scale | 4.6, 7.4 |
| P20 | **AI Center of Excellence Reference Architecture** — target-state architecture, standards, review process, and adoption roadmap for a 5,000-person enterprise | EA, governance, business case, leadership | 6.8–6.10, 8.8 |

## Rules

1. No project is "done" without its [Definition of Done](../templates/project-template.md) checklist.
2. Apply the relevant [checklists](../checklists/) and commit the filled copies with the project.
3. Estimated cost is mandatory even for toy deployments — the habit is the point.
4. Prefer boring technology; novelty must be justified in *Technology Choices*.
