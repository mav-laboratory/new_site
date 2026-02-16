
import React from 'react';
import { motion } from 'framer-motion';

interface CaseDetailProps {
  slug: string;
  title: string;
  category: string;
  description: string;
  images: string[];
  onBack: () => void;
}

const CaseDetail: React.FC<CaseDetailProps> = ({ title, category, description, images, onBack }) => {
  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <button 
          onClick={onBack}
          className="flex items-center space-x-2 text-accent mb-12 hover:translate-x-[-4px] transition-transform"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="font-mono text-sm uppercase tracking-widest">Zurück zur Übersicht</span>
        </button>

        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          <div>
            <span className="text-accent font-mono text-sm uppercase tracking-widest mb-4 block">{category}</span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight">{title}</h1>
          </div>
          <div className="flex flex-col justify-end">
            <p className="text-xl text-slate-400 font-light leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        <div className="space-y-12">
          {images.map((img, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="w-full bg-pine-medium rounded-sm overflow-hidden"
            >
              <img src={img} alt={`${title} image ${idx}`} className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
            </motion.div>
          ))}
        </div>

        <div className="mt-32 text-center bg-pine-medium p-20 rounded-xl border border-white/5">
          <h2 className="text-3xl font-serif font-bold mb-6">Willst du auch eine solche Transformation?</h2>
          <button 
            onClick={() => window.scrollTo(0,0)} 
            className="bg-accent text-pine-dark px-10 py-4 rounded-sm font-bold hover:brightness-110 transition-all"
          >
            Projekt anfragen
          </button>
        </div>
      </div>
    </div>
  );
};

export default CaseDetail;
