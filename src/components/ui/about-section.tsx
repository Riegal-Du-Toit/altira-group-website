"use client";

import BentoMonochrome from "@/components/ui/bento-monochrome";
import { LampBeam } from "@/components/ui/lamp";

export default function AboutSection3() {
  return (
    <div className="homev2-dark-section overflow-hidden bg-[#F7F8FA] text-[#2E2E38]">
      <LampBeam
        className="-mt-[10px] bg-[radial-gradient(ellipse_at_50%_0%,rgba(55,216,198,0.34)_0%,rgba(247,248,250,0.88)_38%,#F7F8FA_74%)]"
        contentClassName="mx-auto max-w-6xl px-6 pb-16 sm:px-8 lg:px-12"
      >
        <div className="-mt-48">
          <BentoMonochrome />
        </div>
      </LampBeam>
    </div>
  );
}
