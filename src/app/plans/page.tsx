"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Grocery Kit",
    price: 6500,
    pv: 100,
    color: "from-green-500 to-emerald-700",
    features: ["Premium Monthly Groceries", "100 PV Credit", "10% Discount on Add-ons", "Free Home Delivery"],
    popular: true
  },
  {
    name: "Health Kit",
    price: 4500,
    pv: 75,
    color: "from-blue-500 to-indigo-700",
    features: ["Immunity Boosters", "75 PV Credit", "Health Supplements", "Diet Plan Consultation"],
    popular: false
  },
  {
    name: "Women Care",
    price: 3500,
    pv: 50,
    color: "from-pink-500 to-rose-700",
    features: ["Premium Cosmetics", "50 PV Credit", "Personal Care Items", "Beauty Guidance"],
    popular: false
  }
];

export default function Plans() {
  return (
    <div className="pt-20 min-h-screen bg-gray-50 dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <motion.div
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-primary font-bold tracking-wider uppercase mb-4 block">Get Started Today</span>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight">Membership Kits</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">Choose the perfect entry kit to start your digital commerce journey. Earn PV points instantly upon joining the network.</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mt-24 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className={`relative bg-white dark:bg-gray-900 rounded-[2.5rem] p-10 border ${plan.popular ? 'border-secondary shadow-2xl shadow-secondary/20 scale-105 z-10' : 'border-gray-200 dark:border-gray-800 shadow-xl'} flex flex-col items-center hover:-translate-y-2 transition-transform duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-5 bg-gradient-to-r from-secondary to-yellow-500 text-white px-6 py-2 rounded-full text-sm font-bold tracking-wider uppercase shadow-lg">
                  Most Popular
                </div>
              )}
              <div className={`w-24 h-24 rounded-[2rem] bg-gradient-to-br ${plan.color} mb-8 flex items-center justify-center text-white font-extrabold text-3xl shadow-xl`}>
                {plan.pv} <span className="text-lg ml-1 font-medium">PV</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-10 pb-8 border-b border-gray-100 dark:border-gray-800 w-full justify-center">
                <span className="text-5xl font-extrabold text-gray-900 dark:text-white">₹{plan.price}</span>
              </div>

              <ul className="space-y-5 mb-10 w-full">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-4 text-left">
                    <div className={"p-1.5 rounded-full " + (plan.popular ? "bg-secondary/10" : "bg-primary/10")}>
                      <Check className={"w-5 h-5 " + (plan.popular ? "text-secondary" : "text-primary")} />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 font-semibold text-lg">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-5 rounded-2xl font-bold text-xl transition-all shadow-lg ${
                plan.popular 
                  ? "bg-gradient-to-r from-secondary to-yellow-500 text-white hover:shadow-secondary/40 hover:-translate-y-1" 
                  : "bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-primary dark:hover:bg-primary hover:text-white"
              }`}>
                Join with {plan.name}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
