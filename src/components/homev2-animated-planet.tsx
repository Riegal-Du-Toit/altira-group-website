"use client";

import { Center, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useCallback, useEffect, useMemo, useRef } from "react";
import type { Group } from "three";

import { useHomeV2Preloader } from "@/components/homev2-preloader";
import { OrbitEarth } from "@/components/ui/orbit-earth";

const GLOBE_ROTATION: [number, number, number] = [-72, 6, 0];
const GLOBE_COLORS = {
  fill: "rgba(247,248,250,0.18)",
  line: "#2E2E38",
  dot: "#2E2E38",
};

function HeroModel({ onReady }: { onReady: () => void }) {
  const { scene } = useGLTF("/base_basic_shaded.glb");
  const model = useMemo(() => scene.clone(true), [scene]);
  const groupRef = useRef<Group>(null);

  useEffect(() => {
    onReady();
  }, [onReady]);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y -= delta * 0.18;
  });

  return (
    <Center>
      <group ref={groupRef} rotation={[0.05, -0.25, 0]}>
        <primitive object={model} scale={1.12} />
      </group>
    </Center>
  );
}

useGLTF.preload("/base_basic_shaded.glb");

export function HomeV2AnimatedPlanet({ animateOnEntry = true }: { animateOnEntry?: boolean }) {
  const { markModelReady } = useHomeV2Preloader();
  const handleReady = useCallback(() => markModelReady(), [markModelReady]);

  return (
    <div className={`${animateOnEntry ? "homev2-planet-entrance" : ""} relative size-full`}>
      <div className="absolute inset-[8%] z-10">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 38 }}
          dpr={[1, 2]}
          gl={{ alpha: true, antialias: true }}
          className="homev2-hero-model-canvas"
        >
          <ambientLight intensity={1.35} />
          <directionalLight position={[3, 4, 5]} intensity={2.2} />
          <Suspense fallback={null}>
            <HeroModel onReady={handleReady} />
          </Suspense>
        </Canvas>
      </div>
      <OrbitEarth
        size={90}
        delayMs={0}
        autoRotateSpeed={0.2}
        interactive
        dragSensitivityX={0.035}
        dragSensitivityY={0.024}
        initialRotation={GLOBE_ROTATION}
        jumpingArcCount={0}
        dotSpacing={22}
        maxDevicePixelRatio={1}
        className="pointer-events-none absolute inset-0 z-20 size-full"
        earthWrapClassName="inset-[6%]"
        earthClassName="overflow-hidden rounded-full [mask-image:radial-gradient(circle,black_62%,rgba(0,0,0,0.9)_78%,transparent_100%)]"
        instantReady
        pauseWhenHidden={false}
        baseOpacity={0.6}
        colors={GLOBE_COLORS}
      />
    </div>
  );
}
