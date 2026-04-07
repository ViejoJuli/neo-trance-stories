import { Button } from "@/components/ui/button";

const CtaFinal = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-mystic/5 blur-3xl" />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-5xl font-black text-foreground mb-4">
          La música volvió a <span className="text-gradient-neon">hablar</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-xl mx-auto mb-10">
          Si estás buscando algo real en la escena electrónica, este es el momento de dar el paso.
        </p>
        <Button variant="neon" size="lg" className="text-lg px-10 py-6 animate-pulse-glow">
          Quiero ser parte — es gratis
        </Button>
      </div>
    </section>
  );
};

export default CtaFinal;
