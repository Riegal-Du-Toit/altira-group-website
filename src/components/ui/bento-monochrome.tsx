"use client";

import { BarChart, FrameIcon, Grid2x2PlusIcon, LayersIcon, type LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { anton } from "@/lib/fonts";

type Feature = {
  title: string;
  blurb: string;
  meta: string;
  icon: LucideIcon;
  animation: string;
};

const features: Feature[] = [
  { title: "System Patterns", blurb: "Foundational blocks arranged with deliberate rhythm and precise spacing across the viewport grid.", meta: "Layout", icon: Grid2x2PlusIcon, animation: "bento2-float 6s ease-in-out infinite" },
  { title: "Signal Balance", blurb: "Monochrome surfaces and tight contrast ratios keep focus on intent over ornamentation.", meta: "Tone", icon: BarChart, animation: "bento2-pulse 4s ease-in-out infinite" },
  { title: "Structured Flow", blurb: "Information passes through aligned channels for clarity, speed, and effortless scanning.", meta: "Flow", icon: Grid2x2PlusIcon, animation: "bento2-tilt 5.5s ease-in-out infinite" },
  { title: "Clean Signals", blurb: "Each icon is drawn once, animated gently, and rendered strictly in strokes for a disciplined feel.", meta: "Craft", icon: FrameIcon, animation: "bento2-drift 8s ease-in-out infinite" },
  { title: "Quiet Energy", blurb: "Subtle motion hints at responsiveness without ever distracting from the message conveyed.", meta: "Pulse", icon: LayersIcon, animation: "bento2-glow 7s ease-in-out infinite" },
];

const spans = ["md:col-span-4 md:row-span-2", "md:col-span-2", "md:col-span-2", "md:col-span-3", "md:col-span-3"];

export default function BentoMonochrome() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.25 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={`relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-transparent text-neutral-900 transition-colors duration-500 dark:text-white ${visible ? "" : "motion-safe:opacity-0"}`}>
      <style>{`
        @keyframes bento2-float { 50% { transform: translateY(-6%); } }
        @keyframes bento2-pulse { 50% { transform: scale(1.08); opacity: 1; } }
        @keyframes bento2-tilt { 50% { transform: rotate(2deg); } }
        @keyframes bento2-drift { 50% { transform: translate3d(6%, -6%, 0); } }
        @keyframes bento2-glow { 50% { opacity: 1; filter: drop-shadow(0 0 6px rgba(0,0,0,.2)); } }
        @keyframes bento2-intro { to { opacity: 1; transform: translate3d(0,0,0); } }
        @keyframes bento2-card { to { opacity: 1; transform: translate3d(0,0,0) scale(1); } }
      `}</style>
      <div className={`relative mx-auto w-full max-w-none px-6 py-20 motion-safe:translate-y-7 md:px-10 lg:px-16 ${visible ? "motion-safe:animate-[bento2-intro_.9s_ease-out_forwards]" : ""}`}>
        <header className="mb-10 flex flex-col gap-6 border-b border-neutral-900/10 pb-6 md:flex-row md:items-end md:justify-between dark:border-white/10">
          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-[.35em] text-neutral-500 dark:text-white/40">Grid Studies</span>
            <h2 className={`${anton.className} text-3xl tracking-tight md:text-5xl`}>Monochrome Bento</h2>
          </div>
          <div className="flex flex-col items-start gap-4 md:items-end">
            <p className="max-w-sm text-sm text-neutral-600 md:text-base dark:text-white/60">A stark layout built on modular spans, animated outlines, and purposeful whitespace.</p>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-3 md:auto-rows-[minmax(120px,auto)] md:grid-cols-6">
          {features.map((feature, index) => <BentoItem key={feature.title} feature={feature} span={spans[index]} delay={index * 0.12} visible={visible} />)}
        </div>
      </div>
    </section>
  );
}

function BentoItem({ feature, span, delay, visible }: { feature: Feature; span: string; delay: number; visible: boolean }) {
  const Icon = feature.icon;
  return (
    <article style={{ animationDelay: `${delay}s` }} className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-neutral-900/10 bg-white/80 p-5 shadow-[0_10px_40px_rgba(0,0,0,.04)] transition hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,.08)] dark:border-white/10 dark:bg-white/5 ${span} motion-safe:opacity-0 motion-safe:translate-y-[18px] motion-safe:scale-[.96] ${visible ? "motion-safe:animate-[bento2-card_.8s_ease-out_forwards]" : ""}`}>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_120%_at_12%_0%,rgba(148,163,184,.32),transparent_72%)] dark:bg-[radial-gradient(ellipse_60%_120%_at_12%_0%,rgba(59,130,246,.24),transparent_72%)]" />
      <div className="flex items-start gap-4">
        <div className="flex size-12 items-center justify-center rounded-full border border-neutral-900/15 bg-white dark:border-white/15 dark:bg-white/10"><Icon className="size-7 dark:text-white" strokeWidth={1.5} style={{ animation: feature.animation }} /></div>
        <div className="flex-1"><header className="flex items-start gap-3"><h3 className="text-base font-semibold uppercase tracking-wide">{feature.title}</h3><span className="ml-auto rounded-full border border-neutral-900/10 px-2 py-0.5 text-[10px] uppercase tracking-[.3em] text-neutral-500 dark:border-white/15 dark:text-white/60">{feature.meta}</span></header><p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-white/60">{feature.blurb}</p></div>
      </div>
    </article>
  );
}
