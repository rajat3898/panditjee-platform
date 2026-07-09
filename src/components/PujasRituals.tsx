/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  HelpCircle, 
  FileText, 
  User, 
  Phone, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Plus, 
  Minus,
  Info
} from 'lucide-react';

interface PujaItem {
  id: string;
  name: string;
  sanskritName: string;
  category: 'Prosperity' | 'Protection' | 'Shanti' | 'Health';
  description: string;
  duration: string;
  benefits: string[];
  priceWithoutSamagri: number;
  priceWithSamagri: number;
  keySamagri: string[];
}

export default function PujasRituals() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedPujaId, setExpandedPujaId] = useState<string | null>(null);
  const [bookingPuja, setBookingPuja] = useState<PujaItem | null>(null);
  
  // Booking Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('2026-07-15');
  const [location, setLocation] = useState('Mumbai');
  const [includeSamagri, setIncludeSamagri] = useState(true);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const pujas: PujaItem[] = [
    {
      id: 'grah-pravesh',
      name: 'Grah Pravesh & Ganesh Puja',
      sanskritName: 'गृह प्रवेश एवं गणेश पूजन',
      category: 'Prosperity',
      description: 'The sacred housewarming ceremony designed to purify new living spaces, remove Vastu doshas, and invite auspicious energies through Lord Ganesha’s blessings.',
      duration: '3.5 Hours',
      benefits: [
        'Neutralizes any pre-existing negative land energies (Vastu Dosh)',
        'Brings harmony, health, and peace of mind to all residents',
        'Invites Goddess Lakshmi’s stable presence and financial abundance'
      ],
      priceWithoutSamagri: 5865,
      priceWithSamagri: 9775,
      keySamagri: ['Lord Ganesha idol', 'Kalash & Mango leaves', 'Havan Kund & Wood', 'Premium incense', 'Fresh flowers & garlands', 'Panchaamrit ingredients', 'Coconut & fruits']
    },
    {
      id: 'laxmi-kuber',
      name: 'Laxmi Kuber & Kanakdhara Homa',
      sanskritName: 'लक्ष्मी कुबेर एवं कनकधारा हवन',
      category: 'Prosperity',
      description: 'A golden ritual targeting financial stability, debt relief, and professional luck, channeling the energy of Goddess Lakshmi and the celestial treasurer Lord Kuber.',
      duration: '3 Hours',
      benefits: [
        'Invites rapid growth in retail shops, factories, startups, or investments',
        'Dissolves piling up of toxic debts and legal/financial blocks',
        'Brings ultimate royal luck, grandeur, and regular cash flows'
      ],
      priceWithoutSamagri: 6325,
      priceWithSamagri: 10235,
      keySamagri: ['Laxmi-Kuber gold/copper coins', 'Dry lotus flowers (Lotus seeds)', 'Rose water & attar perfume', 'Pure honey & almonds', 'Red lotus flowers', 'Red silk altar cloth']
    },
    {
      id: 'sudarshana-homa',
      name: 'Sudarshana Homa',
      sanskritName: 'सुदर्शन होम',
      category: 'Protection',
      description: 'An aggressive protection fire ritual invoking Lord Vishnu’s powerful Sudarshana Chakra, casting a golden spiritual shield of absolute safety.',
      duration: '3.5 Hours',
      benefits: [
        'Repels evil-eye (Nazar), black magic influences, and negative rivals',
        'Secures victory in critical legal battles and intense business rivalries',
        'Heals deep-rooted unexplained energetic vulnerabilities inside the home'
      ],
      priceWithoutSamagri: 9200,
      priceWithSamagri: 14375,
      keySamagri: ['Sudarshana Yantra', 'White sesame & mustard seeds', 'Dried herbs (Herb roots mixture)', 'Special wood logs (Ficus racemosa)', 'Fresh yellow flowers', 'Camphor logs']
    },
    {
      id: 'pitra-dosh',
      name: 'Pitra Dosh Nivarana Puja',
      sanskritName: 'पितृ दोष निवारण पूजा',
      category: 'Shanti',
      description: 'A respectful and vital ritual to appease and seek blessings from our deceased ancestors, removing karmic obstacles affecting child birth and legacy.',
      duration: '3 Hours',
      benefits: [
        'Brings blessings of healthy progeny and prevents frequent miscarriages',
        'Removes constant stagnation and repetitive financial collapses in family tree',
        'Ensures peaceful transition and ultimate rest for ancestor souls'
      ],
      priceWithoutSamagri: 5175,
      priceWithSamagri: 7820,
      keySamagri: ['Black sesame seeds', 'Barley (Jau) seeds', 'Raw rice flour & milk', 'Darbha grass ring', 'Earthen pots', 'White flowers & white sandalwood paste']
    },
    {
      id: 'rudra-sawan-somvari',
      name: 'Rudrabhishek (Sawan Somvari / Shivratri)',
      sanskritName: 'रुद्राभिषेक - सावन सोमवारी/महाशिवरात्रि',
      category: 'Protection',
      description: 'A highly auspicious Rudrabhishek performed on Sawan Mondays or Mahashivratri to invoke Lord Shiva’s supreme grace and protection.',
      duration: '3 Hours',
      benefits: [
        'Grants health, destroys negative energies, and restores mental peace',
        'Provides special benefits when performed during the holy month of Sawan',
        'Pacifies major planetary doshas'
      ],
      priceWithoutSamagri: 3163,
      priceWithSamagri: 5163,
      keySamagri: ['Pure cow milk', 'Honey & Curd', 'Bael Patra', 'Gangajal', 'Flowers & Sandalwood']
    },
    {
      id: 'rudra-sawan-other',
      name: 'Rudrabhishek (Sawan Other Days)',
      sanskritName: 'रुद्राभिषेक- सावन में अन्य दिन',
      category: 'Protection',
      description: 'Rudrabhishek performed during weekdays of the holy Sawan month, channeling Shiva’s healing energy.',
      duration: '2.5 Hours',
      benefits: [
        'Brings professional success and family harmony',
        'Attracts peace and financial stability',
        'Improves long-term chronic health conditions'
      ],
      priceWithoutSamagri: 2657,
      priceWithSamagri: 4457,
      keySamagri: ['Cow milk', 'Sandalwood', 'Sugarcane juice', 'Bael leaves', 'Gangajal']
    },
    {
      id: 'rudra-somvar-special',
      name: 'Rudrabhishek (Mondays / Special Days)',
      sanskritName: 'रुद्राभिषेक - सोमवार/विशेष दिन',
      category: 'Protection',
      description: 'Performed on regular Mondays or special lunar transits like Pradosham or Shivratri.',
      duration: '2.5 Hours',
      benefits: [
        'Fulfills obstacles related to marriages and children',
        'Creates an aura of ultimate protection over the family',
        'Brings mental concentration and positive vibes'
      ],
      priceWithoutSamagri: 2657,
      priceWithSamagri: 4457,
      keySamagri: ['Milk', 'Honey', 'Curd', 'Vibhuti', 'Betel nuts', 'Shiva Photo']
    },
    {
      id: 'rudra-other-days',
      name: 'Rudrabhishek (Regular Days)',
      sanskritName: 'रुद्राभिषेक - अन्य दिन',
      category: 'Protection',
      description: 'Performed on any standard auspicious day to clear house blockages and purify the surrounding.',
      duration: '2 Hours',
      benefits: [
        'Purifies the residential energetic environment',
        'Assists in deep concentration and inner calmness',
        'Protects against sudden accidental hazards'
      ],
      priceWithoutSamagri: 1898,
      priceWithSamagri: 3398,
      keySamagri: ['Milk', 'Ganga water', 'Incense', 'Camphor', 'Roli & Akshat']
    },
    {
      id: 'maha-rudrabhishek-3h',
      name: 'Maha Rudrabhishek (Long Ritual)',
      sanskritName: 'महारुद्राभिषेक (तीन घंटा)',
      category: 'Protection',
      description: 'Detailed high-vibe Vedic Rudrabhishek chanting involving full recitation of Sri Rudram by experienced Pandits.',
      duration: '3 Hours',
      benefits: [
        'Deep cleansing of ancestral and personal karmic blockages',
        'Instills strong dynamic shield over physical and mental health',
        'Fosters professional heights and commercial prosperity'
      ],
      priceWithoutSamagri: 6452,
      priceWithSamagri: 9952,
      keySamagri: ['Shivalingam setup', 'Earthen bowls', '11 sacred liquids', 'Abhishek Patra', 'Premium Havan Samagri']
    },
    {
      id: 'satyanarayan-patna',
      name: 'Satyanarayan Puja (Vrat Katha)',
      sanskritName: 'सत्यनारायण पूजा',
      category: 'Prosperity',
      description: 'The beautiful story-telling ritual of Lord Satyanarayan to secure family progress and professional success.',
      duration: '2 Hours',
      benefits: [
        'Attracts divine abundance and household peace',
        'Wards off negative influences and lies',
        'Celebrates child birth, marriages, or success'
      ],
      priceWithoutSamagri: 1392,
      priceWithSamagri: 2392,
      keySamagri: ['Sri Satyanarayan Photo', 'Yellow cloth', 'Banana leaves', 'Panji Prasad ingredients', 'Sandalwood paste']
    },
    {
      id: 'ramarcha-puja',
      name: 'Ramarcha Puja',
      sanskritName: 'रामार्चा पूजा',
      category: 'Prosperity',
      description: 'A deeply meritorious Vedic prayer centered around Lord Rama, Sita, Lakshmana, Hanuman, and the whole court.',
      duration: '3 Hours',
      benefits: [
        'Brings ultimate royal honor, moral righteousness, and glory',
        'Secures outstanding victory in complex situations and legal disputes',
        'Fosters extreme loyalty, bonding, and truth inside the family structure'
      ],
      priceWithoutSamagri: 2657,
      priceWithSamagri: 4657,
      keySamagri: ['Ram Darbar photo', 'Multi-colored clothes', 'Tulsi garlands', '108 lotus petals', 'Aromatic essential oils']
    },
    {
      id: 'hanumat-puja',
      name: 'Hanumat Puja',
      sanskritName: 'हनुमत-पूजा',
      category: 'Protection',
      description: 'A robust defense ritual invoking the monkey god Hanuman to dissolve intense obstacles and evil-eye.',
      duration: '2.5 Hours',
      benefits: [
        'Empowers the devotee with physical fitness, courage, and clear focus',
        'Cures energetic blockages, chronic fear, and dark spirits',
        'Protects against malefic effects of Shani Dev (Saturn)'
      ],
      priceWithoutSamagri: 2657,
      priceWithSamagri: 4457,
      keySamagri: ['Hanuman Murti/Photo', 'Sindoor (Orange paste)', 'Jasmine oil', 'Red flag', 'Laddoo / Boondi prasad']
    },
    {
      id: 'grah-shanti-one',
      name: 'Grahashanti Puja (Single Planet)',
      sanskritName: 'ग्रहशान्ति पूजा (एक ग्रह की पूजा)',
      category: 'Shanti',
      description: 'Vedic pacification of any single selected planet that is currently retrograde or creating hurdles in your Kundali.',
      duration: '1.5 Hours',
      benefits: [
        'Instantly reduces the friction caused by the transit of that planet',
        'Relieves mental frustration, career breaks, or relationship sourness',
        'Strengthens the corresponding positive traits'
      ],
      priceWithoutSamagri: 2415,
      priceWithSamagri: 3915,
      keySamagri: ['Planet specific yantra', 'Color-coded grains', 'Gemstone references', 'Veda books', 'Ghee lamps']
    },
    {
      id: 'navgrah-shanti-full',
      name: 'Navgrah Shanti Puja (All 9 Planets)',
      sanskritName: 'नवग्रहशान्ति पूजा (सभी ग्रहों की पूजा)',
      category: 'Shanti',
      description: 'Grand purification and harmonization of all 9 planets to secure long-term cosmic alignment and remove lifetime dasha obstacles.',
      duration: '4 Hours',
      benefits: [
        'Brings comprehensive balance in finance, health, and relationship transits',
        'Minimizes severe effects of Sade Sati, Rahu/Ketu Dashas, and Manglik Dosha',
        'Invites consistent prosperity and general protection'
      ],
      priceWithoutSamagri: 12650,
      priceWithSamagri: 18150,
      keySamagri: ['Complete Navgrah Yantra', '9 colored cloths', 'Navadhanya (9 grains)', 'Copper plates', 'Auspicious wooden logs']
    },
    {
      id: 'hanuman-chalisa-108',
      name: 'Hanuman Chalisa Path (108 Times Recital)',
      sanskritName: 'हनुमानचालीसा पाठ (108 पाठ)',
      category: 'Protection',
      description: 'Consecutive choral recitations of the sacred Hanuman Chalisa 108 times to invoke ultimate courage and resolve distress.',
      duration: '3 Hours',
      benefits: [
        'Relieves severe depressions, intense panic attacks, and fear of unknown',
        'Acts as a dynamic spiritual protective shield around your space',
        'Attracts powerful helpful energies'
      ],
      priceWithoutSamagri: 1392,
      priceWithSamagri: 2192,
      keySamagri: ['Hanuman Chalisa books', 'Red seating mats', 'Cow Ghee lamps', 'Sweet boondi', 'Tulsi leaves']
    },
    {
      id: 'ramraksha-stotra',
      name: 'Vedic Protective Shield Chants',
      sanskritName: 'रामरक्षास्तोत्र/हनुमत कवच/आदित्य हृदय पाठ',
      category: 'Health',
      description: 'Single detailed recitation of high-defense prayers (Ram Raksha Stotra, Hanumat Kavach, or Aditya Hridaya Path) for body wellness.',
      duration: '1 Hour',
      benefits: [
        'Triggers physical immune system healing and increases solar energy',
        'Creates absolute protection from external negative thought forms',
        'Brings mental toughness and competitive dominance'
      ],
      priceWithoutSamagri: 322,
      priceWithSamagri: 572,
      keySamagri: ['Stotra books', 'Akshat (colored rice)', 'Sandalwood paste', 'Incense', 'Copper tumbler']
    },
    {
      id: 'sunderkand-path-single',
      name: 'Sunderkand Path (Single Recital)',
      sanskritName: 'सुन्दरकाण्ड पाठ (एक पाठ)',
      category: 'Shanti',
      description: 'Traditional storytelling recital of Lord Hanuman’s legendary flight to Lanka, instilling hope, joy, and structural success.',
      duration: '1.5 Hours',
      benefits: [
        'Destroys domestic stress and restores optimism in hard situations',
        'Removes physical fatigue and clears obstacles from important plans',
        'Bestows Lord Hanuman’s intense blessings'
      ],
      priceWithoutSamagri: 322,
      priceWithSamagri: 572,
      keySamagri: ['Sunderkand books', 'Rama photo', 'Ghee deepak', 'Saffron powder', 'Banana leaf']
    },
    {
      id: 'valmiki-sunderkand-path',
      name: 'Valmiki Sunderkand (Sanskrit Recital)',
      sanskritName: 'वाल्मीकि सुन्दरकाण्ड (एक पाठ)',
      category: 'Shanti',
      description: 'Premium recitation of Sunderkand as compiled in the classical Valmiki Ramayana, containing rich phonetic spiritual keys.',
      duration: '3 Hours',
      benefits: [
        'Imbues the space with pure Sanskrit cosmic resonance',
        'Brings mental clarity, linguistic skill, and outstanding luck',
        'Fosters deep meditation and connection with Ram Bhakti'
      ],
      priceWithoutSamagri: 2657,
      priceWithSamagri: 4157,
      keySamagri: ['Valmiki Ramayana scripture', 'Sanskrit pandit setup', 'Pure honey & milk offerings', 'Flowers & fruits', 'Incense powder']
    },
    {
      id: 'durga-saptashati-samput',
      name: 'Durga Saptashati Path (With Samput)',
      sanskritName: 'दुर्गासप्तशती पाठ (सम्पुट)',
      category: 'Protection',
      description: 'Highly customized chanting of the 700 verses of Durga Saptashati where special seed syllables (Beej/Samput) are prefixed to each verse.',
      duration: '4 Hours',
      benefits: [
        'Brings powerful defensive shielding over major commercial structures',
        'Shatters malicious gossip, intense corporate rivals, and legal cases',
        'Accelerates stalled financial growth'
      ],
      priceWithoutSamagri: 2657,
      priceWithSamagri: 4657,
      keySamagri: ['Durga Saptashati book', 'Red altar cloth', 'Shringar kit items', 'Ghee lamps', 'Coconut and betel leaves']
    },
    {
      id: 'durga-saptashati-sadharan',
      name: 'Durga Saptashati Path (Classic)',
      sanskritName: 'दुर्गासप्तशती पाठ साधारण',
      category: 'Protection',
      description: 'Vedic recitation of the classical 700 verses of Devi Mahatmya describing the victory of Goddess Durga over Mahishasura.',
      duration: '3 Hours',
      benefits: [
        'Removes immediate blockages and financial anxieties from the house',
        'Envelops all family members in divine motherly security',
        'Promotes self-confidence and spiritual awareness'
      ],
      priceWithoutSamagri: 1277,
      priceWithSamagri: 2277,
      keySamagri: ['Durga Saptashati book', 'Durga photo', 'Saffron Tilak', 'Red flowers', 'Dhoop stick']
    },
    {
      id: 'kalashsthapana-durga-9days',
      name: 'Kalash Sthapana & 9-Day Durga Path',
      sanskritName: 'कलशस्थापन/दुर्गा पाठ सहित (नौ दिन)',
      category: 'Prosperity',
      description: 'Ultimate Navratri service comprising sacred pot establishment, barley sowing, and nine consecutive days of intensive prayers.',
      duration: '9 Days (Daily 2 Hours)',
      benefits: [
        'Establishes steady divine motherly protection and prosperity over the entire year',
        'Purges deep ancestral errors and brings incredible spiritual growth',
        'Blesses the home with pure sattva and absolute bliss'
      ],
      priceWithoutSamagri: 9488,
      priceWithSamagri: 14488,
      keySamagri: ['Copper/clay Kalash', 'Barely seeds & soil container', 'Akhand Jyoti lamp', 'Navratri shringar kits', '9 varieties of dry fruits']
    },
    {
      id: 'manokamna-yajna',
      name: 'Manokamna Siddhi Yajna',
      sanskritName: 'मनोकामना यज्ञ',
      category: 'Prosperity',
      description: 'A special desire-manifestation fire ceremony designed to direct cosmic forces towards fulfilling your specific honest life goals.',
      duration: '3.5 Hours',
      benefits: [
        'Removes unexplained systemic blockages from careers and deals',
        'Assists in swift clearance of government and legal bottlenecks',
        'Brings overall protection and professional prosperity'
      ],
      priceWithoutSamagri: 6452,
      priceWithSamagri: 9952,
      keySamagri: ['Havan Kund', 'Sacred wood (Samidha)', 'Havan samagri herbs pack', 'Cow ghee', 'Sweet offering (Kheer)']
    },
    {
      id: 'janmamangalanusthan',
      name: 'Janma Mangala Anusthan',
      sanskritName: 'जन्ममंगलानुष्ठान',
      category: 'Health',
      description: 'Spiritual birthday worship for children or adults, integrating Ayushya Homa and Markandeya stotra for longevity.',
      duration: '2 Hours',
      benefits: [
        'Bestows longevity, good immunity, and pristine health',
        'Purifies the birthday celebrant’s immediate aura',
        'Brings ancestral and parental blessings'
      ],
      priceWithoutSamagri: 1392,
      priceWithSamagri: 2392,
      keySamagri: ['Vedic birthday books', 'Yellow sesame', 'Fresh fruits & sweets', 'Ghee lamps', 'New clothes for blessing']
    },
    {
      id: 'dhwaj-sankalp',
      name: 'Dhwaj Sankalp & Sthapana',
      sanskritName: 'ध्वज संकल्प',
      category: 'Shanti',
      description: 'Consecration of a sacred orange flag (representing Hanuman or Sanatan Dharma) to be placed on top of your home for security.',
      duration: '0.5 Hours',
      benefits: [
        'Acts as a visual and energetic high-frequency shield over the home',
        'Signals divine protection and reduces the entry of dark energies',
        'Brings deep respect and prestige'
      ],
      priceWithoutSamagri: 138,
      priceWithSamagri: 638,
      keySamagri: ['Premium Orange silk flag', 'Gilded flag pole', 'Saffron thread', 'Turmeric & Kumkum', 'Roli']
    },
    {
      id: 'mundan-sanskar',
      name: 'Mundan Sanskar (Tonsure Ceremony)',
      sanskritName: 'मुण्डन (बाजा नहीं बजेगा)',
      category: 'Health',
      description: 'Sattvik first head shaving ceremony for toddlers to cleanly release negative memory patterns from previous lives.',
      duration: '1.5 Hours',
      benefits: [
        'Cleanses childhood birth karma and stimulates healthy new hair growth',
        'Calms the neurological temperature of the toddler',
        'Invokes high intellect, sharp memory, and peaceful sleep'
      ],
      priceWithoutSamagri: 633,
      priceWithSamagri: 1133,
      keySamagri: ['Sandalwood paste', 'Turmeric paste', 'Fresh blade & razor (sterilized)', 'Barber chair setup helper', 'Sweets & milk']
    },
    {
      id: 'ramawat-diksha',
      name: 'Ramawat Sampradaya Diksha',
      sanskritName: 'रामावत सम्प्रदाय में दीक्षा',
      category: 'Shanti',
      description: 'A deeply sacred personal initiation into the glorious Ramanandi (Ramawat) Vaishnava tradition, receiving holy instructions.',
      duration: '1 Hour',
      benefits: [
        'Establishes immediate connection with an ancient unbroken spiritual lineage',
        'Provides specialized Kanthi mala and pure chandan tilak initiation',
        'Purifies internal thoughts and brings deep peace'
      ],
      priceWithoutSamagri: 69,
      priceWithSamagri: 219,
      keySamagri: ['Tulsi wood Kanthi', 'Gopichandan tilak', 'Ganga water', 'Ramcharitmanas scripture copy', 'Betel nut']
    },
    {
      id: 'maha-mrityunjaya-jaap-1k',
      name: 'Maha Mrityunjaya Jaap (Per 1000 Chants)',
      sanskritName: 'महामृत्युंजय जप (प्रति हजार)',
      category: 'Health',
      description: 'Vedic priests chanting the highly defensive Maha Mrityunjaya mantra on behalf of the Yajamana to heal disease.',
      duration: 'Pro-rata',
      benefits: [
        'Provides severe health defense and assists in recovering from coma or physical threats',
        'Eliminates heavy psychological fears, nightmares, and negative entities',
        'Bestows Lord Shiva’s ultimate spiritual protection'
      ],
      priceWithoutSamagri: 380,
      priceWithSamagri: 580,
      keySamagri: ['Rudraksha japa mala', 'Durva grass bundles', 'Black sesame seeds', 'Earthen lamps', 'Saffron chandan']
    }
  ].map(p => ({
    ...p,
    priceWithoutSamagri: Math.round(p.priceWithoutSamagri * 1.15),
    priceWithSamagri: Math.round(p.priceWithSamagri * 1.15)
  })) as PujaItem[];

  const filteredPujas = selectedCategory === 'All' 
    ? pujas 
    : pujas.filter(p => p.category === selectedCategory);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setBookingConfirmed(true);
  };

  const closeBookingModal = () => {
    setBookingPuja(null);
    setBookingConfirmed(false);
    setName('');
    setPhone('');
    setSpecialInstructions('');
  };

  return (
    <div className="space-y-10">
      {/* Visual Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-widest text-orange-600 font-bold bg-orange-50 border border-orange-200 px-3.5 py-1.5 rounded-full inline-block">
          Sacred Ceremonies
        </span>
        <h2 className="text-3xl md:text-4xl font-serif text-stone-900 font-bold">Pujas & Vedic Rituals</h2>
        <p className="text-sm text-stone-600 leading-relaxed">
          Invite celestial alignments, remove energetic obstacles, and activate peace in your household. Explore Sanatan Dharma’s classical rituals with transparent pricing for Pandits (with or without materials).
        </p>
      </div>

      {/* Categories Filter Tabs */}
      <div className="flex justify-center gap-2 border-b border-orange-100 pb-px overflow-x-auto">
        {['All', 'Prosperity', 'Protection', 'Shanti', 'Health'].map((cat) => (
          <button
            id={`filter-puja-${cat}`}
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2.5 text-xs sm:text-sm font-medium border-b-2 transition-all duration-300 font-serif shrink-0 ${
              selectedCategory === cat
                ? 'border-orange-600 text-orange-600 font-bold'
                : 'border-transparent text-stone-500 hover:text-stone-900 hover:border-orange-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Puja Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPujas.map((puja) => {
          const isExpanded = expandedPujaId === puja.id;
          return (
            <motion.div
              layout
              key={puja.id}
              className="bg-white border border-orange-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md hover:border-orange-300 transition-all duration-500 flex flex-col justify-between"
            >
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <span className="text-[10px] bg-orange-50 text-orange-600 border border-orange-200 px-2.5 py-0.5 rounded-full font-semibold uppercase tracking-wider">
                      {puja.category}
                    </span>
                    <h3 className="text-lg font-serif font-bold text-stone-900 mt-2">{puja.name}</h3>
                    <p className="text-xs font-serif text-orange-600/80 italic">{puja.sanskritName}</p>
                  </div>
                  <div className="flex flex-col items-end shrink-0">
                    <span className="text-orange-600 text-xs font-semibold flex items-center gap-1 font-mono">
                      <Clock className="h-3 w-3" /> {puja.duration}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed font-sans line-clamp-3">
                  {puja.description}
                </p>

                {/* Extended Details */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden space-y-4 pt-2 border-t border-orange-100"
                    >
                      {/* Benefits */}
                      <div>
                        <h4 className="text-[10px] uppercase tracking-wider text-orange-700 font-bold mb-1.5">Vedic Benefits</h4>
                        <ul className="space-y-1.5">
                          {puja.benefits.map((b, i) => (
                            <li key={i} className="text-xs text-stone-700 flex items-start gap-2">
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Key Samagri */}
                      <div>
                        <h4 className="text-[10px] uppercase tracking-wider text-orange-700 font-bold mb-1.5">Essential Samagri Included</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {puja.keySamagri.map((s, i) => (
                            <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-orange-50/50 border border-orange-100 text-stone-700 font-medium">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Price list and button footer */}
              <div className="bg-orange-50/40 p-6 border-t border-orange-100 space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-2.5 rounded-xl bg-white border border-orange-200">
                    <span className="text-[9px] uppercase tracking-wider text-stone-500 block mb-0.5">Without Samagri</span>
                    <span className="text-sm font-extrabold text-orange-600 font-mono">₹{puja.priceWithoutSamagri.toLocaleString()}</span>
                    <p className="text-[8px] text-stone-400">Pandit Dakshina only</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-orange-50 border border-orange-300">
                    <span className="text-[9px] uppercase tracking-wider text-orange-700 block mb-0.5 font-semibold">With Premium Samagri</span>
                    <span className="text-sm font-extrabold text-orange-700 font-mono">₹{puja.priceWithSamagri.toLocaleString()}</span>
                    <p className="text-[8px] text-orange-600/70">Includes all materials</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    id={`btn-toggle-puja-${puja.id}`}
                    onClick={() => setExpandedPujaId(isExpanded ? null : puja.id)}
                    className="flex-1 py-2.5 px-4 rounded-xl border border-orange-200 hover:border-orange-400 text-xs text-stone-700 hover:text-orange-700 font-medium transition-all duration-300 text-center bg-white"
                  >
                    {isExpanded ? 'Hide Details' : 'View Materials & Benefits'}
                  </button>
                  <button
                    id={`btn-book-puja-${puja.id}`}
                    onClick={() => setBookingPuja(puja)}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs shadow transition-all duration-300 flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="h-3.5 w-3.5" /> Book Ceremony
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Booking Form Overlay Modal */}
      {bookingPuja && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/80 backdrop-blur-sm p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-xl bg-white border border-orange-300 rounded-3xl overflow-hidden shadow-2xl"
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-orange-600 to-amber-600 px-6 py-4 border-b border-orange-500 flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-white text-base">Book Ritual Consultation</h3>
                <p className="text-[10px] text-orange-100 font-medium">Sacred Vedic Ritual Booking</p>
              </div>
              <button
                id="btn-close-booking"
                onClick={closeBookingModal}
                className="p-1 rounded-lg text-orange-100/70 hover:text-white hover:bg-white/10 transition-all text-xs font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto max-h-[80vh] space-y-6">
              {!bookingConfirmed ? (
                <form onSubmit={handleBookingSubmit} className="space-y-5">
                  <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200 space-y-2">
                    <span className="text-[9px] uppercase tracking-wider text-orange-600 font-bold">Selected Puja</span>
                    <h4 className="text-sm font-serif font-bold text-stone-950">{bookingPuja.name}</h4>
                    <p className="text-xs text-stone-600">{bookingPuja.description}</p>
                    <div className="flex gap-4 pt-1 text-[11px] font-mono text-orange-700 font-bold">
                      <span>Duration: {bookingPuja.duration}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="booking-name" className="block text-[10px] font-semibold text-stone-500 uppercase tracking-wider">Your Full Name</label>
                      <div className="flex items-center bg-white border border-orange-200 focus-within:border-orange-500 rounded-xl px-3 py-2 transition-all">
                        <User className="h-4 w-4 text-orange-400 mr-2 shrink-0" />
                        <input
                          id="booking-name"
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Lord Yajamana Name"
                          className="flex-1 bg-transparent text-stone-800 text-xs focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* WhatsApp Phone */}
                    <div className="space-y-1.5">
                      <label htmlFor="booking-phone" className="block text-[10px] font-semibold text-stone-500 uppercase tracking-wider">WhatsApp Phone</label>
                      <div className="flex items-center bg-white border border-orange-200 focus-within:border-orange-500 rounded-xl px-3 py-2 transition-all">
                        <Phone className="h-4 w-4 text-orange-400 mr-2 shrink-0" />
                        <input
                          id="booking-phone"
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="flex-1 bg-transparent text-stone-800 text-xs focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Preferred Date */}
                    <div className="space-y-1.5">
                      <label htmlFor="booking-date" className="block text-[10px] font-semibold text-stone-500 uppercase tracking-wider">Preferred Date</label>
                      <div className="flex items-center bg-white border border-orange-200 focus-within:border-orange-500 rounded-xl px-3 py-2 transition-all font-mono">
                        <Calendar className="h-4 w-4 text-orange-400 mr-2 shrink-0" />
                        <input
                          id="booking-date"
                          type="date"
                          required
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="flex-1 bg-transparent text-stone-800 text-xs focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Location/City */}
                    <div className="space-y-1.5">
                      <label htmlFor="booking-location" className="block text-[10px] font-semibold text-stone-500 uppercase tracking-wider">Pooja Location / City</label>
                      <div className="flex items-center bg-white border border-orange-200 focus-within:border-orange-500 rounded-xl px-3 py-2 transition-all">
                        <MapPin className="h-4 w-4 text-orange-400 mr-2 shrink-0" />
                        <input
                          id="booking-location"
                          type="text"
                          required
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="Mumbai, India"
                          className="flex-1 bg-transparent text-stone-800 text-xs focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Toggle Samagri Option */}
                  <div className="p-4 bg-orange-50/50 border border-orange-100 rounded-2xl flex items-center justify-between">
                    <div className="space-y-0.5 max-w-[70%]">
                      <h4 className="text-xs font-bold text-stone-850">Include Sacred Samagri Kit</h4>
                      <p className="text-[10px] text-stone-500 leading-relaxed">
                        We will bring all fresh flowers, mango leaves, special herbs, havan wood, and fresh cow ghee.
                      </p>
                    </div>
                    <button
                      id="btn-toggle-booking-samagri"
                      type="button"
                      onClick={() => setIncludeSamagri(!includeSamagri)}
                      className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                        includeSamagri ? 'bg-orange-600' : 'bg-stone-200 border border-stone-300'
                      }`}
                    >
                      <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
                        includeSamagri ? 'transform translate-x-6' : ''
                      }`} />
                    </button>
                  </div>

                  {/* Special Instructions */}
                  <div className="space-y-1.5">
                    <label htmlFor="booking-instructions" className="block text-[10px] font-semibold text-stone-500 uppercase tracking-wider">Special Requests / Gotra / Rasi</label>
                    <textarea
                      id="booking-instructions"
                      value={specialInstructions}
                      onChange={(e) => setSpecialInstructions(e.target.value)}
                      placeholder="Enter Gotra, preferred timings, or language for chanting (e.g., Hindi, Sanskrit, Kannada)..."
                      className="w-full h-16 bg-white text-stone-800 border border-orange-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-orange-500 placeholder-stone-400 resize-none"
                    />
                  </div>

                  {/* Price Summary Banner */}
                  <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 flex justify-between items-center">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-orange-600 block mb-0.5 font-bold">Calculated Total Dakshina</span>
                      <span className="text-xs text-stone-600 font-medium">
                        {includeSamagri ? 'Pandit + Premium Samagri Kit' : 'Pandit Puja Services Only'}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-extrabold text-orange-600 font-mono">
                        ₹{(includeSamagri ? bookingPuja.priceWithSamagri : bookingPuja.priceWithoutSamagri).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Action row */}
                  <div className="pt-2 flex gap-3">
                    <button
                      id="btn-cancel-booking-form"
                      type="button"
                      onClick={closeBookingModal}
                      className="flex-1 py-3 rounded-xl border border-orange-200 hover:bg-orange-50 text-xs text-stone-700 hover:text-stone-900 font-semibold transition-all cursor-pointer bg-white"
                    >
                      Cancel
                    </button>
                    <button
                      id="btn-confirm-booking-form"
                      type="submit"
                      className="flex-1 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs shadow-lg shadow-orange-500/10 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Sparkles className="h-4 w-4" /> Schedule Consultation
                    </button>
                  </div>
                </form>
              ) : (
                // Success State
                <div className="text-center py-8 space-y-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-500 flex items-center justify-center text-3xl mx-auto shadow-inner">
                    ✓
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-lg font-serif font-bold text-stone-950">Ritual Scheduled Successfully!</h4>
                    <p className="text-xs text-stone-600 max-w-sm mx-auto leading-relaxed">
                      Hari Om! Your request for <span className="text-orange-600 font-semibold">{bookingPuja.name}</span> has been locked with the cosmic servers. Our head Vedic priest will connect with you on WhatsApp within 30 minutes to confirm auspicious Muhurats.
                    </p>
                  </div>

                  {/* Booking Receipt card */}
                  <div className="bg-orange-50/50 border border-orange-200 rounded-2xl p-5 text-left max-w-sm mx-auto space-y-3 font-mono text-[11px] text-stone-700">
                    <div className="border-b border-orange-200 pb-2 text-center text-orange-600 font-bold uppercase tracking-wider font-serif">
                      Sacred Invitation Token
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-75">Yajamana:</span>
                      <span className="font-semibold text-stone-950">{name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-75">Mobile:</span>
                      <span className="font-semibold text-stone-950">{phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-75">Date:</span>
                      <span className="font-semibold text-stone-950">{date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-75">Samagri Kit:</span>
                      <span className="font-semibold text-stone-950">{includeSamagri ? 'Included (Premium)' : 'Excluded'}</span>
                    </div>
                    <div className="border-t border-orange-200 pt-2 flex justify-between font-serif text-xs font-extrabold text-orange-600">
                      <span>Total Dakshina:</span>
                      <span>₹{(includeSamagri ? bookingPuja.priceWithSamagri : bookingPuja.priceWithoutSamagri).toLocaleString()}</span>
                    </div>
                  </div>

                  <button
                    id="btn-close-booking-success"
                    onClick={closeBookingModal}
                    className="py-2.5 px-6 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs shadow-md transition-all inline-block cursor-pointer"
                  >
                    Kalyan Ho! (Close)
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
