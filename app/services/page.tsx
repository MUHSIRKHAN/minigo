import type { Metadata } from "next";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { BUSINESS, SITE_URL } from "../lib/site";
import Link from "next/link";

const TITLE = "Services | Bizpoint Prime Business Solutions LLC";
const DESCRIPTION =
  "Business setup, legal translation, notary, VAT registration, family visas, attestation, PRO services, Golden Visa, branding & marketing, and typing services — all under one roof at Bizpoint Prime Business Solutions LLC.";
const OG_IMAGE =
  "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&h=630&q=80&fm=jpg&fit=crop&auto=format";
const PATH = "/services";

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

const services = [
  {
    id: "formation",
    slug: "business-setup-dubai",
    title: "Business Setup",
    image: "https://images.unsplash.com/photo-1574188231145-5f204395d7d5?w=1000&q=80&fm=jpg&fit=crop&auto=format",
    body: "Launching a company in the UAE means choosing between mainland, free zone, and offshore structures — each with its own ownership rules, visa quotas, and cost profile. We help you pick the right one and carry it through from trade name to licence issuance.",
    points: ["Trade name reservation & initial approval", "Mainland, Free Zone & Offshore structuring", "Licence issuance and annual renewal"],
  },
  {
    id: "vat",
    slug: "vat-registration",
    title: "VAT Registration",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1000&q=80&fm=jpg&fit=crop&auto=format",
    body: "Whether you're registering for the first time, amending an existing registration, or need help staying compliant, our team keeps your VAT status accurate and your filings on schedule.",
    points: ["New VAT registration", "Amendments & deregistration", "Ongoing return-filing support"],
  },
  {
    id: "golden-visa",
    slug: "golden-visa-services",
    title: "Golden Visa Services",
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1000&q=80&fm=jpg&fit=crop&auto=format",
    body: "The UAE Golden Visa opens up long-term residency for investors, entrepreneurs, and specialists — but eligibility and documentation requirements vary by category. We assess your case and manage the application from start to finish.",
    points: ["Eligibility assessment", "Document preparation & review", "End-to-end application handling"],
  },
  {
    id: "translation",
    slug: "legal-translation-dubai",
    title: "Legal Translation",
    image: "https://images.unsplash.com/photo-1695238668015-7bc526956af7?w=1000&q=80&fm=jpg&fit=crop&auto=format",
    body: "Contracts, court filings, and certificates need translation that holds up with the authorities that receive them. Our translators are certified to produce documents accepted by UAE Courts, government departments, and embassies.",
    points: ["120+ language pairs", "Ministry of Justice-certified translators", "Accepted by courts, embassies & government authorities"],
  },
  {
    id: "notary",
    slug: "notary-services",
    title: "Notary Services",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1000&q=80&fm=jpg&fit=crop&auto=format",
    body: "Powers of attorney, affidavits, and corporate agreements often need notarization before they're valid in the UAE. We prepare and notarize these documents so they're recognized by every authority that needs to see them.",
    points: ["Power of Attorney drafting & notarization", "Declarations and affidavits", "Corporate agreement notarization"],
  },
  {
    id: "attestation",
    slug: "document-attestation",
    title: "Attestation Services",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1000&q=80&fm=jpg&fit=crop&auto=format",
    body: "Educational, commercial, and personal documents often need to be attested before they're valid for use in the UAE or abroad. We coordinate with MOFA, embassies, and the relevant ministries to get it done.",
    points: ["Educational certificate attestation", "Commercial document legalisation", "MOFA & embassy coordination"],
  },
  {
    id: "typing",
    slug: "typing-services",
    title: "Typing Services",
    image: "https://images.unsplash.com/photo-1664575262619-b28fef7a40a4?w=1000&q=80&fm=jpg&fit=crop&auto=format",
    body: "Government forms have to be filled exactly to specification, in the format each department expects. Our typing centre prepares official forms, immigration paperwork, and legal filings so they're accepted on the first submission.",
    points: ["Official government form preparation", "Immigration paperwork", "Legal filing & documentation typing"],
  },
  {
    id: "family-visa",
    slug: "family-visa-services",
    title: "Family Visa Services",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1000&q=80&fm=jpg&fit=crop&auto=format",
    body: "Bringing family to the UAE involves sponsorship applications, medical and Emirates ID steps, and periodic renewals. We manage the process end to end so nothing falls through the cracks.",
    points: ["Family sponsorship applications", "Residence visa renewals", "Status changes and amendments"],
  },
  {
    id: "pro-services",
    slug: "pro-services-dubai",
    title: "PRO Services",
    image: "https://images.unsplash.com/photo-1758519288948-e3c87d2d78d8?w=1000&q=80&fm=jpg&fit=crop&auto=format",
    body: "Government paperwork is a constant in the UAE — labour cards, licence renewals, immigration filings. Our PRO team handles the counter visits and follow-ups so your business doesn't have to.",
    points: ["Labour card processing", "Trade licence renewals", "Immigration & visa liaison"],
  },
  {
    id: "branding",
    slug: "branding-marketing",
    title: "Branding & Marketing",
    image: "https://images.unsplash.com/photo-1423592707957-3b212afa6733?w=1000&q=80&fm=jpg&fit=crop&auto=format",
    body: "A licence gets you open for business — a brand gets you customers. We build identities, run digital marketing campaigns, and design websites that help new and growing businesses stand out.",
    points: ["Brand identity & visual design", "Digital marketing campaigns", "Website design & development"],
  },
];

const categories = [
  {
    name: "Business & Licensing",
    blurb: "Get your company registered, tax-compliant, and set up for long-term residency.",
    ids: ["formation", "vat", "golden-visa"],
  },
  {
    name: "Legal & Documentation",
    blurb: "Certified translation, notarization, attestation, and government-ready paperwork.",
    ids: ["translation", "notary", "attestation", "typing"],
  },
  {
    name: "Visas & Government Liaison",
    blurb: "Sponsorship, renewals, and the government counter visits handled for you.",
    ids: ["family-visa", "pro-services"],
  },
  {
    name: "Growth & Branding",
    blurb: "Build the brand and marketing presence that turns a licence into a business.",
    ids: ["branding"],
  },
];

const byId = Object.fromEntries(services.map((s) => [s.id, s]));

export default function ServicesPage() {
  let rowIndex = 0;

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
            Services
          </p>
          <h1 className="reveal">Everything your business needs, all in one place.</h1>
          <p className="reveal">
            Business setup, legal translation, government services, visas, VAT, attestation, PRO
            services, and branding — handled by one team, under one roof.
          </p>
        </div>
      </section>

      {/* SERVICE INDEX */}
      <section>
        <div className="wrapc" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <p className="kicker reveal">Jump to a service</p>
          <div className="svc-index reveal">
            {categories.flatMap((cat) => cat.ids).map((id) => (
              <Link key={id} href={`#${id}`}>
                {byId[id].title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICE CATEGORIES */}
      {categories.map((cat, ci) => (
        <section key={cat.name} style={{ background: ci % 2 === 1 ? "var(--bg-raised)" : undefined }}>
          <div className="wrapc" style={{ paddingTop: 80, paddingBottom: 96 }}>
            <div className="svc-cat-head">
              <p className="kicker reveal">{cat.name}</p>
              <p className="reveal">{cat.blurb}</p>
            </div>
            {cat.ids.map((id) => {
              const svc = byId[id];
              const reverse = rowIndex % 2 === 1;
              rowIndex += 1;
              return (
                <div className={`svc-row reveal${reverse ? " reverse" : ""}`} id={svc.id} key={svc.id}>
                  <div className="svc-row-photo">
                    <Image src={svc.image} alt={svc.title} fill sizes="(max-width: 900px) 100vw, 480px" />
                  </div>
                  <div className="svc-row-text">
                    <h3>{svc.title}</h3>
                    <p>{svc.body}</p>
                    <div className="svc-row-list">
                      {svc.points.map((point) => (
                        <div key={point}>
                          <span className="check" aria-hidden="true">✓</span>
                          {point}
                        </div>
                      ))}
                    </div>
                    <div className="reveal" style={{ marginTop: 24 }}>
                      <Link href={`/${svc.slug}`} className="btn outline sm">
                        <span>Learn More</span>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}

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
            Not sure which service you need?
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
            Tell us what you&rsquo;re working on and we&rsquo;ll point you to the right service —
            or handle the whole thing for you. Prime. Made. Easy.
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
