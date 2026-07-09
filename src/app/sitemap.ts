import type { MetadataRoute } from "next";
import { SITE, PAGES } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return PAGES.filter((n) => !n.external && !/^https?:/.test(n.href)).map((n) => ({
    url: `${SITE.url}${n.href === "/" ? "" : n.href}`,
    lastModified,
    changeFrequency: n.href === "/" ? "weekly" : "monthly",
    priority: n.href === "/" ? 1.0 : 0.7,
  }));
}
