"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useId } from "react";
import { openSansThin } from "@/lib/google-fonts";

type ScoreCard = {
  title: string;
  description: string;
  number: string;
  progress: number;
};

const cards: ScoreCard[] = [
  {
    title: "Speed",
    description: "Plug-and-play technology means faster launch than a custom build.",
    number: "01",
    progress: 0.34,
  },
  {
    title: "Focus",
    description: "We don't hold a license and don't intend to. You keep the regulatory and risk relationship; we handle the technology and experience.",
    number: "02",
    progress: 0.67,
  },
  {
    title: "Flexibility",
    description: "Our process redesign and technology can be configured to a single product line or a full distribution overhaul.",
    number: "03",
    progress: 1,
  },
];

function strength(score: number | null) {
  if (score === null) return { label: "None", colors: ["#a8afb9", "#6f7781"] };
  if (score >= 80) return { label: "Strong", colors: ["#9ee7bb", "#16a34a"] };
  if (score >= 40) return { label: "Moderate", colors: ["#fde68a", "#d97706"] };
  return { label: "Weak", colors: ["#fecaca", "#dc2626"] };
}

function ScoreArc({ progress, number }: { progress: number; number: string }) {
  const gradientId = useId().replace(/:/g, "");
  const { colors } = strength(progress * 100);
  const circumference = Math.PI * 90;

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
          whileInView={{ strokeDashoffset: circumference * (1 - progress) }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1], delay: 0.25 }}
        />
      </svg>
      <div className="absolute inset-x-0 bottom-0 text-center">
        <div className="text-4xl font-medium tracking-tight text-[#2E2E38]">{number}</div>
        <div className="mt-1 text-xs uppercase tracking-[.14em] text-[#2E2E38]/55">Reason</div>
      </div>
    </div>
  );
}

function FinancialScoreCard({ card, index }: { card: ScoreCard; index: number }) {
  const state = strength(card.progress * 100);

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.65, delay: index * 0.14 }}
      className="relative flex min-h-[25rem] flex-col rounded-xl border border-[#3FE9EC]/80 bg-[#E4E5EA]/70 p-7 shadow-[0_2px_6px_rgba(0,0,0,.08),inset_1px_1px_.5px_rgba(255,255,255,.85)] backdrop-blur-sm"
    >
      <header className="flex items-center justify-between gap-4">
        <h3 className="text-xl font-medium text-[#2E2E38]">{card.title}</h3>
        <span className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[.08em]" style={{ backgroundColor: `${state.colors[0]}80`, color: state.colors[1] }}>
          {state.label}
        </span>
      </header>
      <ScoreArc progress={card.progress} number={card.number} />
      <p className="min-h-[4.5rem] text-center text-sm leading-6 text-[#2E2E38]/70">{card.description}</p>
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
