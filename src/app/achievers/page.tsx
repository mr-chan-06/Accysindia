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
          <div className="text-center max-w-3xl mx-auto mb-20">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {loading ? (
                <p className="text-center text-gray-600 dark:text-gray-400">Loading achievers...</p>
              ) : (
                achievers.map((item) => (
                  <div
                    key={item._id ?? item.id}
                    className="bg-white dark:bg-gray-800 rounded-[2rem] shadow-xl shadow-gray-200/40 dark:shadow-none border border-gray-100 dark:border-gray-700/50 overflow-hidden group hover:border-primary/20 transition-all flex flex-col justify-between"
                  >
                    <div className="w-full aspect-video sm:aspect-[4/3] overflow-hidden relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-4 right-4 z-10 px-2.5 py-0.5 bg-black/45 backdrop-blur-md rounded-full text-[10px] text-white/95 font-bold uppercase tracking-wider">
                        Eagles Team
                      </div>
                    </div>

                    <div className="p-8 flex-1 flex flex-col justify-between bg-gradient-to-b from-white to-gray-50/30 dark:from-gray-800 dark:to-gray-900/10">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-1 group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-3 font-light">
                          {item.description}
                        </p>
                      </div>
                      <div className="w-8 h-1 bg-gradient-to-r from-primary to-amber-500 rounded-full mt-6 group-hover:w-16 transition-all duration-300" />
                    </div>
                  </div>
                ))
              )}

            </div>
        </div>
      </section>
    </div>
  );
}
