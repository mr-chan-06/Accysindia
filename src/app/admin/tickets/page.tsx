"use client";

import { Trash2, Loader2, Ticket, Phone, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";

export default function TicketsManagement() {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");

  const fetchRegistrations = async () => {
    try {
      const res = await fetch("/api/admin/tickets");
      if (res.ok) {
        setRegistrations(await res.json());
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this ticket registration?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/tickets/${id}`, { method: "DELETE" });
      if (res.ok) {
        setRegistrations(prev => prev.filter(r => r._id !== id));
        setSuccessMessage("Ticket registration successfully removed!");
        setTimeout(() => setSuccessMessage(""), 3500);
      } else {
        alert("Failed to delete entry.");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setDeletingId(null);
    }
  };

  const handleWhatsAppContact = (reg: any) => {
    // Generate text message for verification
    const text = encodeURIComponent(
      `Hi ${reg.name}! We received your booking request for ${reg.ticketsCount} ticket(s) to "${reg.eventTitle}". Let's finalize your booking passes.`
    );
    // Remove non-digit characters except possibly +
    const cleanNum = reg.phone.replace(/[^\d+]/g, "");
    const formattedNum = cleanNum.startsWith("+") ? cleanNum.slice(1) : cleanNum;
    window.open(`https://wa.me/${formattedNum}?text=${text}`, "_blank");
  };

  return (
    <div className="max-w-7xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight mb-2">
            Ticket Registrations
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            View convention reservations, click phone numbers to contact qualifiers over WhatsApp, and delete entries once verified.
          </p>
        </div>
      </div>

      {successMessage && (
        <div className="mb-8 px-6 py-4 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-2xl flex items-center gap-3 text-emerald-700 dark:text-emerald-400 font-bold animate-in fade-in slide-in-from-top-4">
          <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          {successMessage}
        </div>
      )}

      <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden min-h-[400px]">
        {loading ? (
          <div className="w-full h-64 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : registrations.length === 0 ? (
          <div className="w-full h-64 flex flex-col items-center justify-center text-gray-500">
            <Ticket className="w-12 h-12 text-gray-300 dark:text-gray-700 mb-4" />
            <p className="font-bold text-xl text-gray-900 dark:text-white mb-2">
              No Ticket Registrations
            </p>
            <p className="font-medium text-lg">
              Bookings made from the public events portal will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/30 border-b border-gray-100 dark:border-gray-800">
                  <th className="px-10 py-6 text-xs font-bold text-gray-400 uppercase tracking-widest leading-relaxed">
                    Attendee Name
                  </th>
                  <th className="px-10 py-6 text-xs font-bold text-gray-400 uppercase tracking-widest leading-relaxed">
                    Event Convention
                  </th>
                  <th className="px-10 py-6 text-xs font-bold text-gray-400 uppercase tracking-widest leading-relaxed">
                    Ticket Count
                  </th>
                  <th className="px-10 py-6 text-xs font-bold text-gray-400 uppercase tracking-widest leading-relaxed">
                    Contact Phone
                  </th>
                  <th className="px-10 py-6 text-xs font-bold text-gray-400 uppercase tracking-widest leading-relaxed">
                    Registered On
                  </th>
                  <th className="px-10 py-6 text-xs font-bold text-gray-400 uppercase tracking-widest leading-relaxed text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {registrations.map((reg) => (
                  <tr key={reg._id} className="hover:bg-primary/5 transition-colors group">
                    <td className="px-10 py-6 font-bold text-gray-900 dark:text-white text-base">
                      {reg.name}
                    </td>
                    <td className="px-10 py-6 text-sm font-semibold text-primary">
                      {reg.eventTitle}
                    </td>
                    <td className="px-10 py-6">
                      <span className="bg-primary/10 text-primary border border-primary/20 text-xs font-extrabold px-3 py-1 rounded-full">
                        {reg.ticketsCount} ticket{reg.ticketsCount > 1 ? "s" : ""}
                      </span>
                    </td>
                    <td className="px-10 py-6">
                      <button
                        onClick={() => handleWhatsAppContact(reg)}
                        className="flex items-center gap-1.5 font-bold text-emerald-500 hover:text-emerald-600 transition-colors text-sm"
                        title="Chat on WhatsApp"
                      >
                        <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{reg.phone}</span>
                        <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                      </button>
                    </td>
                    <td className="px-10 py-6 text-sm font-medium text-gray-500 dark:text-gray-400">
                      {new Date(reg.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-10 py-6 flex justify-end gap-3 opacity-80 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleDelete(reg._id)}
                        disabled={deletingId === reg._id}
                        title="Delete Entry"
                        className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-red-500 hover:text-white transition-all active:scale-95 disabled:opacity-50"
                      >
                        {deletingId === reg._id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
