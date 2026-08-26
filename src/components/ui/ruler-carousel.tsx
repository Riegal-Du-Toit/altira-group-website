"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeftIcon, ArrowRight } from "lucide-react";

export interface CarouselItem {
  id: string | number;
  title: string;
  icon?: string;
  iconClassName?: string;
  hideTitle?: boolean;
}

const createInfiniteItems = (items: readonly CarouselItem[]) =>
  Array.from({ length: 3 }, (_, copy) =>
    items.map((item, originalIndex) => ({ ...item, id: `${copy}-${item.id}`, originalIndex })),
  ).flat();

function RulerLines({ top }: { top: boolean }) {
  return (
    <div className={`relative h-5 w-full ${top ? "" : "rotate-180"}`} aria-hidden="true">
      {Array.from({ length: 41 }, (_, index) => {
        const major = index % 5 === 0;
        const centre = index === 20;
        return (
          <span
            key={index}
            className={`absolute top-0 w-px ${centre ? "h-5 bg-[#37D8C6]" : major ? "h-3 bg-[#52769d]" : "h-2 bg-[#b6c8da]"}`}
            style={{ left: `${index * 2.5}%` }}
          />
        );
      })}
    </div>
  );
}

export function RulerCarousel({ originalItems }: { originalItems: readonly CarouselItem[] }) {
  const itemsPerSet = originalItems.length;
  const items = createInfiniteItems(originalItems);
  const initialIndex = itemsPerSet + Math.floor(itemsPerSet / 2);
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    if (isResetting || itemsPerSet === 0) return;
    if (activeIndex < itemsPerSet || activeIndex >= itemsPerSet * 2) {
      setIsResetting(true);
      const nextIndex = activeIndex < itemsPerSet ? activeIndex + itemsPerSet : activeIndex - itemsPerSet;
      const reset = window.setTimeout(() => {
        setActiveIndex(nextIndex);
        setIsResetting(false);
      }, 0);
      return () => window.clearTimeout(reset);
    }
  }, [activeIndex, isResetting, itemsPerSet]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") setActiveIndex((current) => current - 1);
      if (event.key === "ArrowRight") setActiveIndex((current) => current + 1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => current + 1);
    }, 4000);
    return () => window.clearInterval(timer);
  }, []);

  if (itemsPerSet === 0) return null;

  const activeItem = activeIndex % itemsPerSet;
  const targetX = -activeIndex * 500 - 200;

  return (
    <div className="mx-auto mt-5 w-full max-w-[1100px]">
      <RulerLines top />
      <div className="relative h-24 overflow-hidden">
        <motion.div
          className="absolute left-1/2 flex h-full items-center gap-[100px]"
          animate={{ x: targetX }}
          transition={isResetting ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 24, mass: 0.8 }}
        >
          {items.map((item, index) => {
            const active = index === activeIndex;
            return (
              <motion.button
                key={item.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`w-[400px] shrink-0 text-center text-lg font-extrabold tracking-[-0.04em] transition-colors sm:text-2xl ${active ? "text-[#102d50]" : "text-[#8ba2ba] hover:text-[#52769d]"}`}
                animate={{ scale: active ? 1 : 0.75, opacity: active ? 1 : 0.38 }}
                transition={isResetting ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 25 }}
              >
                <span className="inline-flex items-center justify-center gap-3">
                  {item.icon ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.icon} alt="" className={`size-7 object-contain ${item.iconClassName ?? ""}`} />
                  ) : null}
                  {item.hideTitle ? null : <span>{item.title}</span>}
                </span>
              </motion.button>
            );
          })}
        </motion.div>
      </div>
      <RulerLines top={false} />
      <div className="mt-4 flex items-center justify-center gap-4 text-[#52769d]">
        <button type="button" onClick={() => setActiveIndex((current) => current - 1)} aria-label="Previous item"><ArrowLeftIcon className="size-4" /></button>
        <span className="text-xs font-bold">{activeItem + 1} / {itemsPerSet}</span>
        <button type="button" onClick={() => setActiveIndex((current) => current + 1)} aria-label="Next item"><ArrowRight className="size-4" /></button>
      </div>
    </div>
  );
}
