import { motion } from 'framer-motion';
import { Shirt, Footprints, Gamepad2, ShoppingBag, Sparkles, Recycle, ArrowRight } from 'lucide-react';
import { useSiteContent } from '@/hooks/useSiteContent';

const products = [
  {
    icon: Shirt,
    title: 'Used Clothes',
    desc: 'Sorted by quality: Cream (premium), Export A, B, C grades. Packed in bales, ready for resale worldwide.',
    color: 'bg-blue-50 text-blue-600',
    border: 'hover:border-blue-200',
    img: '/images/products/ug-image-1.jpg',
  },
  {
    icon: Footprints,
    title: 'Used Shoes',
    desc: 'Vintage, Cream, Export A/B/C grades. Securely packed for wholesale buyers across the globe.',
    color: 'bg-amber-50 text-amber-600',
    border: 'hover:border-amber-200',
    img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=250&fit=crop',
  },
  {
    icon: Gamepad2,
    title: 'Used Toys',
    desc: 'Affordable, quality hard and soft toys. Export A grade, packed in cartons, perfect for resale markets.',
    color: 'bg-rose-50 text-rose-600',
    border: 'hover:border-rose-200',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop',
  },
  {
    icon: ShoppingBag,
    title: 'Handbags & Belts',
    desc: 'Carefully sorted branded and unbranded items. Only Export A grade, professionally packed in sacks.',
    color: 'bg-purple-50 text-purple-600',
    border: 'hover:border-purple-200',
    img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=250&fit=crop',
  },
  {
    icon: Sparkles,
    title: 'Vintage Clothes',
    desc: 'Unique vintage pieces with character. Premium quality sorted into Cream and Export A grades.',
    color: 'bg-teal-50 text-teal-600',
    border: 'hover:border-teal-200',
    img: '/images/products/ug-image-5.jpg',
  },
  {
    icon: Recycle,
    title: 'Recycling',
    desc: 'Processed recycled cotton — eco-friendly material ideal for industrial cleaning applications.',
    color: 'bg-green-50 text-green-600',
    border: 'hover:border-green-200',
    img: '/images/products/ug-image-3.jpg',
  },
];

export default function ProductsSection() {
  const { getContent } = useSiteContent();
  const heading = getContent('products', 'heading', 'Wholesale Used Clothing, Shoes, Bags & More');
  const bodyText = getContent('products', 'body_text', 'Source professionally sorted used clothing bales, used shoes, handbags, belts, toys, vintage apparel and recyclable textiles in grades matched to the needs of different wholesale and resale markets.');
  return (
    <section id="products" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">Our Product Range</div>
          <h2 className="text-4xl font-bold text-foreground font-playfair mb-4">{heading}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {bodyText}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`bg-card rounded-2xl overflow-hidden border border-border ${product.border} hover:shadow-xl transition-all duration-300 group`}
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.img}
                  alt={product.title}
                  className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              <div className="p-6">
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${product.color} mb-4`}>
                  <product.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2 font-playfair">{product.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{product.desc}</p>
                <a href="#contact" className="inline-flex items-center gap-1 text-primary text-sm font-semibold hover:gap-2 transition-all">
                  Inquire Now <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}