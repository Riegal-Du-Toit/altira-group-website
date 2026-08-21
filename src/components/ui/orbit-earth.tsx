"use client";

import { DeferredRotatingEarth } from "@/components/ui/deferred-rotating-earth";
import { cn } from "@/lib/utils";

interface OrbitEarthProps {
  size: number;
  className?: string;
  earthClassName?: string;
  earthWrapClassName?: string;
  delayMs?: number;
  autoRotateSpeed?: number;
  interactive?: boolean;
  dotSpacing?: number;
  maxDevicePixelRatio?: number;
  dragSensitivityX?: number;
  dragSensitivityY?: number;
  initialRotation?: [number, number, number];
  jumpingArcCount?: number;
  onReady?: () => void;
  instantReady?: boolean;
  pauseWhenHidden?: boolean;
  networkConnections?: boolean;
  networkStartDelayMs?: number;
  baseOpacity?: number;
  colors?: {
    fill?: string;
    line?: string;
    dot?: string;
  };
  markers?: Array<{
    location: [number, number];
    color?: string;
    radius?: number;
    glowColor?: string;
  }>;
}

export function OrbitEarth({
  size,
  className,
  earthClassName,
  earthWrapClassName,
  delayMs = 650,
  autoRotateSpeed,
  interactive,
  dotSpacing = 28,
  maxDevicePixelRatio = 1,
  dragSensitivityX,
  dragSensitivityY,
  initialRotation,
  jumpingArcCount,
  onReady,
  instantReady,
  pauseWhenHidden,
  networkConnections,
  networkStartDelayMs,
  baseOpacity,
  colors,
  markers,
}: OrbitEarthProps) {
  return (
    <div className={cn("relative aspect-square", className)}>
      <div className={cn("absolute inset-[14%] flex items-center justify-center", earthWrapClassName)}>
        <DeferredRotatingEarth
          width={size}
          height={size}
          square
          delayMs={delayMs}
          dotSpacing={dotSpacing}
          maxDevicePixelRatio={maxDevicePixelRatio}
          autoRotateSpeed={autoRotateSpeed}
          interactive={interactive}
          dragSensitivityX={dragSensitivityX}
          dragSensitivityY={dragSensitivityY}
          initialRotation={initialRotation}
          jumpingArcCount={jumpingArcCount}
          onReady={onReady}
          instantReady={instantReady}
          pauseWhenHidden={pauseWhenHidden}
          networkConnections={networkConnections}
          networkStartDelayMs={networkStartDelayMs}
          baseOpacity={baseOpacity}
          colors={colors}
          markers={markers}
          className={cn("size-full", earthClassName)}
        />
      </div>
    </div>
  );
}
