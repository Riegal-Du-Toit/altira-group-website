"use client";

import React, { useEffect, useState } from "react";
import {
  AnimatePresence,
  domAnimation,
  LazyMotion,
  m,
  type Transition,
} from "motion/react";

import { cn } from "@/lib/utils";

interface TextLoopProps {
  staticText?: string;
  rotatingTexts?: string[];
  className?: string;
  interval?: number;
  transition?: Transition;
  staticTextClassName?: string;
  rotatingTextClassName?: string;
  rotatingTextClassNames?: string[];
  backgroundClassName?: string;
  cursorClassName?: string;
}

export default function TextLoop({
  staticText = "Systems",
  rotatingTexts = ["by Altira's orbit engine", "with you at every turn"],
  className,
  interval = 3000,
  transition = { duration: 0.8, ease: "easeInOut" },
  staticTextClassName,
  rotatingTextClassName,
  rotatingTextClassNames,
  backgroundClassName,
  cursorClassName,
}: TextLoopProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((previousIndex) => (previousIndex + 1) % rotatingTexts.length);
    }, interval);

    return () => window.clearInterval(timer);
  }, [rotatingTexts.length, interval]);

  return (
    <LazyMotion features={domAnimation}>
      <div
        className={cn(
          "flex w-fit flex-row items-center justify-start font-medium tracking-tight",
          className,
        )}
      >
        <span className={cn("mr-3 whitespace-nowrap", staticTextClassName)}>
          {staticText}
        </span>
        <div className="relative flex min-w-0 items-center">
          <AnimatePresence mode="wait">
            <m.div
              key={rotatingTexts[index]}
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={transition}
              className="relative overflow-hidden whitespace-nowrap"
            >
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-r from-transparent via-[#3FE9EC]/14 to-[#3FE9EC]/24",
                  backgroundClassName,
                )}
              />

              <span
                className={cn(
                  "relative bg-gradient-to-r from-white via-[#3FE9EC] to-white bg-clip-text pr-1 text-transparent",
                  rotatingTextClassName,
                  rotatingTextClassNames?.[index],
                )}
              >
                {rotatingTexts[index]}
              </span>
            </m.div>
          </AnimatePresence>

          <m.div
            className={cn(
              "h-[1.08em] w-[3px] bg-[#3FE9EC] shadow-[0_0_12px_rgba(63,233,236,0.55)]",
              cursorClassName,
            )}
            animate={{ opacity: [1, 0.45] }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </div>
      </div>
    </LazyMotion>
  );
}
