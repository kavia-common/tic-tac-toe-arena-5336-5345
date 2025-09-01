import "./globals.css";
import type { Metadata, Viewport } from "next";
import { metadata as siteMeta } from "./metadata";
import { viewport as siteViewport } from "./route-config";

export const metadata: Metadata = siteMeta;
export const viewport: Viewport = siteViewport;

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
