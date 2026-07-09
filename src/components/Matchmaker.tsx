/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { MatchmakerInput, MatchmakerResult } from '../types';
import { Heart, Sparkles, CheckCircle, AlertTriangle, ArrowLeft, BarChart2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function Matchmaker() {
  const [formData, setFormData] = useState<MatchmakerInput>({
    boyName: '',
    boyDob: '1994-11-23',
    boyTob: '09:15',
    boyPob: 'Delhi, India',
    boyRasi: 'Sagittarius (Dhanu)',
    boyNakshatra: 'Mula',
    girlName: '',
    girlDob: '1996-03-08',
    girlTob: '14:20',
    girlPob: 'Kolkata, India',
    girlRasi: 'Virgo (Kanya)',
    girlNakshatra: 'Hasta',
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<MatchmakerResult | null>(null);

  const rasis = [
    'Aries (Mesha)', 'Taurus (Vrishabha)', 'Gemini (Mithuna)', 'Cancer (Karka)',
    'Leo (Simha)', 'Virgo (Kanya)', 'Libra (Tula)', 'Scorpio (Vrishchika)',
    'Sagittarius (Dhanu)', 'Capricorn (Makara)', 'Aquarius (Kumbha)', 'Pisces (Meena)'
  ];

  const nakshatras = [
    'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha',
    'Magha', 'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
    'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravan', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
  ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.boyName || !formData.girlName) return;

    setLoading(true);
    try {
      const response = await fetch('/api/matchmake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setResult(data);
      } else {
        alert(`Matchmaking error: ${data.error}`);
      }
    } catch (err) {
      console.error('Matchmaking request error:', err);
      alert('Celestial alignment failed. Please check your inputs and try again.');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score < 18) return 'text-rose-700 bg-rose-50 border-rose-200';
    if (score < 25) return 'text-amber-700 bg-amber-50 border-amber-200';
    return 'text-emerald-700 bg-emerald-50 border-emerald-200';
  };

  const getScoreProgressBar = (score: number) => {
    if (score < 18) return 'bg-rose-500 shadow-rose-500/10';
    if (score < 25) return 'bg-amber-500 shadow-amber-500/10';
    return 'bg-emerald-500 shadow-emerald-500/10';
  };

  return (
    <div id="matchmaker-tab" className="space-y-8">
      {!result ? (
        // Input Forms
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-orange-200 rounded-3xl p-6 md:p-8 shadow-md"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-serif text-stone-900 font-bold mb-2 flex items-center justify-center gap-2">
              <Heart className="h-7 w-7 text-orange-600 fill-orange-100" />
              Ashtakoot Gun Milan Matchmaking
            </h2>
            <p className="text-xs md:text-sm text-stone-600 max-w-xl mx-auto">
              Analyze the compatibility of groom and bride based on the traditional 8-fold Vedic system.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-orange-100">
              {/* Groom Details */}
              <div className="space-y-5 lg:pr-4">
                <h3 className="text-base font-serif font-bold text-stone-900 pb-2 border-b border-orange-100 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-xs flex items-center justify-center">♂</span>
                  Groom (Boy) details
                </h3>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="boyName" className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">Groom's Name</label>
                    <input
                      id="boyName"
                      type="text"
                      required
                      placeholder="Enter groom name"
                      value={formData.boyName}
                      onChange={(e) => setFormData({ ...formData, boyName: e.target.value })}
                      className="w-full bg-white text-stone-850 border border-orange-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-orange-500 font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="boyDob" className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">Date of Birth</label>
                      <input
                        id="boyDob"
                        type="date"
                        required
                        value={formData.boyDob}
                        onChange={(e) => setFormData({ ...formData, boyDob: e.target.value })}
                        className="w-full bg-white text-stone-800 border border-orange-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-orange-500 font-mono"
                      />
                    </div>
                    <div>
                      <label htmlFor="boyTob" className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">Time of Birth</label>
                      <input
                        id="boyTob"
                        type="time"
                        required
                        value={formData.boyTob}
                        onChange={(e) => setFormData({ ...formData, boyTob: e.target.value })}
                        className="w-full bg-white text-stone-800 border border-orange-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-orange-500 font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="boyPob" className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">Place of Birth</label>
                    <input
                      id="boyPob"
                      type="text"
                      required
                      placeholder="e.g. Delhi, India"
                      value={formData.boyPob}
                      onChange={(e) => setFormData({ ...formData, boyPob: e.target.value })}
                      className="w-full bg-white text-stone-850 border border-orange-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-orange-500 font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="boyRasi" className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">Moon Sign (Rasi)</label>
                      <select
                        id="boyRasi"
                        value={formData.boyRasi}
                        onChange={(e) => setFormData({ ...formData, boyRasi: e.target.value })}
                        className="w-full bg-white text-stone-800 border border-orange-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-orange-500 font-medium"
                      >
                        {rasis.map((r) => <option key={r} value={r} className="bg-white">{r}</option>)}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="boyNakshatra" className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">Nakshatra (Birth Star)</label>
                      <select
                        id="boyNakshatra"
                        value={formData.boyNakshatra}
                        onChange={(e) => setFormData({ ...formData, boyNakshatra: e.target.value })}
                        className="w-full bg-white text-stone-800 border border-orange-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-orange-500 font-medium"
                      >
                        {nakshatras.map((n) => <option key={n} value={n} className="bg-white">{n}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bride Details */}
              <div className="space-y-5 lg:pl-8 pt-6 lg:pt-0">
                <h3 className="text-base font-serif font-bold text-stone-900 pb-2 border-b border-orange-100 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-rose-50 border border-rose-200 text-rose-600 text-xs flex items-center justify-center">♀</span>
                  Bride (Girl) details
                </h3>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="girlName" className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">Bride's Name</label>
                    <input
                      id="girlName"
                      type="text"
                      required
                      placeholder="Enter bride name"
                      value={formData.girlName}
                      onChange={(e) => setFormData({ ...formData, girlName: e.target.value })}
                      className="w-full bg-white text-stone-850 border border-orange-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-orange-500 font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="girlDob" className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">Date of Birth</label>
                      <input
                        id="girlDob"
                        type="date"
                        required
                        value={formData.girlDob}
                        onChange={(e) => setFormData({ ...formData, girlDob: e.target.value })}
                        className="w-full bg-white text-stone-800 border border-orange-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-orange-500 font-mono"
                      />
                    </div>
                    <div>
                      <label htmlFor="girlTob" className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">Time of Birth</label>
                      <input
                        id="girlTob"
                        type="time"
                        required
                        value={formData.girlTob}
                        onChange={(e) => setFormData({ ...formData, girlTob: e.target.value })}
                        className="w-full bg-white text-stone-800 border border-orange-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-orange-500 font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="girlPob" className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">Place of Birth</label>
                    <input
                      id="girlPob"
                      type="text"
                      required
                      placeholder="e.g. Kolkata, India"
                      value={formData.girlPob}
                      onChange={(e) => setFormData({ ...formData, girlPob: e.target.value })}
                      className="w-full bg-white text-stone-850 border border-orange-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-orange-500 font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="girlRasi" className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">Moon Sign (Rasi)</label>
                      <select
                        id="girlRasi"
                        value={formData.girlRasi}
                        onChange={(e) => setFormData({ ...formData, girlRasi: e.target.value })}
                        className="w-full bg-white text-stone-800 border border-orange-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-orange-500 font-medium"
                      >
                        {rasis.map((r) => <option key={r} value={r} className="bg-white">{r}</option>)}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="girlNakshatra" className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">Nakshatra (Birth Star)</label>
                      <select
                        id="girlNakshatra"
                        value={formData.girlNakshatra}
                        onChange={(e) => setFormData({ ...formData, girlNakshatra: e.target.value })}
                        className="w-full bg-white text-stone-800 border border-orange-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-orange-500 font-medium"
                      >
                        {nakshatras.map((n) => <option key={n} value={n} className="bg-white">{n}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Matchmake Trigger button */}
            <div className="pt-4 border-t border-orange-100">
              <button
                id="btn-matchmake"
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 text-base cursor-pointer"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Aligning Ashtakoot Horoscopes...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    <span>Run Gun Milan Analysis</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      ) : (
        // Results display
        <div className="space-y-8">
          {/* Header Action Row */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-orange-50/50 p-5 border border-orange-200 rounded-2xl">
            <div>
              <span className="text-xs uppercase tracking-wider text-orange-600 font-bold">Matchmaking Verdict</span>
              <h2 className="text-xl font-serif font-bold text-stone-900">
                {result.boyName} & {result.girlName}
              </h2>
            </div>
            <button
              id="btn-back-match-form"
              onClick={() => setResult(null)}
              className="flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl border border-orange-200 hover:border-orange-400 text-stone-700 hover:text-orange-600 bg-white transition-all duration-300 cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Match New Profiles
            </button>
          </div>

          {/* Compatibility score gauge cards */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white border border-orange-200 p-6 rounded-3xl shadow-md">
            {/* Left: Progress Gauge block */}
            <div className="md:col-span-5 text-center flex flex-col items-center space-y-4 py-4">
              <span className="text-xs uppercase tracking-wider text-stone-500 font-semibold">Total Compatibility Score</span>
              <div className="relative flex items-center justify-center">
                {/* Circular indicator style */}
                <div className="w-40 h-40 rounded-full border-4 border-orange-100 flex flex-col items-center justify-center bg-orange-50/10">
                  <span className="text-5xl font-extrabold text-orange-600 font-serif">{result.totalScore}</span>
                  <span className="text-xs text-stone-400 mt-1 uppercase tracking-widest font-semibold font-sans">out of 36</span>
                </div>
              </div>

              <div className={`px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider ${getScoreColor(result.totalScore)}`}>
                {result.verdict}
              </div>
            </div>

            {/* Right: Progress breakdown details */}
            <div className="md:col-span-7 space-y-5">
              <div>
                <h3 className="text-sm font-serif font-semibold text-stone-900 mb-2">Ashtakoot Gun Milan Meter</h3>
                <div className="w-full bg-stone-100 rounded-full h-4 p-0.5 border border-stone-200 shadow-inner">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${getScoreProgressBar(result.totalScore)}`}
                    style={{ width: `${(result.totalScore / 36) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-1.5 text-[10px] text-stone-400 font-medium">
                  <span>Inauspicious (&lt; 18)</span>
                  <span>Average (18-24)</span>
                  <span>Auspicious (&gt; 24)</span>
                </div>
              </div>

              {/* Manglik status indicator */}
              <div className="p-4 rounded-2xl bg-orange-50/30 border border-orange-100 flex gap-3">
                {result.manglikStatus.boyManglik || result.manglikStatus.girlManglik ? (
                  <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <h4 className="text-xs font-bold text-stone-900">Manglik Dosha Balance (Kuja Dosha)</h4>
                  <p className="text-[11px] leading-relaxed text-stone-600 mt-1">{result.manglikStatus.verdict}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Ashtakoot parameters table and synergy */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Ashtakoot Grid list */}
            <div className="lg:col-span-7 bg-white border border-orange-200 rounded-3xl p-6 shadow-sm">
              <h3 className="text-base font-serif font-semibold text-stone-900 mb-4 pb-2 border-b border-orange-100 flex items-center gap-2">
                <BarChart2 className="h-4 w-4 text-orange-600" />
                Ashtakoot Milan Breakdown Table
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-orange-100 text-stone-500 uppercase tracking-wider text-[10px]">
                      <th className="py-2.5 font-semibold">Aspect (Koota)</th>
                      <th className="py-2.5 font-semibold">Groom</th>
                      <th className="py-2.5 font-semibold">Bride</th>
                      <th className="py-2.5 font-semibold text-center">Score</th>
                      <th className="py-2.5 font-semibold text-right">Mutual</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-orange-100 text-stone-750">
                    {result.ashtakoot.map((cat, idx) => (
                      <tr key={idx} className="hover:bg-orange-50/30 transition-colors">
                        <td className="py-3 font-semibold text-stone-900 flex items-center gap-1.5">{cat.name}</td>
                        <td className="py-3 font-serif">{cat.boyValue}</td>
                        <td className="py-3 font-serif">{cat.girlValue}</td>
                        <td className="py-3 text-center font-bold text-orange-600">{cat.obtainedPoints} / {cat.maxPoints}</td>
                        <td className="py-3 text-right text-orange-700 font-medium">{cat.compatibility}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Matrimonial synergy report */}
            <div className="lg:col-span-5 bg-white border border-orange-200 rounded-3xl p-6 h-full flex flex-col justify-between shadow-sm">
              <div>
                <h3 className="text-base font-serif font-semibold text-stone-900 mb-4 pb-2 border-b border-orange-100 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-orange-600" />
                  Divine Matrimonial Synergy Report
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-stone-700 font-serif italic whitespace-pre-line">
                  {result.detailedAnalysis}
                </p>
              </div>

              <div className="mt-6 border-t border-orange-100 pt-4 text-[10px] text-stone-400 text-center leading-normal">
                Vedic astrology matchmaking calculates 36 celestial aspects (Gunas). A score above 18 represents healthy compatibility, while remedies are advised for minor doshas to guarantee lifelong harmony.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
