# ADR-0003: Every chapter uses one mandatory template

| | |
|---|---|
| **Status** | Accepted |
| **Date** | 2026-07-08 |
| **Deciders** | Curriculum author |

## Context

A ~79-chapter curriculum written over months (potentially by multiple contributors) drifts: some chapters get exercises, others don't; interview prep appears sporadically; business context is strong early and thins out later. Readers also build navigation habits — knowing where trade-offs live in *every* chapter compounds reading speed.

## Options Considered

### Option 1 — Loose guidance ("include exercises where appropriate")
- Pros: authorial freedom; some topics fit unusual structures.
- Cons: guaranteed drift; quality becomes author-dependent; gaps discovered only in review.

### Option 2 — Mandatory template with all 19 sections, always in order
- Pros: uniform reader experience; the template *is* the quality checklist; forces business motivation, trade-offs, mistakes, and interview prep into every topic — exactly the sections lazy drafts omit; enables tooling (lint a chapter for missing sections).
- Cons: occasional awkward fit (e.g., career chapters have thin "threat model"-adjacent sections); ceremony overhead for short topics.

## Decision

Option 2. The template at [templates/chapter-template.md](../templates/chapter-template.md) is mandatory: Title, Learning Objectives, Prerequisites, Estimated Study Time, Difficulty, Introduction, Business Motivation, Theory, Architecture Perspective, Real-world Example, Hands-on Exercise, Enterprise Considerations, Trade-offs, Common Mistakes, Best Practices, Architecture Checklist, Interview Questions, Further Reading, Summary. Sections may be short, never absent.

## Consequences

**Positive:** predictable navigation; drafts are reviewable against a fixed bar; no chapter ships without the sections that make this curriculum production-oriented.

**Negative / accepted risks:** a few sections will feel forced in Part 8; authors must resist padding — "short, never absent" requires editorial discipline.

**Revisit when:** two or more parts consistently produce degenerate (one-line) sections, indicating the template needs a variant.
