import Image from "next/image";
import Link from "next/link";
import {
  departureStatus,
  durationText,
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
  const duration = durationText(pkg, true);
  // "Kashmir: Srinagar, Gulmarg…" → the destination is the label, the route is the title.
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

      <div className="pkg-dates">
        <span className="pd-main">
          <svg className="pd-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7 2h2v2h6V2h2v2h2a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2V2zm12 8H5v9h14v-9z" />
          </svg>
          <span className="pd-text">
            <small>{next ? "Next departure" : "Travel dates"}</small>
            <strong>{next ? formatDate(next.date) : "Any date, on request"}</strong>
          </span>
        </span>
        {next ? <span className="pd-any">Or any date on request</span> : null}
      </div>
      {status && status.tone === "few" ? <span className="tag tag-alert">{status.label}</span> : null}

      <div className="body">
        <p className="dest">{pkg.destination}</p>
        <h3>{route ?? pkg.title}</h3>
        <p className="blurb">{pkg.tagline}</p>
        <div className="foot">
          <p className="facts">
            <span className="from">From</span>
            <strong>{formatPrice(price)}</strong>
            {duration ? <span className="len">{duration}</span> : null}
          </p>
          <span className="go" aria-hidden="true">
            &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
}
