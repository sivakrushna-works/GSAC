# Prompt: Structured Extraction

Extract fields from a document into a JSON schema, with representable uncertainty (null over guessing) and span-verifiable values. Implements the schema-design and anti-fabrication discipline from [3.4 Structured Outputs](../../../curriculum/part-3-core-building-blocks-of-genai/chapter-04-structured-outputs.md).

## Purpose

Reliable structured extraction that never fabricates values — the type-boundary between messy documents and deterministic systems. Used in P02, P08, P12, and the extraction-heavy case studies (CS03, CS08, CS16, CS27).

## Variables

| Variable | Type | Source | Untrusted? |
|----------|------|--------|-----------|
| `{json_schema}` | JSON Schema | config (versioned — the "treaty") | no |
| `{document_text}` | text | ingestion | **yes — fenced as data** |

`{document_text}` is untrusted (may contain injection — [4.9](../../../curriculum/part-4-enterprise-genai-systems/chapter-09-genai-security-threat-modeling.md)) and is fenced. The schema is a versioned contract shared with downstream consumers ([3.4](../../../curriculum/part-3-core-building-blocks-of-genai/chapter-04-structured-outputs.md)).

## Model assumptions

- A model with a structured-output/JSON mode (rung 2 — [3.4](../../../curriculum/part-3-core-building-blocks-of-genai/chapter-04-structured-outputs.md)); the schema is enforced for syntax, the prompt for semantics.
- Temperature ≈ 0 (extraction is deterministic — [3.2](../../../curriculum/part-3-core-building-blocks-of-genai/chapter-02-tokens-context-sampling.md)).

## Schema-design notes (for the `{json_schema}` you supply)

Apply the five rules ([3.4](../../../curriculum/part-3-core-building-blocks-of-genai/chapter-04-structured-outputs.md)): evidence-first field order (source spans before judgments), descriptions as instructions, enums for closed sets, nullable fields with use-null instructions, flat over nested. Include an `extraction_notes` escape valve.

## Output contract

- A JSON object conforming to the schema.
- Missing fields are `null`, never guessed.
- Every extracted value is span-verifiable (appears verbatim in the document) — enforced downstream by a span check (the anti-fabrication control — [3.4](../../../curriculum/part-3-core-building-blocks-of-genai/chapter-04-structured-outputs.md)).

## Known failure modes

1. **Fabricated values on required fields** — if the schema forces a required field, the model fills it. Mitigate: make fields nullable with explicit use-null instructions; the span check catches fabrications as a counted event.
2. **Enum drift** — the model invents an enum value. Mitigate: the `other` + `extraction_notes` valve; downstream enum-membership validation.
3. **Judgment-first ordering** — if the schema puts conclusions before evidence, quality drops. Fix in the schema (evidence-first).
4. **Injection via document** — mitigated by fencing; verify with an injection probe.

## Evaluation

Gated by a golden set with per-field accuracy, the span-check pass rate (fabrication rate — target measured-zero), and edge cases (missing fields → null, injection). The repair rate is a drift alarm ([3.4](../../../curriculum/part-3-core-building-blocks-of-genai/chapter-04-structured-outputs.md)). See [examples.md](examples.md).
