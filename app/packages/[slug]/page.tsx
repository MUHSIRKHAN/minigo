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
  durationText,
  formatPrice,
  getPackage,
  startingPrice,
  upcomingDepartures,
  type TourPackage,
} from "../../lib/packages";
import { BUSINESS, SITE_URL, whatsappLink } from "../../lib/site";

// Departure lists hide past dates at render time, so regenerate hourly.
export const revalidate = 3600;

/** Shown wherever a detail isn't published yet, so the page never guesses. */
function AskForDetails({ pkg, what }: { pkg: TourPackage; what: string }) {
  return (
    <div className="ask-box reveal">
      <p>Contact us for the {what} of this tour. We&rsquo;ll share the latest details on WhatsApp or by email.</p>
      <Link
        href={whatsappLink(`Hi ${BUSINESS.name}, could you share the ${what} for "${pkg.title}"?`)}
        className="btn sm"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>Ask on WhatsApp</span>
      </Link>
    </div>
  );
}

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
  const from = startingPrice(pkg);
  const duration = durationText(pkg, true);
  const description = `${pkg.destination} tour package from Kerala${duration ? ` (${duration})` : ""}, from ${formatPrice(
    from,
  )} per person. ${pkg.tagline}`;
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
  const pkg = getPackage(slug);
  if (!pkg) notFound();

  const rows = upcomingDepartures(pkg).map((departure) => ({ pkg, departure }));
  const price = startingPrice(pkg);
  const related = PACKAGES.filter((p) => p.slug !== pkg.slug && p.region === pkg.region)
    .concat(PACKAGES.filter((p) => p.slug !== pkg.slug && p.region !== pkg.region))
    .slice(0, 3);

  const url = `${SITE_URL}/packages/${pkg.slug}`;
  const duration = durationText(pkg);
  const onRequest = Boolean(pkg.datesOnRequest) && rows.length === 0;
  const prices = [
    pkg.fromPrice,
    ...(pkg.priceOptions ?? []).map((o) => o.price),
    ...(pkg.priceTable?.rows ?? []).flatMap((r) => r.prices),
  ];
  const anySeats = pkg.datesOnRequest || rows.some((r) => !r.departure.closed && r.departure.seatsLeft !== 0);
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
        ...(pkg.itinerary.length
          ? {
              itinerary: {
                "@type": "ItemList",
                itemListElement: pkg.itinerary.map((step, i) => ({
                  "@type": "ListItem",
                  position: i + 1,
                  name: `${step.day}: ${step.title}`,
                  description: step.body,
                })),
              },
            }
          : {}),
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
              <span className="v">{duration ?? "Ask us"}</span>
            </div>
            <div>
              <span className="k">From</span>
              <span className="v">{formatPrice(price)} pp</span>
            </div>
            <div>
              <span className="k">Group</span>
              <span className="v" style={{ fontSize: "1.15rem" }}>{pkg.groupSize ?? "Ask us"}</span>
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

      {pkg.priceOptions || pkg.priceTable ? (
        <section id="prices">
          <div className="wrapc" style={{ paddingTop: 16, paddingBottom: 80 }}>
            <p className="kicker reveal">Prices</p>
            <h2 className="h-sec reveal" style={{ marginTop: 12, maxWidth: "40ch" }}>
              Choose your option.
            </h2>
            {pkg.priceOptions ? (
              <div className="price-opts">
                {pkg.priceOptions.map((o) => (
                  <div className="price-opt reveal" key={o.label}>
                    <span className="k">{o.label}</span>
                    <strong>{formatPrice(o.price)}</strong>
                    <span className="n">{o.note}</span>
                  </div>
                ))}
              </div>
            ) : null}
            {pkg.priceTable ? (
              <div className="price-table reveal">
                <table>
                  <thead>
                    <tr>
                      <th scope="col">Itinerary</th>
                      <th scope="col">Days</th>
                      {pkg.priceTable.columns.map((c) => (
                        <th scope="col" key={c}>
                          {c}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {pkg.priceTable.rows.map((r) => (
                      <tr key={r.name}>
                        <th scope="row">{r.name}</th>
                        <td className="days">{r.days}</td>
                        {r.prices.map((amount, i) => (
                          <td key={pkg.priceTable!.columns[i]} data-label={pkg.priceTable!.columns[i]}>
                            {formatPrice(amount)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
            {pkg.priceNote ? <p className="price-note reveal">{pkg.priceNote}</p> : null}
            {pkg.hotels ? (
              <div className="price-hotels reveal">
                <span className="k">Hotels</span>
                <ul>
                  {pkg.hotels.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      <section id="departures" style={{ background: "var(--bg-raised)" }}>
        <div className="wrapc" style={{ paddingTop: 80, paddingBottom: 96 }}>
          <p className="kicker reveal">Departure dates</p>
          <h2 className="h-sec reveal" style={{ marginTop: 12, maxWidth: "40ch" }}>
            {onRequest ? "Travel on your dates." : "Choose your departure."}
          </h2>
          {onRequest ? (
            <div className="ask-box reveal">
              <p>
                This tour runs on dates that suit your group{pkg.groupSize ? ` (${pkg.groupSize.toLowerCase()})` : ""}.
                Tell us when you&rsquo;d like to travel and we&rsquo;ll confirm availability and the final price.
              </p>
              <Link
                href={whatsappLink(`Hi ${BUSINESS.name}, we would like to plan "${pkg.title}". Our preferred dates are: `)}
                className="btn sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Plan dates on WhatsApp</span>
              </Link>
            </div>
          ) : (
            <>
              <DepartureList rows={rows} />
              <p className="reveal" style={{ marginTop: 16, fontSize: "13px", color: "var(--fg-muted)" }}>
                Prices shown are starting prices per person. Seat availability changes quickly — an enquiry holds your
                place while we confirm details.
              </p>
            </>
          )}
        </div>
      </section>

      <section id="itinerary">
        <div className="wrapc" style={{ paddingTop: 80, paddingBottom: 96 }}>
          <p className="kicker reveal">Itinerary</p>
          <h2 className="h-sec reveal" style={{ marginTop: 12, maxWidth: "40ch" }}>
            Day by day.
          </h2>
          {pkg.itinerary.length === 0 ? <AskForDetails pkg={pkg} what="day-by-day itinerary" /> : null}
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
              {pkg.included.length === 0 ? <AskForDetails pkg={pkg} what="full list of inclusions" /> : null}
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
              {pkg.notIncluded.length === 0 ? <AskForDetails pkg={pkg} what="exclusions" /> : null}
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
          {pkg.notes ? (
            <div className="pkg-notes reveal">
              <span className="k">Good to know</span>
              <ul>
                {pkg.notes.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </div>
          ) : null}
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
