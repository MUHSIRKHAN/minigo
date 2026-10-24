import type { Metadata } from "next";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { BUSINESS, SITE_URL } from "../lib/site";
import Link from "next/link";

const TITLE = "VAT Registration in Dubai | Bizpoint Prime Business Solutions LLC";
const DESCRIPTION =
  "New VAT registration, amendments, deregistration, and ongoing return-filing support for businesses in the UAE — from Bizpoint Prime Business Solutions LLC.";
const OG_IMAGE =
  "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&h=630&q=80&fm=jpg&fit=crop&auto=format";
const PATH = "/vat-registration";

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
  { slug: "golden-visa-services", title: "Golden Visa Services" },
  { slug: "family-visa-services", title: "Family Visa Services" },
  { slug: "pro-services-dubai", title: "PRO Services" },
  { slug: "typing-services", title: "Typing Services" },
  { slug: "branding-marketing", title: "Branding & Marketing" },
];

export default function VatRegistrationPage() {
  return (
    <>
      <Header />

      {/* PAGE HERO */}
      <section className="page-hero">
        <Image
          className="bg"
          src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1920&q=80&fm=jpg&fit=crop&auto=format"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          priority
        />
        <div className="overlay" aria-hidden="true"></div>
        <div className="wrap inner">
          <p className="kicker reveal" style={{ color: "var(--accent)" }}>
            Services / VAT Registration
          </p>
          <h1 className="reveal">VAT Registration in Dubai</h1>
          <p className="reveal">
            Keeping your VAT status accurate and your filings on schedule — whether you&rsquo;re
            registering for the first time or staying compliant year-round.
          </p>
        </div>
      </section>

      {/* INTRO */}
      <section>
        <div className="wrapc" style={{ paddingTop: 96, paddingBottom: 64 }}>
          <p className="kicker reveal">Stay Compliant, Stay Confident</p>
          <h2 className="h-sec reveal" style={{ marginTop: 12, maxWidth: "48ch" }}>
            VAT registration and compliance, handled by people who track the deadlines for you.
          </h2>
          <p
            className="reveal"
            style={{ marginTop: 20, maxWidth: "62ch", fontSize: "15.5px", lineHeight: 1.6, color: "var(--fg-muted)" }}
          >
            Whether you&rsquo;re registering for the first time, amending an existing
            registration, or need help staying compliant, our team keeps your VAT status accurate
            and your filings on schedule. We handle the Federal Tax Authority portal, the
            paperwork, and the deadlines — so VAT stays a routine part of running your business,
            not a source of last-minute stress.
          </p>
          <div className="about-checklist">
            <div className="reveal">
              <span className="check" aria-hidden="true">✓</span>New VAT Registration
            </div>
            <div className="reveal">
              <span className="check" aria-hidden="true">✓</span>Amendments &amp; Deregistration
            </div>
            <div className="reveal">
              <span className="check" aria-hidden="true">✓</span>Ongoing Return-Filing Support
            </div>
            <div className="reveal">
              <span className="check" aria-hidden="true">✓</span>Voluntary &amp; Mandatory Registration Assessment
            </div>
            <div className="reveal">
              <span className="check" aria-hidden="true">✓</span>FTA Portal Setup &amp; Liaison
            </div>
            <div className="reveal">
              <span className="check" aria-hidden="true">✓</span>Record-Keeping Guidance
            </div>
          </div>
          <div className="reveal" style={{ marginTop: 32, display: "flex", gap: 16, flexWrap: "wrap" }}>
            <Link href="/contact-us" className="btn">
              <span>Check Your VAT Status</span>
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
            From assessment to your first filed return.
          </h2>
          <div className="proc-grid">
            <div className="proc reveal">
              <h3>Assessment</h3>
              <p>We review your turnover and activity to confirm whether registration is mandatory or voluntary.</p>
            </div>
            <div className="proc reveal">
              <h3>Registration</h3>
              <p>We prepare and submit your FTA registration, or amend an existing one.</p>
            </div>
            <div className="proc reveal">
              <h3>Filing Setup</h3>
              <p>We set up your return-filing schedule and record-keeping practices.</p>
            </div>
            <div className="proc reveal">
              <h3>Ongoing Compliance</h3>
              <p>We support your periodic filings so nothing is missed or late.</p>
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
                  <span className="faq-q">When is VAT registration mandatory?</span>
                </span>
                <span className="faq-icon" aria-hidden="true">+</span>
              </summary>
              <p>
                Registration is mandatory once your taxable supplies and imports exceed the
                mandatory threshold set by the Federal Tax Authority, and voluntary above a lower
                threshold. We&rsquo;ll confirm exactly where your business stands.
              </p>
            </details>
            <details className="faq-item">
              <summary>
                <span className="faq-left">
                  <span className="faq-num">02</span>
                  <span className="faq-q">Can you amend an existing VAT registration?</span>
                </span>
                <span className="faq-icon" aria-hidden="true">+</span>
              </summary>
              <p>
                Yes — changes in business activity, turnover, or structure often require an
                amendment. We handle the update with the FTA on your behalf.
              </p>
            </details>
            <details className="faq-item">
              <summary>
                <span className="faq-left">
                  <span className="faq-num">03</span>
                  <span className="faq-q">Do you help with ongoing VAT return filing?</span>
                </span>
                <span className="faq-icon" aria-hidden="true">+</span>
              </summary>
              <p>
                Yes, we support periodic return filing so your business stays compliant well
                beyond the initial registration.
              </p>
            </details>
            <details className="faq-item">
              <summary>
                <span className="faq-left">
                  <span className="faq-num">04</span>
                  <span className="faq-q">What if my business no longer needs to be VAT registered?</span>
                </span>
                <span className="faq-icon" aria-hidden="true">+</span>
              </summary>
              <p>
                We manage VAT deregistration with the FTA when your business activity or turnover
                changes and registration is no longer required.
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
            Not sure if you need to register for VAT?
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
            Tell us about your business and we&rsquo;ll confirm your obligations and handle the
            registration. Prime. Made. Easy.
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
