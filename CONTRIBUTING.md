# Contributing to GSAC

Corrections, improvements, and new material are welcome. This file is the short version of the repo's own discipline — the curriculum teaches these habits; contributions practice them.

## The fastest contributions

1. **Corrections** — a wrong number, a disputed claim, a broken link, a stale count. Open an issue with the file, the line, and the evidence (a primary source beats an opinion). These get merged fastest.
2. **Exercise reports** — you worked a chapter's hands-on exercise and something was uncompletable, mis-estimated, or wrong. That feedback is how the effort labels and acceptance criteria get calibrated against reality. Open an issue titled `exercise: <chapter>`.
3. **Reference implementations** — working code for a project (P01–P25), against a named public dataset, meeting the project's Definition of Done. Open an issue first to agree scope; then PR into the project's directory.

## Ground rules for content changes

- **The chapter template is mandatory** ([templates/chapter-template.md](templates/chapter-template.md), [ADR-0003](adr/ADR-0003-mandatory-chapter-template.md)). Sections may be short, never absent.
- **Concepts over frameworks** ([ADR-0001](adr/ADR-0001-concepts-over-frameworks.md)): frameworks and vendors appear only in Real-world Example, Hands-on Exercise, and Further Reading sections, marked as interchangeable.
- **Terminology anchors in the [Glossary](GLOSSARY.md)** — link to it, don't redefine; add missing terms there, not inline.
- **One canonical home per concept** — cross-link, don't duplicate.
- **Fictional numbers are marked as fictional.** Every metric in a case study or worked example is an illustrative composite. Never present an invented figure as industry data, and never cite one case study's invented figure as evidence in another document.
- **Real claims carry real sources** — dated, primary where possible.
- **Structural changes need an ADR** — new parts, renumbering, template changes: copy [templates/adr-template.md](templates/adr-template.md), number sequentially, add a row to [adr/README.md](adr/README.md).

## Mechanical checklist before any PR

- [ ] `py build-manifest.py` re-run if you added, renamed, or removed any document (the site navigation is generated from `manifest.json`)
- [ ] All relative links resolve (a quick check: every `[text](path)` target exists; link-target paths are case-sensitive on GitHub Pages)
- [ ] New chapters follow the template's 15 sections in order
- [ ] Counts in README/PROGRESS/catalogs updated if you changed the number of chapters, projects, or case studies

## Licensing of contributions

By contributing you agree your contribution is licensed under the repository's licenses ([LICENSE](LICENSE)): CC BY 4.0 for content, MIT for code — inbound the same as outbound.

## Conduct

Be professional and assume good faith; see [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md). Technical disagreements are welcome — bring evidence, steelman first (the curriculum's own chapter 1.8 rules apply to its contributors).
