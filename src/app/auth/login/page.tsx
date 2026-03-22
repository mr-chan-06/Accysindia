"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { LogIn } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn("credentials", { email, password, callbackUrl: "/dashboard" });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black pt-20 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-[2rem] shadow-2xl shadow-gray-200/50 dark:shadow-none p-10 border border-gray-100 dark:border-gray-800">
        <div className="text-center mb-10">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center text-4xl font-bold shadow-xl mx-auto mb-8">A</div>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-3">Welcome Back</h1>
          <p className="text-gray-500 font-medium text-lg">Sign in to access your dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-4 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none transition-all dark:text-white" 
              placeholder="you@example.com" 
              required
            />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-400 uppercase tracking-widest">Password</label>
              <Link href="#" className="text-xs font-bold text-primary hover:underline">Forgot Password?</Link>
            </div>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none transition-all dark:text-white" 
              placeholder="••••••••" 
              required
            />
          </div>
          
          <button type="submit" className="w-full py-5 bg-gradient-to-r from-primary to-accent-foreground text-white rounded-xl font-bold text-xl hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 mt-4">
            Sign In <LogIn className="w-6 h-6" />
          </button>
        </form>

        <p className="text-center mt-10 text-gray-500 font-medium pb-2">
          Don't have an account? <Link href="/auth/register" className="text-primary font-bold hover:underline">Join Now</Link>
        </p>
      </div>
    </div>
  );
}
