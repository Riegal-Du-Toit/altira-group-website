"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import RotatingEarth from "@/components/ui/wireframe-dotted-globe";
import { cn } from "@/lib/utils";

type Point = { x: number; y: number };

const TRAIL_COUNT = 4;
const SPRING_BACK: Point = { x: 0, y: 0 };
const LAYER_OFFSETS: Point[] = [
  { x: -54, y: 26 },
  { x: -34, y: 16 },
  { x: -16, y: 7 },
  { x: 0, y: 0 },
];

export function ConnectHoverBanner({
  className,
  label = "CONNECT",
}: {
  className?: string;
  label?: string;
}) {
  const [isHovering, setIsHovering] = useState(false);
  const [trail, setTrail] = useState<Point[]>(
    Array.from({ length: TRAIL_COUNT }, () => ({ ...SPRING_BACK })),
  );

  const targetRef = useRef<Point>({ ...SPRING_BACK });
  const leadRef = useRef<Point>({ ...SPRING_BACK });
  const historyRef = useRef<Point[]>(
    Array.from({ length: TRAIL_COUNT }, () => ({ ...SPRING_BACK })),
  );

  useEffect(() => {
    let frame = 0;

    const tick = () => {
      leadRef.current = {
        x: leadRef.current.x + (targetRef.current.x - leadRef.current.x) * 0.16,
        y: leadRef.current.y + (targetRef.current.y - leadRef.current.y) * 0.16,
      };

      const nextHistory = [leadRef.current, ...historyRef.current.slice(0, TRAIL_COUNT - 1)].map(
        (point, index, points) => {
          if (index === 0) {
            return point;
          }

          const previous = points[index - 1];
          return {
            x: point.x + (previous.x - point.x) * 0.22,
            y: point.y + (previous.y - point.y) * 0.22,
          };
        },
      );

      historyRef.current = nextHistory;
      setTrail(nextHistory);
      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const layers = useMemo(
    () =>
      trail.map((point, index) => {
        const isLead = index === 0;
        const echoIndex = TRAIL_COUNT - 1 - index;
        const base = LAYER_OFFSETS[echoIndex] ?? SPRING_BACK;
        const opacity = isLead ? 1 : isHovering ? Math.max(0.26, 0.9 - index * 0.17) : 0.78;

        return {
          x: point.x + base.x,
          y: point.y + base.y,
          opacity: Math.max(opacity, 0),
        };
      }),
    [isHovering, trail],
  );

  const globeSize = "clamp(2.65rem, 7.15vw, 5.8rem)";
  const textSize = "clamp(3.4rem, 9.35vw, 7.65rem)";

  return (
    <section className={cn("px-4 pb-8 sm:px-6 lg:px-8", className)}>
      <div
        className="relative mx-auto flex h-[13rem] w-full max-w-[1720px] cursor-default items-center justify-center overflow-hidden border-y border-white/10 bg-[#0f1012] text-white sm:h-[14rem] lg:h-[15rem]"
        onPointerEnter={() => setIsHovering(true)}
        onPointerMove={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          const relativeX = (event.clientX - rect.left) / rect.width - 0.5;
          const relativeY = (event.clientY - rect.top) / rect.height - 0.5;

          targetRef.current = {
            x: relativeX * -42,
            y: relativeY * -34,
          };
        }}
        onPointerLeave={() => {
          setIsHovering(false);
          targetRef.current = { ...SPRING_BACK };
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_26%),repeating-radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.06)_0_1px,transparent_1px_24px),linear-gradient(0deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:auto,auto,100%_44px,44px_100%]" />

        <div className="relative flex flex-col items-center justify-center gap-4">
          {[...layers].reverse().map((layer, reverseIndex) => {
            const originalIndex = layers.length - 1 - reverseIndex;
            const isLead = originalIndex === 0;

            return (
              <div
                key={`${label}-${originalIndex}`}
                className={cn(
                  "pointer-events-none absolute flex items-center justify-center transition-transform duration-75 ease-out",
                  isLead
                    ? "text-white"
                    : "text-transparent",
                )}
                style={{
                  transform: `translate(${layer.x}px, ${layer.y}px)`,
                  opacity: layer.opacity,
                }}
              >
                <div className="flex items-center justify-center gap-[0.02em] font-black uppercase leading-none tracking-[-0.08em]">
                  <span
                    className={cn(
                      !isLead && "text-transparent [-webkit-text-stroke:2.2px_rgba(255,255,255,0.98)]",
                    )}
                    style={{ fontSize: textSize }}
                  >
                    C
                  </span>
                  <span
                    className={cn(
                      "relative mx-[0.01em] inline-flex items-center justify-center overflow-hidden rounded-full",
                      !isLead && "border-[2.2px] border-white/95",
                    )}
                    style={{
                      width: globeSize,
                      height: globeSize,
                    }}
                  >
                    <RotatingEarth
                      width={420}
                      height={420}
                      square
                      autoRotateSpeed={0.09}
                      className="size-full"
                    />
                  </span>
                  <span
                    className={cn(
                      !isLead && "text-transparent [-webkit-text-stroke:2.2px_rgba(255,255,255,0.98)]",
                    )}
                    style={{ fontSize: textSize }}
                  >
                    NNECT
                  </span>
                </div>
              </div>
            );
          })}

          <div className="invisible flex items-center justify-center gap-[0.02em] font-black uppercase leading-none tracking-[-0.08em]">
            <span style={{ fontSize: textSize }}>C</span>
            <span
              style={{
                width: globeSize,
                height: globeSize,
              }}
            />
            <span style={{ fontSize: textSize }}>NNECT</span>
          </div>

          <p className="relative z-10 text-center text-sm font-medium tracking-[0.18em] text-white/58 uppercase sm:text-base">
            A Proprietary Technology Platform powered by Altira&apos;s Orbit engine.
          </p>
        </div>
      </div>
    </section>
  );
}
