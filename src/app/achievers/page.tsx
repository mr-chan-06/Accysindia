"use client";

import { motion } from "framer-motion";
import { Award, Compass, MapPin, Sparkles, Star, Users } from "lucide-react";

const TOUR_PHOTOS = [
  {
    id: 1,
    title: "Eagles Annual Leadership Summit",
    location: "Grand Convention Center, Chennai",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    description: "Honoring our Diamond Leaders and matching commission pioneers. Attended by over 3,000 active Eagles Team distributors."
  },
  {
    id: 2,
    title: "Eagles Domestic Tour Celebration",
    location: "Luxury Beach Resort, Goa",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    description: "Relaxation and strategic team alignments for qualifiers completing 100 matching pairs of joining kits."
  },
  {
    id: 3,
    title: "Eagles Global Explorers Trip",
    location: "Dubai Marina Yacht Convention",
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    description: "International incentive trip. Our premium Diamond performers enjoying cruise parties and leadership workshops."
  },
  {
    id: 4,
    title: "Eagles Regional Training Meetup",
    location: "Ooty Hills Retreat, Tamil Nadu",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    description: "Focused classroom direct selling webinars and synergy exercises with senior Vice Presidents."
  },
  {
    id: 5,
    title: "Eagles Mega Annual Carnival",
    location: "Indoor Stadium Arena, Bengaluru",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    description: "Felicitation and cultural celebrations. Awarding new sports cars and house benefits to elite Eagles network directors."
  }
];

// Dynamic loading of achievers from admin API
import { useState, useEffect } from "react";

// hooks moved inside component

export default function Achievers() {
  // State for achievers data
  const [achievers, setAchievers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  // Fetch achievers from admin API
  useEffect(() => {
    const fetchAchievers = async () => {
      try {
        const res = await fetch('/api/achievers');
        if (!res.ok) throw new Error('Failed to fetch achievers');
        const data = await res.json();
        setAchievers(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchAchievers();
  }, []);

  const filteredAchievers = activeCategory === "All"
    ? achievers
    : achievers.filter((a: any) => a.role === activeCategory);

  return (
    <div className="bg-white dark:bg-black min-h-screen border-t dark:border-gray-800">
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 py-32 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center mix-blend-overlay opacity-25" />
        
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-primary/20 text-primary border border-primary/30 rounded-full text-xs font-black uppercase tracking-widest mb-6">
            <Award className="w-4 h-4 animate-spin" /> Eagles Team Milestones
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-8">
            Eagles Team Achievers
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Witness the incredible achievements of our direct sellers, national tour qualifiers, and leaders who converted dedication into luxury.
          </p>
          <div className="mt-8 flex flex-col items-center bg-white dark:bg-gray-900 rounded-lg shadow-lg p-4 max-w-md mx-auto">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">My Life Change</h2>
            <div className="aspect-w-16 aspect-h-9 w-full">
              <iframe
                src="https://www.youtube.com/embed/JwfMyDEOqEY"
                title="My Life Change"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-md"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* Tour & Incentive Details */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          
          <div>
            <span className="text-primary font-black text-xs uppercase tracking-widest bg-primary/10 px-4 py-2 rounded-full inline-block mb-4">
              Tour Incentives
            </span>
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
              Eagles Travel Club: National & Global Destinations
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-6 font-light">
              We believe in rewarding your dedication with unforgettable premium leisure trips. As you complete matched pairing targets with your Left and Right teams, you gain automatic free travel ticket vouchers:
            </p>
            
            <div className="space-y-6">
              {[
                { title: "Domestic Retreat Vouchers", desc: "Qualify by completing 50 pairs of joining kits (60PV) in a quarter. Includes luxury resort stays in Goa or Ooty." },
                { title: "International Explorers Pass", desc: "Qualify by completing 150 pairs of joining kits in a calendar year. Includes luxury trips to Dubai, Thailand, or Malaysia." },
                { title: "Eagles Elite Leadership Forums", desc: "Fully funded VIP flights and stays at senior council training academies for Diamond performers." }
              ].map((item, idx) => (
                <div key={idx} className="bg-gray-50 dark:bg-gray-900/60 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                    <Compass className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-base mb-1">{item.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary to-yellow-600 rounded-[3.5rem] p-1 md:p-2 shadow-2xl">
            <div className="bg-white dark:bg-gray-900 rounded-[3.3rem] p-10 md:p-14 text-center">
              <Sparkles className="w-12 h-12 text-primary mx-auto mb-6 animate-bounce" />
              <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-4">Tour Qualification Status</h3>
              <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                Tour qualifiers are calculated based on active matching pairs within set periods. Ensure matching 60PV cycle sets to claim your travel ticket voucher cards!
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-black/40 p-4 rounded-xl text-center">
                  <div className="text-2xl font-black text-primary">3,400+</div>
                  <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1">Domestic Qualifiers</div>
                </div>
                <div className="bg-gray-50 dark:bg-black/40 p-4 rounded-xl text-center">
                  <div className="text-2xl font-black text-primary">650+</div>
                  <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1">International Qualifiers</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 5 Photos Separately Grid */}
        <div className="border-t dark:border-gray-800 pt-24">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-primary font-black text-xs uppercase tracking-widest bg-primary/10 px-4 py-2 rounded-full inline-block mb-4">
              Tour Photo Gallery
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
              Eagles Celebration Frames
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Take a closer look at our five celebrated annual leadership trips and mega domestic tour achievements.
            </p>
          </div>

          <div className="space-y-16">
            {TOUR_PHOTOS.map((photo, i) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-16 ${
                  i % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Photo frame */}
                <div className="w-full lg:w-1/2 aspect-video overflow-hidden rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-2xl relative group">
                  <img 
                    src={photo.image} 
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute top-6 left-6 bg-black/60 backdrop-blur-md text-white font-bold text-xs px-4 py-1.5 rounded-full flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-primary" /> {photo.location}
                  </div>
                </div>

                {/* Photo Description details */}
                <div className="w-full lg:w-1/2 space-y-4 text-center lg:text-left">
                  <div className="inline-flex items-center gap-1 text-primary font-extrabold text-xs uppercase tracking-widest">
                    <Star className="w-4 h-4 text-primary fill-primary" /> Photo Frame #{photo.id}
                  </div>
                  <h3 className="text-2xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                    {photo.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed font-light">
                    {photo.description}
                  </p>
                  <div className="w-12 h-1 bg-gradient-to-r from-primary to-amber-500 rounded-full mx-auto lg:mx-0 mt-4" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </section>

      {/* Achievers Gallery Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900/40 border-t border-gray-100 dark:border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary font-black text-xs uppercase tracking-widest bg-primary/10 px-4 py-2 rounded-full inline-block mb-4">
              Gallery & Highlights
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
              EAGLES TEAM ACHIEVERS
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-xl leading-relaxed">
              A visual journey highlighting our training seminars, leadership forums, celebrations, and key community milestones across India.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
            {[
              { id: "All", name: "All Achievers" },
              { id: "Diamond Directors & Above", name: "Diamond Directors & Above" },
              { id: "President Diamond Directors & Above", name: "President Diamond & Above" },
              { id: "Car Achievers", name: "Car Achievers" },
              { id: "House Achievers", name: "House Achievers" },
              { id: "Foreign Trip Achievers", name: "Foreign Trip Achievers" }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-primary border-primary text-black shadow-lg shadow-primary/20 scale-105"
                    : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-750 text-gray-700 dark:text-gray-300 hover:border-primary/30"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-20">
              <p className="text-gray-600 dark:text-gray-400 font-semibold">Loading achievers...</p>
            </div>
          ) : filteredAchievers.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-900 rounded-[2.5rem] p-10 max-w-xl mx-auto shadow-md">
              <Award className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h4 className="text-lg font-bold text-gray-950 dark:text-white mb-2">No Achievers Registered Yet</h4>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Achievers registered in this category by the administrator will be listed here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
              <link href="https://fonts.googleapis.com/css2?family=Playball&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />
              
              {filteredAchievers.map((item) => (
                <div
                  key={item._id ?? item.id}
                  className="relative w-full max-w-sm aspect-[4/5] bg-[#fffdf9] dark:bg-gray-950 border-[6px] md:border-[8px] border-amber-600/20 dark:border-amber-600/10 p-5 md:p-6 rounded-[2rem] shadow-2xl flex flex-col justify-between overflow-hidden text-[#5c4033] dark:text-gray-200 hover:scale-[1.02] transition-transform duration-300 group"
                >
                  {/* Corner Ornaments */}
                  <div className="absolute top-2 left-2 w-12 h-12 border-t-2 border-l-2 border-amber-500/60 rounded-tl-lg pointer-events-none"></div>
                  <div className="absolute top-2 right-2 w-12 h-12 border-t-2 border-r-2 border-amber-500/60 rounded-tr-lg pointer-events-none"></div>
                  <div className="absolute bottom-2 left-2 w-12 h-12 border-b-2 border-l-2 border-amber-500/60 rounded-bl-lg pointer-events-none"></div>
                  <div className="absolute bottom-2 right-2 w-12 h-12 border-b-2 border-r-2 border-amber-500/60 rounded-br-lg pointer-events-none"></div>

                  {/* Golden flourishes */}
                  <div className="absolute top-3 left-3 text-amber-500/40 pointer-events-none">
                    <svg width="24" height="24" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="6">
                      <path d="M10 90 C 10 40, 40 10, 90 10 M10 90 C 10 60, 60 10, 90 10" />
                    </svg>
                  </div>
                  <div className="absolute top-3 right-3 text-amber-500/40 pointer-events-none transform rotate-90">
                    <svg width="24" height="24" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="6">
                      <path d="M10 90 C 10 40, 40 10, 90 10 M10 90 C 10 60, 60 10, 90 10" />
                    </svg>
                  </div>
                  <div className="absolute bottom-3 left-3 text-amber-500/40 pointer-events-none transform -rotate-90">
                    <svg width="24" height="24" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="6">
                      <path d="M10 90 C 10 40, 40 10, 90 10 M10 90 C 10 60, 60 10, 90 10" />
                    </svg>
                  </div>
                  <div className="absolute bottom-3 right-3 text-amber-500/40 pointer-events-none transform rotate-180">
                    <svg width="24" height="24" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="6">
                      <path d="M10 90 C 10 40, 40 10, 90 10 M10 90 C 10 60, 60 10, 90 10" />
                    </svg>
                  </div>

                  {/* Accent Gold Lines */}
                  <div className="absolute top-1 left-1 right-1 bottom-1 border border-amber-500/10 rounded-[1.8rem] pointer-events-none"></div>

                  {/* Diamond Watermark in Background */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04] dark:opacity-[0.07] group-hover:scale-105 transition-transform duration-500">
                    <svg width="75%" height="75%" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
                      <polygon points="50,5 95,35 78,95 22,95 5,35" />
                      <polygon points="50,5 78,95 50,95 22,95 50,5" />
                      <line x1="5" y1="35" x2="95" y2="35" />
                      <line x1="50" y1="5" x2="50" y2="95" />
                      <line x1="22" y1="95" x2="5" y2="35" />
                      <line x1="78" y1="95" x2="95" y2="35" />
                    </svg>
                  </div>

                  {/* Header Section */}
                  <div className="text-center z-10 pt-1">
                    <div className="text-[8px] font-black tracking-widest text-amber-800/60 dark:text-amber-500/60 uppercase mb-1 flex items-center justify-center gap-0.5">
                      <span className="font-extrabold text-amber-900 dark:text-amber-400">ACCSYS</span>
                      <span>INDIA.COM</span>
                    </div>
                    
                    <h4 className="text-[10px] font-bold tracking-[0.15em] text-amber-800 dark:text-amber-500 uppercase font-serif mb-0.5">
                      Certification of Appreciation
                    </h4>
                    
                    <div className="text-lg text-amber-600 dark:text-amber-400 font-semibold leading-none py-1" style={{ fontFamily: "'Playball', cursive" }}>
                      Congratulations
                    </div>
                    
                    <h3 className="text-[11px] md:text-xs font-black tracking-wider text-amber-900 dark:text-amber-300 uppercase font-serif mt-0.5">
                      {item.role === "Diamond Directors & Above" && "OUR NEW DIAMOND DIRECTOR"}
                      {item.role === "President Diamond Directors & Above" && "OUR NEW PRESIDENT DIAMOND DIRECTOR"}
                      {item.role === "Car Achievers" && "OUR NEW CAR ACHIEVER"}
                      {item.role === "House Achievers" && "OUR NEW HOUSE ACHIEVER"}
                      {item.role === "Foreign Trip Achievers" && "OUR NEW FOREIGN TRIP ACHIEVER"}
                      {!["Diamond Directors & Above", "President Diamond Directors & Above", "Car Achievers", "House Achievers", "Foreign Trip Achievers"].includes(item.role) && `OUR NEW ${item.role?.toUpperCase()}`}
                    </h3>
                  </div>

                  {/* Profile Image */}
                  <div className="flex justify-center my-2.5 z-10">
                    <div className="relative w-28 h-36 rounded-xl overflow-hidden border-[3px] border-amber-500/80 shadow-md ring-4 ring-amber-500/15 group-hover:border-amber-400 transition-colors">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  {/* Achiever Info */}
                  <div className="text-center z-10 mb-1">
                    <h2 className="text-sm md:text-base font-bold text-amber-950 dark:text-amber-400 font-serif leading-tight">
                      {item.name}
                    </h2>
                    <p className="text-[10px] md:text-xs font-bold text-amber-800/80 dark:text-gray-400 mt-0.5 font-serif italic">
                      {item.location || "Tamil Nadu, India"}
                    </p>
                    {item.description && (
                      <p className="text-[9px] text-gray-500 dark:text-gray-400 italic max-w-xs mx-auto mt-1 leading-normal line-clamp-2">
                        "{item.description}"
                      </p>
                    )}
                  </div>

                  {/* Footer Section */}
                  <div className="grid grid-cols-3 items-end gap-1 text-center z-10 border-t border-amber-500/20 pt-3 px-1">
                    {/* Date */}
                    <div className="flex flex-col items-center">
                      <span className="text-[9px] md:text-xs font-bold text-gray-700 dark:text-gray-300 border-b border-gray-300 dark:border-gray-700 pb-0.5 w-full text-center">
                        {item.date || new Date(item.createdAt).toLocaleDateString("en-IN")}
                      </span>
                      <span className="text-[7px] font-black tracking-widest text-amber-800 dark:text-amber-500 uppercase mt-0.5">
                        Date
                      </span>
                    </div>

                    {/* Diamond Icon ornament */}
                    <div className="flex justify-center items-center text-amber-500/50 pb-1.5">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polygon points="12,2 22,12 12,22 2,12" fill="currentColor" />
                      </svg>
                    </div>

                    {/* Signature */}
                    <div className="flex flex-col items-center">
                      <div className="h-4 flex items-center justify-center">
                        <svg width="45" height="15" viewBox="0 0 100 30" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-amber-800 dark:text-amber-500 transform -rotate-3">
                          <path d="M10 20 C 30 10, 20 5, 40 15 C 60 25, 50 10, 70 20 C 80 25, 90 5, 95 12" />
                        </svg>
                      </div>
                      <span className="text-[7px] font-black tracking-widest text-amber-800 dark:text-amber-500 uppercase border-t border-gray-300 dark:border-gray-700 pt-0.5 w-full text-center">
                        Signature
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
