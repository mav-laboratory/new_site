
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Quiz from './components/Quiz';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Footer from './components/Footer';
import CaseDetail from './components/CaseDetail';
import Contact from './components/Contact';
import { motion, AnimatePresence } from 'framer-motion';

export type Page = 'home' | 'case-ergo' | 'case-wine' | 'case-conifere' | 'contact';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [showQuiz, setShowQuiz] = useState(false);

  const toggleQuiz = () => setShowQuiz(!showQuiz);

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
          images={['https://picsum.photos/1200/800?random=10', 'https://picsum.photos/1200/800?random=11']}
          onBack={() => navigateTo('home')}
        />;
      case 'case-wine':
        return <CaseDetail 
          slug="case-wine"
          title="Exclusive Wine Club" 
          category="Luxury & Lifestyle"
          description="Premium Branding für einen exklusiven Wein-Zirkel. Das Design verbindet Tradition mit moderner Exzellenz – minimalistisch, edel und zeitlos."
          images={['https://picsum.photos/1200/800?random=12', 'https://picsum.photos/1200/800?random=13']}
          onBack={() => navigateTo('home')}
        />;
      case 'case-conifere':
        return <CaseDetail 
          slug="case-conifere"
          title="Innenausstatter Conifere" 
          category="Interior Design"
          description="Markenentwicklung für High-End-Innenausbau. Die DNA des Handwerks wird durch eine strukturierte, natürliche Ästhetik sichtbar gemacht."
          images={['https://picsum.photos/1200/800?random=14', 'https://picsum.photos/1200/800?random=15']}
          onBack={() => navigateTo('home')}
        />;
      case 'contact':
        return <Contact onBack={() => navigateTo('home')} />;
      default:
        return (
          <>
            <Hero onCtaQuiz={toggleQuiz} onCtaContact={() => navigateTo('contact')} />
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
        onCtaClick={toggleQuiz} 
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
        
        <div id="quiz-section">
          <Quiz isOpen={showQuiz} onClose={() => setShowQuiz(false)} />
        </div>
      </main>

      <Footer onNavigate={navigateTo} />

      {/* Floating CTA for Mobile */}
      <motion.button
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={toggleQuiz}
        className="fixed bottom-6 right-6 md:hidden bg-accent text-pine-dark font-semibold px-6 py-3 rounded-full shadow-2xl z-40 flex items-center space-x-2"
      >
        <span>Brand Check starten</span>
      </motion.button>
    </div>
  );
};

export default App;
