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
  const [vps, setVPs] = useState<any[]>([]);
  const FALLBACK_FOUNDERS = [
    {
      _id: "founder1",
      name: "Mr. V. Hariprakash",
      role: "Founder Director",
      image: "/founder.jpg",
      description: "Original founder of Accsys India. Leading the organizational transformation into the Eagles Team network."
    },
    {
      _id: "founder2",
      name: "Dr. S. K. Subramanian",
      role: "MD&CEO",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
      description: "Corporate management and compliance expert. Overseeing logistics integrations and Ministry compliance."
    }
  ];
  const displayFounders = founders.length > 0 ? founders : FALLBACK_FOUNDERS;
  const displayVPs = vps;

  const founderDirectors = displayFounders.filter((f) => f.role?.toLowerCase() === "founder director");
  const mdCeos = displayFounders.filter((f) => f.role?.toLowerCase() === "md&ceo");
  const otherBoardMembers = displayFounders.filter(
    (f) => f.role?.toLowerCase() !== "founder director" && f.role?.toLowerCase() !== "md&ceo"
  );

  useEffect(() => {
    // Try to fetch founder data from API
    fetch("/api/leaders?page=company")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          // Set founders list (MD&CEO and Founder Director)
          const filteredFounders = data.filter((l: any) => l.role?.toLowerCase() === "md&ceo" || l.role?.toLowerCase() === "founder director");
          const filteredVPs = data.filter((l: any) => l.role?.toLowerCase() === "vice president");
          setFounders(filteredFounders);
          setVPs(filteredVPs);
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
              {/* MD & CEO Section */}
              {mdCeos.length > 0 && (
                <div className="mb-20">
                  <div className="text-center mb-10">
                    <span className="text-primary font-black text-xs uppercase tracking-widest bg-primary/10 px-4 py-2 rounded-full inline-block mb-3">
                      Corporate Leadership
                    </span>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                      Accsys MD & CEO
                    </h2>
                  </div>
                  <div className="space-y-12 max-w-5xl mx-auto">
                    {mdCeos.map((f) => (
                      <div
                        key={f._id}
                        className="flex flex-col lg:flex-row items-center gap-12 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md rounded-[3rem] p-8 md:p-12 border border-gray-150 dark:border-gray-800 shadow-xl relative overflow-hidden group hover:border-primary/30 hover:-translate-y-2 transition-all duration-300 w-full text-center lg:text-left"
                      >
                        <div className="absolute -top-32 -right-32 w-72 h-72 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-700 pointer-events-none" />
                        <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-8 border-white dark:border-gray-800 shadow-2xl shrink-0 bg-gray-100 relative z-10">
                          <ImageWithFallback
                            src={f.image?.startsWith('/') || f.image?.startsWith('http') || f.image?.startsWith('data:') ? f.image : ""}
                            fallbackSrc="/founder.jpg"
                            alt={f.name}
                            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="space-y-4 flex-1 relative z-10">
                          <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary/10 px-4 py-2 rounded-full inline-block">
                            {f.role || "MD&CEO"}
                          </span>
                          <h3 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                            {f.name}
                          </h3>
                          <p className="text-gray-500 dark:text-gray-400 text-base md:text-lg leading-relaxed font-semibold">
                            {f.description || "Driving corporate values, ethical trade parameters, and strict national direct selling guidelines compliance."}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Founder Director Section */}
              {founderDirectors.length > 0 && (
                <div className="mb-20">
                  <div className="text-center mb-10">
                    <span className="text-primary font-black text-xs uppercase tracking-widest bg-primary/10 px-4 py-2 rounded-full inline-block mb-3">
                      Founder Director
                    </span>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                      Accsys Founder Director
                    </h2>
                  </div>
                  <div className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto">
                    {founderDirectors.map((f) => (
                      <div
                        key={f._id}
                        className="w-full md:w-[380px] bg-white/60 dark:bg-gray-900/60 backdrop-blur-md rounded-[3rem] p-8 border border-gray-150 dark:border-gray-800 shadow-xl flex flex-col items-center text-center group hover:border-primary/30 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
                      >
                        <div className="absolute -top-32 -right-32 w-72 h-72 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-700 pointer-events-none" />
                        <div className="w-48 h-48 md:w-64 md:h-64 rounded-[2rem] overflow-hidden border-8 border-white dark:border-gray-800 shadow-2xl mb-6 shrink-0 bg-gray-100 relative z-10">
                          <ImageWithFallback
                            src={f.image?.startsWith('/') || f.image?.startsWith('http') || f.image?.startsWith('data:') ? f.image : ""}
                            fallbackSrc="/founder.jpg"
                            alt={f.name}
                            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="space-y-4 relative z-10">
                          <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary/10 px-4 py-2 rounded-full inline-block">
                            {f.role || "Founder Director"}
                          </span>
                          <h3 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                            {f.name}
                          </h3>
                          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed font-semibold">
                            {f.description || "Driving corporate values, ethical trade parameters, and strict national direct selling guidelines compliance."}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              

              {/* Other Board Members Section */}
              {otherBoardMembers.length > 0 && (
                <div className="mb-20">
                  <div className="text-center mb-10">
                    <span className="text-primary font-black text-xs uppercase tracking-widest bg-primary/10 px-4 py-2 rounded-full inline-block mb-3">
                      Board Directors
                    </span>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                      Accsys Directors
                    </h2>
                  </div>
                  <div className="space-y-12 max-w-5xl mx-auto">
                    {otherBoardMembers.map((f) => (
                      <div
                        key={f._id}
                        className="flex flex-col lg:flex-row items-center gap-12 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md rounded-[3rem] p-8 md:p-12 border border-gray-150 dark:border-gray-800 shadow-xl relative overflow-hidden group hover:border-primary/30 hover:-translate-y-2 transition-all duration-300 w-full text-center lg:text-left"
                      >
                        <div className="absolute -top-32 -right-32 w-72 h-72 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-700 pointer-events-none" />
                        <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-8 border-white dark:border-gray-800 shadow-2xl shrink-0 bg-gray-100 relative z-10">
                          <ImageWithFallback
                            src={f.image?.startsWith('/') || f.image?.startsWith('http') || f.image?.startsWith('data:') ? f.image : ""}
                            fallbackSrc="/founder.jpg"
                            alt={f.name}
                            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="space-y-4 flex-1 relative z-10">
                          <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary/10 px-4 py-2 rounded-full inline-block">
                            {f.role || "Director"}
                          </span>
                          <h3 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                            {f.name}
                          </h3>
                          <p className="text-gray-500 dark:text-gray-400 text-base md:text-lg leading-relaxed font-semibold">
                            {f.description || "Driving corporate values, ethical trade parameters, and strict national direct selling guidelines compliance."}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {displayVPs.length > 0 && (
                <div className="mt-20">
                  <div className="text-center mb-10">
                    <span className="text-primary font-black text-xs uppercase tracking-widest bg-primary/10 px-4 py-2 rounded-full inline-block mb-3">
                      Executive Management
                    </span>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                      Accsys Vice Presidents
                    </h2>
                  </div>
                  <div className="flex flex-wrap justify-center gap-8">
                    {displayVPs.map((vp) => (
                      <div
                        key={vp._id}
                        className="w-full md:w-[300px] bg-white/60 dark:bg-gray-900/60 backdrop-blur-md rounded-[2rem] p-6 border border-gray-150 dark:border-gray-800 shadow-xl flex flex-col items-center text-center group hover:border-primary/30 hover:-translate-y-2 transition-all duration-300"
                      >
                        <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-white dark:border-gray-800 shadow-md mb-4 shrink-0 bg-gray-100">
                          <ImageWithFallback
                            src={vp.image?.startsWith('/') || vp.image?.startsWith('http') || vp.image?.startsWith('data:') ? vp.image : ""}
                            fallbackSrc="/founder.jpg"
                            alt={vp.name}
                            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <h3 className="text-lg font-black text-gray-900 dark:text-white mb-1 group-hover:text-primary transition-colors">{vp.name}</h3>
                        <span className="text-primary font-bold text-[10px] uppercase tracking-widest mb-3 bg-primary/10 px-3 py-1 rounded-full">{vp.role || "Vice President"}</span>
                        <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed font-semibold">{vp.description || "Spearheading regional business operations, logistical management, and compliance enforcement."}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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

      {/* Follow Us Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="text-primary font-black text-xs uppercase tracking-widest bg-primary/10 px-4 py-2 rounded-full inline-block mb-4">
            Stay Connected
          </span>
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
            Follow Us
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed font-light max-w-2xl mx-auto mb-14">
            Stay updated with the latest news, achievements, and opportunities from Accsys India across all our channels.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            {/* Website */}
            <a
              href="https://accsysindia.in"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3"
              aria-label="Accsys India Website"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white group-hover:border-primary group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-primary/30 transition-all duration-300">
                <Globe className="w-7 h-7 md:w-9 md:h-9" />
              </div>
              <span className="text-xs font-bold text-gray-500 dark:text-gray-400 group-hover:text-primary transition-colors uppercase tracking-wider">Website</span>
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/accsysindia"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3"
              aria-label="Facebook"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-400/20 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-[#1877F2] group-hover:text-white group-hover:border-[#1877F2] group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-blue-500/30 transition-all duration-300">
                <svg className="w-7 h-7 md:w-9 md:h-9" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
              <span className="text-xs font-bold text-gray-500 dark:text-gray-400 group-hover:text-blue-500 transition-colors uppercase tracking-wider">Facebook</span>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/accsysindia"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3"
              aria-label="Instagram"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-500/10 border border-pink-400/20 flex items-center justify-center text-pink-600 dark:text-pink-400 group-hover:bg-gradient-to-br group-hover:from-[#F77737] group-hover:via-[#E1306C] group-hover:to-[#833AB4] group-hover:text-white group-hover:border-transparent group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-pink-500/30 transition-all duration-300">
                <svg className="w-7 h-7 md:w-9 md:h-9" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <span className="text-xs font-bold text-gray-500 dark:text-gray-400 group-hover:text-pink-500 transition-colors uppercase tracking-wider">Instagram</span>
            </a>

            {/* YouTube */}
            <a
              href="https://www.youtube.com/@accsysindia"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3"
              aria-label="YouTube"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-red-500/20 to-red-500/5 border border-red-400/20 flex items-center justify-center text-red-600 dark:text-red-400 group-hover:bg-[#FF0000] group-hover:text-white group-hover:border-[#FF0000] group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-red-500/30 transition-all duration-300">
                <svg className="w-7 h-7 md:w-9 md:h-9" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
              <span className="text-xs font-bold text-gray-500 dark:text-gray-400 group-hover:text-red-500 transition-colors uppercase tracking-wider">YouTube</span>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3"
              aria-label="WhatsApp"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-400/20 flex items-center justify-center text-green-600 dark:text-green-400 group-hover:bg-[#25D366] group-hover:text-white group-hover:border-[#25D366] group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-green-500/30 transition-all duration-300">
                <svg className="w-7 h-7 md:w-9 md:h-9" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
              </div>
              <span className="text-xs font-bold text-gray-500 dark:text-gray-400 group-hover:text-green-500 transition-colors uppercase tracking-wider">WhatsApp</span>
            </a>

            {/* Twitter / X */}
            <a
              href="https://twitter.com/accsysindia"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3"
              aria-label="X (Twitter)"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-gray-700/20 to-gray-700/5 border border-gray-400/20 flex items-center justify-center text-gray-700 dark:text-gray-300 group-hover:bg-black group-hover:text-white group-hover:border-black group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-gray-800/30 transition-all duration-300">
                <svg className="w-7 h-7 md:w-9 md:h-9" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.858L1.655 2.25H8.34l4.261 5.633 5.643-5.633Zm-1.161 17.52h1.833L7.084 4.126H5.117Z"/>
                </svg>
              </div>
              <span className="text-xs font-bold text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors uppercase tracking-wider">X (Twitter)</span>
            </a>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
