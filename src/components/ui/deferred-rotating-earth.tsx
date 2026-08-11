"use client";

import { useEffect, useState } from "react";

import RotatingEarth from "@/components/ui/wireframe-dotted-globe";

type RotatingEarthProps = React.ComponentProps<typeof RotatingEarth>;

interface DeferredRotatingEarthProps extends RotatingEarthProps {
  delayMs?: number;
}

export function DeferredRotatingEarth({
  delayMs = 250,
  ...props
}: DeferredRotatingEarthProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let timeoutId = 0;
    let idleId = 0;

    const mount = () => {
      timeoutId = window.setTimeout(() => {
        if (!cancelled) {
          setIsMounted(true);
        }
      }, delayMs);
    };

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(mount, { timeout: 800 });
    } else {
      mount();
    }

    return () => {
      cancelled = true;
      if ("cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      window.clearTimeout(timeoutId);
    };
  }, [delayMs]);

  if (!isMounted) {
    return <div className={props.className} aria-hidden="true" />;
  }

  return <RotatingEarth {...props} />;
}
