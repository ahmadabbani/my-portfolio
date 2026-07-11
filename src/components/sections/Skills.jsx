import React from "react";
import { motion } from "framer-motion";

// --- Skill Data ---
const devSkills = [
  { name: "HTML/CSS", level: 98, icons: ["html.png", "css.png"] },
  {
    name: "UI Frameworks (Shadcn/Tailwind/Framer Motion)",
    level: 98,
    icons: ["shadcn.png", "tailwind.png", "motion.svg"],
  },
  { name: "JavaScript", level: 85, icons: ["javascript.png"] },
  { name: "React/Next.js", level: 85, icons: ["react.png", "nextjs.png"] },
  {
    name: "Database Management",
    level: 85,
    icons: ["mysql.png", "postgres.png", "supabase.png"],
  },
  {
    name: "Backend Technologies (Express.js / Supabase)",
    level: 80,
    icons: ["ex.png", "supabase.png"],
  },
  {
    name: "APIs & RESTful Services",
    level: 75,
    icons: ["api2.png", "api5.png"],
  },
];

const infraSkills = [
  {
    name: "Cloud Hosting & Deployment",
    level: 90,
    icons: ["cloudh.png", "cloudwhite.png"],
  },
  {
    name: "CMS & eCommerce Platforms (WordPress / Shopify)",
    level: 85,
    icons: ["shopify.png", "wordpress.png"],
  },
  {
    name: "Task Automation (n8n / AI / Chatbot APIs)",
    level: 70,
    icons: ["n8n1.png", "ai.png"],
  },
  {
    name: "Data Analytics & Dashboards",
    level: 75,
    icons: ["dataanalysis.png", "dashboard.png"],
  },
  {
    name: "IT Fundamentals",
    level: 65,
    icons: ["network1.png", "support.png"],
  },
];

// --- Animation Variants ---
const containerVariants = {
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// --- Single Skill Bar Component ---
const SkillBar = ({ skill }) => {
  return (
    <motion.div className="skill-item" variants={itemVariants}>
      <div className="skill-title-row">
        <h4 className="skill-title">{skill.name}</h4>
        <div className="skill-icons">
          {skill.icons.map((icon, index) => (
            // NOTE: The path for these images must be updated in your public/assets folder
            <img
              key={index}
              src={`/assets/${icon}`}
              alt={`${skill.name} icon`}
              className="skill-icon"
            />
          ))}
        </div>
      </div>
      <div className="skill-bar-track">
        {/* Fill bar using motion for animation */}
        <motion.div
          className="skill-bar-fill"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.6, 0.05, 0.01, 0.9] }}
        />
      </div>
    </motion.div>
  );
};

const Skills = () => {
  // Paragraph condensed for technical focus
  const technicalSummary = `Building web applications beyond development, with focus on scalable, secure, and maintainable systems. This includes architecture planning, hosting, deployment, infrastructure, security, performance optimization, and creating flexible solutions that can be easily managed and expanded. Selecting the right technologies and services based on each project's requirements.

Managing complete eCommerce solutions beyond the storefront, including platform configuration, integrations, automation, marketing workflows, SEO optimization, and the tools needed to operate and grow online businesses.

Applying data-driven approaches through data processing, dashboards, analytics, and transforming information into insights that improve digital solutions and decisions.`;
  return (
    <section id="skills" className="skills-section">
      <motion.div
        className="container"
        initial="hidden"
        whileInView="visible"
        variants={containerVariants}
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* Section Title (h1 as requested) */}
        <motion.h1 className="section-title" variants={itemVariants}>
          Expertise
        </motion.h1>

        {/* Technical Paragraph */}
        <motion.p className="skills-summary" variants={itemVariants}>
          {technicalSummary}
        </motion.p>

        {/* Skills Grid */}
        <div className="skills-grid">
          {/* Left Side: Web Development Skills */}
          <div className="skills-column">
            {devSkills.map((skill) => (
              <SkillBar key={skill.name} skill={skill} />
            ))}
          </div>

          {/* Right Side: Infrastructure, Automation, Data */}
          <div className="skills-column">
            {infraSkills.map((skill) => (
              <SkillBar key={skill.name} skill={skill} />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;
