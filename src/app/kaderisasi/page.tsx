"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getSpData, MakestaItem } from "@/lib/api/client";

export default function KaderisasiPage() {
  const [loading, setLoading] = useState(true);
  const [makestaList, setMakestaList] = useState<MakestaItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function loadMakesta() {
      try {
        const data = await getSpData();
        setMakestaList(data.makesta || []);
      } catch (err) {
        console.error("Gagal load data kaderisasi", err);
      } finally {
        setLoading(false);
      }
    }
    loadMakesta();
  }, []);

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
      link: "/administrasi" // Redirect directly to our administrasi digital portal
    }
  ];

  const filteredMakesta = makestaList.filter((m) =>
    m.penyelenggara.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.tempat.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="space-y-2 border-b border-slate-100 pb-5">
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900">
          Sistem Informasi & Rekapitulasi Kaderisasi
        </h2>
        <p className="text-xs text-slate-500">
          Memantau penyelenggaraan Masa Kesetiaan Anggota (MAKESTA), database log pelantikan, serta akses instrumen pendampingan instruktur se-Kecamatan Tahunan.
        </p>
      </div>

      {/* Flow Steps */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <h4 className="font-extrabold text-sm uppercase text-brand-purple tracking-widest">
            Alur Penyelenggaraan MAKESTA
          </h4>
          <p className="text-xs text-slate-400 font-semibold">Langkah wajib pengurus ranting/komisariat untuk menyelenggarakan kaderisasi.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 relative pt-4">
          {flowSteps.map((step) => (
            <div key={step.num} className="space-y-3 text-center sm:text-left">
              <div className="w-12 h-12 rounded-xl bg-violet-50 text-brand-purple flex items-center justify-center font-black text-sm mx-auto sm:mx-0 shadow-sm border border-violet-100/50">
                {step.num}
              </div>
              <h5 className="font-bold text-sm text-slate-800 uppercase tracking-wide">{step.title}</h5>
              <p className="text-xs text-slate-400 leading-relaxed font-semibold">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-2">
        {resources.map((res) => (
          <div
            key={res.title}
            className={`p-6 text-left rounded-2xl bg-gradient-to-br border border-slate-150 text-slate-800 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between min-h-[220px] ${res.color}`}
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-slate-50 text-brand-purple flex items-center justify-center text-lg shadow-sm border border-slate-100">
                <i className={`fas ${res.icon}`}></i>
              </div>
              <div>
                <h4 className="font-extrabold text-sm uppercase tracking-wider text-slate-850">{res.title}</h4>
                <p className="text-xs text-slate-450 mt-1 leading-relaxed font-semibold">{res.desc}</p>
              </div>
            </div>
            <div className="mt-4">
              {res.link.startsWith("/") ? (
                <Link
                  href={res.link}
                  className={`w-full py-2.5 px-4 rounded-xl text-white font-extrabold text-xs uppercase tracking-widest transition duration-300 shadow-sm flex items-center justify-center gap-2 ${res.btnColor}`}
                >
                  <i className="fas fa-external-link-alt text-xs"></i> Buka Layanan
                </Link>
              ) : (
                <a
                  href={res.link}
                  target="_blank"
                  rel="noreferrer"
                  className={`w-full py-2.5 px-4 rounded-xl text-white font-extrabold text-xs uppercase tracking-widest transition duration-300 shadow-sm flex items-center justify-center gap-2 ${res.btnColor}`}
                >
                  <i className="fas fa-folder-open text-xs"></i> Buka Drive Folder
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Makesta History Table */}
      <div className="bg-white border border-slate-100 p-6 sm:p-8 rounded-2xl shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-50 pb-4">
          <div>
            <h4 className="font-extrabold text-xs sm:text-sm uppercase tracking-wider text-slate-400">
              Riwayat Rekap MAKESTA Terlaksana
            </h4>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-slate-500 font-semibold">Total Terlaksana:</span>
              <span className="px-2.5 py-0.5 rounded bg-brand-purple/10 text-brand-purple text-xs font-bold">
                {makestaList.length} Kegiatan
              </span>
            </div>
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

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] text-slate-400 uppercase tracking-widest font-extrabold">
                <th className="pb-3 text-left">Penyelenggara</th>
                <th className="pb-3 text-left">Waktu Pelaksanaan</th>
                <th className="pb-3 text-left">Tempat</th>
                <th className="pb-3 text-right">Peserta Lulus</th>
                <th className="pb-3 text-right pr-2">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-650 font-semibold">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-4 text-center text-slate-400">Memuat rekapitulasi...</td>
                </tr>
              ) : filteredMakesta.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-4 text-center text-slate-450">Data tidak ditemukan.</td>
                </tr>
              ) : (
                filteredMakesta.map((m, idx) => {
                  const slug = `makesta-${m.penyelenggara.toLowerCase().replace(/ /g, "-").replace(/[^a-z0-9-]/g, "")}`;
                  return (
                    <tr key={idx} className="hover:bg-slate-50 transition">
                      <td className="py-3 font-bold text-slate-800">{m.penyelenggara}</td>
                      <td className="py-3">{m.tanggal}</td>
                      <td className="py-3">{m.tempat}</td>
                      <td className="py-3 text-right">{m.peserta} Orang</td>
                      <td className="py-3 text-right pr-2">
                        <Link
                          href={`/kegiatan/${slug}`}
                          className="px-3 py-1 rounded bg-violet-50 text-brand-purple hover:bg-brand-purple hover:text-white transition text-[10px] font-extrabold uppercase tracking-wide"
                        >
                          Detail
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
