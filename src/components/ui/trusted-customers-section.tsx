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

const socialLinks = [
  { label: "LinkedIn", icon: LinkedinIcon },
  { label: "Instagram", icon: InstagramIcon },
  { label: "YouTube", icon: YoutubeIcon },
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
              className="relative grid size-11 place-items-center overflow-hidden rounded-[12px] border-[1.5px] border-[#F7F8FA] bg-white text-[#5B5CEB] shadow-[0_8px_18px_rgba(17,22,61,0.18)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-white active:scale-[0.97]"
            >
              <Icon className="relative z-10 size-5 !text-[#5B5CEB]" />
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
