"use client";

import RotatingEarth from "@/components/ui/wireframe-dotted-globe";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface LabeledOrbitEarthProps {
  size: number;
  className?: string;
  earthClassName?: string;
  label?: string;
  labelClassName?: string;
  labelSpeed?: number;
}

export function LabeledOrbitEarth({
  size,
  className,
  earthClassName,
  label = "POWERED BY ALTIRA ORBIT - POWERED BY ALTIRA ORBIT - ",
  labelClassName,
  labelSpeed = 18,
}: LabeledOrbitEarthProps) {
  const pathId = `orbit-label-${size}`;

  return (
    <div className={cn("relative aspect-square", className)}>
      <motion.div
        className={cn("absolute inset-[6%] z-10", labelClassName)}
        animate={{ rotate: 360 }}
        transition={{
          duration: labelSpeed,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        <svg viewBox="0 0 200 200" className="h-full w-full">
          <defs>
            <path
              id={pathId}
              d="M 100, 100 m -72, 0 a 72,72 0 1,1 144,0 a 72,72 0 1,1 -144,0"
            />
          </defs>
          <text className="fill-white/68 text-[6.5px] font-semibold uppercase tracking-[0.32em]">
            <textPath href={`#${pathId}`} startOffset="0%">
              {label}
            </textPath>
          </text>
        </svg>
      </motion.div>

      <div className="absolute inset-[14%] flex items-center justify-center">
        <RotatingEarth
          width={size}
          height={size}
          square
          className={cn("size-full", earthClassName)}
        />
      </div>

    </div>
  );
}
