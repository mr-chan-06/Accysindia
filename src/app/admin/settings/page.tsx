"use client";

import { useState, useEffect } from "react";
import { 
  Loader2, 
  Save, 
  Phone, 
  Mail, 
  MapPin, 
  Share2, 
  Sparkles, 
  Award, 
  Target, 
  Building, 
  Ticket, 
  Plus, 
  Trash2,
  CheckCircle2
} from "lucide-react";

export default function SettingsManagement() {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [activeTab, setActiveTab] = useState("contact"); // contact, hero, depots, events

  // Main settings state
  const [settings, setSettings] = useState({
    phone1: "",
    phone2: "",
    whatsapp: "",
    email1: "",
    email2: "",
    officeAddress: "",
    instagram: "",
    facebook: "",
    youtube: "",
    twitter: "",
    tickerAnnouncement: "",
    statTurnover: 5000,
    statProducts: 10000,
    statCenters: 300,
    statMembers: 100,
    statCarAchievers: 500,
    statHouseAchievers: 100,
    statIncomeEarners: 10000,
    statAbroadTrips: 10,
    statWeeklyEarners: 1000,
    visionStatement: "",
    missionPoints: [] as string[],
    rebrandingDescription1: "",
    rebrandingDescription2: "",
    dispatchCenters: [] as { city: string; address: string; phone: string }[],
    upcomingEvents: [] as { title: string; date: string; location: string; price: number; description: string }[]
  });

  // Local helper states for arrays
  const [newMissionPoint, setNewMissionPoint] = useState("");
  const [newDepot, setNewDepot] = useState({ city: "", address: "", phone: "" });
  const [newEvent, setNewEvent] = useState({ title: "", date: "", location: "", price: 0, description: "" });

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/settings");
      if (res.ok) {
        const data = await res.json();
        setSettings(data);
      }
    } catch (e) {
      console.error("Error loading settings:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings)
      });
      if (res.ok) {
        setSuccessMessage("Settings successfully updated!");
        setTimeout(() => setSuccessMessage(""), 4000);
      } else {
        const errData = await res.json();
        alert("Failed to save settings: " + errData.message);
      }
    } catch (e) {
      console.error(e);
      alert("Error saving settings.");
    } finally {
      setSubmitting(false);
    }
  };

  // Mission points handlers
  const addMissionPoint = () => {
    if (!newMissionPoint.trim()) return;
    setSettings({
      ...settings,
      missionPoints: [...settings.missionPoints, newMissionPoint.trim()]
    });
    setNewMissionPoint("");
  };

  const removeMissionPoint = (index: number) => {
    const updated = [...settings.missionPoints];
    updated.splice(index, 1);
    setSettings({ ...settings, missionPoints: updated });
  };

  // Depots handlers
  const addDepot = () => {
    if (!newDepot.city || !newDepot.address || !newDepot.phone) {
      alert("Please fill in all depot fields.");
      return;
    }
    setSettings({
      ...settings,
      dispatchCenters: [...settings.dispatchCenters, newDepot]
    });
    setNewDepot({ city: "", address: "", phone: "" });
  };

  const removeDepot = (index: number) => {
    const updated = [...settings.dispatchCenters];
    updated.splice(index, 1);
    setSettings({ ...settings, dispatchCenters: updated });
  };

  // Events handlers
  const addEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.location || !newEvent.description) {
      alert("Please fill in all event fields.");
      return;
    }
    setSettings({
      ...settings,
      upcomingEvents: [...settings.upcomingEvents, newEvent]
    });
    setNewEvent({ title: "", date: "", location: "", price: 0, description: "" });
  };

  const removeEvent = (index: number) => {
    const updated = [...settings.upcomingEvents];
    updated.splice(index, 1);
    setSettings({ ...settings, upcomingEvents: updated });
  };

  if (loading) {
    return (
      <div className="w-full min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight mb-2">Site Settings CMS</h1>
          <p className="text-gray-500 dark:text-gray-400">Control all static texts, contact details, social links, dispatch depots, and event tickets across the website.</p>
        </div>
        
        <button 
          onClick={handleSave}
          disabled={submitting}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-secondary to-amber-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-secondary/20 transition-all hover:-translate-y-0.5 disabled:opacity-75"
        >
          {submitting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Save className="w-5 h-5" />
          )}
          Save Settings
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

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 dark:border-gray-800 mb-8 overflow-x-auto whitespace-nowrap gap-6 pb-2">
        <button 
          onClick={() => setActiveTab("contact")}
          className={`pb-4 px-2 font-bold text-sm tracking-wide uppercase border-b-2 transition-all ${
            activeTab === "contact" 
              ? "border-primary text-primary" 
              : "border-transparent text-gray-400 hover:text-gray-600 dark:hover:text-white"
          }`}
        >
          Contact & Socials
        </button>
        <button 
          onClick={() => setActiveTab("hero")}
          className={`pb-4 px-2 font-bold text-sm tracking-wide uppercase border-b-2 transition-all ${
            activeTab === "hero" 
              ? "border-primary text-primary" 
              : "border-transparent text-gray-400 hover:text-gray-600 dark:hover:text-white"
          }`}
        >
          Hero & About
        </button>
        <button 
          onClick={() => setActiveTab("depots")}
          className={`pb-4 px-2 font-bold text-sm tracking-wide uppercase border-b-2 transition-all ${
            activeTab === "depots" 
              ? "border-primary text-primary" 
              : "border-transparent text-gray-400 hover:text-gray-600 dark:hover:text-white"
          }`}
        >
          Dispatch Depots
        </button>
        <button 
          onClick={() => setActiveTab("events")}
          className={`pb-4 px-2 font-bold text-sm tracking-wide uppercase border-b-2 transition-all ${
            activeTab === "events" 
              ? "border-primary text-primary" 
              : "border-transparent text-gray-400 hover:text-gray-600 dark:hover:text-white"
          }`}
        >
          Event Tickets
        </button>
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="space-y-10">
        
        {/* TAB 1: CONTACT & SOCIALS */}
        {activeTab === "contact" && (
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-10 border border-gray-100 dark:border-gray-800 shadow-sm space-y-8">
            <div className="flex items-center gap-3 border-b dark:border-gray-800 pb-4">
              <Phone className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Contact & Support Details</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Support Phone 1</label>
                <input 
                  type="text" 
                  value={settings.phone1} 
                  onChange={e => setSettings({...settings, phone1: e.target.value})} 
                  className="w-full px-5 py-4 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary outline-none dark:text-white font-medium" 
                  placeholder="e.g. +91 98765 43210" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Support Phone 2</label>
                <input 
                  type="text" 
                  value={settings.phone2} 
                  onChange={e => setSettings({...settings, phone2: e.target.value})} 
                  className="w-full px-5 py-4 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary outline-none dark:text-white font-medium" 
                  placeholder="e.g. +91 91234 56789" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">WhatsApp Connection Number (Format: CountryCode + Number, No Spaces/Dashes)</label>
                <input 
                  type="text" 
                  value={settings.whatsapp} 
                  onChange={e => setSettings({...settings, whatsapp: e.target.value})} 
                  className="w-full px-5 py-4 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary outline-none dark:text-white font-medium" 
                  placeholder="e.g. 919876543210" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Corporate Email 1</label>
                <input 
                  type="email" 
                  value={settings.email1} 
                  onChange={e => setSettings({...settings, email1: e.target.value})} 
                  className="w-full px-5 py-4 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary outline-none dark:text-white font-medium" 
                  placeholder="e.g. support@accsysindia.com" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Corporate Email 2 (Optional)</label>
                <input 
                  type="email" 
                  value={settings.email2} 
                  onChange={e => setSettings({...settings, email2: e.target.value})} 
                  className="w-full px-5 py-4 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary outline-none dark:text-white font-medium" 
                  placeholder="e.g. info@accsysindia.com" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Corporate Office Address</label>
                <input 
                  type="text" 
                  value={settings.officeAddress} 
                  onChange={e => setSettings({...settings, officeAddress: e.target.value})} 
                  className="w-full px-5 py-4 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary outline-none dark:text-white font-medium" 
                  placeholder="123 Business Avenue, Tech Hub, Silicon City, IN 560001" 
                />
              </div>
            </div>

            <div className="flex items-center gap-3 border-b dark:border-gray-800 pb-4 pt-6">
              <Share2 className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Social Media Profiles</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Instagram URL</label>
                <input 
                  type="text" 
                  value={settings.instagram} 
                  onChange={e => setSettings({...settings, instagram: e.target.value})} 
                  className="w-full px-5 py-4 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary outline-none dark:text-white font-medium" 
                  placeholder="Instagram Link" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Facebook URL</label>
                <input 
                  type="text" 
                  value={settings.facebook} 
                  onChange={e => setSettings({...settings, facebook: e.target.value})} 
                  className="w-full px-5 py-4 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary outline-none dark:text-white font-medium" 
                  placeholder="Facebook Link" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">YouTube URL</label>
                <input 
                  type="text" 
                  value={settings.youtube} 
                  onChange={e => setSettings({...settings, youtube: e.target.value})} 
                  className="w-full px-5 py-4 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary outline-none dark:text-white font-medium" 
                  placeholder="YouTube Link" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">X / Twitter URL</label>
                <input 
                  type="text" 
                  value={settings.twitter} 
                  onChange={e => setSettings({...settings, twitter: e.target.value})} 
                  className="w-full px-5 py-4 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary outline-none dark:text-white font-medium" 
                  placeholder="X/Twitter Link" 
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: HERO & ABOUT */}
        {activeTab === "hero" && (
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-10 border border-gray-100 dark:border-gray-800 shadow-sm space-y-8">
            
            {/* Header / Announcement Ticker */}
            <div className="flex items-center gap-3 border-b dark:border-gray-800 pb-4">
              <Sparkles className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Announcement Ticker (All Public Pages)</h2>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Ticker Alert Announcement Text</label>
              <textarea 
                rows={2} 
                value={settings.tickerAnnouncement} 
                onChange={e => setSettings({...settings, tickerAnnouncement: e.target.value})} 
                className="w-full px-5 py-4 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary outline-none dark:text-white font-medium resize-none leading-relaxed" 
                placeholder="Alert text displayed at top of the page..." 
              />
            </div>

            {/* Stats Counter Section */}
            <div className="flex items-center gap-3 border-b dark:border-gray-800 pb-4 pt-6">
              <Award className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Home Page Live Stats Counters (Eagles Team Milestones)</h2>
            </div>
             <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Car Achievers</label>
                <input 
                  type="number" 
                  value={settings.statCarAchievers ?? 500} 
                  onChange={e => setSettings({...settings, statCarAchievers: parseInt(e.target.value) || 0})} 
                  className="w-full px-5 py-4 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary outline-none dark:text-white font-bold" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">House Achievers</label>
                <input 
                  type="number" 
                  value={settings.statHouseAchievers ?? 100} 
                  onChange={e => setSettings({...settings, statHouseAchievers: parseInt(e.target.value) || 0})} 
                  className="w-full px-5 py-4 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary outline-none dark:text-white font-bold" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Income Earners</label>
                <input 
                  type="number" 
                  value={settings.statIncomeEarners ?? 10000} 
                  onChange={e => setSettings({...settings, statIncomeEarners: parseInt(e.target.value) || 0})} 
                  className="w-full px-5 py-4 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-850 rounded-xl focus:ring-2 focus:ring-primary outline-none dark:text-white font-bold" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Abroad Trips</label>
                <input 
                  type="number" 
                  value={settings.statAbroadTrips ?? 10} 
                  onChange={e => setSettings({...settings, statAbroadTrips: parseInt(e.target.value) || 0})} 
                  className="w-full px-5 py-4 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary outline-none dark:text-white font-bold" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Weekly Earners (Target: 1000+)</label>
                <input 
                  type="number" 
                  value={settings.statWeeklyEarners ?? 1000} 
                  onChange={e => setSettings({...settings, statWeeklyEarners: parseInt(e.target.value) || 0})} 
                  className="w-full px-5 py-4 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary outline-none dark:text-white font-bold" 
                />
              </div>
            </div>

            {/* Vision and Mission */}
            <div className="flex items-center gap-3 border-b dark:border-gray-800 pb-4 pt-6">
              <Target className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Vision & Mission Statements</h2>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Vision Statement Description</label>
              <textarea 
                rows={3} 
                value={settings.visionStatement} 
                onChange={e => setSettings({...settings, visionStatement: e.target.value})} 
                className="w-full px-5 py-4 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary outline-none dark:text-white font-medium resize-none leading-relaxed" 
                placeholder="Our Vision text..." 
              />
            </div>
            
            {/* Mission points list builder */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Mission Points Checklists</label>
              <div className="space-y-4 mb-4">
                {settings.missionPoints.map((pt, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-gray-50 dark:bg-black px-5 py-3 border border-gray-200 dark:border-gray-800 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
                    <span className="flex-1 dark:text-gray-300 font-medium text-sm">{pt}</span>
                    <button 
                      type="button" 
                      onClick={() => removeMissionPoint(idx)}
                      className="text-red-500 hover:text-red-600 transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-4">
                <input 
                  type="text" 
                  value={newMissionPoint} 
                  onChange={e => setNewMissionPoint(e.target.value)} 
                  className="flex-1 px-5 py-4 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary outline-none dark:text-white font-medium" 
                  placeholder="Type a new mission bullet point..." 
                />
                <button 
                  type="button" 
                  onClick={addMissionPoint}
                  className="px-5 py-4 bg-gray-100 dark:bg-gray-800 hover:bg-primary hover:text-black dark:hover:bg-primary transition-colors text-sm font-bold rounded-xl flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Add
                </button>
              </div>
            </div>

            {/* Rebranding Page info */}
            <div className="flex items-center gap-3 border-b dark:border-gray-800 pb-4 pt-6">
              <Sparkles className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Historic Rebranding Story (About Eagles Page)</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Rebrand Description Paragraph 1</label>
                <textarea 
                  rows={4} 
                  value={settings.rebrandingDescription1} 
                  onChange={e => setSettings({...settings, rebrandingDescription1: e.target.value})} 
                  className="w-full px-5 py-4 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary outline-none dark:text-white font-medium resize-none leading-relaxed" 
                  placeholder="Paragraph 1..." 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Rebrand Description Paragraph 2</label>
                <textarea 
                  rows={4} 
                  value={settings.rebrandingDescription2} 
                  onChange={e => setSettings({...settings, rebrandingDescription2: e.target.value})} 
                  className="w-full px-5 py-4 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary outline-none dark:text-white font-medium resize-none leading-relaxed" 
                  placeholder="Paragraph 2..." 
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: DISPATCH DEPOTS */}
        {activeTab === "depots" && (
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-10 border border-gray-100 dark:border-gray-800 shadow-sm space-y-8">
            <div className="flex items-center gap-3 border-b dark:border-gray-800 pb-4">
              <Building className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Active Dispatch Centers & Warehouses</h2>
            </div>

            {/* List current depots */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {settings.dispatchCenters.map((depot, idx) => (
                <div key={idx} className="bg-gray-50 dark:bg-black p-6 rounded-[2rem] border border-gray-200 dark:border-gray-800 flex flex-col justify-between hover:border-primary/25 transition-all">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-gray-900 dark:text-white text-base">{depot.city}</h3>
                      <button 
                        type="button" 
                        onClick={() => removeDepot(idx)}
                        className="text-red-500 hover:text-red-650 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed font-semibold">{depot.address}</p>
                  </div>
                  <div className="text-xs font-bold text-primary flex items-center gap-1.5 pt-4 mt-auto border-t dark:border-gray-800/40">
                    <Phone className="w-3.5 h-3.5 text-primary" /> {depot.phone}
                  </div>
                </div>
              ))}

              {settings.dispatchCenters.length === 0 && (
                <div className="col-span-full py-10 text-center text-gray-500 font-medium">No dispatch centers configured yet. Add one below.</div>
              )}
            </div>

            {/* Add Depot Subform */}
            <div className="bg-gray-50 dark:bg-black p-8 rounded-[2rem] border border-gray-200 dark:border-gray-800 space-y-6">
              <h3 className="font-bold text-gray-900 dark:text-white text-lg">Add New Active Depot</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">City / Branch Title</label>
                  <input 
                    type="text" 
                    value={newDepot.city} 
                    onChange={e => setNewDepot({...newDepot, city: e.target.value})} 
                    className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary outline-none dark:text-white font-semibold text-sm" 
                    placeholder="e.g. Bengaluru Hub" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Office Address</label>
                  <input 
                    type="text" 
                    value={newDepot.address} 
                    onChange={e => setNewDepot({...newDepot, address: e.target.value})} 
                    className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary outline-none dark:text-white font-semibold text-sm" 
                    placeholder="e.g. 45 Prime Ring Road, Hub" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Contact Phone</label>
                  <input 
                    type="text" 
                    value={newDepot.phone} 
                    onChange={e => setNewDepot({...newDepot, phone: e.target.value})} 
                    className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary outline-none dark:text-white font-semibold text-sm" 
                    placeholder="e.g. +91 98765 00101" 
                  />
                </div>
              </div>
              <button 
                type="button" 
                onClick={addDepot}
                className="px-5 py-3.5 bg-gradient-to-r from-secondary to-amber-500 text-white font-bold text-sm rounded-xl hover:shadow-md hover:opacity-95 transition-all flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Add Dispatch Depot
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: UPCOMING EVENTS */}
        {activeTab === "events" && (
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-10 border border-gray-100 dark:border-gray-800 shadow-sm space-y-8">
            <div className="flex items-center gap-3 border-b dark:border-gray-800 pb-4">
              <Ticket className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Upcoming Conventions & Bootcamps</h2>
            </div>

            {/* List current events */}
            <div className="grid md:grid-cols-2 gap-6">
              {settings.upcomingEvents.map((evt, idx) => (
                <div key={idx} className="bg-gray-50 dark:bg-black p-6 rounded-[2rem] border border-gray-200 dark:border-gray-800 flex flex-col justify-between hover:border-primary/20 transition-all">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">{evt.date}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-black bg-primary/20 text-primary border border-primary/20 px-2 py-0.5 rounded-full">₹{evt.price}</span>
                        <button 
                          type="button" 
                          onClick={() => removeEvent(idx)}
                          className="text-red-500 hover:text-red-650 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-extrabold text-gray-900 dark:text-white text-lg mb-1">{evt.title}</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed font-semibold">{evt.description}</p>
                    </div>
                  </div>
                  <div className="text-xs font-bold text-gray-400 flex items-center gap-1 pt-4 mt-4 border-t dark:border-gray-800/40">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" /> {evt.location}
                  </div>
                </div>
              ))}

              {settings.upcomingEvents.length === 0 && (
                <div className="col-span-full py-10 text-center text-gray-500 font-medium">No upcoming events scheduled yet. Add one below.</div>
              )}
            </div>

            {/* Add Event Subform */}
            <div className="bg-gray-50 dark:bg-black p-8 rounded-[2rem] border border-gray-200 dark:border-gray-800 space-y-6">
              <h3 className="font-bold text-gray-900 dark:text-white text-lg">Add New Upcoming Event</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Event Title</label>
                  <input 
                    type="text" 
                    value={newEvent.title} 
                    onChange={e => setNewEvent({...newEvent, title: e.target.value})} 
                    className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary outline-none dark:text-white font-semibold text-sm" 
                    placeholder="e.g. Eagles Annual Leadership Summit" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Date (e.g., July 24, 2026)</label>
                  <input 
                    type="text" 
                    value={newEvent.date} 
                    onChange={e => setNewEvent({...newEvent, date: e.target.value})} 
                    className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary outline-none dark:text-white font-semibold text-sm" 
                    placeholder="July 24, 2026" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Location / Arena</label>
                  <input 
                    type="text" 
                    value={newEvent.location} 
                    onChange={e => setNewEvent({...newEvent, location: e.target.value})} 
                    className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary outline-none dark:text-white font-semibold text-sm" 
                    placeholder="Grand Palace Arena, Bengaluru" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Ticket Price (INR)</label>
                  <input 
                    type="number" 
                    value={newEvent.price} 
                    onChange={e => setNewEvent({...newEvent, price: parseInt(e.target.value) || 0})} 
                    className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary outline-none dark:text-white font-semibold text-sm" 
                  />
                </div>
                <div className="col-span-full">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Event Description</label>
                  <textarea 
                    rows={2} 
                    value={newEvent.description} 
                    onChange={e => setNewEvent({...newEvent, description: e.target.value})} 
                    className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary outline-none dark:text-white font-medium text-sm resize-none leading-relaxed" 
                    placeholder="Brief description of reward distribution, keynote speakers, or training goals..." 
                  />
                </div>
              </div>
              <button 
                type="button" 
                onClick={addEvent}
                className="px-5 py-3.5 bg-gradient-to-r from-secondary to-amber-500 text-white font-bold text-sm rounded-xl hover:shadow-md hover:opacity-95 transition-all flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Add Event Ticket
              </button>
            </div>
          </div>
        )}

      </form>
    </div>
  );
}
