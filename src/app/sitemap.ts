import type { MetadataRoute } from "next";
import { ROUTES, SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const priority: Partial<Record<string, number>> = { [ROUTES.home]: 1, [ROUTES.contact]: 0.9, [ROUTES.services]: 0.9 };
  return Object.values(ROUTES)
    .filter((path) => path !== ROUTES.brand)
    .map((path) => ({
      url: `${SITE.url}${path === "/" ? "" : path}`,
      changeFrequency: "monthly",
      priority: priority[path] ?? 0.7,
    }));
}
