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
export const Building2 = createIcon(
  <>
    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18" />
    <path d="M6 12H4a2 2 0 0 0-2 2v8h20v-8a2 2 0 0 0-2-2h-2" />
    <path d="M10 6h4M10 10h4M10 14h4M10 18h4" />
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
export const Mail = createIcon(
  <>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-10 6L2 7" />
  </>,
);
export const MapPinIcon = createIcon(
  <>
    <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </>,
);
export const PhoneIcon = createIcon(<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13 1 .36 1.96.7 2.87a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.2-1.27a2 2 0 0 1 2.11-.45c.91.34 1.87.57 2.87.7A2 2 0 0 1 22 16.92Z" />);
export const PlusIcon = createIcon(<path d="M5 12h14M12 5v14" />);
export const X = createIcon(<path d="M18 6 6 18M6 6l12 12" />);
export const YoutubeIcon = createIcon(
  <>
    <path d="M2.5 17a3 3 0 0 0 2.1 2.1c1.9.5 7.4.5 7.4.5s5.5 0 7.4-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 0-10 3 3 0 0 0-2.1-2.1C17.5 4.4 12 4.4 12 4.4s-5.5 0-7.4.5A3 3 0 0 0 2.5 7a31 31 0 0 0 0 10Z" />
    <path d="m10 15 5-3-5-3v6Z" />
  </>,
);
