import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import About from "@/components/About";
import Reflections from "@/components/Reflections";
import UrbanWall from "@/components/UrbanWall";
import Testimonials from "@/components/Testimonials";
import CtaFinal from "@/components/CtaFinal";
import Footer from "@/components/Footer";
import { MatrixBackground } from "@/components/audio-reactive/MatrixBackground";

const Index = () => {
  const [showIntro, setShowIntro] = useState(
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const [introLeaving, setIntroLeaving] = useState(false);

  useEffect(() => {
    if (!showIntro) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handlePreferenceChange = () => {
      if (preference.matches) setShowIntro(false);
    };
    const fadeTimer = window.setTimeout(() => setIntroLeaving(true), 1800);
    const endTimer = window.setTimeout(() => setShowIntro(false), 2500);
    preference.addEventListener("change", handlePreferenceChange);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(endTimer);
      preference.removeEventListener("change", handlePreferenceChange);
    };
  }, [showIntro]);

  return (
    <div className="min-h-screen bg-background">
      {showIntro && (
        <div
          aria-hidden="true"
          data-testid="matrix-intro"
          className={`fixed inset-0 z-[60] bg-[#020805] pointer-events-none transition-opacity duration-700 ${introLeaving ? "opacity-0" : "opacity-100"}`}
        >
          <MatrixBackground bassFrequency={0} contained />
        </div>
      )}
      <Navbar />
      <Hero />
      <Benefits />
      <About />
      <Reflections />
      <UrbanWall />
      <Testimonials />
      <CtaFinal />
      <Footer />
    </div>
  );
};

export default Index;
