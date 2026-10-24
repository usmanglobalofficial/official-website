import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Mail, Phone, MapPin, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import InquiryModal from '@/components/InquiryModal';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Catalogue', href: '/catalogue' },
  { label: 'Our Products', href: '/#products' },
  { label: 'Sorting & Quality', href: '/#sorting' },
  { label: 'Global Reach', href: '/#global' },
  { label: 'Contact Us', href: '/contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <InquiryModal isOpen={isInquiryOpen} onClose={() => setIsInquiryOpen(false)} />
      <header className="fixed top-0 left-0 right-0 z-50 flex flex-col">
        {/* Top bar */}
        <div className="bg-primary text-primary-foreground text-xs py-2 px-4 hidden md:flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="mailto:info@usmanglobal.com" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
              <Mail className="w-3 h-3" /> info@usmanglobal.com
            </a>
            <a href="tel:+971549969994" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
              <Phone className="w-3 h-3" /> +971 54 996 9994
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
            <Link to="/" className="flex items-center gap-2 group">
              <img
                src="https://media.base44.com/images/public/69e988326d6c056fafdd45f7/e40d1aefb_UGLOGO-OFFICIAL.png"
                alt="Usman Global Logo"
                className="w-10 h-10 rounded-lg object-contain group-hover:scale-105 transition-transform"
              />
              <div className="leading-tight">
                <div className="font-bold text-foreground text-sm font-playfair">Usman Global</div>
                <div className="text-muted-foreground text-xs">F.Z.C. — Sharjah, UAE</div>
              </div>
            </Link>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isHash = link.href.startsWith('/#');
                const linkClasses = "px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-secondary";
                return isHash ? (
                  <a key={link.label} href={link.href} className={linkClasses}>
                    {link.label}
                  </a>
                ) : (
                  <Link key={link.label} to={link.href} className={linkClasses}>
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsInquiryOpen(true)}
                className="px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
              >
                Submit Inquiry →
              </button>
            </div>

            {/* Mobile quick action & menu toggle */}
            <div className="lg:hidden flex items-center gap-2">
              <a
                href="tel:+971549969994"
                aria-label="Call +971 54 996 9994"
                className="w-9 h-9 bg-primary/10 text-primary rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
              </a>
              <button
                className="p-2 rounded-lg hover:bg-secondary transition-colors"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle Navigation Menu"
              >
                {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-foreground" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="lg:hidden overflow-hidden bg-white border-t border-border shadow-xl"
              >
                <div className="px-4 py-4 flex flex-col gap-1">
                  {navLinks.map((link) => {
                    const isHash = link.href.startsWith('/#');
                    const mobileClasses = "px-4 py-3 text-sm font-medium text-foreground hover:text-primary hover:bg-secondary rounded-lg transition-colors";
                    return isHash ? (
                      <a
                        key={link.label}
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className={mobileClasses}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        key={link.label}
                        to={link.href}
                        onClick={() => setMenuOpen(false)}
                        className={mobileClasses}
                      >
                        {link.label}
                      </Link>
                    );
                  })}

                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      setIsInquiryOpen(true);
                    }}
                    className="mt-2 w-full px-4 py-3 bg-primary text-primary-foreground text-sm font-semibold rounded-xl text-center shadow-md shadow-primary/20"
                  >
                    Submit Inquiry →
                  </button>

                  {/* Direct Contact strip inside mobile drawer */}
                  <div className="mt-4 pt-4 border-t border-border/80 flex flex-col gap-2.5">
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-1">
                      Direct UAE Contacts
                    </div>
                    <a
                      href="tel:+971549969994"
                      className="flex items-center gap-3 px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl text-sm font-medium text-foreground transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <div className="text-xs text-muted-foreground">Phone Call</div>
                        <div className="font-semibold text-xs sm:text-sm text-foreground">+971 54 996 9994</div>
                      </div>
                    </a>

                    <a
                      href="https://wa.me/971549969994"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-3.5 py-2.5 bg-emerald-50 hover:bg-emerald-100 rounded-xl text-sm font-medium text-emerald-900 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white flex-shrink-0">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <div className="text-xs text-emerald-700">WhatsApp Export Desk</div>
                        <div className="font-semibold text-xs sm:text-sm text-emerald-950">+971 54 996 9994</div>
                      </div>
                    </a>

                    <a
                      href="mailto:info@usmanglobal.com"
                      className="flex items-center gap-3 px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl text-sm font-medium text-foreground transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <div className="text-xs text-muted-foreground">Email Inquiries</div>
                        <div className="font-semibold text-xs sm:text-sm text-foreground">info@usmanglobal.com</div>
                      </div>
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>
    </>
  );
}