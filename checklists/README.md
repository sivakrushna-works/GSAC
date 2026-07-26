# Checklists

The habits of the job, in checkbox form — apply them to every project and design review. A "no" is not a blocker by itself; an *unconsidered* item is.

## Both lanes

| Checklist | Use when |
|---|---|
| [Architecture review](architecture-review-checklist.md) | Every design review of an AI system — GenAI or classical; the master checklist that routes to the others |

## GenAI lane

| Checklist | Use when |
|---|---|
| [RAG design](rag-design-checklist.md) | Designing or reviewing any retrieval-augmented system |
| [Agent design](agent-design-checklist.md) | Any system where an LLM directs control flow |
| [Evaluation](evaluation-checklist.md) | Before build starts — evals are the test suite of GenAI systems |
| [Security](security-checklist.md) | Threat-modeling a GenAI system (OWASP-LLM-aligned) |
| [Deployment](deployment-checklist.md) | Before each production release of a GenAI system |

## Classical-ML lane

| Checklist | Use when |
|---|---|
| [ML model validation](ml-model-validation-checklist.md) | Before any trained model earns production traffic |
| [Data quality & labeling](data-quality-labeling-checklist.md) | Designing any trained system — and whenever "the model got worse" |
| [Drift & model monitoring](drift-model-monitoring-checklist.md) | Before go-live — a model without monitoring is not done |
| [MRM & fairness](mrm-fairness-checklist.md) | Models whose decisions affect people or carry regulatory weight |
