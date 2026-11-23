import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, ChevronUp, Radio as RadioIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import SoundCloudEmbed from "@/components/SoundCloudEmbed";

const DEFAULT_SET_URL = "https://soundcloud.com/elminusuan/el-3ero-neo-trance-cafetero";

interface RadioContextValue {
  openRadio: () => void;
  playSet: (url: string) => void;
}

const RadioContext = createContext<RadioContextValue | null>(null);

export const useRadio = () => {
  const context = useContext(RadioContext);
  if (!context) throw new Error("useRadio debe usarse dentro de RadioProvider");
  return context;
};

export const RadioProvider = ({ children }: { children: ReactNode }) => {
  const [expanded, setExpanded] = useState(false);
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);
  const { data: featuredSet, isPending, isError } = useQuery({
    queryKey: ["featured_set"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("sets")
        .select("*")
        .eq("destacado", true)
        .limit(1)
        .maybeSingle();
      if (error) {
        console.error("No se pudo consultar el set destacado:", error);
        throw error;
      }
      return data;
    },
  });

  useEffect(() => {
    if (!isPending || isError) {
      setCurrentUrl((current) => current ?? (featuredSet?.url_soundcloud || DEFAULT_SET_URL));
    }
  }, [featuredSet, isPending, isError]);

  const openRadio = () => setExpanded(true);
  const playSet = (url: string) => {
    setCurrentUrl(url);
    setExpanded(true);
  };

  return (
    <RadioContext.Provider value={{ openRadio, playSet }}>
      <div className="pb-20">{children}</div>
      <aside aria-label="Radio Neo Trance" className="fixed bottom-4 right-4 z-50 w-[calc(100%-2rem)] max-w-sm rounded-xl border border-primary/40 bg-background/95 shadow-[0_0_30px_rgba(0,255,65,0.2)] backdrop-blur-md">
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          aria-controls="radio-controls"
          className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-primary hover:text-foreground"
        >
          <span className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider">
            <RadioIcon size={16} aria-hidden="true" /> Frecuencia Neo Trance
          </span>
          <span className="flex items-center gap-1 text-xs">
            {expanded ? "Ocultar" : "Abrir"}
            {expanded ? <ChevronDown size={16} aria-hidden="true" /> : <ChevronUp size={16} aria-hidden="true" />}
          </span>
        </button>
        <div id="radio-controls" hidden={!expanded} className="px-4 pb-4">
          {currentUrl ? (
            <SoundCloudEmbed url={currentUrl} autoPlay />
          ) : (
            <p className="text-sm text-muted-foreground" role="status">Cargando la radio...</p>
          )}
          <p className="text-xs text-muted-foreground mt-3">
            Si tu navegador bloquea el sonido automático, pulsa play para escuchar.
          </p>
          <a href="https://soundcloud.com/elminusuan" target="_blank" rel="noopener noreferrer" className="inline-block mt-3 text-xs text-foreground underline underline-offset-4 hover:text-primary">
            Explorar SoundCloud ↗
          </a>
        </div>
      </aside>
    </RadioContext.Provider>
  );
};
