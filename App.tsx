
import React, { useState } from 'react';
import Header from './components/Header.tsx';
import Hero from './components/Hero.tsx';
import Problem from './components/Problem.tsx';
import Portfolio from './components/Portfolio.tsx';
import About from './components/About.tsx';
import Footer from './components/Footer.tsx';
import CaseDetail from './components/CaseDetail.tsx';
import Contact from './components/Contact.tsx';
import { motion, AnimatePresence } from 'framer-motion';

export type Page = 'home' | 'case-ergo' | 'case-wine' | 'case-conifere' | 'contact';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'case-ergo':
        return <CaseDetail 
          slug="case-ergo"
          title="Branding einer Ergotherapie" 
          category="Health & Empathy"
          description="Entwicklung einer visuellen Identität, die Geborgenheit, Vertrauen und professionelle Heilung ausstrahlt. Weiche, organische Formen treffen auf eine beruhigende Farbpalette."
          images={['https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200', 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?q=80&w=1200']}
          onBack={() => navigateTo('home')}
        />;
      case 'case-wine':
        return <CaseDetail 
          slug="case-wine"
          title="Exclusive Wine Club" 
          category="Luxury & Lifestyle"
          description="Premium Branding für einen exklusiven Wein-Zirkel. Das Design verbindet Tradition mit moderner Exzellenz – minimalistisch, edel und zeitlos."
          images={['https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1200', 'https://images.unsplash.com/photo-1506377247377-2a5b3b0ca7df?q=80&w=1200']}
          onBack={() => navigateTo('home')}
        />;
      case 'case-conifere':
        return <CaseDetail 
          slug="case-conifere"
          title="Innenausstatter Conifere" 
          category="Interior Design"
          description="Markenentwicklung für High-End-Innenausbau. Die DNA des Handwerks wird durch eine strukturierte, natürliche Ästhetik sichtbar gemacht."
          images={['https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200', 'https://images.unsplash.com/photo-1616489953149-805c87900898?q=80&w=1200']}
          onBack={() => navigateTo('home')}
        />;
      case 'contact':
        return <Contact onBack={() => navigateTo('home')} />;
      default:
        return (
          <>
            <Hero onCtaAction={() => navigateTo('contact')} />
            <Problem />
            <Portfolio onSelectCase={(slug) => navigateTo(slug as Page)} />
            <About />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-pine-dark text-slate-200 overflow-x-hidden">
      <Header 
        onCtaClick={() => navigateTo('contact')} 
        onNavigate={navigateTo} 
        currentPage={currentPage}
      />
      
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer onNavigate={navigateTo} />

      {/* Floating CTA for Mobile */}
      <AnimatePresence>
        {currentPage !== 'contact' && (
          <motion.button
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            onClick={() => navigateTo('contact')}
            className="fixed bottom-6 right-6 md:hidden bg-accent text-pine-dark font-semibold px-6 py-4 rounded-full shadow-2xl z-40 flex items-center space-x-2"
          >
            <span>Projekt anfragen</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
