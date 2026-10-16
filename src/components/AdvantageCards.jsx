import { motion } from 'framer-motion';

const cards = [
  {
    heading: 'Global Sourcing',
    description: 'Supply from GCC, Europe, the UK, Australia, and wider international markets.',
    image: '',
  },
  {
    heading: 'Regional Processing',
    description: 'Processing and operational presence across the UAE, Malaysia, Turkey, and Pakistan.',
    image: '',
  },
  {
    heading: 'Expert Sorting',
    description: 'Professional grading, inspection, and category-based sorting.',
    image: '',
  },
  {
    heading: 'Quality Assurance',
    description: 'Consistent standards for dependable second-hand supply.',
    image: '',
  },
  {
    heading: 'Reliable Logistics',
    description: 'Efficient packing, loading, and worldwide delivery support.',
    image: '',
  },
  {
    heading: 'Circular Impact',
    description: 'Reuse, repair, and recycling that help reduce textile waste.',
    image: '',
  },
];

export default function AdvantageCards({ images = [] }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {cards.map((card, i) => {
          const bg = images[i] || card.image;
          return (
            <motion.div
              key={card.heading}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="relative rounded-2xl overflow-hidden border border-[#D4C19A]/50 shadow-sm min-h-[420px] flex flex-col items-center justify-center text-center p-4"
              style={bg ? { backgroundImage: `url(${bg})`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundColor: '#FDFBF7' } : { backgroundColor: '#FDFBF7' }}
            >
              <div className="absolute inset-0 bg-[#FDFBF7]/35" />
              <div className="relative z-10 flex flex-col items-center w-full">
                <h3 className="text-base font-bold text-[#1A237E] font-playfair">
                  {card.heading}
                </h3>
                <div className="w-10 h-0.5 bg-[#E67E22] my-2" />
                <p className="text-xs text-[#333333] leading-relaxed max-w-[180px]">
                  {card.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}