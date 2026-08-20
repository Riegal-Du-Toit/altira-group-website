"use client";

import { Timeline } from "@/components/ui/timeline";

const steps = [
  { number: "01", title: "Configure", description: "We map Orbit to your product, pricing and compliance requirements." },
  { number: "02", title: "Integrate", description: "We connect Orbit to your underwriting, payments and admin systems." },
  { number: "03", title: "Launch", description: "Your customers get a fast, modern onboarding and sales journey — live in weeks, not months." },
];

export function HomeV2Methodology() {
  const timelineData = steps.map((step) => ({
    title: step.title,
    content: (
      <article className="min-h-48 rounded-2xl border border-white/12 bg-[#151617] p-7 sm:p-8">
        <span className="text-xs font-medium tracking-[0.12em] text-white/40">STEP · {step.number}</span>
        <p className="mt-4 max-w-md text-sm leading-6 text-white/58">{step.description}</p>
      </article>
    ),
  }));

  return (
    <section id="method" className="w-full bg-[#1e2021] text-white">
      <Timeline data={timelineData} />
    </section>
  );
}
