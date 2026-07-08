import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import NavBar from "./components/NavBar";
import SiteFooter from "./components/SiteFooter";
import HomeView from "./views/HomeView";
import MuscleBrowseView from "./views/MuscleBrowseView";
import MuscleDetailView from "./views/MuscleDetailView";
import WhyGentleView from "./views/WhyGentleView";
import PracticeView from "./views/PracticeView";
import AboutView from "./views/AboutView";
import "./App.css";

/** Scroll to the top on navigation — settles, doesn't jump, per motion prefs. */
function ScrollReset() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <ScrollReset />
      <NavBar />
      <main id="main">
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/muscles" element={<MuscleBrowseView />} />
          <Route path="/muscles/:id" element={<MuscleDetailView />} />
          <Route path="/why" element={<WhyGentleView />} />
          <Route path="/practice" element={<PracticeView />} />
          <Route path="/about" element={<AboutView />} />
          <Route path="*" element={<HomeView />} />
        </Routes>
      </main>
      <SiteFooter />
    </>
  );
}
