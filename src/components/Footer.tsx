const Footer = () => {
  return (
    <footer id="contacto" className="py-12 bg-card border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <span className="text-2xl font-black text-gradient-neon">-1</span>
            <p className="text-muted-foreground text-sm mt-2">
              DJ & Productor Musical · Neo Trance Cafetero
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">Links</h4>
            <div className="space-y-2">
              <a href="#inicio" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Inicio</a>
              <a href="#beneficios" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Beneficios</a>
              <a href="#sobre-mi" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Sobre mí</a>
              <a href="#servicios" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Servicios</a>
            </div>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">Contacto</h4>
            <p className="text-sm text-muted-foreground mb-3">contacto@minus1.co</p>
            <div className="flex gap-4">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Instagram</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">SoundCloud</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">TikTok</a>
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
