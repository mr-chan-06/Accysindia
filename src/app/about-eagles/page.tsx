"use client";

import ImageWithFallback from "@/components/ImageWithFallback";

import { motion } from "framer-motion";
import { Award, CheckCircle2, History, Target, Users, BookOpen, Star, Zap, GitFork, RefreshCw, Check, Layers } from "lucide-react";
import { useState, useEffect } from "react";

const FALLBACK_VPS = [
  {
    _id: "vp1",
    name: "Mr. K. Raghavan",
    role: "Eagles Team Vice President",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    description: "Lead strategies manager. Developing direct selling protocols and educational seminars for scaling regional hubs."
  },
  {
    _id: "vp2",
    name: "Mrs. Anjali Sharma",
    role: "Eagles Team Vice President",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    description: "Director of training systems. Championing national training frameworks and digital commerce awareness events."
  },
  {
    _id: "vp3",
    name: "Mr. Ramesh Kumar",
    role: "Eagles Team Vice President",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    description: "Logistics and operation coordinator. Spearheading seamless integration of warehouse inventories and active delivery centers."
  }
];

const FALLBACK_FOUNDERS = [
  {
    _id: "f1",
    name: "Mr. V. Hariprakash",
    role: "Chief Mentor & Founder",
    image: "/founder.jpg",
    description: "Under the visionary mentorship of Mr. V. Hariprakash, the Eagles Team has established a professional education framework that teaches modern direct-marketing, personal development, and passive business structuring models. His core philosophy revolves around establishing absolute transparency, empowering household earners, and mentoring a highly compliant and motivated community that guarantees growth for every team member."
  }
];

const FALLBACK_MENTORS = [
  {
    _id: "m1",
    name: "Mr. Baskar",
    role: "Founder & Director",
    image: "/uploads/founders/Baskar FD.jpg.jpeg",
    description: "Expert in network growth and leadership transformation."
  },
  {
    _id: "m2",
    name: "Mr. Vijaykumar",
    role: "Founder & Director",
    image: "/uploads/founders/Vijayakumar FD.jpg.jpeg",
    description: "Specializing in digital commerce and binary match strategies."
  },
  {
    _id: "m3",
    name: "Mr. GR Vijay",
    role: "Board of Vice President",
    image: "/uploads/founders/GR Vijay BOVP.jpg.jpeg",
    description: "Dedicated to personal branding and scaling regional business hubs."
  }
];

export default function AboutEagles() {
  const [vps, setVPs] = useState<any[]>([]);
  const [founders, setFounders] = useState<any[]>([]);
  const [mentors, setMentors] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/leaders").then(res => res.json()),
      fetch("/api/settings").then(res => res.json())
    ])
      .then(([leadersData, settingsData]) => {
        if (Array.isArray(leadersData)) {
          // Filter Leaders by Role
          const vpList = leadersData.filter((l: any) => l.role?.toLowerCase().includes("vice"));
          const founderList = leadersData.filter((l: any) => l.role?.toLowerCase().includes("founder"));
          const mentorList = leadersData.filter((l: any) => l.role?.toLowerCase().includes("mentor") && !l.role?.toLowerCase().includes("chief mentor"));
          const chiefMentors = leadersData.filter((l: any) => l.role?.toLowerCase().includes("chief mentor"));

          setVPs(vpList);
          setFounders(founderList);
          setMentors([...chiefMentors, ...mentorList]);
        }
        if (settingsData) {
          setSettings(settingsData);
        }
        setLoading(false);
      })
      .catch(e => {
        console.error(e);
        setLoading(false);
      });
  }, []);

  const displayVPs = vps.length > 0 ? vps : FALLBACK_VPS;
  const displayFounders = founders.length > 0 ? founders : FALLBACK_FOUNDERS;
  const displayMentors = mentors.length > 0 ? mentors : FALLBACK_MENTORS;

  return (
    <div className="bg-white dark:bg-black min-h-screen border-t dark:border-gray-800">

      {/* Founders Hero Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900 border-b dark:border-gray-800 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-primary font-bold tracking-wider uppercase mb-4 block">Eagles Team Foundation</span>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
              <span className="text-primary">Founder</span>
            </h1>
          </div>

          <div className="space-y-16">
            {displayFounders.map((founder, index) => (
              <motion.div
                key={founder._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`flex flex-col ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900/40 dark:to-black rounded-[3rem] p-10 md:p-16 border border-gray-100 dark:border-gray-800 shadow-2xl relative overflow-hidden group`}
              >
                <div className="absolute -top-32 -right-32 w-72 h-72 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-700" />

                <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-8 border-white dark:border-gray-800 shadow-2xl shrink-0">
                  <ImageWithFallback
                    src={founder.image?.startsWith('15') ? `https://images.unsplash.com/photo-${founder.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80` : (founder.image || "/founder.jpg")}
                    fallbackSrc="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                    alt={founder.name}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                  />
                </div>

                <div className="space-y-6 flex-1 text-center lg:text-left">
                  <span className="bg-primary/20 text-primary text-xs font-black px-4 py-2 rounded-full uppercase tracking-widest inline-block">
                    {founder.role || "Team Founder"}
                  </span>
                  <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
                    {founder.name}
                  </h2>
                  <div className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed font-light whitespace-pre-line">
                    {founder.description}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Eagles Mentors Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900/40 border-t border-b border-gray-100 dark:border-gray-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-secondary font-black text-xs uppercase tracking-widest bg-secondary/10 px-4 py-2 rounded-full inline-block mb-4">
              Eagles Academy
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
              Eagles Mentors
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-xl leading-relaxed">
              Highly experienced leadership coaches dedicated to transformation, network ethics, and digital commerce mentoring.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {displayMentors.map((mentor) => (
              <motion.div
                key={mentor._id}
                whileHover={{ y: -10 }}
                className="bg-white dark:bg-gray-800 rounded-[2.5rem] overflow-hidden shadow-xl border border-gray-100 dark:border-gray-700/50 flex flex-col group p-6"
              >
                <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-gray-200 mb-8">
                  <ImageWithFallback
                    src={mentor.image?.startsWith('15') ? `https://images.unsplash.com/photo-${mentor.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80` : (mentor.image || "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80")}
                    fallbackSrc="https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                    alt={mentor.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">{mentor.name}</h3>
                  <p className="text-secondary font-bold text-sm mb-4 uppercase tracking-wider">{mentor.role || "Eagles Mentor"}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed font-medium line-clamp-3">
                    {mentor.description || "Dedicated mentor guiding teams towards financial independence and professional leadership."}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 2026 Historic Rebranding Journey */}
      <section className="py-24 bg-white dark:bg-black border-b border-gray-100 dark:border-gray-800/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center text-primary shrink-0 animate-pulse">
              <History className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
                The Historic 2026 Transition
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed font-light mb-4">
                {settings?.rebrandingDescription1 || "Originally established as ACCSYSINDIA, our direct selling model scaled rapidly across Southern and Western India. In 2026, recognizing the need to accelerate leadership growth and prioritize advanced digital commerce channels, the organization proudly transitioned to the EAGLES TEAM brand."}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed font-light">
                {settings?.rebrandingDescription2 || "This shift introduced high Point Values (60PV standard kits), priority dispatch warehouses, and advanced matching pairings systems, scaling passive income payouts to hundreds of new earners monthly."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Board of Vice Presidents */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900/40 border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-primary font-black text-xs uppercase tracking-widest bg-primary/10 px-4 py-2 rounded-full inline-block mb-4">
              Executive Committee
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
              Eagles Board of Vice Presidents
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-xl leading-relaxed">
              Leading the operational strategies and mentoring direct sellers to ensure perfect network balances.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-10"><BookOpen className="w-10 h-10 text-primary animate-spin" /></div>
          ) : (
            <div className="grid md:grid-cols-3 gap-10">
              {displayVPs.map((vp) => (
                <div
                  key={vp._id}
                  className="bg-white dark:bg-gray-800 rounded-[2.5rem] overflow-hidden shadow-xl border border-gray-100 dark:border-gray-700/50 hover:border-primary/30 hover:-translate-y-2 transition-all duration-300 flex flex-col group"
                >
                  <div className="relative aspect-square overflow-hidden bg-gray-200">
                    <ImageWithFallback
                      src={vp.image?.startsWith('15') ? `https://images.unsplash.com/photo-${vp.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80` : (vp.image || "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80")}
                      fallbackSrc="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                      alt={vp.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-primary transition-colors">{vp.name}</h3>
                    <p className="text-primary font-bold text-sm mb-4 uppercase tracking-wider">{vp.role || "Eagles Vice President"}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6 font-semibold">{vp.description || "Spearheading regional network growth, training systems, and prioritised logistics fulfillment."}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t dark:border-gray-800">
        <div className="grid md:grid-cols-2 gap-12">

          {/* Vision Card */}
          <div className="bg-primary/5 p-10 md:p-14 rounded-[3rem] border border-primary/10 relative overflow-hidden group">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-700" />
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-10">
              <Target className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-8 tracking-tight">Our Vision</h2>
            <ul className="space-y-6">
              {[
                "Empower Millions of Entrepreneurs through a technology-driven business platform.",
                "Create Financial Freedom by providing sustainable income opportunities.",
                "Become India's Leading Digital Commerce Network built on trust, innovation, and growth."
              ].map((point, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-1">
                    <span className="text-primary text-xs font-black">{i + 1}</span>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 text-lg font-medium leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Mission Card */}
          <div className="bg-secondary/5 p-10 md:p-14 rounded-[3rem] border border-secondary/10 relative overflow-hidden group">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-secondary/10 rounded-full blur-3xl group-hover:bg-secondary/20 transition-all duration-700" />
            <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-10">
              <BookOpen className="w-8 h-8 text-secondary" />
            </div>
            <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-8 tracking-tight">Our Mission</h2>
            <ul className="space-y-6">
              {[
                "Provide Quality Products and Services through an integrated digital ecosystem.",
                "Develop Leaders and Business Owners through training, mentorship, and teamwork.",
                "Enable Members to Earn, Grow, and Succeed using ethical and scalable network marketing practices."
              ].map((point, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center shrink-0 mt-1">
                    <span className="text-secondary text-xs font-black">{i + 1}</span>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 text-lg font-medium leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>

    </div>
  );
}

