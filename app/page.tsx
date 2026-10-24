import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HeroSequence from "./components/HeroSequence";
import { formatPostDate, getBlogPosts, getGalleryImages, getMediaUrl } from "./lib/payload";

const padTop96Bottom128: CSSProperties = { paddingTop: 96, paddingBottom: 128 };

export default async function Home() {
  const [posts, galleryImages] = await Promise.all([getBlogPosts(), getGalleryImages()]);
  const [featuredPost, ...otherPosts] = posts;
  const secondaryPosts = otherPosts.slice(0, 2);
  const marqueeImages = galleryImages.length > 0 ? [...galleryImages, ...galleryImages] : [];

  return (
    <>
      <Header />

      {/* HERO */}
      <section id="top" className="hero">
        <HeroSequence />
        <div className="hero-groundline" aria-hidden="true"></div>
        <div className="hero-grid-lines" aria-hidden="true">
          <span className="v" style={{ left: "20%" }}></span>
          <span className="v" style={{ left: "50%" }}></span>
          <span className="v" style={{ left: "80%" }}></span>
        </div>
        <div className="wrap hero-content">
          <span className="hero-kicker">
            <span className="dot" aria-hidden="true"></span>Prime. Made. Easy.
          </span>
          <h1 className="display">
            <span className="line">
              <span className="hero-seq__line-inner">Together, we</span>
            </span>
            <span className="line accent">
              <span className="hero-seq__line-inner">make it happen.</span>
            </span>
          </h1>
          <p className="hero-desc">
            Bizpoint Prime Business Solutions LLC is a trusted business solutions and corporate
            services provider in the UAE — supporting individuals, entrepreneurs, and companies
            with business setup, legal translation, government services, visa assistance, and
            more.
          </p>
          <div className="hero-cta" style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <Link href="/services" className="btn">
              <span>Get Started</span>
            </Link>
            <Link href="/contact-us" className="btn outline-light">
              <span>Contact Us</span>
            </Link>
          </div>
          <div className="hero-chips">
            <Link href="/business-setup-dubai" className="hero-chip">
              Business Setup
            </Link>
            <Link href="/legal-translation-dubai" className="hero-chip">
              Legal Translation
            </Link>
            <Link href="/family-visa-services" className="hero-chip">
              Family Visa Services
            </Link>
            <Link href="/vat-registration" className="hero-chip">
              VAT Registration
            </Link>
          </div>
        </div>
        <div className="hero-trust-row hero-trust-corner">
          <div className="hero-avatars" aria-hidden="true">
            <span>UF</span>
            <span>AS</span>
            <span>MK</span>
            <span>AA</span>
            <span>AM</span>
          </div>
          <p className="hero-trust">Trusted by 300+ businesses across the UAE.</p>
        </div>
      </section>

      {/* STATS */}
      <section>
        <div className="wrapc" style={{ paddingTop: 64, paddingBottom: 64 }}>
          <div className="stats-grid">
            <div className="stat reveal">
              <div className="num" data-count="120" data-suffix="+">
                0+
              </div>
              <p>Company formations completed</p>
            </div>
            <div className="stat reveal">
              <div className="num" data-count="300" data-suffix="+">
                0+
              </div>
              <p>Clients served across the UAE</p>
            </div>
            <div className="stat reveal">
              <div className="num" data-count="50" data-suffix="+">
                0+
              </div>
              <p>Language pairs translated</p>
            </div>
            <div className="stat reveal">
              <div className="num" data-count="24" data-suffix="h">
                0h
              </div>
              <p>Standard document turnaround</p>
            </div>
            <div className="stat reveal">
              <div className="num" data-count="5" data-suffix="+">
                0+
              </div>
              <p>Years operating in Dubai</p>
            </div>
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="manifesto">
        <div className="wrap">
          <p>
            Prime. Made. Easy. <em>Together, we make it happen.</em>
          </p>
          <div className="reveal" style={{ marginTop: 40 }}>
            <Link href="/about" className="btn">
              <span>About Us</span>
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="legal" style={{ overflow: "hidden" }}>
        <div className="wrapc sec-pad">
          <div className="svc-intro" id="svc-intro">
            <div className="svc-side" id="svc-left">
              <div className="box">
                <Image
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&fm=jpg&fit=crop&auto=format"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 30vw, 0px"
                />
              </div>
            </div>
            <div className="svc-center reveal">
              <h2 className="display">
                Our <span className="accent">Services</span>
              </h2>
              <p>Everything your business needs, all in one place — from business setup to branding and marketing.</p>
            </div>
            <div className="svc-side" id="svc-right">
              <div className="box">
                <Image
                  src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=800&q=80&fm=jpg&fit=crop&auto=format"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 30vw, 0px"
                />
              </div>
            </div>
          </div>
          <div className="svc-cards">
            <Link href="/business-setup-dubai" id="formation" className="card reveal">
              <Image
                src="https://images.unsplash.com/photo-1574188231145-5f204395d7d5?w=1200&q=80&fm=jpg&fit=crop&auto=format"
                alt="Business Setup"
                fill
                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
              />
              <div className="grad"></div>
              <div className="body">
                <h3>Business Setup</h3>
                <p>Launch your Mainland or Free Zone business with expert guidance from company registration to licensing and beyond.</p>
                <span className="more">
                  <span className="ul">View details</span> ↗
                </span>
              </div>
            </Link>
            <Link href="/legal-translation-dubai" id="translation" className="card reveal">
              <Image
                src="https://images.unsplash.com/photo-1695238668015-7bc526956af7?w=900&q=80&fm=jpg&fit=crop&auto=format"
                alt="Legal Translation"
                fill
                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
              />
              <div className="grad"></div>
              <div className="body">
                <h3>Legal Translation</h3>
                <p>Certified legal translations accepted by UAE Courts, the Ministry of Justice, embassies, and government authorities in 120+ languages.</p>
                <span className="more">
                  <span className="ul">View details</span> ↗
                </span>
              </div>
            </Link>
            <Link href="/notary-services" id="notary" className="card reveal">
              <Image
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80&fm=jpg&fit=crop&auto=format"
                alt="Notary Services"
                fill
                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
              />
              <div className="grad"></div>
              <div className="body">
                <h3>Notary Services</h3>
                <p>Professional assistance with Powers of Attorney, declarations, affidavits, agreements, and notarization services.</p>
                <span className="more">
                  <span className="ul">View details</span> ↗
                </span>
              </div>
            </Link>
            <Link href="/vat-registration" id="vat" className="card reveal">
              <Image
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900&q=80&fm=jpg&fit=crop&auto=format"
                alt="VAT Registration"
                fill
                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
              />
              <div className="grad"></div>
              <div className="body">
                <h3>VAT Registration</h3>
                <p>Complete VAT registration, amendments, deregistration, and compliance support to keep your business tax-ready.</p>
                <span className="more">
                  <span className="ul">View details</span> ↗
                </span>
              </div>
            </Link>
            <Link href="/family-visa-services" id="family-visa" className="card reveal">
              <Image
                src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=900&q=80&fm=jpg&fit=crop&auto=format"
                alt="Family Visa Services"
                fill
                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
              />
              <div className="grad"></div>
              <div className="body">
                <h3>Family Visa Services</h3>
                <p>End-to-end support for family sponsorship, residence visas, renewals, and status changes.</p>
                <span className="more">
                  <span className="ul">View details</span> ↗
                </span>
              </div>
            </Link>
            <Link href="/document-attestation" id="attestation" className="card reveal">
              <Image
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=80&fm=jpg&fit=crop&auto=format"
                alt="Attestation Services"
                fill
                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
              />
              <div className="grad"></div>
              <div className="body">
                <h3>Attestation Services</h3>
                <p>Fast and reliable attestation of educational, commercial, and personal documents for use in the UAE and abroad.</p>
                <span className="more">
                  <span className="ul">View details</span> ↗
                </span>
              </div>
            </Link>
            <Link href="/pro-services-dubai" id="pro-services" className="card reveal">
              <Image
                src="https://images.unsplash.com/photo-1758519288948-e3c87d2d78d8?w=900&q=80&fm=jpg&fit=crop&auto=format"
                alt="PRO Services"
                fill
                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
              />
              <div className="grad"></div>
              <div className="body">
                <h3>PRO Services</h3>
                <p>Efficient government liaison services, including document clearing, trade license renewals, labour, immigration, and corporate administration.</p>
                <span className="more">
                  <span className="ul">View details</span> ↗
                </span>
              </div>
            </Link>
            <Link href="/golden-visa-services" id="golden-visa" className="card reveal">
              <Image
                src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=900&q=80&fm=jpg&fit=crop&auto=format"
                alt="Golden Visa Services"
                fill
                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
              />
              <div className="grad"></div>
              <div className="body">
                <h3>Golden Visa Services</h3>
                <p>Expert guidance on UAE Golden Visa eligibility, documentation, and application processing for a smooth experience.</p>
                <span className="more">
                  <span className="ul">View details</span> ↗
                </span>
              </div>
            </Link>
            <Link href="/branding-marketing" id="branding" className="card reveal">
              <Image
                src="https://images.unsplash.com/photo-1423592707957-3b212afa6733?w=900&q=80&fm=jpg&fit=crop&auto=format"
                alt="Branding & Marketing"
                fill
                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
              />
              <div className="grad"></div>
              <div className="body">
                <h3>Branding &amp; Marketing</h3>
                <p>Create a powerful brand with professional branding, digital marketing, website development, and business growth solutions.</p>
                <span className="more">
                  <span className="ul">View details</span> ↗
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about">
        <div className="wrapc" style={{ paddingTop: 96, paddingBottom: 112 }}>
          <div className="about-grid">
            <div>
              <p className="kicker reveal">Welcome to Bizpoint Prime</p>
              <h2 className="h-sec reveal" style={{ marginTop: 12, maxWidth: "44ch" }}>
                Smart Business Starts Here.
              </h2>
              <p
                className="reveal"
                style={{
                  marginTop: 20,
                  maxWidth: "52ch",
                  fontSize: "15.5px",
                  lineHeight: 1.6,
                  color: "var(--fg-muted)",
                }}
              >
                Starting or managing a business in the UAE involves numerous legal,
                administrative, and regulatory requirements. At Bizpoint Prime Business
                Solutions LLC, we simplify every step by offering comprehensive business and
                corporate solutions under one roof. From company formation and government
                approvals to legal documentation, visa services, branding, and marketing, our
                experienced team is committed to delivering reliable, transparent, and efficient
                services tailored to your business goals. Our mission is simple: Prime. Made.
                Easy.
              </p>
              <div
                className="reveal"
                style={{ marginTop: 32, display: "flex", gap: 16, flexWrap: "wrap" }}
              >
                <Link href="/contact-us" className="btn">
                  <span>Get Started</span>
                </Link>
                <Link href="#legal" className="btn outline">
                  <span>See our services</span>
                </Link>
              </div>
            </div>
            <div className="about-mosaic reveal">
              <div className="about-tile">
                <span className="chk" aria-hidden="true">✓</span>
                <p>Company formation &amp; government approvals</p>
              </div>
              <div className="about-tile">
                <span className="chk" aria-hidden="true">✓</span>
                <p>Legal documentation &amp; notarization</p>
              </div>
              <div className="about-tile">
                <span className="chk" aria-hidden="true">✓</span>
                <p>Visa services, VAT registration &amp; attestation</p>
              </div>
              <div className="about-tile">
                <span className="chk" aria-hidden="true">✓</span>
                <p>Branding, marketing &amp; business growth support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section style={{ background: "var(--bg-raised)" }}>
        <div className="wrapc" style={padTop96Bottom128}>
          <div className="why-layout">
            <div className="why-photo reveal">
              <Image
                src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=900&q=80&fm=jpg&fit=crop&auto=format"
                alt="Bizpoint Prime consultants at work"
                fill
                sizes="(max-width: 900px) 100vw, 480px"
              />
            </div>
            <div>
              <p className="kicker reveal">Why Bizpoint Prime</p>
              <h2 className="h-sec reveal" style={{ marginTop: 12, maxWidth: "44ch" }}>
                Why Choose Bizpoint Prime?
              </h2>
              <div className="about-checklist">
                <div className="reveal">
                  <span className="check" aria-hidden="true">✓</span>Experienced Corporate Consultants
                </div>
                <div className="reveal">
                  <span className="check" aria-hidden="true">✓</span>One-Stop Business Solutions
                </div>
                <div className="reveal">
                  <span className="check" aria-hidden="true">✓</span>Fast &amp; Reliable Processing
                </div>
                <div className="reveal">
                  <span className="check" aria-hidden="true">✓</span>Transparent Pricing
                </div>
                <div className="reveal">
                  <span className="check" aria-hidden="true">✓</span>Personalized Client Support
                </div>
                <div className="reveal">
                  <span className="check" aria-hidden="true">✓</span>End-to-End Government Assistance
                </div>
                <div className="reveal">
                  <span className="check" aria-hidden="true">✓</span>Professional Legal Documentation
                </div>
                <div className="reveal">
                  <span className="check" aria-hidden="true">✓</span>Business Growth Support
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* JURISDICTIONS */}
      <section id="jurisdictions">
        <div className="wrapc" style={padTop96Bottom128}>
          <p className="kicker reveal">Where we operate</p>
          <h2 className="h-sec reveal" style={{ marginTop: 12, maxWidth: "46ch" }}>
            Licensed to set up your business across Dubai&rsquo;s jurisdictions.
          </h2>
          <div className="jur-list">
            <Link href="/contact-us" className="reveal">
              Dubai Mainland (DED)<span className="comma">,</span>
            </Link>
            <Link href="/contact-us" className="reveal">
              DIFC<span className="comma">,</span>
            </Link>
            <Link href="/contact-us" className="reveal">
              DMCC<span className="comma">,</span>
            </Link>
            <Link href="/contact-us" className="reveal">
              JAFZA<span className="comma">,</span>
            </Link>
            <Link href="/contact-us" className="reveal">
              Dubai South<span className="comma">,</span>
            </Link>
            <Link href="/contact-us" className="reveal">
              Abu Dhabi<span className="comma">,</span>
            </Link>
            <Link href="/contact-us" className="reveal">
              Sharjah<span className="comma">,</span>
            </Link>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section style={{ borderTop: "none" }}>
        <div className="wrapc" style={padTop96Bottom128}>
          <p className="kicker reveal">Our Process</p>
          <h2 className="h-sec reveal" style={{ marginTop: 12, maxWidth: "52ch" }}>
            How an engagement with Bizpoint Prime runs.
          </h2>
          <div className="proc-grid">
            <div className="proc reveal">
              <h3>Consultation</h3>
              <p>We understand your requirements and recommend the most suitable solution.</p>
            </div>
            <div className="proc reveal">
              <h3>Documentation</h3>
              <p>Our specialists prepare and review all necessary documents.</p>
            </div>
            <div className="proc reveal">
              <h3>Processing</h3>
              <p>We coordinate with the relevant authorities to ensure smooth approvals and timely completion.</p>
            </div>
            <div className="proc reveal">
              <h3>Success</h3>
              <p>Your business is established, compliant, and ready for growth.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq">
        <div className="wrapc" style={padTop96Bottom128}>
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
                Yes. All Bizpoint Prime translators hold Ministry of Justice certification, and
                every legal translation we produce is recognised by Dubai Courts, MOFA, and UAE
                embassies.
              </p>
            </details>
            <details className="faq-item">
              <summary>
                <span className="faq-left">
                  <span className="faq-num">02</span>
                  <span className="faq-q">What documents can Bizpoint Prime translate legally?</span>
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
                Standard turnaround is 24–48 hours. Same-day service is available for most
                documents, with an express option for urgent requirements.
              </p>
            </details>
            <details className="faq-item">
              <summary>
                <span className="faq-left">
                  <span className="faq-num">05</span>
                  <span className="faq-q">Do you offer business setup services in Dubai?</span>
                </span>
                <span className="faq-icon" aria-hidden="true">+</span>
              </summary>
              <p>
                Yes — mainland, free zone, and offshore company formation, from trade name
                registration through to licence issuance.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      {marqueeImages.length > 0 ? (
        <section className="marquee" id="gallery">
          <div className="marquee-track">
            {marqueeImages.map((item, i) => (
              <Link href="/gallery" className="cell" key={`${item.id}-${i}`}>
                <Image
                  src={getMediaUrl(item.image)}
                  alt={item.caption || "Bizpoint Prime gallery"}
                  fill
                  sizes="320px"
                />
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {/* BLOG */}
      {featuredPost ? (
        <section id="insights">
          <div className="wrapc" style={padTop96Bottom128}>
            <h2 className="h-sec reveal" style={{ maxWidth: "52ch" }}>
              Recent insights for businesses setting up in Dubai.
            </h2>
            <div className="blog-grid">
              <Link href={`/blogs/${featuredPost.slug}`} className="blog-feat reveal">
                <div className="img">
                  <Image
                    src={getMediaUrl(featuredPost.featuredImage)}
                    alt={featuredPost.title}
                    fill
                    sizes="(max-width: 900px) 100vw, 600px"
                  />
                </div>
                <p className="meta">
                  {formatPostDate(featuredPost.publishedDate)}
                  {featuredPost.readTime ? (
                    <>
                      {" "}
                      <span className="sep">/</span> {featuredPost.readTime}
                    </>
                  ) : null}
                </p>
                <h3>{featuredPost.title}</h3>
                <p>{featuredPost.excerpt}</p>
              </Link>
              <div className="blog-col">
                {secondaryPosts.map((post) => (
                  <Link href={`/blogs/${post.slug}`} className="blog-sec reveal" key={post.id}>
                    <div className="img">
                      <Image
                        src={getMediaUrl(post.featuredImage)}
                        alt={post.title}
                        fill
                        sizes="(max-width: 700px) 100vw, 320px"
                      />
                    </div>
                    <div>
                      <p className="meta">
                        {formatPostDate(post.publishedDate)}
                        {post.readTime ? (
                          <>
                            {" "}
                            <span className="sep">/</span> {post.readTime}
                          </>
                        ) : null}
                      </p>
                      <h3>{post.title}</h3>
                      <p className="ex">{post.excerpt}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="reveal" style={{ marginTop: 48 }}>
              <Link href="/blogs" className="btn outline">
                <span>View more</span>
              </Link>
            </div>
          </div>
        </section>
      ) : null}

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
            Ready to Build Your Business?
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
            Whether you&rsquo;re launching your first company, expanding your operations, or
            seeking reliable corporate support, Bizpoint Prime Business Solutions LLC is here to
            help. Let us simplify your business journey with professional solutions tailored to
            your success. Prime. Made. Easy.
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

      {/* CONTACT */}
      <section id="contact" className="contact">
        <div className="wrapc" style={padTop96Bottom128}>
          <div className="contact-grid">
            <div className="reveal">
              <h2 className="h-sec">Tell us what you are setting up.</h2>
              <p className="lead">
                Share a few details and a consultant will get back to you within one business day
                with next steps.
              </p>
              <div className="contact-info">
                <div>
                  <span className="dot"></span>Office No: A1-3, inside Unique Business World, Metha
                  Plaza Building, Block A, Oud Metha, Dubai, UAE
                </div>
                <Link href="tel:+971543084251">
                  <span className="dot"></span>+971 54 308 4251
                </Link>
                <Link href="tel:+971509207769">
                  <span className="dot"></span>+971 50 920 7769
                </Link>
                <Link href="tel:+97142522092">
                  <span className="dot"></span>+971 4 252 2092 (Landline)
                </Link>
                <Link href="mailto:bizpointprime@gmail.com">
                  <span className="dot"></span>bizpointprime@gmail.com
                </Link>
              </div>
            </div>
            <div className="reveal">
              <form id="contact-form">
                <div className="frow">
                  <div className="field">
                    <label htmlFor="name">Full name</label>
                    <input id="name" name="name" type="text" required />
                  </div>
                  <div className="field">
                    <label htmlFor="email">Email address</label>
                    <input id="email" name="email" type="email" required />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="service">What do you need help with</label>
                  <input id="service" name="service" type="text" />
                </div>
                <div className="field">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Mainland setup, contract translation, PRO services..."
                  ></textarea>
                </div>
                <p
                  className="form-error"
                  role="alert"
                  style={{ color: "#c0392b", fontSize: "13.5px", margin: 0, minHeight: 18 }}
                ></p>
                <button type="submit" className="btn" style={{ alignSelf: "flex-start", marginTop: 8 }}>
                  <span>Book a Consultation</span>
                </button>
              </form>
            </div>
          </div>

          <div className="map-embed reveal">
            <iframe
              src="https://www.google.com/maps?q=Bizpoint+Prime+Translation+and+Business+Solutions,25.2310317,55.3131134&output=embed"
              title="Bizpoint Prime Business Solutions LLC location"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      <Footer />

      {/* Desktop-only UI chrome — inert, empty of unique content, until the
          desktop-only script layer activates it. */}
      <div id="cursor" aria-hidden="true">
        <span>View ↗</span>
      </div>
    </>
  );
}
