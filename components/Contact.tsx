
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ContactProps {
  onBack: () => void;
}

const Contact: React.FC<ContactProps> = ({ onBack }) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      console.log("Form sent to marc.verl@gmx.de");
    }, 1500);
  };

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <button 
          onClick={onBack}
          className="flex items-center space-x-2 text-accent mb-12 hover:translate-x-[-4px] transition-transform"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="font-mono text-sm uppercase tracking-widest">Zurück</span>
        </button>

        {!submitted ? (
          <>
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-12">Lass uns deine <span className="italic text-accent">DNA</span> sichtbar machen.</h1>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-mono uppercase tracking-widest text-slate-500">Dein Name</label>
                  <input required type="text" className="w-full bg-transparent border-b border-white/20 py-4 focus:outline-none focus:border-accent transition-colors" placeholder="Max Mustermann" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-mono uppercase tracking-widest text-slate-500">E-Mail Adresse</label>
                  <input required type="email" className="w-full bg-transparent border-b border-white/20 py-4 focus:outline-none focus:border-accent transition-colors" placeholder="max@impact-brand.de" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-mono uppercase tracking-widest text-slate-500">Dein Projekt / Deine Vision</label>
                <textarea required rows={4} className="w-full bg-transparent border-b border-white/20 py-4 focus:outline-none focus:border-accent transition-colors resize-none" placeholder="Erzähl mir kurz von deinem Unternehmen und was ihr bewirken wollt..."></textarea>
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full md:w-auto px-12 py-5 bg-accent text-pine-dark font-bold text-lg rounded-sm hover:brightness-110 transition-all flex items-center justify-center space-x-3"
              >
                {loading ? (
                   <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <>
                    <span>Anfrage senden</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 bg-pine-medium rounded-xl border border-accent/20"
          >
            <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-4xl font-serif font-bold mb-4">Nachricht erhalten.</h2>
            <p className="text-slate-400 text-xl max-w-md mx-auto">
              Vielen Dank! Ich habe deine Anfrage erhalten und melde mich innerhalb von 24 Stunden bei dir.
            </p>
            <button onClick={onBack} className="mt-12 text-accent font-mono uppercase tracking-widest hover:underline">Zurück zur Startseite</button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Contact;
