import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Globe2, Factory, PackageCheck, Recycle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DirectorsSection from '@/components/DirectorsSection';
import WorldMapSection from '@/components/WorldMapSection';

const capabilities = [
  {
    icon: Globe2,
    title: 'International Sourcing',
    text: 'We source pre-owned textile collections and reusable goods through established supply channels across the GCC, Europe, the United Kingdom, Australia and other international markets.'
  },
  {
    icon: Factory,
    title: 'UAE Sorting & Grading',
    text: 'Our UAE operations sort and grade used clothing, shoes, bags and related reusable goods into market-specific categories for wholesale buyers.'
  },
  {
    icon: PackageCheck,
    title: 'Wholesale Export',
    text: 'Export-ready products are packed for wholesale shipment according to buyer requirements and destination-market demand across Africa, South Asia, the Middle East and other global markets.'
  },
  {
    icon: Recycle,
    title: 'Reuse & Recovery',
    text: 'Where possible, reusable, repairable and recyclable textiles are separated so more material remains in productive use and less textile waste is discarded.'
  },
];

const highlights = [
  'Main sorting and export hub in the United Arab Emirates',
  'Operational presence supporting the business in Pakistan, Malaysia and Mersin, Turkey',
  'Used clothing, footwear, bags and other reusable categories',
  'Sorting, grading, packing and export support for wholesale buyers',
  'Long-term international trade experience in the used textile sector',
];

export default function About() {
  useEffect(() => {
    const title = 'About Us | Used Clothing Exporter UAE | Usman Global';
    const description = 'Learn about Usman Global F.Z.C., a UAE-based wholesale used clothing supplier with international sourcing, large-scale sorting and export operations serving global markets.';
    const canonicalUrl = 'https://usmanglobal.com/about';

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
              <div className="text-primary font-semibold text-sm uppercase tracking-wider mb-4">About Usman Global</div>
              <h1 className="text-4xl md:text-6xl font-bold font-playfair leading-tight mb-6">
                Global Used Clothing Sourcing, Sorting & Wholesale Export
              </h1>
              <p className="text-lg md:text-xl text-white/75 leading-relaxed max-w-3xl">
                Usman Global F.Z.C. is a UAE-based used clothing and reusable-goods business serving international wholesale markets through global sourcing, large-scale sorting and grading, warehousing and export operations.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-14 items-start">
            <div>
              <div className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">Who We Are</div>
              <h2 className="text-3xl md:text-4xl font-bold font-playfair text-foreground mb-6">
                From International Collection Streams to Export-Ready Wholesale Goods
              </h2>
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>
                  Usman Global sources charity collections, pre-owned textiles and other reusable goods from established supply markets including the GCC, Europe, the United Kingdom, Australia and additional international sources.
                </p>
                <p>
                  The UAE is our principal sorting, grading, warehousing and export hub. Incoming goods are separated by category, condition and destination-market requirements before being prepared for wholesale distribution.
                </p>
                <p>
                  Our wider operational network includes facilities and business presence supporting the group in Pakistan, Malaysia and Mersin, Turkey. This network helps us serve buyers across Africa, South Asia, the Middle East and other international markets.
                </p>
                <p>
                  We focus on practical, long-term trade relationships: understanding each market, maintaining consistent grading standards and preparing the right mix of products for each buyer rather than treating used textiles as a single undifferentiated commodity.
                </p>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/10 rounded-3xl p-7 md:p-9">
              <h3 className="text-2xl font-bold font-playfair text-foreground mb-6">Our Operating Model</h3>
              <ul className="space-y-4">
                {highlights.map((item) => (
                  <li key={item} className="flex gap-3 text-foreground leading-relaxed">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-20 bg-secondary/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mb-12">
              <div className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">What We Do</div>
              <h2 className="text-3xl md:text-4xl font-bold font-playfair text-foreground mb-4">A Complete Reuse and Export Chain</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our role extends from international sourcing through sorting and recovery to export preparation for wholesale destination markets.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {capabilities.map(({ icon: Icon, title, text }) => (
                <div key={title} className="bg-white border border-border rounded-2xl p-6 shadow-sm">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg font-playfair text-foreground mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <DirectorsSection />
        <WorldMapSection />

        <section className="py-16 bg-primary text-primary-foreground">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-4">Talk to Us About Your Wholesale Requirements</h2>
            <p className="text-primary-foreground/80 mb-7 max-w-2xl mx-auto">Tell us the products, grades, quantities and destination market you are looking for.</p>
            <Link to="/contact" className="inline-flex px-7 py-3.5 bg-white text-primary font-semibold rounded-xl hover:bg-white/90 transition-colors">
              Contact Us →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
