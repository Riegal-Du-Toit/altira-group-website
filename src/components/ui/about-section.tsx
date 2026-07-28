"use client";

import { ArrowRight } from "lucide-react";

export default function AboutSection3() {
  return (
    <section className="bg-[#1E2021] px-6 py-8 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="relative">
          <div className="absolute -top-3 z-10 flex w-[85%] items-center justify-between sm:-top-2 md:top-0 lg:top-4">
            <div className="flex items-center gap-2 text-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/favicon.png"
                alt="Altira Group favicon"
                className="h-[36px] w-[36px] object-contain"
                draggable={false}
              />
              <span className="text-[34px] text-white">
                <span className="font-medium text-white/72">WHY </span>
                <span className="font-black uppercase tracking-[-0.04em] text-[#3FE9EC]">
                  ALTIRA GROUP
                </span>
              </span>
            </div>
            <div className="flex gap-4">
              {[
                ["https://pro-section.ui-layouts.com/facebook.svg", "fb", "https://www.facebook.com/"],
                ["https://pro-section.ui-layouts.com/instagram.svg", "insta", "https://www.instagram.com/"],
                ["https://pro-section.ui-layouts.com/linkedin.svg", "linkedin", "https://www.linkedin.com/"],
                ["https://pro-section.ui-layouts.com/youtube.svg", "youtube", "https://www.youtube.com/"],
              ].map(([src, alt, href]) => (
                <a
                  key={alt}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-lg border border-white/10 bg-white/8 sm:h-6 sm:w-6 md:h-8 md:w-8"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt={alt} width={24} height={24} />
                </a>
              ))}
            </div>
          </div>

          <figure className="group relative">
            <svg className="w-full" width="100%" height="100%" viewBox="0 0 100 40">
              <defs>
                <clipPath id="clip-inverted" clipPathUnits="objectBoundingBox">
                  <path
                    d="M0.0998072 1H0.422076H0.749756C0.767072 1 0.774207 0.961783 0.77561 0.942675V0.807325C0.777053 0.743631 0.791844 0.731953 0.799059 0.734076H0.969813C0.996268 0.730255 1.00088 0.693206 0.999875 0.675159V0.0700637C0.999875 0.0254777 0.985045 0.00477707 0.977629 0H0.902473C0.854975 0 0.890448 0.138535 0.850165 0.138535H0.0204424C0.00408849 0.142357 0 0.180467 0 0.199045V0.410828C0 0.449045 0.0136283 0.46603 0.0204424 0.469745H0.0523086C0.0696245 0.471019 0.0735527 0.497877 0.0733523 0.511146V0.915605C0.0723903 0.983121 0.090588 1 0.0998072 1Z"
                    fill="#D9D9D9"
                  />
                </clipPath>
              </defs>
              <image
                clipPath="url(#clip-inverted)"
                preserveAspectRatio="xMidYMid slice"
                width="100%"
                height="100%"
                xlinkHref="https://images.unsplash.com/photo-1718601980986-0ce75101d52d?w=1200&auto=format&fit=crop"
              />
            </svg>
          </figure>

          <div className="flex flex-wrap items-center justify-between py-3 text-sm lg:justify-start">
            <div className="flex gap-4">
              <div className="mb-2 flex items-center gap-2 text-xs sm:text-base">
                <span className="font-bold text-[#3FE9EC]">5</span>
                <span className="text-white/70">global locations</span>
                <span className="text-white/30">|</span>
              </div>
              <div className="mb-2 flex items-center gap-2 text-xs sm:text-base">
                <span className="font-bold text-[#3FE9EC]">3</span>
                <span className="text-white/70">connected lines</span>
              </div>
            </div>
            <div className="flex flex-row-reverse gap-4 lg:absolute lg:bottom-16 lg:right-0 lg:flex-col lg:gap-0">
              <div className="mb-2 flex items-center gap-2 text-2xl sm:text-3xl lg:text-4xl">
                <span className="font-semibold text-[#3FE9EC]">100%</span>
                <span className="uppercase text-white/72">licensed</span>
              </div>
              <div className="mb-2 flex items-center gap-2 text-xs sm:text-base">
                <span className="font-bold text-[#3FE9EC]">24/7</span>
                <span className="text-white/70">always in motion</span>
                <span className="block text-white/30 lg:hidden">|</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <h1 className="mb-8 text-2xl font-semibold !leading-[110%] text-white sm:text-4xl md:text-5xl">
              What that connected footprint actually buys a partner.
            </h1>

            <div className="grid gap-8 text-white/72 md:grid-cols-2">
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
              <div className="mb-2 text-2xl font-black uppercase tracking-[-0.04em] text-white transition-all duration-500">
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
    </section>
  );
}
