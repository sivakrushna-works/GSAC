# Glossary

Single source of truth for terminology across GSAC. Every chapter uses these definitions verbatim — if a chapter needs a term, it links here rather than redefining it. Terms are alphabetical. Contributions must not duplicate an existing term.

---

**ADR (Architecture Decision Record)** — A short, versioned document capturing one architecturally significant decision: its context, the options considered, the decision, and its consequences. See [templates/adr-template.md](templates/adr-template.md).

**Agent** — A system in which an LLM directs its own control flow: it decides which actions (tool calls) to take, observes results, and iterates toward a goal. Contrast with *workflow*, where control flow is fixed in code.

**Alignment** — Training techniques (e.g., RLHF, RLAIF, constitutional methods) that shape model behavior toward human intent, helpfulness, and safety after pre-training.

**Backtesting (rolling-origin)** — Evaluating a forecasting or scoring model by replaying history: train on data up to a cutoff, predict beyond it, roll the cutoff forward. Honest backtests reconstruct only the information available at each cutoff (see *point-in-time correctness*).

**Calibration** — The property that predicted probabilities match observed frequencies (a 0.8 score is right about 80% of the time). Required wherever scores feed thresholds, pricing, or prediction intervals.

**Champion–challenger** — Promotion pattern in which the incumbent model (champion) is replaced only when a candidate (challenger) beats it under identical, gated evaluation. The classical-ML counterpart of eval-gated deployment.

**Chunking** — Splitting source documents into retrieval-sized segments before embedding. Chunk size, overlap, and boundary strategy are primary RAG quality levers.

**Context window** — The maximum number of tokens a model can attend to in a single request (input + output). A hard architectural constraint that drives chunking, summarization, and memory design.

**Drift** — Post-deployment change that degrades a model: *data drift* (input distributions shift) or *concept drift* (the input→outcome relationship shifts). Detected by monitoring (e.g., *PSI*), answered by retraining or rollback.

**Embedding** — A dense vector representation of text (or other media) in which semantic similarity maps to geometric proximity. The foundation of semantic search and RAG retrieval.

**Evaluation (evals)** — Systematic measurement of an AI system's quality against defined criteria: golden datasets, rubric scoring, LLM-as-judge, human review, and online metrics. The GenAI equivalent of a test suite.

**Feature (label) leakage** — Information from the outcome's future contaminating training features, producing offline metrics that collapse in production. The signature failure mode of classical-ML system design; prevented by *point-in-time correctness*.

**Feature store / feature platform** — Infrastructure that serves model features consistently to both training and inference, solving *training–serving skew* and point-in-time reconstruction.

**Fine-tuning** — Continuing training of a pre-trained model on domain- or task-specific data to shift its behavior. Compare *prompting* (no weight changes) and *RAG* (knowledge injected at inference time).

**Function calling / tool use** — A model capability where the LLM emits a structured request to invoke an external function; the application executes it and returns results to the model.

**Grounding** — Constraining model outputs to trusted source material (typically retrieved context) to reduce hallucination and enable citation.

**Guardrails** — Runtime controls that validate inputs and outputs of an LLM system: content filters, schema validation, policy checks, PII detection, jailbreak detection.

**Hallucination** — A fluent but factually unsupported model output. Managed (never fully eliminated) through grounding, evals, guardrails, and UX design.

**Hybrid search** — Retrieval combining lexical (e.g., BM25) and semantic (vector) search, typically merged with reciprocal rank fusion or a reranker.

**Inference** — Executing a trained model to produce output. The dominant runtime cost of GenAI systems.

**Label** — The known outcome a supervised model learns to predict. Label availability, latency (when the truth arrives), and quality bound everything a classical system can do.

**LLM (Large Language Model)** — A transformer-based model trained on large text corpora to predict tokens, exhibiting general-purpose language capabilities.

**LLM-as-judge** — Using a (usually stronger) model to score another model's outputs against a rubric. Cheap, scalable evaluation with known biases that must themselves be validated.

**LLMOps** — Operational discipline for LLM systems: versioning of prompts/models/datasets, evaluation pipelines, monitoring, incident response, cost management.

**MLOps** — Operational discipline for classical ML systems: versioned data/features/models, gated promotion, drift monitoring, scheduled or triggered retraining, rollback. Compare *LLMOps* — one discipline, two lifecycles.

**Model registry** — The versioned system of record for trained models and their lineage (data, code, metrics). Promotion, rollback, and audit operate on registry entries, not on files.

**Model risk management (MRM)** — Governance regime (SR 11-7-style) requiring a model inventory, independent validation, and monitoring proportional to each model's materiality.

**Multi-agent system** — Multiple agents with distinct roles/tools coordinating on a task, via patterns such as orchestrator–workers, or peer handoff.

**Observability** — The ability to understand system behavior from its outputs: traces (per-request spans including LLM calls), metrics (latency, cost, quality), and logs.

**Point-in-time correctness** — Building each training example only from information that existed at that example's decision moment. The discipline that prevents leakage in features and backtests.

**Precision & recall** — Complementary classification metrics: of predicted positives, how many are right (precision); of actual positives, how many are caught (recall). The operating threshold trades one against the other — and the business, not the model, owns that trade.

**Prompt engineering** — Designing model inputs (instructions, examples, structure, context) to reliably elicit desired behavior. An engineering practice with versioning and tests, not a bag of tricks.

**Prompt injection** — An attack where adversarial instructions embedded in untrusted content (user input, retrieved documents, tool results) hijack model behavior. The signature security risk of LLM systems.

**PSI (Population Stability Index)** — A drift statistic comparing a feature's or score's current distribution against a reference window; the standard early-warning metric in scoring systems.

**RAG (Retrieval-Augmented Generation)** — Architecture that retrieves relevant knowledge at request time and provides it to the model as context, grounding outputs in current, private, or authoritative data.

**Reranking** — A second-stage relevance model that reorders an initial retrieval candidate set, trading latency for precision.

**RLHF (Reinforcement Learning from Human Feedback)** — Alignment technique that optimizes a model against a reward model trained on human preference data.

**Semantic search** — Retrieval by meaning (embedding similarity) rather than keyword match.

**Shadow deployment** — Running a candidate model on live traffic without acting on its outputs, to observe real-world behavior before promotion.

**System prompt** — The privileged instruction block that defines an assistant's role, rules, and constraints, distinct from user input.

**Temperature** — Sampling parameter controlling output randomness; lower is more deterministic, higher more diverse.

**Threat model** — A structured analysis of what can go wrong: assets, actors, attack surfaces, mitigations. For GenAI, includes prompt injection, data exfiltration, model abuse, and supply-chain risks.

**Token** — The sub-word unit models read and produce. Billing, latency, and context limits are all denominated in tokens.

**TCO (Total Cost of Ownership)** — Full lifecycle cost of a system: build, run (inference, storage, egress), maintain (evals, retraining, prompt updates), and organizational cost (support, governance).

**Training–serving skew** — Any difference between how features are computed in training and at inference; a leading cause of silent production degradation. Solved by shared feature pipelines (see *feature store*).

**Vector database** — A datastore optimized for approximate nearest-neighbor search over embeddings, with metadata filtering.

**Workflow** — An LLM application whose control flow is fixed in code (chains, routers, pipelines), with the model making bounded decisions inside each step. Contrast with *agent*.
