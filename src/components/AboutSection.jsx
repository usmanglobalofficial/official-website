import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { useSiteContent } from '@/hooks/useSiteContent';

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
  const { getContent } = useSiteContent();
  const heading = getContent('about', 'heading', 'Large-Scale Used Clothing Sorting & Export Network');
  const bodyText = getContent('about', 'body_text', 'Usman Global F.Z.C. operates large-scale sorting and warehousing facilities in the UAE, supported by operations in Pakistan, Malaysia and Turkey. Our teams grade used clothing, shoes, bags and other reusable goods for consistent wholesale export.');
  return (
    <section id="about" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=600&h=500&fit=crop"
                alt="Clothing sorting facility"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/95 backdrop-blur rounded-2xl p-4 flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-bold text-foreground text-sm">ISO-Grade Sorting Process</div>
                    <div className="text-muted-foreground text-xs">5-step quality assurance system</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats grid — in-flow on all screens */}
            <div className="relative mt-6 grid grid-cols-2 gap-2 bg-primary/5 rounded-2xl p-4 border border-primary/10">
              {stats.map(({ value, suffix, label }) => (
                <div key={label} className="text-center px-2 py-2 sm:px-4 sm:py-3">
                  <div className="text-2xl font-bold text-primary font-playfair">
                    <CountUp end={value} suffix={suffix} />
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:pl-8"
          >
            <div className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">About Company</div>
            <h2 className="text-4xl font-bold text-foreground mb-6 font-playfair leading-tight">
              {heading}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {bodyText}
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              International textile collections are processed through a practical reuse chain: suitable goods are separated by category and quality, repairable items are recovered where possible, recyclable textiles are diverted for further use, and export-ready products are packed for the requirements of different destination markets.
            </p>

            <ul className="space-y-3 mb-8">
              {highlights.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-foreground">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all"
            >
              Get in Touch →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}