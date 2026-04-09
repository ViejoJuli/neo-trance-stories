import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import SocialHub from "@/components/SocialHub";

const Perfil = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [alias, setAlias] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("*").eq("user_id", user.id).single().then(({ data }) => {
      if (data) {
        setAlias(data.alias || "");
        setCiudad(data.ciudad || "");
      }
    });
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from("profiles").update({ alias, ciudad }).eq("user_id", user!.id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "¡Perfil actualizado!" });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-md">
          <h1 className="text-3xl font-black text-foreground mb-8 text-center">Mi <span className="text-gradient-neon">Perfil</span></h1>

          <div className="bg-card border border-border rounded-2xl p-8">
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Alias / Nombre de fan</label>
                <Input value={alias} onChange={(e) => setAlias(e.target.value)} placeholder="Tu alias" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Ciudad</label>
                <Input value={ciudad} onChange={(e) => setCiudad(e.target.value)} placeholder="¿De dónde eres?" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
                <Input value={user?.email || ""} disabled className="opacity-50" />
              </div>
              <Button variant="hero" className="w-full" disabled={loading}>
                {loading ? "Guardando..." : "Guardar cambios"}
              </Button>
            </form>
          </div>

          <div className="mt-8">
            <SocialHub />
          </div>

          <Button variant="ghost" className="w-full mt-4" onClick={() => navigate("/dashboard")}>
            Volver al dashboard
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Perfil;
