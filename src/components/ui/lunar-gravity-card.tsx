"use client";

import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, ThreeEvent, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";

import { cn } from "@/lib/utils";

const RADIUS = 1.58;

const RealisticMoon = ({ onClick }: { onClick?: () => void }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  const colorMap = useTexture(
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/moon_1024.jpg",
  );

  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.05;
  });

  return (
    <mesh
      ref={meshRef}
      castShadow
      receiveShadow
      onClick={onClick}
      onPointerOver={() => {
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "auto";
      }}
    >
      <sphereGeometry args={[RADIUS, 64, 64]} />
      <meshStandardMaterial
        map={colorMap}
        bumpMap={colorMap}
        bumpScale={0.02}
        roughness={0.8}
        metalness={0.1}
      />
    </mesh>
  );
};

const particlesCount = 60000;
const [ringPositions, ringColors, ringRandoms] = (() => {
  const pos = new Float32Array(particlesCount * 3);
  const col = new Float32Array(particlesCount * 3);
  const rnd = new Float32Array(particlesCount);

  for (let i = 0; i < particlesCount; i++) {
    const angle = Math.random() * Math.PI * 2;

    const rDist = Math.pow(Math.random(), 1.5);
    const radius = 1.78 + rDist * 1.72;

    const thickness = 0.4 - rDist * 0.2;
    const ySpread = Math.random() + Math.random() + Math.random() - 1.5;
    const y = ySpread * thickness;

    pos[i * 3] = Math.cos(angle) * radius;
    pos[i * 3 + 1] = y;
    pos[i * 3 + 2] = Math.sin(angle) * radius;

    const intensity = 1.0 - rDist;

    const paletteType = Math.random();
    let baseR;
    let baseG;
    let baseB;

    if (paletteType < 0.8) {
      baseR = 0.25;
      baseG = 0.3;
      baseB = 0.35;
    } else if (paletteType < 0.92) {
      baseR = 0.0;
      baseG = 0.6;
      baseB = 0.8;
    } else {
      baseR = 0.6;
      baseG = 0.2;
      baseB = 0.8;
    }

    baseR = Math.min(1.0, Math.max(0.0, baseR + (Math.random() - 0.5) * 0.1));
    baseG = Math.min(1.0, Math.max(0.0, baseG + (Math.random() - 0.5) * 0.1));
    baseB = Math.min(1.0, Math.max(0.0, baseB + (Math.random() - 0.5) * 0.1));

    const sparkle = Math.random() > 0.95 ? 2.5 : 1.0;

    col[i * 3] = baseR * intensity * sparkle;
    col[i * 3 + 1] = baseG * intensity * sparkle;
    col[i * 3 + 2] = baseB * intensity * sparkle;
    rnd[i] = Math.random();
  }
  return [pos, col, rnd];
})();

const ParticleRing = ({
  ringState,
  massiveAsteroidsRef,
}: {
  ringState: "hidden" | "animating" | "visible";
  massiveAsteroidsRef: React.MutableRefObject<Float32Array>;
}) => {
  const pointsRef = useRef<THREE.Points>(null);

  const uniforms = useRef({
    uProgress: { value: ringState === "visible" ? 1.0 : 0.0 },
    uAsteroids: { value: new Float32Array(75 * 4) },
    time: { value: 0 },
  });

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y -= delta * 0.02;
      pointsRef.current.updateMatrix();

      const invMat = new THREE.Matrix4().copy(pointsRef.current.matrix).invert();
      const localAsteroids = new Float32Array(75 * 4);

      for (let i = 0; i < 75; i++) {
        const ast = new THREE.Vector3(
          massiveAsteroidsRef.current[i * 4],
          massiveAsteroidsRef.current[i * 4 + 1],
          massiveAsteroidsRef.current[i * 4 + 2],
        );
        ast.applyMatrix4(invMat);
        localAsteroids[i * 4] = ast.x;
        localAsteroids[i * 4 + 1] = ast.y;
        localAsteroids[i * 4 + 2] = ast.z;
        localAsteroids[i * 4 + 3] = massiveAsteroidsRef.current[i * 4 + 3];
      }

      uniforms.current.uAsteroids.value = localAsteroids;
    }

    uniforms.current.time.value = state.clock.elapsedTime;

    if (ringState === "animating") {
      uniforms.current.uProgress.value += delta * 0.35;
      if (uniforms.current.uProgress.value > 1.0) uniforms.current.uProgress.value = 1.0;
    } else if (ringState === "visible") {
      uniforms.current.uProgress.value = 1.0;
    } else {
      uniforms.current.uProgress.value = 0.0;
    }
  });

  const onBeforeCompile = (shader: {
    uniforms: Record<string, { value: unknown }>;
    vertexShader: string;
    fragmentShader: string;
  }) => {
    shader.uniforms.uProgress = uniforms.current.uProgress;
    shader.uniforms.uAsteroids = uniforms.current.uAsteroids;
    shader.uniforms.time = uniforms.current.time;

    shader.vertexShader = `
      uniform float uProgress;
      uniform vec4 uAsteroids[75];
      uniform float time;
      attribute float aRandom;
      varying float vProgress;
      ${shader.vertexShader}
    `;

    shader.vertexShader = shader.vertexShader.replace(
      "#include <begin_vertex>",
      `
      vec3 transformed = vec3(position);

      float angle = atan(transformed.x, transformed.z);
      float normalizedAngle = abs(angle) / 3.14159265359;
      float spawnThreshold = 1.0 - normalizedAngle;

      float progressValue = (uProgress * 1.4) - spawnThreshold;
      float particleProgress = smoothstep(0.0, 0.4, progressValue);
      vProgress = particleProgress;

      transformed.y += sin(angle * 10.0 + time) * 0.05 * aRandom;

      if (uProgress > 0.5) {
        for(int i = 0; i < 75; i++) {
          vec4 astData = uAsteroids[i];
          vec3 delta = transformed - astData.xyz;
          float dist = length(delta);

          float rad = astData.w * 2.0 + 0.15;

          if (dist < rad) {
             float force = pow((rad - dist) / rad, 2.0);
             transformed += normalize(delta) * force * 0.4;
             transformed.y += force * 0.20 * (aRandom - 0.5);
          }
        }
      }

      float swirl = (1.0 - particleProgress) * 4.0;
      float s = sin(swirl);
      float c = cos(swirl);
      transformed.xz = mat2(c, -s, s, c) * transformed.xz;

      transformed.y += (1.0 - particleProgress) * (transformed.y >= 0.0 ? 1.0 : -1.0);

      vec3 moonSurface = normalize(transformed) * 1.68;
      transformed = mix(moonSurface, transformed, particleProgress);
      `,
    );

    shader.fragmentShader = `
      varying float vProgress;
      ${shader.fragmentShader}
    `;

    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <color_fragment>",
      `
      #include <color_fragment>
      diffuseColor.a *= vProgress;
      `,
    );
  };

  return (
    <points ref={pointsRef} rotation={[0, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={ringPositions}
          itemSize={3}
          args={[ringPositions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particlesCount}
          array={ringColors}
          itemSize={3}
          args={[ringColors, 3]}
        />
        <bufferAttribute
          attach="attributes-aRandom"
          count={particlesCount}
          array={ringRandoms}
          itemSize={1}
          args={[ringRandoms, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.008}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        onBeforeCompile={onBeforeCompile}
      />
    </points>
  );
};

const generateAsteroids = (count: number) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    const baseRadius = 2.24 + Math.random() * 1.5;
    const radialAmplitude = 0.5 + Math.random() * 1.5;
    const radialSpeed = 0.15 + Math.random() * 0.25;
    const phase = Math.random() * Math.PI * 2;

    const angle = Math.random() * Math.PI * 2;
    const zOffset = (Math.random() - 0.5) * 0.8;

    const speed = (0.04 + Math.random() * 0.08) * (Math.random() > 0.5 ? 1 : -1);

    const rotationSpeedX = (Math.random() - 0.5) * 0.05;
    const rotationSpeedY = (Math.random() - 0.5) * 0.05;
    const rotationSpeedZ = (Math.random() - 0.5) * 0.05;

    const scale = 0.02 + Math.pow(Math.random(), 4) * 0.18;

    data.push({
      angle,
      baseRadius,
      radialAmplitude,
      radialSpeed,
      phase,
      zOffset,
      speed,
      rx: Math.random() * Math.PI,
      ry: Math.random() * Math.PI,
      rz: Math.random() * Math.PI,
      rsx: rotationSpeedX,
      rsy: rotationSpeedY,
      rsz: rotationSpeedZ,
      scale,
    });
  }
  data.sort((a, b) => b.scale - a.scale);
  return data;
};

const AsteroidBelt = ({
  ringState,
  massiveAsteroidsRef,
}: {
  ringState: "hidden" | "animating" | "visible";
  massiveAsteroidsRef: React.MutableRefObject<Float32Array>;
}) => {
  const meshRefs = useRef<Array<THREE.Mesh | null>>([]);
  const dragPlaneRef = useRef(new THREE.Plane());
  const dragOffsetRef = useRef(new THREE.Vector3());
  const draggedIndexRef = useRef<number | null>(null);

  const [colorMap, bumpMap] = useTexture([
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/moon_1024.jpg",
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/moon_1024.jpg",
  ]);

  const count = 75;
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const [asteroids] = useState(() => generateAsteroids(count));
  const [dragStates] = useState(() =>
    Array.from({ length: count }, () => ({
      state: "idle" as "idle" | "dragging" | "returning",
      pointerId: null as number | null,
    })),
  );
  const scaleRef = useRef(0);
  const targetPosition = useMemo(() => new THREE.Vector3(), []);
  const targetRotation = useMemo(() => new THREE.Euler(), []);
  const targetQuaternion = useMemo(() => new THREE.Quaternion(), []);

  useFrame((_, delta) => {
    const targetScale = ringState === "hidden" ? 0 : 1;
    const lerpSpeed = ringState === "hidden" ? 5 : 2;
    scaleRef.current = THREE.MathUtils.lerp(scaleRef.current, targetScale, delta * lerpSpeed);

    asteroids.forEach((ast, i) => {
      const mesh = meshRefs.current[i];
      if (!mesh) return;

      ast.angle += ast.speed * delta;
      ast.phase += ast.radialSpeed * delta;
      let currentRadius = ast.baseRadius + Math.sin(ast.phase) * ast.radialAmplitude;

      if (currentRadius < 1.7) {
        const penetration = 1.7 - currentRadius;
        currentRadius = 1.7 + penetration * 0.85;
      }

      const x = Math.cos(ast.angle) * currentRadius;
      const z = Math.sin(ast.angle) * currentRadius;

      ast.rx += ast.rsx;
      ast.ry += ast.rsy;
      ast.rz += ast.rsz;

      targetPosition.set(x, ast.zOffset, z);
      targetRotation.set(ast.rx, ast.ry, ast.rz);
      targetQuaternion.setFromEuler(targetRotation);

      if (scaleRef.current < 0.01) {
        mesh.visible = false;
      } else {
        mesh.visible = true;
      }

      const dragState = dragStates[i];
      const targetMeshScale = ast.scale * scaleRef.current;

      if (dragState.state === "idle") {
        mesh.position.copy(targetPosition);
        mesh.quaternion.copy(targetQuaternion);
      } else if (dragState.state === "returning") {
        mesh.position.lerp(targetPosition, 0.12);
        mesh.quaternion.slerp(targetQuaternion, 0.12);

        if (
          mesh.position.distanceTo(targetPosition) < 0.025 &&
          mesh.quaternion.angleTo(targetQuaternion) < 0.025
        ) {
          mesh.position.copy(targetPosition);
          mesh.quaternion.copy(targetQuaternion);
          dragState.state = "idle";
        }
      }

      mesh.scale.setScalar(targetMeshScale);

      dummy.position.copy(mesh.position);
      dummy.scale.copy(mesh.scale);
      massiveAsteroidsRef.current[i * 4] = dummy.position.x;
      massiveAsteroidsRef.current[i * 4 + 1] = dummy.position.y;
      massiveAsteroidsRef.current[i * 4 + 2] = dummy.position.z;
      massiveAsteroidsRef.current[i * 4 + 3] = ast.scale;
    });
  });

  const handlePointerDown = (index: number) => (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    dragStates[index].state = "dragging";
    dragStates[index].pointerId = event.pointerId;
    draggedIndexRef.current = index;

    const mesh = meshRefs.current[index];
    if (!mesh) return;

    const normal = new THREE.Vector3();
    event.camera.getWorldDirection(normal);
    dragPlaneRef.current.setFromNormalAndCoplanarPoint(normal, mesh.position);

    const intersection = new THREE.Vector3();
    if (event.ray.intersectPlane(dragPlaneRef.current, intersection)) {
      dragOffsetRef.current.copy(mesh.position).sub(intersection);
    } else {
      dragOffsetRef.current.set(0, 0, 0);
    }

    const pointerTarget = event.target as Element | null;
    if (pointerTarget && "setPointerCapture" in pointerTarget) {
      (pointerTarget as Element & { setPointerCapture: (pointerId: number) => void }).setPointerCapture(
        event.pointerId,
      );
    }
    document.body.style.cursor = "grabbing";
  };

  const handlePointerMove = (index: number) => (event: ThreeEvent<PointerEvent>) => {
    if (draggedIndexRef.current !== index || dragStates[index].state !== "dragging") return;

    event.stopPropagation();
    const mesh = meshRefs.current[index];
    if (!mesh) return;

    const intersection = new THREE.Vector3();
    if (event.ray.intersectPlane(dragPlaneRef.current, intersection)) {
      mesh.position.copy(intersection.add(dragOffsetRef.current));
    }
  };

  const handlePointerUp = (index: number) => (event: ThreeEvent<PointerEvent>) => {
    if (dragStates[index].pointerId !== event.pointerId) return;

    event.stopPropagation();
    dragStates[index].state = "returning";
    dragStates[index].pointerId = null;
    draggedIndexRef.current = null;
    const pointerTarget = event.target as Element | null;
    if (pointerTarget && "releasePointerCapture" in pointerTarget) {
      (
        pointerTarget as Element & { releasePointerCapture: (pointerId: number) => void }
      ).releasePointerCapture(event.pointerId);
    }
    document.body.style.cursor = "auto";
  };

  return (
    <group>
      {asteroids.map((ast, index) => (
        <mesh
          key={`asteroid-${index}`}
          ref={(node) => {
            meshRefs.current[index] = node;
          }}
          castShadow
          receiveShadow
          onPointerDown={handlePointerDown(index)}
          onPointerMove={handlePointerMove(index)}
          onPointerUp={handlePointerUp(index)}
          onPointerOut={() => {
            if (draggedIndexRef.current === null) document.body.style.cursor = "auto";
          }}
          onPointerOver={() => {
            if (draggedIndexRef.current === null) document.body.style.cursor = "grab";
          }}
        >
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            map={colorMap}
            bumpMap={bumpMap}
            bumpScale={0.08}
            color="#ffffff"
            roughness={0.7}
            metalness={0.1}
          />
        </mesh>
      ))}
    </group>
  );
};

export interface LunarGravityCardProps {
  className?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
}

export default function LunarGravityCard({
  className,
  title = (
    <>
      <span className="text-zinc-50 drop-shadow-sm">Lunar</span>
      <br />
      <span className="bg-gradient-to-b from-white via-zinc-400 to-zinc-800 bg-clip-text text-transparent drop-shadow-md">
        Gravity.
      </span>
    </>
  ),
  description = "Embed highly realistic astrophysics directly into your Next.js project. Zero configuration, fully interactive, and flawlessly smooth.",
  actions,
}: LunarGravityCardProps) {
  const [ringState, setRingState] = useState<"hidden" | "animating" | "visible">("hidden");
  const massiveAsteroidsRef = useRef<Float32Array>(new Float32Array(75 * 4));

  useEffect(() => {
    const showTimer = window.setTimeout(() => {
      setRingState("animating");
    }, 2000);

    const visibleTimer = window.setTimeout(() => {
      setRingState("visible");
    }, 5200);

    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(visibleTimer);
    };
  }, []);

  return (
    <div
      className={cn(
        "relative flex min-h-[calc(100vh-80px)] w-full flex-col overflow-hidden border border-white/[0.08] bg-[#1E2021] shadow-[0_30px_100px_rgba(0,0,0,0.4)] md:min-h-[calc(100vh-80px)] md:flex-row",
        className,
      )}
    >
      <div className="pointer-events-none relative z-20 flex w-full flex-col justify-center px-6 py-12 sm:px-10 md:w-[60%] md:p-0 md:pl-10 lg:pl-16 xl:pl-24">
        <h2 className="mb-6 max-w-[9.75ch] text-[3.5rem] font-bold leading-[0.9] tracking-tighter sm:text-[4.5rem] md:text-[5.5rem] xl:text-[6.25rem]">
          {title}
        </h2>
        <p className="max-w-[680px] text-base font-medium leading-relaxed text-zinc-400 md:text-lg">
          {description}
        </p>
        {actions ? <div className="pointer-events-auto mt-8 flex flex-wrap gap-4">{actions}</div> : null}
      </div>

      <div className="absolute inset-0 z-0 h-full w-full">
        <div className="absolute inset-0 h-full w-full">
          <Canvas
            shadows
            camera={{ position: [0, 4, 10], fov: 45 }}
            dpr={[1, 2]}
            gl={{ alpha: true, antialias: true }}
          >
            <Environment preset="city" />

            <ambientLight intensity={0.02} />
            <directionalLight
              position={[8, 5, 5]}
              intensity={1.5}
              color="#ffffff"
              castShadow
              shadow-mapSize={[2048, 2048]}
            />
            <directionalLight position={[-5, -3, -5]} intensity={0.15} color="#4a90e2" />

            <OrbitControls
              enableZoom={false}
              enablePan={false}
              enableRotate={false}
              autoRotate={false}
            />

            <group position={[3.15, 0, 0]} rotation={[0, 0.18, 0]}>
              <Suspense fallback={null}>
                <RealisticMoon />
                <ParticleRing ringState={ringState} massiveAsteroidsRef={massiveAsteroidsRef} />
                <AsteroidBelt ringState={ringState} massiveAsteroidsRef={massiveAsteroidsRef} />
                <Environment preset="city" />
              </Suspense>
            </group>
          </Canvas>
        </div>
      </div>
    </div>
  );
}

export { LunarGravityCard as Component };
