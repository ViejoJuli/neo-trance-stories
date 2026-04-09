import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const categorias = ["Todos", "Ropa", "Accesorios", "Digital"];

const Tienda = () => {
  const [filtro, setFiltro] = useState("Todos");

  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const filtered = filtro === "Todos" ? products : products?.filter((p) => p.categoria === filtro);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-2">Marketplace</p>
            <h1 className="text-4xl sm:text-5xl font-black text-foreground">
              La Tienda <span className="text-gradient-neon">Cafetera</span>
            </h1>
          </div>

          {/* Filters */}
          <div className="flex justify-center gap-3 mb-12 flex-wrap">
            {categorias.map((cat) => (
              <Button
                key={cat}
                variant={filtro === cat ? "hero" : "outline"}
                size="sm"
                onClick={() => setFiltro(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {filtered?.map((product) => (
                <Link
                  key={product.id}
                  to={`/tienda/${product.id}`}
                  className="group rounded-2xl bg-card border border-border overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_hsl(72_100%_50%/0.1)]"
                >
                  <div className="aspect-square bg-muted flex items-center justify-center overflow-hidden">
                    <ShoppingBag className="w-16 h-16 text-muted-foreground/30 group-hover:text-primary/40 transition-colors" />
                  </div>
                  <div className="p-6">
                    <span className="text-xs text-primary font-semibold uppercase tracking-wider">{product.categoria}</span>
                    <h3 className="text-lg font-bold text-foreground mt-1 mb-2">{product.nombre}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{product.descripcion}</p>
                    <p className="text-2xl font-black text-foreground">
                      {product.precio === 0 ? "Gratis" : `$${product.precio.toLocaleString("es-CO")}`}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Tienda;
