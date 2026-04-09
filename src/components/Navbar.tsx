"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Products", href: "/products" },
    { name: "Plans", href: "/plans" },
    { name: "Income System", href: "/income-system" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/80 backdrop-blur-md shadow-sm dark:bg-black/80 dark:shadow-white/10 py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          <Link href="/" className="text-2xl font-bold text-primary flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center shadow-lg shadow-primary/30">
              A
            </div>
            <span className="tracking-tight">ACCSYSINDIA</span>
          </Link>

          <nav className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="text-sm font-medium hover:text-primary transition-colors">
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {session ? (
              <>
                <Link href={session.user.role === "admin" ? "/admin/dashboard" : "/dashboard"} className="text-sm font-medium">
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut()}
                  className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : null}
          </div>

          <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white dark:bg-black w-full border-t dark:border-gray-800 absolute top-full left-0">
          <div className="px-4 pt-2 pb-4 space-y-1 shadow-xl">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-3 py-3 text-base font-medium rounded-md hover:text-primary hover:bg-primary/5"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="border-t dark:border-gray-800 my-2 pt-2"></div>
            {session ? (
               <button
                 onClick={() => signOut()}
                 className="block w-full text-left px-3 py-3 text-base font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-md"
               >
                 Logout
               </button>
            ) : null}
          </div>
        </div>
      )}
    </header>
  );
}
