"use client";

import { openSansThin } from "@/lib/google-fonts";
import NavbarSectionTwo from "@/components/ui/navbar-section-2";
import { useEffect, useState } from "react";
export { TalkButton } from "@/components/ui/talk-button";

export function NavigationCta({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`navigation-cta relative inline-flex items-stretch overflow-hidden rounded-[12px] border-0 bg-[linear-gradient(180deg,rgb(56,56,56)_0%,rgb(36,36,36)_66%,rgb(41,41,41)_100%)] p-[1px] text-[16px] font-bold text-[#F7F8FA] transition-all duration-300 ease-out hover:shadow-[0_0_12px_rgba(255,255,255,0.08)] active:scale-[0.97] active:brightness-110 ${openSansThin.className} ${className}`}
    >
      <span className="relative flex items-center gap-1.5 rounded-[10px] bg-[radial-gradient(at_95%_89%,rgb(15,15,15)_0px,transparent_50%),radial-gradient(at_0%_100%,rgb(17,17,17)_0px,transparent_50%),radial-gradient(at_0%_0%,rgb(29,29,29)_0px,transparent_50%)] px-[1.05em] py-[0.64em] pr-[0.95em] text-[0.8rem] font-light text-inherit shadow-[0_0_20px_#4b4b4b] transition-colors duration-300 hover:bg-[rgb(26,25,25)] sm:text-[0.88rem]">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[repeating-conic-gradient(rgb(48,47,47)_0.0000001%,rgb(51,51,51)_0.000104%)_60%_60%/600%_600%] opacity-10 contrast-105"
      />
    </a>
  );
}

export function HomeV2Header() {
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    const footer = document.getElementById("homev2-footer");
    if (!footer) return;

    const observer = new IntersectionObserver(([entry]) => setIsFooterVisible(entry.isIntersecting), { threshold: 0.05 });
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <header data-site-header data-anchor-offset="-64" className="homev2-header-entrance fixed inset-x-0 top-0 z-50 px-4 sm:px-6">
      <NavbarSectionTwo hideLogo={isFooterVisible} />
    </header>
  );
}

export default HomeV2Header;
