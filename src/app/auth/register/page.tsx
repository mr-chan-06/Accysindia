"use client";

import Link from "next/link";
import { UserPlus } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    sponsorId: "",
    password: "",
    planId: ""
  });
  const [plans, setPlans] = useState<any[]>([]);
  const [plansLoading, setPlansLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    // Check URL for planId
    const searchParams = new URLSearchParams(window.location.search);
    const urlPlanId = searchParams.get("planId");
    if (urlPlanId) {
      setFormData(prev => ({ ...prev, planId: urlPlanId }));
    }

    // Fetch plans
    const fetchPlans = async () => {
      try {
        const res = await fetch("/api/plans");
        if (res.ok) {
          const data = await res.json();
          setPlans(data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setPlansLoading(false);
      }
    };
    fetchPlans();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      router.push("/auth/login?registered=true");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black pt-20 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 w-full max-w-xl rounded-[2.5rem] shadow-2xl p-10 border border-gray-100 dark:border-gray-800 my-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-secondary to-yellow-500"></div>
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-3 tracking-tight">Join ACCSYSINDIA</h1>
          <p className="text-gray-500 font-medium text-lg">Create your account and start earning today.</p>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/10 text-red-600 px-5 py-4 rounded-xl mb-6 text-sm font-bold border border-red-100 dark:border-red-500/30">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-400 uppercase tracking-widest mb-2">First Name</label>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full px-5 py-4 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none transition-all dark:text-white font-medium" required />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-400 uppercase tracking-widest mb-2">Last Name</label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full px-5 py-4 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none transition-all dark:text-white font-medium" required />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-5 py-4 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none transition-all dark:text-white font-medium" required />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-400 uppercase tracking-widest mb-2">Sponsor Email (Optional)</label>
            <input type="email" name="sponsorId" value={formData.sponsorId} onChange={handleChange} className="w-full px-5 py-4 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none transition-all dark:text-white placeholder-gray-400 font-medium" placeholder="sponsor@example.com" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-400 uppercase tracking-widest mb-2">Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full px-5 py-4 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none transition-all dark:text-white font-medium" required />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-400 uppercase tracking-widest mb-2">Membership Plan</label>
            <select name="planId" value={formData.planId} onChange={handleChange} className="w-full px-5 py-4 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none transition-all dark:text-white font-medium appearance-none" required>
              <option value="" disabled>{plansLoading ? "Loading plans..." : "Select a Plan"}</option>
              {plans.map(plan => (
                <option key={plan._id} value={plan._id}>
                  {plan.name} - ₹{plan.price} ({plan.pv} PV)
                </option>
              ))}
            </select>
          </div>
          
          <button disabled={loading} type="submit" className="w-full py-5 bg-gradient-to-r from-secondary to-yellow-500 text-white rounded-xl font-bold text-xl hover:shadow-xl hover:shadow-secondary/30 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:hover:translate-y-0">
            {loading ? "Processing..." : "Create Account"} <UserPlus className="w-6 h-6" />
          </button>
        </form>

        <p className="text-center mt-8 text-gray-500 font-medium">
          Already a member? <Link href="/auth/login" className="text-secondary font-bold hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
