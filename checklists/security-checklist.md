# GenAI Security Checklist

Apply to every GenAI system before production. Aligned with OWASP Top 10 for LLM Applications; use alongside your organization's standard AppSec review.

## Threat model
- [ ] Threat model documented: assets, actors, trust boundaries, attack trees for top risks
- [ ] All untrusted input paths to the model enumerated: user input, uploaded files, retrieved documents, tool results, third-party APIs

## Prompt injection & output handling
- [ ] Untrusted content is delimited/labeled and never concatenated as instructions
- [ ] Privileged instructions (system prompt) tested against extraction and override attempts
- [ ] Model output is treated as untrusted: encoded before rendering (XSS), parameterized before queries, validated before execution
- [ ] Tool invocation from model output is allowlisted and schema-validated

## Data protection
- [ ] Data classification done: what PII/PHI/secrets can enter prompts, logs, and traces
- [ ] PII redaction/pseudonymization applied where required, before the model and before logs
- [ ] Retention policy for prompts, completions, and traces defined and enforced
- [ ] Provider data-use terms reviewed (training on your data? retention? region?)
- [ ] Data residency requirements mapped to actual processing locations

## Access control
- [ ] User identity propagates to retrieval (RAG respects document ACLs)
- [ ] Agent/tool credentials are scoped, short-lived, least-privilege
- [ ] Secrets are in a secret manager, never in prompts or code
- [ ] Rate limiting and quota per user/tenant

## Abuse & safety
- [ ] Input and output content filtering appropriate to the audience and domain
- [ ] Jailbreak attempts monitored; repeated abuse triggers response (throttle, block, review)
- [ ] Fraud/misuse scenarios specific to the domain reviewed with the business owner

## Supply chain
- [ ] Models, datasets, and libraries come from verified sources with pinned versions
- [ ] Third-party MCP servers / plugins / tools reviewed before granting access

## Verification
- [ ] Adversarial testing performed (injection suite, red-team scenarios) with results recorded
- [ ] Security review sign-off obtained; residual risks accepted by a named owner
- [ ] Incident response runbook covers AI-specific incidents (mass hallucination, injection breach, data leak via completions)
