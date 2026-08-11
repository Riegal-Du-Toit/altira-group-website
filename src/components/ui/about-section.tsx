"use client";

import { ArrowRight } from "lucide-react";
import { LampBeam } from "@/components/ui/lamp";

export default function AboutSection3() {
  return (
    <div className="bg-[#1E2021] px-6 pt-12 text-white sm:px-8 sm:pt-14 lg:px-12 lg:pt-16">
      <div className="mx-auto max-w-6xl">
        <LampBeam className="mb-0 mt-8" />

        <div className="relative z-20 grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <h1 className="landing-title mb-8 text-2xl text-white sm:text-4xl md:text-5xl">
              What that connected footprint actually buys a partner.
            </h1>

            <div className="landing-copy grid gap-8 text-white/72 md:grid-cols-2">
              <div className="text-xs sm:text-base">
                <p className="text-justify leading-relaxed">
                  Altira Group brings medical insurance, funeral insurance and personal loans into one
                  connected, partner-led model built around household resilience. We focus on the
                  real needs that determine whether a family can absorb a shock or be undone by it.
                </p>
              </div>
              <div className="text-xs sm:text-base">
                <p className="text-justify leading-relaxed">
                  Through underwriting, distribution and sourcing relationships across Cape Town,
                  Johannesburg, Shenzhen, New York and London, Altira Group builds access to protection
                  and credit in a way that is regulated, practical and easier for households to use.
                </p>
              </div>
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="text-right">
              <div className="landing-title mb-2 text-2xl uppercase text-white transition-all duration-500">
                ALTIRA GROUP
              </div>
              <div className="mb-8 text-sm text-white/64">Experience-led distribution</div>

              <div className="mb-6">
                <p className="mb-4 font-medium text-white">
                  Ready to bring regulated, partner-led distribution into one coherent model?
                </p>
              </div>

              <a
                href="#contact"
                className="ml-auto flex w-fit cursor-pointer gap-2 rounded-[12px] border border-white/12 bg-gradient-to-b from-[#3d4c63] to-[#344154] px-5 py-3 font-semibold text-white shadow-[0_12px_30px_rgba(0,0,0,0.28)] transition-all duration-300 ease-in-out hover:gap-4 hover:from-[#465875] hover:to-[#3b4b62]"
              >
                LET&apos;S COLLABORATE <ArrowRight />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
