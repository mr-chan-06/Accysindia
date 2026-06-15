"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ShoppingCart, Star, Loader2, ShoppingBag, Play, X, MessageSquare, PhoneCall, Sparkles, Check, Download, Calculator, Layers, Zap, Users, GitFork, RefreshCw, Award } from "lucide-react";
import ImageWithFallback from "@/components/ImageWithFallback";

export const DEFAULT_KITS = [
  {
    _id: "kit1",
    name: "Womens Kit",
    category: "Premium Kits",
    image: "/uploads/products/Napkin.png",
    description: "A tailored collection of organic beauty care, personal hygiene, and wellness products designed specifically for modern women. Click to play video guide!",
    price: 4700,
    pv: 60,
    videoUrl: "https://youtube.com/watch?v=CrElJ8a0bjs&feature=shared",
  },
  {
    _id: "kit2",
    name: "Provision Kit",
    category: "Premium Kits",
    image: "/uploads/products/Provision kit.png",
    description: "Your ultimate household bundle. Contains premium grocery staples, pulses, oils, spices, and daily essentials for your home. Only 60PV for all! Click to view details.",
    price: 6700,
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
    price: 5000,
    pv: 60,
  },
  {
    _id: "kit4",
    name: "Gents Trunk Kit",
    category: "Premium Kits",
    image: "/uploads/products/Inners.png",
    description: "Ultimate luxury and everyday comfort. Styled with organic, ultra-breathable combed cotton threads. Only 60PV for all! Click to view details.",
    price: 6000,
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
    price: 5500,
    pv: 60,
  },
  {
    _id: "kit6",
    name: "Mixie Kit",
    category: "Premium Kits",
    image: "/uploads/products/mixie.png",
    description: "A high-performance premium mixer grinder (Mixie) kit. Featuring a powerful heavy-duty motor, multiple stainless steel jars, and elegant design for your modern kitchen. Only 60PV for all!",
    price: 6200,
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
  const [viewingProduct, setViewingProduct] = useState<any | null>(null);

  // Calculator State
  const [leftIDs, setLeftIDs] = useState(1);
  const [rightIDs, setRightIDs] = useState(1);

  // Dashboard & Strategy State
  const [activeIncomeTab, setActiveIncomeTab] = useState("direct");
  const [activeIdStrategy, setActiveIdStrategy] = useState("1id");

  // Binary calculations
  const totalLeftPV = leftIDs * 60;
  const totalRightPV = rightIDs * 60;
  const matchedPairs = Math.min(leftIDs, rightIDs);

  const earning = matchedPairs * 600;

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
                    className={`px-6 py-3 rounded-full text-sm font-bold transition-all ${activeCategory === cat
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

                        {/* Top-left PV Badge */}
                        {product.pv && (
                          <div className="absolute top-4 left-4 z-10 flex flex-col items-center justify-center w-16 h-16 rounded-[1.1rem] bg-gradient-to-br from-green-400 to-emerald-700 shadow-xl shadow-emerald-700/40 border-2 border-white/20">
                            <span className="text-white font-black text-xl leading-none">{product.pv}</span>
                            <span className="text-white/90 font-bold text-[10px] uppercase tracking-widest leading-none mt-0.5">PV</span>
                          </div>
                        )}

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
                          {/* View Product Details */}
                          <button
                            onClick={() => setViewingProduct(product)}
                            title="View Product Details"
                            className="flex items-center justify-center px-3 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl text-[11px] font-bold transition-all border border-primary/20"
                          >
                            <Sparkles className="w-3 h-3 mr-1" /> View Details
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

      {/* Premium Hybrid Income Plans Section */}
      <section className="py-24 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-black text-xs uppercase tracking-widest bg-primary/10 px-4 py-2 rounded-full inline-block mb-4">
              Income Opportunities
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
              Eagles Team Income Plans
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto font-medium">
              Explore 5 distinct pathways to generate passive revenue, build direct commerce teams, and qualify for premium ranks.
            </p>
          </div>

          {/* Income Plan Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12 border-b border-gray-100 dark:border-gray-800 pb-6">
            {[
              { id: "direct", name: "Direct Referral", icon: Zap },
              { id: "team", name: "Team & Carry Forward", icon: Users },
              { id: "multiple", name: "Multiple IDs Benefit", icon: GitFork },
              { id: "repurchase", name: "Repurchase Income", icon: RefreshCw },
              { id: "achievements", name: "Achievements", icon: Award }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveIncomeTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all ${activeIncomeTab === tab.id
                    ? "bg-primary text-black shadow-lg shadow-primary/25"
                    : "bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.name}
                </button>
              );
            })}
          </div>

          {/* Tab Content Display */}
          <div className="min-h-[500px]">
            {/* 1. Direct Referral Income */}
            {activeIncomeTab === "direct" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid lg:grid-cols-2 gap-12 items-center"
              >
                {/* Visual Binary tree for 60PV */}
                <div className="bg-gray-50 dark:bg-gray-900 rounded-[3rem] p-10 border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center min-h-[350px]">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">Basic 60PV Match Structure</h4>

                  {/* YOU */}
                  <div className="flex flex-col items-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 text-white flex items-center justify-center font-bold shadow-lg shadow-pink-500/25">
                      YOU
                    </div>
                    <div className="w-0.5 h-8 bg-gray-300 dark:bg-gray-700"></div>
                  </div>

                  {/* Left & Right */}
                  <div className="flex justify-between w-full max-w-xs relative px-10">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-0.5 bg-gray-300 dark:bg-gray-700"></div>

                    {/* Left Node */}
                    <div className="flex flex-col items-center w-1/2">
                      <div className="w-0.5 h-6 bg-gray-300 dark:bg-gray-700"></div>
                      <div className="w-14 h-14 rounded-full bg-black text-white dark:bg-gray-800 flex flex-col items-center justify-center font-black text-xs shadow-md">
                        <span>L</span>
                        <span className="text-[9px] text-primary">60 PV</span>
                      </div>
                    </div>

                    {/* Right Node */}
                    <div className="flex flex-col items-center w-1/2">
                      <div className="w-0.5 h-6 bg-gray-300 dark:bg-gray-700"></div>
                      <div className="w-14 h-14 rounded-full bg-black text-white dark:bg-gray-800 flex flex-col items-center justify-center font-black text-xs shadow-md">
                        <span>R</span>
                        <span className="text-[9px] text-primary">60 PV</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 text-center bg-white dark:bg-black px-6 py-3 rounded-full border border-gray-100 dark:border-gray-800">
                    <span className="text-xs font-extrabold text-gray-600 dark:text-gray-400">
                      Matched PV = 60 PV <span className="text-emerald-500 font-black ml-1">→ Payout ₹600</span>
                    </span>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white">Direct Referral Income</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed font-light">
                    Initiate your network setup with direct joining sponsorships. Matching pairs from your Left and Right lines immediately release active income.
                  </p>

                  <div className="bg-amber-500/10 border border-amber-500/20 p-5 rounded-2xl">
                    <h4 className="text-sm font-bold text-primary uppercase tracking-wider mb-2">First Week Release Requirement</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300 font-semibold">
                      *Your 1st week income will be released with a tail of min 60 PV that is a 1:2.
                    </p>
                  </div>

                  <div className="border-t dark:border-gray-800 pt-6">
                    <div className="flex items-center gap-4 text-3xl font-black text-gray-900 dark:text-white">
                      <span>Payout:</span>
                      <span className="text-primary">₹600*</span>
                      <span className="text-sm text-gray-400 font-normal uppercase">per matched 60PV Cycle</span>
                    </div>

                    <div className="bg-amber-500/10 border border-amber-500/20 p-5 rounded-2xl">
                      <p>Payment released only by bank Account with 2% TDS</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 2. Team Referral & Carry Forward */}
            {activeIncomeTab === "team" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-12"
              >
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  {/* Calculator Panel */}
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-[3rem] p-8 border border-gray-100 dark:border-gray-800 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />

                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                        <Calculator className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-lg font-black text-gray-900 dark:text-white">Matching Calculator</h4>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Estimate Eagles pair cycle income</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between font-bold text-xs text-gray-700 dark:text-gray-300 mb-1.5">
                          <span>Left Team Active IDs</span>
                          <span className="text-primary">{leftIDs} IDs ({totalLeftPV} PV)</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={leftIDs}
                          onChange={(e) => setLeftIDs(parseInt(e.target.value))}
                          className="w-full h-1.5 bg-gray-200 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between font-bold text-xs text-gray-700 dark:text-gray-300 mb-1.5">
                          <span>Right Team Active IDs</span>
                          <span className="text-primary">{rightIDs} IDs ({totalRightPV} PV)</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={rightIDs}
                          onChange={(e) => setRightIDs(parseInt(e.target.value))}
                          className="w-full h-1.5 bg-gray-200 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                      </div>

                      <div className="bg-white dark:bg-black p-5 rounded-2xl border border-gray-150 dark:border-gray-800 space-y-3">
                        <div className="flex justify-between text-xs text-gray-500 font-semibold">
                          <span className="flex items-center gap-1.5"><Layers className="w-3.5 h-3.5" /> Matches Formed</span>
                          <span className="text-gray-900 dark:text-white font-bold">{matchedPairs} Pairs</span>
                        </div>

                        {/* Carry forward display */}
                        <div className="flex justify-between text-xs text-gray-500 font-semibold border-b dark:border-gray-800 pb-3">
                          <span>Carry Forward PV</span>
                          <span className="text-primary font-bold">
                            {leftIDs > rightIDs ? `${(leftIDs - rightIDs) * 60} PV Left` : rightIDs > leftIDs ? `${(rightIDs - leftIDs) * 600} PV Right` : "Balanced"}
                          </span>
                        </div>

                        <div className="pt-2">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider flex items-center gap-1">
                              <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" /> Income
                            </span>
                            <div className="text-right">
                              <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-400">
                                ₹{earning.toLocaleString()}
                              </div>
                              <span className="text-[8px] text-gray-400 font-bold uppercase tracking-wider block">Estimated weekly payout</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                      <Users className="w-6 h-6" />
                    </div>
                    <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white">Team Referral & Carry Forward</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed font-light">
                      Earn larger weekly payouts as your Left and Right teams build active sales groups. Point Values are calculated based on matched packets, and any unbalanced excess PV is automatically rolled over to the next week!
                    </p>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                        <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-gray-955 dark:text-white block">Team Referral Payout:</span>
                          <span className="text-sm text-gray-500 font-semibold">1 PV Left & 1 PV Right matched = ₹10. So 600 PV matched (10 Left & 10 Right IDs) pays exactly ₹6,000.</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                        <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-gray-955 dark:text-white block">Carry Forward System:</span>
                          <span className="text-sm text-gray-500 font-semibold">If you have 3000 PV (50 IDs) on the Left and 2400 PV (40 IDs) on the Right, you match 2400 PV to earn ₹24,000. The remaining 600 PV will be carried forward to next week.</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 3. Multiple ID Benefits */}
            {activeIncomeTab === "multiple" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-12"
              >
                <div className="text-center max-w-2xl mx-auto space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto">
                    <GitFork className="w-6 h-6" />
                  </div>
                  <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white">Multiple ID Benefits</h3>
                  <p className="text-gray-500 dark:text-gray-400 font-medium">
                    Maximize your income multipliers! Build multiple spots under your personal registry to reap multiple commissions for the exact same active group sales.
                  </p>
                </div>

                {/* ID Toggle Buttons */}
                <div className="flex items-center justify-center gap-4">
                  {[
                    { id: "1id", name: "1 Active ID Plan", desc: "Standard entry" },
                    { id: "3id", name: "3 Active IDs Plan", desc: "Executive multiplier" },
                    { id: "7id", name: "7 Active IDs Plan", desc: "Ultimate leader path" }
                  ].map((strat) => (
                    <button
                      key={strat.id}
                      onClick={() => setActiveIdStrategy(strat.id)}
                      className={`px-6 py-4 rounded-2xl transition-all border text-left flex flex-col justify-center min-w-[160px] ${activeIdStrategy === strat.id
                        ? "bg-primary border-primary text-black shadow-xl shadow-primary/20 scale-105"
                        : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:border-primary/30"
                        }`}
                    >
                      <span className="font-extrabold text-base leading-tight">{strat.name}</span>
                      <span className={`text-[10px] font-bold ${activeIdStrategy === strat.id ? 'text-black/70' : 'text-gray-400'}`}>{strat.desc}</span>
                    </button>
                  ))}
                </div>

                {/* Strategy Details Layout */}
                <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
                  {/* Strategy Info Panel */}
                  {/* Strategy Tree Diagram Output */}
                  <div>
                    {activeIdStrategy === "1id" && (
                      <div className="flex flex-col items-center p-6 bg-gray-50 dark:bg-black/40 rounded-3xl border border-gray-100 dark:border-gray-800">
                        <h5 className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-6">1-ID Genealogy Visual</h5>

                        <div className="flex flex-col items-center mb-6 w-full max-w-sm">
                          {/* YOU */}
                          <div className="flex flex-col items-center mb-4">
                            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 text-white flex items-center justify-center font-black text-xs shadow-lg relative">
                              YOU
                              <span className="absolute -bottom-2 bg-emerald-500 text-black px-1.5 py-0.5 rounded-full text-[8px] font-black uppercase">₹4,800</span>
                            </div>
                            <div className="w-0.5 h-6 bg-gray-300 dark:bg-gray-700"></div>
                          </div>

                          {/* Left/Right */}
                          <div className="flex justify-between w-full relative px-6">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-0.5 bg-gray-300 dark:bg-gray-700"></div>

                            {/* Left Node */}
                            <div className="flex flex-col items-center w-1/2">
                              <div className="w-0.5 h-4 bg-gray-300 dark:bg-gray-700"></div>
                              <div className="w-11 h-11 rounded-full bg-black text-white dark:bg-gray-800 flex items-center justify-center font-bold text-xs shadow-md mt-1">
                                8
                              </div>
                              <span className="text-[10px] font-bold text-gray-500 mt-2">8 IDs (480 PV)</span>
                            </div>

                            {/* Right Node */}
                            <div className="flex flex-col items-center w-1/2">
                              <div className="w-0.5 h-4 bg-gray-300 dark:bg-gray-700"></div>
                              <div className="w-11 h-11 rounded-full bg-black text-white dark:bg-gray-800 flex items-center justify-center font-bold text-xs shadow-md mt-1">
                                8
                              </div>
                              <span className="text-[10px] font-bold text-gray-500 mt-2">8 IDs (480 PV)</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeIdStrategy === "3id" && (
                      <div className="flex flex-col items-center p-6 bg-gray-50 dark:bg-black/40 rounded-3xl border border-gray-100 dark:border-gray-800">
                        <h5 className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-6">3-ID Genealogy Visual</h5>

                        <div className="flex flex-col items-center mb-6 w-full max-w-sm">
                          {/* U1 Node */}
                          <div className="flex flex-col items-center mb-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 text-white flex items-center justify-center font-black text-xs shadow-lg relative">
                              U1
                              <span className="absolute -bottom-2 bg-emerald-500 text-black px-1.5 py-0.5 rounded-full text-[8px] font-black uppercase">₹5,400</span>
                            </div>
                            <div className="w-0.5 h-4 bg-gray-300 dark:bg-gray-700"></div>
                          </div>

                          {/* U2 and U3 */}
                          <div className="flex justify-between w-full relative px-6">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-0.5 bg-gray-300 dark:bg-gray-700"></div>

                            {/* U2 Node */}
                            <div className="flex flex-col items-center w-1/2">
                              <div className="w-0.5 h-3 bg-gray-300 dark:bg-gray-700"></div>
                              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 text-white flex items-center justify-center font-bold text-[10px] shadow-md relative">
                                U2
                                <span className="absolute -bottom-2 bg-emerald-500 text-black px-1 py-0.5 rounded-full text-[7px] font-black uppercase">₹2.4k</span>
                              </div>
                              <div className="w-0.5 h-4 bg-gray-300 dark:bg-gray-700"></div>

                              <div className="flex justify-between w-full relative px-1">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-0.5 bg-gray-300 dark:bg-gray-700"></div>
                                <div className="flex flex-col items-center w-1/2">
                                  <div className="w-0.5 h-2 bg-gray-300 dark:bg-gray-700"></div>
                                  <div className="w-7 h-7 rounded-full bg-black text-white dark:bg-gray-800 flex items-center justify-center text-[10px] font-bold mt-0.5">4</div>
                                </div>
                                <div className="flex flex-col items-center w-1/2">
                                  <div className="w-0.5 h-2 bg-gray-300 dark:bg-gray-700"></div>
                                  <div className="w-7 h-7 rounded-full bg-black text-white dark:bg-gray-800 flex items-center justify-center text-[10px] font-bold mt-0.5">4</div>
                                </div>
                              </div>
                            </div>

                            {/* U3 Node */}
                            <div className="flex flex-col items-center w-1/2">
                              <div className="w-0.5 h-3 bg-gray-300 dark:bg-gray-700"></div>
                              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 text-white flex items-center justify-center font-bold text-[10px] shadow-md relative">
                                U3
                                <span className="absolute -bottom-2 bg-emerald-500 text-black px-1 py-0.5 rounded-full text-[7px] font-black uppercase">₹2.4k</span>
                              </div>
                              <div className="w-0.5 h-4 bg-gray-300 dark:bg-gray-700"></div>

                              <div className="flex justify-between w-full relative px-1">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-0.5 bg-gray-300 dark:bg-gray-700"></div>
                                <div className="flex flex-col items-center w-1/2">
                                  <div className="w-0.5 h-2 bg-gray-300 dark:bg-gray-700"></div>
                                  <div className="w-7 h-7 rounded-full bg-black text-white dark:bg-gray-800 flex items-center justify-center text-[10px] font-bold mt-0.5">4</div>
                                </div>
                                <div className="flex flex-col items-center w-1/2">
                                  <div className="w-0.5 h-2 bg-gray-300 dark:bg-gray-700"></div>
                                  <div className="w-7 h-7 rounded-full bg-black text-white dark:bg-gray-800 flex items-center justify-center text-[10px] font-bold mt-0.5">4</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeIdStrategy === "7id" && (
                      <div className="flex flex-col items-center p-6 bg-gray-50 dark:bg-black/40 rounded-3xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                        <h5 className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-6">7-ID Genealogy Visual</h5>

                        <div className="flex flex-col items-center w-full max-w-sm overflow-x-auto pb-4">
                          <div className="min-w-[320px] flex flex-col items-center">
                            {/* U1 */}
                            <div className="flex flex-col items-center mb-2">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 text-white flex items-center justify-center font-bold text-[10px] shadow-md relative">
                                U1
                                <span className="absolute -bottom-1.5 bg-emerald-500 text-black px-1 py-0.5 rounded-full text-[6px] font-black uppercase">₹6.6k</span>
                              </div>
                              <div className="w-0.5 h-3 bg-gray-300 dark:bg-gray-700"></div>
                            </div>

                            {/* U2 and U3 */}
                            <div className="flex justify-between w-full relative px-14">
                              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/5 h-0.5 bg-gray-300 dark:bg-gray-700"></div>

                              {/* U2 */}
                              <div className="flex flex-col items-center w-1/2">
                                <div className="w-0.5 h-2.5 bg-gray-300 dark:bg-gray-700"></div>
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 text-white flex items-center justify-center font-bold text-[8px] shadow-sm relative">
                                  U2
                                  <span className="absolute -bottom-1.5 bg-emerald-500 text-black px-0.5 py-0.5 rounded-full text-[5px] font-black uppercase">₹3k</span>
                                </div>
                                <div className="w-0.5 h-2.5 bg-gray-300 dark:bg-gray-700"></div>

                                {/* U4 & U5 */}
                                <div className="flex justify-between w-full relative px-1">
                                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-0.5 bg-gray-300 dark:bg-gray-700"></div>
                                  <div className="flex flex-col items-center w-1/2">
                                    <div className="w-0.5 h-1.5 bg-gray-300 dark:bg-gray-700"></div>
                                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 text-white flex items-center justify-center font-bold text-[7px] relative animate-pulse">
                                      U4
                                      <span className="absolute -bottom-1.5 bg-emerald-500 text-black px-0.5 py-0.5 rounded-full text-[4px] font-black">₹1.2k</span>
                                    </div>
                                    <div className="w-0.5 h-1.5 bg-gray-300 dark:bg-gray-700"></div>
                                    <div className="flex gap-0.5">
                                      <div className="w-5 h-5 rounded-full bg-black text-white dark:bg-gray-800 flex items-center justify-center text-[7px] font-bold">2</div>
                                      <div className="w-5 h-5 rounded-full bg-black text-white dark:bg-gray-800 flex items-center justify-center text-[7px] font-bold">2</div>
                                    </div>
                                  </div>
                                  <div className="flex flex-col items-center w-1/2">
                                    <div className="w-0.5 h-1.5 bg-gray-300 dark:bg-gray-700"></div>
                                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 text-white flex items-center justify-center font-bold text-[7px] relative animate-pulse">
                                      U5
                                      <span className="absolute -bottom-1.5 bg-emerald-500 text-black px-0.5 py-0.5 rounded-full text-[4px] font-black">₹1.2k</span>
                                    </div>
                                    <div className="w-0.5 h-1.5 bg-gray-300 dark:bg-gray-700"></div>
                                    <div className="flex gap-0.5">
                                      <div className="w-5 h-5 rounded-full bg-black text-white dark:bg-gray-800 flex items-center justify-center text-[7px] font-bold">2</div>
                                      <div className="w-5 h-5 rounded-full bg-black text-white dark:bg-gray-800 flex items-center justify-center text-[7px] font-bold">2</div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* U3 */}
                              <div className="flex flex-col items-center w-1/2">
                                <div className="w-0.5 h-2.5 bg-gray-300 dark:bg-gray-700"></div>
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 text-white flex items-center justify-center font-bold text-[8px] shadow-sm relative">
                                  U3
                                  <span className="absolute -bottom-1.5 bg-emerald-500 text-black px-0.5 py-0.5 rounded-full text-[5px] font-black uppercase">₹3k</span>
                                </div>
                                <div className="w-0.5 h-2.5 bg-gray-300 dark:bg-gray-700"></div>

                                {/* U6 & U7 */}
                                <div className="flex justify-between w-full relative px-1">
                                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-0.5 bg-gray-300 dark:bg-gray-700"></div>
                                  <div className="flex flex-col items-center w-1/2">
                                    <div className="w-0.5 h-1.5 bg-gray-300 dark:bg-gray-700"></div>
                                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 text-white flex items-center justify-center font-bold text-[7px] relative animate-pulse">
                                      U6
                                      <span className="absolute -bottom-1.5 bg-emerald-500 text-black px-0.5 py-0.5 rounded-full text-[4px] font-black">₹1.2k</span>
                                    </div>
                                    <div className="w-0.5 h-1.5 bg-gray-300 dark:bg-gray-700"></div>
                                    <div className="flex gap-0.5">
                                      <div className="w-5 h-5 rounded-full bg-black text-white dark:bg-gray-800 flex items-center justify-center text-[7px] font-bold">2</div>
                                      <div className="w-5 h-5 rounded-full bg-black text-white dark:bg-gray-800 flex items-center justify-center text-[7px] font-bold">2</div>
                                    </div>
                                  </div>
                                  <div className="flex flex-col items-center w-1/2">
                                    <div className="w-0.5 h-1.5 bg-gray-300 dark:bg-gray-700"></div>
                                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 text-white flex items-center justify-center font-bold text-[7px] relative animate-pulse">
                                      U7
                                      <span className="absolute -bottom-1.5 bg-emerald-500 text-black px-0.5 py-0.5 rounded-full text-[4px] font-black">₹1.2k</span>
                                    </div>
                                    <div className="w-0.5 h-1.5 bg-gray-300 dark:bg-gray-700"></div>
                                    <div className="flex gap-0.5">
                                      <div className="w-5 h-5 rounded-full bg-black text-white dark:bg-gray-800 flex items-center justify-center text-[7px] font-bold">2</div>
                                      <div className="w-5 h-5 rounded-full bg-black text-white dark:bg-gray-800 flex items-center justify-center text-[7px] font-bold">2</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-6">
                    {activeIdStrategy === "1id" && (
                      <div className="space-y-4">
                        <h4 className="text-2xl font-bold text-gray-900 dark:text-white">Single ID Payout Model</h4>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-light">
                          With a single active ID, 8 new package sales on your Left Team and 8 on your Right Team yield a matched volume of 480 PV.
                        </p>
                        <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl space-y-2">
                          <div className="flex justify-between font-semibold text-sm">
                            <span className="text-gray-400">Total Income:</span>
                            <span className="text-gray-900 dark:text-white font-extrabold">₹4,800</span>
                          </div>
                          <div className="flex justify-between font-semibold text-sm">
                            <span className="text-gray-400">Weekly Cap:</span>
                            <span className="text-gray-900 dark:text-white font-extrabold">₹60,000 / Week</span>
                          </div>
                          <div className="flex justify-between font-semibold text-sm">
                            <span className="text-gray-400">Yearly Cap:</span>
                            <span className="text-primary font-black">₹31.2 Lakhs / Year</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeIdStrategy === "3id" && (
                      <div className="space-y-4">
                        <h4 className="text-2xl font-bold text-gray-900 dark:text-white">3-ID Placement Multiplier</h4>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-light">
                          Own 3 positions (U1, U2, U3) yourself. Registering the same 16 sales (4 Left / 4 Right under U2, and 4 Left / 4 Right under U3) triggers payouts on all 3 IDs!
                        </p>
                        <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl space-y-2">
                          <div className="flex justify-between font-semibold text-xs border-b dark:border-gray-800 pb-2 mb-2 text-gray-500">
                            <span>ID Split Payouts:</span>
                            <span>U1: ₹5,400 | U2: ₹2,400 | U3: ₹2,400</span>
                          </div>
                          <div className="flex justify-between font-semibold text-sm">
                            <span className="text-gray-400">Total Combined Income:</span>
                            <span className="text-emerald-500 font-extrabold">₹10,200 <span className="text-xs text-gray-400 font-normal">(Double for same work!)</span></span>
                          </div>
                          <div className="flex justify-between font-semibold text-sm">
                            <span className="text-gray-400">Weekly Cap:</span>
                            <span className="text-gray-900 dark:text-white font-extrabold">₹1.8 Lakhs / Week</span>
                          </div>
                          <div className="flex justify-between font-semibold text-sm">
                            <span className="text-gray-400">Yearly Cap:</span>
                            <span className="text-primary font-black">₹93 Lakhs / Year</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeIdStrategy === "7id" && (
                      <div className="space-y-4">
                        <h4 className="text-2xl font-bold text-gray-900 dark:text-white">7-ID Ultimate Leader Matrix</h4>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-light">
                          The most lucrative placement. Owning U1 to U7 positions lets you capture matching binary overrides at three levels. Placing 16 sales (groups of 2 under U4-U7) pays all 7 accounts!
                        </p>
                        <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl space-y-2">
                          <div className="flex justify-between font-semibold text-[10px] border-b dark:border-gray-800 pb-2 mb-2 text-gray-500">
                            <span>ID Split Payouts:</span>
                            <span>U1: ₹6,600 | U2/U3: ₹3k ea | U4-U7: ₹1.2k ea</span>
                          </div>
                          <div className="flex justify-between font-semibold text-sm">
                            <span className="text-gray-400">Total Combined Income:</span>
                            <span className="text-emerald-500 font-extrabold">₹17,400 <span className="text-xs text-gray-400 font-normal">(3.6x Income multiplier!)</span></span>
                          </div>
                          <div className="flex justify-between font-semibold text-sm">
                            <span className="text-gray-400">Weekly Cap:</span>
                            <span className="text-gray-900 dark:text-white font-extrabold">₹4.2 Lakhs / Week</span>
                          </div>
                          <div className="flex justify-between font-semibold text-sm">
                            <span className="text-gray-400">Yearly Cap:</span>
                            <span className="text-primary font-black">₹2.18 Crores / Year</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="border-t dark:border-gray-800 pt-6 space-y-3">
                      <h5 className="font-extrabold text-sm uppercase tracking-wider text-gray-500">Key Strategic Benefits</h5>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-sm font-semibold text-gray-755 dark:text-gray-300">
                          <Check className="w-4 h-4 text-emerald-500" /> Same efforts, dramatically higher incomes
                        </li>
                        <li className="flex items-center gap-2 text-sm font-semibold text-gray-755 dark:text-gray-300">
                          <Check className="w-4 h-4 text-emerald-500" /> Each individual ID is capped at ₹60,000/week
                        </li>
                        <li className="flex items-center gap-2 text-sm font-semibold text-gray-755 dark:text-gray-300">
                          <Check className="w-4 h-4 text-emerald-500" /> Limitless potential with more active direct lines
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 4. Repurchase Income */}
            {activeIncomeTab === "repurchase" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid lg:grid-cols-2 gap-12 items-center"
              >
                <div className="bg-gray-50 dark:bg-gray-900 rounded-[3rem] p-10 border border-gray-100 dark:border-gray-800 flex flex-col justify-between min-h-[350px]">
                  <div>
                    <h4 className="text-lg font-black text-gray-955 dark:text-white mb-2">Monthly Limits & Caps</h4>
                    <p className="text-sm text-gray-400 font-medium mb-6">Standard repurchase ceilings for Eagles Team members.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-6 pb-6">
                    <div className="p-6 bg-white dark:bg-black rounded-2xl border border-gray-100 dark:border-gray-800 text-center shadow-sm">
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">Max Income / Month</span>
                      <span className="text-2xl font-black text-primary">₹2.5 Lakhs</span>
                    </div>

                    <div className="p-6 bg-white dark:bg-black rounded-2xl border border-gray-100 dark:border-gray-800 text-center shadow-sm">
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">Yearly Earnings Ceiling</span>
                      <span className="text-2xl font-black text-primary">₹30 Lakhs</span>
                    </div>
                  </div>

                  <p className="text-[10px] text-gray-400 font-bold text-center uppercase tracking-wider">
                    *Monthly ceiling and payouts are subject to change as per direct selling policies.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                    <RefreshCw className="w-6 h-6 animate-spin-slow" />
                  </div>
                  <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white">Repurchase Income</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed font-light">
                    Earn repeat matching commissions when your existing binary networks repurchase products, staple packages, and daily essentials.
                  </p>

                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl flex justify-between items-center text-sm font-semibold">
                      <span className="text-gray-400">Basic Match Unit:</span>
                      <span className="text-gray-900 dark:text-white">1 PV Left & 1 PV Right = ₹10</span>
                    </div>

                    <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl flex justify-between items-center text-sm font-semibold">
                      <span className="text-gray-400">Example (2,500 PV match):</span>
                      <span className="text-emerald-500 font-extrabold">₹25,000 Payout</span>
                    </div>

                    <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl flex justify-between items-center text-sm font-semibold">
                      <span className="text-gray-400">Example (25,000 PV match):</span>
                      <span className="text-emerald-500 font-extrabold">₹2,50,000 Payout</span>
                    </div>
                  </div>

                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-500 font-bold">
                    ⚠️ Carry Forward is NOT applicable for Repurchase Income. Points do not carry over to the next month and must match within the active calendar month.
                  </div>
                </div>
              </motion.div>
            )}

            {/* 5. Achievements */}
            {activeIncomeTab === "achievements" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-12"
              >
                <div className="text-center max-w-2xl mx-auto space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto">
                    <Award className="w-6 h-6" />
                  </div>
                  <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white">Leadership Ranks & Achievements</h3>
                  <p className="text-gray-500 dark:text-gray-400 font-medium">
                    Climb through the prestigious ranks of the Eagles Team network by hitting weekly matched group volumes. Unlock massive payouts and luxury international tour opportunities.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  {/* Rank 1: Diamond Director */}
                  <div className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[2.5rem] p-8 space-y-6 hover:border-primary/30 transition-all shadow-lg flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center font-bold">
                          DD
                        </div>
                        <div>
                          <h4 className="text-xl font-black text-gray-900 dark:text-white">Diamond Director</h4>
                          <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Level 1 Rank Qualifier</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between text-sm font-semibold">
                          <span className="text-gray-400">Weekly Target Volume:</span>
                          <span className="text-gray-900 dark:text-white font-extrabold">3,600 PV L / 3,600 PV R</span>
                        </div>
                        <div className="flex justify-between text-sm font-semibold border-b dark:border-gray-800 pb-3">
                          <span className="text-gray-400">Matched Packages (PM):</span>
                          <span className="text-primary font-black">60 PM Left & Right / Week</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-black p-5 rounded-2xl border border-gray-150 dark:border-gray-800 space-y-3 shadow-inner">
                      <div className="flex justify-between text-xs font-semibold text-gray-500">
                        <span>Weekly Payout:</span>
                        <span className="text-gray-900 dark:text-white font-bold">₹36,000</span>
                      </div>
                      <div className="flex justify-between text-xs font-semibold text-gray-500">
                        <span>Monthly Income:</span>
                        <span className="text-gray-900 dark:text-white font-bold">₹1,44,000</span>
                      </div>
                      <div className="flex justify-between text-sm font-bold border-t dark:border-gray-800 pt-3 text-emerald-500">
                        <span>Yearly Income Projection:</span>
                        <span>₹18.72 Lakhs</span>
                      </div>
                    </div>
                  </div>

                  {/* Rank 2: President Diamond Director */}
                  <div className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[2.5rem] p-8 space-y-6 hover:border-primary/30 transition-all shadow-lg flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-xl" />

                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-yellow-500 text-black flex items-center justify-center font-black">
                          PD
                        </div>
                        <div>
                          <h4 className="text-xl font-black text-gray-900 dark:text-white">President Diamond Director</h4>
                          <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Elite Leadership Rank</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between text-sm font-semibold">
                          <span className="text-gray-400">Weekly Target Volume:</span>
                          <span className="text-gray-900 dark:text-white font-extrabold">6,000 PV L / 6,000 PV R</span>
                        </div>
                        <div className="flex justify-between text-sm font-semibold border-b dark:border-gray-800 pb-3">
                          <span className="text-gray-400">Matched Packages (PM):</span>
                          <span className="text-primary font-black">100 PM Left & Right / Week</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-black p-5 rounded-2xl border border-gray-150 dark:border-gray-800 space-y-3 shadow-inner">
                      <div className="flex justify-between text-xs font-semibold text-gray-500">
                        <span>Weekly Payout:</span>
                        <span className="text-gray-900 dark:text-white font-bold">₹60,000</span>
                      </div>
                      <div className="flex justify-between text-xs font-semibold text-gray-500">
                        <span>Monthly Income:</span>
                        <span className="text-gray-950 dark:text-white font-bold">₹2,40,000</span>
                      </div>
                      <div className="flex justify-between text-sm font-bold border-t dark:border-gray-800 pt-3 text-emerald-500">
                        <span>Yearly Income Projection:</span>
                        <span>₹31.20 Lakhs</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Product Details Modal */}
      <AnimatePresence>
        {viewingProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setViewingProduct(null)}
          >
            <motion.div
              initial={{ y: 16, scale: 0.97 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 16, scale: 0.97 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-2xl p-6 relative"
            >
              {/* Close */}
              <button
                onClick={() => setViewingProduct(null)}
                className="absolute top-4 right-4 p-1.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full text-gray-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Product name + category */}
              <div className="mb-4 pr-8">
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{viewingProduct.category}</span>
                <h3 className="text-lg font-black text-gray-900 dark:text-white mt-0.5">{viewingProduct.name}</h3>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                {viewingProduct.description || "No description available for this product."}
              </p>

              {/* Details if present */}
              {viewingProduct.details && (
                <ul className="mt-4 space-y-1.5 border-t dark:border-gray-800 pt-4">
                  {viewingProduct.details.split('\n').filter((l: string) => l.trim()).map((line: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400 font-medium">
                      <span className="text-primary font-black shrink-0">›</span>
                      <span>{line.replace(/^[•\-\*]\s*/, '')}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
                      onChange={e => setInquiryForm({ ...inquiryForm, name: e.target.value })}
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
                      onChange={e => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-5 py-4 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-primary focus:outline-none dark:text-white text-base font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Specific Questions</label>
                    <textarea
                      rows={3}
                      value={inquiryForm.notes}
                      onChange={e => setInquiryForm({ ...inquiryForm, notes: e.target.value })}
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
