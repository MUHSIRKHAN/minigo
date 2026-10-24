import Link from "next/link";
import { departureStatus, formatDate, formatPrice, type Departure, type TourPackage } from "../lib/packages";
import { BUSINESS, whatsappLink } from "../lib/site";

export type DepartureRow = { pkg: TourPackage; departure: Departure };

/**
 * Dated departures with live seat status. When `showPackage` is set each row
 * names its tour (for cross-package calendars); otherwise it is the single-tour table.
 */
export default function DepartureList({
  rows,
  showPackage = false,
}: {
  rows: DepartureRow[];
  showPackage?: boolean;
}) {
  if (rows.length === 0) {
    return <p className="dep-empty">New departure dates are being added. Contact us and we&rsquo;ll hold a place for you.</p>;
  }

  return (
    <div className="dep-list" role="list">
      {rows.map(({ pkg, departure }) => {
        const status = departureStatus(departure);
        const soldOut = status.tone === "full";
        const enquiry = `/contact-us?package=${encodeURIComponent(pkg.title)}&date=${departure.date}#enquiry`;
        const message = `Hi ${BUSINESS.name}, I'm interested in "${pkg.title}" departing ${formatDate(departure.date)}.`;

        return (
          <div className="dep-row" role="listitem" key={`${pkg.slug}-${departure.date}`}>
            <div className="dep-date">
              <strong>{formatDate(departure.date)}</strong>
              {showPackage ? (
                <Link href={`/packages/${pkg.slug}`} className="dep-pkg">
                  {pkg.title}
                </Link>
              ) : (
                <span className="dep-sub">
                  {pkg.nights + 1} days · {pkg.nights} nights
                </span>
              )}
            </div>
            <div className="dep-price">
              {formatPrice(departure.price)}
              <span> / person</span>
            </div>
            <div className={`dep-status ${status.tone}`}>
              <span className="dot" aria-hidden="true"></span>
              {status.label}
            </div>
            <div className="dep-actions">
              {soldOut ? (
                <Link href={enquiry} className="btn outline sm">
                  <span>Join waitlist</span>
                </Link>
              ) : (
                <>
                  <Link href={enquiry} className="btn sm">
                    <span>Enquire</span>
                  </Link>
                  <Link
                    href={whatsappLink(message)}
                    className="btn outline sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>WhatsApp</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
