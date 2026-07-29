"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useApp } from "@/lib/context/AppContext";
import {
  getSpData,
  SpItem,
  MakestaItem,
  BeritaItem,
  analyzeSpLegality
} from "@/lib/api/client";
import {
  MemberGrowthChart,
  SpStatusChart,
  ActivityChart
} from "@/components/DashboardCharts";

export default function Home() {
  const { stats, setStats, showToast } = useApp();
  const [loading, setLoading] = useState(true);
  const [spIpnu, setSpIpnu] = useState<SpItem[]>([]);
  const [spIppnu, setSpIppnu] = useState<SpItem[]>([]);
  const [berita, setBerita] = useState<BeritaItem[]>([]);
  const [makesta, setMakesta] = useState<MakestaItem[]>([]);
  
  const [selectedBanom, setSelectedBanom] = useState<"ipnu" | "ippnu">("ipnu");
  const [spSearchQuery, setSpSearchQuery] = useState("");

  // Timeline mock items
  const timelineItems = [
    { time: "Hari ini", text: "PR Semat mengunggah LPJ MAKESTA", icon: "fa-file-upload", color: "text-emerald-500 bg-emerald-50" },
    { time: "Kemarin", text: "PAC IPNU IPPNU Tahunan membuat agenda LAKMUD I", icon: "fa-calendar-plus", color: "text-violet-600 bg-violet-50" },
    { time: "3 hari lalu", text: "PK SMK NU Tahunan selesai menyelenggarakan MAKESTA", icon: "fa-graduation-cap", color: "text-blue-500 bg-blue-50" },
    { time: "1 minggu lalu", text: "SP Kepengurusan PR Mantingan disetujui & aktif", icon: "fa-check-circle", color: "text-emerald-500 bg-emerald-50" }
  ];

  // Agenda mock items
  const agendaItems = [
    { title: "Rapat Koordinasi PAC & Ranting", date: "05 Agustus 2026", time: "19:30 WIB", location: "Gedung MWC NU Tahunan", pic: "Rekan Wafa" },
    { title: "LAKMUD I (Latihan Kader Muda)", date: "14-16 Agustus 2026", time: "08:00 WIB", location: "Madrasah Hasyim Asy'ari", pic: "Rekanita Sofia" }
  ];

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getSpData();
        setSpIpnu(data.ipnu);
        setSpIppnu(data.ippnu);
        setBerita(data.berita);
        setMakesta(data.makesta);

        // Sum participants of MAKESTA
        let totalPeserta = 0;
        data.makesta.forEach((m) => {
          totalPeserta += m.peserta || 0;
        });

        // Set stats
        setStats({
          totalKader: totalPeserta > 0 ? totalPeserta : 1250,
          totalRanting: 15,
          totalKomisariat: 9,
          totalMakesta: data.makesta.length || 4,
          kaderIpnu: Math.round((totalPeserta > 0 ? totalPeserta : 1250) * 0.46),
          kaderIppnu: (totalPeserta > 0 ? totalPeserta : 1250) - Math.round((totalPeserta > 0 ? totalPeserta : 1250) * 0.46),
        });
      } catch (err) {
        console.error("Gagal sinkronisasi data.", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [setStats]);

  const activeSpList = selectedBanom === "ipnu" ? spIpnu : spIppnu;

  const filteredSpList = activeSpList
    .map(item => ({ ...item, analysis: analyzeSpLegality(item.expiryDate) }))
    .filter(item =>
      item.name.toLowerCase().includes(spSearchQuery.toLowerCase()) ||
      item.spNumber.toLowerCase().includes(spSearchQuery.toLowerCase())
    )
    .sort((a, b) => a.analysis.diffInDays - b.analysis.diffInDays);

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Greeting & Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-tr from-violet-950 via-indigo-900 to-purple-950 text-white rounded-3xl p-6 sm:p-12 relative overflow-hidden shadow-xl shadow-indigo-900/10"
      >
        <div className="absolute -right-10 -bottom-10 w-64 h-64 opacity-5 pointer-events-none transform rotate-12">
          <Image src="/assets/images/logo-bersama.png" alt="Overlay Logo" width={256} height={256} className="w-full h-full object-contain" />
        </div>

        <div className="relative z-10 space-y-4 max-w-2xl">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-widest text-violet-200">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Portal Resmi Satu Pintu
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Selamat Datang di Portal Data <br className="hidden sm:inline" /> PAC IPNU IPPNU Kecamatan Tahunan
          </h2>
          <p className="text-violet-200 text-sm leading-relaxed font-medium">
            Pusat data, digital office, pemantauan legalitas kepengurusan pimpinan ranting/komisariat, serta rekapitulasi kaderisasi terintegrasi Kecamatan Tahunan, Jepara.
          </p>
          <div className="pt-2 flex flex-wrap gap-3 items-center">
            <span className="inline-flex items-center gap-1.5 text-xs bg-white/15 text-white font-bold px-3 py-1.5 rounded-lg border border-white/10">
              <i className="fas fa-calendar-check text-xs text-purple-300"></i> Periode Masa Khidmat: 2025 - 2027
            </span>
          </div>
        </div>
      </motion.div>

      {/* Bento Grid Stats */}
      <div className="space-y-4">
        <h3 className="text-xs font-extrabold text-slate-400 tracking-wider uppercase">Statistik & Analisis Organisasi</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Total Anggota */}
          <div className="p-6 bg-white rounded-2xl border border-slate-100 flex flex-col justify-between hover-card-glow shadow-sm min-h-[160px]">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider font-extrabold text-slate-400">Kader Terdata</span>
              <div className="w-8 h-8 rounded-lg bg-violet-50 text-brand-purple flex items-center justify-center flex-shrink-0">
                <i className="fas fa-users text-sm"></i>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">{stats.totalKader} Anggota</span>
              <div className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider block mt-2">
                <span className="text-emerald-600"><i className="fas fa-mars mr-0.5"></i> IPNU: {stats.kaderIpnu}</span>
                <span className="mx-1 text-slate-300">|</span>
                <span className="text-pink-600"><i className="fas fa-venus mr-0.5"></i> IPPNU: {stats.kaderIppnu}</span>
              </div>
            </div>
          </div>

          {/* Card 2: Pimpinan Ranting */}
          <div className="p-6 bg-white rounded-2xl border border-slate-100 flex flex-col justify-between hover-card-glow shadow-sm min-h-[160px]">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider font-extrabold text-slate-400">Pimpinan Ranting</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                <i className="fas fa-home text-sm"></i>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">{stats.totalRanting} Ranting</span>
              <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider block mt-2">Kepengurusan Tingkat Desa</span>
            </div>
          </div>

          {/* Card 3: Pimpinan Komisariat */}
          <div className="p-6 bg-white rounded-2xl border border-slate-100 flex flex-col justify-between hover-card-glow shadow-sm min-h-[160px]">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider font-extrabold text-slate-400">Pimpinan Komisariat</span>
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                <i className="fas fa-graduation-cap text-sm"></i>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">{stats.totalKomisariat} Komisariat</span>
              <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider block mt-2">Sekolah & Pondok Pesantren</span>
            </div>
          </div>

          {/* Card 4: Makesta */}
          <div className="p-6 bg-white rounded-2xl border border-slate-100 flex flex-col justify-between hover-card-glow shadow-sm min-h-[160px]">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider font-extrabold text-slate-400">Penyelenggaraan Makesta</span>
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
                <i className="fas fa-calendar-alt text-sm"></i>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">{stats.totalMakesta} Kegiatan</span>
              <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider block mt-2">Kaderisasi Tingkat Dasar</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Charts Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm space-y-4">
          <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <i className="fas fa-chart-line text-brand-purple"></i> Pertumbuhan Anggota
          </h4>
          <MemberGrowthChart />
        </div>

        <div className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm space-y-4">
          <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <i className="fas fa-chart-pie text-brand-purple"></i> Distribusi Status SP
          </h4>
          <SpStatusChart />
        </div>

        <div className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm space-y-4">
          <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <i className="fas fa-chart-bar text-brand-purple"></i> Keaktifan Makesta per-Ranting
          </h4>
          <ActivityChart />
        </div>
      </div>

      {/* Monitoring SP Section */}
      <div className="space-y-4 pt-4 border-t border-slate-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900">Monitoring Legalitas & Masa Aktif SP</h3>
            <p className="text-xs text-slate-500">Daftar kepengurusan ranting/komisariat terurut berdasarkan tingkat urgensi masa berakhir SP.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 items-center w-full md:w-auto">
            {/* Search Input */}
            <div className="relative w-full sm:w-60">
              <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
              <input
                type="text"
                placeholder="Cari ranting/komisariat..."
                value={spSearchQuery}
                onChange={(e) => setSpSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-8 pr-4 text-xs text-slate-900 focus:outline-none focus:border-brand-purple transition"
              />
            </div>

            {/* Banom Switcher */}
            <div className="bg-slate-100 p-1 rounded-xl flex border border-slate-200 self-stretch sm:self-auto justify-center">
              <button
                onClick={() => setSelectedBanom("ipnu")}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition duration-200 flex items-center gap-1.5 ${
                  selectedBanom === "ipnu"
                    ? "bg-brand-purple text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                IPNU
              </button>
              <button
                onClick={() => setSelectedBanom("ippnu")}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition duration-200 flex items-center gap-1.5 ${
                  selectedBanom === "ippnu"
                    ? "bg-brand-purple text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                IPPNU
              </button>
            </div>
          </div>
        </div>

        {/* SP Table */}
        <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 font-extrabold text-xs uppercase tracking-wider">
                  <th className="p-4">Nama Ranting / Komisariat</th>
                  <th className="p-4">Nomor SP Resmi</th>
                  <th className="p-4">Masa Berlaku</th>
                  <th className="p-4">Hari Tersisa</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-xs text-slate-400 font-medium">
                      <i className="fas fa-spinner fa-spin mr-2"></i> Memuat status legalitas SP...
                    </td>
                  </tr>
                ) : filteredSpList.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-xs text-slate-400 font-bold">
                      <i className="fas fa-search-minus mr-2"></i> Data tidak ditemukan
                    </td>
                  </tr>
                ) : (
                  filteredSpList.map((item, index) => {
                    const analysis = item.analysis;
                    const formattedDate = new Date(item.expiryDate).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    });

                    return (
                      <tr key={index} className="hover:bg-slate-50 transition duration-150">
                        <td className="p-4 font-bold text-slate-800 text-sm sm:text-base">{item.name}</td>
                        <td className="p-4 font-mono text-slate-400 text-xs">{item.spNumber}</td>
                        <td className="p-4 text-slate-500 font-medium text-xs sm:text-sm">{formattedDate}</td>
                        <td className="p-4 text-xs sm:text-sm">
                          {analysis.diffInDays < 0 ? (
                            <span className="text-red-650 font-bold">Habis {Math.abs(analysis.diffInDays)} hari lalu</span>
                          ) : (
                            <span className={analysis.cluster === "kritis" ? "text-amber-600 font-bold" : "text-slate-700"}>
                              {analysis.diffInDays} hari lagi
                            </span>
                          )}
                        </td>
                        <td className="p-4">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-extrabold uppercase tracking-widest ${analysis.badgeClass}`}>
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
        </div>
      </div>

      {/* 2-Column Dashboard: Timeline vs Agenda */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Activity Timeline */}
        <div className="space-y-4">
          <h3 className="text-xs font-extrabold text-slate-400 tracking-wider uppercase">Timeline Aktivitas Organisasi</h3>
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-6">
            <div className="relative border-l-2 border-slate-100 pl-6 ml-3 space-y-6">
              {timelineItems.map((item, index) => (
                <div key={index} className="relative">
                  <span className={`absolute -left-10 top-0.5 w-7 h-7 rounded-full flex items-center justify-center text-xs shadow-sm ${item.color}`}>
                    <i className={`fas ${item.icon}`}></i>
                  </span>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{item.time}</span>
                    <p className="text-xs text-slate-700 font-semibold">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Agendas */}
        <div className="space-y-4">
          <h3 className="text-xs font-extrabold text-slate-400 tracking-wider uppercase">Sekilas Agenda Terdekat</h3>
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="divide-y divide-slate-100">
              {agendaItems.map((agenda, index) => (
                <div key={index} className={`py-4 ${index === 0 ? "pt-0" : ""} ${index === agendaItems.length - 1 ? "pb-0" : ""}`}>
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-1.5">
                      <h4 className="font-bold text-sm text-slate-900 leading-tight">{agenda.title}</h4>
                      <div className="text-[10px] sm:text-xs text-slate-500 font-medium space-y-0.5">
                        <p><i className="far fa-calendar-alt text-slate-400 mr-1.5 w-4 text-center"></i>{agenda.date} | {agenda.time}</p>
                        <p><i className="fas fa-map-marker-alt text-slate-400 mr-1.5 w-4 text-center"></i>{agenda.location}</p>
                        <p><i className="far fa-user text-slate-400 mr-1.5 w-4 text-center"></i>PIC: {agenda.pic}</p>
                      </div>
                    </div>
                    <span className="text-[9px] uppercase tracking-wider font-extrabold text-brand-purple bg-violet-50 border border-violet-100 px-2 py-0.5 rounded-lg">
                      PAC Agenda
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Latest News Grid */}
      <div className="space-y-4 pt-4 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-extrabold text-slate-400 tracking-wider uppercase">Berita Terkini</h3>
          <Link href="/berita" className="text-xs font-bold text-brand-purple hover:underline">
            Lihat Semua Berita <i className="fas fa-arrow-right text-[9px] ml-0.5"></i>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loading ? (
            <p className="text-xs text-slate-400 col-span-3 text-center py-6 font-medium">Memuat berita...</p>
          ) : berita.length === 0 ? (
            <p className="text-xs text-slate-400 col-span-3 text-center py-6 font-medium">Belum ada berita terpublikasi.</p>
          ) : (
            berita.slice(0, 3).map((item) => (
              <Link href={`/berita/${item.id}`} key={item.id} className="group flex flex-col bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover-card-glow">
                <div className="w-full aspect-video bg-slate-50 relative overflow-hidden">
                  <Image src={item.coverImage} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-5 flex-grow flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <span className="inline-block text-[9px] font-extrabold text-brand-purple bg-violet-50 px-2 py-0.5 rounded uppercase tracking-widest">
                      {item.category}
                    </span>
                    <h4 className="font-extrabold text-sm text-slate-800 leading-snug group-hover:text-brand-purple transition-colors line-clamp-2">
                      {item.title}
                    </h4>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold pt-2 border-t border-slate-50">
                    <span>{new Date(item.timestamp).toLocaleDateString("id-ID", { day: "numeric", month: "long" })}</span>
                    <div className="flex items-center gap-2">
                      <span><i className="far fa-eye mr-0.5"></i> {item.views}</span>
                      <span><i className="far fa-thumbs-up mr-0.5"></i> {item.likes}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>

    </div>
  );
}
