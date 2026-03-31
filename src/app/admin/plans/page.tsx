"use client";

import { Plus, Edit3, Trash2, Loader2, X, Star } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function PlansManagement() {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [editingPlanId, setEditingPlanId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "", price: "", pv: "", description: "", benefits: "", popular: false
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const fetchPlans = async () => {
    try {
      const res = await fetch("/api/admin/plans");
      if (res.ok) setPlans(await res.json());
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this membership plan?")) return;
    try {
      const res = await fetch(`/api/admin/plans/${id}`, { method: "DELETE" });
      if (res.ok) fetchPlans();
    } catch (e) {
      console.error(e);
    }
  };

  const handleEdit = (plan: any) => {
    setFormData({
      name: plan.name,
      price: plan.price.toString(),
      pv: plan.pv.toString(),
      description: plan.description || "",
      benefits: plan.benefits.join("\n"),
      popular: plan.popular || false
    });
    setEditingPlanId(plan._id);
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleAddPlan = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('price', formData.price);
      data.append('pv', formData.pv);
      data.append('description', formData.description);
      data.append('benefits', formData.benefits);
      data.append('popular', formData.popular.toString());
      if (imageFile) {
        data.append('image', imageFile);
      }

      const url = editingPlanId ? `/api/admin/plans/${editingPlanId}` : "/api/admin/plans";
      const method = editingPlanId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        body: data,
      });
      
      if (res.ok) {
        setIsModalOpen(false);
        setFormData({ name: "", price: "", pv: "", description: "", benefits: "", popular: false });
        setImageFile(null);
        setEditingPlanId(null);
        fetchPlans();
        setSuccessMessage(`Membership Kit successfully ${editingPlanId ? "updated" : "added"}!`);
        setTimeout(() => setSuccessMessage(""), 3500);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight mb-2">Membership Plans CMS</h1>
          <p className="text-gray-500 dark:text-gray-400">Configure kits and benefits for your referral network.</p>
        </div>
        <button 
          onClick={() => {
            setFormData({ name: "", price: "", pv: "", description: "", benefits: "", popular: false });
            setEditingPlanId(null);
            setImageFile(null);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-secondary to-amber-500 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-secondary/20 transition-all hover:-translate-y-0.5"
        >
          <Plus className="w-5 h-5" /> Add Membership Kit
        </button>
      </div>

      {successMessage && (
        <div className="mb-8 px-6 py-4 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-2xl flex items-center gap-3 text-emerald-700 dark:text-emerald-400 font-bold animate-in fade-in slide-in-from-top-4">
          <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
          </div>
          {successMessage}
        </div>
      )}

      <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden min-h-[400px]">
        {loading ? (
          <div className="w-full h-64 flex items-center justify-center"><Loader2 className="w-8 h-8 text-primary animate-spin" /></div>
        ) : plans.length === 0 ? (
          <div className="w-full h-64 flex flex-col items-center justify-center text-gray-500">
            <p className="font-bold text-xl text-gray-900 dark:text-white mb-2">No Plans Available</p>
            <p className="font-medium text-lg">Click 'Add Membership Kit' to create your first package.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/30 border-b border-gray-100 dark:border-gray-800">
                  <th className="px-10 py-6 text-xs font-bold text-gray-400 uppercase tracking-widest leading-relaxed">Package Name</th>
                  <th className="px-10 py-6 text-xs font-bold text-gray-400 uppercase tracking-widest leading-relaxed">Pricing</th>
                  <th className="px-10 py-6 text-xs font-bold text-gray-400 uppercase tracking-widest leading-relaxed">PV Details</th>
                  <th className="px-10 py-6 text-xs font-bold text-gray-400 uppercase tracking-widest leading-relaxed text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {plans.map((plan) => (
                  <tr key={plan._id} className="hover:bg-primary/5 transition-colors group">
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900 dark:text-white text-base">{plan.name}</span>
                        {plan.popular && <span title="Most Popular"><Star className="w-4 h-4 text-yellow-500 fill-current" /></span>}
                      </div>
                      <div className="mt-1 text-xs text-gray-500 line-clamp-1 max-w-[200px]">{plan.description}</div>
                      <div className="mt-2 text-xs font-semibold text-primary">{plan.benefits?.length || 0} benefits listed</div>
                    </td>
                    <td className="px-10 py-6 text-xl font-extrabold text-gray-900 dark:text-white">₹{plan.price}</td>
                    <td className="px-10 py-6 text-base font-black text-emerald-500">+{plan.pv} PV</td>
                    <td className="px-10 py-6 flex justify-end gap-3 opacity-80 group-hover:opacity-100 transition-opacity mt-4">
                      <button onClick={() => handleEdit(plan)} className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-primary hover:text-white transition-colors title='Edit'">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(plan._id)} className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-red-500 hover:text-white transition-colors title='Delete'">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 w-full max-w-3xl rounded-[2.5rem] p-10 shadow-2xl relative border border-gray-100 dark:border-gray-800 max-h-[90vh] overflow-y-auto">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-500 hover:text-primary hover:bg-primary/10 transition-colors">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight">{editingPlanId ? "Edit Membership Kit" : "Add Membership Kit"}</h2>
            <form onSubmit={handleAddPlan} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-400 uppercase tracking-widest mb-3">Kit Name</label>
                  <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required className="w-full px-5 py-4 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary outline-none dark:text-white font-medium" placeholder="E.g. Premium Health Kit" />
                </div>
                <div className="flex items-center mt-6">
                  <label className="flex items-center cursor-pointer">
                    <div className="relative">
                      <input type="checkbox" className="sr-only" checked={formData.popular} onChange={e => setFormData({...formData, popular: e.target.checked})} />
                      <div className={`block w-14 h-8 rounded-full transition-colors ${formData.popular ? 'bg-secondary' : 'bg-gray-300 dark:bg-gray-700'}`}></div>
                      <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${formData.popular ? 'transform translate-x-6' : ''}`}></div>
                    </div>
                    <div className="ml-3 text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Highlight as Most Popular</div>
                  </label>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-400 uppercase tracking-widest mb-3">Price (₹)</label>
                  <input type="number" min="0" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required className="w-full px-5 py-4 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary outline-none dark:text-white font-black text-xl" placeholder="6500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-400 uppercase tracking-widest mb-3">PV Allocation</label>
                  <input type="number" min="0" value={formData.pv} onChange={e => setFormData({...formData, pv: e.target.value})} required className="w-full px-5 py-4 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary outline-none dark:text-white font-black text-emerald-500 text-xl" placeholder="100" />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-400 uppercase tracking-widest mb-3">Kit Description (Optional)</label>
                <textarea rows={2} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-5 py-4 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary outline-none dark:text-white font-medium resize-none leading-relaxed" placeholder="Short tagline marketing this plan..."></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-400 uppercase tracking-widest mb-3">Benefits (One per line)</label>
                <textarea rows={4} value={formData.benefits} onChange={e => setFormData({...formData, benefits: e.target.value})} required className="w-full px-5 py-4 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary outline-none dark:text-white font-medium resize-none leading-relaxed" placeholder="Premium Monthly Groceries&#10;100 PV Credit&#10;Free Home Delivery"></textarea>
                <p className="text-xs text-gray-500 mt-2 font-medium">Hit ENTER to separate each feature bullet point.</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-400 uppercase tracking-widest mb-3">Kit Image (Optional)</label>
                <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} className="w-full px-5 py-4 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary outline-none dark:text-white font-medium" />
              </div>
              
              <button disabled={submitting} type="submit" className="w-full py-5 bg-gradient-to-r from-secondary to-amber-500 text-white rounded-2xl font-black tracking-wide text-xl hover:shadow-xl hover:shadow-secondary/30 hover:-translate-y-0.5 transition-all disabled:opacity-70 mt-6 flex justify-center items-center gap-2">
                {submitting ? "Processing..." : (editingPlanId ? "Update Kit Details" : "Launch Membership Kit")}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
