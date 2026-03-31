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
    <div className="pt-20 bg-white dark:bg-black min-h-screen">
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
      <section className="py-32 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Leadership Team</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">The visionaries and driving force behind ACCSYSINDIA.</p>
          </div>
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
            </div>
          ) : leaders.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-12">
              {leaders.map((leader, index) => (
                <motion.div 
                  key={leader._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="group"
                >
                  <div className="relative overflow-hidden rounded-[2rem] mb-6 aspect-[4/5] bg-gray-200 dark:bg-gray-800 shadow-xl">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                      <p className="text-white text-base font-medium leading-relaxed">{leader.description || `"Empowering the next generation of digital leaders."`}</p>
                    </div>
                    {leader.image && leader.image.startsWith('15') ? (
                      <img src={`https://images.unsplash.com/photo-${leader.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`} alt={leader.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    ) : (
                      <img src={leader.image} alt={leader.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    )}
                  </div>
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{leader.name}</h3>
                    <p className="text-primary font-semibold text-lg">{leader.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-10 text-lg">
              Leadership profiles are currently being updated.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
