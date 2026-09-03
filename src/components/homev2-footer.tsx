"use client";

import Link from "next/link";
import Image from "next/image";
import { InstagramIcon, LinkedinIcon, Mail, PhoneIcon, X, YoutubeIcon } from "lucide-react";
import { useEffect, useState } from "react";

const columns = [
  { title: "Explore", links: [["Home", "/homev2"], ["What We Do", "/what-we-do"], ["Orbit Platform", "/orbit"], ["Why Altira", "/why-altira"]] },
  { title: "Company", links: [["Offices", "/offices"], ["Contact", "/contact"], ["Partner with us", "/contact"], ["Privacy", "/privacy"]] },
  { title: "Resources", links: [["Orbit Engine", "/orbit"], ["Our approach", "/what-we-do"], ["Member experience", "/why-altira"], ["Insights", "/insights"]] },
] as const;

const WhatsAppIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M20.52 3.48A11.86 11.86 0 0 0 12.08 0C5.5 0 .15 5.34.15 11.92c0 2.1.55 4.16 1.6 5.97L0 24l6.26-1.64a11.9 11.9 0 0 0 5.82 1.48h.01c6.58 0 11.92-5.35 11.92-11.93 0-3.18-1.24-6.17-3.49-8.43ZM12.09 21.82h-.01a9.88 9.88 0 0 1-5.04-1.38l-.36-.22-3.71.97.99-3.62-.24-.37a9.88 9.88 0 0 1-1.51-5.28c0-5.46 4.44-9.9 9.9-9.9a9.84 9.84 0 0 1 7 2.9 9.83 9.83 0 0 1 2.9 7c0 5.46-4.45 9.9-9.91 9.9Zm5.43-7.41c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.08-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.48.71.31 1.26.49 1.69.63.71.23 1.36.19 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" />
  </svg>
);

const contactActions = [
  { label: "Whatsapp", href: "https://wa.me/", icon: WhatsAppIcon },
  { label: "Call Us", href: "tel:+27000000000", icon: PhoneIcon },
  { label: "Email Us", href: "mailto:info@altiragroup.co.za", icon: Mail },
] as const;

const AppleStoreIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M16.33 1.6c.05 1.12-.41 2.22-1.16 3.03-.8.87-2.06 1.54-3.17 1.45-.08-1.08.43-2.22 1.18-3.01.83-.88 2.21-1.55 3.15-1.47Z" />
    <path d="M20.3 17.12c-.48 1.09-.7 1.58-1.31 2.54-.85 1.31-2.04 2.94-3.52 2.96-1.31.01-1.65-.86-3.44-.85-1.79.01-2.17.87-3.49.85-1.48-.02-2.61-1.49-3.46-2.8-2.37-3.66-2.62-7.95-1.16-10.23 1.04-1.62 2.68-2.57 4.22-2.57 1.57 0 2.55.86 3.85.86 1.26 0 2.03-.86 3.85-.86 1.37 0 2.83.75 3.86 2.04-3.39 1.86-2.84 6.7.6 8.06Z" />
  </svg>
);

const socialActions = [
  { label: "LinkedIn", href: "#", icon: LinkedinIcon },
  { label: "Instagram", href: "#", icon: InstagramIcon },
  { label: "YouTube", href: "#", icon: YoutubeIcon },
] as const;

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
        <div className="mx-auto w-full max-w-[1100px] lg:-translate-x-12 xl:-translate-x-20">
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
                <div className="grid gap-6 sm:grid-cols-[auto_1fr] sm:items-start sm:gap-x-16">
                  <div>
                    <div className="mb-5 flex items-center gap-1.5">
                      <h3 className="text-[0.78rem] font-bold text-black">Talk To Us</h3>
                      <p className="text-[0.78rem] font-normal text-black">Have a question?</p>
                    </div>
                    <div className="flex flex-wrap gap-6">
                      {contactActions.map(({ label, href, icon: Icon }) => (
                        <a key={label} href={href} className="grid justify-items-center gap-2 text-black transition">
                          <span className="relative grid size-11 place-items-center overflow-hidden rounded-[12px] border-[1.5px] border-[#F7F8FA] bg-[#37D8C6] text-white shadow-[0_8px_18px_rgba(17,22,61,0.18)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#2fc7b7] active:scale-[0.97]">
                            <Icon className="relative z-10 size-6 !text-white" />
                            <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[repeating-conic-gradient(rgb(48,47,47)_0.0000001%,rgb(51,51,51)_0.000104%)_60%_60%/600%_600%] opacity-10 contrast-105" />
                          </span>
                          <span className="text-[0.78rem] font-normal">{label}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="grid gap-2 sm:ml-4">
                    <h3 className="text-[0.78rem] font-bold text-black">Socials</h3>
                    <div className="grid gap-2">
                      <div className="flex items-center gap-2">
                      {socialActions.map(({ label, href, icon: Icon }) => (
                        <a
                          key={label}
                          href={href}
                          aria-label={label}
                          className="relative grid size-9 place-items-center overflow-hidden rounded-[12px] border-[1.5px] border-[#F7F8FA] bg-[#37D8C6] text-white shadow-[0_8px_18px_rgba(17,22,61,0.18)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#2fc7b7] active:scale-[0.97]"
                        >
                          <Icon className="relative z-10 size-4 !text-white" />
                          <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[repeating-conic-gradient(rgb(48,47,47)_0.0000001%,rgb(51,51,51)_0.000104%)_60%_60%/600%_600%] opacity-10 contrast-105" />
                        </a>
                      ))}
                      </div>
                      <div className="flex items-center gap-2">
                      <a className="playstore-button" href="#" aria-label="Google Play Store">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="icon" viewBox="0 0 512 512">
                          <path d="M99.617 8.057a50.191 50.191 0 00-38.815-6.713l230.932 230.933 74.846-74.846L99.617 8.057zM32.139 20.116c-6.441 8.563-10.148 19.077-10.148 30.199v411.358c0 11.123 3.708 21.636 10.148 30.199l235.877-235.877L32.139 20.116zM464.261 212.087l-67.266-37.637-81.544 81.544 81.548 81.548 67.273-37.64c16.117-9.03 25.738-25.442 25.738-43.908s-9.621-34.877-25.749-43.907zM291.733 279.711L60.815 510.629c3.786.891 7.639 1.371 11.492 1.371a50.275 50.275 0 0027.31-8.07l266.965-149.372-74.849-74.847z" />
                        </svg>
                        <span className="texts">
                          <span className="text-1">GET IT ON</span>
                          <span className="text-2">Google Play</span>
                        </span>
                      </a>
                      <a className="playstore-button" href="#" aria-label="Apple Store">
                        <AppleStoreIcon className="icon" />
                        <span className="texts">
                          <span className="text-1">Download on the</span>
                          <span className="text-2">App Store</span>
                        </span>
                      </a>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="mt-5 max-w-[31rem] text-[0.6rem] leading-4 text-white/32">
                  Altira Group provides technology and distribution services for regulated financial-product partners. Product availability and terms are subject to applicable partner and regulatory requirements.
                </p>
              </div>
            </div>

            <div className="relative aspect-[1184/1536] w-full max-w-[25rem] overflow-hidden rounded-[1.4rem] lg:ml-auto lg:-mt-[9rem]">
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
                  className="absolute left-3 top-3 z-10 grid size-10 place-items-center rounded-full border border-white/50 !bg-[linear-gradient(135deg,#5B5CEB,#37D8C6)] !text-[#F7F8FA] shadow-[0_8px_20px_rgba(17,22,61,0.3)] transition hover:scale-105"
                >
                  <X className="size-4 !text-[#F7F8FA]" />
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
