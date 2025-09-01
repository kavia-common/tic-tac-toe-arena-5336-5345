import type { MetadataRoute } from "next";

/**
 * PUBLIC_INTERFACE
 * Generate sitemap with app routes.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "/",
      priority: 1.0,
    },
  ];
}
