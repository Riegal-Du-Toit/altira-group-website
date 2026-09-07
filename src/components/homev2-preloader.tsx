"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

import { anton } from "@/lib/fonts";

const HomeV2PreloaderContext = createContext<{ markModelReady: () => void } | null>(null);

const PRELOADER_DURATION = { reveal: 5400, remove: 5900 };
const DROPLETS = [145, 338, 535, 748, 956, 1110];
const PERCENTAGES = Array.from({ length: 101 }, (_, index) => index);

function createLoopingWavePath(period: number, amplitude: number, phase: number) {
  const start = -period * 3;
  const end = 1200 + period * 3;
  const step = period / 8;
  const points = Array.from({ length: Math.ceil((end - start) / step) + 1 }, (_, index) => {
    const x = start + index * step;
    return { x, y: Math.sin((Math.PI * 2 * x) / period + phase) * amplitude };
  });

  let path = `M ${points[0].x} ${points[0].y.toFixed(2)}`;
  for (let index = 1; index < points.length - 1; index += 1) {
    const point = points[index];
    const next = points[index + 1];
    path += ` Q ${point.x} ${point.y.toFixed(2)} ${(point.x + next.x) / 2} ${((point.y + next.y) / 2).toFixed(2)}`;
  }
  const last = points[points.length - 1];
  return `${path} L ${last.x} ${last.y.toFixed(2)} L ${end} 360 L ${start} 360 Z`;
}

const WAVE_LAYERS = [
  { key: "primary", shift: -360, y: 0, duration: "2.9s", d: createLoopingWavePath(360, 21, 0) },
  { key: "secondary", shift: 510, y: 5, duration: "4.7s", d: createLoopingWavePath(510, 14, 1.7) },
  { key: "detail", shift: -235, y: 9, duration: "3.6s", d: createLoopingWavePath(235, 8, 3.2) },
];

export function HomeV2Preloader({ children }: { children: ReactNode }) {
  const [isRemoved, setIsRemoved] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);
  const markModelReady = useCallback(() => undefined, []);
  const value = useMemo(() => ({ markModelReady }), [markModelReady]);

  useEffect(() => {
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const revealTimer = window.setTimeout(() => {
      if (pageRef.current) pageRef.current.dataset.homev2Ready = "true";
    }, PRELOADER_DURATION.reveal);
    const removeTimer = window.setTimeout(() => {
      setIsRemoved(true);
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
      window.history.scrollRestoration = previousScrollRestoration;
    }, PRELOADER_DURATION.remove);

    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(removeTimer);
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  return (
    <HomeV2PreloaderContext.Provider value={value}>
      <div ref={pageRef} className="homev2-page-shell" data-homev2-ready="false">
        {children}
      </div>

      {!isRemoved ? (
        <div className="homev2-preloader" role="status" aria-label="Loading page">
          <svg
            className={`homev2-preloader__wordmark ${anton.className}`}
            viewBox="0 0 1200 320"
            role="img"
            aria-label="ALTIRA"
          >
            <defs>
              <clipPath id="homev2-altira-clip">
                <text className="homev2-preloader__svg-text" x="600" y="260" textAnchor="middle">
                  ALTIRA
                </text>
              </clipPath>
              <linearGradient id="homev2-liquid-gradient" x1="0" y1="360" x2="0" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#000000" />
                <stop offset="15%" stopColor="#000000" />
                <stop offset="48%" stopColor="#171717" />
                <stop offset="100%" stopColor="#4A4A4A" />
              </linearGradient>
            </defs>

            <text className="homev2-preloader__svg-text homev2-preloader__outline" x="600" y="260" textAnchor="middle">
              ALTIRA
            </text>

            <g clipPath="url(#homev2-altira-clip)">
              <g className="homev2-preloader__liquid">
                <g className="homev2-preloader__liquid-surface">
                  <g className="homev2-preloader__waves">
                    {WAVE_LAYERS.map((wave) => (
                      <path
                        key={wave.key}
                        className={`homev2-preloader__wave-flow homev2-preloader__wave-flow--${wave.key}`}
                        d={wave.d}
                        style={
                          {
                            "--homev2-wave-shift": `${wave.shift}px`,
                            "--homev2-wave-y": `${wave.y}px`,
                            "--homev2-wave-duration": wave.duration,
                          } as CSSProperties
                        }
                      />
                    ))}
                  </g>
                  <g className="homev2-preloader__droplets">
                    {DROPLETS.map((cx) => (
                      <circle key={cx} cx={cx} cy="-6" r="2.4" />
                    ))}
                  </g>
                </g>
              </g>
            </g>
          </svg>

          <span className="homev2-preloader__percentage" aria-hidden="true">
            <span className="homev2-preloader__percentage-track">
              {PERCENTAGES.map((percentage) => (
                <span key={percentage}>{percentage}%</span>
              ))}
            </span>
          </span>
        </div>
      ) : null}
    </HomeV2PreloaderContext.Provider>
  );
}

export function useHomeV2Preloader() {
  const context = useContext(HomeV2PreloaderContext);
  if (!context) throw new Error("useHomeV2Preloader must be used inside HomeV2Preloader");
  return context;
}
