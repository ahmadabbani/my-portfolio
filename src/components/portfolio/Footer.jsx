import { FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./footer.css";

export default function Footer({ homePath = "" }) {
  return (
    <footer className="pf-footer">
      <div className="pv-shell">
        <nav className="pf-main-nav" aria-label="Footer navigation">
          {[{ label: "Home", hash: "#dp-main" }, { label: "Work", hash: "#dp-work" }, { label: "About", hash: "#dp-about" }, { label: "Expertise", hash: "#dp-expertise" }].map(link => homePath
            ? <Link key={link.hash} to={link.hash === "#dp-main" ? homePath : `${homePath}${link.hash}`}>{link.label}</Link>
            : <a key={link.hash} href={link.hash}>{link.label}</a>)}
        </nav>
        <div className="pf-bottom">
          <span>© {new Date().getFullYear()} Ahmad Abbani</span>
          <div className="pf-socials">
            <a href="https://github.com/ahmadabbani" target="_blank" rel="noreferrer">GitHub <FiArrowUpRight aria-hidden="true" /><span className="dp-sr-only"> (opens in a new tab)</span></a>
            <a href="https://www.linkedin.com/in/ahmad-abbany-992660258" target="_blank" rel="noreferrer">LinkedIn <FiArrowUpRight aria-hidden="true" /><span className="dp-sr-only"> (opens in a new tab)</span></a>
            <a href="https://www.instagram.com/ahmddabb/" target="_blank" rel="noreferrer">Instagram <FiArrowUpRight aria-hidden="true" /><span className="dp-sr-only"> (opens in a new tab)</span></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
