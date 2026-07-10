# Prompt: Meeting Minutes

Transform a meeting transcript into structured minutes (summary, decisions, action items, open questions) with faithfulness to the transcript — no invented decisions, actions, or owners. Used in P03 and CS41-adjacent workflows.

## Purpose

Turn long transcripts into actionable, faithful minutes. The load-bearing property is faithfulness: a fabricated action item or misattributed owner is worse than an omission ([3.1](../../../curriculum/part-3-core-building-blocks-of-genai/chapter-01-llm-capabilities-limits.md)'s transformation strength — the input contains what's needed).

## Variables

| Variable | Type | Source | Untrusted? |
|----------|------|--------|-----------|
| `{transcript}` | text (may be long) | ASR/transcript service | **yes — fenced as data** |

For transcripts exceeding the context window, apply map-reduce summarization upstream ([3.2](../../../curriculum/part-3-core-building-blocks-of-genai/chapter-02-tokens-context-sampling.md)) — this prompt handles the within-context case or the reduce step.

## Model assumptions

- Mid-tier or better, long-context where transcripts are large.
- Temperature ≈ 0–0.3 (faithfulness over creativity).

## Output contract

- Four sections: Summary, Decisions (with supporting spans), Action items ({owner, task, due}), Open questions.
- Missing owner/due → null (not guessed).
- Decisions/actions grounded in the transcript (span-verifiable — the anti-fabrication control).

## Known failure modes

1. **Invented action items** — the model infers actions not stated. Mitigate: the "faithful over complete" rule + span grounding; measure via faithfulness eval.
2. **Owner misattribution** — assigning an action to the wrong/unstated person. Mitigate: the explicit no-attribution-without-assignment rule.
3. **Lost early content** — in very long transcripts, early decisions get dropped ("lost in the middle" — [2.5](../../../curriculum/part-2-artificial-intelligence/chapter-05-transformer-architecture.md)). Mitigate: map-reduce upstream; test at long-transcript boundaries.
4. **Injection via transcript** — mitigated by fencing.

## Evaluation

Golden set of transcripts with expected minutes; measure faithfulness (no invented decisions/actions — span-checked), owner-attribution accuracy, and completeness (recall of stated decisions/actions). See [examples.md](examples.md).
