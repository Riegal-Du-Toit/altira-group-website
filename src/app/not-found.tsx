import Image from "next/image";
import Link from "next/link";

import { TalkButton } from "@/components/ui/talk-button";

export default function NotFoundPage() {
  return (
    <main className="min-h-screen bg-[#F7F8FA] text-[#2E2E38]">
      <section className="relative flex min-h-[100svh] items-center overflow-hidden px-6 py-20 sm:px-10 lg:px-16">
        <div className="absolute right-[-12rem] top-[-10rem] h-[34rem] w-[34rem] rounded-full border border-[#37D8C6]/30" aria-hidden="true" />
        <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(280px,0.55fr)]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <Image src="/logo.png" alt="Altira Group" width={218} height={72} className="h-auto w-44" priority />
            </Link>
            <p className="mt-16 text-sm font-bold uppercase tracking-[0.36em] text-[#37D8C6]">404</p>
            <h1 className="mt-4 max-w-3xl text-[clamp(3.4rem,9vw,8rem)] font-black uppercase leading-[0.86] tracking-normal">
              Page not found.
            </h1>
            <p className="mt-8 max-w-xl text-base leading-7 text-[#2E2E38]/62 sm:text-lg">
              The page moved, was renamed, or does not exist. Return home or book a quick conversation with Altira Group.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link href="/" className="inline-flex min-h-11 items-center rounded-[12px] border border-[#2E2E38]/15 bg-[#2E2E38] px-5 text-sm font-bold text-white transition hover:bg-[#23232b]">
                Back home
              </Link>
              <TalkButton href="/#talk-to-us" />
            </div>
          </div>
          <div className="relative mx-auto aspect-square w-full max-w-[24rem]">
            <div className="absolute inset-0 rounded-full bg-[#37D8C6]/12" />
            <Image src="/favicon.png" alt="" width={360} height={360} className="absolute inset-[18%] h-auto w-[64%] object-contain" priority />
          </div>
        </div>
      </section>
    </main>
  );
}
