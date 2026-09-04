"use client";

import { Center, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import type { Group } from "three";

import { anton } from "@/lib/fonts";

const HomeV2PreloaderContext = createContext<{ markModelReady: () => void } | null>(null);

function PreloaderModel({ onReady }: { onReady: () => void }) {
  const { scene } = useGLTF("/base_basic_shaded.glb");
  const model = useMemo(() => scene.clone(true), [scene]);
  const groupRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.85;
  });

  useEffect(() => {
    onReady();
  }, [onReady]);

  return (
    <Center>
      <group ref={groupRef} rotation={[0.05, -0.25, 0]}>
        <primitive object={model} scale={1.32} />
      </group>
    </Center>
  );
}

useGLTF.preload("/base_basic_shaded.glb");

export function HomeV2Preloader({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const [isModelReady, setIsModelReady] = useState(false);
  const [canExit, setCanExit] = useState(false);
  const [startHero, setStartHero] = useState(false);
  const value = useMemo(() => ({ markModelReady: () => setIsReady(true) }), []);
  const handleModelReady = useCallback(() => setIsModelReady(true), []);
  const isDone = isReady && isModelReady && canExit;

  useEffect(() => {
    if (!isModelReady) return;

    const timeoutId = window.setTimeout(() => setCanExit(true), 4000);
    return () => window.clearTimeout(timeoutId);
  }, [isModelReady]);

  useEffect(() => {
    if (!isDone) return;

    const timeoutId = window.setTimeout(() => setStartHero(true), 900);
    return () => window.clearTimeout(timeoutId);
  }, [isDone]);

  useLayoutEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    const frameId = window.requestAnimationFrame(() => window.scrollTo(0, 0));

    return () => {
      window.cancelAnimationFrame(frameId);
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  return (
    <HomeV2PreloaderContext.Provider value={value}>
      <div data-homev2-ready={startHero ? "true" : "false"}>
        {children}
        <div className={`homev2-preloader ${isDone ? "homev2-preloader--done" : ""}`} aria-live="polite">
          <div className="homev2-preloader__content">
            <div className="homev2-preloader__model" aria-hidden="true">
              <Canvas
                camera={{ position: [0, 0, 6], fov: 42 }}
                dpr={[1, 2]}
                gl={{ alpha: true, antialias: true }}
              >
                <ambientLight intensity={1.45} />
                <directionalLight position={[3, 4, 5]} intensity={2.2} />
                <Suspense fallback={null}>
                  <PreloaderModel onReady={handleModelReady} />
                </Suspense>
              </Canvas>
            </div>
            <p className={`homev2-preloader__loading-word ${anton.className}`} aria-label="Loading">
              {"LOADING".split("").map((letter, index) => (
                <span key={`${letter}-${index}`} style={{ "--letter-index": index } as CSSProperties}>
                  {letter}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </HomeV2PreloaderContext.Provider>
  );
}

export function useHomeV2Preloader() {
  const context = useContext(HomeV2PreloaderContext);
  if (!context) throw new Error("useHomeV2Preloader must be used inside HomeV2Preloader");
  return context;
}
