"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";
import { trackEvent } from "../lib/analytics";
import { isSoftNavAnchor, onPrepareClientNav, prepareClientNav } from "../lib/prepareClientNav";

/**
 * Global scroll/entrance choreography for the site — ported from the original
 * static build. Re-binds on App Router pathname changes, and restores any
 * GSAP DOM mutations (pin spacers, SplitText wrappers) synchronously before
 * soft navigations so React never removeChild's a node that was reparented.
 */
export default function SiteAnimations() {
  const pathname = usePathname();

  // The nav's scrolled state is owned by <Header> itself, in React state.
  // It used to be toggled onto #nav from here with classList, which fought
  // Header's own rendering: that component rewrites className wholesale on
  // every render, so any render triggered while scrolled (opening the mobile
  // menu, most visibly) stripped the class straight back off.

  // ---- Lifetime listeners: analytics, soft-nav prep ----
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    function onContactLinkClick(e: MouseEvent) {
      const link = (e.target as HTMLElement)?.closest("a[href]") as HTMLAnchorElement | null;
      if (!link) return;

      if (link.href.startsWith("tel:")) {
        trackEvent("click_to_call", { phone_number: link.href.replace("tel:", "") });
      } else if (link.href.startsWith("mailto:")) {
        trackEvent("click_to_email", { email_address: link.href.replace("mailto:", "") });
      }
    }
    document.addEventListener("click", onContactLinkClick);

    function onSoftNavClick(e: MouseEvent) {
      const anchor = (e.target as Element | null)?.closest?.("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (!isSoftNavAnchor(anchor, e)) return;
      prepareClientNav();
    }
    document.addEventListener("click", onSoftNavClick, true);

    return () => {
      document.removeEventListener("click", onContactLinkClick);
      document.removeEventListener("click", onSoftNavClick, true);
    };
  }, []);

  // Reset scroll after route change (Lenis/pins can leave scroll mid-page).
  // Header re-syncs its own scrolled state off the scroll events these fire.
  useEffect(() => {
    window.scrollTo(0, 0);
    const id = requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  // Re-bind contact form when the route changes (homepage / contact pages).
  useEffect(() => {
    const form = document.getElementById("contact-form") as HTMLFormElement | null;
    if (!form) return;

    async function onSubmit(e: Event) {
      e.preventDefault();
      if (!form) return;

      const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement | null;
      const errorEl = form.querySelector(".form-error") as HTMLElement | null;
      if (errorEl) errorEl.textContent = "";
      if (submitBtn) submitBtn.disabled = true;

      const data = new FormData(form);
      const payload = {
        name: String(data.get("name") ?? ""),
        email: String(data.get("email") ?? ""),
        service: String(data.get("service") ?? ""),
        message: String(data.get("message") ?? ""),
      };

      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const body = await res.json().catch(() => ({}) as { error?: string });
          throw new Error(body.error || "Failed to send message");
        }

        trackEvent("generate_lead", { form_id: "contact-form", service: payload.service || undefined });

        const wrap = form.parentNode as HTMLElement | null;
        if (wrap) {
          wrap.innerHTML =
            '<div class="thanks"><h3>Request received.</h3><p>A consultant will reach out within one business day. Thank you for getting in touch with Bizpoint Prime.</p></div>';
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
        trackEvent("contact_form_error", { form_id: "contact-form", message });
        if (errorEl) errorEl.textContent = message;
        if (submitBtn) submitBtn.disabled = false;
      }
    }

    form.addEventListener("submit", onSubmit);
    return () => form.removeEventListener("submit", onSubmit);
  }, [pathname]);

  // ---- Per-route motion ----
  useEffect(() => {
    // ASSUMPTION: prefers-reduced-motion is read once per route rather than
    // tracked live, matching the original build.
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let lenis: Lenis | null = null;
    let ctx: gsap.Context | null = null;
    let manifestoSplit: SplitText | null = null;
    let tickerCallback: ((time: number) => void) | null = null;
    let onWindowLoadBatches: (() => void) | null = null;
    const onWindowLoadRefresh = () => ScrollTrigger.refresh();

    function teardownSplit() {
      manifestoSplit?.revert();
      manifestoSplit = null;
    }

    const stopPrepare = onPrepareClientNav(teardownSplit);

    if (!reduceMotion) {
      gsap.registerPlugin(ScrollTrigger, SplitText);
      ScrollTrigger.config({ ignoreMobileResize: true });

      const EASE_OUT = "power3.out";
      const EASE_INOUT = "power2.inOut";
      const EASE_FOLLOW = "power3.out";
      const DUR = { micro: 0.2, standard: 0.6, statement: 0.9 };
      const STAGGER = { min: 0.06, max: 0.09 };
      const REVEAL_Y = 32;

      ctx = gsap.context(() => {
        // ---- LENIS ----
        lenis = new Lenis({ duration: 1.1, smoothWheel: true });
        lenis.scrollTo(0, { immediate: true });
        lenis.on("scroll", ScrollTrigger.update);
        tickerCallback = (time: number) => lenis?.raf(time * 1000);
        gsap.ticker.add(tickerCallback);
        gsap.ticker.lagSmoothing(0);

        // ---- HERO ----
        // The hero's entrance is owned entirely by <HeroSequence>: it pins the
        // section, scrubs the canvas flight-in, and stages the copy against
        // that same scroll. Nothing here may animate hero content, or the two
        // would fight over the same transforms.
        gsap.from("#nav", { opacity: 0, y: -8, duration: DUR.micro, ease: EASE_OUT });

        // ---- MANIFESTO ----
        let manifestoTrigger: gsap.core.Tween | null = null;
        if (document.querySelector(".manifesto")) {
          manifestoSplit = SplitText.create(".manifesto p", {
            type: "words",
            autoSplit: true,
            onSplit: (self) => {
              if (manifestoTrigger) manifestoTrigger.scrollTrigger?.kill();
              gsap.set(self.words, { opacity: 0.15 });
              manifestoTrigger = gsap.to(self.words, {
                opacity: 1,
                ease: "none",
                stagger: { each: 0.02 },
                scrollTrigger: {
                  trigger: ".manifesto",
                  start: "top 75%",
                  end: "bottom 60%",
                  scrub: 1,
                },
              });
            },
          });
        }

        // ---- GLOBAL REVEALS ----
        const revealEls = gsap.utils.toArray<HTMLElement>(".reveal");
        gsap.set(revealEls, { opacity: 0, y: REVEAL_Y });

        const faqItems = gsap.utils.toArray<HTMLElement>(".faq-item");
        gsap.set(faqItems, { opacity: 0, y: -REVEAL_Y });

        function wireOnceBatches() {
          ScrollTrigger.batch(revealEls, {
            start: "top 87%",
            once: true,
            onEnter: (batch) =>
              gsap.to(batch, { opacity: 1, y: 0, duration: DUR.standard, ease: EASE_OUT, stagger: STAGGER.max }),
          });
          ScrollTrigger.batch(faqItems, {
            start: "top 87%",
            once: true,
            onEnter: (batch) =>
              gsap.to(batch, { opacity: 1, y: 0, duration: DUR.standard, ease: EASE_OUT, stagger: STAGGER.max }),
          });
        }
        if (document.readyState === "complete") {
          wireOnceBatches();
        } else {
          onWindowLoadBatches = wireOnceBatches;
          window.addEventListener("load", onWindowLoadBatches);
        }

        // ---- SHOWCASE ----
        if (document.querySelector(".showcase")) {
          gsap.fromTo(
            "#showcase-bg",
            { yPercent: -9, scale: 1.18 },
            {
              yPercent: 9,
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: ".showcase",
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
                onToggle: (self) => gsap.set("#showcase-bg", { willChange: self.isActive ? "transform" : "auto" }),
              },
            }
          );

          const capInner = document.querySelector(".showcase .cap .inner");
          if (capInner) {
            const capCurtain = document.createElement("div");
            capCurtain.className = "wipe-overlay wipe-overlay--caption";
            capCurtain.setAttribute("aria-hidden", "true");
            capInner.appendChild(capCurtain);
            gsap.fromTo(
              capCurtain,
              { scaleY: 1 },
              {
                scaleY: 0,
                duration: DUR.statement,
                ease: EASE_OUT,
                transformOrigin: "bottom",
                scrollTrigger: { trigger: ".showcase", start: "top 70%", toggleActions: "play none none none" },
                onComplete: () => capCurtain.remove(),
              }
            );
          }
        }

        // ---- STATS ----
        gsap.utils.toArray<HTMLElement>(".stat").forEach((stat) => {
          const numEl = stat.querySelector<HTMLElement>(".num");
          if (!numEl) return;
          const target = parseInt(numEl.getAttribute("data-count") || "0", 10);
          const suffix = numEl.getAttribute("data-suffix") || "";
          const proxy = { val: 0 };
          gsap.to(proxy, {
            val: target,
            ease: "none",
            onUpdate: () => {
              numEl.textContent = Math.round(proxy.val) + suffix;
            },
            scrollTrigger: { trigger: stat, start: "top 85%", end: "top 40%", scrub: 1 },
          });
        });

        // ---- MARQUEE ----
        const marqueeTrack = document.querySelector(".marquee-track");
        if (marqueeTrack) {
          const marqueeTween = gsap.to(marqueeTrack, { xPercent: -50, duration: 45, ease: "none", repeat: -1 });
          const skewTo = gsap.quickTo(marqueeTrack, "skewX", { duration: 0.5, ease: EASE_FOLLOW });
          ScrollTrigger.create({
            trigger: ".marquee",
            start: "top bottom",
            end: "bottom top",
            onUpdate: (self) => {
              const v = gsap.utils.clamp(-1.5, 1.5, self.getVelocity() / -1000);
              marqueeTween.timeScale(1 + v * 0.6);
              skewTo(gsap.utils.clamp(-6, 6, v * 6));
            },
            onLeave: () => {
              marqueeTween.timeScale(1);
              skewTo(0);
            },
            onLeaveBack: () => {
              marqueeTween.timeScale(1);
              skewTo(0);
            },
          });
        }

        // ---- DESKTOP-ONLY LAYER ----
        const mm = gsap.matchMedia();
        mm.add("(min-width: 1024px) and (hover: hover) and (pointer: fine)", () => {
          if (document.getElementById("svc-intro")) {
            const svcTl = gsap.timeline({
              scrollTrigger: {
                trigger: "#svc-intro",
                start: "top 80%",
                end: "top 30%",
                scrub: 1,
                onToggle: (self) =>
                  gsap.set(["#svc-left", "#svc-right"], { willChange: self.isActive ? "transform" : "auto" }),
              },
            });
            svcTl
              .fromTo("#svc-left", { xPercent: -42, opacity: 0 }, { xPercent: 0, opacity: 1, ease: "none" }, 0)
              .fromTo("#svc-right", { xPercent: 42, opacity: 0 }, { xPercent: 0, opacity: 1, ease: "none" }, 0);
          }

          const magnetHandlers = gsap.utils.toArray<HTMLElement>(".btn").map((btn) => {
            const qx = gsap.quickTo(btn, "x", { duration: 0.4, ease: EASE_FOLLOW });
            const qy = gsap.quickTo(btn, "y", { duration: 0.4, ease: EASE_FOLLOW });
            function move(e: MouseEvent) {
              const r = btn.getBoundingClientRect();
              qx((e.clientX - r.left - r.width / 2) * 0.35);
              qy((e.clientY - r.top - r.height / 2) * 0.35);
            }
            function leave() {
              qx(0);
              qy(0);
            }
            btn.addEventListener("mousemove", move);
            btn.addEventListener("mouseleave", leave);
            return { btn, move, leave };
          });

          const cursor = document.getElementById("cursor");
          const cursorSpan = cursor?.querySelector("span") ?? null;
          const cursorTargets = gsap.utils.toArray<HTMLElement>(".card, .tile");
          let cursorMove: ((e: MouseEvent) => void) | null = null;
          function cursorEnter() {
            gsap.to(cursor, { scale: 1, duration: DUR.micro, ease: EASE_INOUT });
            gsap.to(cursorSpan, { opacity: 1, duration: DUR.micro, ease: EASE_INOUT });
          }
          function cursorLeave() {
            gsap.to(cursor, { scale: 0.14, duration: DUR.micro, ease: EASE_INOUT });
            gsap.to(cursorSpan, { opacity: 0, duration: DUR.micro, ease: EASE_INOUT });
          }
          if (cursor) {
            document.body.classList.add("has-custom-cursor");
            gsap.set(cursor, { scale: 0.14, opacity: 1 });
            const cx = gsap.quickTo(cursor, "x", { duration: 0.2, ease: EASE_FOLLOW });
            const cy = gsap.quickTo(cursor, "y", { duration: 0.2, ease: EASE_FOLLOW });
            cursorMove = (e: MouseEvent) => {
              cx(e.clientX);
              cy(e.clientY);
            };
            window.addEventListener("mousemove", cursorMove);
            cursorTargets.forEach((el) => {
              el.addEventListener("mouseenter", cursorEnter);
              el.addEventListener("mouseleave", cursorLeave);
            });
          }

          return function cleanup() {
            magnetHandlers.forEach((h) => {
              h.btn.removeEventListener("mousemove", h.move);
              h.btn.removeEventListener("mouseleave", h.leave);
              gsap.set(h.btn, { clearProps: "transform" });
            });
            if (cursorMove) {
              window.removeEventListener("mousemove", cursorMove);
              document.body.classList.remove("has-custom-cursor");
              gsap.set(cursor, { opacity: 0 });
              cursorTargets.forEach((el) => {
                el.removeEventListener("mouseenter", cursorEnter);
                el.removeEventListener("mouseleave", cursorLeave);
              });
            }
          };
        });
      });

      window.addEventListener("load", onWindowLoadRefresh);
      // Soft nav lands with images/fonts already warm — refresh after paint.
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }

    return () => {
      stopPrepare();
      if (onWindowLoadBatches) window.removeEventListener("load", onWindowLoadBatches);
      window.removeEventListener("load", onWindowLoadRefresh);
      teardownSplit();
      if (tickerCallback) gsap.ticker.remove(tickerCallback);
      lenis?.destroy();
      ctx?.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [pathname]);

  return null;
}
