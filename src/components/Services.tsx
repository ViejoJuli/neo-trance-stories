import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Comunidad",
    price: "Gratis",
    description: "Acceso a la comunidad y contenido semanal",
    features: [
      "Boletín semanal exclusivo",
      "Acceso a sets en SoundCloud",
      "Blog de procesos creativos",
      "Comunidad en Discord",
    ],
    variant: "heroOutline" as const,
    popular: false,
  },
  {
    name: "Insider",
    price: "$9/mes",
    description: "Contenido premium y acceso anticipado",
    features: [
      "Todo del plan Comunidad",
      "Sets exclusivos no publicados",
      "Behind the scenes en video",
      "Acceso anticipado a merch",
      "Q&A mensual en vivo",
    ],
    variant: "hero" as const,
    popular: true,
  },
  {
    name: "Colaboración",
    price: "Personalizado",
    description: "Para venues, marcas y eventos especiales",
    features: [
      "Sets a medida para tu evento",
      "Producción musical personalizada",
      "Branding sonoro",
      "Consultoría de experiencia musical",
      "Contenido para redes sociales",
    ],
    variant: "heroOutline" as const,
    popular: false,
  },
];

const Services = () => {
  return (
    <section id="servicios" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-2">Servicios</p>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground">
            Encuentra tu <span className="text-gradient-neon">frecuencia</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 border transition-all duration-300 hover:scale-[1.02] ${
                plan.popular
                  ? "bg-card border-primary/50 shadow-[0_0_40px_hsl(72_100%_50%/0.15)]"
                  : "bg-card border-border hover:border-muted-foreground/30"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full">
                  Popular
                </div>
              )}
              <h3 className="text-xl font-bold text-foreground mb-1">{plan.name}</h3>
              <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
              <p className="text-3xl font-black text-foreground mb-6">{plan.price}</p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button variant={plan.variant} className="w-full">
                {plan.price === "Personalizado" ? "Contáctame" : "Empezar"}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
