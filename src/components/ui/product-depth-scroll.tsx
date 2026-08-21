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
    title: "Medical Insurance",
    description:
      "Altira Group operates at the intersection of health, protection and credit, combining specialist partners and proven platforms around the needs that determine household resilience.",
    detail:
      "Quality primary care within reach, closing the gap between formal medical aid and complete uninsurance.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1800&h=1100&auto=format&fit=crop",
    imageAlt: "Code on a screen overlayed with creative particles",
  },
  {
    number: "02",
    title: "Funeral Insurance",
    description:
      "Dignified, rapid cover shaped with trusted underwriting and service partners so the burden of a farewell never falls entirely on a grieving family.",
    image:
      "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1800&h=1100&auto=format&fit=crop",
    imageAlt: "Developer coding on a laptop in a modern workspace",
  },
  {
    number: "03",
    title: "Personal Loans",
    description:
      "Responsible, transparent short-term credit delivered through capable partners and practical systems that bridge real cash-flow gaps without straining households further.",
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
    <section ref={sectionRef} id="products" className="relative h-[420vh] bg-[#1e2021]">
      <div className="sticky top-0 h-screen overflow-hidden bg-[radial-gradient(circle_at_50%_52%,rgba(63,233,236,0.045),transparent_38%)]">
        <div className="absolute inset-x-0 top-[9vh] z-50 mx-auto w-[min(90vw,76rem)] text-center text-white">
          <h2 className="bright-section-heading text-2xl font-extrabold tracking-[-0.04em] sm:text-3xl lg:text-[2.85rem]">
            Three needs that define <span className="heading-accent">household resilience.</span>
          </h2>
        </div>

        <div
          className="absolute inset-0"
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

        <ProgressRail progress={scrollYProgress} />
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
      className="absolute left-1/2 top-[20vh] h-[62vh] min-h-[30rem] w-[min(90vw,76rem)] overflow-hidden rounded-[1.15rem] border border-white/14 bg-[#303337] p-[3px]"
    >
      <div className="grid h-full grid-rows-[1.15fr_0.85fr] overflow-hidden rounded-[0.9rem] bg-[#242729] md:grid-cols-[0.94fr_1.06fr] md:grid-rows-1">
        <div className="relative z-10 flex min-h-0 flex-col justify-between border-b border-white/8 bg-[#242729] p-7 text-white sm:p-9 md:border-r md:border-b-0 lg:p-12">
          <div className="flex items-center justify-between gap-5">
            <div className="inline-block rounded-[10px] bg-gradient-to-b from-gray-800/50 to-transparent p-[2px]">
              <div className="rounded-[8px] bg-gradient-to-b from-gray-700 to-gray-600 p-[2px] shadow-[0_2px_4px_rgba(0,0,0,0.65)]">
                <div className="rounded-[5px] bg-gradient-to-b from-gray-600 to-gray-700 px-3 py-2 font-mono text-[0.68rem] font-semibold tracking-[0.2em] text-[#3FE9EC]">
                  {product.number}
                </div>
              </div>
            </div>
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/38">
              Altira Group
            </span>
          </div>

          <div className="py-5">
            <div className="mb-5 h-0.5 w-14 bg-[#3FE9EC]" />
            <h3 className="bright-section-heading max-w-[12ch] text-3xl font-extrabold leading-[0.98] tracking-[-0.045em] sm:text-4xl lg:text-[3.55rem]">
              {product.title}
            </h3>
            <p className="mt-5 max-w-[37rem] text-sm leading-7 text-white/76 sm:text-base sm:leading-8 lg:text-[1.05rem]">
              {product.description}
            </p>
            {product.detail ? (
              <p className="mt-5 hidden max-w-[35rem] border-l-2 border-[#3FE9EC]/70 pl-4 text-sm leading-7 text-white/56 sm:block">
                {product.detail}
              </p>
            ) : null}
          </div>

          <div className="flex items-center gap-3 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/36">
            <span className="size-1.5 rounded-full bg-[#3FE9EC] shadow-[0_0_10px_rgba(63,233,236,0.7)]" />
            Partner-led protection
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

function ProgressRail({ progress }: { progress: MotionValue<number> }) {
  const scaleX = useTransform(progress, [0, 1], [0, 1]);

  return (
    <div className="absolute inset-x-6 bottom-5 z-50 mx-auto max-w-[76rem] sm:bottom-7">
      <div className="rounded-[10px] border border-white/8 bg-[#252729]/94 px-4 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:px-5">
        <div className="h-px overflow-hidden bg-white/12">
          <motion.div className="h-full origin-left bg-[#3FE9EC]" style={{ scaleX }} />
        </div>
        <div className="mt-3 flex justify-between text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-white/44 sm:text-[0.68rem]">
          <span>Medical</span>
          <span>Funeral</span>
          <span>Personal loans</span>
        </div>
      </div>
    </div>
  );
}
