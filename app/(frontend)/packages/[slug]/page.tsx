import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PackageCard from "../../components/PackageCard";
import DepartureList from "../../components/DepartureList";
import { formatPrice, startingPrice, upcomingDepartures } from "../../lib/packages";
import { getPackage, getPackages } from "../../lib/content";
import { BUSINESS, SITE_URL, whatsappLink } from "../../lib/site";

// Departure lists hide past dates at render time, so regenerate hourly.
export const revalidate = 3600;

export async function generateStaticParams() {
  return (await getPackages()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pkg = await getPackage(slug);
  if (!pkg) return {};

  const title = `${pkg.title} | ${BUSINESS.name}`;
  const url = `${SITE_URL}/packages/${pkg.slug}`;
  const from = startingPrice(pkg);
  const description = `${pkg.nights + 1}-day ${pkg.destination} tour package from Kerala${
    from !== null ? `, from ${formatPrice(from)} per person` : ""
  }. ${pkg.tagline}`;
  return {
    title,
    description,
    keywords: [
      `${pkg.destination} tour package`,
      `${pkg.destination} tour from Kerala`,
      `${pkg.destination} tour from Kozhikode`,
      `${pkg.destination} holiday package`,
      `${pkg.style} holiday`,
    ],
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: BUSINESS.shortName,
      title,
      description,
      images: [{ url: pkg.image, width: 1400, height: 933, alt: pkg.title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [pkg.image] },
  };
}

export default async function PackageDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const packages = await getPackages();
  const pkg = packages.find((p) => p.slug === slug);
  if (!pkg) notFound();

  const rows = upcomingDepartures(pkg).map((departure) => ({ pkg, departure }));
  const price = startingPrice(pkg);
  const related = packages.filter((p) => p.slug !== pkg.slug && p.region === pkg.region)
    .concat(packages.filter((p) => p.slug !== pkg.slug && p.region !== pkg.region))
    .slice(0, 3);

  const url = `${SITE_URL}/packages/${pkg.slug}`;
  const prices = rows.map((r) => r.departure.price);
  const anySeats = rows.some((r) => r.departure.seatsLeft > 0);
  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Tour packages", item: `${SITE_URL}/packages` },
          { "@type": "ListItem", position: 3, name: pkg.title, item: url },
        ],
      },
      {
        "@type": "TouristTrip",
        "@id": `${url}#trip`,
        name: pkg.title,
        description: pkg.summary,
        image: pkg.image,
        url,
        touristType: pkg.style,
        provider: { "@type": "TravelAgency", name: BUSINESS.name, url: SITE_URL },
        itinerary: {
          "@type": "ItemList",
          itemListElement: pkg.itinerary.map((step, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: `${step.day}: ${step.title}`,
            description: step.body,
          })),
        },
        ...(prices.length
          ? {
              offers: {
                "@type": "AggregateOffer",
                priceCurrency: BUSINESS.currency,
                lowPrice: Math.min(...prices),
                highPrice: Math.max(...prices),
                offerCount: prices.length,
                availability: anySeats ? "https://schema.org/InStock" : "https://schema.org/SoldOut",
                url,
              },
            }
          : {}),
      },
    ],
  };

  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }} />

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
