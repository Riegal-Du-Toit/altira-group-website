import type { Metadata } from "next";

import { SmoothScroll } from "@/components/smooth-scroll";

import "./globals.css";

export const metadata: Metadata = {
  title: "Altira Group — With you, at every turn.",
  description:
    "Altira Group is a partner-led financial services distribution business spanning medical insurance, funeral insurance and personal loans.",
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
