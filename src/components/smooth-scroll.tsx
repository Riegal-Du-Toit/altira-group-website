"use client";

import { useEffect } from "react";
import Lenis from "lenis";

import {
  handleHashNavigation,
  isHashHref,
  setLenisInstance,
  updateAnchorOffsetVar,
} from "@/lib/scroll";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const LENIS_EASING = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));
const HASH_SETTLE_DELAY_MS = 180;

function waitForLayoutToSettle(callback: () => void) {
  let cancelled = false;
  let firstFrameId = 0;
  let secondFrameId = 0;
  let timeoutId = 0;

  const schedule = () => {
    if (cancelled) {
      return;
    }

    firstFrameId = window.requestAnimationFrame(() => {
      secondFrameId = window.requestAnimationFrame(() => {
        timeoutId = window.setTimeout(() => {
          if (!cancelled) {
            callback();
          }
        }, HASH_SETTLE_DELAY_MS);
      });
    });
  };

  if ("fonts" in document) {
    void (document as Document & { fonts?: FontFaceSet }).fonts?.ready.finally(schedule);
  } else {
    schedule();
  }

  return () => {
    cancelled = true;
    window.cancelAnimationFrame(firstFrameId);
    window.cancelAnimationFrame(secondFrameId);
    window.clearTimeout(timeoutId);
  };
}

export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const reducedMotionQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    const header = document.querySelector("[data-site-header]");
    const resizeObserver = new ResizeObserver(() => {
      updateAnchorOffsetVar();
      lenis?.resize();
    });
    let lenis: Lenis | null = null;
    let rafId = 0;
    let cancelInitialHashNavigation = () => {};

    updateAnchorOffsetVar();
    window.addEventListener("resize", updateAnchorOffsetVar, { passive: true });

    if (header instanceof HTMLElement) {
      resizeObserver.observe(header);
    }

    if (document.body instanceof HTMLElement) {
      resizeObserver.observe(document.body);
    }

    const handleAnchorClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const anchor = target.closest("a");

      if (!(anchor instanceof HTMLAnchorElement)) {
        return;
      }

      const href = anchor.getAttribute("href");

      if (!isHashHref(href) || anchor.target === "_blank" || anchor.hasAttribute("download")) {
        return;
      }

      const hash = href;

      if (!document.querySelector(hash)) {
        return;
      }

      event.preventDefault();
      handleHashNavigation(hash);
    };

    document.addEventListener("click", handleAnchorClick, true);

    if (reducedMotionQuery.matches) {
      return () => {
        document.removeEventListener("click", handleAnchorClick, true);
        resizeObserver.disconnect();
        window.removeEventListener("resize", updateAnchorOffsetVar);
      };
    }

    lenis = new Lenis({
      smoothWheel: true,
      duration: 1.15,
      wheelMultiplier: 0.9,
      easing: LENIS_EASING,
    });

    setLenisInstance(lenis);

    const raf = (time: number) => {
      lenis?.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };

    rafId = window.requestAnimationFrame(raf);

    const initialHash = window.location.hash;

    if (isHashHref(initialHash) && document.querySelector(initialHash)) {
      cancelInitialHashNavigation = waitForLayoutToSettle(() => {
        handleHashNavigation(initialHash, { updateHistory: false });
      });
    }

    const handlePopState = () => {
      const { hash } = window.location;

      if (!hash || hash === "#home") {
        lenis?.scrollTo(0, {
          duration: 1.1,
          immediate: false,
          easing: LENIS_EASING,
        });
        return;
      }

      handleHashNavigation(hash, { updateHistory: false });
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      setLenisInstance(null);
      cancelInitialHashNavigation();
      window.cancelAnimationFrame(rafId);
      lenis?.destroy();
      document.removeEventListener("click", handleAnchorClick, true);
      window.removeEventListener("popstate", handlePopState);
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateAnchorOffsetVar);
    };
  }, []);

  return null;
}
