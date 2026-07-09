/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import AIPanditChat from './components/AIPanditChat';
import KundaliGenerator from './components/KundaliGenerator';
import Matchmaker from './components/Matchmaker';
import Remedies from './components/Remedies';
import PanchangExplorer from './components/PanchangExplorer';
import PujasRituals from './components/PujasRituals';
import SpiritualTravel from './components/SpiritualTravel';
import PujaSamagris from './components/PujaSamagris';
import { Sparkles, Calendar, Heart, ShieldAlert, BookOpen, Clock, Activity, Compass, ShoppingBag, Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('Home');
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const tabs = [
    { name: 'Home', label: 'Spiritual Center', icon: Activity },
    { name: 'Chat', label: 'Pandit Chat', icon: Sparkles },
    { name: 'Pujas', label: 'Pujas & Rituals', icon: Gift },
    { name: 'Travel', label: 'Spiritual Travel', icon: Compass },
    { name: 'Samagri', label: 'Puja Samagris', icon: ShoppingBag },
    { name: 'Kundali', label: 'Birth Chart', icon: BookOpen },
    { name: 'Matchmaker', label: 'Matchmaking', icon: Heart },
    { name: 'Remedies', label: 'Mantras & Gems', icon: ShieldCheck },
    { name: 'Panchang', label: 'Panchang Almanac', icon: Calendar },
  ];

  // ShieldCheck fallback icon
  function ShieldCheck(props: any) {
    return <ShieldAlert {...props} />;
  }

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'Home':
        return <Dashboard onNavigate={(tab) => setActiveTab(tab)} />;
      case 'Chat':
        return <AIPanditChat />;
      case 'Pujas':
        return <PujasRituals />;
      case 'Travel':
        return <SpiritualTravel />;
      case 'Samagri':
        return <PujaSamagris />;
      case 'Kundali':
        return <KundaliGenerator />;
      case 'Matchmaker':
        return <Matchmaker />;
      case 'Remedies':
        return <Remedies />;
      case 'Panchang':
        return <PanchangExplorer />;
      default:
        return <Dashboard onNavigate={(tab) => setActiveTab(tab)} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-800 flex flex-col justify-between selection:bg-orange-100 selection:text-orange-800">
      {/* 1. Top Decorative Stars Header */}
      <div className="absolute top-0 left-0 right-0 h-[300px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent pointer-events-none"></div>

      {/* Header Container */}
      <header className="sticky top-0 z-50 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-orange-200 px-4 md:px-8 py-3 flex flex-col md:flex-row items-center justify-between gap-4 max-w-7xl mx-auto w-full">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('Home')}>
          <div className="bg-orange-600 p-2 rounded-xl border border-orange-500 text-white font-serif font-bold text-xl flex items-center justify-center shadow-md shadow-orange-500/20">
            ॐ
          </div>
          <div>
            <h1 className="text-xl font-serif font-extrabold tracking-wide text-orange-600 flex items-center gap-1.5 drop-shadow-[0_2px_8px_rgba(234,88,12,0.15)]">
              PanditJee
            </h1>
            <p className="text-[9px] uppercase tracking-widest text-orange-500 font-bold">Your Divine Vedic Guide</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 md:gap-2 overflow-x-auto max-w-full pb-1 md:pb-0 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.name;
            return (
              <button
                id={`nav-tab-${tab.name}`}
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`relative px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 flex items-center gap-2 shrink-0 ${
                  isSelected
                    ? 'text-white font-bold bg-orange-600 shadow-md shadow-orange-600/20'
                    : 'text-stone-600 hover:text-orange-600 hover:bg-orange-50'
                }`}
              >
                <Icon className="h-3.5 w-3.5 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Real-time Clock display */}
        <div className="hidden lg:flex items-center gap-2 text-[10px] uppercase font-mono font-bold tracking-wider text-orange-600 bg-orange-50 px-3 py-1.5 rounded-xl border border-orange-100">
          <Clock className="h-3.5 w-3.5" />
          <span>Local Time:</span>
          <span className="text-orange-600 font-extrabold">{currentTime || '--:--:--'}</span>
        </div>
      </header>

      {/* 2. Main Content Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
          >
            {renderActiveTabContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 3. Footer Section */}
      <footer className="w-full max-w-7xl mx-auto border-t border-orange-100 py-8 px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left text-[11px] text-stone-500">
        <div className="space-y-1">
          <p className="font-serif italic font-medium text-orange-600">"लोकाः समस्ताः सुखिनो भवन्तु" — May all beings everywhere be happy and free.</p>
          <p className="font-medium font-sans">© {new Date().getFullYear()} PanditJee. Patna, Bihar, India.</p>
          <p className="text-[10px] text-stone-400 font-sans">
            Desk: Bailey Road, Patna | WhatsApp Support: <a href="https://wa.me/917549425216" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline font-semibold font-mono">+91 75494 25216</a>
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <span className="font-semibold text-orange-600 uppercase tracking-widest font-mono">Vedic Jyotish v1.0</span>
          {activeTab !== 'Home' && (
            <button
              id="btn-footer-contact"
              onClick={() => {
                setActiveTab('Home');
                setTimeout(() => {
                  const el = document.getElementById('contact-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 150);
              }}
              className="px-3 py-1.5 bg-orange-50 border border-orange-200 text-orange-700 hover:bg-orange-100 transition-all rounded-xl font-semibold cursor-pointer"
            >
              Contact Us &rarr;
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}
