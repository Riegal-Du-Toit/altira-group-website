"use client";

import Link from "next/link";
import Image from "next/image";
import { FacebookIcon, InstagramIcon, LinkedinIcon, X } from "lucide-react";
import { useState } from "react";

const columns = [
  { title: "Explore", links: [["Home", "/homev2"], ["What We Do", "/what-we-do"], ["Orbit Platform", "/orbit"], ["Why Altira", "/why-altira"]] },
  { title: "Company", links: [["Offices", "/offices"], ["Contact", "/contact"], ["Partner with us", "/contact"], ["Privacy", "/privacy"]] },
  { title: "Resources", links: [["Orbit Engine", "/orbit"], ["Our approach", "/what-we-do"], ["Member experience", "/why-altira"], ["Insights", "/insights"]] },
] as const;

const socials = [
  { label: "Facebook", icon: FacebookIcon },
  { label: "Instagram", icon: InstagramIcon },
  { label: "X", icon: X },
  { label: "LinkedIn", icon: LinkedinIcon },
];

export function HomeV2Footer() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <footer className="bg-[#F7F8FA] px-0 pt-0 text-[#2E2E38]">
      <div className="rounded-t-[2rem] bg-[#E4E5EA] px-7 pb-[7px] pt-4 sm:px-12 lg:px-[11%] lg:pt-6">
        <div className="mx-auto w-full max-w-[1100px]">
          <div className="border-b border-white/8 pb-12">
            <Image src="/logo.png" alt="Altira Group" width={218} height={72} className="h-auto w-[11.5rem]" />
          </div>

          <div className="grid gap-12 pb-0 pt-6 lg:grid-cols-2 lg:items-start">
            <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3">
              {columns.map((column) => (
                <div key={column.title}>
                  <h3 className="text-[0.78rem] font-bold text-white">{column.title}</h3>
                  <ul className="mt-4 space-y-3">
                    {column.links.map(([label, href]) => (
                      <li key={label}><Link href={href} className="text-[0.76rem] text-white/62 transition hover:text-white">{label}</Link></li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className="col-span-full mt-1 border-t border-white/8 pt-7">
                <div>
                  <a href="/contact" aria-label="Get it on Google Play" className="google-play-button inline-flex h-12 items-center gap-2 rounded-xl !bg-[#2E2E38] px-3 text-[#F7F8FA] transition hover:!bg-[#25252d]">
                    <svg viewBox="30 336.7 120.9 129.2" className="w-5" aria-hidden="true">
                      <path d="M119.2 421.2c15.3-8.4 27-14.8 28-15.3 3.2-1.7 6.5-6.2 0-9.7-2.1-1.1-13.4-7.3-28-15.3l-20.1 20.2 20.1 20.1Z" fill="#FFD400" />
                      <path d="m99.1 401.1-64.2 64.7c1.5.2 3.2-.2 5.2-1.3 4.2-2.3 48.8-26.7 79.1-43.3l-20.1-20.1Z" fill="#FF3333" />
                      <path d="m99.1 401.1 20.1-20.2S44.6 340.2 40.1 337.8c-1.7-1-3.6-1.3-5.3-1l64.3 64.3Z" fill="#48FF48" />
                      <path d="m99.1 401.1-64.3-64.3c-2.6.6-4.8 2.9-4.8 7.6v113.8c0 4.3 1.7 7.4 4.9 7.7l64.2-64.8Z" fill="#3BCCFF" />
                    </svg>
                    <span className="leading-none"><span className="block text-[0.48rem]">GET IT ON</span><span className="mt-0.5 block text-sm font-semibold">Google Play</span></span>
                  </a>
                </div>
                <div className="mt-5 flex gap-4 text-white/66">
                  {socials.map(({ label, icon: Icon }) => <a key={label} href="/contact" aria-label={label} className="transition hover:text-white"><Icon className="size-4" /></a>)}
                </div>
                <p className="mt-5 max-w-[31rem] text-[0.6rem] leading-4 text-white/32">
                  Altira Group provides technology and distribution services for regulated financial-product partners. Product availability and terms are subject to applicable partner and regulatory requirements.
                </p>
              </div>
            </div>

            <div className="aspect-[1184/1536] w-full max-w-[25rem] overflow-hidden rounded-[1.4rem] lg:ml-auto lg:-mt-[9rem]">
              {isBookingOpen ? (
                <iframe
                  src="https://outlook.office.com/book/G855be4c9beb647649a95f2642eabb914@altiragroup.co.za/?ismsaljsauthenabled"
                  title="Schedule online"
                  scrolling="yes"
                  className="size-full border-0"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setIsBookingOpen(true)}
                  aria-label="Click here to book a 30 minute meeting"
                  className="size-full cursor-pointer"
                >
                  <Image
                    src="/meeting scheduling.png"
                    alt="Click here to book a 30 minute meeting"
                    width={1184}
                    height={1536}
                    className="size-full object-contain"
                  />
                </button>
              )}
            </div>
          </div>

          <div className="hidden flex-col gap-3 border-t border-white/8 pt-0 text-[0.65rem] text-white/34 sm:flex-row sm:items-center sm:justify-between">
            <span>© 2026 Altira Group. All rights reserved.</span>
            <Link href="/contact" className="transition hover:text-white">Start a conversation ↗</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
