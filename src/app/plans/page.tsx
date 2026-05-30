"use client";

import { motion } from "framer-motion";
import { Check, Loader2, Calculator, Sparkles, HelpCircle, Layers } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

const PLAYFUL_COLORS = [
  "from-green-500 to-emerald-700",
  "from-blue-500 to-indigo-700",
  "from-pink-500 to-rose-700"
];

const DEFAULT_PLANS = [
  {
    _id: "plan1",
    name: "Bronze Starter",
    pv: 60,
    price: 4500,
    popular: false,
    description: "Ideal for beginners entering direct commerce. Includes a premium 60PV joining kit of choice.",
    benefits: [
      "Access to premium 60PV Joining Kits",
      "Retail margin privileges up to 15%",
      "Eagles Academy starter webinars",
      "Standard binary cycle matches eligibility",
      "Direct logistics delivery across India"
    ]
  },
  {
    _id: "plan2",
    name: "Gold Executive",
    pv: 120,
    price: 8500,
    popular: true,
    description: "Our highly recommended executive pack. Double PV point values for faster pair matches.",
    benefits: [
      "Access to premium 120PV Joining Kits",
      "Expanded retail margins up to 25%",
      "Priority Eagles Academy leadership circles",
      "Accelerated binary pair cycle payouts",
      "Direct support from regional Vice Presidents",
      "Compliant with Startup India direct selling rules"
    ]
  },
  {
    _id: "plan3",
    name: "Diamond Leader",
    pv: 240,
    price: 16000,
    popular: false,
    description: "For serious leaders building high-volume passive streams. Quadruple PV point power.",
    benefits: [
      "Access to elite 240PV Joining Kits",
      "Maximum retail margins up to 35%",
      "VIP seat tickets at annual Eagles summits",
      "Uncapped binary pairing commission ceilings",
      "Qualify for international achiever tours",
      "Private founder mentorship channels"
    ]
  }
];

export default function Plans() {
  const [dbPlans, setDbPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Calculator State
  const [leftIDs, setLeftIDs] = useState(20);
  const [rightIDs, setRightIDs] = useState(20);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch("/api/plans");
        if (res.ok) {
          const data = await res.json();
          setDbPlans(data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  const plans = dbPlans.length > 0 ? dbPlans : DEFAULT_PLANS;

  // Binary calculations:
  // 1 ID = 60PV
  // Payout formula: matching 20 Left IDs & 20 Right IDs generates matching income of ₹5,400 to ₹6,000.
  // Payout per matched ID pairing: between ₹270 to ₹300.
  const totalLeftPV = leftIDs * 60;
  const totalRightPV = rightIDs * 60;
  const matchedPairs = Math.min(leftIDs, rightIDs);
  
  const minEarning = matchedPairs * 270;
  const maxEarning = matchedPairs * 300;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black border-t dark:border-gray-800">
      
      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-primary font-bold tracking-wider uppercase mb-4 block">Joining Portals</span>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight">
            Privilege Membership Packages
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Choose your perfect entry package to enter the **Eagles Team** digital network. All starters instantly gain Point Values (PV) to begin matches.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-32">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8 mt-24 max-w-6xl mx-auto">
            {plans.map((plan, i) => {
              const color = PLAYFUL_COLORS[i % PLAYFUL_COLORS.length];
              return (
                <motion.div
                  key={plan._id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className={`relative bg-white dark:bg-gray-900 rounded-[2.5rem] p-10 border ${plan.popular ? 'border-primary shadow-2xl shadow-primary/20 scale-105 z-10' : 'border-gray-200 dark:border-gray-800 shadow-xl'} flex flex-col items-center hover:-translate-y-2 transition-transform duration-300`}
                >
                  {plan.popular && (
                    <div className="absolute -top-5 bg-gradient-to-r from-primary to-yellow-500 text-black px-6 py-2 rounded-full text-sm font-bold tracking-wider uppercase shadow-lg">
                      Highly Popular
                    </div>
                  )}
                  <div className={`w-24 h-24 rounded-[2rem] bg-gradient-to-br ${color} mb-8 flex items-center justify-center text-white font-extrabold text-3xl shadow-xl`}>
                    {plan.pv} <span className="text-lg ml-1 font-medium">PV</span>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 text-center">{plan.description}</p>
                  
                  <div className="flex items-baseline gap-1 mb-10 pb-8 border-b border-gray-100 dark:border-gray-800 w-full justify-center">
                    <span className="text-5xl font-extrabold text-gray-900 dark:text-white">₹{plan.price}</span>
                  </div>

                  <ul className="space-y-5 mb-10 w-full">
                    {plan.benefits?.map((feature: string, j: number) => (
                      <li key={j} className="flex items-start gap-4 text-left">
                        <div className={`p-1.5 rounded-full mt-1 shrink-0 ${plan.popular ? "bg-primary/20" : "bg-gray-100 dark:bg-gray-800"}`}>
                          <Check className={`w-4 h-4 ${plan.popular ? "text-primary" : "text-gray-600 dark:text-gray-400"}`} />
                        </div>
                        <span className="text-gray-700 dark:text-gray-300 font-semibold text-base leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className={`mt-auto block text-center w-full py-5 rounded-2xl font-bold text-xl transition-all shadow-lg ${plan.popular
                      ? "bg-gradient-to-r from-primary to-yellow-500 text-black"
                      : "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                    }`}>
                    {plan.name}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Extended Binary Income matching rules section */}
      <section className="py-24 bg-white dark:bg-gray-950 border-t border-b border-gray-100 dark:border-gray-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <div>
              <span className="text-primary font-black text-xs uppercase tracking-widest bg-primary/10 px-4 py-2 rounded-full inline-block mb-4">
                Binary Matching System
              </span>
              <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
                How Eagles Matching Cycles Multiply Payouts
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-6 font-light">
                Our business operates on a highly transparent binary structure. When you register, you establish a <strong>Left Team</strong> and a <strong>Right Team</strong>. As your network grows, you qualify for matching pairing bonuses:
              </p>
              
              <ul className="space-y-4">
                {[
                  "Each basic starter kit is worth exactly 60PV.",
                  "Matching rewards are processed per cycle match of Left and Right PV values.",
                  "2*60L and 2*60R (120PV Left matching with 120PV Right) forms matching pairing blocks.",
                  "For a balanced group size of 20 Left IDs & 20 Right IDs, your matching pairing commissions scale to a stellar ₹5,400 to ₹6,000!"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300 font-semibold">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Interactive Matching Calculator Panel */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-[3rem] p-10 border border-gray-100 dark:border-gray-800 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
              
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <Calculator className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white">Matching Calculator</h3>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Eagles Pair Cycle Income estimator</p>
                </div>
              </div>

              <div className="space-y-8">
                {/* Left IDs Slider */}
                <div>
                  <div className="flex justify-between font-bold text-sm text-gray-700 dark:text-gray-300 mb-2">
                    <span>Left Team Active IDs (60PV)</span>
                    <span className="text-primary">{leftIDs} IDs ({totalLeftPV} PV)</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="50" 
                    value={leftIDs}
                    onChange={(e) => setLeftIDs(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>

                {/* Right IDs Slider */}
                <div>
                  <div className="flex justify-between font-bold text-sm text-gray-700 dark:text-gray-300 mb-2">
                    <span>Right Team Active IDs (60PV)</span>
                    <span className="text-primary">{rightIDs} IDs ({totalRightPV} PV)</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="50" 
                    value={rightIDs}
                    onChange={(e) => setRightIDs(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>

                {/* Calculations Output */}
                <div className="bg-white dark:bg-black p-6 rounded-2xl border border-gray-100 dark:border-gray-800 space-y-4">
                  <div className="flex justify-between text-sm text-gray-500 font-semibold">
                    <span className="flex items-center gap-1.5"><Layers className="w-4 h-4" /> Matches Formed</span>
                    <span className="text-gray-900 dark:text-white font-bold">{matchedPairs} Pairs</span>
                  </div>

                  <div className="border-t dark:border-gray-800 my-2 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-primary animate-pulse" /> Projected Matching Income
                      </span>
                      <div className="text-right">
                        <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-400">
                          ₹{minEarning.toLocaleString()} - ₹{maxEarning.toLocaleString()}
                        </div>
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">INR MATCHING Payout</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interactive Highlight */}
                {matchedPairs === 20 && (
                  <div className="bg-primary/10 border border-primary/20 p-4 rounded-xl text-center text-xs font-bold text-primary animate-pulse">
                    🔥 TARGET MATCH MET: 20 Left & 20 Right matching yields exactly ₹5,400 to ₹6,000 cycle matching commission! Compliant & balanced.
                  </div>
                )}

              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
