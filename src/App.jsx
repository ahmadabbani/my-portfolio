import React from "react";
// 1. Import routing components
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import "./global.css";

// Home Page Sections
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact"; // This is the Contact CTA

// 2. Import the new dedicated page component
import ContactPage from "./pages/ContactPage";
import ProjectsPage from "./pages/ProjectsPage";

// Component representing the entire Home Page structure (All Sections)
const HomeLayout = () => (
  <main className="app-wrapper">
    <Hero />
    <About />
    <Skills />
    <Projects />
    <Contact /> {/* The Contact CTA section */}
  </main>
);

function App() {
  return (
    // 3. Wrap the application in the Router
    <BrowserRouter>
      <div className="app-container">
        <Header /> {/* Header is persistent */}
        {/* 4. Define the routes to switch the main content */}
        <Routes>
          {/* Route for the Home Page (all sections) */}
          <Route path="/" element={<HomeLayout />} />

          {/* Route for the Dedicated Contact Page */}
          <Route path="/contact" element={<ContactPage />} />
          {/* Route for the Dedicated Projects Page */}
          <Route path="/projects" element={<ProjectsPage />} />
        </Routes>
        <Footer /> {/* Footer is persistent */}
      </div>
    </BrowserRouter>
  );
}

export default App;
