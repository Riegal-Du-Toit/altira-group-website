"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, components: userComponents, ...props }: CalendarProps) {
  const defaultClassNames = {
    root: "w-fit",
    months: "relative flex flex-col gap-4",
    month: "w-full",
    month_caption: "relative mx-9 mb-1 flex h-8 items-center justify-center",
    caption_label: "text-sm font-semibold",
    nav: "absolute top-0 flex w-full justify-between",
    button_previous: "inline-flex size-8 items-center justify-center rounded-md text-white/55 transition hover:bg-white/10 hover:text-white",
    button_next: "inline-flex size-8 items-center justify-center rounded-md text-white/55 transition hover:bg-white/10 hover:text-white",
    weekday: "size-7 p-0 text-[0.62rem] font-bold text-white/42",
    day: "group size-7 p-0 text-xs",
    day_button: "flex size-7 items-center justify-center rounded-md transition hover:bg-white/10 hover:text-white group-data-[selected]:bg-[#3FE9EC] group-data-[selected]:font-bold group-data-[selected]:text-[#071011] group-data-[disabled]:cursor-not-allowed group-data-[disabled]:text-white/16 group-data-[booked]:line-through group-data-[booked]:text-white/25",
    weeks: "space-y-0.5",
    week: "flex w-full",
    selected: "",
    today: "",
    outside: "text-white/20",
    disabled: "",
    hidden: "invisible",
  };

  const mergedClassNames = { ...defaultClassNames, ...classNames };
  const components = {
    Chevron: ({ orientation, ...iconProps }: { orientation?: "up" | "down" | "left" | "right"; className?: string; style?: React.CSSProperties; size?: number; disabled?: boolean }) =>
      orientation === "left" ? <ChevronLeft size={16} {...iconProps} /> : <ChevronRight size={16} {...iconProps} />,
    ...userComponents,
  };

  return <DayPicker showOutsideDays={showOutsideDays} className={cn("w-fit", className)} classNames={mergedClassNames} components={components} {...props} />;
}

Calendar.displayName = "Calendar";

export { Calendar };
