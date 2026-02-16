
import React from 'react';
import { motion } from 'framer-motion';

const Problem: React.FC = () => {
  return (
    <section id="problem" className="py-32 bg-pine-medium">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-accent font-mono text-sm uppercase tracking-widest mb-4 block">Die Herausforderung</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight mb-8">
              Warum viele Green Brands hinter ihrem <span className="italic">Potenzial</span> zurückbleiben.
            </h2>
          </div>
          <div className="space-y-6 text-lg text-slate-400 font-light leading-relaxed">
            <p>
              Du rettest die Welt, aber dein Logo sieht aus wie aus den 90ern? Viele nachhaltige Unternehmen verschenken Vertrauen, weil ihr Branding entweder zu "öko-klischeehaft" oder einfach unprofessionell wirkt.
            </p>
            <p>
              In einer Welt voller Greenwashing reicht es nicht mehr aus, "gut" zu sein. Du musst auch <span className="text-white font-medium">exzellent aussehen</span>. Ein schwaches Design signalisiert Unsicherheit – und das ist das Letzte, was dein ökologischer Impact gebrauchen kann.
            </p>
            <div className="pt-6">
              <div className="flex items-start space-x-4">
                <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5" />
                <p><span className="text-white font-medium">Das Problem:</span> Verlust von Premium-Kunden durch mangelnde Ästhetik.</p>
              </div>
              <div className="flex items-start space-x-4 mt-4">
                <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5" />
                <p><span className="text-white font-medium">Die Folge:</span> Dein Impact bleibt kleiner, als er sein könnte.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;
