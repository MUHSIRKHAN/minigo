import type { Metadata } from "next";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { BUSINESS, SITE_URL } from "../lib/site";
import Link from "next/link";

const TITLE = "PRO Services in Dubai | Bizpoint Prime Business Solutions LLC";
const DESCRIPTION =
  "Government liaison, visa processing, labour cards, and licence renewals handled by Bizpoint Prime Business Solutions LLC's dedicated PRO team.";
const OG_IMAGE =
  "https://images.unsplash.com/photo-1758519288948-e3c87d2d78d8?w=1200&h=630&q=80&fm=jpg&fit=crop&auto=format";
const PATH = "/pro-services-dubai";

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
  { slug: "golden-visa-services", title: "Golden Visa Services" },
  { slug: "family-visa-services", title: "Family Visa Services" },
  { slug: "typing-services", title: "Typing Services" },
  { slug: "branding-marketing", title: "Branding & Marketing" },
];

export default function ProServicesDubaiPage() {
  return (
    <>
      <Header />

      {/* PAGE HERO */}
      <section className="page-hero">
        <Image
          className="bg"
          src="https://images.unsplash.com/photo-1758519288948-e3c87d2d78d8?w=1920&q=80&fm=jpg&fit=crop&auto=format"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          priority
        />
        <div className="overlay" aria-hidden="true"></div>
        <div className="wrap inner">
          <p className="kicker reveal" style={{ color: "var(--accent)" }}>
            Services / PRO Services
          </p>
          <h1 className="reveal">PRO Services in Dubai</h1>
          <p className="reveal">
            Your trusted partner for all government liaison, visa processing, and company
            renewals.
          </p>
        </div>
      </section>

      {/* INTRO */}
      <section>
        <div className="wrapc" style={{ paddingTop: 96, paddingBottom: 64 }}>
          <p className="kicker reveal">Comprehensive PRO Services</p>
          <h2 className="h-sec reveal" style={{ marginTop: 12, maxWidth: "48ch" }}>
            Government paperwork is a constant in the UAE — we handle the counter visits.
          </h2>
          <p
            className="reveal"
            style={{ marginTop: 20, maxWidth: "62ch", fontSize: "15.5px", lineHeight: 1.6, color: "var(--fg-muted)" }}
          >
            Navigating UAE government regulations is time-consuming. Our PRO team manages
            interactions with the Department of Economy and Tourism, the Ministry of Human
            Resources and Emiratisation, and the General Directorate of Residency and Foreigners
            Affairs on your behalf — so your business doesn&rsquo;t have to. Save valuable time and
            avoid fines by letting our dedicated experts manage your paperwork.
          </p>
          <div className="about-checklist">
            <div className="reveal">
              <span className="check" aria-hidden="true">✓</span>Employment Visas &amp; Labour Cards
            </div>
            <div className="reveal">
              <span className="check" aria-hidden="true">✓</span>Family Visa Sponsorship
            </div>
            <div className="reveal">
              <span className="check" aria-hidden="true">✓</span>Trade Licence Renewals &amp; Amendments
            </div>
            <div className="reveal">
              <span className="check" aria-hidden="true">✓</span>Emirates ID Processing
            </div>
            <div className="reveal">
              <span className="check" aria-hidden="true">✓</span>Company Immigration &amp; Labour Establishment Cards
            </div>
            <div className="reveal">
              <span className="check" aria-hidden="true">✓</span>Immigration &amp; Visa Liaison
            </div>
          </div>
          <div className="reveal" style={{ marginTop: 32, display: "flex", gap: 16, flexWrap: "wrap" }}>
            <Link href="/contact-us" className="btn">
              <span>Talk to Our PRO Team</span>
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
            We handle the counter visits so you don&rsquo;t have to.
          </h2>
          <div className="proc-grid">
            <div className="proc reveal">
              <h3>Assessment</h3>
              <p>We review what your business or employees need — visas, renewals, or amendments.</p>
            </div>
            <div className="proc reveal">
              <h3>Documentation</h3>
              <p>We prepare and check every form before it reaches a government counter.</p>
            </div>
            <div className="proc reveal">
              <h3>Liaison</h3>
              <p>Our PRO team handles submissions and follow-ups with the relevant authority.</p>
            </div>
            <div className="proc reveal">
              <h3>Completion</h3>
              <p>You receive confirmation and documents — with nothing missed and no fines.</p>
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
                  <span className="faq-q">What can your PRO team handle for my business?</span>
                </span>
                <span className="faq-icon" aria-hidden="true">+</span>
              </summary>
              <p>
                Employment visas, labour cards, trade licence renewals and amendments, Emirates ID
                processing, and company immigration cards — the recurring government work every UAE
                business needs.
              </p>
            </details>
            <details className="faq-item">
              <summary>
                <span className="faq-left">
                  <span className="faq-num">02</span>
                  <span className="faq-q">Can you help avoid fines from missed renewals?</span>
                </span>
                <span className="faq-icon" aria-hidden="true">+</span>
              </summary>
              <p>
                Yes — we track your renewal deadlines and manage submissions ahead of time, so
                trade licences, labour cards, and visas don&rsquo;t lapse.
              </p>
            </details>
            <details className="faq-item">
              <summary>
                <span className="faq-left">
                  <span className="faq-num">03</span>
                  <span className="faq-q">Do you handle family visa sponsorship too?</span>
                </span>
                <span className="faq-icon" aria-hidden="true">+</span>
              </summary>
              <p>
                Yes. See our{" "}
                <Link href="/family-visa-services" style={{ textDecoration: "underline" }}>
                  family visa services
                </Link>{" "}
                for sponsorship, renewals, and status changes.
              </p>
            </details>
            <details className="faq-item">
              <summary>
                <span className="faq-left">
                  <span className="faq-num">04</span>
                  <span className="faq-q">Is this a one-time service or ongoing support?</span>
                </span>
                <span className="faq-icon" aria-hidden="true">+</span>
              </summary>
              <p>
                Both — we take on one-off filings as well as ongoing PRO support, so your
                government paperwork stays current year-round.
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
            Let us handle the government paperwork.
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
            Tell us what needs filing, renewing, or processing and our PRO team will take it from
            there. Prime. Made. Easy.
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
