# ADR-0004: Reposition the curriculum from GenAI Solution Architect to AI Solution Architect

| | |
|---|---|
| **Status** | Accepted |
| **Date** | 2026-07-26 |
| **Deciders** | Curriculum author |

## Context

The curriculum was commissioned (see the original project brief) to take experienced engineers to *GenAI* Solution Architect. An objective full-repository review (2026-07-26, `REVIEW-AI-SOLUTION-ARCHITECT.md`) found that the market role the author is targeting — **AI Solution Architect** — is broader: it includes classical ML system design (prediction, forecasting, ranking, anomaly detection), perception systems, MLOps, data engineering for ML, and model risk management. Against that role, the repository's coverage was measured at ~2.7% of curriculum words, 2 of 22 projects, 0 of 50 case studies, 0 of 6 checklists, and 0 of 41 patterns.

A partial broadening had already begun (chapters 2.9–2.11, projects P21–P22 — which explicitly argue the broader role) but stalled unintegrated: nothing referenced them, the site manifest omitted them, and the capstone excluded them. The repository therefore claimed one scope in its title and argued another in its own chapters.

## Options Considered

### Option 1 — Evolve this repository in place into an AI Solution Architect curriculum
- Pros: preserves ~269k words of proven material and the quality machinery (template, maturity levels, cross-linked narrative); one coherent system; the templates already fit classical ML unmodified (P21 proved it); ends with a portfolio artifact that itself demonstrates breadth.
- Cons: ~25–40k words of new content plus integration work; risk of stalling halfway and reproducing the current contradiction.

### Option 2 — Rebuild: new part structure designed for the broader role, migrate GenAI content in
- Pros: cleanest end state; curriculum architecture matches the role.
- Cons: most disruptive; breaks all links and bookmarks; months before presentable.

### Option 3 — Companion repository for classical ML; GSAC stays GenAI-only
- Pros: nothing existing breaks.
- Cons: institutionalizes the "unintegrated island" failure the review identified; two systems to maintain.

### Option 4 — Keep the GenAI scope, truth-in-labeling only
- Pros: cheapest; honest.
- Cons: abandons the author's actual goal (becoming an AI Solution Architect).

## Decision

**Option 1.** The repository evolves in place into an AI Solution Architect curriculum, with generative AI remaining the deepest specialization track. Execution follows the review's migration strategy with one governing rule: **content before branding** — the title, README claims, and site identity change only after the content makes them true. Sequencing: repair (manifest, links, retrofit loose ends) → classical/hybrid case studies → classical checklist family → classical-track chapters expanded to full-part depth → predictive/scoring patterns + MRM governance chapter → additional classical projects and ROADMAP re-sequencing → rebrand last. Directory renames (`part-3-core-building-blocks-of-genai/`, `part-4-enterprise-genai-systems/`) are deferred indefinitely: those parts genuinely are about generative AI, and renames break every inbound link.

## Consequences

**Positive:** the repository's title, content, and the author's career target realign; the classical track stops being an orphaned appendix; ADR-0002's anticipated "role split" is resolved explicitly rather than by drift.

**Negative / accepted risks:** months of authoring effort; until the rebrand phase, the README still says "GenAI Solution Architect" while the content broadens — an accepted, temporary inversion of the previous mismatch (content ahead of claim, rather than claim ahead of content). New classical content written without hands-on grounding risks the quality collapse observed in Part 8; mitigation: write each chapter only when the corresponding skill has been practiced (projects first where possible).

**Revisit when:** the classical track reaches parity targets (~15–18% of curriculum, ≥6 case studies, checklist family shipped) — that triggers the rebrand phase; or if progress stalls for a quarter, in which case fall back to Option 4 (truth-in-labeling) rather than leaving the mismatch standing.
