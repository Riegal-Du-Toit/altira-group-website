"use client";

import { animate } from "motion/react";
import { useEffect, useRef, useState } from "react";

const colors = ["#26ccff", "#a25afd", "#ff5e7e", "#88ff5a", "#fcff42", "#ffa62d", "#ff36ff"];
const shapes = ["circle", "rect", "rect", "strip", "strip"] as const;
const keyframeCount = 40;
const popWindow = 0.08;

type ParticleShape = (typeof shapes)[number];
type Particle = { keyframes: { transform: string[]; opacity: number[] }; duration: number; size: number; color: string; shape: ParticleShape };
type Burst = { id: number; particles: Particle[] };

function buildKeyframes({ angle, startVelocity, decay, gravity, drift, wobbleSpeed, wobbleOffset, size, ticks, tiltRotations, rotation }: { angle: number; startVelocity: number; decay: number; gravity: number; drift: number; wobbleSpeed: number; wobbleOffset: number; size: number; ticks: number; tiltRotations: number; rotation: number }) {
  const transforms: string[] = [];
  const opacities: number[] = [];
  let velocity = startVelocity;
  let x = 0;
  let y = 0;
  let wobble = wobbleOffset;
  let tick = 0;

  for (let i = 0; i <= keyframeCount; i++) {
    const t = i / keyframeCount;
    if (i > 0) {
      const targetTick = Math.round((i * ticks) / keyframeCount);
      while (tick < targetTick) {
        x += Math.cos(angle) * velocity + drift;
        y += Math.sin(angle) * velocity + gravity * 3;
        velocity *= decay;
        wobble += wobbleSpeed;
        tick++;
      }
    }
    const translateX = i === 0 ? 0 : x + Math.cos(wobble) * 15 * size;
    const scale = t < popWindow * 0.6 ? (t / (popWindow * 0.6)) * 1.15 : t < popWindow ? 1.15 - ((t - popWindow * 0.6) / (popWindow * 0.4)) * 0.15 : 1;
    const opacity = t <= 0.5 ? 1 : t <= 0.8 ? 1 - ((t - 0.5) / 0.3) * 0.5 : 0.5 - ((t - 0.8) / 0.2) * 0.5;
    transforms.push(`translate(${translateX}px, ${y}px) scale(${scale}) rotateY(${tiltRotations * 360 * t}deg) rotate(${rotation}deg)`);
    opacities.push(opacity);
  }

  return { transform: transforms, opacity: opacities };
}

function ParticleDot({ particle }: { particle: Particle }) {
  const ref = useRef<HTMLDivElement>(null);
  const { keyframes, duration, size, color, shape } = particle;
  const width = shape === "strip" ? size * 0.3 : shape === "rect" ? size * 0.7 : size;
  const height = shape === "strip" ? size * 2 : size;
  const radius = shape === "circle" ? "50%" : shape === "strip" ? size * 0.12 : 2;

  useEffect(() => {
    if (!ref.current) return;
    const playback = animate(ref.current, keyframes, { duration, ease: "linear" });
    return () => playback.cancel();
  }, [keyframes, duration]);

  return <div ref={ref} style={{ position: "absolute", width, height, borderRadius: radius, backgroundColor: color, willChange: "transform, opacity", pointerEvents: "none" }} />;
}

export function CompletionConfetti({ active }: { active: boolean }) {
  const [bursts, setBursts] = useState<Burst[]>([]);
  const nextId = useRef(0);

  useEffect(() => {
    if (!active) {
      setBursts([]);
      return;
    }

    const duration = 2.5;
    const size = 0.72;
    const ticks = Math.round(duration * 60);
    const particles = Array.from({ length: 30 }, () => {
      const spreadRad = 100 * (Math.PI / 180);
      const angle = -Math.PI / 2 + (0.5 * spreadRad - Math.random() * spreadRad);
      const velocity = 25 * 0.5 + Math.random() * 25;
      return {
        keyframes: buildKeyframes({ angle, startVelocity: velocity, decay: 0.91, gravity: 1, drift: 0, wobbleSpeed: Math.min(0.11, Math.random() * 0.1 + 0.05), wobbleOffset: Math.random() * 10, size, ticks, tiltRotations: 2 + Math.random() * 4, rotation: Math.random() * 360 }),
        duration,
        size: 6 * size + Math.random() * 6 * size,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)],
      };
    });
    const id = nextId.current++;
    setBursts([{ id, particles }]);
    const timeoutId = window.setTimeout(() => setBursts([]), (duration + 0.5) * 1000);
    return () => window.clearTimeout(timeoutId);
  }, [active]);

  if (!bursts.length) return null;

  return <span aria-hidden="true" className="pointer-events-none absolute left-0 top-0 z-20 block h-0 w-0 overflow-visible [perspective:400px]">{bursts.map((burst) => burst.particles.map((particle, index) => <ParticleDot key={`${burst.id}-${index}`} particle={particle} />))}</span>;
}
