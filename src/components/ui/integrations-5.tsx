"use client";

import Image from "next/image";
import { motion } from "motion/react";

import { LabeledOrbitEarth } from "@/components/ui/labeled-orbit-earth";
import { cn } from "@/lib/utils";

interface PartnerIcon {
  src: string;
  alt: string;
  wide?: boolean;
  invert?: boolean;
}

const outerPartners: readonly PartnerIcon[] = [
  { src: "/partner-icons/github.svg", alt: "GitHub", invert: true },
  { src: "/partner-icons/vercel.svg", alt: "Vercel" },
  { src: "/partner-icons/docker.svg", alt: "Docker" },
  { src: "/partner-icons/stripe.svg", alt: "Stripe", wide: true },
  { src: "/partner-icons/openai.svg", alt: "OpenAI" },
  { src: "/partner-icons/grok.svg", alt: "Grok" },
  { src: "/partner-icons/deepseek.svg", alt: "DeepSeek" },
  { src: "/partner-icons/postgresql.svg", alt: "PostgreSQL" },
  { src: "/partner-icons/attached-partner-1.svg", alt: "GitHub Copilot" },
];

const innerPartners: readonly PartnerIcon[] = [
  { src: "/partner-icons/claude.svg", alt: "Claude" },
  { src: "/partner-icons/supabase.svg", alt: "Supabase" },
  { src: "/partner-icons/vscode.svg", alt: "Visual Studio Code" },
  { src: "/partner-icons/cloudflare.svg", alt: "Cloudflare", wide: true },
  { src: "/partner-icons/gemini.svg", alt: "Gemini" },
  { src: "/partner-icons/google-cloud.svg", alt: "Google Cloud" },
  { src: "/partner-icons/mistral.svg", alt: "Mistral" },
  { src: "/partner-icons/attached-partner-2.svg", alt: "Microsoft Copilot" },
];

export default function IntegrationsSection() {
  return (
    <div className="w-full">
      <div>
        <div className="mx-auto w-full px-0">
          <div
            className="group relative mx-auto aspect-16/10 w-full max-w-[44rem] sm:max-w-[52rem] lg:max-w-[60rem]"
            style={{ clipPath: "inset(-6rem -6rem 0 -6rem)" }}
          >
            <Orbit
              className="inset-0"
              direction="clockwise"
              duration={34}
              icons={outerPartners}
            />

            <Orbit
              className="inset-16 md:inset-24 lg:inset-28"
              direction="counter-clockwise"
              duration={28}
              icons={innerPartners}
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 bg-gradient-to-b from-transparent via-[#1e2021]/70 to-[#1e2021] md:h-32"
            />

            <div className="absolute inset-x-0 bottom-0 z-30 mx-auto flex w-fit justify-center">
              <LabeledOrbitEarth
                size={400}
                className="size-72 md:size-96"
                earthClassName="overflow-hidden rounded-full drop-shadow-[0_12px_28px_rgba(0,0,0,0.55)]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Orbit({
  className,
  direction,
  duration,
  icons,
}: {
  className?: string;
  direction: "clockwise" | "counter-clockwise";
  duration: number;
  icons: readonly PartnerIcon[];
}) {
  const orbitRotation = direction === "clockwise" ? 360 : -360;

  return (
    <div
      className={cn(
        "absolute aspect-square rounded-full border-t border-white/25 bg-linear-to-b from-white/8 to-transparent to-25%",
        className,
      )}
    >
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: orbitRotation }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
      >
        {icons.map((icon, index) => {
          const angle = (index * 360) / icons.length;

          return (
            <div
              key={icon.src}
              className="absolute inset-0"
              style={{ transform: `rotate(${angle}deg)` }}
            >
              <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2">
                <motion.div
                  animate={{ rotate: -orbitRotation }}
                  transition={{ duration, ease: "linear", repeat: Infinity }}
                >
                  <div style={{ transform: `rotate(${-angle}deg)` }}>
                    <IntegrationCard>
                      <Image
                        src={icon.src}
                        alt={icon.alt}
                        width={icon.wide ? 48 : 36}
                        height={36}
                        className={cn(
                          "h-9 w-9 object-contain",
                          icon.wide && "w-12",
                          icon.invert && "invert",
                        )}
                        unoptimized
                      />
                    </IntegrationCard>
                  </div>
                </motion.div>
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

function IntegrationCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative z-30 flex size-16 rounded-full border border-white/15 bg-[#202226] shadow-sm shadow-black/30 backdrop-blur-md md:size-20",
        className,
      )}
    >
      <div className="m-auto flex size-12 items-center justify-center md:size-14">{children}</div>
    </div>
  );
}
