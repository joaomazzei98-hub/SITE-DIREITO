import type { MetadataRoute } from "next";

import { articles } from "@/data/articles";
import { practiceAreas } from "@/data/practice-areas";
import { siteUrl } from "@/lib/seo";

const staticRoutes = [
  "",
  "/sobre",
  "/faq",
  "/contato",
  "/artigos",
  "/politica-de-privacidade"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const practiceRoutes = practiceAreas.flatMap((area) => [
    `/${area.slug}`,
    ...area.highlights.map((activity) => `/${area.slug}/${activity.slug}`)
  ]);

  const routes = [...staticRoutes, ...practiceRoutes];

  const pages: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/direito-imobiliario" ? 0.95 : 0.8
  }));

  const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${siteUrl}/artigos/${article.slug}`,
    lastModified: new Date(article.updatedAt ?? article.publishedAt),
    changeFrequency: "yearly",
    priority: 0.7
  }));

  return [...pages, ...articlePages];
}
