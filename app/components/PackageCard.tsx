import Image from "next/image";
import Link from "next/link";
import {
  departureStatus,
  formatDate,
  formatPrice,
  nextDeparture,
  startingPrice,
  type TourPackage,
} from "../lib/packages";

export default function PackageCard({ pkg }: { pkg: TourPackage }) {
  const price = startingPrice(pkg);
  const next = nextDeparture(pkg);
  const status = next ? departureStatus(next) : null;

  return (
    <Link href={`/packages/${pkg.slug}`} className="pkg-card reveal">
      <div className="photo">
        <Image
          src={pkg.image}
          alt={pkg.title}
          fill
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
        />
        <span className="chip">
          {pkg.nights + 1} days · {pkg.nights} nights
        </span>
      </div>
      <div className="body">
        <p className="dest">
          {pkg.destination} <span className="sep">/</span> {pkg.style}
        </p>
        <h3>{pkg.title}</h3>
        <p className="blurb">{pkg.summary}</p>
        <div className="foot">
          <div>
            <span className="label">From</span>
            <span className="price">{price !== null ? formatPrice(price) : "On request"}</span>
            {price !== null ? <span className="per"> / person</span> : null}
          </div>
          <div className="next">
            {next ? (
              <>
                <span className="label">Next departure</span>
                <span className="date">{formatDate(next.date)}</span>
                {status && status.tone === "few" ? <span className="few">{status.label}</span> : null}
              </>
            ) : (
              <span className="label">Dates coming soon</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
