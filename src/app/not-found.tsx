"use client";

import { Center, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import Link from "next/link";
import { Suspense, useMemo, useRef } from "react";
import type { Group } from "three";

import { TalkButton } from "@/components/ui/talk-button";
import { anton } from "@/lib/fonts";

function NotFoundFavicon() {
  const { scene } = useGLTF("/base_basic_shaded.glb");
  const model = useMemo(() => scene.clone(true), [scene]);
  const groupRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y -= delta * 0.32;
  });

  return (
    <Center>
      <group ref={groupRef} rotation={[0.05, -0.35, 0]}>
        <primitive object={model} scale={1.8} />
      </group>
    </Center>
  );
}

useGLTF.preload("/base_basic_shaded.glb");

export default function NotFoundPage() {
  return (
    <main className="h-[100svh] overflow-hidden bg-[#F7F8FA] text-[#2E2E38]">
      <section className="relative flex h-full items-center overflow-hidden px-6 py-20 sm:px-10 lg:px-16">
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-[-10%] bottom-[-0.16em] z-0 select-none whitespace-nowrap text-center text-[clamp(18rem,48vw,48rem)] leading-none tracking-[0.02em] text-[#E4E5EA] origin-bottom scale-x-[1.3] scale-y-[1.35] ${anton.className}`}
        >
          404
        </div>
        <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(280px,0.55fr)]">
          <div>
            <h1 className="max-w-3xl text-[clamp(3.4rem,9vw,8rem)] font-black uppercase leading-[0.86] tracking-normal">
              Page not found.
            </h1>
            <p className="mt-8 max-w-xl text-base leading-7 text-[#2E2E38]/62 sm:text-lg">
              The page moved, was renamed, or does not exist. Return home or book a quick conversation with Altira Group.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link href="/" className="inline-flex min-h-11 items-center rounded-[12px] border border-[#2E2E38]/15 bg-[#2E2E38] px-5 text-sm font-bold text-white transition hover:bg-[#23232b]">
                Back home
              </Link>
              <TalkButton href="/#talk-to-us" />
            </div>
          </div>
          <div className="relative mx-auto aspect-square w-full max-w-[24rem]">
            <Canvas
              camera={{ position: [0, 0, 5], fov: 38 }}
              dpr={[1, 2]}
              gl={{ alpha: true, antialias: true }}
              className="absolute inset-0"
            >
              <ambientLight intensity={1.45} />
              <directionalLight position={[3, 4, 5]} intensity={2.2} />
              <Suspense fallback={null}>
                <NotFoundFavicon />
              </Suspense>
            </Canvas>
          </div>
        </div>
      </section>
    </main>
  );
}
