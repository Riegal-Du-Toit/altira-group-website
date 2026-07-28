"use client";

import React, { useEffect, useRef, useState } from "react";
import { type MotionValue, motion, useScroll, useTransform } from "framer-motion";
import PropTypes from "prop-types";

interface HeaderProps {
  translate: MotionValue<number>;
  titleComponent: React.ReactNode;
}

export function Header({ translate, titleComponent }: HeaderProps) {
  return (
    <motion.div
      role="banner"
      aria-live="polite"
      style={{ translateY: translate }}
      className="mx-auto max-w-5xl text-center"
    >
      {titleComponent}
    </motion.div>
  );
}

Header.propTypes = {
  translate: PropTypes.object.isRequired,
  titleComponent: PropTypes.node.isRequired,
};

interface CardProps {
  rotateX: MotionValue<number>;
  scale: MotionValue<number>;
  y: MotionValue<number>;
  children: React.ReactNode;
}

export function Card({ rotateX, scale, y, children }: CardProps) {
  return (
    <motion.div
      role="region"
      aria-label="Scroll-animated content card"
      tabIndex={0}
      style={{
        rotateX,
        scale,
        y,
        boxShadow:
          "0 9px 20px rgba(0,0,0,0.29), 0 37px 37px rgba(0,0,0,0.26), 0 84px 50px rgba(0,0,0,0.15)",
      }}
      className="mx-auto mt-0 h-[30rem] w-full max-w-5xl rounded-[30px] border-4 border-[#2a2a2a] bg-[#222222] p-2 md:mt-1 md:h-[40rem] md:p-6"
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-gray-100 md:p-4 dark:bg-zinc-900">
        {children}
      </div>
    </motion.div>
  );
}

Card.propTypes = {
  rotateX: PropTypes.object.isRequired,
  scale: PropTypes.object.isRequired,
  y: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

interface ContainerScrollProps {
  titleComponent: React.ReactNode;
  children: React.ReactNode;
}

export default function ContainerScroll({ titleComponent, children }: ContainerScrollProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scaleRange: [number, number] = isMobile ? [0.7, 0.9] : [1.05, 1];
  const rotateX = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleRange);
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const cardY = useTransform(scrollYProgress, [0, 0.55, 1], [18, 0, -120]);

  return (
    <div
      ref={containerRef}
      className="relative flex h-[60rem] items-center justify-center overflow-hidden bg-[#1E2021] p-2 md:h-[80rem] md:p-20"
    >
      <div className="relative w-full py-6 md:py-14" style={{ perspective: "1000px" }}>
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotateX={rotateX} scale={scale} y={cardY}>
          {children}
        </Card>
      </div>
    </div>
  );
}

ContainerScroll.propTypes = {
  titleComponent: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};
