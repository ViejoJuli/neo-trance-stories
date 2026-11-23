import { Camera, Sparkles } from "lucide-react";
import { urbanPhotos } from "@/data/urbanPhotos";

const UrbanWall = () => (
  <section id="miradas" className="scroll-mt-16 py-24 bg-[#081416]">
    <div className="container mx-auto px-4 max-w-5xl">
      <div className="max-w-2xl mb-10">
        <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-3">Fotografía urbana</p>
        <h2 className="text-3xl sm:text-4xl font-black text-foreground">
          Fragmentos de <span className="text-gradient-neon">la ciudad</span>
        </h2>
        <p className="text-muted-foreground leading-relaxed mt-5">
          Un muro de miradas: escenas de la calle y pequeñas historias para detenerse,
          observar y encontrar algo distinto en lo cotidiano.
        </p>
      </div>
      {urbanPhotos.length === 0 ? (
        <div className="flex flex-col items-center text-center rounded-2xl border border-dashed border-primary/40 bg-background/50 px-6 py-12">
          <Camera className="text-primary mb-4" aria-hidden="true" size={30} />
          <p className="text-foreground font-semibold">El muro está tomando forma</p>
          <p className="text-sm text-muted-foreground mt-2">Pronto encontrarás aquí fotografías urbanas de -1.</p>
        </div>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5">
          {urbanPhotos.map((photo) => (
            <figure key={photo.src} className="break-inside-avoid mb-5 rounded-xl overflow-hidden border border-primary/20 bg-card">
              <img src={photo.src} alt={photo.alt} loading="lazy" className="block w-full h-auto" />
              <figcaption className="p-4">
                <p className="font-semibold text-foreground flex items-center gap-2"><Sparkles size={14} className="text-primary shrink-0" aria-hidden="true" />{photo.title}</p>
                {photo.story && <p className="text-sm text-muted-foreground mt-2">{photo.story}</p>}
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </div>
  </section>
);

export default UrbanWall;
