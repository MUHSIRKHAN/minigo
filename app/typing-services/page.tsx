import type { Metadata } from "next";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { BUSINESS, SITE_URL } from "../lib/site";
import Link from "next/link";

const TITLE = "Typing Services in Dubai | Bizpoint Prime Business Solutions LLC";
const DESCRIPTION =
  "Accurate, fast typing for Emirates ID, visa, medical, and Ejari applications, plus legal document typing in Arabic and English — from Bizpoint Prime Business Solutions LLC.";
const OG_IMAGE =
  "https://images.unsplash.com/photo-1664575262619-b28fef7a40a4?w=1200&h=630&q=80&fm=jpg&fit=crop&auto=format";
const PATH = "/typing-services";

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
  { slug: "pro-services-dubai", title: "PRO Services" },
  { slug: "branding-marketing", title: "Branding & Marketing" },
];

export default function TypingServicesPage() {
  return (
    <>
      <Header />

      {/* PAGE HERO */}
      <section className="page-hero">
        <Image
          className="bg"
          src="https://images.unsplash.com/photo-1664575262619-b28fef7a40a4?w=1920&q=80&fm=jpg&fit=crop&auto=format"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          priority
        />
        <div className="overlay" aria-hidden="true"></div>
        <div className="wrap inner">
          <p className="kicker reveal" style={{ color: "var(--accent)" }}>
            Services / Typing Services
          </p>
          <h1 className="reveal">Typing Services in Dubai</h1>
          <p className="reveal">
            Accurate and fast typing for all your government forms and applications.
          </p>
        </div>
      </section>

      {/* INTRO */}
      <section>
        <div className="wrapc" style={{ paddingTop: 96, paddingBottom: 64 }}>
          <p className="kicker reveal">Expert Typing Centre in Dubai</p>
          <h2 className="h-sec reveal" style={{ marginTop: 12, maxWidth: "48ch" }}>
            One error can mean a rejected application — we type it right the first time.
          </h2>
          <p
            className="reveal"
            style={{ marginTop: 20, maxWidth: "62ch", fontSize: "15.5px", lineHeight: 1.6, color: "var(--fg-muted)" }}
          >
            UAE government submissions require strict formatting compliance. Any error in your
            application can lead to delays or rejections. Our typists prepare official forms,
            immigration paperwork, and legal filings so they&rsquo;re completed correctly and
            submitted on time.
          </p>
          <div className="about-checklist">
            <div className="reveal">
              <span className="check" aria-hidden="true">✓</span>Emirates ID Applications (New, Renewal, Replacement)
            </div>
            <div className="reveal">
              <span className="check" aria-hidden="true">✓</span>Medical Fitness Test Applications
            </div>
            <div className="reveal">
              <span className="check" aria-hidden="true">✓</span>Visa Forms (Tourist, Residence, Employment)
            </div>
            <div className="reveal">
              <span className="check" aria-hidden="true">✓</span>Ejari Registration &amp; Renewal
            </div>
            <div className="reveal">
              <span className="check" aria-hidden="true">✓</span>Legal Document Typing in Arabic &amp; English
            </div>
          </div>
          <div className="reveal" style={{ marginTop: 32, display: "flex", gap: 16, flexWrap: "wrap" }}>
            <Link href="/contact-us" className="btn">
              <span>Get Help With Your Forms</span>
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
            Fast turnaround, prioritised for urgent applications.
          </h2>
          <div className="proc-grid">
            <div className="proc reveal">
              <h3>Bring Your Documents</h3>
              <p>Visit our typing centre with the details or paperwork your form requires.</p>
            </div>
            <div className="proc reveal">
              <h3>Accurate Typing</h3>
              <p>Our typists complete the form to the exact format the authority requires.</p>
            </div>
            <div className="proc reveal">
              <h3>Review</h3>
              <p>We check every field before submission to avoid delays or rejections.</p>
            </div>
            <div className="proc reveal">
              <h3>Submission</h3>
              <p>Your form is submitted or handed to you, ready for the next step.</p>
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
                  <span className="faq-q">Which government forms can you type?</span>
                </span>
                <span className="faq-icon" aria-hidden="true">+</span>
              </summary>
              <p>
                Emirates ID applications, medical fitness test forms, tourist, residence, and
                employment visa forms, Ejari registration, and legal documents in Arabic and
                English.
              </p>
            </details>
            <details className="faq-item">
              <summary>
                <span className="faq-left">
                  <span className="faq-num">02</span>
                  <span className="faq-q">What should I bring with me?</span>
                </span>
                <span className="faq-icon" aria-hidden="true">+</span>
              </summary>
              <p>
                Bring the supporting documents for your application — passport copies, Emirates
                ID, prior approvals, or contracts — and our typists will handle the form itself.
              </p>
            </details>
            <details className="faq-item">
              <summary>
                <span className="faq-left">
                  <span className="faq-num">03</span>
                  <span className="faq-q">Can you handle urgent applications?</span>
                </span>
                <span className="faq-icon" aria-hidden="true">+</span>
              </summary>
              <p>
                Yes, urgent applications are prioritised so time-sensitive forms are completed and
                submitted quickly.
              </p>
            </details>
            <details className="faq-item">
              <summary>
                <span className="faq-left">
                  <span className="faq-num">04</span>
                  <span className="faq-q">Do you also submit the form to the authority?</span>
                </span>
                <span className="faq-icon" aria-hidden="true">+</span>
              </summary>
              <p>
                For many forms, yes. Where in-person submission is required, our{" "}
                <Link href="/pro-services-dubai" style={{ textDecoration: "underline" }}>
                  PRO team
                </Link>{" "}
                can take it from typing through to filing.
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
            Need help with your forms?
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
            Bring your documents to our expert typists and get it done right the first time.
            Prime. Made. Easy.
          </p>
          <div
            className="reveal"
            style={{ marginTop: 32, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}
          >
            <Link href="/contact-us" className="btn on-brand">
              <span>Contact Us</span>
            </Link>
            <Link href="/contact-us" className="btn outline-light">
              <span>Request a Free Consultation</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
