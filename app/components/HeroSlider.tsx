"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export type HeroSlide = { label: string; image: string; href: string };

const SLIDE_MS = 6500;

/**
 * Full-bleed photo slider for the home hero. Auto-advances, pauses while the
 * tab is hidden, and with reduced motion shows the first slide only until the
 * visitor advances it themselves.
 */
export default function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;

  const go = useCallback((i: number) => setIndex(((i % count) + count) % count), [count]);

  useEffect(() => {
    if (paused || count < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(() => setIndex((i) => (i + 1) % count), SLIDE_MS);
    return () => window.clearTimeout(timer);
  }, [index, paused, count]);

  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const next = slides[(index + 1) % count];

  return (
    <section id="top" className="mhero" style={{ ["--mhero-ms" as string]: `${SLIDE_MS}ms` }}>
      {slides.map((slide, i) => (
        <div className={`mhero-slide${i === index ? " on" : ""}`} key={slide.label} aria-hidden={i !== index}>
          <Image
            src={slide.image}
            alt=""
            fill
            sizes="100vw"
            quality={85}
            priority={i === 0}
          />
        </div>
      ))}

      <div className="wrap mhero-inner">
        <p className="mhero-place">{slides[index].label}</p>
        <h1 className="display">Asia, beyond the guidebook.</h1>
        <p className="sub">
          Premium small-group and private journeys to Vietnam, Kazakhstan, Tajikistan, Kashmir and
          Thailand &mdash; on dated departures you can book today.
        </p>
        <div className="mhero-cta">
          <Link href="/packages" className="btn on-brand">
            <span>Explore Trips</span>
          </Link>
          <Link href="#departures" className="btn outline-light">
            <span>Departure Dates</span>
          </Link>
        </div>
      </div>

      <div className="mhero-ui">
        <div className="wrap">
          <button type="button" className="mhero-next" onClick={() => go(index + 1)} aria-label={`Next: ${next.label}`}>
            <small>Next</small>
            <em>{next.label}</em>
          </button>
          <div
            className="mhero-bars"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {slides.map((slide, i) => (
              <button
                type="button"
                key={slide.label}
                className={`mhero-bar${i === index ? " on" : i < index ? " done" : ""}`}
                onClick={() => go(i)}
                aria-label={`Show ${slide.label}`}
                aria-current={i === index}
              >
                <span />
              </button>
            ))}
          </div>
          <div className="mhero-arrows">
            <button type="button" onClick={() => go(index - 1)} aria-label="Previous slide">
              &larr;
            </button>
            <button type="button" onClick={() => go(index + 1)} aria-label="Next slide">
              &rarr;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
