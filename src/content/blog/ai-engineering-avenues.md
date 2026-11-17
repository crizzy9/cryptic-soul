---
title: "Choosing the right kind of AI system"
description: "A practical map of prediction, retrieval, generation, multimodal models, and agents, with a method for choosing the smallest system that can solve the problem."
pubDate: "2026-11-16"
editorialDate: "2026-10-13"
draft: false
tags: ["ai", "machine-learning", "architecture", "evaluation"]
heroImage: "/blog/ai-approaches-robotics.webp"
heroImageAlt: "A white humanoid robot with a tablet in front of a wooden wall."
heroImageCredit: "Alex Knight on Unsplash"
heroImageSource: "https://unsplash.com/photos/white-robot-near-brown-wall-2EJCSULRwC8"
---

“Add AI” is an incomplete product requirement. It does not say whether the system should rank a list, predict a number, find a document, create a draft, interpret an image, or take an action. Those are different engineering problems even when a single model can participate in several of them.

I find it more useful to map AI by the decision a system needs to make and the evidence available to judge it. That keeps model selection connected to the product, rather than making the product a demonstration of whichever model is currently getting attention.

## Start with a measurable job

Imagine a support operation asking for an AI assistant. The request could hide several independent needs: route tickets, retrieve policies, summarize a conversation, inspect a screenshot, or issue a refund. Each need has a different acceptable failure rate and a different path to evaluation.

Before choosing a framework, write down one successful outcome and one unacceptable outcome. “Find the correct policy revision and cite it” is testable. “Understand our business” is not a useful first acceptance criterion.

I would also measure an ordinary baseline. Search, rules, a small classifier, or a template may already perform well enough. This is not a claim that sophisticated systems have no value. It gives the team evidence of what additional complexity must improve.

## Prediction and ranking still deserve a place

If the output is a label, score, ordering, or forecast, supervised learning may be the most direct avenue. Examples include assigning a ticket category, estimating churn risk, or ranking recommendations from known features.

The hard work often lives in the data contract: when a feature becomes available, which labels are reliable, and whether the evaluation resembles deployment. A model that sees information from after the predicted event can produce excellent offline scores and fail immediately in use. The [scikit-learn guidance on leakage and pipelines](https://scikit-learn.org/stable/common_pitfalls.html) is a useful foundation for keeping training transformations separate from held-out data.

My design question would be whether the system needs fluent language at all. A category with a confidence estimate can be easier to monitor than a paragraph that happens to contain the category. Thresholds, abstention, class imbalance, and retraining still require engineering, but the problem stays close to its measurable output.

## Retrieval connects questions to evidence

Embeddings turn content into vectors that can support similarity-based search. They are useful when a query and a relevant passage use different words. Lexical search remains valuable for exact identifiers, names, and specialized terminology.

A retrieval system can combine candidate search with a second ranking stage. Sentence Transformers' [retrieve-and-rerank documentation](https://www.sbert.net/examples/sentence_transformer/applications/retrieve_rerank/README.html) explains the distinction between efficient candidate retrieval and more expensive relevance scoring.

For a policy assistant, I would evaluate the evidence pipeline before adding an answer generator. Does the correct revision appear in the candidate set? Does ranking place it where the next stage can use it? Do permissions filter it before it becomes context? These checks isolate retrieval failures that a fluent answer can otherwise conceal.

Retrieval-augmented generation adds a language model after that pipeline. The generator receives selected evidence and a response contract, including what to do when the evidence is insufficient. It still needs citation checks and an abstention path. Finding a related paragraph does not establish that every claim in the final answer is supported.

## Generation is useful when language is the work

Generation fits tasks such as drafting, transforming, extracting, and summarizing information. A model can convert a long conversation into a structured handoff, rewrite a message for a particular audience, or propose an outline from a brief.

I would define the output boundary before optimizing the prompt. If another service consumes the result, validate the structure and the allowed values. If a person consumes it, make source context and uncertainty visible. If the result becomes a published statement or a consequential decision, the review workflow belongs in the design.

A useful first implementation is often one model call followed by deterministic validation and a clear failure response. Adding retries without examining the failure can simply create several variations of the same unsupported answer.

Fine-tuning is another option, including parameter-efficient approaches such as [LoRA](https://huggingface.co/docs/peft/package_reference/lora), but it should answer an observed need. More consistent task behavior or formatting is a different objective from injecting frequently changing factual material. I would compare any trained adaptation against a well-specified prompt and a retrieval baseline using the same held-out examples, then account for training, serving, and maintenance effort.

## Agents add decisions about the next action

An agent can choose a tool, examine its result, and decide what to do next. That is useful when the path through a task cannot be fully specified in advance. A fixed workflow remains a strong choice when the stages and transitions are already known. Anthropic's [agent architecture discussion](https://www.anthropic.com/research/building-effective-agents) makes that distinction explicit and emphasizes evaluating whether added complexity helps.

The support example illustrates the boundary. Summarizing a conversation is generation. Running a known validation sequence is a workflow. Investigating an unfamiliar failure by choosing among diagnostic tools may justify an agent loop.

The tool interface becomes part of the product contract. A “refund” tool needs authorization, limits, idempotency, and an auditable result. A prompt asking the model to be careful is not a replacement for those controls. The agent's freedom should concern how it solves an authorized task, not whether it can invent new authority.

## Multimodal systems change the evidence format

Images, documents, audio, and video can carry information that is missing from plain text. A screenshot may show an error that was never copied into the ticket. An audio recording may need transcription before an ordinary text pipeline can use it. A document question may depend on layout or a table.

The [Transformers image-text-to-text guide](https://huggingface.co/docs/transformers/main/en/tasks/image_text_to_text) describes models that accept image and text inputs and generate text. Choosing such a model still leaves an application-level evaluation problem: can it read the actual screenshot sizes, handwriting, tables, languages, or recording conditions that users provide?

I would preserve the original input and record the transformation chain. If an answer depends on OCR or a transcript, the system should be able to distinguish a missing fact from a recognition error. A confident language response cannot repair evidence lost earlier in the pipeline.

## Local and hosted models are deployment choices

Running a model locally can support offline operation and tighter control over where inference happens. Hosted inference can reduce operational work and provide different capabilities. Neither choice determines the architecture by itself.

Local deployment requires measuring model memory, context length, concurrency, and latency on the target hardware. Quantization can reduce the memory used by model weights, but its speed and quality effects depend on the method and workload; the [Transformers quantization guide](https://huggingface.co/docs/transformers/quantization/concept_guide) describes those tradeoffs. A local model also does not make an application private if its tools, telemetry, or data synchronization still send information elsewhere.

The useful comparison is total system behavior: acceptable quality, cost per successful task, responsiveness under load, operational effort, and data handling. Model size or a single benchmark score is only one input.

## Choose a path by the next uncertainty

For an initial implementation, I would use this decision map:

| Need | Start with | First evidence to collect |
| --- | --- | --- |
| A label or score | Rules or supervised model | Held-out quality and error cost |
| A relevant source | Lexical or embedding retrieval | Candidate recall and access correctness |
| A grounded answer | Retrieval plus generation | Citation support and abstention quality |
| A draft or transformation | A constrained generation step | Human acceptance and validation failures |
| An input beyond text | The required recognition or multimodal stage | Accuracy on real input conditions |
| An uncertain sequence of actions | A bounded agent loop | Task completion, recovery, cost, and tool effects |

These avenues compose. A system can rank incoming work, retrieve evidence, generate a proposal, and ask a person to approve the action. Its strength comes from making each boundary observable and measurable. The right AI architecture is the one whose added decisions earn their complexity through better outcomes.

## Further reading

- [scikit-learn: common pitfalls and data leakage](https://scikit-learn.org/stable/common_pitfalls.html)
- [Sentence Transformers: retrieve and rerank](https://www.sbert.net/examples/sentence_transformer/applications/retrieve_rerank/README.html)
- [Anthropic: workflows and agents](https://www.anthropic.com/research/building-effective-agents)
- [Transformers: image-text-to-text](https://huggingface.co/docs/transformers/main/en/tasks/image_text_to_text)
- [Transformers: quantization concepts](https://huggingface.co/docs/transformers/quantization/concept_guide)
