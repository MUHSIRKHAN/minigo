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
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
