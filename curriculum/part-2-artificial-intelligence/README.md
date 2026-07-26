# Part 2 — Artificial Intelligence

The fundamentals under GenAI. You don't need to train models to architect with them — but you do need to know what they can and cannot do, why, and what the failure modes are. Depth is calibrated to an architect: enough math to reason, not to publish.

This part closes with the classical-ML track (2.9–2.13) that turns a GenAI specialist into a full **AI** Solution Architect: designing the systems LLMs are wrong for, engineering the data estate they run on, running both operational lifecycles, and — the defining skill — choosing the right approach per problem. Suggested track order: 2.9 → 2.10 → 2.11 → 2.12 → 2.13 (2.11's triage stands on 2.9–2.10; 2.12–2.13 deepen the engineering).

**Maturity target:** Level 1→2 (2.1–2.8), Level 2→4 (2.9–2.13) · **Estimated effort:** 5–7 weeks

## Chapters

| # | Chapter | Level | What you'll be able to do |
|---|---------|-------|---------------------------|
| 2.1 | [The AI Landscape: History, Waves & Vocabulary](chapter-01-ai-landscape.md) | 1 | Place today's GenAI wave in context; use AI/ML/DL/GenAI vocabulary precisely |
| 2.2 | [Machine Learning Fundamentals](chapter-02-machine-learning-fundamentals.md) | 1 | Explain supervised/unsupervised/reinforcement learning, generalization, overfitting, and the data-quality ceiling |
| 2.3 | [Deep Learning Fundamentals](chapter-03-deep-learning-fundamentals.md) | 1 | Explain neural networks, training via gradient descent, and why scale changed everything |
| 2.4 | [NLP Essentials](chapter-04-nlp-essentials.md) | 1 | Trace the path from bag-of-words to contextual representations; explain tokenization |
| 2.5 | [The Transformer Architecture](chapter-05-transformer-architecture.md) | 2 | Explain attention, why transformers parallelize, and how architecture drives context-window and cost characteristics |
| 2.6 | [Training, Fine-tuning & Alignment](chapter-06-training-finetuning-alignment.md) | 2 | Distinguish pre-training, supervised fine-tuning, and preference alignment (RLHF); know what each changes and costs |
| 2.7 | [Evaluating ML Systems](chapter-07-evaluating-ml-systems.md) | 2 | Choose metrics for classification/generation tasks; explain benchmark contamination and why leaderboards mislead |
| 2.8 | [Responsible AI: Ethics, Fairness & Regulation](chapter-08-responsible-ai.md) | 2 | Identify bias sources, apply fairness lenses, and map the regulatory landscape (EU AI Act–style obligations) to system design |
| 2.9 | [Classical ML System Design](chapter-09-classical-ml-system-design.md) | 2→3 | Design prediction/classification/forecasting systems end-to-end: point-in-time features, batch vs online serving, drift, and the label loop |
| 2.10 | [MLOps and LLMOps: One Discipline, Two Lifecycles](chapter-10-mlops-vs-llmops.md) | 3 | Run both operational lifecycles; version the right artifacts, gate promotions, and govern both lanes with one platform discipline |
| 2.11 | [Choosing the Right AI Approach](chapter-11-choosing-the-right-ai-approach.md) | 4 | Run the five-question triage; assign rules / classical ML / deep learning / GenAI / hybrid per problem stage, and defend it in a one-page memo |
| 2.12 | [Data Engineering & Feature Platforms for ML](chapter-12-data-engineering-feature-platforms.md) | 3 | Design the ML data estate: point-in-time feature pipelines, the feature-store decision, label pipelines, data contracts, and quality gates |
| 2.13 | [Forecasting Systems](chapter-13-forecasting-systems.md) | 3 | Design forecasting end-to-end: the methods ladder baseline-first, rolling-origin backtesting, probabilistic outputs, reconciliation, and FVA-governed overrides |

## Exit criteria

- Explain transformers and fine-tuning to a non-technical stakeholder in 5 minutes (record yourself)
- A one-page memo: "What our model can't do and why" for a chosen model
- Five approach-decision memos from the 2.11 exercise, at least one hybrid and one "no AI"
- The 2.13 forecasting exercise: a rolling-origin backtest with segment champions and a leakage demonstration you can explain

**Previous:** [Part 1](../part-1-professional-foundation/) · **Next:** [Part 3 — Core Building Blocks of Generative AI](../part-3-core-building-blocks-of-genai/)
