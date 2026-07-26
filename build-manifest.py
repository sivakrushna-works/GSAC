#!/usr/bin/env python3
"""Generate manifest.json for the GSAC reader UI.

Walks the repository and produces a navigation manifest (sections -> groups -> docs)
with titles extracted from each document's H1. This is a one-time generation step,
not a runtime dependency: re-run it after adding/renaming documents.

    py build-manifest.py

Produces manifest.json at the repo root. No middleware, no DB - just static data.
"""
from __future__ import annotations

import json
import re
import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parent

H1_RE = re.compile(r"^#\s+(.+?)\s*$", re.MULTILINE)
INDUSTRY_RE = re.compile(r"\|\s*\*\*Industry\*\*\s*\|\s*([^|]+?)\s*\|")
TIER_RE = re.compile(r"\|\s*\*\*Tier\*\*\s*\|\s*([^|]+?)\s*\|")


def title_of(path: Path) -> str:
    """First H1 in the file, or a humanized filename fallback."""
    try:
        text = path.read_text(encoding="utf-8")
    except Exception:
        return path.stem
    m = H1_RE.search(text)
    if m:
        return m.group(1).strip()
    return path.stem.replace("-", " ").title()


def meta(path: Path, regex: re.Pattern) -> str | None:
    try:
        text = path.read_text(encoding="utf-8")
    except Exception:
        return None
    m = regex.search(text)
    return m.group(1).strip() if m else None


def rel(path: Path) -> str:
    return path.relative_to(ROOT).as_posix()


def doc(path: Path, kind: str) -> dict:
    return {"path": rel(path), "title": title_of(path), "kind": kind}


def curriculum_section() -> dict:
    groups = []
    part_dirs = sorted((ROOT / "curriculum").glob("part-*"))
    for part in part_dirs:
        docs = []
        readme = part / "README.md"
        if readme.exists():
            docs.append(doc(readme, "part-index"))
        for ch in sorted(part.glob("chapter-*.md")):
            docs.append(doc(ch, "chapter"))
        if docs:
            groups.append({"id": part.name, "title": title_of(readme) if readme.exists() else part.name, "docs": docs})
    return {"id": "curriculum", "title": "Curriculum", "groups": groups}


def case_studies_section() -> dict:
    # Group by industry, preserving encounter order (cs number == catalog order).
    order: list[str] = []
    buckets: dict[str, list[dict]] = {}
    readme = ROOT / "case-studies" / "README.md"
    if readme.exists():
        order.append("Catalog")
        buckets["Catalog"] = [doc(readme, "case-study-index")]
    for cs in sorted((ROOT / "case-studies").glob("cs*.md")):
        industry = meta(cs, INDUSTRY_RE) or "Other"
        if industry not in buckets:
            buckets[industry] = []
            order.append(industry)
        buckets[industry].append(doc(cs, "case-study"))
    groups = [{"id": ind, "title": ind, "docs": buckets[ind]} for ind in order]
    return {"id": "case-studies", "title": "Case Studies", "groups": groups}


def projects_section() -> dict:
    order: list[str] = []
    buckets: dict[str, list[dict]] = {}
    readme = ROOT / "projects" / "README.md"
    if readme.exists():
        order.append("Catalog")
        buckets["Catalog"] = [doc(readme, "project-index")]
    for pdir in sorted((ROOT / "projects").glob("p*")):
        readme = pdir / "README.md"
        if not readme.exists():
            continue
        tier = meta(readme, TIER_RE) or "Other"
        # Normalize tiers like "Intermediate" / "2→3 - Build → Engineer" to the leading word.
        tier_key = tier.split()[0].rstrip(".")
        if tier_key not in buckets:
            buckets[tier_key] = []
            order.append(tier_key)
        buckets[tier_key].append(doc(readme, "project"))
    groups = [{"id": t, "title": t if t == "Catalog" else f"{t} Tier", "docs": buckets[t]} for t in order]
    return {"id": "projects", "title": "Projects", "groups": groups}


def reference_section() -> dict:
    groups = []

    overview = []
    for name in ["README.md", "ROADMAP.md", "PROGRESS.md", "GLOSSARY.md"]:
        p = ROOT / name
        if p.exists():
            overview.append(doc(p, "overview"))
    if overview:
        groups.append({"id": "overview", "title": "Overview", "docs": overview})

    checklists = [doc(p, "checklist") for p in sorted((ROOT / "checklists").glob("*.md"))]
    if checklists:
        groups.append({"id": "checklists", "title": "Checklists", "docs": checklists})

    adr_docs = []
    adr_readme = ROOT / "adr" / "README.md"
    if adr_readme.exists():
        adr_docs.append(doc(adr_readme, "adr"))
    for p in sorted((ROOT / "adr").glob("ADR-*.md")):
        adr_docs.append(doc(p, "adr"))
    if adr_docs:
        groups.append({"id": "adr", "title": "Decision Records", "docs": adr_docs})

    templates = [doc(p, "template") for p in sorted((ROOT / "templates").glob("*.md"))]
    if templates:
        groups.append({"id": "templates", "title": "Templates", "docs": templates})

    # Prompt library: README + each prompt's four files, grouped by category/prompt.
    pl = ROOT / "prompt-library"
    pl_docs = []
    pl_readme = pl / "README.md"
    if pl_readme.exists():
        pl_docs.append(doc(pl_readme, "prompt"))
    for prompt_readme in sorted(pl.glob("*/*/README.md")):
        pdir = prompt_readme.parent
        category = pdir.parent.name
        name = pdir.name
        label = f"{category}/{name}"
        for fname in ["prompt.md", "README.md", "examples.md", "CHANGELOG.md"]:
            fp = pdir / fname
            if fp.exists():
                d = doc(fp, "prompt")
                d["title"] = f"{label} — {fname[:-3]}"
                pl_docs.append(d)
    if pl_docs:
        groups.append({"id": "prompt-library", "title": "Prompt Library", "docs": pl_docs})

    return {"id": "reference", "title": "Reference", "groups": groups}


def main() -> None:
    sections = [
        curriculum_section(),
        case_studies_section(),
        projects_section(),
        reference_section(),
    ]
    counts = {
        "chapters": sum(1 for s in sections if s["id"] == "curriculum"
                        for g in s["groups"] for d in g["docs"] if d["kind"] == "chapter"),
        "caseStudies": sum(1 for s in sections if s["id"] == "case-studies"
                           for g in s["groups"] for d in g["docs"] if d["kind"] == "case-study"),
        "projects": sum(1 for s in sections if s["id"] == "projects"
                        for g in s["groups"] for d in g["docs"] if d["kind"] == "project"),
    }
    manifest = {
        "generated": datetime.datetime.now(datetime.timezone.utc).isoformat(timespec="seconds"),
        "title": "GSAC — AI Solution Architect Curriculum",
        "counts": counts,
        "sections": sections,
    }
    out = ROOT / "manifest.json"
    out.write_text(json.dumps(manifest, indent=2, ensure_ascii=False), encoding="utf-8")
    total = sum(len(g["docs"]) for s in sections for g in s["groups"])
    print(f"Wrote {out.name}: {total} documents "
          f"({counts['chapters']} chapters, {counts['caseStudies']} case studies, {counts['projects']} projects)")


if __name__ == "__main__":
    main()
