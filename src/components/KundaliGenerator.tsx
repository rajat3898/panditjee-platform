/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { KundaliInput, KundaliResult } from '../types';
import KundaliChart from './KundaliChart';
import { Calendar, Clock, MapPin, User, ArrowLeft, ShieldAlert, Sparkles, BookOpen, HeartPulse, DollarSign } from 'lucide-react';
import { motion } from 'motion/react';

export default function KundaliGenerator() {
  const [formData, setFormData] = useState<KundaliInput>({
    name: '',
    gender: 'Male',
    dob: '1995-06-15',
    tob: '08:30',
    pob: 'Mumbai, India',
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<KundaliResult | null>(null);
  const [activeTab, setActiveTab] = useState<'chart' | 'houses' | 'life' | 'remedies'>('chart');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.dob) return;

    setLoading(true);
    try {
      const response = await fetch('/api/kundali', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setResult(data);
        setActiveTab('chart');
      } else {
        alert(`Astrological calculation error: ${data.error}`);
      }
    } catch (err) {
      console.error('Error generating Kundali:', err);
      alert('Cosmic alignment failed. Check server status and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <div id="kundali-tab" className="space-y-8">
      {!result ? (
        // Input Form
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto bg-white border border-orange-200 rounded-3xl p-6 md:p-8 shadow-md"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-serif text-stone-900 font-bold mb-2">Generate Kundali Birth Chart</h2>
            <p className="text-xs md:text-sm text-stone-600">
              Input precise birth parameters to render your natal charts and unlock deep Vedic analysis.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label htmlFor="name" className="block text-xs font-semibold text-stone-500 uppercase tracking-wider">Full Name</label>
                <div className="flex items-center bg-white border border-orange-200 focus-within:border-orange-500 rounded-xl px-4 py-2.5 transition-all">
                  <User className="h-4 w-4 text-orange-500/50 mr-3" />
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="Enter name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="flex-1 bg-transparent text-stone-800 text-sm focus:outline-none placeholder-stone-400 font-medium"
                  />
                </div>
              </div>

              {/* Gender */}
              <div className="space-y-2">
                <label htmlFor="gender" className="block text-xs font-semibold text-stone-500 uppercase tracking-wider">Gender</label>
                <select
                  id="gender"
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                  className="w-full bg-white text-stone-800 border border-orange-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-orange-500 font-medium"
                >
                  <option value="Male" className="bg-white text-stone-800">Male</option>
                  <option value="Female" className="bg-white text-stone-800">Female</option>
                  <option value="Other" className="bg-white text-stone-800">Other</option>
                </select>
              </div>

              {/* Date of Birth */}
              <div className="space-y-2">
                <label htmlFor="dob" className="block text-xs font-semibold text-stone-500 uppercase tracking-wider">Date of Birth</label>
                <div className="flex items-center bg-white border border-orange-200 focus-within:border-orange-500 rounded-xl px-4 py-2.5 transition-all font-mono">
                  <Calendar className="h-4 w-4 text-orange-500/50 mr-3" />
                  <input
                    id="dob"
                    type="date"
                    required
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="flex-1 bg-transparent text-stone-800 text-sm focus:outline-none"
                  />
                </div>
              </div>

              {/* Time of Birth */}
              <div className="space-y-2">
                <label htmlFor="tob" className="block text-xs font-semibold text-stone-500 uppercase tracking-wider">Time of Birth</label>
                <div className="flex items-center bg-white border border-orange-200 focus-within:border-orange-500 rounded-xl px-4 py-2.5 transition-all font-mono">
                  <Clock className="h-4 w-4 text-orange-500/50 mr-3" />
                  <input
                    id="tob"
                    type="time"
                    required
                    value={formData.tob}
                    onChange={(e) => setFormData({ ...formData, tob: e.target.value })}
                    className="flex-1 bg-transparent text-stone-800 text-sm focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Place of Birth */}
            <div className="space-y-2">
              <label htmlFor="pob" className="block text-xs font-semibold text-stone-500 uppercase tracking-wider">Place of Birth (City, Country)</label>
              <div className="flex items-center bg-white border border-orange-200 focus-within:border-orange-500 rounded-xl px-4 py-2.5 transition-all">
                <MapPin className="h-4 w-4 text-orange-500/50 mr-3" />
                <input
                  id="pob"
                  type="text"
                  required
                  placeholder="e.g. Mumbai, Maharashtra, India"
                  value={formData.pob}
                  onChange={(e) => setFormData({ ...formData, pob: e.target.value })}
                  className="flex-1 bg-transparent text-stone-800 text-sm focus:outline-none placeholder-stone-400 font-medium"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                id="btn-calculate-kundali"
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Formulating Birth Chart Placements...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    <span>Calculate Vedic Kundali</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      ) : (
        // Results Display
        <div className="space-y-8">
          {/* Header Action Row */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-orange-50/50 p-4 border border-orange-200 rounded-2xl">
            <div>
              <span className="text-xs uppercase tracking-wider text-orange-600 font-bold">Horoscope Profile</span>
              <h2 className="text-xl font-serif font-bold text-stone-900">{result.input.name}'s Kundali</h2>
            </div>
            <button
              id="btn-back-form"
              onClick={handleReset}
              className="flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl border border-orange-200 hover:border-orange-400 text-stone-700 hover:text-orange-600 bg-white transition-all duration-300 cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> New Birth Chart
            </button>
          </div>

          {/* Quick Profile Parameters */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="p-4 bg-white border border-orange-200 rounded-2xl text-center shadow-sm">
              <span className="text-[10px] uppercase tracking-wider text-stone-500 block mb-1 font-semibold font-sans">Ascendant (Lagna)</span>
              <span className="text-sm font-bold text-orange-700 font-serif">{result.ascendant}</span>
            </div>
            <div className="p-4 bg-white border border-orange-200 rounded-2xl text-center shadow-sm">
              <span className="text-[10px] uppercase tracking-wider text-stone-500 block mb-1 font-semibold font-sans">Moon Sign (Rasi)</span>
              <span className="text-sm font-bold text-orange-700 font-serif">{result.moonSign}</span>
            </div>
            <div className="p-4 bg-white border border-orange-200 rounded-2xl text-center shadow-sm">
              <span className="text-[10px] uppercase tracking-wider text-stone-500 block mb-1 font-semibold font-sans">Sun Sign (Surya)</span>
              <span className="text-sm font-bold text-orange-700 font-serif">{result.sunSign}</span>
            </div>
            <div className="p-4 bg-white border border-orange-200 rounded-2xl text-center shadow-sm">
              <span className="text-[10px] uppercase tracking-wider text-stone-500 block mb-1 font-semibold font-sans">Nakshatra</span>
              <span className="text-sm font-bold text-orange-700 font-serif">{result.nakshatra}</span>
            </div>
            <div className="p-4 bg-white border border-orange-200 rounded-2xl text-center col-span-2 md:col-span-1 shadow-sm">
              <span className="text-[10px] uppercase tracking-wider text-stone-500 block mb-1 font-semibold font-sans">Star Pada/Charan</span>
              <span className="text-sm font-bold text-orange-700 font-serif font-sans">Quarter {result.nakshatraCharan}</span>
            </div>
          </div>

          {/* Tab Selection */}
          <div className="flex border-b border-orange-100 gap-2 overflow-x-auto pb-px">
            <button
              id="tab-chart"
              onClick={() => setActiveTab('chart')}
              className={`px-5 py-3 text-xs sm:text-sm font-medium border-b-2 transition-all shrink-0 font-serif cursor-pointer ${
                activeTab === 'chart'
                  ? 'border-orange-600 text-orange-600 font-bold'
                  : 'border-transparent text-stone-500 hover:text-stone-800 hover:border-orange-300'
              }`}
            >
              Natal Chart Layout
            </button>
            <button
              id="tab-houses"
              onClick={() => setActiveTab('houses')}
              className={`px-5 py-3 text-xs sm:text-sm font-medium border-b-2 transition-all shrink-0 font-serif cursor-pointer ${
                activeTab === 'houses'
                  ? 'border-orange-600 text-orange-600 font-bold'
                  : 'border-transparent text-stone-500 hover:text-stone-800 hover:border-orange-300'
              }`}
            >
              12 Bhavas (House Interpretations)
            </button>
            <button
              id="tab-life"
              onClick={() => setActiveTab('life')}
              className={`px-5 py-3 text-xs sm:text-sm font-medium border-b-2 transition-all shrink-0 font-serif cursor-pointer ${
                activeTab === 'life'
                  ? 'border-orange-600 text-orange-600 font-bold'
                  : 'border-transparent text-stone-500 hover:text-stone-800 hover:border-orange-300'
              }`}
            >
              Vedic Life Analysis
            </button>
            <button
              id="tab-remedies"
              onClick={() => setActiveTab('remedies')}
              className={`px-5 py-3 text-xs sm:text-sm font-medium border-b-2 transition-all shrink-0 font-serif cursor-pointer ${
                activeTab === 'remedies'
                  ? 'border-orange-600 text-orange-600 font-bold'
                  : 'border-transparent text-stone-500 hover:text-stone-800 hover:border-orange-300'
              }`}
            >
              Divine Remedies
            </button>
          </div>

          {/* Tab Contents */}
          <div className="mt-6">
            {activeTab === 'chart' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Visual Chart SVG */}
                <div className="lg:col-span-5 flex justify-center">
                  <KundaliChart placements={result.placements} ascendant={result.ascendant} />
                </div>

                {/* Planetary Placement Coordinates Table */}
                <div className="lg:col-span-7 bg-white border border-orange-200 rounded-3xl p-6 shadow-sm">
                  <h3 className="text-base font-serif font-semibold text-stone-900 mb-4 pb-2 border-b border-orange-100">Planetary Degree Placements</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead>
                        <tr className="border-b border-orange-100 text-stone-500 uppercase tracking-wider text-[10px]">
                          <th className="py-2.5 font-semibold">Graha (Planet)</th>
                          <th className="py-2.5 font-semibold">Rasi (Zodiac Sign)</th>
                          <th className="py-2.5 font-semibold text-center">Bhava (House)</th>
                          <th className="py-2.5 font-semibold text-right">Degree</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-orange-100 text-stone-700">
                        {result.placements.map((p, idx) => (
                          <tr key={idx} className="hover:bg-orange-50/20 transition-colors">
                            <td className="py-3 font-semibold text-stone-900 flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                              {p.planet}
                            </td>
                            <td className="py-3 font-serif">{p.sign}</td>
                            <td className="py-3 text-center font-bold text-orange-600">{p.house}</td>
                            <td className="py-3 text-right font-mono">{p.degree}°</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'houses' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.houseInterpretations.map((h, idx) => (
                  <div key={idx} className="bg-white border border-orange-200 p-5 rounded-2xl hover:border-orange-400 transition-all duration-300 shadow-sm">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-serif font-bold text-stone-900 text-sm">{h.title}</h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-50 border border-orange-200 text-orange-600 font-sans">Bhava {h.house}</span>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed font-sans">{h.description}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'life' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* General */}
                  <div className="p-6 bg-white border border-orange-200 rounded-3xl flex gap-4 shadow-sm">
                    <div className="text-orange-600 mt-0.5"><BookOpen className="h-5 w-5" /></div>
                    <div>
                      <h4 className="font-serif font-bold text-stone-900 mb-2">Personality & Lagna Analysis</h4>
                      <p className="text-xs text-stone-600 leading-relaxed">{result.lifeAnalysis.general}</p>
                    </div>
                  </div>

                  {/* Career */}
                  <div className="p-6 bg-white border border-orange-200 rounded-3xl flex gap-4 shadow-sm">
                    <div className="text-orange-600 mt-0.5"><Sparkles className="h-5 w-5" /></div>
                    <div>
                      <h4 className="font-serif font-bold text-stone-900 mb-2">Career & Profession Path</h4>
                      <p className="text-xs text-stone-600 leading-relaxed">{result.lifeAnalysis.career}</p>
                    </div>
                  </div>

                  {/* Wealth */}
                  <div className="p-6 bg-white border border-orange-200 rounded-3xl flex gap-4 shadow-sm">
                    <div className="text-orange-600 mt-0.5"><DollarSign className="h-5 w-5" /></div>
                    <div>
                      <h4 className="font-serif font-bold text-stone-900 mb-2">Wealth & Financial Fortune</h4>
                      <p className="text-xs text-stone-600 leading-relaxed">{result.lifeAnalysis.wealth}</p>
                    </div>
                  </div>

                  {/* Relationships */}
                  <div className="p-6 bg-white border border-orange-200 rounded-3xl flex gap-4 shadow-sm">
                    <div className="text-orange-600 mt-0.5"><BookOpen className="h-5 w-5" /></div>
                    <div>
                      <h4 className="font-serif font-bold text-stone-900 mb-2">Relationships, Love & Family</h4>
                      <p className="text-xs text-stone-600 leading-relaxed">{result.lifeAnalysis.relationships}</p>
                    </div>
                  </div>

                  {/* Health */}
                  <div className="p-6 bg-white border border-orange-200 rounded-3xl flex gap-4 shadow-sm">
                    <div className="text-orange-600 mt-0.5"><HeartPulse className="h-5 w-5" /></div>
                    <div>
                      <h4 className="font-serif font-bold text-stone-900 mb-2">Health, Vitality & Well-being</h4>
                      <p className="text-xs text-stone-600 leading-relaxed">{result.lifeAnalysis.health}</p>
                    </div>
                  </div>

                  {/* Spirituality */}
                  <div className="p-6 bg-white border border-orange-200 rounded-3xl flex gap-4 shadow-sm">
                    <div className="text-orange-600 mt-0.5"><Sparkles className="h-5 w-5" /></div>
                    <div>
                      <h4 className="font-serif font-bold text-stone-900 mb-2">Spiritual Calling & Soul Purpose</h4>
                      <p className="text-xs text-stone-600 leading-relaxed">{result.lifeAnalysis.spirituality}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'remedies' && (
              <div className="max-w-2xl mx-auto space-y-4">
                <div className="p-4 bg-orange-50 border border-orange-200 rounded-2xl flex gap-3 items-center mb-6">
                  <ShieldAlert className="h-5 w-5 text-orange-600 shrink-0" />
                  <p className="text-xs text-orange-800">
                    These targeted remedies help dissolve malefic planetary blockages, pacifying negative nodes and multiplying positive dasha fruits.
                  </p>
                </div>

                {result.remedies.map((remedy, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white border border-orange-200 hover:border-orange-400 transition-all duration-300 flex items-start gap-4 shadow-sm"
                  >
                    <span className="w-6 h-6 rounded-full bg-orange-50 text-orange-600 font-bold border border-orange-200 text-xs flex items-center justify-center shrink-0 font-sans">
                      {idx + 1}
                    </span>
                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-serif mt-0.5">{remedy}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
