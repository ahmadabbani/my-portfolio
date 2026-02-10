import React from "react";
import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";

const backdropVariants = {
  hidden: { opacity: 0, backdropFilter: "blur(0px)" },
  visible: {
    opacity: 1,
    backdropFilter: "blur(20px)",
    transition: { duration: 0.5 },
  },
  exit: {
    opacity: 0,
    backdropFilter: "blur(0px)",
    transition: { duration: 0.3 },
  },
};

const modalVariants = {
  hidden: { y: 100, opacity: 0, scale: 0.9 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 },
  },
  exit: {
    y: 100,
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.3 },
  },
};

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <motion.div
      className="modal-overlay"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onClose}
    >
      <motion.div
        className="modal-content glass-panel"
        variants={modalVariants}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>
          <FiX size={24} />
        </button>

        {/* Header */}
        <div className="modal-top">
          <h1 className="modal-title">{project.title}</h1>
          <p
            className={`modal-status-badge ${
              !project.liveUrl ? "offline" : ""
            }`}
          >
            <span
              className={`pulse-circle ${!project.liveUrl ? "offline" : ""}`}
            ></span>
            {project.liveUrl ? "Live Project" : "Offline / Local"}
          </p>
        </div>

        {/* Body */}
        <p className="modal-desc">{project.fullDesc}</p>

        {/* Tech Stack */}
        <div className="modal-stack-container glass-panel">
          <span className="modal-label">Technology Stack</span>
          <div className="modal-icons">
            {project.stack.map((icon, i) => (
              <img
                key={i}
                src={`/assets/${icon}`}
                alt="tech"
                className="stack-icon-md"
              />
            ))}
          </div>
        </div>

        {/* Big Green Liquid CTA */}
        {project.liveUrl ? (
          <motion.a
            href={project.liveUrl}
            target="_blank"
            className="btn-liquid-green"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="pulse-circle-large"></span>
            View Project Live
          </motion.a>
        ) : (
          <div className="btn-liquid-green offline">
            <span className="pulse-circle-large offline"></span>
            Offline / Local
          </div>
        )}

        {/*Project Image */}
        {project.image && (
          <div className="modal-image-container">
            <img
              src={`/assets/${project.image}`}
              alt={project.title}
              className="modal-project-image"
            />
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ProjectModal;
