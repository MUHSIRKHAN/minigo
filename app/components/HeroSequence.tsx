"use client";

import { useEffect, useRef, useState } from "react";
import NextImage from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onPrepareClientNav } from "../lib/prepareClientNav";

/**
 * Scroll-linked image sequence on a canvas — the technique Apple uses on the
 * AirPods Pro page. Self-contained: preloader, canvas, scrim and CSS all live
 * in this file, so it can be dropped into any full-bleed section.
 *
 * One pinned scrub drives everything:
 *   1. The hero opens on the first frame — city only, no copy.
 *   2. Scrolling advances the frames AND pushes the camera in.
 *   3. As the push settles, the scrim deepens and the copy lands in sequence.
 *
 * The camera push is applied inside drawImage rather than as a CSS transform
 * on the canvas, so every step re-rasterises at full device resolution instead
 * of the GPU upscaling an already-rendered bitmap.
 */

const FRAME_COUNT = 36;
const FRAME_SRC = (n: number) =>
  `/assets/hero-sequence/frame-${String(n + 1).padStart(3, "0")}.jpg`;
const LOAD_CONCURRENCY = 8;
const MAX_DPR = 2;

/** Fraction of the pinned scroll the flight-in occupies before copy lands. */
const FLIGHT_END = 0.7;
/** Camera push applied across the flight. */
const ZOOM_FROM = 1;
const ZOOM_TO = 1.16;
/**
 * Vertical anchor for the cover crop and the push: 0 keeps the top edge
 * pinned, 0.5 centres, 1 keeps the bottom. The skyline tops sit right at the
 * top of these frames, so a centred push would decapitate the towers — this
 * keeps them in shot and lets the crop eat the water at the bottom instead.
 */
const FOCUS_Y = 0.08;

type Props = {
  /** Element to pin. */
  pinTarget?: string;
  /** Scroll distance the sequence plays over, as a % of viewport height. */
  scrollDistance?: string;
};

export default function HeroSequence({
  pinTarget = ".hero",
  scrollDistance = "+=200%",
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const section = document.querySelector<HTMLElement>(pinTarget);
    if (!section) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const frames: HTMLImageElement[] = new Array(FRAME_COUNT);
    const loaded: boolean[] = new Array(FRAME_COUNT).fill(false);
    const view = { frame: 0, zoom: ZOOM_FROM };
    let disposed = false;

    // ---- canvas sizing: back the CSS box with real device pixels ----
    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const rect = canvas!.getBoundingClientRect();
      const w = Math.round(rect.width * dpr);
      const h = Math.round(rect.height * dpr);
      if (canvas!.width === w && canvas!.height === h) return;
      canvas!.width = w;
      canvas!.height = h;
      render();
    }

    // ---- cover-fit draw, centred on both axes, with the push baked in ----
    function render() {
      // If the exact frame is still in flight, hold the nearest earlier one
      // rather than flashing a blank canvas.
      let i = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(view.frame)));
      while (i > 0 && !loaded[i]) i--;
      const img = frames[i];
      if (!img || !loaded[i]) return;

      const cw = canvas!.width;
      const ch = canvas!.height;
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = cw / ch;

      let dw: number;
      let dh: number;
      if (canvasRatio > imgRatio) {
        dw = cw;
        dh = cw / imgRatio;
      } else {
        dh = ch;
        dw = ch * imgRatio;
      }
      dw *= view.zoom;
      dh *= view.zoom;
      ctx!.drawImage(img, (cw - dw) / 2, (ch - dh) * FOCUS_Y, dw, dh);
    }

    // ---- preload, in order, with a small concurrency window so the opening
    // frames land first and the sequence is scrubbable almost immediately ----
    let cursor = 0;
    let inFlight = 0;
    function pump() {
      while (cursor < FRAME_COUNT && inFlight < LOAD_CONCURRENCY) {
        loadFrame(cursor++);
      }
    }
    function loadFrame(n: number) {
      inFlight++;
      const img = new Image();
      img.decoding = "async";
      img.src = FRAME_SRC(n);
      const done = () => {
        inFlight--;
        if (disposed) return;
        if (n === 0) {
          // resize() only paints when the buffer size actually changes, and by
          // now it usually hasn't — so paint explicitly or the canvas stays
          // blank until some later layout change happens to trigger one.
          resize();
          render();
          setReady(true);
        } else if (n === Math.round(view.frame)) {
          render();
        }
        pump();
      };
      img.onload = () => {
        frames[n] = img;
        loaded[n] = true;
        done();
      };
      img.onerror = done;
    }
    pump();

    resize();
    // The pin-spacer, font loading and mobile URL-bar collapse all resize the
    // hero after mount, so observe the box rather than just the window.
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Moving the window to a display with a different pixel ratio changes the
    // required buffer size without changing the CSS box, so ResizeObserver
    // alone would leave the canvas rendering at the old resolution.
    let dprQuery: MediaQueryList | null = null;
    function onDprChange() {
      resize();
      watchDpr();
    }
    function watchDpr() {
      dprQuery?.removeEventListener("change", onDprChange);
      dprQuery = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
      dprQuery.addEventListener("change", onDprChange);
    }
    watchDpr();

    // ---- mask the H1 lines so they can rise out of a clipped box ----
    // Inners live in React markup so we never reparent React-owned nodes
    // (that races soft navigations and throws removeChild NotFoundError).
    // The overflow clip class is applied here so no-JS still sees a full headline.
    const lines = Array.from(section.querySelectorAll<HTMLElement>("h1 .line"));
    const lineInners = lines
      .map((line) => line.querySelector<HTMLElement>(":scope > .hero-seq__line-inner"))
      .filter((el): el is HTMLElement => Boolean(el));
    lines.forEach((l) => l.classList.add("hero-seq__line"));

    // ---- scroll → frames, push, then copy ----
    let tl: gsap.core.Timeline | null = null;
    let brandIn: gsap.core.Tween | null = null;

    // Only the pin actually needs to go before React unmounts: ScrollTrigger
    // wraps the pinned section in a spacer div, and if that's still in place
    // when React tries to remove the section's children it throws
    // removeChild NotFoundError. The opacity/transform resets below don't
    // restructure the DOM, so they must NOT run here — this fires on every
    // internal link click while the hero is still fully on screen, and
    // clearProps("all") would instantly reveal the (still hidden, not-yet-
    // scrolled-to) copy for as long as the route transition takes.
    function killPin() {
      brandIn?.kill();
      brandIn = null;
      tl?.scrollTrigger?.kill();
      tl?.kill();
      tl = null;
    }

    function teardownMotion() {
      killPin();
      gsap.set(
        [".hero-kicker", ".hero-desc", ".hero-cta", ".hero-chip", ".hero-trust-corner"],
        { clearProps: "all" }
      );
      gsap.set(lineInners, { clearProps: "all" });
      lines.forEach((l) => l.classList.remove("hero-seq__line"));
    }

    // Unpin before Next.js commits the route change (useEffect cleanup is too late).
    const stopPrepare = onPrepareClientNav(killPin);

    if (!reduceMotion) {
      gsap.registerPlugin(ScrollTrigger);

      const q = <T extends Element>(sel: string) => section.querySelector<T>(sel);
      const shell = canvas!.parentElement!;
      const scrim = shell.querySelector<HTMLElement>(".hero-seq__scrim");
      const brand = shell.querySelector<HTMLElement>(".hero-seq__brand");
      const gridLines = Array.from(section.querySelectorAll<HTMLElement>(".hero-grid-lines .v"));
      const chips = Array.from(section.querySelectorAll<HTMLElement>(".hero-chip"));

      tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: scrollDistance,
          pin: section,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.6,
          invalidateOnRefresh: true,
          // Pinning shifts every trigger below it, so this one must measure first.
          refreshPriority: 1,
        },
      });

      // 1 + 2. The flight: frames advance and the camera pushes in together.
      tl.to(
        view,
        {
          frame: FRAME_COUNT - 1,
          zoom: ZOOM_TO,
          ease: "none",
          duration: FLIGHT_END,
          onUpdate: render,
        },
        0
      );

      // The footage is night-dark already, so the scrim starts light and
      // deepens only as far as the copy needs for contrast.
      if (scrim) {
        // Starts high enough for the brand title to hold against the lit
        // hotel facade it sits over, then deepens for the body copy.
        tl.fromTo(scrim, { opacity: 0.45 }, { opacity: 1, ease: "none", duration: 0.62 }, 0);
      }

      // The brand title holds over the opening frames, then lifts away well
      // before the real hero copy starts arriving, so the two never overlap.
      if (brand) {
        // Entrance is its own real-time tween, not part of the scrub: the
        // title fades up on load, with no scrolling required. Ownership of
        // this element then transfers to the scrubbed tween below — see its
        // onStart, which is what stops the two fighting over opacity.
        brandIn = gsap.fromTo(
          brand,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 1.2, ease: "power2.out", delay: 0.15 }
        );
        // Rise is clamped to the title's actual clearance above the sticky
        // nav, not a fixed guess: on a tall desktop hero -140px reads as a
        // graceful recede, but that same distance on a short mobile viewport
        // drove the title up behind the (by then solid) nav bar mid-scroll.
        // "power2.in" keeps opacity near its start value for most of the
        // tween's length, so the two must be capped together — fading out
        // faster while still rising the full distance would still show it
        // sliding under the nav.
        // Measured from .hero-seq__brand-inner, not `brand` itself: the outer
        // element is `inset:0` on the full hero box, so its top always equals
        // the nav's bottom exactly — that measured a permanent -20px "clearance"
        // no matter where the padding actually placed the visible text, and
        // silently floored every rise at 24px.
        //
        // offsetTop/offsetHeight rather than getBoundingClientRect(): rects
        // include ancestor transforms, and this very tween puts a translate +
        // scale on `brand`. Any re-measure therefore read the title's animated
        // position instead of its layout position and collapsed the clearance
        // to the 24px floor again — a barely-perceptible nudge in place of the
        // intended 140px recede. Offsets are pure layout and ignore transforms.
        // Kept as a function so invalidateOnRefresh re-runs it once webfonts
        // have landed and on every resize, instead of freezing whatever the
        // layout happened to be during mount.
        const riseFor = () => {
          const nav = document.getElementById("nav");
          const inner = brand.querySelector<HTMLElement>(".hero-seq__brand-inner");
          if (!nav || !inner) return 140;
          return Math.min(140, Math.max(24, inner.offsetTop - nav.offsetHeight - 20));
        };
        // Travels up and shrinks as it goes, so it reads as receding toward
        // the hero copy rather than simply dissolving in place. Clears well
        // before the copy starts landing at 0.58.
        tl.to(
          brand,
          {
            opacity: 0,
            y: () => -riseFor(),
            scale: 0.88,
            ease: "power2.in",
            duration: 0.26,
            // Hand this element over to the scrub the moment the fade-out
            // starts. The entrance above runs in real time, so without this it
            // can finish *after* the scrubbed fade-out has already completed
            // and write opacity straight back up to 1 — stranding the title at
            // full strength on top of the hero copy. It used to be masked by
            // the hero needing ~79px of scroll before it pinned, which reliably
            // gave the 1.35s entrance time to land first; pinning from scroll 0
            // removed that grace period and made the race lose.
            onStart: () => {
              brandIn?.kill();
              brandIn = null;
            },
          },
          0.14
        );
      }

      // 3. The copy arrives, staged against the same scrub. Every target is
      // optional — the hero's decorative layers come and go, and a missing
      // one must not break the sequence.
      //
      // These are fromTo, never from, and that is load-bearing: globals.css
      // pre-hides this copy (html.js rules) so it can't flash before JS runs,
      // and a bare .from() would read that opacity:0 as its *end* value and
      // animate 0 → 0, leaving the hero permanently blank. Stating both ends
      // keeps the tween independent of whatever the stylesheet starts at.
      const at = 0.58;
      const rise = (sel: string, offset: number, y = 20, duration = 0.14) => {
        const el = q<HTMLElement>(sel);
        if (el) {
          tl!.fromTo(
            el,
            { opacity: 0, y },
            { opacity: 1, y: 0, duration, ease: "power3.out" },
            at + offset
          );
        }
      };

      const groundline = q<HTMLElement>(".hero-groundline");
      if (groundline) {
        tl.fromTo(
          groundline,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.2, ease: "power2.out", transformOrigin: "left center" },
          at
        );
      }
      if (gridLines.length) {
        tl.fromTo(
          gridLines,
          { scaleY: 0 },
          { scaleY: 1, duration: 0.2, ease: "power2.out", stagger: 0.02, transformOrigin: "top" },
          at
        );
      }
      rise(".hero-kicker", 0.02);
      if (lineInners.length) {
        // `y: 0` on both ends is required, not decorative. globals.css
        // pre-hides these with transform:translateY(110%); GSAP parses that
        // existing transform into its own `y` cache (in px) and then applies
        // yPercent on top of it — so the start doubles to 220% and, worse,
        // the parsed y survives after yPercent animates to 0, leaving the
        // headline stuck one full line below its clip box forever. Stating y
        // explicitly overwrites that parsed offset.
        tl.fromTo(
          lineInners,
          { yPercent: 110, y: 0 },
          { yPercent: 0, y: 0, duration: 0.2, ease: "power3.out", stagger: 0.045 },
          at + 0.05
        );
      }
      rise(".hero-desc", 0.14, 20, 0.16);
      rise(".hero-cta", 0.18);
      if (chips.length) {
        tl.fromTo(
          chips,
          { opacity: 0, y: 16, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.14, ease: "power3.out", stagger: 0.035 },
          at + 0.22
        );
      }
      rise(".hero-trust-corner", 0.26);
    }

    return () => {
      disposed = true;
      stopPrepare();
      ro.disconnect();
      dprQuery?.removeEventListener("change", onDprChange);
      teardownMotion();
    };
  }, [pinTarget, scrollDistance]);

  return (
    <div className="hero-seq" aria-hidden="true">
      {/* Poster: the opening frame. Visible while the sequence loads, and the
          permanent fallback if canvas/JS never runs. */}
      <NextImage className="hero-seq__poster" src={FRAME_SRC(0)} alt="" fill sizes="100vw" priority />
      <canvas ref={canvasRef} className={`hero-seq__canvas${ready ? " is-ready" : ""}`} />
      {/* Contrast scrim. A plain directional gradient — no vignette, no grain,
          no specular bloom, so the footage stays clean behind the copy. */}
      <div className="hero-seq__scrim" />
      {/* Opening title. aria-hidden because it repeats the brand name already
          carried by the header logo and the hero description — decorative
          here, so it must not add a duplicate landmark for screen readers. */}
      <div className="hero-seq__brand">
        <span className="hero-seq__brand-inner">
          <span className="hero-seq__brand-glow" />
          <span className="hero-seq__brand-rule" />
          <span className="hero-seq__brand-words">
            Prime<span className="hero-seq__brand-dot">.</span> Made
            <span className="hero-seq__brand-dot">.</span> Easy
            <span className="hero-seq__brand-dot">.</span>
          </span>
          <span className="hero-seq__brand-rule" />
        </span>
      </div>
      <style>{`
        .hero-seq{position:absolute; inset:0; overflow:hidden; background:#05070c;}
        .hero-seq__poster,
        .hero-seq__canvas{position:absolute; inset:0; width:100%; height:100%;
          object-fit:cover; object-position:center;}
        .hero-seq__canvas{opacity:0; transition:opacity .45s ease;}
        .hero-seq__canvas.is-ready{opacity:1;}
        .hero-seq__scrim{position:absolute; inset:0; pointer-events:none;
          background:linear-gradient(100deg, rgba(8,9,14,.90) 0%, rgba(8,9,14,.76) 38%,
            rgba(8,9,14,.34) 66%, rgba(8,9,14,.12) 88%);}
        /* Purely typographic — no plaque. Cream reads ~18:1 straight over the
           night footage, so the plate the green lockup needed would only be
           clutter here.
           padding-top guarantees clearance from the sticky nav, mirroring
           .hero-content's own padding-top for the same reason: with only
           flex-centering and no reserved top space, a short (content-driven,
           not min-height-forced) mobile hero centers this close enough to the
           nav to sit nearly underneath it — not just during the scroll-out,
           but at rest, before any scroll happens at all.
           padding-bottom (smaller than padding-top) still biases the block
           toward the lower-center, over the darker part of the footage, and
           lifts it clear of the lit hotel facade mid-frame — GSAP owns this
           element's transform, so this stays padding, never a transform.
           Starts hidden and is revealed only by the fade-in tween, so with
           reduced motion or no JS it never appears stranded over the copy. */
        .hero-seq__brand{position:absolute; inset:0; display:flex;
          align-items:center; justify-content:center; pointer-events:none;
          opacity:0; text-align:center; padding:88px 24px 10%;}
        @media(min-width:1024px){ .hero-seq__brand{padding-top:104px;} }
        .hero-seq__brand-inner{position:relative; display:flex; flex-direction:column;
          align-items:center;}
        /* Feathered field, not a panel: the ellipse reaches full transparency
           well inside its own box, so the footage never shows an edge. This is
           what keeps the lit hotel facade from competing with the letterforms.
           No backdrop-filter — the canvas repaints on every scrubbed frame and
           re-blurring the backdrop each time is where scroll stutter comes from.
           The glow is absolute and first in DOM; the rules and words are
           position:relative, so paint order puts them above it without
           resorting to a negative z-index. */
        .hero-seq__brand-glow{position:absolute; left:50%; top:50%;
          translate:-50% -50%; width:min(66rem, 200%); aspect-ratio:5 / 2;
          pointer-events:none;
          background:radial-gradient(ellipse at center,
            rgba(3,5,9,.74) 0%, rgba(3,5,9,.52) 36%, rgba(3,5,9,.24) 56%,
            rgba(3,5,9,.07) 68%, rgba(3,5,9,0) 76%);}
        .hero-seq__brand-rule{position:relative; width:clamp(52px, 7vw, 92px); height:1px;
          background:linear-gradient(90deg, transparent, rgba(199,154,68,.9), transparent);}
        .hero-seq__brand-words{position:relative; font-family:var(--display); font-weight:400;
          color:var(--bg); font-size:clamp(2.25rem, 7.2vw, 5.25rem);
          line-height:1.05; letter-spacing:.005em;
          margin:clamp(20px, 2.8vw, 34px) 0;
          text-shadow:0 2px 28px rgba(0,0,0,.55);}
        .hero-seq__brand-dot{color:var(--accent);}
        /* Clip box for the headline rise. Padding/margin pair keeps descenders
           from being shaved by the overflow. */
        .hero-seq__line{display:block; overflow:hidden;
          padding-bottom:.12em; margin-bottom:-.12em;}
        .hero-seq__line-inner{display:block;}
        @media (prefers-reduced-motion: reduce){
          .hero-seq__canvas{transition:none;}
        }
      `}</style>
    </div>
  );
}
