import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SoundCloudEmbed from "@/components/SoundCloudEmbed";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";

const Musica = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const { data: sets, isLoading } = useQuery({
    queryKey: ["sets"],
    queryFn: async () => {
      const { data, error } = await supabase.from("sets").select("*").order("fecha_publicacion", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const { data: favoritos, refetch: refetchFavs } = useQuery({
    queryKey: ["favoritos", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase.from("favoritos").select("set_id").eq("user_id", user.id);
      if (error) throw error;
      return data.map((f) => f.set_id);
    },
    enabled: !!user,
  });

  const toggleFav = async (setId: string) => {
    if (!user) {
      toast({ title: "Inicia sesión para guardar favoritos" });
      return;
    }
    const isFav = favoritos?.includes(setId);
    if (isFav) {
      await supabase.from("favoritos").delete().eq("user_id", user.id).eq("set_id", setId);
    } else {
      await supabase.from("favoritos").insert({ user_id: user.id, set_id: setId });
    }
    refetchFavs();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-2">Neo Player</p>
            <h1 className="text-4xl sm:text-5xl font-black text-foreground">
              Sets & <span className="text-gradient-neon">Sesiones</span>
            </h1>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="max-w-3xl mx-auto space-y-8">
              {sets?.map((set) => (
                <div key={set.id} className="rounded-2xl bg-card border border-border p-6 hover:border-primary/30 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{set.titulo}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{set.descripcion}</p>
                      <p className="text-xs text-primary mt-2">{new Date(set.fecha_publicacion).toLocaleDateString("es-CO", { year: "numeric", month: "long", day: "numeric" })}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => toggleFav(set.id)}>
                      <Heart className={`w-5 h-5 ${favoritos?.includes(set.id) ? "fill-accent text-accent" : "text-muted-foreground"}`} />
                    </Button>
                  </div>
                  <SoundCloudEmbed url={set.url_soundcloud} autoPlay={false} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Musica;
