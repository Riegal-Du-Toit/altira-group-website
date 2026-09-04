"use client";

import { Center, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion, type MotionValue, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import type { Group } from "three";
import { poppins } from "@/lib/google-fonts";

interface Product {
  number: string;
  title: string;
  description: string;
  detail?: string;
  image: string;
  imageAlt: string;
}

const products: readonly Product[] = [
  {
    number: "01",
    title: "UX & Process Redesign",
    description:
      "We analyse your existing onboarding or sales process and rebuild it for higher conversion and lower drop-off.",
    image: "/UX%20%26%20Process%20Redesign.png",
    imageAlt: "Code on a screen overlayed with creative particles",
  },
  {
    number: "02",
    title: "Plug-and-Play Distribution Technology",
    description:
      "Our existing onboarding and sales engine can be configured for any insurance or lending product, cutting build time from months to weeks.",
    image: "/Plug-and-Play%20Distribution%20Technology.png",
    imageAlt: "Developer coding on a laptop in a modern workspace",
  },
  {
    number: "03",
    title: "Customer App Development",
    description:
      "We design and build the member-facing app your customers use to onboard, transact, and stay engaged.",
    image: "/Customer%20App%20Development.png",
    imageAlt: "Team meeting around a table brainstorming ideas",
  },
  {
    number: "04",
    title: "Smart DMS",
    description:
      "A live Microsoft Marketplace platform for governed approvals, configured inside your own Microsoft tenant. It unifies submissions, memos, leave, records, invoices, recruitment, attendance, bids and quotes on one traceable case record, with audit trails and delegation controls built in.",
    image: "/configure.png",
    imageAlt: "Enterprise workflow platform interface",
  },
];

const certifications = [
  { standard: "ISO/IEC 27001:2022", status: "Supabase", icon: "/partner-icons/supabase.svg" },
  { standard: "ISO 27001:2022", status: "Netcash", icon: "/partner-icons/netcash.png" },
  { standard: "ISO 27001", status: "Q LINK", icon: "/partner-icons/q%20link.png" },
] as const;

const certificationHighlights = [
  ["Built on certified infrastructure", "Supabase ISO/IEC 27001:2022 and SOC 2 Type 2"],
  ["Active payment path", "Netcash ISO 27001:2022 and PCI DSS"],
  ["Premium collections", "QSURE FSP 50552"],
  ["Payments, payroll & collections", "Q LINK ISO 27001 accredited"],
  ["Insurance and lending", "configurable onboarding and sales technology"],
  ["Customer apps", "onboarding, transactions, and engagement"],
  ["B-BBEE", "Level [1–8] Contributor"],
] as const;

function TimelineFaviconModel() {
  const { scene } = useGLTF("/base_basic_shaded.glb");
  const model = useMemo(() => scene.clone(true), [scene]);
  const groupRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y -= delta * 0.75;
  });

  useEffect(() => {
    return () => {
      model.traverse((object) => {
        object.matrixWorldNeedsUpdate = false;
      });
    };
  }, [model]);

  return (
    <Center>
      <group ref={groupRef} rotation={[0.05, -0.25, 0]}>
        <primitive object={model} scale={1.65} />
      </group>
    </Center>
  );
}

useGLTF.preload("/base_basic_shaded.glb");

export default function ProductDepthScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const [showCertificationBanner, setShowCertificationBanner] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setShowCertificationBanner((current) => {
      const next = value >= 0.995;
      return current === next ? current : next;
    });
  });

  return (
    <section ref={sectionRef} id="products" className="relative h-[520vh] bg-[#1e2021]">
      <div className="sticky top-0 h-screen overflow-hidden bg-[radial-gradient(circle_at_50%_52%,rgba(63,233,236,0.045),transparent_38%)]">
        <header className="absolute inset-x-0 top-[50px] z-50 mx-auto w-[min(90vw,76rem)] translate-x-[44px] text-white">
          <span className="text-[0.78125rem] uppercase tracking-[.35em] text-white/56">What We Do</span>
        </header>

        <div
          className="absolute inset-0 z-[60]"
          style={{ perspective: "1400px", transformStyle: "preserve-3d" }}
        >
          {products.map((product, index) => (
            <DepthCard
              key={product.title}
              index={index}
              progress={scrollYProgress}
              product={product}
              showCertificationCards={!showCertificationBanner}
            />
          ))}
        </div>

        <ProgressScroller progress={scrollYProgress} />
      </div>
      <CertificationBanner visible={showCertificationBanner} />
    </section>
  );
}

function DepthCard({
  index,
  progress,
  product,
  showCertificationCards,
}: {
  index: number;
  progress: MotionValue<number>;
  product: (typeof products)[number];
  showCertificationCards: boolean;
}) {
  const isFirst = index === 0;
  const isLast = index === products.length - 1;
  const segment = 1 / products.length;
  const enterStart = Math.max(0, index * segment - segment * 0.38);
  const activeStart = index * segment;
  const activeEnd = Math.min(1, (index + 1) * segment - segment * 0.18);
  const exitEnd = Math.min(1, (index + 1) * segment + segment * 0.28);
  const inputRange = isFirst
    ? [0, activeEnd, exitEnd]
    : [enterStart, activeStart, activeEnd, exitEnd];
  const zRange = isFirst ? [0, 0, 520] : [-1100, 0, 0, isLast ? 0 : 520];
  const scaleRange = isFirst ? [1, 1, 1.16] : [0.42, 1, 1, isLast ? 1 : 1.16];
  const yRange = isFirst ? [0, 0, -820] : [230, 0, 0, isLast ? 0 : -820];
  const opacityInputRange = isFirst
    ? inputRange
    : [enterStart, activeStart, activeEnd, exitEnd];
  const opacityRange = isFirst ? [1, 1, 1] : [0, 1, 1, 1];
  const rotateRange = isFirst ? [0, 0, -8] : [12, 0, 0, isLast ? 0 : -8];

  const z = useTransform(progress, inputRange, zRange);
  const scale = useTransform(progress, inputRange, scaleRange);
  const y = useTransform(progress, inputRange, yRange);
  const opacity = useTransform(progress, opacityInputRange, opacityRange);
  const rotateX = useTransform(progress, inputRange, rotateRange);
  const compactTitle = product.title.length > 24;

  return (
    <motion.article
      aria-label={product.title}
      style={{
        z,
        y,
        scale,
        opacity,
        rotateX,
        x: "-50%",
        zIndex: products.length - index,
        transformStyle: "preserve-3d",
      }}
      className="absolute left-[calc(45%+15px)] top-[calc(clamp(4.6rem,11vh,5.875rem)+23px)] flex max-h-[calc(100vh-9.7rem)] w-[min(75vw,64rem)] flex-col"
    >
      <div className="grid min-h-0 flex-1 grid-rows-[1.15fr_0.85fr] overflow-hidden rounded-[1.15rem] bg-[#F7F8FA] ring-[2.5px] ring-[#37D8C6] md:grid-cols-[0.72fr_1.28fr] md:grid-rows-1">
        <div className="relative z-10 flex min-h-0 flex-col justify-between border-b-2 border-[#37D8C6] bg-[#F7F8FA] p-[clamp(1.25rem,2.5vw,3rem)] text-neutral-900 md:border-r-2 md:border-b-0">
          <div className="flex items-center justify-between gap-5">
            <div className="inline-flex rounded-lg bg-[#37D8C6] px-[6px] py-1 text-[2.5rem] font-bold leading-none tracking-[-0.04em] !text-white">
              {product.number}
            </div>
            <span className={`${poppins.className} text-[0.7125rem] font-semibold uppercase tracking-[0.18em] text-neutral-500`}>
              Altira Group
            </span>
          </div>

          <div className="py-5">
            <div className="mb-5 h-0.5 w-14 bg-[#37D8C6]" />
            <h3 className={`max-w-[12ch] text-[clamp(1.8rem,3.9vw,3.25rem)] font-extrabold leading-[0.98] tracking-[-0.045em] text-neutral-900 ${product.number === "04" || compactTitle ? "lg:text-[clamp(2rem,3.1vw,3rem)]" : ""}`}>
              {product.title === "Plug-and-Play Distribution Technology" ? (
                <>Plug<span className="relative -top-[0.08em] inline-block text-[0.62em] font-medium leading-none">-and-</span>Play Distribution Technology</>
              ) : product.title}
            </h3>
            <p className={`mt-[clamp(0.8rem,1.5vw,1.25rem)] max-w-[37rem] text-[clamp(0.85rem,1.25vw,1rem)] text-neutral-600 ${product.number === "04" ? "leading-6" : "leading-7"}`}>
              {product.description}
            </p>
            {product.detail ? (
              <p className={`hidden max-w-[35rem] border-l-2 border-[#37D8C6]/70 pl-4 text-sm text-neutral-500 sm:block ${product.number === "04" ? "mt-4 leading-6" : "mt-5 leading-7"}`}>
                {product.detail}
              </p>
            ) : null}
          </div>

        </div>

        <div className="relative min-h-0 overflow-hidden bg-[#1d1f20]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.imageAlt}
            className="absolute inset-0 h-full w-full object-cover grayscale-[55%] saturate-[0.55] contrast-[1.08]"
            draggable={false}
          />
        </div>
      </div>

      {showCertificationCards ? (
        <div className="mt-[clamp(0.5rem,1.2vh,1rem)] grid shrink-0 grid-cols-3 gap-3">
          {certifications.map((certification) => (
            <div
              key={certification.standard}
              className="group relative flex min-h-[clamp(3.45rem,8vh,4.75rem)] overflow-hidden rounded-[12px] border border-[#37D8C6]/65 bg-white/92 px-[clamp(0.8rem,1.4vw,1.25rem)] py-[clamp(0.6rem,1.3vh,1rem)] text-left shadow-[0_12px_28px_rgba(25,28,37,0.08)] backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-[#37D8C6] hover:shadow-[0_16px_34px_rgba(55,216,198,0.18)]"
            >
              <span aria-hidden="true" className="absolute inset-y-3 left-0 w-1 rounded-r-full bg-[#37D8C6]" />
              <span aria-hidden="true" className="mr-4 grid size-[41px] shrink-0 place-items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={certification.icon} alt="" className="max-h-[25px] max-w-[33px] object-contain" />
              </span>
              <span className="flex min-w-0 flex-1 items-center justify-between gap-4">
                <span className="text-sm font-extrabold leading-tight tracking-[-0.02em] text-neutral-950">
                  {certification.standard}
                </span>
                <span className="shrink-0 text-[18px] font-extrabold leading-tight tracking-[-0.02em] text-[#159D90]">
                  {certification.status}
                </span>
              </span>
            </div>
          ))}
        </div>
      ) : null}

    </motion.article>
  );
}

function CertificationBanner({ visible }: { visible: boolean }) {
  return (
    <div className={`certification-ticker-shell absolute inset-x-0 bottom-0 z-[70] overflow-hidden border-y border-[#37D8C6]/70 bg-[#F7F8FA] text-neutral-900 shadow-[0_-18px_50px_rgba(17,22,61,0.12)] transition-opacity duration-300 ${visible ? "opacity-100" : "pointer-events-none opacity-0"}`}>
      <div className="certification-ticker-track flex min-h-[4.8rem] w-max items-center gap-3 whitespace-nowrap py-3">
        {[...certificationHighlights, ...certificationHighlights].map(([title, detail], index) => (
          <div key={`${title}-${index}`} className="certification-ticker-pill group flex min-h-12 shrink-0 items-center gap-3 rounded-[12px] border border-[#37D8C6]/55 bg-white/88 px-5 py-2.5 text-xs leading-none shadow-[0_10px_26px_rgba(17,22,61,0.08)] backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-[#37D8C6] hover:shadow-[0_14px_30px_rgba(55,216,198,0.18)] sm:text-sm">
            <span aria-hidden="true" className="grid size-7 shrink-0 place-items-center rounded-[9px] bg-[#37D8C6] text-white shadow-[0_8px_18px_rgba(55,216,198,0.35)]">
              <span className="size-2 rounded-full bg-white" />
            </span>
            <span className="font-extrabold tracking-[-0.02em] text-neutral-950">{title}</span>
            <span className="h-4 w-px bg-neutral-200" />
            <span className="font-semibold text-neutral-500">{detail}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProgressScroller({ progress }: { progress: MotionValue<number> }) {
  const scaleY = useTransform(progress, [0, 1], [0, 1]);
  const dotY = useTransform(progress, [0, 1], ["0vh", "40vh"]);

  return (
    <div className="absolute right-[calc(5vw-35px)] top-1/2 z-[70] hidden h-[40vh] w-44 -translate-y-1/2 lg:block">
      <div className="absolute inset-y-0 right-0 w-px bg-[linear-gradient(to_bottom,transparent,rgba(255,255,255,.28)_10%,rgba(255,255,255,.28)_90%,transparent)]" />
      <motion.div
        style={{ scaleY }}
        className="absolute inset-y-0 right-0 w-0.5 origin-top rounded-full bg-[#37D8C6] will-change-transform"
      />
      <motion.div
        style={{ y: dotY }}
        className="absolute right-0 top-0 size-8 translate-x-1/2 -translate-y-2 will-change-transform"
      >
        <Canvas
          camera={{ position: [0, 0, 5], fov: 38 }}
          dpr={[1, 2]}
          gl={{ alpha: true, antialias: true }}
        >
          <ambientLight intensity={1.45} />
          <directionalLight position={[3, 4, 5]} intensity={2.2} />
          <Suspense fallback={null}>
            <TimelineFaviconModel />
          </Suspense>
        </Canvas>
      </motion.div>
      {products.map((product, index) => (
        <span
          key={product.title}
          style={{ top: `${(index / (products.length - 1)) * 100}%` }}
          className="absolute right-5 -translate-y-1/2 text-right text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-white/58"
        >
          {product.title === "UX & Process Redesign" ? (
            <>UI / UX Process<br />Redesign</>
          ) : product.title === "Smart DMS" ? (
            <>Smart<br />DMS</>
          ) : product.title}
        </span>
      ))}
    </div>
  );
}
