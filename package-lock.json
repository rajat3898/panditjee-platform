/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  MapPin, 
  Sparkles, 
  Users, 
  ShieldCheck, 
  Plane, 
  Hotel, 
  Award, 
  Check, 
  ArrowRight, 
  HelpCircle, 
  Coins, 
  Crown, 
  Calendar,
  Gem
} from 'lucide-react';

interface PilgrimageDestination {
  id: string;
  name: string;
  state: string;
  description: string;
  durationDays: number;
  highlight: string;
  packages: Record<string, {
    title: string;
    pricePerPerson: number;
    accommodation: string;
    transport: string;
    darshanExperience: string;
    specialInclusions: string[];
  }>;
}

export default function SpiritualTravel() {
  const [selectedDestId, setSelectedDestId] = useState<string>('varanasi');
  const [selectedTier, setSelectedTier] = useState<string>('premium');
  const [numPilgrims, setNumPilgrims] = useState<number>(2);
  const [travelDate, setTravelDate] = useState<string>('2026-09-12');
  const [isBooked, setIsBooked] = useState<boolean>(false);

  const destinations: PilgrimageDestination[] = [
    {
      id: 'varanasi',
      name: 'Varanasi (Kashi Vishwanath)',
      state: 'Uttar Pradesh',
      description: 'The world’s oldest continuously inhabited city. Bathed in sacred lights of evening Ganga Aarti, exploring narrow lanes of spiritual awakening.',
      durationDays: 4,
      highlight: 'Kashi Vishwanath Corridor Darshan & private Subah-e-Banaras sunrise boat ride.',
      packages: {
        budget: {
          title: 'Dharamshala & Ashram Sadhana',
          pricePerPerson: 3500,
          accommodation: 'Authentic Ganga-front Ashram or clean Dharamshala (Non-AC)',
          transport: 'Shared Sleeper train & traditional battery rickshaws',
          darshanExperience: 'General public darshan queue alignment with group guidance',
          specialInclusions: [
            'Group Ganga Aarti seating',
            'Sattvik Ashram meals (prasadam) daily',
            'Sankalp Puja performed by shared Ashram priest'
          ]
        },
        premium: {
          title: '3-Star Vedic AC Comfort',
          pricePerPerson: 12500,
          accommodation: 'Cozy 3-star AC boutique hotel near Godowlia crossing',
          transport: 'AC Train tickets (3AC) & Private AC Hatchback for airport transfers',
          darshanExperience: 'Vedic Sugam Darshan (Fast-track entry tickets)',
          specialInclusions: [
            'Dedicated boat ride for sunset Ganga Aarti',
            'Buffet breakfast & customized dinner menus',
            'Private pandit for customized ancestors (Pind Daan) or family welfare puja'
          ]
        },
        luxury: {
          title: '5-Star Spiritual Heritage',
          pricePerPerson: 38000,
          accommodation: 'Premium 5-star Heritage property (e.g. BrijRama Palace or Taj Ganges)',
          transport: 'Direct flight tickets (Economy) & Private AC SUV (Innova Crysta)',
          darshanExperience: 'VIP Protocol fast-track corridor entry escorted by temple supervisor',
          specialInclusions: [
            'Exquisite private bajra/boat setup with classical shehnai players for Aarti',
            'Gourmet temple-inspired dining experience',
            'Personal Vedic Scholar guiding the entire historical temple exploration',
            'Detailed 2-Hour private Shiva Rudrabhishek puja inside core shrine'
          ]
        },
        royal: {
          title: 'Royal Luxury Presidential Darshan',
          pricePerPerson: 120000,
          accommodation: 'The legendary Maharaja Suites at Taj Nadesar Palace',
          transport: 'Helicopter charter transfers (or private Business Class flights) & Luxury Sedan escort',
          darshanExperience: 'Ultimate Sanctum-Sanctorum Private Darshan led directly by the Chief Archaka',
          specialInclusions: [
            'Ultra-private luxury cruise yacht on river Ganges with bespoke Vedic fire rituals onboard',
            '24/7 personal spiritual butler and luxury concierge',
            'Personalized gold-plated deity souvenir blessed inside the Garbhagriha',
            'Siddha Maha-Yajna ceremony executed at private ashram for family legacy longevity'
          ]
        }
      }
    },
    {
      id: 'char-dham',
      name: 'Kedarnath & Badrinath (Do Dham)',
      state: 'Uttarakhand Himalayas',
      description: 'Journey into the high-altitude portals of the gods. Cleanse your soul in the crisp Himalayan peaks and witness eternal fires of cosmic devotion.',
      durationDays: 6,
      highlight: 'Badrinarayan golden darshan & high-vibe Kedarnath mountain yatra.',
      packages: {
        budget: {
          title: 'Himalayan Pilgrim Dormitories',
          pricePerPerson: 8500,
          accommodation: 'Basic wooden cottages / GMVN tourist home dormitories',
          transport: 'Non-AC Road bus from Rishikesh & trekking path walking',
          darshanExperience: 'General queue entry with Himalayan support groups',
          specialInclusions: [
            'Warm woolens blanket support',
            'Simple piping-hot mountain food (khichdi, roti, subji)',
            'Group Satsangs led by mountain sadhus'
          ]
        },
        premium: {
          title: 'Cozy Alpine AC Resorts',
          pricePerPerson: 28000,
          accommodation: 'Heating-equipped 3-star cottages in Guptkashi & Joshimath',
          transport: 'Private AC Bolero/Maxx & Pony (mule) booking for Kedarnath ascent',
          darshanExperience: 'Special priority tickets booked via Uttarakhand Shrine Board',
          specialInclusions: [
            'Hot spring (Tapt Kund) custom bathing sequence facilitation',
            'Breakfast & dinner buffets with healthy local millet meals',
            'Private escort guide for trekking path safety'
          ]
        },
        luxury: {
          title: 'Heli-Yatra & Mountain Spas',
          pricePerPerson: 75000,
          accommodation: 'Premium Himalayan wellness resorts with luxury wooden chalets',
          transport: 'Same-day Helipad VIP shuttle tickets for Kedarnath & premium SUVs for Badrinath',
          darshanExperience: 'VIP protocol passes in both shrines with quick access corridors',
          specialInclusions: [
            'Helicopter shuttle directly bypassing the arduous 16km trek',
            'Premium organic food menus with fresh high-mountain herbs',
            'Exclusive early-morning Badrinath Maha Abhishek Puja tickets',
            'Ayurvedic dry massage therapy session post-travel'
          ]
        },
        royal: {
          title: 'Royal Himalayan Heaven Charter',
          pricePerPerson: 220000,
          accommodation: 'Exclusive Private Luxury Tents with fully heated floor systems',
          transport: 'Private executive Helicopter chartered directly from Dehradun with VIP lounge access',
          darshanExperience: 'Full Sanctum VIP Protocol access with direct sitting permissions for early morning prayers',
          specialInclusions: [
            'Dedicated private mountain guide, personal paramedic, and executive chef',
            'Special private yajna for progeny and lineage blessing in Badrinath',
            'Exclusive aerial view flyover of surrounding peak ranges',
            'Collection of rare Himalayan herbal extracts & energized shaligram stones gifted'
          ]
        }
      }
    },
    {
      id: 'ayodhya',
      name: 'Ayodhya (Ram Janmabhoomi)',
      state: 'Uttar Pradesh',
      description: 'The magnificent capital of the Solar Dynasty (Suryavansha). Soak in the majestic aura of the grand newly-built Ram Mandir and the holy Saryu waters.',
      durationDays: 3,
      highlight: 'Comprehensive Ram Lalla darshan, Hanumangarhi blessing & Saryu light projection show.',
      packages: {
        budget: {
          title: 'Sarayu Riverside Ashrams',
          pricePerPerson: 2500,
          accommodation: 'Riverside Vedic ashram rooms (Clean, basic)',
          transport: 'E-rickshaws & shared passenger train transport',
          darshanExperience: 'Standard queue alignment',
          specialInclusions: [
            'Grand Ayodhya deepotsav representation lamp',
            'Simple Sattvik bhandara lunches',
            'Spiritual chanting group entries'
          ]
        },
        premium: {
          title: 'Ramayana Theme AC Lodges',
          pricePerPerson: 9500,
          accommodation: '3-star modern comfortable hotel styled with traditional decor',
          transport: 'AC Train & private local electric cabs',
          darshanExperience: 'Online pre-booked VIP darshan slot tokens',
          specialInclusions: [
            'Grand Saryu river sunset boat ride',
            'Ghee-rich breakfast & dinner selections',
            'Custom Ramayana path recital booklet & wooden Ram Mandir model gift'
          ]
        },
        luxury: {
          title: 'Regal Heritage Palace Living',
          pricePerPerson: 29000,
          accommodation: 'Top-tier luxury hotel near Saryu riverfront (e.g. Royal Heritage properties)',
          transport: 'Direct flight (Economy) to Ayodhya airport & private AC Sedan',
          darshanExperience: 'Fast-track protocol corridor entry card directly near Ram Lalla',
          specialInclusions: [
            'Private classical bhajan recital organized at evening camp',
            'Personalized family Ramayana Yajna conducted by royal temple priests',
            'Private VIP canopy setup on Saryu River during evening deep-dan ceremony'
          ]
        },
        royal: {
          title: 'Divine Royal Solar Dynasty Experience',
          pricePerPerson: 95000,
          accommodation: 'Presidential Suites at Ayodhya’s premier luxury estate',
          transport: 'Private chauffeur-driven Mercedes-Benz/Audi transfers from Lucknow/Ayodhya & luxury speed-boat',
          darshanExperience: 'Immediate temple entry accompanied directly by the temple trust board representative',
          specialInclusions: [
            'Exclusive Ram Lalla shringar darshan tickets (highly restricted early morning access)',
            'Special Gold-Plated Ram Lalla idol consecrated during private homa',
            'Unrestricted access to personal spiritual guides and private historical archive visits',
            'Luxury organic royal banquet menu curated daily'
          ]
        }
      }
    },
    {
      id: 'rameshwaram',
      name: 'Rameshwaram (Rama Setu & Jyotirlinga)',
      state: 'Tamil Nadu',
      description: 'The southern sacred Dham where Lord Rama established the Shiva Lingam and built the legendary bridge to Lanka. Bathe in the 22 holy wells (Teerthams) inside the temple.',
      durationDays: 4,
      highlight: 'Sacred 22 Teertham well bathing experience and scenic excursion to the lands of Dhanushkodi.',
      packages: {
        budget: {
          title: 'Dharamshala near Agni Teertham',
          pricePerPerson: 3200,
          accommodation: 'Clean and quiet traditional pilgrim rooms near the beach front',
          transport: 'Train Sleeper Class & shared local auto-rickshaws',
          darshanExperience: 'Traditional walking queue entry through main portals',
          specialInclusions: [
            'Holy well guide assistant',
            'Traditional South Indian leaf-served simple meals',
            'Agni Teertham Samudra Snanam helper'
          ]
        },
        premium: {
          title: '3-Star AC Temple View Comfort',
          pricePerPerson: 11000,
          accommodation: '3-star AC hotel with views of the magnificent temple towers',
          transport: '3AC train & private local AC Hatchback transfers',
          darshanExperience: 'Sugam Darshan (Fast-track entry passes)',
          specialInclusions: [
            'Pamban Bridge historic photo stop and evening sunset view',
            'Buffet breakfast and dinner selections daily',
            'Private Pandit for custom family welfare Sankalpa'
          ]
        },
        luxury: {
          title: 'Beachfront Premium Wellness',
          pricePerPerson: 32000,
          accommodation: 'Boutique beachfront luxury resort (e.g. Daiwik Hotel)',
          transport: 'Direct flight to Madurai & private AC SUV (Innova Crysta) escort',
          darshanExperience: 'VIP entrance card escorted directly by senior temple board priests',
          specialInclusions: [
            'Private excursion to Dhanushkodi ghost town with a certified local guide',
            'Custom high-vibration family Pitru-Tarpanam or Laxmi Puja',
            'Rejuvenating Ayurvedic massage session post-travel'
          ]
        },
        royal: {
          title: 'Royal Emperor Southern Dham',
          pricePerPerson: 105000,
          accommodation: 'Luxury Sea-Front Private Villa with infinity plunge pool',
          transport: 'Helicopter charter transfers from Madurai & luxury private sedan at your service',
          darshanExperience: 'Direct Sanctum-Sanctorum entrance escorted by the Chief Priest',
          specialInclusions: [
            'Exclusive private Spatika Linga early morning darshan ticket',
            'Ultra-private guided boat tour near Rama Setu (Adam’s Bridge) structures',
            'Personalized solid silver deity souvenir blessed directly on the main Lingam',
            '24/7 personal spiritual butler and luxury concierge service'
          ]
        }
      }
    },
    {
      id: 'puri',
      name: 'Jagannath Puri (Sri Kshetra)',
      state: 'Odisha',
      description: 'The ancient Eastern Dham of Lord Jagannath, Subhadra, and Balabhadra. Experience the immense sea breeze, historic mathas, and the cosmic kitchen of Mahaprasad.',
      durationDays: 3,
      highlight: 'Exclusive Mahaprasad dining experience and spiritual exploration of the Chariot City.',
      packages: {
        budget: {
          title: 'Gaudiya Math Guest Rooms',
          pricePerPerson: 2900,
          accommodation: 'Simple and quiet traditional Gaudiya Math guest quarters',
          transport: 'Express Sleeper train & traditional cycle rickshaws',
          darshanExperience: 'Standard group entrance through Simhadwara (Lion’s Gate)',
          specialInclusions: [
            'Fresh Mahaprasad (cooked in clay pots) served daily',
            'Sea beach meditation guide session',
            'Spiritual chanting group access'
          ]
        },
        premium: {
          title: 'Sea-View Golden Comfort',
          pricePerPerson: 10500,
          accommodation: 'Comfortable 3-star AC resort located directly on Golden Beach',
          transport: '3AC train tickets & private local AC sedan for sightseeing',
          darshanExperience: 'Online pre-booked fast-track darshan escorted by a dedicated Panda',
          specialInclusions: [
            'Puri beach sand art experience and evening sunset sea walk',
            'Vegetarian multi-cuisine buffet breakfast and dinners',
            'Special Chhappan Bhog offering arranged for your family'
          ]
        },
        luxury: {
          title: 'Premium Seafront Resort Heritage',
          pricePerPerson: 28000,
          accommodation: 'Premium sea-facing luxury resort (e.g. Mayfair Heritage Puri)',
          transport: 'Direct flight to Bhubaneswar & private AC SUV transfers',
          darshanExperience: 'VIP entrance card with priority seating inside the inner temple yard',
          specialInclusions: [
            'Excursion to Konark Sun Temple with certified local historian',
            'Guided tour of ancient mathas and non-accessible sections',
            'Private classical Odissi or bhajan performance organized at resort'
          ]
        },
        royal: {
          title: 'Divine Royal Gajapati Experience',
          pricePerPerson: 98000,
          accommodation: 'The Presidential Suite at Mayfair Waves or private heritage estate',
          transport: 'Business Class flights to Bhubaneswar, premium luxury sedan, and VIP airport lounge access',
          darshanExperience: 'Sanctum-Sanctorum Private Darshan led directly by Royal Gajapati-escort Pandas',
          specialInclusions: [
            'Exclusive gift of dried sacred flag (Patitapabana Bana) from the Neela Chakra',
            'Vedic fire ceremony at private seaside ashram for family legacy',
            'Bespoke culinary dining curated by master chefs with organic ingredients',
            'Private luxury Yacht sailing excursion in the Chilika Lake'
          ]
        }
      }
    },
    {
      id: 'dwarka',
      name: 'Dwarka & Somnath (Western Kingdom)',
      state: 'Gujarat',
      description: 'The spectacular western domain of Lord Krishna (Dwarkadhish) on the banks of Gomti, paired with the legendary seaside Somnath Jyotirlinga.',
      durationDays: 5,
      highlight: 'Bet Dwarka private ferry crossing, Gomti Aarti, and Somnath light-and-sound show.',
      packages: {
        budget: {
          title: 'Dwarka Devasthan Dharamshala',
          pricePerPerson: 4200,
          accommodation: 'Clean temple-managed pilgrim halls with basic amenities',
          transport: 'Express Sleeper class trains & local shared auto-rickshaws',
          darshanExperience: 'Standard public group queue alignment',
          specialInclusions: [
            'Gomti River holy bath helper guide',
            'Authentic Gujarati thali meals daily',
            'Bhalka Tirth group excursion'
          ]
        },
        premium: {
          title: '3-Star AC Kingdom Lodges',
          pricePerPerson: 14500,
          accommodation: 'Comfortable 3-star modern AC hotel near Dwarkadhish temple',
          transport: '3AC train tickets & private local AC Hatchback cab',
          darshanExperience: 'Priority line access token with quick darshan',
          specialInclusions: [
            'Bet Dwarka AC ferry tickets and private local guide',
            'Dhwajarohan ceremony witness (Temple flag hoisting)',
            'Somnath sea-view evening walk and historic gate tour'
          ]
        },
        luxury: {
          title: 'Luxury Wyndham Estates',
          pricePerPerson: 36000,
          accommodation: 'Luxury boutique resort (e.g. Hawthorn Suites by Wyndham or Mercure)',
          transport: 'Direct flight to Rajkot/Jamnagar & private Innova Crysta SUV',
          darshanExperience: 'VIP fast-track entries at both Dwarka and Somnath shrines',
          specialInclusions: [
            'Private archaeologist guide for a detailed submerged Dwarka history tour',
            'Special Somnath Mahapuja with custom chants inside the core temple',
            'Bespoke seaside candlelight sattvik dinner'
          ]
        },
        royal: {
          title: 'Royal Dwarkadhish Imperial Tour',
          pricePerPerson: 115000,
          accommodation: 'The Imperial Suite at the premier seaside heritage villa',
          transport: 'Helicopter charter flights or luxury sedan from Jamnagar directly to Dwarka',
          darshanExperience: 'Exclusive private sanctum archana escorted directly by the Chief Priest',
          specialInclusions: [
            'Custom gold-bordered silk angavastram gifted by temple trust board',
            'Bespoke private sunset cruise in the Dwarka sea with live music',
            'Comprehensive Maha-Mrityunjaya yajna executed in Somnath',
            'Personal spiritual guide and private luxury concierge'
          ]
        }
      }
    },
    {
      id: 'vaishnodevi',
      name: 'Vaishno Devi (Mata Rani Hills)',
      state: 'Jammu & Kashmir',
      description: 'The sacred holy cave of the Mother Goddess nestled in the scenic Trikuta Hills. Feel the intense devotion of millions as you ascend the divine paths.',
      durationDays: 3,
      highlight: 'Holy cave Darshan of the three natural rock formations representing Mahalakshmi, Mahasaraswati, and Mahakali.',
      packages: {
        budget: {
          title: 'Shrine Board Dormitories',
          pricePerPerson: 2100,
          accommodation: 'Basic clean dormitories managed by the Shrine Board in Katra or Adhkuwari',
          transport: 'Sleeper class train tickets & traditional walking trek',
          darshanExperience: 'Standard Yatra Registration Parchi general line access',
          specialInclusions: [
            'Yatra registration and locker support helper',
            'Clean hot water shower facility tokens',
            'Simple food court meals daily'
          ]
        },
        premium: {
          title: '3-Star AC Foothill Comfort',
          pricePerPerson: 7500,
          accommodation: 'Comfortable 3-star AC hotel located in Katra city center',
          transport: '3AC Train & Pony/Battery car booking for Ardhkuwari/Bhavan ascent',
          darshanExperience: 'Priority online darshan slot passes guaranteed',
          specialInclusions: [
            'Bhairon Ghati cable car tickets and priority booking',
            'Delicious sattvik breakfast & dinner buffet daily',
            'Vedic prayer booklet and premium dry fruit prasad bag'
          ]
        },
        luxury: {
          title: 'Premium Mountain Spa Resorts',
          pricePerPerson: 21000,
          accommodation: 'Premium wellness resort (e.g. Fortune Park or Welcomhotel Katra)',
          transport: 'Direct flight to Jammu & private AC Sedan transfers',
          darshanExperience: 'VIP Shrine Board protocol passes with quick-access lane',
          specialInclusions: [
            'Helicopter tickets from Katra to Sanjichhat and return',
            'Personal trekking assistant and safety escort',
            'Special Atka Aarti attendance inside the Bhavan complex'
          ]
        },
        royal: {
          title: 'Royal Trikuta Devine Sanctuary',
          pricePerPerson: 85000,
          accommodation: 'The Presidential Suites at Jammu/Katra’s premier wellness estate',
          transport: 'Private luxury helicopter charter directly to Sanjichhat & premium Mercedes pickup',
          darshanExperience: 'VVIP Sanctum Darshan with direct seating during the holy night Shringar Aarti',
          specialInclusions: [
            'Bespoke private yajna in Katra prior to ascent',
            'Direct luxury personal guide and personal security escort',
            'Exquisite pure-gold plated coin souvenir blessed directly on the Pindis',
            'Custom luxury dining menu curated daily'
          ]
        }
      }
    },
    {
      id: 'tirupati',
      name: 'Tirupati Balaji (Srivari Temple)',
      state: 'Andhra Pradesh',
      description: 'The ancient hill-shrine of Lord Venkateswara (Balaji) on the divine seven hills of Tirumala. The ultimate powerhouse of devotion and celestial blessings.',
      durationDays: 3,
      highlight: 'Srivari Special Entry Darshan and traditional Laddu prasadam blessing.',
      packages: {
        budget: {
          title: 'TTD Pilgrimage Cottage Rooms',
          pricePerPerson: 2800,
          accommodation: 'Clean and basic rooms in Tirumala/Tirupati TTD cottages',
          transport: 'Sleeper class train & shared APSRTC mountain buses',
          darshanExperience: 'Divya Darshan (Pedestrian) or standard general queue alignment',
          specialInclusions: [
            'Tonsuring ceremony assistant',
            'Traditional Anna Prasadam meals daily',
            '2 pieces of world-famous Tirupati Laddus'
          ]
        },
        premium: {
          title: '3-Star Modern City Comfort',
          pricePerPerson: 9000,
          accommodation: 'Comfortable 3-star AC hotel located in Tirupati city',
          transport: '3AC train & private local AC sedan for transit',
          darshanExperience: 'TTD Special Entry Darshan (₹300 guaranteed token slot)',
          specialInclusions: [
            'Kalyana Venkateswara temple tour and local site guidance',
            'Daily multi-cuisine vegetarian buffet meals',
            'Srivari Laddu pack of 6 with custom cotton bag'
          ]
        },
        luxury: {
          title: '5-Star Taj Luxury Sanctuary',
          pricePerPerson: 24000,
          accommodation: '5-star premium luxury hotel (e.g. Taj Tirupati or Fortune Select Grand Ridge)',
          transport: 'Direct flight to Tirupati & private AC Innova SUV escort',
          darshanExperience: 'VIP Break Darshan (L1/L2 equivalent protocol clearance)',
          specialInclusions: [
            'Veda Pathshala guided visit and spiritual talk',
            'Custom Kalyanotsavam (celestial marriage) seva booking support',
            'Private Pandit for custom family mantra chanting session'
          ]
        },
        royal: {
          title: 'VVIP Royal Balaji Archana Tour',
          pricePerPerson: 95000,
          accommodation: 'Executive Presidential Suites at Taj Tirupati',
          transport: 'Private Helicopter charter flights or direct Business Class flight & premium Audi escort',
          darshanExperience: 'Direct VVIP Sanctum Srivari Darshan (L1 Protocol escort directly by senior officials)',
          specialInclusions: [
            'Participation in restricted Suprabhatha Seva (awakening ritual of Lord Balaji)',
            'Exclusive silver/gold deity souvenir consecrated on Srivari feet',
            'Premium temple-board culinary dining experience',
            '24/7 private concierge and personal luxury SUV'
          ]
        }
      }
    },
    {
      id: 'vrindavan',
      name: 'Vrindavan & Mathura (Braj Bhoomi)',
      state: 'Uttar Pradesh',
      description: 'The blissful birthplace of Lord Krishna. Wander through the sweet groves of Nidhivan, dance in Prem Mandir, and lose yourself in the hypnotic chants of Bankey Bihari.',
      durationDays: 3,
      highlight: 'Exclusive Bankey Bihari flower Shringar darshan and Yamuna River sunset boating.',
      packages: {
        budget: {
          title: 'Vrindavan Dharamshala & Ashram',
          pricePerPerson: 1800,
          accommodation: 'Clean, simple traditional Braj ashram near ISKCON temple',
          transport: 'Sleeper class trains and battery-operated local rickshaws',
          darshanExperience: 'Standard community queue alignment with Braj guides',
          specialInclusions: [
            'Daily simple Braj-style bhandara lunches (Khichdi, subji)',
            'Sacred parikrama guide through holy dust of Govardhan Hill',
            'Evening bhajan session participation'
          ]
        },
        premium: {
          title: '3-Star Braj Dham AC Comfort',
          pricePerPerson: 8200,
          accommodation: 'Modern, well-maintained 3-star AC hotel in Vrindavan',
          transport: '3AC train to Mathura Junction and private AC Hatchback',
          darshanExperience: 'Guaranteed temple fast-track assistance and VIP guide',
          specialInclusions: [
            'Yamuna river sunset cruise with traditional Braj Aarti',
            'Braj special sweet pedas box and Tulsi garland prasad',
            'Daily North Indian buffet meals'
          ]
        },
        luxury: {
          title: 'Krishna Heritage Premium Living',
          pricePerPerson: 25000,
          accommodation: 'Luxury heritage resort (e.g., Nidhivan Sarovar Portico)',
          transport: 'Direct flight to Agra/Delhi & private AC Sedan transfers',
          darshanExperience: 'VIP queue bypassing escorted by temple panda and trust member',
          specialInclusions: [
            'Private customized parikrama of Govardhan with personal Vedic guide',
            'Exclusive Chhappan Bhog feast offering arranged for the family',
            'Traditional Sanjhi art exhibition demonstration session'
          ]
        },
        royal: {
          title: 'Royal Braj Raj Imperial Retreat',
          pricePerPerson: 88000,
          accommodation: 'Grand Presidential Suite at Vrindavan’s premier luxury retreat',
          transport: 'Private Helicopter charter directly from Delhi & premium luxury sedan',
          darshanExperience: 'Direct Sanctum VVIP access with exclusive seating during core deity rituals',
          specialInclusions: [
            'Ultra-exclusive early morning Shringar and Mangala Aarti access tickets',
            'Bespoke gold-plated Radharani coin souvenir blessed inside the main shrine',
            '24/7 private Brajvasi spiritual butler and luxury concierge',
            'Private classical bansuri (flute) performance in Nidhivan background'
          ]
        }
      }
    },
    {
      id: 'ujjain',
      name: 'Ujjain (Mahakaleshwar Jyotirlinga)',
      state: 'Madhya Pradesh',
      description: 'The sacred city of Mahakal situated on the holy banks of Shipra. Witness the divine and intense Bhasma Aarti—where Lord Shiva is adorned with sacred ash.',
      durationDays: 3,
      highlight: 'Auspicious Mahakal Bhasma Aarti attendance and Kal Bhairav temple liquor offering custom.',
      packages: {
        budget: {
          title: 'Shipra Ghat Dharamshala',
          pricePerPerson: 2200,
          accommodation: 'Clean community-run dharamshala rooms near Ram Ghat',
          transport: 'Sleeper class trains to Ujjain and local shared auto-rickshaws',
          darshanExperience: 'Standard queue alignment with local priest guidelines',
          specialInclusions: [
            'Holy dip assistance in River Shipra during morning prayers',
            'Traditional Malwi simple thali meals daily',
            'Group chanting and sandhya aarti seating'
          ]
        },
        premium: {
          title: '3-Star Mahakal AC Comfort',
          pricePerPerson: 8800,
          accommodation: 'Modern 3-star AC hotel located near the Mahakal Corridor',
          transport: '3AC train tickets & private local AC sedan transfers',
          darshanExperience: 'Guaranteed Sugam Darshan (Corridor VIP entry passes)',
          specialInclusions: [
            'Bhasma Aarti pre-booking token registration support',
            'Auspicious Shipra river private boat ride',
            'Special Malwi breakfast & dinners daily'
          ]
        },
        luxury: {
          title: 'Radisson Blu Luxury Devotion',
          pricePerPerson: 27000,
          accommodation: 'Luxury premium hotel (e.g., Radisson Hotel Ujjain)',
          transport: 'Direct flight to Indore airport & private AC SUV (Innova Crysta) escort',
          darshanExperience: 'VVIP protocol fast-track access inside the inner sanctum',
          specialInclusions: [
            'Guaranteed direct seat reservation for the holy morning Bhasma Aarti',
            'Custom Rudrabhishek Puja performed by senior Vedic pandits in the temple yard',
            'Heritage Ujjain observatory tour with private astrologer'
          ]
        },
        royal: {
          title: 'Royal Mahakal Sovereign Charter',
          pricePerPerson: 92000,
          accommodation: 'The Presidential Suite at Ujjain’s premium luxury estate',
          transport: 'Private Helicopter charter directly from Indore airport & luxury sedan escort',
          darshanExperience: 'Ultimate Sanctum-Sanctorum entrance escorted by the Chief Archaka',
          specialInclusions: [
            'Private early morning Bhasma Aarti and Shringar tickets',
            'Solid silver-plated Shiva trident blessed directly on the Jyotirlinga',
            '24/7 personal spiritual butler and dedicated luxury concierge',
            'Siddha Maha-Yajna performed for health and absolute protection'
          ]
        }
      }
    },
    {
      id: 'rishikesh',
      name: 'Rishikesh & Haridwar (Himalayan Gateway)',
      state: 'Uttarakhand',
      description: 'The yoga capital of the world and the sacred gateway to the Himalayas. Hear the powerful evening chants of Har Ki Pauri and feel the pristine flow of Ganga.',
      durationDays: 4,
      highlight: 'Ganga Aarti at Parmarth Niketan & Har Ki Pauri, and scenic Chandi Devi cable car.',
      packages: {
        budget: {
          title: 'Ganga Bank Ashrams',
          pricePerPerson: 2400,
          accommodation: 'Simple quiet ashram rooms with basic amenities in Muni Ki Reti',
          transport: 'Sleeper class trains to Haridwar and local shared rickshaws',
          darshanExperience: 'Standard group assembly at Ganga Ghats',
          specialInclusions: [
            'Ashram yoga and pranayama morning session',
            'Sattvik organic ashram meals (prasadam) daily',
            'Ganga Snanam guide help'
          ]
        },
        premium: {
          title: '3-Star Wellness AC Comfort',
          pricePerPerson: 9800,
          accommodation: 'Beautiful 3-star resort near Laxman Jhula with river views',
          transport: '3AC train to Haridwar and private AC sedan transfers',
          darshanExperience: 'Reserved seating passes for Parmarth Niketan Ganga Aarti',
          specialInclusions: [
            'Chandi Devi & Mansa Devi ropeway tickets with fast-track entry',
            'Ganga river rafting (optional) and yoga consultation',
            'Daily healthy buffet breakfast and dinner'
          ]
        },
        luxury: {
          title: 'Taj Himalayan River Resort',
          pricePerPerson: 39000,
          accommodation: 'Premium luxury resort (e.g., Taj Rishikesh or Aloha On The Ganges)',
          transport: 'Direct flight to Dehradun Jolly Grant Airport & private SUV',
          darshanExperience: 'VIP riverside deck seating for the grand Ganga Aarti',
          specialInclusions: [
            'Private customized Vedic Ganga Havan ceremony performed on private ghat',
            'Exclusive organic spa rejuvenation massage treatment session',
            'Private yoga sessions led by Himalayan meditation masters'
          ]
        },
        royal: {
          title: 'Ananda In The Himalayas Royal Retreat',
          pricePerPerson: 135000,
          accommodation: 'Luxury private villas with heated pool at Ananda in the Himalayas',
          transport: 'Private Helicopter charter directly to the estate helipad from Dehradun/Delhi',
          darshanExperience: 'Ultra-exclusive VVIP temple entries and custom private boat',
          specialInclusions: [
            'Personal wellness program (Ayurveda, yoga, organic gourmet meals)',
            'Customized grand Rudra Havan performed on a secluded private Ganga ghat',
            '24/7 private butler and luxury Mercedes-Benz chauffeur escort',
            'Rare Vedic scrolls and energized crystal Sphatik mala gifted'
          ]
        }
      }
    },
    {
      id: 'madurai',
      name: 'Madurai (Meenakshi Amman Temple)',
      state: 'Tamil Nadu',
      description: 'The ancient lotus-shaped city dominated by the massive, colorful towers of the Meenakshi Sundareswarar Temple. Discover extraordinary Dravidian architecture and devotion.',
      durationDays: 3,
      highlight: 'Awe-inspiring 1000-pillar hall exploration and the sacred night procession ceremony.',
      packages: {
        budget: {
          title: 'Gopuram View Lodging',
          pricePerPerson: 2000,
          accommodation: 'Clean, simple dharamshala or budget hotel near West Tower',
          transport: 'Sleeper class trains and local shared auto-rickshaws',
          darshanExperience: 'Standard walking queue entry through Dravidian corridor',
          specialInclusions: [
            'Traditional South Indian leaf-served hot prasadam meals',
            'Local temple walking guide and map helper',
            'Golden Lotus Tank meditation access'
          ]
        },
        premium: {
          title: '3-Star Heritage AC Comfort',
          pricePerPerson: 8500,
          accommodation: 'Elegant 3-star boutique hotel with traditional Tamil decor',
          transport: '3AC train & private local AC Hatchback transfers',
          darshanExperience: 'Sugam Darshan (Special fast-track temple entry passes)',
          specialInclusions: [
            'Thirumalai Nayakkar Palace light & sound show tickets',
            'Delicious traditional filter coffee & Madurai meals daily',
            'Vedic mantra booklet and customized prasadam bag'
          ]
        },
        luxury: {
          title: 'Heritage Madurai Premium Resorts',
          pricePerPerson: 24000,
          accommodation: 'Luxury resort (e.g., Heritage Madurai or The Gateway Pasumalai)',
          transport: 'Direct flight to Madurai & private AC SUV (Innova Crysta) escort',
          darshanExperience: 'VVIP temple entrance escorted directly by senior temple trust members',
          specialInclusions: [
            'Private historian guide for a detailed tour of the 1000-pillar hall',
            'Custom Sri Vidya Lakshmi Puja performed for family prosperity',
            'Traditional South Indian silk saree or veshti set gifted'
          ]
        },
        royal: {
          title: 'Royal Meenakshi Empire Tour',
          pricePerPerson: 89000,
          accommodation: 'The Presidential Suite at Madurai’s premier heritage villa',
          transport: 'Private Helicopter charter directly from Chennai/Bengaluru & premium luxury sedan',
          darshanExperience: 'Direct Sanctum-Sanctorum entry escorted by the chief priest with custom honors',
          specialInclusions: [
            'Exclusive participation in the restricted Golden Chariot Procession Seva',
            'Beautiful gold-plated Meenakshi-Sundareswarar icon blessed on the deity feet',
            '24/7 personal Tamil-speaking spiritual guide and luxury concierge',
            'Bespoke gourmet feast curated by heritage royal chefs'
          ]
        }
      }
    }
  ];

  const currentDest = destinations.find(d => d.id === selectedDestId) || destinations[0];
  const activePackage = currentDest.packages[selectedTier];

  const calculateTotalPrice = () => {
    return activePackage.pricePerPerson * numPilgrims;
  };

  const handleBooking = () => {
    setIsBooked(true);
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'budget': return <Coins className="h-5 w-5 text-orange-600/60" />;
      case 'premium': return <Sparkles className="h-5 w-5 text-orange-500" />;
      case 'luxury': return <Gem className="h-5 w-5 text-orange-600" />;
      case 'royal': return <Crown className="h-5 w-5 text-orange-700 animate-pulse" />;
      default: return <Sparkles className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-10">
      {/* Visual Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-widest text-orange-600 font-bold bg-orange-50 border border-orange-200 px-3.5 py-1.5 rounded-full inline-block">
          Sacred Pilgrimages
        </span>
        <h2 className="text-3xl md:text-4xl font-serif text-stone-900 font-bold">Spiritual Travelling</h2>
        <p className="text-sm text-stone-600 leading-relaxed">
          Embark on deep-soul journeys to Sanatan Dharma's power spots. Plan high-vibrational itineraries curated across four specialized classes—Budget, Premium, Luxury, and Royal Luxury.
        </p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left column: Destination & Tier Selectors */}
        <div className="lg:col-span-4 space-y-6">
          {/* 1. Destination Selector */}
          <div className="bg-white border border-orange-200 rounded-3xl p-6 space-y-4 shadow-sm">
            <h3 className="text-sm font-serif font-semibold text-stone-850 border-b border-orange-100 pb-2">
              Select Sacred Destination
            </h3>
            <div className="space-y-3">
              {destinations.map((dest) => (
                <button
                  id={`btn-dest-${dest.id}`}
                  key={dest.id}
                  onClick={() => {
                    setSelectedDestId(dest.id);
                    setIsBooked(false);
                  }}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-start gap-3.5 ${
                    selectedDestId === dest.id
                      ? 'bg-orange-50/50 border-orange-400 shadow-sm'
                      : 'bg-white border-orange-100/70 hover:border-orange-300'
                  }`}
                >
                  <div className="p-2 rounded-xl bg-orange-50 border border-orange-100 text-orange-600 shrink-0 mt-0.5">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-850">{dest.name}</h4>
                    <span className="text-[9px] text-orange-600/80 font-mono block mt-0.5">{dest.state}</span>
                    <p className="text-[10px] text-stone-500 line-clamp-1 mt-1">{dest.highlight}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Pilgrims & Date Configuration */}
          <div className="bg-white border border-orange-200 rounded-3xl p-6 space-y-4 shadow-sm">
            <h3 className="text-sm font-serif font-semibold text-stone-850 border-b border-orange-100 pb-2">
              Journey Configuration
            </h3>

            <div className="space-y-3.5 text-xs">
              {/* Number of Pilgrims */}
              <div className="space-y-1.5">
                <label htmlFor="pilgrim-count" className="block text-[10px] text-stone-500 uppercase tracking-wider font-semibold">Number of Pilgrims (Yatris)</label>
                <div className="flex items-center bg-white border border-orange-200 rounded-xl px-3 py-1.5 justify-between">
                  <span className="font-medium text-stone-800 flex items-center gap-1.5">
                    <Users className="h-4 w-4 text-orange-400" /> {numPilgrims} {numPilgrims === 1 ? 'Yatri' : 'Yatris'}
                  </span>
                  <div className="flex gap-1">
                    <button
                      id="btn-dec-pilgrims"
                      type="button"
                      onClick={() => setNumPilgrims(Math.max(1, numPilgrims - 1))}
                      className="w-8 h-8 rounded-lg bg-stone-50 border border-stone-200 text-stone-700 flex items-center justify-center font-bold hover:bg-stone-100 transition-colors"
                    >
                      -
                    </button>
                    <button
                      id="btn-inc-pilgrims"
                      type="button"
                      onClick={() => setNumPilgrims(Math.min(20, numPilgrims + 1))}
                      className="w-8 h-8 rounded-lg bg-orange-600 text-white flex items-center justify-center font-bold hover:bg-orange-500 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Travel Date */}
              <div className="space-y-1.5">
                <label htmlFor="travel-date-picker" className="block text-[10px] text-stone-500 uppercase tracking-wider font-semibold">Preferred Departure Date</label>
                <div className="flex items-center bg-white border border-orange-200 rounded-xl px-3 py-2.5 font-mono text-stone-800">
                  <Calendar className="h-4 w-4 text-orange-400 mr-2" />
                  <input
                    id="travel-date-picker"
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="flex-1 bg-transparent focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Dynamic Package Display */}
        <div className="lg:col-span-8 space-y-6">
          {/* Package Tier tabs (4 Tiers) */}
          <div className="bg-orange-50 border border-orange-100 p-2 rounded-2xl grid grid-cols-2 sm:grid-cols-4 gap-1.5">
            {[
              { id: 'budget', label: 'Budget', badge: 'Dharamshala' },
              { id: 'premium', label: 'Premium', badge: '3-Star Vedic' },
              { id: 'luxury', label: 'Luxury', badge: '5-Star Palace' },
              { id: 'royal', label: 'Royal Luxury', badge: 'Heritage/Heli' }
            ].map((tier) => (
              <button
                id={`btn-tier-${tier.id}`}
                key={tier.id}
                onClick={() => {
                  setSelectedTier(tier.id);
                  setIsBooked(false);
                }}
                className={`p-3.5 rounded-xl border flex flex-col items-center justify-center text-center transition-all duration-300 ${
                  selectedTier === tier.id
                    ? 'bg-orange-600 border-orange-500 text-white shadow-md font-bold'
                    : 'bg-white/70 border-orange-100/50 text-stone-600 hover:border-orange-200'
                }`}
              >
                <div className="flex items-center gap-1">
                  {getTierIcon(tier.id)}
                  <span className="text-xs font-serif font-bold tracking-wide">{tier.label}</span>
                </div>
                <span className={`text-[8px] uppercase tracking-wider mt-1 ${
                  selectedTier === tier.id ? 'text-white/80 font-semibold' : 'text-stone-400'
                }`}>
                  {tier.badge}
                </span>
              </button>
            ))}
          </div>

          {/* Detailed package presentation Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedDestId}-${selectedTier}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="bg-white border border-orange-200 rounded-3xl p-6 md:p-8 space-y-6 shadow-md"
            >
              {/* Card top */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-4 border-b border-orange-100">
                <div>
                  <span className="text-[10px] text-orange-600 font-bold uppercase tracking-widest block mb-1">
                    Class Category: {selectedTier.toUpperCase()}
                  </span>
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-stone-900 flex items-center gap-2">
                    {activePackage.title}
                  </h3>
                  <p className="text-xs text-stone-500 mt-1 max-w-xl leading-relaxed">
                    {currentDest.description}
                  </p>
                </div>
                <div className="text-right bg-orange-50 border border-orange-200 p-3.5 rounded-2xl shrink-0 self-start sm:self-auto">
                  <span className="text-[9px] uppercase tracking-wider text-stone-500 block">Yatra Fare</span>
                  <span className="text-lg md:text-xl font-extrabold text-orange-600 font-mono">₹{activePackage.pricePerPerson.toLocaleString()}</span>
                  <span className="text-[9px] text-stone-400 block mt-0.5">per person</span>
                </div>
              </div>

              {/* Journey Highlights Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Accommodation */}
                <div className="p-4 bg-orange-50/40 rounded-2xl border border-orange-100 space-y-2">
                  <span className="text-[9px] uppercase tracking-wider text-orange-700 font-bold block">🏨 Accommodation</span>
                  <p className="text-xs text-stone-850 font-serif leading-relaxed">{activePackage.accommodation}</p>
                </div>
                {/* Transport */}
                <div className="p-4 bg-orange-50/40 rounded-2xl border border-orange-100 space-y-2">
                  <span className="text-[9px] uppercase tracking-wider text-orange-700 font-bold block">✈️ Transportation</span>
                  <p className="text-xs text-stone-850 font-serif leading-relaxed">{activePackage.transport}</p>
                </div>
                {/* Darshan Experience */}
                <div className="p-4 bg-orange-50/40 rounded-2xl border border-orange-100 space-y-2">
                  <span className="text-[9px] uppercase tracking-wider text-orange-700 font-bold block">🕉️ Temple Darshan</span>
                  <p className="text-xs text-stone-850 font-serif leading-relaxed">{activePackage.darshanExperience}</p>
                </div>
              </div>

              {/* Inclusions checklist */}
              <div className="space-y-3">
                <h4 className="text-[10px] uppercase tracking-wider text-orange-700 font-bold border-b border-orange-100 pb-1.5">
                  Exclusive Inclusions Included in This Event
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {activePackage.specialInclusions.map((inclusion, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-stone-700 leading-relaxed font-sans">
                      <div className="w-4 h-4 rounded bg-emerald-50 border border-emerald-200 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="h-2.5 w-2.5" />
                      </div>
                      <span>{inclusion}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Booking form or Confirmation trigger */}
              <div className="pt-6 border-t border-orange-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-center sm:text-left">
                  <span className="text-[9px] uppercase tracking-wider text-stone-550 block mb-0.5 font-bold">Total Estimated Yatra Cost ({numPilgrims} Pilgrims)</span>
                  <span className="text-2xl font-black text-orange-600 font-mono">₹{calculateTotalPrice().toLocaleString()}</span>
                  <span className="text-[9px] text-stone-400 block">Includes all boarding, darshan, and priestly activities.</span>
                </div>

                {!isBooked ? (
                  <button
                    id="btn-confirm-travel-booking"
                    onClick={handleBooking}
                    className="py-3 px-6 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm shadow-lg shadow-orange-500/10 transition-all duration-300 flex items-center gap-2 shrink-0 cursor-pointer"
                  >
                    <span>Request Yatra Itinerary</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2 text-emerald-700 font-semibold text-xs flex items-center gap-2 animate-bounce">
                    <ShieldCheck className="h-4 w-4 text-emerald-500" />
                    <span>Journey Booked! We will call you within 30 minutes.</span>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Informational Travel Tips */}
          <div className="p-5 bg-orange-50/50 border border-orange-100 rounded-2xl flex gap-4 items-start">
            <HelpCircle className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs">
              <h4 className="font-serif font-bold text-stone-900">Sacred Yatras (Spiritual Travel Principles)</h4>
              <p className="text-stone-600 leading-relaxed font-sans">
                Vedic pilgrimage is not a vacation; it is a conscious ritual to step outside the ego. While our <strong className="text-stone-950">Royal Luxury</strong> and <strong className="text-stone-950">Luxury</strong> packages are designed for high comfort, medical attention, and expedited priority VIP entries, our <strong className="text-stone-950">Budget</strong> and <strong className="text-stone-950">Premium</strong> packages offer classical Ashram living that brings deep spiritual introspection and sadhana. All food served across all classes is strictly Sattvik vegetarian.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
