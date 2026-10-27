import { useLayoutEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useLocation } from "react-router-dom";
import { useReducedMotion } from "framer-motion";
import "./transition.css";

const portfolioPath = path => /^\/(?:projects\/?)?$/.test(path);
const normalize = path => path.replace(/\/$/, "");
const ease = "cubic-bezier(.65, 0, .22, 1)";

// Delay rendering the destination until its viewport transition is ready. All
// router navigation (including Back/Forward and hash destinations) uses this path.
export default function PageTransition({ children }) {
  const location = useLocation();
  const reduceMotion = useReducedMotion();
  const [displayed, setDisplayed] = useState(location);
  const displayedRef = useRef(location);
  const curtainRef = useRef(null);

  useLayoutEffect(() => {
    const curtain = curtainRef.current;
    const outgoing = displayedRef.current;
    const root = document.documentElement;
    const surface = document.querySelector(".portfolio");
    const shouldAnimate = !reduceMotion && !window.matchMedia("(prefers-reduced-motion: reduce)").matches
      && portfolioPath(outgoing.pathname) && portfolioPath(location.pathname)
      && normalize(outgoing.pathname) !== normalize(location.pathname);
    let cancelled = false;
    let viewTransition;
    const animations = [];
    const frames = new Set();
    const oldRootOverflow = root.style.overflow;
    const oldRestoration = window.history.scrollRestoration;
    const oldOrigin = surface?.style.transformOrigin;
    const nextFrame = () => new Promise(resolve => {
      const id = requestAnimationFrame(() => { frames.delete(id); resolve(); });
      frames.add(id);
    });
    const swap = () => {
      displayedRef.current = location;
      setDisplayed(location);
    };
    const focusDestination = () => {
      const target = document.getElementById(location.hash.slice(1) || "dp-main");
      if (!target) return;
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    };
    const unlock = () => {
      if (surface) {
        surface.inert = false;
        surface.removeAttribute("aria-busy");
        surface.style.transformOrigin = oldOrigin;
      }
      root.style.overflow = oldRootOverflow;
      window.history.scrollRestoration = oldRestoration;
      delete root.dataset.portfolioTransition;
      delete root.dataset.portfolioFallback;
      delete curtain.dataset.active;
    };
    const play = (element, keyframes, options) => {
      const animation = element.animate(keyframes, { fill: "both", easing: ease, ...options });
      animations.push(animation);
      return animation.finished;
    };

    async function transition() {
      if (!shouldAnimate) {
        swap();
        if (portfolioPath(location.pathname) && outgoing.pathname !== location.pathname) {
          await nextFrame();
          if (!cancelled) focusDestination();
        }
        return;
      }
      const direction = normalize(location.pathname) === "" ? -1 : 1;
      root.dataset.portfolioTransition = direction === 1 ? "projects" : "home";
      curtain.dataset.active = "true";
      surface.inert = true;
      surface.setAttribute("aria-busy", "true");
      root.style.overflow = "hidden";
      window.history.scrollRestoration = "manual";
      try {
        if (document.startViewTransition) {
          // The browser captures just the two visible viewports. No cloned DOM,
          // canvas rendering, third-party transition engine, or image downloads.
          viewTransition = document.startViewTransition(() => {
            if (cancelled) return;
            flushSync(swap);
          });
          // Resizing or hiding the tab can skip the visual effect; navigation
          // still commits and the finished promise performs normal cleanup.
          viewTransition.ready.catch(() => {});
          await viewTransition.finished;
        } else {
          // The same depth movement on the real page for browsers without snapshots.
          root.dataset.portfolioFallback = "true";
          surface.style.transformOrigin = `50% ${window.scrollY + window.innerHeight / 2}px`;
          await play(surface, [
            { transform: "perspective(1800px) translateX(0) rotateY(0) scale(1)", opacity: 1 },
            { transform: `perspective(1800px) translateX(${-8 * direction}%) rotateY(${12 * direction}deg) scale(.88)`, opacity: 1, offset: .35 },
            { transform: `perspective(1800px) translateX(${-110 * direction}%) rotateY(${65 * direction}deg) scale(.78)`, opacity: 0 },
          ], { duration: 620 });
          if (cancelled) return;
          swap();
          await nextFrame();
          await nextFrame();
          if (cancelled) return;
          surface.style.transformOrigin = `50% ${window.scrollY + window.innerHeight / 2}px`;
          await play(surface, [
            { transform: `perspective(1800px) translateX(${105 * direction}%) rotateY(${-60 * direction}deg) scale(.8)`, opacity: 0 },
            { transform: `perspective(1800px) translateX(${12 * direction}%) rotateY(${-12 * direction}deg) scale(.92)`, opacity: 1, offset: .6 },
            { transform: "perspective(1800px) translateX(0) rotateY(0) scale(1)", opacity: 1 },
          ], { duration: 680 });
        }
        if (cancelled) return;
        animations.forEach(animation => animation.cancel());
        unlock();
        focusDestination();
      } catch (error) {
        if (!cancelled) {
          swap();
          animations.forEach(animation => animation.cancel());
          unlock();
          if (error.name !== "AbortError") console.error("Page transition:", error);
        }
      }
    }
    void transition();
    return () => {
      cancelled = true;
      viewTransition?.skipTransition();
      frames.forEach(cancelAnimationFrame);
      animations.forEach(animation => animation.cancel());
      if (shouldAnimate) unlock();
    };
  }, [location, reduceMotion]);

  return <>
    {children(displayed)}
    <div ref={curtainRef} className="pt-curtain" aria-hidden="true" />
  </>;
}
