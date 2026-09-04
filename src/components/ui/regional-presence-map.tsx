"use client";

import { Center, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { AnimatePresence, motion } from "framer-motion";
import DottedMap from "dotted-map";
import {
  Suspense,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { Group } from "three";

import { presenceLocations } from "@/data/presence-locations";
import { cn } from "@/lib/utils";
import CityLocationPopupCard from "@/components/ui/city-location-popup-card";

const REGION = {
  minLat: -50,
  maxLat: 50,
  minLng: -20,
  maxLng: 180,
};
const MAP_VIEWBOX_WIDTH = 174;
const MAP_VIEWBOX_HEIGHT = 100;
const POPOVER_GAP = 18;
const POPOVER_MARGIN = 12;
const MOBILE_BREAKPOINT = 640;
const ROUTE_COLOR = "#3FE9EC";

function MapFaviconModel({ rotationOffset, speed }: { rotationOffset: number; speed: number }) {
  const { scene } = useGLTF("/base_basic_shaded.glb");
  const model = useMemo(() => scene.clone(true), [scene]);
  const groupRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y -= delta * speed;
  });

  return (
    <Center>
      <group ref={groupRef} rotation={[0.05, rotationOffset, 0]}>
        <primitive object={model} scale={1.8} />
      </group>
    </Center>
  );
}

useGLTF.preload("/base_basic_shaded.glb");

function hasLocationId(data: unknown): data is { id: string } {
  return typeof data === "object" && data !== null && "id" in data && typeof data.id === "string";
}

function getAnchorPosition(
  marker: { x: number; y: number },
  width: number,
  height: number,
) {
  return {
    x: (marker.x / MAP_VIEWBOX_WIDTH) * width,
    y: (marker.y / MAP_VIEWBOX_HEIGHT) * height,
  };
}

function createCurvedPath(
  start: { x: number; y: number },
  end: { x: number; y: number },
  arcHeight: number,
) {
  const midX = (start.x + end.x) / 2;
  const midY = Math.min(start.y, end.y) - arcHeight;

  return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
}

function getPopoverPosition(
  anchor: { x: number; y: number },
  popoverSize: { width: number; height: number },
  containerSize: { width: number; height: number },
  gap = POPOVER_GAP,
): {
  left: number;
  top: number;
} {
  let left = anchor.x - popoverSize.width / 2;
  const top = anchor.y - popoverSize.height - gap;

  if (containerSize.width <= MOBILE_BREAKPOINT) {
    left = POPOVER_MARGIN;
  }

  left = Math.min(
    Math.max(left, POPOVER_MARGIN),
    Math.max(POPOVER_MARGIN, containerSize.width - popoverSize.width - POPOVER_MARGIN),
  );
  return { left, top };
}

export function RegionalPresenceMap({ className }: { className?: string }) {
  const shouldReduceMotion = false;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [popoverStyle, setPopoverStyle] = useState<{
    left: number;
    top: number;
  } | null>(null);

  const map = useMemo(
    () =>
      new DottedMap({
        height: 100,
        grid: "diagonal",
        region: {
          lat: { min: REGION.minLat, max: REGION.maxLat },
          lng: { min: REGION.minLng, max: REGION.maxLng },
        },
      }),
    [],
  );
  const svgMap = useMemo(
    () =>
      map.getSVG({
        radius: 0.145,
        color: "#2E2E38",
        shape: "circle",
        backgroundColor: "transparent",
      }),
    [map],
  );
  const svgMapDataUri = useMemo(
    () => `data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`,
    [svgMap],
  );
  const markerPositions = useMemo(() => {
    const lookupMap = new DottedMap({
      height: 100,
      grid: "diagonal",
      region: {
        lat: { min: REGION.minLat, max: REGION.maxLat },
        lng: { min: REGION.minLng, max: REGION.maxLng },
      },
    });

    presenceLocations.forEach((location) => {
      lookupMap.addPin({
        lat: location.coordinates[0],
        lng: location.coordinates[1],
        data: { id: location.id },
        svgOptions: { radius: 0.01, color: "transparent" },
      });
    });

    const entries: Array<[string, { x: number; y: number }]> = [];

    lookupMap.getPoints().forEach((point) => {
      if (hasLocationId(point.data)) {
        entries.push([point.data.id, { x: point.x, y: point.y }]);
      }
    });

    return new Map(entries);
  }, []);
  const locationLookup = useMemo(
    () => new Map(presenceLocations.map((location) => [location.id, location])),
    [],
  );
  const routes = useMemo(() => {
    if (!containerSize.width || !containerSize.height) {
      return [];
    }

    const toRenderedPoint = (id: string) => {
      const marker = markerPositions.get(id);
      const location = locationLookup.get(id);

      if (!marker || !location) {
        return null;
      }

      const anchor = getAnchorPosition(marker, containerSize.width, containerSize.height);

      return {
        x: anchor.x + (location.markerOffset?.x ?? 0),
        y: anchor.y + (location.markerOffset?.y ?? 0),
      };
    };

    const capeTown = toRenderedPoint("cape-town");
    const johannesburg = toRenderedPoint("johannesburg");
    const cebuCity = toRenderedPoint("philippines");

    if (!capeTown || !johannesburg || !cebuCity) {
      return [];
    }

    return [
      {
        id: "cape-town-to-johannesburg",
        path: createCurvedPath(capeTown, johannesburg, 22),
        delay: 0,
      },
      {
        id: "johannesburg-to-cebu-city",
        path: createCurvedPath(johannesburg, cebuCity, 54),
        delay: 0.6,
      },
    ];
  }, [containerSize.height, containerSize.width, locationLookup, markerPositions]);
  const selectedLocation =
    presenceLocations.find((location) => location.id === selectedId) ?? null;

  const closePopover = () => {
    setSelectedId(null);
    setPopoverStyle(null);
  };

  useLayoutEffect(() => {
    if (!selectedLocation || !containerRef.current || !popoverRef.current) {
      return;
    }

    const marker = markerPositions.get(selectedLocation.id);

    if (!marker) {
      return;
    }

    const updatePosition = () => {
      const container = containerRef.current;
      const popover = popoverRef.current;

      if (!container || !popover) {
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const markerAnchor = getAnchorPosition(
        marker,
        containerRect.width,
        containerRect.height,
      );
      const anchor = {
        x: markerAnchor.x + (selectedLocation.markerOffset?.x ?? 0),
        y: markerAnchor.y + (selectedLocation.markerOffset?.y ?? 0),
      };
      const popoverGap = selectedLocation.id === "johannesburg"
        ? POPOVER_GAP + 24
        : selectedLocation.id === "philippines"
          ? POPOVER_GAP + 14
          : POPOVER_GAP;
      const nextPosition = getPopoverPosition(
        anchor,
        { width: popover.offsetWidth, height: popover.offsetHeight },
        { width: containerRect.width, height: containerRect.height },
        popoverGap,
      );

      setPopoverStyle(nextPosition);
    };

    const frameId = window.requestAnimationFrame(updatePosition);

    const resizeObserver = new ResizeObserver(updatePosition);
    resizeObserver.observe(containerRef.current);
    resizeObserver.observe(popoverRef.current);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      window.removeEventListener("resize", updatePosition);
    };
  }, [markerPositions, selectedLocation]);

  useEffect(() => {
    if (!selectedLocation) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closePopover();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedLocation]);

  useLayoutEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      setContainerSize({ width: rect.width, height: rect.height });
    };

    updateSize();

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(container);
    window.addEventListener("resize", updateSize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  return (
    <div className={cn(className)}>
      <div className="relative overflow-visible bg-transparent">
        <div
          ref={containerRef}
          className="relative mx-auto aspect-[174/100] w-full overflow-visible"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closePopover();
            }
          }}
        >
          {/* Render the generated SVG as an image to avoid browser tiling artifacts on inline SVG circles. */}
          <img
            src={svgMapDataUri}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full object-contain"
            draggable={false}
          />

          <svg
            className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
            viewBox={`0 0 ${containerSize.width || 1} ${containerSize.height || 1}`}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="presence-route-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={ROUTE_COLOR} stopOpacity="0" />
                <stop offset="14%" stopColor={ROUTE_COLOR} stopOpacity="1" />
                <stop offset="86%" stopColor={ROUTE_COLOR} stopOpacity="1" />
                <stop offset="100%" stopColor={ROUTE_COLOR} stopOpacity="0" />
              </linearGradient>
              <filter id="presence-route-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="1.2" result="blurred" />
                <feMerge>
                  <feMergeNode in="blurred" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {routes.map((route) => (
              <g key={route.id}>
                <motion.path
                  d={route.path}
                  fill="none"
                  stroke="url(#presence-route-gradient)"
                  strokeWidth="0.32"
                  strokeLinecap="round"
                  filter="url(#presence-route-glow)"
                  initial={{ pathLength: 0, opacity: 0.2 }}
                  animate={
                    shouldReduceMotion
                      ? { pathLength: 1, opacity: 0.8 }
                      : { pathLength: [0, 1, 1], opacity: [0.15, 0.95, 0.95] }
                  }
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : {
                          duration: 2.8,
                          delay: route.delay,
                          repeat: Infinity,
                          repeatDelay: 0.9,
                          ease: "easeInOut",
                        }
                  }
                />

                {!shouldReduceMotion ? (
                  <motion.circle
                    r="0.56"
                    fill={ROUTE_COLOR}
                    filter="url(#presence-route-glow)"
                    initial={{ offsetDistance: "0%", opacity: 0 }}
                    animate={{
                      offsetDistance: ["0%", "100%"],
                      opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                      duration: 2.8,
                      delay: route.delay,
                      repeat: Infinity,
                      repeatDelay: 0.9,
                      ease: "easeInOut",
                      times: [0, 0.12, 0.88, 1],
                    }}
                    style={{
                      offsetPath: `path("${route.path}")`,
                    }}
                  />
                ) : null}
              </g>
            ))}
          </svg>

          <div
            className="absolute inset-0"
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                closePopover();
              }
            }}
          >
            {presenceLocations.map((location) => {
              const marker = markerPositions.get(location.id);
              const isSelected = location.id === selectedLocation?.id;
              const isHovered = location.id === hoveredId;
              const modelRotation =
                location.id === "cape-town" ? -0.9 : location.id === "johannesburg" ? 0.35 : 1.15;
              const modelSpeed =
                location.id === "cape-town" ? 0.66 : location.id === "johannesburg" ? 0.82 : 0.98;

              if (!marker) {
                return null;
              }

              return (
                <button
                  key={location.id}
                  type="button"
                  suppressHydrationWarning
                  className="absolute touch-manipulation rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3FE9EC] focus-visible:ring-offset-2 focus-visible:ring-offset-[#061019]"
                  style={{
                    left: `${(marker.x / MAP_VIEWBOX_WIDTH) * 100}%`,
                    top: `${(marker.y / MAP_VIEWBOX_HEIGHT) * 100}%`,
                    transform: `translate(calc(-50% + ${location.markerOffset?.x ?? 0}px), calc(-50% + ${location.markerOffset?.y ?? 0}px))`,
                  }}
                  onClick={() => setSelectedId(location.id)}
                  onMouseEnter={() => {
                    setHoveredId(location.id);
                    setSelectedId(location.id);
                  }}
                  onMouseLeave={() => {
                    setHoveredId(null);
                    closePopover();
                  }}
                  aria-pressed={isSelected}
                  aria-label={`View ${location.name} location details`}
                >
                  <span className="relative flex h-9 w-9 items-center justify-center overflow-visible rounded-full">
                    <span className="relative -translate-y-0.5 flex h-[1.4625rem] w-[1.4625rem] drop-shadow-[0_0_12px_rgba(63,233,236,0.54)]">
                      <Canvas
                        camera={{ position: [0, 0, 5], fov: 38 }}
                        dpr={[1, 2]}
                        gl={{ alpha: true, antialias: true }}
                        className="pointer-events-none"
                      >
                        <ambientLight intensity={1.45} />
                        <directionalLight position={[3, 4, 5]} intensity={2.2} />
                        <Suspense fallback={null}>
                          <MapFaviconModel rotationOffset={modelRotation} speed={modelSpeed} />
                        </Suspense>
                      </Canvas>
                    </span>

                    <span
                      className={cn(
                        "pointer-events-auto absolute left-0 hidden min-w-[112px] -translate-y-1/2 cursor-pointer text-left transition-opacity sm:block",
                        selectedLocation?.id === location.id ? "opacity-45" : "opacity-100",
                        location.labelAlign === "left" && "-translate-x-full text-right",
                      )}
                      style={{
                        left: location.labelOffset.x,
                        top: `calc(50% + ${location.labelOffset.y}px)`,
                      }}
                    >
                      <span className="block text-[0.82rem] font-semibold leading-tight text-white">
                        {location.name}
                      </span>
                      <span className="mt-0.5 block text-[0.66rem] leading-tight text-white/76">
                        {location.country}
                      </span>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {selectedLocation ? (
              <motion.div
                ref={popoverRef}
                layout={!shouldReduceMotion}
                initial={
                  shouldReduceMotion
                    ? { opacity: 1 }
                    : { opacity: 0, scale: 0.98, y: 6 }
                }
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: 6 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.22, ease: "easeOut" }}
                className={cn(
                  "city-popup-card pointer-events-none absolute z-20 w-[min(220px,calc(100%-28px))] text-left",
                  !popoverStyle && "invisible",
                )}
                style={{
                  left: popoverStyle?.left ?? POPOVER_MARGIN,
                  top: popoverStyle?.top ?? POPOVER_MARGIN,
                }}
                onClick={(event) => event.stopPropagation()}
              >
                <CityLocationPopupCard
                  title={selectedLocation.name}
                  description={[selectedLocation.description]}
                  icon={<img src={`https://flagsapi.com/${selectedLocation.id === "philippines" ? "PH" : "ZA"}/shiny/64.png`} alt={`${selectedLocation.country} flag`} className="h-full w-full scale-[1.55] object-cover" />}
                />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
