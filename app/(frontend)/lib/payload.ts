import { cmsConfigured, getCms } from "./cms";

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

function mediaUrl(media: string | PayloadMedia | null | undefined): string {
  if (!media) return "";
  if (typeof media === "string") return media;
  return media.url ?? "";
}

export function getMediaUrl(media: string | PayloadMedia | null | undefined): string {
  return mediaUrl(media);
}

export function formatPostDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!cmsConfigured) return [];
  try {
    const cms = await getCms();
    const { docs } = await cms.find({
      collection: "blog-posts",
      where: { status: { equals: "published" } },
      sort: "-publishedDate",
      depth: 1,
      limit: 100,
    });
    return docs as unknown as BlogPost[];
  } catch (err) {
    console.error("Failed to load blog posts from the admin", err);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!cmsConfigured) return null;
  try {
    const cms = await getCms();
    const { docs } = await cms.find({
      collection: "blog-posts",
      where: { slug: { equals: slug }, status: { equals: "published" } },
      depth: 1,
      limit: 1,
    });
    return (docs[0] as unknown as BlogPost) ?? null;
  } catch (err) {
    console.error(`Failed to load blog post "${slug}" from the admin`, err);
    return null;
  }
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  if (!cmsConfigured) return [];
  try {
    const cms = await getCms();
    const { docs } = await cms.find({
      collection: "gallery-images",
      where: { published: { equals: true } },
      sort: "order",
      depth: 1,
      limit: 100,
    });
    return docs as unknown as GalleryImage[];
  } catch (err) {
    console.error("Failed to load gallery images from the admin", err);
    return [];
  }
}
