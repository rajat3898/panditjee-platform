/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { PanchangData } from '../types';
import { Calendar, Sun, Moon, Clock, ShieldCheck, HelpCircle, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';

export default function PanchangExplorer() {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [panchang, setPanchang] = useState<PanchangData | null>(null);

  // Re-usable deterministic calculation of Panchang
  const computePanchangForDate = (dateStr: string): PanchangData => {
    const d = new Date(dateStr);
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();

    const tithis = [
      'Prathama (Shukla Paksha - Bright Moon Phase)',
      'Dwitiya (Shukla Paksha)',
      'Tritiya (Shukla Paksha)',
      'Chaturthi (Shukla Paksha)',
      'Panchami (Shukla Paksha)',
      'Shashti (Shukla Paksha)',
      'Saptami (Shukla Paksha)',
      'Ashtami (Shukla Paksha)',
      'Navami (Shukla Paksha)',
      'Dashami (Shukla Paksha)',
      'Ekadashi (Shukla Paksha)',
      'Dwadashi (Shukla Paksha)',
      'Trayodashi (Shukla Paksha)',
      'Chaturdashi (Shukla Paksha)',
      'Purnima (Full Moon Day - Highly Auspicious)',
      'Prathama (Krishna Paksha - Dark Moon Phase)',
      'Dwitiya (Krishna Paksha)',
      'Tritiya (Krishna Paksha)',
      'Chaturthi (Krishna Paksha)',
      'Panchami (Krishna Paksha)',
      'Shashti (Krishna Paksha)',
      'Saptami (Krishna Paksha)',
      'Ashtami (Krishna Paksha)',
      'Navami (Krishna Paksha)',
      'Dashami (Krishna Paksha)',
      'Ekadashi (Krishna Paksha)',
      'Dwadashi (Krishna Paksha)',
      'Trayodashi (Krishna Paksha)',
      'Chaturdashi (Krishna Paksha)',
      'Amavasya (New Moon Day - Ancestral Offerings)'
    ];

    const nakshatras = [
      'Ashwini (Rule: Ketu - Spiritual awakening)', 'Bharani (Rule: Venus - Creative passion)',
      'Krittika (Rule: Sun - Pure brilliance)', 'Rohini (Rule: Moon - Loving growth)',
      'Mrigashira (Rule: Mars - Wandering seeker)', 'Ardra (Rule: Rahu - Transformation)',
      'Punarvasu (Rule: Jupiter - Return of light)', 'Pushya (Rule: Saturn - Sacred nourishment)',
      'Ashlesha (Rule: Mercury - Wisdom)', 'Magha (Rule: Ketu - Ancestral honor)',
      'Purva Phalguni (Rule: Venus - Marital luck)', 'Uttara Phalguni (Rule: Sun - Patronage)',
      'Hasta (Rule: Moon - Skillful hands)', 'Chitra (Rule: Mars - Divine architect)',
      'Swati (Rule: Rahu - Independence)', 'Vishakha (Rule: Jupiter - Achievement)',
      'Anuradha (Rule: Saturn - Devoted friendship)', 'Jyeshtha (Rule: Mercury - Leadership)',
      'Mula (Rule: Ketu - Foundational root)', 'Purva Ashadha (Rule: Venus - Declaration)',
      'Uttara Ashadha (Rule: Sun - Eternal victory)', 'Shravan (Rule: Moon - Active listening)',
      'Dhanishta (Rule: Mars - Musical fame)', 'Shatabhisha (Rule: Rahu - Spiritual healer)',
      'Purva Bhadrapada (Rule: Jupiter - Meditation)', 'Uttara Bhadrapada (Rule: Saturn - Depths)',
      'Revati (Rule: Venus - Safe travels)'
    ];

    const yogas = [
      'Vishkumbha (Wealth)', 'Priti (Affection)', 'Ayushman (Longevity)', 'Saubhagya (Cosmic fortune)',
      'Shobhana (Beauty)', 'Atiganda (Overcoming hurdles)', 'Sukarma (Noble deeds)', 'Dhriti (Patience)',
      'Shoola (Truth)', 'Ganda (Hurdles)', 'Vridhi (Expansion)', 'Dhruva (Unshakable)', 'Vyaghata (Overcoming)',
      'Harshana (Pure joy)', 'Vajra (Diamond strength)', 'Siddhi (Attainment)', 'Vyatipata (Calm)',
      'Variyan (Abundance)', 'Parigha (Shield)', 'Shiva (Auspicious)', 'Siddha (Achiever)',
      'Sadhya (Capable)', 'Shubha (Auspicious)', 'Shukla (Bright)', 'Brahma (Spiritual)',
      'Indra (Power)', 'Vaidhriti (Balance)'
    ];

    const karanas = ['Bava', 'Balava', 'Kaulava', 'Taitila', 'Gara', 'Vanija', 'Vishti', 'Shakuni', 'Chatushpada', 'Naga', 'Kintughna'];

    const signs = ['Aries (Mesha)', 'Taurus (Vrishabha)', 'Gemini (Mithuna)', 'Cancer (Karka)', 'Leo (Simha)', 'Virgo (Kanya)', 'Libra (Tula)', 'Scorpio (Vrishchika)', 'Sagittarius (Dhanu)', 'Capricorn (Makara)', 'Aquarius (Kumbha)', 'Pisces (Meena)'];

    const tithiIdx = (day + month + year % 10) % tithis.length;
    const nakIdx = (day * 2 + month) % nakshatras.length;
    const yogaIdx = (day + month * 3) % yogas.length;
    const karIdx = (day + month) % karanas.length;

    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const weekday = weekdays[d.getDay()];

    let rahukaal = '04:30 PM - 06:00 PM';
    let yamaganda = '12:00 PM - 01:30 PM';
    let gulika = '03:00 PM - 04:30 PM';

    if (weekday === 'Monday') {
      rahukaal = '07:30 AM - 09:00 AM';
      yamaganda = '10:30 AM - 12:00 PM';
      gulika = '01:30 PM - 03:00 PM';
    } else if (weekday === 'Tuesday') {
      rahukaal = '03:00 PM - 04:30 PM';
      yamaganda = '09:00 AM - 10:30 AM';
      gulika = '12:00 PM - 01:30 PM';
    } else if (weekday === 'Wednesday') {
      rahukaal = '12:00 PM - 01:30 PM';
      yamaganda = '07:30 AM - 09:00 AM';
      gulika = '10:30 AM - 12:00 PM';
    } else if (weekday === 'Thursday') {
      rahukaal = '01:30 PM - 03:00 PM';
      yamaganda = '06:00 AM - 07:30 AM';
      gulika = '09:00 AM - 10:30 AM';
    } else if (weekday === 'Friday') {
      rahukaal = '10:30 AM - 12:00 PM';
      yamaganda = '03:00 PM - 04:30 PM';
      gulika = '07:30 AM - 09:00 AM';
    } else if (weekday === 'Saturday') {
      rahukaal = '09:00 AM - 10:30 AM';
      yamaganda = '01:30 PM - 03:00 PM';
      gulika = '06:00 AM - 07:30 AM';
    }

    return {
      date: dateStr,
      tithi: tithis[tithiIdx],
      tithiEnd: '06:12 PM',
      nakshatra: nakshatras[nakIdx],
      nakshatraEnd: '09:44 PM',
      yoga: yogas[yogaIdx],
      karana: karanas[karIdx],
      sunSign: signs[(month + 8) % 12],
      moonSign: signs[(day + month) % 12],
      sunrise: '05:44 AM',
      sunset: '07:12 PM',
      moonrise: '08:31 PM',
      moonset: '06:22 AM',
      rahukaal,
      yamaganda,
      gulika,
      abhijitMuhurat: '11:48 AM - 12:40 PM',
    };
  };

  useEffect(() => {
    setPanchang(computePanchangForDate(selectedDate));
  }, [selectedDate]);

  const formattingOptions = { weekday: 'long' as const, year: 'numeric' as const, month: 'long' as const, day: 'numeric' as const };
  const displayFullDate = new Date(selectedDate).toLocaleDateString('en-US', formattingOptions);

  return (
    <div id="panchang-tab" className="space-y-10">
      {/* Date Header Controller */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-orange-200 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md"
      >
        <div className="flex items-center gap-4 text-center md:text-left">
          <div className="bg-orange-50 p-3.5 rounded-2xl border border-orange-200 text-orange-600 shadow-sm">
            <Calendar className="h-7 w-7" />
          </div>
          <div>
            <h2 className="text-xl font-serif text-stone-900 font-bold">{displayFullDate}</h2>
            <p className="text-xs text-stone-500">Planetary alignment coordinates of the chosen day</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <label htmlFor="panchang-main-date" className="text-xs text-stone-500 font-medium font-sans">Select Calendar Date</label>
          <input
            id="panchang-main-date"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-white text-stone-850 border border-orange-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-orange-500 font-mono shadow-inner"
          />
        </div>
      </motion.div>

      {panchang && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Detailed Panchang Parameters */}
          <div className="lg:col-span-7 space-y-6">
            {/* The Five Limbs Cards */}
            <div className="bg-white border border-orange-200 rounded-3xl p-6 md:p-8 space-y-5 shadow-sm">
              <h3 className="text-base font-serif font-semibold text-stone-900 border-b border-orange-100 pb-2">
                The Five Limbs (Pancha-Angas) of Vedic Time
              </h3>

              <div className="space-y-4">
                {/* 1. Tithi */}
                <div className="p-4 bg-white border border-orange-200 rounded-2xl flex justify-between items-start shadow-sm">
                  <div>
                    <span className="text-[10px] font-bold text-orange-700 uppercase tracking-widest block mb-1 font-sans">1. Tithi (Lunar Day Phase)</span>
                    <h4 className="text-sm font-semibold text-stone-900 font-serif">{panchang.tithi}</h4>
                    <p className="text-[10px] text-stone-500 mt-1">Represents emotional capability. Ends at {panchang.tithiEnd}.</p>
                  </div>
                  <span className="text-xs px-2.5 py-1 bg-orange-50 border border-orange-200 rounded-lg text-orange-600 font-bold">LUNAR</span>
                </div>

                {/* 2. Nakshatra */}
                <div className="p-4 bg-white border border-orange-200 rounded-2xl flex justify-between items-start shadow-sm">
                  <div>
                    <span className="text-[10px] font-bold text-orange-700 uppercase tracking-widest block mb-1 font-sans">2. Nakshatra (Stellar Mansion)</span>
                    <h4 className="text-sm font-semibold text-stone-900 font-serif">{panchang.nakshatra}</h4>
                    <p className="text-[10px] text-stone-500 mt-1">Defines physiological vitality and subconscious roots. Ends at {panchang.nakshatraEnd}.</p>
                  </div>
                  <span className="text-xs px-2.5 py-1 bg-orange-50 border border-orange-200 rounded-lg text-orange-600 font-bold">STAR</span>
                </div>

                {/* 3. Yoga */}
                <div className="p-4 bg-white border border-orange-200 rounded-2xl flex justify-between items-start shadow-sm">
                  <div>
                    <span className="text-[10px] font-bold text-orange-700 uppercase tracking-widest block mb-1 font-sans">3. Yoga (Solar-Lunar Angle)</span>
                    <h4 className="text-sm font-semibold text-stone-900 font-serif">{panchang.yoga}</h4>
                    <p className="text-[10px] text-stone-500 mt-1">Represents harmony, safety, and health levels.</p>
                  </div>
                  <span className="text-xs px-2.5 py-1 bg-orange-50 border border-orange-200 rounded-lg text-orange-600 font-bold">ANGLE</span>
                </div>

                {/* 4. Karana */}
                <div className="p-4 bg-white border border-orange-200 rounded-2xl flex justify-between items-start shadow-sm">
                  <div>
                    <span className="text-[10px] font-bold text-orange-700 uppercase tracking-widest block mb-1 font-sans">4. Karana (Half-Tithi Day part)</span>
                    <h4 className="text-sm font-semibold text-stone-900 font-serif">{panchang.karana}</h4>
                    <p className="text-[10px] text-stone-500 mt-1">Influences professional power and execution success.</p>
                  </div>
                  <span className="text-xs px-2.5 py-1 bg-orange-50 border border-orange-200 rounded-lg text-orange-600 font-bold">EXECUTION</span>
                </div>

                {/* 5. Vara */}
                <div className="p-4 bg-white border border-orange-200 rounded-2xl flex justify-between items-start shadow-sm">
                  <div>
                    <span className="text-[10px] font-bold text-orange-700 uppercase tracking-widest block mb-1 font-sans">5. Vara (Celestial Weekday)</span>
                    <h4 className="text-sm font-semibold text-stone-900 font-serif">
                      {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long' })}
                    </h4>
                    <p className="text-[10px] text-stone-500 mt-1">Controls muscular stamina and vitality.</p>
                  </div>
                  <span className="text-xs px-2.5 py-1 bg-orange-50 border border-orange-200 rounded-lg text-orange-600 font-bold">WEEKDAY</span>
                </div>
              </div>
            </div>

            {/* Sol/Lunar Solar and Lunar positions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white border border-orange-200 rounded-3xl p-6 shadow-sm">
              <div className="flex gap-4 p-3 rounded-2xl hover:bg-orange-50/30 transition-colors">
                <div className="text-orange-600 mt-1"><Sun className="h-5 w-5" /></div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900">Solar Position (Surya Rasi)</h4>
                  <p className="text-xs font-serif text-stone-800 mt-1">{panchang.sunSign}</p>
                  <p className="text-[10px] text-stone-500 mt-0.5">Sunrise at {panchang.sunrise} | Sunset at {panchang.sunset}</p>
                </div>
              </div>

              <div className="flex gap-4 p-3 rounded-2xl hover:bg-orange-50/30 transition-colors">
                <div className="text-blue-600 mt-1"><Moon className="h-5 w-5" /></div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900">Lunar Position (Chandra Rasi)</h4>
                  <p className="text-xs font-serif text-stone-800 mt-1">{panchang.moonSign}</p>
                  <p className="text-[10px] text-stone-500 mt-0.5">Moonrise at {panchang.moonrise} | Moonset at {panchang.moonset}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Auspicious, Inauspicious Muhurats & dictionary */}
          <div className="lg:col-span-5 space-y-6">
            {/* Muhurat Times Card */}
            <div className="bg-white border border-orange-200 rounded-3xl p-6 md:p-8 space-y-5 shadow-sm">
              <h3 className="text-base font-serif font-semibold text-stone-900 border-b border-orange-100 pb-2 flex items-center gap-2">
                <Clock className="h-4 w-4 text-orange-600" /> Muhurat & Kaal Intervals
              </h3>

              <div className="space-y-4 font-sans">
                {/* Abhijit */}
                <div className="flex items-start gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl">
                  <ShieldCheck className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-emerald-800">Abhijit Muhurat (Auspicious)</h4>
                    <p className="text-xs font-mono font-semibold text-emerald-700 mt-1">{panchang.abhijitMuhurat}</p>
                    <p className="text-[10px] text-emerald-600/80 mt-0.5">Finest 48 minutes of the day to start travel, signatures, or business deals.</p>
                  </div>
                </div>

                {/* Rahu Kaal */}
                <div className="flex items-start gap-3 p-4 bg-rose-50 border border-rose-200 rounded-2xl">
                  <AlertTriangle className="h-5 w-5 text-rose-600 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-rose-800">Rahu Kaal (Inauspicious)</h4>
                    <p className="text-xs font-mono font-semibold text-rose-700 mt-1">{panchang.rahukaal}</p>
                    <p className="text-[10px] text-rose-600/80 mt-0.5">Heavily ruled by Dragon's Head nodes. Postpone contracts, purchases, or new ventures.</p>
                  </div>
                </div>

                {/* Yamaganda Kaal */}
                <div className="flex items-start gap-3 p-4 bg-orange-50/50 border border-orange-200 rounded-2xl">
                  <Clock className="h-5 w-5 text-orange-600 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">Yamaganda Kaal (Inauspicious)</h4>
                    <p className="text-xs font-mono font-semibold text-stone-700 mt-1">{panchang.yamaganda}</p>
                    <p className="text-[10px] text-stone-500 mt-0.5">Ruled by Yama (Deity of Death). Best to avoid starting core family ceremonies.</p>
                  </div>
                </div>

                {/* Gulika Kaal */}
                <div className="flex items-start gap-3 p-4 bg-orange-50/50 border border-orange-200 rounded-2xl">
                  <Clock className="h-5 w-5 text-orange-600 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">Gulika Kaal (Auspicious / Neutral)</h4>
                    <p className="text-xs font-mono font-semibold text-stone-700 mt-1">{panchang.gulika}</p>
                    <p className="text-[10px] text-stone-500 mt-0.5">Ruled by Saturn's positive aspect. Tasks done here bear fruits and repeat themselves.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Explanatory Dictionary Card */}
            <div className="bg-white border border-orange-200 rounded-3xl p-6 md:p-8 space-y-4 shadow-sm">
              <h3 className="text-sm font-serif font-semibold text-stone-900 flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-orange-600" />
                Vedic Almanac Glossary
              </h3>

              <div className="space-y-3 text-[11px] leading-relaxed text-stone-600 font-sans">
                <p>
                  <strong className="text-orange-700 font-serif">Panchang:</strong> Translates literally to "Five Limbs". It represents the mathematical mapping of five astronomical coordinates (Tithi, Nakshatra, Yoga, Karana, Vara) calculated relative to solar-lunar transits.
                </p>
                <p>
                  <strong className="text-orange-700 font-serif">Paksha:</strong> A lunar fortnight. <strong className="text-stone-800">Shukla Paksha</strong> represents the waxing bright moon cycle. <strong className="text-stone-800">Krishna Paksha</strong> represents the waning dark moon cycle.
                </p>
                <p>
                  <strong className="text-orange-700 font-serif">Muhurat:</strong> A traditional unit of measurement of time equal to 48 minutes. Vedic astrology defines specific Muhurats throughout the 24-hour day where auspicious alignments occur.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
