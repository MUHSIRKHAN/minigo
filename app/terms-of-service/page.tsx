import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { BUSINESS, SITE_URL } from "../lib/site";
import Link from "next/link";

const TITLE = `Terms & Booking Conditions | ${BUSINESS.name}`;
const DESCRIPTION = `The terms and booking conditions that govern your use of the ${BUSINESS.name} website and the tours we arrange.`;
const PATH = "/terms-of-service";

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
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
  },
};

// TODO: this is a starting template, not legal advice. Have a lawyer in your
// jurisdiction review and complete it (payment schedule, cancellation scale,
// governing law, licensing/registration details) before taking real bookings.
export default function TermsOfServicePage() {
  return (
    <>
      <Header />

      <article>
        <div className="wrapc blog-article" style={{ paddingTop: 128, paddingBottom: 112 }}>
          <p className="kicker reveal" style={{ color: "var(--accent)" }}>
            Legal
          </p>
          <h1 className="reveal" style={{ marginTop: 8 }}>
            Terms &amp; Booking Conditions
          </h1>
          <p className="blog-lede reveal" style={{ marginTop: 16 }}>
            Last updated: October 2026
          </p>

          <div className="rich-text reveal">
            <h2>1. Agreement to Terms</h2>
            <p>
              By using the {BUSINESS.name} website ({SITE_URL}) or booking a tour with us, you
              agree to these terms and booking conditions. If you do not agree, please do not use
              the website or make a booking.
            </p>

            <h2>2. Our Services</h2>
            <p>
              {BUSINESS.name} designs and arranges tour packages, including accommodation,
              transfers, guided experiences and related services provided by us or by selected
              third-party suppliers such as hotels, airlines and local operators. Package pages
              list what is and is not included in each price.
            </p>

            <h2>3. Prices, Dates and Availability</h2>
            <ul>
              <li>Prices shown are per person, in {BUSINESS.currency}, and are based on twin sharing unless stated.</li>
              <li>Departure dates and seat availability shown on the website are indicative until we confirm your booking in writing.</li>
              <li>Prices may change before booking is confirmed because of supplier, currency or tax changes.</li>
            </ul>

            <h2>4. Booking and Payment</h2>
            <p>
              A booking is confirmed only when we send you a written confirmation and have
              received the deposit or payment stated in your quote. The balance is due by the
              date shown on your confirmation. If payment is not received on time we may cancel
              the booking and release your seats.
            </p>

            <h2>5. Cancellations and Changes</h2>
            <p>
              If you cancel or change a confirmed booking, cancellation charges may apply, based
              on how close to departure you notify us and on the charges our suppliers impose.
              The exact charges are stated in your quote or booking confirmation. Please notify
              us of any change in writing.
            </p>
            <p>
              If we have to cancel or significantly change a tour, for example because of too few
              travellers, safety concerns or events outside our control, we will offer you an
              alternative departure or a refund of the amounts you have paid to us.
            </p>

            <h2>6. Traveller Responsibilities</h2>
            <ul>
              <li>Hold a valid passport and any visas, permits and health documents required for your journey.</li>
              <li>Provide accurate names and details exactly as shown on your passport.</li>
              <li>Arrange appropriate travel insurance. We strongly recommend comprehensive cover for every traveller.</li>
              <li>Tell us in advance about any medical, dietary or mobility needs that may affect the trip.</li>
              <li>Follow the reasonable instructions of tour guides and suppliers.</li>
            </ul>

            <h2>7. Limitation of Liability</h2>
            <p>
              We take reasonable care in selecting suppliers and arranging your trip. To the
              maximum extent permitted by applicable law, {BUSINESS.name} is not liable for loss,
              injury, delay or damage caused by suppliers, by events outside our reasonable
              control (such as severe weather, strikes, natural disasters, government action or
              pandemics), or by your own actions or failure to follow instructions.
            </p>

            <h2>8. Intellectual Property</h2>
            <p>
              The content of this website, including text, photographs, logos and itineraries, is
              owned by or licensed to {BUSINESS.name} and may not be copied or reused without our
              written permission.
            </p>

            <h2>9. Modifications to Terms</h2>
            <p>
              We may update these terms from time to time. The version in force when you make
              your booking applies to that booking. The &ldquo;Last updated&rdquo; date above shows
              when this page last changed.
            </p>

            <h2>10. Governing Law</h2>
            <p>
              These terms are governed by the laws of {BUSINESS.addressCountry}. Disputes will be
              subject to the courts of that jurisdiction unless applicable consumer law gives you
              the right to bring a claim elsewhere.
            </p>

            <h2>11. Contact Information</h2>
            <p>
              {BUSINESS.name}
              <br />
              {BUSINESS.streetAddress}, {BUSINESS.addressLocality}, {BUSINESS.addressCountry}
              <br />
              Email: <Link href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</Link>
              <br />
              Phone: <Link href={`tel:${BUSINESS.telephoneHref}`}>{BUSINESS.telephone}</Link>
            </p>
          </div>
        </div>
      </article>

      <Footer />
    </>
  );
}
