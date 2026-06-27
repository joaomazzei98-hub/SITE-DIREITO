import type { MetadataRoute } from "next";

import { practiceAreas } from "@/data/practice-areas";
import { siteUrl } from "@/lib/seo";

const staticRoutes = ["", "/sobre", "/faq", "/contato", "/politica-de-privacidade"];

export default function sitemap(): MetadataRoute.Sitemap {
  const practiceRoutes = practiceAreas.flatMap((area) => [
    `/${area.slug}`,
    ...area.highlights.map((activity) => `/${area.slug}/${activity.slug}`)
  ]);

  const routes = [...staticRoutes, ...practiceRoutes];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/direito-imobiliario" ? 0.95 : 0.8
  }));
}
