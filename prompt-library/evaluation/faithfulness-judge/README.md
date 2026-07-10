# Prompt: Faithfulness Judge (LLM-as-Judge)

An LLM-as-judge rubric scoring whether an answer is faithful (supported) by its source context — the anti-hallucination eval metric for RAG. Implements the judge discipline from [4.7 Evaluation Systems](../../../curriculum/part-4-enterprise-genai-systems/chapter-07-evaluation-systems.md) and [2.7 Evaluating ML Systems](../../../curriculum/part-2-artificial-intelligence/chapter-07-evaluating-ml-systems.md). Used in P10 and every RAG eval.

## Purpose

Scale faithfulness evaluation to CI speed. **The judge is an instrument, not an oracle** — it must be calibrated against human labels before its readings are trusted for gating ([2.7](../../../curriculum/part-2-artificial-intelligence/chapter-07-evaluating-ml-systems.md)/[4.7](../../../curriculum/part-4-enterprise-genai-systems/chapter-07-evaluation-systems.md)).

## Variables

| Variable | Type | Source |
|----------|------|--------|
| `{context}` | text | the RAG context that was provided to the generator |
| `{answer}` | text | the generated answer being evaluated |

## Model assumptions

- A capable judge model — ideally a **different family** from the generator (cross-family judging mitigates self-preference bias — [4.7](../../../curriculum/part-4-enterprise-genai-systems/chapter-07-evaluation-systems.md)).
- Temperature ≈ 0 (consistent scoring).
- The judge model and this rubric are **versioned**; re-calibrate on either change ([4.7](../../../curriculum/part-4-enterprise-genai-systems/chapter-07-evaluation-systems.md)).

## Output contract

JSON: `{"unsupported_claims": [...], "score": N}` — the claim list makes the score diagnosable (not just a number).

## Known failure modes (judge biases — [2.7](../../../curriculum/part-2-artificial-intelligence/chapter-07-evaluating-ml-systems.md))

1. **Verbosity bias** — favoring longer answers. Mitigated by the explicit "do not reward length" instruction; validate against human labels.
2. **Self-preference** — favoring its own family's style. Mitigated by cross-family judging.
3. **Conflating faithfulness with helpfulness** — the isolated-dimension instruction ("only support-by-context") reduces this; decompose dimensions ([4.7](../../../curriculum/part-4-enterprise-genai-systems/chapter-07-evaluation-systems.md)).
4. **Drift** — the judge's behavior shifts on model upgrade. Mitigated by scheduled re-calibration.

## Calibration (mandatory before gate duty)

Score a human-labeled calibration set; measure agreement (chance-corrected). Establish the minimum agreement bar for gating. Re-validate on judge-model or rubric change. Gate only on dimensions where agreement clears the bar; route the rest to human review ([4.7](../../../curriculum/part-4-enterprise-genai-systems/chapter-07-evaluation-systems.md)). See [examples.md](examples.md).
