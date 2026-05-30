"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Building, Calendar, MapPin, Ticket, ShieldCheck, Mail, Phone, Loader2, Sparkles } from "lucide-react";
import ImageWithFallback from "@/components/ImageWithFallback";

const FALLBACK_FOUNDERS = [
  {
    _id: "founder1",
    name: "Mr. V. Hariprakash",
    role: "Founding Director",
    image: "/founder.jpg",
    description: "Original founder of Accsys India. Leading the organizational transformation into the Eagles Team network."
  },
  {
    _id: "founder2",
    name: "Dr. S. K. Subramanian",
    role: "Corporate Managing Director",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    description: "Corporate management and compliance expert. Overseeing logistics integrations and Ministry compliance."
  }
];

const UPCOMING_EVENTS = [
  {
    id: "evt1",
    title: "Eagles Annual Leadership Summit 2026",
    date: "July 24, 2026",
    location: "Grand Palace Arena, Bengaluru",
    price: 499,
    description: "Our massive annual celebration. Felicitating matching pair qualifiers, car winners, and hosting elite keynote lectures."
  },
  {
    id: "evt2",
    title: "Direct Commerce & PV Bootcamp",
    date: "September 12, 2026",
    location: "Le Meridien Convention, Chennai",
    price: 250,
    description: "Intense classroom training on marketing strategies, binary structure alignments, and direct selling guidelines."
  }
];

const ACTIVE_CENTERS = [
  { city: "Bengaluru Hub", address: "45 Prime Corporate Ring Road, Silicon Hub", phone: "+91 98765 00101" },
  { city: "Chennai Depot", address: "12 Logistics Lane, Guindy Industrial Area", phone: "+91 98765 00102" },
  { city: "Erode Active Center #48", address: "78 Farmers Market Road, Near Main Terminal", phone: "+91 98765 00103" },
  { city: "Mumbai Distribution", address: "90 Seaport Warehousing Complex, Panvel", phone: "+91 98765 00104" }
];

export default function CompanyEvents() {
  const [founders, setFounders] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Ticket booking state
  const [selectedEvent, setSelectedEvent] = useState("");
  const [bookingForm, setBookingForm] = useState({ name: "", email: "", phone: "", ticketsCount: 1 });
  const [bookedSuccess, setBookedSuccess] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/api/leaders").then(res => res.json()),
      fetch("/api/settings").then(res => res.json())
    ])
      .then(([leadersData, settingsData]) => {
        if (Array.isArray(leadersData)) {
          // Founders & Directors don't have Vice in their roles
          const filtered = leadersData.filter((l: any) => !l.role?.toLowerCase().includes("vice"));
          setFounders(filtered);
        }
        if (settingsData) {
          setSettings(settingsData);
          const evts = settingsData.upcomingEvents?.length > 0 ? settingsData.upcomingEvents : UPCOMING_EVENTS;
          setSelectedEvent(evts[0].title);
        } else {
          setSelectedEvent(UPCOMING_EVENTS[0].title);
        }
        setLoading(false);
      })
      .catch(e => {
        console.error(e);
        setSelectedEvent(UPCOMING_EVENTS[0].title);
        setLoading(false);
      });
  }, []);

  const displayFounders = founders.length > 0 ? founders : FALLBACK_FOUNDERS;
  const events = settings?.upcomingEvents && settings.upcomingEvents.length > 0 
    ? settings.upcomingEvents 
    : UPCOMING_EVENTS;
  const depots = settings?.dispatchCenters && settings.dispatchCenters.length > 0 
    ? settings.dispatchCenters 
    : ACTIVE_CENTERS;

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookedSuccess(true);
  };

  const handleWhatsAppTicketInquiry = () => {
    const text = encodeURIComponent(`Hi! I would like to book tickets for the "${selectedEvent}" (${bookingForm.ticketsCount} tickets) under the name "${bookingForm.name}" (Phone: ${bookingForm.phone}). Please confirm payment details.`);
    const whatsappNum = settings?.whatsapp || "919876543210";
    window.open(`https://wa.me/${whatsappNum}?text=${text}`, "_blank");
  };

  return (
    <div className="bg-white dark:bg-black min-h-screen border-t dark:border-gray-800">
      
      {/* Header */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900 border-b dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-primary font-bold tracking-wider uppercase mb-4 block">Corporate Corporate foundation</span>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
            Accsys India & Event Tickets
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
            Discover the corporate framework of **ACCSYSINDIA**, booking portals for upcoming Eagles conventions, and active regional dispatch centers.
          </p>
        </div>
      </section>

      {/* Parent Company: Accsys India Founders & Directors */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-primary font-black text-xs uppercase tracking-widest bg-primary/10 px-4 py-2 rounded-full inline-block mb-4">
            Corporate Board
          </span>
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
            Accsys Founders & Directors
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed font-light">
            The visionary corporate officers and compliance directors behind Accsys India's trading registration and logistical supply operations.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-10"><Loader2 className="w-10 h-10 text-primary animate-spin" /></div>
        ) : (
          <div className="flex flex-wrap justify-center gap-10">
            {displayFounders.map((f) => (
              <div 
                key={f._id}
                className="w-full md:w-[350px] bg-gray-50 dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-xl flex flex-col items-center text-center group"
              >
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg mb-6 shrink-0 bg-gray-100">
                  <ImageWithFallback 
                    src={f.image?.startsWith('/') || f.image?.startsWith('http') ? f.image : "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"} 
                    fallbackSrc="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                    alt={f.name} 
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-1 group-hover:text-primary transition-colors">{f.name}</h3>
                <span className="text-primary font-bold text-xs uppercase tracking-widest mb-4 bg-primary/10 px-3 py-1 rounded-full">{f.role || "Director"}</span>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed font-semibold">{f.description || "Driving corporate values, ethical trade parameters, and strict national direct selling guidelines compliance."}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Event Tickets Sales & Booking Forms */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900/40 border-t border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <div>
              <span className="text-primary font-black text-xs uppercase tracking-widest bg-primary/10 px-4 py-2 rounded-full inline-block mb-4">
                Convention Tickets
              </span>
              <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
                Book Tickets for Upcoming Eagles Conventions
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-8 font-light">
                Grab your official seat passes for our national direct commerce events! Network with Mr. V. Hariprakash, meet regional vice presidents, and witness qualifiers take away rewards. Select an event to book below:
              </p>

              <div className="space-y-6">
                {events.map((evt: any) => (
                  <div 
                    key={evt._id || evt.id}
                    onClick={() => setSelectedEvent(evt.title)}
                    className={`p-6 rounded-3xl border transition-all cursor-pointer ${
                      selectedEvent === evt.title 
                        ? "bg-primary/10 border-primary shadow-lg" 
                        : "bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700/50"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-bold text-primary flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {evt.date}</span>
                      <span className="bg-primary/20 text-primary border border-primary/20 text-xs font-black px-2.5 py-1 rounded-full">₹{evt.price}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{evt.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-3">{evt.description}</p>
                    <span className="text-xs font-bold text-gray-400 flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-gray-400" /> {evt.location}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Booking Form (Details want to ask) */}
            <div className="bg-white dark:bg-gray-950 p-10 rounded-[3rem] border border-gray-100 dark:border-gray-800 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
              
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <Ticket className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white">Ticket Portal</h3>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Book Eagles convention entry passes</p>
                </div>
              </div>

              {!bookedSuccess ? (
                <form onSubmit={handleBooking} className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Selected Event</label>
                    <input 
                      type="text" 
                      disabled
                      value={selectedEvent}
                      className="w-full px-5 py-4 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-2xl dark:text-white text-base font-semibold opacity-70"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={bookingForm.name}
                      onChange={e => setBookingForm({...bookingForm, name: e.target.value})}
                      placeholder="Enter attendee name" 
                      className="w-full px-5 py-4 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-primary focus:outline-none dark:text-white text-base font-semibold"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Phone / WhatsApp</label>
                      <input 
                        type="tel" 
                        required
                        value={bookingForm.phone}
                        onChange={e => setBookingForm({...bookingForm, phone: e.target.value})}
                        placeholder="WhatsApp Number" 
                        className="w-full px-5 py-4 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-primary focus:outline-none dark:text-white text-base font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Ticket Count</label>
                      <input 
                        type="number" 
                        min="1" 
                        max="10"
                        required
                        value={bookingForm.ticketsCount}
                        onChange={e => setBookingForm({...bookingForm, ticketsCount: parseInt(e.target.value) || 1})}
                        className="w-full px-5 py-4 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-primary focus:outline-none dark:text-white text-base font-semibold"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-4.5 bg-gradient-to-r from-primary to-yellow-500 text-black font-extrabold text-base rounded-2xl hover:opacity-90 hover:-translate-y-0.5 transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    Confirm Booking Query <Ticket className="w-5 h-5" />
                  </button>
                </form>
              ) : (
                <div className="text-center py-6 space-y-6">
                  <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
                    <Sparkles className="w-10 h-10 animate-bounce" />
                  </div>
                  <h4 className="text-xl font-extrabold text-gray-900 dark:text-white">Ticket Request Queued!</h4>
                  <p className="text-gray-500 text-sm max-w-sm mx-auto">Thank you, **{bookingForm.name}**. Your reservation for **{bookingForm.ticketsCount} tickets** is noted. Click below to verify details and complete secure checkout over WhatsApp!</p>
                  
                  <button 
                    onClick={handleWhatsAppTicketInquiry}
                    className="w-full py-4.5 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-base rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    Get WhatsApp Ticket Pass <Phone className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Active Centers & Warehouses */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-primary font-black text-xs uppercase tracking-widest bg-primary/10 px-4 py-2 rounded-full inline-block mb-4">
            Active Depots
          </span>
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
            Accsys Regional Dispatch Centers
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed font-light">
            Priority centers housing active inventory of Provision Kits and other packages. Qualify for immediate collection or priority express shipping.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {depots.map((hub: any, idx: number) => (
            <div 
              key={idx}
              className="bg-gray-50 dark:bg-gray-900/60 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 flex flex-col justify-between hover:border-primary/20 transition-all duration-300"
            >
              <div>
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                  <Building className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{hub.city}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6 font-semibold">{hub.address}</p>
              </div>
              <span className="text-xs font-bold text-primary flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-primary" /> {hub.phone}</span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
