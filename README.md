# GSAC — GenAI Solution Architect Curriculum

> A complete, production-oriented learning system that takes you from **experienced software engineer** (5–15 years) to **enterprise GenAI Solution Architect**.

This curriculum emphasizes **timeless concepts over frameworks**. Tools change every quarter; architecture judgment compounds for a career. Every chapter, project, and case study is written from the perspective of an architect who must defend decisions in front of a CTO, a security review board, and a finance team.

---

## Who this is for

- Software engineers (5–15 years) transitioning into AI solution architecture
- Tech leads and staff engineers asked to "own the AI strategy"
- Cloud/enterprise architects adding GenAI to their portfolio
- Consultants who must scope, price, and deliver GenAI systems

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
| [2](curriculum/part-2-artificial-intelligence/) | Artificial Intelligence | ML/DL/NLP fundamentals, transformers, training, evaluation, responsible AI, classical ML systems, MLOps/LLMOps, approach selection |
| [3](curriculum/part-3-core-building-blocks-of-genai/) | Core Building Blocks of Generative AI | LLMs, prompting, embeddings, RAG, tool use, agents, multimodal |
| [4](curriculum/part-4-enterprise-genai-systems/) | Enterprise GenAI Systems | Production RAG, agents at scale, evaluation, security, observability, cost |
| [5](curriculum/part-5-cloud-infrastructure-platform/) | Cloud, Infrastructure & Platform Engineering | Compute, serving, data architecture, scalability, reliability, LLMOps |
| [6](curriculum/part-6-enterprise-architecture/) | Enterprise Architecture | EA frameworks, views, governance, integration, security architecture, TCO |
| [7](curriculum/part-7-enterprise-ai-architecture-patterns/) | Enterprise AI Architecture Patterns | A pattern language for GenAI systems, plus anti-patterns |
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

- **[Projects](projects/)** — 20 enterprise-grade projects, Beginner → Intermediate → Advanced → Architect. Each includes business problem, requirements, architecture diagram, technology choices, security, deployment, monitoring, estimated cost, and future improvements.
- **[Case studies](case-studies/)** — 50 enterprise architecture case studies across 12 industries. Each includes stakeholders, requirements, architecture, sequence diagram, deployment diagram, threat model, cost estimation, scaling strategy, monitoring strategy, and lessons learned.

## Reference assets

| Asset | Purpose |
|-------|---------|
| [Glossary](GLOSSARY.md) | Single source of truth for terminology (used consistently everywhere) |
| [Architecture Decision Records](adr/) | Why this curriculum is built the way it is — and a model for your own ADRs |
| [Templates](templates/) | Chapter, project, case study, and ADR templates |
| [Checklists](checklists/) | Architecture review, RAG design, agent design, security, deployment, evaluation |
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
