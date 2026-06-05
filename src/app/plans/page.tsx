"use client";

import { motion } from "framer-motion";
import { 
  Check, Loader2, Calculator, Sparkles, HelpCircle, Layers,
  Zap, Users, GitFork, RefreshCw, Award, TrendingUp, ArrowRight
} from "lucide-react";
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
  
  // Dashboard & Strategy State
  const [activeIncomeTab, setActiveIncomeTab] = useState("direct");
  const [activeIdStrategy, setActiveIdStrategy] = useState("1id");

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
            Accsysindia Income Plan
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
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all ${
                    activeIncomeTab === tab.id
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
                      *Your 1st week income will be released with a tail of min 60 PV. That is, a 1:2 or 2:1 active package matching count. Subsequent payouts process on a pure 1:1 balance.
                    </p>
                  </div>

                  <div className="border-t dark:border-gray-800 pt-6">
                    <div className="flex items-center gap-4 text-3xl font-black text-gray-900 dark:text-white">
                      <span>Payout:</span>
                      <span className="text-primary">₹600*</span>
                      <span className="text-sm text-gray-400 font-normal uppercase">per matched 60PV Cycle</span>
                    </div>
                  </div>
                </div>

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
                          <span className="font-bold text-gray-950 dark:text-white block">Team Referral Payout:</span>
                          <span className="text-sm text-gray-500 font-semibold">1 PV Left & 1 PV Right matched = ₹10. So 600 PV matched (10 Left & 10 Right IDs) pays exactly ₹6,000.</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                        <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-gray-950 dark:text-white block">Carry Forward System:</span>
                          <span className="text-sm text-gray-500 font-semibold">If you have 3000 PV (50 IDs) on the Left and 2400 PV (40 IDs) on the Right, you match 2400 PV to earn ₹24,000. The remaining 600 PV will be carried forward to next week.</span>
                        </div>
                      </div>
                    </div>
                  </div>

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
                          max="50" 
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
                          max="50" 
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
                            {leftIDs > rightIDs ? `${(leftIDs - rightIDs) * 60} PV Left` : rightIDs > leftIDs ? `${(rightIDs - leftIDs) * 60} PV Right` : "Balanced"}
                          </span>
                        </div>

                        <div className="pt-2">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider flex items-center gap-1">
                              <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" /> Income
                            </span>
                            <div className="text-right">
                              <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-400">
                                ₹{minEarning.toLocaleString()} - ₹{maxEarning.toLocaleString()}
                              </div>
                              <span className="text-[8px] text-gray-400 font-bold uppercase tracking-wider block">Estimated weekly payout</span>
                            </div>
                          </div>
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
                      className={`px-6 py-4 rounded-2xl transition-all border text-left flex flex-col justify-center min-w-[160px] ${
                        activeIdStrategy === strat.id
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
                        <li className="flex items-center gap-2 text-sm font-semibold text-gray-750 dark:text-gray-300">
                          <Check className="w-4 h-4 text-emerald-500" /> Same efforts, dramatically higher incomes
                        </li>
                        <li className="flex items-center gap-2 text-sm font-semibold text-gray-750 dark:text-gray-300">
                          <Check className="w-4 h-4 text-emerald-500" /> Each individual ID is capped at ₹60,000/week
                        </li>
                        <li className="flex items-center gap-2 text-sm font-semibold text-gray-750 dark:text-gray-300">
                          <Check className="w-4 h-4 text-emerald-500" /> Limitless potential with more active direct lines
                        </li>
                      </ul>
                    </div>
                  </div>

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

                <div className="bg-gray-50 dark:bg-gray-900 rounded-[3rem] p-10 border border-gray-100 dark:border-gray-800 flex flex-col justify-between min-h-[350px]">
                  <div>
                    <h4 className="text-lg font-black text-gray-950 dark:text-white mb-2">Monthly Limits & Caps</h4>
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

                    <div className="bg-white dark:bg-black p-5 rounded-2xl border border-gray-100 dark:border-gray-800 space-y-3 shadow-inner">
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

                    <div className="bg-white dark:bg-black p-5 rounded-2xl border border-gray-100 dark:border-gray-800 space-y-3 shadow-inner">
                      <div className="flex justify-between text-xs font-semibold text-gray-500">
                        <span>Weekly Payout:</span>
                        <span className="text-gray-900 dark:text-white font-bold">₹60,000</span>
                      </div>
                      <div className="flex justify-between text-xs font-semibold text-gray-500">
                        <span>Monthly Income:</span>
                        <span className="text-gray-900 dark:text-white font-bold">₹2,40,000</span>
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

    </div>
  );
}
