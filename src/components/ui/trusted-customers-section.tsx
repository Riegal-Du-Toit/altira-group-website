import { RulerCarousel, type CarouselItem } from "@/components/ui/ruler-carousel";
import { poppins } from "@/lib/google-fonts";
import { InstagramIcon, LinkedinIcon, YoutubeIcon } from "lucide-react";

const customers = [
  "Client 1",
  "Client 2",
  "Client 3",
  "Client 4",
  "Client 5",
  "Client 6",
  "Client 7",
  "Client 8",
  "Client 9",
  "Client 10",
] as const;

const partners = [
  { title: "VS Code", icon: "/partner-icons/vscode.svg" },
  { title: "Vercel", icon: "/partner-icons/vercel.svg", iconClassName: "brightness-0" },
  { title: "Supabase", icon: "/partner-icons/supabase.svg" },
  { title: "Stripe", icon: "/partner-icons/stripe.svg", hideTitle: true, iconClassName: "!size-24" },
  { title: "PostgreSQL", icon: "/partner-icons/postgresql.svg" },
  { title: "GPT", icon: "/partner-icons/openai.svg", iconClassName: "brightness-0" },
  { title: "Gmail", icon: "/partner-icons/mistral.svg" },
  { title: "Grok", icon: "/partner-icons/grok.svg", iconClassName: "brightness-0" },
  { title: "Google Cloud", icon: "/partner-icons/google-cloud.svg" },
  { title: "GitHub", icon: "/partner-icons/github.svg" },
  { title: "Gemini", icon: "/partner-icons/gemini.svg" },
  { title: "Docker", icon: "/partner-icons/docker.svg" },
  { title: "DeepSeek", icon: "/partner-icons/deepseek.svg" },
  { title: "Cloudflare", icon: "/partner-icons/cloudflare.svg" },
  { title: "Claude", icon: "/partner-icons/claude.svg" },
] as const;

const GooglePlayIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M4.5 2.3c-.37.21-.6.62-.6 1.15v17.1c0 .5.21.89.55 1.11l9.3-9.68L4.5 2.3Z" />
    <path d="m15.07 10.62 2.75-2.87L6.2 1.43l8.87 9.19Z" />
    <path d="m15.07 13.38-8.91 9.25 11.66-6.38-2.75-2.87Z" />
    <path d="m16.23 12 3.4 3.53c.77-.42 1.23-.67 1.32-.72.73-.4 1.15-.99 1.15-1.61s-.42-1.21-1.15-1.61c-.09-.05-.55-.3-1.32-.72L16.23 12Z" />
  </svg>
);

const AppleIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M16.33 1.6c.05 1.12-.41 2.22-1.16 3.03-.8.87-2.06 1.54-3.17 1.45-.08-1.08.43-2.22 1.18-3.01.83-.88 2.21-1.55 3.15-1.47Z" />
    <path d="M20.3 17.12c-.48 1.09-.7 1.58-1.31 2.54-.85 1.31-2.04 2.94-3.52 2.96-1.31.01-1.65-.86-3.44-.85-1.79.01-2.17.87-3.49.85-1.48-.02-2.61-1.49-3.46-2.8-2.37-3.66-2.62-7.95-1.16-10.23 1.04-1.62 2.68-2.57 4.22-2.57 1.57 0 2.55.86 3.85.86 1.26 0 2.03-.86 3.85-.86 1.37 0 2.83.75 3.86 2.04-3.39 1.86-2.84 6.7.6 8.06Z" />
  </svg>
);

const socialLinks = [
  { label: "LinkedIn", icon: LinkedinIcon },
  { label: "Instagram", icon: InstagramIcon },
  { label: "YouTube", icon: YoutubeIcon },
  { label: "Google Play", icon: GooglePlayIcon },
  { label: "App Store", icon: AppleIcon },
] as const;

const customerCarouselItems: CarouselItem[] = customers.map((title, id) => ({ id, title }));
const partnerCarouselItems: CarouselItem[] = partners.map((partner, id) => ({ id, ...partner }));

export default function TrustedCustomersSection() {
  return (
    <section id="trusted-customers" className="overflow-hidden pb-16 pt-8 text-[#102d50] sm:pb-20 sm:pt-10" style={{ backgroundColor: "#F7F8FA" }}>
      <h2 className={`${poppins.className} text-center text-[27px] font-black leading-[.98] tracking-[-.02em] text-[#2E2E38] md:text-[2.5rem]`}>
        Powered by top-tier partners
      </h2>
      <p className="mt-3 text-center text-[0.58rem] font-bold uppercase tracking-[0.24em] text-[#52769d]">
        Trusted by our customers
      </p>

      <RulerCarousel originalItems={customerCarouselItems} />

      <div className="mt-14 px-4 py-14 sm:px-6" style={{ backgroundColor: "#F7F8FA" }}>
        <p className="mx-auto max-w-[75rem] text-center text-base leading-8 text-[#2E2E38] sm:text-[1.05rem] sm:leading-8">
          Altira Group works with leading software brands and specialist platform partners to bring premium,<br />
          reliable solutions into one operating model for distribution, operations, automation and customer experience.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          {socialLinks.map(({ label, icon: Icon }) => (
            <a
              key={label}
              href="#"
              aria-label={label}
              className="relative grid size-11 place-items-center overflow-hidden rounded-[12px] border-[1.5px] border-[#F7F8FA] bg-[#37D8C6] text-white shadow-[0_8px_18px_rgba(17,22,61,0.18)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#2fc7b7] active:scale-[0.97]"
            >
              <Icon className="relative z-10 size-5 !text-white" />
              <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[repeating-conic-gradient(rgb(48,47,47)_0.0000001%,rgb(51,51,51)_0.000104%)_60%_60%/600%_600%] opacity-10 contrast-105" />
            </a>
          ))}
        </div>
      </div>

      <div className="pt-14">
        <p className="text-center text-[0.58rem] font-bold uppercase tracking-[0.24em] text-[#52769d]">
          Technology, carrier and channel partnerships
        </p>
        <RulerCarousel originalItems={partnerCarouselItems} />
      </div>
    </section>
  );
}
