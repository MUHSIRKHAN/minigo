import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * ScrollTrigger pin + SplitText/reparent mutations change the DOM shape React
 * expects. Soft navigations then throw NotFoundError on removeChild because
 * useEffect cleanups run after the commit that tears the page down.
 *
 * Call this synchronously on internal link clicks (capture phase) so pinned
 * nodes and split wrappers are restored before Next.js commits the route.
 */

type PrepFn = () => void;

const prepFns = new Set<PrepFn>();
let pluginReady = false;

function ensureScrollTrigger() {
  if (pluginReady) return;
  gsap.registerPlugin(ScrollTrigger);
  pluginReady = true;
}

export function onPrepareClientNav(fn: PrepFn): () => void {
  prepFns.add(fn);
  return () => {
    prepFns.delete(fn);
  };
}

export function prepareClientNav(): void {
  ensureScrollTrigger();

  prepFns.forEach((fn) => {
    try {
      fn();
    } catch {
      // Best-effort: never block navigation if a tween is already gone.
    }
  });

  ScrollTrigger.getAll().forEach((t) => {
    try {
      t.kill();
    } catch {
      /* ignore */
    }
  });

  // Deliberately NO scroll reset here. This runs synchronously on the click,
  // while the page being navigated away from is still the one on screen — so
  // resetting scroll now snapped that outgoing page back to its own top and
  // parked it there for the entire route transition (~900ms measured on a
  // cold route), which read as "the hero of the page I'm leaving flashes up
  // before the new page arrives".
  // The incoming route resets its own scroll when it mounts (SiteAnimations'
  // pathname effect, plus the App Router's own scroll-to-top), which achieves
  // the same thing at the only moment it isn't visible to the user.
}

/** True when this anchor will trigger a same-origin App Router soft navigation. */
export function isSoftNavAnchor(anchor: HTMLAnchorElement, event: MouseEvent): boolean {
  if (event.defaultPrevented || event.button !== 0) return false;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return false;
  if (anchor.target && anchor.target !== "_self") return false;
  if (anchor.hasAttribute("download")) return false;

  const href = anchor.getAttribute("href");
  if (!href || href.startsWith("#")) return false;

  let url: URL;
  try {
    url = new URL(href, window.location.href);
  } catch {
    return false;
  }

  if (url.origin !== window.location.origin) return false;
  if (url.pathname === window.location.pathname && url.search === window.location.search) {
    return false;
  }

  return true;
}
