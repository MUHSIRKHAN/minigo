import type { Metadata } from "next";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { BUSINESS, SITE_URL } from "../lib/site";
import Link from "next/link";

const TITLE = "Business Setup in Dubai | Bizpoint Prime Business Solutions LLC";
const DESCRIPTION =
  "End-to-end company formation in Dubai Mainland, Free Zones, and Offshore — trade name reservation, MOA drafting, licence issuance, and bank account assistance from Bizpoint Prime Business Solutions LLC.";
const OG_IMAGE =
  "https://images.unsplash.com/photo-1574188231145-5f204395d7d5?w=1200&h=630&q=80&fm=jpg&fit=crop&auto=format";
const PATH = "/business-setup-dubai";

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

const otherServices = [
  { slug: "legal-translation-dubai", title: "Legal Translation" },
  { slug: "notary-services", title: "Notary Services" },
  { slug: "document-attestation", title: "Attestation Services" },
  { slug: "vat-registration", title: "VAT Registration" },
  { slug: "golden-visa-services", title: "Golden Visa Services" },
  { slug: "family-visa-services", title: "Family Visa Services" },
  { slug: "pro-services-dubai", title: "PRO Services" },
  { slug: "typing-services", title: "Typing Services" },
  { slug: "branding-marketing", title: "Branding & Marketing" },
];

export default function BusinessSetupDubaiPage() {
  return (
    <>
      <Header />

      {/* PAGE HERO */}
      <section className="page-hero">
        <Image
          className="bg"
          src="https://images.unsplash.com/photo-1574188231145-5f204395d7d5?w=1920&q=80&fm=jpg&fit=crop&auto=format"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          priority
        />
        <div className="overlay" aria-hidden="true"></div>
        <div className="wrap inner">
          <p className="kicker reveal" style={{ color: "var(--accent)" }}>
            Services / Business Setup
          </p>
          <h1 className="reveal">Business Setup in Dubai</h1>
          <p className="reveal">
            End-to-end company formation services in Dubai Mainland, Free Zones, and Offshore —
            from trade name reservation to licence issuance and beyond.
          </p>
        </div>
      </section>

      {/* INTRO */}
      <section>
        <div className="wrapc" style={{ paddingTop: 96, paddingBottom: 64 }}>
          <p className="kicker reveal">Start Your Business the Right Way</p>
          <h2 className="h-sec reveal" style={{ marginTop: 12, maxWidth: "48ch" }}>
            The UAE offers a dynamic business environment — choosing the right structure is what makes it work for you.
          </h2>
          <p
            className="reveal"
            style={{ marginTop: 20, maxWidth: "62ch", fontSize: "15.5px", lineHeight: 1.6, color: "var(--fg-muted)" }}
          >
            Launching a company in the UAE means choosing between mainland, free zone, and
            offshore structures — each with its own ownership rules, visa quotas, and cost
            profile. Selecting the right jurisdiction and completing registration requires local
            expertise, and that&rsquo;s exactly what our team brings. We provide comprehensive
            business setup solutions tailored to your specific needs, carrying you from trade name
            to licence issuance and beyond.
          </p>
          <div className="about-checklist">
            <div className="reveal">
              <span className="check" aria-hidden="true">✓</span>Mainland Company Formation (LLC, Sole Establishment)
            </div>
            <div className="reveal">
              <span className="check" aria-hidden="true">✓</span>Free Zone Company Setup (DMCC, IFZA, DAFZA &amp; more)
            </div>
            <div className="reveal">
              <span className="check" aria-hidden="true">✓</span>Offshore Company Registration
            </div>
            <div className="reveal">
              <span className="check" aria-hidden="true">✓</span>Trade Name Reservation &amp; Initial Approval
            </div>
            <div className="reveal">
              <span className="check" aria-hidden="true">✓</span>MOA &amp; Local Sponsor Agreement Drafting
            </div>
            <div className="reveal">
              <span className="check" aria-hidden="true">✓</span>Corporate Bank Account Opening Assistance
            </div>
          </div>
          <p
            className="reveal"
            style={{ marginTop: 28, maxWidth: "62ch", fontSize: "14.5px", lineHeight: 1.6, color: "var(--fg-muted)" }}
          >
            Beyond the licence, we provide ongoing PRO services, legal translation, and visa
            support — so your business keeps running smoothly long after incorporation.
          </p>
          <div className="reveal" style={{ marginTop: 32, display: "flex", gap: 16, flexWrap: "wrap" }}>
            <Link href="/contact-us" className="btn">
              <span>Get a Free Consultation</span>
            </Link>
            <Link href="/services" className="btn outline">
              <span>Explore All Services</span>
            </Link>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section style={{ background: "var(--bg-raised)" }}>
        <div className="wrapc" style={{ paddingTop: 80, paddingBottom: 96 }}>
          <p className="kicker reveal">Our Process</p>
          <h2 className="h-sec reveal" style={{ marginTop: 12, maxWidth: "48ch" }}>
            How we take your company from idea to licence.
          </h2>
          <div className="proc-grid">
            <div className="proc reveal">
              <h3>Consultation</h3>
              <p>We assess your activity and goals to recommend mainland, free zone, or offshore.</p>
            </div>
            <div className="proc reveal">
              <h3>Structuring</h3>
              <p>Trade name reservation, initial approval, and MOA or sponsor agreement drafting.</p>
            </div>
            <div className="proc reveal">
              <h3>Licensing</h3>
              <p>We submit your application and coordinate with authorities through to licence issuance.</p>
            </div>
            <div className="proc reveal">
              <h3>Launch</h3>
              <p>Bank account assistance, visas, and PRO support to get you fully operational.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section>
        <div className="wrapc" style={{ paddingTop: 96, paddingBottom: 96 }}>
          <p className="kicker reveal">FAQs</p>
          <h2 className="h-sec reveal" style={{ marginTop: 12, maxWidth: "44ch" }}>
            Frequently asked questions.
          </h2>
          <div className="faq-list">
            <details className="faq-item">
              <summary>
                <span className="faq-left">
                  <span className="faq-num">01</span>
                  <span className="faq-q">Should I set up on the mainland or in a free zone?</span>
                </span>
                <span className="faq-icon" aria-hidden="true">+</span>
              </summary>
              <p>
                It depends on who you plan to trade with and how many visas you need. Mainland
                companies can trade freely across the UAE; free zones suit businesses focused on
                international trade or a single sector. We&rsquo;ll walk through your activity and
                recommend the structure that fits.
              </p>
            </details>
            <details className="faq-item">
              <summary>
                <span className="faq-left">
                  <span className="faq-num">02</span>
                  <span className="faq-q">How long does company formation take?</span>
                </span>
                <span className="faq-icon" aria-hidden="true">+</span>
              </summary>
              <p>
                Most straightforward licences are issued within a few working days of submitting
                complete documentation. Timelines vary by jurisdiction and activity, and we&rsquo;ll
                give you a clear estimate before we start.
              </p>
            </details>
            <details className="faq-item">
              <summary>
                <span className="faq-left">
                  <span className="faq-num">03</span>
                  <span className="faq-q">Can you help with a corporate bank account?</span>
                </span>
                <span className="faq-icon" aria-hidden="true">+</span>
              </summary>
              <p>
                Yes. We prepare your documentation and introduce you to banking partners suited to
                your business activity and structure.
              </p>
            </details>
            <details className="faq-item">
              <summary>
                <span className="faq-left">
                  <span className="faq-num">04</span>
                  <span className="faq-q">What happens after my licence is issued?</span>
                </span>
                <span className="faq-icon" aria-hidden="true">+</span>
              </summary>
              <p>
                We stay involved for visas, labour and immigration cards, VAT registration, and
                annual licence renewal — so nothing falls through the cracks in year one.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* EXPLORE OTHER SERVICES */}
      <section style={{ background: "var(--bg-raised)" }}>
        <div className="wrapc" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <p className="kicker reveal">Explore other services</p>
          <div className="svc-index reveal">
            {otherServices.map((s) => (
              <Link key={s.slug} href={`/${s.slug}`}>
                {s.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final-cta">
        <div className="wrapc" style={{ paddingTop: 96, paddingBottom: 96, textAlign: "center" }}>
          <p className="kicker reveal">Get Started</p>
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
            Ready to set up your business in Dubai?
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
            Tell us about your business and we&rsquo;ll recommend the right structure, jurisdiction,
            and next steps. Prime. Made. Easy.
          </p>
          <div
            className="reveal"
            style={{ marginTop: 32, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}
          >
            <Link href="/contact-us" className="btn on-brand">
              <span>Request a Free Consultation</span>
            </Link>
            <Link
              href="https://wa.me/971543084251?text=Hi%20Bizpoint%20Prime%2C%20I%27d%20like%20to%20know%20more%20about%20your%20services."
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
