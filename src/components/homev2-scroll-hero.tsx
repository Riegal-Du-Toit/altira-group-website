"use client";

import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

import { HomeV2AnimatedPlanet } from "@/components/homev2-animated-planet";
import { TalkButton } from "@/components/homev2-header";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";
import { anton } from "@/lib/fonts";
import { openSansThin, poppins } from "@/lib/google-fonts";

export function HomeV2ScrollHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollY, scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 3) setHasScrolled(true);
  });
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateMobileState = () => setIsMobile(mediaQuery.matches);
    updateMobileState();
    mediaQuery.addEventListener("change", updateMobileState);
    return () => mediaQuery.removeEventListener("change", updateMobileState);
  }, []);
  const smoothScrollYProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.45 });

  const headingLeft = "max(7.75rem, calc((100vw - 96rem) / 2 + 7.75rem))";
  const headingTop = "calc(34% - 52px)";
  const headingX = "0%";
  const headingY = "-50%";

  const mobileIntroY = useTransform(smoothScrollYProgress, [0.08, 0.28], [0, -96]);
  const mobileIntroOpacity = useTransform(smoothScrollYProgress, [0.08, 0.28], [1, 0]);
  const mobileCustomerY = useTransform(smoothScrollYProgress, [0.2, 0.46], [110, 0]);
  const mobileCustomerOpacity = useTransform(smoothScrollYProgress, [0.2, 0.3, 0.46], [0, 0, 1]);
  const mobileDescriptionY = useTransform(smoothScrollYProgress, [0.36, 0.58], [80, 0]);
  const mobileDescriptionOpacity = useTransform(smoothScrollYProgress, [0.36, 0.46, 0.58], [0, 0, 1]);
  const mobileCtaY = useTransform(smoothScrollYProgress, [0.56, 0.7], [48, 0]);
  const mobileCtaOpacity = useTransform(smoothScrollYProgress, [0.56, 0.7], [0, 1]);
  const customerY = useTransform(smoothScrollYProgress, [0.52, 0.75], [280, 0]);
  const descriptionY = useTransform(smoothScrollYProgress, [0.55, 0.94], [280, 0]);
  const ctaOpacity = useTransform(smoothScrollYProgress, [0.82, 0.94], [0, 1]);
  const ctaY = useTransform(smoothScrollYProgress, [0.82, 0.94], [140, 0]);

  return (
    <section ref={sectionRef} id="home" className="homev2-hero relative z-10 h-[240svh] bg-[#F7F8FA]">
      <div className="sticky top-0 h-[100svh] overflow-hidden rounded-b-[2rem] bg-[#F7F8FA]">
        <div
          aria-hidden="true"
          className={`homev2-orbit-entrance pointer-events-none absolute inset-x-[-12%] bottom-[1px] z-[1] select-none overflow-hidden bg-gradient-to-b from-[#2E2E38] via-[#565662] to-[#B7B8C0] bg-clip-text text-center text-[clamp(16rem,50vw,24rem)] leading-none tracking-[0.02em] text-transparent origin-center scale-x-[1.55] scale-y-[1.7] md:scale-x-[1.16] md:text-[clamp(13rem,38vw,48rem)] ${anton.className}`}
        >
          ORBIT
        </div>

        <div
          className="pointer-events-none absolute left-1/2 top-[calc(30%_-_72px)] z-[8] -translate-x-1/2 -translate-y-1/2 md:hidden"
        >
          <motion.div className="homev2-heading-entrance" style={{ y: mobileIntroY, opacity: mobileIntroOpacity }}>
            <div className={`${poppins.className} inline-flex whitespace-nowrap rounded-lg bg-[#37D8C6] px-3 py-1 text-[4.62rem] font-bold leading-none tracking-[-0.04em] text-white`}>
              WE BUILD
            </div>
          </motion.div>
        </div>

        <motion.div
          className="pointer-events-none absolute z-[8] hidden w-[min(90vw,56rem)] origin-left text-left text-[#2E2E38] md:block"
          style={{ left: headingLeft, top: headingTop, x: headingX, y: headingY }}
        >
          <div className="homev2-heading-entrance">
            <div className={`${poppins.className} inline-flex whitespace-nowrap rounded-lg bg-[#37D8C6] px-3 py-1 text-[2.75rem] font-bold leading-none tracking-[-0.04em] text-white`}>
              WE BUILD
            </div>
          </div>
        </motion.div>

        <div
          className="pointer-events-none absolute left-1/2 top-1/2 z-[3] aspect-square w-[min(108vw,44rem)] translate-x-[calc(-50%_+_16px)] translate-y-[calc(-50%_+_100px)] md:left-[calc(80%_+_40px)] md:top-[calc(62%_+_20px)] md:w-[min(55vw,44rem)] md:translate-x-[-50%] md:translate-y-[-50%]"
        >
          <motion.div className="size-full" style={isMobile ? { y: mobileIntroY, opacity: mobileIntroOpacity } : undefined}>
          <div className="homev2-planet-entrance size-full scale-[0.73]">
            <HomeV2AnimatedPlanet animateOnEntry={false} />
          </div>
          <span aria-hidden="true" className="absolute left-[calc(43%_-_5px)] top-[calc(58%_+_25px)] z-20 -translate-x-1/2 whitespace-nowrap">
            <span className={`${poppins.className} homev2-caption-entrance inline-block text-[15px] font-semibold leading-none tracking-[0.015em] text-[#2E2E38] antialiased drop-shadow-[0_2px_10px_rgba(247,248,250,0.9)]`}>
              <span aria-hidden="true" className="mr-1 text-black">“</span>
              With you, <span className="relative inline-block">at ever<span aria-hidden="true" className="absolute left-0 top-full h-px w-full bg-[#37D8C6]" /></span><span>y</span>{" "}<span className="relative inline-block">turn.<span aria-hidden="true" className="absolute -left-1 top-full h-px w-[calc(100%+0.25rem)] bg-[#37D8C6]" /></span>
              <span aria-hidden="true" className="ml-1 text-black">”</span>
            </span>
          </span>
          </motion.div>
        </div>

        <div className="pointer-events-none absolute left-1/2 top-[calc(30%_+_15px)] z-[8] w-[90vw] -translate-x-1/2 -translate-y-1/2 text-center md:hidden">
          <motion.div className={`${poppins.className} flex flex-col items-center gap-0 text-[2.25rem] font-extrabold uppercase leading-[0.95] tracking-[-0.02em] text-[#2E2E38]`} style={{ y: mobileIntroY, opacity: mobileIntroOpacity }}>
            <span className="whitespace-nowrap">The Technology</span>
            <span className="whitespace-nowrap">and Journey</span>
          </motion.div>
        </div>

        <div className="pointer-events-none absolute z-[8] hidden -translate-y-1/2 md:block" style={{ left: headingLeft, top: "calc(38% + 72px)" }}>
          <div className={`${poppins.className} homev2-copy-entrance flex flex-col items-start gap-0 whitespace-nowrap text-left text-[76px] font-extrabold uppercase leading-[73px] tracking-[-0.02em] text-[#2E2E38]`}>
            <div className="flex items-baseline gap-3">
              <span>The</span>
              <AnimatedText
                text="Technology"
                className="items-start gap-0"
                textClassName={`${poppins.className} whitespace-nowrap !text-left !text-[76px] !font-extrabold uppercase leading-[73px] tracking-[-0.02em] text-[#2E2E38]`}
                underlineClassName="hidden"
                underlineWidth="100%"
                underlineOffset="0"
                underlinePath="M 0,10 L 300,10"
                underlineHoverPath="M 0,10 L 300,10"
              />
            </div>
            <div className="flex items-baseline gap-3">
              <span>and</span>
              <AnimatedText
                text="Journey"
                className="items-start gap-0"
                textClassName={`${poppins.className} whitespace-nowrap !text-left !text-[76px] !font-extrabold uppercase leading-[73px] tracking-[-0.02em] text-[#2E2E38]`}
                underlineClassName="hidden"
                underlineWidth="100%"
                underlineOffset="0"
              />
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute left-1/2 top-[calc(30%_+_15px)] z-[8] w-[90vw] -translate-x-1/2 -translate-y-1/2 text-center md:hidden">
          <motion.p
            className={`${poppins.className} text-[2rem] font-extrabold uppercase leading-[1.05] tracking-[-0.02em] text-[#2E2E38]`}
            style={{ y: mobileCustomerY, opacity: mobileCustomerOpacity }}
          >
            Your customers actually use.
          </motion.p>
        </div>

        <motion.p
          className={`${poppins.className} pointer-events-none absolute z-[8] hidden -translate-y-1/2 text-left text-[43px] font-extrabold uppercase leading-[3.1rem] tracking-[-0.02em] text-[#2E2E38] md:block`}
          style={{ left: headingLeft, top: "calc(58% - 22px)", y: customerY, marginTop: "70px" }}
        >
          Your customers actually use.
        </motion.p>

        <motion.p
          className={`${poppins.className} pointer-events-none absolute left-1/2 top-[calc(58%_-_80px)] z-[8] w-[82vw] -translate-x-1/2 text-center text-[15.5px] leading-[1.45] text-[#2E2E38] md:hidden`}
          style={{ y: mobileDescriptionY, opacity: mobileDescriptionOpacity }}
        >
          Altira Group <strong className="font-semibold text-[#2E2E38]">redesigns onboarding and sales processes</strong>{" "}
          and deploys <span className="font-semibold text-[#2E2E38]">plug-and-play distribution technology</span>{" "}
          for <em className="font-medium text-[#2E2E38]">insurance and lending products</em> so partners can <strong className="font-semibold text-[#2E2E38]">launch and scale faster</strong>, without building from scratch.
        </motion.p>

        <motion.p
          className={`${poppins.className} pointer-events-none absolute z-[8] hidden w-[min(82vw,44rem)] -translate-y-1/2 text-left text-[15.5px] leading-[1.45] text-[#2E2E38] md:block`}
          style={{ left: headingLeft, top: "calc(74% - 50px)", y: descriptionY, marginTop: "70px" }}
        >
          Altira Group <strong className="font-semibold text-[#2E2E38]">redesigns onboarding and sales processes</strong>{" "}
          and deploys
          <br />
          <span className="font-semibold text-[#2E2E38]">plug-and-play distribution technology</span>{" "}
          for <em className="font-medium text-[#2E2E38]">insurance and lending products</em>
          <br />
          so partners can <strong className="font-semibold text-[#2E2E38]">launch and scale faster</strong>, without building from scratch.
        </motion.p>

        <motion.div
          className="absolute left-1/2 top-[calc(58%_+_140px)] z-[8] flex -translate-x-1/2 gap-4 md:hidden"
          style={{ y: mobileCtaY, opacity: mobileCtaOpacity }}
        >
          <Link
            href="#method"
            className={`relative inline-flex items-stretch overflow-hidden rounded-[12px] border-[1.5px] border-[#37D8C6] !bg-[#E4E5EA] p-0 text-[16px] font-bold text-[#2E2E38] shadow-[0_10px_28px_rgba(17,22,61,0.14)] ${openSansThin.className}`}
          >
            <span className="relative flex items-center gap-1.5 whitespace-nowrap rounded-[10px] !bg-[#E4E5EA] px-[1.05em] py-[0.64em] pr-[0.95em] text-[0.8rem] font-light uppercase tracking-[0.08em] text-inherit">
              Explore Orbit <ArrowRight className="size-3.5 text-[#37D8C6]" />
            </span>
          </Link>
          <TalkButton />
        </motion.div>

        <motion.div
          className="absolute top-[calc(93%_-_35px)] z-[8] hidden gap-3 md:flex"
          style={{ left: headingLeft, opacity: ctaOpacity, y: ctaY }}
        >
          <Link
            href="#method"
            className={`relative inline-flex items-stretch overflow-hidden rounded-[12px] border-[1.5px] border-[#37D8C6] !bg-[#E4E5EA] p-0 opacity-100 text-[16px] font-bold text-[#2E2E38] shadow-[0_10px_28px_rgba(17,22,61,0.14)] transition-all duration-300 ease-out hover:!bg-[#E4E5EA] hover:shadow-[0_12px_30px_rgba(17,22,61,0.2)] active:scale-[0.97] ${openSansThin.className}`}
          >
            <span className="relative flex items-center gap-1.5 rounded-[10px] !bg-[#E4E5EA] px-[1.05em] py-[0.64em] pr-[0.95em] text-[0.8rem] font-light uppercase tracking-[0.12em] text-inherit transition-colors duration-300 sm:text-[0.88rem]">
              Explore Orbit <ArrowRight className="size-3.5 text-[#37D8C6]" />
            </span>
          </Link>
          <TalkButton />
        </motion.div>

        {!hasScrolled ? (
          <motion.div
            className="pointer-events-none absolute bottom-6 left-1/2 z-[8] flex -translate-x-1/2 flex-col items-center text-[#2E2E38]"
          >
            <span className="mb-2 text-[12px] font-light uppercase tracking-[0.24em]">Scroll Down</span>
            <span aria-hidden="true" className="flex flex-col items-center -space-y-2">
              {Array.from({ length: 5 }, (_, index) => (
                <motion.svg
                  key={index}
                  viewBox="0 0 24 14"
                  className="h-[14px] w-[22px] stroke-[#2E2E38]"
                  fill="none"
                  strokeWidth="1.5"
                  animate={{ opacity: [0.15, 1, 0.15], y: [-2, 2, -2] }}
                  transition={{ duration: 1.5, delay: index * 0.16, repeat: Infinity, ease: "easeInOut" }}
                >
                  <path d="m3 3 9 8 9-8" />
                </motion.svg>
              ))}
            </span>
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
