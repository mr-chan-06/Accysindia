"use client";

import { useState, useEffect } from "react";
import { Search, ChevronRight, ChevronDown, User, X, Loader2, Trash2 } from "lucide-react";

function TreeNode({ node, level = 0, onDelete }: { node: any, level?: number, onDelete: (id: string, name: string) => void }) {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="w-full">
      <div 
        className={`flex items-center justify-between p-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl mb-3 hover:border-primary/30 transition-colors ${level > 0 ? "ml-8" : ""}`}
      >
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setExpanded(!expanded)} 
            className={`w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${!hasChildren ? "invisible" : ""}`}
          >
            {expanded ? <ChevronDown className="w-5 h-5 text-gray-500" /> : <ChevronRight className="w-5 h-5 text-gray-500" />}
          </button>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/10 to-accent/20 flex items-center justify-center font-bold text-primary shrink-0">
            {node.name?.[0] || 'U'}
          </div>
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white">{node.name}</h4>
            <p className="text-xs text-gray-500">{node.email}</p>
          </div>
        </div>
        
        <div className="hidden lg:flex gap-12 items-center">
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300 w-32">{node.plan || "Free Tier"}</div>
          <div className="text-sm font-bold text-emerald-500 w-20">{node.walletBalance || 0} PV</div>
          <div className="text-sm text-gray-500 w-24">{new Date(node.createdAt).toLocaleDateString()}</div>
          <div className="w-24 text-right">
            <span className="px-3 py-1 text-xs font-bold rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400">
              Active
            </span>
            <button 
              onClick={() => onDelete(node._id, node.name)} 
              className="ml-4 w-8 h-8 rounded-lg bg-red-100 hover:bg-red-500 text-red-600 hover:text-white dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500 dark:hover:text-white inline-flex items-center justify-center transition-colors align-middle"
              title="Delete User"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      
      {expanded && hasChildren && (
        <div className="border-l-2 border-gray-200 dark:border-gray-800 ml-8 pl-4 mb-3">
          {node.children.map((child: any) => (
            <TreeNode key={child._id} node={child} level={level + 1} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function UserManagement() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      if (res.ok) {
        const data = await res.json();
        
        // Build nested tree locally based on 'referrer' keys for MLM visualization
        const userMap = new Map();
        data.forEach((u: any) => {
          userMap.set(u._id, { ...u, children: [] });
        });

        const tree: any[] = [];
        userMap.forEach((u: any) => {
          if (u.referrer && userMap.has(u.referrer)) {
            userMap.get(u.referrer).children.push(u);
          } else {
            tree.push(u);
          }
        });

        setUsers(tree);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setIsModalOpen(false);
        setFormData({ name: "", email: "", password: "" });
        fetchUsers();
      } else {
        alert("Failed to add user");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteUser = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete ${name}?`)) return;
    try {
      const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchUsers();
      } else {
        const data = await res.json();
        alert(data.message || "Failed to delete user");
      }
    } catch (e) {
      console.error(e);
      alert("Error deleting user");
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight mb-2">User Management</h1>
          <p className="text-gray-500 dark:text-gray-400">View and manage the comprehensive referral network tree connected directly to MongoDB.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5"
        >
          <User className="w-4 h-4" /> Add New User
        </button>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-800 p-8 md:p-10 mb-8 min-h-[500px]">
        <div className="flex items-center gap-4 bg-gray-50 dark:bg-black rounded-xl px-4 py-3 border border-gray-200 dark:border-gray-800 mb-10 w-full max-w-md focus-within:border-primary/50 transition-colors">
          <Search className="w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search users by name or email..." 
            className="bg-transparent border-none outline-none text-gray-900 dark:text-white w-full text-sm font-medium placeholder-gray-400"
          />
        </div>

        <div className="hidden lg:flex items-center justify-between px-16 py-4 border-b border-gray-100 dark:border-gray-800 mb-6 text-xs font-bold text-gray-400 uppercase tracking-widest">
          <div className="w-64">User Tree Structure</div>
          <div className="flex gap-12 pr-4">
            <div className="w-32">Current Plan</div>
            <div className="w-20">Total PV</div>
            <div className="w-24">Join Date</div>
            <div className="w-24 text-right">Status</div>
          </div>
        </div>

        <div className="space-y-4">
          {loading ? (
             <div className="flex items-center justify-center p-10"><Loader2 className="w-8 h-8 text-primary animate-spin" /></div>
          ) : users.length === 0 ? (
             <div className="text-center p-10 text-gray-500 font-medium">No users found in Database. Click 'Add New User' to populate the tree.</div>
          ) : (
            users.map((user) => (
              <TreeNode key={user._id} node={user} onDelete={handleDeleteUser} />
            ))
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl relative border border-gray-100 dark:border-gray-800">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 text-gray-400 hover:text-primary transition-colors">
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Add New User</h2>
            <form onSubmit={handleAddUser} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-400 uppercase tracking-widest mb-2">Full Name</label>
                <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required className="w-full px-5 py-4 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary outline-none dark:text-white font-medium" placeholder="E.g. Priya Sharma" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
                <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required className="w-full px-5 py-4 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary outline-none dark:text-white font-medium" placeholder="priya@example.com" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-400 uppercase tracking-widest mb-2">Password</label>
                <input type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} required className="w-full px-5 py-4 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary outline-none dark:text-white font-medium" placeholder="••••••••" />
              </div>
              <button disabled={submitting} type="submit" className="w-full py-5 bg-gradient-to-r from-primary to-accent-foreground text-white rounded-xl font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-70 mt-4">
                {submitting ? "Saving to Database..." : "Save User"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
