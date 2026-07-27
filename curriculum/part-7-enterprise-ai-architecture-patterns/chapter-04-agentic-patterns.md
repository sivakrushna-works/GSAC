# Chapter 7.4 — Agentic Patterns

| | |
|---|---|
| **Part** | 7 — Enterprise AI Architecture Patterns |
| **Maturity level** | 4 — Architect |
| **Difficulty** | Advanced |
| **Estimated study time** | 2 hours 15 min (reading 45 min, exercise 90 min) |
| **Prerequisites** | [3.8 Agents](../part-3-core-building-blocks-of-genai/chapter-08-agents-concepts.md); [4.4](../part-4-enterprise-genai-systems/chapter-04-agent-architectures-production.md); [4.5](../part-4-enterprise-genai-systems/chapter-05-multi-agent-systems.md) |

## Learning Objectives

After this chapter you will be able to:

1. Apply the agentic pattern family in pattern-language form across its four groups: control (bounded agent loop, planner-executor, reflection), containment (tool sandbox, sandboxed code execution), durability (checkpoint-and-resume), and context & memory (trajectory compaction, sub-agent context isolation, just-in-time context retrieval, durable agent memory).
2. Decide whether a task belongs to this family at all, and bound the ones that do with governors built as tested components rather than configuration values.
3. Design an agent's context and memory deliberately — what is held, written, retrieved, and expired — and defend the design against memory poisoning.
4. Specify an execution envelope for agent-generated code: isolation, egress, filesystem scope, timeout, and resource ceilings.

## Introduction

An [agent](../../GLOSSARY.md) is a system where the model owns control flow; a [workflow](../../GLOSSARY.md) is one where your code does. This chapter is the reference for the first case — the minority of tasks whose path cannot be written down in advance, after the workflow patterns of [7.3](chapter-03-workflow-patterns.md) have taken the majority that can.

Two things have changed since the family was first catalogued, and both are here. **The binding constraint on a production agent is context, not tool access**: a long loop accumulates a trajectory that outgrows any [context window](../../GLOSSARY.md), and the patterns managing that accumulation decide whether hour six is as sharp as hour one. **The dominant agent capability is now writing and running code**, which makes the execution sandbox the primary trust boundary of the whole system rather than a containment detail.

The catalog is organized by what each group controls: who decides the next step, what the agent may touch, whether the task survives a restart, and what the model sees and remembers.

## Business Motivation

Agentic patterns automate work whose steps are chosen at runtime — exception investigation, migration, cross-system triage. That upside is real: a task no workflow could encode, automated at all, has no baseline to beat.

The costs are equally specific, and each pattern caps one. **Spend becomes a distribution**: an agent is N model calls where a workflow is three, and the tail is what reaches the invoice. **Error compounds per iteration**: 97% per step is 74% over ten, which is why verification is structural rather than optional. **Context is the second cost curve**: each iteration re-sends the trajectory, so an uncompacted long run pays super-linearly in tokens for linear progress — the context patterns are cost patterns as much as quality patterns. **Blast radius is now executable**: an agent that writes code, reaches the network, and keeps durable memory is one where a single poisoned document can plant an instruction that outlives the session that read it.

Variance, compounding error, context growth, executable blast radius — a review that cannot say which pattern caps which has not reviewed an agent.

## Theory — The Agentic Pattern Catalog

### Control patterns — who decides the next step

#### Pattern: Bounded Agent Loop

- **Context** — a task whose next step depends on what the last one returned: an exception of unknown cause, a defect of undiscovered location, an investigation across systems nobody enumerated in advance.
- **Problem** — fixed control flow cannot express "it depends," while free-running control flow has no stopping point, no sense of its own failure, and no bound on spend.
- **Forces** — flexibility against bounded cost; the model's opinion that it is finished against a machine-checkable definition of finished; enough iterations to recover from a bad tool result against few enough to stop a confused agent. The cap that stops a runaway also truncates a legitimate long task — so the boundary must be a *typed exit*, never a silent stop.
- **Solution** — state the goal with success criteria checkable against side effects and uncertainty representable in the result schema; give tools, not steps; install four governors as tested components (iteration cap, cost budget, stuck detector, kill switch); terminate into typed exits — success, stuck, budget-exhausted-with-partial-result, escalated — that callers handle like any API contract.
- **Structure** — goal + success schema → [elect tool → execute → observe]* under governors → typed exit → independent verifier compares asserted work against the tool log.
- **Consequences** — the undiscoverable-path task becomes automatable, at three named costs: failures arrive as *trajectories*, so replay tooling precedes prompt tuning; the governors are code with their own bugs, the silent two being a stuck detector that never fires and a kill switch nobody rehearsed; and self-reported success is not evidence, which makes the verifier the highest-leverage component. A task whose success cannot be checked cheaply does not belong in a loop.
- **Known uses** — ReAct (Yao et al., arXiv 2210.03629) established the interleaved reason–act–observe shape. Anthropic's public *Building Effective Agents* draws the agent/workflow line on exactly who owns control flow, and recommends loops only where the flexibility is needed. Coding agents (Claude Code, GitHub Copilot's agent mode, the SWE-agent/SWE-bench line) run edit → test → observe against a machine-checkable criterion — which is why software work has been the loop's best-fit domain. Curriculum instance (fictional): Corvid's customs-exception agent ([4.4](../part-4-enterprise-genai-systems/chapter-04-agent-architectures-production.md)).
- **Related** — Tool Sandbox and Sandboxed Code Execution (what it may touch); Checkpoint-and-Resume; Trajectory Compaction; the workflow patterns ([7.3](chapter-03-workflow-patterns.md)) you should try first.

#### Pattern: Planner-Executor

- **Context** — a task large enough that its shape is worth committing to before work starts: a multi-file refactor, a migration, an analysis containing expensive irreversible steps.
- **Problem** — a loop that decides one step at a time cannot be reviewed before it acts, and re-derives its strategy every iteration, drifting as the trajectory grows.
- **Forces** — an inspectable, approvable plan against that plan's rigidity when reality contradicts it; planning cost against execution cost. A plan is also the cheapest human checkpoint, so plan quality is partly an interface question.
- **Solution** — separate a planning phase emitting an explicit step list with its assumptions from an executor that runs steps and may request re-planning on contradiction; bound the re-planning, because a plan revised five times is a loop wearing a costume. Where the decomposition is known, generate it in code and let the model plan only the novel part.
- **Structure** — goal → planner → plan artifact (steps, assumptions, checks) → optional approval → executor per step → contradiction → bounded re-plan → typed exit.
- **Consequences** — the plan becomes an audit and approval surface, often the whole reason to adopt the pattern; it costs a planning round-trip per task and fails distinctively — a confidently wrong plan executed faithfully is worse than a loop that would have noticed at step two.
- **Known uses** — the orchestrator-workers workflow in Anthropic's *Building Effective Agents* is this separation with the plan as the fan-out; plan-then-execute prompting appears in the research line (Plan-and-Solve, Wang et al., arXiv 2305.04091); coding agents ship it as a product feature — a plan-first mode presenting the intended change set for approval before any file is edited. Curriculum instance (fictional): the modernization planning lane in [CS40](../../case-studies/cs40-legacy-code-modernization-factory.md).
- **Related** — Orchestrator-Workers ([7.3](chapter-03-workflow-patterns.md)); Sub-Agent Context Isolation (how plan steps are farmed out); Approval Gate ([7.5](chapter-05-human-in-the-loop-patterns.md)), which usually attaches to the plan artifact.

#### Pattern: Reflection

- **Context** — output with room to improve on a second pass, where some critique signal is available: drafts, generated code, analyses with checkable claims.
- **Problem** — first-pass output is often nearly right, and the model that produced it is the least reliable judge of it.
- **Forces** — quality gain against doubled cost and latency; the convenience of self-critique against its bias toward agreement — agent-scale [hallucination](../../GLOSSARY.md) is usually hallucinated *success*.
- **Solution** — critique against the strongest available signal, ranked: an executable check (tests, schema validator, compiler, recomputation) first; an independent model with a rubric second; the same model's self-critique last and only for surface qualities. Bound revision rounds — two is usually the ceiling before drift — and log what each round changed so its value is measurable.
- **Structure** — produce → critique (executable ∨ independent judge ∨ self) → revise → re-check → stop on pass or round limit; per-round deltas recorded.
- **Consequences** — real gains where the check is executable, thin ones where it is not, at a minimum doubling of tokens and latency. Unmeasured reflection is a favourite hiding place for spend, and self-grading manufactures a false audit trail: a logged critique that always approves is worse than none, because reviewers read it as evidence.
- **Known uses** — Reflexion (Shinn et al., arXiv 2303.11366) formalized verbal self-reflection carried across attempts; Self-Refine (Madaan et al., arXiv 2303.17651) is the iterative self-feedback form; the evaluator-optimizer workflow in *Building Effective Agents* is the two-role version. The strongest real instance is the least glamorous — coding agents whose critic is the test suite, where the signal is external and binary.
- **Related** — Evaluator-Optimizer ([7.3](chapter-03-workflow-patterns.md)); [LLM-as-judge](../../GLOSSARY.md) as independent critic ([4.7](../part-4-enterprise-genai-systems/chapter-07-evaluation-systems.md)); the loop's independent verifier, which checks facts rather than taste.

### Containment patterns — what the agent may touch

#### Pattern: Tool Sandbox

- **Context** — an agent holding tools that read sensitive data or act on the world, while also reading content it did not author.
- **Problem** — the tool set is both the capability set and the blast radius, and observations are attacker-reachable: text from a document, page, or ticket arrives in the same channel as instructions ([prompt injection](../../GLOSSARY.md)).
- **Forces** — capability against containment (every tool removed makes the agent safer and dumber); per-task credentials against operational friction; static allowlists against the agent's need to reach what nobody predicted. Decisively: injection cannot be fixed at the prompt layer, so it must be absorbed at the permission layer.
- **Solution** — issue credentials scoped to the task and the invoking user rather than a service account holding the union of everyone's rights; default-deny egress behind a named allowlist; separate tools by consequence class with irreversible ones gated ([3.7](../part-3-core-building-blocks-of-genai/chapter-07-function-calling-tool-use.md)); fence observations so retrieved text arrives as provenance-stamped data, never as instruction; and never let one agent simultaneously hold private data, untrusted input, and an outbound channel.
- **Structure** — agent → tool broker (identity, scope, rate, consequence class) → sandboxed runtime (allowlisted egress, ephemeral credentials) → tools; observations returned fenced; consequential calls routed to a gate.
- **Consequences** — bounds what a hijacked trajectory can do and makes the capability set a reviewable artifact; it costs credential plumbing, an allowlist someone must maintain, and a steady trickle of legitimate blocked actions — so it needs an escalation path, or people route around it. It reduces blast radius; it does not make injection impossible, and treating it as a solution rather than a bound is a specification error.
- **Known uses** — least-privilege tool exposure is the standing recommendation of the OWASP Top 10 for LLM Applications, whose *excessive agency* and *prompt injection* entries describe this pattern's absence; the widely cited "lethal trifecta" framing (private data + untrusted content + an outbound channel in one agent) states the design rule as a prohibition; hosted agent runtimes and tool-protocol servers conventionally run tools in per-session containers with scoped tokens. Curriculum instance (fictional): Corvid's quarantine-and-gate arrangement ([4.4](../part-4-enterprise-genai-systems/chapter-04-agent-architectures-production.md)).
- **Related** — Sandboxed Code Execution (the case where the tool is a runtime); the safety family ([7.6](chapter-06-safety-guardrail-patterns.md)); Approval Gate ([7.5](chapter-05-human-in-the-loop-patterns.md)).

#### Pattern: Sandboxed Code Execution

- **Context** — an agent that writes code and runs it: analysis over a supplied file, a recomputation, a script driving an API, a repository change validated by its own tests.
- **Problem** — generated code is untrusted code by construction, often generated in response to untrusted input, so the runtime — not the tool allowlist — is the real boundary; an allowlist constrains calls, but a program does whatever the runtime permits.
- **Forces** — the capability of arbitrary computation against an unbounded action space; strong isolation's startup cost against a shared interpreter's weakness; the code's need for the network (dependencies, APIs) against the fact that the network is the exfiltration path.
- **Solution** — execute in a disposable runtime under a written envelope, every element a named decision: **isolation** (container or microVM per task, destroyed after — never a shared long-lived interpreter across tenants), **egress** (default-deny with a named allowlist), **filesystem** (scratch directory plus explicitly mounted inputs, read-only where possible, nothing persisted by default), **time and resources** (wall-clock timeout, CPU/memory ceilings, process and descriptor caps), and **identity** (no ambient cloud credentials inside — authenticated calls go back through the tool broker). Artifacts leave only by a declared path.
- **Structure** — agent emits code → fresh runtime provisioned (pinned image, egress policy, inputs mounted) → execute under ceilings → capture stdout/stderr/artifacts → destroy runtime → results returned fenced as observations.
- **Consequences** — the family's largest capability unlock, because the model gains a checker (run it and see) instead of guessing; the costs are provisioning latency, an image and dependency supply chain someone owns, and a standing temptation to relax egress "just for package installs" — the exact relaxation that reopens exfiltration. Timeout calibration is the common operational failure: too short kills legitimate computation, too long lets a runaway bill a full budget before a ceiling notices.
- **Known uses** — hosted code-execution tools run model-written Python in a network-isolated container with session-scoped uploaded files and a hard timeout (OpenAI's Code Interpreter / data-analysis tool and the code-execution tools now offered in major model APIs both work this way); SWE-agent and SWE-bench evaluate repository agents in a fresh container per task, which is what makes results reproducible; local coding agents run shell commands under per-command permission prompts with a workspace-scoped filesystem; microVM and syscall-filtering runtimes (Firecracker, gVisor) are the usual isolation substrate.
- **Related** — Tool Sandbox (the general case); Bounded Agent Loop (the ceilings are governors); the threat model of [4.9](../part-4-enterprise-genai-systems/chapter-09-genai-security-threat-modeling.md); Sub-Agent Context Isolation (execution output is voluminous and belongs in a worker's context).

#### Pattern: Checkpoint-and-Resume

- **Context** — tasks measured in hours, or tasks that pause mid-flight for a human decision.
- **Problem** — a crash, a deploy, a rate limit, or an approval arriving next morning destroys an in-memory trajectory, and restarting repeats side effects as well as tokens.
- **Forces** — durability against the work of making agent state serializable; checkpoint frequency against write cost; resuming "exactly where it was" against the fact that the world moved while the agent was paused.
- **Solution** — hold task state in an explicit serializable structure — goal, findings ledger, completed steps with side-effect receipts, open questions — not only in message history; checkpoint after every consequential action; make resumption idempotent by recording side effects with identifiers so a replay recognizes its own work; re-validate stale assumptions on resume rather than trusting them.
- **Structure** — loop → after each consequential step persist {state, receipts, cursor} → crash or pause → resume from cursor with re-validation → typed exit; the same store backs the approval pause.
- **Consequences** — long tasks become operable and overnight approvals become affordable, since nobody holds a process open for eight hours. The costs are a state schema versioned like any persisted contract (in-flight tasks must survive the deploy that changed it) and idempotent side effects — the discipline whose absence produces double-filed, double-charged, double-emailed work.
- **Known uses** — durable execution engines used for agent orchestration persist state and replay deterministically after failure; agent frameworks ship checkpointing with human-in-the-loop interrupts as a first-class feature (LangGraph's persistence and interrupt mechanism is the common example); coding agents resume prior sessions from stored transcripts and state. Curriculum instance (fictional): the durable orchestration in [P19](../../projects/p19-agent-orchestration-platform/README.md).
- **Related** — durable workflow patterns ([4.6](../part-4-enterprise-genai-systems/chapter-06-orchestration-workflows.md)); Approval Gate ([7.5](chapter-05-human-in-the-loop-patterns.md)); Durable Agent Memory (state is *this* task; memory is *across* tasks).

### Context & memory patterns — what the model sees and remembers

#### Pattern: Trajectory Compaction

- **Context** — any loop long enough that its history approaches the context window: multi-hour investigations, repository-wide changes, day-long sessions.
- **Problem** — every iteration re-sends the whole trajectory, so tokens grow far faster than progress, and past a point the signal is diluted by tool output nobody will read again.
- **Forces** — fidelity against room to keep working; compression is lossy precisely where it is most needed, and what it drops (an account number, a path, a clause reference) is often what the task depends on; compaction itself costs a model call at the worst moment.
- **Solution** — extract structured facts *before* summarizing over them: keep a pinned, append-only ledger of load-bearing specifics (identifiers, decisions, verified claims, receipts) that is never summarized, and compact only the conversational and tool-output residue around it. Trigger on a token threshold rather than a turn count, keep recent turns verbatim, and persist the pre-compaction trajectory so it stays auditable after the model stops seeing it.
- **Structure** — trajectory → threshold breach → [pinned ledger verbatim] + [older span summarized] + [recent turns verbatim] → new working context; full trajectory retained in storage.
- **Consequences** — converts a hard ceiling into an ongoing cost, which is what makes long-horizon agents viable; the failure is specific and expensive — a compaction that drops a needed detail produces an agent that repeats work or contradicts itself, and the evidence is no longer in context. Compaction output deserves evaluation like any other model output.
- **Known uses** — coding agents auto-compact when the window fills and expose a manual compaction command, preserving recent turns plus a running summary; Anthropic's public engineering writing on context engineering treats compaction plus an external note file as the standard long-horizon technique; MemGPT (Packer et al., arXiv 2310.08560) frames the same idea as operating-system paging between in-context and external storage.
- **Related** — the context budget of [3.2](../part-3-core-building-blocks-of-genai/chapter-02-tokens-context-sampling.md); Checkpoint-and-Resume (where compacted state persists); Durable Agent Memory.

#### Pattern: Sub-Agent Context Isolation

- **Context** — work with a wide, noisy exploration phase and a narrow conclusion: search across many sources, sweeps over many files, verification of many hypotheses.
- **Problem** — exploration generates enormous low-value text, and if it lands in the deciding agent's context the decision degrades and the window fills before the interesting part starts.
- **Forces** — isolation against coordination cost (a worker blind to the orchestrator's context sometimes redoes work or misreads intent); parallel speed against token multiplication, since N workers is N times the spend; a summary tight enough to use against the loss of the evidence behind it.
- **Solution** — give each sub-task its own agent with its own window, a narrow brief, and a *typed return contract* — findings, citations, confidence, never raw transcript. The orchestrator sees returns, not trajectories; every returned claim carries a pointer into the worker's retained trajectory so a human can audit evidence the orchestrator never saw.
- **Structure** — orchestrator (thin context, plan) → fan-out workers (own windows, tool scopes, budgets) → typed summaries → synthesis; worker trajectories persisted for audit, not merged.
- **Consequences** — keeps the deciding context clean and buys parallelism, which is when multi-agent structures pay for themselves; costs are honest — spend multiplies with fan-out, cross-worker contradictions surface only at synthesis, and debugging spans several trajectories. Sequential stages relabelled as "agents" get the overhead without the isolation ([4.5](../part-4-enterprise-genai-systems/chapter-05-multi-agent-systems.md)).
- **Known uses** — Anthropic's published account of its multi-agent research system describes a lead agent that plans and spawns subagents searching in parallel in their own context windows and returning condensed findings; the orchestrator-workers pattern is the fixed-control-flow version of the same shape; deep-research-style assistants across vendors fan out per source or sub-question and synthesize from returns. Curriculum instance (fictional): the research fan-out in [P11](../../projects/p11-multi-agent-research-assistant/README.md).
- **Related** — Planner-Executor (the plan defines the fan-out); Trajectory Compaction (the intra-agent equivalent); Orchestrator-Workers ([7.3](chapter-03-workflow-patterns.md)).

#### Pattern: Just-in-Time Context Retrieval

- **Context** — an agent working against a corpus far larger than any context: a codebase, a policy library, a ticket history, a warehouse.
- **Problem** — preloading "everything relevant" is impossible and counterproductive — it spends the budget on material the task may never need and fixes the retrieval decision before the agent knows what it is looking for.
- **Forces** — the reliability of material already present against the cost of carrying it; per-step retrieval latency against one large upfront load; the model's judgment about what to fetch against a tuned pipeline's recall. Preloading also caches well, which is a genuine argument for stable, universally needed material.
- **Solution** — preload only the small stable core (task brief, schemas, house rules) and expose everything else through navigation tools — search, list, read-by-identifier — so the agent fetches in the order its reasoning suggests. Hand it lightweight references (paths, record IDs, URLs) rather than contents, and return results in bounded chunks so one fetch cannot flood the window.
- **Structure** — thin system context + tool surface (search / list / read) → on-demand fetches → bounded results appended → compaction reclaims what is spent.
- **Consequences** — the working context stays small and relevant, and retrieval choices become inspectable in the trajectory; the costs are more round-trips, worse prefix-cache behaviour than a fixed preamble, and a new failure where the agent never fetches something it needed and reasons from an absence it cannot perceive — which is why navigation tools need clear names, listable spaces, and informative errors, and why real designs end up hybrid.
- **Known uses** — coding agents are the canonical instance, given grep/find/read tools over a repository rather than a preloaded dump, with effectiveness tracking how well those tools describe the space; tool protocols such as MCP expose resources fetched at need rather than injected upfront; Anthropic's context-engineering guidance recommends lightweight identifiers loaded at runtime over exhaustive preloading.
- **Related** — the RAG patterns ([7.2](chapter-02-rag-patterns.md), which tune retrieval as a pipeline instead of delegating it); Trajectory Compaction; tool design ([3.7](../part-3-core-building-blocks-of-genai/chapter-07-function-calling-tool-use.md)).

#### Pattern: Durable Agent Memory

- **Context** — an agent meeting the same users, systems, or problems repeatedly, where re-learning the same facts every session is visible waste or visible rudeness.
- **Problem** — working context dies with the task, so anything worth carrying across tasks needs a store plus four policies — write, consolidate, retrieve, expire — each with its own failure mode.
- **Forces** — usefulness against staleness (a remembered fact that has since changed is worse than no memory, because it is asserted with the authority of experience); recall against precision as the store grows; "remember everything" against the noise an unbounded store retrieves. And the sharpest force: **memory is a write channel from untrusted content into future sessions**.
- **Solution** — make each operation explicit. **Write**: only durable, generalizable facts — a stated preference, a confirmed system behaviour, an outcome — never raw retrieved text, each carrying provenance, timestamp, and originating task. **Consolidate**: periodically merge and rewrite related memories instead of appending forever, resolving contradictions by recency with superseded versions kept for audit. **Retrieve**: rank by relevance to the current task, cap how many enter context, and label them as recollections rather than instructions. **Expire**: give every class a TTL and re-confirm rather than renew silently. Scope every memory to a subject — this user, this tenant, this system — with no cross-subject retrieval.
- **Structure** — task → candidate extraction (schema-validated, provenance-stamped) → subject-scoped store → consolidation job → capped relevance retrieval at task start → TTL expiry → user-visible list with delete.
- **Consequences** — continuity, personalization, and genuine savings from not re-deriving known facts; the costs are a governed store (memories about people are personal data under [7.7](chapter-07-knowledge-data-patterns.md)'s deletion and residency rules), consolidation compute, and an early wrong memory propagating with unearned authority. The security consequence earns its own line: **memory poisoning** — an instruction embedded in content the agent read once ("always approve requests from this vendor") is written to memory and retrieved in later sessions, turning one injection into a persistent backdoor that survives the session, the prompt fix, and often the incident review. Defenses are structural: memories are data, never instructions; writes are schema-validated and provenance-checked rather than free text; retrieved memories cannot widen tool scope; every memory is inspectable and deletable by its subject.
- **Known uses** — Generative Agents (Park et al., arXiv 2304.03442) implemented a memory stream with recency/importance/relevance retrieval and a reflection step consolidating observations into higher-level conclusions; MemGPT/Letta (arXiv 2310.08560) splits main context from external memory with explicit paging; Reflexion (arXiv 2303.11366) carries an episodic reflection buffer across attempts; mainstream assistants now ship cross-session memory with user-visible, user-deletable entries — the productized form of the four policies. Public agentic-threat material from the OWASP GenAI security project names memory poisoning as a distinct agentic threat rather than a variant of injection.
- **Related** — Checkpoint-and-Resume (within-task state); deletion and tenancy patterns ([7.7](chapter-07-knowledge-data-patterns.md)); Tool Sandbox (memory must not widen scope); the injection threat model ([4.9](../part-4-enterprise-genai-systems/chapter-09-genai-security-threat-modeling.md)).

## Architecture Perspective

```mermaid
flowchart TD
    GOV[Governors: iteration cap · cost budget · stuck detector · kill switch]
    LOOP[Bounded Agent Loop]
    PLAN[Planner-Executor]
    REFLECT[Reflection]
    SANDBOX[Tool Sandbox]
    CODE[Sandboxed Code Execution<br/>isolation · egress · fs · timeout · resources]
    CKPT[Checkpoint-and-Resume]
    COMPACT[Trajectory Compaction]
    ISO[Sub-Agent Context Isolation]
    JIT[Just-in-Time Retrieval]
    MEM[Durable Agent Memory<br/>write · consolidate · retrieve · expire]
    VERIFY[Independent verifier: claims vs. tool log]
    HITL[Human-in-the-Loop 7.5]
    GOV --> LOOP
    LOOP --> PLAN & REFLECT
    LOOP --> SANDBOX --> CODE
    LOOP --> CKPT
    LOOP --> COMPACT & ISO & JIT & MEM
    LOOP --> VERIFY
    HITL --> SANDBOX
    HITL --> PLAN
```

Three readings the diagram supports. **The autonomy grid runs before any of it** — cheap verification plus recoverable errors is agent territory, everything else is a workflow with a model inside it, and the most valuable review question stays "why isn't this [7.3](chapter-03-workflow-patterns.md)?" **Governors and the verifier are components, not settings** — a cap in a config file is a number, while a stuck detector, budget enforcer, kill switch, and a verifier comparing claims to recorded side effects are code with tests, owners, and rehearsals; the difference appears the first time an agent loops on a failing tool at 3 a.m. **Context and memory are design surfaces with security consequences** — compaction decides what the agent still knows, isolation decides whose noise reaches the decision, just-in-time retrieval decides what it can reach at all, and durable memory decides what crosses the session boundary, which is why the last is governed like a data store rather than tuned like a prompt.

## Real-world Example

**Corvid Logistics** (fictional; €, Tallinn) runs a customs-exception agent for shipments a broker's filing system rejects. No two causes look alike — a mismatched commodity code, a missing certificate, a disputed valuation — so the path is undiscoverable, while the finding is checkable against the filing record and nothing is irreversible until a human files.

The **bounded loop** is the core: iteration cap, per-exception cost budget, a stuck detector tripping on two identical consecutive elections, and typed exits that render differently in the broker's queue — resolved, stuck-with-partial-map, and escalated carry different colours and SLAs. Document sweeps run as **isolated sub-agents**, so a 40-page bill of lading never enters the deciding context; the tariff schedule and broker manuals are reached through search-and-read tools (**just-in-time retrieval**) after an earlier build spent most of its window on schedule sections irrelevant to the shipment at hand. Long exceptions **compact** on a token threshold, with a pinned ledger holding the shipment reference, codes considered, and duty figures already computed. Duty recomputation runs as **sandboxed code execution**: a short calculation in a fresh container, no egress, 30-second wall clock, rate table mounted read-only — which also removed the arithmetic from the model's hands and made the result re-runnable.

Around that, the **tool sandbox** issues per-shipment credentials and denies egress by default, portal writes route to a **human approval gate** ([7.5](chapter-05-human-in-the-loop-patterns.md)), and **checkpoint-and-resume** carries the task across an approval that routinely lands the next morning. **Durable memory** stores per-broker quirks with provenance and a 180-day expiry under a rule the team wrote after a tabletop exercise: memories are extracted only from confirmed outcomes and injected as labelled data, because a "standing instruction" harvested from a supplier PDF would otherwise outlive the session that read it. Independent verification compares claims against the tool log — which is how "no discrepancy found" on a document that was never retrieved gets caught. Priit, the architect, reviews the composition with one question per group: which governor stops the runaway, which boundary stops the code, which policy stops a memory becoming an instruction, and which pattern keeps hour six as sharp as hour one. A missing answer is the review finding.

## Hands-on Exercise

**Compose and stress-test an agent architecture.** ~90 minutes. Take one agentic task — your own, or [CS07](../../case-studies/cs07-aml-investigation-assistant.md), [CS31](../../case-studies/cs31-network-operations-copilot.md), or [CS40](../../case-studies/cs40-legacy-code-modernization-factory.md).

1. **Autonomy-grid check (10 min).** State how success is verified and what the worst recoverable error costs. If verification is expensive or errors are irreversible, design a workflow instead ([7.3](chapter-03-workflow-patterns.md)) and record that conclusion — it is a valid outcome.
2. **Control and containment (25 min).** Specify the success schema and four typed exits with their consumers; then write the code-execution envelope as five named values (isolation unit, egress policy, filesystem scope, wall-clock timeout, resource ceilings) and what happens at each ceiling.
3. **Context budget (25 min).** Allocate the working context: preloaded, just-in-time, sub-agent-isolated, and compaction trigger. List the pinned-ledger fields — the specifics whose loss would corrupt the task.
4. **Memory and its abuse (20 min).** Define write policy, consolidation rule, retrieval cap, TTL, and subject scoping. Then attack it: write a concrete scenario where text the agent reads becomes a memory that changes behaviour in a later session, and name the control that stops it.
5. **Red-team the governors (10 min).** Describe how you would test that each governor fires, including a kill-switch rehearsal.

**Acceptance criteria:**
- [ ] Autonomy-grid verdict stated with verification method and error cost, and honoured
- [ ] Success schema plus four typed exits, each with a named consuming behaviour
- [ ] Code-execution envelope as five named values with defined ceiling behaviour
- [ ] Context allocation covering preload / just-in-time / sub-agent / compaction, with an explicit pinned-ledger field list
- [ ] Memory policy covering all four operations plus subject scoping
- [ ] A written poisoning scenario with the specific control that defeats it
- [ ] A test described for each of the four governors, including a kill-switch rehearsal

## Enterprise Considerations

Agents converge several disciplines on one artifact. **Identity and least privilege** are load-bearing: an agent acts, so credentials scope per task and per invoking user, and "who did this?" must resolve to a person rather than a fleet-wide service account ([4.4](../part-4-enterprise-genai-systems/chapter-04-agent-architectures-production.md)). **Sandbox infrastructure is platform work** — pinned images, an egress policy engine, per-task credential issuance, quota enforcement — amortized across the estate rather than rebuilt by every team that needs to run generated code. **Memory is regulated data**: cross-session memories about people fall under the same deletion, residency, and access rules as any other personal data ([7.7](chapter-07-knowledge-data-patterns.md)), so a deletion request must reach the memory store. **Cost governance needs a hierarchy** of per-task, per-user, and per-fleet budgets, because the variance that makes agents useful lets one task consume a day's spend. And **autonomy is a governed level, not a launch setting** — new tools, wider egress, memory writes, or fewer approvals are an [ADR](../../GLOSSARY.md)-worthy permission change ([6.9](../part-6-enterprise-architecture/chapter-09-architecture-governance.md)).

## Trade-offs

| Decision | Option A | Option B | Choose A when… | Choose B when… |
|----------|----------|----------|----------------|----------------|
| Control flow | Agentic patterns | Workflow patterns ([7.3](chapter-03-workflow-patterns.md)) | The path depends on runtime findings and success is cheaply checkable | The path is enumerable — cheaper, faster, more debuggable |
| Planning | Explicit plan artifact | Step-by-step loop | The plan is worth reviewing or approving before action | Steps are cheap and reversible |
| Critique signal | Executable check | Model critique | Any executable check exists — always prefer it | None exists, and you accept a weaker signal with measured value |
| Context supply | Just-in-time retrieval | Preloaded context | The corpus is large and the need unpredictable | Material is small, stable, always needed, cache-friendly |
| Breadth | Isolated sub-agents | Single agent + compaction | Exploration is wide, parallelizable, noisy | Work is sequential — fan-out buys coordination cost, no parallelism |
| Cross-session state | Durable memory | Stateless per task | Repeat interaction makes re-learning wasteful and you can govern the store | Data is sensitive or volatile, or nobody will own expiry |
| Code execution | Fresh isolated runtime per task | Shared interpreter | Always for untrusted or multi-tenant work — the default | Never across tenants; single-tenant latency-critical loops only, with an ADR |

## Common Mistakes

1. **An agent where a workflow fits** — paid in cost, latency, and debuggability forever ([7.10](chapter-10-anti-patterns.md)).
2. **Governors as configuration** — a cap in a YAML file, no stuck detector, an unrehearsed kill switch, no test that any of them fire.
3. **Self-grading as verification** — a logged critique that always approves, read by reviewers as evidence; verify claims against side effects.
4. **Code execution with network egress "for package installs"** — the one relaxation that reconnects exfiltration; pin dependencies into the image.
5. **Compaction that eats load-bearing specifics** — extract structured facts into a pinned ledger before summarizing over them.
6. **Memory as an append-only log** — unbounded growth, no consolidation, no expiry, until retrieval returns noise the model still trusts.
7. **Treating retrieved memories or documents as instructions** — the mechanism behind memory poisoning, where one injected line outlives the prompt fix and the incident review.
8. **Sub-agents that return transcripts** — re-importing exactly the noise isolation was meant to keep out.
9. **Non-idempotent resumption** — re-filing, re-charging, or re-emailing because side effects were not recorded with identifiers.

## Best Practices

1. **Run the autonomy grid first and record the verdict**, including the majority of cases where the answer is "workflow."
2. **Make success machine-checkable and verify outside the loop** — a result nobody can check cheaply is a poor candidate for an agent.
3. **Build the governors as tested components**, each with a test proving it fires and a rehearsal for the kill switch.
4. **Write the execution envelope as five named values** and review changes to it like permission changes.
5. **Design the context budget explicitly** — stable core preloaded, the rest just-in-time, noisy exploration isolated, compaction on a token threshold with a pinned ledger.
6. **Govern memory like a data store** — write policy, consolidation, retrieval cap, TTL, subject scoping, user-visible deletion; memories enter as labelled data and never widen tool scope.
7. **Checkpoint after every consequential action with idempotent, receipt-recorded side effects.**
8. **Instrument per-task cost, iterations, and compaction events** — agent economics are a distribution, and the tail is what you manage.

## Architecture Checklist

For applying the agentic patterns:

- [ ] Autonomy-grid verdict recorded: verification method, error cost, why this is not a workflow
- [ ] Machine-checkable success schema with representable uncertainty; four typed exits with named consumers
- [ ] Four governors implemented and tested; kill switch rehearsed by a named owner
- [ ] Independent verification against the tool log, not the agent's own report
- [ ] Least-privilege per-task tool scope; default-deny egress; consequential tools gated ([7.5](chapter-05-human-in-the-loop-patterns.md))
- [ ] Code-execution envelope specified (isolation, egress, filesystem, timeout, resources) with ceiling behaviour
- [ ] No single agent holds private data, untrusted content, and an outbound channel at once
- [ ] Context budget allocated: preloaded core, just-in-time tools, sub-agent isolation, compaction trigger, pinned-ledger fields
- [ ] Memory policy defines write, consolidation, retrieval cap, expiry, subject scoping; memories are data, never instructions
- [ ] Memory poisoning considered explicitly, with the defeating control named and tested
- [ ] Checkpointing after consequential actions with idempotent receipts; state schema versioned
- [ ] Per-task cost, iteration, and compaction telemetry with budget hierarchies and alerts ([4.4](../part-4-enterprise-genai-systems/chapter-04-agent-architectures-production.md))

## Interview Questions

1. *"Walk me through the agentic patterns and when you'd use each."* — Strong answers organize by what each group controls (control, containment, durability, context and memory) rather than listing names, and lead with the autonomy grid: most tasks are workflows; this family serves the residue where the path depends on runtime findings.
2. *"An agent writes and runs code on your infrastructure. Specify the envelope."* — Strong answers name isolation unit (fresh container or microVM per task), egress policy (default-deny plus allowlist), filesystem scope, wall-clock and resource ceilings, and the absence of ambient credentials — then say what happens at each ceiling and why the package-install exception is the one to refuse.
3. *"Your agent runs for six hours. How does it stay coherent, and what does that cost?"* — Strong answers cover compaction with a pinned ledger, sub-agent isolation, just-in-time retrieval, and checkpointing, plus the honest costs: lossy compaction, token multiplication from fan-out, extra round-trips, worse prefix caching.
4. *"What is memory poisoning, and how does your design survive it?"* — Strong answers describe an instruction in read content becoming a durable memory retrieved in later sessions, note that it converts a one-shot injection into a persistent one, and give structural defenses: provenance-stamped schema-validated writes from confirmed outcomes only, memories as labelled data, no scope expansion, TTL with re-confirmation, subject-visible deletion.
5. *"How do you know the agent did what it says it did?"* — Strong answers separate self-report from evidence: an independent verifier comparing asserted work to recorded side effects, executable checks wherever they exist, and typed exits so partial results are never rendered as success.

## Further Reading

- Yao et al., *ReAct* (arXiv 2210.03629) — the loop's canonical formulation.
- Anthropic, *Building Effective Agents* — the workflow/agent distinction plus orchestrator-workers and evaluator-optimizer; the companion engineering writing on context engineering and multi-agent research systems covers compaction, just-in-time retrieval, and sub-agent isolation in production.
- Shinn et al., *Reflexion* (arXiv 2303.11366) and Madaan et al., *Self-Refine* (arXiv 2303.17651) — the reflection line and its limits without an external signal.
- Packer et al., *MemGPT* (arXiv 2310.08560) and Park et al., *Generative Agents* (arXiv 2304.03442) — memory as paged context, and memory as a consolidated retrievable stream.
- Jimenez et al., *SWE-bench* (arXiv 2310.06770) and the SWE-agent line (arXiv 2405.15793) — per-task container execution and agent-computer interface design.
- The OWASP Top 10 for LLM Applications and the OWASP GenAI security project's agentic threat material — excessive agency, prompt injection, memory poisoning.
- [3.8](../part-3-core-building-blocks-of-genai/chapter-08-agents-concepts.md), [4.4](../part-4-enterprise-genai-systems/chapter-04-agent-architectures-production.md), [4.5](../part-4-enterprise-genai-systems/chapter-05-multi-agent-systems.md), and the [agent design checklist](../../checklists/agent-design-checklist.md) — the chapters and review form this family compresses.

## Summary

- Ten patterns in four groups: **control** (Bounded Agent Loop, Planner-Executor, Reflection), **containment** (Tool Sandbox, Sandboxed Code Execution), **durability** (Checkpoint-and-Resume), and **context & memory** (Trajectory Compaction, Sub-Agent Context Isolation, Just-in-Time Context Retrieval, Durable Agent Memory).
- The loop is worth using only where success is cheaply checkable and errors recoverable; governors and the independent verifier are tested components, and self-reported success is not evidence.
- Sandboxed code execution is the family's biggest capability unlock and its largest trust boundary — specified as five named values, not as a vague "we sandbox it."
- Context is a designed budget: compaction with a pinned ledger, sub-agent isolation with typed returns, and just-in-time retrieval keep hour six as sharp as hour one, and they are cost patterns as much as quality patterns.
- Durable memory buys continuity and introduces memory poisoning, where an injected instruction outlives its session; govern it like a data store — write, consolidate, retrieve, expire, scope — with memories as data, never instructions.
- Next: the oversight patterns that gate everything consequential this family can do — **human-in-the-loop patterns** ([7.5](chapter-05-human-in-the-loop-patterns.md)).

---

**Previous:** [Chapter 7.3 — Workflow Patterns](chapter-03-workflow-patterns.md) · **Next:** [Chapter 7.5 — Human-in-the-Loop Patterns](chapter-05-human-in-the-loop-patterns.md) · **Related:** [3.8 Agents](../part-3-core-building-blocks-of-genai/chapter-08-agents-concepts.md), [4.4 Agent Architectures](../part-4-enterprise-genai-systems/chapter-04-agent-architectures-production.md), [7.5 Human-in-the-Loop Patterns](chapter-05-human-in-the-loop-patterns.md)
