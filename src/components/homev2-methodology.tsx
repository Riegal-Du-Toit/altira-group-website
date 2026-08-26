"use client";

import { Component } from "@/components/ui/connoisseur-stack-interactor";
import { poppins } from "@/lib/google-fonts";

const orbitItems = [
  { num: "01", name: "Configure", description: "We map Orbit to your product, pricing and compliance requirements.", clipId: "orbit-clip-process", image: "/configure.jfif" },
  { num: "02", name: "Integrate", description: "We connect Orbit to your underwriting, payments and admin systems.", clipId: "orbit-clip-integrate", image: "/intergrate.png" },
  { num: "03", name: "Launch", description: "Your customers get a fast, modern onboarding and sales journey — live in weeks, not months.", clipId: "orbit-clip-launch", image: "/launch.png" },
];

export function HomeV2Methodology() {
  return (
    <section id="method" className="w-full overflow-hidden rounded-b-[2rem] bg-white">
      <div className="mx-auto mt-0 grid max-w-7xl gap-8 px-8 pb-4 pt-6 text-[#2E2E38] md:grid-cols-[minmax(0,1.4fr)_minmax(18rem,0.75fr)] md:items-end md:px-24">
        <div>
          <span className="text-xs uppercase tracking-[.35em] text-[#2E2E38]/60">Altira Orbit</span>
          <h2 className={`${poppins.className} mt-3 max-w-4xl text-[27px] font-black uppercase leading-[.98] tracking-[-.02em] md:text-[2.5rem]`}>
            Orbit <span className="method-heading-separator">—</span> the engine behind our plug-and-play technology.
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-6 text-[#2E2E38]/72 md:text-base">
          Orbit powers faster onboarding, sales
          <br />
          and member engagement — configurable
          <br />
          for every partner, without bespoke builds.
        </p>
      </div>
      <Component className="!bg-[#E4E5EA] !pt-8 md:!pt-10" />
    </section>
  );
}
