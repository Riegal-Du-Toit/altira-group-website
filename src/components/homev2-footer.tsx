"use client";

import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { FooterSocials } from "@/components/FooterSocials";

const columns = [
  { title: "Explore", links: [["Home", "#home"], ["What We Do", "#products"], ["Orbit Platform", "#method"], ["Why Altira", "#why"]] },
  { title: "Company", links: [["Offices", "#offices"], ["Contact", "#talk-to-us"], ["Partner with us", "#talk-to-us"]] },
  { title: "Resources", links: [["Orbit Engine", "#method"], ["Our approach", "#method"]] },
] as const;

const EmailIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M4.5 18V7.2" stroke="#EA4335" strokeWidth="3.2" strokeLinecap="round" />
    <path d="m4.8 7.3 7.2 5.5" stroke="#EA4335" strokeWidth="3.2" strokeLinecap="round" />
    <path d="m12 12.8 7.2-5.5" stroke="#FBBC04" strokeWidth="3.2" strokeLinecap="round" />
    <path d="M19.5 7.2V18" stroke="#34A853" strokeWidth="3.2" strokeLinecap="round" />
    <path d="M4.5 15.2V18" stroke="#4285F4" strokeWidth="3.2" strokeLinecap="round" />
  </svg>
);

const contactActions = [
  { label: "Email Us", href: "mailto:info@altiragroup.co.za", icon: EmailIcon, platform: "email" },
] as const;

const AppleStoreIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M16.33 1.6c.05 1.12-.41 2.22-1.16 3.03-.8.87-2.06 1.54-3.17 1.45-.08-1.08.43-2.22 1.18-3.01.83-.88 2.21-1.55 3.15-1.47Z" />
    <path d="M20.3 17.12c-.48 1.09-.7 1.58-1.31 2.54-.85 1.31-2.04 2.94-3.52 2.96-1.31.01-1.65-.86-3.44-.85-1.79.01-2.17.87-3.49.85-1.48-.02-2.61-1.49-3.46-2.8-2.37-3.66-2.62-7.95-1.16-10.23 1.04-1.62 2.68-2.57 4.22-2.57 1.57 0 2.55.86 3.85.86 1.26 0 2.03-.86 3.85-.86 1.37 0 2.83.75 3.86 2.04-3.39 1.86-2.84 6.7.6 8.06Z" />
  </svg>
);

const MicrosoftStoreIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M3 3h8.5v8.5H3V3Zm9.5 0H21v8.5h-8.5V3ZM3 12.5h8.5V21H3v-8.5Zm9.5 0H21V21h-8.5v-8.5Z" />
  </svg>
);

export function HomeV2Footer() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    const openCalendar = () => setIsBookingOpen(true);

    window.addEventListener("altira:open-calendar", openCalendar);

    if (window.location.hash === "#talk-to-us") {
      openCalendar();
    }

    return () => window.removeEventListener("altira:open-calendar", openCalendar);
  }, []);

  return (
    <footer id="talk-to-us" data-site-footer data-talk-target className="bg-[#F7F8FA] px-0 pt-0 text-[#2E2E38]">
      <div className="rounded-t-[2rem] bg-[#E4E5EA] px-7 pb-[7px] pt-4 sm:px-12 lg:px-[11%] lg:pt-6">
        <div className="mx-auto w-full max-w-[1220px]">
          <div className="border-b border-white/8 pb-12">
            <Image src="/logo.png" alt="Altira Group" width={218} height={72} className="h-auto w-[11.5rem]" />
          </div>

          <div className="grid gap-10 pb-0 pt-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(24rem,0.85fr)] lg:items-start">
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
                <div className="grid gap-8 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-start lg:gap-x-16">
                  <div className="min-w-[13rem]">
                    <div className="mb-5 flex items-center gap-2">
                      <h3 className="text-[0.78rem] font-bold text-black">Talk To Us</h3>
                      <p className="text-[0.78rem] font-normal text-black">Have a question?</p>
                    </div>
                    <div className="flex flex-wrap gap-6 lg:gap-7">
                      {contactActions.map(({ label, href, icon: Icon, platform }) => (
                        <a key={label} href={href} className="grid justify-items-center gap-2 text-black transition">
                          <span data-platform={platform} className="SocialTiltBtn FooterContactTiltBtn">
                            <span className="svgContainer">
                              <Icon className="svgIcon relative z-10" />
                            </span>
                            <span className="BG" aria-hidden="true" />
                          </span>
                          <span className="text-[0.78rem] font-normal">{label}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="grid min-w-0 gap-2">
                    <FooterSocials />
                    <div className="grid gap-2">
                      <div className="flex min-w-0 items-center gap-2 whitespace-nowrap">
                      <span className="playstore-button cursor-default" aria-label="Google Play Store availability pending">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="icon" viewBox="0 0 512 512">
                          <path d="M99.617 8.057a50.191 50.191 0 00-38.815-6.713l230.932 230.933 74.846-74.846L99.617 8.057zM32.139 20.116c-6.441 8.563-10.148 19.077-10.148 30.199v411.358c0 11.123 3.708 21.636 10.148 30.199l235.877-235.877L32.139 20.116zM464.261 212.087l-67.266-37.637-81.544 81.544 81.548 81.548 67.273-37.64c16.117-9.03 25.738-25.442 25.738-43.908s-9.621-34.877-25.749-43.907zM291.733 279.711L60.815 510.629c3.786.891 7.639 1.371 11.492 1.371a50.275 50.275 0 0027.31-8.07l266.965-149.372-74.849-74.847z" />
                        </svg>
                        <span className="texts">
                          <span className="text-1">GET IT ON</span>
                          <span className="text-2">Google Play</span>
                        </span>
                      </span>
                      <span className="playstore-button cursor-default" aria-label="Apple App Store availability pending">
                        <AppleStoreIcon className="icon" />
                        <span className="texts">
                          <span className="text-1">Download on the</span>
                          <span className="text-2">App Store</span>
                        </span>
                      </span>
                      <div className="-mt-5 flex flex-col items-start gap-1">
                        <span className="flex items-center">
                          <Image src="/partner-icons/smart%20dms.png" alt="Smart DMS" width={64} height={22} className="h-[19.404px] w-auto object-contain" />
                        </span>
                        <span className="playstore-button cursor-default" aria-label="Microsoft Store availability pending">
                          <MicrosoftStoreIcon className="icon" />
                          <span className="texts">
                            <span className="text-1">Available on</span>
                            <span className="text-2">Microsoft</span>
                          </span>
                        </span>
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="mt-5 max-w-[31rem] text-[0.6rem] leading-4 text-white/32">
                  Altira Group provides technology and distribution services for regulated financial-product partners. Product availability and terms are subject to applicable partner and regulatory requirements.
                </p>
              </div>
            </div>

            <div className="relative aspect-[1184/1536] w-full max-w-[30rem] overflow-hidden rounded-[1.4rem] lg:ml-auto lg:-mt-[9rem]">
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
              {isBookingOpen && (
                <button
                  type="button"
                  onClick={() => setIsBookingOpen(false)}
                  aria-label="Close calendar"
                  className="talk-button calendar-close-button absolute left-3 top-3 z-10 inline-flex size-10 items-stretch overflow-hidden rounded-[12px] border-[1.5px] border-[#F7F8FA] bg-[#37D8C6] p-0 text-[16px] font-bold text-white shadow-[0_8px_18px_rgba(17,22,61,0.18)] transition-all duration-300 ease-out hover:bg-[#2fc7b7] active:scale-[0.97]"
                >
                  <span className="relative z-10 grid size-full place-items-center rounded-[10px] bg-white/10">
                    <X className="size-4 !text-white" />
                  </span>
                  <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[repeating-conic-gradient(rgb(48,47,47)_0.0000001%,rgb(51,51,51)_0.000104%)_60%_60%/600%_600%] opacity-10 contrast-105" />
                </button>
              )}
            </div>
          </div>

          <div className="hidden flex-col gap-3 border-t border-white/8 pt-0 text-[0.65rem] text-white/34 sm:flex-row sm:items-center sm:justify-between">
            <span>© 2026 Altira Group. All rights reserved.</span>
            <Link href="#talk-to-us" className="transition hover:text-white">Start a conversation ↗</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
