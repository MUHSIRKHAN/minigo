import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/site";
import { getBlogPosts } from "./lib/payload";
import { PACKAGES } from "./lib/packages";

const STATIC_ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/packages", priority: 0.9, changeFrequency: "weekly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact-us", priority: 0.7, changeFrequency: "monthly" },
  { path: "/blogs", priority: 0.6, changeFrequency: "weekly" },
  { path: "/gallery", priority: 0.5, changeFrequency: "monthly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const packageEntries: MetadataRoute.Sitemap = PACKAGES.map((pkg) => ({
    url: `${SITE_URL}/packages/${pkg.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const posts = await getBlogPosts();
  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blogs/${post.slug}`,
    lastModified: new Date(post.publishedDate),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...packageEntries, ...blogEntries];
}
