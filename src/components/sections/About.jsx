import React from "react";
import { motion } from "framer-motion";

// Variants for the 3D spinning/sliding headline
const headlineVariants = {
  hidden: { y: 60, opacity: 0, rotateX: 5, transformOrigin: "bottom" },
  visible: {
    y: 0,
    opacity: 1,
    rotateX: 0,
    transition: {
      duration: 1,
      ease: [0.6, 0.05, 0.01, 0.9],
    },
  },
};

// Variants for the left/right slide-in columns
const columnVariants = (direction) => ({
  hidden: { x: direction === "left" ? -100 : 100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.9, ease: [0.2, 0.8, 0.4, 1] },
  },
});

const About = () => {
  return (
    <section id="about" className="about-section">
      <motion.div
        className="container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Massive Animated Headline */}
        <motion.h1 className="about-headline" variants={headlineVariants}>
          Overview
        </motion.h1>

        {/* Two-Column Body Content */}
        <div className="about-body">
          {/* Column 1: Text Content (Slides from Left) */}
          <motion.div
            className="about-text-column"
            variants={columnVariants("left")}
          >
            <p>
              I build complete web applications focused on creating modern,
              intuitive, and reliable digital experiences. My work covers
              frontend and backend development, including UI/UX design,
              application architecture, database management, API integrations,
              automation, and cloud deployment to deliver secure and
              high-performing solutions.
            </p>
            <p>
              I also specialize in eCommerce platforms (Shopify and WordPress),
              managing complete online stores through customization, payment
              and shipping setup, app and plugin integrations, email
              automation, SEO, performance optimization, and the tools needed
              to operate and grow online businesses.
            </p>
            <p>
              I have strong experience with databases, data sources, and
              analytics, creating dashboards, analyzing information, and using
              insights to improve applications and support better business
              decisions.
            </p>
          </motion.div>

          {/* Column 2: Core Value Glass Widget (Slides from Right) */}
          <motion.div
            className="about-widget-column"
            variants={columnVariants("right")}
          >
            <div className="about-widget glass-panel">
              <span className="widget-label">Core Value</span>
              <p className="widget-quote">
                Clean code, efficient architecture, and reliable systems are at
                the core of my work, ensuring applications remain scalable,
                maintainable, and ready for real-world use.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
