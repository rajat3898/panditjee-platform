/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PanchangData {
  date: string;
  tithi: string;
  tithiEnd: string;
  nakshatra: string;
  nakshatraEnd: string;
  yoga: string;
  karana: string;
  sunSign: string;
  moonSign: string;
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  rahukaal: string;
  yamaganda: string;
  gulika: string;
  abhijitMuhurat: string;
}

export interface PlanetaryPosition {
  planet: string;
  sign: string;
  degree: number;
  house: number;
}

export interface KundaliInput {
  name: string;
  gender: 'Male' | 'Female' | 'Other';
  dob: string; // YYYY-MM-DD
  tob: string; // HH:MM
  pob: string; // Place of Birth
}

export interface KundaliResult {
  input: KundaliInput;
  ascendant: string;
  moonSign: string;
  sunSign: string;
  nakshatra: string;
  nakshatraCharan: number;
  placements: PlanetaryPosition[];
  houseInterpretations: {
    house: number;
    title: string;
    description: string;
  }[];
  lifeAnalysis: {
    general: string;
    career: string;
    wealth: string;
    health: string;
    relationships: string;
    spirituality: string;
  };
  remedies: string[];
}

export interface MatchmakerInput {
  boyName: string;
  boyDob: string;
  boyTob: string;
  boyPob: string;
  boyRasi: string;
  boyNakshatra: string;
  girlName: string;
  girlDob: string;
  girlTob: string;
  girlPob: string;
  girlRasi: string;
  girlNakshatra: string;
}

export interface AshtakootScore {
  name: string;
  maxPoints: number;
  obtainedPoints: number;
  boyValue: string;
  girlValue: string;
  compatibility: string;
}

export interface MatchmakerResult {
  boyName: string;
  girlName: string;
  totalScore: number; // out of 36
  ashtakoot: AshtakootScore[];
  verdict: string; // Auspicious, Average, Inauspicious
  manglikStatus: {
    boyManglik: boolean;
    girlManglik: boolean;
    verdict: string;
  };
  detailedAnalysis: string; // Dynamic report
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

export interface Mantra {
  id: string;
  title: string;
  sanskrit: string;
  transliteration: string;
  translation: string;
  benefits: string;
  countNeeded: number;
  deity: string;
}

export interface DailyHoroscope {
  sign: string;
  date: string;
  general: string;
  career: string;
  love: string;
  finance: string;
  luckyColor: string;
  luckyNumber: number;
}
