import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShoppingBag, Heart, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SocialHub from "@/components/SocialHub";

const Dashboard = () => {
  const { user, signOut } = useAuth();

  const { data: profile } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase.from("profiles").select("*").eq("user_id", user!.id).single();
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const { data: pedidos } = useQuery({
    queryKey: ["pedidos", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("pedidos")
        .select("*, products(nombre, precio, categoria)")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const { data: favSets } = useQuery({
    queryKey: ["fav_sets", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("favoritos")
        .select("*, sets(titulo, url_soundcloud, descripcion)")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-3xl font-black text-foreground">
                Hola, <span className="text-gradient-neon">{profile?.alias || "Fan"}</span>
              </h1>
              <p className="text-muted-foreground text-sm mt-1">Tu espacio en la comunidad -1</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" asChild>
                <Link to="/perfil"><User className="w-4 h-4 mr-1" /> Perfil</Link>
              </Button>
              <Button variant="ghost" size="sm" onClick={signOut}>
                <LogOut className="w-4 h-4 mr-1" /> Salir
              </Button>
            </div>
          </div>

          {/* Social Hub */}
          <SocialHub />

          {/* Orders */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-primary" /> Mis Pedidos
            </h2>
            {pedidos?.length === 0 ? (
              <div className="rounded-xl bg-card border border-border p-8 text-center">
                <p className="text-muted-foreground">Aún no has hecho ningún pedido.</p>
                <Button variant="hero" size="sm" className="mt-4" asChild>
                  <Link to="/tienda">Ir a la tienda</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {pedidos?.map((pedido) => (
                  <div key={pedido.id} className="rounded-xl bg-card border border-border p-4 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground">{(pedido as any).products?.nombre}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(pedido.created_at).toLocaleDateString("es-CO")} · Cantidad: {pedido.cantidad}
                      </p>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                      pedido.estado === "pendiente" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"
                    }`}>
                      {pedido.estado}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Favorite Sets */}
          <div>
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 text-accent" /> Sets Favoritos
            </h2>
            {favSets?.length === 0 ? (
              <div className="rounded-xl bg-card border border-border p-8 text-center">
                <p className="text-muted-foreground">No tienes sets favoritos aún.</p>
                <Button variant="hero" size="sm" className="mt-4" asChild>
                  <Link to="/musica">Explorar sets</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {favSets?.map((fav) => (
                  <div key={fav.id} className="rounded-xl bg-card border border-border p-4">
                    <p className="font-semibold text-foreground">{(fav as any).sets?.titulo}</p>
                    <p className="text-sm text-muted-foreground mt-1">{(fav as any).sets?.descripcion}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
