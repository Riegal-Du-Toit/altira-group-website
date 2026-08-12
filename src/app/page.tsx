import dynamic from "next/dynamic";

import { SiteHeader } from "@/components/site-header";
import { ExperienceHeroText } from "@/components/ui/experience-hero";
import { Footer } from "@/components/ui/footer-section";
import { FloatingConsultButton } from "@/components/ui/floating-consult-button";
import { HeroTimezones } from "@/components/ui/hero-timezones";
import { LabeledOrbitEarth } from "@/components/ui/labeled-orbit-earth";
import { OrbitEarth } from "@/components/ui/orbit-earth";

const AboutSection3 = dynamic(() => import("@/components/ui/about-section"), {
  loading: () => <div className="min-h-[56rem] w-full bg-[#1e2021]" />,
});
const ProductDepthScroll = dynamic(() => import("@/components/ui/product-depth-scroll"), {
  loading: () => <div className="h-[180vh] w-full bg-[#1e2021]" />,
});
const HowItWorks = dynamic(() => import("@/components/ui/how-it-works"), {
  loading: () => <div className="min-h-[42rem] w-full rounded-[1.5rem] bg-[#1f2123]" />,
});
const RegionalPresenceMap = dynamic(
  () => import("@/components/ui/regional-presence-map").then((mod) => mod.RegionalPresenceMap),
  {
    loading: () => <div className="aspect-[174/100] w-full rounded-[1.5rem] bg-[#202224]" />,
  },
);
const IntegrationsSection = dynamic(() => import("@/components/ui/integrations-section"), {
  loading: () => <div className="min-h-screen w-full bg-[#1e2021]" />,
});
export default function Home() {
  return (
    <div className="min-h-screen bg-[#1E2021] text-[var(--ink)]">
      <SiteHeader />

      <main>
        <section id="home" className="relative z-10 h-[100svh] overflow-hidden bg-black">
          <div className="absolute inset-x-0 top-[calc(44%+20px-50px+65px)] z-[8] mx-auto w-full max-w-[1720px] -translate-y-1/2 px-0 sm:px-2 lg:px-4">
            <div className="max-w-[46rem] px-6 sm:px-8 lg:px-10">
              <ExperienceHeroText />
            </div>
          </div>

          <div
            data-hero-powered-globe
            className="pointer-events-none absolute right-[calc(4rem-100px)] top-[calc(44%+20px-94px+56px)] z-[5] -translate-y-1/2 px-0 sm:right-[calc(5rem-100px)] sm:px-2 lg:right-[calc(7rem-100px)] lg:px-4"
          >
            <LabeledOrbitEarth
              size={720}
              className="w-[11.25rem] opacity-60 sm:w-[13.5rem] lg:w-[15.75rem]"
              earthClassName="overflow-hidden rounded-full [mask-image:radial-gradient(circle,black_58%,rgba(0,0,0,0.82)_72%,transparent_100%)]"
              labelClassName="scale-[1.08]"
              labelSpeed={16}
            />
          </div>

          <div className="flex h-full items-end justify-center overflow-hidden px-6 pb-0 pt-0 sm:px-8 lg:px-12">
            <div className="w-full max-w-[104rem] translate-y-[calc(62%-12px)]">
              <div className="relative mx-auto aspect-square w-full max-w-[98rem] overflow-hidden rounded-full">
                <OrbitEarth
                  size={1320}
                  delayMs={500}
                  autoRotateSpeed={0.2}
                  interactive
                  dragSensitivityX={0.035}
                  dragSensitivityY={0.024}
                  initialRotation={[-72, 6, 0]}
                  jumpingArcCount={0}
                  dotSpacing={22}
                  maxDevicePixelRatio={1}
                  className="size-full opacity-50"
                  earthWrapClassName="inset-[6%]"
                  earthClassName="overflow-hidden rounded-full brightness-[1.18] contrast-[1.12] [mask-image:radial-gradient(circle,black_62%,rgba(0,0,0,0.9)_78%,transparent_100%)]"
                />
                <div className="pointer-events-none absolute inset-x-[14%] bottom-[calc(8%+160px)] h-[22%] bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1),transparent_72%)] blur-2xl" />
              </div>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 z-10 bg-black">
            <HeroTimezones />
          </div>
        </section>

        <section id="why" className="relative z-0 w-full">
          <AboutSection3 />
        </section>

        <ProductDepthScroll />

        {/* Previous product scroll layout retained temporarily for reference.
        <section id="products">
          <ContainerScroll
            titleComponent={
              <div className="px-4 text-center text-white">
                <div className="text-lg font-medium tracking-[-0.02em] text-white/82 sm:text-xl lg:text-2xl">
                  Three needs that define household resilience.
                </div>
                <h2 className="mt-3 text-4xl font-bold tracking-[-0.05em] text-white sm:text-5xl lg:text-[5.25rem]">
                  Medical Insurance
                </h2>
                <p className="mx-auto mt-6 max-w-4xl text-sm font-medium leading-7 text-white/84 sm:text-base lg:text-lg">
                  Altira Group operates at the intersection of health, protection and credit â€” the
                  essential needs that, taken together, determine whether a household can absorb a
                  shock or is undone by it.
                </p>
                <p className="mx-auto mt-5 max-w-4xl text-sm font-medium leading-7 text-white/76 sm:text-base lg:text-lg">
                  Quality primary care within reach, closing the gap between formal medical aid and
                  complete uninsurance.
                </p>
              </div>
            }
          >
            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1400&h=720&auto=format&fit=crop"
              alt="Code on a screen overlayed with creative particles"
              className="mx-auto h-full rounded-2xl object-cover object-left-top"
              draggable={false}
            />
          </ContainerScroll>
        </section>

        <ContainerScroll
          titleComponent={
            <div className="px-4 text-center text-white">
              <h2 className="text-4xl font-bold tracking-[-0.05em] text-white sm:text-5xl lg:text-[5.25rem]">
                Funeral Insurance
              </h2>
              <p className="mx-auto mt-6 max-w-4xl text-sm font-medium leading-7 text-white/78 sm:text-base lg:text-lg">
                Dignified, rapid cover so the burden of a farewell never falls entirely on a
                grieving family.
              </p>
            </div>
          }
        >
          <img
            src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1400&h=720&auto=format&fit=crop"
            alt="Developer coding on a laptop in a modern workspace"
            className="mx-auto h-full rounded-2xl object-cover object-left-top"
            draggable={false}
          />
        </ContainerScroll>

        <ContainerScroll
          titleComponent={
            <div className="px-4 text-center text-white">
              <h2 className="text-4xl font-bold tracking-[-0.05em] text-white sm:text-5xl lg:text-[5rem]">
                Personal Loans
              </h2>
              <p className="mx-auto mt-6 max-w-4xl text-sm font-medium leading-7 text-white/78 sm:text-base lg:text-lg">
                Responsible, transparent short-term credit that bridges real cash-flow gaps
                without straining them further.
              </p>
            </div>
          }
        >
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1400&h=720&auto=format&fit=crop"
            alt="Team meeting around a table brainstorming ideas"
            className="mx-auto h-full rounded-2xl object-cover object-left-top"
            draggable={false}
          />
        </ContainerScroll>
        */}

        <section id="method" className="section-shell">
          <div className="section-header flex flex-col items-center text-center">
            <h2 className="bright-section-heading text-4xl font-extrabold tracking-[-0.04em] sm:text-5xl lg:text-[4rem]">
              A <span className="heading-accent">Five-Stage</span> Methodology
            </h2>
            <p className="section-copy-gap mx-auto max-w-4xl text-lg leading-8 text-white/64">
              Every Altira Group product moves through the same disciplined sequence - from
              genuine customer insight to partner selection, premium delivery and continuous
              improvement.
            </p>
          </div>

          <HowItWorks
            features={[
              {
                title: "Discover",
                description: "Understand customer needs and context.",
                colorTheme: "orange",
              },
              {
                title: "Map",
                description: "Plot the journey and partner requirements.",
                colorTheme: "blue",
              },
              {
                title: "Design",
                description: "Design the product, experience and partner fit.",
                colorTheme: "purple",
              },
              {
                title: "Build",
                description: "Build with proven platforms and specialists.",
                colorTheme: "orange",
              },
              {
                title: "Orchestrate",
                description: "Coordinate partners, platforms and channels.",
                colorTheme: "blue",
              },
            ]}
          />
        </section>

        <section
          id="offices"
          className="section-spacing flex min-h-screen w-full items-center bg-[#1e2021] px-4 text-white sm:px-6 lg:px-8"
        >
          <div className="mx-auto w-full max-w-[1720px]">
            <div className="grid items-center gap-12 lg:grid-cols-[minmax(400px,0.62fr)_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[minmax(600px,0.82fr)_minmax(0,1fr)] xl:gap-12">
              <div className="max-w-[46rem]">
                <h2 className="bright-section-heading landing-title max-w-[18ch] text-[2.75rem] sm:max-w-[20ch] sm:text-[3.3rem] lg:max-w-none lg:text-[3.65rem] xl:text-[4rem]">
                  <span className="block">Three locations.</span>
                  <span className="block whitespace-nowrap">
                    One <span className="heading-accent">connected team.</span>
                  </span>
                </h2>

                <div className="section-title-gap h-0.5 w-24 bg-[#3FE9EC]" />

                <p className="landing-copy section-copy-gap max-w-[39rem] text-[1.24rem] leading-9 xl:text-[1.36rem] xl:leading-10">
                  Altira Group is headquartered in Cape Town, with a focused presence across markets
                  that give the business access to trusted partners, specialist capability and
                  regional support for premium platform delivery.
                </p>
              </div>

              <div className="min-w-0">
                <RegionalPresenceMap />
              </div>
            </div>
          </div>
        </section>

        <IntegrationsSection />
      </main>
      <FloatingConsultButton
        ctaHref="#offices"
        popupHeading="Start a conversation"
        popupDescription="Speak with Altira Group about distribution, underwriting or premium platform partnerships and we will determine the right next step together."
        ctaButtonText="Let's collaborate"
        hideWhileVisibleSelector="[data-hero-powered-globe], [data-site-footer]"
        hideWhileVisibleThreshold={0.01}
      />
      <Footer
        leftSlot={
          <FloatingConsultButton
            inline
            buttonSize={130}
            imageSize={82}
            ctaHref="#offices"
            popupHeading="Start a conversation"
            popupDescription="Speak with Altira Group about distribution, underwriting or premium platform partnerships and we will determine the right next step together."
            ctaButtonText="Let's collaborate"
            showOnlyWhenVisibleSelector="[data-site-footer]"
            showOnlyWhenVisibleThreshold={0.92}
            revolvingText="START A CONVERSATION - ALTIRA GROUP - "
            revolvingSpeed={10}
          />
        }
      />
    </div>
  );
}
