import { ANALYTICS_HOSTS, ANALYTICS_OPT_OUT_KEY } from "../config";
import { analyticsPath, analyticsReferrer } from "../lib/analytics";

type Payload = Record<string, unknown>;
type Tracker = { track: (payload: (defaults: Payload) => Payload) => Promise<unknown> | undefined };

declare global {
  interface Window {
    umami?: Tracker;
    crypticsoulBeforeSend?: (type: string, payload: Payload) => Payload | false;
  }
}

let trackerLoading: Promise<boolean> | undefined;
let lastPath = "";
let previousPage = document.referrer;
let activeSeconds = 0;
let lastTick = performance.now();
let progressSent = new Set<number>();
let engagementSent = false;
let pageReady = false;
let pendingPath = "";
let pageGeneration = 0;

function config(): HTMLElement | null {
  return document.getElementById("analytics-config");
}

function browserOptOut(): boolean {
  const legacyNavigator = navigator as Navigator & { msDoNotTrack?: string; globalPrivacyControl?: boolean };
  const legacyWindow = window as Window & { doNotTrack?: string };
  return [navigator.doNotTrack, legacyNavigator.msDoNotTrack, legacyWindow.doNotTrack]
    .some((signal) => ["1", "yes"].includes(String(signal).toLowerCase()))
    || legacyNavigator.globalPrivacyControl === true;
}

function storedOptOut(): boolean {
  try {
    return Boolean(localStorage.getItem(ANALYTICS_OPT_OUT_KEY));
  } catch {
    // If preferences cannot be read, leave collection off.
    return true;
  }
}

function eligible(): boolean {
  return config()?.dataset.enabled === "true" && ANALYTICS_HOSTS.includes(location.hostname);
}

function allowed(): boolean {
  return eligible() && !browserOptOut() && !storedOptOut();
}

function updateControls(): void {
  const status = document.querySelector<HTMLElement>("[data-analytics-status]");
  const toggle = document.querySelector<HTMLButtonElement>("[data-analytics-toggle]");
  if (status) {
    status.textContent = !eligible() ? "Analytics is off in this preview or has not been configured."
      : browserOptOut() ? "Your browser's privacy preference keeps analytics off."
      : storedOptOut() ? "Analytics is off for this browser."
      : "Cookieless analytics is on for this browser.";
  }
  if (toggle) {
    toggle.hidden = !eligible() || browserOptOut();
    toggle.textContent = storedOptOut() ? "Allow analytics in this browser" : "Turn off analytics in this browser";
  }
}

// A final gate covers both our calls and anything a loaded tracker tries to send.
window.crypticsoulBeforeSend = (_type, payload) => {
  if (!allowed()) return false;
  return {
    ...payload,
    url: analyticsPath(String(payload.url || location.pathname), location.origin),
    referrer: analyticsReferrer(String(payload.referrer || ""), location.origin),
  };
};

function loadTracker(): Promise<boolean> {
  if (!allowed()) return Promise.resolve(false);
  if (window.umami) return Promise.resolve(true);
  if (trackerLoading) return trackerLoading;
  trackerLoading = new Promise((resolve) => {
    const element = document.createElement("script");
    element.id = "umami-tracker";
    element.src = config()!.dataset.scriptUrl!;
    element.async = true;
    element.dataset.websiteId = config()!.dataset.websiteId!;
    // Own pageview timing so Astro navigation cannot double-count a view.
    element.dataset.autoTrack = "false";
    element.dataset.domains = ANALYTICS_HOSTS.join(",");
    element.dataset.excludeSearch = "true";
    element.dataset.excludeHash = "true";
    element.dataset.doNotTrack = "true";
    element.dataset.beforeSend = "crypticsoulBeforeSend";
    element.referrerPolicy = "no-referrer";
    element.onload = () => resolve(Boolean(window.umami));
    element.onerror = () => { element.remove(); trackerLoading = undefined; resolve(false); };
    document.head.append(element);
  });
  return trackerLoading;
}

function send(name?: string, data?: Payload): void {
  if (!allowed() || !window.umami || !pageReady) return;
  try {
    const result = window.umami.track((defaults) => ({
      ...defaults,
      url: location.pathname,
      title: document.title,
      referrer: analyticsReferrer(previousPage, location.origin),
      ...(name ? { name, ...(data ? { data } : {}) } : {}),
    }));
    result?.catch(() => {});
  } catch {
    // Analytics must never interrupt reading, downloads, or navigation.
  }
}

async function startPage(): Promise<void> {
  updateControls();
  if ((lastPath === location.pathname && pageReady) || pendingPath === location.pathname) return;
  const pagePath = location.pathname;
  const generation = ++pageGeneration;
  pendingPath = pagePath;
  pageReady = false;
  activeSeconds = 0;
  lastTick = performance.now();
  progressSent = new Set();
  engagementSent = false;
  const loaded = allowed() && await loadTracker();
  if (generation !== pageGeneration) return;
  pendingPath = "";
  if (!loaded || location.pathname !== pagePath || !allowed()) return;
  previousPage = lastPath ? new URL(lastPath, location.origin).href : document.referrer;
  lastPath = pagePath;
  pageReady = true;
  send();
}

function trackProgress(): void {
  if (!pageReady || !allowed() || document.visibilityState !== "visible") return;
  const article = document.querySelector<HTMLElement>("[data-blog-article]");
  if (!article) return;
  const bounds = article.getBoundingClientRect();
  // Article-relative progress avoids counting footer/sidebar height as reading.
  const progress = Math.min(100, Math.max(0, ((innerHeight - bounds.top) / bounds.height) * 100));
  for (const threshold of [25, 50, 75, 90]) {
    if (progress >= threshold && !progressSent.has(threshold)) {
      progressSent.add(threshold);
      send("article_progress", { percent: threshold });
    }
  }
}

function recordActivity(): void {
  const now = performance.now();
  const elapsed = Math.min((now - lastTick) / 1000, 2);
  lastTick = now;
  if (!pageReady || !allowed() || document.visibilityState !== "visible" || !document.hasFocus()
    || !document.querySelector("[data-blog-article]")) return;
  activeSeconds += elapsed;
  if (activeSeconds >= 60 && !engagementSent) {
    engagementSent = true;
    send("article_engaged", { seconds: 60 });
  }
}

function trackClick(event: MouseEvent): void {
  const target = event.target instanceof Element ? event.target : null;
  if (target?.closest("[data-analytics-toggle]")) {
    const disabling = !storedOptOut();
    try {
      if (disabling) localStorage.setItem(ANALYTICS_OPT_OUT_KEY, "1");
      else localStorage.removeItem(ANALYTICS_OPT_OUT_KEY);
    } catch { return; }
    updateControls();
    if (!disabling) void startPage();
    return;
  }
  const link = target?.closest<HTMLAnchorElement>("a[href]");
  if (!link || !allowed()) return;
  const destination = new URL(link.href, location.href);
  if (destination.protocol === "mailto:" || destination.protocol === "tel:") {
    send("contact_click", { method: destination.protocol === "mailto:" ? "email" : "phone" });
  } else if (destination.origin === location.origin && destination.pathname === "/Shyam-Padia-Resume.pdf") {
    send("resume_download");
  } else if (destination.pathname === "/projects" && destination.origin === location.origin
    && /^#[a-z0-9_-]+$/.test(destination.hash)) {
    send("project_click", { project: destination.hash.slice(1) });
  } else if (link.closest("article[id]") && destination.origin !== location.origin) {
    send("project_click", { project: link.closest("article[id]")!.id });
  } else if (/^https?:$/.test(destination.protocol) && destination.origin !== location.origin) {
    send("outbound_click", { destination: destination.hostname });
  }
}

// Capture before Astro's router starts navigation and clears the current page.
document.addEventListener("click", trackClick, { capture: true });
document.addEventListener("astro:before-preparation", () => {
  pageReady = false;
  pendingPath = "";
  pageGeneration++;
});
document.addEventListener("astro:page-load", () => void startPage());
window.addEventListener("scroll", trackProgress, { passive: true });
window.addEventListener("storage", (event) => {
  if (event.key === ANALYTICS_OPT_OUT_KEY || event.key === null) {
    updateControls();
    if (allowed()) void startPage();
  }
});
setInterval(recordActivity, 1000);
void startPage();
