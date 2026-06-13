"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Award, Target, Users, Zap, Heart, Globe, Loader2, FileText, Download, ExternalLink } from "lucide-react";
import ImageWithFallback from "@/components/ImageWithFallback";

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
  { year: "2018", event: "Eagles Team Founded by Mr. A.B Senthil Kumar" },
  { year: "2020", event: "Expanded to 10+ Regional Centers across India" },
  { year: "2022", event: "Introduced Digital Platform for Product Management" },
  { year: "2023", event: "Eagles Team Network Formation & Rebranding" },
  { year: "2024", event: "Crossed 500+ Active Members Milestone" },
  { year: "2026", event: "₹10Cr+ Collective Earnings Achievement" }
];

function DocumentsList() {
  const [docs, setDocs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/documents")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setDocs(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex justify-center py-10"><Loader2 className="w-10 h-10 text-primary animate-spin" /></div>;
  if (docs.length === 0) return (
    <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-3xl border border-dashed border-gray-200 dark:border-gray-700">
      <p className="text-gray-500 dark:text-gray-400 font-medium italic">No public documents are currently available for download.</p>
    </div>
  );

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {docs.map((doc) => (
        <motion.div
          key={doc._id}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-gray-800 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 transition-all group"
        >
          <div className="flex items-start justify-between mb-6">
            <div className="w-14 h-14 bg-red-100 dark:bg-red-500/10 rounded-2xl flex items-center justify-center text-red-600 dark:text-red-400 shrink-0">
              <FileText className="w-7 h-7" />
            </div>
            <a 
              href={doc.url} 
              download={doc.name}
              className="w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-900 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all shadow-inner"
              title="Download Document"
            >
              <Download className="w-4 h-4" />
            </a>
          </div>
          <h3 className="text-lg font-black text-gray-900 dark:text-white mb-2 line-clamp-1">{doc.name}</h3>
          <div className="flex items-center justify-between mt-auto">
             <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{doc.type.split('/')[1] || "Document"}</span>
             <a 
              href={doc.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary text-xs font-black flex items-center gap-1 hover:underline underline-offset-4"
             >
               View Details <ExternalLink className="w-3 h-3" />
             </a>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function AboutCompany() {
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
          // Set founders list (exclude directors if needed)
          const filteredFounders = data.filter((l: any) => !l.role?.toLowerCase().includes("vice"));
          setFounders(filteredFounders);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="bg-white dark:bg-black min-h-screen">
      
      {/* Hero Section containing Page Header and Founders & Directors */}
      <section className="py-24 bg-gradient-to-br from-primary/10 via-transparent to-yellow-500/5 border-b dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
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

          {loading ? (
            <div className="flex justify-center py-10"><Loader2 className="w-10 h-10 text-primary animate-spin" /></div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="text-center mb-10">
                <span className="text-primary font-black text-xs uppercase tracking-widest bg-primary/10 px-4 py-2 rounded-full inline-block mb-3">
                  Corporate Board
                </span>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                  Accsys Founders & Directors
                </h2>
              </div>
              <div className="flex flex-wrap justify-center gap-8">
                {displayFounders.map((f) => (
                  <div
                    key={f._id}
                    className="w-full md:w-[300px] bg-white/60 dark:bg-gray-900/60 backdrop-blur-md rounded-[2rem] p-6 border border-gray-150 dark:border-gray-800 shadow-xl flex flex-col items-center text-center group hover:border-primary/30 hover:-translate-y-2 transition-all duration-300"
                  >
                    <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-white dark:border-gray-800 shadow-md mb-4 shrink-0 bg-gray-100">
                      <ImageWithFallback
                        src={f.image?.startsWith('/') || f.image?.startsWith('http') || f.image?.startsWith('data:') ? f.image : ""}
                        fallbackSrc="/founder.jpg"
                        alt={f.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <h3 className="text-lg font-black text-gray-900 dark:text-white mb-1 group-hover:text-primary transition-colors">{f.name}</h3>
                    <span className="text-primary font-bold text-[10px] uppercase tracking-widest mb-3 bg-primary/10 px-3 py-1 rounded-full">{f.role || "Director"}</span>
                    <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed font-semibold">{f.description || "Driving corporate values, ethical trade parameters, and strict national direct selling guidelines compliance."}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
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

      {/* Corporate Documents Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900/40 border-t border-b dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-primary font-black text-xs uppercase tracking-widest bg-primary/10 px-4 py-2 rounded-full inline-block mb-4">
              Transparency
            </span>
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
              Corporate Documents
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed font-light">
              Official registration certificates, legal filings, and compliance documents for Accsys India and Eagles Team operations.
            </p>
          </div>

          <DocumentsList />

          <div className="mt-16 text-center">
            <a 
              href="https://accsysindia.in/compliance_documents" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-gray-800 text-primary font-bold rounded-2xl border border-primary/20 hover:bg-primary hover:text-white transition-all shadow-lg hover:shadow-primary/20 group"
            >
              For more Documents
              <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
