import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/lib/auth";

const navLinks = [
  { label: "Inicio", href: "/" },
  { label: "Música", href: "/musica" },
  { label: "Blog", href: "/blog" },
  { label: "Tienda", href: "/tienda" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="text-2xl font-black text-gradient-neon tracking-tight">
          -1
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <Button variant="hero" size="sm" asChild>
              <Link to="/dashboard">Mi Espacio</Link>
            </Button>
          ) : (
            <Button variant="hero" size="sm" asChild>
              <Link to="/auth">Únete</Link>
            </Button>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-lg border-b border-border px-4 pb-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2"
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <Button variant="hero" size="sm" className="w-full" asChild>
              <Link to="/dashboard" onClick={() => setIsOpen(false)}>Mi Espacio</Link>
            </Button>
          ) : (
            <Button variant="hero" size="sm" className="w-full" asChild>
              <Link to="/auth" onClick={() => setIsOpen(false)}>Únete</Link>
            </Button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
