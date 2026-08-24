"use client";

import { motion, type MotionValue, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface Product {
  number: string;
  title: string;
  description: string;
  detail?: string;
  image: string;
  imageAlt: string;
}

const products: readonly Product[] = [
  {
    number: "01",
    title: "UX & Process Redesign",
    description:
      "We analyse your existing onboarding or sales process and rebuild it for higher conversion and lower drop-off.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1800&h=1100&auto=format&fit=crop",
    imageAlt: "Code on a screen overlayed with creative particles",
  },
  {
    number: "02",
    title: "Plug-and-Play Distribution Technology",
    description:
      "Our existing onboarding and sales engine can be configured for any insurance or lending product, cutting build time from months to weeks.",
    image:
      "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1800&h=1100&auto=format&fit=crop",
    imageAlt: "Developer coding on a laptop in a modern workspace",
  },
  {
    number: "03",
    title: "Customer App Development",
    description:
      "We design and build the member-facing app your customers use to onboard, transact, and stay engaged.",
    image: "/personal loans.avif",
    imageAlt: "Team meeting around a table brainstorming ideas",
  },
];

export default function ProductDepthScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={sectionRef} id="products" className="relative mb-[30px] h-[420vh] bg-[#1e2021]">
      <div className="sticky top-0 h-screen overflow-hidden bg-[radial-gradient(circle_at_50%_52%,rgba(63,233,236,0.045),transparent_38%)]">
        <header className="absolute inset-x-0 top-[50px] z-50 mx-auto w-[min(90vw,76rem)] translate-x-[44px] text-white">
          <span className="text-[0.78125rem] uppercase tracking-[.35em] text-white/56">What We Do</span>
        </header>

        <div
          className="absolute inset-0 z-[60]"
          style={{ perspective: "1400px", transformStyle: "preserve-3d" }}
        >
          {products.map((product, index) => (
            <DepthCard
              key={product.title}
              index={index}
              progress={scrollYProgress}
              product={product}
            />
          ))}
        </div>

        <ProgressScroller progress={scrollYProgress} />
      </div>
    </section>
  );
}

function DepthCard({
  index,
  progress,
  product,
}: {
  index: number;
  progress: MotionValue<number>;
  product: (typeof products)[number];
}) {
  const isFirst = index === 0;
  const isLast = index === products.length - 1;
  const inputRange = isFirst
    ? [0, 0.075, 0.28]
    : isLast
      ? [0.72, 0.925, 1]
      : [0.22, 0.425, 0.575, 0.78];
  const zRange = isFirst ? [0, 0, 520] : isLast ? [-1100, 0, 0] : [-1100, 0, 0, 520];
  const scaleRange = isFirst
    ? [1, 1, 1.16]
    : isLast
      ? [0.42, 1, 1]
      : [0.42, 1, 1, 1.16];
  const yRange = isFirst ? [0, 0, -820] : isLast ? [230, 0, 0] : [230, 0, 0, -820];
  const opacityInputRange = isFirst
    ? inputRange
    : isLast
      ? [0.72, 0.8, 1]
      : [0.22, 0.3, 0.575, 0.78];
  const opacityRange = isFirst ? [1, 1, 1] : isLast ? [0, 1, 1] : [0, 1, 1, 1];
  const rotateRange = isFirst ? [0, 0, -8] : isLast ? [12, 0, 0] : [12, 0, 0, -8];

  const z = useTransform(progress, inputRange, zRange);
  const scale = useTransform(progress, inputRange, scaleRange);
  const y = useTransform(progress, inputRange, yRange);
  const opacity = useTransform(progress, opacityInputRange, opacityRange);
  const rotateX = useTransform(progress, inputRange, rotateRange);
  const compactTitle = product.title.length > 24;

  return (
    <motion.article
      aria-label={product.title}
      style={{
        z,
        y,
        scale,
        opacity,
        rotateX,
        x: "-50%",
        zIndex: products.length - index,
        transformStyle: "preserve-3d",
      }}
      className="absolute left-[calc(45%+15px)] top-[94px] h-[62vh] min-h-[30rem] w-[min(80vw,64rem)] overflow-hidden rounded-[1.15rem] bg-transparent ring-[2.5px] ring-[#3FE9EC]"
    >
      <div className="grid h-full grid-rows-[1.15fr_0.85fr] overflow-hidden bg-[#242729] md:grid-cols-[0.72fr_1.28fr] md:grid-rows-1">
        <div className="relative z-10 flex min-h-0 flex-col justify-between border-b-2 border-[#3FE9EC] bg-white/80 p-7 text-neutral-900 sm:p-9 md:border-r-2 md:border-b-0 lg:p-12">
          <div className="flex items-center justify-between gap-5">
            <div className="inline-block rounded-[10px] bg-gradient-to-b from-gray-800/50 to-transparent p-[2px]">
              <div className="rounded-[8px] bg-gradient-to-b from-gray-700 to-gray-600 p-[2px] shadow-[0_2px_4px_rgba(0,0,0,0.65)]">
                <div className="rounded-[5px] bg-gradient-to-b from-gray-600 to-gray-700 px-3 py-2 font-mono text-[0.68rem] font-semibold tracking-[0.2em] text-[#3FE9EC]">
                  {product.number}
                </div>
              </div>
            </div>
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Altira Group
            </span>
          </div>

          <div className="py-5">
            <div className="mb-5 h-0.5 w-14 bg-[#3FE9EC]" />
            <h3 className={`max-w-[12ch] text-3xl font-extrabold leading-[0.98] tracking-[-0.045em] text-neutral-900 sm:text-4xl ${compactTitle ? "lg:text-[2.5rem]" : "lg:text-[3.55rem]"}`}>
              {product.title === "Plug-and-Play Distribution Technology" ? (
                <>Plug<span className="relative -top-[0.08em] inline-block text-[0.62em] font-medium leading-none">-and-</span>Play Distribution Technology</>
              ) : product.title}
            </h3>
            <p className="mt-5 max-w-[37rem] text-sm leading-7 text-neutral-600 sm:text-base sm:leading-8 lg:leading-7">
              {product.description}
            </p>
            {product.detail ? (
              <p className="mt-5 hidden max-w-[35rem] border-l-2 border-[#3FE9EC]/70 pl-4 text-sm leading-7 text-neutral-500 sm:block">
                {product.detail}
              </p>
            ) : null}
          </div>

        </div>

        <div className="relative min-h-0 overflow-hidden bg-[#1d1f20]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.imageAlt}
            className="absolute inset-0 h-full w-full object-cover grayscale-[55%] saturate-[0.55] contrast-[1.08]"
            draggable={false}
          />
          <div className="absolute inset-0 bg-[#1e2021]/25" />
          <div className="absolute inset-0 bg-linear-to-r from-[#242729] via-[#242729]/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-[#1e2021]/72 to-transparent" />
          <div className="absolute right-5 bottom-5 rounded-[7px] border border-white/10 bg-[#25282a]/90 px-3 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-white/50 backdrop-blur-md">
            {product.title}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function ProgressScroller({ progress }: { progress: MotionValue<number> }) {
  const scaleY = useTransform(progress, [0, 1], [0, 1]);
  const dotY = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <div className="absolute right-[calc(5vw-35px)] top-1/2 z-[70] hidden h-[40vh] w-44 -translate-y-1/2 lg:block">
      <div className="absolute inset-y-0 right-0 w-px bg-[linear-gradient(to_bottom,transparent,rgba(255,255,255,.28)_10%,rgba(255,255,255,.28)_90%,transparent)]" />
      <motion.div
        style={{ scaleY }}
        className="absolute inset-y-0 right-0 w-0.5 origin-top rounded-full bg-gradient-to-b from-transparent via-[#3FE9EC] to-[#8b5cf6]"
      />
      <motion.div
        style={{ top: dotY }}
        className="absolute right-0 size-2 translate-x-1/2 -translate-y-1/2 rounded-full border border-white/70 bg-[#3FE9EC] shadow-[0_0_12px_rgba(63,233,236,.85)]"
      />
      {products.map((product, index) => (
        <span
          key={product.title}
          style={{ top: `${(index / (products.length - 1)) * 100}%` }}
          className="absolute right-5 -translate-y-1/2 text-right text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-white/58"
        >
          {product.title}
        </span>
      ))}
    </div>
  );
}
