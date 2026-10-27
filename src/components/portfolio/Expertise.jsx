import { motion as Motion, useReducedMotion } from "framer-motion";
import "./expertise.css";

// Based on the original Skills/About sections and project technology lists.
// Deployment terminology was checked against Vercel's official documentation.
const expertise = [
  {
    title: "Frontend development",
    description: "Responsive interfaces, reusable components, and interaction design for websites and web applications.",
    tools: ["React", "Next.js", "JavaScript", "TypeScript", "HTML", "CSS"],
  },
  {
    title: "Backend development & APIs",
    description: "Application logic, database management, authentication, API development, and integrations.",
    tools: ["Node.js", "Express", "PHP", "Supabase", "MySQL", "PostgreSQL"],
  },
  {
    title: "Ecommerce & CMS",
    description: "Shopify themes with Liquid, sections, blocks, and metafields; WordPress development, payment and shipping setup, and app integrations.",
    tools: ["Shopify", "Liquid", "WordPress"],
  },
  {
    title: "Business systems & automation",
    description: "Connecting business applications through APIs and webhooks, synchronizing data, and automating recurring tasks.",
    tools: ["n8n", "REST APIs", "Webhooks", "JSON", "Data synchronization"],
  },
  {
    title: "Deployment & hosting",
    description: "Deploying websites and web applications, managing their hosting, and handling updates to live projects.",
    tools: ["Vercel", "Cloud hosting", "Deployment management"],
  },
  {
    title: "Data analytics & dashboards",
    description: "Data cleaning, analysis, and dashboards to support reporting and business decisions.",
    tools: ["Power BI", "Python", "SQL", "Data visualization"],
  },
  {
    title: "Application & IT support",
    description: "Application maintenance, computer setup, software installation, and resolving common application, system, and connectivity issues.",
    tools: ["Application support", "Computer setup", "Software installation", "Troubleshooting", "Network connectivity"],
  },
];

const ease = [0.22, 1, 0.36, 1];

export default function Expertise() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="dp-expertise" className="pe-section pv-shell" aria-labelledby="dp-expertise-title">
      <Motion.div className="pe-heading" initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }}>
        <span className="pe-eyebrow">03 / Expertise</span>
        <h2 id="dp-expertise-title">Technical expertise<span>.</span></h2>
      </Motion.div>

      <div className="pe-list">
        {expertise.map((item, index) => (
          <Motion.article key={item.title} className="pe-row"
            initial={reduceMotion ? false : "hidden"} whileInView="visible" viewport={{ once: true, amount: 0.2 }}
            variants={{ visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.06 } } }}>
            <Motion.span className="pe-divider" aria-hidden="true" variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 0.9, ease } } }} />
            <Motion.span className="pe-number" aria-hidden="true" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.6 } } }}>0{index + 1}</Motion.span>
            <Motion.h3 variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }}>{item.title}</Motion.h3>
            <Motion.div className="pe-details" variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }}>
              <p>{item.description}</p>
              <ul className="pe-tools" aria-label="Technologies and focus areas">{item.tools.map(tool => <li key={tool}>{tool}</li>)}</ul>
            </Motion.div>
          </Motion.article>
        ))}
      </div>
    </section>
  );
}
