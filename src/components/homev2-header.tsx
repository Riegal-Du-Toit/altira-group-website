"use client";

import Link from "next/link";
import Image from "next/image";
import { openSansThin } from "@/lib/google-fonts";
import { useEffect, useState } from "react";

export function TalkButton() {
  return (
    <a
      href="/contact"
      className={`relative inline-flex items-stretch overflow-hidden rounded-[12px] border-0 bg-[linear-gradient(180deg,rgb(56,56,56)_0%,rgb(36,36,36)_66%,rgb(41,41,41)_100%)] p-[1px] text-[16px] font-bold text-[#dadada] transition-all duration-300 ease-out hover:shadow-[0_0_12px_rgba(255,255,255,0.08)] active:scale-[0.97] active:brightness-110 ${openSansThin.className}`}
    >
      <span className="relative flex items-center gap-1.5 rounded-[10px] bg-[radial-gradient(at_95%_89%,rgb(15,15,15)_0px,transparent_50%),radial-gradient(at_0%_100%,rgb(17,17,17)_0px,transparent_50%),radial-gradient(at_0%_0%,rgb(29,29,29)_0px,transparent_50%)] px-[1.05em] py-[0.64em] pr-[0.95em] text-[0.8rem] font-light text-inherit shadow-[0_0_20px_#4b4b4b] transition-colors duration-300 hover:bg-[rgb(26,25,25)] sm:text-[0.88rem]">
        <span>Talk to Us</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 53 58" height="58" width="53" className="h-3.5 w-3.5">
          <path
            stroke="currentColor"
            strokeWidth="6"
            d="M44.25 36.3612L17.25 51.9497C11.5833 55.2213 4.5 51.1318 4.50001 44.5885L4.50001 13.4115C4.50001 6.86824 11.5833 2.77868 17.25 6.05033L44.25 21.6388C49.9167 24.9104 49.9167 33.0896 44.25 36.3612Z"
          />
        </svg>
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[repeating-conic-gradient(rgb(48,47,47)_0.0000001%,rgb(51,51,51)_0.000104%)_60%_60%/600%_600%] opacity-10 contrast-105"
      />
    </a>
  );
}

const navLinks = [
  { label: "Home", href: "/" },
  { label: "What We Do", href: "/what-we-do" },
  { label: "Orbit Platform", href: "/orbit" },
  { label: "Why Altira", href: "/why-altira" },
  { label: "Offices", href: "/offices" },
  { label: "Contact", href: "/contact" },
];

export function HomeV2Header() {
  const [isHidden, setIsHidden] = useState(false);
  const [hasBackdrop, setHasBackdrop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const hero = document.getElementById("home");
      const inHero = hero
        ? currentY >= hero.offsetTop && currentY < hero.offsetTop + hero.offsetHeight
        : currentY < window.innerHeight;

      setIsHidden(!inHero);
      setHasBackdrop(!inHero);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`homev2-header-entrance fixed inset-x-0 top-0 z-50 rounded-b-[2rem] border-b px-4 transition-[transform,background-color,border-color] duration-300 sm:px-6 ${hasBackdrop ? "border-white/5 bg-[#0b0b0c]/95 backdrop-blur-md" : "border-transparent bg-transparent"} ${isHidden ? "homev2-header-scroll-hidden" : ""}`}>
      <div className="pointer-events-auto mx-auto flex h-[69px] max-w-[96rem] items-center justify-between pl-[8.5rem] pr-24">
        <Link href="/homev2" className={`relative flex items-center gap-2 tracking-[0.34em] text-white/95 ${openSansThin.className}`}>
          <Image
            src="/favicon.png"
            alt=""
            width={24}
            height={24}
            className="absolute right-full mr-3 size-6 rounded-sm object-cover"
            priority
          />
          <span className="text-[1.15rem] font-light tracking-[0.34em] sm:text-[1.35rem]">ALTIRA GROUP</span>
        </Link>

        <div className="flex items-center gap-4">
          <nav aria-label="Primary navigation" className="hidden items-center gap-5 xl:flex">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href} className="text-[0.72rem] font-light text-white/72 transition hover:text-white">
                {link.label}
              </Link>
            ))}
          </nav>
          <TalkButton />
        </div>
      </div>
    </header>
  );
}

export default HomeV2Header;
