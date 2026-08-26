import { openSansThin } from "@/lib/google-fonts";
import type { ReactNode } from "react";

export function TalkButton({ href = "/contact", children = "TALK TO US" }: { href?: string; children?: ReactNode }) {
  return (
    <a href={href} className={`relative inline-flex items-stretch overflow-hidden rounded-[12px] border-[1.5px] border-[#F7F8FA] bg-[#37D8C6] p-0 text-[16px] font-bold text-white shadow-[0_8px_18px_rgba(17,22,61,0.18)] transition-all duration-300 ease-out hover:bg-[#2fc7b7] active:scale-[0.97] ${openSansThin.className}`}>
      <span className="relative flex items-center gap-1.5 rounded-[10px] bg-white/10 px-[1.05em] py-[0.64em] pr-[0.95em] text-[0.8rem] font-light text-inherit transition-colors duration-300 sm:text-[0.88rem]">
        <span>{children}</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 53 58" height="58" width="53" className="h-3.5 w-3.5"><path stroke="#fff" strokeWidth="6" d="M44.25 36.3612L17.25 51.9497C11.5833 55.2213 4.5 51.1318 4.50001 44.5885L4.50001 13.4115C4.50001 6.86824 11.5833 2.77868 17.25 6.05033L44.25 21.6388C49.9167 24.9104 49.9167 33.0896 44.25 36.3612Z" /></svg>
      </span>
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[repeating-conic-gradient(rgb(48,47,47)_0.0000001%,rgb(51,51,51)_0.000104%)_60%_60%/600%_600%] opacity-10 contrast-105" />
    </a>
  );
}
