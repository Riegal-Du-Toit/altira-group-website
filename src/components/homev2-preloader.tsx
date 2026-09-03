"use client";

import Image from "next/image";
import { createContext, useContext, useEffect, useLayoutEffect, useMemo, useState, type ReactNode } from "react";

import { anton } from "@/lib/fonts";

const HomeV2PreloaderContext = createContext<{ markModelReady: () => void } | null>(null);
const MACBOOK_KEYS = Array.from({ length: 76 }, (_, index) => index);

function MacBookLoader() {
  return (
    <div className="macbook" aria-hidden="true">
      <div className="inner">
        <div className="screen">
          <div className="face-one">
            <div className="camera" />
            <div className="display">
              <Image
                src="/favicon.png"
                alt=""
                width={42}
                height={42}
                className="screen-logo"
                priority
              />
            </div>
          </div>
        </div>
        <div className="macbody">
          <div className="face-one">
            <div className="touchpad" />
            <div className="keyboard">
              {MACBOOK_KEYS.map((key) => (
                <div
                  key={key}
                  className={`key${key === 5 ? " space" : ""}${key >= 60 ? " f" : ""}`}
                />
              ))}
            </div>
          </div>
          <div className="pad one" />
          <div className="pad two" />
          <div className="pad three" />
          <div className="pad four" />
        </div>
      </div>
      <div className="shadow" />
    </div>
  );
}

export function HomeV2Preloader({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const [canExit, setCanExit] = useState(false);
  const [startHero, setStartHero] = useState(false);
  const value = useMemo(() => ({ markModelReady: () => setIsReady(true) }), []);
  const isDone = isReady && canExit;

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setCanExit(true), 7600);
    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (!isDone) return;

    const timeoutId = window.setTimeout(() => setStartHero(true), 900);
    return () => window.clearTimeout(timeoutId);
  }, [isDone]);

  useLayoutEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    const frameId = window.requestAnimationFrame(() => window.scrollTo(0, 0));

    return () => {
      window.cancelAnimationFrame(frameId);
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  return (
    <HomeV2PreloaderContext.Provider value={value}>
      <div data-homev2-ready={startHero ? "true" : "false"}>
        {children}
        <div className={`homev2-preloader ${isDone ? "homev2-preloader--done" : ""}`} aria-live="polite">
          <div className="homev2-preloader__content">
            <div className="homev2-preloader__device-frame">
              <div className="homev2-preloader__device">
                <MacBookLoader />
              </div>
            </div>
            <p className={`homev2-preloader__loading-word ${anton.className}`}>LOADING</p>
          </div>
        </div>
      </div>
    </HomeV2PreloaderContext.Provider>
  );
}

export function useHomeV2Preloader() {
  const context = useContext(HomeV2PreloaderContext);
  if (!context) throw new Error("useHomeV2Preloader must be used inside HomeV2Preloader");
  return context;
}
