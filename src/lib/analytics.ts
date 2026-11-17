export function analyticsPath(value: string, origin: string): string {
  try {
    return new URL(value, origin).pathname;
  } catch {
    return "/";
  }
}

export function analyticsReferrer(value: string, origin: string): string {
  if (!value) return "";
  try {
    const referrer = new URL(value, origin);
    if (!/^https?:$/.test(referrer.protocol)) return "";
    return referrer.origin === origin ? `${origin}${referrer.pathname}` : referrer.origin;
  } catch {
    return "";
  }
}

export function isValidTrackerUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password && !url.search && !url.hash;
  } catch {
    return false;
  }
}
