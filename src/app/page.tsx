"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { ArrowRight, ShoppingBag, ShieldCheck, TrendingUp, Users } from "lucide-react";

export default function Home() {
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
            <span className="px-5 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white border border-white/20 text-sm font-semibold tracking-wider uppercase mb-8 inline-block shadow-xl">
              Welcome to the Future
            </span>
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
              <Link href="/plans" className="w-full sm:w-auto px-10 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/20 hover:-translate-y-1 transition-all flex items-center justify-center">
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

      {/* CTA Parallax Section */}
      <section className="relative py-40 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-fixed bg-center bg-cover" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')" }}>
          <div className="absolute inset-0 bg-primary/95 mix-blend-multiply z-10" />
        </div>
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-8 tracking-tight">Ready to Transform Your Life?</h2>
          <p className="text-2xl text-white/90 mb-12 font-light">Join thousands of successful earners in our network.</p>
          <Link href="/plans" className="inline-flex items-center justify-center px-10 py-5 bg-white text-primary rounded-full font-bold text-xl hover:bg-gray-50 hover:scale-105 transition-all shadow-2xl">
            Explore Plans
          </Link>
        </div>
      </section>
    </div>
  );
}
