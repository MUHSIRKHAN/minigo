import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { BUSINESS, SITE_URL } from "../lib/site";
import Link from "next/link";

const TITLE = "Privacy Policy | Bizpoint Prime Business Solutions LLC";
const DESCRIPTION =
  "How Bizpoint Prime Business Solutions LLC collects, uses, and protects your personal data.";
const PATH = "/privacy-policy";

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

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />

      <article>
        <div className="wrapc blog-article" style={{ paddingTop: 128, paddingBottom: 112 }}>
          <p className="kicker reveal" style={{ color: "var(--accent)" }}>
            Legal
          </p>
          <h1 className="reveal" style={{ marginTop: 8 }}>
            Privacy Policy
          </h1>
          <p className="blog-lede reveal" style={{ marginTop: 16 }}>
            Last updated: August 2026
          </p>

          <div className="rich-text reveal">
            <h2>1. Introduction</h2>
            <p>
              Bizpoint Prime Business Solutions LLC (&ldquo;Bizpoint Prime&rdquo;, &ldquo;we&rdquo;,
              &ldquo;our&rdquo;, or &ldquo;us&rdquo;) respects your privacy and is committed to
              protecting your personal data. This Privacy Policy outlines how we collect, use,
              disclose, and safeguard your information when you visit our website ({SITE_URL}) or
              engage our services in Dubai, United Arab Emirates.
            </p>
            <p>
              This policy complies with the UAE Federal Decree-Law No. 45 of 2021 regarding the
              Protection of Personal Data, as well as the data collection and tracking guidelines
              set forth by major advertising platforms including Google and Meta.
            </p>

            <h2>2. Information We Collect</h2>
            <h3>Personal Information</h3>
            <p>
              We may collect personal information that you voluntarily provide to us when you
              request a consultation, use our WhatsApp chat, or fill out a contact form. This
              includes:
            </p>
            <ul>
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number / WhatsApp number</li>
              <li>Documents uploaded for translation, attestation, or business setup purposes</li>
            </ul>
            <h3>Automatically Collected Data &amp; Cookies</h3>
            <p>
              When you access our website, we automatically collect certain information about your
              device and browsing patterns using cookies and similar tracking technologies. This
              includes:
            </p>
            <ul>
              <li>IP address and approximate geographical location</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Pages viewed and time spent on the site</li>
            </ul>

            <h2>3. How We Use Your Data</h2>
            <p>We use the collected information for the following purposes:</p>
            <ul>
              <li>To provide and manage our legal translation, PRO, and business setup services.</li>
              <li>To communicate with you regarding your inquiries, quotes, or ongoing projects.</li>
              <li>
                To comply with UAE legal obligations, including submitting necessary documents to
                Dubai Courts, MOFA, or other government entities on your behalf.
              </li>
              <li>To improve our website performance and user experience.</li>
              <li>To deliver targeted advertising and promotional offers (see section 4).</li>
            </ul>

            <h2>4. Third-Party Analytics and Advertising (Google &amp; Meta)</h2>
            <p>
              We use third-party analytics and advertising tools to measure our website&rsquo;s
              performance and deliver relevant advertisements to users who have shown interest in
              our services.
            </p>
            <h3>Google Analytics &amp; Google Ads</h3>
            <p>
              We use Google Analytics (via Google Tag Manager) to understand how users interact
              with our site, and Google Ads for remarketing. Google uses cookies to serve ads based
              on your past visits to our website. You can opt out of Google&rsquo;s use of cookies
              or device identifiers by visiting the Google Ads Settings.
            </p>
            <h3>Meta (Facebook) Pixel</h3>
            <p>
              Where enabled, we use the Meta Pixel to track conversions, optimize ads, and build
              targeted audiences for future ads. Meta may use this data to provide you with
              targeted advertisements on Facebook, Instagram, and across the Meta network. You can
              manage your ad preferences in your Facebook Ad Settings.
            </p>

            <h2>5. Data Sharing and Disclosure</h2>
            <p>
              We do not sell your personal data to third parties. We may share your information
              only in the following circumstances:
            </p>
            <ul>
              <li>
                <strong>Government entities:</strong> to process your applications, attestation, or
                business setup with UAE authorities (e.g. MOJ, MOFA, DED).
              </li>
              <li>
                <strong>Service providers:</strong> with trusted third-party vendors who assist us
                in operating our website and conducting our business (e.g. hosting providers, CRM
                systems), subject to strict confidentiality agreements.
              </li>
              <li>
                <strong>Legal requirements:</strong> if required to do so by UAE law or in response
                to a valid request by a law enforcement or governmental authority.
              </li>
            </ul>

            <h2>6. Data Security</h2>
            <p>
              We implement robust technical and organizational security measures designed to
              protect the security of any personal information we process. Documents submitted for
              legal translation are treated with the highest level of confidentiality and are
              securely deleted from our active servers once the project is completed and delivered.
            </p>

            <h2>7. Your Data Protection Rights</h2>
            <p>Under UAE Data Protection Law, you have the right to:</p>
            <ul>
              <li>Request access to the personal data we hold about you.</li>
              <li>Request correction of inaccurate or incomplete data.</li>
              <li>
                Request deletion of your personal data (&ldquo;right to be forgotten&rdquo;),
                subject to our legal obligations to retain certain records.
              </li>
              <li>Withdraw your consent to marketing communications at any time.</li>
            </ul>
            <p>
              To exercise these rights, please contact us at{" "}
              <Link href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</Link>.
            </p>

            <h2>8. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our
              practices or relevant UAE laws. We will notify you of any significant changes by
              updating the &ldquo;Last Updated&rdquo; date at the top of this page.
            </p>

            <h2>9. Contact Us</h2>
            <p>
              If you have any questions or concerns about this Privacy Policy or our data
              practices, please contact us at:
            </p>
            <p>
              {BUSINESS.name}
              <br />
              {BUSINESS.streetAddress}, {BUSINESS.addressLocality}, United Arab Emirates
              <br />
              Email: <Link href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</Link>
              <br />
              Phone: <Link href={`tel:${BUSINESS.telephone}`}>{BUSINESS.telephone}</Link>
            </p>
          </div>
        </div>
      </article>

      <Footer />
    </>
  );
}
