"use client";

import { motion } from "motion/react";
import { OrbitEarth } from "@/components/ui/orbit-earth";
import { cn } from "@/lib/utils";

interface LabeledOrbitEarthProps {
  size: number;
  className?: string;
  earthClassName?: string;
  label?: string;
  labelClassName?: string;
  labelPosition?: "orbit" | "below";
  labelSpeed?: number;
  autoRotateSpeed?: number;
  earthColors?: {
    fill?: string;
    line?: string;
    dot?: string;
  };
}

export function LabeledOrbitEarth({
  size,
  className,
  earthClassName,
  label = "POWERED BY ALTIRA ORBIT - POWERED BY ALTIRA ORBIT - ",
  labelClassName,
  labelPosition = "orbit",
  labelSpeed = 18,
  autoRotateSpeed,
  earthColors,
}: LabeledOrbitEarthProps) {
  const pathId = `orbit-label-${size}`;

  return (
    <div className={cn("relative aspect-square", className)}>
      {labelPosition === "orbit" ? <motion.div
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
          <text className="fill-[#3FE9EC] text-[8.5px] font-semibold uppercase tracking-[0.32em]">
            <textPath href={`#${pathId}`} startOffset="0%">
              {label}
            </textPath>
          </text>
        </svg>
      </motion.div> : <p className={cn("absolute left-1/2 top-full z-20 -translate-x-1/2 whitespace-nowrap text-[0.56rem] font-semibold uppercase tracking-[0.24em] text-[#3FE9EC]", labelClassName)}>{label}</p>}

      <OrbitEarth size={size} earthClassName={earthClassName} autoRotateSpeed={autoRotateSpeed} colors={earthColors} />
    </div>
  );
}
