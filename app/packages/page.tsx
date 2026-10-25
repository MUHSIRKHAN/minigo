import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PackageCard from "../components/PackageCard";
import DepartureList from "../components/DepartureList";
import ComingSoon from "../components/ComingSoon";
import { UPCOMING } from "../lib/upcoming";
import { PACKAGES, REGIONS, allUpcomingDepartures, type Region } from "../lib/packages";
import { BUSINESS, SITE_URL, whatsappLink } from "../lib/site";

const TITLE = `Tour Packages & Departure Dates | ${BUSINESS.name}`;
const DESCRIPTION =
  "Kashmir, Lakshadweep, Goa, Golden Triangle, Hyderabad, Vietnam and Kazakhstan tour packages from Kerala: group departures and private trips, with per-person prices in rupees.";
const PATH = "/packages";

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

export default async function PackagesPage({
  searchParams,
}: {
  searchParams: Promise<{ region?: string }>;
}) {
  const { region } = await searchParams;
  const activeRegion = REGIONS.find((r) => r === region) as Region | undefined;
  const packages = activeRegion ? PACKAGES.filter((p) => p.region === activeRegion) : PACKAGES;
  const departures = allUpcomingDepartures().filter(({ departure }) => !departure.closed).filter(
    ({ pkg }) => !activeRegion || pkg.region === activeRegion,
  );

  const listSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Tour packages",
    itemListElement: PACKAGES.map((pkg, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/packages/${pkg.slug}`,
      name: pkg.title,
    })),
  };

  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }} />

      <section className="page-hero">
        <Image className="bg" src={BUSINESS.ogImage} alt="" aria-hidden="true" fill sizes="100vw" priority />
        <div className="overlay" aria-hidden="true"></div>
        <div className="wrap inner">
          <p className="kicker reveal">Tour Packages</p>
          <h1 className="reveal">Journeys with a date in the diary.</h1>
          <p className="reveal">
            Group tours on fixed dates and private trips on dates that suit you, each with a clear
            per-person price — pick a trip and we take care of the rest.
          </p>
        </div>
      </section>

      <section>
        <div className="wrapc" style={{ paddingTop: 72, paddingBottom: 96 }}>
          <p className="kicker reveal">Find your trip</p>
          <h2 className="h-sec reveal" style={{ marginTop: 12 }}>
            {activeRegion ? `${activeRegion} tours` : "All tour packages"}
          </h2>
          <nav className="region-filter reveal" aria-label="Filter by region">
            <Link href="/packages" className={!activeRegion ? "on" : undefined}>
              All
            </Link>
            {REGIONS.map((r) => (
              <Link key={r} href={`/packages?region=${encodeURIComponent(r)}`} className={r === activeRegion ? "on" : undefined}>
                {r}
              </Link>
            ))}
          </nav>

          {packages.length > 0 ? (
            <div className="pkg-grid">
              {packages.map((pkg) => (
                <PackageCard key={pkg.slug} pkg={pkg} />
              ))}
            </div>
          ) : (
            <p className="dep-empty">No tours in this region yet — check back soon.</p>
          )}
        </div>
      </section>

      <section id="departures" style={{ background: "var(--bg-raised)" }}>
        <div className="wrapc" style={{ paddingTop: 80, paddingBottom: 96 }}>
          <p className="kicker reveal">Departure calendar</p>
          <h2 className="h-sec reveal" style={{ marginTop: 12, maxWidth: "40ch" }}>
            Every upcoming departure, soonest first.
          </h2>
          <DepartureList rows={departures} showPackage visible={6} />
        </div>
      </section>

      <ComingSoon trips={UPCOMING} tone="plain" />

      <section className="final-cta">
        <div className="wrapc" style={{ paddingTop: 96, paddingBottom: 96, textAlign: "center" }}>
          <p className="kicker reveal">Something different in mind?</p>
          <h2
            className="reveal display"
            style={{ marginTop: 12, maxWidth: "32ch", marginLeft: "auto", marginRight: "auto", fontWeight: 500, fontSize: "2.5rem", lineHeight: 1.05, color: "var(--bg)" }}
          >
            We also build private, tailor-made itineraries.
          </h2>
          <p
            className="reveal"
            style={{ marginTop: 16, maxWidth: "52ch", marginLeft: "auto", marginRight: "auto", fontSize: "15.5px", color: "rgba(250,250,247,.75)" }}
          >
            Different dates, a bigger group, a honeymoon or a milestone celebration — tell us what
            you have in mind and we&rsquo;ll design it around you.
          </p>
          <div className="reveal" style={{ marginTop: 32, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact-us#enquiry" className="btn on-brand">
              <span>Plan My Trip</span>
            </Link>
            <Link
              href={whatsappLink(`Hi ${BUSINESS.name}, I'd like a tailor-made itinerary.`)}
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
