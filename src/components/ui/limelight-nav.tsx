"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type LimelightNavItem = {
  id: string;
  label: string;
  href: string;
};

type LimelightNavProps = {
  items: LimelightNavItem[];
  activeId: string;
  className?: string;
  itemClassName?: string;
};

export function LimelightNav({ items, activeId, className, itemClassName }: LimelightNavProps) {
  const [isReady, setIsReady] = useState(false);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const limelightRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const index = items.findIndex((item) => item.id === activeId);
    const limelight = limelightRef.current;
    const activeItem = itemRefs.current[index];
    if (!limelight || !activeItem) return;

    limelight.style.left = `${activeItem.offsetLeft + activeItem.offsetWidth / 2 - limelight.offsetWidth / 2}px`;
    const frame = window.requestAnimationFrame(() => setIsReady(true));
    return () => window.cancelAnimationFrame(frame);
  }, [activeId, items]);

  return (
    <nav aria-label="Primary navigation" className={cn("relative inline-flex h-16 items-center", className)}>
      {items.map((item, index) => (
        <a
          key={item.id}
          ref={(element) => { itemRefs.current[index] = element; }}
          href={item.href}
          aria-current={item.id === activeId ? "page" : undefined}
          className={cn(
            "relative z-20 flex h-full items-center justify-center text-[13px] font-light text-[#2E2E38] transition-colors hover:text-[#2E2E38]",
            itemClassName,
          )}
        >
          {item.label}
        </a>
      ))}
      <div
        ref={limelightRef}
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute top-0 z-10 h-[5px] w-11 rounded-full bg-[#37D8C6] shadow-[0_24px_15px_rgba(55,216,198,0.72)]",
          isReady && "transition-[left] duration-400 ease-in-out",
        )}
        style={{ left: "-999px" }}
      >
        <div className="pointer-events-none absolute left-[-30%] top-[5px] h-14 w-[160%] bg-[linear-gradient(180deg,rgba(55,216,198,0.32),transparent)] [clip-path:polygon(5%_100%,25%_0,75%_0,95%_100%)]" />
      </div>
    </nav>
  );
}
