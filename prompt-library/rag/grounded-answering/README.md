# Prompt: Grounded Answering (RAG)

The generation-side prompt for a RAG system: answer from provided context, cite sources, refuse when the context lacks the answer. Implements the epistemic contract from [3.6 RAG Fundamentals](../../../curriculum/part-3-core-building-blocks-of-genai/chapter-06-rag-fundamentals.md).

## Purpose

Produce grounded, cited answers over retrieved context, with a designed refusal on no-answer — the anti-hallucination generation contract. Used in P01, P06, and every RAG case study.

## Variables

| Variable | Type | Source | Untrusted? |
|----------|------|--------|-----------|
| `{organization}` | string | config | no |
| `{escalation_contact}` | string (optional) | config | no |
| `{retrieved_chunks}` | text (with provenance labels) | retrieval service | **yes — fenced as data** |
| `{user_question}` | string | user | **yes** |

`{retrieved_chunks}` and `{user_question}` contain untrusted content and are delimited/fenced (data-not-instructions — [3.3](../../../curriculum/part-3-core-building-blocks-of-genai/chapter-03-prompt-engineering.md), [4.9](../../../curriculum/part-4-enterprise-genai-systems/chapter-09-genai-security-threat-modeling.md)).

## Model assumptions

- A mid-tier or better instruction-following model. Tested to follow the refusal contract reliably; verify on model migration ([3.10](../../../curriculum/part-3-core-building-blocks-of-genai/chapter-10-model-selection-benchmarking.md)).
- Temperature ≈ 0 (deterministic; this is not a creative task — [3.2](../../../curriculum/part-3-core-building-blocks-of-genai/chapter-02-tokens-context-sampling.md)).

## Output contract

- Answerable: answer + `[Doc: label]` citation per factual claim.
- Not answerable: the exact refusal string; optionally the escalation suggestion.
- Citations are validated downstream (every cited label must exist in the provided chunks — [3.6](../../../curriculum/part-3-core-building-blocks-of-genai/chapter-06-rag-fundamentals.md)).

## Known failure modes

1. **Improvising past thin context** — when marginally-relevant chunks are provided, the model may blend parametric knowledge. Mitigate: relevance-threshold retrieval (only pass genuinely relevant chunks), and for high stakes use extraction-then-answer (quote spans first).
2. **Fabricated citation labels** — the model cites a label not in the context. Caught by citation validation (programmatic — [3.6](../../../curriculum/part-3-core-building-blocks-of-genai/chapter-06-rag-fundamentals.md)); one re-ask on failure.
3. **Over-refusal** — refusing when the answer is present. Measured by the answerable-set refusal rate; tune the contract if too aggressive.
4. **Injection via chunks/question** — untrusted content attempting to override the rules. Mitigated by fencing; verify with an injection probe in the suite.

## Evaluation

Gated by a four-class golden set (answerable, no-answer, multi-chunk, hard-negative) measuring faithfulness, citation validity, and both refusal error rates ([3.6](../../../curriculum/part-3-core-building-blocks-of-genai/chapter-06-rag-fundamentals.md), [4.7](../../../curriculum/part-4-enterprise-genai-systems/chapter-07-evaluation-systems.md)). See [examples.md](examples.md).
