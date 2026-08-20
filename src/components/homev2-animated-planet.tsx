"use client";

import { useCallback } from "react";
import { OrbitEarth } from "@/components/ui/orbit-earth";
import { useHomeV2Preloader } from "@/components/homev2-preloader";

const INITIAL_ROTATION: [number, number, number] = [-72, 6, 0];

export function HomeV2AnimatedPlanet({ animateOnEntry = true }: { animateOnEntry?: boolean }) {
  const { markModelReady } = useHomeV2Preloader();
  const handleReady = useCallback(() => markModelReady(), [markModelReady]);

  return (
    <div className={`${animateOnEntry ? "homev2-planet-entrance" : ""} size-full`}>
      <OrbitEarth
        size={90}
        delayMs={0}
        autoRotateSpeed={0.2}
        interactive
        dragSensitivityX={0.035}
        dragSensitivityY={0.024}
        initialRotation={INITIAL_ROTATION}
        jumpingArcCount={0}
        dotSpacing={22}
        maxDevicePixelRatio={1}
        className="size-full"
        earthWrapClassName="inset-[6%]"
        earthClassName="overflow-hidden rounded-full brightness-[1.18] contrast-[1.12] [mask-image:radial-gradient(circle,black_62%,rgba(0,0,0,0.9)_78%,transparent_100%)]"
        onReady={handleReady}
        instantReady
        pauseWhenHidden={false}
        baseOpacity={0.6}
      />
    </div>
  );
}
