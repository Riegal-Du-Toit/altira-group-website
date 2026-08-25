"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });
  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full bg-[#1e2021] font-sans text-white md:px-10" ref={containerRef}>
      <div className="text-[#2E2E38] [&_h2]:!mt-3 [&_h2]:!mb-0 [&_h2]:!text-[1.25rem] [&_h2]:!font-black [&_h2]:!uppercase [&_h2]:!leading-[.98] [&_h2]:!tracking-[-.02em] [&_h2]:!text-[#2E2E38] md:[&_h2]:!text-[2.375rem]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 md:grid-cols-[minmax(0,1.4fr)_minmax(18rem,0.75fr)] md:items-end md:px-8 lg:px-10">
          <div>
            <span className="text-xs uppercase tracking-[.35em] text-[#2E2E38]/60">How We Work</span>
        <h2 className="mb-4 max-w-4xl text-lg text-white md:text-4xl">Orbit — the engine behind our plug-and-play technology.</h2>
          </div>
        <p className="max-w-sm text-sm leading-6 text-[#2E2E38]/72 md:text-base">
          A configurable foundation for faster onboarding, sales and member engagement.
        </p>
        </div>
      </div>

      <div ref={ref} className="relative mx-auto max-w-7xl pb-20">
        {data.map((item, index) => (
          <div key={index} className="flex justify-start pt-10 md:gap-10 md:pt-40">
            <div className="sticky top-40 z-40 flex max-w-xs self-start md:w-full md:flex-row md:items-center lg:max-w-sm">
              <div className="absolute left-3 flex size-10 items-center justify-center rounded-full bg-[#1e2021] md:left-3">
                <div className="size-4 rounded-full border border-white/30 bg-[#121314] p-2" />
              </div>
              <h3 className="hidden text-xl font-bold text-white/50 md:block md:pl-20 md:text-5xl">{item.title}</h3>
            </div>
            <div className="relative w-full pl-20 pr-4 md:pl-4">
              <h3 className="mb-4 block text-left text-2xl font-bold text-white/50 md:hidden">{item.title}</h3>
              {item.content}{" "}
            </div>
          </div>
        ))}
        <div
          style={{ height: `${height}px` }}
          className="absolute left-8 top-0 w-[2px] overflow-hidden bg-gradient-to-b from-transparent from-[0%] via-white/20 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] md:left-8"
        >
          <motion.div
            style={{ height: heightTransform, opacity: opacityTransform }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-t from-purple-500 from-[0%] via-blue-500 via-[10%] to-transparent"
          />
        </div>
      </div>
    </div>
  );
};
