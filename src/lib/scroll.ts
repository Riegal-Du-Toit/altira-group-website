import Lenis from "lenis";

const LENIS_EASING = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));
const FALLBACK_HEADER_OFFSET = 96;
const HEADER_GAP = 20;

let lenisInstance: Lenis | null = null;
const DEBUG_ANCHORS = process.env.NODE_ENV === "development";

export function getHeaderOffset() {
  const header = document.querySelector("[data-site-header]");

  if (!(header instanceof HTMLElement)) {
    return FALLBACK_HEADER_OFFSET + HEADER_GAP;
  }

  const customOffset = Number(header.dataset.anchorOffset);
  if (Number.isFinite(customOffset)) {
    return customOffset;
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
  const sectionOffset = Number(target.dataset.anchorScrollOffset);
  const offset = Number.isFinite(sectionOffset) ? sectionOffset : getHeaderOffset();
  const top = window.scrollY + target.getBoundingClientRect().top - offset;
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

  const targetTop = getScrollTargetTop(target);
  if (DEBUG_ANCHORS) {
    console.info("[anchor] target resolved", { hash, currentY: window.scrollY, targetTop, lenis: lenisInstance });
  }

  if (!lenisInstance) {
    console.error("[anchor] Lenis unavailable; native navigation blocked", { hash });
    return;
  }

  if (DEBUG_ANCHORS) {
    const startedAt = performance.now();
    let frameId = 0;
    const monitor = () => {
      const elapsed = performance.now() - startedAt;
      if (elapsed < 160 && Math.abs(window.scrollY - targetTop) < 2) {
        console.warn("[anchor] immediate target scroll detected", { hash, elapsed, currentY: window.scrollY, targetTop });
      }
    };
    const logFrame = () => {
      const elapsed = performance.now() - startedAt;
      if (elapsed <= 500) {
        console.info("[anchor] animation frame", {
          hash,
          elapsed: Math.round(elapsed),
          windowScrollY: window.scrollY,
          animatedScroll: lenisInstance?.animatedScroll,
          targetScroll: lenisInstance?.targetScroll,
        });
        frameId = window.requestAnimationFrame(logFrame);
      }
    };
    window.addEventListener("scroll", monitor, { passive: true });
    window.setTimeout(() => {
      window.removeEventListener("scroll", monitor);
      window.cancelAnimationFrame(frameId);
    }, 1300);
    console.info("[anchor] lenis.scrollTo", {
      hash,
      currentY: window.scrollY,
      targetTop,
      animatedScroll: lenisInstance.animatedScroll,
      targetScroll: lenisInstance.targetScroll,
      duration: 1.1,
    });
    frameId = window.requestAnimationFrame(logFrame);
  }

  lenisInstance.scrollTo(targetTop, {
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
    if (DEBUG_ANCHORS) {
      console.error("[anchor] Lenis unavailable; native home navigation blocked");
    }
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
