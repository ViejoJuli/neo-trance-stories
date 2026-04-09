import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-12 bg-card border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link to="/" className="text-2xl font-black text-gradient-neon">-1</Link>
            <p className="text-muted-foreground text-sm mt-2">
              DJ & Productor Musical · Neo Trance Cafetero
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">Navegar</h4>
            <div className="space-y-2">
              <Link to="/" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Inicio</Link>
              <Link to="/musica" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Música</Link>
              <Link to="/blog" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Blog</Link>
              <Link to="/tienda" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Tienda</Link>
            </div>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">Conecta</h4>
            <p className="text-sm text-muted-foreground mb-3">contacto@minus1.co</p>
            <div className="flex gap-4">
              <a href="https://www.tiktok.com/@elminusuan" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">TikTok</a>
              <a href="https://www.instagram.com/elminusuan" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">Instagram</a>
              <a href="https://soundcloud.com/elminusuan" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">SoundCloud</a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">© 2026 -1. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Política de privacidad</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Términos y condiciones</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
