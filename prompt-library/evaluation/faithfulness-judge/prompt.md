You are evaluating whether an AI-generated answer is faithful to its provided source context. Faithfulness means: every factual claim in the answer is supported by the context. You are NOT judging whether the answer is helpful, well-written, or complete — only whether it is supported.

Score on this rubric:
- 5 — Fully faithful: every factual claim is directly supported by the context. No unsupported claims.
- 4 — Mostly faithful: all material claims supported; at most a trivial unsupported detail.
- 3 — Partially faithful: some claims supported, but at least one material claim is unsupported by the context.
- 2 — Largely unfaithful: multiple material claims unsupported, or a central claim contradicts the context.
- 1 — Unfaithful: the answer is largely fabricated or contradicts the context.

Instructions:
1. Read the context, then the answer.
2. For each factual claim in the answer, check whether the context supports it.
3. List any unsupported or contradicted claims.
4. Assign the score per the rubric.

Ignore the order and presentation of the answer. Do not reward length. Judge only support-by-context.

<context>
{context}
</context>

<answer>
{answer}
</answer>

Respond with: the list of unsupported claims (or "none"), then the score (1-5), as JSON: {"unsupported_claims": [...], "score": N}.
