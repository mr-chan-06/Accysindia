"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { ShieldAlert, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Using NextAuth signIn logic adapted for admin credentials
    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid admin credentials");
    } else {
      router.push("/admin/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-[2rem] shadow-2xl p-10 border border-gray-100 dark:border-gray-800">
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
            <ShieldAlert className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">Admin Portal</h1>
          <p className="text-gray-500 font-medium">Secure sign in for system administrators</p>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/10 text-red-600 px-5 py-4 rounded-xl mb-6 text-sm font-bold border border-red-100 dark:border-red-500/30">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-400 uppercase tracking-widest mb-3">Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-5 py-4 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none transition-all dark:text-white font-medium" 
              placeholder="admin" 
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-400 uppercase tracking-widest mb-3">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none transition-all dark:text-white font-medium" 
              placeholder="••••••••" 
              required
            />
          </div>
          
          <button type="submit" className="w-full py-5 bg-gradient-to-r from-primary to-accent-foreground text-white rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 mt-4">
            Secure Login <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
