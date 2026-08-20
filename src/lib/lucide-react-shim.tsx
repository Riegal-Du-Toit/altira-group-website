import React, { forwardRef } from "react";
import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from "react";

type LucideProps = SVGProps<SVGSVGElement> & {
  size?: string | number;
};

export type LucideIcon = ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
>;

function createIcon(paths: React.ReactNode): LucideIcon {
  const Icon = forwardRef<SVGSVGElement, LucideProps>(
    ({ className, size = 24, strokeWidth = 2, children, ...props }, ref) => (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
        {...props}
      >
        {paths}
        {children}
      </svg>
    ),
  );
  Icon.displayName = "LucideShimIcon";

  return Icon;
}

export const ArrowLeftIcon = createIcon(<path d="m12 19-7-7 7-7M19 12H5" />);
export const ArrowRight = createIcon(<path d="M5 12h14m-7-7 7 7-7 7" />);
export const ArrowRightIcon = ArrowRight;
export const BarChart = createIcon(
  <>
    <path d="M3 3v18h18" />
    <path d="M8 15v-5" />
    <path d="M13 15V7" />
    <path d="M18 15v-9" />
  </>,
);
export const Building2 = createIcon(
  <>
    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18" />
    <path d="M6 12H4a2 2 0 0 0-2 2v8h20v-8a2 2 0 0 0-2-2h-2" />
    <path d="M10 6h4M10 10h4M10 14h4M10 18h4" />
  </>,
);
export const ChevronDown = createIcon(<path d="m6 9 6 6 6-6" />);
export const ChevronDownIcon = ChevronDown;
export const ChevronLeft = createIcon(<path d="m15 18-6-6 6-6" />);
export const ChevronRight = createIcon(<path d="m9 18 6-6-6-6" />);
export const CircleCheckIcon = createIcon(
  <>
    <circle cx="12" cy="12" r="10" />
    <path d="m8 12 2.5 2.5L16 9" />
  </>,
);
export const CodeIcon = createIcon(
  <>
    <path d="m16 18 6-6-6-6" />
    <path d="m8 6-6 6 6 6" />
  </>,
);
export const FacebookIcon = createIcon(<path d="M14 8h2V5h-2c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.5l.5-3h-3V9c0-.6.4-1 1-1Z" />);
export const FrameIcon = createIcon(
  <>
    <path d="M4 7V4h3" />
    <path d="M17 4h3v3" />
    <path d="M20 17v3h-3" />
    <path d="M7 20H4v-3" />
  </>,
);
export const GlobeIcon = createIcon(
  <>
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" />
    <path d="M12 2a15 15 0 0 1 0 20" />
    <path d="M12 2a15 15 0 0 0 0 20" />
  </>,
);
export const Grid2x2PlusIcon = createIcon(
  <>
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <path d="M17.5 14v7M14 17.5h7" />
  </>,
);
export const Handshake = createIcon(
  <>
    <path d="m8 12 2 2a2 2 0 0 0 3 0l3-3" />
    <path d="M2 9l4-4 4 4-4 4-4-4Z" />
    <path d="m14 9 4-4 4 4-4 4-4-4Z" />
  </>,
);
export const HelpCircle = createIcon(
  <>
    <circle cx="12" cy="12" r="10" />
    <path d="M9.1 9a3 3 0 1 1 5.8 1c0 2-3 2-3 4" />
    <path d="M12 17h.01" />
  </>,
);
export const InstagramIcon = createIcon(
  <>
    <rect width="18" height="18" x="3" y="3" rx="4" />
    <circle cx="12" cy="12" r="3" />
    <path d="M16.5 7.5h.01" />
  </>,
);
export const Link = createIcon(
  <>
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </>,
);
export const LinkedinIcon = createIcon(
  <>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </>,
);
export const LayersIcon = createIcon(
  <>
    <path d="m12 3 9 4.5-9 4.5-9-4.5L12 3Z" />
    <path d="m3 12 9 4.5 9-4.5" />
    <path d="m3 16.5 9 4.5 9-4.5" />
  </>,
);
export const Leaf = createIcon(
  <>
    <path d="M11 20A7 7 0 0 1 4 13C4 7 10 4 20 4c0 10-3 16-9 16Z" />
    <path d="M12 12 8 16" />
  </>,
);
export const Mail = createIcon(
  <>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-10 6L2 7" />
  </>,
);
export const MenuIcon = createIcon(
  <>
    <path d="M4 7h16" />
    <path d="M4 12h16" />
    <path d="M4 17h16" />
  </>,
);
export const MapPinIcon = createIcon(
  <>
    <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </>,
);
export const PlugIcon = createIcon(
  <>
    <path d="M12 3v6" />
    <path d="M8 3v6" />
    <path d="M16 3v6" />
    <path d="M7 9h10v3a5 5 0 0 1-5 5 5 5 0 0 1-5-5V9Z" />
    <path d="M12 17v4" />
  </>,
);
export const PhoneIcon = createIcon(<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13 1 .36 1.96.7 2.87a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.2-1.27a2 2 0 0 1 2.11-.45c.91.34 1.87.57 2.87.7A2 2 0 0 1 22 16.92Z" />);
export const PlusIcon = createIcon(<path d="M5 12h14M12 5v14" />);
export const DollarSign = createIcon(
  <>
    <path d="M12 2v20" />
    <path d="M17 7a4 4 0 0 0-4-2H11a4 4 0 0 0 0 8h2a4 4 0 0 1 0 8H11a4 4 0 0 1-4-2" />
  </>,
);
export const FileText = createIcon(
  <>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
    <path d="M14 2v6h6" />
    <path d="M8 13h8" />
    <path d="M8 17h8" />
    <path d="M8 9h2" />
  </>,
);
export const RotateCcw = createIcon(
  <>
    <path d="M3 2v6h6" />
    <path d="M3 8a9 9 0 1 0 3-3.36L3 8" />
  </>,
);
export const Search = createIcon(
  <>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </>,
);
export const Shield = createIcon(
  <>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
  </>,
);
export const Star = createIcon(
  <path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1L12 2Z" />,
);
export const UserPlusIcon = createIcon(
  <>
    <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
    <circle cx="9.5" cy="7" r="4" />
    <path d="M19 8v6" />
    <path d="M16 11h6" />
  </>,
);
export const User = createIcon(
  <>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20a8 8 0 0 1 16 0" />
  </>,
);
export const Users = createIcon(
  <>
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="8.5" cy="7" r="4" />
    <path d="M20 8a4 4 0 0 1 0 8" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
  </>,
);
export const X = createIcon(<path d="M18 6 6 18M6 6l12 12" />);
export const XIcon = X;
export const YoutubeIcon = createIcon(
  <>
    <path d="M2.5 17a3 3 0 0 0 2.1 2.1c1.9.5 7.4.5 7.4.5s5.5 0 7.4-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 0-10 3 3 0 0 0-2.1-2.1C17.5 4.4 12 4.4 12 4.4s-5.5 0-7.4.5A3 3 0 0 0 2.5 7a31 31 0 0 0 0 10Z" />
    <path d="m10 15 5-3-5-3v6Z" />
  </>,
);
