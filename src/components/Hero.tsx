import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";
import { MatrixBackground } from "@/components/audio-reactive/MatrixBackground";
import { useRadio } from "@/components/Radio";

const Hero = () => {
  const { openRadio } = useRadio();

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="DJ performing in underground club with neon lights"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/75 via-background/60 to-background" />
      </div>

      <MatrixBackground bassFrequency={0} contained />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center pt-28 pb-24">
        <p className="text-primary font-semibold tracking-[0.3em] uppercase text-sm mb-4 animate-fade-in-up">
          Neo Trance Cafetero
        </p>
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black leading-none mb-6 animate-fade-in-up">
          Más que solo un{" "}
          <span className="text-gradient-neon">DJ</span>
        </h1>
        <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up-delay-1">
          Cuento historias a través del sonido
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up-delay-2">
          <Button variant="heroOutline" size="lg" className="text-lg px-8 py-6 animate-heartbeat" asChild>
            <Link to="/musica">Escucha mis sets</Link>
          </Button>
          <Button variant="hero" size="lg" className="text-lg px-8 py-6 animate-heartbeat" asChild>
            <Link to="/auth">Únete a la comunidad — es gratis</Link>
          </Button>
        </div>

        <p className="text-xs text-muted-foreground mt-6 animate-fade-in-up-delay-3">
          Un espacio para conectar a través de la música y las historias
        </p>

        <nav aria-label="Explorar la experiencia" className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 font-mono text-xs uppercase tracking-wider text-primary">
          <button type="button" onClick={openRadio} className="hover:text-foreground">[ Música ]</button>
          <a href="#reflexiones" className="hover:text-foreground">[ Reflexiones ]</a>
          <a href="#miradas" className="hover:text-foreground">[ Fotografía ]</a>
          <Link to="/blog" className="hover:text-foreground">[ Blog ]</Link>
          <a href="#contacto" className="hover:text-foreground">[ Contacto ]</a>
        </nav>

      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
