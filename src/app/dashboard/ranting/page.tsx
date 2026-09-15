"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/context/AppContext";
import { SpItem, analyzeSpLegality } from "@/lib/api/client";

export default function RantingDashboard() {
  const router = useRouter();
  const { user, logout, showToast, appData, dataLoading } = useApp();
  
  // Scoped data
  const [mySp, setMySp] = useState<SpItem | null>(null);
  const [reports, setReports] = useState<{
    name: string;
    date: string;
    status: "Lengkap" | "Proses Verifikasi" | "Revisi";
  }[]>([
    { name: "MAKESTA Masa Khidmat 2025–2027", date: "15 Maret 2026", status: "Lengkap" },
    { name: "Laporan Pertanggungjawaban Tahunan", date: "18 Mei 2026", status: "Proses Verifikasi" }
  ]);

  // Form states for uploading new activity reports
  const [actName, setActName] = useState("");
  const [actDate, setActDate] = useState("");
  const [actFile, setActFile] = useState<File | null>(null);
  const [chkProposal, setChkProposal] = useState(false);
  const [chkSurat, setChkSurat] = useState(false);
  const [chkPoster, setChkPoster] = useState(false);
  const [chkDokumentasi, setChkDokumentasi] = useState(false);
  const [chkLpj, setChkLpj] = useState(false);
  const [submittingReport, setSubmittingReport] = useState(false);

  // WhatsApp modal draft
  const [waModalOpen, setWaModalOpen] = useState(false);
  const [waDraftText, setWaDraftText] = useState("");

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
    
    // Find matching SP for user's pimpinan
    const match = (activeList || []).find(
      (sp) => sp.name.toLowerCase().includes(user.pimpinan?.toLowerCase() || "")
    );
    
    if (match) {
      setMySp(match);
    } else {
      // Fallback matching pimpinan name
      setMySp({
        name: `PR IPNU ${user.pimpinan || "Tahunan"}`,
        type: user.role === "admin_ranting" ? "ranting" : "komisariat",
        spNumber: "099/IPNU/SP/A/X/2025",
        expiryDate: "2026-12-31"
      });
    }
  }, [user, router, appData.ipnu, appData.ippnu, dataLoading]);

  // Dynamic Makesta calculation for this pimpinan
  const myMakestaList = useMemo(() => {
    const pimpinanName = user?.pimpinan;
    if (!pimpinanName) return [];
    return (appData.makesta || []).filter((m) =>
      m.penyelenggara.toLowerCase().includes(pimpinanName.toLowerCase())
    );
  }, [appData.makesta, user]);

  const totalKaderDicetak = useMemo(() => {
    return myMakestaList.reduce((acc, curr) => acc + (curr.peserta || 0), 0);
  }, [myMakestaList]);

  const handleReportUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!actName || !actDate) {
      showToast("Data Belum Lengkap", "Isi nama kegiatan dan tanggal pelaksanaan.", "error");
      return;
    }

    setSubmittingReport(true);
    const complete = chkProposal && chkSurat && chkPoster && chkDokumentasi && chkLpj;
    const newReport = {
      name: actName,
      date: actDate,
      status: complete ? ("Lengkap" as const) : ("Proses Verifikasi" as const)
    };

    setReports([newReport, ...reports]);

    const msg = `*LAPORAN KEGIATAN & BERKAS LPJ* 📁\n\nAssalamu'alaikum Wr. Wb. Rekan/Rekanita Sekretaris Umum PAC Tahunan,\n\nPimpinan *PR/PK IPNU IPPNU ${user?.pimpinan}* telah menyerahkan laporan kegiatan baru:\n\n🔹 *Nama Kegiatan:* ${actName}\n🔹 *Waktu Pelaksanaan:* ${actDate}\n🔹 *Kelengkapan:* ${complete ? "Lengkap (Proposal, Surat, Poster, Dokumentasi, LPJ)" : "Sebagian Berkas"}\n\nMohon diverifikasi dalam sistem administrasi PAC. Terima kasih!`;
    setWaDraftText(msg);
    setWaModalOpen(true);
    setSubmittingReport(false);

    // Reset Form
    setActName("");
    setActDate("");
    setActFile(null);
    setChkProposal(false);
    setChkSurat(false);
    setChkPoster(false);
    setChkDokumentasi(false);
    setChkLpj(false);
  };

  const sendWhatsApp = () => {
    const waUrl = `https://wa.me/6282242147243?text=${encodeURIComponent(waDraftText)}`;
    window.open(waUrl, "_blank");
    setWaModalOpen(false);
  };

  if (!user) return null;
  if (dataLoading) {
    return (
      <div className="py-16 text-center text-xs text-slate-400 font-medium">
        <i className="fas fa-spinner fa-spin mr-2 text-emerald-600 text-base"></i> Membuka Dasbor Pimpinan...
      </div>
    );
  }

  const analysis = mySp ? analyzeSpLegality(mySp.expiryDate) : null;

  return (
    <div className="py-6 sm:py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      
      {/* ─── Executive Header Bar ────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-150 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
              Dasbor Admin PR/PK {user.pimpinan}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-wider border border-emerald-200">
              {user.role === "admin_ranting" ? "Pimpinan Ranting" : "Pimpinan Komisariat"}
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            Panel administrasi digital terintegrasi dengan kesekretariatan PAC IPNU IPPNU Kecamatan Tahunan.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            target="_blank"
            className="px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 transition flex items-center gap-1.5"
          >
            <i className="fas fa-external-link-alt text-[10px] text-slate-400"></i>
            <span>Portal Publik</span>
          </Link>
          <button
            onClick={logout}
            className="px-3.5 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold border border-red-100 transition flex items-center gap-1.5"
          >
            <i className="fas fa-sign-out-alt text-[11px]"></i>
            <span>Keluar</span>
          </button>
        </div>
      </div>

      {/* ─── Top Cards: SP Legalitas & Dinamis Stat ──────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* SP Legalitas Card */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-50 pb-3">
            <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
              Legalitas Surat Pengesahan (SP)
            </h3>
            {analysis && (
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${analysis.badgeClass}`}>
                {analysis.statusLabel}
              </span>
            )}
          </div>

          {mySp && analysis && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <div className="space-y-3">
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold">Nama Pimpinan Resmi</span>
                  <span className="text-base font-black text-slate-900">{mySp.name}</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold">Nomor SK / SP</span>
                  <span className="text-xs font-mono text-slate-600 font-semibold">{mySp.spNumber}</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold">Batas Masa Berlaku</span>
                  <span className="text-xs text-slate-700 font-bold">
                    {new Date(mySp.expiryDate).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                  </span>
                </div>
              </div>

              {/* Status Indicator Card */}
              <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-100 flex flex-col items-center justify-center text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-xs flex items-center justify-center text-xl text-brand-purple">
                  <i className="fas fa-stamp"></i>
                </div>
                <div>
                  <span className="text-xs font-black text-slate-900 block">
                    {analysis.diffInDays < 0 ? (
                      <span className="text-red-600 font-black">Kedaluwarsa {Math.abs(analysis.diffInDays)} hari lalu</span>
                    ) : (
                      <span>Sisa Masa Bakti: {analysis.diffInDays} Hari Aktif</span>
                    )}
                  </span>
                  <p className="text-[11px] text-slate-500 mt-1">
                    {analysis.cluster === "kritis" || analysis.diffInDays < 0 ? (
                      "Waktunya menyiapkan Konferensi Ranting / Rapat Anggota untuk perpanjangan kepengurusan."
                    ) : (
                      "Kepengurusan sah dan memiliki hak suara penuh dalam forum organisasi PAC."
                    )}
                  </p>
                </div>
                <Link
                  href="/administrasi"
                  className="px-4 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-[11px] font-black transition shadow-xs"
                >
                  Ajukan Perpanjangan SP &rarr;
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Dynamic Activity Metrics */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-1 border-b border-slate-50 pb-3">
            <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
              Statistik {user.pimpinan}
            </h3>
            <span className="text-[11px] text-slate-400">Dihitung otomatis dari database PAC</span>
          </div>

          <div className="space-y-3 divide-y divide-slate-100">
            <div className="flex justify-between items-center py-2">
              <span className="text-xs text-slate-600 font-semibold">Kader Lulus Makesta</span>
              <span className="text-sm font-black text-brand-purple">
                {totalKaderDicetak > 0 ? `${totalKaderDicetak} Kader` : "Belum Rekap"}
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-xs text-slate-600 font-semibold">Penyelenggaraan Makesta</span>
              <span className="text-sm font-black text-slate-800">
                {myMakestaList.length} Kegiatan
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-xs text-slate-600 font-semibold">Laporan Diserahkan</span>
              <span className="text-sm font-black text-slate-800">
                {reports.length} Berkas
              </span>
            </div>
          </div>

          <Link
            href="/repository"
            className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold text-center transition block"
          >
            Unduh Template Surat & Modul &rarr;
          </Link>
        </div>
      </div>

      {/* ─── Bottom Section: Form Lapor & Status Laporan ─────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Upload Form Card */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
          <div className="space-y-1 border-b border-slate-50 pb-3">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
              Lapor Kegiatan & Unggah Berkas LPJ
            </h3>
            <p className="text-[11px] text-slate-400">Kirim laporan kegiatan yang telah terlaksana ke Departemen Administrasi PAC</p>
          </div>

          <form onSubmit={handleReportUploadSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1">
                <label className="block text-[9px] font-extrabold text-slate-400 uppercase">Nama Kegiatan</label>
                <input
                  type="text"
                  required
                  value={actName}
                  onChange={(e) => setActName(e.target.value)}
                  placeholder={`Contoh: MAKESTA PR ${user.pimpinan}`}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-purple"
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
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-purple"
                />
              </div>
            </div>

            {/* Checklist items */}
            <div className="space-y-2 border-t border-slate-50 pt-3">
              <span className="block text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">
                Kelengkapan Berkas yang Dilampirkan:
              </span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={chkProposal}
                    onChange={(e) => setChkProposal(e.target.checked)}
                    className="rounded border-slate-300 text-brand-purple focus:ring-brand-purple"
                  />
                  <span className="text-slate-700 font-semibold">Proposal Kegiatan</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={chkSurat}
                    onChange={(e) => setChkSurat(e.target.checked)}
                    className="rounded border-slate-300 text-brand-purple focus:ring-brand-purple"
                  />
                  <span className="text-slate-700 font-semibold">Surat Permohonan / SK</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={chkPoster}
                    onChange={(e) => setChkPoster(e.target.checked)}
                    className="rounded border-slate-300 text-brand-purple focus:ring-brand-purple"
                  />
                  <span className="text-slate-700 font-semibold">Pamflet / Publikasi</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={chkDokumentasi}
                    onChange={(e) => setChkDokumentasi(e.target.checked)}
                    className="rounded border-slate-300 text-brand-purple focus:ring-brand-purple"
                  />
                  <span className="text-slate-700 font-semibold">Foto Dokumentasi</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer sm:col-span-2">
                  <input
                    type="checkbox"
                    checked={chkLpj}
                    onChange={(e) => setChkLpj(e.target.checked)}
                    className="rounded border-slate-300 text-brand-purple focus:ring-brand-purple"
                  />
                  <span className="text-slate-700 font-semibold">LPJ Keuangan & Absensi Peserta</span>
                </label>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-[9px] font-extrabold text-slate-400 uppercase">Lampirkan Berkas Gabungan (PDF)</label>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setActFile(e.target.files ? e.target.files[0] : null)}
                className="w-full text-xs text-slate-400 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-violet-50 file:text-brand-purple hover:file:bg-violet-100"
              />
            </div>

            <button
              type="submit"
              disabled={submittingReport}
              className="w-full py-3 rounded-2xl bg-brand-purple hover:bg-brand-purpleDark text-white font-black text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-sm"
            >
              <i className="fas fa-paper-plane"></i> Kirim Laporan & Berkas LPJ
            </button>
          </form>
        </div>

        {/* History Card */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
          <div className="space-y-1 border-b border-slate-50 pb-3">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
              Riwayat Laporan Terkirim
            </h3>
            <p className="text-[11px] text-slate-400">Status verifikasi dokumen oleh Sekretariat PAC Tahunan</p>
          </div>
          
          <div className="divide-y divide-slate-100">
            {reports.map((rep, idx) => (
              <div key={idx} className={`py-3.5 ${idx === 0 ? "pt-0" : ""}`}>
                <div className="flex justify-between items-center gap-4">
                  <div className="space-y-1">
                    <span className="block text-xs font-bold text-slate-900">{rep.name}</span>
                    <span className="block text-[10px] text-slate-400 font-medium">Diserahkan: {rep.date}</span>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider ${
                    rep.status === "Lengkap"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : rep.status === "Proses Verifikasi"
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "bg-red-50 text-red-650 border border-red-200"
                  }`}>
                    {rep.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* WA Draft Modal */}
      {waModalOpen && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs uppercase tracking-wider font-black text-brand-purple flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Notifikasi LPJ Siap Dikirim
              </span>
              <button onClick={() => setWaModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <i className="fas fa-times text-sm"></i>
              </button>
            </div>

            <div className="space-y-1">
              <h4 className="font-black text-base text-slate-900">Laporan Berhasil Dicatat!</h4>
              <p className="text-xs text-slate-500">
                Klik tombol di bawah untuk mengirimkan draf pesan laporan langsung ke WhatsApp Sekretaris Umum PAC Tahunan:
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700 leading-relaxed max-h-40 overflow-y-auto">
              <p className="whitespace-pre-line text-slate-700 font-semibold">{waDraftText}</p>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setWaModalOpen(false)}
                className="w-1/3 py-2.5 rounded-xl bg-slate-100 text-slate-600 font-bold text-xs hover:bg-slate-200 transition"
              >
                Tutup
              </button>
              <button
                onClick={sendWhatsApp}
                className="w-2/3 py-2.5 rounded-xl bg-emerald-600 text-white font-black text-xs hover:bg-emerald-700 transition flex items-center justify-center gap-1.5 shadow-sm"
              >
                <i className="fab fa-whatsapp text-sm"></i> Kirim Ke WA Sekretaris
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
