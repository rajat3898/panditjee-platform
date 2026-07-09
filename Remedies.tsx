/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import { DailyHoroscope, PanchangData } from '../types';
import { Sun, Moon, Calendar, Sparkles, BookOpen, Clock, AlertTriangle, Eye, MapPin, MessageSquare, Phone, Mail, Send, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface DashboardProps {
  onNavigate: (tab: string) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const [selectedSign, setSelectedSign] = useState<string>('Aries (Mesha)');
  const [horoscope, setHoroscope] = useState<DailyHoroscope | null>(null);
  const [loadingHoroscope, setLoadingHoroscope] = useState<boolean>(false);
  const [panchangDate, setPanchangDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [panchang, setPanchang] = useState<PanchangData | null>(null);

  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: 'General Query', message: '' });
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);

  const zodiacSigns = [
    { name: 'Aries (Mesha)', symbol: '♈', element: 'Fire', dates: 'Mar 21 - Apr 19' },
    { name: 'Taurus (Vrishabha)', symbol: '♉', element: 'Earth', dates: 'Apr 20 - May 20' },
    { name: 'Gemini (Mithuna)', symbol: '♊', element: 'Air', dates: 'May 21 - Jun 20' },
    { name: 'Cancer (Karka)', symbol: '♋', element: 'Water', dates: 'Jun 21 - Jul 22' },
    { name: 'Leo (Simha)', symbol: '♌', element: 'Fire', dates: 'Jul 23 - Aug 22' },
    { name: 'Virgo (Kanya)', symbol: '♍', element: 'Earth', dates: 'Aug 23 - Sep 22' },
    { name: 'Libra (Tula)', symbol: '♎', element: 'Air', dates: 'Sep 23 - Oct 22' },
    { name: 'Scorpio (Vrishchika)', symbol: '♏', element: 'Water', dates: 'Oct 23 - Nov 21' },
    { name: 'Sagittarius (Dhanu)', symbol: '♐', element: 'Fire', dates: 'Nov 22 - Dec 21' },
    { name: 'Capricorn (Makara)', symbol: '♑', element: 'Earth', dates: 'Dec 22 - Jan 19' },
    { name: 'Aquarius (Kumbha)', symbol: '♒', element: 'Air', dates: 'Jan 20 - Feb 18' },
    { name: 'Pisces (Meena)', symbol: '♓', element: 'Water', dates: 'Feb 19 - Mar 20' },
  ];

  // Simulated Vedic Panchang calculations based on chosen date to make it realistic
  const computePanchangForDate = (dateStr: string): PanchangData => {
    const d = new Date(dateStr);
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();

    const tithis = [
      'Prathama (1st)', 'Dwitiya (2nd)', 'Tritiya (3rd)', 'Chaturthi (4th)', 'Panchami (5th)',
      'Shashti (6th)', 'Saptami (7th)', 'Ashtami (8th)', 'Navami (9th)', 'Dashami (10th)',
      'Ekadashi (11th)', 'Dwadashi (12th)', 'Trayodashi (13th)', 'Chaturdashi (14th)',
      'Purnima (Full Moon)', 'Amavasya (New Moon)'
    ];

    const nakshatras = [
      'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha',
      'Magha', 'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
      'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravan', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
    ];

    const yogas = [
      'Vishkumbha', 'Priti', 'Ayushman', 'Saubhagya', 'Shobhana', 'Atiganda', 'Sukarma', 'Dhriti', 'Shoola',
      'Ganda', 'Vridhi', 'Dhruva', 'Vyaghata', 'Harshana', 'Vajra', 'Siddhi', 'Vyatipata', 'Variyan', 'Parigha',
      'Shiva', 'Siddha', 'Sadhya', 'Shubha', 'Shukla', 'Brahma', 'Indra', 'Vaidhriti'
    ];

    const karanas = ['Bava', 'Balava', 'Kaulava', 'Taitila', 'Gara', 'Vanija', 'Vishti', 'Shakuni', 'Chatushpada', 'Naga', 'Kintughna'];

    const zodiacSignsList = ['Aries (Mesha)', 'Taurus (Vrishabha)', 'Gemini (Mithuna)', 'Cancer (Karka)', 'Leo (Simha)', 'Virgo (Kanya)', 'Libra (Tula)', 'Scorpio (Vrishchika)', 'Sagittarius (Dhanu)', 'Capricorn (Makara)', 'Aquarius (Kumbha)', 'Pisces (Meena)'];

    // Deterministic mappings using date arithmetic
    const tithiIdx = (day + month + year % 10) % tithis.length;
    const nakIdx = (day * 2 + month) % nakshatras.length;
    const yogaIdx = (day + month * 3) % yogas.length;
    const karIdx = (day + month) % karanas.length;

    // Daily Rahu Kaal varies by weekday (deterministic formula)
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const weekday = weekdays[d.getDay()];
    let rahukaal = '04:30 PM - 06:00 PM';
    let yamaganda = '12:00 PM - 01:30 PM';

    if (weekday === 'Monday') {
      rahukaal = '07:30 AM - 09:00 AM';
      yamaganda = '10:30 AM - 12:00 PM';
    } else if (weekday === 'Tuesday') {
      rahukaal = '03:00 PM - 04:30 PM';
      yamaganda = '09:00 AM - 10:30 AM';
    } else if (weekday === 'Wednesday') {
      rahukaal = '12:00 PM - 01:30 PM';
      yamaganda = '07:30 AM - 09:00 AM';
    } else if (weekday === 'Thursday') {
      rahukaal = '01:30 PM - 03:00 PM';
      yamaganda = '06:00 AM - 07:30 AM';
    } else if (weekday === 'Friday') {
      rahukaal = '10:30 AM - 12:00 PM';
      yamaganda = '03:00 PM - 04:30 PM';
    } else if (weekday === 'Saturday') {
      rahukaal = '09:00 AM - 10:30 AM';
      yamaganda = '01:30 PM - 03:00 PM';
    }

    return {
      date: dateStr,
      tithi: tithis[tithiIdx],
      tithiEnd: '08:42 PM',
      nakshatra: nakshatras[nakIdx],
      nakshatraEnd: '11:15 PM',
      yoga: yogas[yogaIdx],
      karana: karanas[karIdx],
      sunSign: zodiacSignsList[(month + 8) % 12],
      moonSign: zodiacSignsList[(day + month) % 12],
      sunrise: '05:44 AM',
      sunset: '07:12 PM',
      moonrise: '08:31 PM',
      moonset: '06:22 AM',
      rahukaal,
      yamaganda,
      gulika: '12:00 PM - 01:30 PM',
      abhijitMuhurat: '11:48 AM - 12:40 PM',
    };
  };

  useEffect(() => {
    // Generate Panchang
    setPanchang(computePanchangForDate(panchangDate));
  }, [panchangDate]);

  // Fetch Daily Horoscope from server API
  const fetchHoroscope = async (signName: string) => {
    setLoadingHoroscope(true);
    try {
      const response = await fetch('/api/horoscope', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sign: signName }),
      });
      const data = await response.json();
      if (response.ok) {
        setHoroscope(data);
      } else {
        console.error(data.error);
      }
    } catch (err) {
      console.error('Error fetching horoscope:', err);
    } finally {
      setLoadingHoroscope(false);
    }
  };

  useEffect(() => {
    fetchHoroscope(selectedSign);
  }, [selectedSign]);

  const dailyRemedies = [
    { title: 'Morning Blessing', text: 'Chant "Om Ganesha" 11 times upon waking up to remove hurdles.', time: 'Sunrise' },
    { title: 'Suryadev Arghya', text: 'Offer fresh copper water to the rising Sun for health and vitality.', time: '06:00 AM - 07:00 AM' },
    { title: 'Prasada Dana', text: 'Offer wheat bread or sweet grain to birds to appease Saturn/Rahu forces.', time: 'Afternoon' },
    { title: 'Dhyana Sandhya', text: 'Meditation in the direction of the East with a ghee lamp lit.', time: 'Sunset' },
  ];

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmittingContact(true);
    setTimeout(() => {
      setIsSubmittingContact(false);
      setContactSubmitted(true);
    }, 1200);
  };

  return (
    <div id="dashboard-tab" className="space-y-10">
      {/* 1. Divine Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl border border-orange-200 bg-gradient-to-br from-orange-600 via-orange-500 to-amber-600 p-8 md:p-12 text-center shadow-xl shadow-orange-600/10"
      >
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>

        <div className="mx-auto flex justify-center mb-4">
          <div className="bg-white/20 p-3 rounded-full border border-white/30 animate-pulse">
            <Sparkles className="h-10 w-10 text-white" />
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-serif tracking-tight text-white font-bold mb-4">
          PanditJee
        </h1>
        <p className="text-orange-50 font-serif italic text-base md:text-lg max-w-2xl mx-auto mb-6">
          "यद्भावं तद्भवति" — As is your faith, so is your outcome. Discover celestial paths, seek ancient wisdom, and align your karma with divine grace.
        </p>

        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          <button
            id="navigate-chat"
            onClick={() => onNavigate('Chat')}
            className="px-5 py-2.5 rounded-full bg-white hover:bg-orange-50 text-orange-600 font-semibold shadow-md transition-all duration-300 text-xs sm:text-sm"
          >
            Consult Pandit Jee
          </button>
          <button
            id="navigate-pujas"
            onClick={() => onNavigate('Pujas')}
            className="px-5 py-2.5 rounded-full bg-orange-700/40 hover:bg-orange-700 text-white border border-orange-400 hover:border-white text-xs sm:text-sm transition-all duration-300"
          >
            Pujas & Rituals
          </button>
          <button
            id="navigate-travel"
            onClick={() => onNavigate('Travel')}
            className="px-5 py-2.5 rounded-full bg-orange-700/40 hover:bg-orange-700 text-white border border-orange-400 hover:border-white text-xs sm:text-sm transition-all duration-300"
          >
            Spiritual Travel
          </button>
          <button
            id="navigate-samagri"
            onClick={() => onNavigate('Samagri')}
            className="px-5 py-2.5 rounded-full bg-orange-700/40 hover:bg-orange-700 text-white border border-orange-400 hover:border-white text-xs sm:text-sm transition-all duration-300"
          >
            Puja Samagris
          </button>
          <button
            id="navigate-kundali"
            onClick={() => onNavigate('Kundali')}
            className="px-5 py-2.5 rounded-full bg-orange-700/40 hover:bg-orange-700 text-white border border-orange-400 hover:border-white text-xs sm:text-sm transition-all duration-300"
          >
            Generate Birth Chart
          </button>
        </div>
      </motion.div>

      {/* 2. Grid Layout for Panchang and Horoscope */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Panchang Widget (Almanac) */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-7 bg-white border border-orange-200 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-md"
        >
          <div>
            <div className="flex items-center justify-between mb-6 border-b border-orange-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="bg-orange-50 p-2 rounded-xl text-orange-600">
                  <Calendar className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-serif text-stone-900 font-semibold">Daily Panchang</h2>
                  <p className="text-xs text-stone-500">Vedic Astronomical Almanac</p>
                </div>
              </div>
              <input
                id="panchang-date-picker"
                type="date"
                value={panchangDate}
                onChange={(e) => setPanchangDate(e.target.value)}
                className="bg-orange-50/50 text-stone-800 border border-orange-200 px-3 py-1.5 rounded-lg text-xs focus:outline-none focus:border-orange-500 font-mono"
              />
            </div>

            {panchang && (
              <div className="space-y-6">
                {/* Sol/Lunar Timings */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-orange-50/30 p-4 rounded-2xl border border-orange-100">
                  <div className="flex items-center gap-2">
                    <Sun className="h-4 w-4 text-orange-500" />
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-stone-500">Sunrise</p>
                      <p className="text-xs font-semibold text-stone-800">{panchang.sunrise}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sun className="h-4 w-4 text-amber-600" />
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-stone-500">Sunset</p>
                      <p className="text-xs font-semibold text-stone-800">{panchang.sunset}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Moon className="h-4 w-4 text-blue-500" />
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-stone-500">Moonrise</p>
                      <p className="text-xs font-semibold text-stone-800">{panchang.moonrise}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Moon className="h-4 w-4 text-stone-600" />
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-stone-500">Moonset</p>
                      <p className="text-xs font-semibold text-stone-800">{panchang.moonset}</p>
                    </div>
                  </div>
                </div>

                {/* core panchang parameters */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex justify-between items-center p-3.5 bg-orange-50/10 rounded-xl border border-orange-100/50">
                    <span className="text-xs text-stone-600 font-medium">Tithi (lunar day)</span>
                    <span className="text-xs text-stone-800 font-semibold text-right">{panchang.tithi}</span>
                  </div>
                  <div className="flex justify-between items-center p-3.5 bg-orange-50/10 rounded-xl border border-orange-100/50">
                    <span className="text-xs text-stone-600 font-medium">Nakshatra (birth star)</span>
                    <span className="text-xs text-stone-800 font-semibold text-right">{panchang.nakshatra}</span>
                  </div>
                  <div className="flex justify-between items-center p-3.5 bg-orange-50/10 rounded-xl border border-orange-100/50">
                    <span className="text-xs text-stone-600 font-medium">Yoga (celestial angle)</span>
                    <span className="text-xs text-stone-800 font-semibold text-right">{panchang.yoga}</span>
                  </div>
                  <div className="flex justify-between items-center p-3.5 bg-orange-50/10 rounded-xl border border-orange-100/50">
                    <span className="text-xs text-stone-600 font-medium">Karana (half-tithi)</span>
                    <span className="text-xs text-stone-800 font-semibold text-right">{panchang.karana}</span>
                  </div>
                  <div className="flex justify-between items-center p-3.5 bg-orange-50/10 rounded-xl border border-orange-100/50">
                    <span className="text-xs text-stone-600 font-medium">Surya Rasi (Sun sign)</span>
                    <span className="text-xs text-stone-800 font-semibold text-right">{panchang.sunSign}</span>
                  </div>
                  <div className="flex justify-between items-center p-3.5 bg-orange-50/10 rounded-xl border border-orange-100/50">
                    <span className="text-xs text-stone-600 font-medium">Chandra Rasi (Moon sign)</span>
                    <span className="text-xs text-stone-800 font-semibold text-right">{panchang.moonSign}</span>
                  </div>
                </div>

                {/* Auspicious and Inauspicious times */}
                <div className="border-t border-orange-100 pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 flex gap-3">
                    <div className="text-emerald-600 mt-0.5">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-emerald-800">Abhijit Muhurat (Auspicious)</h4>
                      <p className="text-xs font-mono text-emerald-700 mt-1">{panchang.abhijitMuhurat}</p>
                      <p className="text-[10px] text-emerald-600/70 mt-0.5">Perfect for starting new ventures or tasks.</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-rose-50 border border-rose-100 flex gap-3">
                    <div className="text-rose-600 mt-0.5">
                      <AlertTriangle className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-rose-800">Rahu Kaal (Inauspicious)</h4>
                      <p className="text-xs font-mono text-rose-700 mt-1">{panchang.rahukaal}</p>
                      <p className="text-[10px] text-rose-600/70 mt-0.5">Avoid major contracts, travels or rituals.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 text-center">
            <button
              id="view-full-panchang"
              onClick={() => onNavigate('Panchang')}
              className="text-xs font-medium text-orange-600 hover:text-orange-700 hover:underline transition-colors"
            >
              Explore Detailed Hindu Lunar Calendar →
            </button>
          </div>
        </motion.div>

        {/* Right: Daily Horoscope selector */}
        <motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-5 bg-white border border-orange-200 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-md"
        >
          <div>
            <div className="flex items-center gap-3 mb-6 border-b border-orange-100 pb-4">
              <div className="bg-orange-50 p-2 rounded-xl text-orange-600">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-serif text-stone-900 font-semibold">Daily Horoscope</h2>
                <p className="text-xs text-stone-500">Personal Zodiac Readings</p>
              </div>
            </div>

            {/* Dropdown sign selector */}
            <div className="mb-6">
              <label htmlFor="sign-select" className="block text-[10px] uppercase tracking-wider text-stone-500 mb-2 font-medium font-sans">Select your Moon/Sun Sign</label>
              <select
                id="sign-select"
                value={selectedSign}
                onChange={(e) => setSelectedSign(e.target.value)}
                className="w-full bg-white text-stone-800 border border-orange-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-orange-500 font-serif"
              >
                {zodiacSigns.map((z) => (
                  <option key={z.name} value={z.name} className="bg-white text-stone-800">
                    {z.symbol} {z.name} ({z.dates})
                  </option>
                ))}
              </select>
            </div>

            {loadingHoroscope ? (
              <div className="py-12 flex flex-col items-center justify-center space-y-3">
                <div className="w-10 h-10 border-4 border-orange-100 border-t-orange-600 rounded-full animate-spin"></div>
                <p className="text-xs text-stone-500 font-serif">Aligning with cosmic frequencies...</p>
              </div>
            ) : horoscope ? (
              <div className="space-y-4">
                <div className="bg-orange-50/50 p-4 rounded-2xl border border-orange-100 mb-4">
                  <h3 className="text-xs uppercase tracking-wider text-orange-600 font-semibold mb-2 flex items-center gap-1.5">
                    <Eye className="h-3.5 w-3.5" /> General Vibe
                  </h3>
                  <p className="text-xs leading-relaxed text-stone-700 italic">{horoscope.general}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3 bg-orange-50/10 rounded-xl border border-orange-100/50 text-center">
                    <span className="block text-[9px] uppercase tracking-wider text-stone-400 font-semibold">Career</span>
                    <span className="text-[11px] leading-tight text-stone-600 mt-1 block h-10 overflow-y-auto">{horoscope.career.substring(0, 50)}...</span>
                  </div>
                  <div className="p-3 bg-orange-50/10 rounded-xl border border-orange-100/50 text-center">
                    <span className="block text-[9px] uppercase tracking-wider text-stone-400 font-semibold">Love</span>
                    <span className="text-[11px] leading-tight text-stone-600 mt-1 block h-10 overflow-y-auto">{horoscope.love.substring(0, 50)}...</span>
                  </div>
                  <div className="p-3 bg-orange-50/10 rounded-xl border border-orange-100/50 text-center">
                    <span className="block text-[9px] uppercase tracking-wider text-stone-400 font-semibold">Finance</span>
                    <span className="text-[11px] leading-tight text-stone-600 mt-1 block h-10 overflow-y-auto">{horoscope.finance.substring(0, 50)}...</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-orange-100 grid grid-cols-2 gap-4">
                  <div className="p-3 bg-orange-50/20 rounded-xl border border-orange-100 flex justify-between items-center">
                    <span className="text-xs text-stone-500">Lucky Color</span>
                    <span className="text-xs font-semibold text-stone-800 flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-orange-500 border border-orange-300"></span>
                      {horoscope.luckyColor}
                    </span>
                  </div>
                  <div className="p-3 bg-orange-50/20 rounded-xl border border-orange-100 flex justify-between items-center font-mono">
                    <span className="text-xs text-stone-500 font-sans">Lucky Number</span>
                    <span className="text-sm font-bold text-orange-600">{horoscope.luckyNumber}</span>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          <div className="mt-6 text-[10px] text-stone-400 text-center leading-normal">
            Horoscope readings are generated daily via Gemini and calculated based on Vedic planetary transits.
          </div>
        </motion.div>
      </div>

      {/* 3. Daily Remediations and Ritual Schedule */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-white border border-orange-200 rounded-3xl p-6 md:p-8 shadow-md"
      >
        <div className="flex items-center gap-3 mb-6 border-b border-orange-100 pb-4">
          <div className="bg-orange-50 p-2 rounded-xl text-orange-600">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-serif text-stone-900 font-semibold">Sattvic Routine (Daily Karma Alignment)</h2>
            <p className="text-xs text-stone-500">Align your day with cosmic rhythm using clean rituals</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {dailyRemedies.map((rem, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-orange-100 hover:border-orange-300 hover:bg-orange-50/20 transition-all duration-300 flex flex-col justify-between shadow-sm"
            >
              <div>
                <span className="text-[10px] font-semibold text-orange-700 uppercase tracking-wider bg-orange-100 px-2 py-0.5 rounded-full inline-block mb-3 font-sans">
                  {rem.time}
                </span>
                <h4 className="font-serif text-stone-900 font-semibold mb-2">{rem.title}</h4>
                <p className="text-xs text-stone-600 leading-relaxed">{rem.text}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 4. Contact Us Section */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        id="contact-section"
        className="bg-white border border-orange-200 rounded-3xl p-6 md:p-8 shadow-md"
      >
        <div className="flex items-center gap-3 mb-6 border-b border-orange-100 pb-4">
          <div className="bg-orange-50 p-2 rounded-xl text-orange-600">
            <MessageSquare className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-serif text-stone-900 font-semibold">Contact Us (Connect with PanditJee)</h2>
            <p className="text-xs text-stone-500">Reach out for personalized consultation, puja booking support, and cosmic remedies</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Direct info cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* WhatsApp Contact Card */}
            <a 
              href="https://wa.me/917549425216" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 border border-emerald-200 hover:border-emerald-400 hover:shadow-md transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="bg-emerald-600 p-3 rounded-xl text-white shadow-sm group-hover:scale-105 transition-transform">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-800">Quick WhatsApp Support</span>
                  <h3 className="text-base font-bold text-stone-900 font-mono">+91 75494 25216</h3>
                  <p className="text-xs text-stone-600 leading-normal">
                    Click to instantly chat with our team on WhatsApp for booking pujas, samagri orders, or astro queries.
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 mt-2">
                    Start Chatting Now &rarr;
                  </span>
                </div>
              </div>
            </a>

            {/* Address Card */}
            <div className="p-5 rounded-2xl bg-orange-50/50 border border-orange-200 space-y-3">
              <div className="flex items-start gap-4">
                <div className="bg-orange-600 p-3 rounded-xl text-white shadow-sm">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-orange-700">Our Sacred Desk Address</span>
                  <h3 className="text-base font-bold text-stone-900 font-serif">Patna Office</h3>
                  <p className="text-xs text-stone-800 font-medium font-sans">
                    Bailey Road, Patna, Bihar, India
                  </p>
                  <p className="text-xs text-stone-500 leading-normal">
                    Visit us for offline Kundali consultations, hand-picked original gemstones, and premium customized puja arrangements.
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Contact Channels */}
            <div className="p-4 rounded-2xl border border-stone-150 bg-stone-50/30 flex justify-between items-center text-xs font-medium">
              <div className="flex items-center gap-2 text-stone-600">
                <Phone className="h-4 w-4 text-orange-600" />
                <span>Call Center</span>
              </div>
              <span className="text-stone-850 font-semibold font-mono">+91 75494 25216</span>
            </div>

            <div className="p-4 rounded-2xl border border-stone-150 bg-stone-50/30 flex justify-between items-center text-xs font-medium">
              <div className="flex items-center gap-2 text-stone-600">
                <Mail className="h-4 w-4 text-orange-600" />
                <span>Email Enquiry</span>
              </div>
              <span className="text-stone-850 font-semibold font-mono font-sans">support@panditjee.org</span>
            </div>
          </div>

          {/* Right Column: Direct inquiry Form */}
          <div className="lg:col-span-7 bg-orange-50/15 border border-orange-100 p-6 rounded-2xl relative">
            {contactSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 bg-white/95 rounded-2xl flex flex-col items-center justify-center text-center p-6 space-y-4 z-10"
              >
                <div className="bg-emerald-100 text-emerald-600 p-4 rounded-full">
                  <CheckCircle className="h-10 w-10 animate-bounce" />
                </div>
                <h3 className="text-lg font-serif font-bold text-stone-900">Message Received by the Heavens!</h3>
                <p className="text-xs text-stone-600 max-w-sm">
                  Thank you for your spiritual inquiry. Our Pandit desk is reviewing your chart and alignment, and we will contact you via WhatsApp or email within 1 hour.
                </p>
                <button
                  id="btn-new-inquiry"
                  onClick={() => setContactSubmitted(false)}
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-xl text-xs font-semibold shadow-sm transition-all cursor-pointer"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : null}

            <h3 className="text-sm font-serif font-bold text-stone-900 mb-4 flex items-center gap-1.5">
              <Send className="h-4 w-4 text-orange-600" /> Direct Spiritual Inquiry Form
            </h3>

            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider block">Your Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full bg-white border border-orange-200 focus:border-orange-500 rounded-xl px-3 py-2 text-xs focus:outline-none placeholder-stone-400 font-medium"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider block">Email Address</label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full bg-white border border-orange-200 focus:border-orange-500 rounded-xl px-3 py-2 text-xs focus:outline-none placeholder-stone-400 font-medium font-sans"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-subject" className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider block">Inquiry Category</label>
                <select
                  id="contact-subject"
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  className="w-full bg-white border border-orange-200 focus:border-orange-500 rounded-xl px-3 py-2 text-xs focus:outline-none font-medium"
                >
                  <option value="General Query">General Vedic Consultation</option>
                  <option value="Kundali Verification">Personalized Birth Chart (Kundali) Analysis</option>
                  <option value="Puja Booking">Sacred Puja & Havan Booking</option>
                  <option value="Pooja Samagri Order">Premium Samagri Delivery Help</option>
                  <option value="Spiritual Travel Enquiry">Teerth Yatra / Tour Planning</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider block">Your Message / Birth details</label>
                <textarea
                  id="contact-message"
                  required
                  rows={3}
                  placeholder="Tell us your query or share your custom birth details (Date, Time, Place of birth) so our Pandits can pre-analyze your chart."
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  className="w-full bg-white border border-orange-200 focus:border-orange-500 rounded-xl px-3 py-2 text-xs focus:outline-none placeholder-stone-400 font-medium"
                ></textarea>
              </div>

              <button
                id="btn-submit-contact"
                type="submit"
                disabled={isSubmittingContact}
                className="w-full py-2.5 bg-orange-600 hover:bg-orange-500 disabled:opacity-50 text-white font-semibold rounded-xl text-xs shadow-sm hover:shadow transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmittingContact ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending Enquiry to Panditji Desk...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-3 w-3" />
                    <span>Submit Sacred Enquiry</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
