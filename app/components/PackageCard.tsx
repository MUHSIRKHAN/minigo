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

      <span className="tag tag-date">
        <small>{next ? "Next departure" : "Travel dates"}</small>
        {next ? formatDate(next.date) : pkg.datesOnRequest ? "Any date, on request" : "Coming soon"}
      </span>
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
