
import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <section id="about" className="py-32 bg-pine-medium overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square bg-accent/10 absolute -top-8 -left-8 w-64 h-64 blur-3xl rounded-full" />
            <img 
              src="https://picsum.photos/id/64/800/1000" 
              alt="Marc Verl"
              className="relative z-10 w-full h-auto rounded-sm grayscale shadow-2xl"
            />
            <div className="absolute -bottom-10 -right-10 bg-accent p-8 rounded-sm z-20 hidden md:block">
              <span className="text-pine-dark text-4xl font-serif font-bold italic">Die DNA.</span>
            </div>
          </motion.div>

          <div>
            <span className="text-accent font-mono text-sm uppercase tracking-widest mb-4 block">Die Mission</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">
              Ich mache die <span className="italic">Marken-DNA</span> sichtbar.
            </h2>
            <div className="space-y-6 text-lg text-slate-400 font-light leading-relaxed">
              <p>
                Jedes Unternehmen hat einen Kern – eine DNA, die es einzigartig macht. Besonders im Bereich Nachhaltigkeit ist diese DNA der Anker für Vertrauen. Meine Mission als Markengestalter ist es, diesen unsichtbaren Kern in eine visuelle Sprache zu übersetzen, die Menschen sofort verstehen und fühlen.
              </p>
              <p>
                Mein Logo, die "Bildmarke", steht genau dafür: Drei Linien, die für <span className="text-white italic">Identität, Strategie und Wirkung</span> stehen. Sie bilden ein dynamisches 'M' und visualisieren den Aufstieg grüner Innovationen.
              </p>
              <p>
                Ich gestalte nicht nur für das Auge, sondern für den Planeten. Gemeinsam sorgen wir dafür, dass deine nachhaltige Vision die Aufmerksamkeit erhält, die sie verdient.
              </p>
              <div className="pt-8 flex items-center space-x-6">
                <div className="h-px bg-accent flex-grow" />
                <span className="font-serif italic text-white text-2xl">Marc Verl</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
