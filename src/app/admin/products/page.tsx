"use client";

import { Plus, Edit3, Trash2, Loader2, X } from "lucide-react";
import { useState, useEffect } from "react";
import { DEFAULT_KITS } from "@/app/products/page";

export default function ProductsManagement() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "", category: "Grocery", price: "", stock: "", pv: "", description: ""
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/admin/products");
      if (res.ok) {
        const dbProducts = await res.json();
        setProducts([...DEFAULT_KITS, ...dbProducts]);
      } else {
        setProducts(DEFAULT_KITS);
      }
    } catch (e) {
      console.error(e);
      setProducts(DEFAULT_KITS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (id.startsWith("kit")) {
      alert("Built-in system kits are read-only and cannot be deleted.");
      return;
    }
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      if (res.ok) fetchProducts();
    } catch (e) {
      console.error(e);
    }
  };

  const handleEditClick = (product: any) => {
    if (product._id.startsWith("kit")) {
      alert("Built-in system kits are read-only and cannot be edited in the CMS.");
      return;
    }
    setEditingId(product._id);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
      pv: product.pv.toString(),
      description: product.description || ""
    });
    setImageFile(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({ name: "", category: "Grocery", price: "", stock: "", pv: "", description: "" });
    setImageFile(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('category', formData.category);
      data.append('price', formData.price);
      data.append('stock', formData.stock);
      data.append('pv', formData.pv);
      data.append('description', formData.description);
      if (imageFile) {
        data.append('image', imageFile);
      }

      const url = editingId ? `/api/admin/products/${editingId}` : "/api/admin/products";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method: method,
        body: data,
      });
      if (res.ok) {
        closeModal();
        fetchProducts();
        setSuccessMessage(editingId ? "Product successfully updated!" : "Product successfully added to the catalog!");
        setTimeout(() => setSuccessMessage(""), 3500);
      } else {
        const err = await res.json();
        alert("Failed to save: " + err.message);
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight mb-2">Products CMS</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage e-commerce inventory and PV allocations directly on MongoDB.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-secondary to-amber-500 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-secondary/20 transition-all hover:-translate-y-0.5"
        >
          <Plus className="w-5 h-5" /> Add Product
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
        ) : products.length === 0 ? (
          <div className="w-full h-64 flex flex-col items-center justify-center text-gray-500">
            <p className="font-bold text-xl text-gray-900 dark:text-white mb-2">No Products in Database</p>
            <p className="font-medium text-lg">Click 'Add Product' to list a new item.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/30 border-b border-gray-100 dark:border-gray-800">
                  <th className="px-10 py-6 text-xs font-bold text-gray-400 uppercase tracking-widest leading-relaxed">Product Name</th>
                  <th className="px-10 py-6 text-xs font-bold text-gray-400 uppercase tracking-widest leading-relaxed">Category</th>
                  <th className="px-10 py-6 text-xs font-bold text-gray-400 uppercase tracking-widest leading-relaxed">Price</th>
                  <th className="px-10 py-6 text-xs font-bold text-gray-400 uppercase tracking-widest leading-relaxed">Stock</th>
                  <th className="px-10 py-6 text-xs font-bold text-gray-400 uppercase tracking-widest leading-relaxed">PV Allocation</th>
                  <th className="px-10 py-6 text-xs font-bold text-gray-400 uppercase tracking-widest leading-relaxed text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {products.map((product) => {
                  const isBuiltIn = product._id.startsWith("kit");
                  return (
                    <tr key={product._id} className="hover:bg-primary/5 transition-colors group">
                      <td className="px-10 py-6 font-bold text-gray-900 dark:text-white text-base max-w-[250px] truncate">
                        <div className="flex items-center gap-2.5">
                          <span className="truncate">{product.name}</span>
                          {isBuiltIn && (
                            <span className="shrink-0 bg-primary/10 text-primary border border-primary/20 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                              Built-in
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-10 py-6 text-sm font-semibold text-primary">{product.category}</td>
                      <td className="px-10 py-6 text-base font-extrabold text-gray-900 dark:text-white">₹{product.price}</td>
                      <td className="px-10 py-6">
                        <span className={`px-4 py-1.5 text-xs font-bold rounded-full ${isBuiltIn || product.stock > 20 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'}`}>
                          {isBuiltIn ? "Unlimited" : `${product.stock} in stock`}
                        </span>
                      </td>
                      <td className="px-10 py-6 text-base font-black text-emerald-500">+{product.pv} PV</td>
                      <td className="px-10 py-6 flex justify-end gap-3 opacity-80 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleEditClick(product)} 
                          title={isBuiltIn ? "Built-in system kits cannot be edited in CMS" : "Edit Product"}
                          disabled={isBuiltIn}
                          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isBuiltIn ? "bg-gray-50 dark:bg-gray-800/30 text-gray-300 dark:text-gray-700 cursor-not-allowed opacity-50" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-primary hover:text-white active:scale-95"}`}
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(product._id)} 
                          title={isBuiltIn ? "Built-in system kits cannot be deleted" : "Delete Product"}
                          disabled={isBuiltIn}
                          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isBuiltIn ? "bg-gray-50 dark:bg-gray-800/30 text-gray-300 dark:text-gray-700 cursor-not-allowed opacity-50" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-red-500 hover:text-white active:scale-95"}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 w-full max-w-3xl rounded-[2.5rem] p-10 shadow-2xl relative border border-gray-100 dark:border-gray-800">
            <button onClick={closeModal} className="absolute top-8 right-8 w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-500 hover:text-primary hover:bg-primary/10 transition-colors">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight">{editingId ? "Edit Product" : "Add New Product"}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-400 uppercase tracking-widest mb-3">Product Name</label>
                  <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required className="w-full px-5 py-4 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary outline-none dark:text-white font-medium" placeholder="E.g. Organic Rice" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-400 uppercase tracking-widest mb-3">Category</label>
                  <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-5 py-4 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary outline-none dark:text-white font-bold cursor-pointer transition-colors">
                    <option>Premium Kits</option>
                    <option>Grocery</option>
                    <option>Garments</option>
                    <option>Health & Personal Care</option>
                    <option>Kitchen Appliances</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-400 uppercase tracking-widest mb-3">Price (₹)</label>
                  <input type="number" min="0" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required className="w-full px-5 py-4 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary outline-none dark:text-white font-black text-xl" placeholder="1000" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-400 uppercase tracking-widest mb-3">Stock count</label>
                  <input type="number" min="0" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} required className="w-full px-5 py-4 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary outline-none dark:text-white font-medium" placeholder="50" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-400 uppercase tracking-widest mb-3">PV Value</label>
                  <input type="number" min="0" value={formData.pv} onChange={e => setFormData({...formData, pv: e.target.value})} required className="w-full px-5 py-4 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary outline-none dark:text-white font-black text-primary" placeholder="10" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-400 uppercase tracking-widest mb-3">Product Image</label>
                <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} className="w-full px-5 py-4 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary outline-none dark:text-white font-medium" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-400 uppercase tracking-widest mb-3">Description (Optional)</label>
                <textarea rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-5 py-4 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary outline-none dark:text-white font-medium resize-none leading-relaxed" placeholder="Product details..."></textarea>
              </div>
              
              <button disabled={submitting} type="submit" className="w-full py-5 bg-gradient-to-r from-secondary to-amber-500 text-white rounded-2xl font-black tracking-wide text-xl hover:shadow-xl hover:shadow-secondary/30 hover:-translate-y-0.5 transition-all disabled:opacity-70 mt-2 flex justify-center items-center gap-2">
                {submitting ? "Saving Data..." : editingId ? "Update Product Details" : "Publish Product to Catalog"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
