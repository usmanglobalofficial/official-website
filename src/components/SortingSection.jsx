import { motion } from 'framer-motion';
import { ArrowRight, ArrowDown, Leaf } from 'lucide-react';
import { useSiteContent } from '@/hooks/useSiteContent';

const processSteps = [
  { id: 1,  title: 'Community Collection',    image: 'https://media.base44.com/images/public/69e988326d6c056fafdd45f7/b99115e51_1.png' },
  { id: 2,  title: 'Trusted Service',          image: 'https://media.base44.com/images/public/69e988326d6c056fafdd45f7/2499f67c4_ChatGPTImageAug3202601_42_04PM.png' },
  { id: 3,  title: 'Local Drop-Off',          image: 'https://media.base44.com/images/public/69e988326d6c056fafdd45f7/2623159dd_3.png' },
  { id: 4,  title: '1st Sorting',             image: 'https://media.base44.com/images/public/69e988326d6c056fafdd45f7/2660bcca2_4.png' },
  { id: 5,  title: 'Repair',                  image: 'https://media.base44.com/images/public/69e988326d6c056fafdd45f7/cc9bcc4a0_5.png' },
  { id: 6,  title: 'Recycling',                image: 'https://media.base44.com/images/public/69e988326d6c056fafdd45f7/4d1b42aa4_6.png' },
  { id: 7,  title: 'Factory Processing',       image: 'https://media.base44.com/images/public/69e988326d6c056fafdd45f7/af9026515_7.png' },
  { id: 8,  title: 'Fine Sorting & Grading',   image: 'https://media.base44.com/images/public/69e988326d6c056fafdd45f7/1c5512dd1_8.png' },
  { id: 9,  title: 'Packing & Loading',        image: 'https://media.base44.com/images/public/69e988326d6c056fafdd45f7/56904e2dc_9.png' },
  { id: 10, title: 'Global Reuse',             image: 'https://media.base44.com/images/public/69e988326d6c056fafdd45f7/58e479f94_10.png' },
];

export default function SortingSection() {
  const { getContent } = useSiteContent();
  const heading = getContent('sorting', 'heading', 'From Community Collection to Global Reuse');
  const bodyText = getContent('sorting', 'body_text', 'A circular process that supports communities, creates jobs, and reduces textile waste — spanning 10 stages across the worldwide Usman Global network.');
  return (
    <section id="sorting" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider mb-3">
            <Leaf className="w-4 h-4" /> Our Process Cycle
          </div>
          <h2 className="text-4xl font-bold text-foreground font-playfair mb-4">
            {heading}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {bodyText}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
          {processSteps.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="relative group"
            >
              <div className="relative rounded-2xl overflow-hidden border border-border bg-white shadow-sm hover:shadow-xl transition-all hover:-translate-y-1">
                <img
                  src={step.image}
                  alt={`Step ${step.id}: ${step.title}`}
                  loading="lazy"
                  className="w-full h-auto aspect-square object-cover"
                />
              </div>

              {/* Flow arrow to next step (desktop cycle only) */}
              {step.id < 10 && (
                <div className="hidden lg:flex absolute top-1/2 -right-3 md:-right-4 -translate-y-1/2 z-10 w-7 h-7 md:w-8 md:h-8 items-center justify-center rounded-full bg-primary text-white shadow-md">
                  {step.id === 5 ? <ArrowDown className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Cycle indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 flex items-center justify-center gap-3 text-muted-foreground text-sm"
        >
          <span className="h-px w-12 bg-border" />
          <ArrowRight className="w-4 h-4 text-primary" />
          <span className="font-medium">A continuous cycle — from local collection back to global reuse</span>
          <ArrowRight className="w-4 h-4 text-primary" />
          <span className="h-px w-12 bg-border" />
        </motion.div>
      </div>
    </section>
  );
}