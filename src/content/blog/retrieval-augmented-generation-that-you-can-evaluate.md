---
title: "Building a RAG system you can evaluate and maintain"
description: "Design retrieval-augmented generation around source identity, permissions, hybrid search, grounded answers, and an evaluation loop that reveals where failures start."
pubDate: "2026-11-16"
draft: true
tags: ["ai", "rag", "retrieval", "search", "evaluation"]
---

A RAG demo can answer a question from a PDF in an afternoon. A useful system has to keep answering when the PDF changes, a user loses access, the question contains an exact error code, or the available documents disagree.

The engineering challenge is to preserve a chain of evidence: an authorized source became these chunks, these chunks were retrieved for this question, and these passages support this answer. Every stage should leave enough information to examine that chain.

Retrieval-augmented generation brings external information into a model's answer context. The [original RAG paper](https://arxiv.org/abs/2005.11401) explored combining parametric model knowledge with a retrieved document index. In an application, I would start with a deterministic retrieve-then-answer pipeline and add agent-controlled retrieval only when a tested use case needs it.

## Define what a correct answer requires

Choose a narrow corpus and representative questions before choosing an embedding model. For a software-support assistant, the contract might be: answer for the user's product version, cite the applicable procedure, and acknowledge when no supported procedure exists.

Collect questions with exact names, paraphrases, multi-document requirements, obsolete instructions, and no answer. Record the expected source sections as well as an acceptable answer. A dataset containing only questions the prototype already handles tells you little about the next deployment.

Decide what happens when sources conflict. A newer document may supersede an older revision, but a newer page for a different product edition is not automatically authoritative. Represent applicability and authority explicitly so the answer stage can explain the distinction.

## Give ingestion stable identities

A chunk needs more than text and a vector. Keep an immutable source identifier, source revision or content hash, location within the source, applicable product or date range, and permission metadata. Record the parser, chunking configuration, and embedding model used to create the indexed representation.

One practical chunk key is a tuple of source ID, revision, and ordinal. A changed parser or splitter can alter boundaries, so include the indexing configuration in the generation identity or rebuild the affected source completely. Reusing arbitrary chunk IDs makes it difficult to discover which passages a citation actually referred to.

Treat replacement as a lifecycle operation. Build and validate the new source generation, make it searchable, and retire the old generation through a controlled transition. Preserve the evidence needed to explain past answers without continuing to expose retired content in new searches.

Deletion and access revocation need their own paths. Remove or invalidate lexical entries, vectors, derived summaries, and answer-cache entries. If permission synchronization is delayed, define how a source-of-truth access check prevents that delay from becoming an exposure window.

## Parse for meaning before splitting for size

A table without its headers or a code sample without its surrounding warning can be a bad retrieval unit even when its embedding looks relevant. Preserve document titles, section paths, page references, and table relationships during parsing. Inspect extracted text from a few difficult files before embedding the entire corpus.

Chunking chooses the unit of retrieval. Smaller chunks can isolate a precise fact; larger ones may preserve necessary explanation. Overlap can retain boundaries while increasing duplication and index size. LangChain's [splitter documentation](https://docs.langchain.com/oss/python/integrations/splitters) describes structure-aware and length-based strategies. Those are starting tools, not evidence that a universal chunk size exists.

Test several configurations against the same questions. For a short runbook, section-level chunks may be sufficient. For a long manual, retrieve a smaller passage and expand to its authorized parent section when needed. Keep expansion bounded so one hit cannot pull an entire manual into the prompt.

## Combine retrieval signals deliberately

Lexical retrieval, commonly using BM25, is a useful baseline for exact identifiers and wording. Dense retrieval can surface related language when a question and document use different expressions. Compare both before deciding how to combine them.

Hybrid retrieval merges candidate lists from the two approaches. Reciprocal rank fusion is one option that combines rankings without requiring raw lexical and vector scores to share a scale. Elastic's [hybrid-search guide](https://www.elastic.co/docs/solutions/search/hybrid-search) explains that pattern. Improvement still has to be measured on your corpus; adding a second retriever also adds complexity and latency.

A reranker then scores a bounded set of candidates against the question. It can reorder a passage already found, but it cannot recover evidence absent from that candidate set. [Semantic reranking](https://www.elastic.co/docs/solutions/search/ranking/semantic-reranking) therefore belongs after a sufficiently broad first retrieval stage, with an explicit latency budget.

Preserve the original query if you add rewrites. Expanding “connection reset” into a longer natural-language search can help discovery, while dropping an error number or product version can make it worse. Evaluate rewrites as a separate change and keep their scope under application control.

## Apply access rules before evidence leaves retrieval

The authenticated identity should determine the retrieval scope. Apply tenant and document-access constraints to every retrieval path, including lexical search, vector search, parent expansion, related-document lookup, and cached results. A model should never choose its own authorization filter.

Filtering a broad result set after sending it to an external reranker or model is too late for confidentiality. Database-native controls or correctly constructed server-side filters should restrict the candidate set before those stages. Microsoft's [security-filter pattern](https://learn.microsoft.com/azure/search/search-security-trimming-for-azure-search) illustrates query-time filtering and explicitly notes that the filter itself does not authenticate a caller.

In pseudocode, a minimal pipeline looks like this:

```text
scope = permissions.resolve(authenticated_session)
query = preserve_identifiers(user_question)

lexical = search_keywords(query, enforced_scope=scope)
dense = search_vectors(query, enforced_scope=scope)
candidates = deduplicate_and_fuse(lexical, dense)

ranked = rerank(query, authorized_candidates=candidates)
evidence = pack_authorized_passages(ranked, context_budget)
answer = generate_answer(query, evidence, allow_abstention=True)

validate_citations_and_support(answer, evidence)
record_redacted_trace(source_revisions, retrieval_config, outcome)
```

These names describe application responsibilities, not a specific library API. Permission enforcement must be a real property of each implementation behind them.

## Make generation accountable to the passages

Give each supplied passage a stable citation label and its source location. Ask for answers grounded in that evidence and make uncertainty an acceptable outcome. Keep retrieved text separate from instructions; documents may contain malicious directions or accidental prompt-like content.

Then validate the result. Every citation must resolve to an authorized passage supplied to this invocation. The cited passage must support the associated claim. An answer with valid-looking document links can still invent a deadline or combine incompatible product editions.

Abstention should distinguish missing evidence from an operational failure. “I could not find a supported migration path” means something different from “the search service timed out.” Preserve that distinction in response data and monitoring so an outage does not masquerade as a knowledge gap.

Context packing also deserves evaluation. Deduplicate overlapping text, retain applicability details, and avoid filling the window merely because space remains. [Lost in the Middle](https://arxiv.org/abs/2307.03172) demonstrated position-sensitive information use in the models it tested. Treat it as a reason to test evidence placement with your chosen model, not a universal ranking law for every newer model.

## Measure retrieval and answers separately

First measure whether the necessary evidence appears in the candidate set and final context. For questions with known relevant passages, recall at a chosen cutoff is a useful diagnostic:

```python
def recall_at_k(retrieved_ids: list[str], relevant_ids: set[str], k: int) -> float:
    if k <= 0 or not relevant_ids:
        raise ValueError("Use a positive cutoff and an answerable example.")
    return len(set(retrieved_ids[:k]) & relevant_ids) / len(relevant_ids)


assert recall_at_k(["section-c", "section-a"], {"section-a", "section-b"}, 2) == 0.5
```

That synthetic assertion explains the calculation; it is not a measured system result. Score unanswerable questions separately, and use ranking metrics when ordering matters. Track unauthorized retrieval as a failure rather than averaging it into relevance.

For generated answers, examine factual correctness, support from retrieved evidence, citation accuracy, and appropriate abstention. The [LangSmith RAG evaluation tutorial](https://docs.langchain.com/langsmith/evaluate-rag-tutorial) separates correctness, answer relevance, groundedness, and retrieval relevance. Automated judges can help prioritize review, but their grading needs calibration against human judgments.

Log ingestion lag, search failures, reranking time, context size, and end-to-end cost alongside quality. Change one major retrieval or generation component at a time, compare against the same versioned evaluation set, and retain a rollback path for the index and configuration. That discipline makes it possible to explain whether a better answer came from better evidence or better use of the evidence already available.

## Further reading

- [The original retrieval-augmented generation paper](https://arxiv.org/abs/2005.11401)
- [LangChain text-splitting strategies](https://docs.langchain.com/oss/python/integrations/splitters)
- [Hybrid search](https://www.elastic.co/docs/solutions/search/hybrid-search)
- [Semantic reranking](https://www.elastic.co/docs/solutions/search/ranking/semantic-reranking)
- [Query-time security filters](https://learn.microsoft.com/azure/search/search-security-trimming-for-azure-search)
- [Evaluating RAG applications](https://docs.langchain.com/langsmith/evaluate-rag-tutorial)
