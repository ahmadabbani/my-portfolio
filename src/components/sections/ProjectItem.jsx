import React from "react";
import { motion } from "framer-motion";

const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const ProjectItem = ({ project, onClick }) => {
  return (
    <motion.div
      className="project-card-advanced glass-panel"
      variants={itemVariants}
      whileHover="hover" // Triggers hover variants on children
    >
      {/* LEFT: Content (40%) */}
      <div className="project-card-content">
        <div className="project-card-text">
          <span className="project-category">{project.category}</span>
          <h2 className="project-title">{project.title}</h2>
          <p
            className="project-desc"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {project.fullDesc}
          </p>{" "}
        </div>

        {/* Grayscale Stack */}
        <div className="project-stack-row">
          {project.stack.map((icon, i) => (
            <img
              key={i}
              src={`/assets/${icon}`}
              alt="tech"
              className="stack-icon-mini"
            />
          ))}
        </div>

        {/* Liquid Orange Button */}
        <motion.button
          className="btn-liquid-orange"
          onClick={onClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          See Details
        </motion.button>
      </div>

      {/* RIGHT: Image (60%) */}
      <div className="project-card-image-wrapper">
        <motion.div
          className="project-card-image"
          style={{ backgroundImage: `url(/assets/${project.image})` }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
        {/* Liquid Overlay for sheen effect */}
        <div className="image-overlay-sheen"></div>
      </div>
    </motion.div>
  );
};

export default ProjectItem;
