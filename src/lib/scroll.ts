import Lenis from "lenis";

const LENIS_EASING = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));
const FALLBACK_HEADER_OFFSET = 96;
const HEADER_GAP = 20;

let lenisInstance: Lenis | null = null;

export function getHeaderOffset() {
  const header = document.querySelector("[data-site-header]");

  if (!(header instanceof HTMLElement)) {
    return FALLBACK_HEADER_OFFSET + HEADER_GAP;
  }

  return Math.round(header.getBoundingClientRect().height + HEADER_GAP);
}

export function updateAnchorOffsetVar() {
  document.documentElement.style.setProperty("--anchor-offset", `${getHeaderOffset()}px`);
}

export function setLenisInstance(instance: Lenis | null) {
  lenisInstance = instance;
}

export function getLenisInstance() {
  return lenisInstance;
}

export function isHashHref(href: string | null | undefined): href is string {
  return typeof href === "string" && href.startsWith("#") && href.length > 1;
}

function getScrollTargetTop(target: HTMLElement) {
  const top = window.scrollY + target.getBoundingClientRect().top - getHeaderOffset();
  return Math.max(0, Math.round(top));
}

function updateHistoryForHash(hash: string, updateHistory: boolean) {
  if (!updateHistory) {
    return;
  }

  if (window.location.hash !== hash) {
    window.history.pushState(null, "", hash);
  } else {
    window.history.replaceState(null, "", hash);
  }
}

export function scrollToHash(hash: string, options?: { updateHistory?: boolean }) {
  if (typeof window === "undefined") {
    return;
  }

  const target = document.querySelector(hash);

  if (!(target instanceof HTMLElement)) {
    return;
  }

  const updateHistory = options?.updateHistory ?? true;

  if (!lenisInstance) {
    window.scrollTo({ top: getScrollTargetTop(target), left: 0, behavior: "auto" });
    updateHistoryForHash(hash, updateHistory);
    return;
  }

  lenisInstance.scrollTo(target, {
    offset: -getHeaderOffset(),
    duration: 1.1,
    immediate: false,
    easing: LENIS_EASING,
    lock: false,
    onComplete: () => {
      updateHistoryForHash(hash, updateHistory);
    },
  });
}

export function scrollToTop(options?: { updateHistory?: boolean }) {
  if (typeof window === "undefined") {
    return;
  }

  const updateHistory = options?.updateHistory ?? true;

  if (!lenisInstance) {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    updateHistoryForHash("#home", updateHistory);
    return;
  }

  lenisInstance.scrollTo(0, {
    duration: 1.1,
    immediate: false,
    easing: LENIS_EASING,
    onComplete: () => {
      updateHistoryForHash("#home", updateHistory);
    },
  });
}

export function handleHashNavigation(hash: string, options?: { updateHistory?: boolean }) {
  if (hash === "#home") {
    scrollToTop(options);
    return;
  }

  scrollToHash(hash, options);
}
