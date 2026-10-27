import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { animate, motion as Motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import "./showcase.css";

const ease = [0.22, 1, 0.36, 1];

function DataPlate({ spread }) {
  return <div className="ps-plate-content ps-data-content">
    <div className="ps-plate-label"><span>01 / Data</span><span className="ps-plate-dot" /></div>
    <div className="ps-data-graphic"><svg viewBox="0 0 600 200" fill="none" aria-hidden="true"><path className="ps-chart-guide" d="M0 40H600M0 100H600M0 160H600M80 0V200M200 0V200M320 0V200M440 0V200M560 0V200" /><Motion.path className="ps-chart-line" style={{ pathLength: spread }} d="M0 155L55 155L100 100L155 122L220 48L270 78L330 28L385 100L440 65L485 95L540 28L600 42" /><circle cx="330" cy="28" r="6" /><circle cx="540" cy="28" r="6" /></svg></div>
    <div className="ps-data-bottom"><span /><span /><span /><span /><span /><span /><span /><span /></div>
  </div>;
}

function LogicPlate() {
  return <div className="ps-plate-content ps-logic-content">
    <div className="ps-plate-label"><span>02 / Logic</span><span className="ps-plate-dot" /></div>
    <svg className="ps-logic-graphic" viewBox="0 0 600 260" fill="none" aria-hidden="true"><path className="ps-circuit-muted" d="M30 65H140V130H250M30 195H140V130M350 130H460V65H570M460 130V195H570" /><path className="ps-circuit-live" d="M30 65H140V130H250M350 130H460V195H570" /><rect x="250" y="88" width="100" height="84" rx="4" /><path d="M282 118L270 130L282 142M318 118L330 130L318 142M305 112L295 148" /><circle cx="30" cy="65" r="7" /><circle cx="30" cy="195" r="7" /><circle cx="570" cy="65" r="7" /><circle cx="570" cy="195" r="7" /></svg>
  </div>;
}

function LayoutPlate() {
  return <div className="ps-plate-content ps-layout-content">
    <div className="ps-plate-label"><span>03 / Layout</span><span className="ps-plate-dot" /></div>
    <div className="ps-wireframe"><div className="ps-wire-nav"><i /><span /><span /><span /></div><div className="ps-wire-grid"><div className="ps-wire-heading"><i /><i /><span /></div><div className="ps-wire-art"><span /><span /></div></div><div className="ps-wire-footer"><span /><span /><span /></div></div>
  </div>;
}

function ExperiencePlate() {
  return <div className="ps-plate-content ps-experience-content">
    <div className="ps-plate-label"><span>04 / Experience</span><span>Ahmad Abbani</span></div>
    <div className="ps-work-type">WORK<span className="ps-work-arrow"><FiArrowUpRight /></span></div>
    <div className="ps-experience-bottom"><span>Websites / Stores / Applications</span><span>View projects <FiArrowUpRight /></span></div>
  </div>;
}

function InterfacePlate({ index, spread, children, className, label }) {
  const offset = 1.5 - index;
  const x = useTransform(spread, value => `calc(${offset * 0.6 * (1 - value)}% + var(--ps-open-x) * ${offset * value})`);
  const y = useTransform(spread, value => `calc(${offset * 0.7 * (1 - value)}% + var(--ps-open-y) * ${offset * value})`);
  const z = useTransform(spread, [0, 1], [`${index * 0.16}vw`, `${index * 2.5}vw`]);
  const rotateZ = useTransform(spread, [0, 1], [0, (index - 1.5) * 2.5]);
  const opacity = useTransform(spread, [0, 0.18, 1], [index === 3 ? 1 : 0.25, 1, 1]);
  return <Motion.div className={`ps-plate ${className}`} style={{ x, y, z, rotateZ, opacity }}>{children}{label && <span className="ps-layer-tab">{label}</span>}<span className="ps-plate-edge" /></Motion.div>;
}

export default function Showcase() {
  const cardsRef = useRef(null);
  const dragRef = useRef(null);
  const entranceRef = useRef(null);
  const hasInteracted = useRef(false);
  const inView = useInView(cardsRef, { amount: 0.5, once: true });
  const reduceMotion = useReducedMotion();
  const [amount, setAmount] = useState(100);
  const [dragging, setDragging] = useState(false);
  const expansion = useMotionValue(0);
  const smoothExpansion = useSpring(expansion, { stiffness: 82, damping: 23, mass: 0.9 });
  const spread = reduceMotion ? expansion : smoothExpansion;
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 110, damping: 25 });
  const springY = useSpring(pointerY, { stiffness: 110, damping: 25 });
  const rotateX = useTransform(springY, value => `calc(var(--ps-tilt-x) - ${value * 6}deg)`);
  const rotateY = useTransform(springX, [-1, 1], [-16, 2]);
  const rotateZ = useTransform(springX, value => `calc(var(--ps-tilt-z) + ${value * 3.5}deg)`);
  const sceneScale = useTransform(spread, [0, 1], [0.96, 0.88]);

  useEffect(() => {
    if (!inView || hasInteracted.current) return;
    if (reduceMotion) { expansion.set(1); return; }
    entranceRef.current = animate(expansion, 1, { duration: 3.8, delay: 0.9, ease: [0.45, 0, 0.25, 1] });
    return () => entranceRef.current?.stop();
  }, [inView, reduceMotion, expansion]);

  const changeExpansion = (value) => {
    hasInteracted.current = true;
    entranceRef.current?.stop();
    const next = Math.max(0, Math.min(100, value));
    setAmount(Math.round(next));
    expansion.set(next / 100);
  };

  return (
    <section id="dp-showcase" className="ps-section pv-shell" aria-labelledby="ps-title">
      <Motion.div className="ps-section-top" initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }}>
        <div><span className="ps-eyebrow">04 / Projects</span><h2 id="ps-title">Explore the archive<span>.</span></h2></div>
        <Link className="ps-archive-link" to="/projects"><span>View projects</span><FiArrowUpRight aria-hidden="true" /></Link>
      </Motion.div>

      <div className="ps-exhibit">
        <div className="ps-stage" data-dragging={dragging} role="slider" tabIndex={0} aria-label="Project cards" aria-valuemin={0} aria-valuemax={100} aria-valuenow={amount} aria-valuetext={`${amount}% expanded`}
          onKeyDown={(event) => {
            const changes = { ArrowLeft: amount - 10, ArrowDown: amount - 10, ArrowRight: amount + 10, ArrowUp: amount + 10, Home: 0, End: 100 };
            if (!(event.key in changes)) return;
            event.preventDefault();
            changeExpansion(changes[event.key]);
          }}
          onPointerDown={(event) => {
            if (event.button !== 0 || !event.isPrimary) return;
            dragRef.current = { x: event.clientX, y: event.clientY, amount: expansion.get() * 100, active: false };
            if (event.pointerType === "mouse") event.currentTarget.setPointerCapture(event.pointerId);
          }}
          onPointerMove={(event) => {
            const bounds = event.currentTarget.getBoundingClientRect();
            if (!reduceMotion && event.pointerType === "mouse") {
              pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 2);
              pointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 2);
            }
            if (!dragRef.current) return;
            const distanceX = event.clientX - dragRef.current.x;
            const distanceY = event.clientY - dragRef.current.y;
            if (!dragRef.current.active && Math.abs(distanceX) > 7 && Math.abs(distanceX) > Math.abs(distanceY)) {
              dragRef.current.active = true;
              setDragging(true);
              event.currentTarget.setPointerCapture(event.pointerId);
            }
            if (dragRef.current.active) changeExpansion(dragRef.current.amount + distanceX / bounds.width * 150);
          }}
          onPointerUp={() => { dragRef.current = null; setDragging(false); }}
          onPointerCancel={() => { dragRef.current = null; setDragging(false); }}
          onLostPointerCapture={() => { dragRef.current = null; setDragging(false); }}
          onPointerLeave={() => { if (!dragRef.current) { pointerX.set(0); pointerY.set(0); } }}>
          <div className="ps-floor" aria-hidden="true"><span /><span /><span /></div>
          <span className="ps-stage-corner ps-corner-tl" aria-hidden="true" /><span className="ps-stage-corner ps-corner-br" aria-hidden="true" />
          <div ref={cardsRef} className="ps-scene-anchor" aria-hidden="true"><Motion.div className="ps-scene" style={{ rotateX: reduceMotion ? "var(--ps-tilt-x)" : rotateX, rotateY: reduceMotion ? -7 : rotateY, rotateZ: reduceMotion ? "var(--ps-tilt-z)" : rotateZ, scale: sceneScale }}>
            <InterfacePlate index={0} spread={spread} className="ps-data" label="01 / Data"><DataPlate spread={spread} /></InterfacePlate>
            <InterfacePlate index={1} spread={spread} className="ps-logic" label="02 / Logic"><LogicPlate /></InterfacePlate>
            <InterfacePlate index={2} spread={spread} className="ps-layout" label="03 / Layout"><LayoutPlate /></InterfacePlate>
            <InterfacePlate index={3} spread={spread} className="ps-experience"><ExperiencePlate /></InterfacePlate>
          </Motion.div></div>
        </div>
      </div>
      <div className="ps-section-bottom"><span>Websites / Ecommerce / Applications / Automation</span></div>
    </section>
  );
}
