import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const TIKTOK_PROFILE = "https://www.tiktok.com/@elminusuan";

const Reflections = () => {
  const [showEmbed, setShowEmbed] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    if (!showEmbed) return;

    const script = document.createElement("script");
    script.src = "https://www.tiktok.com/embed.js";
    script.async = true;
    script.onerror = () => setLoadError(true);
    document.body.appendChild(script);

    return () => {
      script.onerror = null;
      script.remove();
    };
  }, [showEmbed]);

  return (
    <section id="reflexiones" className="scroll-mt-16 py-24 bg-background">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-3">Palabras que conectan</p>
            <h2 className="text-3xl sm:text-4xl font-black text-foreground">
              Reflexiones para <span className="text-gradient-neon">el camino</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mt-5">
              Más allá de la música, comparto reflexiones y mensajes de esperanza
              y motivación. Te invito a descubrirlos en TikTok.
            </p>
            <a href={TIKTOK_PROFILE} target="_blank" rel="noopener noreferrer" className="inline-block mt-6 text-primary underline underline-offset-4 hover:text-foreground">
              Visitar @elminusuan en TikTok ↗
            </a>
          </div>
          <div className="min-w-0 rounded-2xl border border-primary/30 bg-card p-5 sm:p-8">
            {!showEmbed ? (
              <div className="text-center space-y-4">
                <p className="font-mono text-primary text-sm">[ REFLEXIONES // TIKTOK ]</p>
                <p className="text-sm text-muted-foreground">
                  Carga el perfil para explorar sus videos aquí. Al hacerlo, se conectará con TikTok.
                </p>
                <Button variant="heroOutline" onClick={() => setShowEmbed(true)}>Cargar videos de TikTok</Button>
              </div>
            ) : (
              <>
                {loadError && (
                  <p role="status" className="text-sm text-muted-foreground mb-4">
                    No se pudo cargar TikTok aquí. Puedes visitar el perfil con el enlace.
                  </p>
                )}
                <div className="overflow-x-auto">
                  <blockquote
                    className="tiktok-embed"
                    cite={TIKTOK_PROFILE}
                    data-unique-id="elminusuan"
                    data-embed-from="oembed"
                    data-embed-type="creator"
                    style={{ maxWidth: 780, minWidth: 288 }}
                  >
                    <section>
                      <a href={TIKTOK_PROFILE} target="_blank" rel="noopener noreferrer">Ver @elminusuan en TikTok</a>
                    </section>
                  </blockquote>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reflections;
