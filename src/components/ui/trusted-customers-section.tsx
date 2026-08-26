import { RulerCarousel, type CarouselItem } from "@/components/ui/ruler-carousel";

const customers = [
  "Dept. of Mineral & Petroleum Resources",
  "Eastern Cape Dept. of Health",
  "Buffalo City Metro",
  "Northern Cape Dept. of Health",
  "Amatola Water",
  "PetroSA",
  "Eskom Holdings SOC",
  "SAHPRA",
] as const;

const partners = [
  { title: "VS Code", icon: "/partner-icons/vscode.svg" },
  { title: "Vercel", icon: "/partner-icons/vercel.svg", iconClassName: "brightness-0" },
  { title: "Supabase", icon: "/partner-icons/supabase.svg" },
  { title: "Stripe", icon: "/partner-icons/stripe.svg", hideTitle: true, iconClassName: "!size-11" },
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

const leadership = ["AN", "TM", "SK", "NM", "DK", "PN"] as const;

const customerCarouselItems: CarouselItem[] = customers.map((title, id) => ({ id, title }));
const partnerCarouselItems: CarouselItem[] = partners.map((partner, id) => ({ id, ...partner }));

export default function TrustedCustomersSection() {
  return (
    <section id="trusted-customers" className="overflow-hidden py-16 text-[#102d50] sm:py-20" style={{ backgroundColor: "#F7F8FA" }}>
      <p className="text-center text-[0.58rem] font-bold uppercase tracking-[0.24em] text-[#52769d]">
        Trusted by our customers
      </p>

      <RulerCarousel originalItems={customerCarouselItems} />

      <div className="mt-14 px-4 py-14 sm:px-6" style={{ backgroundColor: "#F7F8FA" }}>
        <div className="mx-auto flex max-w-[58rem] flex-col gap-6 rounded-2xl border border-[#d8e4f1] px-7 py-6 shadow-[0_20px_40px_rgba(24,59,94,0.08)] sm:flex-row sm:items-center sm:px-8" style={{ backgroundColor: "#F7F8FA" }}>
          <div className="flex -space-x-2.5">
            {leadership.map((person, index) => (
              <span
                key={person}
                className="flex size-10 items-center justify-center rounded-full border-2 border-white bg-[#173d65] text-[0.58rem] font-extrabold text-white shadow-sm"
                style={{ backgroundColor: ["#173d65", "#4c6d8f", "#2a8b98", "#86585f", "#203451", "#7089a6"][index] }}
              >
                {person}
              </span>
            ))}
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="text-sm font-extrabold tracking-[-0.03em] text-[#102d50] sm:text-base">
              Accountability carries a name here, never a shared inbox.
            </h2>
            <p className="mt-1 text-xs text-[#59799b]">
              Six principals hold the standard — from bid to build to acceptance.
            </p>
          </div>

          <a href="#contact" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-[#d8e4f1] px-5 py-3 text-xs font-extrabold text-[#102d50] transition-colors hover:border-[#37D8C6]">
            Meet the leadership <span aria-hidden="true">→</span>
          </a>
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
