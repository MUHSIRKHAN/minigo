import type { Metadata } from "next";
import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { PACKAGES } from "./lib/packages";

export const metadata: Metadata = {
  title: "Page not found | Minigo Holidays",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <section>
        <div className="wrapc" style={{ paddingTop: 120, paddingBottom: 140 }}>
          <p className="kicker">Error 404</p>
          <h1 className="h-sec" style={{ marginTop: 14 }}>
            This page has wandered off.
          </h1>
          <p className="sub">The link may be old, or the tour may no longer run.</p>
          <div style={{ marginTop: 32, display: "flex", gap: 16, flexWrap: "wrap" }}>
            <Link href="/" className="btn">
              <span>Back to home</span>
            </Link>
            <Link href="/packages" className="btn outline">
              <span>Browse tour packages</span>
            </Link>
          </div>
          <nav className="region-filter" aria-label="Popular tours" style={{ marginTop: 40 }}>
            {PACKAGES.map((pkg) => (
              <Link key={pkg.slug} href={`/packages/${pkg.slug}`}>
                {pkg.destination.split(",")[0]}
              </Link>
            ))}
          </nav>
        </div>
      </section>
      <Footer />
    </>
  );
}
