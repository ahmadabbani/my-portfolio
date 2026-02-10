import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt4 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

// Animation Variants for Mobile Overlay
const menuOverlayVariants = {
  initial: { opacity: 0, scaleY: 0 },
  animate: {
    opacity: 1,
    scaleY: 1,
    transition: { duration: 0.5, ease: [0.6, 0.05, 0.01, 0.9] },
  },
  exit: {
    opacity: 0,
    scaleY: 0,
    transition: { duration: 0.5, ease: [0.6, 0.05, 0.01, 0.9] },
  },
};

// Animation Variants for Staggered Links
const linkContainerVariants = {
  animate: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
};

const linkItemVariants = {
  initial: { y: 30, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.6, 0.05, 0.01, 0.9] },
  },
  exit: { opacity: 0 },
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  const scrollToSectionWithOffset = (element, offset = 100) => {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  };

  // Handle scrolling when navigating to different pages
  useEffect(() => {
    if (location.pathname === "/") {
      if (location.hash) {
        // If there's a hash, scroll to that section with offset
        const scrollToSection = (attempts = 0) => {
          const element = document.querySelector(location.hash);
          if (element) {
            scrollToSectionWithOffset(element, 100);
          } else if (attempts < 5) {
            setTimeout(() => scrollToSection(attempts + 1), 100);
          }
        };
        setTimeout(() => scrollToSection(), 100);
      } else {
        // No hash, scroll to top
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else if (location.pathname === "/contact" || location.pathname === "/projects") {
      // Scroll to top when navigating to contact or projects pages
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.pathname, location.hash]);

  const handleSectionClick = (e, href) => {
    // For About / Skills:
    // - On home page: prevent default and scroll to section with offset
    // - On other pages: Link component handles navigation, useEffect handles scrolling
    if (isHome) {
      e.preventDefault();
      // On home page: scroll to section with offset
      const element = document.querySelector(href);
      if (element) {
        scrollToSectionWithOffset(element, 100);
      }
    }
    // If not on home, let Link component handle navigation naturally
  };

  const handleProjectsClick = (e, href) => {
    // For Projects:
    // - On home page: scroll to projects section with offset
    // - On other pages: Link component handles navigation, useEffect handles scroll to top
    if (isHome) {
      e.preventDefault();
      // On home page: scroll to projects section with offset
      const element = document.querySelector(href);
      if (element) {
        scrollToSectionWithOffset(element, 100);
      }
    }
    // If not on home, let Link component handle navigation naturally
  };

  const handleContactClick = (e) => {
    // Contact: Link component handles navigation, useEffect handles scroll to top
    // No preventDefault needed - let Link handle it
  };

  const handleHomeClick = (e) => {
    if (isHome) {
      e.preventDefault();
      // On home page: scroll back to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    // If not on home, let Link component handle navigation naturally
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
      className="fixed-header glass-panel"
    >
      <div className="header-inner">
        {/* Logo */}
        <Link to="/" className="logo">
          Ahmad Abbani<span className="dot">.</span>
        </Link>

        {/* Desktop Links (Visible > 992px) */}
        <nav className="desktop-nav">
          {/* Home link */}
          {isHome ? (
            <a href="/" className="nav-link" onClick={handleHomeClick}>
              Home
            </a>
          ) : (
            <Link to="/" className="nav-link" onClick={handleHomeClick}>
              Home
            </Link>
          )}

          {/* Other links */}
          {navLinks.map((link) => {
            const isProjects = link.name === "Projects";
            const isContact = link.name === "Contact";
            const isSectionLink = link.name === "About" || link.name === "Skills";

            // For Contact: always use Link
            if (isContact) {
              return (
                <Link
                  key={link.name}
                  to="/contact"
                  className="nav-link"
                  onClick={handleContactClick}
                >
                  {link.name}
                </Link>
              );
            }

            // For Projects: use Link when not on home, anchor when on home
            if (isProjects) {
              if (isHome) {
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className="nav-link"
                    onClick={(e) => handleProjectsClick(e, link.href)}
                  >
                    {link.name}
                  </a>
                );
              } else {
                return (
                  <Link
                    key={link.name}
                    to="/projects"
                    className="nav-link"
                    onClick={handleProjectsClick}
                  >
                    {link.name}
                  </Link>
                );
              }
            }

            // For About/Skills: use anchor on home, Link with hash when not on home
            if (isSectionLink) {
              if (isHome) {
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className="nav-link"
                    onClick={(e) => handleSectionClick(e, link.href)}
                  >
                    {link.name}
                  </a>
                );
              } else {
                return (
                  <Link
                    key={link.name}
                    to={`/${link.href}`}
                    className="nav-link"
                    onClick={(e) => handleSectionClick(e, link.href)}
                  >
                    {link.name}
                  </Link>
                );
              }
            }

            return null;
          })}
        </nav>

        {/* Menu Toggle (Visible < 992px) */}
        <button
          className="menu-btn"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <IoClose size={30} /> : <HiMenuAlt4 size={30} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            className="nav-overlay glass-panel"
            variants={menuOverlayVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <motion.div
              className="overlay-links-container"
              variants={linkContainerVariants}
              initial="initial"
              animate="animate"
            >
              {/* Home link */}
              {isHome ? (
                <motion.a
                  href="/"
                  className="overlay-nav-link"
                  variants={linkItemVariants}
                  onClick={(e) => {
                    handleHomeClick(e);
                    setIsOpen(false);
                  }}
                >
                  Home
                </motion.a>
              ) : (
                <motion.div variants={linkItemVariants}>
                  <Link
                    to="/"
                    className="overlay-nav-link"
                    onClick={(e) => {
                      handleHomeClick(e);
                      setIsOpen(false);
                    }}
                  >
                    Home
                  </Link>
                </motion.div>
              )}

              {/* Other links */}
              {navLinks.map((link) => {
                const isProjects = link.name === "Projects";
                const isContact = link.name === "Contact";
                const isSectionLink = link.name === "About" || link.name === "Skills";

                // For Contact: always use Link
                if (isContact) {
                  return (
                    <motion.div key={link.name} variants={linkItemVariants}>
                      <Link
                        to="/contact"
                        className="overlay-nav-link"
                        onClick={(e) => {
                          handleContactClick(e);
                          setIsOpen(false);
                        }}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  );
                }

                // For Projects: use Link when not on home, anchor when on home
                if (isProjects) {
                  if (isHome) {
                    return (
                      <motion.a
                        key={link.name}
                        href={link.href}
                        className="overlay-nav-link"
                        variants={linkItemVariants}
                        onClick={(e) => {
                          handleProjectsClick(e, link.href);
                          setIsOpen(false);
                        }}
                      >
                        {link.name}
                      </motion.a>
                    );
                  } else {
                    return (
                      <motion.div key={link.name} variants={linkItemVariants}>
                        <Link
                          to="/projects"
                          className="overlay-nav-link"
                          onClick={(e) => {
                            handleProjectsClick(e, link.href);
                            setIsOpen(false);
                          }}
                        >
                          {link.name}
                        </Link>
                      </motion.div>
                    );
                  }
                }

                // For About/Skills: use anchor on home, Link with hash when not on home
                if (isSectionLink) {
                  if (isHome) {
                    return (
                      <motion.a
                        key={link.name}
                        href={link.href}
                        className="overlay-nav-link"
                        variants={linkItemVariants}
                        onClick={(e) => {
                          handleSectionClick(e, link.href);
                          setIsOpen(false);
                        }}
                      >
                        {link.name}
                      </motion.a>
                    );
                  } else {
                    return (
                      <motion.div key={link.name} variants={linkItemVariants}>
                        <Link
                          to={`/${link.href}`}
                          className="overlay-nav-link"
                          onClick={(e) => {
                            handleSectionClick(e, link.href);
                            setIsOpen(false);
                          }}
                        >
                          {link.name}
                        </Link>
                      </motion.div>
                    );
                  }
                }

                return null;
              })}
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
