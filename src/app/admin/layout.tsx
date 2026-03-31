"use client";

import { useSession } from "next-auth/react";
import { redirect, usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Users, ShoppingBag, Settings, LogOut, Award, Package } from "lucide-react";
import { signOut } from "next-auth/react";
import { useEffect } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();

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
    { name: "User Management", href: "/admin/users", icon: Users },
    { name: "Membership Plans", href: "/admin/plans", icon: Package },
    { name: "Products", href: "/admin/products", icon: ShoppingBag },
    { name: "Leadership", href: "/admin/leaders", icon: Award },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black flex">
      <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 hidden lg:flex flex-col fixed h-full z-40">
        <div className="h-20 flex items-center px-6 border-b border-gray-200 dark:border-gray-800">
          <Link href="/" className="text-xl font-bold text-primary flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center text-sm font-bold shadow-lg">A</div>
            <span>Admin Panel</span>
          </Link>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-2">
          {navItems.map((item) => (
             <Link key={item.name} href={item.href} className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-primary/10 hover:text-primary transition-colors font-medium">
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
        <header className="h-20 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-end px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4">
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
