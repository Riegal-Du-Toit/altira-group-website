"use client";

import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

import { HomeV2AnimatedPlanet } from "@/components/homev2-animated-planet";
import { TalkButton } from "@/components/homev2-header";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";
import { TextRotate } from "@/components/ui/text-rotate";
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
  const headingTop = "calc(34% - 52px)";
  const headingX = "0%";
  const headingY = "-50%";

  const customerY = useTransform(smoothScrollYProgress, [0.52, 0.75], [280, 0]);
  const descriptionY = useTransform(smoothScrollYProgress, [0.55, 0.94], [280, 0]);
  const ctaOpacity = useTransform(smoothScrollYProgress, [0.82, 0.94], [0, 1]);
  const ctaY = useTransform(smoothScrollYProgress, [0.82, 0.94], [140, 0]);

  return (
    <section ref={sectionRef} id="home" className="homev2-hero relative z-10 h-[240svh] bg-[#F7F8FA]">
      <div className="sticky top-0 h-[100svh] overflow-hidden rounded-b-[2rem] bg-[#F7F8FA]">
        <div
          aria-hidden="true"
          className={`homev2-orbit-entrance pointer-events-none absolute inset-x-[-12%] bottom-[1px] z-[1] select-none overflow-hidden bg-gradient-to-b from-[#2E2E38] via-[#565662] to-[#B7B8C0] bg-clip-text text-center text-[clamp(13rem,38vw,48rem)] leading-none tracking-[0.02em] text-transparent origin-center scale-x-[1.16] scale-y-[1.7] ${anton.className}`}
        >
          ORBIT
        </div>

        <motion.div
          className="pointer-events-none absolute z-[8] w-[min(90vw,56rem)] origin-left text-left text-[#2E2E38]"
          style={{ left: headingLeft, top: headingTop, x: headingX, y: headingY }}
        >
          <div className="homev2-heading-entrance">
            <div className={`${poppins.className} inline-flex rounded-lg bg-[#37D8C6] px-3 py-1 text-[2.75rem] font-bold leading-none tracking-[-0.04em] text-white`}>
              WE BUILD
            </div>
          </div>
        </motion.div>

        <div
          className="pointer-events-none absolute left-[calc(80%_+_40px)] top-[calc(62%_+_20px)] z-[3] aspect-square w-[min(55vw,44rem)] -translate-x-1/2 -translate-y-1/2"
        >
          <div className="homev2-planet-entrance size-full scale-[0.73]">
            <HomeV2AnimatedPlanet animateOnEntry={false} />
          </div>
          <span aria-hidden="true" className="absolute left-[calc(43%_-_5px)] top-[calc(58%_+_25px)] z-20 flex -translate-x-1/2 items-center whitespace-nowrap text-[14px] font-light text-[#2E2E38]">
            <span className="text-[16px] font-bold text-black">ADD INFO HERE&nbsp;</span>
            <TextRotate
              texts={["DEMO*", "TEXT*", "HERE*"]}
              mainClassName="w-fit overflow-hidden rounded-md bg-[#37D8C6] px-2 py-1 text-[#5B5CEB]"
              staggerFrom="last"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden"
              rotationInterval={2000}
            />
          </span>
        </div>

        <div className="pointer-events-none absolute z-[8] -translate-y-1/2" style={{ left: headingLeft, top: "calc(38% + 72px)" }}>
          <div className={`${poppins.className} homev2-copy-entrance flex flex-col items-start gap-0 whitespace-nowrap text-left text-[76px] font-extrabold uppercase leading-[4.9rem] tracking-[-0.02em] text-[#2E2E38]`}>
            <div className="flex items-baseline gap-3">
              <span>The</span>
              <AnimatedText
                text="Technology"
                className="items-start gap-0"
                textClassName={`${poppins.className} whitespace-nowrap !text-left !text-[76px] !font-extrabold uppercase leading-[4.9rem] tracking-[-0.02em] text-[#2E2E38]`}
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
                textClassName={`${poppins.className} whitespace-nowrap !text-left !text-[76px] !font-extrabold uppercase leading-[4.9rem] tracking-[-0.02em] text-[#2E2E38]`}
                underlineClassName="hidden"
                underlineWidth="100%"
                underlineOffset="0"
              />
            </div>
          </div>
        </div>

        <motion.p
          className={`${poppins.className} pointer-events-none absolute z-[8] -translate-y-1/2 text-left text-[43px] font-extrabold uppercase leading-[3.1rem] tracking-[-0.02em] text-[#2E2E38]`}
          style={{ left: headingLeft, top: "calc(58% - 22px)", y: customerY, marginTop: "70px" }}
        >
          Your customers actually use.
        </motion.p>

        <motion.p
          className={`${poppins.className} pointer-events-none absolute z-[8] w-[min(82vw,44rem)] -translate-y-1/2 text-left text-[15.5px] leading-[1.45] text-[#2E2E38]`}
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
          className="absolute top-[calc(93%_-_35px)] z-[8] flex gap-3"
          style={{ left: headingLeft, opacity: ctaOpacity, y: ctaY }}
        >
          <Link
            href="/orbit"
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
