import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import { User } from "@/models/User";
import { Activity, Users, ShoppingBag, Trophy, Link as LinkIcon, Calendar, Mail, Star, Edit3 } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function UserDashboard() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }

  await dbConnect();
  const dbUser = await User.findById(session.user.id).populate("referredUsers").lean();

  if (!dbUser) {
    return (
      <div className="pt-32 pb-20 flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Account Not Found</h2>
        <p className="text-gray-500 mt-2">We couldn't locate your profile in the database.</p>
      </div>
    );
  }

  const pvValue = dbUser.walletBalance || 0;
  const referredCount = dbUser.referredUsers?.length || 0;
  const joinDate = new Date(dbUser.createdAt || Date.now()).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="pt-24 pb-20 bg-gray-50 dark:bg-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-primary to-accent-foreground rounded-[2.5rem] p-10 md:p-14 mb-10 text-white relative overflow-hidden shadow-2xl shadow-primary/20">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 rounded-full border-4 border-white/30 bg-white/10 backdrop-blur-md flex items-center justify-center shadow-lg shrink-0">
               <span className="text-5xl font-black">{dbUser.name.charAt(0).toUpperCase()}</span>
            </div>
            <div className="text-center md:text-left flex-1">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-2 tracking-tight">{dbUser.name}</h1>
              <p className="text-primary-foreground/90 font-medium text-lg flex items-center justify-center md:justify-start gap-2 mb-4">
                <Mail className="w-5 h-5" /> {dbUser.email}
              </p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <span className="bg-white/20 backdrop-blur px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-1.5 shadow-sm">
                  <Star className="w-4 h-4 text-amber-300 fill-amber-300" /> Member
                </span>
                <span className="bg-white/20 backdrop-blur px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-1.5 shadow-sm">
                  <Calendar className="w-4 h-4 opacity-80" /> Joined {joinDate}
                </span>
              </div>
            </div>
            <div className="w-full md:w-auto mt-6 md:mt-0">
               <button className="w-full md:w-auto px-6 py-3 bg-white text-gray-900 font-bold rounded-xl shadow-lg hover:shadow-white/20 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2">
                 <Edit3 className="w-4 h-4" /> Edit Profile
               </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* PV Card */}
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-800 hover:border-emerald-500/30 transition-colors group">
            <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Activity className="w-7 h-7" />
            </div>
            <h3 className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest text-sm mb-2">Total PV Earned</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black text-gray-900 dark:text-white">{pvValue}</span>
              <span className="text-emerald-500 font-bold text-lg">PV</span>
            </div>
            <p className="text-sm font-medium text-gray-400 mt-4">Personal Volume values accumulated from store purchases and referrals.</p>
          </div>

          {/* Network Card */}
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-800 hover:border-blue-500/30 transition-colors group">
            <div className="w-14 h-14 bg-blue-50 dark:bg-blue-500/10 text-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Users className="w-7 h-7" />
            </div>
            <h3 className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest text-sm mb-2">Direct Referrals</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black text-gray-900 dark:text-white">{referredCount}</span>
              <span className="text-blue-500 font-bold text-lg">Users</span>
            </div>
            <p className="text-sm font-medium text-gray-400 mt-4">People you have directly brought into the network using your link.</p>
          </div>

          {/* Current Plan Card */}
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-800 hover:border-amber-500/30 transition-colors group">
            <div className="w-14 h-14 bg-amber-50 dark:bg-amber-500/10 text-amber-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Trophy className="w-7 h-7" />
            </div>
            <h3 className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest text-sm mb-2">Membership Status</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-gray-900 dark:text-white truncate">Basic Starter</span>
            </div>
            <p className="text-sm font-medium text-gray-400 mt-4 overflow-hidden text-ellipsis whitespace-nowrap">Upgrade plan to increase your referral matching bonus percentages.</p>
            <Link href="/plans" className="inline-block mt-4 text-amber-500 font-bold hover:underline text-sm">View Plans &rarr;</Link>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-800">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <LinkIcon className="w-6 h-6 text-primary" /> Affiliate Link
            </h2>
            <p className="text-gray-500 font-medium mb-4">Share this unique link to invite friends and build your downline. You will earn PV whenever they make a purchase.</p>
            <div className="flex items-center gap-3 bg-gray-50 dark:bg-black p-4 rounded-xl border border-gray-200 dark:border-gray-800">
              <code className="text-sm font-bold text-primary flex-1 truncate select-all">
                https://accsysindia.com/register?ref={dbUser.email}
              </code>
              <button className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-bold rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap">
                Copy Link
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-800">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <ShoppingBag className="w-6 h-6 text-primary" /> Recent Orders
            </h2>
            <div className="flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-black rounded-xl border border-gray-200 dark:border-gray-800 border-dashed">
               <ShoppingBag className="w-10 h-10 text-gray-300 dark:text-gray-700 mb-3" />
               <p className="text-gray-500 font-medium text-center">You haven't made any purchases recently.</p>
               <Link href="/products" className="mt-4 text-primary font-bold text-sm bg-primary/10 px-4 py-2 rounded-lg hover:bg-primary/20 transition-colors">Start Shopping</Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
