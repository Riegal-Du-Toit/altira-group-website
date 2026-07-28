"use client";

import { useEffect, useState } from "react";

import { SterlingGateKineticNavigation } from "@/components/ui/sterling-gate-kinetic-navigation";
import { cn } from "@/lib/utils";

function HeaderPillButton({
  href,
  label,
  compact,
}: {
  href: string;
  label: string;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-[16px] bg-gradient-to-b from-gray-800/40 to-transparent p-[4px] transition-all duration-500",
        compact && "rounded-[13px] p-[3px]",
      )}
    >
      <a
        href={href}
        className={cn(
          "group block rounded-[12px] bg-gradient-to-b from-gray-700 to-gray-600 p-[4px] shadow-[0_2px_4px_rgba(0,0,0,0.7)] transition-all duration-500 hover:shadow-[0_4px_8px_rgba(0,0,0,0.6)] active:scale-[0.995] active:shadow-[0_0px_1px_rgba(0,0,0,0.8)]",
          compact && "rounded-[9px] p-[3px]",
        )}
      >
        <div
          className={cn(
            "rounded-[8px] bg-gradient-to-b from-gray-600 to-gray-700 px-4 py-3 transition-all duration-500",
            compact && "px-3 py-2.5",
          )}
        >
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition-all duration-500",
                compact && "text-[10px]",
              )}
            >
              {label}
            </span>
          </div>
        </div>
      </a>
    </div>
  );
}

export function SiteHeader() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsSticky(window.scrollY > 48);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 text-white">
      <div
        className={cn(
          "mx-auto transition-all duration-500 ease-out",
          isSticky ? "max-w-[1280px] px-4 pt-3" : "max-w-full px-0 pt-0",
        )}
      >
        <div
          className={cn(
            "mx-auto grid items-center transition-all duration-500 ease-out",
            isSticky
              ? "max-w-[1180px] grid-cols-[1fr_auto_1fr] rounded-[9px] bg-[#252729]/92 px-6 py-3 shadow-[0_14px_40px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:px-7"
              : "max-w-7xl grid-cols-[1fr_auto_1fr] px-6 py-4 sm:px-8 lg:px-12",
          )}
        >
          <nav
            className={cn(
              "hidden items-center justify-self-start text-[11px] font-semibold uppercase tracking-[0.16em] text-white/78 lg:flex",
              isSticky ? "gap-5" : "gap-7",
            )}
          >
            <a className="transition hover:text-white" href="#home">
              Home
            </a>
            <a className="transition hover:text-white" href="#products">
              Products
            </a>
            <a className="transition hover:text-white" href="#method">
              Method
            </a>
          </nav>

          <a
            href="#home"
            className={cn(
              "justify-self-center font-black uppercase tracking-[-0.04em] text-white transition-all duration-500",
              isSticky ? "text-[2rem]" : "text-2xl",
            )}
          >
            ALTIRA GROUP
          </a>

          <div
            className={cn(
              "flex items-center justify-self-end transition-all duration-500",
              isSticky ? "gap-2.5" : "gap-3",
            )}
          >
            <nav
              className={cn(
                "hidden items-center text-[11px] font-semibold uppercase tracking-[0.16em] text-white/78 lg:flex",
                isSticky ? "gap-5" : "gap-7",
              )}
            >
              <a className="transition hover:text-white" href="#offices">
                Cities
              </a>
              <a className="transition hover:text-white" href="#why">
                Why Altira Group
              </a>
            </nav>

            <div className="hidden lg:block">
              <HeaderPillButton href="#contact" label="Contact us" compact={isSticky} />
            </div>
            <SterlingGateKineticNavigation />
          </div>
        </div>
      </div>
    </header>
  );
}
