import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";

const Blog = () => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["blog_posts"],
    queryFn: async () => {
      const { data, error } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-2">Blog</p>
            <h1 className="text-4xl sm:text-5xl font-black text-foreground">
              Bitácora del <span className="text-gradient-neon">Sonido</span>
            </h1>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="max-w-3xl mx-auto space-y-8">
              {posts?.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.id}`}
                  className="block group rounded-2xl bg-card border border-border p-8 hover:border-primary/50 transition-all duration-300"
                >
                  <span className="text-xs font-semibold text-mystic uppercase tracking-wider">{post.categoria}</span>
                  <h2 className="text-2xl font-bold text-foreground mt-2 mb-3 group-hover:text-primary transition-colors">
                    {post.titulo}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">{post.extracto}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.created_at).toLocaleDateString("es-CO", { year: "numeric", month: "long", day: "numeric" })}
                    </span>
                    <span className="text-primary text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                      Leer más <ArrowRight className="w-4 h-4" />
                    </span>
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

export default Blog;
