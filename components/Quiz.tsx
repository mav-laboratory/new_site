
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
    
    // Generate AI feedback
    const aiFeedback = await generateQuizFeedback(answers);
    setFeedback(aiFeedback || "Danke für deine Teilnahme!");
    setIsSubmitting(false);
    console.log(`Quiz results for ${email} sent to marc.verl@gmx.de`, { answers, scores });
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
          className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors"
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
                  <span className="text-accent text-sm font-mono block mb-2">Frage {step + 1} von {questions.length}</span>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold">{questions[step].question}</h3>
                </div>
                <div className="space-y-4">
                  {questions[step].options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(opt as any)}
                      className="w-full text-left p-5 border border-white/5 bg-white/5 hover:bg-accent hover:text-pine-dark hover:border-accent transition-all duration-300 rounded-sm group"
                    >
                      <span className="text-lg font-medium">{opt.text}</span>
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
              <h3 className="text-3xl font-serif font-bold mb-4">Fast geschafft!</h3>
              <p className="text-slate-400 mb-8">
                Gib deine E-Mail an, um dein individuelles Feedback und mein kostenloses Handbuch <br className="hidden md:block"/>
                <span className="text-white italic">"Warum Impact-Brands professionelle Positionierung brauchen"</span> zu erhalten.
              </p>
              <form onSubmit={handleFinalSubmit} className="max-w-md mx-auto space-y-4">
                <input
                  type="email"
                  required
                  placeholder="Deine E-Mail-Adresse"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-6 py-4 bg-pine-dark border border-white/10 rounded-sm focus:outline-none focus:border-accent text-white"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-accent text-pine-dark font-bold rounded-sm hover:brightness-110 transition-all flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : "Analyse anfordern"}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-3xl font-serif font-bold mb-4">Deine Analyse</h3>
              <div className="bg-pine-dark p-6 rounded-sm border border-accent/20 mb-8 text-left italic text-slate-300">
                "{feedback}"
              </div>
              <p className="text-slate-400 mb-8">
                Ich habe dir das Handbuch gerade an <span className="text-white font-medium">{email}</span> gesendet. 
                Sollten wir uns mal 15 Minuten über deine Marke unterhalten?
              </p>
              <button 
                onClick={onClose}
                className="bg-white text-pine-dark px-8 py-3 rounded-sm font-bold hover:bg-slate-200 transition-all"
              >
                Zurück zur Website
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Quiz;
