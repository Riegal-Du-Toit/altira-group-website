"use client";

import React from "react";

import { cn } from "@/lib/utils";

export function ExperienceHeroText({
  className,
  title = (
    <>
      <span className="block whitespace-nowrap">With you,</span>
      <span
        className="landing-accent block whitespace-nowrap"
        style={{
          textShadow:
            "0 0 24px rgba(63,233,236,0.08), 0 0 48px rgba(63,233,236,0.04)",
        }}
      >
        at every turn.
      </span>
    </>
  ),
}: {
  className?: string;
  title?: React.ReactNode;
}) {
  return (
    <div className={cn("w-full", className)}>
      <h1 className="landing-display space-y-1 text-[clamp(calc(2.8rem+5px),calc(5.8vw+5px),calc(6.9rem+5px))] text-white uppercase">
        {title}
      </h1>
    </div>
  );
}
