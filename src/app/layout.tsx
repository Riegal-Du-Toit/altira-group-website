import type { Metadata } from "next";

import { SmoothScroll } from "@/components/smooth-scroll";

import "./globals.css";

export const metadata: Metadata = {
  title: "Altira Group — With you, at every turn.",
  description:
    "Altira Group combines trusted partners, premium platform capability and partner-led distribution across medical insurance, funeral insurance and personal loans.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <body className="relative flex min-h-screen flex-col overflow-x-clip">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
