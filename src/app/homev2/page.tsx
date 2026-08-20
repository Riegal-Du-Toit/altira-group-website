import { MotionConfig } from "motion/react";
import { HomeV2Header } from "@/components/homev2-header";
import { anton } from "@/lib/fonts";
import { openSansThin } from "@/lib/google-fonts";
import { HomeV2AnimatedPlanet } from "@/components/homev2-animated-planet";
import { HomeV2Preloader } from "@/components/homev2-preloader";
import { HomeV2Footer } from "@/components/homev2-footer";
import { HomeV2Methodology } from "@/components/homev2-methodology";
import { HomeV2ScrollHero } from "@/components/homev2-scroll-hero";
import { LandingPage } from "../page";

export default function HomeV2() {
  return (
    <HomeV2Preloader>
      <MotionConfig reducedMotion="never">
        <LandingPage
        header={<HomeV2Header />}
        footer={<HomeV2Footer />}
        showTimezones={false}
        heroReplacement={<HomeV2ScrollHero />}
        showHeroContent={false}
        showHeroPoweredGlobe={false}
        methodologyContent={<HomeV2Methodology />}
        heroClassName="rounded-b-[2rem] [--homev2-orbit-y:calc(58%-110px)]"
        heroBackdropText="ORBIT"
        heroBackdropFontClassName={anton.className}
        heroBackdropClassName="homev2-orbit-entrance !top-[var(--homev2-orbit-y)] origin-center !scale-y-[0.942] !text-[clamp(9.945rem,30.03vw,38.025rem)]"
        heroPlanetSize={90}
        heroPlanetClassName="size-full"
        heroPlanetOpacityClassName="opacity-60"
        heroPlanetTranslateClassName="!absolute left-[24%] top-[calc(var(--homev2-orbit-y)+1.5625rem)] !w-[min(29.55vw,23.85rem)] max-w-none -translate-x-1/2 -translate-y-1/2"
        heroPlanetContainerClassName="absolute inset-0 z-[2] overflow-hidden"
        heroPlanetContent={<HomeV2AnimatedPlanet />}
        heroBottomLeftClassName="!left-[7.5rem] !right-[7.5rem] !max-w-none"
        heroBottomLeftCopy={
          <div className="homev2-copy-entrance translate-y-2 flex w-full items-start justify-between gap-10">
            <p className={`${openSansThin.className} relative -left-4 top-4 w-[19rem] shrink-0 text-[1.53rem] font-light uppercase tracking-[0.08em] text-white/82 sm:text-[1.59rem]`}>
              We build the technology and the journey your customers actually use.
            </p>
            <p className="relative -left-8 max-w-[23rem] pt-0.5 pr-0 text-right text-[0.834rem] leading-[1.6rem] text-white/34 sm:text-[0.894rem]">
              Altira Group redesigns onboarding and sales processes and deploys plug-and-play
              distribution technology for insurance and lending products — so partners can launch
              and scale faster, without building from scratch.
            </p>
          </div>
        }
        methodology={{
          heading: "Orbit — the engine behind our plug-and-play technology.",
          body: "Orbit is the technology platform we've built in-house to power onboarding, sales and member engagement for insurance and lending products. Rather than building bespoke software for every partner, Orbit gives us a proven, configurable foundation — so partners get speed without sacrificing a tailored experience.",
          steps: [
            {
              title: "Configure",
              description: "We map Orbit to your product, pricing and compliance requirements.",
              colorTheme: "orange",
            },
            {
              title: "Integrate",
              description: "We connect Orbit to your underwriting, payments and admin systems.",
              colorTheme: "blue",
            },
            {
              title: "Launch",
              description: "Your customers get a fast, modern onboarding and sales journey — live in weeks, not months.",
              colorTheme: "purple",
            },
          ],
        }}
        />
      </MotionConfig>
    </HomeV2Preloader>
  );
}
