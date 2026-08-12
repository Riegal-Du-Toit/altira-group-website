import Link from "next/link";

import { Button } from "@/components/ui/button";
import IntegrationsPrompt from "@/components/ui/integrations-5";

export default function IntegrationsSection() {
  return (
    <section id="integrations" className="section-spacing flex min-h-screen w-full items-center bg-[#1e2021] px-4 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-[1720px] items-center gap-12 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:gap-12 xl:gap-16">
        <div className="integrations-prompt-theme dark min-w-0">
          <IntegrationsPrompt />
        </div>

        <div className="max-w-[46rem]">
          <h2 className="bright-section-heading landing-title text-balance text-[3.4rem] md:text-[4.6rem] lg:text-[5.35rem]">
            Integrate with your <span className="heading-accent">favorite tools</span>
          </h2>
          <p className="landing-copy section-copy-gap max-w-[42rem] text-[1.22rem] leading-8 md:text-[1.36rem] md:leading-9">
            Connect seamlessly with popular platforms and services to enhance your workflow.
          </p>

          <Button
            variant="outline"
            size="sm"
            className="mt-11 h-14 border-white/14 bg-[#2f333b] px-10 text-lg text-white hover:bg-[#3a4048] hover:text-white"
            asChild
          >
            <Link href="https://cdn.21st.dev/meschacirung/integrations-5/default/bundle.1783659514828.html?theme=light#">
              Get Started
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
