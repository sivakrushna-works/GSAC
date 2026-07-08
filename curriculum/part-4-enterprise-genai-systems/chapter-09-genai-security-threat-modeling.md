# Chapter 4.9 — GenAI Security & Threat Modeling

| | |
|---|---|
| **Part** | 4 — Enterprise GenAI Systems |
| **Maturity level** | 3 — Engineer |
| **Difficulty** | Advanced |
| **Estimated study time** | 4 hours (reading 2 h, exercise 2 h) |
| **Prerequisites** | [3.7](../part-3-core-building-blocks-of-genai/chapter-07-function-calling-tool-use.md); [4.1](chapter-01-production-rag.md); [4.8](chapter-08-guardrails-content-safety.md) |

## Learning Objectives

After this chapter you will be able to:

1. Threat-model an LLM system: enumerate the untrusted-input surfaces, trace what each can reach, and produce the threat table a security review signs.
2. Explain why prompt injection is structurally unsolved — and design systems that are safe *despite* it, through blast-radius architecture rather than detection hope.
3. Apply the defense hierarchy: architectural controls (privilege, isolation, gating) above detection controls (filters, classifiers) above behavioral controls (prompts).
4. Run GenAI security as a program: adversarial testing, injection-aware incident response, and the security review artifacts that make approval fast.

## Introduction

This chapter is where the curriculum's most repeated warning — *untrusted content is data, not instructions* (3.3's fencing, 3.7's tool results, 4.8's screens) — gets its full adversarial treatment. The defining fact of LLM security, stated plainly: **the model cannot reliably distinguish instructions from data**, because to the mechanism (2.4) both are just text that conditions what comes next. Delimiters, labels, and trained instruction-hierarchies *raise the bar*; none of them close the gap, and every "prompt injection solved" claim to date has fallen to the next creative phrasing. Security architecture for LLM systems therefore starts from an uncomfortable assumption classical AppSec never had to make: **your parser can be socially engineered.**

The consequence is a design philosophy, not despair: if the component that reads untrusted content can be subverted by that content, then *what that component can reach* is the security property that matters — blast radius over detection, privilege architecture over filter confidence. This chapter builds that philosophy into threat models, controls, and the program around them.

## Business Motivation

GenAI security incidents combine classical breach costs with novel legal surfaces. The classical: an injection that exfiltrates retrieved documents through a compromised assistant is a data breach with notification duties (4.1's ACL work protects *authorization*; injection attacks the *authorized channel* — the assistant that may read the document and can be tricked into republishing it). The novel: systems that *act* (3.7, 4.4) convert content attacks into transaction fraud — the email that tricks the procurement agent into approving an invoice, the ticket that walks the helpdesk agent toward a password reset (Vantora's caught attempt, 3.7, was the cheap version