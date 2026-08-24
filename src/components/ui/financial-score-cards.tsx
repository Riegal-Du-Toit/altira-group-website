"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { openSansThin } from "@/lib/google-fonts";

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
    badge: "Lighting",
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
  const [complete, setComplete] = useState(false);
  const circumference = Math.PI * 90;
  const percentage = Math.round(progress * 100);
  const scoreText = `${percentage}%`;

  useEffect(() => {
    if (!active) setComplete(false);
  }, [active]);

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
        <motion.path
          d="M5 50 A45 45 0 0 1 95 50"
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: active ? circumference * (1 - progress) : circumference }}
          transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1], delay: 0.25 }}
          onAnimationComplete={() => active && setComplete(true)}
        />
      </svg>
      {complete ? (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          {Array.from({ length: 14 }, (_, index) => {
            const angle = (Math.PI * 2 * index) / 14;
            return (
              <motion.span
                key={index}
                initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                animate={{ x: Math.cos(angle) * 58, y: Math.sin(angle) * 58, scale: [0, 1.15, 0], opacity: [1, 1, 0] }}
                transition={{ duration: 0.7, ease: "easeOut", delay: index * 0.012 }}
                style={{ backgroundColor: colors[index % 2] }}
                className="absolute left-1/2 top-1/2 size-1.5 rounded-full shadow-[0_0_8px_currentColor]"
              />
            );
          })}
          <motion.span
            initial={{ scale: 0, opacity: 0, rotate: -35 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 360, damping: 18, delay: 0.62 }}
            style={{ backgroundColor: colors[1] }}
            className="absolute right-[calc(8%-9px)] top-[calc(5.2rem+35px)] flex size-7 items-center justify-center rounded-full shadow-[0_0_12px_currentColor]"
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="m5 12 4 4L19 6" />
            </svg>
          </motion.span>
        </div>
      ) : null}
      <div className="absolute inset-x-0 bottom-4 text-center">
        <div className="text-4xl font-medium tracking-tight text-[#2E2E38]" aria-label={complete ? scoreText : undefined}>
          {complete ? scoreText.split("").map((character, index) => (
            <motion.span
              key={`${character}-${index}`}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.32 + index * 0.13 }}
              className="inline-block"
            >
              {character}
            </motion.span>
          )) : null}
        </div>
        {complete ? (
          <motion.div
            initial={{ opacity: 0, y: 7 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.76 }}
            className="mt-1 text-xs uppercase tracking-[.14em] text-[#2E2E38]/55"
          >
            Score
          </motion.div>
        ) : null}
      </div>
    </div>
  );
}

function FinancialScoreCard({ card, index }: { card: ScoreCard; index: number }) {
  const [active, setActive] = useState(false);
  const [run, setRun] = useState(0);
  const cardRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = cardRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setActive(entry.isIntersecting);
      if (entry.isIntersecting) setRun((current) => current + 1);
    }, { threshold: 0.3 });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.65, delay: index * 0.14 }}
      className="relative flex min-h-[25rem] flex-col rounded-xl border border-[#3FE9EC]/80 bg-[#E4E5EA]/70 p-7 shadow-[0_2px_6px_rgba(0,0,0,.08),inset_1px_1px_.5px_rgba(255,255,255,.85)] backdrop-blur-sm"
    >
      <header className="flex items-center justify-between gap-4">
        <span className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[.08em]" style={{ backgroundColor: card.badge === "Lighting" ? "#A7B4C5" : `${card.colors[0]}80`, color: card.badge === "Lighting" ? "#FFFFFF" : card.colors[1] }}>
          {card.badge}
        </span>
        <h3 className="text-xl font-medium text-[#2E2E38]">{card.title}</h3>
      </header>
      <ScoreArc key={run} progress={card.progress} colors={card.colors} active={active} />
      <p className="min-h-[4.5rem] text-center text-sm leading-6 text-black">{card.description}</p>
      <button
        type="button"
        className={`relative mt-7 inline-flex w-fit self-center items-stretch overflow-hidden rounded-[12px] border-[1.5px] border-[#37D8C6] !bg-[#E4E5EA] p-0 text-[16px] font-bold text-[#2E2E38] shadow-[0_10px_28px_rgba(17,22,61,0.14)] transition-all duration-300 ease-out hover:!bg-[#E4E5EA] hover:shadow-[0_12px_30px_rgba(17,22,61,0.2)] active:scale-[0.97] ${openSansThin.className}`}
      >
        <span className="relative flex items-center justify-center gap-1.5 rounded-[10px] !bg-[#E4E5EA] px-[1.05em] py-[0.64em] pr-[0.95em] text-[0.8rem] font-light uppercase tracking-[0.12em] text-inherit transition-colors duration-300 sm:text-[0.88rem]">
          Learn more <ArrowRight className="size-3.5 text-[#37D8C6]" />
        </span>
      </button>
    </motion.article>
  );
}

export function FinancialScoreCards() {
  return <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">{cards.map((card, index) => <FinancialScoreCard key={card.title} card={card} index={index} />)}</div>;
}
