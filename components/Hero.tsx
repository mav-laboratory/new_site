
import React from 'react';
import { motion } from 'framer-motion';

interface HeroProps {
  onCtaQuiz: () => void;
  onCtaContact: () => void;
}

const Hero: React.FC<HeroProps> = ({ onCtaQuiz, onCtaContact }) => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-8xl font-serif font-bold leading-tight mb-8">
              Design für den <span className="text-accent italic">Wandel.</span> <br />
              Ich mache nachhaltige Werte sichtbar.
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-slate-400 font-light mb-12 leading-relaxed"
          >
            Exklusives Branding für Unternehmen mit ökologischem Impact. Ich mache die <span className="text-white italic">DNA deiner Marke</span> sichtbar.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <button 
              onClick={onCtaQuiz}
              className="bg-accent text-pine-dark px-10 py-5 rounded-sm font-bold text-lg hover:brightness-110 transition-all shadow-xl shadow-accent/20"
            >
              Start dein Brand-Check (60s)
            </button>
            <button 
              onClick={onCtaContact}
              className="flex items-center justify-center px-10 py-5 border border-white/10 rounded-sm font-medium hover:bg-white/5 transition-all text-lg"
            >
              Kontakt aufnehmen
            </button>
          </motion.div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 1.2 }}
        className="absolute bottom-10 right-10 hidden lg:block"
      >
        <div className="flex flex-col items-end opacity-20 pointer-events-none">
          <span className="text-9xl font-serif font-bold italic">Impact</span>
          <span className="text-9xl font-serif font-bold">First.</span>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
