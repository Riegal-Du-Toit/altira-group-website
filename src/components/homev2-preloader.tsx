"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

const HomeV2PreloaderContext = createContext<{ markModelReady: () => void } | null>(null);

export function HomeV2Preloader({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const value = useMemo(() => ({ markModelReady: () => setIsReady(true) }), []);

  return (
    <HomeV2PreloaderContext.Provider value={value}>
      <div data-homev2-ready={isReady ? "true" : "false"}>
        {children}
        <div className={`homev2-preloader ${isReady ? "homev2-preloader--done" : ""}`} aria-live="polite">
          <div className="homev2-preloader__content">
            <p>ALTIRA GROUP</p>
            <span>Loading Orbit</span>
            <i aria-hidden="true" />
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
