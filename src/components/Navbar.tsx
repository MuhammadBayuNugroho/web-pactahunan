"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useApp } from "@/lib/context/AppContext";
import CommandPalette from "@/components/CommandPalette";

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { user, logout } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Global shortcut for Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navLinks = [
    { name: "Beranda", href: "/" },
    { name: "Berita", href: "/berita" },
    { name: "Kaderisasi", href: "/kaderisasi" },
    { name: "Kalender", href: "/kalender" },
    { name: "Administrasi", href: "/administrasi" },
    { name: "Repository", href: "/repository" },
    { name: "Kontak", href: "/kontak" },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 transition-all duration-300 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Brand Logo & Identity */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="flex items-center">
              <Image
                src="/assets/images/logo-bersama.png"
                alt="Logo Bersama PAC Tahunan"
                width={70}
                height={40}
                className="h-9 sm:h-10 w-auto object-contain group-hover:scale-105 transition duration-300"
                priority
              />
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="font-extrabold text-sm sm:text-base tracking-tight text-slate-900 uppercase leading-tight">
                PAC IPNU IPPNU
              </h1>
              <span className="text-[11px] sm:text-xs text-brand-purple font-bold uppercase tracking-normal leading-tight">
                Kecamatan Tahunan
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center gap-5 text-xs font-bold uppercase tracking-wider text-slate-500">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`transition duration-200 py-2 border-b-2 ${
                    isActive
                      ? "text-brand-purple border-brand-purple font-extrabold"
                      : "text-slate-500 hover:text-brand-purple border-transparent"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Action Buttons: Quick Search, Admin, Mobile Toggle */}
          <div className="flex items-center gap-2">
            {/* Quick Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-800 border border-slate-200/80 transition text-xs font-medium"
              title="Cari cepat (Ctrl+K)"
            >
              <i className="fas fa-search text-[11px] text-slate-400"></i>
              <span className="hidden sm:inline text-xs text-slate-500">Cari...</span>
              <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[9px] font-mono text-slate-400 bg-white border border-slate-200 rounded">
                ⌘K
              </kbd>
            </button>

            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  href={user.role === "admin_ranting" || user.role === "admin_komisariat" ? "/dashboard/ranting" : "/dashboard/pac"}
                  className="hidden md:flex items-center gap-2 p-2 sm:p-2.5 rounded-xl bg-violet-50 hover:bg-violet-100 text-brand-purple transition border border-violet-100 text-xs font-bold"
                >
                  <i className="fas fa-columns"></i>
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={logout}
                  className="p-2 sm:p-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition border border-red-100 text-xs font-bold"
                  title="Keluar"
                >
                  <i className="fas fa-sign-out-alt"></i>
                </button>
              </div>
            ) : (
              <Link
                href="/admin"
                className="p-2 sm:px-3 sm:py-2 rounded-xl bg-violet-50 hover:bg-violet-100 text-brand-purple transition border border-violet-100 text-xs flex items-center gap-1.5 font-bold"
              >
                <i className="fas fa-shield-alt text-xs"></i>
                <span className="hidden sm:inline">Login</span>
              </Link>
            )}

            {/* Mobile Navigation Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
              aria-label="Toggle menu"
            >
              <i className={`fas ${mobileMenuOpen ? "fa-times" : "fa-bars"} text-sm`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 text-xs font-bold uppercase tracking-wider">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2.5 px-3 rounded-xl transition ${
                  pathname === link.href
                    ? "bg-violet-50 text-brand-purple font-extrabold"
                    : "text-slate-600 hover:text-brand-purple hover:bg-slate-50"
                }`}
              >
                {link.name}
              </Link>
            ))}
            {user ? (
              <Link
                href={user.role === "admin_ranting" || user.role === "admin_komisariat" ? "/dashboard/ranting" : "/dashboard/pac"}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 px-3 rounded-xl text-brand-purple bg-violet-50 hover:bg-violet-100 transition flex items-center gap-2"
              >
                <i className="fas fa-columns"></i> Dashboard
              </Link>
            ) : (
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 px-3 rounded-xl text-brand-purple bg-violet-50 hover:bg-violet-100 transition flex items-center gap-2"
              >
                <i className="fas fa-shield-alt"></i> Admin Login
              </Link>
            )}
          </div>
        )}
      </nav>

      {/* Universal Search Command Palette */}
      <CommandPalette isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default Navbar;
