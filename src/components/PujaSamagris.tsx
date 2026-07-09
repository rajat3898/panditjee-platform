/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Sparkles, 
  Plus, 
  Minus, 
  Trash2, 
  CheckCircle2, 
  Info, 
  Gift, 
  Truck, 
  MapPin, 
  User, 
  Phone 
} from 'lucide-react';

interface SamagriItem {
  id: string;
  name: string;
  category: 'Kits' | 'Individals' | 'Essentials';
  price: number;
  weight: string;
  description: string;
  purityBadge: string;
  itemsIncluded: string[];
}

export default function PujaSamagris() {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Kits' | 'Individals' | 'Essentials'>('All');
  const [cart, setCart] = useState<{ item: SamagriItem; quantity: number }[]>([]);
  const [activeTab, setActiveTab] = useState<'shop' | 'cart' | 'checkout' | 'success'>('shop');
  
  // Checkout Form State
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');

  const samagris: SamagriItem[] = [
    {
      id: 'satyanarayan-kit',
      name: 'Satyanarayan Katha Puja Premium Kit',
      category: 'Kits',
      price: 1899,
      weight: '3.2 kg',
      description: 'A complete all-inclusive premium material kit containing everything needed to perform an authentic Shri Satyanarayan Vrat Katha without missing any ritual items.',
      purityBadge: 'Certified Organic & Pure',
      itemsIncluded: [
        'Premium Yellow altar cloth (Peele kapda)',
        'Copper Kalash with mango leaf replicas',
        'Finest quality Supari (Betel nuts - 11 pcs)',
        'Authentic Ashtagandha Chandan powder',
        'Aromatic camphor tablets (Bhimseni)',
        'Pooja Akshat (Unbroken polished rice dyed in turmeric)',
        'Earthen Diyas & Cotton wicks (50 pcs)',
        'Desi cow ghee bottle (200ml)',
        'Raw honey & organic sugar powder mixture',
        'Shri Satyanarayan Katha book (Sanskrit/Hindi)'
      ]
    },
    {
      id: 'navratri-durga-kit',
      name: 'Navratri Durga Sthapana & Homa Kit',
      category: 'Kits',
      price: 2499,
      weight: '4.5 kg',
      description: 'Specially assembled kit for Ghatasthapana and nine days of Durga puja. Includes high-potency Havan mixture and sacred materials for daily offerings.',
      purityBadge: 'Sourced from Gangotri Foothills',
      itemsIncluded: [
        'Mitti ka Kalash & Barley (Jow) seeds',
        'Goddess Durga beautifully embroidered red chunri',
        'Mata ka Shringar kit (Bangles, Sindoor, Bindi, Mehendi, etc.)',
        'Premium Havan Samagri packet (1 kg)',
        'Sacred wood (Mango samidha - 1.5 kg)',
        'Dry coconut (Gola - 2 pcs)',
        'Cloves (Laung) & Cardamom (Elaichi) premium select',
        'Pure Desi Ghee (400ml)',
        'Incense sticks (Loban & Guggal organic blend)'
      ]
    },
    {
      id: 'shiv-rudra-kit',
      name: 'Maha Rudrabhishek Abhishek Kit',
      category: 'Kits',
      price: 1599,
      weight: '2.5 kg',
      description: 'A specialized kit containing the essential 11 sacred liquid additives and powders required for executing a satisfying Lord Shiva Rudrabhishek.',
      purityBadge: '100% Non-Toxic & Organic',
      itemsIncluded: [
        'Pure Himalayan Gangajal (500ml)',
        'Certified organic Honey (100g)',
        'Fine Sugarcane juice essence extract (200ml)',
        'Bhasma / Vibhuti from Varanasi (50g)',
        'Scented Sandalwood paste (Chandan)',
        'Black sesame seeds & Barley seeds',
        'Rosewater (Gulab Jal - 150ml)',
        'Perfume (Attar) vial (Mogra)',
        'Panchamrit blending vessel'
      ]
    },
    {
      id: 'bhimseni-camphor',
      name: 'Organic Bhimseni Camphor (Kapur)',
      category: 'Individals',
      price: 349,
      weight: '250 grams',
      description: 'Pristine, 100% pure Bhimseni Camphor crystals. Leaves zero residue. Fills the puja room with an intense purifying aroma that repels mosquitoes and purifies the air.',
      purityBadge: '100% Pure Chemical-Free',
      itemsIncluded: ['Pure Bhimseni Kapur (Crystalline) packaged in airtight tin jar']
    },
    {
      id: 'sandalwood-log',
      name: 'Original Mysore Sandalwood Log & Stone',
      category: 'Individals',
      price: 999,
      weight: '120 grams',
      description: 'An authentic piece of premium Mysore Red & Yellow Sandalwood log accompanied by a traditional volcanic stone rubbing plate (Chakala) to grind fresh, fragrant paste daily.',
      purityBadge: 'Govt. Authorized Sourced',
      itemsIncluded: [
        'Mysore Sandalwood wood log (7-10cm)',
        'Circular stone grinding chakala'
      ]
    },
    {
      id: 'gangajal-bottle',
      name: 'Sacred Gangajal (Direct from Gangotri)',
      category: 'Essentials',
      price: 199,
      weight: '1 Liter',
      description: 'Pure, untouched, naturally filtered water from the source of Ganga at Gangotri high in the Himalayas. Kept in premium food-grade copper-lined containers.',
      purityBadge: 'Authentic Untreated Holy Water',
      itemsIncluded: ['1 Liter Gangotri gangajal bottle, sealed to prevent external contamination']
    },
    {
      id: 'pure-saffron',
      name: 'Kashmiri Saffron (Kumkumapoovu)',
      category: 'Essentials',
      price: 450,
      weight: '1 gram',
      description: 'A-Grade high-potency Kashmiri Mogra Saffron threads, manually picked from Pampore fields. Imparts a bright golden hue to Prasad, Tilak, and milk offerings.',
      purityBadge: 'Grade A+ Certificate',
      itemsIncluded: ['1 gram premium glass vial pack of saffron threads']
    },
    {
      id: 'cow-ghee-premium',
      name: 'A2 Desi Cow Ghee (Bilona Method)',
      category: 'Essentials',
      price: 699,
      weight: '500 ml',
      description: 'Hand-churned A2 cow ghee prepared using the traditional Bilona method from the milk of free-grazing Gir cows. Highly auspicious for homa and daily lamp lighting.',
      purityBadge: 'Traditional Vedic Bilona Churned',
      itemsIncluded: ['500ml glass jar of pure golden A2 ghee']
    }
  ];

  const filteredSamagris = selectedCategory === 'All'
    ? samagris
    : samagris.filter(s => s.category === selectedCategory);

  const addToCart = (item: SamagriItem) => {
    const existing = cart.find(c => c.item.id === item.id);
    if (existing) {
      setCart(cart.map(c => c.item.id === item.id ? { ...c, quantity: c.quantity + 1 } : c));
    } else {
      setCart([...cart, { item, quantity: 1 }]);
    }
  };

  const updateQuantity = (id: string, delta: number) => {
    const updated = cart.map(c => {
      if (c.item.id === id) {
        const newQty = c.quantity + delta;
        return newQty > 0 ? { ...c, quantity: newQty } : null;
      }
      return c;
    }).filter(Boolean) as { item: SamagriItem; quantity: number }[];
    setCart(updated);
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(c => c.item.id !== id));
  };

  const getCartTotal = () => {
    return cart.reduce((acc, curr) => acc + (curr.item.price * curr.quantity), 0);
  };

  const getCartCount = () => {
    return cart.reduce((acc, curr) => acc + curr.quantity, 0);
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerName || !buyerPhone || !address) return;
    setActiveTab('success');
  };

  const resetStore = () => {
    setCart([]);
    setBuyerName('');
    setBuyerPhone('');
    setAddress('');
    setCity('');
    setPincode('');
    setActiveTab('shop');
  };

  return (
    <div className="space-y-10">
      {/* Visual Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-widest text-orange-600 font-bold bg-orange-50 border border-orange-200 px-3.5 py-1.5 rounded-full inline-block">
          Sacred Materials Store
        </span>
        <h2 className="text-3xl md:text-4xl font-serif text-stone-900 font-bold">Sacred Puja Samagris</h2>
        <p className="text-sm text-stone-600 leading-relaxed">
          Nourish your spiritual rituals with certified, pure, and high-vibrational ingredients. Sourced directly from Vedic farms, Himalayan foothills, and original artisan guilds.
        </p>
      </div>

      {/* Main navigation row */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-orange-100 pb-4">
        {/* Category Filters */}
        {activeTab === 'shop' ? (
          <div className="flex gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            {(['All', 'Kits', 'Individals', 'Essentials'] as const).map((cat) => (
              <button
                id={`btn-filter-samagri-${cat}`}
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-semibold rounded-full border transition-all duration-300 shrink-0 cursor-pointer ${
                  (selectedCategory === cat)
                    ? 'bg-orange-600 border-orange-500 text-white font-bold'
                    : 'bg-white border border-orange-200 text-stone-600 hover:border-orange-300'
                }`}
              >
                {cat === 'All' ? 'View All Store' : cat}
              </button>
            ))}
          </div>
        ) : (
          <button
            id="btn-back-to-shop"
            onClick={() => setActiveTab('shop')}
            className="text-xs text-orange-600 hover:text-orange-500 font-bold flex items-center gap-1.5 cursor-pointer"
          >
            ← Continue Browsing Store
          </button>
        )}

        {/* View Cart Indicator */}
        <button
          id="btn-open-cart"
          onClick={() => setActiveTab('cart')}
          className="relative px-5 py-2.5 rounded-xl bg-orange-50 border border-orange-200 hover:bg-orange-100 text-xs font-bold text-stone-800 flex items-center gap-2 transition-all self-end sm:self-auto cursor-pointer"
        >
          <ShoppingBag className="h-4 w-4 text-orange-600" />
          <span>My Sacred Cart</span>
          <span className="bg-orange-600 text-white w-5 h-5 rounded-full flex items-center justify-center font-mono font-black text-[10px]">
            {getCartCount()}
          </span>
        </button>
      </div>

      {/* Dynamic Tabs view */}
      <AnimatePresence mode="wait">
        {activeTab === 'shop' && (
          <motion.div
            key="shop-tab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredSamagris.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-orange-200 rounded-3xl p-5 flex flex-col justify-between hover:border-orange-300 transition-all duration-300 shadow-sm"
              >
                <div className="space-y-3.5">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <span className="text-[9px] bg-orange-50 text-orange-600 border border-orange-200 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                        {item.category}
                      </span>
                      <h3 className="text-sm font-serif font-bold text-stone-900 mt-2">{item.name}</h3>
                    </div>
                    <span className="text-xs text-orange-700 font-mono font-semibold shrink-0 bg-orange-50 border border-orange-100 px-2 py-0.5 rounded">
                      {item.weight}
                    </span>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed font-sans line-clamp-3">
                    {item.description}
                  </p>

                  <div className="text-[10px] text-stone-700 font-mono flex items-center gap-1.5 bg-orange-50/50 p-2 rounded-xl border border-orange-100">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    <span>{item.purityBadge}</span>
                  </div>

                  {/* Included Items list */}
                  <div className="space-y-1 pt-1">
                    <span className="text-[9px] uppercase tracking-wider text-stone-500 font-bold block">Kit Includes:</span>
                    <div className="space-y-1">
                      {item.itemsIncluded.slice(0, 3).map((incl, i) => (
                        <div key={i} className="text-[10px] text-stone-600 truncate flex items-center gap-1.5">
                          <span className="text-orange-600 font-bold">•</span>
                          <span>{incl}</span>
                        </div>
                      ))}
                      {item.itemsIncluded.length > 3 && (
                        <span className="text-[9px] text-orange-600 italic block pl-2.5">
                          + {item.itemsIncluded.length - 3} more sacred items
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Pricing & Add to Cart button */}
                <div className="pt-5 mt-5 border-t border-orange-100 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-stone-500 block">Price</span>
                    <span className="text-base font-extrabold text-orange-600 font-mono">₹{item.price.toLocaleString()}</span>
                  </div>
                  <button
                    id={`btn-add-cart-${item.id}`}
                    onClick={() => addToCart(item)}
                    className="py-2 px-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* CART TAB VIEW */}
        {activeTab === 'cart' && (
          <motion.div
            key="cart-tab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="max-w-2xl mx-auto bg-white border border-orange-200 rounded-3xl p-6 md:p-8 space-y-6 shadow-md"
          >
            <h3 className="text-lg font-serif font-bold text-stone-900 flex items-center gap-2 border-b border-orange-100 pb-3">
              <ShoppingBag className="h-5 w-5 text-orange-600" /> Sacred Basket Review
            </h3>

            {cart.length === 0 ? (
              <div className="text-center py-12 space-y-4">
                <p className="text-xs text-stone-500">Your spiritual basket is currently empty.</p>
                <button
                  id="btn-return-shop-empty"
                  onClick={() => setActiveTab('shop')}
                  className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  Browse Store Materials
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Cart list items */}
                <div className="divide-y divide-orange-100 space-y-4">
                  {cart.map(({ item, quantity }) => (
                    <div key={item.id} className="flex justify-between items-center gap-4 pt-4 first:pt-0">
                      <div className="space-y-1 flex-1">
                        <span className="text-[9px] bg-orange-50 text-orange-600 px-2 py-0.5 rounded border border-orange-100 uppercase tracking-wider font-semibold">
                          {item.category}
                        </span>
                        <h4 className="text-xs font-serif font-bold text-stone-900">{item.name}</h4>
                        <p className="text-[10px] text-stone-500">{item.weight}</p>
                      </div>

                      {/* Quantity selector */}
                      <div className="flex items-center gap-2">
                        <button
                          id={`btn-dec-qty-${item.id}`}
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-7 h-7 rounded bg-stone-50 border border-stone-200 text-stone-700 flex items-center justify-center text-xs font-bold hover:bg-stone-100 transition-colors cursor-pointer"
                        >
                          -
                        </button>
                        <span className="text-xs font-mono font-bold text-stone-900 w-6 text-center">
                          {quantity}
                        </span>
                        <button
                          id={`btn-inc-qty-${item.id}`}
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-7 h-7 rounded bg-orange-600 text-white flex items-center justify-center text-xs font-bold hover:bg-orange-500 transition-colors cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      {/* Item Total & delete */}
                      <div className="text-right flex items-center gap-3 shrink-0">
                        <div className="w-20">
                          <span className="text-xs font-mono font-extrabold text-orange-600 font-bold">₹{(item.price * quantity).toLocaleString()}</span>
                        </div>
                        <button
                          id={`btn-remove-item-${item.id}`}
                          onClick={() => removeFromCart(item.id)}
                          className="p-1.5 rounded-lg border border-red-200 hover:border-red-300 text-red-500 hover:bg-red-50 transition-all cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Subtotal Banner */}
                <div className="bg-orange-50/50 border border-orange-200 rounded-2xl p-5 space-y-3.5">
                  <div className="flex justify-between text-xs text-stone-600">
                    <span>Sacred Materials Total:</span>
                    <span className="font-mono text-stone-900 font-semibold">₹{getCartTotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs text-stone-600">
                    <span>Auspicious Shipping & Handling:</span>
                    <span className="font-mono text-emerald-600 font-semibold">FREE (Vedic Blessing)</span>
                  </div>
                  <div className="border-t border-orange-100 pt-3 flex justify-between font-serif text-sm font-extrabold text-orange-600">
                    <span>Total Amount Payable:</span>
                    <span className="font-mono font-bold">₹{getCartTotal().toLocaleString()}</span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="pt-2 flex gap-3">
                  <button
                    id="btn-back-to-shop-action"
                    onClick={() => setActiveTab('shop')}
                    className="flex-1 py-3 rounded-xl border border-orange-200 hover:bg-orange-50 text-xs text-stone-700 hover:text-stone-900 font-semibold transition-all cursor-pointer"
                  >
                    Add More Items
                  </button>
                  <button
                    id="btn-proceed-checkout"
                    onClick={() => setActiveTab('checkout')}
                    className="flex-1 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs shadow-lg shadow-orange-500/10 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    Proceed to Delivery Checkout →
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* CHECKOUT TAB VIEW */}
        {activeTab === 'checkout' && (
          <motion.div
            key="checkout-tab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="max-w-2xl mx-auto bg-white border border-orange-200 rounded-3xl p-6 md:p-8 space-y-6 shadow-md"
          >
            <h3 className="text-lg font-serif font-bold text-stone-900 flex items-center gap-2 border-b border-orange-100 pb-3">
              <Truck className="h-5 w-5 text-orange-600" /> Auspicious Delivery Details
            </h3>

            <form onSubmit={handleCheckoutSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label htmlFor="checkout-name" className="block text-[10px] font-semibold text-stone-500 uppercase tracking-wider">Recipient Name</label>
                  <div className="flex items-center bg-white border border-orange-200 focus-within:border-orange-400 rounded-xl px-3 py-2 transition-all">
                    <User className="h-4 w-4 text-orange-400 mr-2 shrink-0" />
                    <input
                      id="checkout-name"
                      type="text"
                      required
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      placeholder="Enter recipient's full name"
                      className="flex-1 bg-transparent text-stone-800 text-xs focus:outline-none"
                    />
                  </div>
                </div>

                {/* WhatsApp Phone */}
                <div className="space-y-1.5">
                  <label htmlFor="checkout-phone" className="block text-[10px] font-semibold text-stone-500 uppercase tracking-wider">Mobile Phone</label>
                  <div className="flex items-center bg-white border border-orange-200 focus-within:border-orange-400 rounded-xl px-3 py-2 transition-all">
                    <Phone className="h-4 w-4 text-orange-400 mr-2 shrink-0" />
                    <input
                      id="checkout-phone"
                      type="tel"
                      required
                      value={buyerPhone}
                      onChange={(e) => setBuyerPhone(e.target.value)}
                      placeholder="+91 XXXXX XXXXX"
                      className="flex-1 bg-transparent text-stone-800 text-xs focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="space-y-1.5">
                <label htmlFor="checkout-address" className="block text-[10px] font-semibold text-stone-500 uppercase tracking-wider">Delivery Address</label>
                <div className="flex items-start bg-white border border-orange-200 focus-within:border-orange-400 rounded-xl px-3 py-2 transition-all">
                  <MapPin className="h-4 w-4 text-orange-400 mr-2 shrink-0 mt-0.5" />
                  <textarea
                    id="checkout-address"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="House/Plot No., Street, Landmark"
                    className="flex-1 h-16 bg-transparent text-stone-800 text-xs focus:outline-none resize-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* City */}
                <div className="space-y-1.5">
                  <label htmlFor="checkout-city" className="block text-[10px] font-semibold text-stone-500 uppercase tracking-wider">City</label>
                  <input
                    id="checkout-city"
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Mumbai"
                    className="w-full bg-white text-stone-800 border border-orange-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-orange-400"
                  />
                </div>

                {/* Pincode */}
                <div className="space-y-1.5">
                  <label htmlFor="checkout-pincode" className="block text-[10px] font-semibold text-stone-500 uppercase tracking-wider">PIN/Postal Code</label>
                  <input
                    id="checkout-pincode"
                    type="text"
                    required
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="400001"
                    className="w-full bg-white text-stone-800 border border-orange-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-orange-400 font-mono"
                  />
                </div>
              </div>

              {/* Order summary small banner */}
              <div className="bg-orange-50 p-4 border border-orange-100 rounded-2xl flex justify-between items-center text-xs">
                <span className="text-stone-600">Payable Amount on Delivery:</span>
                <span className="font-mono text-orange-600 font-bold text-sm">₹{getCartTotal().toLocaleString()}</span>
              </div>

              {/* Action row */}
              <div className="pt-2 flex gap-3">
                <button
                  id="btn-back-to-cart-from-checkout"
                  type="button"
                  onClick={() => setActiveTab('cart')}
                  className="flex-1 py-3 rounded-xl border border-orange-200 hover:bg-orange-50 text-xs text-stone-700 hover:text-stone-900 font-semibold transition-all cursor-pointer"
                >
                  Back to Basket
                </button>
                <button
                  id="btn-place-order"
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs shadow-lg shadow-orange-500/10 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Gift className="h-4 w-4" /> Place Order (Cash on Delivery)
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* SUCCESS STATE */}
        {activeTab === 'success' && (
          <motion.div
            key="success-tab"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto text-center py-12 space-y-6 bg-white border border-orange-200 rounded-3xl p-6 shadow-md"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-500 flex items-center justify-center text-3xl mx-auto shadow-sm">
              ✓
            </div>
            <div className="space-y-2">
              <h4 className="text-lg font-serif font-bold text-stone-900">Order Dispatched to Cosmic Servers!</h4>
              <p className="text-xs text-stone-600 leading-relaxed max-w-xs mx-auto">
                Jai Lakshmi Mata! Your sacred materials order has been registered. You will receive an SMS shipping tracking ID within 2 hours. Your package will reach your doorstep within 2 to 4 business days.
              </p>
            </div>

            {/* Receipt Summary */}
            <div className="bg-orange-50/50 border border-orange-200 rounded-2xl p-4 text-left space-y-2 text-[10px] font-mono text-stone-700">
              <div className="text-center font-bold font-serif text-orange-700 pb-1.5 border-b border-orange-100 uppercase tracking-widest text-[11px]">
                Holy Delivery Invoice
              </div>
              <div className="flex justify-between">
                <span>Deliver To:</span>
                <span className="font-semibold text-stone-950">{buyerName}</span>
              </div>
              <div className="flex justify-between">
                <span>Ship Address:</span>
                <span className="font-semibold text-stone-950 text-right max-w-[60%] truncate">{address}, {city}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Items Ordered:</span>
                <span className="font-semibold text-stone-950">{getCartCount()}</span>
              </div>
              <div className="border-t border-orange-100 pt-2 flex justify-between font-serif text-xs font-black text-orange-700 font-bold">
                <span>Total Due:</span>
                <span>₹{getCartTotal().toLocaleString()} (COD)</span>
              </div>
            </div>

            <button
              id="btn-restart-store"
              onClick={resetStore}
              className="py-2.5 px-6 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs shadow-md transition-all inline-block cursor-pointer"
            >
              Order More Samagris
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
