import { useEffect } from 'react';
import { Mail, Phone, MapPin, MessageSquare, Globe2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const contacts = [
  {
    icon: Mail,
    label: 'Email',
    value: 'info@usmanglobal.com',
    href: 'mailto:info@usmanglobal.com',
    note: 'Wholesale and business enquiries',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+971 52 876 9034',
    href: 'tel:+971528769034',
    note: 'United Arab Emirates',
  },
  {
    icon: MessageSquare,
    label: 'WhatsApp',
    value: '+971 50 477 1371',
    href: 'https://wa.me/971504771371',
    note: 'Quick product and shipment enquiries',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'USMAN GLOBAL FZC, PLOT # 4D 01C-13, HAMRIYAH FREE ZONE PHASE II, SHARJAH, UNITED ARAB EMIRATES',
    href: null,
    note: 'Main UAE operations',
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
      <main className="pt-[96px] md:pt-[112px]">
        <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-primary/80 text-white py-20 md:py-28">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="max-w-4xl">
              <div className="text-primary font-semibold text-sm uppercase tracking-wider mb-4">Contact Usman Global</div>
              <h1 className="text-4xl md:text-6xl font-bold font-playfair leading-tight mb-6">
                Wholesale Used Clothing & Export Enquiries
              </h1>
              <p className="text-lg md:text-xl text-white/75 leading-relaxed max-w-3xl">
                Contact our UAE team for used clothing, shoes, bags and reusable-goods wholesale enquiries, product availability, grades, packing requirements and export destinations.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-14 items-start">
              <div>
                <div className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">Get In Touch</div>
                <h2 className="text-3xl md:text-4xl font-bold font-playfair text-foreground mb-5">
                  Tell Us What Your Market Needs
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-7">
                  For a useful quotation or availability reply, please tell us the product categories you need, preferred grade, approximate quantity and destination country or port. Our team can then respond with the most relevant options.
                </p>

                <div className="bg-primary/5 border border-primary/10 rounded-3xl p-7">
                  <h3 className="text-xl font-bold font-playfair text-foreground mb-4">Helpful enquiry details</h3>
                  <ul className="space-y-3 text-sm text-foreground">
                    {[
                      'Product category: clothing, shoes, bags, toys, vintage or recycling grades',
                      'Required grade or quality level',
                      'Approximate quantity or container requirement',
                      'Destination country and preferred port',
                      'Any special packing or market requirements',
                    ].map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {contacts.map(({ icon: Icon, label, value, href, note }) => {
                  const content = (
                    <div className="h-full bg-secondary/40 border border-border rounded-2xl p-6 hover:border-primary/30 transition-colors">
                      <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{label}</div>
                      <div className="font-semibold text-foreground break-words">{value}</div>
                      <div className="text-xs text-muted-foreground mt-2">{note}</div>
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
          </div>
        </section>

        <section className="py-18 md:py-20 bg-slate-950 text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <Globe2 className="w-10 h-10 text-primary mx-auto mb-5" />
            <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-4">Serving Wholesale Buyers Across Global Markets</h2>
            <p className="text-white/65 max-w-2xl mx-auto mb-7">
              Usman Global supports international buyers from its UAE sorting and export operations with wider business presence across Pakistan, Malaysia and Turkey.
            </p>
            <a href="mailto:info@usmanglobal.com" className="inline-flex px-7 py-3.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors">
              Email Our Team →
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
