import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import About from "@/components/About";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import CtaFinal from "@/components/CtaFinal";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Benefits />
      <About />
      <Services />
      <Testimonials />
      <CtaFinal />
      <Footer />
    </div>
  );
};

export default Index;
