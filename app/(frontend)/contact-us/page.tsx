import type { Metadata } from "next";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import EnquiryForm from "../components/EnquiryForm";
import { formatDate } from "../lib/packages";
import { BUSINESS, SITE_URL } from "../lib/site";

const TITLE = `Contact Us | ${BUSINESS.name}`;
const DESCRIPTION = `Planning a holiday? Send ${BUSINESS.name} an enquiry about a tour package, a departure date or a tailor-made itinerary.`;
const PATH = "/contact-us";

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

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export default async function ContactUsPage({
  searchParams,
}: {
  searchParams: Promise<{ package?: string; date?: string }>;
}) {
  const { package: pkgTitle, date } = await searchParams;
  // Prefill comes from the departure "Enquire" buttons; only plain text is rendered as a default value.
  const service = pkgTitle?.slice(0, 120) ?? "";
  const message = date && ISO_DATE.test(date) ? `Preferred departure: ${formatDate(date)}\nTravellers: ` : "";

  return (
    <>
      <Header />

      <section className="page-hero">
        <Image className="bg" src={BUSINESS.ogImage} alt="" aria-hidden="true" fill sizes="100vw" priority />
        <div className="overlay" aria-hidden="true"></div>
        <div className="wrap inner">
          <p className="kicker reveal">Contact Us</p>
          <h1 className="reveal">Let&rsquo;s plan your next journey.</h1>
          <p className="reveal">
            Ask about a departure, request a quote or tell us about the trip you have in mind —
            we reply within one business day.
          </p>
        </div>
      </section>

      <section className="contact">
        <div className="wrapc" style={{ paddingTop: 96, paddingBottom: 128 }}>
          <EnquiryForm defaultService={service} defaultMessage={message} />

          <div className="map-embed reveal">
            <iframe
              src={`https://www.google.com/maps?q=${encodeURIComponent(`Hilite Business Park, ${BUSINESS.addressLocality}`)}&output=embed`}
              title={`${BUSINESS.name} location`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
