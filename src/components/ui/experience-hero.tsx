"use client";

import React from "react";

import { cn } from "@/lib/utils";

export function ExperienceHeroText({
  className,
  title = (
    <>
      <span className="block whitespace-nowrap">A NEW WAY</span>
      <span
        className="block whitespace-nowrap text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.92)] [text-stroke:1.5px_rgba(255,255,255,0.92)]"
        style={{
          textShadow:
            "0 0 24px rgba(255,255,255,0.08), 0 0 48px rgba(255,255,255,0.04)",
        }}
      >
        TO BUILD
      </span>
    </>
  ),
}: {
  className?: string;
  title?: React.ReactNode;
}) {
  return (
    <div className={cn("w-full", className)}>
      <h1 className="space-y-1 text-[clamp(calc(2.8rem+10px),calc(5.8vw+10px),calc(6.9rem+10px))] font-black leading-[0.9] tracking-[-0.075em] text-white uppercase">
        {title}
      </h1>
    </div>
  );
}
