# Evaluation Checklist

Evals are the test suite of GenAI systems: no evals, no production. Apply at design time — not after build.

## Strategy
- [ ] Quality criteria defined with the business owner (what does a "good" output mean here?)
- [ ] Each criterion mapped to a measurement method: exact match, rubric, LLM-as-judge, human review, online metric
- [ ] Component-level and end-to-end evals separated (e.g., retrieval vs. final answer)
- [ ] Eval strategy documented before implementation begins

## Datasets
- [ ] Golden dataset exists: representative inputs with expected outputs or rubrics
- [ ] Edge cases and failure-prone inputs deliberately included (adversarial, ambiguous, out-of-scope)
- [ ] Dataset versioned; changes reviewed like code
- [ ] Production traffic sampled (with consent/compliance) to keep the dataset representative
- [ ] Dataset large enough for the decision it gates (know your noise floor before trusting a 2% delta)

## LLM-as-judge (if used)
- [ ] Judge rubric written, with scored examples
- [ ] Judge validated against human labels on a sample (agreement measured)
- [ ] Judge model and prompt versioned; known biases (position, verbosity, self-preference) mitigated

## Integration
- [ ] Evals run automatically on prompt, model, parameter, or index changes
- [ ] Release thresholds defined per metric (block vs. warn)
- [ ] Results stored over time; trends visible, not just pass/fail
- [ ] A regression can be traced to the change that caused it (versions captured per run)

## Online evaluation
- [ ] Implicit signals collected: acceptance, edits, retries, abandonment
- [ ] Explicit feedback (thumbs, ratings) wired to traces for triage
- [ ] Offline↔online correlation checked periodically (do your evals predict user experience?)
- [ ] A/B or interleaved testing available for significant changes

## Governance
- [ ] Human review sampling in place for high-stakes outputs
- [ ] Eval ownership assigned (who curates datasets, who tunes judges)
- [ ] Failure analysis cadence scheduled (read the transcripts, not just the scores)
