import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ProductDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*").eq("id", id!).single();
      if (error) throw error;
      return data;
    },
  });

  const handleOrder = async () => {
    if (!user) {
      navigate("/auth");
      return;
    }
    const { error } = await supabase.from("pedidos").insert({
      user_id: user.id,
      producto_id: product!.id,
      cantidad: 1,
    });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: product!.precio === 0 ? "¡Reclamado!" : "¡Pedido creado!", description: "Revisa tu dashboard para ver el estado." });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Button variant="ghost" className="mb-8" onClick={() => navigate("/tienda")}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Volver a la tienda
          </Button>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="aspect-square rounded-2xl bg-card border border-border flex items-center justify-center">
              <ShoppingBag className="w-24 h-24 text-muted-foreground/20" />
            </div>
            <div>
              <span className="text-xs text-primary font-semibold uppercase tracking-wider">{product.categoria}</span>
              <h1 className="text-3xl font-black text-foreground mt-2 mb-4">{product.nombre}</h1>
              <p className="text-muted-foreground leading-relaxed mb-6">{product.descripcion}</p>
              <p className="text-4xl font-black text-foreground mb-2">
                {product.precio === 0 ? "Gratis" : `$${product.precio.toLocaleString("es-CO")}`}
              </p>
              <p className="text-sm text-muted-foreground mb-8">
                {product.stock > 0 ? `${product.stock} disponibles` : "Agotado"}
              </p>
              <Button
                variant="hero"
                size="lg"
                className="w-full"
                disabled={product.stock <= 0}
                onClick={handleOrder}
              >
                {product.precio === 0 ? "Reclamar gratis" : "Pedir ahora"}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
