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
  // "Vietnam: Hanoi, Ha Long & Hoi An" → the country is the label, the route is the title.
  const [, route] = pkg.title.split(": ");

  return (
    <Link href={`/packages/${pkg.slug}`} className="pkg-card reveal">
      <div className="photo">
        <Image
          src={pkg.image}
          alt={pkg.title}
          fill
          sizes="(max-width: 759px) 100vw, (max-width: 1100px) 50vw, 33vw"
        />
      </div>

      <span className="tag tag-date">
        <small>Next departure</small>
        {next ? formatDate(next.date) : "Dates soon"}
      </span>
      {status && status.tone === "few" ? <span className="tag tag-alert">{status.label}</span> : null}

      <div className="body">
        <p className="dest">{pkg.destination}</p>
        <h3>{route ?? pkg.title}</h3>
        <p className="blurb">{pkg.tagline}</p>
        <div className="foot">
          <p className="facts">
            <span className="from">From</span>
            <strong>{price !== null ? formatPrice(price) : "On request"}</strong>
            <span className="len">{pkg.nights + 1} days</span>
          </p>
          <span className="go" aria-hidden="true">
            &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
}
