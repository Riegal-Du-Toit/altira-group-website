"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MenuIcon, XIcon } from "lucide-react";
import { TalkButton } from "@/components/ui/talk-button";

type NavItem = { label: string; href: string };

const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "Products", href: "#products" },
  { label: "Why Altira", href: "#why" },
  { label: "Method", href: "#method" },
  { label: "Offices", href: "#offices" },
  { label: "Partners", href: "#integrations" },
  { label: "Experience", href: "#app-experience" },
];

export default function NavbarSectionTwo({ hideLogo = false }: { hideLogo?: boolean }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="relative z-30 w-full select-none font-sans">
      <div className="relative mx-auto hidden h-12 w-full max-w-7xl items-center justify-between lg:flex">
        <Link href="/homev2" className={`flex items-center transition-all duration-300 ${hideLogo ? "pointer-events-none -translate-y-4 opacity-0" : "translate-y-0 opacity-100"}`}><Image src="/logo.png" alt="Altira Group" width={218} height={72} className="h-auto w-[11.5rem]" priority /></Link>
        <div className="absolute left-1/2 top-0 w-[700px] -translate-x-1/2" style={{ filter: "drop-shadow(0 12px 20px rgba(0, 0, 0, 0.18))" }}>
          <svg width="20" height="20" viewBox="0 0 20 20" className="pointer-events-none absolute -left-[18px] top-0 z-10 text-[#F7F8FA]"><path d="M 20 20 L 20 0 L 0 0 C 11.046 0 20 11.046 20 20 Z" fill="currentColor" /></svg>
          <svg width="20" height="20" viewBox="0 0 20 20" className="pointer-events-none absolute -right-[18px] top-0 z-10 text-[#F7F8FA]"><path d="M 0 0 L 20 0 C 8.954 0 0 8.954 0 20 Z" fill="currentColor" /></svg>
          <div className="relative flex h-12 w-full items-center justify-center overflow-hidden bg-[#F7F8FA] px-6" style={{ borderBottomLeftRadius: "16px", borderBottomRightRadius: "16px" }}>
            <nav className="flex w-full items-center justify-center gap-5 whitespace-nowrap text-xs font-medium text-[#2E2E38]/70">
              {navItems.map((item) => <a key={item.label} href={item.href} className="px-1 py-1 text-[#2E2E38]/70 transition-colors hover:text-[#2E2E38]">{item.label}</a>)}
            </nav>
          </div>
        </div>
        <TalkButton />
      </div>

      <div className="flex h-14 items-center justify-between lg:hidden">
        <Link href="/homev2" className={`transition-all duration-300 ${hideLogo ? "pointer-events-none -translate-y-4 opacity-0" : "translate-y-0 opacity-100"}`}><Image src="/logo.png" alt="Altira Group" width={218} height={72} className="h-auto w-36" priority /></Link>
        <div className="flex items-center gap-2"><TalkButton /><button type="button" onClick={() => setMobileOpen((open) => !open)} className="grid size-9 place-items-center rounded-lg border border-[#2E2E38]/20 text-[#2E2E38]">{mobileOpen ? <XIcon className="size-4" /> : <MenuIcon className="size-4" />}</button></div>
      </div>
      <AnimatePresence>{mobileOpen && <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden rounded-xl bg-[#F7F8FA] text-[#2E2E38] shadow-xl lg:hidden"><div className="grid gap-1 p-4">
        {navItems.map((item) => <a key={item.label} href={item.href} onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2 text-sm text-[#2E2E38]/72 hover:bg-white/70 hover:text-[#2E2E38]">{item.label}</a>)}
      </div></motion.div>}</AnimatePresence>
    </div>
  );
}
