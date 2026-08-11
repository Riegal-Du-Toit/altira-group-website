"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface CtaCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageSrc: string;
  title: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.08,
    },
  },
} as const;

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
} as const;

const CtaCard = React.forwardRef<HTMLDivElement, CtaCardProps>(
  ({ className, imageSrc, title, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative w-full overflow-hidden rounded-[9px] border border-white/10 bg-card text-card-foreground shadow-[0_24px_80px_rgba(0,0,0,0.34)]",
          className,
        )}
        {...props}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt="Background"
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/58" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_30%,rgba(63,233,236,0.08),transparent_24%),radial-gradient(circle_at_78%_46%,rgba(63,233,236,0.12),transparent_24%),radial-gradient(circle_at_84%_40%,rgba(255,255,255,0.06),transparent_18%)]" />

        <motion.div
          className="relative z-10 flex min-h-[34rem] items-start p-7 md:min-h-[42rem] md:p-10 lg:min-h-[48rem] lg:p-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          <motion.div
            className="flex min-w-0 flex-col items-start justify-start text-left text-white"
            variants={itemVariants}
          >
            <h2 className="max-w-[12ch] text-[1.95rem] leading-[1.02] font-extrabold tracking-[-0.04em] md:text-[2.35rem] lg:text-[2.7rem]">
              {title}
            </h2>
          </motion.div>
        </motion.div>
      </div>
    );
  },
);

CtaCard.displayName = "CtaCard";

export { CtaCard };
