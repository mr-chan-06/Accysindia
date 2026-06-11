import Link from "next/link";
import { 
  ArrowRight, 
  ShoppingBag, 
  ShieldCheck, 
  TrendingUp, 
  Users, 
  Award, 
  Star, 
  CheckCircle, 
  ArrowUpRight,
  Sparkles,
  Flame,
  Volume2
} from "lucide-react";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

import dbConnect from "@/lib/mongodb";
import { Leader } from "@/models/Leader";
import { Setting } from "@/models/Setting";
import type { Metadata } from "next";

// Highly descriptive, comprehensive SEO Metadata for search crawlers
export const metadata: Metadata = {
  // Provide a base URL for Open Graph/Twitter images. Vercel requires an absolute URL.
  // Use an environment variable so it works both locally and in production.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://your-site.vercel.app"),
  title: "EAGLESTEAM | Smart Digital Commerce & Income Opportunity",
  description: "Join EAGLES TEAM and grow your income with Accsysindia's Smart Digital Commerce platform. 5000+ Cr turnover, 10000+ products, 300+ active centers, and 100k+ happy members.",
  keywords: [
    "Eagles Team",
    "Accsysindia",
    "Digital Commerce",
    "Referral Business",
    "Income Opportunity",
    "Financial Independence",
    "Eagles Academy",
    "Smart Commerce India",
    "Privilege Member Package"
  ],
  openGraph: {
    title: "EAGLESTEAM | Smart Digital Commerce & Income Opportunity",
    description: "Grow your income with Smart Digital Commerce. Join the fastest-growing network of entrepreneurs across India.",
    images: ["/eagles-logo.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EAGLESTEAM | Smart Digital Commerce & Income Opportunity",
    description: "Grow your income with Smart Digital Commerce. Join the fastest-growing network of entrepreneurs.",
    images: ["/eagles-logo.png"],
  }
};

export default async function Home() {
  let leaders: any[] = [];
  
  let settings: any = null;
  
  try {
    await dbConnect();
    const dbLeaders = await Leader.find({}).sort({ createdAt: 1 }).lean();
    leaders = JSON.parse(JSON.stringify(dbLeaders));

    const dbSettings = await Setting.findOne().lean();
    if (dbSettings) {
      settings = JSON.parse(JSON.stringify(dbSettings));
    }
  } catch (e) {
    console.error("Failed to load DB items in Server Component:", e);
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* 2026 Rebranding Ticker Announcement */}
      <div className="bg-gradient-to-r from-amber-500 via-primary to-yellow-600 text-black py-3 px-4 font-bold text-center text-xs md:text-sm tracking-wide shadow-md flex items-center justify-center gap-2 relative z-30">
        <Sparkles className="w-4 h-4 animate-pulse" />
        <span>{settings?.tickerAnnouncement || "HISTORIC 2026 MILESTONE: ACCSYSINDIA has officially rebranded to the EAGLES TEAM! Accelerating passive income & professional direct selling formats."}</span>
      </div>

      

      {/* Founder Card Section - Mr. V. Hariprakash */}
      <section className="py-28 bg-white dark:bg-black relative z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-black text-xs uppercase tracking-widest bg-primary/10 px-4 py-2 rounded-full inline-block mb-4">
              Our Visionary Leader
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">Eagles Team Founder</h2>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900/40 dark:to-black rounded-[3rem] p-8 md:p-14 shadow-2xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800 relative overflow-hidden group">
            {/* Decorative blob */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-700" />
            
            <div className="w-56 h-56 md:w-72 md:h-72 shrink-0 rounded-full overflow-hidden border-8 border-white dark:border-gray-800 shadow-2xl relative z-10">
              <img 
                src="/founder.jpg" 
                alt="Mr. V. Hariprakash Eagles Team Founder" 
                className="w-full h-full object-cover object-top hover:scale-110 transition-transform duration-700"
              />
            </div>
            
            <div className="text-center md:text-left flex-1 relative z-10">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm tracking-widest uppercase mb-6 shadow-sm">
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-primary/20 bg-black flex items-center justify-center shrink-0">
                  <img src="/eagles-logo.png" alt="Eagles Logo" className="w-full h-full object-contain" />
                </div>
                <span>Eagles Team</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-3 tracking-tight">
                Mr. V. Hariprakash
              </h2>
              <div className="w-16 h-1.5 bg-gradient-to-r from-primary to-yellow-400 rounded-full mx-auto md:mx-0 mb-6" />
              <h3 className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-6 drop-shadow-sm">
                Visionary Leader & Chief Mentor
              </h3>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-light">
                As the main pioneer behind the **EAGLES TEAM** rebranding and direct selling system, Mr. V. Hariprakash has spent years empowering ordinary citizens to establish robust financial independent channels. Through structure, values, and strict ethical direct commerce protocols, his system makes matching pair payouts achievable for thousands.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Welcomes to Eagles Team & Rebranding Detail Section */}
      <section className="py-28 bg-white dark:bg-black relative z-20 -mt-16 rounded-t-[3rem] shadow-[0_-20px_40px_rgba(0,0,0,0.15)] border-b border-gray-100 dark:border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Welcome Banner */}
          <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900/40 dark:to-black rounded-[3rem] p-10 md:p-16 border border-gray-100 dark:border-gray-800 shadow-2xl relative overflow-hidden mb-24 group">
            <div className="absolute -top-32 -left-32 w-72 h-72 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-700" />
            <div className="absolute -bottom-32 -right-32 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl group-hover:bg-yellow-500/20 transition-all duration-700" />
            
            <div className="relative z-10 text-center max-w-4xl mx-auto">
              <span className="text-primary font-black text-xs uppercase tracking-widest bg-primary/10 px-4 py-2 rounded-full inline-block mb-6">
                EAGLES ACADEMY INITIATION
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-8 tracking-tight">
                Welcome to the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-400">Eagles Team</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed font-light mb-8">
                We are thrilled to welcome you to the **Eagles Team**! Since our groundbreaking transformation in **2018**, our network has scaled to help entrepreneurs claim their financial destiny. Under the visionary mentorship of our founder and senior vice presidents, we provide you with all tools, priority direct selling kits, high PV counts, and binary income cycles to scale your passive revenue.
              </p>
              <div className="w-20 h-1 bg-gradient-to-r from-primary to-yellow-400 rounded-full mx-auto" />
            </div>
          </div>

          {/* Stats Section Heading */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-primary font-black text-xs uppercase tracking-widest bg-primary/10 px-4 py-2 rounded-full inline-block mb-4 animate-pulse">
              Vision Roadmap
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight uppercase">
              EAGLES TEAM VISION 2028
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-yellow-500 rounded-full mx-auto mt-6" />
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12">
            {[
               { label: "CAR ACHIEVERS", value: 500, suffix: "+" },
               { label: "HOUSE ACHIEVERS", value: 100, suffix: "+" },
               { label: "INCOME EARNERS", value: 10000, suffix: "+" },
               { label: "ABROAD TRIPS", value: 10, suffix: "+" },
               { label: "WEEKLY 60000 INCOME EARNERS", value: 1000, suffix: "+" }
            ].map((stat, i) => (
              <div 
                key={i}
                className="text-center transform hover:scale-105 transition-transform duration-300 last:col-span-2 lg:last:col-span-1"
              >
                <h3 className="text-5xl md:text-6xl font-extrabold text-primary mb-3 drop-shadow-sm">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </h3>
                <p className="text-gray-500 dark:text-gray-400 font-semibold text-lg">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore Section - Plans, Products, Achievers */}
      <section className="py-28 bg-gray-50 dark:bg-gray-900/40 relative z-20 border-b border-gray-100 dark:border-gray-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-primary font-black text-xs uppercase tracking-widest bg-primary/10 px-4 py-2 rounded-full inline-block mb-4">
              Explore Paths
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
              Grow, Earn, and Travel with Eagles Team
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-xl leading-relaxed">
              Explore our custom products, extended passive income frameworks, and celebrated national travel records.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {/* Card 1: Explore Products */}
            <div className="bg-white dark:bg-gray-800 p-10 rounded-[2.5rem] shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700/50 flex flex-col justify-between hover:-translate-y-2 hover:border-primary/20 transition-all duration-300 group">
              <div>
                <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <ShoppingBag className="w-7 h-7 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Explore Products</h3>
                <p className="text-gray-500 dark:text-gray-400 font-semibold mb-6">Womens Kit, Provision Kit, & More</p>
                <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed mb-8">
                  Browse our 5 dedicated premium starter kits, including the famous **Provision Kit (60PV)** and the **Womens Kit** (with instant product guide videos).
                </p>
              </div>
              <Link 
                href="/products" 
                className="inline-flex items-center justify-center px-6 py-3.5 bg-gray-100 dark:bg-gray-700 hover:bg-primary hover:text-black dark:hover:bg-primary rounded-2xl font-bold text-sm transition-all gap-2 mt-auto"
              >
                Browse Products <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Card 2: Explore Plans */}
            <div className="bg-white dark:bg-gray-800 p-10 rounded-[2.5rem] shadow-2xl border-2 border-primary/50 relative flex flex-col justify-between hover:-translate-y-2 transition-all duration-300 group">
              <div className="absolute -top-5 right-10 bg-gradient-to-r from-primary to-yellow-500 text-black px-5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase shadow-md">
                Income Matching
              </div>
              <div>
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Explore Binary Plans</h3>
                <p className="text-primary font-semibold mb-6">60PV Matches = ₹5,400 to ₹6,000</p>
                <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed mb-8">
                  Unveil our high-yield matching pairing matrix. Learn how a network structure of 20 Left and 20 Right IDs builds instant financial payouts.
                </p>
              </div>
              <Link 
                href="/products" 
                className="inline-flex items-center justify-center px-6 py-3.5 bg-gradient-to-r from-primary to-yellow-500 text-black rounded-2xl font-bold text-sm transition-all hover:opacity-95 gap-2 mt-auto shadow-lg shadow-primary/10"
              >
                Calculator & Plans <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Card 3: Explore Achievers */}
            <div className="bg-white dark:bg-gray-800 p-10 rounded-[2.5rem] shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700/50 flex flex-col justify-between hover:-translate-y-2 hover:border-primary/20 transition-all duration-300 group">
              <div>
                <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <Award className="w-7 h-7 text-indigo-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Explore Achievers</h3>
                <p className="text-gray-500 dark:text-gray-400 font-semibold mb-6">National Tours & Successes</p>
                <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed mb-8">
                  Celebrate our top performing entrepreneurs. Check the premium national tour tickets, group achievements, and live celebration pictures.
                </p>
              </div>
              <Link 
                href="/achievers" 
                className="inline-flex items-center justify-center px-6 py-3.5 bg-gray-100 dark:bg-gray-700 hover:bg-primary hover:text-black dark:hover:bg-primary rounded-2xl font-bold text-sm transition-all gap-2 mt-auto"
              >
                Meet Achievers <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>


      <section className="relative py-40 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-fixed bg-center bg-cover animate-fade-in" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')" }}>
          <div className="absolute inset-0 bg-primary/95 mix-blend-multiply z-10" />
        </div>
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-8 tracking-tight">Ready to Transform Your Life?</h2>
          <p className="text-2xl text-white/90 mb-12 font-light">Join thousands of successful business earners in our network today.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              href="/products" 
              className="inline-flex items-center justify-center px-10 py-5 bg-white text-primary rounded-full font-bold text-xl hover:scale-105 hover:shadow-2xl transition-all shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Explore Packages
            </Link>
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center px-10 py-5 bg-black/30 backdrop-blur-md border border-white/30 text-white rounded-full font-bold text-xl hover:bg-black/40 hover:border-white/50 transition-all focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
