import { motion as Motion, useReducedMotion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import "./about.css";

const ease = [0.22, 1, 0.36, 1];

export default function About() {
  const reduceMotion = useReducedMotion();
  const reveal = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
  };

  return (
    <Motion.section id="dp-about" className="pa-section pv-shell" aria-labelledby="dp-about-title"
      initial={reduceMotion ? false : "hidden"} whileInView="visible" viewport={{ once: true, amount: 0.15 }}
      variants={{ visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.1 } } }}>
      <div className="pa-identity">
        <Motion.span className="pa-eyebrow" variants={reveal}>02 / About me</Motion.span>
        <Motion.p className="pa-name" variants={reveal}>Ahmad Abbani<span>.</span></Motion.p>
        <Motion.div className="pa-role" variants={reveal}>
          <p>Full-Stack Developer</p>
          <span>Web applications, ecommerce,<br />automation &amp; data analytics.</span>
        </Motion.div>
      </div>

      <div className="pa-copy">
        <Motion.h2 id="dp-about-title" variants={reveal}>How I work<span>.</span></Motion.h2>
        <Motion.p variants={reveal}>I work on both the frontend and backend, from the first layout to the database, APIs, and deployment, turning business requirements into practical applications. I use Git and branches to manage code changes, and manually test websites and APIs to check functionality. I focus on clear interfaces and applications that are straightforward to manage and extend.</Motion.p>
        <Motion.p variants={reveal}>My ecommerce work includes custom Shopify and WordPress development, payment and shipping setup, integrations, and store automation. I also work with databases and analytics to build dashboards and turn data into information that supports business decisions. I help with application maintenance, computer setup, software installation, and troubleshooting common technical issues.</Motion.p>
        <Motion.a className="pa-profile-link" href="https://github.com/ahmadabbani" target="_blank" rel="noreferrer" variants={reveal}>Find me on GitHub <FiArrowUpRight aria-hidden="true" /><span className="dp-sr-only"> (opens in a new tab)</span></Motion.a>
      </div>
    </Motion.section>
  );
}
