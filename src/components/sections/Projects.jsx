import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const projects = [
  {
    id: 1,
    title: "01",
    category: "Full-Stack",
    bgColor: "rgba(255, 255, 255, 0.05)",
    bgImage: "/assets/loopstudio.png",
  },
  {
    id: 2,
    title: "02",
    category: "Automation",
    bgColor: "rgba(255, 255, 255, 0.05)",
    bgImage: "/assets/mediaex.png",
  },
  {
    id: 3,
    title: "03",
    category: "Data & APIs",
    bgColor: "rgba(255, 255, 255, 0.05)",
    bgImage: "/assets/architect.png",
  },
  {
    id: 4,
    title: "04",
    category: "UI/UX Design",
    bgColor: "rgba(255, 255, 255, 0.05)",
    bgImage: "/assets/hrajel.png",
  },
];
// --- Animation Variants ---

// 1. Initial State (Stacked)
const cardInitialStack = (i) => ({
  y: i * 5, // More pronounced stack
  x: 0,
  rotate: 0,
  scale: 1,
  opacity: 0.8 + i * 0.05, // Slightly varying opacity
  filter: "blur(3px)",
});

// 2. On-View Animation (Bloom into Flower)
const cardBloomState = (i) => {
  const transition = {
    type: "spring",
    stiffness: 200,
    damping: 20,
    delay: 0.8 + i * 0.1,
  }; // Added delay and stagger
  switch (i) {
    case 0:
      return {
        rotate: -15,
        y: -45,
        x: -30,
        opacity: 1,
        filter: "blur(0px)",
        transition,
      }; // Top Left
    case 1:
      return {
        rotate: -5,
        y: 15,
        x: -30,
        opacity: 1,
        filter: "blur(0px)",
        transition,
      }; // Bottom Left
    case 2:
      return {
        rotate: 15,
        y: -45,
        x: 30,
        opacity: 1,
        filter: "blur(0px)",
        transition,
      }; // Top Right
    case 3:
      return {
        rotate: 5,
        y: 15,
        x: 30,
        opacity: 1,
        filter: "blur(0px)",
        transition,
      }; // Bottom Right
    default:
      return {};
  }
};

// 3. Hover Animation (Subtle Random Lift/Rotate)
const cardHoverState = (i) => ({
  scale: 1.03,
  y: i % 2 === 0 ? -5 : 5, // Slight up/down lift
  x: i % 2 === 0 ? 5 : -5, // Slight left/right shift
  rotate: i % 2 === 0 ? 1 : -1, // Subtle rotation
  boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
  transition: { type: "spring", stiffness: 400, damping: 25 },
});

// Main container entrance for text and button
const sectionContentVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.3 },
  },
};

const Projects = () => {
  const MotionLink = motion(Link);

  return (
    <section id="projects" className="projects-section">
      <motion.div
        className="container projects-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Left Column: CTA Content */}
        <motion.div
          className="projects-cta-content"
          variants={sectionContentVariants}
        >
          <h1 className="section-title projects-title">Showcase</h1>
          <p className="projects-paragraph">
            A curated selection of my work demonstrating expertise in full-stack
            development, modern UI implementation, scalable backend
            architecture, and seamless workflow automation. Click through to
            view project details, technical stacks, and live deployments.
          </p>
          <Link to="/projects" className="cta-button">
            View All Projects
            <FiArrowRight size={22} className="ml-2 cta-arrow" />
          </Link>
        </motion.div>

        {/* Right Column: Animated Card Flower */}
        <div className="card-flower-wrapper">
          {projects.map((project, index) => (
            <MotionLink
              key={project.id}
              className="project-card glass-panel"
              custom={index}
              initial={cardInitialStack(index)} // Start as stacked
              whileInView={cardBloomState(index)} // Bloom on view
              whileHover={cardHoverState(index)} // New hover effect
              viewport={{ once: true, amount: 0.4 }} // Trigger when 40% in view
              style={{
                zIndex: 10 - index,
                backgroundImage: `url(${project.bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              to="/projects"
            >
              <span className="card-category">{project.category}</span>
              <h3 className="card-title">{project.title}</h3>
            </MotionLink>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;
