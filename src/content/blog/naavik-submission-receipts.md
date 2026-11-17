---
title: "When an application submit has no receipt"
description: "Building Naavik's application workflow around review, dry-run evidence, and the uncomfortable gap between clicking Submit and knowing it worked."
pubDate: "2026-11-16"
draft: true
tags: ["naavik", "python", "automation", "reliability"]
heroImage: "/blog/naavik-application-planning.webp"
heroImageAlt: "Hands sketching notes on paper beside open laptops."
heroImageCredit: "Scott Graham on Unsplash"
heroImageSource: "https://unsplash.com/photos/person-holding-pencil-near-laptop-computer-5fNmWej4tAA"
---

The hardest part of application automation is deciding what happened after the final click.

In [Naavik](/projects), my self-hosted career automation project, preparing documents and filling forms are only part of the workflow. A network request can time out after a job board accepts an application. A browser can disappear before its confirmation page is captured. A process can lose its database connection after an external action succeeds.

At that point, blindly retrying can submit twice. Marking the application successful can be equally misleading. That uncertain interval has become one of the most interesting engineering problems in the project.

## Preparation should survive a handoff

Naavik separates document preparation from application submission. Its queue can generate the application documents, then check whether the target board has an automatic submission adapter. When support is missing, the workflow hands the prepared documents back to the user with a reason and the next action.

This is a product decision as much as an implementation detail. Unsupported automation should still leave useful work behind. A resume and cover letter can be ready even when the remaining step requires a person to open the posting.

The queue also rechecks conditions at dispatch time. A score can change after a job is queued, settings can pause automation, and daily limits can be reached. The decision made when the item entered the queue cannot stand in for the conditions that exist when an external action is about to happen.

## A review flag has to affect execution

Generated screener answers are another boundary. The submission validation checks that required drafted answers have a review timestamp. It also requires the application to be a draft and its documents to be ready.

I wanted review to mean something the service enforces. A label saying “review recommended” would leave every caller responsible for remembering the rule. A validation gate gives the interactive submission path and background queue a shared condition to satisfy.

That does not make every generated sentence correct. It establishes where the user's judgment enters the workflow, and prevents the next stage from silently treating an unreviewed required answer as finished work.

## A dry run needs evidence from the actual form

A dry run that only sets a database flag proves very little. The useful version drives the adapter through the real form: navigate, fill fields, upload documents, capture evidence, and stop before final submission.

Naavik keeps a successful dry run in the draft state and records its artifacts separately. “The form was prepared” and “the application was submitted” describe different events, so they deserve different records.

That separation also makes the interface easier to explain. The user can inspect what the automation prepared without finding an application listed as applied before anything has been sent. The cost is additional state and artifact handling, but that state corresponds to a real distinction in the outside world.

## Record the risky boundary before crossing it

The final click creates a coordination problem between a local database and an external job board. They do not share a transaction. Rolling back local state cannot undo an application the board has already received.

Before the adapter performs the final click, Naavik's submission service records a pending attempt and an unconfirmed outcome, then commits that record. It reacquires the application and checks that the attempt still belongs to the same draft before allowing the click to continue.

The ordering is deliberate. If the process crashes immediately after the external action, the next run should encounter evidence that a submission may already have happened. That is more useful than returning to an apparently untouched draft and inviting another click.

## An adapter's success flag is not the whole receipt

For boards with automatic submission support, the service checks for confirmation text or a board application identifier before accepting an ordinary successful result. Missing receipt evidence becomes an unconfirmed submission rather than an applied application.

The retry path treats that uncertainty differently from an ordinary failure. It requires an explicit indication that the board did not receive the application before clearing an unconfirmed attempt for retry. The practical next step is to check the board or inbox, not assume that another attempt is harmless.

This does not provide universal exactly-once delivery. Job boards differ, adapters have limits, and the project still needs qualification across real workflows. It does give uncertainty a place in the data model and keeps the recovery action tied to the kind of failure observed.

The lesson I am taking from Naavik is to design the handoff and recovery path alongside the happy path. Useful automation prepares work, explains what remains, and distinguishes a confirmed outcome from a plausible one. The final click is a small interaction; knowing what it means requires a much larger contract.
