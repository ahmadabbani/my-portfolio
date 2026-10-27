import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import PageTransition from "./components/portfolio/PageTransition";
import PortfolioLayout from "./components/portfolio/PortfolioLayout";

function LegacyRedirect({ to, fallbackHash = "" }) {
  const { search, hash } = useLocation();
  return <Navigate to={{ pathname: to, search, hash: hash || fallbackHash }} replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <PageTransition>{location => (
        <Routes location={location}>
          <Route path="/" element={<PortfolioLayout />}>
            <Route index element={<HomePage />} />
            <Route path="projects" element={<ProjectsPage />} />
          </Route>
          <Route path="/design-preview" element={<LegacyRedirect to="/" />} />
          <Route path="/design-preview/projects" element={<LegacyRedirect to="/projects" />} />
          <Route path="/contact" element={<LegacyRedirect to="/" fallbackHash="#dp-contact" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      )}</PageTransition>
    </BrowserRouter>
  );
}
