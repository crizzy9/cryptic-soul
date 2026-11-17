---
title: "A playback position is more than a percentage"
description: "What building Avid taught me about source clocks, reading anchors, and keeping playback state owned by the right account."
pubDate: "2026-11-16"
draft: true
tags: ["avid", "typescript", "architecture", "audio"]
---

A reading app makes a deceptively simple promise: come back later and continue where you stopped. Building [Avid](/projects), my reading and audiobook application, has made me much more careful about what “where” actually means.

A progress bar can say 42%. That is useful presentation, but it is a poor recovery record. Which file was playing? Was the recording split into tracks? Did the listener change speed? Does an ebook passage really correspond to that point in the narration?

Those questions pushed the playback architecture toward explicit identities and source positions. Avid is still a development preview, with device and full-book acceptance work open. The useful lesson already visible in its implementation is that a trustworthy resume button starts well below the button.

## Keep the clock attached to the recording

The browser playback controller owns one audio element. The interface subscribes to immutable snapshots of its state instead of maintaining a second playback clock in React. A player can render the current position, buffering state, and selected chapter from the same owner that handles play, pause, and seek.

That matters when the interface changes around the audio. Opening a book sheet or replacing a player view should not create another transport or leave two components disagreeing about whether playback is active. Ownership belongs to the application lifetime; a particular view is a subscriber.

The saved audio locator carries a track identity, the position within that track, and the position on the book timeline. Conceptually, it looks like this:

```json
{
  "version": 1,
  "trackId": "track-3",
  "trackTime": 125,
  "time": 3725
}
```

Those seconds refer to the original recording. At twice the playback speed, a listener passes through source time more quickly; the meaning of a saved source position does not change. Keeping that distinction explicit prevents a display preference from changing the identity of a location.

Incomplete duration information deserves the same care. The controller reports an unknown total until it knows the complete timeline, rather than presenting the sum of a few loaded tracks as the length of the whole book. An incomplete progress display is easier to understand than a confident percentage that changes its meaning later.

## Let playback emit checkpoints, and let storage own persistence

The transport emits checkpoints on events such as seeking, pausing, and track completion, as well as during playback. It can call a persistence callback before notifying checkpoint subscribers. The application owns the account-scoped journal and subsequent synchronization.

I like this boundary because audio behavior and storage behavior have different responsibilities. The controller knows the current source position. The repository knows which account owns that position, how to record it, and whether it can be synchronized. Combining both inside a player component would make every interface change a potential persistence change.

It also makes account changes an architectural event. A surviving player must not quietly attribute an old account's book to the newly selected account. Avid's activity adapter pauses that surviving playback and keeps the old recorder associated with its pending writes. The user interface may look continuous; data ownership cannot be assumed to be continuous.

## Listening time and book progress answer different questions

Activity tracking introduces another clock. Jumping forward twenty minutes changes the source position, but it does not mean twenty minutes of listening happened. Buffering also leaves the player open without producing listening activity.

Avid observes actual playing state and advancing source timestamps, accounts for playback speed, and excludes seek jumps and paused intervals. It flushes bounded activity chunks rather than treating the lifetime of the player component as a listening session. Retry uses the same chunk identities, so repository writes can deduplicate repeated delivery.

There are still limits: browser termination can lose activity since the latest flush, and unavailable storage weakens recovery. The architecture makes those limits visible rather than implying that a browser callback is a durable native background service.

## Reading and listening need a real bridge

Connecting an ebook to an audiobook makes percentage-based thinking even more tempting. It is also where the shortcut becomes most misleading. Similar total lengths do not prove that a particular passage matches a particular recording, much less that both files are the same edition.

The alignment layer therefore works with explicit text locators, audio file identities, and timed segments. It validates segment identities and ordering before linked playback. A time falling between mapped segments returns no match. Leaving a gap is preferable to highlighting a sentence the system has no evidence for.

That is the design principle I keep returning to in Avid: store the position you actually know, preserve the identity it belongs to, and expose uncertainty where the evidence ends. The visible interaction can remain simple because the underlying contract is precise.
