"use client";

import { useEffect, useState } from "react";
import { Achiever } from "@/models/Achiever"; // only for TypeScript typing
import { Plus, Edit3, Trash2, Loader2, X } from "lucide-react";

interface AchieverData {
  _id: string;
  name: string;
  role: string;
  description?: string;
  image: string;
  location?: string;
  date?: string;
}

export default function AdminAchievers() {
  const [achievers, setAchievers] = useState<AchieverData[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    role: "Diamond Directors & Above",
    description: "",
    location: "",
    date: ""
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const fetchAchievers = async () => {
    try {
      const res = await fetch("/api/admin/achievers");
      if (res.ok) setAchievers(await res.json());
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAchievers();
  }, []);

  const resetForm = () => {
    setForm({
      name: "",
      role: "Diamond Directors & Above",
      description: "",
      location: "",
      date: ""
    });
    setImageFile(null);
    setEditingId(null);
  };

  const handleEdit = (a: AchieverData) => {
    setForm({
      name: a.name,
      role: a.role,
      description: a.description ?? "",
      location: a.location ?? "",
      date: a.date ?? ""
    });
    setEditingId(a._id);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this achiever?")) return;
    await fetch(`/api/admin/achievers?id=${id}`, { method: "DELETE" });
    fetchAchievers();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const data = new FormData();
    data.append("name", form.name);
    data.append("role", form.role);
    data.append("description", form.description);
    data.append("location", form.location);
    data.append("date", form.date);
    if (imageFile) data.append("image", imageFile);
    const url = "/api/admin/achievers";
    const method = editingId ? "PUT" : "POST";
    if (editingId) data.append("id", editingId);
    await fetch(url, { method, body: data });
    resetForm();
    setModalOpen(false);
    fetchAchievers();
    setSubmitting(false);
  };

  return (
    <div className="max-w-5xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Achievers Management</h1>
      <button
        onClick={() => {
          resetForm();
          setModalOpen(true);
        }}
        className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded"
      >
        <Plus className="w-4 h-4" /> Add Achiever
      </button>

      {loading ? (
        <div className="mt-6"><Loader2 className="animate-spin" /></div>
      ) : (
        <table className="w-full mt-6 border-collapse">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Role</th>
              <th className="p-2 text-left">Location</th>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {achievers.map(a => (
              <tr key={a._id} className="border-b">
                <td className="p-2 font-semibold">{a.name}</td>
                <td className="p-2 text-sm text-gray-500">{a.role}</td>
                <td className="p-2 text-sm text-gray-500">{a.location || "-"}</td>
                <td className="p-2 text-sm text-gray-500">{a.date || "-"}</td>
                <td className="p-2 space-x-2">
                  <button onClick={() => handleEdit(a)} className="p-1 text-primary"><Edit3 className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(a._id)} className="p-1 text-red-600"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {modalOpen && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-900 p-6 rounded w-full max-w-md relative">
            <button onClick={() => setModalOpen(false)} className="absolute top-2 right-2"><X className="w-5 h-5" /></button>
            <h2 className="text-xl font-bold mb-4">{editingId ? "Edit" : "Add"} Achiever</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-1">Name</label>
                <input placeholder="Name (e.g. Mrs. Sudha Arumugam)" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required className="w-full p-2 border rounded text-black dark:text-white dark:bg-gray-800" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-1">Role / Achievement</label>
                <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} required className="w-full p-2 border rounded text-black dark:text-white dark:bg-gray-800">
                  <option value="Diamond Directors & Above">Diamond Directors & Above</option>
                  <option value="President Diamond Directors & Above">President Diamond Directors & Above</option>
                  <option value="Car Achievers">Car Achievers</option>
                  <option value="House Achievers">House Achievers</option>
                  <option value="Foreign Trip Achievers">Foreign Trip Achievers</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-1">Location</label>
                <input placeholder="Location (e.g. Viruthunagar, Tamilnadu.)" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} className="w-full p-2 border rounded text-black dark:text-white dark:bg-gray-800" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-1">Date</label>
                <input placeholder="Date (e.g. 18-08-2025)" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="w-full p-2 border rounded text-black dark:text-white dark:bg-gray-800" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-1">Short Description / Testimonial</label>
                <textarea placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full p-2 border rounded text-black dark:text-white dark:bg-gray-800" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-1">Profile Photo</label>
                <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] ?? null)} className="w-full text-sm text-gray-500" />
              </div>
              <button type="submit" disabled={submitting} className="w-full bg-primary text-black font-bold p-2.5 rounded transition-colors hover:opacity-90">{submitting ? "Saving..." : editingId ? "Update" : "Create"}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
