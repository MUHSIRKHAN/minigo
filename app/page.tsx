import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HeroSequence from "./components/HeroSequence";
import PackageCard from "./components/PackageCard";
import DepartureList from "./components/DepartureList";
import EnquiryForm from "./components/EnquiryForm";
import { formatPostDate, getBlogPosts, getGalleryImages, getMediaUrl } from "./lib/payload";
import { PACKAGES, REGIONS, allUpcomingDepartures } from "./lib/packages";
import { BUSINESS, DEFAULT_WHATSAPP_MESSAGE, whatsappLink } from "./lib/site";

const padTop96Bottom128: CSSProperties = { paddingTop: 96, paddingBottom: 128 };

const WHY_US = [
  "Fixed departure dates & transparent prices",
  "Handpicked hotels, villas and lodges",
  "Expert local guides on every tour",
  "Small groups for a more personal trip",
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
    a: "Each tour runs on fixed departure dates listed on its page, with a per-person price and live seat availability. If your preferred date is full, join the waitlist or ask us for a private departure.",
  },
  {
    q: "What is included in the price?",
    a: "Every package lists exactly what is included — usually accommodation, breakfast, internal transfers, guides and the activities in the itinerary — and what is not, such as international flights and travel insurance.",
  },
  {
    q: "Can I travel on different dates or customise a tour?",
    a: "Yes. We design private and tailor-made versions of every itinerary for couples, families and groups, with the dates, pace and hotels you prefer.",
  },
  {
    q: "How do I book and pay?",
    a: "Send an enquiry from any departure. We confirm availability, share a final quote and send secure payment instructions — your seats are not charged until you have confirmed.",
  },
  {
    q: "Do you help with visas and travel insurance?",
    a: "We advise on visa requirements for your nationality and can recommend insurance cover. Both are the traveller's responsibility and are not included in package prices unless stated.",
  },
];

export default async function Home() {
  const [posts, galleryImages] = await Promise.all([getBlogPosts(), getGalleryImages()]);
  const [featuredPost, ...otherPosts] = posts;
  const secondaryPosts = otherPosts.slice(0, 2);
  const marqueeImages = galleryImages.length > 0 ? [...galleryImages, ...galleryImages] : [];

  const departures = allUpcomingDepartures();
  const nextDepartures = departures.slice(0, 5);

  return (
    <>
      <Header />

      {/* HERO */}
      <section id="top" className="hero">
        <HeroSequence />
        <div className="hero-groundline" aria-hidden="true"></div>
        <div className="hero-grid-lines" aria-hidden="true">
          <span className="v" style={{ left: "20%" }}></span>
          <span className="v" style={{ left: "50%" }}></span>
          <span className="v" style={{ left: "80%" }}></span>
        </div>
        <div className="wrap hero-content">
          <span className="hero-kicker">
            <span className="dot" aria-hidden="true"></span>Premium tours · Fixed departure dates
          </span>
          <h1 className="display">
            <span className="line">
              <span className="hero-seq__line-inner">Journeys worth</span>
            </span>
            <span className="line accent">
              <span className="hero-seq__line-inner">leaving home for.</span>
            </span>
          </h1>
          <p className="hero-desc">
            {BUSINESS.name} designs premium tour packages with handpicked stays, expert local
            guides and dated departures you can book today — from overwater villas and alpine
            railways to desert camps and blossom-season Japan.
          </p>
          <div className="hero-cta" style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <Link href="/packages" className="btn">
              <span>Explore Tour Packages</span>
            </Link>
            <Link href="#departures" className="btn outline-light">
              <span>See Departure Dates</span>
            </Link>
          </div>
          <div className="hero-chips">
            {REGIONS.map((region) => (
              <Link key={region} href={`/packages?region=${encodeURIComponent(region)}`} className="hero-chip">
                {region}
              </Link>
            ))}
          </div>
        </div>
        <div className="hero-trust-row hero-trust-corner">
          <p className="hero-trust">Small groups · Local experts · Dated departures</p>
        </div>
      </section>

      {/* STATS */}
      <section>
        <div className="wrapc" style={{ paddingTop: 64, paddingBottom: 64 }}>
          <div className="stats-grid">
            <div className="stat reveal">
              <div className="num" data-count={PACKAGES.length} data-suffix="">
                0
              </div>
              <p>Curated tour packages</p>
            </div>
            <div className="stat reveal">
              <div className="num" data-count={departures.length} data-suffix="">
                0
              </div>
              <p>Upcoming departures open to book</p>
            </div>
            <div className="stat reveal">
              <div className="num" data-count={REGIONS.length} data-suffix="">
                0
              </div>
              <p>Regions of the world covered</p>
            </div>
            <div className="stat reveal">
              <div className="num" data-count="14" data-suffix="">
                0
              </div>
              <p>Guests at most on a small-group tour</p>
            </div>
            <div className="stat reveal">
              <div className="num" data-count="24" data-suffix="h">
                0h
              </div>
              <p>Typical reply time to an enquiry</p>
            </div>
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="manifesto">
        <div className="wrap">
          <p>
            {BUSINESS.tagline} <em>Travel, beautifully planned.</em>
          </p>
          <div className="reveal" style={{ marginTop: 40 }}>
            <Link href="/about" className="btn">
              <span>About Us</span>
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED TOURS */}
      <section id="tours">
        <div className="wrapc sec-pad" style={padTop96Bottom128}>
          <p className="kicker reveal">Tour packages</p>
          <h2 className="h-sec reveal" style={{ marginTop: 12, maxWidth: "40ch" }}>
            Handpicked journeys, ready to book.
          </h2>
          <div className="pkg-grid">
            {PACKAGES.slice(0, 6).map((pkg) => (
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
      <section id="departures" style={{ background: "var(--bg-raised)" }}>
        <div className="wrapc" style={padTop96Bottom128}>
          <p className="kicker reveal">Next departures</p>
          <h2 className="h-sec reveal" style={{ marginTop: 12, maxWidth: "40ch" }}>
            Dates you can book right now.
          </h2>
          <DepartureList rows={nextDepartures} showPackage />
          <div className="reveal" style={{ marginTop: 40 }}>
            <Link href="/packages#departures" className="btn outline">
              <span>Full departure calendar</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about">
        <div className="wrapc" style={{ paddingTop: 96, paddingBottom: 112 }}>
          <div className="about-grid">
            <div>
              <p className="kicker reveal">Welcome to {BUSINESS.name}</p>
              <h2 className="h-sec reveal" style={{ marginTop: 12, maxWidth: "44ch" }}>
                Travel designed around how you want to feel.
              </h2>
              <p
                className="reveal"
                style={{ marginTop: 20, maxWidth: "52ch", fontSize: "15.5px", lineHeight: 1.6, color: "var(--fg-muted)" }}
              >
                A great holiday is rarely about ticking off sights — it is the pace, the people
                and the places you stay. At {BUSINESS.name} we build every package around
                handpicked hotels, knowledgeable local guides and itineraries with room to breathe,
                then put real dates and clear prices on them so planning is simple.
              </p>
              <div className="reveal" style={{ marginTop: 32, display: "flex", gap: 16, flexWrap: "wrap" }}>
                <Link href="/contact-us#enquiry" className="btn">
                  <span>Plan My Trip</span>
                </Link>
                <Link href="/packages" className="btn outline">
                  <span>Browse tours</span>
                </Link>
              </div>
            </div>
            <div className="about-mosaic reveal">
              <div className="about-tile">
                <span className="chk" aria-hidden="true">✓</span>
                <p>Handpicked stays &amp; experiences</p>
              </div>
              <div className="about-tile">
                <span className="chk" aria-hidden="true">✓</span>
                <p>Expert local guides</p>
              </div>
              <div className="about-tile">
                <span className="chk" aria-hidden="true">✓</span>
                <p>Fixed dates &amp; transparent pricing</p>
              </div>
              <div className="about-tile">
                <span className="chk" aria-hidden="true">✓</span>
                <p>Private &amp; tailor-made options</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section style={{ background: "var(--bg-raised)" }}>
        <div className="wrapc" style={padTop96Bottom128}>
          <div className="why-layout">
            <div className="why-photo reveal">
              <Image
                src="https://images.unsplash.com/photo-1527668752968-14dc70a27c95?w=900&q=80&fm=jpg&fit=crop&auto=format"
                alt="Travellers on a scenic mountain railway"
                fill
                sizes="(max-width: 900px) 100vw, 480px"
              />
            </div>
            <div>
              <p className="kicker reveal">Why {BUSINESS.name}</p>
              <h2 className="h-sec reveal" style={{ marginTop: 12, maxWidth: "44ch" }}>
                Why travel with us?
              </h2>
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

      {/* DESTINATIONS */}
      <section id="destinations">
        <div className="wrapc" style={padTop96Bottom128}>
          <p className="kicker reveal">Where we take you</p>
          <h2 className="h-sec reveal" style={{ marginTop: 12, maxWidth: "46ch" }}>
            Destinations on our departure calendar.
          </h2>
          <div className="jur-list">
            {PACKAGES.map((pkg) => (
              <Link key={pkg.slug} href={`/packages/${pkg.slug}`} className="reveal">
                {pkg.destination}
                <span className="comma">,</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section style={{ borderTop: "none" }}>
        <div className="wrapc" style={padTop96Bottom128}>
          <p className="kicker reveal">How it works</p>
          <h2 className="h-sec reveal" style={{ marginTop: 12, maxWidth: "52ch" }}>
            From first idea to boarding pass.
          </h2>
          <div className="proc-grid">
            {PROCESS.map((step) => (
              <div className="proc reveal" key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq">
        <div className="wrapc" style={padTop96Bottom128}>
          <p className="kicker reveal">FAQs</p>
          <h2 className="h-sec reveal" style={{ marginTop: 12, maxWidth: "44ch" }}>
            Frequently asked questions.
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
            <h2 className="h-sec reveal" style={{ maxWidth: "52ch" }}>
              Stories and travel tips from the Travel Journal.
            </h2>
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
        <div className="wrapc" style={{ paddingTop: 96, paddingBottom: 96, textAlign: "center" }}>
          <p className="kicker reveal">Ready when you are</p>
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
            Where will you wake up next?
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
            Pick a departure, or tell us about the trip you have been dreaming of — {BUSINESS.name}{" "}
            will take it from there.
          </p>
          <div
            className="reveal"
            style={{ marginTop: 32, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}
          >
            <Link href="/packages" className="btn on-brand">
              <span>Explore Tour Packages</span>
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
