const PAYLOAD_URL = (process.env.PAYLOAD_URL || "http://localhost:3000").replace(/\/$/, "");

export type PayloadMedia = {
  id: string;
  alt?: string | null;
  url?: string | null;
  width?: number | null;
  height?: number | null;
};

export type LexicalContent = {
  root: {
    type: string;
    children: LexicalNode[];
    direction: ("ltr" | "rtl") | null;
    format: string;
    indent: number;
    version: number;
  };
};

export type LexicalNode = {
  type: string;
  version?: number;
  children?: LexicalNode[];
  text?: string;
  format?: number | string;
  tag?: string;
  listType?: string;
  url?: string;
  fields?: {
    url?: string;
    newTab?: boolean;
    linkType?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: LexicalContent;
  category: string;
  featuredImage: string | PayloadMedia;
  readTime?: string | null;
  publishedDate: string;
  status: "draft" | "published";
  seoTitle?: string | null;
  seoDescription?: string | null;
};

export type GalleryImage = {
  id: string;
  image: string | PayloadMedia;
  caption?: string | null;
  category?: string | null;
  order?: number | null;
  published?: boolean | null;
};

type PayloadListResponse<T> = {
  docs: T[];
  totalDocs: number;
};

/** Strip Payload's "-N" duplicate suffix: foo-1.jpg → foo.jpg */
function baseMediaFilename(filename: string): string {
  return filename.replace(/-\d+(\.[^.]+)$/, "$1");
}

/**
 * Seeded CMS media files are lost on Vercel (ephemeral disk, no S3).
 * Map known seed filenames to durable Unsplash sources so gallery/blogs render.
 */
const DURABLE_MEDIA_BY_BASE: Record<string, string> = {
  "uae-corporate-tax.jpg":
    "https://images.unsplash.com/photo-1768069794826-a31af289449f?w=1200&q=80&fm=jpg&fit=crop&auto=format",
  "mainland-free-zone.jpg":
    "https://images.unsplash.com/photo-1523270918669-1fd17ac1742d?w=900&q=80&fm=jpg&fit=crop&auto=format",
  "legal-translation.jpg":
    "https://images.unsplash.com/photo-1664575262619-b28fef7a40a4?w=900&q=80&fm=jpg&fit=crop&auto=format",
  "photo-1454165804606-c3d57bc86b40.jpg":
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=700&q=80&fm=jpg&fit=crop&auto=format",
  "photo-1450101499163-c8848c66ca85.jpg":
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=700&q=80&fm=jpg&fit=crop&auto=format",
  "photo-1521791136064-7986c2920216.jpg":
    "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=700&q=80&fm=jpg&fit=crop&auto=format",
  "photo-1589829545856-d10d557cf95f.jpg":
    "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=700&q=80&fm=jpg&fit=crop&auto=format",
  "photo-1507842217343-583bb7270b66.jpg":
    "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=700&q=80&fm=jpg&fit=crop&auto=format",
  "photo-1423592707957-3b212afa6733.jpg":
    "https://images.unsplash.com/photo-1423592707957-3b212afa6733?w=700&q=80&fm=jpg&fit=crop&auto=format",
  "photo-1521737604893-d14cc237f11d.jpg":
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=700&q=80&fm=jpg&fit=crop&auto=format",
  "photo-1600880292089-90a7e086ee0c.jpg":
    "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=700&q=80&fm=jpg&fit=crop&auto=format",
};

function durableMediaUrl(url: string): string {
  const filename = url.split("/").pop()?.split("?")[0];
  if (!filename) return url;
  return DURABLE_MEDIA_BY_BASE[baseMediaFilename(filename)] ?? url;
}

function mediaUrl(media: string | PayloadMedia | null | undefined): string {
  if (!media) return "";
  if (typeof media === "string") return durableMediaUrl(media);
  if (!media.url) return "";
  if (media.url.startsWith("http")) return durableMediaUrl(media.url);
  return durableMediaUrl(`${PAYLOAD_URL}${media.url}`);
}

export function getMediaUrl(media: string | PayloadMedia | null | undefined): string {
  return mediaUrl(media);
}

export function formatPostDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

async function payloadFetch<T>(path: string, tags: string[]): Promise<T> {
  const res = await fetch(`${PAYLOAD_URL}${path}`, {
    next: { tags, revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Payload request failed (${res.status}): ${path}`);
  }

  return res.json() as Promise<T>;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const data = await payloadFetch<PayloadListResponse<BlogPost>>(
      "/api/blog-posts?where[status][equals]=published&sort=-publishedDate&depth=1&limit=100",
      ["blogs"],
    );
    return data.docs;
  } catch (err) {
    console.log("err", err);
    console.error("Failed to fetch blog posts from Payload", err);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const data = await payloadFetch<PayloadListResponse<BlogPost>>(
      `/api/blog-posts?where[slug][equals]=${encodeURIComponent(slug)}&where[status][equals]=published&depth=1&limit=1`,
      ["blogs", `blog-${slug}`],
    );
    return data.docs[0] ?? null;
  } catch (err) {
    console.error(`Failed to fetch blog post "${slug}" from Payload`, err);
    return null;
  }
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  try {
    const data = await payloadFetch<PayloadListResponse<GalleryImage>>(
      "/api/gallery-images?where[published][equals]=true&sort=order&depth=1&limit=100",
      ["gallery"],
    );
    return data.docs;
  } catch (err) {
    console.error("Failed to fetch gallery images from Payload", err);
    return [];
  }
}
