"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/context/AppContext";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const { appData } = useApp();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Search Results aggregation
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return {
        pages: [
          { title: "Beranda Utama", href: "/", icon: "fa-home", category: "Navigasi Cepat" },
          { title: "Kalender & Jadwal Organisasi", href: "/kalender", icon: "fa-calendar-alt", category: "Navigasi Cepat" },
          { title: "Database & Matriks Kaderisasi", href: "/kaderisasi", icon: "fa-graduation-cap", category: "Navigasi Cepat" },
          { title: "Layanan Administrasi & SP", href: "/administrasi", icon: "fa-file-signature", category: "Navigasi Cepat" },
          { title: "Pusat Repositori & AD/ART", href: "/repository", icon: "fa-book-open", category: "Navigasi Cepat" },
          { title: "Portal Berita & Opini", href: "/berita", icon: "fa-newspaper", category: "Navigasi Cepat" },
          { title: "Hubungi Kesekretariatan", href: "/kontak", icon: "fa-phone-alt", category: "Navigasi Cepat" },
        ],
        ranting: [],
        docs: [],
        agendas: []
      };
    }

    // Filter Ranting / Komisariat
    const allSp = [
      ...(appData.ipnu || []).map(s => ({ ...s, banom: "IPNU" })),
      ...(appData.ippnu || []).map(s => ({ ...s, banom: "IPPNU" }))
    ];
    const ranting = allSp.filter(
      r => r.name.toLowerCase().includes(q) || r.spNumber.toLowerCase().includes(q)
    ).slice(0, 5);

    // Filter Documents
    const docs = (appData.repository || []).filter(
      d => d.title.toLowerCase().includes(q) || d.description.toLowerCase().includes(q)
    ).slice(0, 4);

    // Filter Makesta / Agendas
    const agendas = (appData.makesta || []).filter(
      m => m.penyelenggara.toLowerCase().includes(q) || m.tempat.toLowerCase().includes(q)
    ).slice(0, 4);

    // Filter Pages
    const allPages = [
      { title: "Beranda", href: "/", icon: "fa-home", category: "Navigasi" },
      { title: "Kalender Kegiatan", href: "/kalender", icon: "fa-calendar-alt", category: "Navigasi" },
      { title: "Database Kaderisasi (MAKESTA)", href: "/kaderisasi", icon: "fa-graduation-cap", category: "Navigasi" },
      { title: "Administrasi & Pengajuan SP", href: "/administrasi", icon: "fa-file-signature", category: "Navigasi" },
      { title: "Pusat Dokumen & AD/ART", href: "/repository", icon: "fa-book-open", category: "Navigasi" },
      { title: "Berita & Publikasi", href: "/berita", icon: "fa-newspaper", category: "Navigasi" },
      { title: "Hubungi Kami", href: "/kontak", icon: "fa-phone-alt", category: "Navigasi" },
      { title: "Login Dashboard Admin", href: "/admin", icon: "fa-lock", category: "Navigasi" },
    ];
    const pages = allPages.filter(p => p.title.toLowerCase().includes(q));

    return { pages, ranting, docs, agendas };
  }, [query, appData]);

  if (!isOpen) return null;

  const handleNavigate = (href: string) => {
    onClose();
    router.push(href);
  };

  const totalResults = results.pages.length + results.ranting.length + results.docs.length + results.agendas.length;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/40 backdrop-blur-sm animate-fadeIn">
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose}></div>

      {/* Palette Container */}
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-100 bg-slate-50/50">
          <i className="fas fa-search text-slate-400 text-sm"></i>
          <input
            ref={inputRef}
            type="text"
            placeholder="Cari ranting, agenda makesta, surat pengesahan, pedoman..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-slate-400 hover:text-slate-600 p-1 text-xs"
            >
              <i className="fas fa-times-circle"></i>
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-semibold text-slate-400 bg-slate-100 border border-slate-200 rounded">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-3 space-y-4 text-xs">
          {totalResults === 0 ? (
            <div className="py-12 text-center text-slate-400 space-y-2">
              <i className="fas fa-search text-2xl text-slate-300 block mb-1"></i>
              <p className="font-semibold text-xs">Tidak ada hasil yang cocok untuk &ldquo;{query}&rdquo;</p>
              <p className="text-[11px] text-slate-400">Coba cari dengan kata kunci nama ranting, dokumen, atau kegiatan.</p>
            </div>
          ) : (
            <>
              {/* Ranting / Pimpinan Results */}
              {results.ranting.length > 0 && (
                <div className="space-y-1.5">
                  <div className="px-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Pimpinan Ranting / Komisariat
                  </div>
                  <div className="space-y-1">
                    {results.ranting.map((r, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleNavigate(`/`)}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-violet-50/70 border border-transparent hover:border-violet-100 transition cursor-pointer group"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black ${
                            r.banom === "IPNU" ? "bg-violet-100 text-brand-purple" : "bg-emerald-100 text-emerald-700"
                          }`}>
                            {r.banom}
                          </div>
                          <div>
                            <span className="font-bold text-slate-800 group-hover:text-brand-purple block">{r.name}</span>
                            <span className="text-[10px] font-mono text-slate-400">{r.spNumber}</span>
                          </div>
                        </div>
                        <span className="text-[10px] font-semibold text-slate-400 group-hover:text-brand-purple flex items-center gap-1">
                          Lihat SP <i className="fas fa-arrow-right text-[9px]"></i>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Agendas / Makesta Results */}
              {results.agendas.length > 0 && (
                <div className="space-y-1.5">
                  <div className="px-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Agenda & Kaderisasi
                  </div>
                  <div className="space-y-1">
                    {results.agendas.map((a, idx) => {
                      const slug = `makesta-${a.penyelenggara.toLowerCase().replace(/ /g, "-").replace(/[^a-z0-9-]/g, "")}`;
                      return (
                        <div
                          key={idx}
                          onClick={() => handleNavigate(`/kegiatan/${slug}`)}
                          className="flex items-center justify-between p-2.5 rounded-xl hover:bg-violet-50/70 border border-transparent hover:border-violet-100 transition cursor-pointer group"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs">
                              <i className="fas fa-graduation-cap"></i>
                            </div>
                            <div>
                              <span className="font-bold text-slate-800 group-hover:text-brand-purple block">
                                MAKESTA {a.penyelenggara}
                              </span>
                              <span className="text-[10px] text-slate-400">
                                {a.tanggal} &bull; {a.tempat} ({a.peserta || 0} Kader)
                              </span>
                            </div>
                          </div>
                          <span className="text-[10px] font-semibold text-slate-400 group-hover:text-brand-purple flex items-center gap-1">
                            Arsip <i className="fas fa-arrow-right text-[9px]"></i>
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Documents Repository Results */}
              {results.docs.length > 0 && (
                <div className="space-y-1.5">
                  <div className="px-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Dokumen & Pedoman Resmi
                  </div>
                  <div className="space-y-1">
                    {results.docs.map((d, idx) => (
                      <a
                        key={idx}
                        href={`https://drive.google.com/file/d/${d.driveId}/preview`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-violet-50/70 border border-transparent hover:border-violet-100 transition cursor-pointer group"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs">
                            <i className="fas fa-file-pdf"></i>
                          </div>
                          <div>
                            <span className="font-bold text-slate-800 group-hover:text-brand-purple block">{d.title}</span>
                            <span className="text-[10px] text-slate-400 line-clamp-1">{d.description}</span>
                          </div>
                        </div>
                        <span className="text-[10px] font-semibold text-slate-400 group-hover:text-brand-purple flex items-center gap-1">
                          Buka <i className="fas fa-external-link-alt text-[9px]"></i>
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Pages & Quick Navigation */}
              {results.pages.length > 0 && (
                <div className="space-y-1.5">
                  <div className="px-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Navigasi Cepat
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                    {results.pages.map((p, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleNavigate(p.href)}
                        className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-100 transition cursor-pointer group"
                      >
                        <div className="w-6 h-6 rounded-lg bg-slate-100 group-hover:bg-violet-100 group-hover:text-brand-purple text-slate-500 flex items-center justify-center text-xs transition">
                          <i className={`fas ${p.icon}`}></i>
                        </div>
                        <span className="font-bold text-slate-700 group-hover:text-slate-900">{p.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer info */}
        <div className="p-2.5 px-4 bg-slate-50 border-t border-slate-100 text-[10px] text-slate-400 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span>Gunakan <kbd className="font-mono bg-white border border-slate-200 px-1 py-0.5 rounded text-[9px]">Ctrl+K</kbd> kapan saja</span>
          </span>
          <span>PAC IPNU IPPNU Tahunan</span>
        </div>
      </div>
    </div>
  );
}
