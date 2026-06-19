import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Certifications from '@/components/Certifications';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import PageLoader from '@/components/PageLoader';

export default function Home() {
  return (
    <>
      {/* Dynamic Introduction Preloader */}
      <PageLoader />

      {/* Floating Scroll-to-Top Toggle Button */}
      <ScrollToTop />

      {/* Primary Sticky Header */}
      <Navbar />

      {/* Main Single Page Sections */}
      <main className="flex-1">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <Contact />
      </main>

      {/* Footer Branding Map */}
      <Footer />
    </>
  );
}
