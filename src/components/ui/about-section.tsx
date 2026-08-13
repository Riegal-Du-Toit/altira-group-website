"use client";

import { ArrowRight } from "lucide-react";
import { LampBeam } from "@/components/ui/lamp";

export default function AboutSection3() {
  return (
    <div className="bg-[#1E2021] text-white">
      <LampBeam className="-mt-[10px]" contentClassName="mx-auto max-w-6xl px-6 pb-16 sm:px-8 lg:px-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <h1 className="bright-section-heading landing-title mb-8 max-w-[15ch] text-[clamp(1.65rem,2.9vw,3.35rem)] leading-[0.95] tracking-[-0.065em]">
              <span className="block">What that</span>
              <span className="heading-accent block translate-x-[0.45ch]">proprietary engine</span>
              <span className="block translate-x-[0.9ch]">actually unlocks.</span>
            </h1>

            <div className="landing-copy grid gap-8 text-white/72 md:grid-cols-2">
              <div className="text-xs sm:text-base">
                <p className="text-justify leading-relaxed">
                  Altira Group&apos;s Orbit Engine brings medical insurance, funeral insurance and personal
                  loans into one connected operating model built around household resilience,
                  strengthened by trusted partners and proven platform capability.
                </p>
              </div>
              <div className="text-xs sm:text-base">
                <p className="text-justify leading-relaxed">
                  Through underwriting, distribution and sourcing relationships across Cape Town,
                  Johannesburg, Shenzhen, New York and London, Altira Group connects best-in-class
                  partners, channels and capabilities so protection and credit feel simpler to use.
                </p>
              </div>
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="text-right">
              <div className="landing-title mb-2 text-2xl uppercase text-white transition-all duration-500">
                ORBIT ENGINE
              </div>
              <div className="mb-8 text-sm text-white/64">Proprietary orchestration layer</div>

              <div className="mb-6">
                <p className="mb-4 font-medium text-white">
                  Ready to bring members into a premium experience built around satisfaction?
                </p>
              </div>

              <a
                href="#app-experience"
                className="ml-auto flex w-fit cursor-pointer gap-2 rounded-[12px] border border-white/12 bg-gradient-to-b from-[#3d4c63] to-[#344154] px-5 py-3 font-semibold text-white shadow-[0_12px_30px_rgba(0,0,0,0.28)] transition-all duration-300 ease-in-out hover:gap-4 hover:from-[#465875] hover:to-[#3b4b62]"
              >
                JOIN THE EXPERIENCE <ArrowRight />
              </a>
            </div>
          </div>
        </div>
      </LampBeam>
    </div>
  );
}
