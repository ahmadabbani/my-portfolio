import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import "../../styles/portfolio.css";

export default function PortfolioLayout() {
  const projects = useLocation().pathname.replace(/\/$/, "").endsWith("/projects");
  return (
    <div className={`portfolio${projects ? " pp-page" : ""}`}>
      <a className="dp-skip" href="#dp-main">Skip to content</a>
      <Header homePath={projects ? "/" : ""} />
      <div className="pt-route-content"><Outlet /></div>
    </div>
  );
}
