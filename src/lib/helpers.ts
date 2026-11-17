export function isNewPost(pubDate: Date): boolean {
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
  return pubDate >= threeMonthsAgo;
}

export function getBadges(pubDate: Date, customBadges?: string[]): string[] {
  const badges = [...(customBadges || [])];
  if (isNewPost(pubDate)) {
    badges.unshift("New");
  }
  return badges;
}

export function getBadgeClass(badgeText: string): string {
  if (badgeText === "New") {
    return "badge badge-primary";
  }
  return "badge badge-success";
}

/** Date-only frontmatter is parsed as UTC; keep its calendar day in every timezone. */
export function formatPublicationDate(pubDate: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(pubDate);
}
