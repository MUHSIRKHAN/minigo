"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// The brand film: four scenes, about 9.5 seconds, looping. Times are where each
// scene is fully on screen (mid-way through the dissolves), in seconds.
const SCENES = [
  { from: 0, place: "Dal Lake · Kashmir" },
  { from: 2.5, place: "Tian Shan · Kazakhstan" },
  { from: 4.75, place: "Lakshadweep · India" },
  { from: 7, place: "Hoi An · Vietnam" },
  { from: 9.25, place: "Dal Lake · Kashmir" },
];

const POSTER = "/assets/hero/hero-poster.jpg";

/**
 * Full-bleed hero with the looping brand film. The poster photo renders first
 * (fast first paint); the video fades in once it is actually playing. Visitors
 * with reduced motion or data saver on keep the still photo.
 */
export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [useVideo, setUseVideo] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);
  const [scene, setScene] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    setUseVideo(!reduce && !saveData);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onTime = () => {
      let i = 0;
      SCENES.forEach((s, n) => {
        if (video.currentTime >= s.from) i = n;
      });
      setScene(i);
    };
    video.addEventListener("timeupdate", onTime);
    return () => video.removeEventListener("timeupdate", onTime);
  }, [useVideo]);

  function togglePause() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
      setPaused(false);
    } else {
      video.pause();
      setPaused(true);
    }
  }

  return (
    <section id="top" className="mhero mhero--film">
      <div className="mhero-slide on">
        <Image src={POSTER} alt="" aria-hidden="true" fill sizes="100vw" quality={85} priority />
      </div>
      {useVideo ? (
        <video
          ref={videoRef}
          className={`mhero-video${playing ? " on" : ""}`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={POSTER}
          aria-hidden="true"
          onPlaying={() => setPlaying(true)}
        >
          {/* Phones held upright show the film in a square frame above the copy (see globals.css),
              so they get that square middle cut at full resolution. */}
          <source src="/assets/hero/hero-phone-square.mp4" type="video/mp4" media="(max-aspect-ratio: 2/3)" />
          <source src="/assets/hero/hero-desktop.mp4" type="video/mp4" />
        </video>
      ) : null}

      <div className="wrap mhero-inner">
        <p className="mhero-place" aria-live="off">
          {SCENES[scene].place}
        </p>
        <h1 className="display">Extraordinary journeys, effortlessly planned.</h1>
        <p className="sub">
          Group tours and private trips to Kashmir, Lakshadweep, Goa, Vietnam, Kazakhstan and across
          India &mdash; for couples, families and friends.
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

      {useVideo ? (
        <button
          type="button"
          className="mhero-pause"
          onClick={togglePause}
          aria-label={paused ? "Play background video" : "Pause background video"}
        >
          {paused ? (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 5h4v14H7zM13 5h4v14h-4z" />
            </svg>
          )}
        </button>
      ) : null}
    </section>
  );
}
