"use client";

import React, { useMemo, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Logo {
  name: string;
  id: number;
  img: React.ComponentType<{ className?: string }>;
}

interface LogoColumnProps {
  logos: Logo[];
  index: number;
  currentTime: number;
}

interface LogoCarouselProps {
  columnCount?: number;
  logos: Logo[];
}

const subscribeToClock = (callback: () => void) => {
  const intervalId = window.setInterval(callback, 100);
  return () => window.clearInterval(intervalId);
};

const getClockSnapshot = () => Math.floor(Date.now() / 100) * 100;
const getServerClockSnapshot = () => 0;

const distributeLogos = (allLogos: Logo[], columnCount: number): Logo[][] => {
  const columns: Logo[][] = Array.from({ length: columnCount }, () => []);

  allLogos.forEach((logo, index) => {
    columns[index % columnCount].push(logo);
  });

  const maxLength = Math.max(...columns.map((column) => column.length));
  columns.forEach((column, columnIndex) => {
    while (column.length < maxLength) {
      column.push(allLogos[(column.length + columnIndex) % allLogos.length]);
    }
  });

  return columns;
};

const LogoColumn = React.memo(function LogoColumn({
  logos,
  index,
  currentTime,
}: LogoColumnProps) {
  const cycleInterval = 2000;
  const columnDelay = index * 220;
  const adjustedTime = (currentTime + columnDelay) % (cycleInterval * logos.length);
  const currentIndex = Math.floor(adjustedTime / cycleInterval);
  const CurrentLogo = useMemo(() => logos[currentIndex].img, [logos, currentIndex]);

  return (
    <motion.div
      className="relative h-32 min-w-0 flex-1 rounded-[16px] bg-gradient-to-b from-gray-800/40 to-transparent p-[4px] shadow-[0_10px_24px_rgba(0,0,0,0.18)]"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.1,
        duration: 0.5,
        ease: "easeOut",
      }}
    >
      <div className="relative h-full overflow-hidden rounded-[12px] bg-gradient-to-b from-gray-700 to-gray-600 p-[4px] shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
        <div className="relative h-full overflow-hidden rounded-[8px] bg-gradient-to-b from-gray-600 to-gray-700">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <AnimatePresence mode="wait">
            <motion.div
              key={`${logos[currentIndex].id}-${currentIndex}`}
              className="absolute inset-0 flex items-center justify-center px-7 py-5"
              initial={{ y: "10%", opacity: 0, filter: "blur(8px)" }}
              animate={{
                y: "0%",
                opacity: 1,
                filter: "blur(0px)",
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  mass: 1,
                  bounce: 0.2,
                  duration: 0.5,
                },
              }}
              exit={{
                y: "-20%",
                opacity: 0,
                filter: "blur(6px)",
                transition: {
                  type: "tween",
                  ease: "easeIn",
                  duration: 0.3,
                },
              }}
            >
              <CurrentLogo className="h-24 max-h-full w-full max-w-[280px] object-contain" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
});

export function LogoCarousel({ columnCount = 3, logos }: LogoCarouselProps) {
  const currentTime = useSyncExternalStore(
    subscribeToClock,
    getClockSnapshot,
    getServerClockSnapshot,
  );
  const logoSets = useMemo(() => distributeLogos(logos, columnCount), [logos, columnCount]);

  return (
    <div className="flex gap-5">
      {logoSets.map((logos, index) => (
        <LogoColumn key={index} logos={logos} index={index} currentTime={currentTime} />
      ))}
    </div>
  );
}

export { LogoColumn };
export type { Logo };
