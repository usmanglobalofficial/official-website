import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Globe, Package, Truck, Loader2, Factory } from 'lucide-react';
import { useSiteContent } from '@/hooks/useSiteContent';
import InquiryModal from '@/components/InquiryModal';

const DEFAULT_VIDEO_URL = "https://media.base44.com/videos/public/69e988326d6c056fafdd45f7/af5412872_CO-Virtual-Tour.mp4";

const VIDEO_SOURCES = [
  { label: 'Factory 1', url: 'https://media.base44.com/videos/public/69e988326d6c056fafdd45f7/c22eeaf2d_WhatsAppVideo2026-09-22at115900AM.mp4' },
  { label: 'Factory 2', url: '/videos/factory-2.webm' },
];

const VIDEO_COVER_ICONS = [Factory, Factory];

export default function HeroSection() {
  const [activeVideo, setActiveVideo] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const currentVideo = VIDEO_SOURCES[activeVideo].url;
  const { getContent } = useSiteContent();
  const heading = getContent('home', 'heading', 'Wholesale Used Clothing Supplier & Exporter in UAE');
  const subtitle = getContent('home', 'body_text', 'Usman Global F.Z.C. sources pre-owned clothing and textile collections from Europe, the UK, Australia, the GCC and other markets, then sorts, grades and packs them in our UAE facilities for wholesale export to Africa, Asia and worldwide destinations.');

  const handleTabClick = (i) => {
    setVideoLoaded(false);
    setActiveVideo(i);
  };

  return (
    <>
    <InquiryModal isOpen={isInquiryOpen} onClose={() => setIsInquiryOpen(false)} />
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-primary/80">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Decorative blobs */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-primary/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 lg:py-32 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 border border-primary/30 rounded-full text-primary-foreground/80 text-xs sm:text-sm font-medium mb-6">
            <Globe className="w-4 h-4 text-primary" />
            UAE Used Clothing Sorting & Wholesale Export
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5 font-playfair">
            {heading}
          </h1>
          <p className="text-white/75 text-sm sm:text-base md:text-lg leading-relaxed mb-8 max-w-lg">
            {subtitle}
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => setIsInquiryOpen(true)}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/20"
            >
              Make an Inquiry <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#products"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all border border-white/20"
            >
              Our Products
            </a>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-white/10">
            {[
              { icon: Package, value: '35+', label: 'Years Experience' },
              { icon: Truck, value: '100+', label: 'Containers / Month' },
              { icon: Globe, value: 'Many', label: 'Countries Around the World' },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="text-center">
                <Icon className="w-5 h-5 text-primary mx-auto mb-1" />
                <div className="text-2xl font-bold text-white font-playfair">{value}</div>
                <div className="text-white/50 text-xs">{label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Visual card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12 lg:mt-0"
        >
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl overflow-hidden">
              {/* Video selector */}
              <div className="flex flex-wrap gap-1 p-3 bg-black/30 border-b border-white/10">
                {VIDEO_SOURCES.map((v, i) => (
                  <button
                    key={v.label}
                    onClick={() => handleTabClick(i)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      activeVideo === i
                        ? 'bg-primary text-white'
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
              {/* Video area */}
              <div className="relative w-full h-80 bg-slate-800/60">
                <AnimatePresence>
                  {!videoLoaded && (
                    <motion.div
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-800/80 z-10"
                    >
                      {(() => {
                        const Icon = VIDEO_COVER_ICONS[activeVideo];
                        return Icon ? <Icon className="w-12 h-12 text-primary/60" /> : null;
                      })()}
                      <div className="text-white/80 text-sm font-medium">
                        Loading {VIDEO_SOURCES[activeVideo].label}…
                      </div>
                      <Loader2 className="w-6 h-6 text-primary animate-spin" />
                    </motion.div>
                  )}
                </AnimatePresence>
                <video
                  key={currentVideo}
                  src={currentVideo}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  onLoadedData={() => setVideoLoaded(true)}
                  onWaiting={() => setVideoLoaded(false)}
                  onPlaying={() => setVideoLoaded(true)}
                />
              </div>

              <div className="p-6 grid grid-cols-2 gap-4">
                {[
                  { label: 'Daily Sort', value: '200+ Tons' },
                  { label: 'Professionals', value: '1700+' },
                  { label: 'Quality Grades', value: 'Cream, A, B, C' },
                  { label: 'Origin', value: 'Many Parts of the World' },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-white/10 rounded-xl p-3">
                    <div className="text-white/60 text-xs">{label}</div>
                    <div className="text-white font-bold mt-0.5">{value}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 bg-accent text-accent-foreground rounded-2xl px-4 py-3 shadow-xl">
              <div className="text-xs font-medium">Est. 35+ years</div>
              <div className="text-lg font-bold font-playfair">Trusted</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="text-white/40 text-xs">Scroll to explore</div>
        <div className="w-5 h-8 border-2 border-white/20 rounded-full flex justify-center pt-1.5">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-1.5 bg-white/60 rounded-full"
          />
        </div>
      </div>
    </section>
    </>
  );
}