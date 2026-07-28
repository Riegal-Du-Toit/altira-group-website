import LunarGravityCard from "@/components/ui/lunar-gravity-card";
import { GlobalPresence } from "@/components/global-presence";
import { SiteHeader } from "@/components/site-header";
import ContainerScroll from "@/components/ui/container-scrollaevihvyyyydhliigddrsxsfxagfu6d";
import { ContactCard } from "@/components/ui/contact-card";
import { FloatingConsultButton } from "@/components/ui/floating-consult-button";
import HowItWorks from "@/components/ui/how-it-works";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AboutSection3 from "@/components/ui/about-section";
import { Footer } from "@/components/ui/modem-animated-footer";
import { WorldMap } from "@/components/ui/map";
import Testimonial1 from "@/components/ui/testimonial-1";
import { Building2, Link, Mail, MapPinIcon, PhoneIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-block rounded-[16px] bg-gradient-to-b from-gray-800/40 to-transparent p-[4px]">
      <div className="rounded-[12px] bg-gradient-to-b from-gray-700 to-gray-600 p-[4px] shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
        <div className="rounded-[8px] bg-gradient-to-b from-gray-600 to-gray-700 px-4 py-2">
          <div className="flex items-center text-sm font-semibold uppercase tracking-[0.24em] text-white">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroPillButton({ href, label }: { href: string; label: string }) {
  return (
    <div className="rounded-[16px] bg-gradient-to-b from-gray-800/40 to-transparent p-[4px]">
      <a
        href={href}
        className="group block rounded-[12px] bg-gradient-to-b from-gray-700 to-gray-600 p-[4px] shadow-[0_2px_4px_rgba(0,0,0,0.7)] transition-all duration-200 hover:shadow-[0_4px_8px_rgba(0,0,0,0.6)] active:scale-[0.995] active:shadow-[0_0px_1px_rgba(0,0,0,0.8)]"
      >
        <div className="rounded-[8px] bg-gradient-to-b from-gray-600 to-gray-700 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-white">{label}</span>
          </div>
        </div>
      </a>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#1E2021] text-[var(--ink)]">
      <SiteHeader />

      <main>
        <section id="home" className="relative overflow-hidden bg-[#1E2021]">
          <div className="w-full">
            <LunarGravityCard
              className="rounded-none border-x-0 border-t-0 shadow-none"
              title={
                <>
                  <span className="text-[1.08em] text-zinc-50 drop-shadow-sm">
                    With you,
                  </span>
                  <br />
                  <span className="whitespace-nowrap text-[1.08em] text-[#3FE9EC] drop-shadow-md">
                    at every turn.
                  </span>
                </>
              }
              description="Altira Group connects medical insurance, funeral insurance and personal loans into one partner-led relationship model."
              actions={
                <>
                  <HeroPillButton href="#products" label="Explore products" />
                  <HeroPillButton href="#contact" label="Start a conversation" />
                </>
              }
            />
          </div>
        </section>

        <GlobalPresence />

        <section id="why" className="w-full pt-44 pb-44">
          <AboutSection3 />
        </section>

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
                  Altira operates at the intersection of health, protection and credit — the
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

        <section id="method" className="mx-auto max-w-6xl px-6 pt-2 pb-24 sm:px-8 lg:px-12">
          <div className="mb-14 flex flex-col items-center text-center">
            <div className="rounded-[16px] bg-gradient-to-b from-gray-800/40 to-transparent p-[4px]">
              <div className="rounded-[12px] bg-gradient-to-b from-gray-700 to-gray-600 p-[4px] shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
                <div className="rounded-[8px] bg-gradient-to-b from-gray-600 to-gray-700 px-4 py-2">
                  <div className="flex items-center text-sm font-semibold uppercase tracking-[0.24em] text-white">
                    How It Works
                  </div>
                </div>
              </div>
            </div>
            <h2 className="mt-6 text-4xl font-bold tracking-[-0.04em] text-white sm:text-5xl lg:text-[4rem]">
              A Five-Stage Methodology
            </h2>
            <p className="mx-auto mt-4 max-w-4xl text-lg leading-8 text-white/64">
              Every Altira product moves through the same disciplined sequence — from genuine
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

        <section id="offices" className="mt-[90px] w-full bg-[#1E2021] px-6 py-24 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <div className="mb-14 flex flex-col items-center text-center">
              <div className="rounded-[16px] bg-gradient-to-b from-gray-800/40 to-transparent p-[4px]">
                <div className="rounded-[12px] bg-gradient-to-b from-gray-700 to-gray-600 p-[4px] shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
                  <div className="rounded-[8px] bg-gradient-to-b from-gray-600 to-gray-700 px-4 py-2">
                    <div className="flex items-center text-sm font-semibold uppercase tracking-[0.24em] text-white">
                      Global presence
                    </div>
                  </div>
                </div>
              </div>
              <h2 className="mt-6 text-4xl font-bold tracking-[-0.04em] text-white sm:text-5xl lg:text-[4rem]">
                Five cities. One connected team.
              </h2>
              <p className="mx-auto mt-4 max-w-4xl text-lg leading-8 text-white/64">
                Altira is headquartered in Cape Town, with a presence across the markets that
                shape distribution, sourcing and capital for the business we&apos;re building.
              </p>
            </div>

            <WorldMap
              dots={[
                {
                  start: { lat: -33.92, lng: 18.42, label: "Cape Town" },
                  end: { lat: -26.2, lng: 28.04, label: "Johannesburg" },
                },
                {
                  start: { lat: -26.2, lng: 28.04, label: "Johannesburg" },
                  end: { lat: 51.51, lng: -0.13, label: "London" },
                },
                {
                  start: { lat: 51.51, lng: -0.13, label: "London" },
                  end: { lat: 40.71, lng: -74.01, label: "New York" },
                },
                {
                  start: { lat: 51.51, lng: -0.13, label: "London" },
                  end: { lat: 22.54, lng: 114.06, label: "Shenzhen" },
                },
              ]}
              lineColor="#0ea5e9"
              showLabels
            />
          </div>
        </section>

        <Testimonial1 />

        <section id="contact" className="section-shell scroll-mt-44 py-32">
          <ContactCard
            title="Bring your opportunity to Altira."
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

      <Footer
        brandName="Altira"
        brandDescription="Altira operates at the intersection of health, protection and credit — designing access to medical insurance, funeral insurance and personal loans through one partner-led relationship model."
        socialLinks={[
          {
            icon: <Building2 className="h-6 w-6" />,
            href: "https://linkedin.com",
            label: "LinkedIn",
          },
          {
            icon: <Link className="h-6 w-6" />,
            href: "https://github.com",
            label: "GitHub",
          },
          {
            icon: <Mail className="h-6 w-6" />,
            href: "mailto:info@altiragroup.co.za",
            label: "Email",
          },
        ]}
        navLinks={[
          { label: "Home", href: "#home" },
          { label: "Products", href: "#products" },
          { label: "Method", href: "#method" },
          { label: "Cities", href: "#offices" },
          { label: "Why Altira", href: "#why" },
          { label: "Contact", href: "#contact" },
        ]}
        creatorName="Wabi-sabi"
        creatorUrl="#"
        className="bg-[#1E2021]"
      />
      <FloatingConsultButton
        imageSrc="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop"
        revolvingText="START A CONVERSATION - ALTIRA GROUP - "
        popupHeading="Book a call"
        popupDescription="Bring your distribution, underwriting or affinity opportunity to Altira and we will align on the best commercial next step."
        ctaButtonText="Start a conversation"
        ctaHref="#contact"
      />
    </div>
  );
}
