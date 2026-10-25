import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HeroVideo from "./components/HeroVideo";
import PackageCard from "./components/PackageCard";
import DepartureList from "./components/DepartureList";
import EnquiryForm from "./components/EnquiryForm";
import Testimonials from "./components/Testimonials";
import Moments from "./components/Moments";
import ComingSoon from "./components/ComingSoon";
import { formatPostDate, getBlogPosts, getGalleryImages, getMediaUrl } from "./lib/payload";
import { REGIONS, allUpcomingDepartures } from "./lib/packages";
import { getPackages, getUpcomingTrips } from "./lib/content";
import { BUSINESS, DEFAULT_WHATSAPP_MESSAGE, SITE_URL, whatsappLink } from "./lib/site";

// Upcoming dates drop off as they pass, so refresh at least hourly
// (admin edits refresh it straight away).
export const revalidate = 3600;

export const metadata: Metadata = {
  alternates: { canonical: SITE_URL },
};

const padTop96Bottom128: CSSProperties = { paddingTop: 96, paddingBottom: 128 };

const WHY_US = [
  "Group departures and private trips, with clear prices",
  "Handpicked hotels, houseboats, lodges and homestays",
  "A Malayali coordinator on Kashmir group tours",
  "Trips for couples, families, friends and colleges",
  "Tailor-made itineraries on request",
  "One team from first enquiry to return home",
];

const PROCESS = [
  { title: "Choose", body: "Browse our tours and pick the destination and departure date that suit you." },
  { title: "Enquire", body: "Send an enquiry or message us on WhatsApp — a travel designer replies within a business day." },
  { title: "Confirm", body: "We hold your seats, confirm every detail and guide you through payment, visas and insurance." },
  { title: "Travel", body: "Meet your guide, enjoy the trip and leave the logistics to us." },
];

const FAQS = [
  {
    q: "How do your departure dates work?",
    a: "Kashmir, Vietnam, Kazakhstan and Lakshadweep have group departures on fixed dates, listed on each tour page. Every trip, including these, can also be arranged on any date you choose, on request. Just message us with your dates.",
  },
  {
    q: "What is included in the price?",
    a: "Each tour page lists what is included and what is not. If a detail isn't listed yet, message us and we'll send it before you book.",
  },
  {
    q: "When is the best time to visit each destination?",
    a: "Our Kashmir group tours run in November, December and January for the snow. Lakshadweep departures are from February to April, Vietnam from November to January, and Kazakhstan in December and February. Goa, the Golden Triangle and Hyderabad run on dates that suit your group.",
  },
  {
    q: "Can I travel on different dates or customise a tour?",
    a: "Yes. We design private and tailor-made versions of every itinerary for couples, families and groups, with the dates, pace and hotels you prefer.",
  },
  {
    q: "Do you help with visas and travel insurance?",
    a: "We advise on visa requirements for your nationality and can recommend insurance cover. Both are the traveller's responsibility and are not included in package prices unless stated.",
  },
];

export default async function Home() {
  const [posts, galleryImages, packages, upcoming] = await Promise.all([
    getBlogPosts(),
    getGalleryImages(),
    getPackages(),
    getUpcomingTrips(),
  ]);
  const [featuredPost, ...otherPosts] = posts;
  const secondaryPosts = otherPosts.slice(0, 2);
  const marqueeImages = galleryImages.length > 0 ? [...galleryImages, ...galleryImages] : [];

  // Closed dates stay in the calendar (marked "Booking closed"); the counter shows only bookable ones.
  const departures = allUpcomingDepartures(packages);
  const openDepartures = departures.filter(({ departure }) => !departure.closed);
  const nextDepartures = departures.slice(0, 5);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <HeroVideo />

      {/* STATS */}
      <section>
        <div className="wrapc" style={{ paddingTop: 64, paddingBottom: 64 }}>
          <div className="stats-grid cols-4">
            <div className="stat reveal">
              <div className="num" data-count={packages.length} data-suffix="">
                {packages.length}
              </div>
              <p>Destinations across Asia</p>
            </div>
            <div className="stat reveal">
              <div className="num" data-count={openDepartures.length} data-suffix="">
                {openDepartures.length}
              </div>
              <p>Upcoming departures open to book</p>
            </div>
            <div className="stat reveal">
              <div className="num" data-count="14" data-suffix="">
                14
              </div>
              <p>Guests at most on a small-group tour</p>
            </div>
            <div className="stat reveal">
              <div className="num" data-count="24" data-suffix="h">
                24h
              </div>
              <p>Typical reply time to an enquiry</p>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section id="about">
        <div className="wrapc" style={padTop96Bottom128}>
          <div className="intro-grid">
            <div>
              <p className="kicker reveal">Welcome to {BUSINESS.name}</p>
              <h2 className="h-sec reveal" style={{ marginTop: 14 }}>
                What we do and why we do it
              </h2>
              <p className="sub reveal">Remarkable places, thoughtfully planned.</p>
            </div>
            <div className="reveal">
              <p className="body-copy">
                A great holiday is rarely about ticking off sights — it is the pace, the people and
                the places you stay. {BUSINESS.name} plans group tours and private trips to Kashmir,
                Lakshadweep, Goa, the Golden Triangle, Hyderabad, Vietnam and Kazakhstan, with good
                hotels, sensible pacing and clear prices, so planning is simple.
              </p>
              <div style={{ marginTop: 32, display: "flex", gap: 16, flexWrap: "wrap" }}>
                <Link href="/about" className="btn">
                  <span>About Us</span>
                </Link>
                <Link href="/contact-us#enquiry" className="btn outline">
                  <span>Plan My Trip</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRIPS */}
      <section id="tours" style={{ background: "var(--bg-raised)" }}>
        <div className="wrapc" style={padTop96Bottom128}>
          <p className="kicker reveal">Tour packages</p>
          <h2 className="h-sec reveal" style={{ marginTop: 14 }}>
            Explore our trips
          </h2>
          <p className="sub reveal">Join a group departure, or travel on any date you choose. Every trip is available on request.</p>
          <div className="pkg-grid">
            {packages.map((pkg) => (
              <PackageCard key={pkg.slug} pkg={pkg} />
            ))}
          </div>
          <div className="reveal" style={{ marginTop: 48 }}>
            <Link href="/packages" className="btn outline">
              <span>View all packages</span>
            </Link>
          </div>
        </div>
      </section>

      {/* DEPARTURES */}
      <section id="departures">
        <div className="wrapc" style={padTop96Bottom128}>
          <p className="kicker reveal">Next departures</p>
          <h2 className="h-sec reveal" style={{ marginTop: 14 }}>
            Dates you can book right now
          </h2>
          <p className="sub reveal">Fixed dates, fixed prices, live seat availability.</p>
          <DepartureList rows={nextDepartures} showPackage />
          <div className="reveal" style={{ marginTop: 40 }}>
            <Link href="/packages#departures" className="btn outline">
              <span>Full departure calendar</span>
            </Link>
          </div>
        </div>
      </section>

      {upcoming.length > 0 ? <ComingSoon trips={upcoming} /> : null}

      {/* WHY CHOOSE US */}
      <section>
        <div className="wrapc" style={padTop96Bottom128}>
          <div className="why-layout">
            <div className="why-photo reveal">
              <Image
                src="https://images.unsplash.com/photo-1568889753852-196c487a536e?w=1400&q=85&fm=jpg&fit=crop&auto=format"
                alt="The Gulmarg gondola above snow-capped peaks, Kashmir"
                fill
                quality={85}
                sizes="(max-width: 900px) 100vw, 640px"
              />
            </div>
            <div>
              <p className="kicker reveal">Why {BUSINESS.name}</p>
              <h2 className="h-sec reveal" style={{ marginTop: 14 }}>
                Why travel with us
              </h2>
              <p className="sub reveal">Clear prices. Real dates. Nothing left to chance.</p>
              <div className="about-checklist">
                {WHY_US.map((item) => (
                  <div className="reveal" key={item}>
                    <span className="check" aria-hidden="true">✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Moments />

      <Testimonials />

      {/* REGIONS */}
      <section id="destinations">
        <div className="wrapc" style={{ paddingTop: 80, paddingBottom: 96 }}>
          <p className="kicker reveal">Where we take you</p>
          <nav className="region-filter reveal" aria-label="Browse by region">
            {REGIONS.map((region) => (
              <Link key={region} href={`/packages?region=${encodeURIComponent(region)}`}>
                {region}
              </Link>
            ))}
            <Link href="/packages">All destinations</Link>
          </nav>
        </div>
      </section>

      {/* PROCESS */}
      <section style={{ borderTop: "none" }}>
        <div className="wrapc" style={padTop96Bottom128}>
          <p className="kicker reveal">How it works</p>
          <h2 className="h-sec reveal" style={{ marginTop: 14 }}>
            From first idea to boarding pass
          </h2>
          <div className="proc-grid">
            {PROCESS.map((step, i) => (
              <div className="proc reveal" key={step.title}>
                <span className="value-num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ background: "var(--bg-raised)" }}>
        <div className="wrapc" style={padTop96Bottom128}>
          <p className="kicker reveal">FAQs</p>
          <h2 className="h-sec reveal" style={{ marginTop: 14 }}>
            Frequently asked questions
          </h2>
          <div className="faq-list">
            {FAQS.map((faq, i) => (
              <details className="faq-item" key={faq.q}>
                <summary>
                  <span className="faq-left">
                    <span className="faq-num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="faq-q">{faq.q}</span>
                  </span>
                  <span className="faq-icon" aria-hidden="true">+</span>
                </summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      {marqueeImages.length > 0 ? (
        <section className="marquee" id="gallery">
          <div className="marquee-track">
            {marqueeImages.map((item, i) => (
              <Link href="/gallery" className="cell" key={`${item.id}-${i}`}>
                <Image
                  src={getMediaUrl(item.image)}
                  alt={item.caption || `${BUSINESS.name} gallery`}
                  fill
                  sizes="320px"
                />
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {/* BLOG */}
      {featuredPost ? (
        <section id="insights">
          <div className="wrapc" style={padTop96Bottom128}>
            <h2 className="h-sec reveal">Stories from the Travel Journal</h2>
            <div className="blog-grid">
              <Link href={`/blogs/${featuredPost.slug}`} className="blog-feat reveal">
                <div className="img">
                  <Image
                    src={getMediaUrl(featuredPost.featuredImage)}
                    alt={featuredPost.title}
                    fill
                    sizes="(max-width: 900px) 100vw, 600px"
                  />
                </div>
                <p className="meta">
                  {formatPostDate(featuredPost.publishedDate)}
                  {featuredPost.readTime ? (
                    <>
                      {" "}
                      <span className="sep">/</span> {featuredPost.readTime}
                    </>
                  ) : null}
                </p>
                <h3>{featuredPost.title}</h3>
                <p>{featuredPost.excerpt}</p>
              </Link>
              <div className="blog-col">
                {secondaryPosts.map((post) => (
                  <Link href={`/blogs/${post.slug}`} className="blog-sec reveal" key={post.id}>
                    <div className="img">
                      <Image
                        src={getMediaUrl(post.featuredImage)}
                        alt={post.title}
                        fill
                        sizes="(max-width: 700px) 100vw, 320px"
                      />
                    </div>
                    <div>
                      <p className="meta">
                        {formatPostDate(post.publishedDate)}
                        {post.readTime ? (
                          <>
                            {" "}
                            <span className="sep">/</span> {post.readTime}
                          </>
                        ) : null}
                      </p>
                      <h3>{post.title}</h3>
                      <p className="ex">{post.excerpt}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="reveal" style={{ marginTop: 48 }}>
              <Link href="/blogs" className="btn outline">
                <span>View more</span>
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      {/* FINAL CTA */}
      <section className="final-cta">
        <div className="wrapc" style={{ paddingTop: 110, paddingBottom: 110, textAlign: "center" }}>
          <p className="kicker reveal">Ready when you are</p>
          <h2 className="reveal display" style={{ marginTop: 14, maxWidth: "20ch", marginLeft: "auto", marginRight: "auto" }}>
            Where will you wake up next?
          </h2>
          <p
            className="sub reveal"
            style={{ marginLeft: "auto", marginRight: "auto", maxWidth: "46ch", color: "rgba(255,255,255,.88)" }}
          >
            Pick a departure, or tell us about the trip you have been dreaming of.
          </p>
          <div
            className="reveal"
            style={{ marginTop: 36, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}
          >
            <Link href="/packages" className="btn on-brand">
              <span>Explore Trips</span>
            </Link>
            <Link
              href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
              className="btn outline-light"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>WhatsApp Us</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="contact">
        <div className="wrapc" style={padTop96Bottom128}>
          <EnquiryForm />
        </div>
      </section>

      <Footer />

      {/* Desktop-only UI chrome — inert, empty of unique content, until the
          desktop-only script layer activates it. */}
      <div id="cursor" aria-hidden="true">
        <span>View ↗</span>
      </div>
    </>
  );
}
