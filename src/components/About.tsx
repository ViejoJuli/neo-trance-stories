const About = () => {
  return (
    <section id="sobre-mi" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-2">Sobre mí</p>
            <h2 className="text-3xl sm:text-4xl font-black text-foreground">
              El artista detrás del <span className="text-gradient-neon">sonido</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Visual element */}
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 via-mystic/20 to-secondary overflow-hidden border border-border">
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-9xl font-black text-gradient-neon opacity-80">-1</span>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center animate-float">
                <span className="text-3xl">🇨🇴</span>
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
