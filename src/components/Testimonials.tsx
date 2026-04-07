import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Camila Restrepo",
    type: "Oyente",
    quote: "Hacía años que no sentía algo real en un set de electrónica. -1 me devolvió la fe en la escena colombiana.",
  },
  {
    name: "Andrés Velasco",
    type: "Dueño de venue",
    quote: "Desde que trajimos a -1 a nuestro club, la gente viene por la música, no por la botella. Eso no tiene precio.",
  },
  {
    name: "Valentina Cruz",
    type: "Oyente",
    quote: "Neo Trance Cafetero suena a Colombia pero viaja por todo el mundo. Es hipnótico, emocional y completamente único.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-2">Testimonios</p>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground">
            Lo que dicen <span className="text-gradient-neon">ellos</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="relative p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300"
            >
              <Quote className="w-8 h-8 text-primary/30 mb-4" />
              <p className="text-foreground italic leading-relaxed mb-6">"{t.quote}"</p>
              <div>
                <p className="font-bold text-foreground">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.type}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
