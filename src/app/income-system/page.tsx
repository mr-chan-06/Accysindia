"use client";

import { motion } from "framer-motion";
import { CopySlash, Users, Repeat, Award } from "lucide-react";
import { useState } from "react";

export default function IncomeSystem() {
  const [directReferrals, setDirectReferrals] = useState(5);

  const calculateIncome = () => {
    const directIncome = directReferrals * 500;
    const teamIncome = (directReferrals * 10) * 100;
    const repurchase = (directReferrals * 10) * 50;
    return directIncome + teamIncome + repurchase;
  };

  return (
    <div className="pt-20 min-h-screen bg-white dark:bg-black overflow-hidden relative">
      <div className="bg-gradient-to-br from-primary via-accent-foreground to-black py-32 rounded-b-[4rem] relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-bold tracking-widest uppercase mb-8 inline-block shadow-lg"
          >
            The Power of PV
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tight drop-shadow-xl"
          >
            Our Income System
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-light leading-relaxed"
          >
            A transparent, lucrative compensation plan designed to exponentially reward your direct efforts and team-building capabilities.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-20">
        {/* Income Types */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-40">
          {[
            { icon: Users, title: "Direct Referral", desc: "Earn instant commissions when you personally refer a new active member.", color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20", borderColor: "hover:border-blue-500/50" },
            { icon: CopySlash, title: "Team Income", desc: "Earn PV matching bonus from the balanced volume of your left & right network teams.", color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-900/20", borderColor: "hover:border-emerald-500/50" },
            { icon: Repeat, title: "Repurchase", desc: "Secure monthly residual income dynamically based on team product repurchases.", color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-900/20", borderColor: "hover:border-purple-500/50" },
            { icon: Award, title: "Rewards", desc: "Achieve performance ranks to unlock luxury domestic and exclusive foreign tour packages.", color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-900/20", borderColor: "hover:border-amber-500/50" }
          ].map((type, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-10 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-200/50 dark:shadow-none bg-white dark:bg-gray-900 hover:-translate-y-2 transition-all duration-300 ${type.borderColor} group`}
            >
              <div className={`w-20 h-20 ${type.bg} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                <type.icon className={`w-10 h-10 ${type.color}`} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{type.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">{type.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Interactive Earnings Calculator */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-[3.5rem] p-12 md:p-24 shadow-2xl overflow-hidden relative border border-gray-100 dark:border-gray-800">
          <div className="absolute -top-40 -right-40 w-[40rem] h-[40rem] bg-primary/20 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen pointer-events-none" />
          <div className="absolute -bottom-40 -left-40 w-[40rem] h-[40rem] bg-secondary/20 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen pointer-events-none" />
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight">Income Potential<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Calculator</span></h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-16 leading-relaxed">See how your income grows exponentially as you build your team. Move the slider to project your monthly earnings based on your initial direct referrals.</p>
              
              <div className="mb-12 bg-white dark:bg-black p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-lg">
                <label className="flex justify-between text-xl font-bold text-gray-900 dark:text-white mb-8">
                  <span>Direct Active Referrals</span>
                  <span className="text-primary text-3xl font-black bg-primary/10 px-4 py-1 rounded-xl">{directReferrals}</span>
                </label>
                <input 
                  type="range" 
                  min="1" 
                  max="100" 
                  value={directReferrals} 
                  onChange={(e) => setDirectReferrals(parseInt(e.target.value))}
                  className="w-full h-4 bg-gray-200 dark:bg-gray-800 rounded-full appearance-none cursor-pointer accent-primary outline-none"
                />
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-black p-10 rounded-[2.5rem] shadow-2xl border border-gray-800 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Estimated Monthly Income</div>
                  <div className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-secondary to-yellow-300 drop-shadow-md">
                    ₹{Intl.NumberFormat("en-IN").format(calculateIncome())}
                  </div>
                  <div className="mt-8 text-sm text-gray-500 border-t border-gray-800 pt-6">
                    *This is a projection based on balanced team building and average constant repurchase behavior. Actual earnings may dynamically vary.
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center items-center h-full min-h-[500px]">
              {/* Animated Tree Diagram Mock */}
              <div className="relative w-full max-w-lg aspect-square">
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-gradient-to-br from-primary to-accent-foreground rounded-full flex items-center justify-center text-white font-black text-3xl shadow-2xl shadow-primary/40 z-20 border-4 border-white dark:border-gray-900"
                >
                  YOU
                </motion.div>
                
                {/* Lines */}
                <div className="absolute top-24 left-[20%] right-[20%] h-32 border-t-8 border-l-8 border-r-8 border-primary/20 rounded-t-[4rem] z-10" />
                <div className="absolute top-24 left-1/2 -translate-x-1/2 w-2 h-40 bg-primary/20 z-10" />

                {/* Left Team */}
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="absolute top-[200px] left-[5%] w-24 h-24 bg-gradient-to-br from-secondary to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-2xl shadow-secondary/40 z-20 border-4 border-white dark:border-gray-900"
                >
                  Left
                </motion.div>

                {/* Right Team */}
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="absolute top-[200px] right-[5%] w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-2xl shadow-emerald-500/40 z-20 border-4 border-white dark:border-gray-900"
                >
                  Right
                </motion.div>

                {/* Direct nodes below */}
                {[...Array(7)].map((_, i) => (
                  <motion.div 
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: Math.min(directReferrals / 20, 1) }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="absolute bottom-10 w-12 h-12 bg-gray-200 dark:bg-gray-800 border-4 border-white dark:border-gray-900 rounded-full shadow-lg z-20"
                    style={{ left: `${5 + i * 15}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
