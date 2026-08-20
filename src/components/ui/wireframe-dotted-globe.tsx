"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

interface RotatingEarthProps {
  width?: number;
  height?: number;
  className?: string;
  square?: boolean;
  autoRotateSpeed?: number;
  interactive?: boolean;
  dotSpacing?: number;
  maxDevicePixelRatio?: number;
  dragSensitivityX?: number;
  dragSensitivityY?: number;
  initialRotation?: [number, number, number];
  markers?: Array<{
    location: [number, number];
    color?: string;
    radius?: number;
    glowColor?: string;
  }>;
  jumpingArcCount?: number;
  onReady?: () => void;
  instantReady?: boolean;
  pauseWhenHidden?: boolean;
  networkConnections?: boolean;
  networkStartDelayMs?: number;
  baseOpacity?: number;
}

interface DotData {
  lng: number;
  lat: number;
}

const EMPTY_MARKERS: Array<{
  location: [number, number];
  color?: string;
  radius?: number;
  glowColor?: string;
}> = [];

interface JumpingArcData {
  from: [number, number];
  to: [number, number];
}

type NetworkRoute = {
  from: [number, number];
  to: [number, number];
  points: Array<[number, number]>;
  elevation: number;
  duration: number;
};

type LandFeature = {
  geometry: {
    type: "Polygon" | "MultiPolygon";
    coordinates: number[][][] | number[][][][];
  };
  properties?: Record<string, unknown>;
};

type LandFeatureCollection = {
  features: LandFeature[];
};

const LAND_DATA_URL =
  "https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json";
const INITIAL_ROTATION: [number, number, number] = [0, 0, 0];
const FULL_TURN = Math.PI * 2;

const NETWORK_LINKS: Array<[[number, number], [number, number]]> = [
  [[-33.9249, 18.4241], [51.5074, -0.1278]],
  [[51.5074, -0.1278], [25.2048, 55.2708]],
  [[25.2048, 55.2708], [1.3521, 103.8198]],
  [[1.3521, 103.8198], [-33.8688, 151.2093]],
  [[40.7128, -74.006], [51.5074, -0.1278]],
  [[-33.9249, 18.4241], [25.2048, 55.2708]],
  [[-26.2041, 28.0473], [-1.2921, 36.8219]],
  [[-1.2921, 36.8219], [25.2048, 55.2708]],
  [[48.8566, 2.3522], [51.5074, -0.1278]],
  [[50.1109, 8.6821], [25.2048, 55.2708]],
  [[19.076, 72.8777], [1.3521, 103.8198]],
  [[35.6762, 139.6503], [1.3521, 103.8198]],
  [[37.5665, 126.978], [35.6762, 139.6503]],
  [[-33.8688, 151.2093], [-36.8485, 174.7633]],
  [[-23.5505, -46.6333], [40.7128, -74.006]],
  [[43.6532, -79.3832], [40.7128, -74.006]],
  [[19.4326, -99.1332], [40.7128, -74.006]],
  [[6.5244, 3.3792], [51.5074, -0.1278]],
  [[6.5244, 3.3792], [25.2048, 55.2708]],
  [[41.0082, 28.9784], [25.2048, 55.2708]],
  [[51.5074, -0.1278], [50.1109, 8.6821]],
  [[-1.2921, 36.8219], [1.3521, 103.8198]],
];

let landDataPromise: Promise<LandFeatureCollection> | null = null;
const dotCache = new Map<number, Promise<DotData[]>>();

function getLandData() {
  if (!landDataPromise) {
    landDataPromise = fetch(LAND_DATA_URL).then(async (response) => {
      if (!response.ok) {
        throw new Error("Failed to load land data");
      }

      return (await response.json()) as LandFeatureCollection;
    });
  }

  return landDataPromise;
}

function pointInPolygon(point: [number, number], polygon: number[][]): boolean {
  const [x, y] = point;
  let inside = false;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];

    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
      inside = !inside;
    }
  }

  return inside;
}

function pointInFeature(point: [number, number], feature: LandFeature): boolean {
  const geometry = feature.geometry;

  if (geometry.type === "Polygon") {
    const coordinates = geometry.coordinates as number[][][];
    if (!pointInPolygon(point, coordinates[0])) {
      return false;
    }

    for (let i = 1; i < coordinates.length; i += 1) {
      if (pointInPolygon(point, coordinates[i])) {
        return false;
      }
    }

    return true;
  }

  if (geometry.type === "MultiPolygon") {
    const coordinates = geometry.coordinates as number[][][][];

    for (const polygon of coordinates) {
      if (pointInPolygon(point, polygon[0])) {
        let inHole = false;

        for (let i = 1; i < polygon.length; i += 1) {
          if (pointInPolygon(point, polygon[i])) {
            inHole = true;
            break;
          }
        }

        if (!inHole) {
          return true;
        }
      }
    }
  }

  return false;
}

function generateDotsInPolygon(feature: LandFeature, dotSpacing: number) {
  const dots: DotData[] = [];
  const bounds = d3.geoBounds(feature as never);
  const [[minLng, minLat], [maxLng, maxLat]] = bounds;
  const stepSize = dotSpacing * 0.08;

  for (let lng = minLng; lng <= maxLng; lng += stepSize) {
    for (let lat = minLat; lat <= maxLat; lat += stepSize) {
      const point: [number, number] = [lng, lat];
      if (pointInFeature(point, feature)) {
        dots.push({ lng, lat });
      }
    }
  }

  return dots;
}

function getDotsForSpacing(dotSpacing: number) {
  const existing = dotCache.get(dotSpacing);
  if (existing) {
    return existing;
  }

  const promise = getLandData().then((landFeatures) =>
    landFeatures.features.flatMap((feature) => generateDotsInPolygon(feature, dotSpacing)),
  );

  dotCache.set(dotSpacing, promise);
  return promise;
}

function wrapLongitude(lng: number) {
  return ((lng + 540) % 360) - 180;
}

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function isLocationVisible(
  location: [number, number],
  rotation: [number, number, number],
  margin = 0.06,
) {
  const [lat, lng] = location;
  const centerLng = -rotation[0];
  const centerLat = -rotation[1];
  return d3.geoDistance([lng, lat], [centerLng, centerLat]) <= Math.PI / 2 - margin;
}

function interpolateGreatArc(
  from: [number, number],
  to: [number, number],
  steps = 40,
) {
  const interpolator = d3.geoInterpolate([from[1], from[0]], [to[1], to[0]]);
  return Array.from({ length: steps + 1 }, (_, index) => {
    const [lng, lat] = interpolator(index / steps);
    return [lat, lng] as [number, number];
  });
}

const NETWORK_ROUTES: NetworkRoute[] = NETWORK_LINKS.map(([from, to], index) => {
  const distance = d3.geoDistance([from[1], from[0]], [to[1], to[0]]);
  return {
    from,
    to,
    points: interpolateGreatArc(from, to, 32),
    elevation: 0.055 + (distance / Math.PI) * 0.13,
    duration: 560 + (index % 5) * 55,
  };
});

export default function RotatingEarth({
  width = 800,
  height = 600,
  className = "",
  square = false,
  autoRotateSpeed = 0.5,
  interactive = false,
  dotSpacing = 16,
  maxDevicePixelRatio = 1.5,
  dragSensitivityX = 0.5,
  dragSensitivityY = 0.5,
  initialRotation = INITIAL_ROTATION,
  markers = EMPTY_MARKERS,
  jumpingArcCount = 0,
  onReady,
  instantReady = false,
  pauseWhenHidden = true,
  networkConnections = false,
  networkStartDelayMs = 0,
  baseOpacity = 1,
}: RotatingEarthProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
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
    let baseRadius = 0;
    let projection = d3.geoOrthographic();
    let path = d3.geoPath(projection, context);
    let graticule = d3.geoGraticule();
    let landFeatures: LandFeatureCollection | null = null;
    let allDots: DotData[] = [];
    let hasLoadedData = false;
    let cancelled = false;
    let readyFrame = 0;
    let settledFrame = 0;
    let isMostlyVisible = true;
    let networkStartAt = Number.POSITIVE_INFINITY;

    const rotation: [number, number, number] = [
      initialRotation[0],
      initialRotation[1],
      initialRotation[2] ?? 0,
    ];
    const targetRotation: [number, number, number] = [...rotation];
    let isDragging = false;
    let inertiaX = 0;
    let inertiaY = 0;
    let timer: ReturnType<typeof d3.timer> | null = null;
    const jumpingArcs: JumpingArcData[] = [];
    let jumpingArcLife = 0;
    let jumpingArcSwapInterval = 140;

    const spawnJumpingArc = (fromOverride?: [number, number]) => {
      if (!allDots.length) {
        return null;
      }

      const visibleDots = allDots.filter((dot) =>
        isLocationVisible([dot.lat, dot.lng], rotation, 0.14),
      );
      const sourcePool = visibleDots.length > 80 ? visibleDots : allDots;

      for (let attempt = 0; attempt < 24; attempt += 1) {
        const fromDot = fromOverride
          ? { lat: fromOverride[0], lng: fromOverride[1] }
          : sourcePool[Math.floor(Math.random() * sourcePool.length)];
        const toDot = sourcePool[Math.floor(Math.random() * sourcePool.length)];

        if (!fromDot || !toDot) {
          continue;
        }

        const from: [number, number] = [fromDot.lat, wrapLongitude(fromDot.lng)];
        const to: [number, number] = [toDot.lat, wrapLongitude(toDot.lng)];
        const angularDistance = d3.geoDistance([from[1], from[0]], [to[1], to[0]]);

        if (angularDistance < 0.42 || angularDistance > 1.7) {
          continue;
        }

        return {
          from,
          to,
        } satisfies JumpingArcData;
      }

      return null;
    };

    const syncCanvasSize = () => {
      const rect = container.getBoundingClientRect();
      const fallbackWidth = Math.min(width, window.innerWidth - 40);
      const fallbackHeight = Math.min(height, window.innerHeight - 100);
      const measuredWidth = rect.width > 0 ? rect.width : fallbackWidth;
      const measuredHeight = rect.height > 0 ? rect.height : fallbackHeight;

      containerWidth = square ? Math.min(measuredWidth, measuredHeight || measuredWidth) : measuredWidth;
      containerHeight = square ? containerWidth : measuredHeight;
      baseRadius = Math.min(containerWidth, containerHeight) / 2.5;

      const dpr = Math.min(window.devicePixelRatio || 1, maxDevicePixelRatio);
      canvas.width = Math.max(1, Math.round(containerWidth * dpr));
      canvas.height = Math.max(1, Math.round(containerHeight * dpr));
      canvas.style.width = `${containerWidth}px`;
      canvas.style.height = `${containerHeight}px`;

      context.setTransform(1, 0, 0, 1, 0, 0);
      context.scale(dpr, dpr);

      projection = d3
        .geoOrthographic()
        .scale(baseRadius)
        .translate([containerWidth / 2, containerHeight / 2])
        .rotate(rotation)
        .clipAngle(90);

      path = d3.geoPath().projection(projection).context(context);
      graticule = d3.geoGraticule();
    };

    const drawNetworkNode = (location: [number, number]) => {
      if (!isLocationVisible(location, rotation, 0.015)) return;
      const projected = projection([location[1], location[0]]);
      if (!projected) return;

      const nodeRadius = Math.max(1.2, 1.7 * (projection.scale() / baseRadius));
      const glowRadius = nodeRadius * 5.5;
      const glow = context.createRadialGradient(
        projected[0],
        projected[1],
        0,
        projected[0],
        projected[1],
        glowRadius,
      );
      glow.addColorStop(0, "rgba(255,255,255,1)");
      glow.addColorStop(0.16, "rgba(255,255,255,1)");
      glow.addColorStop(0.42, "rgba(255,255,255,1)");
      glow.addColorStop(1, "rgba(255,255,255,0)");
      context.beginPath();
      context.arc(projected[0], projected[1], glowRadius, 0, FULL_TURN);
      context.fillStyle = glow;
      context.fill();
      context.beginPath();
      context.arc(projected[0], projected[1], nodeRadius, 0, FULL_TURN);
      context.fillStyle = "rgba(255,255,255,1)";
      context.fill();
    };

    const drawConnectionNetwork = () => {
      if (!networkConnections || !Number.isFinite(networkStartAt)) return;
      const elapsed = performance.now() - networkStartAt;
      if (elapsed < 0) return;

      const centerX = containerWidth / 2;
      const centerY = containerHeight / 2;
      const scaleFactor = projection.scale() / baseRadius;

      NETWORK_ROUTES.forEach((route, routeIndex) => {
        const startedAt = routeIndex * 92;
        const progress = Math.max(0, Math.min(1, (elapsed - startedAt) / route.duration));
        if (progress <= 0) return;

        const pointCount = Math.max(2, Math.ceil((route.points.length - 1) * progress) + 1);
        let previousPoint: [number, number] | null = null;

        context.beginPath();
        for (let pointIndex = 0; pointIndex < pointCount; pointIndex += 1) {
          const point = route.points[pointIndex];
          if (!point || !isLocationVisible(point, rotation, 0.01)) {
            previousPoint = null;
            continue;
          }

          const projected = projection([point[1], point[0]]);
          if (!projected) {
            previousPoint = null;
            continue;
          }

          const progressAlongRoute = pointIndex / (route.points.length - 1);
          const lift = 1 + route.elevation * Math.sin(Math.PI * progressAlongRoute);
          const elevatedPoint: [number, number] = [
            centerX + (projected[0] - centerX) * lift,
            centerY + (projected[1] - centerY) * lift,
          ];

          if (previousPoint) {
            context.moveTo(previousPoint[0], previousPoint[1]);
            context.lineTo(elevatedPoint[0], elevatedPoint[1]);
          }
          previousPoint = elevatedPoint;
        }

        context.strokeStyle = "rgba(235,235,235,1)";
        context.lineWidth = Math.max(0.8, 1.05 * scaleFactor);
        context.lineCap = "round";
        context.lineJoin = "round";
        context.shadowColor = "rgba(255,255,255,0.2)";
        context.shadowBlur = 2 * scaleFactor;
        context.stroke();
        context.shadowBlur = 0;

        drawNetworkNode(route.from);
        if (progress >= 1) {
          drawNetworkNode(route.to);
        }
      });
    };

    const render = () => {
      if (!containerWidth || !containerHeight) return;

      projection.rotate(rotation);
      context.clearRect(0, 0, containerWidth, containerHeight);
      context.globalAlpha = baseOpacity;

      const currentScale = projection.scale();
      const scaleFactor = currentScale / baseRadius;

      context.beginPath();
      context.arc(containerWidth / 2, containerHeight / 2, currentScale, 0, 2 * Math.PI);
      context.fillStyle = "#000000";
      context.fill();
      context.strokeStyle = "#ffffff";
      context.lineWidth = 2 * scaleFactor;
      context.stroke();

      if (!landFeatures) {
        return;
      }

      context.beginPath();
      path(graticule());
      context.strokeStyle = "#ffffff";
      context.lineWidth = 1 * scaleFactor;
      context.globalAlpha = baseOpacity * 0.25;
      context.stroke();
      context.globalAlpha = baseOpacity;

      context.beginPath();
      landFeatures.features.forEach((feature) => {
        path(feature as never);
      });
      context.strokeStyle = "#ffffff";
      context.lineWidth = 1 * scaleFactor;
      context.stroke();

      allDots.forEach((dot) => {
        const projected = projection([dot.lng, dot.lat]);
        if (
          projected &&
          projected[0] >= 0 &&
          projected[0] <= containerWidth &&
          projected[1] >= 0 &&
          projected[1] <= containerHeight
        ) {
          context.beginPath();
          context.arc(projected[0], projected[1], 1.2 * scaleFactor, 0, 2 * Math.PI);
          context.fillStyle = "#999999";
          context.fill();
        }
      });

      context.globalAlpha = 1;
      drawConnectionNetwork();

      const centerLng = -rotation[0];
      const centerLat = -rotation[1];

      markers.forEach((marker) => {
        const [lat, lng] = marker.location;
        const angularDistance = d3.geoDistance([lng, lat], [centerLng, centerLat]);
        if (angularDistance > Math.PI / 2) {
          return;
        }

        const projected = projection([lng, lat]);
        if (!projected) {
          return;
        }

        const glowRadius = (marker.radius ?? 3.2) * 2.8 * scaleFactor;
        const coreRadius = (marker.radius ?? 3.2) * scaleFactor;

        context.beginPath();
        context.arc(projected[0], projected[1], glowRadius, 0, 2 * Math.PI);
        context.fillStyle = marker.glowColor ?? "rgba(63,233,236,0.28)";
        context.fill();

        context.beginPath();
        context.arc(projected[0], projected[1], coreRadius, 0, 2 * Math.PI);
        context.fillStyle = marker.color ?? "#3FE9EC";
        context.fill();

        context.beginPath();
        context.arc(projected[0], projected[1], Math.max(1, coreRadius * 0.45), 0, 2 * Math.PI);
        context.fillStyle = "#d4ffff";
        context.fill();
      });

      jumpingArcs.forEach((arc) => {
        const pathPoints = interpolateGreatArc(arc.from, arc.to, 72)
          .map(([lat, lng]) => projection([lng, lat]))
          .filter((point): point is [number, number] => Boolean(point));

        if (pathPoints.length < 6) {
          return;
        }

        const arcIndex = jumpingArcs.indexOf(arc);
        const depthFactor = 1 - arcIndex / Math.max(1, jumpingArcs.length + 1);
        const alpha = 0.42 + depthFactor * 0.38;

        context.beginPath();
        pathPoints.forEach((point, index) => {
          const [x, y] = point;
          if (index === 0) {
            context.moveTo(x, y);
            return;
          }

          context.lineTo(x, y);
        });
        context.strokeStyle = `rgba(63, 233, 236, ${alpha})`;
        context.lineWidth = Math.max(1, scaleFactor);
        context.shadowColor = `rgba(63, 233, 236, ${alpha * 0.4})`;
        context.shadowBlur = 4 * scaleFactor;
        context.stroke();
        context.shadowBlur = 0;

        const firstPoint = pathPoints[0];
        const lastPoint = pathPoints[pathPoints.length - 1];
        const endpointRadius = Math.max(1.4, 1.8 * scaleFactor);

        context.beginPath();
        context.arc(firstPoint[0], firstPoint[1], endpointRadius, 0, FULL_TURN);
        context.arc(lastPoint[0], lastPoint[1], endpointRadius, 0, FULL_TURN);
        context.fillStyle = `rgba(63, 233, 236, ${Math.min(1, alpha + 0.06)})`;
        context.fill();
      });
    };

    const loadWorldData = async () => {
      try {
        setError(null);
        setIsReady(false);

        const [features, dots] = await Promise.all([getLandData(), getDotsForSpacing(dotSpacing)]);
        if (cancelled) return;

        landFeatures = features;
        allDots = dots;
        hasLoadedData = true;
        networkStartAt = networkConnections
          ? performance.now() + networkStartDelayMs
          : Number.POSITIVE_INFINITY;
        jumpingArcs.length = 0;
        if (jumpingArcCount > 0) {
          const firstArc = spawnJumpingArc();
          if (firstArc) {
            jumpingArcs.push(firstArc);

            for (let index = 1; index < jumpingArcCount; index += 1) {
              const previousArc = jumpingArcs[jumpingArcs.length - 1];
              const nextArc = spawnJumpingArc(previousArc.to);
              if (!nextArc) {
                break;
              }

              jumpingArcs.push(nextArc);
            }
          }
        }
        jumpingArcLife = 0;
        jumpingArcSwapInterval = randomBetween(110, 170);
        render();
        setIsReady(true);
        readyFrame = window.requestAnimationFrame(() => {
          settledFrame = window.requestAnimationFrame(() => {
            if (cancelled) return;
            syncCanvasSize();
            render();
            onReady?.();
          });
        });
      } catch {
        if (cancelled) return;
        setError("Failed to load land map data");
        setIsReady(true);
      }
    };

    const rotate = () => {
      if (!hasLoadedData || !isMostlyVisible) {
        return;
      }

      if (!isDragging) {
        targetRotation[0] += autoRotateSpeed;
        targetRotation[0] += inertiaX;
        targetRotation[1] = Math.max(-90, Math.min(90, targetRotation[1] + inertiaY));
        inertiaX *= 0.92;
        inertiaY *= 0.9;

        if (Math.abs(inertiaX) < 0.003) inertiaX = 0;
        if (Math.abs(inertiaY) < 0.003) inertiaY = 0;
      }

      if (jumpingArcCount > 0 && jumpingArcs.length > 0) {
        jumpingArcLife += 1;

        const chainNeedsRefresh =
          jumpingArcLife >= jumpingArcSwapInterval ||
          jumpingArcs.every(
            (arc) => !isLocationVisible(arc.from, rotation, 0.01) && !isLocationVisible(arc.to, rotation, 0.01),
          );

        if (chainNeedsRefresh) {
          const lastArc = jumpingArcs[jumpingArcs.length - 1];
          const nextArc = spawnJumpingArc(lastArc.to);

          if (nextArc) {
            if (jumpingArcs.length >= jumpingArcCount) {
              jumpingArcs.shift();
            }

            jumpingArcs.push(nextArc);
          }

          jumpingArcLife = 0;
          jumpingArcSwapInterval = randomBetween(110, 170);
        }
      }

      rotation[0] += (targetRotation[0] - rotation[0]) * 0.12;
      rotation[1] += (targetRotation[1] - rotation[1]) * 0.12;
      render();
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (!interactive) return;

      isDragging = true;
      inertiaX = 0;
      inertiaY = 0;
      const startX = event.clientX;
      const startY = event.clientY;
      const startRotation: [number, number, number] = [...targetRotation];
      canvas.setPointerCapture(event.pointerId);
      canvas.style.cursor = "grabbing";

      let lastX = event.clientX;
      let lastY = event.clientY;
      let lastTime = performance.now();

      const handlePointerMove = (moveEvent: PointerEvent) => {
        const dx = moveEvent.clientX - startX;
        const dy = moveEvent.clientY - startY;

        targetRotation[0] = startRotation[0] + dx * dragSensitivityX;
        targetRotation[1] = Math.max(-90, Math.min(90, startRotation[1] - dy * dragSensitivityY));

        const now = performance.now();
        const deltaTime = Math.max(16, now - lastTime);
        inertiaX = ((moveEvent.clientX - lastX) * dragSensitivityX) / (deltaTime / 16);
        inertiaY = (-(moveEvent.clientY - lastY) * dragSensitivityY) / (deltaTime / 16);
        lastX = moveEvent.clientX;
        lastY = moveEvent.clientY;
        lastTime = now;
      };

      const handlePointerUp = () => {
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerup", handlePointerUp);
        window.removeEventListener("pointercancel", handlePointerUp);
        isDragging = false;
        canvas.style.cursor = "grab";
      };

      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
      window.addEventListener("pointercancel", handlePointerUp);
    };

    const resizeObserver = new ResizeObserver(() => {
      syncCanvasSize();
      render();
    });

    resizeObserver.observe(container);
    const visibilityObserver = pauseWhenHidden
      ? new IntersectionObserver(
          ([entry]) => {
            isMostlyVisible = entry.intersectionRatio > 0.2;
            if (isMostlyVisible) {
              render();
            }
          },
          { threshold: [0, 0.2, 0.5, 1] },
        )
      : null;

    visibilityObserver?.observe(container);
    if (interactive) {
      canvas.style.cursor = "grab";
      canvas.addEventListener("pointerdown", handlePointerDown);
    }

    syncCanvasSize();
    render();
    void loadWorldData();
    if (autoRotateSpeed !== 0 || interactive) {
      timer = d3.timer(rotate);
    }

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(readyFrame);
      window.cancelAnimationFrame(settledFrame);
      resizeObserver.disconnect();
      visibilityObserver?.disconnect();
      timer?.stop();
      if (interactive) {
        canvas.removeEventListener("pointerdown", handlePointerDown);
      }
    };
  }, [
    autoRotateSpeed,
    dotSpacing,
    dragSensitivityX,
    dragSensitivityY,
    height,
    interactive,
    maxDevicePixelRatio,
    initialRotation,
    markers,
    jumpingArcCount,
    onReady,
    networkConnections,
    networkStartDelayMs,
    baseOpacity,
    pauseWhenHidden,
    square,
    width,
  ]);

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
        className={`block max-w-full rounded-2xl bg-transparent ${instantReady ? "" : "transition-opacity duration-300"} ${
          isReady ? "opacity-100" : "opacity-0"
        }`}
        style={{ maxWidth: "100%" }}
      />
    </div>
  );
}
