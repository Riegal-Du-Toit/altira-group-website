"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const lampRevealTransition = {
  delay: 0,
  duration: 1.05,
  ease: [0.22, 1, 0.36, 1] as const,
};

export function LampDemo() {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        Build lamps <br /> the right way
      </motion.h1>
    </LampContainer>
  );
}

export function LampBeam({
  children,
  className,
  contentClassName,
}: {
  children?: React.ReactNode;
  className?: string;
  contentClassName?: string;
}) {
  return (
    <div
      className={cn(
        "relative z-0 flex min-h-[34rem] w-full flex-col items-center justify-start overflow-visible",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-[20px] flex h-[18rem] scale-y-125 items-center justify-center isolate z-0"
        aria-hidden="true"
      >
        <motion.div
          initial={{ opacity: 0.5, scaleX: 0.5 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={lampRevealTransition}
          style={{
            backgroundImage:
              "conic-gradient(from 70deg at center top, rgb(6 182 212), transparent, transparent)",
          }}
          className="absolute inset-auto right-1/2 h-56 w-[50rem] origin-right overflow-visible will-change-transform [mask-image:linear-gradient(to_right,transparent_0%,black_26%,black_100%)]"
        >
          <div className="absolute bottom-0 left-0 z-20 h-40 w-full bg-[#1E2021] [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute bottom-0 left-0 z-20 h-full w-40 bg-[#1E2021] [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0.5, scaleX: 0.5 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={lampRevealTransition}
          style={{
            backgroundImage:
              "conic-gradient(from 290deg at center top, transparent, transparent, rgb(6 182 212))",
          }}
          className="absolute inset-auto left-1/2 h-56 w-[50rem] origin-left will-change-transform [mask-image:linear-gradient(to_left,transparent_0%,black_26%,black_100%)]"
        >
          <div className="absolute bottom-0 right-0 z-20 h-full w-40 bg-[#1E2021] [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute bottom-0 right-0 z-20 h-40 w-full bg-[#1E2021] [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-[#1E2021] blur-2xl" />
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md" />
        <div className="absolute inset-auto z-50 h-36 w-[62rem] -translate-y-1/2 rounded-full bg-cyan-500 opacity-50 blur-3xl" />
        <motion.div
          initial={{ scaleX: 0.5 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={lampRevealTransition}
          className="absolute inset-auto z-30 h-36 w-[50rem] -translate-y-[6rem] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.82)_0%,rgba(34,211,238,0.48)_34%,rgba(34,211,238,0.18)_62%,transparent_82%)] blur-2xl will-change-transform"
        />
        <motion.div
          initial={{ scaleX: 0.5 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={lampRevealTransition}
          className="absolute inset-auto z-50 h-0.5 w-[50rem] -translate-y-[7rem] bg-cyan-400 will-change-transform"
        />
        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-[#1E2021]" />
      </div>
      {children ? (
        <motion.div
          initial={{ opacity: 0.85, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.05 }}
          transition={{
            delay: 0,
            duration: 0.32,
            ease: "easeOut",
          }}
          className={cn("relative z-50 mt-[11.75rem] w-full will-change-transform", contentClassName)}
        >
          {children}
        </motion.div>
      ) : null}
    </div>
  );
}

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 w-full rounded-md z-0",
        className,
      )}
    >
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0">
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic from-cyan-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute w-[100%] left-0 bg-slate-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute w-40 h-[100%] left-0 bg-slate-950 bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-cyan-500 text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute w-40 h-[100%] right-0 bg-slate-950 bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute w-[100%] right-0 bg-slate-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-slate-950 blur-2xl" />
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md" />
        <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-cyan-500 opacity-50 blur-3xl" />
        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "16rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-cyan-400 blur-2xl"
        />
        <motion.div
          initial={{ width: "15rem" }}
          whileInView={{ width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] bg-cyan-400"
        />
        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-slate-950" />
      </div>
      <div className="relative z-50 flex -translate-y-80 flex-col items-center px-5">
        {children}
      </div>
    </div>
  );
};
