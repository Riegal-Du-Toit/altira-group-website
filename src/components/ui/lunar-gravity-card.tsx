"use client";

import React from "react";

import { LabeledOrbitEarth } from "@/components/ui/labeled-orbit-earth";
import { cn } from "@/lib/utils";

export interface LunarGravityCardProps {
  className?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  contentClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  earthSize?: number;
  earthWrapperClassName?: string;
}

export default function LunarGravityCard({
  className,
  contentClassName,
  titleClassName,
  descriptionClassName,
  earthSize = 580,
  earthWrapperClassName,
  title = (
    <>
      <span className="text-zinc-50 drop-shadow-sm">Lunar</span>
      <br />
      <span className="bg-gradient-to-b from-white via-zinc-400 to-zinc-800 bg-clip-text text-transparent drop-shadow-md">
        Gravity.
      </span>
    </>
  ),
  description = "Embed highly realistic astrophysics directly into your Next.js project. Zero configuration, fully interactive, and flawlessly smooth.",
  actions,
}: LunarGravityCardProps) {
  return (
    <div
      className={cn(
        "relative flex min-h-[calc(100vh-80px)] w-full overflow-hidden border border-white/[0.08] bg-[#1E2021] shadow-[0_30px_100px_rgba(0,0,0,0.4)] md:min-h-[calc(100vh-80px)] md:flex-row",
        className,
      )}
    >
      <div
        className={cn(
          "pointer-events-none relative z-20 flex w-full flex-col justify-center px-6 py-12 sm:px-10 md:w-[60%] md:p-0 md:pl-10 lg:pl-16 xl:pl-24",
          contentClassName,
        )}
      >
        <h2
          className={cn(
            "mb-6 max-w-[9.75ch] text-[3.5rem] font-bold leading-[0.9] tracking-tighter sm:text-[4.5rem] md:text-[5.5rem] xl:text-[6.25rem]",
            titleClassName,
          )}
        >
          {title}
        </h2>
        <p
          className={cn(
            "max-w-[680px] text-base font-medium leading-relaxed text-zinc-400 md:text-lg",
            descriptionClassName,
          )}
        >
          {description}
        </p>
        {actions ? <div className="pointer-events-auto mt-8 flex flex-wrap gap-4">{actions}</div> : null}
      </div>

      <div className="absolute inset-0 z-0 h-full w-full">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_48%,rgba(63,233,236,0.08),transparent_22%),radial-gradient(circle_at_82%_58%,rgba(255,255,255,0.06),transparent_18%)]" />
        <div
          className={cn(
            "absolute top-0 right-0 flex h-full w-[54%] items-center justify-end pr-6 md:w-[52%] md:pr-14 lg:w-[50%] lg:pr-20 xl:pr-28",
            earthWrapperClassName,
          )}
        >
          <LabeledOrbitEarth
            size={earthSize}
            className="hero-earth-orbit relative aspect-square translate-x-0 translate-y-4 md:translate-x-[1%] lg:-translate-x-[1%] xl:-translate-x-[2%]"
          />
        </div>
      </div>

      <style>{`
        .hero-earth-orbit {
          width: 80%;
          max-width: 580px;
        }

        @media (min-width: 1280px) {
          .hero-earth-orbit {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

export { LunarGravityCard as Component };
