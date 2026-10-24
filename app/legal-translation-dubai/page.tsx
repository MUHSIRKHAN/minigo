import type { Metadata } from "next";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { BUSINESS, SITE_URL } from "../lib/site";
import Link from "next/link";

const TITLE = "Legal Translation in Dubai | Bizpoint Prime Business Solutions LLC";
const DESCRIPTION =
  "MOJ-certified legal translation in Dubai for contracts, court documents, and certificates in 120+ language pairs — accepted by UAE Courts, MOFA, and embassies.";
const OG_IMAGE =
  "https://images.unsplash.com/photo-1695238668015-7bc526956af7?w=1200&h=630&q=80&fm=jpg&fit=crop&auto=format";
const PATH = "/legal-translation-dubai";

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
  { slug: "notary-services", title: "Notary Services" },
  { slug: "document-attestation", title: "Attestation Services" },
  { slug: "vat-registration", title: "VAT Registration" },
  { slug: "golden-visa-services", title: "Golden Visa Services" },
  { slug: "family-visa-services", title: "Family Visa Services" },
  { slug: "pro-services-dubai", title: "PRO Services" },
  { slug: "typing-services", title: "Typing Services" },
  { slug: "branding-marketing", title: "Branding & Marketing" },
];

export default function LegalTranslationDubaiPage() {
  return (
    <>
      <Header />

      {/* PAGE HERO */}
      <section className="page-hero">
        <Image
          className="bg"
          src="https://images.unsplash.com/photo-1695238668015-7bc526956af7?w=1920&q=80&fm=jpg&fit=crop&auto=format"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          priority
        />
        <div className="overlay" aria-hidden="true"></div>
        <div className="wrap inner">
          <p className="kicker reveal" style={{ color: "var(--accent)" }}>
            Services / Legal Translation
          </p>
          <h1 className="reveal">Legal Translation — MOJ-Certified &amp; Court-Accepted</h1>
          <p className="reveal">
            When your documents need to be understood, verified, and accepted by UAE courts,
            government ministries, embassies, or legal institutions, standard translation simply
            will not do.
          </p>
        </div>
      </section>

      {/* INTRO */}
      <section>
        <div className="wrapc" style={{ paddingTop: 96, paddingBottom: 64 }}>
          <p className="kicker reveal">Why MOJ Certification Matters</p>
          <h2 className="h-sec reveal" style={{ marginTop: 12, maxWidth: "52ch" }}>
            What is legal translation, and why does Ministry of Justice certification matter?
          </h2>
          <p
            className="reveal"
            style={{ marginTop: 20, maxWidth: "62ch", fontSize: "15.5px", lineHeight: 1.6, color: "var(--fg-muted)" }}
          >
            Legal translation in the UAE is not the same as standard commercial translation. It
            requires a translator who holds an official licence from the UAE Ministry of Justice —
            the regulatory body that oversees the legal sector in the country. Without MOJ
            certification, a translated document will be rejected by Dubai Courts, MOFA, UAE
            embassies, and government departments, delaying visa applications, court proceedings,
            business registrations, and personal legal matters by weeks or months.
          </p>
          <p
            className="reveal"
            style={{ marginTop: 16, maxWidth: "62ch", fontSize: "15.5px", lineHeight: 1.6, color: "var(--fg-muted)" }}
          >
            Bizpoint Prime&rsquo;s translators hold official MOJ certification, meaning every
            document we translate carries legal authority that is recognised across the entire UAE
            legal system and internationally through UAE embassies — combining certified expertise
            with fast turnaround and full compliance.
          </p>
          <div className="about-checklist">
            <div className="reveal">
              <span className="check" aria-hidden="true">✓</span>120+ language pairs
            </div>
            <div className="reveal">
              <span className="check" aria-hidden="true">✓</span>Ministry of Justice-certified translators
            </div>
            <div className="reveal">
              <span className="check" aria-hidden="true">✓</span>Accepted by courts, embassies &amp; government authorities
            </div>
          </div>
          <div className="reveal" style={{ marginTop: 32, display: "flex", gap: 16, flexWrap: "wrap" }}>
            <Link href="/contact-us" className="btn">
              <span>Get a Free Quote</span>
            </Link>
            <Link href="/services" className="btn outline">
              <span>Explore All Services</span>
            </Link>
          </div>
        </div>
      </section>

      {/* DOCUMENTS WE TRANSLATE */}
      <section style={{ background: "var(--bg-raised)" }}>
        <div className="wrapc" style={{ paddingTop: 80, paddingBottom: 96 }}>
          <p className="kicker reveal">Documents We Translate</p>
          <h2 className="h-sec reveal" style={{ marginTop: 12, maxWidth: "48ch" }}>
            Certified translation across personal, corporate, and judicial documents.
          </h2>
          <div className="values-grid cols-3">
            <div className="value-card reveal">
              <span className="value-num">01</span>
              <h3>Personal &amp; Civil Documents</h3>
              <p>
                Birth, marriage, and death certificates, national ID cards and passports,
                educational certificates and transcripts, police clearance certificates, and
                medical reports.
              </p>
            </div>
            <div className="value-card reveal">
              <span className="value-num">02</span>
              <h3>Corporate &amp; Commercial Documents</h3>
              <p>
                Contracts and commercial agreements, MOA and Articles of Association, company
                incorporation documents, financial statements and audit reports, employment
                contracts, and IP filings.
              </p>
            </div>
            <div className="value-card reveal">
              <span className="value-num">03</span>
              <h3>Court &amp; Judicial Documents</h3>
              <p>
                Court judgements and orders, legal notices and summons, powers of attorney,
                affidavits and sworn statements, and arbitration or tribunal filings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section>
        <div className="wrapc" style={{ paddingTop: 96, paddingBottom: 64 }}>
          <p className="kicker reveal">Our Process</p>
          <h2 className="h-sec reveal" style={{ marginTop: 12, maxWidth: "48ch" }}>
            From document to certified translation.
          </h2>
          <div className="proc-grid">
            <div className="proc reveal">
              <h3>Submit</h3>
              <p>Share your document and we&rsquo;ll confirm the language pair and turnaround.</p>
            </div>
            <div className="proc reveal">
              <h3>Fixed Quote</h3>
              <p>Get a fixed price within 30 minutes — no hidden fees.</p>
            </div>
            <div className="proc reveal">
              <h3>MOJ Translation</h3>
              <p>An MOJ-certified translator produces your document with an official stamp.</p>
            </div>
            <div className="proc reveal">
              <h3>Delivery</h3>
              <p>Collect in person or receive it wherever you need it, ready to submit.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: "var(--bg-raised)" }}>
        <div className="wrapc" style={{ paddingTop: 80, paddingBottom: 96 }}>
          <p className="kicker reveal">FAQs</p>
          <h2 className="h-sec reveal" style={{ marginTop: 12, maxWidth: "44ch" }}>
            Frequently asked questions.
          </h2>
          <div className="faq-list">
            <details className="faq-item">
              <summary>
                <span className="faq-left">
                  <span className="faq-num">01</span>
                  <span className="faq-q">Is Bizpoint Prime&rsquo;s legal translation MOJ-approved?</span>
                </span>
                <span className="faq-icon" aria-hidden="true">+</span>
              </summary>
              <p>
                Yes. All our translators hold Ministry of Justice certification, and every legal
                translation we produce is recognised by Dubai Courts, MOFA, and UAE embassies.
              </p>
            </details>
            <details className="faq-item">
              <summary>
                <span className="faq-left">
                  <span className="faq-num">02</span>
                  <span className="faq-q">What documents can you translate legally?</span>
                </span>
                <span className="faq-icon" aria-hidden="true">+</span>
              </summary>
              <p>
                Contracts, court documents, certificates, powers of attorney, corporate documents,
                visa applications, and more — translated to the standard UAE authorities require.
              </p>
            </details>
            <details className="faq-item">
              <summary>
                <span className="faq-left">
                  <span className="faq-num">03</span>
                  <span className="faq-q">How much does legal translation cost?</span>
                </span>
                <span className="faq-icon" aria-hidden="true">+</span>
              </summary>
              <p>
                Pricing depends on language pair, document type, and turnaround. Share your
                documents and we&rsquo;ll confirm a fixed quote before any work begins — no hidden
                fees.
              </p>
            </details>
            <details className="faq-item">
              <summary>
                <span className="faq-left">
                  <span className="faq-num">04</span>
                  <span className="faq-q">How long does legal translation take?</span>
                </span>
                <span className="faq-icon" aria-hidden="true">+</span>
              </summary>
              <p>
                Standard turnaround is 24&ndash;48 hours. Same-day service is available for most
                documents, with an express option for urgent requirements.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* EXPLORE OTHER SERVICES */}
      <section>
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
            Ready for MOJ-certified translation?
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
            Get a free quote within 30 minutes. Fixed pricing with no hidden fees. Prime. Made.
            Easy.
          </p>
          <div
            className="reveal"
            style={{ marginTop: 32, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}
          >
            <Link href="/contact-us" className="btn on-brand">
              <span>Get a Free Quote Now</span>
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
