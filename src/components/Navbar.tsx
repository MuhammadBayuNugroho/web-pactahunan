"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useApp } from "@/lib/context/AppContext";

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { user, logout } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Beranda", href: "/" },
    { name: "Berita", href: "/berita" },
    { name: "Kaderisasi", href: "/kaderisasi" },
    { name: "Administrasi", href: "/administrasi" },
    { name: "Repository", href: "/repository" },
    { name: "Kontak", href: "/kontak" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 transition-all duration-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & Identity */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex items-center">
            <Image
              src="/assets/images/logo-bersama.png"
              alt="Logo Bersama PAC Tahunan"
              width={48}
              height={48}
              className="object-contain group-hover:scale-105 transition duration-300"
            />
          </div>
          <div className="leading-tight">
            <h1 className="font-extrabold text-sm sm:text-base tracking-tight text-slate-900 uppercase leading-none">
              PAC IPNU IPPNU
            </h1>
            <span className="text-xs text-brand-purple font-bold uppercase tracking-normal">
              Kecamatan Tahunan
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-slate-500">
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

        {/* Action Button: Admin Panel or Session Info */}
        <div className="flex items-center gap-2">
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
              className="p-2 sm:p-2.5 rounded-xl bg-violet-50 hover:bg-violet-100 text-brand-purple transition border border-violet-100 text-xs flex items-center gap-2 font-bold"
            >
              <i className="fas fa-shield-alt text-sm"></i>
              <span className="hidden md:inline">Login</span>
            </Link>
          )}

          {/* Mobile Navigation Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
          >
            <i className={`fas ${mobileMenuOpen ? "fa-times" : "fa-bars"} text-lg`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 text-xs font-bold uppercase tracking-wider">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-3 px-3 rounded-xl transition ${
                pathname === link.href
                  ? "bg-violet-50 text-brand-purple"
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
              className="block py-3 px-3 rounded-xl text-brand-purple bg-violet-50 hover:bg-violet-100 transition flex items-center gap-2"
            >
              <i className="fas fa-columns"></i> Dashboard
            </Link>
          ) : (
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-3 px-3 rounded-xl text-brand-purple bg-violet-50 hover:bg-violet-100 transition flex items-center gap-2"
            >
              <i className="fas fa-shield-alt"></i> Admin Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
