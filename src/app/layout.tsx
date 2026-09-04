import type { Metadata } from "next";

import { SmoothScroll } from "@/components/smooth-scroll";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://altiragroup.co.za"),
  title: "Altira Group — With you, at every turn.",
  description:
    "Altira Group combines trusted partners, premium platform capability and partner-led distribution across medical insurance, funeral insurance and personal loans.",
  openGraph: {
    title: "Altira Group — With you, at every turn.",
    description:
      "Altira Group combines trusted partners, premium platform capability and partner-led distribution across medical insurance, funeral insurance and personal loans.",
    url: "https://altiragroup.co.za",
    siteName: "Altira Group",
    images: [
      {
        url: "/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "Altira Group",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Altira Group — With you, at every turn.",
    description:
      "Altira Group combines trusted partners, premium platform capability and partner-led distribution across medical insurance, funeral insurance and personal loans.",
    images: ["/thumbnail.png"],
  },
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
      <head>
        <link rel="preload" href="/base_basic_shaded.glb" as="fetch" crossOrigin="anonymous" />
      </head>
      <body className="relative flex min-h-screen flex-col overflow-x-clip">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
