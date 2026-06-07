"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Award, Target, Users, Zap, Heart, Globe, Loader2 } from "lucide-react";
import ImageWithFallback from "@/components/ImageWithFallback";

const FOUNDER_INFO = {
  name: "Mr. V. Hariprakash",
  title: "Founding Director & Visionary",
  image: "/founder.jpg",
  bio: "Mr. V. Hariprakash is the visionary founder of Accsys India, an enterprise dedicated to revolutionizing direct commerce in India. With decades of experience in ethical direct selling and network building, he established Accsys India with a singular mission: to create sustainable wealth for entrepreneurs through transparent, compliant business practices.",
  leadership: "His leadership philosophy centers on integrity, innovation, and inclusion. Under his guidance, Accsys India has grown into a thriving ecosystem with 500+ active members across 48+ centers, generating collective earnings exceeding ₹10 crores. Mr. Hariprakash is committed to mentoring the next generation of leaders and ensuring every team member achieves financial freedom with dignity.",
  vision: "He envisions a future where direct commerce becomes a respected, well-regulated industry that transforms lives and creates genuine economic opportunities for millions of Indians."
};


const COMPANY_VALUES = [
  {
    icon: Heart,
    title: "Integrity",
    description: "Operating with complete transparency and honesty in all business dealings, ensuring trust at every level."
  },
  {
    icon: Target,
    title: "Excellence",
    description: "Pursuing the highest standards in product quality, service delivery, and member support."
  },
  {
    icon: Users,
    title: "Community",
    description: "Building a supportive ecosystem where every member thrives and grows together."
  },
  {
    icon: Globe,
    title: "Compliance",
    description: "Adhering strictly to all Ministry guidelines and national direct selling regulations."
  },
  {
    icon: Award,
    title: "Recognition",
    description: "Celebrating achievements and rewarding matched pairs, qualifiers, and top performers."
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "Continuously evolving our business model to meet market demands and member expectations."
  }
];

const MILESTONES = [
  { year: "2018", event: "Eagles Team Founded by Mr. V. Hariprakash" },
  { year: "2020", event: "Expanded to 10+ Regional Centers across India" },
  { year: "2022", event: "Introduced Digital Platform for Product Management" },
  { year: "2023", event: "Eagles Team Network Formation & Rebranding" },
  { year: "2024", event: "Crossed 500+ Active Members Milestone" },
  { year: "2026", event: "₹10Cr+ Collective Earnings Achievement" }
];

export default function AboutCompany() {
  const [founder, setFounder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [founders, setFounders] = useState<any[]>([]);
  const FALLBACK_FOUNDERS = [
    {
      _id: "founder1",
      name: "Mr. V. Hariprakash",
      role: "Founding Director",
      image: "/founder.jpg",
      description: "Original founder of Accsys India. Leading the organizational transformation into the Eagles Team network."
    },
    {
      _id: "founder2",
      name: "Dr. S. K. Subramanian",
      role: "Corporate Managing Director",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
      description: "Corporate management and compliance expert. Overseeing logistics integrations and Ministry compliance."
    }
  ];
  const displayFounders = founders.length > 0 ? founders : FALLBACK_FOUNDERS;


  useEffect(() => {
    // Try to fetch founder data from API
    fetch("/api/leaders")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const foundingDirector = data.find((l: any) => l.role?.toLowerCase().includes("director"));
          if (foundingDirector) {
            setFounder(foundingDirector);
          }
          // Set founders list (exclude directors if needed)
          const filteredFounders = data.filter((l: any) => !l.role?.toLowerCase().includes("vice"));
          setFounders(filteredFounders);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const displayFounder = founder || FOUNDER_INFO;

  return (
    <div className="bg-white dark:bg-black min-h-screen">
      
      {/* Header */}
      <section className="py-24 bg-gradient-to-br from-primary/10 via-transparent to-yellow-500/5 border-b dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-bold tracking-wider uppercase mb-4 block">Our Story</span>
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
              About ACCSYSINDIA
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
              Building a legacy of ethical direct commerce, sustainable growth, and genuine opportunities for every member of our Eagles Team community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900/40 border-b dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-yellow-500/10 rounded-[3rem] blur-2xl" />
              <div className="relative w-full aspect-square rounded-[3rem] overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl bg-gray-100">
                <ImageWithFallback
                  src={displayFounder.image?.startsWith('/') || displayFounder.image?.startsWith('http') ? displayFounder.image : "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"}
                  fallbackSrc="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt={displayFounder.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="text-primary font-black text-xs uppercase tracking-widest bg-primary/10 px-4 py-2 rounded-full inline-block mb-4">
                Our Founder
              </span>
              <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">
                {displayFounder.name}
              </h2>
              <p className="text-primary font-bold text-lg mb-6 uppercase tracking-wider">{displayFounder.title}</p>
              
              <div className="space-y-6">
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                  {displayFounder.bio}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                  {displayFounder.leadership}
                </p>
                <div className="bg-primary/10 border border-primary/30 rounded-2xl p-6">
                  <p className="text-primary font-semibold italic">
                    "{displayFounder.vision}"
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="text-primary font-black text-xs uppercase tracking-widest bg-primary/10 px-4 py-2 rounded-full inline-block mb-4">
            Our Foundation
          </span>
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
            Core Values & Principles
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed font-light">
            These six pillars guide every decision we make and shape the culture of Accsys India and the Eagles Team.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {COMPANY_VALUES.map((value, idx) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">{value.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Company Milestones */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900/40 border-t border-b dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <span className="text-primary font-black text-xs uppercase tracking-widest bg-primary/10 px-4 py-2 rounded-full inline-block mb-4">
              Our Journey
            </span>
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
              Company Milestones
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed font-light">
              From humble beginnings to a thriving community of 500+ members, here's how we've grown.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {MILESTONES.map((milestone, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="relative pb-12 last:pb-0"
              >
                {idx !== MILESTONES.length - 1 && (
                  <div className="absolute left-8 top-20 w-0.5 h-12 bg-gradient-to-b from-primary/30 to-transparent" />
                )}
                
                <div className="flex gap-8 items-start">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-lg shrink-0 border-4 border-white dark:border-black">
                    {milestone.year.slice(-2)}
                  </div>
                  <div className="flex-1 pt-2">
                    <div className="text-primary font-bold uppercase tracking-wider text-sm mb-1">{milestone.year}</div>
                    <p className="text-gray-700 dark:text-gray-300 text-lg font-semibold leading-relaxed">{milestone.event}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          <div className="bg-gradient-to-br from-primary/10 to-transparent rounded-3xl p-10 border border-primary/20">
            <div className="text-5xl font-black text-primary mb-3">500+</div>
            <p className="text-gray-600 dark:text-gray-400 font-semibold text-lg">Active Members Building Wealth</p>
          </div>
          <div className="bg-gradient-to-br from-primary/10 to-transparent rounded-3xl p-10 border border-primary/20">
            <div className="text-5xl font-black text-primary mb-3">48+</div>
            <p className="text-gray-600 dark:text-gray-400 font-semibold text-lg">Regional Centers Nationwide</p>
          </div>
          <div className="bg-gradient-to-br from-primary/10 to-transparent rounded-3xl p-10 border border-primary/20">
            <div className="text-5xl font-black text-primary mb-3">₹10Cr+</div>
            <p className="text-gray-600 dark:text-gray-400 font-semibold text-lg">Collective Earnings Generated</p>
          </div>
        </motion.div>
      </section>

      {/* Parent Company: Accsys India Founders & Directors */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-primary font-black text-xs uppercase tracking-widest bg-primary/10 px-4 py-2 rounded-full inline-block mb-4">
            Corporate Board
          </span>
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
            Accsys Founders & Directors
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed font-light">
            The visionary corporate officers and compliance directors behind Accsys India's trading registration and logistical supply operations.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-10"><Loader2 className="w-10 h-10 text-primary animate-spin" /></div>
        ) : (
          <div className="flex flex-wrap justify-center gap-10">
            {displayFounders.map((f) => (
              <div
                key={f._id}
                className="w-full md:w-[280px] bg-gray-50 dark:bg-gray-900 rounded-[2rem] p-6 border border-gray-100 dark:border-gray-800 shadow-xl flex flex-col items-center text-center group"
              >
                <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-md mb-4 shrink-0 bg-gray-100">
                  <ImageWithFallback
                    src={f.image?.startsWith('/') || f.image?.startsWith('http') ? f.image : ""}
                    fallbackSrc="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                    alt={f.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-1 group-hover:text-primary transition-colors">{f.name}</h3>
                <span className="text-primary font-bold text-xs uppercase tracking-widest mb-3 bg-primary/10 px-3 py-1 rounded-full">{f.role || "Director"}</span>
                <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed font-semibold">{f.description || "Driving corporate values, ethical trade parameters, and strict national direct selling guidelines compliance."}</p>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
