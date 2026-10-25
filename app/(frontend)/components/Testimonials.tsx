import Image from "next/image";
import { getTestimonials } from "../lib/content";
import { averageRating } from "../lib/testimonials";

/** Five stars, each filled to the fraction of the rating it represents (4.5 → four and a half). */
function Stars({ rating, label }: { rating: number; label: string }) {
  return (
    <span className="stars" role="img" aria-label={label}>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, rating - i));
        return (
          <span className="star" key={i} aria-hidden="true">
            <svg viewBox="0 0 24 24" className="star-base">
              <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3 6.1 20.6l1.3-6.6L2.5 9.4l6.6-.8L12 2.5z" />
            </svg>
            <span className="star-fill" style={{ width: `${fill * 100}%` }}>
              <svg viewBox="0 0 24 24">
                <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3 6.1 20.6l1.3-6.6L2.5 9.4l6.6-.8L12 2.5z" />
              </svg>
            </span>
          </span>
        );
      })}
    </span>
  );
}

export default async function Testimonials() {
  const testimonials = await getTestimonials();
  if (testimonials.length === 0) return null;
  const average = averageRating(testimonials);

  return (
    <section id="reviews" style={{ background: "var(--bg-raised)" }}>
      <div className="wrapc" style={{ paddingTop: 96, paddingBottom: 120 }}>
        <div className="rev-head">
          <div>
            <p className="kicker reveal">Traveller reviews</p>
            <h2 className="h-sec reveal" style={{ marginTop: 14 }}>
              What our travellers say
            </h2>
            <p className="sub reveal">Kind words from people who have travelled with us.</p>
          </div>
          <div className="rev-score reveal">
            <strong>{average.toFixed(1)}</strong>
            <div>
              <Stars rating={average} label={`Average rating ${average.toFixed(1)} out of 5`} />
              <span className="rev-note">Average from {testimonials.length} reviews</span>
            </div>
          </div>
        </div>

        <div className="rev-grid">
          {testimonials.map((t) => (
            <figure className="rev-card reveal" key={t.name}>
              <Stars rating={t.rating} label={`${t.rating} out of 5 stars`} />
              <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption>
                <Image src={t.photo} alt={t.name} width={56} height={56} className="rev-photo" />
                <span>
                  <strong>{t.name}</strong>
                  <em>
                    {t.from} &middot; {t.when}
                  </em>
                  <small>{t.trip}</small>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
