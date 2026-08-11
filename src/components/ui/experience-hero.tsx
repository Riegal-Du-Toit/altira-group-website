"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

export function ExperienceHeroText({
  className,
  eyebrow = "ALTIRA GROUP",
  titleTop = "Proprietary",
  titleBottom = "Technology",
  subheading = "powered by Altira's orbit engine",
  supporting = "with you at every turn",
  ctaLabel = "Start a conversation",
  ctaHref = "#contact",
}: {
  className?: string;
  eyebrow?: string;
  titleTop?: string;
  titleBottom?: string;
  subheading?: string;
  supporting?: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center gap-3">
        <div className="relative h-2.5 w-2.5 rounded-full bg-white">
          <div className="absolute inset-0 rounded-full bg-white opacity-30 animate-ping" />
        </div>
        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-white/88">
          {eyebrow}
        </span>
      </div>

      <div className="mt-5">
        <h1 className="font-black uppercase leading-[0.88] tracking-[-0.07em] text-white">
          <span className="block text-[clamp(3.2rem,6.4vw,7rem)]">{titleTop}</span>
          <span className="mt-1 block text-[clamp(3.2rem,6.4vw,7rem)] text-transparent [-webkit-text-stroke:1.8px_rgba(255,255,255,0.28)]">
            {titleBottom}
          </span>
        </h1>

        <p className="mt-8 max-w-[24rem] font-mono text-[11px] uppercase tracking-[0.33em] text-white/42">
          {subheading}
        </p>
        <p className="mt-3 max-w-[24rem] font-mono text-[11px] uppercase tracking-[0.33em] text-white/42">
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
