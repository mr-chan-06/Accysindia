import Link from "next/link";
import { 
  ArrowRight, 
  ShoppingBag, 
  ShieldCheck, 
  TrendingUp, 
  Users, 
  Award, 
  Star, 
  ShieldAlert, 
  Building, 
  CheckCircle, 
  MapPin, 
  FileText, 
  ArrowUpRight 
} from "lucide-react";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import dbConnect from "@/lib/mongodb";
import { GalleryPhoto } from "@/models/GalleryPhoto";
import type { Metadata } from "next";

// Highly descriptive, comprehensive SEO Metadata for search crawlers
export const metadata: Metadata = {
  title: "EAGLESTEAM | Smart Digital Commerce & Income Opportunity",
  description: "Join EAGLESTEAM and grow your income with Accsysindia's Smart Digital Commerce platform. 5000+ Cr turnover, 10000+ products, 300+ active centers, and 100k+ happy members.",
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

const FALLBACK_PHOTOS = [
  {
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    title: "Leadership Seminars",
    description: "Empowering our members with extensive leadership and marketing training sessions.",
  },
  {
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    title: "Team Collaboration",
    description: "Fostering synergy and joint business growth opportunities nationwide.",
  },
  {
    image: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    title: "Annual Rewards Meet",
    description: "Honoring outstanding accomplishments, awards, and milestones of our top achievers.",
  },
  {
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    title: "Corporate Strategy Sessions",
    description: "Laying solid strategic roadmaps for the upcoming digital commerce eras.",
  },
  {
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    title: "Celebration & Joy",
    description: "Celebrating combined milestones, teamwork success, and strong community building.",
  },
  {
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    title: "Eagles Academy Classes",
    description: "Delivering business principles and continuous learning directly from senior founders.",
  },
  {
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    title: "Community Outreach",
    description: "Connecting hearts, creating positive community footprints, and empowering families.",
  },
  {
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    title: "Digital Commerce Innovations",
    description: "Harnessing the power of the internet and direct commerce platforms for steady income.",
  },
];

export default async function Home() {
  let gallery: any[] = [];
  try {
    await dbConnect();
    const photos = await GalleryPhoto.find({}).sort({ slot: 1 }).lean();
    // Serialize mongoose lean docs to make them clean plain JS objects
    gallery = JSON.parse(JSON.stringify(photos));
  } catch (e) {
    console.error("Failed to load gallery database items in Server Component:", e);
  }

  const galleryItems = Array.from({ length: 8 }, (_, i) => {
    const slotNum = i + 1;
    const customPhoto = gallery.find((p) => p.slot === slotNum);
    return {
      slot: slotNum,
      image: customPhoto?.image || FALLBACK_PHOTOS[i].image,
      title: customPhoto?.title || FALLBACK_PHOTOS[i].title,
      description: customPhoto?.description || FALLBACK_PHOTOS[i].description,
      isCustom: !!customPhoto,
    };
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - Pre-rendered with pure CSS animations for instant loading without JS */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden animate-fade-in">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/65 to-black/85 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Eagles Team smart business background" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-10">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight mb-8">
              Grow Your Income with <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-300 drop-shadow-lg">
                Smart Digital Commerce
              </span>
            </h1>
            <p className="text-lg md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
              Join India's premier network of direct-selling entrepreneurs. Access high-quality daily-need products and build a lucrative, passive referral stream today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link 
                href="/plans" 
                className="w-full sm:w-auto px-10 py-4.5 bg-gradient-to-r from-primary to-yellow-500 text-black font-bold text-lg rounded-full hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                Become a Member <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href="/products" 
                className="w-full sm:w-auto px-10 py-4.5 bg-white/10 backdrop-blur-md border border-white/25 text-white rounded-full font-bold text-lg hover:bg-white/20 hover:border-white/40 transition-all flex items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Explore Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Progressive counters that pre-render metrics to plain HTML */}
      <section className="py-24 bg-white dark:bg-black relative z-20 -mt-16 rounded-t-[3rem] shadow-[0_-20px_40px_rgba(0,0,0,0.15)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { label: "Crore+ Turnover", value: 5000, prefix: "₹" },
              { label: "Premium Products", value: 10000, suffix: "+" },
              { label: "Active Centers", value: 300, suffix: "+" },
              { label: "Happy Members", value: 100, suffix: "k+" }
            ].map((stat, i) => (
              <div 
                key={i}
                className="text-center transform hover:scale-105 transition-transform duration-300"
              >
                <h3 className="text-5xl md:text-6xl font-extrabold text-primary mb-3 drop-shadow-sm">
                  <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </h3>
                <p className="text-gray-500 dark:text-gray-400 font-semibold text-lg">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Differentiation Section - Clarifying Tiers & Value Propositions */}
      <section className="py-32 bg-gray-50 dark:bg-gray-900/40 relative z-20 border-t border-b border-gray-100 dark:border-gray-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-primary font-black text-xs uppercase tracking-widest bg-primary/10 px-4 py-2 rounded-full inline-block mb-4">
              Our Core Ecosystem
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
              Flexible Tiers Built Around Your Goals
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-xl leading-relaxed">
              Whether you want to shop high-quality products at direct wholesale discount prices, establish a steady second source of income, or become a regional leader, we have a custom tier designed for you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {/* Card 1: Customer Shopping */}
            <div className="bg-white dark:bg-gray-800 p-10 rounded-[2.5rem] shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700/50 flex flex-col justify-between hover:-translate-y-2 hover:border-primary/20 transition-all duration-300 group">
              <div>
                <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <ShoppingBag className="w-7 h-7 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Direct-to-Consumer Shopping</h3>
                <p className="text-gray-500 dark:text-gray-400 font-semibold mb-6">For Smart Shoppers</p>
                <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed mb-8">
                  Get access to over 10,000+ premium products ranging from fresh grocery staples to quality home appliances and fashion. 
                  Shop directly at exclusive discount prices with zero sales or recruitment requirements.
                </p>
              </div>
              <Link 
                href="/products" 
                className="inline-flex items-center justify-center px-6 py-3.5 bg-gray-100 dark:bg-gray-700 hover:bg-primary hover:text-black dark:hover:bg-primary rounded-2xl font-bold text-sm transition-all gap-2 mt-auto"
              >
                Browse Products <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Card 2: Privilege Partner (Featured) */}
            <div className="bg-white dark:bg-gray-800 p-10 rounded-[2.5rem] shadow-2xl border-2 border-primary/50 relative flex flex-col justify-between hover:-translate-y-2 transition-all duration-300 group">
              <div className="absolute -top-5 right-10 bg-gradient-to-r from-primary to-yellow-500 text-black px-5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase shadow-md">
                Highly Recommended
              </div>
              <div>
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Privilege Referral Program</h3>
                <p className="text-primary font-semibold mb-6">For Entrepreneurs</p>
                <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed mb-8">
                  Kickstart a high-margin business with custom privilege packages. Accumulate point values (PV), earn commissions on personal recommendations, structure your own entrepreneur teams, and secure recurring repurchase income.
                </p>
              </div>
              <Link 
                href="/plans" 
                className="inline-flex items-center justify-center px-6 py-3.5 bg-gradient-to-r from-primary to-yellow-500 text-black rounded-2xl font-bold text-sm transition-all hover:opacity-95 gap-2 mt-auto shadow-lg shadow-primary/10"
              >
                View Joining Kits <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Card 3: Eagles Academy */}
            <div className="bg-white dark:bg-gray-800 p-10 rounded-[2.5rem] shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700/50 flex flex-col justify-between hover:-translate-y-2 hover:border-primary/20 transition-all duration-300 group">
              <div>
                <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <Award className="w-7 h-7 text-indigo-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Eagles Training Academy</h3>
                <p className="text-gray-500 dark:text-gray-400 font-semibold mb-6">For Professional Leaders</p>
                <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed mb-8">
                  Unlock access to professional-grade business training. Learn digital commerce strategies, active leadership structures, marketing systems, and operational growth models directly from top-tier founders.
                </p>
              </div>
              <Link 
                href="/about" 
                className="inline-flex items-center justify-center px-6 py-3.5 bg-gray-100 dark:bg-gray-700 hover:bg-primary hover:text-black dark:hover:bg-primary rounded-2xl font-bold text-sm transition-all gap-2 mt-auto"
              >
                Meet Our Leaders <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Associated Partners & Brand Logos Section */}
      <section className="py-20 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Associated Brands & Logistical Partners</h2>
            <p className="text-gray-500 text-sm max-w-xl mx-auto">Connecting you to high-quality daily products and secure national logistical fulfillment networks.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-8 items-center justify-items-center opacity-85">
            {[
              { name: "Hindustan Unilever", desc: "FMCG Daily Essentials" },
              { name: "TATA Consumer Products", desc: "Premium Beverages & Foods" },
              { name: "ITC Limited", desc: "Quality Household Goods" },
              { name: "Dabur India", desc: "Natural Wellness & Health" },
              { name: "Amul Co.", desc: "Dairy & Agro Nutrition" },
              { name: "Eagles Academy Logistics", desc: "Priority Distribution" },
              { name: "SmartPay Network", desc: "Instant PV Settlement" },
              { name: "SafeExpress Supply", desc: "Tier-3 Delivery Reach" }
            ].map((brand, i) => (
              <div 
                key={i} 
                className="w-full h-24 bg-gray-50 dark:bg-gray-900/60 rounded-2xl border border-gray-100 dark:border-gray-800/80 p-5 flex flex-col justify-center items-center hover:border-primary/30 transition-all duration-300 group"
              >
                <span className="font-extrabold text-sm text-gray-700 dark:text-gray-300 tracking-wider group-hover:text-primary transition-colors text-center">{brand.name}</span>
                <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium mt-1 uppercase tracking-wide text-center">{brand.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose ACCSYSINDIA Section */}
      <section className="py-32 bg-gray-50 dark:bg-gray-900/40 border-t border-b border-gray-100 dark:border-gray-800/40">
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
              <div 
                key={i}
                className="bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700/50 hover:-translate-y-2.5 transition-all duration-300 group hover:border-primary/20"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies / Success Spotlights Section */}
      <section className="py-32 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-22">
            <span className="text-primary font-black text-xs uppercase tracking-widest bg-primary/10 px-4 py-2 rounded-full inline-block mb-4">
              Real Impact
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
              Livelihoods Transformed: Our Case Studies
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-xl leading-relaxed">
              Read how our digital commerce framework and supportive learning academies create real financial progress and active localized economies across India.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Case Study 1 */}
            <div className="bg-gray-50 dark:bg-gray-900/40 rounded-[3rem] p-10 md:p-12 border border-gray-100 dark:border-gray-800/80 flex flex-col justify-between hover:border-primary/25 transition-all duration-300 group">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="bg-emerald-500/10 text-emerald-500 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase">Individual Spotlight</span>
                  <span className="text-gray-400 text-xs font-medium">6 Min Read</span>
                </div>
                <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4 group-hover:text-primary transition-colors">
                  From Homemaker to Diamond Business Leader
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed mb-6 font-light">
                  <strong>The Journey:</strong> Seeking absolute financial independence, Mrs. Priya Sharma from Mumbai joined the Privilege Partner network. Utilizing step-by-step training from Eagles Academy webinars and starting small community referral channels, she established a local household goods network.
                </p>
                <div className="bg-white dark:bg-black p-6 rounded-2xl border border-gray-100 dark:border-gray-800 mb-8">
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-3">Key Results & Outcomes:</h4>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0" /> Scaled a business network to 450+ active members in 6 months.</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0" /> Built a sustainable, consistent passive monthly income.</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0" /> Reached Diamond Leader status and serves as a guest lecturer.</li>
                  </ul>
                </div>
              </div>
              <div className="flex items-center gap-4 border-t border-gray-200/50 dark:border-gray-800/50 pt-6">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary bg-black flex items-center justify-center font-bold text-white text-sm">PS</div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm">Mrs. Priya Sharma</h4>
                  <p className="text-gray-500 text-xs">Diamond Leader, Mumbai Hub</p>
                </div>
              </div>
            </div>

            {/* Case Study 2 */}
            <div className="bg-gray-50 dark:bg-gray-900/40 rounded-[3rem] p-10 md:p-12 border border-gray-100 dark:border-gray-800/80 flex flex-col justify-between hover:border-primary/25 transition-all duration-300 group">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="bg-blue-500/10 text-blue-500 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase">Regional Growth</span>
                  <span className="text-gray-400 text-xs font-medium">8 Min Read</span>
                </div>
                <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4 group-hover:text-primary transition-colors">
                  Revitalizing Tier-3 Town Economies via Active Centers
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed mb-6 font-light">
                  <strong>The Journey:</strong> To overcome high delivery costs, the team opened an Accsys Active Center in Erode, Tamil Nadu. The local physical center directly connected surrounding farmers and rural youth to high-demand groceries and products, reducing transport supply chain margins.
                </p>
                <div className="bg-white dark:bg-black p-6 rounded-2xl border border-gray-100 dark:border-gray-800 mb-8">
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-3">Key Results & Outcomes:</h4>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0" /> Reached ₹15 Lakhs+ monthly turnover inside 8 months of launch.</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0" /> Streamlined fast product access for 5,000+ regional households.</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0" /> Provided stable local delivery routes & earnings to 25 local youth.</li>
                  </ul>
                </div>
              </div>
              <div className="flex items-center gap-4 border-t border-gray-200/50 dark:border-gray-800/50 pt-6">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary bg-black flex items-center justify-center font-bold text-white text-sm">EH</div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm">Erode Hub Management</h4>
                  <p className="text-gray-500 text-xs">Accsys India Active Center #48</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 bg-gray-50 dark:bg-gray-900/40 border-t border-b border-gray-100 dark:border-gray-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-primary font-black text-xs uppercase tracking-widest bg-primary/10 px-4 py-2 rounded-full inline-block mb-4">
              Real Testimonials
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
              Trusted by 100k+ Earners Nationwide
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-xl leading-relaxed">
              Read how members of all background profiles (students, ex-professionals, retailers) leverage the EAGLESTEAM tools for strong outcomes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Rajesh Kumar",
                role: "Ex-Corporate Banker, New Delhi",
                quote: "Transitioning from corporate banking to smart commerce was a critical choice. The EAGLESTEAM systems allowed me to match my banking income within 8 months of starting. The support is highly structured.",
                stars: 5,
                initials: "RK"
              },
              {
                name: "Anish Patel",
                role: "College Student, Ahmedabad",
                quote: "EAGLESTEAM fit perfectly into my schedule. Starting with a basic privilege pack, I built a small team network that completely funds my daily educational needs. Simple, clear, and highly rewarding.",
                stars: 5,
                initials: "AP"
              },
              {
                name: "Sunita Rao",
                role: "Independent Retailer, Bengaluru",
                quote: "Accsys India has given local store owners like me an incredible product catalog advantage. The repurchase margins on daily essentials are high, and the delivery speed keeps my retail clients happy.",
                stars: 5,
                initials: "SR"
              }
            ].map((t, idx) => (
              <div 
                key={idx}
                className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl shadow-gray-200/30 dark:shadow-none border border-gray-100 dark:border-gray-700/50 flex flex-col justify-between hover:border-primary/20 hover:scale-[1.02] transition-all duration-300"
              >
                <div>
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: t.stars }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed mb-8 italic">
                    "{t.quote}"
                  </p>
                </div>
                <div className="flex items-center gap-4 border-t dark:border-gray-700/50 pt-5 mt-auto">
                  <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-xs flex items-center justify-center">
                    {t.initials}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">{t.name}</h4>
                    <p className="text-gray-500 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Official Accreditations & Certifications Section */}
      <section className="py-24 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">Official Credentials & Accreditations</h2>
            <p className="text-gray-500 text-base">We strictly adhere to national direct commerce guidelines to protect your entrepreneurial investments.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "ISO 9001:2015 Certified",
                desc: "Adhering to strict international quality management systems and operational transparency.",
                num: "Reg No: QMS-90214B"
              },
              {
                title: "Startup India Registered",
                desc: "Proudly recognized under the Indian government's flagship initiative for innovation and employment.",
                num: "DPIIT Reg ID: 2901B8"
              },
              {
                title: "Direct Selling Guidelines",
                desc: "Fully aligned with Ministry of Consumer Affairs guidelines, protecting member-first operations.",
                num: "100% Compliant System"
              },
              {
                title: "FICCI Corporate Member",
                desc: "Federation of Indian Chambers of Commerce & Industry corporate participant for retail values.",
                num: "Membership ID: F-89240"
              }
            ].map((cert, idx) => (
              <div 
                key={idx}
                className="bg-gray-50 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800/80 p-8 rounded-2xl hover:border-primary/20 transition-colors"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-extrabold text-gray-900 dark:text-white text-lg mb-2">{cert.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed mb-4">{cert.desc}</p>
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/5 px-2.5 py-1 rounded-md">{cert.num}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-24 bg-white dark:bg-black relative z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900/40 dark:to-black rounded-[3rem] p-8 md:p-14 shadow-2xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800 relative overflow-hidden group">
            {/* Decorative blob */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-700" />
            
            <div className="w-56 h-56 md:w-72 md:h-72 shrink-0 rounded-full overflow-hidden border-8 border-white dark:border-gray-800 shadow-2xl relative z-10">
              <img 
                src="/founder.jpg" 
                alt="Mr.V.Hariprakash Eagles Team Founder" 
                className="w-full h-full object-cover object-top hover:scale-110 transition-transform duration-700"
              />
            </div>
            
            <div className="text-center md:text-left flex-1 relative z-10">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm tracking-widest uppercase mb-6 shadow-sm">
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-primary/20 bg-black flex items-center justify-center shrink-0">
                  <img src="/eagles-logo.png" alt="Eagles Logo" className="w-full h-full object-contain" />
                </div>
                <span>Team Founder</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-3 tracking-tight">
                Mr. V. Hariprakash
              </h2>
              <div className="w-16 h-1.5 bg-gradient-to-r from-primary to-yellow-400 rounded-full mx-auto md:mx-0 mb-6" />
              <h3 className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-6 drop-shadow-sm">
                Visionary Leader
              </h3>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-light">
                Leading with absolute dedication to empowering individuals across India to unlock reliable financial independence and professional confidence. His structural mentorship model drives the fundamental core values of the EAGLESTEAM network.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8-Photo Frame Grid Section - Rendered natively with SEO-optimized HTML & CSS animations */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900/40 relative z-20 border-t border-b border-gray-100 dark:border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-primary font-black text-xs uppercase tracking-widest bg-primary/10 px-4 py-2 rounded-full inline-block mb-4">
              Gallery & Highlights
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
              EAGLES TEAM ACHIEVERS
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-xl leading-relaxed">
              A visual journey highlighting our training seminars, leadership forums, celebrations, and key community milestones across India.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {galleryItems.map((item, i) => (
              <div
                key={item.slot}
                className="bg-white dark:bg-gray-800 rounded-[2rem] shadow-xl shadow-gray-200/40 dark:shadow-none border border-gray-100 dark:border-gray-700/50 overflow-hidden group hover:border-primary/20 transition-all flex flex-col justify-between"
              >
                <div className="w-full aspect-video sm:aspect-[4/3] overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Subtle Slot Indicator */}
                  <div className="absolute top-4 right-4 z-10 px-2.5 py-0.5 bg-black/45 backdrop-blur-md rounded-full text-[10px] text-white/95 font-bold uppercase tracking-wider">
                    {item.isCustom ? "Verified Highlight" : "Eagles Team"}
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col justify-between bg-gradient-to-b from-white to-gray-50/30 dark:from-gray-800 dark:to-gray-900/10">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-1 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-3 font-light">
                      {item.description}
                    </p>
                  </div>
                  {/* Visual card accent line */}
                  <div className="w-8 h-1 bg-gradient-to-r from-primary to-amber-500 rounded-full mt-6 group-hover:w-16 transition-all duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Parallax Section */}
      <section className="relative py-40 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-fixed bg-center bg-cover animate-fade-in" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')" }}>
          <div className="absolute inset-0 bg-primary/95 mix-blend-multiply z-10" />
        </div>
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-8 tracking-tight">Ready to Transform Your Life?</h2>
          <p className="text-2xl text-white/90 mb-12 font-light">Join thousands of successful business earners in our network today.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              href="/plans" 
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
