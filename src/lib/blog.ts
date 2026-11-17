import type { CollectionEntry } from "astro:content";
import { IS_DEPLOY_PREVIEW } from "./deployment";

/** Drafts are reviewable locally and on PR previews, and stay off the live site. */
export function isBlogPostVisible(post: CollectionEntry<"blog">): boolean {
  return import.meta.env.DEV || IS_DEPLOY_PREVIEW || !post.data.draft;
}
