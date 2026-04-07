import { Headphones, Radio, Sparkles, Building2, Globe, Handshake } from "lucide-react";

const userBenefits = [
  {
    icon: Headphones,
    title: "Música con alma",
    description: "Sets diseñados para contar historias, no para llenar silencios. Cada sesión es un viaje.",
  },
  {
    icon: Radio,
    title: "Contenido exclusivo semanal",
    description: "Recibe tendencias de la escena electrónica, procesos creativos y acceso anticipado a nuevos tracks.",
  },
  {
    icon: Sparkles,
    title: "Comunidad auténtica",
    description: "Conecta con personas que valoran la música por encima del espectáculo. Sin poses, solo sonido.",
  },
];

const bizBenefits = [
  {
    icon: Building2,
    title: "Experiencias únicas",
    description: "Lleva a tu espacio una propuesta musical que nadie más ofrece. Neo Trance Cafetero para tu marca.",
  },
  {
    icon: Globe,
    title: "Alcance global, raíces locales",
    description: "Una propuesta que conecta lo mejor de Colombia con las tendencias internacionales del trance.",
  },
  {
    icon: Handshake,
    title: "Colaboraciones a medida",
    description: "Desde eventos corporativos hasta festivales. Creamos juntos la banda sonora perfecta.",
  },
];

const BenefitCard = ({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) => (
  <div className="group p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_hsl(72_100%_50%/0.1)]">
    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
      <Icon className="w-6 h-6 text-primary" />
    </div>
    <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
    <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
  </div>
);

const Benefits = () => {
  return (
    <section id="beneficios" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-2">¿Por qué -1?</p>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground">
            La música es el <span className="text-gradient-neon">mensaje</span>
          </h2>
        </div>

        {/* Users */}
        <div className="mb-16">
          <h3 className="text-center text-accent font-semibold mb-8 tracking-wide uppercase text-sm">Para oyentes</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {userBenefits.map((b) => (
              <BenefitCard key={b.title} {...b} />
            ))}
          </div>
        </div>

        {/* Businesses */}
        <div>
          <h3 className="text-center text-mystic font-semibold mb-8 tracking-wide uppercase text-sm">Para empresas & venues</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {bizBenefits.map((b) => (
              <BenefitCard key={b.title} {...b} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
