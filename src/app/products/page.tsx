"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ShoppingCart, Star, Loader2, ShoppingBag, Play, X, MessageSquare, PhoneCall, Sparkles, Check, Download } from "lucide-react";
import ImageWithFallback from "@/components/ImageWithFallback";

export const DEFAULT_KITS = [
  {
    _id: "kit1",
    name: "Womens Kit",
    category: "Premium Kits",
    image: "/uploads/products/Napkin.png",
    description: "A tailored collection of organic beauty care, personal hygiene, and wellness products designed specifically for modern women. Click to play video guide!",
    price: 4999,
    pv: 60,
    videoUrl: "https://youtube.com/watch?v=CrElJ8a0bjs&feature=shared",
  },
  {
    _id: "kit2",
    name: "Provision Kit",
    category: "Premium Kits",
    image: "/uploads/products/Provision kit.png",
    description: "Your ultimate household bundle. Contains premium grocery staples, pulses, oils, spices, and daily essentials for your home. Only 60PV for all! Click to view details.",
    price: 4500,
    pv: 60,
    items: [
      { name: "சக்தி – மஞ்சள் தூள் (Turmeric Powder)", qty: "100g" },
      { name: "Red Chilli Powder", qty: "100g" },
      { name: "sakthi kulambu chilli powder", qty: "100g" },
      { name: "கடுகு (Mustard)", qty: "100g" },
      { name: "வெந்தயம் (Fenugreek)", qty: "100g" },
      { name: "சீரகம் (Cumin)", qty: "100g" },
      { name: "சோம்பு (Fennel)", qty: "100g" },
      { name: "துவரம் பருப்பு (Toor Dal)", qty: "500g" },
      { name: "உளுந்து (Urad Dal)", qty: "500g" },
      { name: "கடலை பருப்பு (Chana Dal)", qty: "500g" },
      { name: "இட்லி பொடி (Idli Podi)", qty: "200g" },
      { name: "நாட்டு சர்க்கரை (Country Sugar)", qty: "500g" },
      { name: "சேமியா (Vermicelli - 180g)", qty: "2 No" },
      { name: "மைதா மாவு (Maida / All Purpose)", qty: "500g" },
      { name: "ராகி மாவு (Ragi Flour)", qty: "500g" },
      { name: "ரவை (Sooji / Rava)", qty: "500g" },
      { name: "BLACK WHEAT ATTA", qty: "500g" },
      { name: "உடைத்த கடலை (Fried Gram)", qty: "250g" },
      { name: "பஜ்ஜி போண்டா மிக்ஸ் (Bajji Bonda Mix)", qty: "200g" },
      { name: "பிரியாணி இலை (Bay Leaf)", qty: "25g" },
      { name: "பட்டை (Cinnamon)", qty: "50g" },
      { name: "பருப்பு சாதம் பொடி (Dal Rice Powder)", qty: "200g" },
      { name: "முருங்கை இலை உப்பு (Moringa Leaf Salt)", qty: "1kg" },
      { name: "HEALTH MIX kk", qty: "500g" },
      { name: "மோர் மிளகாய் (Curd Chilli)", qty: "100g" },
      { name: "புளி (Tamarind)", qty: "500g" },
      { name: "Yakkai Handmade Soap", qty: "5pcs" },
      { name: "Groundnut oil", qty: "1 litre" },
      { name: "Dates", qty: "200g" },
      { name: "டீ தூள் (Tea Powder)", qty: "250g" },
      { name: "Badham Milk", qty: "200g" },
      { name: "அப்பளம் (Appalam)", qty: "100g" },
      { name: "நெய் (Ghee)", qty: "250g" },
      { name: "Gas Lighter Set", qty: "1Pcs" },
      { name: "Stainless steel Water bottle", qty: "1Pcs" },
      { name: "Foot Patch", qty: "1Pcs" },
      { name: "Napkin", qty: "4pcs" },
      { name: "Spirulina", qty: "1pack" }
    ]
  },
  {
    _id: "kit3",
    name: "Spirulina Kit",
    category: "Premium Kits",
    image: "/uploads/products/Spiruli.png",
    description: "Premium health package powered by highly pure organic Spirulina tablets, extracts, and herbal vitality formulations. Only 60PV for all!",
    price: 3999,
    pv: 60,
  },
  {
    _id: "kit4",
    name: "Gents Trunk Kit",
    category: "Premium Kits",
    image: "/uploads/products/Inners.png",
    description: "Ultimate luxury and everyday comfort. Styled with organic, ultra-breathable combed cotton threads. Only 60PV for all! Click to view details.",
    price: 3499,
    pv: 60,
    specs: {
      brand: "ACCSYS TRENDIQ Gents Trunk",
      tagline: "Ultra Soft. Perfect Fit. All-Day Comfort.",
      intro: "Experience premium comfort with ACCSYS TRENDIQ men's trunks, crafted from eco-friendly natural fibers for exceptional softness, breathability, and freshness.",
      variants: [
        {
          name: "Natural Bamboo Trunk (AC 007)",
          material: "88% Bamboo, 12% Spandex",
          features: [
            "Natural antibacterial protection (Bamboo Kun)",
            "Odor-resistant and moisture-wicking",
            "Excellent breathability and stretch",
            "Eco-friendly and biodegradable",
            "Soft second-skin feel"
          ]
        },
        {
          name: "Super Micro Modal Trunk (AC 005)",
          material: "91% Super Micro Modal, 9% Spandex",
          features: [
            "Silky-soft and lightweight fabric",
            "Superior comfort and flexibility",
            "Odor-control technology",
            "Breathable and skin-friendly",
            "Premium luxurious feel"
          ]
        }
      ],
      sizes: ["S", "M", "L", "XL", "XXL"],
      bottomTagline: "Feel the difference of natural softness, freshness, and comfort every day."
    }
  },
  {
    _id: "kit5",
    name: "Garments Kit",
    category: "Premium Kits",
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "A premium collection of high-quality formal shirts, casual attire, and elegant design garments from Eagles apparel hubs. Only 60PV for all!",
    price: 5200,
    pv: 60,
  },
];

const getYoutubeEmbedUrl = (url: string | null) => {
  if (!url) return "";
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}`;
  }
  return url.replace('watch?v=', 'embed/');
};

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
  const [activeItemsList, setActiveItemsList] = useState<any[] | null>(null);
  const [activeItemsListName, setActiveItemsListName] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSpecs, setActiveSpecs] = useState<any | null>(null);
  const [activeSpecsName, setActiveSpecsName] = useState<string>("");

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
            ACCSYS INDIA PRIVILEGE MEMBERS PACKAGES
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
                        className={`relative h-72 overflow-hidden bg-gray-200 ${(product.videoUrl || product.items || product.specs) ? 'cursor-pointer' : ''}`}
                        onClick={() => {
                          if (product.videoUrl) {
                            setActiveVideo(product.videoUrl);
                          } else if (product.items) {
                            setActiveItemsList(product.items);
                            setActiveItemsListName(product.name);
                          } else if (product.specs) {
                            setActiveSpecs(product.specs);
                            setActiveSpecsName(product.name);
                          }
                        }}
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

                        {/* Hover Trigger Overlay */}
                        {(product.videoUrl || product.items || product.specs) && (
                          <div
                            className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          >
                            <div className={`w-16 h-16 ${product.videoUrl ? 'bg-primary' : product.items ? 'bg-amber-500' : 'bg-blue-500'} text-black rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform`}>
                              {product.videoUrl ? (
                                <Play className="w-8 h-8 fill-black ml-1" />
                              ) : product.items ? (
                                <ShoppingBag className="w-8 h-8" />
                              ) : (
                                <Sparkles className="w-8 h-8" />
                              )}
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

                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors flex items-center justify-between gap-2">
                          <span>{product.name}</span>
                          {product.videoUrl && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveVideo(product.videoUrl);
                              }}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full text-xs font-bold transition-all shadow-md shadow-red-500/20 active:scale-95 cursor-pointer shrink-0"
                            >
                              <Play className="w-3 h-3 fill-white" /> Watch Guide
                            </button>
                          )}
                          {product.items && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveItemsList(product.items);
                                setActiveItemsListName(product.name);
                              }}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-black rounded-full text-xs font-bold transition-all shadow-md shadow-amber-500/20 active:scale-95 cursor-pointer shrink-0 animate-pulse"
                            >
                              <ShoppingBag className="w-3.5 h-3.5" /> View Items
                            </button>
                          )}
                          {product.specs && (
                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveSpecs(product.specs);
                                  setActiveSpecsName(product.name);
                                }}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-xs font-bold transition-all shadow-md shadow-blue-500/20 active:scale-95 cursor-pointer"
                              >
                                <Sparkles className="w-3.5 h-3.5" /> View Specs
                              </button>
                              <a
                                href="/BAMBOO & MODAL.pdf"
                                download="BAMBOO & MODAL.pdf"
                                onClick={(e) => e.stopPropagation()}
                                title="Download BAMBOO & MODAL PDF Guide"
                                className="flex items-center justify-center w-8 h-8 bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 dark:text-blue-400 rounded-full transition-all active:scale-95 cursor-pointer"
                              >
                                <Download className="w-4 h-4" />
                              </a>
                            </div>
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

          {activeVideo.includes('youtube.com') || activeVideo.includes('youtu.be') ? (
            <div className="aspect-video w-full bg-black">
              <iframe
                src={getYoutubeEmbedUrl(activeVideo)}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          ) : (
            <div className="aspect-video w-full bg-black">
              <video 
                src={activeVideo} 
                controls 
                autoPlay 
                className="w-full h-full object-contain"
              />
            </div>
          )}
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

      {/* Package Items Modal */}
      <AnimatePresence>
        {activeItemsList && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ y: 50, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 50, scale: 0.95 }}
              className="w-full max-w-4xl bg-white dark:bg-gray-950 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-2xl relative max-h-[85vh] flex flex-col"
            >
              {/* Close Button */}
              <button 
                onClick={() => {
                  setActiveItemsList(null);
                  setSearchQuery("");
                }}
                className="absolute top-6 right-6 p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:scale-105 transition-transform cursor-pointer text-gray-600 dark:text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="p-2 bg-amber-500/20 text-amber-600 dark:text-amber-400 rounded-xl">
                      <ShoppingBag className="w-6 h-6 animate-pulse" />
                    </span>
                    <h3 className="text-3xl font-black text-gray-900 dark:text-white leading-none">{activeItemsListName}</h3>
                  </div>
                  <p className="text-gray-500 text-sm">
                    This premium package includes exactly <strong>{activeItemsList.length}</strong> items.
                  </p>
                </div>
                
                {/* Search Bar inside Modal */}
                <div className="relative w-full md:w-80">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search package items..."
                    className="w-full pl-4 pr-10 py-2.5 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none dark:text-white text-sm font-semibold"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Items Grid */}
              <div className="overflow-y-auto pr-2 flex-1 mb-6 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-800">
                {activeItemsList.filter((item: any) => 
                  item.name.toLowerCase().includes(searchQuery.toLowerCase())
                ).length === 0 ? (
                  <div className="text-center py-16 flex flex-col items-center justify-center">
                    <ShoppingBag className="w-12 h-12 text-gray-300 dark:text-gray-700 mb-3" />
                    <span className="text-gray-500 dark:text-gray-400 font-bold">No matching items found</span>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {activeItemsList
                      .filter((item: any) => 
                        item.name.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((item: any, idx: number) => {
                        const originalIdx = activeItemsList.findIndex((i: any) => i.name === item.name);
                        return (
                          <div 
                            key={idx} 
                            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-black/40 border border-gray-100 dark:border-gray-800 rounded-2xl hover:border-amber-500/30 transition-all group"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <span className="w-8 h-8 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-extrabold text-xs rounded-lg flex items-center justify-center shrink-0">
                                {originalIdx + 1}
                              </span>
                              <span className="text-sm font-bold text-gray-900 dark:text-white leading-snug truncate">
                                {item.name}
                              </span>
                            </div>
                            <span className="bg-amber-500/15 text-amber-600 dark:text-amber-400 text-xs font-black px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0 ml-2">
                              {item.qty}
                            </span>
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>

              {/* Footer Actions */}
              <div className="pt-6 border-t dark:border-gray-800 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <span className="text-xs text-gray-400 font-bold uppercase tracking-widest text-center sm:text-left">
                  Ready to order? Connect with us on WhatsApp.
                </span>
                <div className="flex gap-3 w-full sm:w-auto">
                  <button 
                    onClick={() => {
                      setActiveItemsList(null);
                      setSearchQuery("");
                    }}
                    className="flex-1 sm:flex-none px-6 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-xl text-sm transition-all"
                  >
                    Close Catalog
                  </button>
                  <button 
                    onClick={() => {
                      const prod = allProducts.find(p => p.name === activeItemsListName);
                      if (prod) handleWhatsAppRedirect(prod);
                      setActiveItemsList(null);
                      setSearchQuery("");
                    }}
                    className="flex-1 sm:flex-none px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold rounded-xl text-sm transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    Purchase Package <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Package Specs Modal */}
      <AnimatePresence>
        {activeSpecs && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ y: 50, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 50, scale: 0.95 }}
              className="w-full max-w-4xl bg-white dark:bg-gray-950 rounded-[2.5rem] p-8 md:p-10 border border-gray-100 dark:border-gray-800 shadow-2xl relative max-h-[90vh] flex flex-col overflow-hidden"
            >
              {/* Close Button */}
              <button 
                onClick={() => {
                  setActiveSpecs(null);
                }}
                className="absolute top-6 right-6 p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:scale-105 transition-transform cursor-pointer text-gray-600 dark:text-gray-300 z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="mb-8 pr-10">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-black rounded-full uppercase tracking-widest border border-blue-500/10">
                    Premium Quality
                  </span>
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-2 leading-tight">
                  {activeSpecs.brand}
                </h3>
                <p className="text-primary dark:text-amber-500 font-extrabold text-sm uppercase tracking-widest mb-3">
                  {activeSpecs.tagline}
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-base font-medium leading-relaxed max-w-3xl">
                  {activeSpecs.intro}
                </p>
              </div>

              {/* Variants Section */}
              <div className="flex-1 overflow-y-auto pr-2 mb-8 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-800">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Available Variants</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {activeSpecs.variants.map((v: any, vIdx: number) => (
                    <div 
                      key={vIdx}
                      className="p-6 bg-gray-50 dark:bg-black/40 border border-gray-100 dark:border-gray-800 rounded-3xl hover:border-blue-500/20 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <h5 className="text-xl font-extrabold text-gray-900 dark:text-white mb-1">{v.name}</h5>
                        <span className="inline-block px-3 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold rounded-full mb-5">
                          {v.material}
                        </span>
                        
                        <ul className="space-y-3">
                          {v.features.map((f: string, fIdx: number) => (
                            <li key={fIdx} className="flex items-start gap-2.5 text-sm font-medium text-gray-600 dark:text-gray-300">
                              <span className="p-0.5 bg-emerald-500/10 text-emerald-500 rounded-md shrink-0 mt-0.5">
                                <Check className="w-3.5 h-3.5" />
                              </span>
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Sizes Available */}
                <div className="mt-8 p-6 bg-gray-50 dark:bg-black/25 border border-gray-100 dark:border-gray-800 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h5 className="text-sm font-extrabold text-gray-900 dark:text-white uppercase tracking-wider mb-1">Sizes Available</h5>
                    <p className="text-xs text-gray-400 font-medium">Standard gents trunk size fits</p>
                  </div>
                  <div className="flex gap-2.5 flex-wrap">
                    {activeSpecs.sizes.map((sz: string) => (
                      <span 
                        key={sz}
                        className="w-11 h-11 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white font-black text-sm rounded-xl flex items-center justify-center shadow-sm hover:border-primary transition-all"
                      >
                        {sz}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Tagline */}
                <div className="mt-6 text-center px-4 py-3 border-l-4 border-primary bg-primary/5 rounded-r-2xl">
                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-300 italic">
                    "{activeSpecs.bottomTagline}"
                  </p>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="pt-6 border-t dark:border-gray-800 flex flex-col sm:flex-row gap-4 items-center justify-between z-10 bg-white dark:bg-gray-955">
                <span className="text-xs text-gray-400 font-bold uppercase tracking-widest text-center sm:text-left">
                  Interested in this premium kit? Tap to purchase.
                </span>
                <div className="flex gap-3 w-full sm:w-auto">
                  <a
                    href="/BAMBOO & MODAL.pdf"
                    download="BAMBOO & MODAL.pdf"
                    className="flex-1 sm:flex-none px-5 py-3 bg-blue-500 hover:bg-blue-600 text-white font-extrabold rounded-xl text-sm transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4" /> Download PDF brochure
                  </a>
                  
                  <button 
                    onClick={() => {
                      setActiveSpecs(null);
                    }}
                    className="flex-1 sm:flex-none px-6 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-xl text-sm transition-all cursor-pointer"
                  >
                    Close Specs
                  </button>
                  <button 
                    onClick={() => {
                      const prod = allProducts.find(p => p.name === activeSpecsName);
                      if (prod) handleWhatsAppRedirect(prod);
                      setActiveSpecs(null);
                    }}
                    className="flex-1 sm:flex-none px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold rounded-xl text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Purchase Package <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
