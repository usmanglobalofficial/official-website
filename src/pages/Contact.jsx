import { useEffect } from 'react';
import { Mail, Phone, MapPin, MessageSquare, Globe2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactSection from '@/components/ContactSection';

const contacts = [
  {
    icon: Phone,
    label: 'Call Direct',
    value: '+971 54 996 9994',
    href: 'tel:+971549969994',
    note: 'UAE Export Office',
  },
  {
    icon: MessageSquare,
    label: 'WhatsApp Export Desk',
    value: '+971 54 996 9994',
    href: 'https://wa.me/971549969994',
    note: 'Instant container & bale quotes',
  },
  {
    icon: Mail,
    label: 'Email Inquiries',
    value: 'info@usmanglobal.com',
    href: 'mailto:info@usmanglobal.com',
    note: 'Wholesale and business tenders',
  },
  {
    icon: MapPin,
    label: 'Main Facility Location',
    value: 'USMAN GLOBAL FZC, PLOT # 4D 01C-13, HAMRIYAH FREE ZONE PHASE II, SHARJAH, UNITED ARAB EMIRATES',
    href: null,
    note: 'Sharjah, UAE Free Zone',
  },
];

export default function Contact() {
  useEffect(() => {
    const title = 'Contact Us | Used Clothing Wholesale UAE | Usman Global';
    const description = 'Contact Usman Global F.Z.C. in Sharjah, UAE for wholesale used clothing, shoes, bags, bale and container supply, export inquiries and sourcing requirements.';
    const canonicalUrl = 'https://usmanglobal.com/contact';

    document.title = title;
    const setMeta = (selector, attr, value, content) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, value);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };
    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[name="robots"]', 'name', 'robots', 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1');
    setMeta('meta[property="og:title"]', 'property', 'og:title', title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <Navbar />
      <main className="pt-[64px]">
        {/* Header Hero */}
        <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-primary/80 text-white py-14 sm:py-20 md:py-28">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="max-w-4xl">
              <div className="text-primary font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3">Contact Usman Global</div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-playfair leading-tight mb-4 sm:mb-6">
                Wholesale Used Clothing & Export Enquiries
              </h1>
              <p className="text-sm sm:text-base md:text-xl text-white/75 leading-relaxed max-w-3xl mb-6">
                Contact our UAE team for wholesale used clothing, shoes, bags and reusable goods. For quick replies, reach us directly via WhatsApp or submit the form below.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="tel:+971549969994"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 font-semibold rounded-xl hover:bg-white/90 transition-all text-sm shadow-md"
                >
                  <Phone className="w-4 h-4 text-primary" /> Call: +971 54 996 9994
                </a>
                <a
                  href="https://wa.me/971549969994"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-all text-sm shadow-md shadow-emerald-900/30"
                >
                  <MessageSquare className="w-4 h-4" /> WhatsApp: +971 54 996 9994
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Contact info grid */}
        <section className="py-12 sm:py-16 bg-white border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {contacts.map(({ icon: Icon, label, value, href, note }) => {
                const content = (
                  <div className="h-full bg-secondary/40 border border-border rounded-2xl p-5 hover:border-primary/40 hover:bg-secondary/70 transition-all">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1 font-semibold">{label}</div>
                    <div className="font-bold text-foreground text-sm sm:text-base break-words">{value}</div>
                    <div className="text-xs text-muted-foreground mt-1.5">{note}</div>
                  </div>
                );

                return href ? (
                  <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined}>
                    {content}
                  </a>
                ) : (
                  <div key={label}>{content}</div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Interactive Inquiry Form */}
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
