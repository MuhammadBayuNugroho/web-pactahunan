"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/context/AppContext";
import { SpItem, analyzeSpLegality } from "@/lib/api/client";

export default function RantingDashboard() {
  const router = useRouter();
  const { user, showToast, appData, dataLoading } = useApp();
  
  // Scoped data
  const [mySp, setMySp] = useState<SpItem | null>(null);
  const [reports, setReports] = useState<{
    name: string;
    date: string;
    status: "Lengkap" | "Proses Verifikasi" | "Revisi";
  }[]>([
    { name: "MAKESTA Ranting Mantingan 2026", date: "15 Maret 2026", status: "Lengkap" },
    { name: "Rapat Anggota & LPJ Tahunan", date: "18 Mei 2026", status: "Proses Verifikasi" }
  ]);

  // Checklist states for uploading new activity reports
  const [actName, setActName] = useState("");
  const [actDate, setActDate] = useState("");
  const [chkProposal, setChkProposal] = useState(false);
  const [chkSurat, setChkSurat] = useState(false);
  const [chkPoster, setChkPoster] = useState(false);
  const [chkDokumentasi, setChkDokumentasi] = useState(false);
  const [chkLpj, setChkLpj] = useState(false);

  useEffect(() => {
    // Session Guard
    if (!user) {
      router.push("/admin");
      return;
    }
    if (user.role !== "admin_ranting" && user.role !== "admin_komisariat") {
      router.push("/dashboard/pac");
      return;
    }

    if (dataLoading) return;

    const activeList = user.role === "admin_ranting" ? appData.ipnu : appData.ippnu;
    
    // Find matching SP for my pimpinan name
    const match = (activeList || []).find(
      (sp) => sp.name.toLowerCase().includes(user.pimpinan?.toLowerCase() || "")
    );
    
    if (match) {
      setMySp(match);
    } else {
      // Fallback static item matching user pimpinan
      setMySp({
        name: `PR IPNU ${user.pimpinan}`,
        type: "ranting",
        spNumber: "099/IPNU/SP/A/X/2025",
        expiryDate: "2026-12-31"
      });
    }
  }, [user, router, appData.ipnu, appData.ippnu, dataLoading]);

  const handleReportUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!actName || !actDate) return;

    // Check completeness
    const complete = chkProposal && chkSurat && chkPoster && chkDokumentasi && chkLpj;
    const newReport = {
      name: actName,
      date: actDate,
      status: complete ? ("Lengkap" as const) : ("Proses Verifikasi" as const)
    };

    setReports([newReport, ...reports]);
    showToast("Laporan Ditambahkan", "Berkas dikirim ke PAC untuk diverifikasi.", "success");

    // Reset Form
    setActName("");
    setActDate("");
    setChkProposal(false);
    setChkSurat(false);
    setChkPoster(false);
    setChkDokumentasi(false);
    setChkLpj(false);
  };

  if (!user) return null;
  if (dataLoading) {
    return (
      <div className="py-12 text-center text-xs text-slate-400 font-medium">
        <i className="fas fa-spinner fa-spin mr-2"></i> Membuka Dasbor Ranting...
      </div>
    );
  }

  const analysis = mySp ? analyzeSpLegality(mySp.expiryDate) : null;

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Dashboard Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900">
              Dasbor Admin PR/PK {user.pimpinan}
            </h2>
          </div>
          <p className="text-xs text-slate-500">Selamat datang di Panel Konsol Administrasi digital tingkat pimpinan Ranting/Komisariat.</p>
        </div>
      </div>

      {/* Grid: SP Status & Local Alert Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* SP Status details */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4 md:col-span-2">
          <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Masa Berlaku SK / SP Kepengurusan</h3>
          
          {mySp && analysis && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <div className="space-y-3">
                <div>
                  <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-extrabold">Nama Pimpinan Resmi</span>
                  <span className="text-sm font-extrabold text-slate-800">{mySp.name}</span>
                </div>
                <div>
                  <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-extrabold">Nomor SK / SP</span>
                  <span className="text-xs font-mono text-slate-500">{mySp.spNumber}</span>
                </div>
                <div>
                  <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-extrabold">Tanggal Kedaluwarsa</span>
                  <span className="text-xs text-slate-650 font-bold">
                    {new Date(mySp.expiryDate).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                  </span>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-center justify-center text-center space-y-2">
                <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest ${analysis.badgeClass}`}>
                  {analysis.statusLabel}
                </span>
                <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                  {analysis.diffInDays < 0 ? (
                    <span className="text-red-650 font-bold">Masa bakti kepengurusan Anda telah kedaluwarsa. Mohon segera laksanakan Rapat Anggota!</span>
                  ) : (
                    <span>Masa bakti menyisakan {analysis.diffInDays} hari aktif lagi.</span>
                  )}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Local Quick Stats */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Ringkasan Aktivitas</h3>
          <div className="space-y-3 divide-y divide-slate-100">
            <div className="flex justify-between items-center py-2">
              <span className="text-xs text-slate-500 font-semibold">Total Anggota Ranting</span>
              <span className="text-xs font-black text-slate-800">45 Kader</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-xs text-slate-500 font-semibold">Makesta Terlaksana</span>
              <span className="text-xs font-black text-slate-800">1 Kegiatan</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-xs text-slate-500 font-semibold">Dokumen di Repository</span>
              <span className="text-xs font-black text-slate-800">2 Template</span>
            </div>
          </div>
        </div>

      </div>

      {/* Grid Reports Checklist & History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
        
        {/* Upload Activity Report with Checklist */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider border-b border-slate-50 pb-3">
            Laporkan Kegiatan Baru & LPJ
          </h3>
          <form onSubmit={handleReportUploadSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-[9px] font-extrabold text-slate-400 uppercase">Nama Kegiatan</label>
                <input
                  type="text"
                  required
                  value={actName}
                  onChange={(e) => setActName(e.target.value)}
                  placeholder="Contoh: MAKESTA Ranting Semat 2026"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-purple transition"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[9px] font-extrabold text-slate-400 uppercase">Tanggal Pelaksanaan</label>
                <input
                  type="text"
                  required
                  value={actDate}
                  onChange={(e) => setActDate(e.target.value)}
                  placeholder="Contoh: 14-15 Maret 2026"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-purple transition"
                />
              </div>
            </div>

            {/* Checklist items */}
            <div className="space-y-2 border-t border-slate-50 pt-4">
              <span className="block text-[9px] font-extrabold text-slate-450 uppercase tracking-wider mb-2">Checklist Unggah Kelengkapan Dokumen</span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={chkProposal}
                    onChange={(e) => setChkProposal(e.target.checked)}
                    className="rounded border-slate-300 text-brand-purple focus:ring-brand-purple"
                  />
                  <span className="text-slate-650 font-semibold">Unggah Proposal Kegiatan</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={chkSurat}
                    onChange={(e) => setChkSurat(e.target.checked)}
                    className="rounded border-slate-300 text-brand-purple focus:ring-brand-purple"
                  />
                  <span className="text-slate-650 font-semibold">Unggah Surat Permohonan</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={chkPoster}
                    onChange={(e) => setChkPoster(e.target.checked)}
                    className="rounded border-slate-300 text-brand-purple focus:ring-brand-purple"
                  />
                  <span className="text-slate-650 font-semibold">Unggah Poster Publikasi</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={chkDokumentasi}
                    onChange={(e) => setChkDokumentasi(e.target.checked)}
                    className="rounded border-slate-300 text-brand-purple focus:ring-brand-purple"
                  />
                  <span className="text-slate-650 font-semibold">Unggah Foto Dokumentasi</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer sm:col-span-2">
                  <input
                    type="checkbox"
                    checked={chkLpj}
                    onChange={(e) => setChkLpj(e.target.checked)}
                    className="rounded border-slate-300 text-brand-purple focus:ring-brand-purple"
                  />
                  <span className="text-slate-650 font-semibold">Unggah Laporan Pertanggungjawaban (LPJ) & Absensi</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-brand-purple hover:bg-brand-purpleDark text-white font-extrabold text-xs uppercase tracking-widest transition duration-300 shadow-sm shadow-violet-100 flex items-center justify-center gap-2"
            >
              <i className="fas fa-file-upload"></i> Kirim Laporan & Berkas LPJ
            </button>
          </form>
        </div>

        {/* History of submissions */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
          <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Status Laporan Terkirim</h3>
          
          <div className="divide-y divide-slate-100">
            {reports.map((rep, idx) => (
              <div key={idx} className={`py-3.5 ${idx === 0 ? "pt-0" : ""} ${idx === reports.length - 1 ? "pb-0" : ""}`}>
                <div className="flex justify-between items-center gap-4">
                  <div className="space-y-1">
                    <span className="block text-xs font-extrabold text-slate-800">{rep.name}</span>
                    <span className="block text-[10px] text-slate-400 font-semibold">Diserahkan: {rep.date}</span>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                    rep.status === "Lengkap"
                      ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                      : rep.status === "Proses Verifikasi"
                      ? "bg-blue-50 text-blue-600 border border-blue-100"
                      : "bg-red-50 text-red-650 border border-red-100"
                  }`}>
                    {rep.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
