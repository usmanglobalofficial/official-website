import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { ArrowLeft, Loader2, Calendar, User } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    base44.entities.BlogPost
      .filter({ slug, status: 'published' })
      .then(records => setPost(records[0] || null))
      .catch(() => setPost(null))
      .finally(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    if (!post) return;

    const title = post.seo_title || `${post.title} | Usman Global`;
    const description = post.meta_description || post.excerpt || '';
    const canonicalUrl = `https://usmanglobal.com/blog/${post.slug}`;

    const setMeta = (selector, attr, value, content) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, value);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    document.title = title;
    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[name="robots"]', 'name', 'robots', 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1');
    if (post.keywords) setMeta('meta[name="keywords"]', 'name', 'keywords', post.keywords);
    setMeta('meta[property="og:type"]', 'property', 'og:type', 'article');
    setMeta('meta[property="og:title"]', 'property', 'og:title', title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    if (post.cover_image_url) setMeta('meta[property="og:image"]', 'property', 'og:image', post.cover_image_url);
    setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', post.cover_image_url ? 'summary_large_image' : 'summary');
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    let structured = document.getElementById('blog-article-structured-data');
    if (!structured) {
      structured = document.createElement('script');
      structured.id = 'blog-article-structured-data';
      structured.type = 'application/ld+json';
      document.head.appendChild(structured);
    }
    structured.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description,
      image: post.cover_image_url || undefined,
      datePublished: post.created_date,
      dateModified: post.updated_date || post.created_date,
      author: post.author ? { '@type': 'Person', name: post.author } : { '@type': 'Organization', name: 'Usman Global F.Z.C.' },
      publisher: { '@type': 'Organization', name: 'Usman Global F.Z.C.', url: 'https://usmanglobal.com/' },
      mainEntityOfPage: canonicalUrl,
    });
  }, [post]);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <main className="pt-[96px] md:pt-[112px]">
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : !post ? (
          <div className="max-w-2xl mx-auto px-4 py-32 text-center">
            <h1 className="text-3xl font-bold font-playfair text-foreground mb-4">Post Not Found</h1>
            <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
            <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-all">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
          </div>
        ) : (
          <article className="py-16 bg-background">
            <div className="max-w-3xl mx-auto px-4 sm:px-6">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Home
              </Link>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl font-bold font-playfair text-foreground mb-4 leading-tight">
                  {post.title}
                </h1>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
                  {post.author && (
                    <span className="inline-flex items-center gap-1.5">
                      <User className="w-4 h-4" /> {post.author}
                    </span>
                  )}
                  {post.created_date && (
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.created_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  )}
                </div>

                {post.cover_image_url && (
                  <img
                    src={post.cover_image_url}
                    alt={post.title}
                    className="w-full h-64 sm:h-96 object-cover rounded-2xl mb-8"
                  />
                )}

                <div
                  className="prose prose-lg max-w-none text-foreground leading-relaxed [&_p]:mb-4 [&_h2]:font-playfair [&_h2]:font-bold [&_h2]:text-2xl [&_h2]:mt-8 [&_h2]:mb-3 [&_h3]:font-playfair [&_h3]:font-semibold [&_h3]:text-xl [&_h3]:mt-6 [&_h3]:mb-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_a]:text-primary [&_a]:underline [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: post.body_html || '' }}
                />
              </motion.div>
            </div>
          </article>
        )}
      </main>
      <Footer />
    </div>
  );
}