import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion as Motion, useReducedMotion } from "framer-motion";
import { FiArrowLeft, FiArrowUpRight } from "react-icons/fi";
import Footer from "../components/portfolio/Footer";
import Contact from "../components/portfolio/Contact";
import ProjectDetails from "../components/portfolio/ProjectDetails";
import { ProjectImage } from "../components/portfolio/Work";
import { allProjects } from "../components/portfolio/projects";
import "../styles/portfolio.css";
import "../styles/projects-page.css";

const ease = [0.22, 1, 0.36, 1];
const filters = [
  { id: "all", label: "Any category" },
  { id: "applications", label: "Web applications" },
  { id: "shopify", label: "Shopify" },
  { id: "websites", label: "Websites" },
].map(filter => ({ ...filter, count: allProjects.filter(project => filter.id === "all" || project.type === filter.id).length }));

function ArchiveProject({ project, index, onOpen }) {
  const reduceMotion = useReducedMotion();
  return <Motion.article className="pp-project"
    initial={reduceMotion ? false : { opacity: 0, y: 36 }}
    whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.08 }}
    transition={{ duration: 0.75, delay: reduceMotion ? 0 : index % 2 * 0.08, ease }}>
    <ProjectImage project={project} index={project.number - 1} onOpen={onOpen} />
    <div className="pp-project-meta"><span>{project.category}</span></div>
    <h2><button type="button" onClick={onOpen} aria-haspopup="dialog">{project.name}<span className="pp-project-arrow"><FiArrowUpRight aria-hidden="true" /></span></button></h2>
    <p className="pp-project-summary">{project.summary}</p>
    <ul className="pw-technologies" aria-label="Technologies">{project.technologies.map(technology => <li key={technology}>{technology}</li>)}</ul>
  </Motion.article>;
}

export default function ProjectsPage() {
  const [filter, setFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  const reduceMotion = useReducedMotion();
  const projects = allProjects.filter(project => filter === "all" || project.type === filter);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Projects | Ahmad Abbani";
    window.scrollTo({ top: 0, behavior: "instant" });
    return () => { document.title = previousTitle; };
  }, []);

  return <>
    <main id="dp-main" tabIndex={-1}>
      <section className="pp-archive pv-shell" aria-labelledby="pp-title">
        <div className="pp-topline"><Link to="/"><FiArrowLeft aria-hidden="true" />Back to home</Link><span>{String(allProjects.length).padStart(2, "0")} projects</span></div>
        <div className="pp-intro">
          <h1 id="pp-title"><span className="pp-title-mask"><Motion.span initial={reduceMotion ? false : { y: "110%", rotate: 2 }} animate={{ y: 0, rotate: 0 }} transition={{ duration: 1, delay: 0.15, ease }}><em>Projects.</em></Motion.span></span></h1>
          <Motion.p initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: reduceMotion ? 0 : 0.35, ease }}>A selection of projects I’ve worked on.</Motion.p>
        </div>
        <div className="pp-filter-bar">
          <div className="pp-filters" role="group" aria-label="Filter projects by category">{filters.map(item => <button key={item.id} type="button" aria-pressed={filter === item.id} onClick={() => setFilter(item.id)}><span>{item.label}</span><sup>{String(item.count).padStart(2, "0")}</sup>{filter === item.id && <Motion.span className="pp-filter-line" layoutId="project-filter" transition={reduceMotion ? { duration: 0 } : { duration: 0.4, ease }} />}</button>)}</div>
          <span className="pp-results" role="status" aria-live="polite">{String(projects.length).padStart(2, "0")}<span> / {allProjects.length}</span><span className="dp-sr-only"> projects shown</span></span>
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <Motion.div className="pp-grid" key={filter} initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0 : 0.18 }}>
            {projects.map((project, index) => <ArchiveProject key={project.id} project={project} index={index} onOpen={() => setSelectedProject(project)} />)}
          </Motion.div>
        </AnimatePresence>
        <div className="pp-end"><span>{projects.length} {projects.length === 1 ? "project" : "projects"}{filter !== "all" ? ` in ${filters.find(item => item.id === filter).label.toLowerCase()}` : ""}</span>{filter !== "all" ? <button type="button" onClick={() => { setFilter("all"); document.getElementById("pp-title").scrollIntoView({ behavior: reduceMotion ? "instant" : "smooth", block: "start" }); }}>Clear filter <FiArrowUpRight aria-hidden="true" /></button> : <a href="#dp-contact">Have a project in mind? <FiArrowUpRight aria-hidden="true" /></a>}</div>
      </section>
      <Contact eyebrow="Contact" />
    </main>
    <Footer homePath="/" />
    {selectedProject && <ProjectDetails project={selectedProject} archive onClose={() => setSelectedProject(null)} />}
  </>;
}
