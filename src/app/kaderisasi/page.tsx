"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useApp } from "@/lib/context/AppContext";

export default function KaderisasiPage() {
  const { appData, dataLoading } = useApp();
  const [unitTab, setUnitTab] = useState<"ranting" | "komisariat">("ranting");
  const [searchQuery, setSearchQuery] = useState("");
  const [matrixFilter, setMatrixFilter] = useState<"all" | "sudah" | "belum">("all");

  const flowSteps = [
    {
      num: "01",
      badge: "H-14 Acara",
      title: "Konsultasi & Pengajuan",
      desc: "Panitia Ranting/PK mengajukan surat pemberitahuan dan permohonan ke Departemen Kaderisasi PAC minimal 14 hari sebelum acara."
    },
    {
      num: "02",
      badge: "Koordinasi",
      title: "Penugasan Instruktur",
      desc: "PAC mengutus Team Instruktur untuk memverifikasi kesiapan panitia, narasumber, materi silabus, dan jadwal forum."
    },
    {
      num: "03",
      badge: "Pelaksanaan",
      title: "Penyelenggaraan Forum",
      desc: "Kegiatan MAKESTA diselenggarakan berlandaskan kurikulum resmi IPNU IPPNU dengan pembinaan ideologi dan keaswajaan."
    },
    {
      num: "04",
      badge: "Maks. H+7",
      title: "Pelaporan Berkas & SPJ",
      desc: "Panitia menyetorkan Laporan Pertanggungjawaban (LPJ) beserta draf nama peserta untuk verifikasi database kader PAC."
    }
  ];

  const resources = [
    {
      title: "Buku Pedoman Kaderisasi",
      desc: "Buku panduan kurikulum kaderisasi formal resmi hasil Kongres untuk MAKESTA & LAKMUD.",
      icon: "fa-book-bookmark",
      link: "https://drive.google.com/drive/folders/1AQ00D1srOr53Jjf5w377NkFgLD5V-8e2"
    },
    {
      title: "Template Berkas MAKESTA",
      desc: "Format baku surat permohonan, proposal kegiatan, presensi, dan format LPJ resmi.",
      icon: "fa-file-lines",
      link: "https://drive.google.com/drive/folders/1B0ci-oiR9-izbp-sn0Zhy_sQJ8hRuoqC"
    },
    {
      title: "Layanan Surat Online",
      desc: "Form pengajuan permohonan rekomendasi atau pemberitahuan online ke Sekretariat PAC.",
      icon: "fa-paper-plane",
      link: "/administrasi"
    }
  ];

  const makestaList = appData.makesta || [];

  // All 17 Ranting in Kecamatan Tahunan
  const allRantingList = [
    "Kecapi I", "Kecapi II", "Kecapi III", "Tahunan", "Mantingan",
    "Langon", "Sukodono", "Tegalsambi", "Petekeyan", "Mangunan",
    "Semat", "Teluk Awur", "Senenan", "Krapyak", "Platar",
    "Ngabul", "Demangan"
  ];

  // All 15 Komisariat in Kecamatan Tahunan
  const allKomisariatList = [
    "MTs Al Hidayah", "MTs Mada Nusantara", "MA Mada Nusantara",
    "MTs NU Nahdlatul Fata", "MA NU Nahdlatul Fata", "MA Masalikil Huda",
    "MA Al Anwar", "MTs Al Anwar", "MTs Al Ikhlas", "MTs Zumratul Wildan",
    "SMK Al Hidayah", "MA Zumratul Wildan", "MTs Masalikil Huda",
    "MA Mafatihul Akhlaq", "MTs Mafatihul Akhlaq"
  ];

  // Active units based on selected tab
  const activeUnitList = unitTab === "ranting" ? allRantingList : allKomisariatList;

  // Build matrix status
  const currentMatrix = useMemo(() => {
    return activeUnitList.map((unitName) => {
      const match = makestaList.find((m) =>
        m.penyelenggara.toLowerCase().includes(unitName.toLowerCase())
      );
      return {
        name: unitName,
        type: unitTab,
        hasDone: !!match,
        tanggal: match ? match.tanggal : "-",
        peserta: match ? match.peserta : 0,
        tempat: match ? match.tempat : "-",
        slug: match ? `makesta-${match.penyelenggara.toLowerCase().replace(/ /g, "-").replace(/[^a-z0-9-]/g, "")}` : null
      };
    });
  }, [activeUnitList, unitTab, makestaList]);

  // Filter matrix by search query & completion status
  const filteredMatrix = useMemo(() => {
    return currentMatrix.filter((item) => {
      // Filter status
      if (matrixFilter === "sudah" && !item.hasDone) return false;
      if (matrixFilter === "belum" && item.hasDone) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(q);
        const matchTempat = item.tempat.toLowerCase().includes(q);
        if (!matchName && !matchTempat) return false;
      }

      return true;
    });
  }, [currentMatrix, matrixFilter, searchQuery]);

  const completedCount = currentMatrix.filter((r) => r.hasDone).length;
  const totalUnits = activeUnitList.length;
  const progressPct = Math.round((completedCount / totalUnits) * 100);

  return (
    <div className="py-6 sm:py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

      {/* ─── 1. ALUR PELAKSANAAN MAKESTA (BAGIAN PALING ATAS) ───────────────── */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-violet-50 text-brand-purple text-[10px] font-black uppercase tracking-widest border border-violet-100">
              <i className="fas fa-route text-[9px]"></i> Alur Kaderisasi Resmi
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Tahapan & Prosedur Pelaksanaan MAKESTA
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl">
              Panduan Standar Operasional Prosedur (SOP) 4 langkah bagi pengurus Pimpinan Ranting dan Komisariat dalam menyelenggarakan Masa Kesetiaan Anggota.
            </p>
          </div>

          <Link
            href="/administrasi"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-brand-purple hover:bg-violet-800 text-white font-black text-xs shadow-sm transition self-start md:self-center flex-shrink-0"
          >
            <i className="fas fa-paper-plane text-xs"></i> Ajukan Surat Pemberitahuan
          </Link>
        </div>

        {/* Grid 4 Langkah Alur */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {flowSteps.map((step, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-50/70 border border-slate-150/70 hover:border-violet-200 hover:bg-violet-50/20 transition group space-y-3 relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-brand-purple group-hover:scale-105 transition transform">
                  {step.num}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] font-bold text-slate-500">
                  {step.badge}
                </span>
              </div>
              <h3 className="font-black text-xs sm:text-sm text-slate-900 tracking-tight">
                {step.title}
              </h3>
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ─── 2. DOKUMEN PENDUKUNG & BANNER KALENDER (BAGIAN TENGAH) ─────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Banner Kalender Akses Cepat */}
        <div className="lg:col-span-3 bg-gradient-to-r from-violet-900 to-indigo-900 text-white rounded-3xl p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-violet-200 text-[10px] font-extrabold uppercase tracking-widest border border-white/15">
                Kalender Kaderisasi
              </span>
              <span className="text-xs text-violet-300 font-bold">Masa Khidmat 2025 – 2027</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black tracking-tight">
              Jadwal MAKESTA Ranting & Agenda Kaderisasi PAC
            </h3>
            <p className="text-xs text-slate-300">
              Pantau jadwal pelaksanaan MAKESTA, Pra-Makesta, Rencana Tindak Lanjut (RTL), dan LAKMUD dalam format kalender bulanan interaktif.
            </p>
          </div>
          <Link
            href="/kalender"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white hover:bg-violet-50 text-brand-purple font-black text-xs shadow-md transition self-start md:self-center flex-shrink-0"
          >
            <i className="fas fa-calendar-alt text-sm"></i> Buka Kalender Penuh &rarr;
          </Link>
        </div>

        {/* 3 Kartu Berkas Panduan */}
        {resources.map((res, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm flex flex-col justify-between space-y-4 hover:border-slate-200 transition"
          >
            <div className="space-y-2.5">
              <div className="w-10 h-10 rounded-2xl bg-violet-50 text-brand-purple flex items-center justify-center text-base">
                <i className={`fas ${res.icon}`}></i>
              </div>
              <h4 className="font-extrabold text-sm text-slate-900">{res.title}</h4>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">{res.desc}</p>
            </div>
            {res.link.startsWith("/") ? (
              <Link
                href={res.link}
                className="w-full py-2.5 rounded-xl bg-violet-50 text-brand-purple hover:bg-brand-purple hover:text-white text-xs font-black text-center transition shadow-xs"
              >
                Akses Layanan &rarr;
              </Link>
            ) : (
              <a
                href={res.link}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 rounded-xl bg-violet-50 text-brand-purple hover:bg-brand-purple hover:text-white text-xs font-black text-center transition shadow-xs"
              >
                Buka di Drive &rarr;
              </a>
            )}
          </div>
        ))}
      </div>

      {/* ─── 3. MATRIKS CAPAIAN MAKESTA TERPADU (BAGIAN PALING BAWAH) ────────── */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        
        {/* Header & Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-black text-base sm:text-lg text-slate-900 tracking-tight">
                Matriks Capaian MAKESTA Se-Kecamatan
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-black">
                2025 – 2027
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Monitoring pelaksanaan kaderisasi formal seluruh Pimpinan Ranting dan Komisariat se-Kecamatan Tahunan.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Unit Switcher: Ranting / Komisariat */}
            <div className="bg-slate-100 p-1 rounded-2xl flex border border-slate-200">
              <button
                onClick={() => setUnitTab("ranting")}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition ${
                  unitTab === "ranting"
                    ? "bg-brand-purple text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                17 Ranting
              </button>
              <button
                onClick={() => setUnitTab("komisariat")}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition ${
                  unitTab === "komisariat"
                    ? "bg-brand-purple text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                15 Komisariat
              </button>
            </div>

            {/* Filter Status */}
            <div className="bg-slate-100 p-1 rounded-2xl flex border border-slate-200">
              {(["all", "sudah", "belum"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setMatrixFilter(mode)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    matrixFilter === mode
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {mode === "all" ? "Semua" : mode === "sudah" ? "Terlaksana" : "Belum"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Progress Bar & Search Ribbon */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center bg-slate-50/70 p-4 rounded-2xl border border-slate-100">
          <div className="md:col-span-2 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-extrabold text-slate-700">
                Progres Capaian {unitTab === "ranting" ? "Ranting" : "Komisariat"}:
              </span>
              <span className="font-black text-brand-purple">
                {completedCount} dari {totalUnits} {unitTab === "ranting" ? "Ranting" : "Komisariat"} ({progressPct}%)
              </span>
            </div>
            <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-brand-purple h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              ></div>
            </div>
          </div>

          <div className="relative">
            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
            <input
              type="text"
              placeholder={`Cari nama ${unitTab === "ranting" ? "desa" : "sekolah"} / lokasi...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl py-1.5 pl-8 pr-3 text-xs text-slate-900 focus:outline-none focus:border-brand-purple transition shadow-2xs"
            />
          </div>
        </div>

        {/* Matrix Cards Grid */}
        {dataLoading ? (
          <div className="py-12 text-center text-slate-400 text-xs">
            <i className="fas fa-spinner fa-spin mr-2"></i> Memuat data kaderisasi...
          </div>
        ) : filteredMatrix.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-xs bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            Tidak ada data yang sesuai dengan pencarian atau filter.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {filteredMatrix.map((item, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl border transition flex flex-col justify-between space-y-3 ${
                  item.hasDone
                    ? "bg-emerald-50/40 border-emerald-200/70 hover:border-emerald-300"
                    : "bg-slate-50/50 border-slate-200/70 hover:border-slate-300"
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-xs text-slate-900 tracking-tight">
                      {item.type === "ranting" ? `PR ${item.name}` : `PK ${item.name}`}
                    </span>
                    {item.hasDone ? (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-700">
                        Selesai
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-slate-200 text-slate-600">
                        Belum
                      </span>
                    )}
                  </div>

                  <div className="text-[11px] text-slate-500 space-y-0.5">
                    {item.hasDone ? (
                      <>
                        <p className="flex items-center gap-1.5 text-slate-700 font-semibold">
                          <i className="far fa-calendar-check text-emerald-600"></i>
                          <span>{item.tanggal}</span>
                        </p>
                        <p className="flex items-center gap-1.5 text-slate-500">
                          <i className="fas fa-location-dot text-slate-400 text-[10px]"></i>
                          <span className="truncate">{item.tempat}</span>
                        </p>
                      </>
                    ) : (
                      <p className="text-slate-400 italic py-1">
                        Menunggu jadwal pelaksanaan
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                  {item.hasDone ? (
                    <>
                      <span className="font-black text-brand-purple text-[11px]">
                        {item.peserta} Kader Lulus
                      </span>
                      {item.slug && (
                        <Link
                          href={`/kegiatan/${item.slug}`}
                          className="px-2.5 py-1 rounded-lg bg-white border border-emerald-200 text-emerald-700 text-[10px] font-black hover:bg-emerald-100 transition shadow-2xs"
                        >
                          Arsip &rarr;
                        </Link>
                      )}
                    </>
                  ) : (
                    <span className="text-[10px] font-semibold text-slate-400">
                      Target: Periode 2025–2027
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
