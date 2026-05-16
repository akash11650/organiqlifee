/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Leaf, 
  Droplets, 
  ShieldCheck, 
  MessageCircle, 
  Instagram, 
  ShoppingBag, 
  Plus, 
  Minus,
  CheckCircle2,
  ArrowRight,
  Menu,
  X,
  Star,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'motion/react';

// --- Constants & Types ---

const WHATSAPP_NUMBER = "+919654937547";
const UPI_ID = "9654937547@upi";
const ORIGINAL_PRICE = 120;
const OFFER_PRICE = 75;
const MINIMUM_ORDER = 4;

interface Product {
  id: string;
  name: string;
  benefit: string;
  image: string;
}

const PRODUCTS: Product[] = [
  {
    id: 'lemon',
    name: 'Lemon Soap',
    benefit: 'Vitamin C • Fresh Glow • Anti-Tan',
    image: '/Lemon Soap.png'
  },
  {
    id: 'aloe',
    name: 'Aloe Vera Soap',
    benefit: '99% Pure Aloe • Hydration • Cooling',
    image: '/Aloe Vera Soap.png'
  },
  {
    id: 'multani',
    name: 'Multani Mitti Soap',
    benefit: 'Deep Clay Detox • Oil Control • Clear Skin',
    image: '/Multani Mitti Soap.png'
  },
  {
    id: 'haldi',
    name: 'Haldi Chandan Soap',
    benefit: 'Wild Turmeric • Sandalwood • Brightening',
    image: '/Haldi Chandan.png'
  }
];

const REVIEWS = [
  { name: 'Riya S.', soap: 'Lemon Soap', rating: 5, content: 'Skin feels super fresh after every use 🍋' },
  { name: 'Aman K.', soap: 'Lemon Soap', rating: 5, content: 'Oil control amazing hai, face clean aur bright lagta hai' },
  { name: 'Tanvi B.', soap: 'Haldi Chandan Soap', rating: 5, content: 'Fragrance bhi premium hai, very relaxing' },
  { name: 'Priya D.', soap: 'Aloe Vera Soap', rating: 5, content: 'So soothing, skin bilkul calm ho jati hai' },
  { name: 'Rahul M.', soap: 'Aloe Vera Soap', rating: 5, content: 'Dry skin ke liye best hai, hydration milta hai naturally' },
  { name: 'Karan W.', soap: 'Multani Mitti Soap', rating: 5, content: 'Deep cleaning effect, pores bilkul clean feel hote hain' },
  { name: 'Ananya T.', soap: 'Multani Mitti Soap', rating: 5, content: 'Acne control me noticeable difference aaya' },
  { name: 'Mehak L.', soap: 'Haldi Chandan Soap', rating: 5, content: 'Skin glow instantly improve hota hai ✨' },
];

const ProductCard = ({ product, cart, updateQuantity }: { product: Product, cart: any, updateQuantity: (id: string, delta: number) => void, key?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="bg-white border border-black/5 rounded-[40px] p-6 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all group relative"
    >
      <div 
        style={{
          transform: "translateZ(50px)",
          transformStyle: "preserve-3d",
        }}
        className="aspect-[4/5] rounded-[32px] overflow-hidden mb-8 relative"
      >
        <img 
          src={product.image} 
          alt={product.name} 
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${product.id}/800/1000`;
          }}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        <div 
          style={{ transform: "translateZ(20px)" }}
          className="absolute top-4 left-4"
        >
           <div className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm">
             {product.id === 'lemon' ? '🍋' : product.id === 'aloe' ? '🌿' : product.id === 'multani' ? '⛰️' : '✨'} Fresh
           </div>
        </div>
      </div>
      
      <div 
        style={{ transform: "translateZ(30px)" }}
        className="mb-6"
      >
         <h3 className="text-2xl font-serif mb-2 tracking-tight">{product.name}</h3>
         <p className="text-xs text-gray-400 font-medium leading-relaxed uppercase tracking-widest">{product.benefit}</p>
      </div>
      
      <div 
        style={{ transform: "translateZ(40px)" }}
        className="flex items-center justify-between mt-auto pt-6 border-t border-black/5"
      >
        <div className="flex flex-col">
           <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Quantity</span>
           <span className="text-lg font-bold text-ink">₹{OFFER_PRICE}</span>
        </div>
        <div className="flex items-center gap-4 bg-cream p-1.5 rounded-full border border-black/5 shadow-inner">
          <button 
            onClick={() => updateQuantity(product.id, -1)}
            className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-olive-600 hover:bg-olive-600 hover:text-white transition-all shadow-sm"
          >
            <Minus size={14} />
          </button>
          <span className="text-sm font-bold w-6 text-center">{(cart as any)[product.id]}</span>
          <button 
            onClick={() => updateQuantity(product.id, 1)}
            className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-olive-600 hover:bg-olive-600 hover:text-white transition-all shadow-sm"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [cart, setCart] = useState<{ [key: string]: number }>({
    lemon: 0,
    aloe: 0,
    multani: 0,
    haldi: 0,
  });
  const [step, setStep] = useState<'browsing' | 'cart' | 'address' | 'payment'>('browsing');
  const [address, setAddress] = useState({
    name: '',
    phone: '',
    fullAddress: '',
    pincode: ''
  });
  const [paymentStatus, setPaymentStatus] = useState<'Pending' | 'Paid'>('Pending');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalQuantity: number = (Object.values(cart) as number[]).reduce((a: number, b: number) => a + b, 0);

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => ({
      ...prev,
      [id]: Math.max(0, prev[id] + delta)
    }));
  };

  const handleCheckout = () => {
    if (totalQuantity < MINIMUM_ORDER) {
      return;
    }
    setStep('cart');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const initiateUPIPayment = () => {
    setIsProcessingPayment(true);
    const amount = totalQuantity * OFFER_PRICE;
    const pa = UPI_ID;
    const pn = "Organiqlifee";
    const tr = `order_${Date.now()}`;
    const tn = "Organiqlifee Herbal Soap Order";
    
    // UPI Deep link
    const upiUrl = `upi://pay?pa=${pa}&pn=${pn}&am=${amount}&cu=INR&tn=${tn}&tr=${tr}`;
    
    // Open UPI apps
    window.open(upiUrl, '_blank');

    // Simulate a brief delay then move to redirection state
    setTimeout(() => {
      setPaymentStatus('Paid');
      setIsProcessingPayment(false);
      // Success redirection logic is handled in finalized stage
    }, 2000);
  };

  const finalizeOrder = () => {
    const selectedItems = (Object.entries(cart) as [string, number][])
      .filter(([_, qty]) => qty > 0)
      .map(([id, qty]) => {
        const product = PRODUCTS.find(p => p.id === id);
        return `${product?.name} (${qty})`;
      })
      .join(', ');

    const message = encodeURIComponent(`New Order:
Name: ${address.name}
Address: ${address.fullAddress}, ${address.pincode}
Products: ${selectedItems}
Quantity: ${totalQuantity}
Total: ₹${totalQuantity * OFFER_PRICE}
Payment: UPI (Done)`);

    window.open(`https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, '')}?text=${message}`, '_blank');
  };

  const ProgressSteps = () => (
    <div className="flex items-center justify-center gap-4 mb-8">
      {['cart', 'address', 'payment'].map((s, i) => {
        const active = s === step;
        const passed = ['cart', 'address', 'payment'].indexOf(step) > i;
        return (
          <React.Fragment key={s}>
            <div className={`flex items-center gap-2 ${active ? 'text-olive-600' : passed ? 'text-emerald-600' : 'text-gray-300'}`}>
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all ${passed ? 'bg-emerald-50 border-emerald-600' : active ? 'bg-olive-50 border-olive-600 scale-110' : 'border-gray-200 bg-white'}`}>
                {passed ? <CheckCircle2 size={14} /> : i + 1}
              </div>
              <span className={`text-[10px] uppercase font-bold tracking-widest hidden sm:inline ${active ? 'opacity-100' : 'opacity-40'}`}>{s}</span>
            </div>
            {i < 2 && <div className={`w-8 h-0.5 rounded-full ${passed ? 'bg-emerald-600' : 'bg-gray-100'}`}></div>}
          </React.Fragment>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen font-sans selection:bg-olive-200 selection:text-olive-900">
      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${isScrolled ? 'bg-cream/90 backdrop-blur-md py-3 border-black/5 shadow-sm' : 'bg-transparent py-5 border-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#" className="font-serif text-2xl font-bold tracking-tight uppercase text-olive-600">Organiqlifee</a>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#products" className="text-[10px] font-bold uppercase tracking-widest hover:text-olive-600 transition-colors">Products</a>
            <a href="#about" className="text-[10px] font-bold uppercase tracking-widest hover:text-olive-600 transition-colors">About</a>
            <a href="#reviews" className="text-[10px] font-bold uppercase tracking-widest hover:text-olive-600 transition-colors">Reviews</a>
          </nav>

          <button className="md:hidden text-ink" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-cream pt-24 px-6 md:hidden"
          >
            <nav className="flex flex-col gap-6 text-xl font-serif">
              <a href="#products" onClick={() => setMobileMenuOpen(false)}>Products</a>
              <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
              <a href="#reviews" onClick={() => setMobileMenuOpen(false)}>Reviews</a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-20">
        <AnimatePresence mode="wait">
          {step === 'browsing' ? (
            <motion.div
              key="browsing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Hero Section */}
              <section className="relative min-h-[90vh] flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                  <img 
                    src="https://images.unsplash.com/photo-1605264964528-06403738d6dc?q=80&w=2000&auto=format&fit=crop" 
                    alt="Artisanal Herbal Soaps" 
                    className="w-full h-full object-cover opacity-20 scale-105 grayscale"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 items-center gap-12 z-10 py-20">
                  <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-8"
                  >
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-olive-600 text-white text-[10px] font-bold tracking-widest uppercase rounded-full">
                      <ShieldCheck size={12} />
                      100% Herbal & Chemical Free
                    </div>
                    <h1 className="text-6xl md:text-8xl font-serif leading-[1.1] text-ink">
                      Pure Skin. <br />
                      <span className="italic opacity-60">Pure Nature.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-lg leading-relaxed">
                      Handcrafted soaps designed for specific skin needs — <span className="text-olive-600 font-bold italic">सिर्फ natural care.</span> Experience the luxury of earth-derived ingredients.
                    </p>
                    <div className="flex flex-wrap gap-6 pt-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-olive-50 flex items-center justify-center text-olive-600 border border-olive-100">
                          <CheckCircle2 size={20} />
                        </div>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-widest">No Chemicals</p>
                          <p className="text-[10px] text-gray-400">Pure botanical extracts</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-olive-50 flex items-center justify-center text-olive-600 border border-olive-100">
                          <Instagram size={20} />
                        </div>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-widest">5000+ Reviews</p>
                          <p className="text-[10px] text-gray-400">Loved by the community</p>
                        </div>
                      </div>
                    </div>
                    <div className="pt-8">
                      <a href="#products" className="bg-olive-600 text-white px-12 py-5 rounded-full font-bold text-lg hover:bg-olive-700 transition-all inline-flex items-center gap-4 shadow-2xl hover:translate-y-[-4px]">
                        Start Your Selection
                        <ArrowRight size={20} />
                      </a>
                    </div>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="hidden md:block relative pl-12"
                  >
                    <div className="absolute -inset-4 border border-black/5 rounded-[40px] translate-x-4 translate-y-4"></div>
                    <div className="bg-beige rounded-[40px] p-1 shadow-inner overflow-hidden">
                      <img 
                        src="/input_file_3.png" 
                        alt="Herbal Soap" 
                        className="relative z-10 w-full aspect-[4/5] object-cover rounded-[38px] shadow-2xl transition-transform hover:scale-110 duration-700"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-xl z-20 border border-black/5">
                       <div className="flex items-center gap-2 text-olive-600 mb-2">
                          <CheckCircle2 size={16} />
                          <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Quality Guarantee</span>
                       </div>
                       <p className="font-serif text-lg leading-tight">Small Batches.<br/>Big Results.</p>
                    </div>
                  </motion.div>
                </div>
              </section>

              {/* Products Selection Section */}
              <section id="products" className="py-32 bg-beige/10">
                <div className="max-w-7xl mx-auto px-6">
                  <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                    <div>
                      <div className="flex items-center gap-3 text-olive-600 mb-4 font-bold uppercase tracking-[0.3em] text-[10px]">
                        <div className="w-8 h-px bg-olive-600"></div>
                        Step 1: Your Selection
                      </div>
                      <h2 className="text-5xl md:text-7xl font-serif">Select Your Bars</h2>
                      <p className="text-gray-400 mt-4 max-w-sm">Choose any combination of our signature bars. Minimum order is 4 soaps for shipping.</p>
                    </div>
                    <div className="bg-white p-8 rounded-[32px] border border-black/5 shadow-sm text-right">
                      <div className="text-gray-400 line-through text-lg">₹{ORIGINAL_PRICE}</div>
                      <div className="text-5xl font-bold text-olive-600 mb-2">₹{OFFER_PRICE}</div>
                      <div className="bg-emerald-50 text-emerald-700 text-[10px] font-bold py-1 px-3 rounded-full inline-block uppercase tracking-wider">40% Savings Applied</div>
                    </div>
                    {/* Minimum Order Highlight */}
                    <div className="flex items-center gap-2 bg-amber-50 text-amber-800 px-4 py-2 rounded-2xl border border-amber-200 mt-4 animate-pulse">
                      <AlertCircle size={16} />
                      <span className="text-xs font-bold uppercase tracking-widest">Minimum Order: 4 Soaps Required</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {PRODUCTS.map((product) => (
                      <ProductCard 
                        key={product.id}
                        product={product}
                        cart={cart}
                        updateQuantity={updateQuantity}
                      />
                    ))}
                  </div>

                  {/* Summary Bar */}
                  <div className="mt-20">
                     <div className="bg-olive-600 rounded-[40px] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
                        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-1/4 translate-y-1/4">
                           <Leaf size={400} />
                        </div>
                        <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
                           <div className="space-y-6">
                              <h3 className="text-4xl font-serif">Selected Collection</h3>
                              <div className="grid grid-cols-2 gap-4">
                                 {(Object.entries(cart) as [string, number][]).filter(([_, q]) => q > 0).map(([id, q]) => (
                                    <div key={id} className="bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/10">
                                       <p className="text-[10px] font-bold uppercase tracking-widest text-white/60 mb-1">{PRODUCTS.find(p => p.id === id)?.name}</p>
                                       <p className="text-xl font-serif">{q} Pairs</p>
                                    </div>
                                 ))}
                                 {totalQuantity === 0 && <p className="col-span-2 text-white/40 italic">Nothing selected yet...</p>}
                              </div>
                           </div>
                           <div className="flex flex-col items-center md:items-end text-center md:text-right">
                              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60 mb-2">Grand Total</p>
                              <p className="text-7xl font-serif font-bold mb-8 transition-all">₹{totalQuantity * OFFER_PRICE}</p>
                              
                              <button 
                                onClick={handleCheckout}
                                disabled={totalQuantity < MINIMUM_ORDER}
                                className={`group px-12 py-5 rounded-full font-bold text-xl transition-all flex items-center gap-4 shadow-2xl ${
                                  totalQuantity >= MINIMUM_ORDER 
                                  ? 'bg-white text-olive-600 hover:bg-beige' 
                                  : 'bg-white/20 text-white/40 cursor-not-allowed shadow-none'
                                }`}
                              >
                                {totalQuantity < MINIMUM_ORDER ? `Mini. 4 Soaps Required` : `Checkout My Cart`}
                                <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                              </button>
                              
                              {totalQuantity > 0 && totalQuantity < MINIMUM_ORDER && (
                                <p className="mt-4 text-[10px] uppercase font-bold tracking-widest text-white/60">Add {MINIMUM_ORDER - totalQuantity} more to unlock checkout</p>
                              )}
                           </div>
                        </div>
                     </div>
                  </div>
                </div>
              </section>

              {/* Reviews & Social Hub */}
              <section id="reviews" className="py-32 bg-beige/10 relative">
                <div className="max-w-7xl mx-auto px-6">
                  <div className="text-center max-w-3xl mx-auto mb-20">
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-olive-600 mb-4 block">Testimonials</span>
                    <h2 className="text-5xl md:text-6xl font-serif mb-6 leading-tight">Loved by Real Customers</h2>
                    <p className="text-gray-400 text-lg">Authentic feedback from our community about their favorite herbal bars.</p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {REVIEWS.map((review, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-8 rounded-[32px] border border-black/5 hover:shadow-lg transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex text-amber-400 gap-0.5 mb-4">
                            {[...Array(5)].map((_, j) => <Star key={j} size={14} fill="currentColor" />)}
                          </div>
                          <p className="text-gray-600 italic leading-relaxed mb-6 font-medium">"{review.content}"</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-ink uppercase tracking-[0.2em] mb-1">{review.name}</p>
                          <p className="text-[9px] font-bold text-olive-600 uppercase tracking-widest opacity-60 italic">{review.soap}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Trust Boost Banner */}
                  <div className="mt-24 pt-12 border-t border-black/5 flex flex-wrap justify-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
                    <div className="flex flex-col items-center gap-3">
                      <ShieldCheck size={32} strokeWidth={1.5} className="text-olive-600" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.3em]">100% Herbal</span>
                    </div>
                    <div className="flex flex-col items-center gap-3">
                      <Droplets size={32} strokeWidth={1.5} className="text-olive-600" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.3em]">No Chemicals</span>
                    </div>
                    <div className="flex flex-col items-center gap-3">
                      <Leaf size={32} strokeWidth={1.5} className="text-olive-600" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Handcrafted with Care</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* USP Highlight */}
              <section className="py-24 bg-white border-y border-black/5">
                <div className="max-w-7xl mx-auto px-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-olive-50 flex items-center justify-center rounded-full text-olive-600 mb-6 border border-black/5">
                        <Droplets />
                      </div>
                      <h3 className="text-lg font-bold uppercase tracking-widest text-olive-600 mb-3">No Chemicals</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">Purely natural ingredients. No parabens, sulfates, or artificial fragrances.</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-olive-50 flex items-center justify-center rounded-full text-olive-600 mb-6 border border-black/5">
                        <Leaf />
                      </div>
                      <h3 className="text-lg font-bold uppercase tracking-widest text-olive-600 mb-3">100% Herbal</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">Ancient recipes combined with modern hygiene for the best results.</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-olive-50 flex items-center justify-center rounded-full text-olive-600 mb-6 border border-black/5">
                        <ShieldCheck />
                      </div>
                      <h3 className="text-lg font-bold uppercase tracking-widest text-olive-600 mb-3">Guaranteed Care</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">Trusted by over 5000+ happy customers across India.</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* About Section */}
              <section id="about" className="py-24 bg-olive-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                  <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--color-olive-600)_1px,_transparent_1px)] bg-[size:40px_40px]"></div>
                </div>
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10">
                  <div className="order-2 md:order-1">
                    <div className="border border-white/10 p-2 rounded-[40px]">
                      <img 
                        src="https://images.unsplash.com/photo-1614806687431-7e8c07e0c466?q=80&w=1200&auto=format&fit=crop" 
                        alt="Handcrafting Process" 
                        className="rounded-[32px] w-full aspect-[16/10] object-cover transition-all hover:brightness-110"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                  <div className="order-1 md:order-2">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-olive-400 mb-4 block">The Philosophy</span>
                    <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">Crafted with Nature,<br/>Powered by Earth.</h2>
                    <p className="text-olive-100 text-lg leading-relaxed mb-6 font-light">
                      Organiqlifee was born from a simple realization: our largest organ, our skin, deserves the same purity we seek in our food. We returned to artisanal, chemical-free methods to bring you soaps that don't just clean, but heal.
                    </p>
                    <div className="flex items-center gap-12 border-t border-white/10 pt-8 mt-12">
                      <div>
                          <p className="text-4xl font-serif font-bold text-white">5000+</p>
                          <p className="text-[10px] uppercase tracking-widest text-olive-400 font-bold mt-1">Trusted Users</p>
                      </div>
                      <div className="w-px h-12 bg-white/10"></div>
                      <div>
                          <p className="text-4xl font-serif font-bold text-white">100%</p>
                          <p className="text-[10px] uppercase tracking-widest text-olive-400 font-bold mt-1">Herbal Integrity</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </motion.div>
          ) : (
            <motion.div
              key="checkout"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="max-w-4xl mx-auto px-6 py-20 min-h-[80vh]"
            >
              <div className="mb-12 text-center">
                 <h2 className="text-4xl font-serif mb-4">Complete Your Order</h2>
                 <ProgressSteps />
              </div>

              {step === 'cart' && (
                <div className="space-y-6">
                   <div className="bg-white rounded-[40px] p-10 border border-black/5 shadow-sm">
                      <h3 className="text-xl font-bold uppercase tracking-widest mb-8 border-b border-black/5 pb-4">Cart Review</h3>
                      
                      {totalQuantity < MINIMUM_ORDER && (
                        <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-center gap-3 mb-6 text-amber-800">
                          <AlertCircle size={18} />
                          <p className="text-xs font-bold uppercase tracking-tight">Please add {MINIMUM_ORDER - totalQuantity} more soaps to meet minimum order (4 soaps).</p>
                        </div>
                      )}

                      <div className="space-y-4">
                         {(Object.entries(cart) as [string, number][]).filter(([_, q]) => q > 0).map(([id, q]) => (
                            <div key={id} className="flex justify-between items-center py-4 border-b border-black/5 last:border-0">
                               <div className="flex items-center gap-4">
                                  <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-inner">
                                     <img src={PRODUCTS.find(p => p.id === id)?.image} className="w-full h-full object-cover" />
                                  </div>
                                  <div>
                                     <p className="font-bold text-lg">{PRODUCTS.find(p => p.id === id)?.name}</p>
                                     <p className="text-[10px] text-gray-400 uppercase tracking-widest">Price: ₹{OFFER_PRICE} / soap</p>
                                  </div>
                               </div>
                               <div className="text-right">
                                  <p className="text-xl font-serif">× {q}</p>
                                  <p className="text-xs font-bold text-olive-600">₹{q * OFFER_PRICE}</p>
                               </div>
                            </div>
                         ))}
                      </div>
                      <div className="mt-10 pt-10 border-t-2 border-dashed border-black/5 space-y-4">
                         <div className="flex justify-between items-center text-gray-400 text-sm">
                            <span>Subtotal</span>
                            <span>₹{totalQuantity * ORIGINAL_PRICE}</span>
                         </div>
                         <div className="flex justify-between items-center text-emerald-600 text-sm font-bold">
                            <span>Discount (40% OFF)</span>
                            <span>- ₹{totalQuantity * (ORIGINAL_PRICE - OFFER_PRICE)}</span>
                         </div>
                         <div className="flex justify-between items-center pt-4">
                            <div>
                               <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Final Bill</p>
                               <p className="text-4xl font-serif font-bold text-ink">₹{totalQuantity * OFFER_PRICE}</p>
                            </div>
                            <button 
                               onClick={() => setStep('address')}
                               className="bg-olive-600 text-white px-10 py-4 rounded-full font-bold hover:bg-olive-700 transition-all flex items-center gap-3 shadow-xl"
                            >
                               Shipping Details <ArrowRight size={18} />
                            </button>
                         </div>
                      </div>
                   </div>
                   <button onClick={() => setStep('browsing')} className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-ink transition-colors px-6">← Edit Selection</button>
                </div>
              )}

              {step === 'address' && (
                <div className="space-y-6">
                   <div className="bg-white rounded-[40px] p-10 border border-black/5 shadow-sm">
                      <h3 className="text-xl font-bold uppercase tracking-widest mb-8 border-b border-black/5 pb-4">Shipping Destination</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                         <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Full Name</label>
                            <input 
                               value={address.name}
                               onChange={(e) => setAddress({...address, name: e.target.value})}
                               className="w-full bg-cream p-4 rounded-2xl border border-black/5 outline-none focus:ring-2 focus:ring-olive-200 transition-all font-medium" 
                               placeholder="e.g. John Doe"
                            />
                         </div>
                         <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Phone Number</label>
                            <input 
                               value={address.phone}
                               onChange={(e) => setAddress({...address, phone: e.target.value})}
                               className="w-full bg-cream p-4 rounded-2xl border border-black/5 outline-none focus:ring-2 focus:ring-olive-200 transition-all font-medium" 
                               placeholder="10-digit mobile"
                            />
                         </div>
                         <div className="md:col-span-2 space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Full Address</label>
                            <textarea 
                               value={address.fullAddress}
                               onChange={(e) => setAddress({...address, fullAddress: e.target.value})}
                               className="w-full bg-cream p-4 rounded-2xl border border-black/5 outline-none focus:ring-2 focus:ring-olive-200 transition-all font-medium h-32" 
                               placeholder="House no, Street name, City, State"
                            />
                         </div>
                         <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Pincode</label>
                            <input 
                               value={address.pincode}
                               onChange={(e) => setAddress({...address, pincode: e.target.value})}
                               className="w-full bg-cream p-4 rounded-2xl border border-black/5 outline-none focus:ring-2 focus:ring-olive-200 transition-all font-medium" 
                               placeholder="6-digit code"
                            />
                         </div>
                      </div>
                      <div className="mt-12 flex justify-end">
                         <button 
                            disabled={!address.name || !address.phone || !address.fullAddress || !address.pincode}
                            onClick={() => setStep('payment')}
                            className={`px-12 py-5 rounded-full font-bold text-lg transition-all flex items-center gap-4 shadow-xl ${
                              address.name && address.phone && address.fullAddress && address.pincode
                              ? 'bg-olive-600 text-white hover:bg-olive-700'
                              : 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'
                            }`}
                         >
                            Proceed to Payment
                            <ArrowRight size={20} />
                         </button>
                      </div>
                   </div>
                   <button onClick={() => setStep('cart')} className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-ink transition-colors px-6">← Back to Cart</button>
                </div>
              )}

              {step === 'payment' && (
                <div className="space-y-6">
                   <div className="bg-white rounded-[40px] p-10 border border-black/5 shadow-sm text-center">
                      <h3 className="text-xl font-bold uppercase tracking-widest mb-12 border-b border-black/5 pb-4">Direct Payment</h3>
                      
                      {paymentStatus === 'Paid' ? (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="py-12 space-y-6"
                        >
                          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-200">
                            <CheckCircle2 size={40} />
                          </div>
                          <h4 className="text-2xl font-serif">Payment Initiated</h4>
                          <p className="text-gray-400 text-sm max-w-xs mx-auto">Please complete the payment in your UPI app. Once done, proceed to WhatsApp to share your order details.</p>
                          <button 
                            onClick={finalizeOrder}
                            className="bg-olive-600 text-white px-10 py-4 rounded-full font-bold flex items-center gap-3 mx-auto shadow-xl hover:bg-olive-700 transition-all"
                          >
                            <MessageCircle size={20} />
                            Send Order on WhatsApp <ArrowRight size={18} />
                          </button>
                        </motion.div>
                      ) : (
                        <div className="max-w-sm mx-auto space-y-8">
                          <div className="bg-olive-50 p-8 rounded-[40px] border-2 border-dashed border-olive-200 relative overflow-hidden">
                             <div className="absolute top-0 right-0 bg-olive-100 px-3 py-1 rounded-bl-2xl text-[8px] font-bold uppercase tracking-widest text-olive-600">Demo Order</div>
                             <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-olive-600 mb-2">Order Total</p>
                             <p className="text-5xl font-serif font-bold text-ink mb-1">₹{totalQuantity * OFFER_PRICE}</p>
                             <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">For {totalQuantity} Handmade Soaps</p>
                          </div>

                          <div className="bg-cream/50 p-4 rounded-2xl border border-black/5 text-left mb-6">
                            <p className="text-[10px] font-bold uppercase text-olive-600 mb-2 flex items-center gap-2">
                              <ShieldCheck size={12} />
                              Secure Checkout Notice
                            </p>
                            <p className="text-[11px] text-gray-500 leading-relaxed font-medium">UPI payment will open in your payment app (Google Pay, PhonePe, Paytm). In case the app doesn't trigger automatically, please use the fallback UPI ID below.</p>
                          </div>

                          <div className="space-y-4">
                            <button 
                              onClick={initiateUPIPayment}
                              disabled={isProcessingPayment}
                              className="w-full bg-olive-600 text-white py-6 rounded-full font-bold text-lg hover:bg-olive-700 transition-all shadow-2xl flex items-center justify-center gap-3 disabled:opacity-50 active:scale-95"
                            >
                              {isProcessingPayment ? (
                                <>
                                  <Loader2 size={24} className="animate-spin" />
                                  Opening UPI Apps...
                                </>
                              ) : (
                                <>
                                  <ShoppingBag size={24} />
                                  Pay via Any UPI App
                                </>
                              )}
                            </button>
                            
                            <div className="pt-6 border-t border-black/5 space-y-4">
                               <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Fallback UPI Payment</p>
                               <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-inner">
                                  <div className="w-32 h-32 bg-gray-100 rounded-2xl mx-auto mb-4 flex items-center justify-center border-2 border-dashed border-gray-200">
                                     <Instagram size={40} className="opacity-20" />
                                  </div>
                                  <p className="text-sm font-bold text-ink select-all cursor-pointer" onClick={() => {
                                    navigator.clipboard.writeText(UPI_ID);
                                    alert('UPI ID Copied!');
                                  }}>{UPI_ID}</p>
                                  <p className="text-[10px] text-gray-400 mt-1">Tap to copy UPI ID</p>
                               </div>
                            </div>
                          </div>
                        </div>
                      )}
                   </div>
                   {!isProcessingPayment && paymentStatus !== 'Paid' && (
                     <button onClick={() => setStep('address')} className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-ink transition-colors px-6">← Back to Shipping</button>
                   )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-white px-6 py-12 border-t border-black/5 flex flex-col items-center gap-8 text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400">
        <div className="flex flex-wrap justify-center gap-12">
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="opacity-40">Follow Us</p>
            <p className="text-olive-600">Instagram: @organiqlifee</p>
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="opacity-40">Assistance</p>
            <p className="text-olive-600">WhatsApp: {WHATSAPP_NUMBER}</p>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-8 border-t border-black/5 pt-8 w-full max-w-2xl text-center">
          <span>Chemical Free Guarantee</span>
          <span>Real Customer Reviews</span>
          <span>No Plastics</span>
        </div>
        <div className="text-[9px] opacity-60 italic">© {new Date().getFullYear()} Organiqlifee — Handcrafted with Care in India.</div>
      </footer>

      {/* Desktop Sticky Checkout */}
      {step === 'browsing' && totalQuantity >= MINIMUM_ORDER && (
        <motion.button 
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          onClick={handleCheckout}
          className="fixed bottom-28 right-8 z-[60] bg-olive-600 text-white px-8 py-4 rounded-full font-bold shadow-2xl hidden md:flex items-center gap-3 hover:translate-y-[-4px] transition-all"
        >
          <ShoppingBag size={20} />
          Order Now (₹{totalQuantity * OFFER_PRICE})
        </motion.button>
      )}

      {/* Sticky WhatsApp Trigger */}
      <motion.a 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, '')}`}
        className={`fixed bottom-8 right-8 z-[60] bg-olive-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:shadow-olive-200/50 transition-all ${totalQuantity > 0 ? 'md:bottom-8 bottom-24' : 'bottom-8'}`}
      >
        <MessageCircle size={28} />
      </motion.a>

      {/* Cart Summary Bar (Mobile Sticky) */}
      <AnimatePresence>
        {totalQuantity > 0 && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 bg-cream border-t border-black/5 p-4 md:hidden z-50 flex items-center justify-between shadow-[0_-10px_40px_rgba(0,0,0,0.05)]"
          >
            <div>
              <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Cart Summary</p>
              <p className="text-lg font-serif font-bold text-ink">
                {totalQuantity} Bars • ₹{totalQuantity * OFFER_PRICE}
              </p>
            </div>
            <button 
              onClick={handleCheckout}
              disabled={totalQuantity < MINIMUM_ORDER}
              className={`px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest transition-all ${
                totalQuantity >= MINIMUM_ORDER ? 'bg-olive-600 text-white' : 'bg-gray-100 text-gray-400'
              }`}
            >
              Checkout <MessageCircle size={14} className="ml-1 inline" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="md:hidden h-20"></div> {/* Spacer for mobile sticky bar */}
    </div>
  );
}
