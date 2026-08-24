"use client";

import BentoMonochrome from "@/components/ui/bento-monochrome";
import { LampBeam } from "@/components/ui/lamp";

export default function AboutSection3() {
  return (
    <div className="bg-[#E4E5EA] text-[#2E2E38]">
      <LampBeam className="-mt-[10px]" contentClassName="mx-auto max-w-6xl px-6 pb-16 sm:px-8 lg:px-12">
        <div className="-mt-24">
          <BentoMonochrome />
        </div>
      </LampBeam>
    </div>
  );
}
