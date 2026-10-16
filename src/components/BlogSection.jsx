import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { ArrowRight, Newspaper, Loader2 } from 'lucide-react';

export default function BlogSection() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.BlogPost
      .filter({ status: 'published' }, '-created_date', 3)
      .then(res => {
        if (Array.isArray(res)) {
          setPosts(res);
        } else {
          setPosts([]);
        }
      })
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-center">
          <Loader2 className="w-6 h-6 text-primary animate-spin" />
        </div>
      </section>
    );
  }

  if (!Array.isArray(posts) || posts.length === 0) return null;

  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider mb-3">
            <Newspaper className="w-4 h-4" /> News &amp; Insights
          </div>
          <h2 className="text-4xl font-bold text-foreground font-playfair mb-4">Latest from Our Blog</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Updates, industry insights, and stories from the world of second-hand apparel.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={`/blog/${post.slug}`}
                className="block bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative overflow-hidden h-48">
                  {post.cover_image_url ? (
                    <img
                      src={post.cover_image_url}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                      <Newspaper className="w-10 h-10 text-primary/30" />
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-2 font-playfair group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                    {post.excerpt || 'Read more...'}
                  </p>
                  <div className="flex items-center gap-2 mt-4 text-primary text-sm font-semibold">
                    Read More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}