"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";

interface FooterLink {
  label: string;
  href: string;
}

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

interface FooterProps {
  brandName?: string;
  brandDescription?: string;
  socialLinks?: SocialLink[];
  navLinks?: FooterLink[];
  creatorName?: string;
  creatorUrl?: string;
  brandIcon?: React.ReactNode;
  className?: string;
}

export const Footer = ({
  brandName = "YourBrand",
  brandDescription = "Your description here",
  socialLinks = [],
  navLinks = [],
  creatorName,
  creatorUrl,
  brandIcon,
  className,
}: FooterProps) => {
  return (
    <section className={cn("relative mt-0 w-full overflow-hidden", className)}>
      <footer className="relative mt-20 border-t border-white/8 bg-[#1E2021] text-white">
        <div className="relative mx-auto flex min-h-[30rem] max-w-7xl flex-col justify-between p-4 py-10 sm:min-h-[35rem] md:min-h-[40rem]">
          <div className="mb-12 flex w-full flex-col sm:mb-20 md:mb-0">
            <div className="flex w-full flex-col items-center">
              <div className="flex flex-1 flex-col items-center space-y-2">
                <p className="w-full max-w-sm px-4 text-center font-semibold text-white/62 sm:w-96 sm:px-0">
                  {brandDescription}
                </p>
              </div>

              {socialLinks.length > 0 && (
                <div className="mb-8 mt-3 flex gap-4">
                  {socialLinks.map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      className="text-white/55 transition-colors hover:text-white"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="h-6 w-6 duration-300 hover:scale-110">{link.icon}</div>
                      <span className="sr-only">{link.label}</span>
                    </Link>
                  ))}
                </div>
              )}

              {navLinks.length > 0 && (
                <div className="flex max-w-full flex-wrap justify-center gap-4 px-4 text-sm font-medium text-white/55">
                  {navLinks.map((link, index) => (
                    <Link
                      key={index}
                      className="duration-300 hover:font-semibold hover:text-white"
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-20 flex flex-col items-center justify-center gap-2 px-4 md:mt-24 md:flex-row md:items-center md:justify-between md:gap-1 md:px-0">
            <p className="text-center text-base text-white/55 md:text-left">
              ©{new Date().getFullYear()} {brandName}. All rights reserved.
            </p>
            {creatorName && creatorUrl && (
              <nav className="flex gap-4">
                <Link
                  href={creatorUrl}
                  target="_blank"
                  className="text-base text-white/55 transition-colors duration-300 hover:font-medium hover:text-white"
                >
                  Crafted by {creatorName}
                </Link>
              </nav>
            )}
          </div>
        </div>

        <div
          className="pointer-events-none absolute bottom-40 left-1/2 -translate-x-1/2 select-none whitespace-nowrap px-4 text-center font-extrabold leading-none tracking-tighter text-white md:bottom-32"
          style={{
            fontSize: "clamp(2.4rem, 8vw, calc(6.5rem + 85px))",
          }}
        >
          {brandName.toUpperCase()}
        </div>

        <div className="absolute bottom-24 left-1/2 z-10 -translate-x-1/2 md:bottom-20">
          <div className="rounded-[16px] bg-gradient-to-b from-gray-800/40 to-transparent p-[4px]">
            <div className="rounded-[12px] bg-gradient-to-b from-gray-700 to-gray-600 p-[4px] shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
              <div className="flex h-12 w-12 items-center justify-center rounded-[8px] bg-gradient-to-b from-gray-600 to-gray-700 sm:h-16 sm:w-16 md:h-24 md:w-24">
                {brandIcon || (
                  <Image
                    src="/favicon.png"
                    alt={brandName}
                    width={72}
                    height={72}
                    className="h-8 w-8 object-contain sm:h-10 sm:w-10 md:h-[72px] md:w-[72px]"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-32 left-1/2 h-1 w-full -translate-x-1/2 bg-gradient-to-r from-transparent via-white/12 to-transparent backdrop-blur-sm sm:bottom-34" />
        <div className="absolute bottom-28 h-24 w-full bg-gradient-to-t from-[#1E2021] via-[#1E2021]/80 to-[#1E2021]/40 blur-[1em]" />
      </footer>
    </section>
  );
};
