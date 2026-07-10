# Examples: Faithfulness Judge

## Example 1 — Fully faithful (score 5)

**Context:** `The deductible for Plan B is $500. Coverage begins on the first of the month.`
**Answer:** `Plan B has a $500 deductible, and coverage starts on the first of the month.`

**Output:**
```json
{"unsupported_claims": [], "score": 5}
```

## Example 2 — Unfaithful (score 2)

**Context:** `The deductible for Plan B is $500.`
**Answer:** `Plan B has a $500 deductible and includes free dental coverage.`

**Output:**
```json
{"unsupported_claims": ["includes free dental coverage — not stated in the context"], "score": 2}
```

## Example 3 — Edge case: faithful but unhelpful (still score 5)

**Context:** `The office is closed on public holidays.`
**Answer:** `The office is closed on public holidays.`

**Output:**
```json
{"unsupported_claims": [], "score": 5}
```

*(The answer is unhelpfully terse, but faithfulness judges only support-by-context — not helpfulness. A separate dimension would judge relevance/helpfulness. This isolation is deliberate — [4.7](../../../curriculum/part-4-enterprise-genai-systems/chapter-07-evaluation-systems.md).)*

## Example 4 — Edge case: verbosity should not inflate the score

**Context:** `Returns are accepted within 30 days.`
**Answer:** `Our comprehensive and customer-friendly returns policy, designed with your satisfaction in mind, generously accepts returns within a full 30-day window, and we pride ourselves on... [continues]`

**Output:**
```json
{"unsupported_claims": ["'comprehensive and customer-friendly', 'designed with your satisfaction in mind', 'we pride ourselves' — characterizations not supported by the context"], "score": 3}
```

*(The length and flattering tone don't raise the score — the unsupported characterizations lower it. This is the verbosity-bias guard working.)*

---

**Calibration note:** In production, this judge scored 86% agreement with human labels on the faithfulness dimension (chance-corrected), clearing the 80% gate bar. On a judge-model upgrade, agreement dropped to 71% (the new model was laxer about causal-claim support) — caught by the mandatory re-calibration, fixed by adding explicit causal-claim anchors to the rubric (the Meridian episode from [4.7](../../../curriculum/part-4-enterprise-genai-systems/chapter-07-evaluation-systems.md)).
