# Part 3 — Core Building Blocks of Generative AI

The component catalog of every GenAI system you will ever design: models, prompts, embeddings, retrieval, tools, agents. Each chapter is provider-neutral; providers appear only in examples and exercises.

**Maturity target:** Level 2 · **Estimated effort:** 5–6 weeks

## Chapters

| # | Chapter | Level | What you'll be able to do |
|---|---------|-------|---------------------------|
| 3.1 | LLMs: Capabilities, Limits & Failure Modes | 1 | State what LLMs reliably do, where they fail (hallucination, math, recency), and the design consequences |
| 3.2 | Tokens, Context Windows & Sampling | 2 | Budget tokens; reason about context limits; set temperature and sampling parameters deliberately |
| 3.3 | Prompt Engineering as an Engineering Discipline | 2 | Design, version, and test prompts: roles, structure, few-shot examples, chain-of-thought |
| 3.4 | Structured Outputs & Constrained Generation | 2 | Get reliable JSON/schemas out of models; validate and repair outputs |
| 3.5 | Embeddings & Semantic Search | 2 | Choose embedding models, build a semantic search index, and measure retrieval quality |
| 3.6 | RAG Fundamentals | 2 | Assemble ingestion → retrieval → generation; explain each quality lever |
| 3.7 | Function Calling & Tool Use | 2 | Define tool contracts models can use reliably; handle tool errors |
| 3.8 | Agents: Concepts & Control Flow | 2 | Distinguish workflows from agents; build a bounded tool-using agent loop |
| 3.9 | Multimodal Models | 2 | Design with vision/audio inputs and outputs; know cost and quality trade-offs |
| 3.10 | Model Selection & Benchmarking | 2 | Run a structured model bake-off for a use case: capability, latency, cost, and eval-driven comparison |

## Exit criteria

- Projects [P03–P05](../../projects/) complete
- You can whiteboard a RAG pipeline and an agent loop from memory, including failure handling

**Previous:** [Part 2](../part-2-artificial-intelligence/) · **Next:** [Part 4 — Enterprise GenAI Systems](../part-4-enterprise-genai-systems/)
