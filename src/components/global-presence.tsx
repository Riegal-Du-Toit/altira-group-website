"use client";

import { useEffect, useMemo, useState } from "react";
import { GlobeLive } from "@/components/ui/cobe-globe-live";

type PresenceVariant = "ticker" | "grid";

const offices = [
  {
    city: "Joburg",
    role: "Commercial",
    tz: "Africa/Johannesburg",
    location: [-26.2041, 28.0473] as [number, number],
  },
  {
    city: "Cape Town",
    role: "Headquarters",
    tz: "Africa/Johannesburg",
    location: [-33.9249, 18.4241] as [number, number],
  },
  {
    city: "Durban",
    role: "Operations",
    tz: "Africa/Johannesburg",
    location: [-29.8587, 31.0218] as [number, number],
  },
  {
    city: "Pretoria",
    role: "Government & Regulatory",
    tz: "Africa/Johannesburg",
    location: [-25.7479, 28.2293] as [number, number],
  },
  {
    city: "Cebu City",
    role: "Regional Support",
    tz: "Asia/Manila",
    location: [10.3157, 123.8854] as [number, number],
  },
];

function formatTime(timeZone: string) {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone,
    }).format(new Date());
  } catch {
    return "--:--";
  }
}

export function GlobalPresence({ variant = "ticker" }: { variant?: PresenceVariant }) {
  const [times, setTimes] = useState<Record<string, string>>({});

  useEffect(() => {
    const update = () => {
      setTimes(
        Object.fromEntries(offices.map((office) => [office.city, formatTime(office.tz)])),
      );
    };

    update();
    const interval = window.setInterval(update, 15000);
    return () => window.clearInterval(interval);
  }, []);

  const tickerItems = useMemo(
    () =>
      [...offices, ...offices].map((office, index) => (
        <span key={`${office.city}-${index}`} className="inline-flex items-center gap-3 px-6 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--cyan)] shadow-[0_0_0_6px_rgba(6,182,212,0.18)]" />
          <span className="font-medium text-white">{office.city}</span>
          <span className="text-white/55">{times[office.city] ?? "--:--"}</span>
          <span className="pl-6 text-white/20">/</span>
        </span>
      )),
    [times],
  );

  if (variant === "grid") {
    return (
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <div className="order-2 lg:order-1">
          <GlobeLive
            className="mx-auto max-w-[38rem]"
            markers={offices.map((office) => ({
              id: office.city.toLowerCase().replace(/\s+/g, "-"),
              location: office.location,
            }))}
          />
        </div>

        <div className="order-1 lg:order-2">
          <div className="grid gap-3">
            {offices.map((office) => (
              <article
                key={office.city}
                className="rounded-[1.35rem] border border-white/10 bg-white/4 px-5 py-4 backdrop-blur-sm"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h4 className="text-lg font-semibold tracking-[-0.02em] text-white">
                      {office.city}
                    </h4>
                    <p className="mt-1 text-sm text-white/58">{office.role}</p>
                  </div>

                  <div className="sm:text-right">
                    <span className="block text-[0.62rem] uppercase tracking-[0.22em] text-white/40">
                      Local time
                    </span>
                    <span className="mt-1 block font-mono text-sm text-cyan-200">
                      {times[office.city] ?? "--:--"}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="overflow-hidden bg-[var(--ink)] py-6 text-sm text-white">
      <div className="presence-track whitespace-nowrap">{tickerItems}</div>
    </section>
  );
}
