import { TalkButton } from "@/components/ui/talk-button";
import IntegrationsPrompt from "@/components/ui/integrations-5";

export default function IntegrationsSection() {
  return (
    <section id="integrations" className="section-spacing flex min-h-screen w-full items-center !bg-[#F7F8FA] px-6 text-white sm:px-8 lg:px-14">
      <div className="mx-auto grid w-full max-w-[1380px] items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,0.95fr)] lg:gap-12 xl:gap-14">
        <div className="integrations-prompt-theme dark min-w-0 lg:translate-x-8">
          <IntegrationsPrompt />
        </div>

        <div className="max-w-[46rem] lg:pl-8">
          <h2 className="bright-section-heading landing-title text-balance text-[2.75rem] md:text-[3.65rem] xl:text-[4rem]">
            Powered by <span className="heading-accent">top-tier partners</span>
          </h2>
          <p className="landing-copy section-copy-gap max-w-[42rem] text-[1.22rem] leading-8 md:text-[1.36rem] md:leading-9">
            Altira Group works with leading software brands and specialist platform partners to
            bring premium, reliable solutions into one operating model for distribution,
            operations, automation and customer experience.
          </p>

          <div className="mt-11">
            <TalkButton href="https://cdn.21st.dev/meschacirung/integrations-5/default/bundle.1783659514828.html?theme=light#">Explore our partners</TalkButton>
          </div>
        </div>
      </div>
    </section>
  );
}
