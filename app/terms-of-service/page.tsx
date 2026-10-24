import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { BUSINESS, SITE_URL } from "../lib/site";
import Link from "next/link";

const TITLE = "Terms of Service | Bizpoint Prime Business Solutions LLC";
const DESCRIPTION =
  "The terms and conditions that govern your use of Bizpoint Prime Business Solutions LLC's website and services.";
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
            Terms of Service
          </h1>
          <p className="blog-lede reveal" style={{ marginTop: 16 }}>
            Last updated: August 2026
          </p>

          <div className="rich-text reveal">
            <h2>1. Agreement to Terms</h2>
            <p>
              By accessing our website at {SITE_URL} and utilizing the services provided by{" "}
              {BUSINESS.name}{" "}
              (&ldquo;Bizpoint Prime&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;), you agree to be
              bound by these Terms of Service. If you do not agree with any part of these terms,
              you are prohibited from using or accessing this site and our services.
            </p>

            <h2>2. Description of Services</h2>
            <p>
              Bizpoint Prime provides professional legal translation, Ministry of Foreign Affairs
              (MOFA) attestation, Ministry of Justice (MOJ) certified translation, notary services,
              PRO (Public Relations Officer) services, VAT registration, visa services, branding
              &amp; marketing, and comprehensive business setup consulting within the United Arab
              Emirates.
            </p>

            <h2>3. Client Responsibilities &amp; Document Accuracy</h2>
            <p>
              When submitting documents for translation, attestation, or business setup processing:
            </p>
            <ul>
              <li>
                You guarantee that all documents provided are authentic, legally obtained, and not
                forged.
              </li>
              <li>
                You are solely responsible for ensuring the accuracy of names, dates, and specific
                terminologies requested for translation prior to final approval.
              </li>
              <li>
                Bizpoint Prime reserves the right to refuse service for any document that appears
                to be tampered with, illegal, or in violation of UAE law.
              </li>
            </ul>

            <h2>4. Turnaround Times and Delivery</h2>
            <p>
              While we strive to meet all stated deadlines (e.g. 24-hour standard delivery),
              turnaround times are estimates and may be subject to delays caused by government
              processing times, unforeseen technical issues, or the complexity of the source
              material. Bizpoint Prime shall not be held liable for any direct or indirect damages
              resulting from delayed delivery.
            </p>

            <h2>5. Payments, Fees, and Refunds</h2>
            <p>
              <strong>Payment terms:</strong> full payment or an agreed-upon advance deposit is
              required before the commencement of any translation or government processing
              service.
            </p>
            <p>
              <strong>Government fees:</strong> any fees paid directly to UAE government entities
              (e.g. Dubai Courts, DED, MOFA) on your behalf are strictly non-refundable under any
              circumstances.
            </p>
            <p>
              <strong>Refund policy for services:</strong> if a translation error is identified, we
              will provide free revisions until the document is accurate. Refunds for service fees
              are only provided if Bizpoint Prime completely fails to deliver the agreed-upon
              service and no government applications have been initiated.
            </p>

            <h2>6. Intellectual Property &amp; Confidentiality</h2>
            <p>
              All translated documents remain strictly confidential. Bizpoint Prime claims no
              ownership over your source documents. However, the intellectual property rights to
              the layout, design, and content of the {SITE_URL.replace(/^https?:\/\//, "")} website
              are owned exclusively by Bizpoint Prime.
            </p>

            <h2>7. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by UAE law, Bizpoint Prime shall not be liable for
              any indirect, incidental, special, consequential, or punitive damages, including loss
              of profits, data, or business opportunities, arising out of or related to your use of
              our services or website. Our total liability for any claim arising out of our
              services shall not exceed the total amount paid by you for the specific service in
              question.
            </p>

            <h2>8. Modifications to Terms</h2>
            <p>
              Bizpoint Prime reserves the right to revise these Terms of Service at any time
              without prior notice. By using this website, you are agreeing to be bound by the
              current version of these Terms of Service.
            </p>

            <h2>9. Governing Law and Jurisdiction</h2>
            <p>
              These Terms of Service and any separate agreements whereby we provide you services
              shall be governed by and construed in accordance with the federal laws of the United
              Arab Emirates and the local laws of the Emirate of Dubai. Any disputes shall be
              subject to the exclusive jurisdiction of the Courts of Dubai.
            </p>

            <h2>10. Contact Information</h2>
            <p>If you have any questions about these Terms of Service, please contact us at:</p>
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
