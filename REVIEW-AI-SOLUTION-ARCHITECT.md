# Repository Review: GSAC as an "AI Solution Architect" Roadmap

> An objective architectural review of this repository, evaluating whether it prepares someone for the broader **AI Solution Architect** role or remains primarily a **Generative AI Solution Architect** curriculum.
>
> **Review date:** 2026-07-26
> **Scope reviewed:** 218 files — ~269,000 words of curriculum across 8 parts (79 chapters), 22 projects, 50 case studies, 6 checklists, the 7-prompt library, 4 templates, 3 ADRs, the GitHub Pages site (index.html, app.js, manifest.json, build-manifest.py), and the original generation brief PDF. No files were modified as part of this review.

---

## 1. Executive Summary

The instinct behind this review is correct, and the evidence is not close: **this is a Generative AI Solution Architect curriculum with a thin, late-added classical-AI appendix — not an AI Solution Architect roadmap.** The GenAI material is genuinely excellent: disciplined, production-oriented, opinionated, and internally consistent to a degree that is rare in curricula of this size. But the breadth an AI Solution Architect needs — classical ML system design, forecasting, recommenders, computer vision, MLOps tooling, model risk management, data engineering for ML — receives roughly **2.7% of the curriculum's word count** (three chapters, ~7,150 words), **2 of 22 projects**, **0 of 50 case studies**, **0 of 6 checklists**, and **0 of 41 patterns** in the pattern catalog.

Three findings deserve special attention:

1. **The repository already knows this.** Chapter 2.9 states verbatim: *"An AI Solution Architect — as opposed to a GenAI-only architect — must be able to design these systems."* Chapters 2.9–2.11 and projects P21/P22 were retrofitted later (git history confirms: the commit "completing all 20 projects" predates them, and `projects/README.md` still says "Twenty projects" on line 3). The broadening being contemplated has quietly begun — it just stopped at five files.
2. **The website hides exactly the content that makes the broader-role argument.** `manifest.json` is stale: chapters 2.9, 2.10, 2.11 and projects P21, P22 exist on disk but are **absent from the site navigation**, and the home-page stats (82 chapters / 22 projects) don't match what the nav can reach (79 / 20). The single highest-leverage action in this entire review is running `build-manifest.py` once.
3. **The gap is asymmetric, which makes migration tractable.** Parts 1 and 6 (~62k words) are largely role-agnostic already; the templates need ~5 string changes; the site shell needs 2. The real cost is concentrated in new content (classical-ML chapters, case studies, checklists, patterns) and two directory renames — not in rewriting what exists.

---

## 2. Overall Assessment

**As a GenAI Solution Architect curriculum: 8.5/10.** Parts 3 and 4 are among the best-executed material of this kind — mechanism-grounded (limits traced to causes), failure-taxonomy driven ("localize before fixing"), consistently opinionated against hype ("90% workflow, 10% agent, 100% guardrails"), with situational interview questions and cumulative exercises. Citations spot-checked against ~16 arXiv papers were accurate.

**As an AI Solution Architect curriculum: 4/10.** The judgment layer transfers (trade-off discipline, TCO method, governance, triage), but the substance does not. A graduate asked in an interview to design a fraud-detection system — feature pipeline, label lag, threshold-vs-cost-matrix, drift monitoring, champion–challenger rollout — has ~2,300 words of preparation behind them. Asked to design a RAG platform, they have ~85,000.

**The honest current framing would be:** *"GenAI Solution Architect with classical-ML triage literacy."* The curriculum teaches you to correctly **recognize** and **refuse** to route a churn problem to an LLM (chapter 2.11 does this genuinely well), then hands you off to material that cannot teach you to **build** the alternative.

Quantitative evidence of scope (term occurrences across all curriculum, projects, case studies, and checklists):

| GenAI terms | Count | Broader-AI terms | Count |
|---|---|---|---|
| agent | 995 | computer vision / CNN / convolutional | **0** |
| prompt | 906 | experiment tracking | **0** |
| RAG | 731 | AutoML | **0** |
| LLM | 486 | edge / on-device AI | **0** |
| vector | 281 | time series | 2 |
| embedding | 197 | A/B test | 2 |
| fine-tun* | 192 | feature engineering | 4 |
| hallucination | 78 | feature store | 7 |

("drift" scores 172 — but in Parts 3–7 every occurrence means prompt/instruction/cost drift, never feature-distribution drift of a deployed model.)

### Word-count distribution

| Part | Words | Scope |
|---|---|---|
| 1 — Professional Foundation | 24,888 | Role-agnostic with removable GenAI veneer |
| 2 — Artificial Intelligence | 32,990 | ~25.6k funnels to LLMs; classical track (2.9–2.11) = 7,154 words |
| 3 — Core Building Blocks of GenAI | 34,233 | Pure GenAI |
| 4 — Enterprise GenAI Systems | 49,708 | Pure GenAI (~95% LLM-exclusive by grep evidence) |
| 5 — Cloud, Infrastructure & Platform | 36,838 | LLM-serving-shaped; no training infra, no ML data platform, no MLOps |
| 6 — Enterprise Architecture | 36,583 | Skeleton general; flesh GenAI; MRM = 1 sentence (in Part 4) |
| 7 — AI Architecture Patterns | 31,498 | 41 patterns + 6 anti-patterns, all GenAI; ~90% restatement of Parts 3–6 |
| 8 — Professional Excellence | 22,060 | Role framing generic under the label; severe prose-quality problems |

---

## 3. Strengths

These are real and worth protecting through any migration:

1. **Template discipline is effectively perfect.** All 79 chapters carry the identical 15-section structure — exactly 4 learning objectives, 1 Mermaid diagram, a 4-row trade-off table, 4 interview questions with model answers. The template *is* the quality bar, as ADR-0003 intended.
2. **The cross-referenced narrative universe.** Recurring fictional companies (Bellhaven, Corvid, Vantora, Meridian, Halvard & Roth, Kestrel) carry continuous arcs across parts. This is unusually good pedagogy.
3. **Opinionated, mechanism-backed positions.** "Managed API is the default," "reach for workflows before agents," "resist multi-cloud without a driver," "over-blocking is a first-class failure" — each argued, not asserted.
4. **Chapter 2.11 (Choosing the Right AI Approach)** is the most differentiating chapter in the repo: the 5-rung capability ladder, five-question triage, and five named anti-patterns (LLM-as-calculator, forecasting-with-vibes, prompt-engineered-classification-with-abundant-labels…) are exactly the judgment that separates an AI SA from a GenAI enthusiast.
5. **P21 and P22 are not token additions.** P21's untreated-control-slice point ("retraining data isn't poisoned by the model's own interventions") and P22's per-stage promotion lanes are genuinely senior content — arguably the best-written project docs in the repo.
6. **Part 1 and Part 6 are largely role-agnostic assets.** Requirements, estimation, communication, EA frameworks, ADR practice, governance, TCO method — competent general architecture material that would survive repositioning nearly untouched.
7. **The prompt library has the highest craft-per-line in the repository** — typed variables with untrusted-content columns, injection edge cases in examples, changelogs with eval evidence (e.g., faithfulness-judge v1.3: "human-agreement restored from 71% to 88%…").
8. **The static site is well-built**: dependency-free architecture, client-side full-text search, theme-aware Mermaid, read-tracking — a genuinely good reading experience (when the manifest is current).

---

## 4. Gaps vs. a Complete AI Solution Architect Roadmap

### 4.1 Structural gaps (the scope problem)

| Asset class | Total | Classical/hybrid AI | Share |
|---|---|---|---|
| Curriculum word count | ~269k | ~7.2k (ch. 2.9–2.11) | **2.7%** |
| Curriculum parts | 8 | 0 (Parts 3, 4, 5, 7 pure GenAI; 1, 6, 8 agnostic-but-GenAI-flavored) | — |
| Projects | 22 | 2 (P21 classical, P22 hybrid) | 9% |
| Case studies | 50 | **0** | 0% |
| Checklists | 6 | **0** | 0% |
| Patterns (Part 7) | 41 + 6 anti | **0** | 0% |
| Prompt-library counterpart (feature/model-card library) | — | none | — |

Supporting detail:

- **All 50 case studies are GenAI systems** (confirmed via the `System type` field of every file). Zero reference chapters 2.9–2.11. Keyword sweeps for XGBoost / random forest / logistic regression / AUC / ARIMA / collaborative filtering / CNN return zero substantive hits.
- **Part 5** has zero hits for: feature store, experiment tracking, retraining, data drift, concept drift, champion–challenger, batch scoring, Kafka, CDC, Spark, MLflow, medallion. Its "streaming" is HTTP response streaming. 5.7 "LLMOps" mentions MLOps exactly once — in Further Reading.
- **Part 6's model-risk treatment is one sentence** (located in 4.14). NIST AI RMF: 0 occurrences. ISO/IEC 42001: 0. Three lines of defense: 0. Independent model validation: 0.
- **Part 7's only classically-transferable pattern is Confidence-Based Routing**; the other ~36 patterns reference prompts, tokens, agents, retrieval, or providers in their Solution or Forces by construction.

### 4.2 Integration gaps (the retrofit is unfinished)

- **`manifest.json` omits ch. 2.9–2.11, P21, P22** — the site cannot show the broader-role content at all; hero stats claim 82/22 while the nav reaches 79/20. (`manifest.json` was last hand-edited, not regenerated; `build-manifest.py` fixes this in one run.)
- Zero of 50 case studies reference chapters 2.9–2.11. Nothing in the repo cites P21/P22 back except list entries in PROGRESS/ROADMAP.
- P20 (the capstone that "synthesizes all prior projects P01–P19") **explicitly excludes** P21/P22.
- Sequencing bug: P21 sits in Tier 2, but the ROADMAP defers its prerequisites (2.9–2.10) to Phase 3 — a learner following tier order reaches P21 before its prerequisites.
- Leftover edit artifacts: `projects/README.md:3` still says "Twenty projects"; `ROADMAP.md:40` contains the mangled "P06–P12 plus P21(at least four of Eight)".

### 4.3 Mis-scoped case studies

Four case studies describe problems whose industry-standard solution is classical ML but prescribe (or imply) LLMs:

- **CS30 Subrogation Opportunity Detection** — a canonical propensity-model problem; the document never names any technology, and its cost model ("batch, tiering (7.8)") implies LLM tiering. No AUC, no thresholds, no labels, no drift.
- **CS24 eDiscovery Triage** — real-world TAR (technology-assisted review) is textbook supervised learning with active learning; the case prescribes "compact model + batch pricing" LLM tiering instead.
- **CS45 Learning & Development Recommender** — a recommender in name only: no collaborative filtering, no NDCG, no cold-start, no offline/online eval split.
- **CS12 Conversational Shopping Assistant** — the recommendation core is treated as an opaque external service.

These are exactly the cases where chapter 2.11's own triage would have rejected the LLM.

### 4.4 Quality gaps independent of scope

These matter regardless of the repositioning decision:

- **No code anywhere.** Zero implementation files in 22 project directories, despite `projects/README.md` promising "the filled template plus source code" and maturity levels named "Build" and "Engineer." Every Definition of Done says "another engineer can run it in <15 minutes"; nothing runs. All 79 chapters contain exactly one fenced block — the Mermaid diagram.
- **Part 8's prose has degraded badly** — appositive-stacked, self-referential sentences at 3–4× the noun-phrase density of Part 1 (measured: Part 1 range 3.7–6.0%, Part 8 range 17.5–19.8%, zero overlap), fake "real-world examples" that recap other chapters, and degenerate trade-off tables ("Choose B when: Never").
- **28 cross-links point at part READMEs instead of chapter files that exist** (e.g., 3.6 links "4.1 Production RAG Architecture" to the Part 4 README); one stale "(when written)" marker in 4.5 for a Part 7 chapter that exists.
- **Unsourced precision**: fictional case numbers ("82% cost cut," "recall 0.58→0.86," "58% estate cost reduction") are never signposted as illustrative composites; readers will quote them in design reviews.
- **Part 7 is ~90% restatement** of Parts 3–6 (a deliberate "compression index," but it violates the repo's own "no duplicated topics" rule and adds ~zero new technical content in 31k words; 7.9's five patterns are pure restatement of 5.4/4.7/3.3/4.11/6.9).
- Uniform ~3,000–3,500-word chapter length regardless of topic weight; case-study quality thins toward the tail (CS42/CS45 noticeably shallower than CS01–CS10); the prompt library ships 1 exemplar per category against a README advertising ~3–4 each.
- Substantial Part 5 ↔ Part 6 overlap (5.5↔6.7 data ownership; 5.10↔6.9 golden paths, argued at full length in both).
- Site depends on three CDN libraries (marked, highlight.js, mermaid) — does not work offline despite being otherwise fully static.

---

## 5. Missing Topics and Why They Matter

Ranked by how load-bearing the gap is for a working AI Solution Architect:

| # | Missing topic | Current coverage | Why it matters |
|---|---|---|---|
| 1 | **Data engineering & ML data platforms** — feature stores, streaming/CDC, point-in-time correctness at platform level, labeling pipelines, data contracts, medallion layering | One paragraph in 2.9; Part 5.5 covers only the RAG corpus | This is 30–40% of a real AI SA's job. Every model — classical or generative — sits on this substrate. Labeling cost is often the dominant line in a classical-ML business case and is absent from the TCO chapter (6.10). |
| 2 | **MLOps as engineering practice** — model registries, experiment tracking, training-pipeline orchestration, retraining triggers, shadow/canary deployment for models | 2.10's excellent 458-word *conceptual* comparison; 5.7 covers LLMOps only and mentions MLOps once, in Further Reading | An AI SA who cannot specify a champion–challenger promotion gate or a drift-triggered retraining loop cannot take a classical model to production. The conceptual frame exists (2.10's inversion table is genuinely good); the engineering content behind it doesn't. |
| 3 | **Time-series forecasting** | One table row + nine words ("Statistical baselines, GBTs with lag features, specialized forecasters") | Demand/capacity/cash-flow forecasting is among the most-funded enterprise AI use cases. Horizon design, seasonality, backtesting, prediction intervals, hierarchical reconciliation — none exist. 2.11 even names "forecasting-with-vibes" as an anti-pattern, then provides no correct alternative. |
| 4 | **Model risk management & AI regulation for predictive systems** — SR 11-7, three lines of defense, independent validation, model inventory, NIST AI RMF (0 mentions), ISO/IEC 42001 (0 mentions) | One sentence, in 4.14 | For banking/insurance/healthcare — the industries in the majority of the case studies — an architect who can't survive a model-validation committee can't ship. EU AI Act risk tiers are covered (2.8, well) but never applied to non-GenAI systems in Part 6. |
| 5 | **Recommender systems** | One table row + five words | Collaborative filtering, implicit feedback, cold start, position bias, NDCG, offline/online metric divergence. CS45 is literally titled "Recommender" and contains none of it. |
| 6 | **Computer vision system design** | Zero (CV exists only as "buy the vendor API") | Annotation ops, transfer learning, mAP/IoU evaluation, industrial inspection, edge deployment. Buying perception is often right — but an AI SA must be able to evaluate that trade, not default to it from ignorance. |
| 7 | **Online experimentation / A-B testing** | 2 mentions in passing | Experiment design, power analysis, guardrail metrics, the offline-metric→online-lift gap. This is how AI value claims get verified; the curriculum teaches offline evals only. |
| 8 | **Anomaly detection** | Absent even from 2.9's own framework | Headline enterprise use case (fraud, ops telemetry, quality); unsupervised methods and alert-fatigue design are their own discipline. |
| 9 | **Explainability & fairness as engineering, not ethics** — SHAP/LIME, reason codes/adverse-action notices, calibration, subgroup metrics | Conceptually touched in 2.8; no named technique anywhere; "feature attributions" asserted, never taught | Regulatorily mandatory for credit/insurance scoring (ECOA/FCRA). The repo says regulators accept feature attributions and never shows one. |
| 10 | **Speech/audio and edge/on-device AI** | Zero (despite P15 being a voice assistant and CS13/CS33 flagging offline/edge constraints) | The curriculum's own projects and cases depend on chapters that don't exist. |
| 11 | **Optimization/OR, RL/bandits, causal inference & uplift** | Zero / RLHF-only / one "future improvement" bullet | Scheduling, routing, and pricing problems routinely arrive labeled "AI." Uplift modeling is the correct completion of P21's churn story (predicting *persuadability*, not just risk). |
| 12 | **Within GenAI scope: IP/copyright/licensing of generated content** (0 occurrences repo-wide), agent memory, text-to-SQL, multi-turn evaluation, distillation, synthetic data | Absent | The IP gap is notable: 4.14 is thorough on GDPR/HIPAA/residency yet silent on output ownership, provider indemnity, and open-weights license obligations — a top-tier enterprise legal question. |

---

## 6. Recommended Improvements

### Critical (do these regardless of the repositioning decision)

| # | Action | Effort |
|---|---|---|
| C1 | **Regenerate `manifest.json`** (`py build-manifest.py`). Surfaces 2.9–2.11, P21, P22 on the site and fixes the 82-vs-79 / 22-vs-20 stat mismatch. | Minutes |
| C2 | **Finish the retrofit's loose ends**: the "Twenty projects" leftover, the mangled ROADMAP line, P21's tier-vs-prerequisite sequencing conflict, P20's exclusion of P21/P22 from the capstone synthesis. | Hours |
| C3 | **Decide the positioning explicitly and record it as ADR-0004.** ADR-0002's revisit clause already anticipated this ("the role itself splits… AI platform architect vs. AI solution architect"). The repo currently claims one thing in its title and argues another in ch. 2.9/2.11 — that contradiction is the worst state to remain in. | An evening |
| C4 | **Fix the 28 chapter links that point at part READMEs** and the stale "(when written)" marker in 4.5. | Hours |

### High (the substance of the repositioning)

| # | Action | Effort |
|---|---|---|
| H1 | **Expand the classical track from 3 chapters to a full part** (or 6–8 chapters at Part-3/4 depth): tabular systems · forecasting · ranking/recommenders + anomaly detection · data engineering & feature platforms · MLOps engineering · perception systems (CV/OCR/speech, incl. the build-vs-buy trade) · online experimentation. Raises classical coverage from ~2.7% to ~15–18%. | The big one: ~25–35k new words |
| H2 | **Add 6–8 classical/hybrid case studies** (demand forecasting, fraud scoring, predictive maintenance with CV, a real recommender, credit-risk with MRM, ops anomaly detection) — and **fix CS30/CS24/CS45**, which currently model the wrong solution for their own problems. This does more than anything else to close the gap, because it gives 2.11's triage something to choose *against*. | ~6–10k words |
| H3 | **Add a classical-ML checklist family**: model validation, data quality & labeling, drift & model monitoring, MRM/fairness. Otherwise the reusable tooling silently teaches that "AI review" = "LLM review." | ~2–3k words |
| H4 | **Add a Predictive/Scoring pattern family to Part 7** (batch scoring, online feature-served inference, retrieve-then-rank, champion–challenger, shadow scoring, drift-triggered retraining, cascade/reject-option). The raw material already exists in 2.9; it was never promoted into the pattern language. | 1–2 chapters |
| H5 | **Add an MRM & AI regulatory governance chapter to Part 6** (SR 11-7 structure, independent validation, model inventory, NIST AI RMF, ISO 42001, EU AI Act applied to predictive systems). | 1 chapter |
| H6 | **Add code.** At minimum: JSON schemas, prompt texts, and one reference implementation per Tier 1–2 project or per exercise. "Level 2 — Build" is currently an aspirational label. | Large; can be incremental |

### Medium

- Extend Part 5: training infrastructure (distributed training, GPU scheduling, CPU-scale classical training — 5.2 currently treats training as the vendor's problem); ML data platform content in 5.5; either widen 5.7 to both lifecycles using 2.10's frame, or add an MLOps peer chapter.
- Add labeling/training/validation cost lines to 6.10's TCO model; feature governance and training-data provenance to 6.7.
- **Rewrite Part 8** (quality-driven; fold the ~26 branding line-edits into the rewrite for free). Add the missing GenAI-scope chapter on IP/copyright/licensing.
- Signpost all fictional metrics as illustrative composites (one line in the case-study README).
- Fill the prompt library to its advertised 3–4 prompts per category, or amend the README.

### Low

- Fold 4.13 (Prompting vs RAG vs Fine-tuning, ~75% restatement, mis-positioned after the ops chapters) into 2.6/Part 3.
- Vendor the three CDN libraries (marked, highlight.js, mermaid) so the site works offline.
- Reduce slogan repetition ("integrate-don't-parallel" appears in 11 chapters); trim Part 7's restatement ratio or explicitly label it as the reference index it is.
- Migrate `localStorage` keys (`gsac-read`, `gsac-theme`) if the brand changes — a rename orphans readers' saved progress.

---

## 7. Suggested Migration Strategy

A deliberate sequence that avoids the two failure modes: a cosmetic rename that the content can't back up, and a content expansion that ships under a stale brand.

### Phase 0 — Repair (1–2 evenings)

C1–C4 above. Zero new content; makes the repo internally honest and surfaces the existing broader-AI material. Do this even if the repositioning is ultimately declined.

### Phase 1 — Decide and record (ADR-0004)

Three honest options:

- **(a) Stay GenAI-branded, truth-in-labeling.** Keep GSAC; reframe 2.9–2.11 + P21/P22 as an explicit "breadth track"; state in the README that this prepares a GenAI SA with classical-ML triage literacy. Cheapest; defensible; but abandons the stated goal.
- **(b) Full AI Solution Architect repositioning.** The right call *if* Phase 3 will actually be funded — **recommended**, because the market role is real, the curriculum's judgment layer already generalizes, ch. 2.9/2.11 already argue for it, and the asymmetric cost analysis shows most of the repo survives unchanged. But commit to the content, not just the label: a renamed repo whose case-study corpus is 50-for-50 GenAI would *create the exact false expectations this review warns about, in the opposite direction*.
- **(c) Two-track positioning** ("AI Solution Architect curriculum with deep GenAI specialization") — the most honest description of what a completed migration will actually be, since GenAI depth will remain the differentiator.

### Phase 2 — Rebrand the shell (1–2 weekends, only after Phase 3 is committed)

Order matters — identity strings before paths:

1. README/ROADMAP/PROGRESS titles and framing; `index.html` title; `build-manifest.py` title string; regenerate the manifest.
2. Amend or supersede the generation-brief PDF (`Project- GSAC (GenAI Solution Architect Curriculum).pdf`) — it is the repo's constitution ("create the world's most comprehensive curriculum for becoming a GenAI Solution Architect"), and any repositioning that doesn't amend it will drift back.
3. Part 8.1 and Part 1.1's role definitions (~40 lines total carry the identity in prose).
4. **Defer directory renames** (`part-3-core-building-blocks-of-genai/`, `part-4-enterprise-genai-systems/`, repo name). They break hundreds of relative links plus every bookmarked hash URL, and they're honest names — those parts *are* about generative AI. Rename the repo last, if at all; GitHub redirects repo renames but nothing redirects in-repo paths.

### Phase 3 — Content expansion (the real work, 2–4 months at curriculum pace)

In leverage order:

1. **H2 case studies** — fastest visible proof of breadth; reuses the existing case-study template verbatim (P21 already proved the templates fit classical ML unmodified).
2. **H3 checklists.**
3. **H1 classical part** (6–8 new chapters).
4. **H4 patterns + H5 MRM chapter.**
5. Medium-tier Part 5/6 extensions.
6. Add 2–3 projects (forecasting, recommender, MLOps pipeline) and re-sequence the ROADMAP so the classical track is a first-class phase, not a Phase-3 parenthetical.

### Phase 4 — Quality debt (parallel or after)

Code for Tier 1–2 projects; Part 8 rewrite; link hygiene; prompt-library completion.

**Sequencing principle: content before branding.** If the rename happens in Phase 1 and Phase 3 stalls, the repository makes a promise it can't keep — which is precisely the flaw this review found in the current title, just inverted.

---

## 8. Final Challenge (assumptions worth confronting)

Two assumptions deserve honest pushback, as requested:

1. **"The repo should become an AI SA roadmap" is a choice, not a correction.** The current repo is a *very good* instance of a narrower thing. Specialist curricula have real value, and demand for GenAI architects specifically is what the repo's own market chapter (8.1) bets on. The failure isn't the scope — it's that the title, the 2.9/2.11 prose, and the invisible-on-site retrofit currently disagree with each other about what the scope *is*.
2. **If broadening proceeds, the bar is higher than adding chapters.** The evidence shows the last broadening attempt (2.9–2.11, P21/P22) produced excellent artifacts that nothing else references, the site doesn't serve, and the capstone excludes. Integration — cross-links, roadmap phases, case-study citations, capstone synthesis, checklists — is what makes added content part of a curriculum rather than an appendix. Budget as much effort for weaving as for writing.

---

## Appendix A — Detailed evidence highlights

- **Part 2 depth distribution:** the three chapters carrying the broader-AI claim (2.9: 2,278 words; 2.10: 2,219; 2.11: 2,657) are the three *shortest* in Part 2, with the thinnest Theory, Real-world, and Exercise sections. 2.10's Theory section (458 words) is the smallest in the part. Terminology density in 2.4 (NLP Essentials): 72 GenAI terms vs 0 classical-ML terms; in 2.5 (Transformer): 119 vs 1.
- **2.9's own four problem families are unevenly served:** tabular classification gets genuine design treatment; forecasting gets nine words; ranking/recommendation gets five words; anomaly detection is absent.
- **Deep-learning chapter (2.3) contains zero architectures** — no CNN, no RNN/LSTM, no autoencoder, no diffusion. Its payload is the GenAI cost story.
- **Parts 3+4 (83,941 words) vs classical track (7,154 words) ≈ 12:1**; against 2.9+2.10 alone ≈ 19:1.
- **Part 7 pattern inventory (all GenAI):** RAG (6), Workflow (5), Agentic (5), Human-in-the-Loop (5), Safety (5), Knowledge & Data (5), Cost & Performance (5), Platform & Multi-tenancy (5), Anti-patterns (6). "Batch Lanes" is the nearest name to batch scoring but is about LLM batch-pricing APIs.
- **Case-study quality:** substantive and template-complete (stakeholders, NFRs with numbers, three Mermaid diagrams, threat model, costs) but formulaic — threat models reuse the same 3–4 archetypes with "Likelihood: Med" nearly everywhere; a stock phrase ("the defining constraint") appears in essentially every Constraints section; the tail (CS42, CS45) is measurably thinner than CS01–CS10.
- **Site branding is shallower than it appears:** only 2 authored GenAI-brand strings in the site shell (`index.html` title, `build-manifest.py` title) plus generated copies in `manifest.json`; the other ~40 manifest occurrences derive from directory names and chapter H1s. Templates carry ~5 GenAI placeholder strings total, none mandated.
- **One citation imprecision found:** 3.1 conflates Kalai & Vempala's *Calibrated Language Models Must Hallucinate* (2023) with *Why Language Models Hallucinate* (Kalai, Nachum, Vempala, Zhang, 2025).

*Review conducted with parallel deep-read passes over every part of the repository; all counts stated above were verified by direct file reads and regex sweeps at review time.*
