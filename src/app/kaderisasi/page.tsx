"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useApp } from "@/lib/context/AppContext";

export default function KaderisasiPage() {
  const { appData, dataLoading } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [matrixFilter, setMatrixFilter] = useState<"all" | "sudah" | "belum">("all");

  const flowSteps = [
    { num: "01", title: "Pemberitahuan PAC", desc: "Mengajukan pemberitahuan ke Departemen Kaderisasi PAC minimal H-14 acara." },
    { num: "02", title: "Tim Instruktur", desc: "Berkoordinasi dengan Team Instruktur PAC mengenai narasumber & pemateri wajib." },
    { num: "03", title: "Pelaksanaan", desc: "Penyelenggaraan acara wajib mengikuti modul silabus kaderisasi resmi dari PAC." },
    { num: "04", title: "Pelaporan Berkas", desc: "Menyetor SPJ kegiatan beserta draf nama kader maksimal H+7 acara." }
  ];

  const resources = [
    {
      title: "Pedoman Kaderisasi",
      desc: "Buku pedoman kaderisasi resmi baik untuk pelaksanaan MAKESTA maupun LAKMUD.",
      icon: "fa-book",
      color: "from-white to-violet-50/20 hover:border-brand-purple/40",
      btnColor: "bg-violet-600 hover:bg-violet-700",
      link: "https://drive.google.com/drive/folders/1AQ00D1srOr53Jjf5w377NkFgLD5V-8e2"
    },
    {
      title: "Berkas Makesta",
      desc: "Template surat, cara pengajuan makesta, dan contoh berkas pendukung lainnya.",
      icon: "fa-file-alt",
      color: "from-white to-emerald-50/20 hover:border-emerald-500/40",
      btnColor: "bg-emerald-600 hover:bg-emerald-700",
      link: "https://drive.google.com/drive/folders/1B0ci-oiR9-izbp-sn0Zhy_sQJ8hRuoqC"
    },
    {
      title: "Kirim Surat Kaderisasi",
      desc: "Layanan persuratan administrasi langsung ke Departemen Kaderisasi PAC.",
      icon: "fa-paper-plane",
      color: "from-white to-indigo-50/20 hover:border-indigo-500/40",
      btnColor: "bg-indigo-600 hover:bg-indigo-700",
      link: "/administrasi"
    }
  ];

  const makestaList = appData.makesta || [];

  // All 15 Ranting in Kecamatan Tahunan
  const allRantingList = [
    "Mantingan", "Krapyak", "Sukodono", "Senenan", "Tahunan",
    "Tegalsambi", "Demangan", "Platar", "Mangunan", "Langon",
    "Petekeyan", "Semat", "Kecapi", "Ngabul", "Karangkebagusan"
  ];

  // Build matrix status
  const rantingMatrix = useMemo(() => {
    return allRantingList.map((desa) => {
      const match = makestaList.find((m) =>
        m.penyelenggara.toLowerCase().includes(desa.toLowerCase())
      );
      return {
        desa,
        hasDone: !!match,
        tanggal: match ? match.tanggal : "-",
        peserta: match ? match.peserta : 0,
        tempat: match ? match.tempat : "-",
        slug: match ? `makesta-${match.penyelenggara.toLowerCase().replace(/ /g, "-").replace(/[^a-z0-9-]/g, "")}` : null
      };
    });
  }, [makestaList]);

  const filteredMatrix = rantingMatrix.filter((item) => {
    if (matrixFilter === "sudah") return item.hasDone;
    if (matrixFilter === "belum") return !item.hasDone;
    return true;
  });

  const filteredMakesta = makestaList.filter((m) =>
    m.penyelenggara.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.tempat.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const completedCount = rantingMatrix.filter((r) => r.hasDone).length;
  const progressPct = Math.round((completedCount / allRantingList.length) * 100);

  return (
    <div className="py-6 sm:py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* ─── Banner Kalender Link & Highlight ───────────────────────────────── */}
      <div className="bg-gradient-to-r from-violet-900 to-indigo-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-lg shadow-indigo-950/10">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-violet-200 text-[10px] font-extrabold uppercase tracking-widest border border-white/15">
              Agenda Kaderisasi
            </span>
            <span className="text-xs text-violet-300 font-bold">Periode 2025 – 2027</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            Kalender & Jadwal Kaderisasi Se-Kecamatan Tahunan
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Ingin melihat jadwal MAKESTA ranting, Pra-Makesta, RTL, dan LAKMUD PAC dalam tampilan kalender visual interaktif?
          </p>
        </div>
        <Link
          href="/kalender"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white hover:bg-violet-50 text-brand-purple font-black text-xs shadow-md transition self-start md:self-center flex-shrink-0"
        >
          <i className="fas fa-calendar-alt text-sm"></i> Buka Kalender Penuh &rarr;
        </Link>
      </div>

      {/* ─── Matriks Capaian MAKESTA Ranting ─────────────────────────────────── */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-50 pb-4">
          <div>
            <h3 className="font-black text-base text-slate-900">
              Matriks Capaian MAKESTA Se-Kecamatan (2025–2027)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Progres kaderisasi 15 Pimpinan Ranting se-Kecamatan Tahunan pada masa khidmat ini
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Progress Bar */}
            <div className="text-right">
              <span className="text-xs font-black text-slate-800">
                {completedCount} dari 15 Ranting
              </span>
              <div className="w-32 bg-slate-100 h-2 rounded-full overflow-hidden mt-1">
                <div
                  className="bg-brand-purple h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPct}%` }}
                ></div>
              </div>
            </div>

            {/* Filter Toggle */}
            <div className="bg-slate-100 p-1 rounded-xl flex border border-slate-200">
              {(["all", "sudah", "belum"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setMatrixFilter(mode)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                    matrixFilter === mode
                      ? "bg-brand-purple text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {mode === "all" ? "Semua" : mode === "sudah" ? "Terlaksana" : "Belum"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Matrix Grid of 15 Ranting */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredMatrix.map((item, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border transition flex items-center justify-between ${
                item.hasDone
                  ? "bg-emerald-50/50 border-emerald-200/70"
                  : "bg-slate-50/60 border-slate-150"
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-black text-xs text-slate-900">
                    PR {item.desa}
                  </span>
                  {item.hasDone ? (
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider bg-emerald-100 text-emerald-700">
                      Selesai
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider bg-slate-200 text-slate-600">
                      Belum
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-slate-500">
                  {item.hasDone ? (
                    <span>
                      <i className="far fa-calendar-check text-emerald-600 mr-1"></i>
                      {item.tanggal} &bull; {item.peserta} Kader
                    </span>
                  ) : (
                    <span className="text-slate-400 italic">Menunggu penetapan tanggal</span>
                  )}
                </p>
              </div>

              {item.hasDone && item.slug && (
                <Link
                  href={`/kegiatan/${item.slug}`}
                  className="px-2.5 py-1 rounded-xl bg-white border border-emerald-200 text-emerald-700 text-[10px] font-black hover:bg-emerald-100 transition shadow-xs"
                >
                  Arsip &rarr;
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ─── SOP / Flow Steps ────────────────────────────────────────────────── */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <h4 className="font-black text-xs uppercase text-brand-purple tracking-widest">
            Standar Operasional Prosedur
          </h4>
          <h3 className="font-extrabold text-base sm:text-lg text-slate-900 tracking-tight">
            Tahapan Pelaksanaan MAKESTA Pimpinan Ranting / PK
          </h3>
          <p className="text-xs text-slate-500">
            Panduan resmi 4 langkah wajib bagi kepanitiaan kaderisasi di tingkat bawah.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {flowSteps.map((step, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-2">
              <span className="text-xl font-black text-brand-purple block leading-none">{step.num}</span>
              <h5 className="font-extrabold text-xs text-slate-800 uppercase tracking-wider">{step.title}</h5>
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Official Resources ──────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {resources.map((item, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm flex flex-col justify-between space-y-4 hover:border-slate-200 transition"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-violet-50 text-brand-purple flex items-center justify-center text-base">
                <i className={`fas ${item.icon}`}></i>
              </div>
              <h4 className="font-extrabold text-sm text-slate-900">{item.title}</h4>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.desc}</p>
            </div>
            {item.link.startsWith("/") ? (
              <Link
                href={item.link}
                className="w-full py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-black text-center transition shadow-sm"
              >
                Akses Layanan
              </Link>
            ) : (
              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-black text-center transition shadow-sm"
              >
                Unduh Berkas
              </a>
            )}
          </div>
        ))}
      </div>

      {/* ─── Rekap Riwayat MAKESTA Terlaksana ─────────────────────────────────── */}
      <div className="bg-white border border-slate-100 p-6 sm:p-8 rounded-3xl shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-50 pb-4">
          <div>
            <h4 className="font-extrabold text-sm text-slate-900">
              Riwayat Rekapitulasi Pelaksanaan MAKESTA
            </h4>
            <span className="text-xs text-slate-400">Total Terlaksana: {makestaList.length} Kegiatan</span>
          </div>
          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
            <input
              type="text"
              placeholder="Cari penyelenggara / tempat..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-1.5 pl-8 pr-4 text-xs text-slate-900 focus:outline-none focus:border-brand-purple transition"
            />
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-100">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 text-[10px] text-slate-400 uppercase tracking-widest font-extrabold border-b border-slate-100">
                <th className="p-3 pl-4">Penyelenggara</th>
                <th className="p-3">Waktu Pelaksanaan</th>
                <th className="p-3">Tempat</th>
                <th className="p-3 text-right">Peserta Lulus</th>
                <th className="p-3 text-right pr-4">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-semibold">
              {dataLoading ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400">Memuat rekapitulasi...</td>
                </tr>
              ) : filteredMakesta.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400">Data tidak ditemukan.</td>
                </tr>
              ) : (
                filteredMakesta.map((m, idx) => {
                  const slug = `makesta-${m.penyelenggara.toLowerCase().replace(/ /g, "-").replace(/[^a-z0-9-]/g, "")}`;
                  return (
                    <tr key={idx} className="hover:bg-slate-50/70 transition">
                      <td className="p-3 pl-4 font-bold text-slate-900">{m.penyelenggara}</td>
                      <td className="p-3 text-slate-500">{m.tanggal}</td>
                      <td className="p-3 text-slate-500">{m.tempat}</td>
                      <td className="p-3 text-right font-black text-brand-purple">{m.peserta} Kader</td>
                      <td className="p-3 text-right pr-4">
                        <Link
                          href={`/kegiatan/${slug}`}
                          className="px-3 py-1 rounded-lg bg-violet-50 text-brand-purple text-[11px] font-black hover:bg-violet-100 transition"
                        >
                          Arsip &rarr;
                        </Link>
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
  );
}
