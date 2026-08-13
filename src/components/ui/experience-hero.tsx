"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

export function ExperienceHeroText({
  className,
  titleTop = "Proprietary",
  titleBottom = "Technology",
  subheading = "powered by Altira's orbit engine",
  supporting = "with you at every turn",
  ctaLabel = "Join the experience",
  ctaHref = "#app-experience",
}: {
  className?: string;
  titleTop?: string;
  titleBottom?: string;
  subheading?: string;
  supporting?: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <div className={cn("w-full", className)}>
      <div className="mt-0">
        <h1 className="font-black uppercase leading-[0.88] tracking-[-0.07em] text-white">
          <span className="block text-[clamp(1.92rem,3.84vw,4.2rem)]">{titleTop}</span>
          <span className="mt-1 block text-[clamp(1.92rem,3.84vw,4.2rem)] text-transparent [-webkit-text-stroke:1.8px_rgba(63,233,236,0.82)] drop-shadow-[0_0_18px_rgba(63,233,236,0.2)]">
            {titleBottom}
          </span>
        </h1>

        <p className="mt-8 max-w-[24rem] font-mono text-[14px] uppercase tracking-[0.33em] text-white/42">
          {subheading}
        </p>
        <p className="mt-3 max-w-[24rem] font-mono text-[14px] uppercase tracking-[0.33em] text-white/42">
          {supporting}
        </p>
      </div>

      <Link
        href={ctaHref}
        className="group mt-12 inline-flex w-fit items-center gap-6"
      >
        <span className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-white/15 transition-all duration-500 group-hover:bg-white">
          <ArrowRight className="h-[18px] w-[18px] text-white transition-colors duration-500 group-hover:text-black" strokeWidth={2.4} />
        </span>
        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-white">
          {ctaLabel}
        </span>
      </Link>
    </div>
  );
}
