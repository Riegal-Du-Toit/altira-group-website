"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import NextImage from "next/image";
import type React from "react";
import { useEffect, useMemo, useRef, useState } from "react";

interface LocationMapProps {
  location?: string;
  latitude?: number;
  longitude?: number;
  zoom?: number;
  className?: string;
  tileProvider?: "openstreetmap" | "carto-light" | "carto-dark";
  defaultExpanded?: boolean;
  eyebrow?: string;
  description?: string;
}

function latLngToTile(lat: number, lng: number, zoom: number) {
  const n = 2 ** zoom;
  const x = Math.floor(((lng + 180) / 360) * n);
  const latRad = (lat * Math.PI) / 180;
  const y = Math.floor(
    ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * n,
  );
  return { x, y };
}

function getTileUrl(provider: string, x: number, y: number, z: number) {
  switch (provider) {
    case "carto-light":
      return `https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/${z}/${x}/${y}.png`;
    case "carto-dark":
      return `https://cartodb-basemaps-a.global.ssl.fastly.net/dark_all/${z}/${x}/${y}.png`;
    default:
      return `https://tile.openstreetmap.org/${z}/${x}/${y}.png`;
  }
}

function formatCoordinates(lat: number, lng: number) {
  const latDir = lat >= 0 ? "N" : "S";
  const lngDir = lng >= 0 ? "E" : "W";
  return `${Math.abs(lat).toFixed(4)}° ${latDir}, ${Math.abs(lng).toFixed(4)}° ${lngDir}`;
}

export function LocationMap({
  location = "San Francisco, CA",
  latitude = 37.7749,
  longitude = -122.4194,
  zoom = 6,
  className,
  tileProvider = "carto-dark",
  defaultExpanded = false,
  eyebrow = "Location",
  description = "Regional hub",
}: LocationMapProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [tilesLoaded, setTilesLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-50, 50], [8, -8]);
  const rotateY = useTransform(mouseX, [-50, 50], [-8, 8]);

  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  const coordinates = useMemo(
    () => formatCoordinates(latitude, longitude),
    [latitude, longitude],
  );

  const tiles = useMemo(() => {
    const centerTile = latLngToTile(latitude, longitude, zoom);
    const tileUrls: { url: string; offsetX: number; offsetY: number }[] = [];

    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        tileUrls.push({
          url: getTileUrl(tileProvider, centerTile.x + dx, centerTile.y + dy, zoom),
          offsetX: dx,
          offsetY: dy,
        });
      }
    }

    return tileUrls;
  }, [latitude, longitude, zoom, tileProvider]);

  useEffect(() => {
    let loadedCount = 0;
    const totalTiles = tiles.length;

    tiles.forEach((tile) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalTiles) {
          setTilesLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === totalTiles) {
          setTilesLoaded(true);
        }
      };
      img.src = tile.url;
    });
  }, [tiles]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={containerRef}
      className={`relative cursor-pointer select-none ${className ?? ""}`}
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => setIsExpanded((prev) => !prev)}
    >
      <motion.div
        className="relative overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#26282a] shadow-[0_20px_40px_rgba(0,0,0,0.2)]"
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{
          height: isExpanded ? 230 : 120,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 35,
        }}
      >
        <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-br from-white/[0.04] via-transparent to-white/[0.02]" />

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="pointer-events-none absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
            >
              <div className="absolute inset-0 overflow-hidden">
                <div
                  className="absolute"
                  style={{
                    width: "768px",
                    height: "768px",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  {tiles.map((tile, index) => (
                    <motion.div
                      key={index}
                      className="absolute"
                      style={{
                        width: "256px",
                        height: "256px",
                        left: `${(tile.offsetX + 1) * 256}px`,
                        top: `${(tile.offsetY + 1) * 256}px`,
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: tilesLoaded ? 1 : 0 }}
                      transition={{ duration: 0.25, delay: index * 0.04 }}
                    >
                      <NextImage
                        src={tile.url}
                        alt=""
                        width={256}
                        height={256}
                        unoptimized
                        crossOrigin="anonymous"
                        className="h-full w-full"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>

              {!tilesLoaded && <div className="absolute inset-0 animate-pulse bg-[#1f2123]" />}

              <motion.div
                className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
                initial={{ scale: 0, y: -20 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.2 }}
              >
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="drop-shadow-lg"
                  style={{ filter: "drop-shadow(0 0 10px rgba(63, 233, 236, 0.45))" }}
                >
                  <path
                    d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                    fill="#3FE9EC"
                  />
                  <circle cx="12" cy="9" r="2.5" fill="#1E2021" />
                </svg>
              </motion.div>

              <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#1E2021] via-transparent to-transparent opacity-80" />
              <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#1E2021]/60 via-transparent to-transparent" />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="absolute inset-0 opacity-[0.045]"
          animate={{ opacity: isExpanded ? 0 : 0.045 }}
          transition={{ duration: 0.3 }}
        >
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id={`grid-${location}`} width="20" height="20" patternUnits="userSpaceOnUse">
                <path
                  d="M 20 0 L 0 0 0 20"
                  fill="none"
                  stroke="rgba(255,255,255,0.28)"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#grid-${location})`} />
          </svg>
        </motion.div>

        <div className="relative z-20 flex h-full flex-col justify-between p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[#3FE9EC]/84">
                {eyebrow}
              </p>
            </div>

            <motion.svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#3FE9EC]/72"
              animate={{
                filter: isHovered
                  ? "drop-shadow(0 0 8px rgba(63, 233, 236, 0.4))"
                  : "drop-shadow(0 0 4px rgba(63, 233, 236, 0.15))",
              }}
              transition={{ duration: 0.3 }}
            >
              <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
              <line x1="9" x2="9" y1="3" y2="18" />
              <line x1="15" x2="15" y1="6" y2="21" />
            </motion.svg>
          </div>

          <div className="space-y-1">
            <motion.h3
              className="text-xl font-semibold tracking-[-0.02em] text-white"
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              {location}
            </motion.h3>

            <p className="text-sm text-white/58">{description}</p>

            <AnimatePresence>
              {isExpanded && (
                <motion.p
                  className="font-mono text-[11px] text-white/48"
                  initial={{ opacity: 0, y: -8, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -8, height: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {coordinates}
                </motion.p>
              )}
            </AnimatePresence>

            <motion.div
              className="mt-2 h-px bg-gradient-to-r from-[#3FE9EC]/55 via-[#3FE9EC]/22 to-transparent"
              initial={{ scaleX: 0.3, originX: 0 }}
              animate={{ scaleX: isHovered || isExpanded ? 1 : 0.3 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default LocationMap;
