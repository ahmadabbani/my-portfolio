import React from "react";
import { motion } from "framer-motion";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiGithub,
  FiLinkedin,
  FiTwitter,
} from "react-icons/fi";

// Variants for sequential staggering entrance
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

// Variants for individual widget/form entrance
const itemVariants = {
  hidden: { opacity: 0, x: -50, rotateZ: -5 },
  visible: {
    opacity: 1,
    x: 0,
    rotateZ: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// Small utility component for the detail widgets
const ContactWidget = ({ icon: Icon, title, value }) => (
  <motion.div className="contact-widget glass-panel" variants={itemVariants}>
    <div className="widget-icon-wrapper">
      <Icon size={28} className="widget-icon" />
    </div>
    <div className="widget-text">
      <p className="widget-title">{title}</p>
      <h3 className="widget-value">{value}</h3>
    </div>
  </motion.div>
);

const ContactPage = () => {
  return (
    <section id="contact-page-wrapper" className="contact-page-section">
      <div className="container contact-page-container">
        {/* Main Title - Always fades in */}
        <motion.h1
          className="contact-page-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Let's Build Something Great.
        </motion.h1>

        {/* Main Content Grid */}
        <motion.div
          className="contact-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* ========== COLUMN 1: WIDGETS & INFO ========== */}
          <div className="contact-info-widgets">
            {/* 1. Email Widget */}
            <ContactWidget
              icon={FiMail}
              title="Primary Mail"
              value="hello@yourdomain.com"
            />

            {/* 2. Phone Widget */}
            <ContactWidget
              icon={FiPhone}
              title="WhatsApp / Telegram"
              value="+1 555 123 4567"
            />

            {/* 3. Location / Timezone Widget (The "Cool Stuff") */}
            <ContactWidget
              icon={FiMapPin}
              title="Location & Time"
              value="Beirut, Lebanon (EET)"
            />

            {/* 4. Social Media Widget (The "Cool Stuff" - Horizontal) */}
            <motion.div className="social-widgets-row" variants={itemVariants}>
              <a
                href="https://github.com"
                target="_blank"
                className="social-link glass-panel"
              >
                <FiGithub size={30} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                className="social-link glass-panel"
              >
                <FiLinkedin size={30} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                className="social-link glass-panel"
              >
                <FiTwitter size={30} />
              </a>
            </motion.div>
          </div>

          {/* ========== COLUMN 2: CONTACT FORM ========== */}
          <motion.div className="contact-form-wrapper" variants={itemVariants}>
            <form className="contact-form glass-panel">
              <h2 className="form-heading">Send a Quick Message</h2>

              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email Address" required />
              <input type="text" placeholder="Subject or Service Needed" />
              <textarea
                placeholder="Tell me about your project..."
                rows="5"
                required
              ></textarea>

              <button type="submit" className="submit-button">
                Send Message
              </button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactPage;
