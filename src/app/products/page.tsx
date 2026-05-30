"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ShoppingCart, Star, Loader2, ShoppingBag, Play, X, MessageSquare, PhoneCall, Sparkles } from "lucide-react";
import ImageWithFallback from "@/components/ImageWithFallback";

const DEFAULT_KITS = [
  {
    _id: "kit1",
    name: "Womens Kit",
    category: "Premium Kits",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "A tailored collection of organic beauty care, personal hygiene, and wellness products designed specifically for modern women. Click to play video guide!",
    price: 4999,
    pv: 60,
    videoUrl: "https://videos.pexels.com/video-files/3752538/3752538-sd_640_360_25fps.mp4" // Beautiful cosmetic/wellness demonstration video
  },
  {
    _id: "kit2",
    name: "Provision Kit",
    category: "Premium Kits",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Your ultimate household bundle. Contains premium grocery staples, pulses, oils, spices, and daily essentials for your home. Only 60PV for all!",
    price: 4500,
    pv: 60,
  },
  {
    _id: "kit3",
    name: "Spiralna Kit",
    category: "Premium Kits",
    image: "https://images.unsplash.com/photo-1607619056574-7b8d304b3b33?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Premium health package powered by highly pure organic Spirulina tablets, extracts, and herbal vitality formulations. Only 60PV for all!",
    price: 3999,
    pv: 60,
  },
  {
    _id: "kit4",
    name: "Inner Waer Kit",
    category: "Premium Kits",
    image: "https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Ultimate luxury and everyday comfort. Styled with organic, ultra-breathable combed cotton threads. Only 60PV for all!",
    price: 3499,
    pv: 60,
  },
  {
    _id: "kit5",
    name: "Garments Kit",
    category: "Premium Kits",
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "A premium collection of high-quality formal shirts, casual attire, and elegant design garments from Eagles apparel hubs. Only 60PV for all!",
    price: 5200,
    pv: 60,
  }
];

export default function Products() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [dbProducts, setDbProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>(["All", "Premium Kits"]);
  
  // Modals state
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [inquireProduct, setInquireProduct] = useState<any | null>(null);
  const [inquiryForm, setInquiryForm] = useState({ name: "", phone: "", notes: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => {
        if (!data.error && Array.isArray(data)) {
          setDbProducts(data);
          const uniqueCats = Array.from(new Set(data.map((p: any) => p.category))) as string[];
          setCategories(["All", "Premium Kits", ...uniqueCats.filter(c => c !== "Premium Kits")]);
        }
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  }, []);

  // Merge default premium kits with custom loaded products
  const allProducts = [...DEFAULT_KITS, ...dbProducts];

  const filteredProducts = activeCategory === "All" 
    ? allProducts 
    : allProducts.filter(p => p.category === activeCategory);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const handleWhatsAppRedirect = (prod: any) => {
    const text = encodeURIComponent(`Hi Eagles Team! I would like to ask for details about the "${prod.name}" (valued at ${prod.pv}PV, Price: ₹${prod.price}).`);
    window.open(`https://wa.me/919876543210?text=${text}`, "_blank");
  };

  return (
    <div className="bg-gray-50 dark:bg-black min-h-screen border-t dark:border-gray-800">
      
      {/* Premium Header */}
      <div className="bg-gradient-to-r from-primary via-yellow-600 to-amber-700 pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold text-white uppercase tracking-widest mb-4">
            Eagles Team Joining Packages
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 shadow-sm tracking-tight drop-shadow-lg">
            Eagles Team 60PV Kits
          </h1>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Unlock your binary income cycle. All premium joining packages below are valued at exactly <strong>60PV</strong> for simplified network balance matching.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-[500px]">
        {loading ? (
           <div className="flex items-center justify-center p-20"><Loader2 className="w-12 h-12 text-primary animate-spin" /></div>
        ) : (
          <>
            {/* Category Filter Pills */}
            {categories.length > 1 && (
              <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-6 py-3 rounded-full text-sm font-bold transition-all ${
                      activeCategory === cat 
                        ? "bg-primary text-black shadow-xl shadow-primary/30 -translate-y-1" 
                        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:-translate-y-0.5"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}

            {filteredProducts.length === 0 ? (
               <div className="text-center py-32 bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-lg max-w-3xl mx-auto flex flex-col items-center">
                 <div className="w-24 h-24 bg-primary/10 text-primary rounded-3xl flex items-center justify-center mb-6">
                   <ShoppingBag className="w-12 h-12" />
                 </div>
                 <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-3">No Products Yet</h3>
                 <p className="text-gray-500 font-medium text-lg max-w-sm">Products uploaded by the Administrator from the CMS panel will appear right here.</p>
               </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (index % 10) * 0.1 }}
                    className="bg-white dark:bg-gray-900 rounded-[2rem] overflow-hidden shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800 group hover:border-primary/30 transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Product Image and badges */}
                      <div 
                        className={`relative h-72 overflow-hidden bg-gray-200 ${product.videoUrl ? 'cursor-pointer' : ''}`}
                        onClick={() => product.videoUrl && setActiveVideo(product.videoUrl)}
                      >
                        <ImageWithFallback 
                          src={product.image?.startsWith('/') || product.image?.startsWith('data:') || product.image?.startsWith('http') ? product.image : `https://images.unsplash.com/photo-${product.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80`} 
                          fallbackSrc="https://images.unsplash.com/photo-1586201375761-83865001e31c"
                          alt={product.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />

                        {/* Top corner Rating */}
                        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur text-gray-900 px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
                          <Star className="w-4 h-4 text-primary fill-primary" /> {4.9}
                        </div>

                        {/* Play Video Trigger Overlay for Womens Kit */}
                        {product.videoUrl && (
                          <div
                            className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:opacity-100 transition-opacity duration-300"
                          >
                            <div className="w-16 h-16 bg-primary text-black rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                              <Play className="w-8 h-8 fill-black ml-1" />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Content Panel */}
                      <div className="p-8">
                        <div className="flex justify-between items-center mb-3">
                          <div className="text-sm font-bold text-primary uppercase tracking-wider">{product.category}</div>
                          {product.pv && (
                            <span className="bg-primary/20 text-primary border border-primary/20 text-xs font-black px-2.5 py-1 rounded-full uppercase tracking-wide">
                              {product.pv} PV
                            </span>
                          )}
                        </div>

                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors flex items-center gap-2">
                          {product.name}
                          {product.videoUrl && (
                            <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" title="Plays Video Guide" />
                          )}
                        </h3>

                        <p className="text-gray-500 text-sm line-clamp-3 mb-6 font-medium leading-relaxed">
                          {product.description}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="p-8 pt-0 mt-auto border-t dark:border-gray-800">
                      <div className="flex items-center justify-between pt-6">
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">MEMBER PRICE</span>
                          <span className="text-3xl font-black text-gray-900 dark:text-white">₹{product.price}</span>
                        </div>

                        <div className="flex items-center gap-3">
                          {/* Details inquiry */}
                          <button 
                            onClick={() => {
                              setInquireProduct(product);
                              setInquiryForm({ name: "", phone: "", notes: "" });
                              setFormSubmitted(false);
                            }}
                            title="Inquire Product Details"
                            className="flex items-center justify-center px-4 py-3 bg-secondary/15 hover:bg-secondary/30 text-gray-800 dark:text-white rounded-xl text-xs font-bold transition-all border border-gray-200 dark:border-gray-800"
                          >
                            <MessageSquare className="w-4 h-4 mr-1.5" /> Product details want to ask
                          </button>

                          <button 
                            onClick={() => handleWhatsAppRedirect(product)}
                            title="Purchase via WhatsApp"
                            className="flex items-center justify-center w-12 h-12 bg-emerald-500 text-white rounded-xl font-bold hover:scale-105 transition-all shadow-md"
                          >
                            <ShoppingCart className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Video Modal Player (triggers on Womens Kit click) */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          >
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative w-full max-w-4xl bg-gray-900 rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
            >
              {/* Close Button */}
              <button 
                onClick={() => setActiveVideo(null)}
                className="absolute top-4 right-4 z-10 p-2.5 bg-black/60 hover:bg-black/90 rounded-full text-white transition-colors border border-white/10"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="aspect-video w-full bg-black">
                <video 
                  src={activeVideo} 
                  controls 
                  autoPlay 
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Details Inquiry Modal (Product Details want to Ask) */}
      <AnimatePresence>
        {inquireProduct && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              exit={{ y: 20 }}
              className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-2xl relative"
            >
              <button 
                onClick={() => setInquireProduct(null)}
                className="absolute top-6 right-6 p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:scale-105 transition-transform"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>

              <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">Inquire Package Details</h3>
              <p className="text-gray-500 text-sm mb-6">Ask details about our **{inquireProduct.name}** valued at **{inquireProduct.pv}PV**.</p>

              {!formSubmitted ? (
                <form onSubmit={handleInquirySubmit} className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Your Name</label>
                    <input 
                      type="text" 
                      required
                      value={inquiryForm.name}
                      onChange={e => setInquiryForm({...inquiryForm, name: e.target.value})}
                      placeholder="Enter your name" 
                      className="w-full px-5 py-4 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-primary focus:outline-none dark:text-white text-base font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">WhatsApp Number</label>
                    <input 
                      type="tel" 
                      required
                      value={inquiryForm.phone}
                      onChange={e => setInquiryForm({...inquiryForm, phone: e.target.value})}
                      placeholder="e.g. +91 98765 43210" 
                      className="w-full px-5 py-4 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-primary focus:outline-none dark:text-white text-base font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Specific Questions</label>
                    <textarea 
                      rows={3} 
                      value={inquiryForm.notes}
                      onChange={e => setInquiryForm({...inquiryForm, notes: e.target.value})}
                      placeholder="What details would you like to know?"
                      className="w-full px-5 py-4 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-primary focus:outline-none resize-none dark:text-white text-base font-semibold"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-4.5 bg-gradient-to-r from-primary to-yellow-500 text-black font-extrabold text-base rounded-2xl hover:opacity-90 hover:-translate-y-0.5 transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    Submit Query <MessageSquare className="w-5 h-5" />
                  </button>
                </form>
              ) : (
                <div className="text-center py-6 space-y-6">
                  <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
                    <Sparkles className="w-10 h-10 animate-bounce" />
                  </div>
                  <h4 className="text-xl font-extrabold text-gray-900 dark:text-white">Query Submitted Successfully!</h4>
                  <p className="text-gray-500 text-sm max-w-sm mx-auto">Thank you, **{inquiryForm.name}**. Our senior eagles will review your query and connect with you shortly.</p>
                  
                  <button 
                    onClick={() => {
                      handleWhatsAppRedirect(inquireProduct);
                      setInquireProduct(null);
                    }}
                    className="w-full py-4.5 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-base rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    Open Direct WhatsApp <PhoneCall className="w-5 h-5" />
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
