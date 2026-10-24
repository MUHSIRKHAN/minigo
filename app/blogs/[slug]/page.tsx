import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import RichText from "../../components/RichText";
import {
  formatPostDate,
  getBlogPostBySlug,
  getBlogPosts,
  getMediaUrl,
} from "../../lib/payload";
import { BUSINESS, SITE_URL } from "../../lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) {
    return { title: "Post not found | Bizpoint Prime" };
  }
  const title = `${post.seoTitle || post.title} | Bizpoint Prime`;
  const description = post.seoDescription || post.excerpt;
  const image = getMediaUrl(post.featuredImage);
  const url = `${SITE_URL}/blogs/${post.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      siteName: BUSINESS.shortName,
      title,
      description,
      images: image ? [{ url: image, alt: post.title }] : undefined,
      publishedTime: post.publishedDate,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <Header />

      <section className="page-hero page-hero--short">
        <Image
          className="bg"
          src={getMediaUrl(post.featuredImage)}
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          priority
        />
        <div className="overlay" aria-hidden="true"></div>
        <div className="wrap inner">
          <p className="kicker reveal" style={{ color: "var(--accent)" }}>
            {post.category}
          </p>
          <h1 className="reveal">{post.title}</h1>
          <p className="reveal meta" style={{ color: "rgba(250,250,247,.8)" }}>
            {formatPostDate(post.publishedDate)}
            {post.readTime ? (
              <>
                {" "}
                <span className="sep">/</span> {post.readTime}
              </>
            ) : null}
          </p>
        </div>
      </section>

      <article>
        <div className="wrapc blog-article" style={{ paddingTop: 72, paddingBottom: 112 }}>
          <p className="blog-lede reveal">{post.excerpt}</p>
          <RichText content={post.content} className="rich-text reveal" />
          <p style={{ marginTop: 48 }}>
            <Link href="/blogs" className="btn outline">
              <span>← All insights</span>
            </Link>
          </p>
        </div>
      </article>

      <Footer />
    </>
  );
}
