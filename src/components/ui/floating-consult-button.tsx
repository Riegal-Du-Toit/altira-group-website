"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface FloatingConsultButtonProps {
  buttonSize?: number;
  imageSize?: number;
  imageSrc?: string;
  imageAlt?: string;
  revolvingText?: string;
  revolvingSpeed?: number;
  popupHeading?: string;
  popupDescription?: string;
  popupBadgeText?: string;
  ctaButtonText?: string;
  ctaHref?: string;
  ctaButtonAction?: () => void;
  position?: {
    bottom?: string;
    right?: string;
    left?: string;
    top?: string;
  };
  hideWhileVisibleSelector?: string;
}

export function FloatingConsultButton({
  buttonSize,
  imageSize,
  imageSrc = "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop",
  imageAlt = "Altira Group consultant",
  revolvingText = "START A CONVERSATION - ALTIRA GROUP - ",
  revolvingSpeed = 10,
  popupHeading = "30-minute call",
  popupDescription = "Speak with Altira Group about distribution, underwriting or partnership opportunities and we will determine the right next step together.",
  popupBadgeText = "Free",
  ctaButtonText = "Book a call",
  ctaHref = "#contact",
  ctaButtonAction,
  position = { bottom: "2rem", right: "2rem" },
  hideWhileVisibleSelector,
}: FloatingConsultButtonProps): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(!hideWhileVisibleSelector);

  const lgButtonSize = buttonSize || 160;
  const smButtonSize = buttonSize ? buttonSize * 0.8 : 128;
  const lgImageSize = imageSize || 96;
  const smImageSize = imageSize ? imageSize * 0.833 : 80;

  useEffect(() => {
    if (!hideWhileVisibleSelector) {
      setIsVisible(true);
      return;
    }

    const target = document.querySelector(hideWhileVisibleSelector);
    if (!target) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!(entry?.isIntersecting ?? false));
      },
      { threshold: 0.15 },
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [hideWhileVisibleSelector]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.86, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.86, y: 20 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-44 right-6 z-50 w-[calc(100vw-3rem)] max-w-md rounded-[18px] border border-white/10 bg-[#252729]/96 p-8 text-white shadow-[0_30px_90px_rgba(0,0,0,0.4)] backdrop-blur-xl lg:bottom-48 lg:right-8 lg:p-10"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-12 -right-2 text-white transition-colors hover:text-white/75"
              aria-label="Close consult popup"
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="10" y1="10" x2="30" y2="30" />
                <line x1="30" y1="10" x2="10" y2="30" />
              </svg>
            </button>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <h3 className="text-4xl font-bold leading-tight text-white lg:text-5xl">
                  {popupHeading}
                </h3>
              </div>

              <p className="text-base leading-relaxed text-white/64 lg:text-lg">
                {popupDescription}
              </p>

              <div className="rounded-[16px] bg-gradient-to-b from-gray-800/40 to-transparent p-[4px]">
                {ctaButtonAction ? (
                  <button
                    className="group block w-full rounded-[12px] bg-gradient-to-b from-gray-700 to-gray-600 p-[4px] shadow-[0_2px_4px_rgba(0,0,0,0.7)] transition-all duration-200 hover:shadow-[0_4px_8px_rgba(0,0,0,0.6)] active:scale-[0.995] active:shadow-[0_0px_1px_rgba(0,0,0,0.8)]"
                    onClick={() => {
                      ctaButtonAction();
                      setIsOpen(false);
                    }}
                    type="button"
                  >
                    <div className="rounded-[8px] bg-gradient-to-b from-gray-600 to-gray-700 px-8 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-base font-semibold text-white">{ctaButtonText}</span>
                      </div>
                    </div>
                  </button>
                ) : (
                  <a
                    href={ctaHref}
                    onClick={() => setIsOpen(false)}
                    className="group block w-full rounded-[12px] bg-gradient-to-b from-gray-700 to-gray-600 p-[4px] shadow-[0_2px_4px_rgba(0,0,0,0.7)] transition-all duration-200 hover:shadow-[0_4px_8px_rgba(0,0,0,0.6)] active:scale-[0.995] active:shadow-[0_0px_1px_rgba(0,0,0,0.8)]"
                  >
                    <div className="rounded-[8px] bg-gradient-to-b from-gray-600 to-gray-700 px-8 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-base font-semibold text-white">{ctaButtonText}</span>
                      </div>
                    </div>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 12 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed z-50"
            style={position}
          >
            <motion.div
              className="group relative cursor-pointer"
              style={{
                width: `${smButtonSize}px`,
                height: `${smButtonSize}px`,
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{
                  duration: revolvingSpeed,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                <svg viewBox="0 0 200 200" className="h-full w-full">
                  <defs>
                    <path
                      id="circlePath"
                      d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
                    />
                  </defs>
                  <text className="fill-white/65 text-[20.4px] font-medium uppercase tracking-wider">
                    <textPath href="#circlePath" startOffset="0%">
                      {revolvingText}
                    </textPath>
                  </text>
                </svg>
              </motion.div>

              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="overflow-hidden rounded-full bg-gray-900 shadow-lg transition-shadow group-hover:shadow-xl"
                  style={{
                    width: `${smImageSize}px`,
                    height: `${smImageSize}px`,
                  }}
                >
                  <img
                    src={imageSrc}
                    alt={imageAlt}
                    className="h-full w-full object-cover"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                      const parent = event.currentTarget.parentElement;

                      if (parent) {
                        parent.innerHTML =
                          '<div class="h-full w-full bg-gradient-to-br from-cyan-500 to-indigo-500"></div>';
                      }
                    }}
                  />
                </div>
              </div>
            </motion.div>

            <style>{`
              @media (min-width: 1024px) {
                .group.relative.cursor-pointer {
                  width: ${lgButtonSize}px !important;
                  height: ${lgButtonSize}px !important;
                }
                .group.relative.cursor-pointer .overflow-hidden.rounded-full {
                  width: ${lgImageSize}px !important;
                  height: ${lgImageSize}px !important;
                }
              }
            `}</style>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
