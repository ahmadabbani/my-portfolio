import { useEffect, useRef } from "react";
import { motion as Motion, useReducedMotion } from "framer-motion";
import { FiArrowUpRight, FiX } from "react-icons/fi";
import "./work.css";

const ease = [0.22, 1, 0.36, 1];

export default function ProjectDetails({ project, onClose, archive = false }) {
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
    <Motion.dialog ref={dialogRef} className={`pw-dialog${archive ? " pp-dialog" : ""}`} aria-labelledby="pw-dialog-title" onCancel={onClose}
      initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.35, ease }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onClose();
      }}>
      <div className="pw-dialog-top"><span>Project details / {project.category}</span><button type="button" onClick={onClose} aria-label="Close project details"><FiX aria-hidden="true" /></button></div>
      <h2 id="pw-dialog-title">{project.name}<span>.</span></h2>
      <p className="pw-dialog-role">{project.category}</p>
      <div className={archive ? "pp-detail-grid" : undefined}>
      <img className="pw-dialog-image" src={`/assets/${project.image}`} alt={project.imageAlt} width={project.imageWidth} height={project.imageHeight} />
      <div className="pw-dialog-copy"><h3>About the project</h3>{project.description.split(/\n\s*\n/).map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
      </div>
      <div className="pw-dialog-bottom"><ul className="pw-technologies" aria-label="Technologies">{project.technologies.map(technology => <li key={technology}>{technology}</li>)}</ul>{project.url ? <a href={project.url} target="_blank" rel="noreferrer">Visit live website <FiArrowUpRight aria-hidden="true" /><span className="dp-sr-only"> (opens in a new tab)</span></a> : <span className="pp-local-project">Offline / Local</span>}</div>
    </Motion.dialog>
  );
}
