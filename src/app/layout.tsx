import type { Metadata } from "next";
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
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
