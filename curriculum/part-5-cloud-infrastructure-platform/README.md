# Part 5 — Cloud, Infrastructure & Platform Engineering

The ground GenAI systems stand on. Cloud-agnostic by design: concepts first, with AWS/Azure/GCP appearing as interchangeable examples.

**Maturity target:** Level 3 · **Estimated effort:** 5–6 weeks

## Chapters

| # | Chapter | Level | What you'll be able to do |
|---|---------|-------|---------------------------|
| 5.1 | [Cloud Architecture Fundamentals for AI Workloads](chapter-01-cloud-fundamentals-ai.md) | 2 | Reason about regions, zones, accounts/subscriptions, landing zones, and the shared-responsibility model |
| 5.2 | [Compute for AI: GPUs, Containers & Serverless](chapter-02-compute-for-ai.md) | 3 | Match workloads to compute: managed model APIs vs. self-hosted inference; GPU economics |
| 5.3 | [Model Serving & Inference Infrastructure](chapter-03-model-serving.md) | 3 | Design serving stacks: endpoints, autoscaling, quantization, batching, multi-model serving |
| 5.4 | [API & Integration Layer](chapter-04-api-integration-layer.md) | 3 | Design the gateway in front of models: authn/z, rate limiting, quotas, versioning, streaming over HTTP |
| 5.5 | [Data Architecture for GenAI](chapter-05-data-architecture.md) | 3 | Design the data estate feeding AI: lakes/warehouses, pipelines, quality, lineage |
| 5.6 | [Vector & Search Infrastructure](chapter-06-vector-search-infrastructure.md) | 3 | Select and size vector stores; index types (HNSW/IVF), filtering, tenancy, and operational limits |
| 5.7 | [LLMOps: CI/CD for AI Systems](chapter-07-llmops.md) | 3 | Build the delivery pipeline: versioned prompts/models/indexes, eval gates, staged rollout |
| 5.8 | [Scalability Patterns](chapter-08-scalability-patterns.md) | 3 | Scale to enterprise load: queues, backpressure, quota management, multi-region reads |
| 5.9 | [Reliability Engineering: SLOs, Failover & DR](chapter-09-reliability-engineering.md) | 3 | Set SLOs; design for provider outages; test degradation and recovery |
| 5.10 | [Infrastructure as Code & Platform Engineering](chapter-10-iac-platform-engineering.md) | 3 | Codify environments; design the internal platform teams self-serve from |
| 5.11 | [Multi-cloud, Hybrid & Sovereignty](chapter-11-multicloud-hybrid-sovereignty.md) | 4 | Decide when multi-cloud/hybrid is warranted (data residency, sovereignty, M&A) and what it costs |

## Exit criteria

- One project deployed via IaC with a staged pipeline and eval gate
- A written SLO + failover design for a model-provider outage

**Previous:** [Part 4](../part-4-enterprise-genai-systems/) · **Next:** [Part 6 — Enterprise Architecture](../part-6-enterprise-architecture/)
