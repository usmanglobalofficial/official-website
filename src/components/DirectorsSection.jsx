import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import { useSiteContent } from '@/hooks/useSiteContent';

const directors = [
  {
    name: 'Muhammad Asif Usman',
    role: 'Founder & Managing Director',
    intro: 'With over 35 years of industry experience, Muhammad Asif Usman is the visionary founder of Usman Global F.Z.C. A pioneer in the second-hand apparel trade, he built the company from the ground up on principles of quality, integrity, and fair trade. His decades of expertise and global network remain the foundation of our continued growth.',
    image: 'https://media.base44.com/images/public/69e988326d6c056fafdd45f7/b4d3e209b_20260803_075158969_iOS.png',
  },
  {
    name: 'Muhammad Talha Asif',
    role: 'Executive Director',
    intro: 'Muhammad Talha Asif, the elder son of our founder, oversees multiple divisions of Usman Global with years of hands-on experience in the trade. His leadership across sourcing, logistics, and quality control ensures that our operations run smoothly and meet the highest standards of excellence.',
    image: 'https://media.base44.com/images/public/69e988326d6c056fafdd45f7/ada2e36a9_20260803_050450078_iOS.png',
  },
  {
    name: 'Maaz Asif Usman',
    role: 'Regional Director',
    intro: 'Maaz Asif Usman manages our operations across multiple regions, expanding Usman Global\u2019s reach into new international markets. His dedication to building strong client relationships and ensuring reliable supply chains keeps our global network running seamlessly.',
    image: 'https://media.base44.com/images/public/69e988326d6c056fafdd45f7/1276a01c7_20260803_063547817_iOS.png',
  },
];

export default function DirectorsSection() {
  const { getContent } = useSiteContent();
  const heading = getContent('directors', 'heading', 'Meet Our Directors');
  const bodyText = getContent('directors', 'body_text', 'The experienced leadership guiding Usman Global F.Z.C. with decades of combined expertise in the second-hand apparel industry.');
  return (
    <section id="directors" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider mb-3">
            <Users className="w-4 h-4" /> Our Leadership
          </div>
          <h2 className="text-4xl font-bold text-foreground font-playfair mb-3">
            {heading}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {bodyText}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {directors.map((d, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-all"
            >
              <div className="aspect-[4/5] bg-secondary overflow-hidden">
                {d.image ? (
                  <img src={d.image} alt={d.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                    Director Photo
                  </div>
                )}
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-foreground font-playfair">{d.name}</h3>
                <div className="text-primary text-sm font-medium mt-1">{d.role}</div>
                <div className="w-10 h-0.5 bg-accent mx-auto my-3" />
                <p className="text-muted-foreground text-sm leading-relaxed">{d.intro}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}