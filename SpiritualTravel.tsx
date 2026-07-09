/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Mantra } from '../types';
import { Play, Pause, RotateCcw, Award, Info, Volume2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function Remedies() {
  const [selectedMantra, setSelectedMantra] = useState<string>('gayatri');
  const [isChanting, setIsChanting] = useState<boolean>(false);
  const [beadCount, setBeadCount] = useState<number>(0);
  const [chantSessions, setChantSessions] = useState<number>(0);
  const [selectedPurpose, setSelectedPurpose] = useState<string>('Focus & Wisdom');

  const mantras: Record<string, Mantra> = {
    gayatri: {
      id: 'gayatri',
      title: 'Gayatri Mantra',
      sanskrit: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॥',
      transliteration: 'Om Bhur Bhuvah Svah, Tat Savitur Varenyam, Bhargo Devasya Dhimahi, Dhiyo Yo Nah Prachodayat.',
      translation: 'We meditate on the adorable glory of the radiant divine source; may that light inspire and illumine our intellect and minds.',
      benefits: 'Bestows sharp focus, supreme wisdom, intellectual clarity, and deep mental peace. Recommended for students and scholars.',
      countNeeded: 108,
      deity: 'Goddess Gayatri / Sun God',
    },
    mrityunjaya: {
      id: 'mrityunjaya',
      title: 'Maha Mrityunjaya Mantra',
      sanskrit: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् । उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय माऽमृतात् ॥',
      transliteration: 'Om Tryambakam Yajamahe Sugandhim Pushti-Vardhanam, Urvarukam-Iva Bandhanan-Mrityor-Mukshiya Ma-Amritat.',
      translation: 'We worship the three-eyed Lord Shiva who is fragrant and nurtures all beings. May he liberate us from death and bondage to immortality.',
      benefits: 'Protects from negative energies, enhances longevity, alleviates severe illness, and bestows supreme emotional strength.',
      countNeeded: 108,
      deity: 'Lord Shiva',
    },
    shree: {
      id: 'shree',
      title: 'Shree Suktam (Goddess Lakshmi)',
      sanskrit: 'ॐ हिरण्यवर्णां हरिणीं सुवर्णरजतस्रजाम् । चन्द्रां हिरण्मयीं लक्ष्मीं जातवेदो म आवह ॥',
      transliteration: 'Om Hiranya-Varnam Harinim Suvarna-Rajata-Srajam, Chandram Hiranmayim Lakshmim Jata-Vedo Ma Avaha.',
      translation: 'O Agni, invoke for me that Goddess Lakshmi, who is of golden color, beautiful, adorned with gold and silver ornaments, radiant like the moon.',
      benefits: 'Dissolves financial distress, invites auspicious prosperity, abundance, and restores familial harmony and beauty.',
      countNeeded: 11,
      deity: 'Goddess Lakshmi',
    },
    ganesh: {
      id: 'ganesh',
      title: 'Vakratunda Mahakaya (Ganesh Mantra)',
      sanskrit: 'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ । निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥',
      transliteration: 'Vakratunda Mahakaya Surya-Koti Samaprabha, Nirvighnam Kuru Me Deva Sarva-Karyeshu Sarvada.',
      translation: 'O Lord Ganesha, with a curved trunk and massive body, whose brilliance equals ten million suns, please make all my tasks free of obstacles always.',
      benefits: 'Removes physical and mental obstacles, ensures auspicious beginnings for businesses, marriages, and daily travels.',
      countNeeded: 108,
      deity: 'Lord Ganesha',
    },
  };

  const currentMantra = mantras[selectedMantra] || mantras.gayatri;

  // Simulate audio player chant progress loop
  useEffect(() => {
    let timer: any;
    if (isChanting) {
      timer = setInterval(() => {
        setBeadCount((prev) => {
          if (prev >= currentMantra.countNeeded - 1) {
            setIsChanting(false);
            setChantSessions((s) => s + 1);
            return currentMantra.countNeeded;
          }
          return prev + 1;
        });
      }, 2000); // simulated chant speed of 2 seconds per repetition
    }
    return () => clearInterval(timer);
  }, [isChanting, currentMantra]);

  const handleMantraToggle = () => {
    setIsChanting(!isChanting);
  };

  const handleManualIncrement = () => {
    setBeadCount((prev) => {
      if (prev >= currentMantra.countNeeded - 1) {
        setChantSessions((s) => s + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  const resetCount = () => {
    setBeadCount(0);
    setIsChanting(false);
  };

  const gemstoneRecommendations: Record<string, { stone: string; metal: string; finger: string; day: string; mantra: string; desc: string }> = {
    'Focus & Wisdom': {
      stone: 'Emerald (Panna)',
      metal: 'Gold or Silver',
      finger: 'Little Finger',
      day: 'Wednesday morning',
      mantra: 'Om Budhaye Namah',
      desc: 'Pacifies Mercury. Strengthens speech, business intelligence, academic research, and heals nervous anxieties.',
    },
    'Career & Power': {
      stone: 'Ruby (Manik)',
      metal: 'Copper or Gold',
      finger: 'Ring Finger',
      day: 'Sunday sunrise',
      mantra: 'Om Suryaya Namah',
      desc: 'Energizes the Sun. Bestows leadership abilities, authoritative luck, social status, and powerful physical immunity.',
    },
    'Peace & Relationships': {
      stone: 'White Pearl (Moti)',
      metal: 'Silver',
      finger: 'Little Finger',
      day: 'Monday evening',
      mantra: 'Om Chandraya Namah',
      desc: 'Pacifies the Moon. Stabilizes hyper-emotional thinking, cools anger, increases maternal love, and heals domestic relationships.',
    },
    'Prosperity & Luck': {
      stone: 'Yellow Sapphire (Pukhraj)',
      metal: 'Gold',
      finger: 'Index Finger',
      day: 'Thursday morning',
      mantra: 'Om Guruve Namah',
      desc: 'Strengthens Jupiter (Guru). Invites cosmic fortune, spiritual growth, happy marital connections, and vast philosophical wisdom.',
    },
    'Protection & Courage': {
      stone: 'Red Coral (Moonga)',
      metal: 'Gold or Copper',
      finger: 'Ring Finger',
      day: 'Tuesday sunrise',
      mantra: 'Om Angarakaya Namah',
      desc: 'Strengthens Mars. Removes fear, grants muscular stamina, dissolves debt blockages, and overrides Manglik doshas.',
    }
  };

  const activeStone = gemstoneRecommendations[selectedPurpose] || gemstoneRecommendations['Focus & Wisdom'];

  return (
    <div id="remedies-tab" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left: Mantra Chanting Center */}
      <motion.div
        initial={{ opacity: 0, x: -15 }}
        animate={{ opacity: 1, x: 0 }}
        className="lg:col-span-7 bg-white border border-orange-200 rounded-3xl p-6 md:p-8 shadow-md space-y-6"
      >
        <div className="flex items-center justify-between border-b border-orange-100 pb-4">
          <div>
            <h2 className="text-xl font-serif text-stone-900 font-bold">Vedic Mantra Chanting</h2>
            <p className="text-xs text-stone-500">Recite sacred wavelengths to elevate conscious frequencies</p>
          </div>
          <Volume2 className="h-5 w-5 text-orange-600" />
        </div>

        {/* Selector Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {Object.values(mantras).map((m) => (
            <button
              id={`select-mantra-${m.id}`}
              key={m.id}
              onClick={() => {
                setSelectedMantra(m.id);
                setBeadCount(0);
                setIsChanting(false);
              }}
              className={`py-2 px-3 text-xs font-serif rounded-xl border font-semibold transition-all duration-300 text-center truncate cursor-pointer ${
                selectedMantra === m.id
                  ? 'bg-orange-600 text-white border-orange-500 shadow-sm'
                  : 'bg-white text-stone-600 border-orange-100 hover:border-orange-300'
              }`}
            >
              {m.title}
            </button>
          ))}
        </div>

        {/* Selected Mantra Board */}
        <div className="p-6 bg-orange-50/20 rounded-2xl border border-orange-100 space-y-4">
          <div className="text-center">
            <span className="text-[10px] bg-orange-50 text-orange-600 border border-orange-200 px-2.5 py-0.5 rounded-full inline-block font-semibold uppercase tracking-wider mb-2 font-sans">
              Deity: {currentMantra.deity}
            </span>
            <h3 className="text-lg font-serif font-bold text-stone-900">{currentMantra.title}</h3>
          </div>

          <div className="bg-orange-50 p-5 rounded-xl border border-orange-100 text-center shadow-inner relative">
            <div className="absolute right-3 top-3 animate-pulse text-orange-600">ॐ</div>
            <p className="text-sm md:text-base font-serif font-semibold text-orange-700 leading-relaxed select-all tracking-wide">
              {currentMantra.sanskrit}
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <span className="font-semibold text-orange-700">Transliteration:</span>
              <p className="text-stone-600 leading-relaxed italic mt-1">{currentMantra.transliteration}</p>
            </div>
            <div>
              <span className="font-semibold text-orange-700">English Meaning:</span>
              <p className="text-stone-600 leading-relaxed mt-1">{currentMantra.translation}</p>
            </div>
            <div>
              <span className="font-semibold text-orange-700">Divine Benefits:</span>
              <p className="text-stone-600 leading-relaxed mt-1">{currentMantra.benefits}</p>
            </div>
          </div>
        </div>

        {/* Simulated Playback and Chanting progress */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center p-5 bg-orange-50/10 rounded-2xl border border-orange-100">
          <div className="md:col-span-4 text-center md:text-left">
            <span className="text-[10px] text-stone-400 uppercase tracking-widest block mb-1 font-sans font-medium">Chanting Mode</span>
            <h4 className="text-sm font-semibold text-stone-800 font-serif">Simulated Temples</h4>
            <p className="text-[10px] text-stone-500 mt-1">Simulates 1 chant every 2 seconds or tap manually.</p>
          </div>

          <div className="md:col-span-8 flex justify-center md:justify-end gap-3">
            <button
              id="btn-play-remedy"
              onClick={handleMantraToggle}
              className="py-2.5 px-5 text-xs font-semibold rounded-xl bg-orange-600 hover:bg-orange-500 text-white shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
            >
              {isChanting ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
              <span>{isChanting ? 'Pause Chanting' : 'Start Chanting'}</span>
            </button>
            <button
              id="btn-manual-chant"
              onClick={handleManualIncrement}
              className="py-2.5 px-5 text-xs font-semibold rounded-xl border border-orange-200 text-stone-700 hover:border-orange-400 hover:bg-orange-50/20 transition-all cursor-pointer bg-white"
            >
              Tap Manual Chant
            </button>
            <button
              id="btn-reset-chant"
              onClick={resetCount}
              title="Reset Counter"
              className="p-2.5 rounded-xl border border-orange-100 text-stone-400 hover:text-orange-600 hover:border-orange-300 transition-all cursor-pointer bg-white"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Right: Jaap Mala & Gemstones */}
      <motion.div
        initial={{ opacity: 0, x: 15 }}
        animate={{ opacity: 1, x: 0 }}
        className="lg:col-span-5 space-y-8"
      >
        {/* 1. Jaap Mala Indicator */}
        <div className="bg-white border border-orange-200 rounded-3xl p-6 md:p-8 shadow-md text-center space-y-6">
          <div>
            <h3 className="text-base font-serif font-bold text-stone-900">Digital Jaap Mala</h3>
            <p className="text-[10px] text-stone-500">Mala beads count standard 108 loops</p>
          </div>

          <div className="flex items-center justify-center">
            {/* Huge Bead Counter circle */}
            <div className="w-36 h-36 rounded-full border-4 border-orange-100 bg-orange-50/10 flex flex-col items-center justify-center relative">
              <span className="text-4xl font-extrabold text-orange-600 font-mono">{beadCount}</span>
              <span className="text-[9px] text-stone-400 mt-1 uppercase tracking-widest font-semibold font-sans">
                / {currentMantra.countNeeded} beads
              </span>
              {/* Completed session counter */}
              {chantSessions > 0 && (
                <div className="absolute -top-2 -right-2 bg-orange-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-[10px] font-bold shadow border border-orange-500">
                  {chantSessions}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-center items-center gap-2">
            <Award className="h-4 w-4 text-orange-600" />
            <span className="text-xs text-stone-700 font-medium font-serif">Completed loops today: {chantSessions}</span>
          </div>
        </div>

        {/* 2. Gemstones Advisory */}
        <div className="bg-white border border-orange-200 rounded-3xl p-6 md:p-8 shadow-md space-y-5">
          <div className="border-b border-orange-100 pb-3">
            <h3 className="text-base font-serif font-bold text-stone-900 flex items-center gap-2">
              <Info className="h-4 w-4 text-orange-600" />
              Remedial Gemstone Advisory
            </h3>
            <p className="text-[10px] text-stone-500">Prescribing sacred crystals for balancing cosmic frequencies</p>
          </div>

          {/* Selector dropdown */}
          <div>
            <label htmlFor="gemstone-purpose" className="block text-[10px] uppercase tracking-wider text-stone-500 mb-2 font-medium font-sans">Select your current goal</label>
            <select
              id="gemstone-purpose"
              value={selectedPurpose}
              onChange={(e) => setSelectedPurpose(e.target.value)}
              className="w-full bg-white text-stone-800 border border-orange-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-orange-500 font-serif"
            >
              {Object.keys(gemstoneRecommendations).map((purpose) => (
                <option key={purpose} value={purpose} className="bg-white text-stone-800">{purpose}</option>
              ))}
            </select>
          </div>

          {/* Gemstone readout Card */}
          <div className="p-5 bg-orange-50/20 rounded-2xl border border-orange-100 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600">
                💎
              </div>
              <div>
                <h4 className="text-sm font-bold text-stone-900">{activeStone.stone}</h4>
                <p className="text-[10px] text-orange-600/80 font-semibold font-mono">Energizing Gemstone</p>
              </div>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed font-sans">{activeStone.desc}</p>

            <div className="pt-3 border-t border-orange-100 grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-stone-400 block text-[9px] uppercase tracking-wider">Auspicious day</span>
                <span className="text-stone-850 font-medium font-serif mt-0.5 block">{activeStone.day}</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[9px] uppercase tracking-wider">Wearing metal</span>
                <span className="text-stone-850 font-medium font-serif mt-0.5 block">{activeStone.metal}</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[9px] uppercase tracking-wider">Ideal Finger</span>
                <span className="text-stone-850 font-medium font-serif mt-0.5 block">{activeStone.finger}</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[9px] uppercase tracking-wider">Chant Mantra</span>
                <span className="text-orange-600 font-mono font-semibold mt-0.5 block">{activeStone.mantra}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
