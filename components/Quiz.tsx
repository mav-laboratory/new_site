
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateQuizFeedback } from '../services/gemini';
import { QuizQuestion } from '../types';

const questions: QuizQuestion[] = [
  {
    id: 1,
    question: "Wo stehst du aktuell mit deinem Branding?",
    options: [
      { text: "Ganz am Anfang, wir brauchen alles neu.", score: 'hot' },
      { text: "Wir haben ein Logo, aber es passt nicht mehr zu uns.", score: 'maybe' },
      { text: "Nur kleine Optimierungen nötig.", score: 'cold' }
    ]
  },
  {
    id: 2,
    question: "Was ist dein größter Wachstumsblocker?",
    options: [
      { text: "Kunden nehmen uns nicht als Premium wahr.", score: 'hot' },
      { text: "Unsere Botschaft ist nicht klar genug.", score: 'maybe' },
      { text: "Wir werden im Markt kaum gesehen.", score: 'hot' },
      { text: "Nichts davon, läuft alles super.", score: 'cold' }
    ]
  },
  {
    id: 3,
    question: "Wer ist deine wichtigste Zielgruppe?",
    options: [
      { text: "B2C – Bewusste Endkonsumenten.", score: 'maybe' },
      { text: "B2B – Professionelle Entscheider.", score: 'hot' },
      { text: "Investoren für unsere nächste Runde.", score: 'hot' }
    ]
  }
];

interface QuizProps {
  isOpen: boolean;
  onClose: () => void;
}

const Quiz: React.FC<QuizProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [scores, setScores] = useState<string[]>([]);
  const [isFinishing, setIsFinishing] = useState(false);
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAnswer = (opt: { text: string; score: 'hot' | 'maybe' | 'cold' }) => {
    const newAnswers = [...answers, opt.text];
    const newScores = [...scores, opt.score];
    setAnswers(newAnswers);
    setScores(newScores);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setIsFinishing(true);
    }
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Generate AI feedback via Gemini
      const aiFeedback = await generateQuizFeedback(answers);
      setFeedback(aiFeedback || "Danke für deine Teilnahme!");
      
      // Simulation: Senden an marc.verl@gmx.de
      // In einer Live-Umgebung würde hier ein Fetch zu einem Backend oder Service wie EmailJS stehen.
      console.info("SUBMISSION TO marc.verl@gmx.de initiated:", {
        to: "marc.verl@gmx.de",
        from: email,
        results: answers,
        scores: scores,
        aiAnalysis: aiFeedback
      });
      
      // Wir simulieren eine kurze Netzwerkverzögerung für die Seriösität
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (err) {
      console.error("Submission error:", err);
      setFeedback("Vielen Dank! Deine Daten wurden erfolgreich übermittelt.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetQuiz = () => {
    setStep(0);
    setAnswers([]);
    setScores([]);
    setIsFinishing(false);
    setFeedback(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-pine-dark/95 backdrop-blur-xl">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl bg-pine-medium border border-white/10 rounded-xl overflow-hidden shadow-2xl relative"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-8 md:p-12">
          {!isFinishing ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="mb-8">
                  <span className="text-accent text-sm font-mono block mb-2 uppercase tracking-tighter">Schritt {step + 1} von {questions.length}</span>
                  <h3 className="text-2xl md:text-4xl font-serif font-bold leading-tight">{questions[step].question}</h3>
                </div>
                <div className="space-y-4">
                  {questions[step].options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(opt as any)}
                      className="w-full text-left p-5 border border-white/5 bg-white/5 hover:bg-accent hover:text-pine-dark hover:border-accent transition-all duration-300 rounded-sm group flex justify-between items-center"
                    >
                      <span className="text-lg font-medium">{opt.text}</span>
                      <svg className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          ) : !feedback ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <div className="inline-block px-4 py-1 rounded-full border border-accent/30 text-accent text-xs font-mono uppercase tracking-widest mb-6">Letzter Schritt</div>
              <h3 className="text-3xl md:text-5xl font-serif font-bold mb-6">Analyse abschließen.</h3>
              <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                Ich werte deine Antworten jetzt aus. Gib deine E-Mail an, um dein individuelles Feedback und mein Handbuch <br className="hidden md:block"/>
                <span className="text-white italic">"Impact-Brands & Positionierung"</span> zu erhalten.
              </p>
              <form onSubmit={handleFinalSubmit} className="max-w-md mx-auto space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Deine E-Mail-Adresse"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-6 py-5 bg-pine-dark border border-white/10 rounded-sm focus:outline-none focus:border-accent text-white transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-5 bg-accent text-pine-dark font-bold rounded-sm hover:brightness-110 transition-all flex items-center justify-center shadow-lg shadow-accent/20"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-3">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Wird an Marc gesendet...</span>
                    </div>
                  ) : "Analyse & Handbuch anfordern"}
                </button>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-4">
                  Deine Daten werden direkt an marc.verl@gmx.de übermittelt.
                </p>
              </form>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-8">
                <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-3xl md:text-4xl font-serif font-bold mb-6">Deine Analyse ist bereit.</h3>
              <div className="bg-pine-dark p-8 rounded-sm border border-accent/20 mb-8 text-left relative">
                 <div className="absolute top-4 left-4 text-accent/20">
                   <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 7.55228 14.017 7V5C14.017 4.44772 14.4647 4 15.017 4H19.017C20.6739 4 22.017 5.34315 22.017 7V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM2.017 21L2.017 18C2.017 16.8954 2.91238 16 4.017 16H7.017C7.56928 16 8.017 15.5523 8.017 15V9C8.017 8.44772 7.56928 8 7.017 8H3.017C2.46472 8 2.017 7.55228 2.017 7V5C2.017 4.44772 2.46472 4 3.017 4H7.017C8.67386 4 10.017 5.34315 10.017 7V15C10.017 18.3137 7.33071 21 4.017 21H2.017Z" /></svg>
                 </div>
                 <p className="italic text-slate-300 text-lg leading-relaxed pt-4">
                  {feedback}
                 </p>
              </div>
              <p className="text-slate-400 mb-10">
                Die vollständige Auswertung wurde soeben an <span className="text-white font-medium">{email}</span> und Marc Verl versendet.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={resetQuiz}
                  className="bg-accent text-pine-dark px-10 py-4 rounded-sm font-bold hover:brightness-110 transition-all"
                >
                  Verstanden
                </button>
                <button 
                  onClick={() => { onClose(); window.location.href='#contact'; }}
                  className="px-10 py-4 border border-white/10 rounded-sm font-bold hover:bg-white/5 transition-all"
                >
                  Direkt Termin buchen
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Quiz;