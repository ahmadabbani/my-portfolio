import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion as Motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import ProjectDetails from "./ProjectDetails";
import { featuredProjects } from "./projects";
import "./work.css";

const ease = [0.22, 1, 0.36, 1];

export function ProjectImage({ project, index, onOpen }) {
  const imageRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const x = useSpring(cursorX, { stiffness: 190, damping: 25 });
  const y = useSpring(cursorY, { stiffness: 190, damping: 25 });
  const { scrollYProgress } = useScroll({ target: imageRef, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [12, -12]);

  return (
    <button ref={imageRef} type="button" className={`pw-image pw-${project.tone}`} aria-label={`Explore ${project.name}`} aria-haspopup="dialog" onClick={onOpen}
      onPointerMove={(event) => {
        if (reduceMotion || event.pointerType !== "mouse") return;
        const bounds = event.currentTarget.getBoundingClientRect();
        const radius = Math.min(110, Math.max(50, window.innerWidth * 0.035));
        cursorX.set(Math.max(radius, Math.min(bounds.width - radius, event.clientX - bounds.left)));
        cursorY.set(Math.max(radius, Math.min(bounds.height - radius, event.clientY - bounds.top)));
      }}>
      <span className="pw-image-label"><span>{String(index + 1).padStart(2, "0")}</span><span>{project.category}</span></span>
      <Motion.div className="pw-screenshot" style={reduceMotion ? undefined : { y: imageY }}>
        <img src={`/assets/${project.image}`} alt={project.imageAlt} width={project.imageWidth} height={project.imageHeight} loading={index < 2 ? "eager" : "lazy"} decoding="async" />
      </Motion.div>
      <span className="pw-image-caption" aria-hidden="true">View project details <FiArrowUpRight /></span>
      {!reduceMotion && <Motion.span className="pw-cursor" aria-hidden="true" style={{ x, y }}><FiArrowUpRight /><span>View project</span></Motion.span>}
    </button>
  );
}

function ProjectCard({ project, index, onOpen }) {
  const reduceMotion = useReducedMotion();

  return (
    <Motion.article className={`pw-project pw-project-${index + 1}`}
      initial={reduceMotion ? false : { opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.9, ease }}>
      <ProjectImage project={project} index={index} onOpen={onOpen} />
      <div className="pw-project-info">
        <span className="pw-project-role">{project.category}</span>
        <h3><button type="button" onClick={onOpen} aria-haspopup="dialog">{project.name}<span className="pw-title-arrow"><FiArrowUpRight aria-hidden="true" /></span></button></h3>
        <p>{project.summary}</p>
        <ul className="pw-technologies" aria-label="Technologies">{project.technologies.map(technology => <li key={technology}>{technology}</li>)}</ul>
        {index === 2 && <button type="button" className="pw-notes-link" onClick={onOpen} aria-haspopup="dialog">Explore the project <FiArrowUpRight aria-hidden="true" /></button>}
      </div>
    </Motion.article>
  );
}


export default function Work() {
  const [selectedProject, setSelectedProject] = useState(null);
  const reduceMotion = useReducedMotion();

  return (
    <section id="dp-work" className="pw-section pv-shell" aria-labelledby="dp-work-title">
      <div className="pw-section-header">
        <div>
          <Motion.span className="pw-eyebrow" initial={reduceMotion ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>01 / Selected work</Motion.span>
          <h2 id="dp-work-title" className="pw-heading"><span className="pw-heading-mask"><Motion.span initial={reduceMotion ? false : { y: "110%" }} whileInView={{ y: "0%" }} viewport={{ once: true }} transition={{ duration: 0.85, ease }}>The work, <em>up close.</em></Motion.span></span></h2>
        </div>
        <Motion.div className="pw-section-intro" initial={reduceMotion ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.75, ease }}><p>Custom storefronts and web applications. A look at what I built and how each project works.</p><Link to="/projects">View projects <FiArrowUpRight aria-hidden="true" /></Link></Motion.div>
      </div>
      <div className="pw-project-grid">{featuredProjects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} onOpen={() => setSelectedProject(project)} />)}</div>
      <Motion.div className="pw-archive" initial={reduceMotion ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }}><span>More websites, applications, and experiments.</span><Link to="/projects">View projects <FiArrowRight aria-hidden="true" /></Link></Motion.div>
      {selectedProject && <ProjectDetails project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </section>
  );
}
