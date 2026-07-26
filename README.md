# GSAC — AI Solution Architect Curriculum

[![Read online](https://img.shields.io/badge/read-online-brightgreen)](https://sivakrushna-works.github.io/GSAC/)
[![Content: CC BY 4.0](https://img.shields.io/badge/content-CC%20BY%204.0-lightgrey)](LICENSE)
[![Code: MIT](https://img.shields.io/badge/code-MIT-blue)](LICENSE)
![Docs](https://img.shields.io/badge/chapters-90-informational)
![Case studies](https://img.shields.io/badge/case%20studies-56-informational)
![Projects](https://img.shields.io/badge/projects-25-informational)

> A complete, production-oriented learning system that takes you from **experienced software engineer** (5–15 years) to **enterprise AI Solution Architect** — across both lanes of the discipline: generative AI (the curriculum's deepest specialization) and classical machine learning (prediction, forecasting, ranking, perception, and the MLOps that operates them).

**📖 [Read it online](https://sivakrushna-works.github.io/GSAC/)** — a searchable reader with progress tracking — or browse the Markdown right here on GitHub.

## New here? A 15-minute taste test

Three reads that tell you whether this curriculum is for you:

1. [2.11 — Choosing the Right AI Approach](curriculum/part-2-artificial-intelligence/chapter-11-choosing-the-right-ai-approach.md) — the chapter that most defines what this curriculum thinks an AI Solution Architect *is*.
2. [CS52 — Real-Time Card Fraud Scoring](case-studies/cs52-card-fraud-scoring.md) — one case study, end to end, to sample the case format.
3. The [ROADMAP](ROADMAP.md)'s first page — the five phases and the honest 10–15-month estimate.

**Where to start, by background:**

| Your background | Start at | Skip / skim |
|---|---|---|
| Software engineer, no ML background | Part 1, in order — the designed path | Nothing; the ROADMAP's phase notes flag what's optional |
| ML/data engineer or data scientist | Part 1, then jump to Part 3 | Skim 2.1–2.8; read 2.9–2.17 anyway — it's the systems half your role often skips |
| Cloud / enterprise architect | Part 2 in full, then Part 3 | Skim Part 1 (but do 1.4's exercise); Parts 5–6 will feel familiar in shape |
| Already building GenAI systems | 2.9–2.17 (the classical track), then Part 4 | Part 3 as reference; you'll know what to skim |

*GSAC began life as the "GenAI Solution Architect Curriculum" and was repositioned to the broader role by [ADR-0004](adr/ADR-0004-reposition-to-ai-solution-architect.md) — content first, branding after. The acronym stays; the scope grew.*

This curriculum emphasizes **timeless concepts over frameworks**. Tools change every quarter; architecture judgment compounds for a career. Every chapter, project, and case study is written from the perspective of an architect who must defend decisions in front of a CTO, a security review board, and a finance team.

---

## Who this is for

- Software engineers (5–15 years) transitioning into AI solution architecture
- Tech leads and staff engineers asked to "own the AI strategy"
- Cloud/enterprise architects adding AI (generative and classical) to their portfolio
- Consultants who must scope, price, and deliver AI systems

**Prerequisites:** professional programming experience, basic cloud familiarity, comfort reading system designs. No ML background required — Part 2 builds it.

## What this is **not**

- Not a framework tutorial (no "LangChain in 30 days")
- Not an ML research curriculum (we build systems, not models)
- Not a certification cram guide

---

## Curriculum structure

| Part | Title | Focus |
|------|-------|-------|
| [1](curriculum/part-1-professional-foundation/) | Professional Foundation | Architect mindset, design thinking, business fluency, trade-offs, leadership |
| [2](curriculum/part-2-artificial-intelligence/) | Artificial Intelligence | ML/DL/NLP fundamentals, transformers, training, evaluation, responsible AI, approach selection — plus the classical engineering track: ML systems, data & feature platforms, forecasting, recommenders & anomaly detection, MLOps, perception, experimentation |
| [3](curriculum/part-3-core-building-blocks-of-genai/) | Core Building Blocks of Generative AI | LLMs, prompting, embeddings, RAG, tool use, agents, multimodal |
| [4](curriculum/part-4-enterprise-genai-systems/) | Enterprise GenAI Systems | Production RAG, agents at scale, evaluation, security, observability, cost |
| [5](curriculum/part-5-cloud-infrastructure-platform/) | Cloud, Infrastructure & Platform Engineering | Compute, serving, data architecture, scalability, reliability, LLMOps |
| [6](curriculum/part-6-enterprise-architecture/) | Enterprise Architecture | EA frameworks, views, governance, integration, security architecture, TCO, model risk management |
| [7](curriculum/part-7-enterprise-ai-architecture-patterns/) | Enterprise AI Architecture Patterns | A pattern language for AI systems — GenAI families, predictive & scoring patterns, anti-patterns |
| [8](curriculum/part-8-professional-excellence/) | Professional Excellence & Career Development | Role, portfolio, interviews, consulting, mentoring |

Each chapter follows a single mandatory [chapter template](templates/chapter-template.md): learning objectives, business motivation, theory, architecture perspective, real-world example, hands-on exercise, enterprise considerations, trade-offs, common mistakes, best practices, architecture checklist, interview questions, further reading, summary.

## Learning philosophy — five maturity levels

| Level | Name | You can… |
|-------|------|----------|
| 1 | **Understand** | Explain concepts correctly and choose the right vocabulary |
| 2 | **Build** | Implement working prototypes and demos |
| 3 | **Engineer** | Ship reliable, tested, monitored production systems |
| 4 | **Architect** | Design end-to-end systems, make defensible trade-offs, estimate cost and risk |
| 5 | **Principal Architect** | Set standards, govern portfolios, lead organizations through AI adoption |

Every chapter and project is tagged with the level it targets. The [ROADMAP](ROADMAP.md) sequences the journey; the [PROGRESS tracker](PROGRESS.md) lets you check off your advancement.

## Hands-on tracks

- **[Projects](projects/)** — 25 enterprise-grade projects, Beginner → Intermediate → Advanced → Architect, across both lanes (P21–P25 form the classical-ML project track). Each includes business problem, requirements, architecture diagram, technology choices, security, deployment, monitoring, estimated cost, and future improvements.
- **[Case studies](case-studies/)** — 56 enterprise architecture case studies across 12 industries (CS51–CS56 form the classical-ML track). Each includes stakeholders, requirements, architecture, sequence diagram, deployment diagram, threat model, cost estimation, scaling strategy, monitoring strategy, and lessons learned.

## Reference assets

| Asset | Purpose |
|-------|---------|
| [Glossary](GLOSSARY.md) | Single source of truth for terminology (used consistently everywhere) |
| [Architecture Decision Records](adr/) | Why this curriculum is built the way it is — and a model for your own ADRs |
| [Templates](templates/) | Chapter, project, case study, and ADR templates |
| [Checklists](checklists/) | Architecture review, AI incident response, RAG design, agent design, security, deployment, evaluation — plus the classical-ML family: model validation, data quality & labeling, drift & monitoring, MRM & fairness |
| [Prompt Library](prompt-library/) | Curated, versioned prompts with usage notes |

## How to use this repository

1. Read the [ROADMAP](ROADMAP.md) and pick your entry point (most engineers start at Part 1 or Part 3).
2. Work through chapters in order within a part; parts 1–3 can be interleaved.
3. After each part, complete the matching projects before moving on.
4. Use the [checklists](checklists/) on every project — they are the habits of the job.
5. Track your progress in [PROGRESS.md](PROGRESS.md).
6. Study case studies continuously; one per week is a good cadence.

## Quality rules (enforced across the repo)

- No duplicated topics — one canonical home per concept, cross-linked elsewhere
- Consistent terminology, anchored in the [Glossary](GLOSSARY.md)
- Mermaid diagrams wherever a picture beats prose
- Timeless concepts first; frameworks only as illustrative examples
- References point to official documentation and primary sources
- Fictional companies carry fictional numbers — every metric in the case studies and worked examples is an illustrative composite, never citable as industry data

## License, contributing & provenance

- **License:** content is [CC BY 4.0](LICENSE); the reader-site code is MIT. Fork it, translate it, teach from it — with attribution.
- **Contributing:** corrections, exercise reports, and reference implementations are the most valuable contributions — see [CONTRIBUTING.md](CONTRIBUTING.md).
- **Provenance:** this curriculum was developed by its author with substantial AI assistance for drafting, and hardened through adversarial review passes whose full reports are preserved: [first pass](docs/reviews/2026-07-26-first-pass-review.md), [second pass](docs/reviews/2026-07-26-second-pass-review.md), [third pass](docs/reviews/2026-07-26-third-pass-review.md). Known limitations are documented there rather than hidden — read the latest review before treating any claim as settled, and file an issue when you catch something it missed. The original commissioning brief and its amendment live in [docs/](docs/PROJECT-BRIEF-AMENDMENT.md).
