# Deployment Checklist

Apply before each production release of a GenAI system.

## Versioning & reproducibility
- [ ] Prompt versions pinned and stored in version control
- [ ] Model version/ID pinned; provider auto-upgrades handled deliberately
- [ ] Index/embedding versions recorded; embeddings and index rebuilt together
- [ ] One artifact (or manifest) captures prompt + model + parameters + index versions per release

## Pre-release gates
- [ ] Eval suite passed with thresholds; results attached to the release
- [ ] Load test at expected peak with realistic token distributions
- [ ] Security checklist re-verified for changes in this release
- [ ] Cost projection updated for this release's changes

## Rollout
- [ ] Staged rollout (shadow → canary → percentage) with quality metrics per stage
- [ ] Rollback is one action and restores prompt/model/index atomically
- [ ] Feature flags separate deployment from release
- [ ] Provider quota/limits confirmed for target traffic (TPM/RPM, concurrency)

## Resilience
- [ ] Timeouts, retries with backoff, and circuit breakers on all model/provider calls
- [ ] Fallback behavior defined: alternate model, cached answer, or honest degraded UX
- [ ] Provider outage tested (kill the dependency in staging and observe)

## Day-one operations
- [ ] Dashboards live before traffic: latency (p50/p95/p99), error rate, token usage, cost, quality signals
- [ ] Alerts configured with owners and thresholds; paged path tested
- [ ] Runbook covers top 5 expected incidents
- [ ] Support/escalation path communicated to stakeholders

## Post-release
- [ ] Online quality monitored against offline eval predictions for drift
- [ ] User feedback channel wired into the eval dataset pipeline
- [ ] Post-release review scheduled (cost vs. estimate, quality vs. gates)
