import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/seo";

const routes = [
  "",
  "/direito-imobiliario",
  "/previdenciario",
  "/trabalhista",
  "/cidadania-europeia",
  "/sobre",
  "/faq",
  "/contato",
  "/politica-de-privacidade"
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8
  }));
}
