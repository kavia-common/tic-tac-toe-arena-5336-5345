import type { MetadataRoute } from "next";

/**
 * PUBLIC_INTERFACE
 * Generate robots.txt using MetadataRoute for stable export.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "/sitemap.xml",
  };
}
