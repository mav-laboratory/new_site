
import React from 'react';
import { Page } from '../App';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="py-20 bg-pine-dark border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2">
            <div className="flex items-center space-x-3 mb-8">
              <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 80L45 20" stroke="#5EB38E" strokeWidth="12" strokeLinecap="round"/>
                <path d="M40 80L65 20" stroke="#5EB38E" strokeWidth="12" strokeLinecap="round"/>
                <path d="M60 80L85 20" stroke="#5EB38E" strokeWidth="12" strokeLinecap="round"/>
                <path d="M65 20C75 20 85 35 85 50L75 75" stroke="#5EB38E" strokeWidth="12" strokeLinecap="round"/>
              </svg>
              <span className="font-serif text-2xl font-bold tracking-tight">
                Marc Verl<span className="text-accent italic">.</span>
              </span>
            </div>
            <p className="text-slate-400 max-w-sm mb-8">
              Spezialisierter Logo- & Branddesigner für nachhaltige Unternehmen. Ich mache deine DNA sichtbar.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-slate-500 hover:text-accent transition-colors">Instagram</a>
              <a href="#" className="text-slate-500 hover:text-accent transition-colors">LinkedIn</a>
              <a href="#" className="text-slate-500 hover:text-accent transition-colors">Behance</a>
            </div>
          </div>
          
          <div>
            <h5 className="text-white font-bold mb-6">Navigation</h5>
            <ul className="space-y-4 text-slate-400">
              <li><button onClick={() => onNavigate('home')} className="hover:text-white">Startseite</button></li>
              <li><button onClick={() => onNavigate('home')} className="hover:text-white">Cases</button></li>
              <li><button onClick={() => onNavigate('home')} className="hover:text-white">DNA Story</button></li>
              <li><button onClick={() => onNavigate('contact')} className="hover:text-white">Kontakt</button></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-bold mb-6">Rechtliches</h5>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#" className="hover:text-white">Impressum</a></li>
              <li><a href="#" className="hover:text-white">Datenschutz</a></li>
              <li><a href="#" className="hover:text-white">AGB</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} Marc Verl. Alle Rechte vorbehalten. | Kontakt: marc.verl@gmx.de</p>
          <p className="mt-4 md:mt-0 italic">Making DNA Visible.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
