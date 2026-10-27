import { useRef, useState } from "react";
import { motion as Motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { FiArrowDown, FiArrowUpRight } from "react-icons/fi";
import HeroDot from "./HeroDot";
import "./intro.css";

const easing = [0.22, 1, 0.36, 1];

function MagneticLink({ children, className = "", ...props }) {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 240, damping: 22 });
  const springY = useSpring(y, { stiffness: 240, damping: 22 });

  return <Motion.a {...props} className={`pv-magnetic ${className}`} style={{ x: springX, y: springY }}
    onPointerMove={(event) => {
      if (reduceMotion || event.pointerType !== "mouse") return;
      const bounds = event.currentTarget.getBoundingClientRect();
      x.set((event.clientX - bounds.left - bounds.width / 2) * 0.12);
      y.set((event.clientY - bounds.top - bounds.height / 2) * 0.2);
    }}
    onPointerLeave={() => { x.set(0); y.set(0); }}
    onBlur={() => { x.set(0); y.set(0); }}>
    {children}
  </Motion.a>;
}

export default function Hero() {
  const heroRef = useRef(null);
  const periodRef = useRef(null);
  const [titleReady, setTitleReady] = useState(false);
  const [dotSettled, setDotSettled] = useState(false);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -65]);
  const sideY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const lineScale = useTransform(scrollYProgress, [0, 0.8], [0.14, 1]);
  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: reduceMotion ? 0 : delay, ease: easing },
  });

  return (
    <section ref={heroRef} className="pv-hero pv-shell" aria-labelledby="pv-hero-title">
      <Motion.div className="pv-hero-top" {...reveal(0.15)}>
        <span className="pv-intro-label">Web development, automation &amp; data</span>
        <span className="pv-hero-location"><span className="pv-location-cross" aria-hidden="true" />Beirut, Lebanon</span>
      </Motion.div>

      <div className="pv-hero-grid">
        <Motion.div className="pv-title-column" style={reduceMotion ? undefined : { y: titleY }}>
          <h1 id="pv-hero-title" className="pv-headline" aria-label="Web applications. Connected systems.">
            <span className="pv-title-mask" aria-hidden="true"><Motion.span initial={reduceMotion ? false : { y: "112%", rotate: 3 }} animate={{ y: "0%", rotate: 0 }} transition={{ duration: 1.05, delay: 0.2, ease: easing }}>Web applications.</Motion.span></span>
            <span className="pv-title-mask pv-headline-accent" aria-hidden="true"><Motion.span initial={reduceMotion ? false : { y: "112%", rotate: 3 }} animate={{ y: "0%", rotate: 0 }} transition={{ duration: 1.15, delay: 0.35, ease: easing }} onAnimationComplete={() => setTitleReady(true)}><em>Connected <span className="pv-systems-word">systems<span className="pv-period-slot"><span ref={periodRef} className="pv-period-dot" style={{ opacity: dotSettled || reduceMotion ? 1 : 0 }} /></span></span></em></Motion.span></span>
          </h1>
          <Motion.div className="pv-hero-actions" {...reveal(0.85)}>
            <MagneticLink href="#dp-work" className="pv-work-link"><span>Explore selected work</span><FiArrowDown aria-hidden="true" /></MagneticLink>
          </Motion.div>
        </Motion.div>

        <Motion.div className="pv-hero-details" style={reduceMotion ? undefined : { y: sideY }}>
          <Motion.div className="pv-intro-arrow" {...reveal(0.5)}><FiArrowUpRight aria-hidden="true" /></Motion.div>
          <Motion.p className="pv-hero-introduction" {...reveal(0.6)}>I'm Ahmad. I build web applications and online stores, from the interface to the systems behind them.</Motion.p>
          <Motion.p className="pv-hero-description" {...reveal(0.75)}>I connect APIs, automate business workflows, and use data analysis and interactive dashboards to uncover insights and support better decisions. My work spans frontend and backend development, data and business systems integration, cloud deployment, and application and IT support.</Motion.p>
          <Motion.div {...reveal(0.9)}><a href="mailto:ahmddabbanii@gmail.com" className="pv-quiet-link">Have a project in mind? <FiArrowUpRight aria-hidden="true" /></a></Motion.div>
        </Motion.div>
      </div>

      <Motion.div className="pv-hero-bottom" {...reveal(1.05)}>
        <div className="pv-availability"><span aria-hidden="true" />Available for projects</div>
        <span className="pv-build-note">Web applications / Ecommerce / Automation &amp; data</span>
        <a href="#dp-work" className="pv-scroll-link"><span>Scroll to explore</span><span className="pv-scroll-icon"><FiArrowDown aria-hidden="true" /></span></a>
        <div className="pv-bottom-line" aria-hidden="true"><Motion.span style={{ scaleX: reduceMotion ? 1 : lineScale }} /></div>
      </Motion.div>
      <HeroDot heroRef={heroRef} periodRef={periodRef} ready={titleReady} onSettled={setDotSettled} />
    </section>
  );
}
