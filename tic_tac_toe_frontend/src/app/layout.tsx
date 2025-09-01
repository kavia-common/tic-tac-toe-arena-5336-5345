import "./globals.css";
import type { Metadata } from "next";
import { metadata as siteMeta } from "./metadata";

export const metadata: Metadata = siteMeta;

// PUBLIC_INTERFACE
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  /** Root layout providing global styles and metadata. */
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
