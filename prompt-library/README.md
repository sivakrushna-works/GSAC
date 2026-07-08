# Prompt Library

Curated, versioned prompts used across GSAC projects and case studies. Prompts are engineering artifacts: they are versioned, tested (see [evaluation checklist](../checklists/evaluation-checklist.md)), and documented like code.

## Structure

Each prompt is a directory:

```
prompt-library/
  <category>/<prompt-name>/
    prompt.md        # the prompt itself, with template variables in {curly_braces}
    README.md        # purpose, variables, model assumptions, known failure modes
    examples.md      # 2+ input/output examples, including one edge case
    CHANGELOG.md     # dated changes with the eval evidence that justified them
```

## Categories

| Category | Contents |
|----------|----------|
| `rag/` | Grounded answering, citation formatting, no-context refusal, query rewriting |
| `extraction/` | Structured extraction to JSON schemas, table extraction, classification |
| `summarization/` | Meeting minutes, document digests, executive briefs, map-reduce summarization |
| `agents/` | Agent system prompts, tool-selection guidance, reflection/self-check prompts |
| `evaluation/` | LLM-as-judge rubrics: faithfulness, relevance, tone, safety |
| `safety/` | Input screening, output policy checks, PII detection assist |
| `writing/` | Report generation, tone transformation, style guides |

## Rules

1. **No prompt without a README** — an undocumented prompt is a liability, not an asset.
2. **No change without eval evidence** — record the before/after in the CHANGELOG.
3. **Provider-neutral by default** — note model-specific behavior in the README when unavoidable.
4. **Variables are typed** — the README states each variable's type, source, and whether it can contain untrusted content (if so, the prompt must delimit it as data — see [security checklist](../checklists/security-checklist.md)).
