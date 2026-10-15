import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { regionIcons } from './RegionIcons';
import { useSiteContent } from '@/hooks/useSiteContent';

const regions = [
  'Africa', 'Australia', 'Malaysia', 'Turkey', 'Pakistan', 'GCC', 'Europe', 'UK',
];

export default function WorldMapSection() {
  const { getContent } = useSiteContent();
  const heading = getContent('global', 'heading', 'Used Clothing Supply & Export Across Global Markets');
  const statement = getContent('global', 'body_text', 'From our UAE hub and operations in Pakistan, Malaysia and Mersin, Turkey, Usman Global serves wholesale buyers across Africa, South Asia, the Middle East and other international markets, supported by a broad sourcing network across the GCC, Europe, the UK and Australia.');
  return (
    <section id="global" className="py-20 bg-[#0b1121] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 text-[#2d9766] font-semibold text-sm uppercase tracking-wider mb-3">
            <Globe className="w-4 h-4" /> Global Sourcing, Operations & Markets
          </div>
          <h2 className="text-4xl font-bold text-white font-playfair mb-4">
            {heading}
          </h2>
        </motion.div>

        {/* Regions grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-10"
        >
          {regions.map((name, i) => {
            const Icon = regionIcons[name];
            return (
              <motion.div
                key={name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-black border border-[#2d9766]/40 rounded-2xl py-4 px-2 text-center flex flex-col items-center shadow-md"
              >
                <div className="mb-3">
                  {Icon ? <Icon /> : null}
                </div>
                <div className="text-white font-semibold text-sm">{name}</div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Statement */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-white/70 max-w-3xl mx-auto text-center text-lg leading-relaxed mb-12"
        >
          {statement}
        </motion.p>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: 'UAE', label: 'Main Sorting Hub' },
            { value: 'Multi', label: 'Country Operations' },
            { value: 'Global', label: 'Export Markets' },
            { value: '35+', label: 'Years Experience' },
          ].map(({ value, label }) => (
            <div key={label} className="bg-white/5 border border-[#252d3a] rounded-2xl p-5 text-center">
              <div className="text-3xl font-bold text-[#2d9766] font-playfair">{value}</div>
              <div className="text-white/50 text-sm mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}