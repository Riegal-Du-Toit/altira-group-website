"use client";

import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

import { HomeV2AnimatedPlanet } from "@/components/homev2-animated-planet";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";
import { anton } from "@/lib/fonts";
import { openSansThin } from "@/lib/google-fonts";

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

  const customerTop = useTransform(smoothScrollYProgress, [0.52, 0.75], ["115%", "50%"]);

  const descriptionTop = useTransform(smoothScrollYProgress, [0.55, 0.94], ["115%", "61%"]);
  const ctaOpacity = useTransform(smoothScrollYProgress, [0.9, 1], [0, 1]);
  const ctaY = useTransform(smoothScrollYProgress, [0.9, 1], [16, 0]);

  return (
    <section ref={sectionRef} id="home" className="relative z-10 h-[240svh] bg-black">
      <div className="sticky top-0 h-[100svh] overflow-hidden rounded-b-[2rem] bg-black">
        <div
          aria-hidden="true"
          className={`homev2-orbit-entrance pointer-events-none absolute inset-x-0 -bottom-16 z-[1] select-none overflow-hidden bg-gradient-to-b from-[#444] via-[#252525] to-transparent bg-clip-text text-center text-[clamp(13rem,38vw,48rem)] leading-none tracking-[0.02em] text-transparent [-webkit-mask-image:linear-gradient(to_bottom,#000_0%,#000_14%,rgba(0,0,0,0.75)_72%,transparent_95%)] [mask-image:linear-gradient(to_bottom,#000_0%,#000_14%,rgba(0,0,0,0.75)_72%,transparent_95%)] origin-center scale-y-[0.942] ${anton.className}`}
        >
          ORBIT
        </div>

        <motion.div
          className="pointer-events-none absolute z-[8] w-[min(90vw,56rem)] origin-left text-left text-white"
          style={{ left: headingLeft, top: headingTop, x: headingX, y: headingY }}
        >
          <div className="homev2-heading-entrance">
            <p className={`${anton.className} text-[2.75rem] uppercase tracking-[0.02em] text-transparent [-webkit-text-stroke:0.75px_rgba(255,255,255,0.82)] sm:text-[3rem]`}>
              We build:
            </p>
          </div>
        </motion.div>

        <div
          className="pointer-events-none absolute left-[80%] top-1/2 z-[3] aspect-square w-[min(45vw,36rem)] -translate-x-1/2 -translate-y-1/2"
        >
          <div className="homev2-planet-entrance size-full scale-[0.74]">
            <HomeV2AnimatedPlanet animateOnEntry={false} />
          </div>
        </div>

        <div className="pointer-events-none absolute z-[8] -translate-y-1/2" style={{ left: headingLeft, top: "39%" }}>
          <div className={`${openSansThin.className} homev2-copy-entrance flex items-baseline gap-3 whitespace-nowrap text-left text-[2rem] font-light uppercase tracking-[0.08em] text-white sm:text-[2.1875rem]`}>
            <span>The</span>
            <AnimatedText
              text="Technology"
              className="items-start gap-0"
              textClassName={`${openSansThin.className} whitespace-nowrap !text-left !text-[2rem] !font-light uppercase tracking-[0.08em] text-white sm:!text-[2.1875rem]`}
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
              textClassName={`${openSansThin.className} whitespace-nowrap !text-left !text-[2rem] !font-light uppercase tracking-[0.08em] text-white sm:!text-[2.1875rem]`}
              underlineClassName="hidden"
              underlineWidth="100%"
              underlineOffset="0"
            />
          </div>
        </div>

        <motion.p
          className={`${openSansThin.className} pointer-events-none absolute z-[8] -translate-y-1/2 text-left text-[2rem] font-light uppercase tracking-[0.08em] text-white sm:text-[2.1875rem]`}
          style={{ left: headingLeft, top: customerTop }}
        >
          Your customers actually use.
        </motion.p>

        <motion.p
          className="pointer-events-none absolute z-[8] w-[min(82vw,34rem)] -translate-y-1/2 text-left text-[0.95rem] leading-7 text-white/72"
          style={{ left: headingLeft, top: descriptionTop }}
        >
          Altira Group <strong className="font-semibold text-white/92">redesigns onboarding and sales processes</strong>{" "}
          and deploys
          <br />
          <span className="font-medium text-[#86f5f7] underline decoration-[#3fe9ec]/80 decoration-1 underline-offset-4">plug-and-play distribution technology</span>{" "}
          for <em className="font-medium text-white/90">insurance and lending products</em> —
          <br />
          so partners can <strong className="font-semibold text-white/92">launch and scale faster</strong>, without building from scratch.
        </motion.p>

        <motion.div
          className="absolute top-[calc(75%_-_20px)] z-[8] flex gap-3"
          style={{ left: headingLeft, opacity: ctaOpacity, y: ctaY }}
        >
          <Link
            href="/orbit"
            className="relative inline-flex items-stretch overflow-hidden rounded-[12px] bg-[linear-gradient(180deg,rgb(56,56,56)_0%,rgb(36,36,36)_66%,rgb(41,41,41)_100%)] p-px text-[#dadada] transition-all duration-300 hover:shadow-[0_0_12px_rgba(255,255,255,0.08)] active:scale-[0.97]"
          >
            <span className="relative flex items-center gap-2 rounded-[10px] bg-[radial-gradient(at_95%_89%,rgb(15,15,15)_0px,transparent_50%),radial-gradient(at_0%_100%,rgb(17,17,17)_0px,transparent_50%),radial-gradient(at_0%_0%,rgb(29,29,29)_0px,transparent_50%)] px-4 py-2.5 text-xs font-light uppercase tracking-[0.12em] text-inherit transition-colors hover:bg-[rgb(26,25,25)]">
              Explore Orbit <ArrowRight className="size-3.5" />
            </span>
          </Link>
          <Link
            href="/contact"
            className="relative inline-flex items-stretch overflow-hidden rounded-[12px] bg-[linear-gradient(180deg,rgb(56,56,56)_0%,rgb(36,36,36)_66%,rgb(41,41,41)_100%)] p-px text-[#dadada] transition-all duration-300 hover:shadow-[0_0_12px_rgba(255,255,255,0.08)] active:scale-[0.97]"
          >
            <span className="relative flex items-center gap-2 rounded-[10px] bg-[radial-gradient(at_95%_89%,rgb(15,15,15)_0px,transparent_50%),radial-gradient(at_0%_100%,rgb(17,17,17)_0px,transparent_50%),radial-gradient(at_0%_0%,rgb(29,29,29)_0px,transparent_50%)] px-4 py-2.5 text-xs font-light uppercase tracking-[0.12em] text-inherit transition-colors hover:bg-[rgb(26,25,25)]">
              Talk to us <ArrowRight className="size-3.5" />
            </span>
          </Link>
        </motion.div>

        {!hasScrolled ? (
          <motion.div
            className="pointer-events-none absolute bottom-6 left-1/2 z-[8] flex -translate-x-1/2 flex-col items-center gap-2 text-white/60"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-[0.62rem] font-light uppercase tracking-[0.24em]">Scroll Down</span>
            <span aria-hidden="true" className="relative block h-9 w-px overflow-hidden bg-white/20">
              <motion.i
                className="absolute inset-x-0 top-0 block h-4 bg-gradient-to-b from-[#3fe9ec] to-[#b16cff]"
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
