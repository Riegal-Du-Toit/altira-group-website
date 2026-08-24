"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

const cardVariants = cva(
  "relative flex min-h-[22rem] w-full flex-col justify-between overflow-hidden rounded-2xl border border-[#3FE9EC] p-8 shadow-sm transition-shadow duration-300 hover:shadow-lg",
  {
    variants: {
      gradient: {
        orange: "bg-[#E4E5EA]",
        gray: "bg-[#E4E5EA]",
        purple: "bg-[#E4E5EA]",
        green: "bg-[#E4E5EA]",
      },
    },
    defaultVariants: { gradient: "gray" },
  },
);

export interface GradientCardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
  badgeText: string;
  badgeColor: string;
  title: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  imageUrl: string;
}

const GradientCard = React.forwardRef<HTMLDivElement, GradientCardProps>(
  ({ className, gradient, badgeText, badgeColor, title, description, ctaText, ctaHref, imageUrl, ...props }, ref) => (
    <motion.div initial="rest" animate="rest" whileHover="hover" variants={{ rest: { scale: 1, y: 0 }, hover: { scale: 1.03, y: -4 } }} className="h-full" ref={ref}>
      <div className={cn(cardVariants({ gradient }), className)} {...props}>
        <motion.img
          src={imageUrl}
          alt=""
          aria-hidden="true"
          variants={{ rest: { scale: 1, rotate: 0 }, hover: { scale: 1.1, rotate: 3 } }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          className="pointer-events-none absolute -right-1/4 -bottom-1/4 w-3/4 opacity-30 mix-blend-multiply"
        />
        <div className="z-10 flex h-full flex-col">
          <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-2xl bg-[#F7F8FA] px-3 py-1 text-sm font-medium text-[#2E2E38]">
            <span className="size-2 rounded-full" style={{ backgroundColor: badgeColor }} />
            {badgeText}
          </div>
          <div className="flex-grow">
            <h3 className="mb-2 text-2xl font-bold text-neutral-900">{title}</h3>
            <p className="max-w-xs text-neutral-700">{description}</p>
          </div>
          <a href={ctaHref} className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-neutral-900">
            {ctaText} <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </motion.div>
  ),
);

GradientCard.displayName = "GradientCard";

export { GradientCard, cardVariants };
