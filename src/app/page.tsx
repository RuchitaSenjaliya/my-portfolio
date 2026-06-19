'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import ProductProcess from '@/components/ProductProcess';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Certifications from '@/components/Certifications';
import DeveloperDashboard from '@/components/DeveloperDashboard';
import ArtShowcase from '@/components/ArtShowcase';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import PageLoader from '@/components/PageLoader';
import AIAssistant from '@/components/AIAssistant';
import TerminalMode from '@/components/TerminalMode';
import RecruiterModal from '@/components/RecruiterModal';

export default function Home() {
  const [portfolioMode, setPortfolioMode] = useState<'code' | 'canvas'>('code');
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);

  return (
    <>
      {/* Dynamic Introduction Preloader */}
      <PageLoader />

      {/* Floating Scroll-to-Top Toggle Button */}
      <ScrollToTop />

      {/* Floating AI Chatbot Assistant */}
      <AIAssistant isOpen={isAIAssistantOpen} setIsOpen={setIsAIAssistantOpen} />

      {/* Floating Retro CLI Terminal Console */}
      <TerminalMode isOpen={isTerminalOpen} setIsOpen={setIsTerminalOpen} />

      {/* Floating Recruiter Modal Badge */}
      <RecruiterModal />

      {/* Primary Sticky Header with Switcher Props */}
      <Navbar 
        portfolioMode={portfolioMode} 
        setPortfolioMode={setPortfolioMode} 
        isTerminalOpen={isTerminalOpen}
        setIsTerminalOpen={setIsTerminalOpen}
        isAIAssistantOpen={isAIAssistantOpen}
        setIsAIAssistantOpen={setIsAIAssistantOpen}
      />

      {/* Main Single Page Sections */}
      <main className="flex-1">
        <Hero portfolioMode={portfolioMode} />

        {/* Conditional Layouts based on active persona */}
        {portfolioMode === 'code' ? (
          <>
            <About />
            <Skills />
            <ProductProcess />
            <Experience />
            <Projects />
            <Certifications />
            <DeveloperDashboard />
          </>
        ) : (
          <ArtShowcase />
        )}

        {/* Contact form */}
        <Contact />
      </main>

      {/* Footer Branding Map */}
      <Footer />
    </>
  );
}
