"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Target, History, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function About() {
  const [leaders, setLeaders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const res = await fetch("/api/leaders");
        if (res.ok) {
          const data = await res.json();
          setLeaders(data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaders();
  }, []);

  return (
    <div className="bg-white dark:bg-black min-h-screen">
      {/* Hero */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900 border-b dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6"
          >
            About <span className="text-primary">ACCSYSINDIA</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-light leading-relaxed"
          >
            Empowering entrepreneurs through smart digital commerce since 2018. We are committed to delivering premium quality products and unparalleled income opportunities.
          </motion.p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-primary/5 p-12 rounded-[2.5rem] border border-primary/10"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-8">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Our Vision</h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                To become the most trusted and fastest-growing digital commerce platform in India. We aim to create a network of self-reliant entrepreneurs operating across every corner of the country, powered by ethical business practices and modern technology.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-secondary/10 p-12 rounded-[2.5rem] border border-secondary/10"
            >
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-8">
                <History className="w-8 h-8 text-secondary" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Our Mission</h2>
              <ul className="space-y-5">
                {[
                  "Provide premium quality products at the most competitive prices.",
                  "Offer a transparent, compliant, and highly profitable referral income model.",
                  "Build a strong, educated community of motivated leaders.",
                  "Ensure 100% customer and distributor satisfaction at all times."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <CheckCircle2 className="w-7 h-7 text-secondary shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300 text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leadership Team Showcase */}
      <section className="py-20 border-[12px] border-double border-[#D4AF37] bg-black shadow-2xl relative overflow-hidden">
        {/* Subtle decorative background touches similar to reference edges */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 skew-x-12 -translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 skew-x-12 translate-x-16 translate-y-16"></div>

        <div className="max-w-[1400px] mx-auto px-4 relative z-10">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-10 h-10 text-[#FFDF00] animate-spin" />
            </div>
          ) : (
            <>
              {/* Founders and Directors Section */}
              <div className="flex justify-center mb-16 relative">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent -translate-y-1/2"></div>
                <div className="bg-black relative z-10 px-10 py-4 rounded-[3rem] shadow-[0_0_15px_rgba(212,175,55,0.3)] border border-[#332b10]">
                  <h2 className="text-3xl md:text-5xl lg:text-5xl font-black text-[#FFDF00] uppercase tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,1)] flex items-center gap-4 text-center">
                    ACCSYS FOUNDERS AND DIRECTORS
                  </h2>
                </div>
              </div>

              {leaders.filter(l => !l.role?.toLowerCase().includes('vice')).length > 0 ? (
                <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8">
                  {leaders.filter(l => !l.role?.toLowerCase().includes('vice')).map((leader) => (
                    <div
                      key={leader._id}
                      className="w-20 sm:w-24 md:w-28 flex flex-col items-center group cursor-pointer"
                    >
                      <div className="w-full relative overflow-hidden bg-black border border-[#fff7d6] p-0.5 shadow-[0_0_8px_rgba(255,223,0,0.15)] mb-2 aspect-[3/4] transition-transform duration-300 group-hover:scale-105 group-hover:border-[#FFDF00]">
                        {leader.image && leader.image.startsWith('15') ? (
                          <img src={`https://images.unsplash.com/photo-${leader.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`} alt={leader.name} className="w-full h-full object-cover" />
                        ) : (
                          <img src={leader.image} alt={leader.name} className="w-full h-full object-cover"
                            onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" }}
                          />
                        )}
                      </div>
                      <div className="w-full flex items-center justify-center relative">
                        <h3 className="text-[#FFDF00] font-bold text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-wider text-center truncate px-1">
                          {leader.name}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-[#D4AF37] py-8 text-lg font-medium">
                  Founders / Directors profiles are currently being updated.
                </div>
              )}

              {/* Vice Presidents Section */}
              <div className="flex justify-center mt-24 mb-16 relative">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent -translate-y-1/2"></div>
                <div className="bg-black relative z-10 px-10 py-4 rounded-[3rem] shadow-[0_0_15px_rgba(212,175,55,0.3)] border border-[#332b10]">
                  <h2 className="text-3xl md:text-5xl lg:text-5xl font-black text-[#FFDF00] uppercase tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,1)] flex items-center gap-4 text-center">
                    ACCSYS VICE PRESIDENTS
                  </h2>
                </div>
              </div>

              {leaders.filter(l => l.role?.toLowerCase().includes('vice')).length > 0 ? (
                <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8">
                  {leaders.filter(l => l.role?.toLowerCase().includes('vice')).map((leader) => (
                    <div
                      key={leader._id}
                      className="w-20 sm:w-24 md:w-28 flex flex-col items-center group cursor-pointer"
                    >
                      <div className="w-full relative overflow-hidden bg-black border border-[#fff7d6] p-0.5 shadow-[0_0_8px_rgba(255,223,0,0.15)] mb-2 aspect-[3/4] transition-transform duration-300 group-hover:scale-105 group-hover:border-[#FFDF00]">
                        {leader.image && leader.image.startsWith('15') ? (
                          <img src={`https://images.unsplash.com/photo-${leader.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`} alt={leader.name} className="w-full h-full object-cover" />
                        ) : (
                          <img src={leader.image} alt={leader.name} className="w-full h-full object-cover"
                            onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" }}
                          />
                        )}
                      </div>
                      <div className="w-full flex items-center justify-center relative">
                        <h3 className="text-[#FFDF00] font-bold text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-wider text-center truncate px-1">
                          {leader.name}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-[#D4AF37] py-8 text-lg font-medium">
                  Vice President profiles are currently being updated.
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
