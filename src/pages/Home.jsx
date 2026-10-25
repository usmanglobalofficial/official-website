import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ProductsSection from '../components/ProductsSection';
import SortingSection from '../components/SortingSection';
import WhyChooseUs from '../components/WhyChooseUs';
import WorldMapSection from '../components/WorldMapSection';
import TestimonialsSection from '../components/TestimonialsSection';
import DirectorsSection from '../components/DirectorsSection';
import BlogSection from '../components/BlogSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import SeoManager from '../components/SeoManager';

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <SeoManager />
      <Navbar />
      <main className="pt-[64px]">
        <HeroSection />
        <AboutSection />
        {/* <DirectorsSection /> — temporarily hidden */}
        <ProductsSection />
        <SortingSection />
        <WhyChooseUs />
        <WorldMapSection />
        <TestimonialsSection />
        <BlogSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}