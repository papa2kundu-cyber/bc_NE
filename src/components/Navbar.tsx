"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
const logo = "/images/logo.png";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Our Works", path: "/works" },
  {
    label: "Interior",
    path: "/interior",
    children: [
      { label: "Bedroom", path: "/interior/bedroom" },
      { label: "Kitchen", path: "/interior/kitchen" },
      { label: "Workspace", path: "/interior/workspace" },
      { label: "Bathroom", path: "/interior/bathroom" },
    ],
  },
  { label: "Video Gallery", path: "/video-gallery" },
  { label: "Blog", path: "/blog" },
  { label: "FAQ", path: "/faq" },
  { label: "Contact Us", path: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [interiorOpen, setInteriorOpen] = useState(false);
  const [mobileInteriorOpen, setMobileInteriorOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close desktop dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setInteriorOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setInteriorOpen(false);
    setMobileInteriorOpen(false);
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container-narrow flex items-center justify-between h-16 md:h-20 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-heading text-xl md:text-2xl font-bold tracking-tight">
          <Image src={logo} alt="Brightocity Interior Logo" width={150} height={40} className="object-contain" />
        </Link>

        {/* Desktop Nav */}
        <div className="relative hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            if (item.label === "Contact Us") {
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className="ml-2 px-4 py-2 text-sm font-medium transition-colors rounded-md bg-primary text-white hover:bg-primary/90 relative z-10"
                >
                  {item.label}
                </Link>
              );
            }

            if (item.label === "Interior") {
              return (
                <div key={item.path} className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setInteriorOpen((prev) => !prev)}
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                      pathname.startsWith("/interior")
                        ? "text-primary font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Interior
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${interiorOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  <AnimatePresence>
                    {interiorOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 top-full mt-2 w-48 bg-white dark:bg-background rounded-lg shadow-lg border border-border z-50"
                      >
                        {item.children?.map((sub) => (
                          <Link
                            key={sub.path}
                            href={sub.path}
                            className={`block px-4 py-2.5 text-sm transition-colors hover:bg-muted first:rounded-t-lg last:rounded-b-lg ${
                              pathname === sub.path ? "text-primary font-medium" : "text-foreground"
                            }`}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                  pathname === item.path
                    ? "text-primary font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="absolute -bottom-1 right-1 rounded-lg w-[calc(100%_-_85.5%)] h-4 bg-black/30"></div>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-foreground"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1 relative">
              {navItems.map((item) => {
                if (item.label === "Contact Us") {
                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      onClick={() => setIsOpen(false)}
                      className="block px-3 py-2.5 text-sm font-medium rounded-lg transition-colors text-white bg-primary relative z-10"
                    >
                      {item.label}
                    </Link>
                  );
                }

                if (item.label === "Interior") {
                  return (
                    <div key={item.path}>
                      <button
                        onClick={() => setMobileInteriorOpen((prev) => !prev)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                          pathname.startsWith("/interior")
                            ? "text-primary bg-primary/5"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        }`}
                      >
                        Interior
                        <ChevronDown
                          size={14}
                          className={`transition-transform duration-200 ${mobileInteriorOpen ? "rotate-180" : ""}`}
                        />
                      </button>

                      <AnimatePresence>
                        {mobileInteriorOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.15 }}
                            className="overflow-hidden"
                          >
                            {item.children?.map((sub) => (
                              <Link
                                key={sub.path}
                                href={sub.path}
                                onClick={() => setIsOpen(false)}
                                className={`block pl-6 pr-3 py-2 text-sm rounded-md transition-colors ${
                                  pathname === sub.path
                                    ? "text-primary font-medium"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                }`}
                              >
                                {sub.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                      pathname === item.path
                        ? "text-primary bg-primary/5"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <div className="absolute bottom-3 left-0 flex justify-center w-full">
                <div className="rounded-lg w-[calc(100%_-_40px)] h-4 bg-black/30"></div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;