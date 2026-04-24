"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { RiMenu2Line, RiDashboardLine, RiFileTextLine, RiLogoutBoxRLine, RiSettings4Line } from "react-icons/ri";

const navItems = [
  { href: "/admin/applications", label: "Applications", icon: RiFileTextLine },
];

type AdminUser = { email?: string; name?: string } | null;

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const normalizedPath = pathname?.replace(/\/+$/, "") || "/";
  const isLoginRoute = normalizedPath === "/admin/login";

  const [user, setUser] = React.useState<AdminUser>(null);
  const [ready, setReady] = React.useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = localStorage.getItem("adminUser");
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch {
        setUser({ email: raw });
      }
    } else if (!isLoginRoute) {
      router.replace("/admin/login");
      return;
    }
    setReady(true);
  }, [isLoginRoute, router]);

  React.useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("adminUser");
    localStorage.removeItem("adminToken");
    setUser(null);
    router.replace("/admin/login");
  };

  if (isLoginRoute) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Mobile Header */}
      <header className="md:hidden bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
          <span className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white text-sm">P</span>
          Prosper Admin
        </h2>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Toggle Menu"
        >
          <RiMenu2Line className="w-6 h-6" />
        </button>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-slate-900 text-slate-300 flex flex-col z-50 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-6 py-8 border-b border-slate-800">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <span className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white text-sm">P</span>
              Prosper Admin
            </h2>
            <button
              className="md:hidden p-2 text-slate-400 hover:text-white"
              onClick={() => setIsSidebarOpen(false)}
            >
              <RiMenu2Line className="w-5 h-5" />
            </button>
          </div>
          {user?.email && (
            <div className="mt-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full" />
              <p className="text-xs text-slate-400 truncate">{user.email}</p>
            </div>
          )}
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1.5">
          {navItems.map((item) => {
            const active =
              pathname === item.href || pathname?.startsWith(item.href + "/");
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? "text-white" : "text-slate-500"}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-4 py-6 border-t border-slate-800 space-y-2">
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-500 transition-all"
          >
            <RiLogoutBoxRLine className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-x-auto bg-slate-50">{children}</main>
    </div>
  );
}
