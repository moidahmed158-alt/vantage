import type { MetadataRoute } from "next";
import { ROUTES, SITE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: [ROUTES.brand] },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
