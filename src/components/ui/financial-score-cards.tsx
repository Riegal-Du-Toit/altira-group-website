"use client";

import { motion } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";
import { CompletionConfetti } from "@/components/ui/motion-confetti";

type ScoreCard = {
  title: string;
  description: string;
  number: string;
  progress: number;
  badge: string;
  colors: [string, string];
};

const cards: ScoreCard[] = [
  {
    title: "Speed",
    description: "Plug-and-play technology means faster launch than a custom build, so partners go live sooner with proven onboarding and sales journeys.",
    number: "01",
    progress: 0.97,
    badge: "Lightning",
    colors: ["#E2E8F0", "#94A3B8"],
  },
  {
    title: "Focus",
    description: "We don't hold a license and don't intend to. You keep the regulatory and risk relationship; we handle the technology and experience.",
    number: "02",
    progress: 0.99,
    badge: "Lazer",
    colors: ["#FDE68A", "#D97706"],
  },
  {
    title: "Flexibility",
    description: "Our process redesign and technology can be configured to a single product line or a full distribution overhaul.",
    number: "03",
    progress: 0.95,
    badge: "Absolute",
    colors: ["#9EE7BB", "#16A34A"],
  },
];

function ScoreArc({ progress, colors, active }: { progress: number; colors: [string, string]; active: boolean }) {
  const gradientId = useId().replace(/:/g, "");
  const arcPathRef = useRef<SVGPathElement>(null);
  const [complete, setComplete] = useState(false);
  const [arcProgress, setArcProgress] = useState(0);
  const arcLength = Math.PI * 45;
  const percentage = Math.round(progress * 100);

  useEffect(() => {
    if (!active) {
      setArcProgress(0);
      setComplete(false);
      return;
    }

    const delay = 150;
    const duration = 1500;
    const startedAt = performance.now();
    const arcPath = arcPathRef.current;
    const endOffset = arcLength * (1 - progress);
    let frameId = 0;

    arcPath?.getAnimations().forEach((animation) => animation.cancel());
    arcPath?.style.setProperty("stroke-dashoffset", `${arcLength}px`);
    const arcAnimation = arcPath?.animate(
      [
        { strokeDashoffset: `${arcLength}px` },
        { strokeDashoffset: `${endOffset}px` },
      ],
      { delay, duration, easing: "linear", fill: "forwards" },
    );

    const tick = (now: number) => {
      const elapsed = now - startedAt - delay;
      const elapsedProgress = Math.min(Math.max(elapsed / duration, 0), 1);
      const currentProgress = elapsedProgress * progress;
      setArcProgress(currentProgress);

      if (elapsedProgress < 1) {
        frameId = window.requestAnimationFrame(tick);
      } else {
        setComplete(true);
      }
    };

    setComplete(false);
    frameId = window.requestAnimationFrame(tick);
    return () => {
      window.cancelAnimationFrame(frameId);
      arcAnimation?.cancel();
    };
  }, [active, arcLength, progress]);

  return (
    <div className="relative h-40">
      <svg className="mx-auto h-36 w-full max-w-[18rem] overflow-visible" viewBox="0 0 100 55" aria-hidden="true">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
            <stop stopColor={colors[0]} />
            <stop offset="100%" stopColor={colors[1]} />
          </linearGradient>
        </defs>
        <path d="M5 50 A45 45 0 0 1 95 50" fill="none" stroke="rgba(46,46,56,.12)" strokeWidth="10" strokeLinecap="round" />
        <path
          ref={arcPathRef}
          d="M5 50 A45 45 0 0 1 95 50"
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDashoffset={arcLength}
          style={{ strokeDasharray: `${arcLength}px` }}
        />
      </svg>
      <span aria-hidden="true" className="absolute left-1/2 top-[calc(5.2rem+35px)] -translate-x-1/2">
        <CompletionConfetti active={complete} />
      </span>
      <div className="absolute inset-x-0 bottom-4 text-center">
        <div className="text-4xl font-medium tracking-tight text-[#2E2E38]" aria-label={`${percentage}%`}>
          {active ? <span>{Math.round(arcProgress * 100)}%</span> : null}
        </div>
        {active ? (
          <motion.div
            initial={{ opacity: 0, y: 7 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.02 }}
            className="mt-1 text-xs uppercase tracking-[.14em] text-[#2E2E38]/55"
          >
            Score
          </motion.div>
        ) : null}
      </div>
    </div>
  );
}

function FinancialScoreCard({ card, index, active, run }: { card: ScoreCard; index: number; active: boolean; run: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.65, delay: index * 0.14 }}
      className="relative flex flex-col rounded-xl border border-[#3FE9EC]/80 bg-[#E4E5EA]/70 p-7 shadow-[0_2px_6px_rgba(0,0,0,.08),inset_1px_1px_.5px_rgba(255,255,255,.85)] backdrop-blur-sm"
    >
      <header className="flex items-center justify-between gap-4">
        <span className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[.08em]" style={{ backgroundColor: card.badge === "Lightning" ? "#A7B4C5" : `${card.colors[0]}80`, color: card.badge === "Lightning" ? "#FFFFFF" : card.colors[1] }}>
          {card.badge}
        </span>
        <h3 className="text-xl font-medium text-[#2E2E38]">{card.title}</h3>
      </header>
      <ScoreArc key={`${run}-${active}`} progress={card.progress} colors={card.colors} active={active} />
      <p className="min-h-[4.5rem] text-center text-sm leading-6 text-black">{card.description}</p>
    </motion.article>
  );
}

export function FinancialScoreCards() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [run, setRun] = useState(0);

  useEffect(() => {
    const element = gridRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        setActiveIndex(-1);
        return;
      }
      setRun((current) => current + 1);
      setActiveIndex(cards.length - 1);
    }, { threshold: 0.3 });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={gridRef} className="grid grid-cols-1 gap-5 lg:grid-cols-3">
      {cards.map((card, index) => <FinancialScoreCard key={card.title} card={card} index={index} active={index <= activeIndex} run={run} />)}
    </div>
  );
}
