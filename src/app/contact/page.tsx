"use client";

import { MapPin, Phone, Mail, Send } from "lucide-react";

export default function Contact() {
  return (
    <div className="pt-20 min-h-screen bg-white dark:bg-black">
      <div className="bg-gray-50 dark:bg-gray-900 py-32 border-b dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-6xl md:text-7xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight">Contact <span className="text-primary">Us</span></h1>
          <p className="text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">Have questions about membership, products, or our unique income system? Reach out to our dedicated support team directly.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-20">
          {/* Contact Info */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 tracking-tight">Get In Touch</h2>
            <p className="text-gray-600 dark:text-gray-400 text-xl mb-16 leading-relaxed">We are here to help you grow your business and answer any queries you might have regarding the ACCSYSINDIA platform.</p>
            
            <div className="space-y-12">
              <div className="flex items-start gap-8 group">
                <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:-translate-y-2 transition-all duration-300">
                  <MapPin className="w-10 h-10 text-primary group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Corporate Office</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-xl leading-relaxed">123 Business Avenue, Tech Hub<br/>Silicon City, IN 560001</p>
                </div>
              </div>
              
              <div className="flex items-start gap-8 group">
                <div className="w-20 h-20 bg-secondary/10 rounded-3xl flex items-center justify-center shrink-0 group-hover:bg-secondary group-hover:-translate-y-2 transition-all duration-300">
                  <Phone className="w-10 h-10 text-secondary group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Phone & WhatsApp</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-xl leading-relaxed">+91 98765 43210<br/>+91 91234 56789</p>
                </div>
              </div>

              <div className="flex items-start gap-8 group">
                <div className="w-20 h-20 bg-emerald-500/10 rounded-3xl flex items-center justify-center shrink-0 group-hover:bg-emerald-500 group-hover:-translate-y-2 transition-all duration-300">
                  <Mail className="w-10 h-10 text-emerald-500 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Email Address</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-xl leading-relaxed">support@accsysindia.com<br/>info@accsysindia.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-12 md:p-16 shadow-2xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10">Send a Message</h2>
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-3">First Name</label>
                  <input type="text" className="w-full px-6 py-5 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-primary focus:outline-none transition-all dark:text-white text-lg" placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-3">Last Name</label>
                  <input type="text" className="w-full px-6 py-5 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-primary focus:outline-none transition-all dark:text-white text-lg" placeholder="Doe" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-3">Email Address</label>
                <input type="email" className="w-full px-6 py-5 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-primary focus:outline-none transition-all dark:text-white text-lg" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-3">Your Message</label>
                <textarea rows={6} className="w-full px-6 py-5 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-primary focus:outline-none transition-all resize-none dark:text-white text-lg" placeholder="How can we help you?"></textarea>
              </div>
              <button className="w-full py-6 bg-gradient-to-r from-primary to-accent-foreground text-white rounded-2xl font-extrabold text-xl hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 transition-all flex items-center justify-center gap-3">
                Send Message <Send className="w-7 h-7" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
