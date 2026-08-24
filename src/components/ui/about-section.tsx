"use client";

import BentoMonochrome from "@/components/ui/bento-monochrome";
import { LampBeam } from "@/components/ui/lamp";

export default function AboutSection3() {
  return (
    <div className="homev2-dark-section overflow-hidden bg-[#1E2021] text-white">
      <LampBeam className="-mt-[10px]" contentClassName="mx-auto max-w-6xl px-6 pb-16 sm:px-8 lg:px-12">
        <div className="-mt-48">
          <BentoMonochrome />
        </div>
      </LampBeam>
    </div>
  );
}
