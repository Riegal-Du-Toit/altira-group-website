"use client";

import { useId } from "react";
import { motion } from "framer-motion";

import RotatingEarth from "@/components/ui/wireframe-dotted-globe";
import { cn } from "@/lib/utils";

interface LabeledOrbitEarthProps {
  size: number;
  className?: string;
  earthClassName?: string;
}

export function LabeledOrbitEarth({
  size,
  className,
  earthClassName,
}: LabeledOrbitEarthProps) {
  const pathId = `altira-orbit-${useId().replaceAll(":", "")}`;

  return (
    <div className={cn("relative aspect-square", className)}>
      <div className="absolute inset-0 flex items-center justify-center">
        <RotatingEarth
          width={size}
          height={size}
          square
          className={cn("w-full", earthClassName)}
        />
      </div>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden md:block"
        animate={{ rotate: 360 }}
        transition={{ duration: 75, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      >
        <svg viewBox="0 0 200 200" className="h-full w-full">
          <defs>
            <path
              id={pathId}
              d="M 100,100 m -88,0 a 88,88 0 1,1 176,0 a 88,88 0 1,1 -176,0"
            />
          </defs>
          <text
            className="font-semibold uppercase"
            style={{
              fill: "rgba(255, 255, 255, 0.72)",
              fontSize: "8px",
              letterSpacing: "0.08em",
            }}
          >
            <textPath
              href={`#${pathId}`}
              startOffset="0%"
              textLength="553"
              lengthAdjust="spacing"
            >
              {"POWERED BY ALTIRA ORBIT - ".repeat(4)}
            </textPath>
          </text>
        </svg>
      </motion.div>
    </div>
  );
}
