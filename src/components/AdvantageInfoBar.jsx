import { motion } from 'framer-motion';
import { Globe, Cog, Globe2 } from 'lucide-react';

const items = [
  {
    icon: Globe,
    title: 'Main Hub: UAE',
    subtitle: 'Large-scale sorting, warehousing and export operations.'
  },
  {
    icon: Globe2,
    title: 'Global Sourcing Network',
    subtitle: 'Trusted access to key markets.',
  },
  {
    icon: Cog,
    title: 'Multi-Region Processing',
    subtitle: 'Strategic presence. Local expertise.',
  },
  {
    icon: Globe,
    title: 'Worldwide Supply',
    subtitle: 'Reliable. Responsible. Everywhere.',
  },
];

export default function AdvantageInfoBar() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-[#1a423a] rounded-[3rem] overflow-hidden"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#c5a059]/30">
          {items.map(({ icon: Icon, title, subtitle }, i) => (
            <div
              key={i}
              className="flex items-center gap-4 px-5 py-6 lg:py-7"
            >
              <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full border border-[#c5a059] flex items-center justify-center flex-shrink-0">
                <Icon className="w-6 h-6 lg:w-7 lg:h-7 text-[#c5a059]" strokeWidth={1.5} />
              </div>
              <div>
                <div className="text-white font-playfair font-bold text-sm lg:text-base leading-tight">
                  {title}
                </div>
                <div className="text-white/70 text-xs lg:text-sm mt-0.5">
                  {subtitle}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}