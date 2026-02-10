import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
const ctaVariants = {
  hidden: { y: 50, opacity: 0, rotateX: 5, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    rotateX: 0,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.46, 0.45, 0.94], // Custom fluid easing
    },
  },
};

const Contact = () => {
  const MotionLink = motion(Link);

  return (
    <section id="contact-cta" className="contact-section">
      <div className="container">
        <MotionLink
          to="/contact"
          className="contact-panel-link"
          initial="hidden"
          whileInView="visible"
          variants={ctaVariants}
          viewport={{ once: true, amount: 0.3 }}
          // Custom style to apply the gradient border/outline
          style={{
            border: "2px solid transparent",
            backgroundClip: "padding-box",
          }}
        >
          {/* Glass Panel is the internal content container */}
          <div className="contact-panel glass-panel">
            <h1 className="contact-title">Ready to collaborate?</h1>

            <p className="contact-paragraph">
              Whether you need robust full-stack development, seamless
              automation workflows, or insightful data integration, let's
              discuss how my expertise can power your next business.
            </p>

            <div className="contact-button-wrapper">
              <span className="contact-button glass-panel">
                {" "}
                Get In Touch
                <span className="icon-circle-wrapper">
                  <FiArrowRight size={16} className="contact-icon" />
                </span>
              </span>
            </div>
          </div>
        </MotionLink>
      </div>
    </section>
  );
};

export default Contact;
