"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

import { NAV_ITEMS } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { MenuToggleIcon } from "@/components/ui/menu-toggle-icon";

if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase);
}

const menuItems = NAV_ITEMS.map((item, index) => ({
  ...item,
  shape: `${(index % 5) + 1}`,
}));

export function SterlingGateKineticNavigation({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const navWrapRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [closeIconOpen, setCloseIconOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const animationRef = useRef<{
    navWrap: HTMLElement;
    menu: HTMLElement;
    overlay: HTMLElement;
    bgPanels: HTMLElement[];
    navLinks: HTMLElement[];
    fadeTargets: HTMLElement[];
  } | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    try {
      if (!gsap.parseEase("main")) {
        CustomEase.create("main", "0.65, 0.01, 0.05, 0.99");
        gsap.defaults({ ease: "main", duration: 0.7 });
      }
    } catch {
      gsap.defaults({ ease: "power2.out", duration: 0.7 });
    }

    const ctx = gsap.context(() => {
      const items = containerRef.current?.querySelectorAll(".menu-list-item[data-shape]");
      const shapesContainer = containerRef.current?.querySelector(".ambient-background-shapes");

      items?.forEach((item) => {
        const shapeIndex = item.getAttribute("data-shape");
        const shape = shapesContainer?.querySelector(`.bg-shape-${shapeIndex}`);
        if (!shape) return;

        const shapeEls = shape.querySelectorAll(".shape-element");

        const onEnter = () => {
          shapesContainer?.querySelectorAll(".bg-shape").forEach((s) => s.classList.remove("active"));
          shape.classList.add("active");

          gsap.fromTo(
            shapeEls,
            { scale: 0.5, opacity: 0, rotation: -10 },
            {
              scale: 1,
              opacity: 1,
              rotation: 0,
              duration: 0.6,
              stagger: 0.08,
              ease: "back.out(1.7)",
              overwrite: "auto",
            },
          );
        };

        const onLeave = () => {
          gsap.to(shapeEls, {
            scale: 0.8,
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
            overwrite: "auto",
            onComplete: () => shape.classList.remove("active"),
          });
        };

        item.addEventListener("mouseenter", onEnter);
        item.addEventListener("mouseleave", onLeave);

        (item as HTMLElement & { _cleanup?: () => void })._cleanup = () => {
          item.removeEventListener("mouseenter", onEnter);
          item.removeEventListener("mouseleave", onLeave);
        };
      });
    }, containerRef);

    return () => {
      ctx.revert();
      const items = containerRef.current?.querySelectorAll(".menu-list-item[data-shape]");
      items?.forEach((item) => {
        (item as HTMLElement & { _cleanup?: () => void })._cleanup?.();
      });
    };
  }, []);

  useEffect(() => {
    if (!navWrapRef.current || !menuRef.current || !overlayRef.current) return;

    const navWrap = navWrapRef.current;
    const menu = menuRef.current;
    const overlay = overlayRef.current;
    const bgPanels = Array.from(navWrap.querySelectorAll(".backdrop-layer")) as HTMLElement[];
    const navLinks = Array.from(navWrap.querySelectorAll(".nav-link")) as HTMLElement[];
    const fadeTargets = Array.from(navWrap.querySelectorAll("[data-menu-fade]")) as HTMLElement[];
    if (!bgPanels.length) {
      return;
    }

    animationRef.current = {
      navWrap,
      menu,
      overlay,
      bgPanels,
      navLinks,
      fadeTargets,
    };

    gsap.set(navWrap, { display: "none" });
    gsap.set(overlay, { autoAlpha: 0 });
    gsap.set(menu, { xPercent: 24, autoAlpha: 0 });
    gsap.set(bgPanels, { xPercent: 101 });
    gsap.set(navLinks, { yPercent: 140, rotate: 10, autoAlpha: 0 });
    gsap.set(fadeTargets, { autoAlpha: 0, yPercent: 50 });

    return () => {
      animationRef.current = null;
    };
  }, [isMounted]);

  useEffect(() => {
    const parts = animationRef.current;
    if (!parts) return;

    const {
      navWrap,
      menu,
      overlay,
      bgPanels,
      navLinks,
      fadeTargets,
    } = parts;

    gsap.killTweensOf([navWrap, menu, overlay, ...bgPanels, ...navLinks, ...fadeTargets]);

    const tl = gsap.timeline();

    if (isMenuOpen) {
      navWrap.setAttribute("data-nav", "open");

      tl.set(navWrap, { display: "block" })
        .to(overlay, { autoAlpha: 1, duration: 0.35 }, 0)
        .to(bgPanels, { xPercent: 0, stagger: 0.12, duration: 0.575 }, 0)
        .to(menu, { xPercent: 0, autoAlpha: 1, duration: 0.55 }, 0.1)
        .to(navLinks, { yPercent: 0, rotate: 0, autoAlpha: 1, stagger: 0.05 }, 0.25);

      if (fadeTargets.length) {
        tl.to(
          fadeTargets,
          { autoAlpha: 1, yPercent: 0, stagger: 0.04, clearProps: "all" },
          0.4,
        );
      }
    } else {
      navWrap.setAttribute("data-nav", "closed");

      tl.to(
        fadeTargets,
        {
          autoAlpha: 0,
          yPercent: 60,
          stagger: { each: 0.05, from: "end" },
          duration: 0.28,
        },
        0,
      )
        .to(
          navLinks,
          {
            yPercent: 165,
            rotate: 12,
            autoAlpha: 0,
            stagger: { each: 0.07, from: "end" },
            duration: 0.42,
          },
          0.08,
        )
        .to(
          menu,
          {
            xPercent: 24,
            autoAlpha: 0,
            duration: 0.5,
          },
          0.64,
        )
        .to(
          bgPanels,
          {
            xPercent: 101,
            stagger: { each: 0.12, from: "start" },
            duration: 0.56,
          },
          0.7,
        )
        .to(overlay, { autoAlpha: 0, duration: 0.4 }, 0.98)
        .set(navWrap, { display: "none" });
    }
  }, [isMenuOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) setIsMenuOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) {
      setCloseIconOpen(false);
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      setCloseIconOpen(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [isMenuOpen]);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <button
        type="button"
        suppressHydrationWarning
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((prev) => !prev)}
        className="nav-close-btn group relative inline-flex text-white transition"
      >
        <span className="sr-only">{isMenuOpen ? "Close menu" : "Open menu"}</span>
        <span className="rounded-[12px] bg-gradient-to-b from-gray-800/40 to-transparent p-[2px]">
          <span className="block rounded-[9px] bg-gradient-to-b from-gray-700 to-gray-600 p-[2px] shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
            <span className="flex h-10 w-10 items-center justify-center rounded-[6px] bg-gradient-to-b from-gray-600 to-gray-700">
              <MenuToggleIcon open={isMenuOpen} className="h-5.5 w-5.5" duration={500} />
            </span>
          </span>
        </span>
      </button>

      {isMounted
        ? createPortal(
            <section className="fullscreen-menu-container">
              <div
                ref={navWrapRef}
                data-nav="closed"
                className="nav-overlay-wrapper fixed inset-0 z-[90] hidden overflow-hidden"
              >
                <div
                  ref={overlayRef}
                  className="overlay absolute inset-0 bg-black/45 backdrop-blur-sm"
                  onClick={() => setIsMenuOpen(false)}
                />

                <nav
                  ref={menuRef}
                  className="menu-content fixed inset-y-0 right-0 h-screen min-h-screen w-full max-w-[620px] overflow-hidden border-l border-white/10 bg-[#0a0b11] text-white md:max-w-[680px]"
                >
                  <div className="menu-bg absolute inset-0">
                    <div className="backdrop-layer first absolute inset-y-0 right-0 w-full bg-[#0b0d15]" />
                    <div className="backdrop-layer second absolute inset-y-0 right-0 w-[88%] bg-[#101321]" />
                    <div className="backdrop-layer absolute inset-y-0 right-0 w-[76%] bg-[#13182b]" />

                    <div className="ambient-background-shapes pointer-events-none absolute inset-0 overflow-hidden">
                      <svg className="bg-shape bg-shape-1 absolute inset-0 h-full w-full opacity-0 transition-opacity duration-300 [&.active]:opacity-100" viewBox="0 0 400 400" fill="none">
                        <circle className="shape-element" cx="80" cy="120" r="40" fill="rgba(99,102,241,0.15)" />
                        <circle className="shape-element" cx="300" cy="80" r="60" fill="rgba(139,92,246,0.12)" />
                        <circle className="shape-element" cx="200" cy="300" r="80" fill="rgba(236,72,153,0.1)" />
                        <circle className="shape-element" cx="350" cy="280" r="30" fill="rgba(99,102,241,0.15)" />
                      </svg>
                      <svg className="bg-shape bg-shape-2 absolute inset-0 h-full w-full opacity-0 transition-opacity duration-300 [&.active]:opacity-100" viewBox="0 0 400 400" fill="none">
                        <path className="shape-element" d="M0 200 Q100 100, 200 200 T 400 200" stroke="rgba(99,102,241,0.2)" strokeWidth="60" fill="none" />
                        <path className="shape-element" d="M0 280 Q100 180, 200 280 T 400 280" stroke="rgba(139,92,246,0.15)" strokeWidth="40" fill="none" />
                      </svg>
                      <svg className="bg-shape bg-shape-3 absolute inset-0 h-full w-full opacity-0 transition-opacity duration-300 [&.active]:opacity-100" viewBox="0 0 400 400" fill="none">
                        <circle className="shape-element" cx="50" cy="50" r="8" fill="rgba(99,102,241,0.3)" />
                        <circle className="shape-element" cx="150" cy="50" r="8" fill="rgba(139,92,246,0.3)" />
                        <circle className="shape-element" cx="250" cy="50" r="8" fill="rgba(236,72,153,0.3)" />
                        <circle className="shape-element" cx="350" cy="50" r="8" fill="rgba(99,102,241,0.3)" />
                        <circle className="shape-element" cx="100" cy="150" r="12" fill="rgba(139,92,246,0.25)" />
                        <circle className="shape-element" cx="200" cy="150" r="12" fill="rgba(236,72,153,0.25)" />
                        <circle className="shape-element" cx="300" cy="150" r="12" fill="rgba(99,102,241,0.25)" />
                        <circle className="shape-element" cx="50" cy="250" r="10" fill="rgba(236,72,153,0.3)" />
                        <circle className="shape-element" cx="150" cy="250" r="10" fill="rgba(99,102,241,0.3)" />
                        <circle className="shape-element" cx="250" cy="250" r="10" fill="rgba(139,92,246,0.3)" />
                        <circle className="shape-element" cx="350" cy="250" r="10" fill="rgba(236,72,153,0.3)" />
                        <circle className="shape-element" cx="100" cy="350" r="6" fill="rgba(99,102,241,0.3)" />
                        <circle className="shape-element" cx="200" cy="350" r="6" fill="rgba(139,92,246,0.3)" />
                        <circle className="shape-element" cx="300" cy="350" r="6" fill="rgba(236,72,153,0.3)" />
                      </svg>
                      <svg className="bg-shape bg-shape-4 absolute inset-0 h-full w-full opacity-0 transition-opacity duration-300 [&.active]:opacity-100" viewBox="0 0 400 400" fill="none">
                        <path className="shape-element" d="M100 100 Q150 50, 200 100 Q250 150, 200 200 Q150 250, 100 200 Q50 150, 100 100" fill="rgba(99,102,241,0.12)" />
                        <path className="shape-element" d="M250 200 Q300 150, 350 200 Q400 250, 350 300 Q300 350, 250 300 Q200 250, 250 200" fill="rgba(236,72,153,0.1)" />
                      </svg>
                      <svg className="bg-shape bg-shape-5 absolute inset-0 h-full w-full opacity-0 transition-opacity duration-300 [&.active]:opacity-100" viewBox="0 0 400 400" fill="none">
                        <line className="shape-element" x1="0" y1="100" x2="300" y2="400" stroke="rgba(99,102,241,0.15)" strokeWidth="30" />
                        <line className="shape-element" x1="100" y1="0" x2="400" y2="300" stroke="rgba(139,92,246,0.12)" strokeWidth="25" />
                        <line className="shape-element" x1="200" y1="0" x2="400" y2="200" stroke="rgba(236,72,153,0.1)" strokeWidth="20" />
                      </svg>
                    </div>
                  </div>

                  <div className="menu-content-wrapper relative z-10 grid h-screen min-h-screen grid-rows-[auto_1fr_auto] px-6 py-6 sm:px-8 sm:py-8">
                    <div className="flex items-center justify-between">
                      <div className="text-[1.275rem] font-black uppercase tracking-[-0.04em] text-white/72">
                        Navigation
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsMenuOpen(false)}
                        aria-label="Close menu"
                        className="inline-flex text-white transition"
                      >
                        <span className="rounded-[12px] bg-gradient-to-b from-gray-800/40 to-transparent p-[2px]">
                          <span className="block rounded-[9px] bg-gradient-to-b from-gray-700 to-gray-600 p-[2px] shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
                            <span className="flex h-10 w-10 items-center justify-center rounded-[6px] bg-gradient-to-b from-gray-600 to-gray-700">
                              <MenuToggleIcon open={closeIconOpen} className="h-6 w-6" duration={500} />
                            </span>
                          </span>
                        </span>
                      </button>
                    </div>

                    <div className="flex min-h-0 items-center overflow-hidden py-4">
                      <ul className="menu-list w-full space-y-2 overflow-hidden pr-2">
                        {menuItems.map((item) => (
                          <li key={item.label} className="menu-list-item" data-shape={item.shape}>
                            <a
                              href={item.href}
                              onClick={() => setIsMenuOpen(false)}
                              className="nav-link group relative inline-flex w-full overflow-hidden px-4 py-5 text-left sm:px-6"
                            >
                              <p className="nav-link-text relative inline-block text-[2rem] font-semibold leading-none tracking-[-0.04em] text-white sm:text-[3.15rem]">
                                {item.label}
                                <span className="absolute -bottom-2 left-0 h-[3px] w-full origin-left scale-x-0 bg-white/92 transition-transform duration-300 ease-out group-hover:scale-x-100" />
                              </p>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid gap-2 text-sm text-white/55 sm:grid-cols-2">
                      <div
                        data-menu-fade
                        className="rounded-[16px] bg-gradient-to-b from-gray-800/40 to-transparent p-[4px]"
                      >
                        <div className="rounded-[12px] bg-gradient-to-b from-gray-700 to-gray-600 p-[4px] shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
                          <div className="rounded-[8px] bg-gradient-to-b from-gray-600 to-gray-700 p-3">
                            <div className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-white/55">
                              Entity
                            </div>
                            <div className="mt-2 font-medium text-white">Altira Group (Pty) Ltd</div>
                          </div>
                        </div>
                      </div>
                      <div
                        data-menu-fade
                        className="rounded-[16px] bg-gradient-to-b from-gray-800/40 to-transparent p-[4px]"
                      >
                        <div className="rounded-[12px] bg-gradient-to-b from-gray-700 to-gray-600 p-[4px] shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
                          <div className="rounded-[8px] bg-gradient-to-b from-gray-600 to-gray-700 p-3">
                            <div className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-white/55">
                              Contact
                            </div>
                            <div className="mt-2 font-medium text-white">info@altiragroup.co.za</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </nav>
              </div>
            </section>,
            document.body,
          )
        : null}
    </div>
  );
}
