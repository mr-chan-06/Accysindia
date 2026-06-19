"use client";

import { Plus, Edit3, Trash2, Loader2, X, Users, Building2 } from "lucide-react";
import { useState, useEffect } from "react";

type PageTarget = "eagles" | "company";

const EAGLES_ROLES = [
  "Vice president",
  "Mentor",
];

const COMPANY_ROLES = [
  "MD&CEO",
  "Founder Director",
  "Vice president",
];

const TAB_CONFIG: Record<
  PageTarget,
  { label: string; icon: React.ElementType; color: string; description: string; roles: string[] }
> = {
  eagles: {
    label: "About Eagles Team",
    icon: Users,
    color: "from-primary to-yellow-500",
    description: "People displayed on the About Eagles Team page — Founders, Mentors, and Vice Presidents.",
    roles: EAGLES_ROLES,
  },
  company: {
    label: "About Company",
    icon: Building2,
    color: "from-blue-600 to-indigo-500",
    description: "People displayed on the About Company page — Corporate Founders and Directors.",
    roles: COMPANY_ROLES,
  },
};

export default function PeopleManagement() {
  const [activeTab, setActiveTab] = useState<PageTarget>("eagles");
  const [leaders, setLeaders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [editingLeaderId, setEditingLeaderId] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    role: EAGLES_ROLES[0],
    description: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const tab = TAB_CONFIG[activeTab];

  const fetchLeaders = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/leaders?page=${activeTab}`);
      if (res.ok) {
        const data = await res.json();
        setLeaders(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaders();
  }, [activeTab]);

  const openAddModal = () => {
    setFormData({ name: "", role: tab.roles[0], description: "" });
    setEditingLeaderId(null);
    setImageFile(null);
    setImagePreview(null);
    setIsModalOpen(true);
  };

  const handleEdit = (leader: any) => {
    setFormData({
      name: leader.name,
      role: leader.role,
      description: leader.description || "",
    });
    setEditingLeaderId(leader._id);
    setImageFile(null);
    setImagePreview(leader.image || null);
    setIsModalOpen(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImagePreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this profile?")) return;
    try {
      const res = await fetch(`/api/admin/leaders/${id}`, { method: "DELETE" });
      if (res.ok) fetchLeaders();
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("role", formData.role);
      data.append("description", formData.description);
      data.append("page", activeTab);
      if (imageFile) data.append("image", imageFile);

      const url = editingLeaderId
        ? `/api/admin/leaders/${editingLeaderId}`
        : "/api/admin/leaders";
      const method = editingLeaderId ? "PUT" : "POST";

      const res = await fetch(url, { method, body: data });
      if (res.ok) {
        setIsModalOpen(false);
        setFormData({ name: "", role: tab.roles[0], description: "" });
        setImageFile(null);
        setImagePreview(null);
        setEditingLeaderId(null);
        fetchLeaders();
        setSuccessMessage(
          `Profile successfully ${editingLeaderId ? "updated" : "added"} to ${tab.label}!`
        );
        setTimeout(() => setSuccessMessage(""), 4000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto pb-20">
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight mb-2">
          People Management
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Manage founders, directors and leaders for each About page separately.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 mb-8 flex-wrap">
        {(Object.keys(TAB_CONFIG) as PageTarget[]).map((key) => {
          const t = TAB_CONFIG[key];
          const Icon = t.icon;
          const isActive = activeTab === key;
          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-2xl font-bold text-sm transition-all duration-200 border ${
                isActive
                  ? `bg-gradient-to-r ${t.color} text-white border-transparent shadow-lg`
                  : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-primary/40 hover:text-primary"
              }`}
            >
              <Icon className="w-4 h-4" />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Active Tab Info Bar */}
      <div className={`mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r ${tab.color} text-white`}>
        <div>
          <div className="font-black text-lg mb-0.5">{tab.label}</div>
          <p className="text-white/80 text-sm font-medium">{tab.description}</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-5 py-2.5 bg-white/20 hover:bg-white/30 text-white text-sm font-bold rounded-xl transition-all whitespace-nowrap backdrop-blur-sm border border-white/30"
        >
          <Plus className="w-4 h-4" />
          Add to {tab.label}
        </button>
      </div>

      {/* Success Toast */}
      {successMessage && (
        <div className="mb-6 px-6 py-4 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-2xl flex items-center gap-3 text-emerald-700 dark:text-emerald-400 font-bold">
          <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          {successMessage}
        </div>
      )}

      {/* Table */}
      <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden min-h-[400px]">
        {loading ? (
          <div className="w-full h-64 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : leaders.length === 0 ? (
          <div className="w-full h-64 flex flex-col items-center justify-center text-gray-500 gap-3">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tab.color} flex items-center justify-center`}>
              <tab.icon className="w-8 h-8 text-white" />
            </div>
            <p className="font-bold text-xl text-gray-900 dark:text-white">No profiles yet</p>
            <p className="font-medium text-base text-center max-w-xs">
              Click &ldquo;Add to {tab.label}&rdquo; to create the first profile for this page.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/30 border-b border-gray-100 dark:border-gray-800">
                  <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Profile</th>
                  <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Role</th>
                  <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Description</th>
                  <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {leaders.map((leader) => (
                  <tr key={leader._id} className="hover:bg-primary/5 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        {leader.image ? (
                          <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 border-2 border-primary/20 shrink-0">
                            <img src={leader.image} alt={leader.name} className="w-full h-full object-cover" />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl shrink-0">
                            {leader.name[0]}
                          </div>
                        )}
                        <span className="font-bold text-gray-900 dark:text-white">{leader.name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`inline-block text-xs font-bold px-3 py-1.5 rounded-full bg-gradient-to-r ${tab.color} text-white`}>
                        {leader.role}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-sm text-gray-500 max-w-xs truncate">
                      {leader.description || <span className="italic text-gray-300">—</span>}
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex justify-end gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEdit(leader)}
                          className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-primary hover:text-white transition-colors"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(leader._id)}
                          className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-red-500 hover:text-white transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-gray-900 w-full max-w-2xl rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative border border-gray-100 dark:border-gray-800 my-8">
            {/* Modal close */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-7 right-7 w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-500 hover:text-primary hover:bg-primary/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r ${tab.color} text-white text-xs font-bold mb-4`}>
              <tab.icon className="w-3.5 h-3.5" />
              {tab.label}
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight">
              {editingLeaderId ? "Edit Profile" : "Add New Profile"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name + Role */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-400 uppercase tracking-widest mb-3">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-5 py-4 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary outline-none dark:text-white font-medium"
                    placeholder="E.g. Mr. Arjun Kumar"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-400 uppercase tracking-widest mb-3">
                    Role / Position
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-5 py-4 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary outline-none dark:text-white font-bold cursor-pointer"
                  >
                    {tab.roles.map((r) => (
                      <option key={r}>{r}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Image Upload with Preview */}
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-400 uppercase tracking-widest mb-3">
                  Profile Photo
                </label>
                <div className="flex items-center gap-5">
                  {imagePreview && (
                    <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-primary/30 shrink-0 bg-gray-100">
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      required={!editingLeaderId}
                      className="w-full px-5 py-4 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary outline-none dark:text-white font-medium"
                    />
                    <p className="text-xs text-gray-400 mt-2 font-medium">
                      Square image recommended (e.g. 800×800px).{" "}
                      {editingLeaderId && "Leave blank to keep the current photo."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-400 uppercase tracking-widest mb-3">
                  Bio / Description <span className="text-gray-400 normal-case font-normal">(optional)</span>
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-5 py-4 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary outline-none dark:text-white font-medium resize-none leading-relaxed"
                  placeholder="Short bio, quote, or mission statement…"
                />
              </div>

              <button
                disabled={submitting}
                type="submit"
                className={`w-full py-5 bg-gradient-to-r ${tab.color} text-white rounded-2xl font-black tracking-wide text-xl hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-70 flex justify-center items-center gap-2`}
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Saving…
                  </>
                ) : editingLeaderId ? (
                  "Update Profile"
                ) : (
                  `Publish to ${tab.label}`
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
