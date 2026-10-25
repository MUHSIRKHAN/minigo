import type { MetadataRoute } from "next";
import { IS_LIVE, SITE_URL } from "./(frontend)/lib/site";

export default function robots(): MetadataRoute.Robots {
  if (!IS_LIVE) {
    // Demo / preview deployment: keep it out of search engines.
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/admin"] },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
