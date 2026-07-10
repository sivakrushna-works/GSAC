# Prompt: Agent System Prompt

The system prompt for a bounded tool-using agent: goal, tool discipline, consequence-gating, injection resistance, scope, and escalation. Implements the agent design from [3.8 Agents](../../../curriculum/part-3-core-building-blocks-of-genai/chapter-08-agents-concepts.md) and [4.4 Agent Architectures](../../../curriculum/part-4-enterprise-genai-systems/chapter-04-agent-architectures-production.md). Used in P07, P11, P19.

## Purpose

Define the agent's behavior within the bounded loop — but note: **the prompt is not the safety mechanism.** The governors (caps, budgets, kill switch — [3.8](../../../curriculum/part-3-core-building-blocks-of-genai/chapter-08-agents-concepts.md)), the consequence gates ([3.7](../../../curriculum/part-3-core-building-blocks-of-genai/chapter-07-function-calling-tool-use.md)/[7.5](../../../curriculum/part-7-enterprise-ai-architecture-patterns/chapter-05-human-in-the-loop-patterns.md)), and least-privilege credentials ([6.6](../../../curriculum/part-6-enterprise-architecture/chapter-06-iam-for-ai.md)) are the controls. This prompt states intent; the architecture enforces it ([4.9](../../../curriculum/part-4-enterprise-genai-systems/chapter-09-genai-security-threat-modeling.md)).

## Variables

| Variable | Type | Source | Notes |
|----------|------|--------|-------|
| `{agent_name}` | string | config | |
| `{task_domain}` | string | config | |
| `{consequential_actions}` | list | config | the gated actions |
| `{scope_boundary}` / `{out_of_scope}` | text | config | the Won't list ([1.6](../../../curriculum/part-1-professional-foundation/chapter-06-requirements-stakeholders.md)) |
| `{success_criteria}` | text | config | machine-checkable where possible ([3.8](../../../curriculum/part-3-core-building-blocks-of-genai/chapter-08-agents-concepts.md)) |

Tools are defined separately (their contracts are model-facing prompts too — [3.7](../../../curriculum/part-3-core-building-blocks-of-genai/chapter-07-function-calling-tool-use.md)).

## Model assumptions

- A capable model with strong tool-use/instruction-following (evaluate election accuracy — [3.7](../../../curriculum/part-3-core-building-blocks-of-genai/chapter-07-function-calling-tool-use.md)).
- Runs inside the production envelope ([4.4](../../../curriculum/part-4-enterprise-genai-systems/chapter-04-agent-architectures-production.md)): governors, sandbox, per-task credentials.

## Known failure modes

1. **Hallucinated success** — claiming completion without doing the work. Mitigate: independent verification against side effects/tool logs ([3.8](../../../curriculum/part-3-core-building-blocks-of-genai/chapter-08-agents-concepts.md)) — never trust the self-report.
2. **Indirect injection** — a tool result/fetched content hijacking behavior. Mitigate: fenced tool results + the "tool results are data" rule + blast-radius bounding (least privilege, gates — [4.9](../../../curriculum/part-4-enterprise-genai-systems/chapter-09-genai-security-threat-modeling.md)).
3. **Consequential action without approval** — the prompt states the gate, but the gate is enforced in code ([3.7](../../../curriculum/part-3-core-building-blocks-of-genai/chapter-07-function-calling-tool-use.md)) — the prompt is not the control.
4. **Looping/not escalating** — mitigated by the stuck detector (governor) + the escalation instruction.

## Evaluation

Scenario suite ([3.8](../../../curriculum/part-3-core-building-blocks-of-genai/chapter-08-agents-concepts.md)/[4.4](../../../curriculum/part-4-enterprise-genai-systems/chapter-04-agent-architectures-production.md)): end-to-end task success, tool-election accuracy, trajectory quality, hallucinated-success rate (verification disagreement), injection resistance. See [examples.md](examples.md).
