"use client";

import React from "react";
import { motion, useInView, type Variants } from "framer-motion";

type TimelineContentProps<T extends React.ElementType> = {
  as?: T;
  animationNum?: number;
  timelineRef?: React.RefObject<Element | null>;
  customVariants?: Variants;
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "children">;

const defaultVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: "blur(8px)",
  },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.12,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

export function TimelineContent<T extends React.ElementType = "div">({
  as,
  animationNum = 0,
  timelineRef,
  customVariants,
  children,
  ...props
}: TimelineContentProps<T>) {
  const Component = (as || "div") as React.ElementType;
  const localRef = React.useRef<HTMLElement | null>(null);
  const isInView = useInView(localRef, {
    once: true,
    margin: "-10% 0px -10% 0px",
  });

  const MotionComponent = motion.create(Component);

  return (
    <MotionComponent
      ref={localRef}
      custom={animationNum}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={customVariants || defaultVariants}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}
