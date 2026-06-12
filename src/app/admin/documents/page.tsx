"use client";

import { Plus, Trash2, Loader2, FileText, Download, X, UploadCloud } from "lucide-react";
import { useState, useEffect } from "react";

export default function DocumentsManagement() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({ name: "" });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fetchDocuments = async () => {
    try {
      const res = await fetch("/api/admin/documents");
      if (res.ok) setDocuments(await res.json());
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this document?")) return;
    try {
      const res = await fetch(`/api/admin/documents/${id}`, { method: "DELETE" });
      if (res.ok) fetchDocuments();
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;
    
    setSubmitting(true);
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('file', selectedFile);

      const res = await fetch("/api/admin/documents", {
        method: "POST",
        body: data,
      });
      
      if (res.ok) {
        setIsModalOpen(false);
        setFormData({ name: "" });
        setSelectedFile(null);
        fetchDocuments();
        setSuccessMessage("Document successfully uploaded!");
        setTimeout(() => setSuccessMessage(""), 3500);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="max-w-7xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight mb-2">Company Documents CMS</h1>
          <p className="text-gray-500 dark:text-gray-400">Upload and manage official documents, certificates, and legal papers displayed on the About Company page.</p>
        </div>
        <button 
          onClick={() => {
            setFormData({ name: "" });
            setSelectedFile(null);
            setIsModalOpen(true);
          }}
          className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-primary to-orange-500 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/20 transition-all hover:-translate-y-0.5 active:scale-95"
        >
          <Plus className="w-5 h-5" /> Upload Document
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

      <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        {loading ? (
          <div className="w-full h-64 flex items-center justify-center"><Loader2 className="w-8 h-8 text-primary animate-spin" /></div>
        ) : documents.length === 0 ? (
          <div className="w-full h-96 flex flex-col items-center justify-center text-gray-500">
            <div className="w-20 h-20 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
              <FileText className="w-10 h-10 text-gray-300" />
            </div>
            <p className="font-bold text-xl text-gray-900 dark:text-white mb-2">No Documents Found</p>
            <p className="font-medium">Upload your first official document to get started.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/30 border-b border-gray-100 dark:border-gray-800">
                  <th className="px-10 py-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Document Name</th>
                  <th className="px-10 py-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Type / Size</th>
                  <th className="px-10 py-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Date Uploaded</th>
                  <th className="px-10 py-6 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {documents.map((doc) => (
                  <tr key={doc._id} className="hover:bg-primary/5 transition-colors group">
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-500/10 flex items-center justify-center text-red-600 dark:text-red-400">
                          <FileText className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-gray-900 dark:text-white">{doc.name}</span>
                      </div>
                    </td>
                    <td className="px-10 py-6 uppercase">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-primary">{doc.type.split('/')[1] || doc.type}</span>
                        <span className="text-xs text-gray-500 font-medium">{formatFileSize(doc.size)}</span>
                      </div>
                    </td>
                    <td className="px-10 py-6 text-sm text-gray-500 font-medium">
                      {new Date(doc.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                    </td>
                    <td className="px-10 py-6 flex justify-end gap-3 items-center">
                      <a href={doc.url} download={doc.name} className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-emerald-500 hover:text-white transition-colors">
                        <Download className="w-4 h-4" />
                      </a>
                      <button onClick={() => handleDelete(doc._id)} className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-red-500 hover:text-white transition-colors">
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
          <div className="bg-white dark:bg-gray-900 w-full max-w-lg rounded-[2.5rem] p-10 shadow-2xl relative border border-gray-100 dark:border-gray-800">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-500 hover:text-primary transition-colors">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight">Upload Document</h2>
            <form onSubmit={handleUpload} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-400 uppercase tracking-widest mb-3">Display Name</label>
                <input type="text" value={formData.name} onChange={e => setFormData({name: e.target.value})} required className="w-full px-5 py-4 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary outline-none dark:text-white font-medium" placeholder="E.g. ISO Certificate 2024" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-400 uppercase tracking-widest mb-3">Select File (PDF, Images)</label>
                <div className="relative group">
                  <input type="file" onChange={e => setSelectedFile(e.target.files?.[0] || null)} required className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                  <div className="w-full px-5 py-10 bg-gray-50 dark:bg-black border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl flex flex-col items-center justify-center group-hover:border-primary transition-colors">
                    <UploadCloud className="w-10 h-10 text-gray-400 group-hover:text-primary mb-3 transition-colors" />
                    <p className="text-gray-600 dark:text-gray-400 font-bold text-sm">{selectedFile ? selectedFile.name : "Click to browse or drag & drop"}</p>
                    <p className="text-xs text-gray-400 mt-2 font-medium">PDF, JPG, PNG up to 10MB</p>
                  </div>
                </div>
              </div>
              
              <button disabled={submitting || !selectedFile} type="submit" className="w-full py-5 bg-gradient-to-r from-primary to-orange-500 text-white rounded-2xl font-black tracking-wide text-xl hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all disabled:opacity-70 mt-4 flex justify-center items-center gap-2 active:scale-95">
                {submitting ? <Loader2 className="w-6 h-6 animate-spin" /> : "Start Upload"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
