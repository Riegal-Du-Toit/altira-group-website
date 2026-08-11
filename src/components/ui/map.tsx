"use client";

import { useRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DottedMap from "dotted-map";

interface MapProps {
  dots?: Array<{
    start: {
      lat: number;
      lng: number;
      label?: string;
      labelOffsetX?: number;
      labelOffsetY?: number;
      labelWidth?: number;
    };
    end: {
      lat: number;
      lng: number;
      label?: string;
      labelOffsetX?: number;
      labelOffsetY?: number;
      labelWidth?: number;
    };
    curve?: {
      lat: number;
      lng: number;
    };
  }>;
  lineColor?: string;
  showLabels?: boolean;
  labelClassName?: string;
  animationDuration?: number;
  loop?: boolean;
  showPaths?: boolean;
  region?: {
    minLat: number;
    maxLat: number;
    minLng: number;
    maxLng: number;
  };
}

export function WorldMap({
  dots = [],
  lineColor = "#0ea5e9",
  showLabels = true,
  labelClassName = "text-[12px]",
  animationDuration = 2,
  loop = true,
  showPaths = true,
  region,
}: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);

  const map = useMemo(() => new DottedMap({ height: 100, grid: "diagonal" }), []);

  const svgMap = useMemo(
    () =>
      map.getSVG({
        radius: 0.22,
        color: "#FFFFFF36",
        shape: "circle",
        backgroundColor: "transparent",
      }),
    [map],
  );

  const projectPoint = (lat: number, lng: number) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  };

  const sceneTransform = useMemo(() => {
    if (!region) {
      return {
        scale: 1,
        translateX: 0,
        translateY: 0,
      };
    }

    const topLeft = projectPoint(region.maxLat, region.minLng);
    const bottomRight = projectPoint(region.minLat, region.maxLng);
    const regionWidth = bottomRight.x - topLeft.x;
    const regionHeight = bottomRight.y - topLeft.y;
    const scale = Math.max(800 / regionWidth, 400 / regionHeight);
    const regionCenterX = (topLeft.x + bottomRight.x) / 2;
    const regionCenterY = (topLeft.y + bottomRight.y) / 2;

    return {
      scale,
      translateX: 400 - regionCenterX * scale,
      translateY: 200 - regionCenterY * scale,
    };
  }, [region]);

  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number },
    curve?: { x: number; y: number },
  ) => {
    if (curve) {
      return `M ${start.x} ${start.y} Q ${curve.x} ${curve.y} ${end.x} ${end.y}`;
    }

    const midX = (start.x + end.x) / 2;
    const distance = Math.hypot(end.x - start.x, end.y - start.y);
    const midY = Math.min(start.y, end.y) - Math.max(18, Math.min(60, distance * 0.2));

    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  const staggerDelay = 0.3;
  const totalAnimationTime = dots.length * staggerDelay + animationDuration;
  const pauseTime = 2;
  const fullCycleDuration = totalAnimationTime + pauseTime;

  return (
    <div className="relative w-full overflow-hidden rounded-[24px] bg-[#1E2021] font-sans">
      <div className="aspect-[2/1] w-full md:aspect-[2.5/1] lg:aspect-[2/1]">
        <div
          className="pointer-events-none absolute inset-0 select-none [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)]"
        >
          <div
            className="absolute inset-0 origin-center [&>svg]:h-full [&>svg]:w-full [&>svg]:bg-transparent"
            style={{
              transform: `translate(${sceneTransform.translateX}px, ${sceneTransform.translateY}px) scale(${sceneTransform.scale})`,
            }}
            dangerouslySetInnerHTML={{ __html: svgMap }}
          />
        </div>
        <svg
          ref={svgRef}
          viewBox="0 0 800 400"
          className="pointer-events-auto absolute inset-0 h-full w-full select-none"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
              <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>

            <filter id="glow">
              <feMorphology operator="dilate" radius="0.5" />
              <feGaussianBlur stdDeviation="1" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g
            transform={`translate(${sceneTransform.translateX} ${sceneTransform.translateY}) scale(${sceneTransform.scale})`}
          >
            {showPaths &&
              dots.map((dot, i) => {
                const startPoint = projectPoint(dot.start.lat, dot.start.lng);
                const endPoint = projectPoint(dot.end.lat, dot.end.lng);
                const curvePoint = dot.curve ? projectPoint(dot.curve.lat, dot.curve.lng) : undefined;
                const path = createCurvedPath(startPoint, endPoint, curvePoint);
                const startTime = (i * staggerDelay) / fullCycleDuration;
                const endTime = (i * staggerDelay + animationDuration) / fullCycleDuration;
                const resetTime = totalAnimationTime / fullCycleDuration;

                return (
                  <g key={`path-group-${i}`}>
                    <motion.path
                      d={path}
                      fill="none"
                      stroke="url(#path-gradient)"
                      strokeWidth="1"
                      initial={{ pathLength: 0 }}
                      animate={
                        loop
                          ? {
                              pathLength: [0, 0, 1, 1, 0],
                            }
                          : {
                              pathLength: 1,
                            }
                      }
                      transition={
                        loop
                          ? {
                              duration: fullCycleDuration,
                              times: [0, startTime, endTime, resetTime, 1],
                              ease: "easeInOut",
                              repeat: Infinity,
                              repeatDelay: 0,
                            }
                          : {
                              duration: animationDuration,
                              delay: i * staggerDelay,
                              ease: "easeInOut",
                            }
                      }
                    />

                    {loop && (
                      <motion.circle
                        r="4"
                        fill={lineColor}
                        initial={{ offsetDistance: "0%", opacity: 0 }}
                        animate={{
                          offsetDistance: [null, "0%", "100%", "100%", "100%"],
                          opacity: [0, 0, 1, 0, 0],
                        }}
                        transition={{
                          duration: fullCycleDuration,
                          times: [0, startTime, endTime, resetTime, 1],
                          ease: "easeInOut",
                          repeat: Infinity,
                          repeatDelay: 0,
                        }}
                        style={{
                          offsetPath: `path('${path}')`,
                        }}
                      />
                    )}
                  </g>
                );
              })}

            {Array.from(
              new Map(
                dots
                  .flatMap((dot) => [dot.start, dot.end])
                  .filter((point) => point.label)
                  .map((point) => [`${point.label}-${point.lat}-${point.lng}`, point]),
              ).values(),
            ).map((point, i) => {
              const mapPoint = projectPoint(point.lat, point.lng);
              const labelWidth = point.labelWidth ?? 86;
              const labelOffsetX = point.labelOffsetX ?? -(labelWidth / 2);
              const labelOffsetY = point.labelOffsetY ?? -34;

              return (
                <g key={`point-${point.label}-${i}`}>
                  <motion.g
                    onHoverStart={() => setHoveredLocation(point.label || `Location ${i}`)}
                    onHoverEnd={() => setHoveredLocation(null)}
                    className="cursor-pointer"
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <circle
                      cx={mapPoint.x}
                      cy={mapPoint.y}
                      r="3"
                      fill={lineColor}
                      filter="url(#glow)"
                      className="drop-shadow-lg"
                    />
                    <circle cx={mapPoint.x} cy={mapPoint.y} r="3" fill={lineColor} opacity="0.5">
                      <animate
                        attributeName="r"
                        from="3"
                        to="12"
                        dur="2s"
                        begin={`${i * 0.2}s`}
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        from="0.6"
                        to="0"
                        dur="2s"
                        begin={`${i * 0.2}s`}
                        repeatCount="indefinite"
                      />
                    </circle>
                  </motion.g>

                  {showLabels && point.label && (
                    <motion.g
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 * i + 0.3, duration: 0.5 }}
                      className="pointer-events-none"
                    >
                      <foreignObject
                        x={mapPoint.x + labelOffsetX}
                        y={mapPoint.y + labelOffsetY}
                        width={labelWidth}
                        height="28"
                        className="block overflow-visible"
                      >
                        <div className="flex h-full items-center justify-center">
                          <span
                            className={`${labelClassName} rounded-md border border-white/12 bg-[#252729]/95 px-[7px] py-0.5 font-medium text-white shadow-[0_8px_20px_rgba(0,0,0,0.24)]`}
                          >
                            {point.label}
                          </span>
                        </div>
                      </foreignObject>
                    </motion.g>
                  )}
                </g>
              );
            })}
          </g>
        </svg>

        <AnimatePresence>
          {hoveredLocation && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-4 left-4 rounded-lg border border-white/12 bg-[#252729]/95 px-3 py-2 text-sm font-medium text-white backdrop-blur-sm sm:hidden"
            >
              {hoveredLocation}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
