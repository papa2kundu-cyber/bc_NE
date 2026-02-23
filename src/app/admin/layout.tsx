"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard, Image as ImageIcon, Video, FileText,
  Users, HelpCircle, Star, Mail, Menu, X,
  LogOut, ChevronRight, UserCircle, Settings,
} from "lucide-react";
import AdminLogin from "@/components/admin/AdminLogin";
import { adminProfile } from "@/lib/adminAuth";

const sidebarItems = [
  { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { label: "Photos", path: "/admin/photos", icon: ImageIcon },
  { label: "Videos", path: "/admin/videos", icon: Video },
  { label: "Blocks", path: "/admin/blocks", icon: FileText },
  { label: "Teams", path: "/admin/teams", icon: Users },
  { label: "FAQs", path: "/admin/faqs", icon: HelpCircle },
  { label: "Reviews", path: "/admin/reviews", icon: Star },
  { label: "Contact Us", path: "/admin/contacts", icon: Mail },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [, forceRender] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close dropdown on route change
  useEffect(() => { setDropdownOpen(false); }, [pathname]);

  // Re-render when profile page updates adminProfile in place
  useEffect(() => { forceRender((n) => n + 1); }, [isLoggedIn]);

  if (!isLoggedIn) {
    return <AdminLogin onLogin={() => setIsLoggedIn(true)} />;
  }

  const currentSection =
    pathname === "/admin"
      ? "Dashboard"
      : pathname.split("/admin/")[1]?.replace(/-/g, " ") ?? "Dashboard";

  return (
    <div className="min-h-screen flex bg-muted/30">

      {/* ── Sidebar ── */}
      <aside className={`fixed top-0 left-0 h-full z-40 bg-background border-r border-border flex flex-col transition-all duration-300 ${sidebarOpen ? "w-64" : "w-16"}`}>

        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-border flex-shrink-0">
          {sidebarOpen && (
            <Link href="/" className="flex items-center gap-2">
              <Image src="/images/logo.png" alt="Brightocity Interior" width={120} height={32} className="object-contain" />
            </Link>
          )}
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className="p-2 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground ml-auto"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Label */}
        {sidebarOpen && (
          <div className="px-4 py-3 border-b border-border">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Admin Panel</span>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
          {sidebarItems.map(({ label, path, icon: Icon }) => {
            const isActive = path === "/admin" ? pathname === "/admin" : pathname.startsWith(path);
            return (
              <Link key={path} href={path} title={!sidebarOpen ? label : undefined}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive ? "bg-primary text-white shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}>
                <Icon size={18} className="flex-shrink-0" />
                {sidebarOpen && (<><span className="flex-1">{label}</span>{isActive && <ChevronRight size={14} />}</>)}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="px-2 pb-4 border-t border-border pt-4 space-y-1 flex-shrink-0">
          <Link href="/admin/profile" title={!sidebarOpen ? "Profile" : undefined}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${pathname === "/admin/profile"
                ? "bg-primary text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}>
            <UserCircle size={18} className="flex-shrink-0" />
            {sidebarOpen && <span className="flex-1">Profile</span>}
          </Link>
          <button onClick={() => setIsLoggedIn(false)} title={!sidebarOpen ? "Log Out" : undefined}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all">
            <LogOut size={18} className="flex-shrink-0" />
            {sidebarOpen && <span>Log Out</span>}
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-16"}`}>

        {/* Top bar */}
        <header className="sticky top-0 z-30 h-16 bg-background border-b border-border flex items-center justify-between px-6 flex-shrink-0">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Admin</span>
            <ChevronRight size={14} />
            <span className="text-foreground font-medium capitalize">{currentSection}</span>
          </div>

          {/* Avatar dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((v) => !v)}
              className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl border border-border hover:bg-muted transition-colors group"
              aria-label="Account menu"
            >
              {/* Avatar circle */}
              <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center text-white text-sm font-bold select-none flex-shrink-0">
                {adminProfile.avatarInitial}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-semibold text-foreground leading-tight">{adminProfile.name}</p>
                <p className="text-[10px] text-muted-foreground leading-tight truncate max-w-[120px]">{adminProfile.role}</p>
              </div>
              <ChevronRight size={13} className={`text-muted-foreground transition-transform duration-200 ${dropdownOpen ? "rotate-90" : ""}`} />
            </button>

            {/* Dropdown */}
            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-60 bg-background border border-border rounded-xl shadow-lg overflow-hidden z-50">
                {/* Profile header */}
                <div className="px-4 py-3 border-b border-border bg-muted/30">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {adminProfile.avatarInitial}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{adminProfile.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{adminProfile.email}</p>
                    </div>
                  </div>
                </div>

                {/* Menu items */}
                <div className="py-1">
                  <Link href="/admin/profile"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                    onClick={() => setDropdownOpen(false)}>
                    <UserCircle size={15} className="text-muted-foreground" />
                    View Profile
                  </Link>
                  {/* <Link href="/admin/profile"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                    onClick={() => setDropdownOpen(false)}>
                    <Settings size={15} className="text-muted-foreground" />
                    Account Settings
                  </Link> */}
                </div>

                <div className="border-t border-border py-1">
                  <button
                    onClick={() => { setDropdownOpen(false); setIsLoggedIn(false); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-destructive hover:bg-destructive/8 transition-colors"
                  >
                    <LogOut size={15} />
                    Log Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
