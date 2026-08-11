"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

type LandFeatureCollection = GeoJSON.FeatureCollection<
  GeoJSON.Polygon | GeoJSON.MultiPolygon,
  { featurecla?: string }
>;

interface RotatingEarthProps {
  width?: number;
  height?: number;
  className?: string;
  square?: boolean;
  autoRotateSpeed?: number;
  interactive?: boolean;
}

interface DotData {
  lng: number;
  lat: number;
}

const INITIAL_ROTATION: [number, number, number] = [-28, -12, 0];
const DOT_SPACING = 20;
const LAND_DATA_URL =
  "https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json";
const MAX_DEVICE_PIXEL_RATIO = 2.25;
const TARGET_FRAME_MS = 1000 / 30;

let landFeaturesPromise: Promise<LandFeatureCollection> | null = null;
let dotCachePromise: Promise<DotData[]> | null = null;

type IdleHandle = ReturnType<typeof window.setTimeout> | number;

function generateDotsInFeature(
  feature: GeoJSON.Feature<GeoJSON.Polygon | GeoJSON.MultiPolygon>,
  dotSpacing = DOT_SPACING,
) {
  const dots: DotData[] = [];
  const bounds = d3.geoBounds(feature);
  const [[minLng, minLat], [maxLng, maxLat]] = bounds;
  const stepSize = dotSpacing * 0.08;

  for (let lng = minLng; lng <= maxLng; lng += stepSize) {
    for (let lat = minLat; lat <= maxLat; lat += stepSize) {
      if (d3.geoContains(feature, [lng, lat])) {
        dots.push({ lng, lat });
      }
    }
  }

  return dots;
}

function getLandFeatures() {
  if (!landFeaturesPromise) {
    landFeaturesPromise = fetch(LAND_DATA_URL, { cache: "force-cache" }).then((response) => {
      if (!response.ok) {
        throw new Error("Failed to load land data");
      }

      return response.json() as Promise<LandFeatureCollection>;
    });
  }

  return landFeaturesPromise;
}

function getAllDots() {
  if (!dotCachePromise) {
    dotCachePromise = getLandFeatures().then((landFeatures) =>
      landFeatures.features.flatMap((feature) => generateDotsInFeature(feature)),
    );
  }

  return dotCachePromise;
}

function scheduleIdleWork(callback: IdleRequestCallback) {
  if (typeof window !== "undefined" && window.requestIdleCallback) {
    return window.requestIdleCallback(callback, { timeout: 120 });
  }

  return window.setTimeout(
    () =>
      callback({
        didTimeout: false,
        timeRemaining: () => 8,
      } as IdleDeadline),
    16,
  );
}

function cancelIdleWork(handle: IdleHandle) {
  if (typeof window !== "undefined" && window.cancelIdleCallback) {
    window.cancelIdleCallback(handle as number);
    return;
  }

  window.clearTimeout(handle);
}

export default function RotatingEarth({
  width = 800,
  height = 600,
  className = "",
  square = false,
  autoRotateSpeed = 0.18,
  interactive = false,
}: RotatingEarthProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInViewRef = useRef(true);
  const isDocumentVisibleRef = useRef(true);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const context = canvas.getContext("2d");
    if (!context) return;
    let containerWidth = 0;
    let containerHeight = 0;
    let radius = 0;
    let projection = d3.geoOrthographic();
    let path = d3.geoPath(projection, context);
    const graticule = d3.geoGraticule();
    let allDots: DotData[] = [];
    let landFeatures: LandFeatureCollection | null = null;
    let hasLoadedDots = false;
    let animationFrame = 0;
    let idleHandle: IdleHandle = 0;
    let cancelled = false;
    let phi = INITIAL_ROTATION[0];
    let theta = INITIAL_ROTATION[1];
    let lastFrameTime = 0;
    let resizeObserver: ResizeObserver | null = null;
    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let dragStartPhi = phi;
    let dragStartTheta = theta;

    const syncCanvasSize = () => {
      const rect = container.getBoundingClientRect();
      const fallbackWidth = Math.min(width, window.innerWidth - 40);
      const fallbackHeight = Math.min(height, window.innerHeight - 100);
      const measuredWidth = rect.width > 0 ? rect.width : fallbackWidth;
      const measuredHeight = rect.height > 0 ? rect.height : fallbackHeight;

      containerWidth = square ? Math.min(measuredWidth, measuredHeight || measuredWidth) : measuredWidth;
      containerHeight = square ? containerWidth : measuredHeight;
      radius = Math.min(containerWidth, containerHeight) / 2.5;

      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DEVICE_PIXEL_RATIO);
      canvas.width = Math.max(1, Math.round(containerWidth * dpr));
      canvas.height = Math.max(1, Math.round(containerHeight * dpr));
      canvas.style.width = `${containerWidth}px`;
      canvas.style.height = `${containerHeight}px`;
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.scale(dpr, dpr);

      projection = d3
        .geoOrthographic()
        .scale(radius)
        .translate([containerWidth / 2, containerHeight / 2])
        .rotate([phi, theta, INITIAL_ROTATION[2]])
        .clipAngle(90);

      path = d3.geoPath(projection, context);
    };

    const render = () => {
      if (!containerWidth || !containerHeight) return;
      context.clearRect(0, 0, containerWidth, containerHeight);

      const currentScale = projection.scale();
      const scaleFactor = currentScale / radius;

      context.beginPath();
      context.arc(containerWidth / 2, containerHeight / 2, currentScale, 0, 2 * Math.PI);
      context.fillStyle = "#050608";
      context.fill();
      context.strokeStyle = "rgba(255,255,255,0.78)";
      context.lineWidth = 1.7 * scaleFactor;
      context.stroke();

      context.beginPath();
      path(graticule());
      context.strokeStyle = "rgba(255,255,255,0.16)";
      context.lineWidth = 0.9 * scaleFactor;
      context.stroke();

      if (!landFeatures) {
        return;
      }

      context.beginPath();
      landFeatures.features.forEach((feature) => {
        path(feature);
      });
      context.strokeStyle = "rgba(255,255,255,0.24)";
      context.lineWidth = 0.8 * scaleFactor;
      context.stroke();

      for (let i = 0; i < allDots.length; i += 1) {
        const dot = allDots[i];
        const projected = projection([dot.lng, dot.lat]);
        if (!projected) continue;
        if (
          projected[0] < 0 ||
          projected[0] > containerWidth ||
          projected[1] < 0 ||
          projected[1] > containerHeight
        ) {
          continue;
        }

        context.beginPath();
        context.arc(projected[0], projected[1], 1.15 * scaleFactor, 0, 2 * Math.PI);
        context.fillStyle = "rgba(225,229,235,0.94)";
        context.fill();
      }
    };

    const animate = (timestamp: number) => {
      animationFrame = window.requestAnimationFrame(animate);

      if (!hasLoadedDots || !isInViewRef.current || !isDocumentVisibleRef.current) {
        return;
      }

      if (timestamp - lastFrameTime < TARGET_FRAME_MS) {
        return;
      }

      lastFrameTime = timestamp;
      phi += autoRotateSpeed;
      projection.rotate([phi, theta, INITIAL_ROTATION[2]]);
      render();
    };

    const updateRotation = (nextPhi: number, nextTheta: number) => {
      phi = nextPhi;
      theta = Math.max(-50, Math.min(50, nextTheta));
      projection.rotate([phi, theta, INITIAL_ROTATION[2]]);
      render();
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (!interactive) return;
      isDragging = true;
      dragStartX = event.clientX;
      dragStartY = event.clientY;
      dragStartPhi = phi;
      dragStartTheta = theta;
      canvas.setPointerCapture(event.pointerId);
      canvas.style.cursor = "grabbing";
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!interactive || !isDragging) return;
      const deltaX = event.clientX - dragStartX;
      const deltaY = event.clientY - dragStartY;
      updateRotation(dragStartPhi + deltaX * 0.015, dragStartTheta - deltaY * 0.01);
    };

    const endDrag = (event?: PointerEvent) => {
      if (!interactive) return;
      isDragging = false;
      if (event && canvas.hasPointerCapture(event.pointerId)) {
        canvas.releasePointerCapture(event.pointerId);
      }
      canvas.style.cursor = interactive ? "grab" : "default";
    };

    const finishSetup = (dots: DotData[]) => {
      if (cancelled) {
        return;
      }

      allDots = dots;
      hasLoadedDots = true;
      setIsReady(true);
      canvas.style.opacity = "1";
      animationFrame = window.requestAnimationFrame(animate);
    };

    const loadWorldData = async () => {
      try {
        setError(null);
        setIsReady(false);
        syncCanvasSize();
        render();

        landFeatures = await getLandFeatures();
        const dots = await getAllDots();
        finishSetup(dots);
      } catch {
        if (cancelled) return;
        setError("Failed to load land map data");
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry?.isIntersecting ?? false;
      },
      { threshold: 0.1 },
    );

    observer.observe(container);
    resizeObserver = new ResizeObserver(() => {
      syncCanvasSize();
      render();
    });
    resizeObserver.observe(container);

    const handleVisibilityChange = () => {
      isDocumentVisibleRef.current = !document.hidden;
    };

    handleVisibilityChange();
    document.addEventListener("visibilitychange", handleVisibilityChange);
    if (interactive) {
      canvas.style.cursor = "grab";
      canvas.addEventListener("pointerdown", handlePointerDown);
      canvas.addEventListener("pointermove", handlePointerMove);
      canvas.addEventListener("pointerup", endDrag);
      canvas.addEventListener("pointerleave", endDrag);
      canvas.addEventListener("pointercancel", endDrag);
    }

    syncCanvasSize();
    render();
    idleHandle = scheduleIdleWork(() => {
      void loadWorldData();
    });

    return () => {
      cancelled = true;
      observer.disconnect();
      resizeObserver?.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (interactive) {
        canvas.removeEventListener("pointerdown", handlePointerDown);
        canvas.removeEventListener("pointermove", handlePointerMove);
        canvas.removeEventListener("pointerup", endDrag);
        canvas.removeEventListener("pointerleave", endDrag);
        canvas.removeEventListener("pointercancel", endDrag);
      }
      cancelIdleWork(idleHandle);
      window.cancelAnimationFrame(animationFrame);
    };
  }, [autoRotateSpeed, height, interactive, square, width]);

  if (error) {
    return (
      <div className={`flex items-center justify-center rounded-2xl bg-[#111315] p-8 ${className}`}>
        <div className="text-center">
          <p className="mb-2 font-semibold text-red-400">Error loading Earth visualization</p>
          <p className="text-sm text-white/56">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className={`h-auto w-full rounded-2xl bg-transparent transition-opacity duration-300 ${
          isReady ? "opacity-100" : "opacity-0"
        }`}
        style={{ maxWidth: "100%", height: "auto" }}
      />
    </div>
  );
}
