# Glossary

Single source of truth for terminology across GSAC. Every chapter uses these definitions verbatim — if a chapter needs a term, it links here rather than redefining it. Terms are alphabetical. Contributions must not duplicate an existing term.

---

**ADR (Architecture Decision Record)** — A short, versioned document capturing one architecturally significant decision: its context, the options considered, the decision, and its consequences. See [templates/adr-template.md](templates/adr-template.md).

**Agent** — A system in which an LLM directs its own control flow: it decides which actions (tool calls) to take, observes results, and iterates toward a goal. Contrast with *workflow*, where control flow is fixed in code.

**Alignment** — Training techniques (e.g., RLHF, RLAIF, constitutional methods) that shape model behavior toward human intent, helpfulness, and safety after pre-training.

**Chunking** — Splitting source documents into retrieval-sized segments before embedding. Chunk size, overlap, and boundary strategy are primary RAG quality levers.

**Context window** — The maximum number of tokens a model can attend to in a single request (input + output). A hard architectural constraint that drives chunking, summarization, and memory design.

**Embedding** — A dense vector representation of text (or other media) in which semantic similarity maps to geometric proximity. The foundation of semantic search and RAG retrieval.

**Evaluation (evals)** — Systematic measurement of an AI system's quality against defined criteria: golden datasets, rubric scoring, LLM-as-judge, human review, and online metrics. The GenAI equivalent of a test suite.

**Fine-tuning** — Continuing training of a pre-trained model on domain- or task-specific data to shift its behavior. Compare *prompting* (no weight changes) and *RAG* (knowledge injected at inference time).

**Function calling / tool use** — A model capability where the LLM emits a structured request to invoke an external function; the application executes it and returns results to the model.

**Grounding** — Constraining model outputs to trusted source material (typically retrieved context) to reduce hallucination and enable citation.

**Guardrails** — Runtime controls that validate inputs and outputs of an LLM system: content filters, schema validation, policy checks, PII detection, jailbreak detection.

**Hallucination** — A fluent but factually unsupported model output. Managed (never fully eliminated) through grounding, evals, guardrails, and UX design.

**Hybrid search** — Retrieval combining lexical (e.g., BM25) and semantic (vector) search, typically merged with reciprocal rank fusion or a reranker.

**Inference** — Executing a trained model to produce output. The dominant runtime cost of GenAI systems.

**LLM (Large Language Model)** — A transformer-based model trained on large text corpora to predict tokens, exhibiting general-purpose language capabilities.

**LLM-as-judge** — Using a (usually stronger) model to score another model's outputs against a rubric. Cheap, scalable evaluation with known biases that must themselves be validated.

**LLMOps** — Operational discipline for LLM systems: versioning of prompts/models/datasets, evaluation pipelines, monitoring, incident response, cost management.

**Multi-agent system** — Multiple agents with distinct roles/tools coordinating on a task, via patterns such as orchestrator–workers, or peer handoff.

**Observability** — The ability to understand system behavior from its outputs: traces (per-request spans including LLM calls), metrics (latency, cost, quality), and logs.

**Prompt engineering** — Designing model inputs (instructions, examples, structure, context) to reliably elicit desired behavior. An engineering practice with versioning and tests, not a bag of tricks.

**Prompt injection** — An attack where adversarial instructions embedded in untrusted content (user input, retrieved documents, tool results) hijack model behavior. The signature security risk of LLM systems.

**RAG (Retrieval-Augmented Generation)** — Architecture that retrieves relevant knowledge at request time and provides it to the model as context, grounding outputs in current, private, or authoritative data.

**Reranking** — A second-stage relevance model that reorders an initial retrieval candidate set, trading latency for precision.

**RLHF (Reinforcement Learning from Human Feedback)** — Alignment technique that optimizes a model against a reward model trained on human preference data.

**Semantic search** — Retrieval by meaning (embedding similarity) rather than keyword match.

**System prompt** — The privileged instruction block that defines an assistant's role, rules, and constraints, distinct from user input.

**Temperature** — Sampling parameter controlling output randomness; lower is more deterministic, higher more diverse.

**Threat model** — A structured analysis of what can go wrong: assets, actors, attack surfaces, mitigations. For GenAI, includes prompt injection, data exfiltration, model abuse, and supply-chain risks.

**Token** — The sub-word unit models read and produce. Billing, latency, and context limits are all denominated in tokens.

**TCO (Total Cost of Ownership)** — Full lifecycle cost of a system: build, run (inference, storage, egress), maintain (evals, retraining, prompt updates), and organizational cost (support, governance).

**Vector database** — A datastore optimized for approximate nearest-neighbor search over embeddings, with metadata filtering.

**Workflow** — An LLM application whose control flow is fixed in code (chains, routers, pipelines), with the model making bounded decisions inside each step. Contrast with *agent*.
