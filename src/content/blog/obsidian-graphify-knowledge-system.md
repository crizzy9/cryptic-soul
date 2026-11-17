---
title: "An Obsidian knowledge system with Graphify and traceable sources"
description: "Build a useful knowledge system with authored notes, explicit relationships, a scoped Graphify index, and answers that lead back to current evidence."
pubDate: "2026-11-16"
editorialDate: "2026-11-02"
draft: false
tags: ["obsidian", "graphify", "knowledge-management", "retrieval"]
heroImage: "/blog/obsidian-knowledge-notes.webp"
heroImageAlt: "Research photos, charts, and colorful handwritten notes arranged on a wall."
heroImageCredit: "Jo Szczepanska on Unsplash"
heroImageSource: "https://unsplash.com/photos/sticky-notes-bjemWZcNF34"
---

A knowledge system should help answer questions that matter: Why did I choose this design? Which decision superseded the old one? What evidence supports the current plan?

A colorful graph can make a collection look connected without answering any of those questions. My preferred architecture starts with readable notes and explicit ownership, then adds Graphify as a derived way to explore them. The graph helps find evidence; the source note remains the place where the claim lives.

This is a proposed workflow for a deliberately selected collection, rather than a recipe for sending an entire personal vault to a model.

## Give each fact an authored home

Begin with a few note types that serve actual work: concepts, decisions, projects, sources, and working notes. A decision explains the choice and its alternatives. A source records where information came from. A project names the outcome and links to the decisions that govern it.

Use properties for the fields you need to query consistently. Obsidian stores properties as YAML and supports structured values such as dates, lists, and links. Quoted wikilinks can appear in properties. The following schema is an example convention to design for your own collection, not a built-in Obsidian standard. [Obsidian properties](https://help.obsidian.md/properties)

```yaml
---
id: decision-search-001
type: decision
status: active
project: "[[Projects/Documentation Search]]"
supersedes: "[[Decisions/Keyword Search Only]]"
sources:
  - "[[Sources/Retrieval Evaluation]]"
updated: 2026-11-16
---
```

The body still needs the reasoning, consequences, and unresolved questions. Frontmatter cannot replace them. Avoid storing the same decision independently in a project page, a dashboard, and an AI summary. Link to its authored home instead.

Stable identifiers help track a note through renames. Paths remain useful navigation handles, but should not be the only identity in a system that frequently reorganizes folders.

## Separate three kinds of connection

An explicit link says an author connected two notes. An embedding says two pieces of text are close under a particular model. An extracted relationship says a parser or model identified a relationship in source material. These are useful signals with different meanings.

Obsidian's native graph visualizes note relationships through internal links; local graph depth controls how far that neighborhood expands. It is already useful for finding orphaned ideas or tracing a deliberately maintained decision chain. It does not, by itself, establish that every connected statement is correct. [Obsidian Graph view](https://help.obsidian.md/plugins/graph)

The Graphify discussed here is [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify), formerly hosted under `safishamsi/graphify`. Its official package is `graphifyy`, with a `graphify` command. The current project describes a traversable graph rather than a vector store, and distinguishes extracted and inferred edges. Do not silently treat one of those edges as a human-approved decision.

You can keep an embedding index alongside this graph for semantic passage retrieval. Combining them is an application design choice; Graphify is not a substitute name for every layer of retrieval.

## Establish the extraction boundary before opening files

The safest first input is a small staging directory containing approved material. Decide its membership before any extractor reads bodies.

For example, a search-design study might admit exactly three notes:

```text
Approved source manifest
  Concepts/Hybrid Retrieval.md
  Decisions/Search Ranking.md
  Sources/Search Evaluation.md

Staging directory
  graph-input/
    Concepts/Hybrid Retrieval.md
    Decisions/Search Ranking.md
    Sources/Search Evaluation.md
```

An exporter should resolve each approved path, reject traversal and symlink escapes, enforce the collection's privacy rules, then copy the permitted version. It should not scan all note bodies to decide whether they look safe. Links to excluded notes remain excluded; a backlink is not permission to follow it.

Record the source note ID, original path, content hash, export time, and staging path in a manifest outside the extracted prose. This provides a way to map findings back without teaching the graph every private filesystem detail.

Graphify supports ignore rules and sensitive-file filtering, but those are additional controls. A note containing private medical or employment information can have a perfectly ordinary Markdown filename. An allowlisted export gives the extractor a smaller universe in which to operate. [Graphify ignore rules](https://docs.graphify.com/open-source/configuration/ignoring-files)

## Choose where semantic extraction runs

Code parsing and document understanding have different data paths. Graphify's document workflow uses a semantic backend for Markdown and other prose; choosing an assistant or hosted backend can send that material to its model service. Its documentation also describes a local Ollama backend. Confirm the configuration and the model's handling of your data before extraction. [Documents and media](https://docs.graphify.com/open-source/features/documents-and-media)

Pin the tool version you evaluated, record its backend configuration without credentials, and start with synthetic notes. Check the installed help before adapting commands from an older tutorial. The CLI and documentation evolve, so a command working last month does not establish its behavior today.

Keep the CLI and assistant-skill routes separate. For a local CLI extraction, the documented backend selector is explicit:

```sh
graphify extract ./graph-input --backend ollama
```

Verify the Ollama endpoint, installed model, and network behavior with synthetic notes first. A backend named `ollama` is not proof that its endpoint is on your own machine. The [backend configuration guide](https://docs.graphify.com/open-source/configuration/llm-providers) describes the relevant settings.

An assistant with the Graphify skill installed can also target the staged directory:

```text
/graphify ./graph-input --no-viz
```

This is the slash-command form used by supported assistant hosts, not a shell command; Codex uses `$graphify` instead. The skill's document extraction runs through the host assistant's model. Selecting a local CLI backend does not establish that the assistant skill uses that backend or keeps note content local. Check the [skill quickstart](https://docs.graphify.com/open-source/quickstart) and your host's data handling separately. Both routes target only the staged input and grant no permission to expand into the original vault. Inspect the generated report and saved graph before exposing them to another assistant or publishing any visualization.

## Retrieval should return evidence, not just node names

Consider the question, “Why does this project use hybrid retrieval?” A useful path might connect the project to a ranking decision and then to an evaluation note. The answer still needs the relevant passages.

I would make the retrieval adapter return a compact evidence bundle:

```json
{
  "note_id": "decision-search-001",
  "heading": "Why hybrid retrieval",
  "source_version": "sha256:example",
  "relationship_origin": "authored-link",
  "excerpt": "The evaluated corpus contains exact identifiers..."
}
```

This is an illustrative application envelope, not Graphify's output schema. It makes the distinction between discovery and justification explicit.

Use the graph to identify promising sources, reopen the permitted current notes, and verify the cited passage. If a source changed since extraction, mark the graph result stale. If an inferred relationship has no supporting passage, describe it as a hypothesis or leave it out of the answer.

Obsidian can link to headings and stable block identifiers, which can make those citations more useful than a note title alone. Block references are Obsidian-specific, so preserve a readable fallback for exports. [Internal links](https://help.obsidian.md/links)

## Treat freshness as part of correctness

Record a graph build's source manifest and tool version. A successful query against a saved graph only proves the graph was readable; it says nothing about whether yesterday's decision was superseded this morning.

Graphify documents separate code and semantic refresh paths. A code update does not replace document re-extraction. For a staged document collection, review the applicable semantic update process, then verify changed, renamed, removed, and newly excluded notes against the new manifest. [Keeping the graph current](https://docs.graphify.com/open-source/features/incremental-updates)

Test deletion as deliberately as addition. Remove a synthetic note, refresh, and verify that neither its excerpt nor an edge relying on it remains retrievable. If a policy change removes a source, invalidate derived extracts and caches too. Version upgrades deserve the same small regression suite before rebuilding a larger collection.

## Evaluate questions before growing the graph

Start with ten real questions and their expected evidence. Include a direct fact, a multi-note decision trail, a superseded decision, an ambiguous name, and a question the collection cannot answer.

Measure whether retrieval finds the right source, whether citations support the answer, and whether unavailable evidence produces an honest refusal. Add privacy checks: an excluded note must never appear in the staged input, graph, retrieved context, or generated answer.

Then clean up the notes that cause failures. Clarify a decision's status, resolve a duplicate concept, or add a missing source link. Those improvements remain useful even if Graphify disappears. That is the foundation worth building: authored knowledge you can read, with an index you can replace.

## Further reading

- [Graphify source and installation identity](https://github.com/Graphify-Labs/graphify)
- [Graphify document extraction](https://docs.graphify.com/open-source/features/documents-and-media)
- [Graphify refresh behavior](https://docs.graphify.com/open-source/features/incremental-updates)
- [Obsidian properties](https://help.obsidian.md/properties)
- [Obsidian internal links and block references](https://help.obsidian.md/links)
