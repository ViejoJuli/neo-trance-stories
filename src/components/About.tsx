import { Sparkles } from "lucide-react";
import elLoco from "@/assets/el-loco.webp";

const About = () => {
  return (
    <section id="sobre-mi" className="relative overflow-hidden scroll-mt-16 py-24 bg-[#081416]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_25%_45%,rgba(0,255,170,0.12),transparent_45%),radial-gradient(ellipse_at_85%_20%,rgba(190,40,170,0.12),transparent_40%)]"
      />
      <div className="container relative mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-2">Sobre mí</p>
            <h2 className="text-3xl sm:text-4xl font-black text-foreground">
              El artista detrás del <span className="text-gradient-neon">sonido</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative mx-auto w-full max-w-[23rem] px-4 py-6">
              <div aria-hidden="true" className="absolute inset-x-0 top-1/2 aspect-square -translate-y-1/2 rounded-full border border-primary/30 shadow-[0_0_60px_rgba(0,255,170,0.15)]" />
              <div aria-hidden="true" className="absolute inset-x-5 top-1/2 aspect-square -translate-y-1/2 rounded-full border border-dashed border-primary/20" />
              <div className="relative overflow-hidden rounded-xl border border-primary/60 bg-background p-1 shadow-[0_0_30px_rgba(0,255,170,0.22)]">
                <img
                  src={elLoco}
                  alt="Ilustración de -1 como la carta de tarot El Loco, acompañado de un perro"
                  width={768}
                  height={1152}
                  loading="lazy"
                  className="block h-auto w-full rounded-lg"
                />
              </div>
              <div aria-hidden="true" className="absolute -right-1 bottom-8 flex h-12 w-12 items-center justify-center rounded-full border border-primary/60 bg-[#081416] text-primary shadow-[0_0_20px_rgba(223,255,0,0.3)] animate-float">
                <Sparkles size={20} />
              </div>
            </div>

            {/* Text */}
            <div className="space-y-6">
              <p className="text-foreground leading-relaxed">
                Soy <strong className="text-primary">-1</strong>, DJ y productor musical colombiano. 
                Nací en la escena del hard techno pero siempre sentí que algo faltaba: 
                <em className="text-accent"> la historia</em>. Mientras otros se enfocaban en el BPM y el merchandising, 
                yo buscaba la emoción detrás de cada frecuencia.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Así nació el <strong className="text-primary">Neo Trance Cafetero</strong>: un género que fusiona 
                la profundidad del trance clásico con las raíces sonoras de Colombia. Cada set es un viaje emocional, 
                cada track una historia que merece ser contada.
              </p>
              <blockquote className="border-l-4 border-primary pl-4 py-2">
                <p className="text-foreground italic font-medium">
                  "No hago esto por fama. Lo hago porque la música dejó de hablar — y alguien tiene que devolverle la voz."
                </p>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
