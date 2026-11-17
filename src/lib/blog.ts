import type { CollectionEntry } from "astro:content";
import { IS_DEPLOY_PREVIEW } from "./deployment";

/** Drafts are reviewable locally and on PR previews, and stay off the live site. */
export function isBlogPostVisible(post: CollectionEntry<"blog">): boolean {
  return import.meta.env.DEV || IS_DEPLOY_PREVIEW || !post.data.draft;
}

/** Keep publication order; order articles released together by their assigned article date. */
export function compareBlogPosts(first: CollectionEntry<"blog">, second: CollectionEntry<"blog">): number {
  return second.data.pubDate.valueOf() - first.data.pubDate.valueOf()
    || (second.data.editorialDate || second.data.pubDate).valueOf()
      - (first.data.editorialDate || first.data.pubDate).valueOf();
}
