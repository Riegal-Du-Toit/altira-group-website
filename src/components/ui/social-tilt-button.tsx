import type { AnchorHTMLAttributes, ReactNode } from "react";

export type SocialPlatform =
  | "instagram"
  | "x"
  | "twitter"
  | "github"
  | "linkedin"
  | "youtube"
  | "discord";

export interface SocialTiltButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  platform: SocialPlatform;
  href: string;
  icon: ReactNode;
  label?: string;
  size?: "sm" | "md" | "lg";
}

export function SocialTiltButton({
  platform,
  href,
  icon,
  label,
  size = "md",
  className = "",
  ...restProps
}: SocialTiltButtonProps) {
  const defaultLabels: Record<SocialPlatform, string> = {
    instagram: "Follow on Instagram",
    x: "Follow on X",
    twitter: "Follow on Twitter",
    github: "View GitHub Profile",
    linkedin: "Connect on LinkedIn",
    youtube: "Subscribe on YouTube",
    discord: "Join our Discord server",
  };

  const sizeClasses = {
    sm: "w-[36px] h-[36px] [&_.svgContainer>svg]:w-4 [&_.svgContainer>svg]:h-4",
    md: "w-[45px] h-[45px] [&_.svgContainer>svg]:w-5 [&_.svgContainer>svg]:h-5",
    lg: "w-[54px] h-[54px] [&_.svgContainer>svg]:w-6 [&_.svgContainer>svg]:h-6",
  }[size];

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label ?? defaultLabels[platform]}
      data-platform={platform}
      className={`SocialTiltBtn ${sizeClasses} ${className}`.trim()}
      {...restProps}
    >
      <span className="svgContainer" aria-hidden="true">
        {icon}
      </span>
      <span className="tiltBG" aria-hidden="true" />
    </a>
  );
}
