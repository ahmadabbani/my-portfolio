import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { animate, motion as Motion, useMotionValue, useReducedMotion } from "framer-motion";

const duration = 3.82;
const mix = (from, to, progress) => from + (to - from) * progress;
const smooth = (progress) => progress * progress * (3 - 2 * progress);
const cubic = (a, b, c, d, t) => (1 - t) ** 3 * a + 3 * (1 - t) ** 2 * t * b + 3 * (1 - t) * t * t * c + t ** 3 * d;

// Positions use the bottom of the ball so every squash stays on its landing line.
function sample(time, geometry) {
  const { startX, launchX, outerX, railY, targetX, targetY, size, ratio } = geometry;
  const point = { x: startX, y: railY, sx: 1, sy: 1, opacity: 1 };

  if (time < 0.22) {
    const t = Math.max(0, time / 0.22);
    const scale = mix(0.15, 1, 1 - (1 - t) ** 3);
    return { ...point, sx: scale, sy: scale, opacity: Math.min(1, t * 4) };
  }
  if (time < 1.46) {
    const t = (time - 0.22) / 1.24;
    point.x = mix(startX, launchX, smooth(t));
    const lean = Math.sin(Math.PI * t) * 0.1;
    point.sx = 1 + lean;
    point.sy = 1 - lean;
  } else if (time < 2.4) {
    const t = (time - 1.46) / 0.94;
    point.x = cubic(launchX, outerX, outerX, targetX, t);
    point.y = cubic(railY, railY - size * 1.8, railY + (targetY - railY) * 0.15, targetY, t);
    point.sx = 1 - Math.sin(Math.PI * t) * 0.13;
    point.sy = 1 + Math.sin(Math.PI * t) * 0.2;
  } else if (time < 2.54) {
    const squash = Math.sin(Math.PI * (time - 2.4) / 0.14);
    Object.assign(point, { x: targetX, y: targetY, sx: 1 + squash * 0.4, sy: 1 - squash * 0.4 });
  } else if (time < 3.12) {
    const t = (time - 2.54) / 0.58;
    const arc = 4 * t * (1 - t);
    const scale = mix(1, 0.64, smooth(t));
    Object.assign(point, { x: targetX - arc * size * 0.18, y: targetY - arc * size * 1.6, sx: scale * (1 - arc * 0.08), sy: scale * (1 + arc * 0.1) });
  } else if (time < 3.24) {
    const squash = Math.sin(Math.PI * (time - 3.12) / 0.12);
    Object.assign(point, { x: targetX, y: targetY, sx: 0.64 * (1 + squash * 0.22), sy: 0.64 * (1 - squash * 0.22) });
  } else if (time < 3.56) {
    const t = (time - 3.24) / 0.32;
    const arc = 4 * t * (1 - t);
    const scale = mix(0.64, ratio, smooth(t));
    Object.assign(point, { x: targetX + arc * size * 0.05, y: targetY - arc * size * 0.34, sx: scale, sy: scale });
  } else {
    const t = Math.min(1, (time - 3.56) / 0.26);
    const settle = Math.sin(Math.PI * t) * (1 - t);
    Object.assign(point, { x: targetX, y: targetY, sx: ratio * (1 + settle * 0.18), sy: ratio * (1 - settle * 0.14) });
  }
  return point;
}

export default function HeroDot({ heroRef, periodRef, ready, onSettled }) {
  const reduceMotion = useReducedMotion();
  const [geometry, setGeometry] = useState(null);
  const [finished, setFinished] = useState(false);
  const completeRef = useRef(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scaleX = useMotionValue(0);
  const scaleY = useMotionValue(0);
  const opacity = useMotionValue(0);
  const trail = useMotionValue("");
  const impactOpacity = useMotionValue(0);
  const impactScale = useMotionValue(1);

  useEffect(() => {
    if (!ready || completeRef.current) return;
    let cancelled = false;
    let playback;
    let removeListeners = () => {};

    const finish = () => {
      if (cancelled || completeRef.current) return;
      completeRef.current = true;
      playback?.stop();
      removeListeners();
      onSettled(true);
      setFinished(true);
    };

    async function start() {
      if (reduceMotion) { finish(); return; }
      await document.fonts.ready;
      if (cancelled) return;
      const hero = heroRef.current;
      const period = periodRef.current;
      const divider = hero?.closest(".portfolio")?.querySelector(".pv-header-inner");
      if (!hero || !period || !divider || window.scrollY > hero.offsetTop) { finish(); return; }

      const bounds = hero.getBoundingClientRect();
      const line = divider.getBoundingClientRect();
      const dot = period.getBoundingClientRect();
      const size = Math.min(76, Math.max(16, dot.width * 2.4));
      const targetX = dot.left + dot.width / 2;
      const measured = {
        size,
        ratio: dot.width / size,
        startX: line.left + size * 0.55,
        launchX: targetX - size * 0.6,
        outerX: Math.min(bounds.right - size * 0.55, targetX + size * 2.7),
        railY: line.bottom - 0.5,
        targetX,
        targetY: dot.bottom,
      };
      setGeometry(measured);

      // Scrolling or changing the layout hands the point straight to the text.
      const initialScroll = window.scrollY;
      const handleScroll = () => { if (Math.abs(window.scrollY - initialScroll) > 8) finish(); };
      const handleVisibility = () => { if (document.hidden) finish(); };
      window.addEventListener("scroll", handleScroll, { passive: true });
      window.addEventListener("resize", finish);
      document.addEventListener("visibilitychange", handleVisibility);
      removeListeners = () => {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", finish);
        document.removeEventListener("visibilitychange", handleVisibility);
      };

      playback = animate(0, duration, {
        duration,
        ease: "linear",
        onUpdate: (time) => {
          const point = sample(time, measured);
          x.set(point.x);
          y.set(point.y);
          scaleX.set(point.sx);
          scaleY.set(point.sy);
          opacity.set(point.opacity);
          if (time > 0.24 && time < 2.4) {
            const points = Array.from({ length: 10 }, (_, index) => {
              const past = sample(Math.max(0.22, time - (9 - index) * 0.011), measured);
              return `${index ? "L" : "M"}${past.x},${past.y - size * past.sy / 2}`;
            });
            trail.set(points.join(" "));
          } else trail.set("");
          const impact = (time - 2.4) / 0.48;
          impactOpacity.set(impact > 0 && impact < 1 ? Math.sin(Math.PI * impact) * (1 - impact) * 0.35 : 0);
          impactScale.set(1 + Math.max(0, impact) * 1.4);
        },
        onComplete: finish,
      });
    }

    start();
    return () => { cancelled = true; playback?.stop(); removeListeners(); };
  }, [ready, reduceMotion, heroRef, periodRef, onSettled, x, y, scaleX, scaleY, opacity, trail, impactOpacity, impactScale]);

  if (!geometry || finished || reduceMotion) return null;
  return createPortal(<div className="pv-dot-stage" aria-hidden="true">
    <svg className="pv-dot-trail"><Motion.path d={trail} fill="none" stroke="currentColor" strokeWidth={Math.max(1.5, geometry.size * 0.07)} strokeLinecap="round" opacity="0.2" /></svg>
    <Motion.span className="pv-dot-impact" style={{ left: geometry.targetX - geometry.size * 0.7, top: geometry.targetY - geometry.size * 0.125, width: geometry.size * 1.4, height: geometry.size * 0.25, opacity: impactOpacity, scale: impactScale }} />
    <Motion.div className="pv-dot-flight" style={{ x, y, opacity }}>
      <Motion.span className="pv-dot-orb" style={{ width: geometry.size, height: geometry.size, left: -geometry.size / 2, scaleX, scaleY }} />
    </Motion.div>
  </div>, document.body);
}
