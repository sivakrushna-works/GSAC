# Prompt: Input Screening (Safety Guardrail)

An LLM-based input screening classifier — the judgment tier of the guardrail funnel, screening input for out-of-scope, unsafe, injection, sensitive-data, and escalation before it reaches the main assistant. Implements the layered-filters pattern from [4.8 Guardrails](../../../curriculum/part-4-enterprise-genai-systems/chapter-08-guardrails-content-safety.md) and [7.6 Safety Patterns](../../../curriculum/part-7-enterprise-ai-architecture-patterns/chapter-06-safety-guardrail-patterns.md). Used in P02, P09, and customer-facing case studies (CS02, CS09, CS32).

## Purpose

Screen input at the judgment tier of the funnel (rules → classifier → **LLM checker**). Cheap rules/patterns run first; this LLM checker runs on the flagged/risky slice ([4.8](../../../curriculum/part-4-enterprise-genai-systems/chapter-08-guardrails-content-safety.md)). **This is defense in depth, not the security boundary** — the architectural controls (blast-radius, gating — [4.9](../../../curriculum/part-4-enterprise-genai-systems/chapter-09-genai-security-threat-modeling.md)) are the boundary; this screening raises the cost of casual misuse.

## Variables

| Variable | Type | Source |
|----------|------|--------|
| `{system_scope}` | text | policy spec ([4.8](../../../curriculum/part-4-enterprise-genai-systems/chapter-08-guardrails-content-safety.md)) |
| `{policy_categories}` | list | policy spec (with examples/counter-examples) |
| `{escalation_triggers}` | list | policy spec |
| `{high_severity_categories}` | list | the recall-tuned classes |
| `{user_input}` | text | user | **untrusted — fenced as data** |

## Model assumptions

- A fast/cheap-ish model (this runs per flagged request — [4.8](../../../curriculum/part-4-enterprise-genai-systems/chapter-08-guardrails-content-safety.md)); temperature ≈ 0.
- Versioned as a guard instrument (golden set, precision/recall profile — [4.8](../../../curriculum/part-4-enterprise-genai-systems/chapter-08-guardrails-content-safety.md)).

## Output contract

JSON: categories (with snippet + reason) and an action (pass/redact/refuse/escalate) feeding the response ladder ([4.8](../../../curriculum/part-4-enterprise-genai-systems/chapter-08-guardrails-content-safety.md)).

## Known failure modes

1. **Over-blocking** — false positives tax legitimate users (the adoption cost — [4.8](../../../curriculum/part-4-enterprise-genai-systems/chapter-08-guardrails-content-safety.md)). Mitigate: recall-tune only the high-severity classes; measure the over-block rate as a business metric.
2. **Bypass** — paraphrased attacks evade it. Mitigate: this is one funnel tier + defense-in-depth; monitor bypass via sampling of passed traffic ([4.8](../../../curriculum/part-4-enterprise-genai-systems/chapter-08-guardrails-content-safety.md)); the architecture bounds the blast radius regardless ([4.9](../../../curriculum/part-4-enterprise-genai-systems/chapter-09-genai-security-threat-modeling.md)).
3. **The classifier itself being injected** — mitigated by fencing (classify-as-data).

## Evaluation

Guard golden set: clean, violations across categories, and **borderline** cases (from the policy's counter-examples). Measure per-category precision/recall; state the over-block rate. Bypass sampling on passed traffic. Trigger-rate anomaly alerts ([4.8](../../../curriculum/part-4-enterprise-genai-systems/chapter-08-guardrails-content-safety.md)). See [examples.md](examples.md).
