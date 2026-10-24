import type { Metadata } from "next";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getGalleryImages, getMediaUrl } from "../lib/payload";
import { BUSINESS, SITE_URL } from "../lib/site";

const TITLE = "Gallery | Bizpoint Prime Business Solutions LLC";
const DESCRIPTION =
  "A look inside Bizpoint Prime Business Solutions LLC — our team, our office, and the work we do for businesses across the UAE.";
const OG_IMAGE =
  "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=630&q=80&fm=jpg&fit=crop&auto=format";
const PATH = "/gallery";

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

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return (
    <>
      <Header />

      {/* PAGE HERO */}
      <section className="page-hero">
        <Image
          className="bg"
          src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=80&fm=jpg&fit=crop&auto=format"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          priority
        />
        <div className="overlay" aria-hidden="true"></div>
        <div className="wrap inner">
          <p className="kicker reveal" style={{ color: "var(--accent)" }}>
            Gallery
          </p>
          <h1 className="reveal">A look inside Bizpoint Prime.</h1>
          <p className="reveal">Our team, our office, and the work we do for clients across the UAE.</p>
        </div>
      </section>

      {/* GALLERY GRID */}
      <section>
        <div className="wrapc" style={{ paddingTop: 96, paddingBottom: 128 }}>
          {images.length > 0 ? (
            <div className="gallery-grid">
              {images.map((item) => (
                <div className="gallery-item reveal" key={item.id}>
                  <Image
                    src={getMediaUrl(item.image)}
                    alt={item.caption || "Bizpoint Prime gallery"}
                    fill
                    sizes="(max-width: 700px) 50vw, 25vw"
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="reveal" style={{ color: "var(--fg-muted)" }}>
              Gallery photos are being prepared. Check back soon.
            </p>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
