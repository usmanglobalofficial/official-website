import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { useSiteContent } from '@/hooks/useSiteContent';
import InquiryModal from '@/components/InquiryModal';

function CountUp({ end, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = Math.ceil(end / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, end]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const stats = [
  { value: 35, suffix: '+', label: 'Years Experience' },
  { value: 1700, suffix: '+', label: 'Professionals' },
  { value: 100, suffix: '+', label: 'Containers / Month' },
  { value: 200, suffix: '+', label: 'Tons Sorted Daily' },
];

const highlights = [
  'International sourcing across the GCC, Europe, UK & Australia',
  'High-capacity sorting and grading in the UAE',
  'Market-specific grades and product categories',
  'Wholesale bale and container export',
  'Reuse, repair and recycling to reduce textile waste',
];

export default function AboutSection() {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const { getContent } = useSiteContent();
  const heading = getContent('about', 'heading', 'Large-Scale Used Clothing Sorting & Export Network');
  const bodyText = getContent('about', 'body_text', 'Usman Global F.Z.C. operates large-scale sorting and export facilities in the UAE, supported by operations in Pakistan, Malaysia and Turkey. Our teams grade used clothing, shoes, bags and other reusable goods for consistent wholesale export.');

  return (
    <>
      <InquiryModal isOpen={isInquiryOpen} onClose={() => setIsInquiryOpen(false)} />
      <section id="about" className="py-12 sm:py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Text side - on mobile, appears first so CTA is immediately on front screen */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2 lg:pl-6"
            >
              <div className="text-primary font-semibold text-xs sm:text-sm uppercase tracking-wider mb-2">About Company</div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 font-playfair leading-tight">
                {heading}
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-4">
                {bodyText}
              </p>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-5 hidden sm:block">
                International textile collections are processed through a practical reuse chain: suitable goods are separated by category and quality, repairable items are recovered where possible, recyclable textiles are diverted for further use, and export-ready products are packed for global wholesale distribution.
              </p>

              {/* Instant CTA on first screen for mobile and desktop */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <button
                  type="button"
                  onClick={() => setIsInquiryOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all text-sm shadow-md shadow-primary/20"
                >
                  Make an Inquiry <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="/catalogue"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-secondary text-foreground font-medium rounded-xl hover:bg-secondary/80 transition-all text-sm border border-border"
                >
                  View Catalogue
                </a>
              </div>

              <ul className="space-y-2.5 pt-2 border-t border-border/60">
                {highlights.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-xs sm:text-sm text-foreground">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Image & Stats side */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1 relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/images/products/ug-image-1.jpg"
                  alt="Usman Global clothing sorting and baling facility"
                  className="w-full h-56 sm:h-72 lg:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
                  <div className="bg-white/95 backdrop-blur rounded-2xl p-3 sm:p-4 flex items-center gap-3 sm:gap-4 shadow-lg">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-bold text-foreground text-xs sm:text-sm">ISO-Grade Sorting Process</div>
                      <div className="text-muted-foreground text-[11px] sm:text-xs">5-step quality assurance system</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats grid */}
              <div className="relative mt-4 sm:mt-6 grid grid-cols-2 gap-2 bg-primary/5 rounded-2xl p-3 sm:p-4 border border-primary/10">
                {stats.map(({ value, suffix, label }) => (
                  <div key={label} className="text-center px-2 py-2">
                    <div className="text-xl sm:text-2xl font-bold text-primary font-playfair">
                      <CountUp end={value} suffix={suffix} />
                    </div>
                    <div className="text-[11px] sm:text-xs text-muted-foreground mt-0.5">{label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}