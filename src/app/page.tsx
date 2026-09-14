"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useApp } from "@/lib/context/AppContext";
import { analyzeSpLegality } from "@/lib/api/client";
import {
  MemberGrowthChart,
  SpStatusChart,
  ActivityChart
} from "@/components/DashboardCharts";

export default function Home() {
  const { stats, setStats, appData, dataLoading } = useApp();
  const [activeTab, setActiveTab] = useState<"legalitas" | "analisis" | "agenda">("legalitas");
  const [selectedBanom, setSelectedBanom] = useState<"ipnu" | "ippnu">("ipnu");
  const [spSearchQuery, setSpSearchQuery] = useState("");

  // Timeline items
  const timelineItems = [
    { time: "Hari ini", text: "PR Semat mengunggah berkas kegiatan MAKESTA", icon: "fa-file-upload", color: "text-emerald-600 bg-emerald-50" },
    { time: "Kemarin", text: "PAC IPNU IPPNU Tahunan merilis jadwal LAKMUD I", icon: "fa-calendar-plus", color: "text-violet-600 bg-violet-50" },
    { time: "3 hari lalu", text: "PK SMK NU Tahunan rampung menyelenggarakan MAKESTA", icon: "fa-graduation-cap", color: "text-blue-600 bg-blue-50" },
    { time: "1 minggu lalu", text: "Rekomendasi SP Kepengurusan PR Mantingan diterbitkan", icon: "fa-check-circle", color: "text-emerald-600 bg-emerald-50" }
  ];

  // Static PAC Agendas
  const upcomingAgendas = [
    { title: "Rapat Koordinasi PAC & Ranting", date: "05 Agustus 2026", time: "19:30 WIB", location: "Gedung MWC NU Tahunan", pic: "Rekan Wafa", type: "PAC" },
    { title: "LAKMUD I (Latihan Kader Muda)", date: "14-16 Agustus 2026", time: "08:00 WIB", location: "Madrasah Hasyim Asy'ari", pic: "Rekanita Sofia", type: "PAC" },
    { title: "LAKMAD PAC IPNU IPPNU Tahunan", date: "20 November 2026", time: "08:00 WIB", location: "Madrasah Hasyim Asy'ari", pic: "Dept. Kaderisasi", type: "PAC" }
  ];

  // Compute stats whenever appData changes
  useEffect(() => {
    if (!dataLoading && appData.makesta.length > 0) {
      let totalPeserta = 0;
      appData.makesta.forEach((m) => {
        totalPeserta += m.peserta || 0;
      });
      setStats({
        totalKader: totalPeserta > 0 ? totalPeserta : 1250,
        totalRanting: 15,
        totalKomisariat: 9,
        totalMakesta: appData.makesta.length || 4,
        kaderIpnu: Math.round((totalPeserta > 0 ? totalPeserta : 1250) * 0.46),
        kaderIppnu: (totalPeserta > 0 ? totalPeserta : 1250) - Math.round((totalPeserta > 0 ? totalPeserta : 1250) * 0.46),
      });
    }
  }, [appData, dataLoading, setStats]);

  const activeSpList = selectedBanom === "ipnu" ? appData.ipnu : appData.ippnu;

  const filteredSpList = useMemo(() => {
    return activeSpList
      .map((item) => ({ ...item, analysis: analyzeSpLegality(item.expiryDate) }))
      .filter((item) =>
        item.name.toLowerCase().includes(spSearchQuery.toLowerCase()) ||
        item.spNumber.toLowerCase().includes(spSearchQuery.toLowerCase())
      )
      .sort((a, b) => a.analysis.diffInDays - b.analysis.diffInDays);
  }, [activeSpList, spSearchQuery]);

  // Overall legality health percentage
  const legalityRate = useMemo(() => {
    if (!activeSpList || activeSpList.length === 0) return 85;
    const activeSafe = activeSpList.filter(
      (item) => analyzeSpLegality(item.expiryDate).cluster === "aman"
    ).length;
    return Math.round((activeSafe / activeSpList.length) * 100);
  }, [activeSpList]);

  return (
    <div className="py-6 sm:py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* ─── Compact Executive Hero ────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-gradient-to-br from-slate-900 via-indigo-950 to-violet-950 text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-xl shadow-slate-950/10 border border-slate-800"
      >
        <div className="absolute right-0 bottom-0 w-80 h-80 opacity-5 pointer-events-none transform translate-x-12 translate-y-12">
          <Image
            src="/assets/images/logo-bersama.png"
            alt="Watermark"
            width={320}
            height={320}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-extrabold uppercase tracking-widest text-violet-200">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Portal Resmi Satu Pintu
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-bold text-slate-200">
              <i className="fas fa-calendar-check text-xs text-violet-300"></i> Masa Khidmat: 2025 – 2027
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
            Pusat Data & Layanan Administrasi Terpadu <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-white to-purple-200">
              PAC IPNU IPPNU Kecamatan Tahunan
            </span>
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl font-normal">
            Sistem pemantauan legalitas pimpinan ranting dan komisariat, rekapitulasi agenda kaderisasi se-Kecamatan, serta akses repositori dokumen resmi.
          </p>

          {/* Quick Action Buttons */}
          <div className="pt-2 flex flex-wrap gap-2.5 items-center">
            <button
              onClick={() => setActiveTab("legalitas")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-purple hover:bg-brand-purpleDark text-white text-xs font-black shadow-sm transition"
            >
              <i className="fas fa-shield-alt text-xs"></i> Cek Status SP
            </button>
            <Link
              href="/kalender"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold border border-white/15 transition"
            >
              <i className="fas fa-calendar-alt text-xs text-purple-300"></i> Kalender Agenda
            </Link>
            <Link
              href="/administrasi"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold border border-white/15 transition"
            >
              <i className="fas fa-paper-plane text-xs text-emerald-300"></i> Layanan Surat & SP
            </Link>
          </div>
        </div>
      </motion.div>

      {/* ─── Metric Ribbon (4 Key KPIs) ────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Metric 1 */}
        <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-slate-200 transition">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Total Kader Aktif</span>
            <div className="w-8 h-8 rounded-xl bg-violet-50 text-brand-purple flex items-center justify-center text-xs">
              <i className="fas fa-users"></i>
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {stats.totalKader.toLocaleString("id-ID")}
          </p>
          <p className="text-[10px] text-slate-400 mt-1 font-semibold">
            {stats.kaderIpnu} IPNU &bull; {stats.kaderIppnu} IPPNU
          </p>
        </div>

        {/* Metric 2 */}
        <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-slate-200 transition">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Ranting & PK</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs">
              <i className="fas fa-sitemap"></i>
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            24 <span className="text-xs font-bold text-slate-400">Unit</span>
          </p>
          <p className="text-[10px] text-slate-400 mt-1 font-semibold">
            15 Ranting &bull; 9 Komisariat
          </p>
        </div>

        {/* Metric 3 */}
        <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-slate-200 transition">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">MAKESTA Terlaksana</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs">
              <i className="fas fa-graduation-cap"></i>
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {stats.totalMakesta} <span className="text-xs font-bold text-slate-400">Kegiatan</span>
          </p>
          <p className="text-[10px] text-slate-400 mt-1 font-semibold">
            Periode Khidmat 2025–2027
          </p>
        </div>

        {/* Metric 4 */}
        <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-slate-200 transition">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Legalitas SP Aman</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xs">
              <i className="fas fa-check-double"></i>
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {legalityRate}%
          </p>
          <p className="text-[10px] text-emerald-600 font-bold mt-1">
            Status Legalitas Aktif
          </p>
        </div>
      </div>

      {/* ─── Segmented Control Views (Linear / Vercel Tabs) ────────────────────── */}
      <div className="space-y-6">
        {/* Navigation Tabs Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-150 pb-2">
          <div className="flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/60 max-w-fit">
            <button
              onClick={() => setActiveTab("legalitas")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-extrabold transition flex items-center gap-2 ${
                activeTab === "legalitas"
                  ? "bg-white text-brand-purple shadow-sm border border-slate-100"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <i className="fas fa-shield-alt text-xs"></i>
              <span>Legalitas SP Ranting & PK</span>
            </button>
            <button
              onClick={() => setActiveTab("analisis")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-extrabold transition flex items-center gap-2 ${
                activeTab === "analisis"
                  ? "bg-white text-brand-purple shadow-sm border border-slate-100"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <i className="fas fa-chart-line text-xs"></i>
              <span>Grafik & Analisis</span>
            </button>
            <button
              onClick={() => setActiveTab("agenda")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-extrabold transition flex items-center gap-2 ${
                activeTab === "agenda"
                  ? "bg-white text-brand-purple shadow-sm border border-slate-100"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <i className="fas fa-history text-xs"></i>
              <span>Aktivitas & Agenda</span>
            </button>
          </div>

          <div className="text-[11px] text-slate-400 font-medium">
            Menampilkan data terkini se-Kecamatan Tahunan
          </div>
        </div>

        {/* ── TAB 1: Legalitas SP Ranting & PK ─────────────────────────────────── */}
        {activeTab === "legalitas" && (
          <div className="bg-white border border-slate-100 rounded-3xl p-5 sm:p-7 shadow-sm space-y-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              {/* Banom Switcher */}
              <div className="flex items-center gap-2">
                <div className="bg-slate-100 p-1 rounded-xl flex border border-slate-200">
                  <button
                    onClick={() => setSelectedBanom("ipnu")}
                    className={`px-4 py-1.5 rounded-lg text-xs font-black transition ${
                      selectedBanom === "ipnu"
                        ? "bg-brand-purple text-white shadow-sm"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    IPNU
                  </button>
                  <button
                    onClick={() => setSelectedBanom("ippnu")}
                    className={`px-4 py-1.5 rounded-lg text-xs font-black transition ${
                      selectedBanom === "ippnu"
                        ? "bg-emerald-600 text-white shadow-sm"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    IPPNU
                  </button>
                </div>
                <span className="text-xs text-slate-400 font-semibold hidden sm:inline">
                  &bull; Total: {activeSpList.length} Pimpinan Terdaftar
                </span>
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-72">
                <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                <input
                  type="text"
                  placeholder="Cari pimpinan / nomor SP..."
                  value={spSearchQuery}
                  onChange={(e) => setSpSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-9 pr-4 text-xs text-slate-900 focus:outline-none focus:border-brand-purple transition"
                />
              </div>
            </div>

            {/* SP Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-100">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 text-slate-400 font-extrabold uppercase tracking-wider text-[10px] border-b border-slate-100">
                    <th className="p-3.5 pl-4">Pimpinan</th>
                    <th className="p-3.5">Nomor SP</th>
                    <th className="p-3.5">Batas Akhir</th>
                    <th className="p-3.5">Sisa Masa Aktif</th>
                    <th className="p-3.5 pr-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {dataLoading ? (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-xs text-slate-400 font-medium">
                        <i className="fas fa-spinner fa-spin mr-2 text-brand-purple"></i> Memuat data legalitas...
                      </td>
                    </tr>
                  ) : filteredSpList.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-xs text-slate-400 font-bold">
                        <i className="fas fa-search-minus mr-2"></i> Pimpinan tidak ditemukan
                      </td>
                    </tr>
                  ) : (
                    filteredSpList.map((item, index) => {
                      const analysis = item.analysis;
                      const formattedDate = new Date(item.expiryDate).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      });

                      return (
                        <tr key={index} className="hover:bg-slate-50/70 transition">
                          <td className="p-3.5 pl-4">
                            <span className="font-bold text-slate-900 block">{item.name}</span>
                            <span className="text-[10px] text-slate-400 capitalize">{item.type}</span>
                          </td>
                          <td className="p-3.5 font-mono text-slate-400 text-[11px]">{item.spNumber}</td>
                          <td className="p-3.5 text-slate-600 font-semibold">{formattedDate}</td>
                          <td className="p-3.5">
                            {analysis.diffInDays < 0 ? (
                              <span className="text-red-600 font-bold">Habis {Math.abs(analysis.diffInDays)} hari lalu</span>
                            ) : (
                              <span className={analysis.cluster === "kritis" ? "text-amber-600 font-bold" : "text-slate-700"}>
                                {analysis.diffInDays} hari lagi
                              </span>
                            )}
                          </td>
                          <td className="p-3.5 pr-4">
                            <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider ${analysis.badgeClass}`}>
                              {analysis.statusLabel}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400 pt-1">
              <span>* SP yang mendekati batas kadaluwarsa (&lt; 3 bulan) wajib mengajukan Konferensi Ranting.</span>
              <Link href="/administrasi" className="text-brand-purple font-bold hover:underline">
                Ajukan Rekomendasi SP Baru &rarr;
              </Link>
            </div>
          </div>
        )}

        {/* ── TAB 2: Grafik & Analisis ─────────────────────────────────────────── */}
        {activeTab === "analisis" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Member Growth Chart */}
              <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-3">
                <div className="flex items-center justify-between border-b border-slate-50 pb-3">
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-800">Pertumbuhan Kader Tahunan</h4>
                    <p className="text-[11px] text-slate-400">Tren akumulasi kaderisasi formal (2022–2026)</p>
                  </div>
                  <span className="text-[10px] font-black uppercase text-brand-purple bg-violet-50 px-2 py-0.5 rounded">
                    +15% YoY
                  </span>
                </div>
                <div className="h-64 w-full">
                  <MemberGrowthChart />
                </div>
              </div>

              {/* Status SP Health */}
              <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-3">
                <div className="flex items-center justify-between border-b border-slate-50 pb-3">
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-800">Komposisi Legalitas Organisasi</h4>
                    <p className="text-[11px] text-slate-400">Proporsi pimpinan ranting/komisariat aktif vs kritis</p>
                  </div>
                  <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    24 Unit
                  </span>
                </div>
                <div className="h-64 w-full">
                  <SpStatusChart />
                </div>
              </div>
            </div>

            {/* Active Entities Activity Chart */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-slate-50 pb-3">
                <div>
                  <h4 className="font-extrabold text-sm text-slate-800">Keaktifan Kaderisasi Ranting Teratas</h4>
                  <p className="text-[11px] text-slate-400">Jumlah pelaksanaan MAKESTA dan RTL per ranting</p>
                </div>
                <span className="text-[10px] font-black uppercase text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                  Top Ranting
                </span>
              </div>
              <div className="h-64 w-full">
                <ActivityChart />
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 3: Aktivitas & Agenda ────────────────────────────────────────── */}
        {activeTab === "agenda" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* Timeline */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-50 pb-3">
                <h4 className="font-extrabold text-sm text-slate-800">Timeline Aktivitas Organisasi</h4>
                <span className="text-[10px] font-bold text-slate-400">Terbaru</span>
              </div>
              <div className="relative border-l-2 border-slate-100 pl-6 ml-3 space-y-6 py-2">
                {timelineItems.map((item, index) => (
                  <div key={index} className="relative">
                    <span className={`absolute -left-10 top-0.5 w-7 h-7 rounded-full flex items-center justify-center text-xs shadow-sm ${item.color}`}>
                      <i className={`fas ${item.icon}`}></i>
                    </span>
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">{item.time}</span>
                      <p className="text-xs text-slate-700 font-semibold">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Agendas Preview */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-50 pb-3">
                <h4 className="font-extrabold text-sm text-slate-800">Agenda Kegiatan Terdekat</h4>
                <Link href="/kalender" className="text-xs font-bold text-brand-purple hover:underline">
                  Lihat Kalender Penuh &rarr;
                </Link>
              </div>

              <div className="space-y-3">
                {upcomingAgendas.map((agenda, index) => (
                  <div key={index} className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-violet-100 text-brand-purple flex items-center justify-center font-bold text-xs flex-shrink-0">
                      <i className="far fa-calendar-alt text-sm"></i>
                    </div>
                    <div className="space-y-1">
                      <span className="font-extrabold text-xs text-slate-800 block">{agenda.title}</span>
                      <p className="text-[11px] text-slate-500 font-medium">
                        {agenda.date} &bull; {agenda.time}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        <i className="fas fa-map-marker-alt mr-1"></i> {agenda.location} (PIC: {agenda.pic})
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
