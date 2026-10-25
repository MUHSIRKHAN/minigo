import Link from "next/link";
import { BUSINESS } from "../lib/site";

/**
 * The enquiry form plus contact details. The `contact-form` id and the
 * name/email/service/message field names are wired up by SiteAnimations and
 * /api/contact — keep them as they are.
 */
export default function EnquiryForm({
  defaultService = "",
  defaultMessage = "",
  heading = "Tell us where you want to go.",
}: {
  defaultService?: string;
  defaultMessage?: string;
  heading?: string;
}) {
  return (
    <div className="contact-grid" id="enquiry">
      <div className="reveal">
        <h2 className="h-sec">{heading}</h2>
        <p className="lead">
          Share a few details and one of our travel designers will reply within one business day
          with availability, a price and next steps.
        </p>
        <div className="contact-info">
          <div>
            <span className="dot"></span>
            {BUSINESS.address}
          </div>
          <Link href={`tel:${BUSINESS.telephoneHref}`}>
            <span className="dot"></span>
            {BUSINESS.telephone}
          </Link>
          <Link href={`mailto:${BUSINESS.email}`}>
            <span className="dot"></span>
            {BUSINESS.email}
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
            <label htmlFor="service">Tour package or destination</label>
            <input id="service" name="service" type="text" defaultValue={defaultService} placeholder="e.g. Kashmir group tour, 23 Dec" />
          </div>
          <div className="field">
            <label htmlFor="message">Travel dates, group size &amp; anything else</label>
            <textarea
              id="message"
              name="message"
              rows={4}
              defaultValue={defaultMessage}
              placeholder="Preferred dates, number of travellers, special occasions..."
            ></textarea>
          </div>
          <p
            className="form-error"
            role="alert"
            style={{ color: "#c0392b", fontSize: "13.5px", margin: 0, minHeight: 18 }}
          ></p>
          <button type="submit" className="btn" style={{ alignSelf: "flex-start", marginTop: 8 }}>
            <span>Send Enquiry</span>
          </button>
        </form>
      </div>
    </div>
  );
}
