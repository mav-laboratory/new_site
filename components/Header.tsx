
import React from 'react';
import { motion } from 'framer-motion';
import { Page } from '../App';

interface HeaderProps {
  onCtaClick: () => void;
  onNavigate: (page: Page) => void;
  currentPage: Page;
}

const Header: React.FC<HeaderProps> = ({ onCtaClick, onNavigate, currentPage }) => {
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-pine-dark/80 backdrop-blur-md border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <button onClick={() => onNavigate('home')} className="flex items-center space-x-4 group">
          {/* Stylized DNA Brand Mark Logo */}
          <svg width="42" height="42" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform group-hover:scale-105">
            <defs>
              <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#5EB38E" />
                <stop offset="100%" stopColor="#0B1F1A" />
              </linearGradient>
            </defs>
            <path d="M20 80L45 20" stroke="url(#logoGrad)" strokeWidth="12" strokeLinecap="round"/>
            <path d="M40 80L65 20" stroke="url(#logoGrad)" strokeWidth="12" strokeLinecap="round"/>
            <path d="M60 80L85 20" stroke="url(#logoGrad)" strokeWidth="12" strokeLinecap="round"/>
            <path d="M65 20C75 20 85 35 85 50L75 75" stroke="url(#logoGrad)" strokeWidth="12" strokeLinecap="round"/>
          </svg>
          <span className="font-serif text-xl font-bold tracking-tight hidden sm:block">
            Marc Verl<span className="text-accent italic">.</span>
          </span>
        </button>

        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-wide uppercase">
          <button onClick={() => onNavigate('home')} className={`hover:text-accent transition-colors ${currentPage === 'home' ? 'text-accent' : ''}`}>Vision</button>
          <button onClick={() => { if(currentPage!=='home') onNavigate('home'); setTimeout(() => document.getElementById('portfolio')?.scrollIntoView(), 100); }} className="hover:text-accent transition-colors">Cases</button>
          <button onClick={() => { if(currentPage!=='home') onNavigate('home'); setTimeout(() => document.getElementById('about')?.scrollIntoView(), 100); }} className="hover:text-accent transition-colors">DNA Story</button>
          <button onClick={() => onNavigate('contact')} className={`hover:text-accent transition-colors ${currentPage === 'contact' ? 'text-accent' : ''}`}>Kontakt</button>
          <button 
            onClick={onCtaClick}
            className="px-5 py-2 border border-accent text-accent hover:bg-accent hover:text-pine-dark transition-all duration-300 rounded-sm"
          >
            Analyse
          </button>
        </nav>

        <button className="md:hidden text-accent">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </motion.header>
  );
};

export default Header;
