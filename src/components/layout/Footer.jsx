import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  FiGithub,
  FiLinkedin,
  FiInstagram,
  FiArrowRight,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

// Variants for sequential appearance of main sections
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2, // Delay between the main groups (Nav, Actions, Bottom)
      delayChildren: 0.3,
    },
  },
};

// Variants for individual link items and section containers
const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: i * 0.1,
    },
  }),
};

// Variants for staggering the Big Nav Links themselves (used for other sections if needed)
const linkContainerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};
const navLinks = [
  { name: "Home", href: "/#hero", sectionId: null },
  { name: "About", href: "/#about", sectionId: "#about" },
  { name: "Skills", href: "/#skills", sectionId: "#skills" },
  { name: "Projects", href: "/#projects", sectionId: "#projects" },
];

const socialLinks = [
  {
    icon: FiLinkedin,
    href: "https://www.linkedin.com/in/ahmad-abbany-992660258",
  },
  {
    icon: FiGithub,
    href: "https://github.com/ahmadabbani",
  },
  {
    icon: FiInstagram,
    href: "https://www.instagram.com/ahmddabb/",
  },
  {
    icon: FaWhatsapp,
    href: "https://wa.me/96176585971",
  },
];

const Footer = () => {
  const [bugEnabled, setBugEnabled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  const scrollToSectionWithOffset = (element, offset = 100) => {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  };

  const handleFooterLinkClick = (e, link) => {
    if (link.name === "Home") {
      if (isHome) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      // If not on home, let Link component handle navigation
    } else if (link.name === "Projects") {
      if (isHome) {
        e.preventDefault();
        const element = document.querySelector(link.sectionId);
        if (element) {
          scrollToSectionWithOffset(element, 100);
        }
      }
      // If not on home, navigate to /projects (handled by Link)
    } else if (link.sectionId) {
      // About or Skills
      if (isHome) {
        e.preventDefault();
        const element = document.querySelector(link.sectionId);
        if (element) {
          scrollToSectionWithOffset(element, 100);
        }
      }
      // If not on home, let Link component handle navigation
    }
  };

  return (
    <motion.footer
      className="creative-footer"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
    >
      {/* 1. Animated Liquid Gradient Background */}
      <div className="footer-gradient-sea"></div>
      {/* 2. The Walking Bug (Absolute Position) */}
      <AnimatePresence>
        {bugEnabled && (
          <motion.div
            key="ladybug" // CRITICAL: Unique key ensures exit animation fires
            className="the-bug"
            // Start off-screen left
            initial={{ x: -50, rotate: 90, scale: 0 }}
            // Walk to off-screen right
            animate={{
              x: "100vw",
              scale: 1,
              transition: {
                x: { duration: 15, repeat: Infinity, ease: "linear" },
                scale: { duration: 0.5 }, // Intro pop
              },
            }}
            // The "Funny" Vanish: Swell up, spin, and shrink to nothing
            exit={{
              scale: [1.2, 0],
              opacity: 0,
              rotate: 360,
              transition: { duration: 0.4, ease: "backIn" },
            }}
          >
            🐞
          </motion.div>
        )}
      </AnimatePresence>
      <div className="container footer-content">
        {/* 3. Big Centered Nav Links */}
        <motion.nav className="footer-nav" variants={itemVariants}>
          {navLinks.map((link, index) => {
            const isProjects = link.name === "Projects";
            const isHomeLink = link.name === "Home";
            const isSectionLink = link.name === "About" || link.name === "Skills";

            // For Home: use Link when not on home, anchor when on home
            if (isHomeLink) {
              if (isHome) {
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className="big-footer-link"
                    onClick={(e) => handleFooterLinkClick(e, link)}
                  >
                    {link.name}
                  </a>
                );
              } else {
                return (
                  <div key={link.name}>
                    <Link
                      to="/"
                      className="big-footer-link"
                      onClick={(e) => handleFooterLinkClick(e, link)}
                    >
                      {link.name}
                    </Link>
                  </div>
                );
              }
            }

            // For Projects: use Link to /projects when not on home, anchor when on home
            if (isProjects) {
              if (isHome) {
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className="big-footer-link"
                    onClick={(e) => handleFooterLinkClick(e, link)}
                  >
                    {link.name}
                  </a>
                );
              } else {
                return (
                  <div key={link.name}>
                    <Link
                      to="/projects"
                      className="big-footer-link"
                      onClick={(e) => handleFooterLinkClick(e, link)}
                    >
                      {link.name}
                    </Link>
                  </div>
                );
              }
            }

            // For About/Skills: use Link with hash when not on home, anchor when on home
            if (isSectionLink) {
              if (isHome) {
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className="big-footer-link"
                    onClick={(e) => handleFooterLinkClick(e, link)}
                  >
                    {link.name}
                  </a>
                );
              } else {
                return (
                  <div key={link.name}>
                    <Link
                      to={`/${link.sectionId}`}
                      className="big-footer-link"
                      onClick={(e) => handleFooterLinkClick(e, link)}
                    >
                      {link.name}
                    </Link>
                  </div>
                );
              }
            }

            return null;
          })}
        </motion.nav>

        {/* 4. Actions Row: Socials, Contact, AND Bug Switch */}
        <motion.div className="footer-actions" variants={itemVariants}>
          <div className="footer-socials">
            {socialLinks.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="footer-social-btn glass-panel"
                target="_blank"
                rel="noopener noreferrer"
              >
                <item.icon size={22} />
              </a>
            ))}
          </div>

          <Link to="/contact" className="footer-contact-btn glass-panel">
            Get In Touch
            <FiArrowRight size={23} className="footer-btn-icon" />
          </Link>

          {/* Moved Bug Switch Here */}
          <div className="bug-stack-wrapper">
            <div
              className="bug-control glass-panel"
              onClick={() => setBugEnabled(!bugEnabled)}
            >
              <div className={`bug-toggle ${bugEnabled ? "active" : ""}`}>
                <div className="toggle-circle"></div>
              </div>
              <span className="bug-text">
                {bugEnabled ? "really? 😒" : "Dont Touch !"}
              </span>
            </div>
            {/* Simple conditional text feedback - NO ANIMATION */}
            {bugEnabled && <p className="bug-feedback">1 bug enabled!</p>}
          </div>
        </motion.div>

        {/* 5. Bottom Row: Copyright Only */}
        <motion.div className="footer-bottom-row" variants={itemVariants}>
          <p className="copyright">© {new Date().getFullYear()} Ahmad Abbani</p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
