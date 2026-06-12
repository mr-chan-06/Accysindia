"use client";

import { Plus, Edit3, Trash2, Loader2, X } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function LeadersManagement() {
  const [leaders, setLeaders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [editingLeaderId, setEditingLeaderId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "", role: "Mentor", description: ""
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const fetchLeaders = async () => {
    try {
      const res = await fetch("/api/admin/leaders");
      if (res.ok) setLeaders(await res.json());
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaders();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this board member?")) return;
    try {
      const res = await fetch(`/api/admin/leaders/${id}`, { method: "DELETE" });
      if (res.ok) fetchLeaders();
    } catch (e) {
      console.error(e);
    }
  };

  const handleEdit = (leader: any) => {
    setFormData({
      name: leader.name,
      role: leader.role,
      description: leader.description || ""
    });
    setEditingLeaderId(leader._id);
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleAddLeader = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('role', formData.role);
      data.append('description', formData.description);
      if (imageFile) {
        data.append('image', imageFile);
      }

      const url = editingLeaderId ? `/api/admin/leaders/${editingLeaderId}` : "/api/admin/leaders";
      const method = editingLeaderId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        body: data,
      });
      
      if (res.ok) {
        setFormData({ name: "", role: "Mentor", description: "" });
        setImageFile(null);
        setEditingLeaderId(null);
        fetchLeaders();
        setSuccessMessage(`Board member successfully ${editingLeaderId ? "updated" : "added"}!`);
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight mb-2">Leadership CMS</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage founders, presidents, and vice presidents displayed across the website (Home, About, and About Eagles pages).</p>
        </div>
        <button 
          onClick={() => {
            setFormData({ name: "", role: "Mentor", description: "" });
            setEditingLeaderId(null);
            setImageFile(null);
            setIsModalOpen(true);
          }}
          className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-secondary to-amber-500 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-secondary/20 transition-all hover:-translate-y-0.5 active:scale-95"
        >
          <Plus className="w-5 h-5" /> Add Member
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

      <div className="bg-white dark:bg-gray-900 rounded-[1.5rem] md:rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden min-h-[400px]">
        {loading ? (
          <div className="w-full h-64 flex items-center justify-center"><Loader2 className="w-8 h-8 text-primary animate-spin" /></div>
        ) : leaders.length === 0 ? (
          <div className="w-full h-64 flex flex-col items-center justify-center text-gray-500">
            <p className="font-bold text-xl text-gray-900 dark:text-white mb-2">No Leaders in Database</p>
            <p className="font-medium text-lg">Click 'Add Member' to create a new profile.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/30 border-b border-gray-100 dark:border-gray-800">
                  <th className="px-6 md:px-10 py-5 md:py-6 text-xs font-bold text-gray-400 uppercase tracking-widest leading-relaxed whitespace-nowrap">Member Details</th>
                  <th className="px-6 md:px-10 py-5 md:py-6 text-xs font-bold text-gray-400 uppercase tracking-widest leading-relaxed whitespace-nowrap">Role</th>
                  <th className="px-6 md:px-10 py-5 md:py-6 text-xs font-bold text-gray-400 uppercase tracking-widest leading-relaxed whitespace-nowrap">Description</th>
                  <th className="px-6 md:px-10 py-5 md:py-6 text-xs font-bold text-gray-400 uppercase tracking-widest leading-relaxed text-right whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {leaders.map((leader) => (
                  <tr key={leader._id} className="hover:bg-primary/5 transition-colors group">
                    <td className="px-6 md:px-10 py-5 md:py-6 flex items-center gap-4">
                      {leader.image ? (
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden bg-gray-100 border-2 border-primary/20 shrink-0 relative">
                          {leader.image.startsWith('15') ? (
                             <img src={`https://images.unsplash.com/photo-${leader.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80`} alt={leader.name} className="w-full h-full object-cover" />
                          ) : (
                             <img src={leader.image} alt={leader.name} className="w-full h-full object-cover" />
                          )}
                        </div>
                      ) : (
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm md:text-xl shrink-0">
                          {leader.name[0]}
                        </div>
                      )}
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white text-sm md:text-base whitespace-nowrap">{leader.name}</div>
                      </div>
                    </td>
                    <td className="px-6 md:px-10 py-5 md:py-6 text-xs md:text-sm font-semibold text-primary whitespace-nowrap">{leader.role}</td>
                    <td className="px-6 md:px-10 py-5 md:py-6 text-xs md:text-sm text-gray-500 max-w-[150px] md:max-w-xs truncate">{leader.description || "-"}</td>
                    <td className="px-6 md:px-10 py-5 md:py-6 flex justify-end gap-3 opacity-80 group-hover:opacity-100 transition-opacity items-center">
                      <button onClick={() => handleEdit(leader)} className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-primary hover:text-white transition-colors title='Edit'">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(leader._id)} className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-red-500 hover:text-white transition-colors title='Delete'">
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
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 md:p-4 overflow-y-auto">
          <div className="bg-white dark:bg-gray-900 w-full max-w-2xl rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 shadow-2xl relative border border-gray-100 dark:border-gray-800 my-8">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 md:top-8 md:right-8 w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-500 hover:text-primary hover:bg-primary/10 transition-colors">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-6 md:mb-8 tracking-tight">{editingLeaderId ? "Edit Team Member" : "Add Team Member"}</h2>
            <form onSubmit={handleAddLeader} className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-400 uppercase tracking-widest mb-3">Full Name</label>
                  <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required className="w-full px-5 py-4 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary outline-none dark:text-white font-medium" placeholder="E.g. Arjun Kumar" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-400 uppercase tracking-widest mb-3">Role / Position</label>
                  <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full px-5 py-4 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary outline-none dark:text-white font-bold cursor-pointer transition-colors">
                    <option>Founder</option>
                    <option>Founder & Chairman</option>
                    <option>Chief Mentor</option>
                    <option>Mentor</option>
                    <option>President</option>
                    <option>Vice President</option>
                    <option>Chief Executive Officer</option>
                    <option>Managing Director</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-400 uppercase tracking-widest mb-3">Profile Photo</label>
                <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} required={!editingLeaderId} className="w-full px-5 py-4 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary outline-none dark:text-white font-medium" />
                <p className="text-xs text-gray-500 mt-2 font-medium">For best results, use a square aspect ratio image (e.g., 800x800). {editingLeaderId && "Leave blank to keep existing photo."}</p>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-400 uppercase tracking-widest mb-3">Description / Bio (Optional)</label>
                <textarea rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-5 py-4 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary outline-none dark:text-white font-medium resize-none leading-relaxed" placeholder="Short inspiring quote or bio..."></textarea>
              </div>
              
              <button disabled={submitting} type="submit" className="w-full py-4 md:py-5 bg-gradient-to-r from-secondary to-amber-500 text-white rounded-2xl font-black tracking-wide text-lg md:text-xl hover:shadow-xl hover:shadow-secondary/30 hover:-translate-y-0.5 transition-all disabled:opacity-70 mt-4 flex justify-center items-center gap-2 active:scale-95">
                {submitting ? "Saving Profile..." : (editingLeaderId ? "Update Profile" : "Publish Profile to Website")}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
