import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectItem from "../components/sections/ProjectItem";
import ProjectModal from "../components/sections/ProjectModal";

// --- DATA ---
const projectsData = [
  {
    id: 0,
    title: "Electric Power Solutions",
    category: "Web Application",
    fullDesc: `Electric Power Solutions Website is a modern, interactive platform showcasing the company’s 
    services and projects. Each service has a dedicated page with a dashboard-style layout highlighting key metrics.
     The portfolio section features a modern gallery of projects,
      and clicking on a project opens a detailed page with comprehensive information and visuals. 
      The website’s contemporary
     design reflects the company’s brand while providing an engaging and informative experience for visitors.`,
    stack: ["react.png", "motion.svg"],
    image: "eps.png",
    liveUrl: "https://electric-power-solution.com/",
  },
  {
    id: 1,
    title: "Mediaex Agency",
    category: "full-stack Web Application",
    fullDesc: `Modern website developed for Mediaex, a digital marketing agency, built with React and Framer Motion for smooth, brand-aligned animations, with Supabase powering the backend services. The website focuses on showcasing the agency’s identity, offerings, partnerships, and team, providing a clear and engaging presentation of the company and its work. It includes a dynamic portfolio section with a filtering system that allows visitors to explore projects in a clean and structured way.
The platform also features a Careers section, where users can view open positions and submit applications directly, including CV uploads and relevant details.
Powered by Supabase for backend services, authentication, and database management. A secure, role-based admin dashboard allows administrators to fully manage the portfolio (add, edit, and delete projects), manage career listings (create, update, and remove positions), and review and manage job applications submitted by users. The system also supports admin user management, including creating new admin accounts.`,
    stack: ["react.png", "motion.svg", "supabase.png"],
    image: "mediaex.png",
    liveUrl: "https://mediaex-agency.com/",
  },
  {
    id: 2,
    title: "Almourachah",
    category: "full-stack Web Application",
    fullDesc: ` This website is a platform for Lebanese municipal election
                candidates, providing essential program information, candidate
                registration, and appointment booking. It includes a full admin
                panel to manage candidate data, automate email notifications for
                registrations and appointment updates, and control the calendar
                by enabling or disabling dates. After sessions, admins can
                unlock exclusive content for candidates and publish blogs easily
                for public access. Built with React for the frontend, it
                utilizes Vercel Functions for backend operations and PostgreSQL
                for data storage. The system ensures automated email
                communication, secure candidate management, dynamic scheduling,
                and seamless content updates.`,
    stack: [
      "react.png",
      "nodejs.svg",
      "vercel5.png",
      "railway.png",
      "postgres.png",
    ],
    image: "mourachah.png",
    liveUrl: "https://almourachah.org/",
  },
  {
    id: 3,
    title: "E-Learning Platform",
    category: "Full-Stack Web Application",
    fullDesc: `This platform is a comprehensive online learning system, designed to provide users with a seamless and engaging educational experience. Users can browse available courses, view detailed course pages with all relevant information, and register for courses while optionally adding additional services, leading to secure Stripe payments. After payment, users see a clean success page showing payment details, or a failed page if the payment doesn’t go through, and an automated email is sent summarizing the transaction.
The platform includes an online assessment feature, allowing users to see their scores before and after taking a course. Each course is structured into multiple parts with an advanced tracking system: users must complete each section in sequence before unlocking the next, ensuring efficient and realistic learning progress. Upon completion, certificates are automatically generated with the user’s name and completion date, and are downloadable for convenience. Users can also purchase additional services at any time.
A personal dashboard provides users with an overview of their enrolled courses, progress tracking, and payment history. The platform also features an advanced admin panel where administrators can manage users, view recent registrations and payments, and create new courses by uploading videos, PDFs, and other resources easily.
The system is built with PHP, MySQL, JavaScript, and integrates Stripe for secure payment processing.`,
    stack: ["javascript.png", "php.png", "mysql.png", "stripe.svg"],
    image: "courses.png",
    liveUrl: "https://courses.micheldaccache.com",
  },
  {
    id: 4,
    title: "Hrajel Heritage",
    category: "Frontend Web Application",
    fullDesc: `Informative website for Hrajel Heritage, built with React.js,
                Tailwind and Framer Motion to showcase the rich Lebanese heritage in a modern,
                interactive way. Features include modals and accordions
                presenting Hrajel’s traditions, historical sites, notable
                people, and more. Includes a full-page history section, mission
                & values, a gallery page for photography highlights, and a
                dynamic projects page with advanced filtering and detailed
                project pages (with galleries and rich information).`,
    stack: ["react.png", "tailwind.png", "motion.svg"],
    image: "hrajel.png",
    liveUrl: "https://hhd-lb.org",
  },
  {
    id: 5,
    title: "Zaktalks",
    category: "Full-Stack Web Application",
    fullDesc: `Zaktalks is a Learning Management System (LMS) built for selling and managing online courses. The platform is developed using Next.js with Supabase for authentication, database, and cloud services. It includes a secure authentication system allowing users to register and log in, with automated email notifications for account and system actions. The platform supports a flexible discount system, including coupons, points-based discounts, and first-purchase discounts, all automatically applied based on user eligibility. Users can purchase courses and complete payments through Stripe, with secure online transactions and automated emails confirming purchases and related actions. Each user has a dashboard displaying enrolled courses, course progress, lesson tracking, assessments, and certificates generated upon course completion. Course content is structured into modules and lessons, with progress tracking at the lesson level. Assessments are integrated to evaluate user progress throughout the course. The platform includes a full admin panel for managing courses, lessons, modules, assessments, users, payments, and discounts. Admins can create and update courses at any time, manage coupons and discount rules, control point systems, set first-purchase discounts, and monitor user activity and transactions. "The platform is currently under development and will be launched online soon."`,
    stack: ["nextjs.png", "supabase.png", "stripe.svg"],
    image: "zaktalks.jpg",
    liveUrl: "zaktalks.vercel.app",
  },
  {
    id: 6,
    title: "Bermuda Store",
    category: "full-stack Web Application",
    fullDesc: ` This website is a digital store where users can create accounts,
                place orders for various products, track their order status, and
                maintain a balance for purchases. It includes a full admin panel
                for managing orders, products, users, and payments. Built with
                React for the frontend and Node.js with Express for the backend,
                it integrates an API provider for product listings while also
                supporting manually created items stored in MySQL database. User
                authentication is securely handled with JWT tokens, and order
                statuses are managed in real time. The system ensures smooth
                transactions and complete admin control over sales and users.
                The frontend and backend are hosted on a VPS with full control, the database is on a separate MySQL server, and Cloudinary is used for image storage and management.`,
    stack: [
      "react.png",
      "nodejs.svg",
      "express.png",
      "mysql.png",
      "jwt.png",
      "cloudinary.svg",
    ],
    image: "bermuda.png",
    liveUrl: "https://bermuda-top-up.com/",
  },
  {
    id: 7,
    title: "Archiart",
    category: "Ecommerce",
    fullDesc: `Full-stack eCommerce website built for Archiart, a Lebanese
                printing services company. The platform reflects the brand’s
                strong identity, featuring an elegant services showcase and a
                dynamic portfolio with modern filtering. Includes a complete
                shop system with product filtering, cart, checkout, and email
                forwarding. A powerful admin dashboard allows full control over
                portfolio projects and shop items (create, edit, delete, manage
                availability, prices, and brands). Built with Supabase for
                authentication, database, and backend services.`,
    stack: ["javascript.png", "supabase.png"],
    image: "archiart.png",
    liveUrl: "https://archiart.com.lb/",
  },
  {
    id: 8,
    title: "LSD NGO ",
    category: "Frontend Web Application",
    fullDesc: ` Leadership for Sustainable Development (LSD) is a Lebanese NGO
                focused on social justice and civic engagement. I developed a
                user-friendly, modern website that showcases their projects,
                galleries, programs, and donation options, providing clear
                access to all their initiatives. The site is designed with
                simplicity and responsiveness in mind, making it easy for
                visitors to explore content, learn about their work, and engage
                with the organization online.`,
    stack: ["javascript.png", "php.png"],
    image: "lsd.jpg",
    liveUrl: "https://lsdlebanon.org/",
  },
  {
    id: 9,
    title: "AMPC-Agency",
    category: "Frontend Web Application",
    fullDesc: `AMPC Agency Website is a modern, informative platform designed to showcase the agency’s services,
     values, and expertise. The website presents key information
     in a clean and visually engaging layout, reflecting AMPC’s brand identity while providing visitors with a clear
      understanding of the agency’s offerings and approach.`,
    stack: ["javascript.png", "php.png", "html.png", "css.png"],
    image: "ampc.png",
    liveUrl: "https://ampc-comms.com/",
  },
  {
    id: 10,
    title: "Analytics Expertise",
    category: "full-stack Web Application",
    fullDesc: `I developed the official website for Analytics Expertise, a multi-page platform showcasing the company’s departments and services. The website includes a recent news section that provides updates and insights, as well as a dedicated training courses section where users can browse available programs, select a course, and register seamlessly.
In addition, the system includes a complete client contract registration workflow designed to streamline the sales process. After discussions with a client, a company sales representative can fill out an online form with the client’s details and the required services. The contract is then sent to the client online, where they can review the agreement, read all terms, and digitally sign and confirm it. Once approved, the contract is securely stored in the database, allowing administrators to review, manage, and track contracts, including client details, requested services, and digital signatures.
 This system significantly improves sales coordination and makes the discussion and contracting process more efficient and manageable online.
To enhance user experience, I utilized various libraries for interactive carousels, image displays, and modals, creating an intuitive and visually engaging platform.`,
    stack: ["javascript.png", "bootstrap.png", "php.png", "mysql.png"],
    image: "analytics.png",
    liveUrl: "https://Analytics-expertise.com/",
  },

  {
    id: 11,
    title: "Ultrass Sagesse",
    category: "Informative Website",
    fullDesc: ` I developed the official website for Ultras Sagesse, the
                Lebanese basketball fan group for the Sagesse team. This site is
                a comprehensive hub for fans, featuring upcoming match dates,
                updates, photos, a history section that celebrates the team's
                legacy, and a merchandise section where fans can browse and
                purchase team-related products. Additionally, I implemented a
                secure contact form with email confirmation, allowing fans to
                message the admin directly while ensuring user safety and
                authenticity.`,
    stack: ["javascript.png", "bootstrap.png", "php.png", "mysql.png"],
    image: "sagesse.png",
    liveUrl: "https://ultras-sagesse.com/",
  },
  {
    id: 12,
    title: "Alsafa Chicken",
    category: "Digital QR Menu",
    fullDesc: `The Alsafa Chicken QR Menu is a clean and modern digital menu website that showcases the restaurant’s
     menu along with essential information such as address, social media links, and contact details.
      Visitors can easily access the menu by scanning a QR code, providing a seamless and convenient experience.
       The website is designed for clarity and ease of use,
     reflecting the restaurant’s brand while offering an interactive, user-friendly interface.`,
    stack: ["javascript.png", "html.png", "css.png"],
    image: "alsafa.png",
    liveUrl: "https://alsafachicken.com/",
  },
  {
    id: 13,
    title: "Health Corner",
    category: "Informative Website",
    fullDesc: `The Health Corner website is an informative platform that presents the company’s services, values,
     and key information in a clear and accessible manner. Designed with a modern and user-friendly layout,
      it allows visitors to quickly understand the company’s offerings and mission, 
    while reflecting the brand’s identity in a professional and engaging way.`,
    stack: ["javascript.png", "html.png", "css.png"],
    image: "health.png",
    liveUrl: "https://healthcorner.com.lb/",
  },
  {
    id: 14,
    title: "Employee Management System",
    category: "Full-Stack Web Application",
    fullDesc: ` It’s built with robust authentication mechanisms, allowing
                secure login as an admin or employee using tokens and JWT. To
                ensure privacy and safety, the system also incorporates password
                hashing techniques, further enhancing the security of user data.
                The system is connected to a MySQL database on the server side.
                It allows adding, retrieving, and deleting information from the
                database seamlessly. The system also has the capability to
                create email users and reset passwords. The platform features
                separate login pages for admins and employees. Admins have the
                ability to create new users and employees, edit information,
                delete, and search for employees using information from the
                database. A modern dashboard displays various information from
                the database, such as salaries, employee categories, and more.
                The technologies used in this project include React on the
                client side, Node.js with the Express framework on the server
                side, and MySQL for the backend.`,
    stack: ["react.png", "nodejs.svg", "express.png", "jwt.png", "mysql.png"],
    image: "ems.png",
    liveUrl: "",
  },
  {
    id: 15,
    title: "Netflix clone",
    category: "Full-Stack Web Application",
    fullDesc: `This project is a Single Page Application (SPA) Netflix clone built using React and Firebase.
     It features comprehensive user authentication through Firebase Authentication, allowing users to sign up, sign in,
      and select a Netflix plan. The application integrates a movie API to display an up-to-date catalog of movies and shows.
       Users can add movies to a personalized favorites list,
        which is securely saved in Firebase Firestore and can be accessed or modified at any time.
         The platform also allows users to remove favorites, update their account information, and customize their profile, including changing their avatar.
     React form validation is implemented to ensure data integrity and enhance the overall user experience.`,
    stack: ["react.png", "firebase.png", "nodejs.svg", "chakra.png"],
    image: "netflix.png",
    liveUrl: "https://netflix-react-9af7f.web.app/",
  },
  {
    id: 16,
    title: "Ecommerce",
    category: "Full-Stack Web Application",
    fullDesc: ` The eCommerce site is driven by a robust full-stack solution utilizing Next.js for an engaging and responsive user experience. Integration with Strapi CMS facilitates efficient content management, while Clerk ensures secure and seamless user authentication. The interface is styled using Chakra UI for a modern and accessible design. Stripe is employed for secure transaction processing, enabling users to view their cart, manage items, and place orders with ease. This project is not yet completed and is currently paused.`,
    stack: [
      "nextjs.png",
      "nodejs.svg",
      "strapi.png",
      "clerk.jpg",
      "chakra.png",
      "stripe.svg",
    ],
    image: "ecom.png",
    liveUrl: "https://nextjs-ecommerce-strapi-cms.vercel.app",
  },
  {
    id: 17,
    title: "Social Platform",
    category: "Full-Stack Social Platform",
    fullDesc: `The application features a robust authentication system that enables users to register and log in securely using Firebase Authentication, ensuring the security and integrity of user data. It includes protected routes so that only authenticated users can access specific areas of the application. Firebase Firestore, a real-time NoSQL database, is leveraged for efficient data storage and retrieval, enabling the creation of user accounts and seamless login for existing users.
In addition, the application provides social interaction features that allow users to create posts, comment on existing users’ posts, and like posts.
 Each post displays the total number of likes and comments in real time, giving users immediate feedback on engagement.
  Users can view individual user profiles to see their posts and comments,
   as well as update their personal information, including changing their profile picture. Firestore’s real-time capabilities ensure that posts, comments,
 likes, and engagement counts are updated instantly across all active clients, enhancing the overall interactivity of the application.
The application is styled using Chakra UI, a simple, modular, and accessible component library.`,
    stack: ["react.png", "firebase.png", "nodejs.svg", "chakra.png"],
    image: "social.png",
    liveUrl: " https://react-social-media-c4fc7.web.app",
  },

  {
    id: 18,
    title: "Architecture Showcase Website",
    category: "Frontend Web Application",
    fullDesc: `  The “Architecture Showcase Website” is a sleek, user-friendly
                platform built with React. It’s a Single Page Application (SPA)
                with a modern layout, featuring dynamic galleries powered by
                Swiper. The site optimizes performance using React Lazy Load for
                images. Users can explore a variety of architectural projects
                from different categories, with detailed insights into each
                project. It’s a testament to the power and flexibility of modern
                web technologies.`,
    stack: ["react.png", "html.png", "css.png"],
    image: "architect.png",
    liveUrl: "https://ahmadabbani.github.io/React--Architect-Website/",
  },
  {
    id: 19,
    title: "News Homepage",
    category: "Frontend Page",
    fullDesc: `Streamlined News Hub: Simple, Appealing Design for Seamless
                Reading Across Devices!`,
    stack: ["javascript.png", "html.png", "css.png"],
    image: "news.png",
    liveUrl: "https://ahmadabbani.github.io/news-homepage-main/",
  },
  {
    id: 20,
    title: "Loopstudios Landing Page",
    category: "Frontend Page",
    fullDesc: `Dive into LoopStudios, a Simple, Appealing Design for Seamless
                Reading Across Devices!`,
    stack: ["javascript.png", "html.png", "css.png"],
    image: "loopstudio.png",
    liveUrl: "https://ahmadabbani.github.io/loop-studios-landing-page/",
  },
];

// --- PAGE ANIMATIONS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Smooth sequential reveal
      delayChildren: 0.2,
    },
  },
};

const ProjectsPage = () => {
  const [selectedId, setSelectedId] = useState(null);
  const selectedProject = projectsData.find((p) => p.id === selectedId);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;
  // Calculate pagination
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projectsData.slice(
    indexOfFirstProject,
    indexOfLastProject,
  );
  const totalPages = Math.ceil(projectsData.length / projectsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 50);
  };
  return (
    <section className="projects-page-wrapper">
      {/* 1. Header with Scroll Reveal */}
      <div className="projects-header-container">
        <motion.h1
          className="projects-main-title"
          initial={{ y: 100, opacity: 0, rotateX: 10 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          transition={{ duration: 1, ease: [0.2, 0.65, 0.3, 0.9] }}
        >
          Selected Works
        </motion.h1>
        <motion.p
          className="projects-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          A curated gallery of engineering and design. From small business
          platforms to complex enterprise ecosystems, every pixel serves a
          purpose.
        </motion.p>
      </div>

      {/* 2. The Gap Grid */}
      <motion.div
        className="projects-gap-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {currentProjects.map((project) => (
          <ProjectItem
            key={project.id}
            project={project}
            onClick={() => setSelectedId(project.id)}
          />
        ))}
      </motion.div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination-container">
          <button
            className="pagination-btn"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <div className="pagination-numbers">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                className={`pagination-number ${
                  currentPage === index + 1 ? "active" : ""
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            className="pagination-btn"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}

      {/* 3. The Modal */}
      <AnimatePresence>
        {selectedId !== null && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedId(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsPage;
