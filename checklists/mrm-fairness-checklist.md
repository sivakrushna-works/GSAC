# Model Risk Management & Fairness Checklist

For models whose decisions affect people or carry regulatory weight (credit, insurance, employment, healthcare, government). In these domains the model is a governed artifact first and a predictor second ([CS55](../case-studies/cs55-credit-risk-scoring-mrm.md)). Anchored in [2.8](../curriculum/part-2-artificial-intelligence/chapter-08-responsible-ai.md), [4.14](../curriculum/part-4-enterprise-genai-systems/chapter-14-privacy-compliance-governance.md), and SR 11-7-style regimes.

## Inventory and classification
- [ ] The model is registered in a model inventory: purpose, owner, materiality tier, approved uses, validation status, last-validated date
- [ ] Regulatory classification done (e.g., EU AI Act risk tier — [2.8](../curriculum/part-2-artificial-intelligence/chapter-08-responsible-ai.md)); obligations mapped to concrete controls
- [ ] "Approved use" is specific — a score built for one decision reused for another is a new model risk, not a convenience

## Roles and independence
- [ ] Model owner, developer, validator, and user are distinct roles; the validating team does not report to the shipping team
- [ ] Independent validation covers: conceptual soundness, data appropriateness, outcomes analysis vs. alternatives/benchmarks, sensitivity testing, and the ongoing-monitoring plan
- [ ] Validation findings tracked to closure; unresolved findings block promotion
- [ ] Escalation path defined for model-risk events (breach of limits, drift beyond tolerance, fairness threshold crossed)

## Documentation (producible, not written-after)
- [ ] Model documentation pack generated from system artifacts: purpose, data lineage, feature list with permissible-use review, methodology and alternatives considered, performance at the operating point, limitations, monitoring plan ([4.14](../curriculum/part-4-enterprise-genai-systems/chapter-14-privacy-compliance-governance.md)'s evidence-from-engineering-artifacts)
- [ ] Every production decision logged with model version, features, score, and reason codes — replayable for examination
- [ ] Change control on the governed composite (features + model + thresholds + reason-code derivation): any change is a governed event with defined review depth

## Explainability and recourse
- [ ] Adverse decisions produce **reason codes** derived mechanically from the model, in language the affected person can act on — never narrated after the fact ([CS55](../case-studies/cs55-credit-risk-scoring-mrm.md))
- [ ] Model constraints support honest explanation where required (e.g., monotonicity on domain-directional features); the interpretability-vs-lift trade is an ADR, not an accident
- [ ] A human appeal/override path exists; overrides are coded, logged, and reviewed as their own decision system
- [ ] If an LLM narrates anything, the narration is generated *from* the structured rationale and validated against it — a generated explanation is not an audit artifact ([2.11](../curriculum/part-2-artificial-intelligence/chapter-11-choosing-the-right-ai-approach.md))

## Fairness (engineering, not intention)
- [ ] Protected groups and the applicable legal standard identified with counsel; the fairness metric *chosen deliberately* (disparate-impact ratio, equalized odds, subgroup performance — they conflict; [2.8](../curriculum/part-2-artificial-intelligence/chapter-08-responsible-ai.md))
- [ ] Fairness tested at the operating thresholds pre-launch, and monitored on the same cadence as performance — by group, on production data
- [ ] Feature proxy analysis done: facially neutral features examined for proxying protected attributes; business-necessity documented where disparity has a defended driver
- [ ] For recommenders and ranking systems: **exposure** by group monitored, not just decisions — who gets shown the opportunity is the fairness surface ([CS45](../case-studies/cs45-learning-development-recommender.md))
- [ ] Feedback loops assessed: does acting on the model's outputs entrench the historical pattern it learned? Mitigation (exploration, floors, monitoring) in place ([CS54](../case-studies/cs54-product-recommendations.md))

## Ongoing governance
- [ ] Periodic re-validation scheduled by materiality tier; performance attestation produced on cadence (monthly/quarterly pack: stability, calibration, discrimination, fairness, overrides — [CS55](../case-studies/cs55-credit-risk-scoring-mrm.md))
- [ ] Limits defined (performance floors, drift tolerances, fairness bounds) with named actions on breach
- [ ] Decommissioning criteria exist — models leave the inventory deliberately, not by abandonment
