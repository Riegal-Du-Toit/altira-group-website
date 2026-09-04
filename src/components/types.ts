import type { ButtonHTMLAttributes, ReactNode } from "react";

export interface InstagramButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  href?: string;
  target?: string;
  rel?: string;
}
