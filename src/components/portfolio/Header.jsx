import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion as Motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { FiArrowUpRight, FiX } from "react-icons/fi";
import "./intro.css";

const navigation = [
  { label: "Work", href: "#dp-work" },
  { label: "About", href: "#dp-about" },
  { label: "Expertise", href: "#dp-expertise" },
];

function HomeLink({ homePath, href, ...props }) {
  return homePath && href !== "#dp-contact" ? <Link to={href === "#dp-main" ? homePath : `${homePath}${href}`} {...props} /> : <a href={href} {...props} />;
}

function MobileNavigation({ onClose, homePath }) {
  const dialogRef = useRef(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const dialog = dialogRef.current;
    const opener = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (opener instanceof HTMLElement && opener.isConnected) opener.focus({ preventScroll: true });
    };
  }, []);

  return (
    <Motion.dialog
      ref={dialogRef}
      className="pv-mobile-menu"
      aria-label="Navigation"
      onCancel={onClose}
      initial={reduceMotion ? false : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
      animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="pv-mobile-top"><span>Ahmad Abbani<span className="pv-orange">.</span></span><button type="button" onClick={onClose} aria-label="Close navigation"><FiX aria-hidden="true" /></button></div>
      <nav aria-label="Mobile navigation">
        {[...navigation, { label: "Contact", href: "#dp-contact" }].map((link, index) => (
          <Motion.div key={link.href}
            initial={reduceMotion ? false : { y: 28, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: reduceMotion ? 0 : 0.12 + index * 0.07, duration: 0.5 }}>
            <HomeLink homePath={homePath} href={link.href} onClick={onClose}>
            <span className="pv-menu-index">0{index + 1}</span>{link.label}<FiArrowUpRight aria-hidden="true" />
            </HomeLink>
          </Motion.div>
        ))}
      </nav>
      <div className="pv-mobile-bottom"><span>Based in Beirut, Lebanon</span><a href="mailto:ahmddabbanii@gmail.com">ahmddabbanii@gmail.com</a></div>
    </Motion.dialog>
  );
}

export default function Header({ homePath = "" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (position) => setScrolled(position > 40));

  return (
    <>
      <Motion.header className="pv-header" data-scrolled={scrolled}
        initial={reduceMotion ? false : { opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
        <div className="pv-shell pv-header-inner">
          <HomeLink homePath={homePath} href="#dp-main" className="pv-brand" aria-label={homePath ? "Ahmad Abbani, home" : "Ahmad Abbani, back to top"}>Ahmad Abbani<span>.</span></HomeLink>
          <nav className="pv-desktop-nav" aria-label="Main navigation">
            {navigation.map((link, index) => <HomeLink key={link.href} homePath={homePath} href={link.href} className="pv-nav-link"><span className="pv-nav-index" aria-hidden="true">0{index + 1}</span><span className="pv-nav-text"><span>{link.label}</span><span aria-hidden="true">{link.label}</span></span></HomeLink>)}
          </nav>
          <a href="#dp-contact" className="pv-header-contact">Let's talk <FiArrowUpRight aria-hidden="true" /></a>
          <button type="button" className="pv-menu-toggle" aria-label="Open navigation" aria-haspopup="dialog" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}><span className="pv-menu-icon" aria-hidden="true"><i /><i /></span></button>
        </div>
      </Motion.header>
      {menuOpen && <MobileNavigation onClose={() => setMenuOpen(false)} homePath={homePath} />}
    </>
  );
}
