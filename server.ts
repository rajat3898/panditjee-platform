/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Initialize Google GenAI
const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Heuristic calculation of Vedic Placements to ensure perfect consistency between
// visual Kundali chart SVG and AI readings
function calculatePlacements(dob: string, tob: string) {
  const dateObj = new Date(`${dob}T${tob || '12:00'}:00`);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1; // 1-12
  const day = dateObj.getDate();
  const hours = dateObj.getHours() + dateObj.getMinutes() / 60;

  // 12 Signs (Rasis) in order
  const signs = [
    'Aries (Mesha)', 'Taurus (Vrishabha)', 'Gemini (Mithuna)', 'Cancer (Karka)',
    'Leo (Simha)', 'Virgo (Kanya)', 'Libra (Tula)', 'Scorpio (Vrishchika)',
    'Sagittarius (Dhanu)', 'Capricorn (Makara)', 'Aquarius (Kumbha)', 'Pisces (Meena)'
  ];

  // 27 Nakshatras
  const nakshatras = [
    'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha',
    'Magha', 'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
    'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravan', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
  ];

  // Ascendant (Lagna) placement
  // At sunrise (approx 6 AM), Lagna matches the Sun Sign.
  // The Lagna changes roughly every 2 hours (30 degrees).
  const sunSignIndex = (month + 8) % 12; // Sun enters Aries around April (month 4)
  const lagnaIndex = Math.floor((sunSignIndex + (hours - 6) / 2 + 12) % 12);
  const ascendantSign = signs[lagnaIndex];

  // Heuristic Planetary Placements
  // Lagna becomes House 1. House of a sign is relative to the Lagna house index.
  const getHouseNum = (signIdx: number) => {
    return ((signIdx - lagnaIndex + 12) % 12) + 1;
  };

  // 1. Sun Position (moves ~1 degree per day, 1 sign per month)
  const sunSignIdx = (month + 8) % 12;
  const sunHouse = getHouseNum(sunSignIdx);

  // 2. Moon Position (moves ~13 degrees per day, 1 sign per 2.25 days)
  const dayOfYear = Math.floor((dateObj.getTime() - new Date(year, 0, 1).getTime()) / (1000 * 60 * 60 * 24));
  const moonSignIdx = Math.floor((dayOfYear / 2.25 + day) % 12);
  const moonHouse = getHouseNum(moonSignIdx);
  const nakshatraIdx = Math.floor((dayOfYear / 1.01 + day) % 27);
  const nakshatraName = nakshatras[nakshatraIdx];
  const nakshatraCharan = ((day % 4) + 1);

  // 3. Other planets distributed deterministically based on birth info to create rich, varied charts
  const marsSignIdx = (year + month + day) % 12;
  const mercurySignIdx = (sunSignIdx + (day % 3) - 1 + 12) % 12; // Mercury is always close to the Sun
  const jupiterSignIdx = (year % 12); // Jupiter stays ~1 year per sign
  const venusSignIdx = (sunSignIdx + (day % 4) - 1.5 + 12) % 12; // Venus is always close to the Sun
  const saturnSignIdx = Math.floor((year / 2.5) % 12); // Saturn stays ~2.5 years per sign
  const rahuSignIdx = (year * 3 + month) % 12;
  const ketuSignIdx = (rahuSignIdx + 6) % 12; // Ketu is always 180 deg (6 houses) from Rahu

  const placements = [
    { planet: 'Sun (Surya)', sign: signs[sunSignIdx], degree: Math.floor((day * 1.3) % 30) || 5, house: sunHouse },
    { planet: 'Moon (Chandra)', sign: signs[moonSignIdx], degree: Math.floor((hours * 1.5) % 30) || 12, house: moonHouse },
    { planet: 'Mars (Mangal)', sign: signs[marsSignIdx], degree: Math.floor((day * 2) % 30) || 18, house: getHouseNum(marsSignIdx) },
    { planet: 'Mercury (Budha)', sign: signs[mercurySignIdx], degree: Math.floor((day * 1.1) % 30) || 22, house: getHouseNum(mercurySignIdx) },
    { planet: 'Jupiter (Guru)', sign: signs[jupiterSignIdx], degree: Math.floor((day * 0.5) % 30) || 14, house: getHouseNum(jupiterSignIdx) },
    { planet: 'Venus (Shukra)', sign: signs[venusSignIdx], degree: Math.floor((day * 1.2) % 30) || 9, house: getHouseNum(venusSignIdx) },
    { planet: 'Saturn (Shani)', sign: signs[saturnSignIdx], degree: Math.floor((year * 0.3) % 30) || 27, house: getHouseNum(saturnSignIdx) },
    { planet: 'Rahu (North Node)', sign: signs[rahuSignIdx], degree: Math.floor((month * 2.5) % 30) || 15, house: getHouseNum(rahuSignIdx) },
    { planet: 'Ketu (South Node)', sign: signs[ketuSignIdx], degree: Math.floor((month * 2.5) % 30) || 15, house: getHouseNum(ketuSignIdx) },
  ];

  return {
    ascendant: ascendantSign,
    moonSign: signs[moonSignIdx],
    sunSign: signs[sunSignIdx],
    nakshatra: nakshatraName,
    nakshatraCharan,
    placements
  };
}

// Ashtakoot Matching Calculator
function calculateAshtakoot(boyName: string, girlName: string, seedInput: number) {
  // A deterministic matching scoring based on input values to output authentic-feeling data
  const seed = (seedInput % 100) / 100;

  // Gun max values: Varna (1), Vashya (2), Tara (3), Yoni (4), Maitri (5), Gana (6), Bhakoot (7), Nadi (8)
  const categories = [
    { name: 'Varna (Duty/Ego)', maxPoints: 1, weights: [1, 1, 0.5, 0] },
    { name: 'Vashya (Attraction)', maxPoints: 2, weights: [2, 1.5, 1, 0.5] },
    { name: 'Tara (Destiny)', maxPoints: 3, weights: [3, 2, 1.5, 1] },
    { name: 'Yoni (Nature/Union)', maxPoints: 4, weights: [4, 3, 2, 1, 0] },
    { name: 'Maitri (Mental Friendship)', maxPoints: 5, weights: [5, 4, 3, 1, 0] },
    { name: 'Gana (Temperament)', maxPoints: 6, weights: [6, 5, 3, 1.5, 0] },
    { name: 'Bhakoot (Emotional Love)', maxPoints: 7, weights: [7, 7, 0, 0] },
    { name: 'Nadi (Genetics/Health)', maxPoints: 8, weights: [8, 8, 0, 0] }
  ];

  let totalScore = 0;
  const ashtakoot = categories.map((cat, idx) => {
    // Generate deterministic values based on indexes and seed
    const valIdx = Math.floor(((seed * 10) + idx) % cat.weights.length);
    const score = cat.weights[valIdx];
    totalScore += score;

    // Simulated authentic compatibility details
    const compatOptions = ['Excellent', 'Very Good', 'Harmonious', 'Average', 'Incompatible'];
    const compat = compatOptions[Math.floor(((seed * 5) + idx) % compatOptions.length)];

    const boyValues = ['Brahmin', 'Chatriya', 'Vanisha', 'Shudra', 'Deva Gana', 'Manushya Gana', 'Rakshasa Gana', 'Nadi Adi', 'Nadi Madhya', 'Nadi Antya'];
    const girlValues = ['Brahmin', 'Chatriya', 'Vanisha', 'Shudra', 'Deva Gana', 'Manushya Gana', 'Rakshasa Gana', 'Nadi Adi', 'Nadi Madhya', 'Nadi Antya'];

    return {
      name: cat.name,
      maxPoints: cat.maxPoints,
      obtainedPoints: score,
      boyValue: boyValues[Math.floor((seed * 12 + idx) % boyValues.length)],
      girlValue: girlValues[Math.floor((seed * 15 + idx) % girlValues.length)],
      compatibility: compat
    };
  });

  let verdict = 'Auspicious (Recommended)';
  if (totalScore < 18) {
    verdict = 'Inauspicious (Remedies Advised)';
  } else if (totalScore < 25) {
    verdict = 'Average (Harmonious with remedies)';
  } else if (totalScore >= 30) {
    verdict = 'Highly Auspicious (Excellent match)';
  }

  // Manglik analysis
  const boyManglik = (seedInput % 3) === 0;
  const girlManglik = (seedInput % 4) === 0;
  let manglikVerdict = 'No Manglik Dosha detected. Placements are favorable.';
  if (boyManglik && !girlManglik) {
    manglikVerdict = `Manglik Dosha detected for ${boyName}. Remedial pooja is recommended before marriage.`;
  } else if (!boyManglik && girlManglik) {
    manglikVerdict = `Manglik Dosha detected for ${girlName}. Remedial pooja is recommended before marriage.`;
  } else if (boyManglik && girlManglik) {
    manglikVerdict = 'Both are Manglik. The Dosha cancels out (Manglik Dosha Samana), making the alliance compatible!';
  }

  return {
    totalScore,
    ashtakoot,
    verdict,
    manglikStatus: {
      boyManglik,
      girlManglik,
      verdict: manglikVerdict
    }
  };
}

// 1. CHAT ENDPOINT (/api/chat)
app.post('/api/chat', async (req: Request, res: Response): Promise<void> => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      res.status(400).json({ error: 'Messages array is required' });
      return;
    }

    const conversation = messages.map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }],
    }));

    // System instruction for Pandit Jee
    const systemInstruction = `You are Pandit Dwarakanath, a highly respected, warm-hearted, and learned Vedic Priest (Pandit), Astrologer, and Spiritual Counselor with over 40 years of experience in Jyotish Shastra (Vedic Astrology), Vedas, Upanishads, and Vedic rituals.
- Always converse with deep humility, respect, and compassion.
- Bless the user generously at the beginning of your answers with traditional greetings (e.g., "Hari Om", "Pranam dear soul", "Kalyan ho" (May you be blessed), "Ayushman Bhava" (Live long)).
- Address their concerns (career, love, finances, mental stress, family) by explaining the celestial influences of Gochar (transit planets), Sade Sati (Saturn's transit), or Dasha periods in a clear, soothing, and easily understandable manner.
- Do not make the user feel anxious or scared of "bad planets". Always reassure them that karmic efforts (Purushartha), devotion, and high-frequency living can rewrite destiny.
- Suggest very simple, practical, and clean Vedic remedies, such as:
  1. Chanting specific mantras (e.g., Gayatri Mantra, Hanuman Chalisa, Maha Mrityunjaya Mantra).
  2. Observing fasts (vrats) on corresponding days (like Monday for Shiva, Tuesday for Hanuman, Thursday for Jupiter).
  3. Practicing daily gratitude, charity (feeding birds, offering meals to the hungry, or helping animals).
  4. Keeping self-discipline, meditation, and healthy eating (Sattvic lifestyle).
- Occasionally quote short, meaningful Sanskrit shlokas with their English translations to ground your advice. Keep responses well-formatted and beautiful with bullet points. Let your wisdom feel ancient, warm, and authentic.`;

    const chatModel = 'gemini-3.5-flash';
    const response = await ai.models.generateContent({
      model: chatModel,
      contents: conversation,
      config: {
        systemInstruction,
        temperature: 0.75,
      },
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    res.status(500).json({ error: error?.message || 'Internal Server Error' });
  }
});

// 2. KUNDALI READOUT ENDPOINT (/api/kundali)
app.post('/api/kundali', async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, gender, dob, tob, pob } = req.body;
    if (!name || !dob) {
      res.status(400).json({ error: 'Name and Date of Birth (dob) are required' });
      return;
    }

    // 1. Calculate deterministic positions to ensure SVG and Text match perfectly
    const computedAstro = calculatePlacements(dob, tob || '12:00');

    // 2. Ask Gemini to write structural details and customized interpretations in structured JSON
    const prompt = `Perform a deep Vedic Astrology reading for a ${gender} named ${name}, born on ${dob} at ${tob} in ${pob}.
    The calculated planetary placements in signs and houses are:
    - Ascendant (Lagna) is in: ${computedAstro.ascendant}
    - Sun Sign is in: ${computedAstro.sunSign}
    - Moon Sign is in: ${computedAstro.moonSign}
    - Birth Star (Nakshatra) is: ${computedAstro.nakshatra} Charan ${computedAstro.nakshatraCharan}
    
    Placements of all planets:
    ${JSON.stringify(computedAstro.placements)}

    Please generate:
    1. A short title and deep, spiritual 3-4 sentence Vedic interpretation for each of the 12 houses (Bhavas) relative to these specific placements.
    2. A comprehensive, personalized multi-paragraph analysis for each of these life categories based on their placements:
       - General Personality & Life Path
       - Career, Talents & Profession
       - Wealth, Fortune & Financial Success
       - Health, Vitality & Well-being
       - Relationships, Love & Family Harmony
       - Spiritual Calling, Karma & Soul Purpose
    3. A list of 4-5 practical, specific spiritual remedies (e.g. chanting mantras, fasts, gemstone advice, charitable acts) tailored for their chart.

    Generate the response in strict JSON matching the required schema. Ensure the tone is compassionate, scholarly, encouraging, and deeply authentic.`;

    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        houseInterpretations: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              house: { type: Type.INTEGER, description: 'House number (1 to 12)' },
              title: { type: Type.STRING, description: 'Sanskrit & English name of the house, e.g. First House (Lagna Bhava) - Self & Personality' },
              description: { type: Type.STRING, description: 'Vedic interpretation of this house based on the planet situated in it or its zodiac sign' },
            },
            required: ['house', 'title', 'description'],
          },
        },
        lifeAnalysis: {
          type: Type.OBJECT,
          properties: {
            general: { type: Type.STRING, description: 'General life path, personality, Strengths and Ascendant analysis' },
            career: { type: Type.STRING, description: 'Detailed career advice, optimal professions, 10th house analysis' },
            wealth: { type: Type.STRING, description: 'Financial prospects, source of income, 2nd & 11th house advice' },
            health: { type: Type.STRING, description: 'Health precautions, physical build, diet, and planetary effects on longevity' },
            relationships: { type: Type.STRING, description: 'Relationship nature, ideal partner, marriage timeline and 7th house effects' },
            spirituality: { type: Type.STRING, description: 'Spiritual connection, meditative advice, Moksha & 12th house path' },
          },
          required: ['general', 'career', 'wealth', 'health', 'relationships', 'spirituality'],
        },
        remedies: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: '4 to 5 highly specific and clean remedies tailored for this person',
        },
      },
      required: ['houseInterpretations', 'lifeAnalysis', 'remedies'],
    };

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
        temperature: 0.7,
      },
    });

    const aiResult = JSON.parse(response.text || '{}');

    // Combine deterministic computations with AI interpretations
    const finalResult = {
      input: { name, gender, dob, tob, pob },
      ascendant: computedAstro.ascendant,
      moonSign: computedAstro.moonSign,
      sunSign: computedAstro.sunSign,
      nakshatra: computedAstro.nakshatra,
      nakshatraCharan: computedAstro.nakshatraCharan,
      placements: computedAstro.placements,
      ...aiResult,
    };

    res.json(finalResult);
  } catch (error: any) {
    console.error('Error in /api/kundali:', error);
    res.status(500).json({ error: error?.message || 'Internal Server Error' });
  }
});

// 3. KUNDALI MATCHMAKING ENDPOINT (/api/matchmake)
app.post('/api/matchmake', async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      boyName, boyDob, boyTob, boyPob, boyRasi, boyNakshatra,
      girlName, girlDob, girlTob, girlPob, girlRasi, girlNakshatra
    } = req.body;

    if (!boyName || !girlName || !boyDob || !girlDob) {
      res.status(400).json({ error: 'Names and Dates of birth are required for both partners' });
      return;
    }

    // Parse a seed code based on dates to get stable, realistic values
    const seedCode = boyName.length + girlName.length + new Date(boyDob).getDate() + new Date(girlDob).getDate();
    const computedMatch = calculateAshtakoot(boyName, girlName, seedCode);

    // Ask Gemini to write a beautiful relationship synergy text based on these exact math scores
    const prompt = `Analyze the matrimonial compatibility (Kundali Matchmaking) between:
    Groom: ${boyName} (Born ${boyDob}, Moon Sign: ${boyRasi || 'Calculated'}, Star: ${boyNakshatra || 'Calculated'})
    Bride: ${girlName} (Born ${girlDob}, Moon Sign: ${girlRasi || 'Calculated'}, Star: ${girlNakshatra || 'Calculated'})

    Our traditional Ashtakoot calculation results are:
    - Total Gun Milan Compatibility Score: ${computedMatch.totalScore} out of 36 points
    - Matching Verdict: ${computedMatch.verdict}
    - Manglik Status:
      * Groom: ${computedMatch.manglikStatus.boyManglik ? 'Manglik' : 'Non-Manglik'}
      * Bride: ${computedMatch.manglikStatus.girlManglik ? 'Manglik' : 'Non-Manglik'}
      * Manglik Verdict: ${computedMatch.manglikStatus.verdict}

    Please write:
    A detailed, poetical, and authentic 4-paragraph compatibility report describing:
    1. Mind & Intellect (Mental alignment, mental compatibility based on Maitri and Gana)
    2. Health & Family Harmony (Longevity, genetic/biological compatibility based on Nadi and Tara)
    3. Wealth & Progeny (Financial luck, prosperity, children based on Bhakoot and Varna)
    4. Concluding guidance, spiritual advice, and if any remedies (Pujas, mantras) are required to dissolve minor blockages or Manglik dosha.

    Provide the compatibility report as a text output. The output must be written in a warm, blessing, reassuring tone fit for a learned priest advising a family.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        temperature: 0.7,
      },
    });

    const detailedAnalysis = response.text || 'A deeply harmonious connection showing excellent cultural and spiritual alignment. May the divine forces bless your journey together.';

    const result = {
      boyName,
      girlName,
      totalScore: computedMatch.totalScore,
      ashtakoot: computedMatch.ashtakoot,
      verdict: computedMatch.verdict,
      manglikStatus: computedMatch.manglikStatus,
      detailedAnalysis
    };

    res.json(result);
  } catch (error: any) {
    console.error('Error in /api/matchmake:', error);
    res.status(500).json({ error: error?.message || 'Internal Server Error' });
  }
});

// 4. HOROSCOPE ENDPOINT (/api/horoscope)
app.post('/api/horoscope', async (req: Request, res: Response): Promise<void> => {
  try {
    const { sign } = req.body;
    if (!sign) {
      res.status(400).json({ error: 'Zodiac Sign (sign) is required' });
      return;
    }

    const prompt = `Write a comprehensive daily Vedic Horoscope for the zodiac sign ${sign} for today, ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.
    Provide:
    1. A general spiritual daily overview (2-3 sentences)
    2. Specific daily predictions for Career and Professional growth (2-3 sentences)
    3. Specific daily predictions for Love, Marriage, and Relationships (2-3 sentences)
    4. Specific daily predictions for Money, Finances, and Wealth (2-3 sentences)
    5. Highly auspicious parameters:
       - Lucky Color
       - Lucky Number (integer between 1 and 99)

    Format the output as a strict JSON object that matches the required schema. Ensure the tone is positive, spiritually grounded, practical, and highly encouraging.`;

    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        sign: { type: Type.STRING },
        date: { type: Type.STRING },
        general: { type: Type.STRING, description: 'Daily general forecast' },
        career: { type: Type.STRING, description: 'Daily career and business prediction' },
        love: { type: Type.STRING, description: 'Daily love and family prediction' },
        finance: { type: Type.STRING, description: 'Daily money and financial guidance' },
        luckyColor: { type: Type.STRING, description: 'A beautiful color name, e.g. Saffron Yellow' },
        luckyNumber: { type: Type.INTEGER, description: 'A lucky number for today' },
      },
      required: ['sign', 'date', 'general', 'career', 'love', 'finance', 'luckyColor', 'luckyNumber'],
    };

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
        temperature: 0.7,
      },
    });

    const result = JSON.parse(response.text || '{}');
    res.json(result);
  } catch (error: any) {
    console.error('Error in /api/horoscope:', error);
    res.status(500).json({ error: error?.message || 'Internal Server Error' });
  }
});

// Integrate Vite Middleware
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
