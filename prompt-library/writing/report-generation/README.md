# Prompt: Report Generation

Generate a narrative report from structured data with figure faithfulness (numbers match the data exactly) and forecast disclaimers. Used in P04 and CS48 (FP&A narrative reporting).

## Purpose

Produce consistent, on-template narrative reports grounded in data — with the load-bearing property being **figure faithfulness** (a wrong number in a report is misreporting — [3.1](../../../curriculum/part-3-core-building-blocks-of-genai/chapter-01-llm-capabilities-limits.md)'s precision limit: the LLM narrates, it does not compute the figures).

## Variables

| Variable | Type | Source |
|----------|------|--------|
| `{report_type}` | string | config |
| `{template_sections}` | text | config (the report structure) |
| `{style_guidelines}` | text | config (house style — few-shot examples help — [3.3](../../../curriculum/part-3-core-building-blocks-of-genai/chapter-03-prompt-engineering.md)) |
| `{report_data}` | structured data | the source system (computed there, not by the LLM) |

## Model assumptions

- Mid-tier or better; temperature ≈ 0.3–0.6 (some fluency for narrative, but faithfulness first).
- **The figures are computed upstream** (by the data system / CPQ / actuarial models — the correctness split — [3.1](../../../curriculum/part-3-core-building-blocks-of-genai/chapter-01-llm-capabilities-limits.md)); the LLM inserts and narrates them, never computes.

## Output contract

- The report in the template structure.
- Every figure matches the source data exactly (verified by a downstream figure-faithfulness check — numbers in the narrative are span-checked to the data, like [CS48](../../../case-studies/cs48-fpa-narrative-reporting.md)).
- Forecasts disclaimed.
- Empty sections stated as such, not invented.

## Known failure modes

1. **Figure fabrication/transposition** — the model invents or mis-transcribes a number. Mitigate: the figures-from-data-only rule + downstream figure-faithfulness check (the accuracy control).
2. **LLM computing figures** — the model derives a number (and gets it wrong — precision limit). Mitigate: pre-compute all figures upstream; the prompt forbids new computation.
3. **Undisclaimed forecasts** — mitigate: the disclaimer rule; enforce/check downstream.
4. **Inventing content for empty sections** — mitigate: the explicit "No data available" instruction.

## Evaluation

Golden set of data→report; measure figure faithfulness (numbers match — the critical metric), disclaimer completeness, format/style consistency, and empty-section handling. See [examples.md](examples.md).
