import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { PACKAGES, REGIONS, allUpcomingDepartures } from "../lib/packages";
import { BUSINESS, DEFAULT_WHATSAPP_MESSAGE, SITE_URL, whatsappLink } from "../lib/site";

const TITLE = `About Us | ${BUSINESS.name}`;
const DESCRIPTION = `${BUSINESS.name} is a premium travel and tour company building small-group and private journeys with handpicked stays, expert local guides and dated departures.`;
const PATH = "/about";

// The upcoming-departures count is computed at render time, so regenerate hourly.
export const revalidate = 3600;

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
    images: [{ url: BUSINESS.ogImage, width: 1200, height: 630, alt: TITLE }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [BUSINESS.ogImage] },
};

const VALUES = [
  { title: "Thoughtful pacing", body: "Itineraries with space to breathe — fewer hotel changes, unhurried mornings and time to wander." },
  { title: "Honest pricing", body: "A clear per-person price for every departure, with exactly what is and is not included spelled out." },
  { title: "Local first", body: "Guides, drivers and hosts who live where you travel, so you meet a place through the people who know it." },
  { title: "Small by design", body: "Small groups and private departures keep every trip personal, flexible and low-impact." },
  { title: "Care throughout", body: "One team from your first enquiry to the moment you are home, reachable before, during and after your trip." },
  { title: "Responsible travel", body: "We choose partners who treat their staff, communities and environment well, and we travel lightly." },
];

export default function AboutPage() {
  const departures = allUpcomingDepartures().length;

  return (
    <>
      <Header />

      <section className="page-hero">
        <Image className="bg" src={BUSINESS.ogImage} alt="" aria-hidden="true" fill sizes="100vw" priority />
        <div className="overlay" aria-hidden="true"></div>
        <div className="wrap inner">
          <p className="kicker reveal">About Us</p>
          <h1 className="reveal">Travel, beautifully planned.</h1>
          <p className="reveal">
            {BUSINESS.name} designs premium tour packages for travellers who want the story, not
            just the sights — with dated departures, small groups and a team behind you the whole
            way.
          </p>
        </div>
      </section>

      <section>
        <div className="wrapc" style={{ paddingTop: 64, paddingBottom: 64 }}>
          <div className="stats-grid">
            <div className="stat reveal">
              <div className="num" data-count={PACKAGES.length} data-suffix="">{PACKAGES.length}</div>
              <p>Curated tour packages</p>
            </div>
            <div className="stat reveal">
              <div className="num" data-count={departures} data-suffix="">{departures}</div>
              <p>Upcoming departures</p>
            </div>
            <div className="stat reveal">
              <div className="num" data-count={REGIONS.length} data-suffix="">{REGIONS.length}</div>
              <p>Regions covered</p>
            </div>
            <div className="stat reveal">
              <div className="num" data-count="14" data-suffix="">14</div>
              <p>Guests at most per group</p>
            </div>
            <div className="stat reveal">
              <div className="num" data-count="24" data-suffix="h">24h</div>
              <p>Typical reply time</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrapc" style={{ paddingTop: 96, paddingBottom: 112 }}>
          <p className="kicker reveal">What drives us</p>
          <h2 className="h-sec reveal" style={{ marginTop: 12, maxWidth: "44ch" }}>
            Vision &amp; Mission
          </h2>
          <div className="vm-grid">
            <div className="vm-card reveal">
              <span className="value-num">01</span>
              <h3>Our Vision</h3>
              <p>
                To be the travel company people trust with the trips that matter — the honeymoon,
                the milestone birthday, the journey they have saved up for.
              </p>
              <p style={{ marginTop: 14 }}>
                We believe a premium holiday is defined by how well it is planned: the right
                places to stay, the right people to guide you and the right pace for you.
              </p>
            </div>
            <div className="vm-card reveal">
              <span className="value-num">02</span>
              <h3>Our Mission</h3>
              <p>
                To design and run exceptional journeys with clear dates, clear prices and a team
                that handles every detail, so travellers can simply enjoy the trip.
              </p>
              <p style={{ marginTop: 14 }}>
                Whether you join a scheduled departure or want a private itinerary built from
                scratch, you get the same care, the same standards and the same people.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--bg-raised)" }}>
        <div className="wrapc" style={{ paddingTop: 96, paddingBottom: 112 }}>
          <p className="kicker reveal">Our values</p>
          <h2 className="h-sec reveal" style={{ marginTop: 12, maxWidth: "52ch" }}>
            The principles behind every journey.
          </h2>
          <div className="values-grid">
            {VALUES.map((v, i) => (
              <div className="value-card reveal" key={v.title}>
                <span className="value-num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="manifesto">
        <div className="wrap">
          <p>
            {BUSINESS.tagline} <em>Let us plan the rest.</em>
          </p>
        </div>
      </section>

      <section className="final-cta">
        <div className="wrapc" style={{ paddingTop: 96, paddingBottom: 96, textAlign: "center" }}>
          <p className="kicker reveal">Start planning</p>
          <h2
            className="reveal display"
            style={{ marginTop: 12, maxWidth: "32ch", marginLeft: "auto", marginRight: "auto", fontWeight: 500, fontSize: "2.5rem", lineHeight: 1.05, color: "var(--bg)" }}
          >
            Ready to see the world differently?
          </h2>
          <p
            className="reveal"
            style={{ marginTop: 16, maxWidth: "52ch", marginLeft: "auto", marginRight: "auto", fontSize: "15.5px", color: "rgba(250,250,247,.75)" }}
          >
            Browse our departures or tell us about the trip you are dreaming of.
          </p>
          <div className="reveal" style={{ marginTop: 32, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
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

      <Footer />
    </>
  );
}
