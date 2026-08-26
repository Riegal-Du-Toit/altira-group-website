"use client";

import { useEffect, useRef, useState } from "react";
import { FinancialScoreCards } from "@/components/ui/financial-score-cards";
import { poppins } from "@/lib/google-fonts";

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
    <section ref={sectionRef} className={`relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-transparent text-[#2E2E38] transition-colors duration-500 ${visible ? "" : "motion-safe:opacity-0"}`}>
      <style>{`
        @keyframes bento2-float { 50% { transform: translateY(-6%); } }
        @keyframes bento2-pulse { 50% { transform: scale(1.08); opacity: 1; } }
        @keyframes bento2-tilt { 50% { transform: rotate(2deg); } }
        @keyframes bento2-drift { 50% { transform: translate3d(6%, -6%, 0); } }
        @keyframes bento2-glow { 50% { opacity: 1; filter: drop-shadow(0 0 6px rgba(0,0,0,.2)); } }
        @keyframes bento2-intro { to { opacity: 1; transform: translate3d(0,0,0); } }
        @keyframes bento2-card { to { opacity: 1; transform: translate3d(0,0,0) scale(1); } }
      `}</style>
      <div className={`relative mx-auto w-full max-w-none px-6 py-20 motion-safe:translate-y-40 md:px-10 lg:px-[max(7.75rem,calc((100vw-96rem)/2+7.75rem))] ${visible ? "motion-safe:animate-[bento2-intro_.9s_ease-out_forwards]" : ""}`}>
        <header className="mb-10 flex flex-col gap-6 pb-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-[.35em] text-[#2E2E38]/60">Why Altira</span>
            <h2 className={`${poppins.className} text-[27px] font-extrabold uppercase leading-[.98] tracking-[-0.02em] md:text-[2.5rem]`}>
              We&apos;re a technology partner<br />
              not a competitor.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-[#2E2E38]/72 md:text-base">Altira Group builds the technology and customer journey that make your product easier to sell and easier to use.</p>
        </header>
        <FinancialScoreCards />
      </div>
    </section>
  );
}
