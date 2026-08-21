"use client";

import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

import { HomeV2AnimatedPlanet } from "@/components/homev2-animated-planet";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";
import { anton } from "@/lib/fonts";
import { openSansThin, poppins } from "@/lib/google-fonts";

export function HomeV2ScrollHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hasScrolled, setHasScrolled] = useState(false);
  const { scrollY, scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 3) setHasScrolled(true);
  });
  const smoothScrollYProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.45 });

  const headingLeft = "max(7.75rem, calc((100vw - 96rem) / 2 + 7.75rem))";
  const headingTop = "calc(34% - 20px)";
  const headingX = "0%";
  const headingY = "-50%";

  const customerTop = useTransform(smoothScrollYProgress, [0.52, 0.75], ["115%", "45%"]);

  const descriptionTop = useTransform(smoothScrollYProgress, [0.55, 0.94], ["115%", "58%"]);
  const ctaOpacity = useTransform(smoothScrollYProgress, [0.82, 0.94], [0, 1]);
  const ctaY = useTransform(smoothScrollYProgress, [0.82, 0.94], [16, 0]);

  return (
    <section ref={sectionRef} id="home" className="homev2-hero relative z-10 h-[240svh] bg-[#F7F8FA]">
      <div className="sticky top-0 h-[100svh] overflow-hidden rounded-b-[2rem] bg-[#F7F8FA]">
        <div
          aria-hidden="true"
          className={`homev2-orbit-entrance pointer-events-none absolute inset-x-0 -bottom-16 z-[1] select-none overflow-hidden bg-[#2E2E38] bg-clip-text text-center text-[clamp(13rem,38vw,48rem)] leading-none tracking-[0.02em] text-transparent origin-center scale-y-[0.942] ${anton.className}`}
        >
          ORBIT
        </div>

        <motion.div
          className="pointer-events-none absolute z-[8] w-[min(90vw,56rem)] origin-left text-left text-[#2E2E38]"
          style={{ left: headingLeft, top: headingTop, x: headingX, y: headingY }}
        >
          <div className="homev2-heading-entrance">
            <p className={`${poppins.className} text-[2.5rem] font-bold uppercase leading-[3rem] tracking-[0.02em] text-transparent [-webkit-text-stroke:0.75px_#2E2E38]`}>
              We build:
            </p>
          </div>
        </motion.div>

        <div
          className="pointer-events-none absolute left-[80%] top-[62%] z-[3] aspect-square w-[min(55vw,44rem)] -translate-x-1/2 -translate-y-1/2"
        >
          <div className="homev2-planet-entrance size-full scale-[0.74]">
            <HomeV2AnimatedPlanet animateOnEntry={false} />
          </div>
        </div>

        <div className="pointer-events-none absolute z-[8] -translate-y-1/2" style={{ left: headingLeft, top: "38%" }}>
          <div className={`${poppins.className} homev2-copy-entrance flex items-baseline gap-3 whitespace-nowrap text-left text-[1.75rem] font-semibold uppercase leading-[2.25rem] tracking-[0.04em] text-[#2E2E38]`}>
            <span>The</span>
            <AnimatedText
              text="Technology"
              className="items-start gap-0"
              textClassName={`${poppins.className} whitespace-nowrap !text-left !text-[1.75rem] !font-semibold uppercase leading-[2.25rem] tracking-[0.04em] text-[#2E2E38]`}
              underlineClassName="hidden"
              underlineWidth="100%"
              underlineOffset="0"
              underlinePath="M 0,10 L 300,10"
              underlineHoverPath="M 0,10 L 300,10"
            />
            <span>and</span>
            <AnimatedText
              text="Journey"
              className="items-start gap-0"
              textClassName={`${poppins.className} whitespace-nowrap !text-left !text-[1.75rem] !font-semibold uppercase leading-[2.25rem] tracking-[0.04em] text-[#2E2E38]`}
              underlineClassName="hidden"
              underlineWidth="100%"
              underlineOffset="0"
            />
          </div>
        </div>

        <motion.p
          className={`${poppins.className} pointer-events-none absolute z-[8] -translate-y-1/2 text-left text-[1.75rem] font-semibold uppercase leading-[2.25rem] tracking-[0.04em] text-[#2E2E38]`}
          style={{ left: headingLeft, top: customerTop }}
        >
          Your customers actually use.
        </motion.p>

        <motion.p
          className={`${poppins.className} pointer-events-none absolute z-[8] w-[min(82vw,34rem)] -translate-y-1/2 text-left text-[14.5px] leading-[1.45] text-[#2E2E38]`}
          style={{ left: headingLeft, top: descriptionTop }}
        >
          Altira Group <strong className="font-semibold text-[#2E2E38]">redesigns onboarding and sales processes</strong>{" "}
          and deploys
          <br />
          <span className="font-medium text-[#2E2E38] underline decoration-[#2E2E38]/80 decoration-1 underline-offset-4">plug-and-play distribution technology</span>{" "}
          for <em className="font-medium text-[#2E2E38]">insurance and lending products</em> —
          <br />
          so partners can <strong className="font-semibold text-[#2E2E38]">launch and scale faster</strong>, without building from scratch.
        </motion.p>

        <motion.div
          className="absolute top-[calc(75%_-_20px)] z-[8] flex gap-3"
          style={{ left: headingLeft, opacity: ctaOpacity, y: ctaY }}
        >
          <Link
            href="/orbit"
            className={`relative inline-flex items-stretch overflow-hidden rounded-[12px] border-0 bg-[linear-gradient(180deg,rgb(56,56,56)_0%,rgb(36,36,36)_66%,rgb(41,41,41)_100%)] p-[1px] text-[16px] font-bold text-[#F7F8FA] transition-all duration-300 ease-out hover:shadow-[0_0_12px_rgba(255,255,255,0.08)] active:scale-[0.97] active:brightness-110 ${openSansThin.className}`}
          >
            <span className="relative flex items-center gap-1.5 rounded-[10px] bg-[radial-gradient(at_95%_89%,rgb(15,15,15)_0px,transparent_50%),radial-gradient(at_0%_100%,rgb(17,17,17)_0px,transparent_50%),radial-gradient(at_0%_0%,rgb(29,29,29)_0px,transparent_50%)] px-[1.05em] py-[0.64em] pr-[0.95em] text-[0.8rem] font-light uppercase tracking-[0.12em] text-inherit shadow-[0_0_20px_#4b4b4b] transition-colors duration-300 hover:bg-[rgb(26,25,25)] sm:text-[0.88rem]">
              Explore Orbit <ArrowRight className="size-3.5" />
            </span>
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[repeating-conic-gradient(rgb(48,47,47)_0.0000001%,rgb(51,51,51)_0.000104%)_60%_60%/600%_600%] opacity-10 contrast-105" />
          </Link>
          <Link
            href="/contact"
            className={`relative inline-flex items-stretch overflow-hidden rounded-[12px] border-0 bg-[linear-gradient(180deg,rgb(56,56,56)_0%,rgb(36,36,36)_66%,rgb(41,41,41)_100%)] p-[1px] text-[16px] font-bold text-[#F7F8FA] transition-all duration-300 ease-out hover:shadow-[0_0_12px_rgba(255,255,255,0.08)] active:scale-[0.97] active:brightness-110 ${openSansThin.className}`}
          >
            <span className="relative flex items-center gap-1.5 rounded-[10px] bg-[radial-gradient(at_95%_89%,rgb(15,15,15)_0px,transparent_50%),radial-gradient(at_0%_100%,rgb(17,17,17)_0px,transparent_50%),radial-gradient(at_0%_0%,rgb(29,29,29)_0px,transparent_50%)] px-[1.05em] py-[0.64em] pr-[0.95em] text-[0.8rem] font-light uppercase tracking-[0.12em] text-inherit shadow-[0_0_20px_#4b4b4b] transition-colors duration-300 hover:bg-[rgb(26,25,25)] sm:text-[0.88rem]">
              Talk to us <ArrowRight className="size-3.5" />
            </span>
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[repeating-conic-gradient(rgb(48,47,47)_0.0000001%,rgb(51,51,51)_0.000104%)_60%_60%/600%_600%] opacity-10 contrast-105" />
          </Link>
        </motion.div>

        {!hasScrolled ? (
          <motion.div
            className="pointer-events-none absolute bottom-6 left-1/2 z-[8] flex -translate-x-1/2 flex-col items-center gap-2 text-[#2E2E38]/60"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-[0.62rem] font-light uppercase tracking-[0.24em]">Scroll Down</span>
            <span aria-hidden="true" className="relative block h-9 w-px overflow-hidden bg-[#2E2E38]/20">
              <motion.i
                className="absolute inset-x-0 top-0 block h-4 bg-gradient-to-b from-[#37D8C6] to-[#5B5CEB]"
                animate={{ y: ["-100%", "240%"] }}
                transition={{ duration: 1.35, repeat: Infinity, ease: "easeIn" }}
              />
            </span>
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
