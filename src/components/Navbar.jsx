import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Mail, Phone, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Our Products', href: '/#products' },
  { label: 'Sorting & Quality', href: '/#sorting' },
  { label: 'Global Reach', href: '/#global' },
  { label: 'Contact Us', href: '/contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground text-xs py-2 px-4 hidden md:flex items-center justify-between">
        <div className="flex items-center gap-6">
          <a href="mailto:info@usmanglobal.com" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
            <Mail className="w-3 h-3" /> info@usmanglobal.com
          </a>
          <a href="tel:+971528769034" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
            <Phone className="w-3 h-3" /> +971 52 876 9034
          </a>
        </div>
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3 h-3" /> Sharjah, UAE — Free Zone Company
        </div>
      </div>

      {/* Main nav */}
      <nav className={`transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <img
              src="https://media.base44.com/images/public/69e988326d6c056fafdd45f7/e40d1aefb_UGLOGO-OFFICIAL.png"
              alt="Usman Global Logo"
              className="w-10 h-10 rounded-lg object-contain group-hover:scale-105 transition-transform"
            />
            <div className="leading-tight">
              <div className="font-bold text-foreground text-sm font-playfair">Usman Global</div>
              <div className="text-muted-foreground text-xs">F.Z.C. — Sharjah, UAE</div>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-secondary"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href="/contact"
              className="px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            >
              Submit Inquiry →
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button className="lg:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden bg-white border-t border-border"
            >
              <div className="px-4 py-4 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="px-4 py-3 text-sm font-medium text-foreground hover:text-primary hover:bg-secondary rounded-lg transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="mt-2 px-4 py-3 bg-primary text-primary-foreground text-sm font-semibold rounded-lg text-center"
                >
                  Submit Inquiry →
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}