"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { ArrowRight, ShoppingBag, ShieldCheck, TrendingUp, Users } from "lucide-react";

const FALLBACK_PHOTOS = [
  {
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    title: "Leadership Seminars",
    description: "Empowering our members with extensive leadership and marketing training sessions.",
  },
  {
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    title: "Team Collaboration",
    description: "Fostering synergy and joint business growth opportunities nationwide.",
  },
  {
    image: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    title: "Annual Rewards Meet",
    description: "Honoring outstanding accomplishments, awards, and milestones of our top achievers.",
  },
  {
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    title: "Corporate Strategy Sessions",
    description: "Laying solid strategic roadmaps for the upcoming digital commerce eras.",
  },
  {
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    title: "Celebration & Joy",
    description: "Celebrating combined milestones, teamwork success, and strong community building.",
  },
  {
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    title: "Eagles Academy Classes",
    description: "Delivering business principles and continuous learning directly from senior founders.",
  },
  {
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    title: "Community Outreach",
    description: "Connecting hearts, creating positive community footprints, and empowering families.",
  },
  {
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    title: "Digital Commerce Innovations",
    description: "Harnessing the power of the internet and direct commerce platforms for steady income.",
  },
];

export default function Home() {
  const [gallery, setGallery] = useState<any[]>([]);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch("/api/gallery");
        if (res.ok) {
          const data = await res.json();
          setGallery(data);
        }
      } catch (e) {
        console.error("Failed to load gallery", e);
      }
    };
    fetchGallery();
  }, []);

  const galleryItems = Array.from({ length: 8 }, (_, i) => {
    const slotNum = i + 1;
    const customPhoto = gallery.find((p) => p.slot === slotNum);
    return {
      slot: slotNum,
      image: customPhoto?.image || FALLBACK_PHOTOS[i].image,
      title: customPhoto?.title || FALLBACK_PHOTOS[i].title,
      description: customPhoto?.description || FALLBACK_PHOTOS[i].description,
      isCustom: !!customPhoto,
    };
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Business Background" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight mb-8">
              Grow Your Income with <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-yellow-300 drop-shadow-lg">
                Smart Digital Commerce
              </span>
            </h1>
            <p className="text-lg md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
              Join the fastest-growing network of entrepreneurs. Get access to premium products and build a lucrative referral business today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="https://accsysindia.in/" target="_blank" rel="noreferrer" className="w-full sm:w-auto px-10 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/20 hover:-translate-y-1 transition-all flex items-center justify-center">
                Explore Plans
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white dark:bg-black relative z-20 -mt-16 rounded-t-[3rem] shadow-[0_-20px_40px_rgba(0,0,0,0.1)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { label: "Crore+ Turnover", value: 5000, prefix: "₹" },
              { label: "Premium Products", value: 10000, suffix: "+" },
              { label: "Active Centers", value: 300, suffix: "+" },
              { label: "Happy Members", value: 100, suffix: "k+" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <h3 className="text-5xl md:text-6xl font-extrabold text-primary mb-3 drop-shadow-sm">
                  <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </h3>
                <p className="text-gray-500 dark:text-gray-400 font-semibold text-lg">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-32 bg-gray-50 dark:bg-gray-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">Why Choose ACCSYSINDIA?</h2>
            <p className="text-gray-600 dark:text-gray-400 text-xl leading-relaxed">We provide a comprehensive ecosystem designed for your financial growth and personal success.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              { icon: ShieldCheck, title: "Membership Benefits", desc: "Unlock exclusive discounts, premium kits, and direct access to high-quality products." },
              { icon: ShoppingBag, title: "Product Categories", desc: "From grocery to garments, shop across diverse categories with assured quality." },
              { icon: TrendingUp, title: "Income Opportunities", desc: "Earn through direct referrals, team building, and repurchase commissions." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700 hover:border-primary/30 transition-all group"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-primary/20 transition-all">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-24 bg-white dark:bg-black relative z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900/40 dark:to-black rounded-[3rem] p-8 md:p-14 shadow-2xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800 relative overflow-hidden group">
            {/* Decorative blob */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-700" />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-56 h-56 md:w-72 md:h-72 shrink-0 rounded-full overflow-hidden border-8 border-white dark:border-gray-800 shadow-2xl relative z-10"
            >
              <img 
                src="/founder.jpg" 
                alt="Mr.V.Hariprakash" 
                className="w-full h-full object-cover object-top hover:scale-110 transition-transform duration-700"
                onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" }}
              />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center md:text-left flex-1 relative z-10"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm tracking-widest uppercase mb-6 shadow-sm">
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-primary/20 bg-black flex items-center justify-center shrink-0">
                  <img src="/eagles-logo.png" alt="Eagles Logo" className="w-full h-full object-contain" />
                </div>
                <span>Team Founder</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-3 tracking-tight">
                Mr. V. Hariprakash
              </h2>
              <div className="w-16 h-1.5 bg-gradient-to-r from-primary to-yellow-400 rounded-full mx-auto md:mx-0 mb-6" />
              <h3 className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-6 drop-shadow-sm">
                Founder
              </h3>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-light">
                Leading with vision and dedication, to empower individuals toward financial independence and personal growth. His commitment to excellence drives the core values of our platform.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 8-Photo Frame Grid Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900/40 relative z-20 border-t border-b border-gray-100 dark:border-gray-800/50">
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
            {galleryItems.map((item, i) => (
              <motion.div
                key={item.slot}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-[2rem] shadow-xl shadow-gray-200/40 dark:shadow-none border border-gray-100 dark:border-gray-700/50 overflow-hidden group hover:border-primary/20 transition-all flex flex-col justify-between"
              >
                <div className="w-full aspect-video sm:aspect-[4/3] overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 animate-in fade-in"
                  />
                  {/* Subtle Slot Indicator */}
                  <div className="absolute top-4 right-4 z-10 px-2.5 py-0.5 bg-black/40 backdrop-blur-md rounded-full text-[10px] text-white/95 font-bold uppercase tracking-wider">
                    {item.isCustom ? "Verified Highlight" : "Eagles Team"}
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col justify-between bg-gradient-to-b from-white to-gray-50/30 dark:from-gray-800 dark:to-gray-900/10">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-1 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                  {/* Visual card accent line */}
                  <div className="w-8 h-1 bg-gradient-to-r from-primary to-amber-500 rounded-full mt-6 group-hover:w-16 transition-all duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Parallax Section */}
      <section className="relative py-40 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-fixed bg-center bg-cover" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')" }}>
          <div className="absolute inset-0 bg-primary/95 mix-blend-multiply z-10" />
        </div>
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-8 tracking-tight">Ready to Transform Your Life?</h2>
          <p className="text-2xl text-white/90 mb-12 font-light">Join thousands of successful earners in our network.</p>
          <Link href="https://accsysindia.in/" target="_blank" className="inline-flex items-center justify-center px-10 py-5 bg-white text-primary rounded-full font-bold text-xl hover:bg-gray-50 hover:scale-105 transition-all shadow-2xl">
            Explore Plans
          </Link>
        </div>
      </section>
    </div>
  );
}
