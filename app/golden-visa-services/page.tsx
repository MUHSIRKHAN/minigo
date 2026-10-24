import type { Metadata } from "next";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { BUSINESS, SITE_URL } from "../lib/site";
import Link from "next/link";

const TITLE = "Golden Visa Services in Dubai | Bizpoint Prime Business Solutions LLC";
const DESCRIPTION =
  "Eligibility assessment, document preparation, and end-to-end application handling for the UAE Golden Visa — from Bizpoint Prime Business Solutions LLC.";
const OG_IMAGE =
  "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200&h=630&q=80&fm=jpg&fit=crop&auto=format";
const PATH = "/golden-visa-services";

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
  { slug: "business-setup-dubai", title: "Business Setup" },
  { slug: "legal-translation-dubai", title: "Legal Translation" },
  { slug: "notary-services", title: "Notary Services" },
  { slug: "document-attestation", title: "Attestation Services" },
  { slug: "vat-registration", title: "VAT Registration" },
  { slug: "family-visa-services", title: "Family Visa Services" },
  { slug: "pro-services-dubai", title: "PRO Services" },
  { slug: "typing-services", title: "Typing Services" },
  { slug: "branding-marketing", title: "Branding & Marketing" },
];

export default function GoldenVisaServicesPage() {
  return (
    <>
      <Header />

      {/* PAGE HERO */}
      <section className="page-hero">
        <Image
          className="bg"
          src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1920&q=80&fm=jpg&fit=crop&auto=format"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          priority
        />
        <div className="overlay" aria-hidden="true"></div>
        <div className="wrap inner">
          <p className="kicker reveal" style={{ color: "var(--accent)" }}>
            Services / Golden Visa
          </p>
          <h1 className="reveal">Golden Visa Services in Dubai</h1>
          <p className="reveal">
            Long-term UAE residency for investors, entrepreneurs, and specialists — assessed and
            managed from eligibility check to approval.
          </p>
        </div>
      </section>

      {/* INTRO */}
      <section>
        <div className="wrapc" style={{ paddingTop: 96, paddingBottom: 64 }}>
          <p className="kicker reveal">Long-Term Residency, Done Right</p>
          <h2 className="h-sec reveal" style={{ marginTop: 12, maxWidth: "48ch" }}>
            Eligibility and documentation vary by category — we assess your case properly first.
          </h2>
          <p
            className="reveal"
            style={{ marginTop: 20, maxWidth: "62ch", fontSize: "15.5px", lineHeight: 1.6, color: "var(--fg-muted)" }}
          >
            The UAE Golden Visa opens up long-term residency for investors, entrepreneurs, and
            specialists — but eligibility and documentation requirements vary by category. We
            assess your case against the criteria that apply to you, prepare a complete
            application, and manage it from start to finish, so you know exactly where things
            stand at every stage.
          </p>
          <div className="about-checklist">
            <div className="reveal">
              <span className="check" aria-hidden="true">✓</span>Eligibility Assessment
            </div>
            <div className="reveal">
              <span className="check" aria-hidden="true">✓</span>Document Preparation &amp; Review
            </div>
            <div className="reveal">
              <span className="check" aria-hidden="true">✓</span>End-to-End Application Handling
            </div>
            <div className="reveal">
              <span className="check" aria-hidden="true">✓</span>Investor, Entrepreneur &amp; Specialist Categories
            </div>
          </div>
          <div className="reveal" style={{ marginTop: 32, display: "flex", gap: 16, flexWrap: "wrap" }}>
            <Link href="/contact-us" className="btn">
              <span>Check Your Eligibility</span>
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
            From eligibility check to a ten-year residency.
          </h2>
          <div className="proc-grid">
            <div className="proc reveal">
              <h3>Eligibility Check</h3>
              <p>We assess which Golden Visa category fits your profile — investor, entrepreneur, or specialist.</p>
            </div>
            <div className="proc reveal">
              <h3>Documentation</h3>
              <p>We prepare and review every supporting document the category requires.</p>
            </div>
            <div className="proc reveal">
              <h3>Application</h3>
              <p>We submit your application and liaise with the relevant authority throughout.</p>
            </div>
            <div className="proc reveal">
              <h3>Approval</h3>
              <p>You receive your long-term residency, fully processed and ready to use.</p>
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
                  <span className="faq-q">Who is eligible for the UAE Golden Visa?</span>
                </span>
                <span className="faq-icon" aria-hidden="true">+</span>
              </summary>
              <p>
                Investors, entrepreneurs, and specialists across several categories, each with its
                own criteria. We&rsquo;ll assess your profile against the category that fits you
                best.
              </p>
            </details>
            <details className="faq-item">
              <summary>
                <span className="faq-left">
                  <span className="faq-num">02</span>
                  <span className="faq-q">What documents do I need to apply?</span>
                </span>
                <span className="faq-icon" aria-hidden="true">+</span>
              </summary>
              <p>
                Requirements vary by category — typically proof of investment, qualifications, or
                professional standing. We&rsquo;ll give you a precise checklist once we know your
                category.
              </p>
            </details>
            <details className="faq-item">
              <summary>
                <span className="faq-left">
                  <span className="faq-num">03</span>
                  <span className="faq-q">Can my family be included?</span>
                </span>
                <span className="faq-icon" aria-hidden="true">+</span>
              </summary>
              <p>
                Golden Visa holders can typically sponsor family members. Ask us about combining
                this with our{" "}
                <Link href="/family-visa-services" style={{ textDecoration: "underline" }}>
                  family visa services
                </Link>
                .
              </p>
            </details>
            <details className="faq-item">
              <summary>
                <span className="faq-left">
                  <span className="faq-num">04</span>
                  <span className="faq-q">How long does the application take?</span>
                </span>
                <span className="faq-icon" aria-hidden="true">+</span>
              </summary>
              <p>
                Timelines depend on category and how quickly documentation is ready. We&rsquo;ll
                give you a realistic estimate once we&rsquo;ve reviewed your case.
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
            Ready to explore Golden Visa eligibility?
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
            Share your background and goals and we&rsquo;ll map out the right path to long-term
            residency. Prime. Made. Easy.
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
