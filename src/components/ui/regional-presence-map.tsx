"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import DottedMap from "dotted-map";
import { X } from "lucide-react";
import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

import { presenceLocations } from "@/data/presence-locations";
import { cn } from "@/lib/utils";

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

const subscribeToHydration = () => () => {};

function hasLocationId(data: unknown): data is { id: string } {
  return typeof data === "object" && data !== null && "id" in data && typeof data.id === "string";
}

function useIsHydrated() {
  return useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  );
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

function getPopoverPosition(
  anchor: { x: number; y: number },
  popoverSize: { width: number; height: number },
  containerSize: { width: number; height: number },
): {
  left: number;
  top: number;
  pointer: { placement: "left" | "right" | "top" | "bottom"; x: number; y: number };
} {
  const availableRight = containerSize.width - anchor.x - POPOVER_MARGIN;
  const availableLeft = anchor.x - POPOVER_MARGIN;
  const availableTop = anchor.y - POPOVER_MARGIN;
  const availableBottom = containerSize.height - anchor.y - POPOVER_MARGIN;

  const prefersLeft = availableRight < popoverSize.width + POPOVER_GAP && availableLeft > availableRight;
  const horizontalDirection = prefersLeft ? -1 : 1;

  let left =
    horizontalDirection === 1 ? anchor.x + POPOVER_GAP : anchor.x - popoverSize.width - POPOVER_GAP;
  let top = anchor.y - popoverSize.height - POPOVER_GAP;

  if (availableTop < popoverSize.height + POPOVER_GAP && availableBottom >= popoverSize.height + POPOVER_GAP) {
    top = anchor.y + POPOVER_GAP;
  }

  if (containerSize.width <= MOBILE_BREAKPOINT) {
    left = POPOVER_MARGIN;
  }

  left = Math.min(
    Math.max(left, POPOVER_MARGIN),
    Math.max(POPOVER_MARGIN, containerSize.width - popoverSize.width - POPOVER_MARGIN),
  );
  top = Math.min(
    Math.max(top, POPOVER_MARGIN),
    Math.max(POPOVER_MARGIN, containerSize.height - popoverSize.height - POPOVER_MARGIN),
  );

  const pointerBaseX = Math.min(
    Math.max(anchor.x - left, 18),
    Math.max(18, popoverSize.width - 18),
  );
  const pointerBaseY = Math.min(
    Math.max(anchor.y - top, 18),
    Math.max(18, popoverSize.height - 18),
  );

  const pointer: { placement: "left" | "right" | "top" | "bottom"; x: number; y: number } =
    anchor.y >= top && anchor.y <= top + popoverSize.height
      ? {
          placement: horizontalDirection === 1 ? "left" : "right",
          x: horizontalDirection === 1 ? -7 : popoverSize.width - 7,
          y: pointerBaseY - 7,
        }
      : {
          placement: anchor.y < top ? "top" : "bottom",
          x: pointerBaseX - 7,
          y: anchor.y < top ? -7 : popoverSize.height - 7,
        };

  return { left, top, pointer };
}

export function RegionalPresenceMap({ className }: { className?: string }) {
  const shouldReduceMotion = useReducedMotion();
  const isHydrated = useIsHydrated();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [popoverStyle, setPopoverStyle] = useState<{
    left: number;
    top: number;
    pointer: { placement: "left" | "right" | "top" | "bottom"; x: number; y: number };
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
        radius: 0.2,
        color: "#0b6b82",
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
      const anchor = getAnchorPosition(
        marker,
        containerRect.width,
        containerRect.height,
      );
      const nextPosition = getPopoverPosition(
        anchor,
        { width: popover.offsetWidth, height: popover.offsetHeight },
        { width: containerRect.width, height: containerRect.height },
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

  return (
    <div className={cn(className)}>
      <div className="relative overflow-hidden bg-transparent">
        <div
          ref={containerRef}
          className="relative aspect-[174/100] w-full overflow-hidden"
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
              const allowMotion = isHydrated && !shouldReduceMotion;

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
                    transform: "translate(-50%, -50%)",
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
                  <span className="relative flex h-14 w-14 items-center justify-center rounded-full">
                    {allowMotion ? (
                      <>
                        <motion.span
                          className={cn(
                            "absolute rounded-full border",
                            isSelected ? "border-[#3FE9EC]/45" : "border-[#3FE9EC]/24",
                          )}
                          initial={{ scale: 0.7, opacity: 0.45 }}
                          animate={{ scale: 1.75, opacity: 0 }}
                          transition={{
                            duration: isSelected ? 2.15 : 3,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeOut",
                          }}
                          style={{ width: 20, height: 20 }}
                        />
                        <motion.span
                          className={cn(
                            "absolute rounded-full",
                            isSelected ? "bg-[#3FE9EC]/24" : "bg-[#3FE9EC]/10",
                          )}
                          animate={{ scale: isSelected ? [1, 1.5, 1] : [1, 1.2, 1] }}
                          transition={{
                            duration: isSelected ? 2 : 2.8,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                          }}
                          style={{ width: 32, height: 32 }}
                        />
                      </>
                    ) : null}

                    <motion.span
                      className={cn(
                        "relative flex h-5 w-5 rounded-full border-4 shadow-[0_0_26px_rgba(63,233,236,0.62)]",
                        isSelected || isHovered
                          ? "border-[#d4ffff] bg-[#3FE9EC]"
                          : "border-[#bffcff] bg-[#3FE9EC]",
                      )}
                      animate={allowMotion ? { scale: isSelected ? [1, 1.1, 1] : [1, 1.03, 1] } : undefined}
                      transition={{
                        duration: isSelected ? 1.8 : 2.4,
                        repeat: allowMotion ? Number.POSITIVE_INFINITY : 0,
                        ease: "easeInOut",
                      }}
                    />

                    <span
                      className={cn(
                        "pointer-events-none absolute left-0 hidden min-w-[150px] -translate-y-1/2 text-left transition-opacity sm:block",
                        selectedLocation?.id === location.id ? "opacity-45" : "opacity-100",
                        location.labelAlign === "left" && "-translate-x-full text-right",
                      )}
                      style={{
                        left: location.labelOffset.x,
                        top: `calc(50% + ${location.labelOffset.y}px)`,
                      }}
                    >
                      <span className="block text-[1.08rem] font-semibold leading-tight text-white">
                        {location.name}
                      </span>
                      <span className="mt-1.5 block text-[0.88rem] leading-tight text-white/76">
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
                  "absolute z-20 w-[min(370px,calc(100%-28px))] rounded-[10px] bg-[#252729]/92 p-[3px] text-left shadow-[0_16px_44px_rgba(0,0,0,0.24)] backdrop-blur-xl",
                  !popoverStyle && "invisible",
                )}
                style={{
                  left: popoverStyle?.left ?? POPOVER_MARGIN,
                  top: popoverStyle?.top ?? POPOVER_MARGIN,
                }}
                onClick={(event) => event.stopPropagation()}
              >
                {popoverStyle ? (
                  <span
                    className="absolute h-3.5 w-3.5 rotate-45 border border-white/10 bg-[#252729]/92"
                    aria-hidden="true"
                    style={{
                      left: popoverStyle.pointer.x,
                      top: popoverStyle.pointer.y,
                    }}
                  />
                ) : null}

                <div className="relative rounded-[7px] bg-[#2f333b]/96 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-[0.78rem] font-semibold uppercase tracking-[0.24em] text-[#3FE9EC]">
                          {selectedLocation.roleLabel}
                        </div>
                        <h3 className="mt-3.5 text-[1.6rem] font-semibold leading-tight text-white">
                          {selectedLocation.name}
                        </h3>
                        <p className="mt-1.5 text-base text-white/68">{selectedLocation.country}</p>
                        <p className="mt-2.5 text-base text-white/86">{selectedLocation.role}</p>
                      </div>
                      <div className="rounded-[12px] bg-gradient-to-b from-gray-800/40 to-transparent p-[2px]">
                        <button
                          type="button"
                          onClick={closePopover}
                          suppressHydrationWarning
                          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[9px] bg-gradient-to-b from-gray-700 to-gray-600 p-[2px] text-white/76 shadow-[0_2px_4px_rgba(0,0,0,0.7)] transition hover:text-[#3FE9EC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3FE9EC] focus-visible:ring-offset-2 focus-visible:ring-offset-[#565d6a]"
                          aria-label={`Close ${selectedLocation.name} location details`}
                        >
                          <span className="flex h-full w-full items-center justify-center rounded-[6px] bg-gradient-to-b from-gray-600 to-gray-700">
                            <X className="h-5 w-5" />
                          </span>
                        </button>
                      </div>
                    </div>

                    <p className="mt-5 text-base leading-7 text-white/74">{selectedLocation.description}</p>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
