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
      <span className="chip">{pkg.nights} nights</span>
      <div className="body">
        <p className="dest">{pkg.destination}</p>
        <h3>{route ?? pkg.title}</h3>
        <p className="blurb">{pkg.tagline}</p>
        <div className="foot">
          <div className="facts">
            <div>
              <span>From</span>
              <strong>{price !== null ? formatPrice(price) : "On request"}</strong>
            </div>
            <div>
              <span>Next departure</span>
              <strong>{next ? formatDate(next.date) : "Soon"}</strong>
              {status && status.tone === "few" ? <em className="few">{status.label}</em> : null}
            </div>
          </div>
          <span className="go">Explore trip</span>
        </div>
      </div>
    </Link>
  );
}
