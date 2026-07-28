"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import createGlobe from "cobe";

export interface LiveMarker {
  id: string;
  location: [number, number];
}

interface MarkerPosition {
  id: string;
  label: string;
  x: number;
  y: number;
  visible: boolean;
}

interface GlobeLiveProps {
  markers?: LiveMarker[];
  className?: string;
  speed?: number;
}

const defaultMarkers: LiveMarker[] = [
  { id: "cape-town", location: [-33.92, 18.42] },
  { id: "johannesburg", location: [-26.2, 28.04] },
  { id: "shenzhen", location: [22.54, 114.06] },
  { id: "new-york", location: [40.71, -74.01] },
  { id: "london", location: [51.51, -0.13] },
];

function toLabel(id: string) {
  return id
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function projectMarker(
  latitude: number,
  longitude: number,
  phi: number,
  theta: number,
) {
  const lat = (latitude * Math.PI) / 180;
  const lon = (longitude * Math.PI) / 180;

  let x = Math.cos(lat) * Math.sin(lon);
  let y = Math.sin(lat);
  let z = Math.cos(lat) * Math.cos(lon);

  const cosPhi = Math.cos(phi);
  const sinPhi = Math.sin(phi);
  const xRotY = x * cosPhi + z * sinPhi;
  const zRotY = -x * sinPhi + z * cosPhi;

  x = xRotY;
  z = zRotY;

  const cosTheta = Math.cos(theta);
  const sinTheta = Math.sin(theta);
  const yRotX = y * cosTheta - z * sinTheta;
  const zRotX = y * sinTheta + z * cosTheta;

  return {
    x: 50 + x * 31,
    y: 50 - yRotX * 31,
    visible: zRotX > 0.08,
    depth: zRotX,
  };
}

export function GlobeLive({
  markers = defaultMarkers,
  className = "",
  speed = 0.0024,
}: GlobeLiveProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null);
  const dragOffset = useRef({ phi: 0, theta: 0 });
  const phiOffsetRef = useRef(0);
  const thetaOffsetRef = useRef(0);
  const isPausedRef = useRef(false);
  const [mounted, setMounted] = useState(false);
  const [markerPositions, setMarkerPositions] = useState<MarkerPosition[]>([]);
  const theta = 0.2;

  const normalizedMarkers = useMemo(
    () => markers.map((marker) => ({ ...marker, label: toLabel(marker.id) })),
    [markers],
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePointerDown = useCallback((event: React.PointerEvent<HTMLCanvasElement>) => {
    pointerInteracting.current = { x: event.clientX, y: event.clientY };
    dragOffset.current = { phi: 0, theta: 0 };
    isPausedRef.current = true;

    if (canvasRef.current) {
      canvasRef.current.style.cursor = "grabbing";
    }
  }, []);

  const handlePointerUp = useCallback(() => {
    if (pointerInteracting.current !== null) {
      phiOffsetRef.current += dragOffset.current.phi;
      thetaOffsetRef.current += dragOffset.current.theta;
      dragOffset.current = { phi: 0, theta: 0 };
    }

    pointerInteracting.current = null;
    isPausedRef.current = false;

    if (canvasRef.current) {
      canvasRef.current.style.cursor = "grab";
    }
  }, []);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      if (pointerInteracting.current === null) return;

      dragOffset.current = {
        phi: (event.clientX - pointerInteracting.current.x) / 260,
        theta: Math.max(-0.45, Math.min(0.45, (event.clientY - pointerInteracting.current.y) / 500)),
      };
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [handlePointerUp]);

  useEffect(() => {
    if (!mounted || !canvasRef.current) return;

    const canvas = canvasRef.current;
    let phi = 0;
    let animationId = 0;

    const globe = createGlobe(canvas, {
      devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
      width: 1200,
      height: 1200,
      phi: 0,
      theta,
      dark: 0,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 8,
      mapBaseBrightness: 0.1,
      baseColor: [1, 1, 1],
      markerColor: [1, 1, 1],
      glowColor: [1, 1, 1],
      markers: [],
      opacity: 1,
    });

    canvas.style.opacity = "1";
    canvas.style.cursor = "grab";

    const animate = () => {
      if (!isPausedRef.current) {
        phi += speed;
      }

      const effectivePhi = phi + phiOffsetRef.current + dragOffset.current.phi;
      const effectiveTheta = Math.max(
        -0.6,
        Math.min(0.6, theta + thetaOffsetRef.current + dragOffset.current.theta),
      );

      globe.update({
        phi: effectivePhi,
        theta: effectiveTheta,
        width: canvas.offsetWidth * 2,
        height: canvas.offsetHeight * 2,
      });

      setMarkerPositions(
        normalizedMarkers.map((marker) => {
          const projected = projectMarker(
            marker.location[0],
            marker.location[1],
            effectivePhi,
            effectiveTheta,
          );

          return {
            id: marker.id,
            label: marker.label,
            x: projected.x,
            y: projected.y,
            visible: projected.visible,
          };
        }),
      );

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      globe.destroy();
    };
  }, [mounted, normalizedMarkers, speed]);

  return (
    <div
      className={`relative aspect-square w-full overflow-hidden ${className}`}
    >
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        className="relative z-10 h-full w-full opacity-0 transition-opacity duration-700"
        style={{ touchAction: "none" }}
      />
      <div className="pointer-events-none absolute inset-0 z-20">
        {markerPositions.map((marker) => (
          <div
            key={marker.id}
            className="absolute transition-[opacity,transform] duration-300"
            style={{
              left: `${marker.x}%`,
              top: `${marker.y}%`,
              opacity: marker.visible ? 1 : 0,
              transform: marker.visible
                ? "translate(-50%, -140%) scale(1)"
                : "translate(-50%, -128%) scale(0.92)",
            }}
          >
            <div className="flex items-center overflow-hidden rounded-md border border-white/8 bg-[#171717]/95 shadow-[0_12px_30px_rgba(0,0,0,0.32)] backdrop-blur-md">
              <span className="flex items-center gap-1.5 border-r border-white/8 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#ff5a4f]">
                <span className="h-2 w-2 rounded-full bg-[#ff453a]" />
                Live
              </span>
              <span className="px-3 py-2 text-[11px] font-medium text-white/86">
                {marker.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
