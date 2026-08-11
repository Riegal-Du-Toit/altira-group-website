"use client";

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

    </div>
  );
}
