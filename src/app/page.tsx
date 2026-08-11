import { SiteHeader } from "@/components/site-header";
import { ContactCard } from "@/components/ui/contact-card";
import { ConnectHoverBanner } from "@/components/ui/connect-hover-banner";
import { ExperienceHeroText } from "@/components/ui/experience-hero";
import { FloatingConsultButton } from "@/components/ui/floating-consult-button";
import { HeroTimezones } from "@/components/ui/hero-timezones";
import HowItWorks from "@/components/ui/how-it-works";
import { Input } from "@/components/ui/input";
import IntegrationsSection from "@/components/ui/integrations-section";
import { Label } from "@/components/ui/label";
import { LabeledOrbitEarth } from "@/components/ui/labeled-orbit-earth";
import { RegionalPresenceMap } from "@/components/ui/regional-presence-map";
import RotatingEarth from "@/components/ui/wireframe-dotted-globe";
import { Footer } from "@/components/ui/footer-section";
import AboutSection3 from "@/components/ui/about-section";
import ProductDepthScroll from "@/components/ui/product-depth-scroll";
import { Mail, MapPinIcon, PhoneIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#1E2021] text-[var(--ink)]">
      <SiteHeader />

      <main>
        <section id="home" className="relative h-[100svh] overflow-hidden bg-black">
          <div className="pointer-events-none absolute inset-x-0 top-[calc(44%+20px-50px)] z-[8] mx-auto w-full max-w-[1720px] -translate-y-1/2 px-0 sm:px-2 lg:px-4">
            <div className="max-w-[32rem]">
              <ExperienceHeroText />

              <p className="landing-copy mt-12 max-w-[34rem] text-[calc(1.2rem+2px)] leading-[1.55] text-white/78">
                A Proprietary Technology Platform powered by
                <br />
                Altira&apos;s Orbit engine.
              </p>
            </div>
          </div>

          <div className="pointer-events-none absolute right-[calc(4rem-100px)] top-[calc(44%+20px-94px)] z-[5] -translate-y-1/2 px-0 sm:right-[calc(5rem-100px)] sm:px-2 lg:right-[calc(7rem-100px)] lg:px-4">
            <LabeledOrbitEarth
              size={720}
              className="w-[15rem] opacity-60 sm:w-[18rem] lg:w-[21rem]"
              earthClassName="overflow-hidden rounded-full [mask-image:radial-gradient(circle,black_58%,rgba(0,0,0,0.82)_72%,transparent_100%)]"
              labelClassName="scale-[1.08]"
              labelSpeed={16}
            />
          </div>

          <div className="flex h-full items-end justify-center overflow-hidden px-6 pb-0 pt-0 sm:px-8 lg:px-12">
            <div className="w-full max-w-[96rem] translate-x-[170px] translate-y-[calc(60%-25px)]">
              <div className="relative mx-auto aspect-square w-full max-w-[90rem] overflow-hidden rounded-full opacity-70">
                <RotatingEarth
                  width={1560}
                  height={1560}
                  square
                  autoRotateSpeed={0.06}
                  interactive
                  className="size-full"
                />
              </div>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 z-10 bg-black">
            <HeroTimezones />
          </div>
        </section>

        <section id="why" className="section-spacing w-full">
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
            <h2 className="text-4xl font-bold tracking-[-0.04em] text-white sm:text-5xl lg:text-[4rem]">
              A Five-Stage Methodology
            </h2>
            <p className="section-copy-gap mx-auto max-w-4xl text-lg leading-8 text-white/64">
              Every Altira Group product moves through the same disciplined sequence â€” from genuine
              customer insight to a continuously improving experience.
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
                description: "Plot the end-to-end journey.",
                colorTheme: "blue",
              },
              {
                title: "Design",
                description: "Design the experience and UI.",
                colorTheme: "purple",
              },
              {
                title: "Build",
                description: "Build the product and flows.",
                colorTheme: "orange",
              },
              {
                title: "Orchestrate",
                description: "Connect and optimise across channels.",
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
                <h2 className="landing-title max-w-[18ch] text-[2.75rem] text-white sm:max-w-[20ch] sm:text-[3.3rem] lg:max-w-none lg:text-[3.65rem] xl:text-[4rem]">
                  <span className="block">Three locations.</span>
                  <span className="block whitespace-nowrap">
                    One connected <span className="landing-accent">team.</span>
                  </span>
                </h2>

                <div className="section-title-gap h-0.5 w-24 bg-[#3FE9EC]" />

                <p className="landing-copy section-copy-gap max-w-[39rem] text-[1.24rem] leading-9 xl:text-[1.36rem] xl:leading-10">
                  Altira Group is headquartered in Cape Town, with a focused presence across markets
                  that shape distribution, operations and regional support for the business
                  we&apos;re building.
                </p>
              </div>

              <div className="min-w-0">
                <RegionalPresenceMap />
              </div>
            </div>
          </div>
        </section>

        <IntegrationsSection />

        <section id="contact" className="section-shell scroll-mt-44">
          <ContactCard
            title="Bring your opportunity to Altira Group."
            description="If you want to discuss distribution, underwriting, affinity partnerships or employer-channel opportunities, use the form and we will respond within one business day."
            contactInfo={[
              {
                icon: Mail,
                label: "Email",
                value: "info@altiragroup.co.za",
              },
              {
                icon: PhoneIcon,
                label: "Phone",
                value: "+27 21 000 0000",
              },
              {
                icon: MapPinIcon,
                label: "Address",
                value: "Constantia, Cape Town",
                className: "md:col-span-2 lg:col-span-1",
              },
            ]}
            className="rounded-[1.75rem]"
            formSectionClassName="bg-[#1f2123]"
          >
            <form className="w-full space-y-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="contact-name">Name</Label>
                <Input id="contact-name" type="text" placeholder="Your name" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="contact-email">Email</Label>
                <Input id="contact-email" type="email" placeholder="you@example.com" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="contact-phone">Phone</Label>
                <Input id="contact-phone" type="tel" placeholder="+27 ..." />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="contact-message">Message</Label>
                <Textarea id="contact-message" placeholder="Tell us what you want to discuss." />
              </div>
              <div className="rounded-[16px] bg-gradient-to-b from-gray-800/40 to-transparent p-[4px]">
                <button
                  className="group block w-full rounded-[12px] bg-gradient-to-b from-gray-700 to-gray-600 p-[4px] shadow-[0_2px_4px_rgba(0,0,0,0.7)] transition-all duration-200 hover:shadow-[0_4px_8px_rgba(0,0,0,0.6)] active:scale-[0.995] active:shadow-[0_0px_1px_rgba(0,0,0,0.8)]"
                  type="button"
                  suppressHydrationWarning
                >
                  <div className="rounded-[8px] bg-gradient-to-b from-gray-600 to-gray-700 px-6 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-sm font-semibold text-white">Submit enquiry</span>
                    </div>
                  </div>
                </button>
              </div>
            </form>
          </ContactCard>
        </section>

      </main>

      <ConnectHoverBanner />

      <Footer />

      <FloatingConsultButton
        imageSrc="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop"
        revolvingText="START A CONVERSATION - ALTIRA GROUP - "
        popupHeading="Book a call"
        popupDescription="Bring your distribution, underwriting or affinity opportunity to Altira Group and we will align on the best commercial next step."
        ctaButtonText="Start a conversation"
        ctaHref="#contact"
        hideWhileVisibleSelector="#home"
      />
    </div>
  );
}
