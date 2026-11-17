---
title: "Resilient AI systems are built around state, budgets, and evidence"
description: "A practical architecture for durable agent work, bounded retries, useful caching, model routing, and observability without pretending every action is exactly once."
pubDate: "2026-11-16"
draft: true
tags: ["ai", "architecture", "reliability", "caching", "distributed-systems"]
heroImage: "/blog/resilient-ai-infrastructure.webp"
heroImageAlt: "Rows of network racks with cables and illuminated status lights."
heroImageCredit: "Taylor Vick on Unsplash"
heroImageSource: "https://unsplash.com/photos/cable-network-M5tzZtFCOfs"
---

An AI demo usually has one request, one model call, and an answer. A useful production system has many requests, long-running work, changing permissions, unreliable dependencies, and users who expect cancellation to mean something.

Adding a queue or Redis does not automatically resolve those problems. The important decisions are what state survives a crash, which work can safely repeat, and what evidence establishes success. I would design those contracts before choosing how many agents to run.

## Give each component a narrow responsibility

A practical starting architecture separates admission, execution, and evidence:

| Component | Responsibility |
| --- | --- |
| Gateway | Authenticate, authorize, validate input, allocate a run ID and budget |
| Workflow store | Persist status, step outputs, versions, approvals, and cancellation |
| Queue and workers | Schedule bounded units of work with controlled concurrency |
| Retrieval layer | Return permitted, versioned evidence |
| Model router | Select an allowed model for the task and remaining budget |
| Tool executor | Validate and authorize real actions outside the model |
| Cache | Reuse eligible computation under explicit scope and freshness rules |
| Telemetry | Explain latency, cost, failures, and task outcomes |

These are responsibilities, not a requirement for eight microservices. One application and a relational database can implement several of them. Split processes when workload or isolation demands it, rather than making the first deployment an operations exercise.

## Persist the run before scheduling work

A queue message should identify a durable run and step, not be the only place their meaning exists. For example, a workflow record can distinguish `queued`, `running`, `waiting_for_review`, `unknown_external_outcome`, `succeeded`, `failed`, and `cancelled`.

If queue publication and the workflow database cannot share a transaction, an outbox is one design: write the run and dispatch intent together, then let a dispatcher publish the intent. Its retries still need stable identities and duplicate handling. The database record explains what should happen even if the dispatcher disappears.

Assume workers may see a message again. Amazon SQS explicitly documents at-least-once delivery for standard queues and recommends idempotent consumers. The broader lesson is to read your queue's guarantees and design the application around them. [SQS delivery semantics](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/standard-queues-at-least-once-delivery.html)

A worker can use a lease to claim a step, but a lease is not proof that the previous worker stopped. Use a version or fencing check before committing shared state. Keep intermediate results so a replacement worker can continue from an accepted boundary rather than regenerate everything.

## Retries need one owner and a finite budget

Separate retryable transport failures from invalid input, authorization failures, and rejected business operations. Retrying a malformed tool argument three times is usually three copies of the same bug.

Allocate an overall deadline, then divide it into connection timeouts, request timeouts, retry delays, and useful work. Add randomized backoff to spread synchronized retries. If the application, SDK, and workflow engine all retry independently, attempts can multiply unexpectedly. AWS's guidance explains why retry placement and jitter matter during overload. [Timeouts, retries, and backoff](https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/)

Keep a provider-wide concurrency limit as well as per-user limits. Otherwise, a large fan-out can consume capacity before smaller requests reach the model. When dependencies degrade, queue bounded work, reject excess load clearly, or offer a cheaper supported mode. An indefinitely growing backlog is a delayed outage.

## External actions require a different recovery contract

A model call can be expensive to repeat. A payment, message, or deployment can be dangerous to repeat. Those are different failure classes.

Before an external action, persist an operation identity and its intended parameters. If the service supports idempotency keys, reuse the same key for the same operation, respecting that service's retention and parameter rules. Afterward, store the receipt or external object ID.

A timeout after dispatch does not prove failure. Record an unknown outcome and reconcile against the external service before issuing another action. LangGraph's fault-tolerance documentation makes the same distinction: retrying a node repeats its execution; it does not make external effects exactly once. [Retry boundaries and idempotency](https://docs.langchain.com/oss/python/langgraph/fault-tolerance)

For cancellation, prevent new steps and ask active workers to stop. Already completed external actions may require compensation, and an in-flight call can still finish. The interface should tell users what was stopped and what remains uncertain.

## Cache different things differently

The word “cache” hides several independent designs:

| Cache | Reuses | Main correctness question |
| --- | --- | --- |
| Exact response | An answer for the same eligible inputs | Are identity, evidence, settings, and permissions still equivalent? |
| Semantic response | An answer for a similar query | Does similarity actually imply the same answer here? |
| Retrieval | Candidate passages or rankings | Has the corpus or access scope changed? |
| Tool result | Data from an external read | Is it fresh enough for this decision? |
| Provider prompt | Repeated prompt-prefix computation | Does the provider recognize the same eligible prefix? |

Provider prompt caching does not mean reusing an old final answer or skipping tool authorization. For example, Anthropic documents caching prompt prefixes with its own matching and lifetime behavior. Keep stable instructions ahead of request-specific material when the provider supports that pattern, and measure actual cache usage. [Prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching)

An application response cache needs a richer key than the user's text. An illustrative envelope might include:

```json
{
  "tenant": "tenant-17",
  "access_scope_version": "acl-42",
  "input_hash": "sha256:example",
  "corpus_version": "corpus-108",
  "prompt_version": "answer-v6",
  "model_config": "model-and-settings-v3",
  "tool_schema_version": "tools-v2"
}
```

This is a design sketch, not a universal key schema. Authorization must still run before returning the payload. Changes to membership or document visibility should invalidate the relevant entries; a time-to-live alone does not implement access control.

Semantic reuse deserves narrower eligibility. Two questions can be linguistically similar but refer to different customers, dates, or financial amounts. Start with safe informational content, preserve provenance, evaluate false matches, and bypass reuse when the answer depends on current private state.

Coalesce concurrent misses within the same allowed scope to avoid many identical expensive calls. Put deadlines around cache access too. A failed optimization should not turn every otherwise healthy model request into an outage. Never reuse cached approval as authority for a new external action.

## Route models against a measurable task

Routing can begin with explicit workload classes: extraction into a fixed schema, retrieval-grounded explanation, or multi-step planning. Each class should have an evaluated baseline and a supported fallback.

A cheaper model that doubles retries or misses required fields may cost more per accepted result. Compare accepted-task cost, latency distributions, and failure categories rather than token prices alone. A fallback must also satisfy the data's permitted providers and regions; availability does not override those constraints.

Keep routing decisions in the trace. Otherwise, a quality regression can look like random model behavior when a configuration change silently moved traffic to a different path.

## Observe the workflow, not only the final sentence

Use one run identity across gateway, queue, retrieval, model, cache, and tool spans. Record queue delay separately from execution time. Track cache hit type, provider usage, retry count, rejected tool calls, cancellation latency, and the final verified outcome.

Raw prompts and tool payloads can contain private information. Prefer safe metadata, explicit redaction, limited retention, and controlled access to any captured content. OpenTelemetry's GenAI conventions provide an evolving vocabulary for instrumentation; pin the conventions your deployment supports rather than assuming every SDK emits identical fields. [OpenTelemetry GenAI conventions](https://github.com/open-telemetry/semantic-conventions-genai)

Then test the failures intentionally: duplicate delivery, a worker crash after dispatch, an unavailable cache, expired access, a model timeout, and cancellation during a tool call. A system is resilient when those transitions produce understandable, recoverable state. Successful answers are only one part of that evidence.

## Further reading

- [AWS on timeouts, retries, backoff, and jitter](https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/)
- [SQS at-least-once delivery](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/standard-queues-at-least-once-delivery.html)
- [LangGraph fault tolerance](https://docs.langchain.com/oss/python/langgraph/fault-tolerance)
- [Anthropic prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching)
- [OpenTelemetry GenAI semantic conventions](https://github.com/open-telemetry/semantic-conventions-genai)
