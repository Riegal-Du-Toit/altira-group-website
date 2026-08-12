"use client";

import { useEffect, useMemo, useState } from "react";

const locations = [
  { city: "Cape Town", timeZone: "Africa/Johannesburg" },
  { city: "Cebu City", timeZone: "Asia/Manila" },
  { city: "Durban", timeZone: "Africa/Johannesburg" },
  { city: "Johannesburg", timeZone: "Africa/Johannesburg" },
  { city: "Pretoria", timeZone: "Africa/Johannesburg" },
];

function formatTime(timeZone: string, now: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone,
  }).format(now);
}

export function HeroTimezones() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = window.setInterval(() => {
      setNow(new Date());
    }, 30000);

    return () => window.clearInterval(interval);
  }, []);

  const items = useMemo(
    () =>
      locations.map((location) => ({
        ...location,
        time: formatTime(location.timeZone, now),
      })),
    [now],
  );

  return (
    <div className="mx-auto flex min-h-24 w-full max-w-[1720px] flex-wrap items-center justify-center gap-x-10 gap-y-3 px-6 py-5 text-base text-white sm:px-8 lg:px-12 lg:text-lg">
      {items.map((location, index) => (
        <div key={location.city} className="flex items-center gap-3">
          <span className="font-semibold text-white">{location.city}</span>
          <span className="text-white">{location.time}</span>
          {index < items.length - 1 ? (
            <span className="pl-3 text-white/45">/</span>
          ) : null}
        </div>
      ))}
    </div>
  );
}
