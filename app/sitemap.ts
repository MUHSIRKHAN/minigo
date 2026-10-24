import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/site";
import { getBlogPosts } from "./lib/payload";

const STATIC_ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services", priority: 0.8, changeFrequency: "monthly" },
  { path: "/blogs", priority: 0.7, changeFrequency: "weekly" },
  { path: "/gallery", priority: 0.6, changeFrequency: "monthly" },
  { path: "/business-setup-dubai", priority: 0.7, changeFrequency: "monthly" },
  { path: "/legal-translation-dubai", priority: 0.7, changeFrequency: "monthly" },
  { path: "/notary-services", priority: 0.7, changeFrequency: "monthly" },
  { path: "/vat-registration", priority: 0.7, changeFrequency: "monthly" },
  { path: "/family-visa-services", priority: 0.7, changeFrequency: "monthly" },
  { path: "/document-attestation", priority: 0.7, changeFrequency: "monthly" },
  { path: "/pro-services-dubai", priority: 0.7, changeFrequency: "monthly" },
  { path: "/golden-visa-services", priority: 0.7, changeFrequency: "monthly" },
  { path: "/typing-services", priority: 0.7, changeFrequency: "monthly" },
  { path: "/branding-marketing", priority: 0.7, changeFrequency: "monthly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const posts = await getBlogPosts();
  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blogs/${post.slug}`,
    lastModified: new Date(post.publishedDate),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...blogEntries];
}
