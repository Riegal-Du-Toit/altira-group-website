"use client";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import { OrbitEarth } from "@/components/ui/orbit-earth";

const INSURANCE_WORD = "INSURANCE";
const DESCRIPTION_LINES = [
  "Altira Group operates at the intersection of insurance, finance and technology.",
  "Through established underwriting, distribution and international sourcing",
  "relationships, we build and connect the infrastructure that enables partners",
  "to bring essential financial products to market, efficiently, responsibly",
  "and at scale.",
];

export function NextSectionStory() {
  const [showNext, setShowNext] = useState(false);
  const [showLevel, setShowLevel] = useState(false);
  const [showInsurance, setShowInsurance] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [insuranceChars, setInsuranceChars] = useState(0);

  useEffect(() => {
    const timers = [
      window.setTimeout(() => setShowNext(true), 1100),
      window.setTimeout(() => setShowLevel(true), 1900),
      window.setTimeout(() => setShowInsurance(true), 2700),
      window.setTimeout(() => setShowOnboarding(true), 3950),
      window.setTimeout(() => setShowDescription(true), 4700),
    ];

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  useEffect(() => {
    if (!showInsurance) {
      return;
    }

    if (insuranceChars >= INSURANCE_WORD.length) {
      return;
    }

    const timer = window.setTimeout(() => {
      setInsuranceChars((current) => Math.min(current + 1, INSURANCE_WORD.length));
    }, 85);

    return () => window.clearTimeout(timer);
  }, [insuranceChars, showInsurance]);

  return (
    <section className="-mt-12 flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#1e2021] px-4 py-0 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-screen w-full max-w-[1720px] items-center justify-center overflow-hidden">
        <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.985, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.15, ease: "easeOut" }}
            className="relative z-10 aspect-square w-full max-w-[36.125rem]"
          >
            <OrbitEarth
              size={850}
              delayMs={250}
              autoRotateSpeed={0.28}
              interactive
              dragSensitivityX={0.032}
              dragSensitivityY={0.022}
              initialRotation={[-24, 12, 0]}
              jumpingArcCount={0}
              dotSpacing={16}
              maxDevicePixelRatio={1}
              className="size-full opacity-100"
              earthWrapClassName="inset-[6%]"
              earthClassName="overflow-hidden rounded-full brightness-[1.18] contrast-[1.12]"
            />
          </motion.div>

          <div className="pointer-events-none absolute left-[1.5%] top-[12%] z-30 text-[clamp(1.9rem,5.68vw,4.9rem)] font-light uppercase tracking-[0.03em] text-white/96">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={showNext ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
              transition={{ duration: 0.65, ease: "easeOut" }}
              className="barle-display"
            >
              THE NEXT
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={showOnboarding ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
              transition={{ duration: 0.65, ease: "easeOut", delay: 0.18 }}
              className="barle-display mt-[10.25rem] text-[clamp(1.9rem,5.68vw,4.9rem)] font-medium uppercase leading-none tracking-[0.04em] text-white"
            >
              ONBOARDING
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={showLevel ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="pointer-events-none absolute right-[3%] top-[34%] z-30 text-right text-[clamp(5.05rem,7.7vw,7.45rem)] font-light uppercase italic tracking-[0.03em] text-white/96"
          >
            Level Of
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={showInsurance ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="pointer-events-none absolute left-[2.4%] bottom-[32.6%] z-30 text-left text-[clamp(3.2rem,5.2vw,5.1rem)] font-light uppercase italic tracking-[0.03em] text-white/96"
          >
            {INSURANCE_WORD.slice(0, insuranceChars)}
            <span className="animate-pulse text-white/88">|</span>
          </motion.div>

          <div className="pointer-events-none absolute left-[2%] bottom-[6.9%] z-30 max-w-[34rem] space-y-1 text-[clamp(0.72rem,0.85vw,0.92rem)] font-light leading-[1.55] tracking-[0.02em] text-white/80">
            {DESCRIPTION_LINES.map((line, index) => (
              <motion.p
                key={line}
                initial={{ opacity: 0, y: 14 }}
                animate={showDescription ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                transition={{ duration: 0.55, ease: "easeOut", delay: index * 0.14 }}
              >
                {line}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
