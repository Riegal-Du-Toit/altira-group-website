"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type AppSlide = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  imagePosition: string;
};

const slides: AppSlide[] = [
  {
    title: "Live inside Altira.",
    description: "One premium member space where everything starts, connects and keeps moving around you.",
    image: "/employee.gif",
    imageAlt: "Altira mobile member access",
    imagePosition: "center",
  },
  {
    title: "Everything in one place.",
    description: "Onboarding, updates, support and access stay together in a single app experience.",
    image: "/company.gif",
    imageAlt: "Altira member service experience",
    imagePosition: "center",
  },
  {
    title: "Smart navigation.",
    description: "Members move with clarity, guided by simple paths that make every next step obvious.",
    image: "/map.png",
    imageAlt: "Altira connected member footprint",
    imagePosition: "center 58%",
  },
  {
    title: "Feel looked after.",
    description: "The experience is built to feel personal, responsive and intentionally premium.",
    image: "/employee.gif",
    imageAlt: "Altira guided onboarding path",
    imagePosition: "center",
  },
  {
    title: "Opportunity within reach.",
    description: "Altira brings members closer to services, support and life-changing possibilities.",
    image: "/company.gif",
    imageAlt: "Altira premium member experience",
    imagePosition: "center",
  },
];

export function DownloadShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const updateActiveSlide = () => {
      const section = sectionRef.current;
      if (!section) return;

      const scrollableHeight = section.offsetHeight - window.innerHeight;
      if (scrollableHeight <= 0) {
        setActiveIndex(0);
        return;
      }

      const rect = section.getBoundingClientRect();
      const scrolled = Math.min(Math.max(-rect.top, 0), scrollableHeight);
      const stepHeight = scrollableHeight / slides.length;
      const nextIndex = Math.min(slides.length - 1, Math.floor(scrolled / stepHeight));
      setActiveIndex(nextIndex);
    };

    updateActiveSlide();
    window.addEventListener("scroll", updateActiveSlide, { passive: true });
    window.addEventListener("resize", updateActiveSlide);

    return () => {
      window.removeEventListener("scroll", updateActiveSlide);
      window.removeEventListener("resize", updateActiveSlide);
    };
  }, []);

  const gridPatternStyle = {
    "--grid-color": "rgba(5, 6, 6, 0.12)",
    backgroundImage: `
      linear-gradient(to right, var(--grid-color) 1px, transparent 1px),
      linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px)
    `,
    backgroundSize: "2.625rem 2.625rem",
  } as React.CSSProperties;

  return (
    <section
      id="app-experience"
      ref={sectionRef}
      className="app-experience-scrollbar relative w-full max-w-full overflow-x-clip bg-transparent text-white"
      style={{ height: `${slides.length * 100}vh` }}
    >
      <div className="sticky top-0 flex min-h-screen items-center justify-center overflow-hidden px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto w-[calc(100%-40px)] max-w-[1354px] overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#3FE9EC] shadow-[0_34px_120px_rgba(0,0,0,0.42)]">
          <div className="grid min-h-[calc(66vh-30px)] grid-cols-1 lg:grid-cols-2">
            <div className="relative flex min-h-[34rem] flex-col justify-center border-white/12 bg-[#3FE9EC] px-8 py-14 text-[#050606] md:px-16 lg:border-r lg:py-18">
              <div className="absolute left-8 top-10 flex gap-2 md:left-16">
                {slides.map((slide, index) => (
                  <button
                    key={slide.title}
                    type="button"
                    onClick={() => {
                      const section = sectionRef.current;
                      if (!section) return;

                      const scrollableHeight = section.offsetHeight - window.innerHeight;
                      const stepHeight = scrollableHeight / slides.length;
                      const targetTop = window.scrollY + section.getBoundingClientRect().top + stepHeight * index;
                      window.scrollTo({ top: targetTop, behavior: "smooth" });
                    }}
                    className={cn(
                      "h-1 rounded-full transition-all duration-500 ease-out",
                      index === activeIndex ? "w-12 bg-[#050606]" : "w-6 bg-[#050606]/22",
                    )}
                    aria-label={`Go to app experience slide ${index + 1}`}
                  />
                ))}
              </div>

              <div className="relative h-[20.5rem] w-full md:h-[21.5rem]">
                {slides.map((slide, index) => (
                  <div
                    key={slide.title}
                    className={cn(
                      "absolute inset-0 flex flex-col justify-center transition-all duration-700 ease-in-out",
                      index === activeIndex
                        ? "translate-y-0 opacity-100"
                        : "translate-y-10 opacity-0",
                    )}
                  >
                    <h2 className="line-clamp-2 min-h-[1.8em] max-w-[12ch] text-[3.4rem] font-black leading-[0.9] text-[#050606] md:text-[4.7rem] lg:text-[5.1rem]">
                      {slide.title}
                    </h2>
                    <p className="mt-8 line-clamp-3 min-h-[4.5em] max-w-[34rem] text-xl font-semibold leading-[1.5] text-[#050606]/82 md:text-[1.35rem]">
                      {slide.description}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                href="#offices"
                className="absolute bottom-8 left-8 inline-flex h-14 items-center gap-3 rounded-full bg-[#050606] px-10 text-sm font-black uppercase tracking-[0.06em] text-white transition-colors hover:bg-[#162426] md:left-16"
              >
                Join Altira Now
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>

            <div
              className="relative hidden min-h-[34rem] items-center justify-center overflow-hidden bg-[#3FE9EC] p-8 lg:flex"
              style={gridPatternStyle}
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_58%_42%,rgba(255,255,255,0.18),transparent_24%),linear-gradient(90deg,rgba(5,6,6,0.03),transparent_38%,rgba(5,6,6,0.04))]" />
              <div className="relative h-[61vh] max-h-[32.3rem] w-[48%] min-w-[15.3rem] overflow-hidden rounded-[1rem] border-[5px] border-[#050606]/8 bg-[#050606] shadow-[0_26px_80px_rgba(0,0,0,0.36)]">
                <div
                  className="absolute left-0 top-0 h-full w-full transition-transform duration-700 ease-in-out"
                  style={{ transform: `translateY(-${activeIndex * 100}%)` }}
                >
                  {slides.map((slide) => (
                    <div key={slide.title} className="relative h-full w-full">
                      <Image
                        src={slide.image}
                        alt={slide.imageAlt}
                        fill
                        sizes="(min-width: 1024px) 24vw, 80vw"
                        className="object-cover"
                        style={{ objectPosition: slide.imagePosition }}
                        priority={slide === slides[0]}
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,6,6,0.02),rgba(5,6,6,0.28))]" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative block min-h-[24rem] bg-[#3FE9EC] p-8 lg:hidden" style={gridPatternStyle}>
              <div className="relative mx-auto h-[22rem] max-w-[18rem] overflow-hidden rounded-[1rem] border-[5px] border-[#050606]/8 bg-[#050606] shadow-[0_22px_70px_rgba(0,0,0,0.32)]">
                <Image
                  src={slides[activeIndex].image}
                  alt={slides[activeIndex].imageAlt}
                  fill
                  sizes="80vw"
                  className="object-cover transition-opacity duration-500"
                  style={{ objectPosition: slides[activeIndex].imagePosition }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
