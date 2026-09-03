"use client";

import { cn } from "@/lib/utils";
import { poppins } from "@/lib/google-fonts";
import Link from "next/link";
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap";
import { TalkButton } from "@/components/ui/talk-button";
import { ArrowRight } from "lucide-react";

interface MenuItem {
  num: string;
  name: string;
  description?: string;
  clipId: string;
  image: string;
}

const defaultItems: MenuItem[] = [
  { num: "01", name: "Configure", description: "We map Orbit to your product, pricing and compliance requirements.", clipId: "clip-configure", image: "/configure.jfif" },
  { num: "02", name: "Integrate", description: "We connect Orbit to your underwriting, payments and admin systems.", clipId: "clip-hexagons", image: "/intergrate.jfif" },
  { num: "03", name: "Launch", description: "Your customers get a fast, modern onboarding and sales journey — live in weeks, not months.", clipId: "clip-pixels", image: "/launch.jfif" },
];

const configureShapes = [[15, 15, 210, 150], [235, 15, 250, 150], [15, 175, 130, 150], [155, 175, 170, 150], [335, 175, 150, 150], [15, 335, 310, 150], [335, 335, 150, 150]] as const;
const launchShapes = [[15, 100, 155, 55], [180, 100, 140, 55], [330, 100, 155, 55], [15, 165, 155, 140], [180, 165, 140, 140], [330, 165, 155, 140], [15, 315, 155, 55], [180, 315, 140, 55], [330, 315, 155, 55]] as const;
const clipShapeCounts: Record<string, number> = { "clip-original": 5, "clip-configure": configureShapes.length, "clip-hexagons": 6, "clip-pixels": launchShapes.length };

export const Component = ({ items = defaultItems, className }: { items?: MenuItem[]; className?: string }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTextHovered, setIsTextHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const masterTl = useRef<gsap.core.Timeline | null>(null);
  const imagePreloadsRef = useRef<HTMLImageElement[]>([]);

  const createLoop = (index: number) => {
    const item = items[index];
    if (masterTl.current) masterTl.current.kill();
    const allLayers = Array.from(containerRef.current?.querySelectorAll<SVGGElement>(".shape-layer") ?? []);
    const activeLayers = allLayers.filter((layer) => layer.dataset.clipId === item.clipId);
    allLayers.forEach((layer) => layer.querySelector("image")?.setAttribute("href", item.image));
    gsap.set(allLayers, { autoAlpha: 0 });
    gsap.set(activeLayers, { autoAlpha: 0, scale: 0.92, transformOrigin: "50% 50%", force3D: true });

    const tl = gsap.timeline();
    tl.to(activeLayers, { autoAlpha: 1, scale: 1, duration: 0.55, stagger: { each: 0.06, from: "center" }, ease: "power3.out", force3D: true });
    masterTl.current = tl;
  };

  useLayoutEffect(() => {
    let cancelled = false;
    let started = false;
    const initialImage = new Image();
    const start = () => {
      if (started) return;
      started = true;
      void initialImage.decode().catch(() => undefined).finally(() => {
        if (!cancelled) createLoop(0);
      });
    };

    initialImage.onload = start;
    initialImage.onerror = start;
    initialImage.src = items[0].image;
    if (initialImage.complete) start();

    imagePreloadsRef.current = items.slice(1).map((item) => {
      const image = new Image();
      image.decoding = "async";
      image.src = item.image;
      return image;
    });

    return () => {
      cancelled = true;
      masterTl.current?.kill();
    };
  }, []);

  const handleItemHover = (index: number) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
    createLoop(index);
  };

  useEffect(() => {
    if (isTextHovered || items.length < 2) return;

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => {
        const next = (current + 1) % items.length;
        createLoop(next);
        return next;
      });
    }, 4000);

    return () => window.clearInterval(intervalId);
  }, [isTextHovered, items.length]);

  return (
    <div ref={containerRef} className={cn("flex w-full flex-col items-center justify-between overflow-hidden px-8 pb-8 pt-8 transition-colors duration-500 md:flex-row md:px-24 md:pb-10 md:pt-24", "bg-white dark:bg-[#050505]", className)}>
      <div className="z-20 w-full md:w-1/2">
        <nav onMouseLeave={() => setIsTextHovered(false)}><ul className="flex flex-col gap-14">
          {items.map((item, index) => (
            <li key={item.num} onMouseEnter={() => { setIsTextHovered(true); handleItemHover(index); }} className="group cursor-pointer">
              <div className="flex items-start gap-6">
                <div className={cn("method-step-counter transition-transform duration-500", activeIndex === index ? "scale-110" : "")}>{item.num}</div>
                <div>
                  <h2 className={cn(poppins.className, "text-5xl font-extrabold uppercase leading-[0.98] tracking-[-0.045em] transition-all duration-700 md:text-6xl", activeIndex === index ? "text-zinc-950 dark:text-white opacity-100 translate-x-4" : "opacity-40 translate-x-0 text-zinc-500 dark:text-transparent dark:[text-stroke:1.5px_#52525b] dark:[-webkit-text-stroke:1.5px_#52525b]")}>{item.name}</h2>
                  {activeIndex === index && item.description ? (
                    <>
                      <p className="mt-3 max-w-sm text-sm leading-6 text-zinc-600">{item.description}</p>
                      {item.name === "Launch" ? (
                        <div className="mt-5 flex flex-wrap gap-3">
                          <Link
                            href="/orbit"
                            className="relative inline-flex items-stretch overflow-hidden rounded-[12px] border-[1.5px] border-[#37D8C6] !bg-[#E4E5EA] p-0 opacity-100 text-[16px] font-bold text-[#2E2E38] shadow-[0_10px_28px_rgba(17,22,61,0.14)] transition-all duration-300 ease-out hover:!bg-[#E4E5EA] hover:shadow-[0_12px_30px_rgba(17,22,61,0.2)] active:scale-[0.97]"
                          >
                            <span className="relative flex items-center gap-1.5 rounded-[10px] !bg-[#E4E5EA] px-[1.05em] py-[0.64em] pr-[0.95em] text-[0.8rem] font-light uppercase tracking-[0.12em] text-inherit transition-colors duration-300 sm:text-[0.88rem]">
                              Explore Orbit <ArrowRight className="size-3.5 text-[#37D8C6]" />
                            </span>
                          </Link>
                          <TalkButton>BOOK A DEMO</TalkButton>
                        </div>
                      ) : null}
                    </>
                  ) : null}
                </div>
              </div>
            </li>
          ))}
        </ul></nav>
      </div>

      <div className="relative w-full md:w-1/2 flex justify-center items-center mt-16 md:mt-0">
        <svg viewBox="0 0 500 500" className="h-auto w-full max-w-[505px] z-10 drop-shadow-xl dark:drop-shadow-[0_0_60px_rgba(0,0,0,0.8)]">
          <defs>
            <clipPath id="clip-original">
              <path className="path" d="M480.6,235H19.4c-6,0-10.8-4.9-10.8-10.8v-9.5c0-6,4.9-10.8,10.8-10.8h461.1c6,0,10.8,4.9,10.8,10.8v9.5C491.4,230.2,486.6,235,480.6,235z" />
              <path className="path" d="M483.1,362.4H16.9c-4.6,0-8.3-3.7-8.3-8.3v-1.8c0-4.6,3.7-8.3,8.3-8.3h466.1c4.6,0,8.3,3.7,8.3,8.3v1.8C491.4,358.7,487.7,362.4,483.1,362.4z" />
              <path className="path" d="M460.3,336.3H39.7c-17.2,0-31.1-13.9-31.1-31.1v-31.5c0-17.2,13.9-31.1,31.1-31.1h420.7c17.2,0,31.1,13.9,31.1,31.1v31.5C491.4,322.4,477.5,336.3,460.3,336.3z" />
              <path className="path" d="M459.2,196.2H40.8v-35c0-47.5,38.5-86,86-86h246.5c47.5,0,86,38.5,86,86V196.2z" />
              <path className="path" d="M441.9,424.9H58.1c-9.6,0-17.3-7.8-17.3-17.3v-37.4h418.5v37.4C459.2,417.1,451.5,424.9,441.9,424.9z" />
            </clipPath>
            <clipPath id="clip-hexagons">
              <rect className="path" x="15" y="15" width="210" height="290" rx="12" /><rect className="path" x="15" y="315" width="210" height="170" rx="12" /><rect className="path" x="235" y="15" width="250" height="150" rx="12" /><rect className="path" x="235" y="175" width="120" height="160" rx="12" /><rect className="path" x="365" y="175" width="120" height="160" rx="12" /><rect className="path" x="235" y="345" width="250" height="140" rx="12" />
            </clipPath>
            <clipPath id="clip-pixels">
              {launchShapes.map(([x, y, width, height], i) => <rect key={i} className="path" x={x} y={y} width={width} height={height} rx="4" />)}
            </clipPath>
            <clipPath id="clip-configure">
              {configureShapes.map(([x, y, width, height], i) => <rect key={i} x={x} y={y} width={width} height={height} rx="12" />)}
            </clipPath>
            <clipPath id="clip-original-0"><path d="M480.6,235H19.4c-6,0-10.8-4.9-10.8-10.8v-9.5c0-6,4.9-10.8,10.8-10.8h461.1c6,0,10.8,4.9,10.8,10.8v9.5C491.4,230.2,486.6,235,480.6,235z" /></clipPath>
            <clipPath id="clip-original-1"><path d="M483.1,362.4H16.9c-4.6,0-8.3-3.7-8.3-8.3v-1.8c0-4.6,3.7-8.3,8.3-8.3h466.1c4.6,0,8.3,3.7,8.3,8.3v1.8C491.4,358.7,487.7,362.4,483.1,362.4z" /></clipPath>
            <clipPath id="clip-original-2"><path d="M460.3,336.3H39.7c-17.2,0-31.1-13.9-31.1-31.1v-31.5c0-17.2,13.9-31.1,31.1-31.1h420.7c17.2,0,31.1,13.9,31.1,31.1v31.5C491.4,322.4,477.5,336.3,460.3,336.3z" /></clipPath>
            <clipPath id="clip-original-3"><path d="M459.2,196.2H40.8v-35c0-47.5,38.5-86,86-86h246.5c47.5,0,86,38.5,86,86V196.2z" /></clipPath>
            <clipPath id="clip-original-4"><path d="M441.9,424.9H58.1c-9.6,0-17.3-7.8-17.3-17.3v-37.4h418.5v37.4C459.2,417.1,451.5,424.9,441.9,424.9z" /></clipPath>
            {[[15,15,210,290],[15,315,210,170],[235,15,250,150],[235,175,120,160],[365,175,120,160],[235,345,250,140]].map(([x,y,width,height], i) => <clipPath key={i} id={`clip-hexagons-${i}`}><rect x={x} y={y} width={width} height={height} rx="12" /></clipPath>)}
            {launchShapes.map(([x, y, width, height], i) => <clipPath key={i} id={`clip-pixels-${i}`}><rect x={x} y={y} width={width} height={height} rx="4" /></clipPath>)}
            {configureShapes.map(([x, y, width, height], i) => <clipPath key={i} id={`clip-configure-${i}`}><rect x={x} y={y} width={width} height={height} rx="12" /></clipPath>)}
          </defs>
          {items.flatMap((item) => Array.from({ length: clipShapeCounts[item.clipId] ?? 0 }, (_, index) => (
            <g key={`${item.clipId}-${index}`} className="shape-layer" data-clip-id={item.clipId} clipPath={`url(#${item.clipId}-${index})`}>
              <image width="500" height="500" preserveAspectRatio="xMidYMid meet" />
            </g>
          )))}
        </svg>
      </div>
    </div>
  );
};
