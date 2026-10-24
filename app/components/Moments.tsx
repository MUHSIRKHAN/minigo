import Image from "next/image";
import { MOMENTS } from "../lib/moments";

export default function Moments() {
  return (
    <section id="moments">
      <div className="wrapc" style={{ paddingTop: 96, paddingBottom: 110 }}>
        <p className="kicker reveal">Travellers&rsquo; best moments</p>
        <h2 className="h-sec reveal" style={{ marginTop: 14 }}>
          Moments worth the journey
        </h2>
        <p className="sub reveal">A few favourites from the road.</p>

        <div className="moments">
          {MOMENTS.map((m) => (
            <figure className="moment reveal" key={m.caption}>
              <Image
                src={m.image}
                alt={`${m.place}: ${m.caption}`}
                fill
                sizes="(max-width: 899px) 50vw, 25vw"
              />
              <figcaption>
                <span>{m.place}</span>
                <em>{m.caption}</em>
                <small>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M9 4l-1.5 2H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-2.5L15 4H9zm3 4.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9zm0 2a2.5 2.5 0 100 5 2.5 2.5 0 000-5z" />
                  </svg>
                  <cite>
                    Captured by <b>{m.by}</b>, {m.from}
                  </cite>
                </small>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
