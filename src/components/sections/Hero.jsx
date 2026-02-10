import React from "react";
import { motion } from "framer-motion";
import {
  FaLinkedinIn,
  FaGithub,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 50, opacity: 0, filter: "blur(10px)" },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    // FIXED EASING HERE
    transition: { duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] },
  },
};

const Hero = () => {
  return (
    <section className="hero-section">
      {/* 1. Creative Gradient Background (Ambient Glow) */}
      <div className="hero-bg-glow"></div>

      <motion.div
        className="hero-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* 2. Massive Identity Section */}
        <div className="hero-content">
          <motion.div variants={itemVariants}>
            <span className="hero-subtitle">Hello, I am</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="hero-name">
            Ahmad <span className="hero-lname">Abbani</span>
          </motion.h1>

          <motion.h2 variants={itemVariants} className="hero-role">
            Full-Stack Developer <br />
            <span className="highlight-text">Automation & Data Solutions</span>
          </motion.h2>
        </div>

        {/* 3. "Glass Widget" Contact Card */}
        <motion.div variants={itemVariants} className="hero-widget glass-panel">
          <div className="widget-header">
            <h3>Contact</h3>
            <div className="status-indicator">
              <span className="pulse-dot"></span> Available
            </div>
          </div>

          <div className="widget-body">
            <div className="info-group">
              <label>Phone</label>
              <a
                href="https://wa.me/96176585971"
                className="info-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                +961 76 585 971
              </a>
            </div>

            <div className="info-group">
              <label>Email</label>
              <a href="mailto:ahmdabbanyy@gmail.com" className="info-link">
                ahmdabbanyy@gmail.com
              </a>
            </div>

            <div className="info-group">
              <label>Address</label>
              <p>Beirut, Lebanon</p>
            </div>
          </div>

          <div className="widget-footer">
            <div className="social-row">
              <a
                href="https://www.linkedin.com/in/ahmad-abbany-992660258"
                className="social-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://github.com/ahmadabbani"
                className="social-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.instagram.com/ahmddabb/"
                className="social-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
              <a
                href="https://wa.me/96176585971"
                className="social-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
