import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
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
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center pt-20">
        <p className="text-primary font-semibold tracking-[0.3em] uppercase text-sm mb-4 animate-fade-in-up">
          Neo Trance Cafetero
        </p>
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black leading-none mb-6 animate-fade-in-up">
          Más que solo un{" "}
          <span className="text-gradient-neon">DJ</span>
        </h1>
        <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up-delay-1">
          Yo no pincho canciones — cuento historias a través del sonido
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up-delay-2">
          <Button variant="hero" size="lg" className="text-lg px-8 py-6">
            Únete a la comunidad — es gratis
          </Button>
          <Button variant="heroOutline" size="lg" className="text-lg px-8 py-6">
            Escucha uno de mis sets
          </Button>
        </div>

        <p className="text-xs text-muted-foreground mt-6 animate-fade-in-up-delay-3">
          Regístrate y recibe contenido exclusivo cada semana sobre Neo Trance Cafetero
        </p>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
