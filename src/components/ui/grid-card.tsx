import React from "react";

import { cn } from "@/lib/utils";
import { GridPattern } from "@/components/ui/grid-pattern";

export const GridCard = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "group/card bg-background relative isolate z-0 flex h-full flex-col justify-between overflow-hidden rounded-xl border-[0.5px] border-[#787878]/45 px-5 py-4 transition-colors duration-150",
          className,
        )}
        {...props}
      >
        <div className="absolute inset-0">
          <div className="absolute -inset-[25%] -skew-y-12 [mask-image:linear-gradient(225deg,black,transparent)]">
            <GridPattern
              width={30}
              height={30}
              x={0}
              y={0}
              squares={getRandomPattern(5)}
              className="absolute inset-0 size-full fill-white/[0.03] stroke-white/[0.06] scale-100 translate-y-2 transition-all duration-200 ease-out group-hover/card:scale-110 group-hover/card:translate-y-0"
            />
          </div>
          <div
            className={cn(
              "absolute inset-0 opacity-0 transition-all duration-200 group-hover/card:opacity-100",
              "bg-[radial-gradient(circle_at_top_left,rgba(244,114,182,0.14),transparent_42%),radial-gradient(circle_at_top_right,rgba(148,163,184,0.1),transparent_38%)]",
            )}
          />
        </div>
        {children}
      </div>
    );
  },
);

GridCard.displayName = "GridCard";

function getRandomPattern(length?: number): [x: number, y: number][] {
  const count = length ?? 5;
  const basePattern: [x: number, y: number][] = [
    [7, 1],
    [8, 3],
    [9, 2],
    [10, 5],
    [7, 6],
    [9, 4],
  ];

  return basePattern.slice(0, count);
}
