# Agent Design Checklist

Apply to any system where an LLM directs control flow (chooses tools, iterates, plans).

## Justification
- [ ] A fixed workflow was tried or considered first; why an agent is needed is written down
- [ ] Task success is verifiable (the agent — or the system — can check its own work)
- [ ] The cost of agent errors is understood and bounded

## Tools
- [ ] Each tool has one clear purpose, a described contract, and typed inputs/outputs
- [ ] Tool descriptions are written for the model (tested: does the model pick the right tool?)
- [ ] Destructive/consequential tools separated from read-only tools
- [ ] Consequential actions require confirmation or human approval (explicit policy per tool)
- [ ] Tool errors return actionable messages the model can recover from

## Control & safety
- [ ] Iteration limit and token/cost budget per task enforced
- [ ] Timeout per tool call and per task
- [ ] Agent permissions follow least privilege (scoped credentials, not god-tokens)
- [ ] Untrusted content (retrieved docs, web pages, tool output) is treated as data, not instructions; injection surfaces enumerated
- [ ] Kill switch exists: a human can stop a running agent

## State & memory
- [ ] Conversation/task state storage defined (what persists, for how long, who can read it)
- [ ] Long tasks have compaction/checkpoint strategy for context limits
- [ ] Multi-agent only if justified: coordination pattern named (orchestrator–workers, handoff), shared-state contract defined

## Evaluation
- [ ] End-to-end task success rate measured on a versioned scenario suite
- [ ] Trajectory quality reviewed, not just final answers (tool choice, loops, dead ends)
- [ ] Regression suite runs on prompt, tool, or model changes

## Operations
- [ ] Full trace per task: every model call, tool call, and decision, linkable from a task ID
- [ ] Cost per task tracked with alerting on runaway tasks
- [ ] Failure taxonomy defined (wrong tool, bad params, hallucinated success, gave up) and monitored
- [ ] Human escalation path designed as a feature, not an afterthought
