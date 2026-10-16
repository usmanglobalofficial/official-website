import { motion } from 'framer-motion';
import AdvantageCards from './AdvantageCards';
import AdvantageInfoBar from './AdvantageInfoBar';
import { useSiteContent } from '@/hooks/useSiteContent';

const ADVANTAGE_IMAGES = [
  'https://media.base44.com/images/public/69e988326d6c056fafdd45f7/f27199ec7_11.png',
  'https://media.base44.com/images/public/69e988326d6c056fafdd45f7/f5cba3d0e_12.png',
  'https://media.base44.com/images/public/69e988326d6c056fafdd45f7/2af622eec_13.png',
  'https://media.base44.com/images/public/69e988326d6c056fafdd45f7/94482ae90_14.png',
  'https://media.base44.com/images/public/69e988326d6c056fafdd45f7/5348b4a20_15.png',
  'https://media.base44.com/images/public/69e988326d6c056fafdd45f7/cfeca8bd5_16.png',
];

export default function WhyChooseUs() {
  const { getContent } = useSiteContent();
  const heading = getContent('why', 'heading', 'Why Choose Usman Global?');
  const bodyText = getContent('why', 'body_text', 'Globally sourced, expertly processed, and quality controlled for dependable second-hand textile supply.');
  const DIVIDER_URL = 'https://media.base44.com/images/public/69e988326d6c056fafdd45f7/57934dacf_image.png';
  const MAP_URL = 'https://media.base44.com/images/public/69e988326d6c056fafdd45f7/e8a97eed5_ChatGPTImageAug3202601_53_22PM.png';

  return (
    <section
      id="why"
      className="w-full bg-[#FDFBF7]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <img
            src={DIVIDER_URL}
            alt="Our Advantage"
            className="h-10 mx-auto mb-2"
          />
          <h2 className="text-3xl lg:text-4xl font-bold text-[#0B1D2E] font-playfair mb-1">
            {heading}
          </h2>
          <p className="text-[#555555] mx-auto text-sm whitespace-normal sm:whitespace-nowrap">
            {bodyText}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-4 rounded-2xl overflow-hidden border border-[#D4C19A]/60 shadow-sm"
        >
          <img
            src={MAP_URL}
            alt="Global sourcing network connecting markets to the GCC hub"
            className="w-[60%] block mx-auto"
          />
        </motion.div>
      </div>

      <AdvantageCards images={ADVANTAGE_IMAGES} />
      <AdvantageInfoBar />
    </section>
  );
}