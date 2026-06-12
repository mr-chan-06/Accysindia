"use client";

import { useState, useEffect } from "react";
import { MapPin, Phone, Mail, Send, Sparkles, PhoneCall, HelpCircle } from "lucide-react";

export default function Contact() {
  const [settings, setSettings] = useState<any>(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    whatsapp: "",
    preferredKit: "Provision Kit (60PV)",
    referrerID: "",
    notes: ""
  });
  
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then(res => res.json())
      .then(data => {
        if (data) setSettings(data);
      })
      .catch(e => console.error("Error fetching contact settings:", e));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
  };

  const handleWhatsAppChat = () => {
    const text = encodeURIComponent(`Hi Eagles Team! I am interested in joining the network. Here are my details:\n- Name: ${form.firstName} ${form.lastName}\n- Preferred Kit: ${form.preferredKit}\n- Referrer ID: ${form.referrerID || "None"}\n- Query: ${form.notes}`);
    const whatsappNum = settings?.whatsapp || "919876543210";
    window.open(`https://wa.me/${whatsappNum}?text=${text}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black border-t dark:border-gray-800">
      
      {/* Header */}
      <div className="bg-gray-50 dark:bg-gray-900 py-32 border-b dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-6xl md:text-7xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight">
            Contact <span className="text-primary">Us</span>
          </h1>
          <p className="text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Have questions about Eagles Team packages, 60PV matching cycles, or upcoming tour tickets? Ask our senior leaders directly.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-20">
          
          {/* Info Details */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 tracking-tight">Get In Touch</h2>
            <p className="text-gray-600 dark:text-gray-400 text-xl mb-8 leading-relaxed">
              We are here to support your direct selling career. Fill in your package interests below and our team will get in touch.
            </p>

            {/* 2026 Rebranding Announcement Box */}
            <div className="bg-gradient-to-br from-amber-500/10 to-yellow-500/5 border border-amber-500/30 rounded-[2rem] p-8 mb-12 shadow-lg shadow-yellow-500/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl" />
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </div>
                <h3 className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                  2026 Accsys Rebrand to Eagles Team
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
                {settings?.rebrandingDescription1 || "In 2026, Accsys India officially transformed into the Eagles Team! This historic shift streamlines binary compensation, elevates digital commerce mentoring through the Eagles Academy, and accelerates priority regional deliveries to support your scaling direct business network."}
              </p>
            </div>
            
            <div className="space-y-12">
              <div className="flex items-start gap-8 group">
                <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:-translate-y-2 transition-all duration-300">
                  <MapPin className="w-10 h-10 text-primary group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Corporate Office</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-xl leading-relaxed">{settings?.officeAddress || "No .11 SRI RAMAMURTHY NAGAR SOOTHUPAKKAM ROAD KUMMANUR RED HILLS CHENNAI-600052"}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-8 group">
                <div className="w-20 h-20 bg-secondary/10 rounded-3xl flex items-center justify-center shrink-0 group-hover:bg-secondary group-hover:-translate-y-2 transition-all duration-300">
                  <Phone className="w-10 h-10 text-secondary group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">WhatsApp & Support</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-xl leading-relaxed">{settings?.phone1 || "9381234562"}<br/>{settings?.phone2 || "9092888123"}</p>
                </div>
              </div>

              <div className="flex items-start gap-8 group">
                <div className="w-20 h-20 bg-emerald-500/10 rounded-3xl flex items-center justify-center shrink-0 group-hover:bg-emerald-500 group-hover:-translate-y-2 transition-all duration-300">
                  <Mail className="w-10 h-10 text-emerald-500 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Email Address</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-xl leading-relaxed">{settings?.email1 || "support@accsysindia.com"}<br/>{settings?.email2 || "info@accsysindia.com"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form ("Details want to ask") */}
          <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-12 md:p-16 shadow-2xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10">Send a Query</h2>
            
            {!success ? (
              <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-3">First Name</label>
                    <input 
                      type="text" 
                      required
                      value={form.firstName}
                      onChange={e => setForm({...form, firstName: e.target.value})}
                      className="w-full px-6 py-5 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-primary focus:outline-none transition-all dark:text-white text-lg font-semibold" 
                      placeholder="John" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-3">Last Name</label>
                    <input 
                      type="text" 
                      required
                      value={form.lastName}
                      onChange={e => setForm({...form, lastName: e.target.value})}
                      className="w-full px-6 py-5 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-primary focus:outline-none transition-all dark:text-white text-lg font-semibold" 
                      placeholder="Doe" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-3">Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={form.email}
                      onChange={e => setForm({...form, email: e.target.value})}
                      className="w-full px-6 py-5 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-primary focus:outline-none transition-all dark:text-white text-lg font-semibold" 
                      placeholder="john@example.com" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-3">WhatsApp Number</label>
                    <input 
                      type="tel" 
                      required
                      value={form.whatsapp}
                      onChange={e => setForm({...form, whatsapp: e.target.value})}
                      className="w-full px-6 py-5 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-primary focus:outline-none transition-all dark:text-white text-lg font-semibold" 
                      placeholder="+91 XXXXX XXXXX" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-3">Preferred Package Kit</label>
                    <select
                      value={form.preferredKit}
                      onChange={e => setForm({...form, preferredKit: e.target.value})}
                      className="w-full px-6 py-5 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-primary focus:outline-none transition-all dark:text-white text-lg font-semibold"
                    >
                      <option>Provision Kit (60PV)</option>
                      <option>Womens Kit (60PV)</option>
                      <option>Spirulina Kit (60PV)</option>
                      <option>Gents Trunk Kit (60PV)</option>
                      <option>Garments Kit (60PV)</option>
                      <option>Mixie Kit (60PV)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-3">Referrer Member ID (Optional)</label>
                    <input 
                      type="text" 
                      value={form.referrerID}
                      onChange={e => setForm({...form, referrerID: e.target.value})}
                      className="w-full px-6 py-5 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-primary focus:outline-none transition-all dark:text-white text-lg font-semibold" 
                      placeholder="e.g. EAG12345" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-3">Details / Questions you want to ask</label>
                  <textarea 
                    rows={4} 
                    required
                    value={form.notes}
                    onChange={e => setForm({...form, notes: e.target.value})}
                    className="w-full px-6 py-5 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-primary focus:outline-none transition-all resize-none dark:text-white text-lg font-semibold" 
                    placeholder="Ask us anything about matching PV cycles, tour qualification details, or events..."
                  />
                </div>

                <button className="w-full py-6 bg-gradient-to-r from-primary to-yellow-500 text-black rounded-2xl font-extrabold text-xl hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center gap-3">
                  Send Query <Send className="w-7 h-7" />
                </button>
              </form>
            ) : (
              <div className="text-center py-12 space-y-6">
                <div className="w-24 h-24 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
                  <Sparkles className="w-12 h-12 animate-bounce" />
                </div>
                <h3 className="text-3xl font-black text-gray-900 dark:text-white">Query Received!</h3>
                <p className="text-gray-500 text-sm max-w-sm mx-auto leading-relaxed">
                  Thank you, **{form.firstName}**. Our executive senior council has received your query regarding the **{form.preferredKit}**. We will connect with you via email or WhatsApp shortly.
                </p>
                <div className="border-t dark:border-gray-800 my-4 pt-6">
                  <button 
                    onClick={handleWhatsAppChat}
                    className="w-full py-5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-extrabold text-lg transition-all shadow-xl flex items-center justify-center gap-3"
                  >
                    Open Direct WhatsApp <PhoneCall className="w-6 h-6" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
