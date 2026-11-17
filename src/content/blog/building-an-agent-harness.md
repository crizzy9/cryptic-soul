---
title: "Build an agent harness you can measure, recover, and trust"
description: "What it takes to move from a model loop to a capable coding agent: scoped tools, durable state, context recovery, verification, and honest comparison."
pubDate: "2026-11-16"
draft: true
tags: ["ai", "agents", "harness", "evaluation", "software-engineering"]
---

If the goal is to build an agent that competes with products such as Claude Code, a clever system prompt is only the beginning. The system must find the right context, operate useful tools, recover after interruptions, verify its work, and explain what happened.

The model supplies reasoning and generation. The harness supplies the environment in which those capabilities become actions. Improving either can change the result, so a fair comparison measures the complete system rather than treating the model name as the product.

This article proposes a bounded coding-agent architecture. It is not a reconstruction of proprietary internals or a claim that the proposed design already matches a commercial agent.

## Start with a task you can grade

“Build a better assistant” is too broad to guide engineering. A narrower target might be: take a small bug report, modify an isolated checkout, run the relevant checks, and return a patch with evidence without publishing it.

Write acceptance criteria before building orchestration. Define the repositories and tools in scope, the permitted mutations, the time and token budget, and the conditions that require human input. Include what a good failure looks like: an explicit blocker with the inspected evidence can be better than an invented fix.

Some work fits a predefined workflow; other work benefits from the model choosing the next step. Anthropic's agent-pattern guidance distinguishes those approaches and recommends starting with simpler compositions. A deterministic pipeline is a useful baseline to beat before adding a planner and multiple specialists. [Building effective agents](https://www.anthropic.com/research/building-effective-agents)

## Define tools as application interfaces

A tool needs more than a name and a JSON schema. Define its resource scope, input constraints, timeout, output format, effect, and retry semantics. A repository reader should identify files and source versions. A patch tool should report exactly which files changed. A test tool should return the command, exit status, and a bounded output artifact.

Keep large results outside the model context and return references with enough metadata to decide what to read next. Truncation must be visible. Quietly dropping the middle of a test failure creates false confidence.

Use typed interfaces where the operation is predictable. A general shell is powerful but has a larger effect surface than a dedicated reader or test runner. If you provide one, enforce workspace and network boundaries in the execution environment rather than assuming the prompt will contain it.

## Put authority outside the model

The model can propose an action. Application policy determines whether that action is allowed, requires review, or must be refused.

Resolve paths and symlinks before file operations. Scope credentials to the services needed for the current task. Separate ordinary edits and tests from actions such as publishing, deleting data, or changing production infrastructure. Approval should identify the concrete operation, resource, and relevant version; it should not become a blanket token that a different tool call can reuse.

A tool description or retrieved document can contain instructions, but neither should grant privileges. Treat repository prose, web pages, and tool output as potentially untrusted data. Claude Code's public security documentation describes permissions and sandboxing as product controls; the transferable lesson is to implement actual execution boundaries, not merely write a more forceful system prompt. [Claude Code security](https://code.claude.com/docs/en/security)

## Make the loop a state machine

An illustrative controller can separate model decisions from effects:

```text
load durable run and verify its workspace version
while budget remains:
    stop if cancellation is requested
    assemble bounded context from permitted sources
    ask model for a proposed next action
    validate the action and check current policy
    if review is required:
        persist the exact proposal and pause
    persist an attempt before dispatching an external effect
    execute with a deadline and operation identity
    persist result, evidence references, and updated state
    if acceptance checks pass:
        record the verified outcome and finish
record why the run stopped and what remains
```

This is pseudocode, not an SDK implementation. A real controller also needs concurrency control, error classification, durable storage, and reconciliation when dispatch succeeds but its acknowledgement is lost.

Separate `finished_generating` from `task_verified`. A model can confidently announce completion while tests fail or the requested artifact is missing. The application should derive completion from the task's acceptance contract and recorded evidence.

## Save checkpoints that mean something

A useful checkpoint records accepted work, pending steps, source versions, artifacts, and unresolved external actions. Saving the message history alone does not establish which edits were applied or which results were verified.

A persistence framework can supply machinery here. LangGraph distinguishes thread-level checkpoints from stores used for information across threads. A production deployment must still choose an appropriate durable backend and retention policy; an in-memory saver is a development convenience. [LangGraph persistence](https://docs.langchain.com/oss/python/langgraph/persistence)

Resume should revalidate the workspace and policy. If a file changed while the agent was paused, a previously proposed patch may be stale. If access was revoked, a resumed run must not regain it from an old context window.

Human review is also a durable transition. LangGraph's interrupt documentation notes that resuming restarts the interrupted node, including code before the interrupt. Keep irreversible effects outside that replayed preparation path or make their repetition safe. [LangGraph interrupts](https://docs.langchain.com/oss/python/langgraph/interrupts)

## Engineer context recovery, not unlimited memory

An agent needs different forms of context for different purposes: current conversation, selected source excerpts, tool results, execution state, and durable user knowledge. Mixing them into one enormous transcript makes stale assumptions difficult to detect.

Before compaction, preserve the task objective, accepted constraints, exact artifact references, unfinished work, and the next verification step. Mark what was observed versus inferred. Keep source paths and versions so the next session can reopen the relevant material rather than trusting a summary forever.

Anthropic's long-running harness work describes initialization and incremental sessions that leave useful artifacts for the next session. Its important lesson is that compaction alone does not establish project continuity. The environment must make remaining work and verification visible. [Long-running harnesses](https://www.anthropic.com/research/effective-harnesses-for-long-running-agents)

A summary is a navigation aid. A test log, current source file, or external receipt remains the evidence.

## Add parallel agents where ownership is clear

Parallelism helps when tasks are independent and the integration cost is manageable. One agent might investigate a failing parser while another examines an unrelated UI regression. Two agents editing the same function without coordination are more likely to produce conflict than useful speed.

Assign file or resource ownership, return formats, and acceptance criteria. Give each worker enough selected context to do its job, rather than the entire conversation by default. Require source references for research and patches plus validation evidence for implementation.

The orchestrator should review the combined result. Several agents agreeing with one another is not independent verification if they all copied the same mistaken assumption. Use executable checks and source-backed review to challenge the result.

## Build the evaluation harness alongside the agent

Start with a small task set covering successful edits, ambiguous requests, missing dependencies, malicious repository instructions, stale patches, interrupted runs, and unknown external outcomes. Reset the environment between trials so one run's artifacts do not quietly help the next.

Grade the actual outcome: does the patch fix the issue, preserve unrelated behavior, and stay inside scope? Also measure cost, elapsed time, unnecessary tool calls, recovery after interruption, and inappropriate actions. Use deterministic checks where available and human review where quality is subjective.

Run multiple trials. A single attractive transcript does not show reliability. Anthropic's evaluation guidance distinguishes the recorded trajectory from the final environment outcome and recommends explicit tasks, graders, and repeated trials. [Evaluations for agents](https://www.anthropic.com/research/demystifying-evals-for-ai-agents)

To claim competitive performance, compare systems on the same task set, starting environment, permissions, budgets, and grading process. Report the model and tool versions and show failures as well as averages. A harness can outperform a broader product on a narrow workflow without matching its general capability.

The first useful milestone is therefore modest and concrete: one agent, a few precise tools, durable state, enforced boundaries, and evidence that it completes the intended task. Grow the architecture when measured failures show which missing component would help.

## Further reading

- [Anthropic's workflow and agent patterns](https://www.anthropic.com/research/building-effective-agents)
- [Claude Code security](https://code.claude.com/docs/en/security)
- [LangGraph persistence](https://docs.langchain.com/oss/python/langgraph/persistence)
- [LangGraph interrupts](https://docs.langchain.com/oss/python/langgraph/interrupts)
- [Long-running agent harnesses](https://www.anthropic.com/research/effective-harnesses-for-long-running-agents)
- [Agent evaluation design](https://www.anthropic.com/research/demystifying-evals-for-ai-agents)
