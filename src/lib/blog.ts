import type { CollectionEntry } from "astro:content";

/** Drafts are available for local review, and excluded from production pages. */
export function isBlogPostVisible(post: CollectionEntry<"blog">): boolean {
  return import.meta.env.DEV || !post.data.draft;
}
