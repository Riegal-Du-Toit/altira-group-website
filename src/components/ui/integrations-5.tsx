"use client";

import Image from "next/image";
import { type CSSProperties, useState } from "react";

import { LabeledOrbitEarth } from "@/components/ui/labeled-orbit-earth";
import { cn } from "@/lib/utils";

interface PartnerIcon {
  src: string;
  alt: string;
  wide?: boolean;
  invert?: boolean;
}

const outerPartners: readonly PartnerIcon[] = [
  { src: "/icons/user-shield.svg", alt: "Member protection" },
  { src: "/icons/shield-security-risk.svg", alt: "Risk protection" },
  { src: "/icons/payment-gateway.svg", alt: "Payment gateway" },
  { src: "/icons/payment-pos.svg", alt: "Payments" },
  { src: "/icons/business-deal.svg", alt: "Business solutions" },
  { src: "/icons/car-crash.svg", alt: "Motor protection" },
  { src: "/icons/family-dress.svg", alt: "Family protection" },
  { src: "/icons/anatomical-heart.svg", alt: "Health protection" },
  { src: "/icons/wildfire.svg", alt: "Property protection" },
];

const innerPartners: readonly PartnerIcon[] = [
  { src: "/icons/payment-pos.svg", alt: "Payments" },
  { src: "/icons/payment-gateway.svg", alt: "Payment gateway" },
  { src: "/icons/user-shield.svg", alt: "Member protection" },
  { src: "/icons/shield-security-risk.svg", alt: "Risk protection" },
  { src: "/icons/business-deal.svg", alt: "Business solutions" },
  { src: "/icons/anatomical-heart.svg", alt: "Health protection" },
  { src: "/icons/family-dress.svg", alt: "Family protection" },
  { src: "/icons/wildfire.svg", alt: "Property protection" },
];

export default function IntegrationsSection() {
  return (
    <div className="w-full">
      <div>
        <div className="mx-auto w-full px-0">
          <div
            className="group relative mx-auto aspect-16/10 w-full max-w-[36rem] sm:max-w-[43rem] lg:max-w-[50rem]"
            style={{ clipPath: "inset(-6rem -6rem 0 -6rem)" }}
          >
            <Orbit
              className="inset-0"
              direction="clockwise"
              duration={34}
              icons={outerPartners}
            />

            <Orbit
              className="inset-14 md:inset-20 lg:inset-24"
              direction="counter-clockwise"
              duration={28}
              icons={innerPartners}
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-[-8%] right-[calc(-8%+9px)] -bottom-8 z-20 h-48 bg-gradient-to-b from-transparent via-[#F7F8FA]/82 to-[#F7F8FA] md:left-[-10%] md:right-[calc(-10%+9px)] md:-bottom-10 md:h-60"
            />

            <div className="absolute inset-x-0 bottom-0 z-30 mx-auto flex w-fit justify-center">
              <LabeledOrbitEarth
                size={260}
                className="size-52 md:size-64"
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
  const [isPaused, setIsPaused] = useState(false);
  const orbitStyle = {
    "--partner-orbit-duration": `${duration}s`,
    animationPlayState: isPaused ? "paused" : "running",
  } as CSSProperties;

  return (
    <div
      className={cn(
        "absolute aspect-square rounded-full border-t border-white/25 bg-linear-to-b from-white/8 to-transparent to-25%",
        className,
      )}
    >
      <div
        className={cn(
          "partner-orbit-spin absolute inset-0",
          direction === "clockwise" ? "partner-orbit-cw" : "partner-orbit-ccw",
        )}
        style={orbitStyle}
      >
        {icons.map((icon, index) => {
          const angle = (index * 360) / icons.length;

          return (
            <div key={icon.src} className="absolute inset-0" style={{ transform: `rotate(${angle}deg)` }}>
              <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2">
                <div
                  className={cn(
                    "partner-orbit-spin",
                    direction === "clockwise" ? "partner-orbit-ccw" : "partner-orbit-cw",
                  )}
                  style={orbitStyle}
                >
                  <div style={{ transform: `rotate(${-angle}deg)` }}>
                    <IntegrationCard
                      label={icon.alt}
                      onPointerEnter={() => setIsPaused(true)}
                      onPointerLeave={() => setIsPaused(false)}
                    >
                      <Image
                        src={icon.src}
                        alt={icon.alt}
                        width={icon.wide ? 48 : 36}
                        height={36}
                        className={cn(
                          "h-7 w-7 object-contain md:h-8 md:w-8",
                          icon.wide && "w-10 md:w-11",
                          "brightness-0 invert",
                        )}
                        unoptimized
                      />
                    </IntegrationCard>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function IntegrationCard({
  children,
  className,
  label,
  onPointerEnter,
  onPointerLeave,
}: {
  children: React.ReactNode;
  className?: string;
  label: string;
  onPointerEnter: () => void;
  onPointerLeave: () => void;
}) {
  return (
    <div
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      className={cn(
        "group/tooltip relative z-30 size-14 overflow-visible outline-none md:size-16",
        className,
      )}
    >
      <span className="pointer-events-none absolute left-1/2 top-0 z-50 -translate-x-1/2 rounded-lg bg-[#333] px-3 py-1.5 text-sm font-medium capitalize text-[#e8e8e8] opacity-0 shadow-[rgba(0,0,0,0.25)_0_8px_15px] transition-all duration-300 ease-out before:absolute before:bottom-[-0.2em] before:left-1/2 before:size-2 before:-translate-x-1/2 before:rotate-45 before:bg-[#333] group-hover/tooltip:-top-10 group-hover/tooltip:opacity-100">
        {label}
      </span>

      <div className="absolute inset-0 z-10">
        <div className="absolute inset-0 overflow-hidden rounded-full border border-white/10 bg-[#111] shadow-[inset_-8px_-8px_16px_rgba(0,0,0,0.9),inset_6px_6px_14px_rgba(255,255,255,0.15),0_12px_20px_rgba(0,0,0,0.5)]">
          <div className="absolute left-[10%] top-[8%] h-[35%] w-[65%] -rotate-[25deg] rounded-[50%] bg-[linear-gradient(135deg,rgba(255,255,255,0.35)_0%,transparent_100%)] blur-[1px]" />
          <div className="absolute bottom-[8%] right-[10%] h-[25%] w-[55%] -rotate-[25deg] rounded-[50%] bg-[linear-gradient(315deg,rgba(255,255,255,0.15)_0%,transparent_100%)] blur-[1px]" />
        </div>
      </div>

      <div className="absolute inset-0 z-20 animate-[staticFloat_4s_ease-in-out_infinite] rounded-full">
        <div className="absolute inset-0 overflow-hidden rounded-full border border-white/25 bg-white/[0.035] shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),inset_0_-1px_2px_rgba(0,0,0,0.3),0_4px_15px_rgba(0,0,0,0.2)] backdrop-blur-[15px] backdrop-saturate-[1.8]">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.15),rgba(255,255,255,0.02))]" />
          <div className="absolute left-3 top-[5px] h-[25%] w-[65%] rounded-full bg-[linear-gradient(to_bottom,rgba(255,255,255,0.5),transparent)] blur-[3px]" />
          <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[length:3px_3px] opacity-[0.03] mix-blend-overlay" />
          <div className="absolute -inset-1/2 -translate-x-[35%] rotate-[25deg] bg-[linear-gradient(130deg,transparent_42%,rgba(255,255,255,0.18)_50%,transparent_58%)]" />

          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <div className="flex min-h-9 min-w-9 items-center justify-center drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
