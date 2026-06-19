"use client";

import { useSession } from "next-auth/react";
import { redirect, usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, ShoppingBag, Settings, LogOut, Award, Menu, X, Users, Ticket, FileText } from "lucide-react";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isLoginPage = pathname === "/admin";

  useEffect(() => {
    if (status === "loading") return;

    // Strict Super Admin Enforcement
    if (!isLoginPage && (!session || session?.user?.role !== "admin")) {
      router.push("/admin");
    }

    // If already logged in as admin, visiting /admin should go to dashboard
    if (isLoginPage && session && session.user.role === "admin") {
      router.push("/admin/dashboard");
    }
  }, [status, session, isLoginPage, router]);

  if (status === "loading") {
    return <div className="min-h-[80vh] flex items-center justify-center"><div className="w-10 h-10 border-4 border-primary border-t-transparent flex items-center justify-center rounded-full animate-spin"></div></div>;
  }

  // If redirecting, we can return null to avoid flash of content
  if (!isLoginPage && (!session || session?.user?.role !== "admin")) {
    return null;
  }
  
  if (isLoginPage) {
    if (session && session.user.role === "admin") {
      return null;
    }
    return <>{children}</>;
  }

  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Products", href: "/admin/products", icon: ShoppingBag },
    { name: "Ticket Registrations", href: "/admin/tickets", icon: Ticket },
    { name: "Site Documents", href: "/admin/documents", icon: FileText },
    { name: "Founders & Directors", href: "/admin/founders", icon: Users },
    { name: "Achievers", href: "/admin/achievers", icon: Users },
    { name: "Site Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black flex">
      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col fixed h-full z-50 transition-transform duration-300 lg:translate-x-0 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="h-20 flex items-center justify-between px-6 border-b border-gray-200 dark:border-gray-800">
          <Link href="/" className="text-xl font-bold text-primary flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="w-9 h-9 rounded-full overflow-hidden border border-yellow-500/30 bg-black flex items-center justify-center shrink-0 shadow-lg shadow-yellow-500/10">
              <img src="/eagles-logo.png" alt="Eagles Logo" className="w-full h-full object-cover" />
            </div>
            <span>Admin Panel</span>
          </Link>
          <button className="lg:hidden text-gray-500 hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-2">
          {navItems.map((item) => (
             <Link key={item.name} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-primary/10 hover:text-primary transition-colors font-medium">
               <item.icon className="w-5 h-5" />
               <span>{item.name}</span>
             </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <button onClick={() => signOut({ callbackUrl: "/admin" })} className="flex items-center gap-3 px-4 py-3 w-full text-left text-red-600 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
             <LogOut className="w-5 h-5" />
             <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 lg:ml-64 flex flex-col min-h-screen overflow-hidden">
        <header className="h-20 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-30">
          <button className="lg:hidden p-2 text-gray-500 hover:text-primary" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-4 ml-auto">
             <div className="text-right hidden sm:block">
               <div className="text-sm font-bold text-gray-900 dark:text-white">{session?.user?.name || "Super Admin"}</div>
               <div className="text-xs text-gray-500 font-medium">{session?.user?.email || "admin@accsysindia.com"}</div>
             </div>
             <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold shadow-lg">
               {session?.user?.name?.[0] || "A"}
             </div>
          </div>
        </header>
        <div className="flex-1 p-6 md:p-10 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
