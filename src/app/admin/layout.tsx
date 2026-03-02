"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard, Image as ImageIcon, Video, FileText,
  Users, HelpCircle, Star, Mail, Menu, X,
  LogOut, ChevronRight, UserCircle,
} from "lucide-react";
import AdminLogin from "@/components/admin/AdminLogin";
import { adminProfile, loadPersistedAvatar } from "@/lib/adminAuth";
import { getAuthToken, clearAuthToken, getStoredUser, clearStoredUser, StoredUser } from "@/lib/axios";

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
  const [displayUser, setDisplayUser] = useState<StoredUser | null>(null);
  // Desktop: open = expanded (w-64), closed = icon-only (w-16)
  // Mobile: open = overlay visible, closed = off-screen
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [, forceRender] = useState(0);
  const [avatarSrc, setAvatarSrc] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Auto-login: restore session from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined" && getAuthToken()) {
      setIsLoggedIn(true);
      setDisplayUser(getStoredUser());
    }
  }, []);

  // Initialise sidebar: open on desktop, closed on mobile
  useEffect(() => {
    if (typeof window !== "undefined") {
      setSidebarOpen(window.innerWidth >= 1024);
    }
  }, []);

  // Close sidebar on mobile when navigating; refresh avatar from localStorage
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
    setDropdownOpen(false);
    loadPersistedAvatar();
    setAvatarSrc(adminProfile.avatar);
  }, [pathname]);

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

  // Re-render when profile page updates adminProfile in place
  useEffect(() => { forceRender((n) => n + 1); }, [isLoggedIn]);

  const handleLogout = () => {
    clearAuthToken();
    clearStoredUser();
    setIsLoggedIn(false);
    setDisplayUser(null);
    setDropdownOpen(false);
  };

  if (!isLoggedIn) {
    return <AdminLogin onLogin={() => { setIsLoggedIn(true); setDisplayUser(getStoredUser()); }} />;
  }

  const displayName = displayUser?.name ?? adminProfile.name;
  const displayEmail = displayUser?.email ?? adminProfile.email;
  const displayRole = displayUser?.role ?? adminProfile.role;
  const avatarInitial = displayName[0]?.toUpperCase() ?? "A";

  const currentSection =
    pathname === "/admin"
      ? "Dashboard"
      : pathname.split("/admin/")[1]?.replace(/-/g, " ") ?? "Dashboard";

  return (
    <div className="min-h-screen flex bg-muted/30">

      {/* ── Mobile backdrop ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`fixed top-0 left-0 h-full z-40 bg-background border-r border-border flex flex-col transition-all duration-300
          w-64
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0 lg:w-16"}
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-border flex-shrink-0">
          <Link href="/" className="flex items-center gap-2 overflow-hidden">
            <Image
              src="/images/logo.png"
              alt="Brightocity Interior"
              width={120}
              height={32}
              className={`object-contain transition-all duration-300 ${sidebarOpen ? "opacity-100 w-28" : "opacity-0 w-0 lg:opacity-0 lg:w-0"}`}
            />
          </Link>
          {/* Close button — visible on mobile sidebar, toggle on desktop */}
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className="p-2 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground ml-auto flex-shrink-0"
            aria-label="Toggle sidebar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Label */}
        <div className={`px-4 py-3 border-b border-border overflow-hidden transition-all duration-300 ${sidebarOpen ? "opacity-100" : "opacity-0 lg:hidden"}`}>
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground whitespace-nowrap">Admin Panel</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
          {sidebarItems.map(({ label, path, icon: Icon }) => {
            const isActive = path === "/admin" ? pathname === "/admin" : pathname.startsWith(path);
            return (
              <Link
                key={path}
                href={path}
                title={!sidebarOpen ? label : undefined}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive ? "bg-primary text-white shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Icon size={18} className="flex-shrink-0" />
                <span className={`flex-1 whitespace-nowrap transition-all duration-300 ${sidebarOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden lg:hidden"}`}>
                  {label}
                </span>
                {sidebarOpen && isActive && <ChevronRight size={14} className="flex-shrink-0" />}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="px-2 pb-4 border-t border-border pt-4 space-y-1 flex-shrink-0">
          <Link
            href="/admin/profile"
            title={!sidebarOpen ? "Profile" : undefined}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
              pathname === "/admin/profile"
                ? "bg-primary text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <UserCircle size={18} className="flex-shrink-0" />
            <span className={`flex-1 whitespace-nowrap transition-all duration-300 ${sidebarOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden lg:hidden"}`}>
              Profile
            </span>
          </Link>
          <button
            onClick={handleLogout}
            title={!sidebarOpen ? "Log Out" : undefined}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
          >
            <LogOut size={18} className="flex-shrink-0" />
            <span className={`whitespace-nowrap transition-all duration-300 ${sidebarOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden lg:hidden"}`}>
              Log Out
            </span>
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ml-0 ${
          sidebarOpen ? "lg:ml-64" : "lg:ml-16"
        }`}
      >
        {/* Top bar */}
        <header className="sticky top-0 z-30 h-16 bg-background border-b border-border flex items-center justify-between px-4 sm:px-6 flex-shrink-0 gap-3">

          {/* Left: mobile hamburger + breadcrumb */}
          <div className="flex items-center gap-3 min-w-0">
            {/* Hamburger — mobile only */}
            <button
              onClick={() => setSidebarOpen((v) => !v)}
              className="lg:hidden p-2 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground flex-shrink-0"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground min-w-0">
              <span className="hidden sm:inline">Admin</span>
              <ChevronRight size={14} className="hidden sm:inline flex-shrink-0" />
              <span className="text-foreground font-medium capitalize truncate">{currentSection}</span>
            </div>
          </div>

          {/* Avatar dropdown */}
          <div className="relative flex-shrink-0" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((v) => !v)}
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl border border-border hover:bg-muted transition-colors group"
              aria-label="Account menu"
            >
              {/* Topbar mini avatar */}
              <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center text-white text-sm font-bold select-none flex-shrink-0 overflow-hidden">
                {avatarSrc
                  ? <img src={avatarSrc} alt="avatar" className="w-full h-full object-cover" />
                  : avatarInitial}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-semibold text-foreground leading-tight">{displayName}</p>
                <p className="text-[10px] text-muted-foreground leading-tight truncate max-w-[120px]">{displayRole}</p>
              </div>
              <ChevronRight size={13} className={`text-muted-foreground transition-transform duration-200 ${dropdownOpen ? "rotate-90" : ""}`} />
            </button>

            {/* Dropdown */}
            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 sm:w-60 bg-background border border-border rounded-xl shadow-lg overflow-hidden z-50">
                <div className="px-4 py-3 border-b border-border bg-muted/30">
                  <div className="flex items-center gap-3">
                    {/* Dropdown larger avatar */}
                    <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-sm flex-shrink-0 overflow-hidden">
                      {avatarSrc
                        ? <img src={avatarSrc} alt="avatar" className="w-full h-full object-cover" />
                        : avatarInitial}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{displayName}</p>
                      <p className="text-xs text-muted-foreground truncate">{displayEmail}</p>
                    </div>
                  </div>
                </div>
                <div className="py-1">
                  <Link
                    href="/admin/profile"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <UserCircle size={15} className="text-muted-foreground" />
                    View Profile
                  </Link>
                </div>
                <div className="border-t border-border py-1">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-colors"
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
        <main className="flex-1 p-4 sm:p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
