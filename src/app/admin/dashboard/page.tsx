"use client";

import { TrendingUp, Users, ShoppingBag, DollarSign, Activity, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/dashboard")
      .then(res => res.json())
      .then(d => {
        if (d.message && d.status === 401) throw new Error(d.message);
        setData(d);
        setLoading(false);
      })
      .catch(e => {
        console.error(e);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-[500px]"><Loader2 className="w-10 h-10 text-primary animate-spin" /></div>;
  }

  if (!data) return <div className="text-red-500 font-medium">Failed to load dashboard data. Ensure MongoDB is running and you are an admin.</div>;

  const stats = [
    { title: "Membership Plans", value: data.plansCount, icon: Activity, color: "text-green-500", bg: "bg-green-50 dark:bg-green-900/20" },
    { title: "Store Products", value: data.productsCount, icon: ShoppingBag, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-900/20" },
    { title: "Leadership Team", value: data.leadersCount, icon: Users, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20" },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Data Overview</h1>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5">
          <Activity className="w-4 h-4" /> Generate Report
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-gray-900 p-6 md:p-10 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start mb-6">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.bg}`}>
                <stat.icon className={`w-7 h-7 ${stat.color}`} />
              </div>
            </div>
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-bold uppercase tracking-widest mb-2">{stat.title}</h3>
            <p className="text-4xl font-black text-gray-900 dark:text-white">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-900 p-6 md:p-10 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Revenue Analytics</h2>
            <select className="bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-2 text-sm outline-none font-medium">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-80 flex items-end justify-between gap-6">
             {data.chartData?.map((height: number, i: number) => (
              <div key={i} className="w-full bg-primary/5 dark:bg-primary/10 rounded-t-2xl relative group h-full flex items-end">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                  className="w-full bg-gradient-to-t from-primary/80 to-primary rounded-t-2xl relative group-hover:brightness-110 transition-all shadow-md"
                >
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none font-bold shadow-xl">
                    ₹{height * 50}k
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-6 text-sm font-bold text-gray-400 uppercase tracking-widest">
            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span>
          </div>
        </div>
    </div>
  );
}
