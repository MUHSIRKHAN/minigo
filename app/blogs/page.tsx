import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { formatPostDate, getBlogPosts, getMediaUrl } from "../lib/payload";
import { BUSINESS, SITE_URL } from "../lib/site";

const TITLE = "Blogs | Bizpoint Prime Business Solutions LLC";
const DESCRIPTION =
  "Insights on business setup, legal translation, VAT, and compliance for companies operating in the UAE — from Bizpoint Prime Business Solutions LLC.";
const OG_IMAGE =
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=630&q=80&fm=jpg&fit=crop&auto=format";
const PATH = "/blogs";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}${PATH}` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}${PATH}`,
    siteName: BUSINESS.shortName,
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default async function BlogsPage() {
  const posts = await getBlogPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <Header />

      {/* PAGE HERO */}
      <section className="page-hero">
        <Image
          className="bg"
          src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=80&fm=jpg&fit=crop&auto=format"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          priority
        />
        <div className="overlay" aria-hidden="true"></div>
        <div className="wrap inner">
          <p className="kicker reveal" style={{ color: "var(--accent)" }}>
            Blogs
          </p>
          <h1 className="reveal">Insights for businesses setting up in Dubai.</h1>
          <p className="reveal">
            Practical guidance on business setup, legal translation, VAT, and compliance — from
            the Bizpoint Prime team.
          </p>
        </div>
      </section>

      {featured ? (
        <section>
          <div className="wrapc" style={{ paddingTop: 96, paddingBottom: 64 }}>
            <p className="kicker reveal">Latest</p>
            <Link href={`/blogs/${featured.slug}`} className="svc-row reveal" style={{ marginTop: 24 }}>
              <div className="svc-row-photo">
                <Image
                  src={getMediaUrl(featured.featuredImage)}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 900px) 100vw, 480px"
                />
              </div>
              <div className="svc-row-text">
                <span className="tag">{featured.category}</span>
                <p className="meta" style={{ marginTop: 12 }}>
                  {formatPostDate(featured.publishedDate)}
                  {featured.readTime ? (
                    <>
                      {" "}
                      <span className="sep">/</span> {featured.readTime}
                    </>
                  ) : null}
                </p>
                <h3 style={{ marginTop: 10 }}>{featured.title}</h3>
                <p>{featured.excerpt}</p>
              </div>
            </Link>
          </div>
        </section>
      ) : (
        <section>
          <div className="wrapc" style={{ paddingTop: 96, paddingBottom: 64 }}>
            <p className="reveal" style={{ color: "var(--fg-muted)" }}>
              New insights are on the way. Check back soon.
            </p>
          </div>
        </section>
      )}

      {rest.length > 0 ? (
        <section style={{ background: "var(--bg-raised)" }}>
          <div className="wrapc" style={{ paddingTop: 80, paddingBottom: 128 }}>
            <p className="kicker reveal">More insights</p>
            <div className="post-grid">
              {rest.map((post) => (
                <Link className="post-card reveal" href={`/blogs/${post.slug}`} key={post.id}>
                  <div className="img">
                    <Image
                      src={getMediaUrl(post.featuredImage)}
                      alt={post.title}
                      fill
                      sizes="(max-width: 700px) 100vw, 33vw"
                    />
                  </div>
                  <span className="tag" style={{ marginTop: 16 }}>
                    {post.category}
                  </span>
                  <p className="meta" style={{ marginTop: 12 }}>
                    {formatPostDate(post.publishedDate)}
                    {post.readTime ? (
                      <>
                        {" "}
                        <span className="sep">/</span> {post.readTime}
                      </>
                    ) : null}
                  </p>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* FINAL CTA */}
      <section className="final-cta">
        <div className="wrapc" style={{ paddingTop: 96, paddingBottom: 96, textAlign: "center" }}>
          <p className="kicker reveal">Get Started</p>
          <h2
            className="reveal display"
            style={{
              marginTop: 12,
              maxWidth: "32ch",
              marginLeft: "auto",
              marginRight: "auto",
              fontWeight: 500,
              fontSize: "2.5rem",
              lineHeight: 1.05,
              color: "var(--bg)",
            }}
          >
            Have a question these posts didn&rsquo;t answer?
          </h2>
          <p
            className="reveal"
            style={{
              marginTop: 16,
              maxWidth: "52ch",
              marginLeft: "auto",
              marginRight: "auto",
              fontSize: "15.5px",
              color: "rgba(250,250,247,.75)",
            }}
          >
            Tell us what you&rsquo;re working on and a consultant will walk you through it
            directly. Prime. Made. Easy.
          </p>
          <div
            className="reveal"
            style={{ marginTop: 32, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}
          >
            <Link href="/contact-us" className="btn on-brand">
              <span>Request a Free Consultation</span>
            </Link>
            <Link
              href="https://wa.me/971543084251?text=Hi%20Bizpoint%20Prime%2C%20I%27d%20like%20to%20know%20more%20about%20your%20services."
              className="btn outline-light"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>WhatsApp Us</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
