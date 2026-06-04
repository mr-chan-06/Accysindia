"use client";

import Link from "next/link";
import { Facebook, Instagram, Youtube, X } from "lucide-react";
import { useEffect, useState } from "react";

interface FooterSettings {
  officeAddress?: string;
  phone1?: string;
  phone2?: string;
  email1?: string;
  email2?: string;
  instagram?: string;
  facebook?: string;
  youtube?: string;
  twitter?: string;
}

export default function Footer() {
  const [settings, setSettings] = useState<FooterSettings | null>(null);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => setSettings(data))
      .catch((e) => console.error("Error loading footer settings:", e));
  }, []);

  const instagramUrl = settings?.instagram || "https://www.instagram.com/accsyseagles";
  const facebookUrl = settings?.facebook || "https://www.facebook.com/share/18k296XrUx/";
  const youtubeUrl = settings?.youtube || "https://youtube.com/@accsyseagles";
  const twitterUrl = settings?.twitter || "https://x.com/accsyseagles";

  return (
    <footer className="bg-gray-50 dark:bg-black border-t dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-bold text-primary flex items-center gap-2 mb-6">
              <div className="w-9 h-9 rounded-full overflow-hidden border border-yellow-500/30 bg-black flex items-center justify-center shrink-0 shadow-lg shadow-yellow-500/10">
                <img src="/eagles-logo.png" alt="Eagles Logo" className="w-full h-full object-cover" />
              </div>
              <span className="tracking-tight">EAGLES TEAM</span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md leading-relaxed">
              Grow Your Income with Smart Digital Commerce. Join our platform to access premium products, membership benefits, and a lucrative referral system designed for your success.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link href="/products" className="text-sm text-gray-500 hover:text-primary transition-colors">Products</Link></li>
              <li><Link href="/plans" className="text-sm text-gray-500 hover:text-primary transition-colors">Membership Plans</Link></li>
              <li><Link href="/achievers" className="text-sm text-gray-500 hover:text-primary transition-colors">Achievers</Link></li>
              <li><Link href="/about-eagles" className="text-sm text-gray-500 hover:text-primary transition-colors">About Eagles Team</Link></li>
              <li><Link href="/company-events" className="text-sm text-gray-500 hover:text-primary transition-colors">Company Events & Tickets</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-6">Follow Us</h3>
            <div className="flex items-center gap-3">
              <Link href={instagramUrl} target="_blank" rel="noreferrer" className="inline-flex p-3 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href={facebookUrl} target="_blank" rel="noreferrer" className="inline-flex p-3 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href={youtubeUrl} target="_blank" rel="noreferrer" className="inline-flex p-3 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                <Youtube className="w-5 h-5" />
              </Link>
              <Link href={twitterUrl} target="_blank" rel="noreferrer" className="inline-flex p-3 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                <X className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-6">Contact</h3>
            <ul className="space-y-4 text-sm text-gray-500">
              <li className="flex gap-2 items-start">
                <span className="text-primary mt-1">📍</span> {settings?.officeAddress || "No .11 SRI RAMAMURTHY NAGAR SOOTHUPAKKAM ROAD KUMMANUR RED HILLS CHENNAI-600052"}
              </li>
              <li className="flex gap-2 items-center">
                <span className="text-primary">✉️</span> {settings?.email1 || "info@accsysindia.com"}<br/>{settings?.email2 || "support@accsysindia.com"}
              </li>
              <li className="flex gap-2 items-center">
                <span className="text-primary">📞</span> {settings?.phone1 || "9381234562"}<br/>{settings?.phone2 || "9092888123"}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t dark:border-gray-800 text-center text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} ACCSYSINDIA. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
