import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PackageCard from "../../components/PackageCard";
import DepartureList from "../../components/DepartureList";
import {
  PACKAGES,
  formatPrice,
  getPackage,
  startingPrice,
  upcomingDepartures,
} from "../../lib/packages";
import { BUSINESS, SITE_URL, whatsappLink } from "../../lib/site";

// Departure lists hide past dates at render time, so regenerate hourly.
export const revalidate = 3600;

export function generateStaticParams() {
  return PACKAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pkg = getPackage(slug);
  if (!pkg) return {};

  const title = `${pkg.title} | ${BUSINESS.name}`;
  const url = `${SITE_URL}/packages/${pkg.slug}`;
  return {
    title,
    description: pkg.summary,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: BUSINESS.shortName,
      title,
      description: pkg.summary,
      images: [{ url: pkg.image, width: 1400, height: 933, alt: pkg.title }],
    },
    twitter: { card: "summary_large_image", title, description: pkg.summary, images: [pkg.image] },
  };
}

export default async function PackageDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pkg = getPackage(slug);
  if (!pkg) notFound();

  const rows = upcomingDepartures(pkg).map((departure) => ({ pkg, departure }));
  const price = startingPrice(pkg);
  const related = PACKAGES.filter((p) => p.slug !== pkg.slug && p.region === pkg.region)
    .concat(PACKAGES.filter((p) => p.slug !== pkg.slug && p.region !== pkg.region))
    .slice(0, 3);

  const tripSchema = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: pkg.title,
    description: pkg.summary,
    image: pkg.image,
    touristType: pkg.style,
    provider: { "@type": "TravelAgency", name: BUSINESS.name, url: SITE_URL },
    ...(price !== null
      ? { offers: { "@type": "Offer", price, priceCurrency: BUSINESS.currency, url: `${SITE_URL}/packages/${pkg.slug}` } }
      : {}),
  };

  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(tripSchema) }} />

      <section className="page-hero">
        <Image className="bg" src={pkg.image} alt="" aria-hidden="true" fill sizes="100vw" priority />
        <div className="overlay" aria-hidden="true"></div>
        <div className="wrap inner">
          <p className="crumbs">
            <Link href="/packages">Tour Packages</Link> / {pkg.destination}
          </p>
          <h1 className="reveal">{pkg.title}</h1>
          <p className="reveal">{pkg.tagline}</p>
          <div className="hero-actions reveal">
            <Link href="#departures" className="btn on-brand">
              <span>View dates &amp; prices</span>
            </Link>
            <Link
              href={whatsappLink(`Hi ${BUSINESS.name}, I'd like to know more about "${pkg.title}".`)}
              className="btn outline-light"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Ask on WhatsApp</span>
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="wrapc" style={{ paddingTop: 48, paddingBottom: 48 }}>
          <div className="pkg-facts reveal">
            <div>
              <span className="k">Duration</span>
              <span className="v">
                {pkg.nights + 1} days · {pkg.nights} nights
              </span>
            </div>
            <div>
              <span className="k">From</span>
              <span className="v">{price !== null ? `${formatPrice(price)} pp` : "On request"}</span>
            </div>
            <div>
              <span className="k">Group</span>
              <span className="v" style={{ fontSize: "1.15rem" }}>{pkg.groupSize}</span>
            </div>
            <div>
              <span className="k">Style</span>
              <span className="v" style={{ fontSize: "1.15rem" }}>{pkg.style}</span>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrapc" style={{ paddingTop: 80, paddingBottom: 96 }}>
          <div className="pkg-cols">
            <div>
              <p className="kicker reveal">Overview</p>
              <h2 className="h-sec reveal" style={{ marginTop: 12, maxWidth: "26ch" }}>
                {pkg.destination}, done properly.
              </h2>
              <p className="reveal" style={{ marginTop: 20, maxWidth: "56ch", fontSize: "15.5px", lineHeight: 1.65, color: "var(--fg-muted)" }}>
                {pkg.summary}
              </p>
            </div>
            <div>
              <p className="kicker reveal">Highlights</p>
              <div className="pkg-list">
                {pkg.highlights.map((h) => (
                  <div className="reveal" key={h}>
                    <span className="check" aria-hidden="true">✓</span>
                    {h}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="departures" style={{ background: "var(--bg-raised)" }}>
        <div className="wrapc" style={{ paddingTop: 80, paddingBottom: 96 }}>
          <p className="kicker reveal">Departure dates</p>
          <h2 className="h-sec reveal" style={{ marginTop: 12, maxWidth: "40ch" }}>
            Choose your departure.
          </h2>
          <DepartureList rows={rows} />
          <p className="reveal" style={{ marginTop: 16, fontSize: "13px", color: "var(--fg-muted)" }}>
            Prices are per person based on twin sharing. Seat availability changes quickly — an
            enquiry holds your place while we confirm details.
          </p>
        </div>
      </section>

      <section id="itinerary">
        <div className="wrapc" style={{ paddingTop: 80, paddingBottom: 96 }}>
          <p className="kicker reveal">Itinerary</p>
          <h2 className="h-sec reveal" style={{ marginTop: 12, maxWidth: "40ch" }}>
            Day by day.
          </h2>
          <div className="faq-list">
            {pkg.itinerary.map((step, i) => (
              <details className="faq-item" key={step.day} open={i === 0}>
                <summary>
                  <span className="faq-left">
                    <span className="faq-num">{step.day}</span>
                    <span className="faq-q">{step.title}</span>
                  </span>
                  <span className="faq-icon" aria-hidden="true">+</span>
                </summary>
                <p>{step.body}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "var(--bg-raised)" }}>
        <div className="wrapc" style={{ paddingTop: 80, paddingBottom: 96 }}>
          <div className="pkg-cols">
            <div>
              <p className="kicker reveal">What&rsquo;s included</p>
              <div className="pkg-list">
                {pkg.included.map((item) => (
                  <div className="reveal" key={item}>
                    <span className="check" aria-hidden="true">✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="kicker reveal">Not included</p>
              <div className="pkg-list no">
                {pkg.notIncluded.map((item) => (
                  <div className="reveal" key={item}>
                    <span className="check" aria-hidden="true">–</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrapc" style={{ paddingTop: 80, paddingBottom: 96 }}>
          <p className="kicker reveal">You may also like</p>
          <h2 className="h-sec reveal" style={{ marginTop: 12 }}>
            More journeys.
          </h2>
          <div className="pkg-grid three">
            {related.map((p) => (
              <PackageCard key={p.slug} pkg={p} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
