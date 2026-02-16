
import React from 'react';
import { motion } from 'framer-motion';

const cases = [
  { 
    id: 'case-ergo', 
    title: 'Ergotherapie Branding', 
    category: 'Gesundheit & Vertrauen', 
    img: 'https://picsum.photos/800/600?random=10' 
  },
  { 
    id: 'case-wine', 
    title: 'Exclusive Wine Club', 
    category: 'Premium Lifestyle', 
    img: 'https://picsum.photos/800/600?random=12' 
  },
  { 
    id: 'case-conifere', 
    title: 'Innenausstatter Conifere', 
    category: 'High-End Interior', 
    img: 'https://picsum.photos/800/600?random=14' 
  }
];

interface PortfolioProps {
  onSelectCase: (slug: string) => void;
}

const Portfolio: React.FC<PortfolioProps> = ({ onSelectCase }) => {
  return (
    <section id="portfolio" className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-accent font-mono text-sm uppercase tracking-widest mb-4 block">Ausgewählte Arbeiten</span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold italic">Design, das bewegt.</h2>
          </div>
          <p className="text-slate-400 max-w-sm">
            Echte Transformationen für Marken, die den Unterschied machen. Strategisch fundiert, handwerklich perfekt.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cases.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              onClick={() => onSelectCase(item.id)}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden aspect-[4/3] bg-pine-medium mb-4 rounded-sm">
                <img 
                  src={item.img} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-pine-dark/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-6 py-2 border border-white text-white font-medium backdrop-blur-sm">View Case</span>
                </div>
              </div>
              <h4 className="text-xl font-bold font-serif">{item.title}</h4>
              <p className="text-accent text-sm font-mono uppercase tracking-widest">{item.category}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
