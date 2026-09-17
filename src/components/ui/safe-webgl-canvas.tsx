"use client";

import { Canvas } from "@react-three/fiber";
import type { ComponentProps, ReactNode } from "react";
import { useEffect, useState } from "react";

type SafeWebGLCanvasProps = ComponentProps<typeof Canvas> & {
  fallback?: ReactNode;
};

let webglAvailable: boolean | undefined;

function canCreateWebGLContext() {
  if (webglAvailable !== undefined) return webglAvailable;

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
  webglAvailable = Boolean(context);
  context?.getExtension("WEBGL_lose_context")?.loseContext();

  return webglAvailable;
}

export function SafeWebGLCanvas({ fallback = null, className, ...props }: SafeWebGLCanvasProps) {
  const [isWebGLAvailable, setIsWebGLAvailable] = useState(false);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setIsWebGLAvailable(canCreateWebGLContext());
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  if (!isWebGLAvailable) {
    return <div aria-hidden="true" className={className}>{fallback}</div>;
  }

  return <Canvas {...props} className={className} fallback={fallback} />;
}
