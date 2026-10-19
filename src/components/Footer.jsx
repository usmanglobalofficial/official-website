import { Link } from 'react-router-dom';
import { Globe, Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Music2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="https://media.base44.com/images/public/69e988326d6c056fafdd45f7/e40d1aefb_UGLOGO-OFFICIAL.png"
                alt="Usman Global Logo"
                className="w-10 h-10 rounded-lg object-contain"
              />
              <div>
                <div className="font-bold text-white font-playfair">Usman Global F.Z.C.</div>
                <div className="text-xs text-white/40">Sharjah, UAE</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-5">
              UAE-based wholesale used clothing supplier with international sourcing, large-scale sorting and export support for buyers across global markets.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/usmanglobalofficial/' },
                { Icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/usmanglobal/' },
                { Icon: Music2, label: 'TikTok', href: 'https://tiktok.com/@usmanglobalofficial' },
                { Icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/company/usmanglobal/' },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-bold mb-4 font-playfair">Our Products</h4>
            <ul className="space-y-2 text-sm">
              {['Used Clothes', 'Used Shoes', 'Used Toys', 'Handbags & Belts', 'Vintage Clothes', 'Recycling / Rags'].map(item => (
                <li key={item}>
                  <a href="/#products" className="hover:text-primary transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-bold mb-4 font-playfair">Company</h4>
            <ul className="space-y-2 text-sm">
              {[
                ['About Us', '/about'],
                ['Catalogue & Reels', '/catalogue'],
                ['Sorting & Quality Control', '/#sorting'],
                ['Global Trade & Logistics', '/#global'],
                ['Contact Us', '/contact'],
                ['News & Insights', '/#blog'],
              ].map(([item, href]) => (
                <li key={item}>
                  {href.startsWith('/#') ? (
                    <a href={href} className="hover:text-primary transition-colors">{item}</a>
                  ) : (
                    <Link to={href} className="hover:text-primary transition-colors">{item}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-4 font-playfair">Get In Touch</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>USMAN GLOBAL FZC<br />PLOT # 4D 01C-13<br />HAMRIYAH FREE ZONE PHASE II<br />SHARJAH UNITED ARAB EMIRATES</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <a href="tel:+971528769034" className="hover:text-primary transition-colors">+971 52 876 9034</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <a href="mailto:info@usmanglobal.com" className="hover:text-primary transition-colors">info@usmanglobal.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/30">
          <div>© {new Date().getFullYear()} Usman Global F.Z.C. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <Link to="/admin" className="hover:text-white transition-colors">Admin</Link>
            <span className="flex items-center gap-1">
              <Globe className="w-3 h-3" /> Serving wholesale buyers worldwide
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}