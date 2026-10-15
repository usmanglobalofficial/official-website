import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { useSiteContent } from '@/hooks/useSiteContent';

const testimonials = [
  {
    name: 'Mr. Ali Hudroge',
    country: 'Sierra Leone',
    flag: '🇸🇱',
    quote: 'I have read a lot about your company and also about the happy customers who are dealing with you. The quality and service have been outstanding.',
    rating: 5,
  },
  {
    name: 'Mr. Bahaa Shouman',
    country: 'Egypt',
    flag: '🇪🇬',
    quote: 'We came to know about your name through one of your customers, and we learned that you are one of the best shippers of second-hand clothing.',
    rating: 5,
  },
  {
    name: 'Mr. Clement',
    country: 'Cameroon',
    flag: '🇨🇲',
    quote: 'So many people in Cameroon are interested in your products that my phone is ringing day and night. Amazing quality and reliable delivery!',
    rating: 5,
  },
  {
    name: 'Mr. Emmanuel K.',
    country: 'Ghana',
    flag: '🇬🇭',
    quote: 'Consistent quality every shipment. The sorting process is top-notch and our customers are always satisfied with the merchandise we receive.',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const { getContent } = useSiteContent();
  const heading = getContent('testimonials', 'heading', 'Genuine Testimonials');
  const bodyText = getContent('testimonials', 'body_text', 'We proudly share feedback from clients who value our commitment to quality and service across the globe.');
  return (
    <section id="testimonials" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">Trusted Voices</div>
          <h2 className="text-4xl font-bold text-foreground font-playfair mb-4">{heading}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {bodyText}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-2xl p-7 border border-border hover:shadow-lg transition-shadow relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-3xl" />
              <Quote className="w-8 h-8 text-primary/20 mb-4" />
              <p className="text-foreground leading-relaxed mb-6 italic">"{t.quote}"</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-primary/10 rounded-full flex items-center justify-center text-xl">
                    {t.flag}
                  </div>
                  <div>
                    <div className="font-bold text-foreground text-sm">{t.name}</div>
                    <div className="text-muted-foreground text-xs">{t.country}</div>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {Array(t.rating).fill(0).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}