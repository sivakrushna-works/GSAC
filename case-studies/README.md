# Case Studies — 50 Enterprise Architecture Deep Dives

Fifty case studies across twelve industries. Every case study uses the [case-study template](../templates/case-study-template.md): business problem, stakeholders, requirements, architecture, sequence diagram, deployment diagram, threat model, cost estimation, scaling strategy, monitoring strategy, lessons learned.

Companies are fictional but constraints are real. Study cadence: **one per week** from Phase 2 onward; write your own solution *before* reading the given one.

Each case study lives in its own file (`cs01-clinical-documentation-assistant.md`, …).

## Healthcare

| # | Case study | System type | Key themes |
|---|-----------|-------------|------------|
| CS01 | Clinical Documentation Assistant | Ambient scribe + summarization | PHI handling, clinician review, liability |
| CS02 | Patient Portal Triage Chatbot | Guarded RAG assistant | Safety-critical refusal, escalation to nurses |
| CS03 | Prior-Authorization Automation | Document workflow + extraction | Payer rules, audit trail, human sign-off |
| CS04 | Radiology Report Drafting | Multimodal + templated generation | FDA-adjacent boundaries, quality gates |
| CS05 | Hospital Knowledge Hub for Protocols | ACL-aware RAG | Freshness (protocol updates), on-call latency |

## Banking

| # | Case study | System type | Key themes |
|---|-----------|-------------|------------|
| CS06 | Relationship Manager Copilot | RAG + CRM tools | Suitability rules, auditability, model risk management |
| CS07 | AML Investigation Assistant | Agentic case research | Explainability, regulator evidence, false-negative cost |
| CS08 | Credit Memo Drafting | Document pipeline | Data lineage, four-eyes review, model governance |
| CS09 | Retail Bank Support Assistant | Customer-facing bot | Fraud surface, authentication, multilingual |
| CS10 | Trading Floor Research Summarizer | Low-latency summarization | Information barriers, licensing of data, latency |

## Retail

| # | Case study | System type | Key themes |
|---|-----------|-------------|------------|
| CS11 | Product Catalog Enrichment | Batch generation at scale | Cost engineering, quality sampling, brand voice |
| CS12 | Conversational Shopping Assistant | RAG + recommendation tools | Personalization vs. privacy, conversion metrics |
| CS13 | Store Operations Copilot | Mobile RAG for associates | Offline/edge constraints, seasonal load |
| CS14 | Returns & Complaints Automation | Workflow + guardrails | Fraud abuse, refund authority limits |

## Manufacturing

| # | Case study | System type | Key themes |
|---|-----------|-------------|------------|
| CS15 | Maintenance Manual Assistant | Multimodal RAG | Safety-critical accuracy, shop-floor UX, OT/IT boundary |
| CS16 | Supplier Document Intelligence | Extraction pipeline | Multi-language, EDI/legacy integration |
| CS17 | Quality Incident Analysis | Agentic root-cause research | Data silos, traceability standards |
| CS18 | Sales Engineering Quote Copilot | RAG + configurators | Correctness on specs, margin protection |

## Education

| # | Case study | System type | Key themes |
|---|-----------|-------------|------------|
| CS19 | University Student Advisor | RAG assistant | FERPA-class privacy, equity of access, hallucinated policy risk |
| CS20 | Adaptive Tutoring System | Multi-step pedagogical agent | Age-appropriate safety, learning-outcome evals |
| CS21 | Curriculum Content Pipeline | Authoring assistance at scale | Academic integrity, reviewer workflow |
| CS22 | Admissions Document Processing | Extraction + workflow | Bias/fairness review, appeal auditability |

## Legal

| # | Case study | System type | Key themes |
|---|-----------|-------------|------------|
| CS23 | Contract Review Platform | Extraction + playbook comparison | Privilege, confidentiality walls, precision-first evals |
| CS24 | eDiscovery Triage | Classification at scale | Defensibility, sampling statistics, cost at TB scale |
| CS25 | Legal Research Assistant | RAG with citation verification | Hallucinated-citation risk, shepardizing-style checks |
| CS26 | Regulatory Change Monitoring | Watch + summarize + route | Freshness pipelines, jurisdiction fan-out |

## Insurance

| # | Case study | System type | Key themes |
|---|-----------|-------------|------------|
| CS27 | Claims Intake & Summarization | Multimodal intake pipeline | Fraud signals, adjuster workflow, photo/document mix |
| CS28 | Underwriting Copilot | RAG + risk tools | Actuarial guardrails, regulatory filings, explainability |
| CS29 | Policy Q&A for Agents | Multi-tenant RAG | Product-version correctness, agent licensing rules |
| CS30 | Subrogation Opportunity Detection | Classification + case building | Recovery economics, legal handoff |

## Telecommunications

| # | Case study | System type | Key themes |
|---|-----------|-------------|------------|
| CS31 | Network Operations Copilot | RAG + runbook agent | Change-control safety, incident latency, on-prem constraints |
| CS32 | Customer Care Deflection | Voice + chat assistant | Very high volume economics, churn-sensitive UX |
| CS33 | Field Technician Assistant | Mobile multimodal RAG | Connectivity gaps, equipment recognition |
| CS34 | B2B Proposal Automation | Document generation | CPQ integration, margin and SLA correctness |

## Government

| # | Case study | System type | Key themes |
|---|-----------|-------------|------------|
| CS35 | Citizen Services Portal Assistant | Multilingual public RAG | Accessibility, sovereignty, political-risk of errors |
| CS36 | Caseworker Decision Support | RAG + structured criteria | Due process, appealable decisions, bias auditing |
| CS37 | Public Records Request Processing | Redaction + workflow | FOIA-class rules, PII redaction at scale |
| CS38 | Policy Analysis Assistant | Long-document research | Citation integrity, classification levels |

## Software Engineering

| # | Case study | System type | Key themes |
|---|-----------|-------------|------------|
| CS39 | Internal Developer Copilot Platform | Multi-tenant GenAI platform | IP protection, license compliance, metering |
| CS40 | Legacy Code Modernization Factory | Agentic transformation pipeline | Verification via tests, batch economics |
| CS41 | Incident Postmortem Assistant | RAG over telemetry + docs | Blameless culture, PII in logs |
| CS42 | API Documentation Automation | Generation + drift detection | Source-of-truth discipline, CI integration |

## HR

| # | Case study | System type | Key themes |
|---|-----------|-------------|------------|
| CS43 | Employee Policy Assistant | ACL-aware RAG | Works-council/union constraints, jurisdiction variants |
| CS44 | Recruiting Screening Support | Structured extraction + ranking assistance | Anti-discrimination law, human decision requirement |
| CS45 | Learning & Development Recommender | Skills-graph + generation | Skills taxonomy, privacy of performance data |
| CS46 | HR Case Management Copilot | Summarization + drafting | Extreme confidentiality, retention rules |

## Finance (Corporate)

| # | Case study | System type | Key themes |
|---|-----------|-------------|------------|
| CS47 | Financial Close Acceleration | Document + reconciliation agents | SOX-class controls, numeric accuracy |
| CS48 | FP&A Narrative Reporting | Data-grounded generation | Figure faithfulness, forecast disclaimers |
| CS49 | Procurement Contract Intelligence | Extraction + obligations tracking | Renewal risk, savings quantification |
| CS50 | Audit Evidence Assistant | RAG + sampling workflows | Independence rules, evidence chain-of-custody |

## How to work a case study

1. Read only *Business Problem*, *Stakeholders*, and *Requirements*.
2. Design your own solution on paper: architecture, sequence, threat model, cost.
3. Compare against the given solution; write down every difference and decide which side you'd defend.
4. Log takeaways in your [progress tracker](../PROGRESS.md); link the [patterns](../curriculum/part-7-enterprise-ai-architecture-patterns/) involved.
