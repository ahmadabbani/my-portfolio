import { motion as Motion, useReducedMotion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import "./contact.css";

const ease = [0.22, 1, 0.36, 1];

export default function Contact({ eyebrow = "05 / Contact" }) {
  const reduceMotion = useReducedMotion();
  const reveal = { initial: reduceMotion ? false : { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.8, ease } };

  return (
    <section id="dp-contact" className="pc-section pv-shell" aria-labelledby="pc-title">
      <Motion.div className="pc-top" {...reveal}>
        <span className="pc-eyebrow">{eyebrow}</span>
        <p>Tell me what you’re working on, what you need, and when you’d like to start.</p>
      </Motion.div>

      <Motion.h2 id="pc-title" {...reveal}>Have a project <span>in mind?</span></Motion.h2>

      <Motion.a className="pc-email" href="mailto:ahmddabbanii@gmail.com" {...reveal}>
        <span className="pc-email-label">Email me</span>
        <span className="pc-email-address">ahmddabbanii@gmail.com</span>
        <span className="pc-email-arrow" aria-hidden="true"><FiArrowUpRight /></span>
      </Motion.a>

      <Motion.div className="pc-bottom" {...reveal}>
        <span>Prefer WhatsApp?</span>
        <a href="https://wa.me/96176585971" target="_blank" rel="noreferrer">Send me a message <FiArrowUpRight aria-hidden="true" /><span className="dp-sr-only"> (opens in a new tab)</span></a>
      </Motion.div>
    </section>
  );
}
