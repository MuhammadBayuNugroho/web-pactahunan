"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/context/AppContext";
import { MakestaItem } from "@/lib/api/client";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function KegiatanDetailPage({ params }: PageProps) {
  const router = useRouter();
  const resolvedParams = use(params);
  const { slug } = resolvedParams;
  const { appData, dataLoading, showToast } = useApp();

  const [makestaData, setMakestaData] = useState<MakestaItem | null>(null);

  useEffect(() => {
    if (dataLoading) return;

    const list = appData.makesta || [];
    const found = list.find((m) => {
      const mSlug = `makesta-${m.penyelenggara.toLowerCase().replace(/ /g, "-").replace(/[^a-z0-9-]/g, "")}`;
      return mSlug === slug;
    });

    if (found) {
      setMakestaData(found);
    } else if (list.length > 0) {
      setMakestaData(list[0]);
    } else {
      showToast("Kegiatan tidak ditemukan", "Kembali ke Kalender.", "error");
      router.push("/kalender");
    }
  }, [slug, appData.makesta, dataLoading, router, showToast]);

  if (dataLoading) {
    return (
      <div className="py-12 text-center text-xs text-slate-400 font-medium">
        <i className="fas fa-spinner fa-spin mr-2"></i> Membuka arsip kegiatan...
      </div>
    );
  }

  if (!makestaData) return null;

  // Laporan Checklist items
  const reportsChecklist = [
    { name: "Proposal Kegiatan", checked: true },
    { name: "Surat Permohonan / Pemberitahuan", checked: true },
    { name: "Poster Publikasi", checked: true },
    { name: "Dokumentasi Kegiatan (Foto)", checked: true },
    { name: "Rilis Berita Publikasi", checked: true },
    { name: "Laporan Pertanggungjawaban (LPJ)", checked: true },
    { name: "Video Dokumentasi", checked: false },
    { name: "Absensi Peserta", checked: true }
  ];

  const totalChecked = reportsChecklist.filter((x) => x.checked).length;
  const isReportComplete = totalChecked === reportsChecklist.length;

  return (
    <div className="py-8 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Navigation and Title */}
      <Link
        href="/kalender"
        className="inline-flex items-center gap-2 text-xs font-bold text-brand-purple hover:text-brand-purpleDark transition bg-violet-50 hover:bg-violet-100/80 px-4 py-2.5 rounded-xl border border-violet-100"
      >
        <i className="fas fa-arrow-left"></i> Kembali ke Kalender
      </Link>

      {/* Main Card */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
          <div className="space-y-2">
            <span className="inline-block text-[9px] font-extrabold text-brand-purple bg-violet-50 px-2.5 py-1 rounded-lg uppercase tracking-widest">
              Arsip Kegiatan
            </span>
            <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              MAKESTA {makestaData.penyelenggara}
            </h1>
            <p className="text-xs text-slate-400 font-semibold">
              <i className="fas fa-map-marker-alt text-brand-purple mr-1"></i> {makestaData.tempat} | {makestaData.tanggal}
            </p>
          </div>

          {/* Laporan Status Badge */}
          <div className="self-start">
            {isReportComplete ? (
              <span className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 text-xs font-bold flex items-center gap-1.5 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Laporan Lengkap
              </span>
            ) : (
              <span className="px-3 py-1.5 rounded-full bg-amber-55 bg-opacity-10 text-amber-600 border border-amber-200 text-xs font-bold flex items-center gap-1.5">
                Laporan Belum Lengkap ({totalChecked}/{reportsChecklist.length})
              </span>
            )}
          </div>
        </div>

        {/* Content Tabs / Info Panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
          <div className="p-4 bg-slate-50 rounded-xl space-y-1">
            <span className="block text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">Penyelenggara</span>
            <span className="text-xs font-extrabold text-slate-800">{makestaData.penyelenggara}</span>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl space-y-1">
            <span className="block text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">Kader Dilantik</span>
            <span className="text-xs font-extrabold text-slate-800">{makestaData.peserta} Rekan / Rekanita</span>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl space-y-1">
            <span className="block text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">Status Kegiatan</span>
            <span className="text-xs font-extrabold text-slate-800">Selesai & Diarsipkan</span>
          </div>
        </div>

        {/* Section 2: Checklist Laporan & LPJ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-slate-100">
          
          {/* Laporan Checklist */}
          <div className="space-y-4">
            <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Checklist Berkas Laporan</h3>
            <div className="bg-slate-50 rounded-2xl p-5 space-y-3">
              {reportsChecklist.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <span className="text-slate-650 font-semibold">{item.name}</span>
                  <span className={item.checked ? "text-emerald-600" : "text-slate-350"}>
                    <i className={`fas ${item.checked ? "fa-check-circle" : "fa-circle"} text-base`}></i>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Unduhan Berkas LPJ / Dokumen */}
          <div className="space-y-4">
            <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Pusat Unduhan Berkas</h3>
            <div className="space-y-3">
              <a
                href="#"
                className="p-4 rounded-xl border border-slate-100 bg-white hover:border-brand-purple hover:shadow-sm transition flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-violet-50 text-brand-purple flex items-center justify-center">
                    <i className="fas fa-file-pdf"></i>
                  </div>
                  <div>
                    <span className="block text-xs font-extrabold text-slate-800">LPJ Kegiatan Makesta.pdf</span>
                    <span className="block text-[9px] text-slate-400">Laporan pertanggungjawaban lengkap</span>
                  </div>
                </div>
                <i className="fas fa-download text-xs text-slate-400 group-hover:text-brand-purple"></i>
              </a>

              <a
                href="#"
                className="p-4 rounded-xl border border-slate-100 bg-white hover:border-brand-purple hover:shadow-sm transition flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-violet-50 text-brand-purple flex items-center justify-center">
                    <i className="fas fa-file-pdf"></i>
                  </div>
                  <div>
                    <span className="block text-xs font-extrabold text-slate-800">Proposal & Silabus.pdf</span>
                    <span className="block text-[9px] text-slate-400">Silabus materi & proposal pelaksanaan</span>
                  </div>
                </div>
                <i className="fas fa-download text-xs text-slate-400 group-hover:text-brand-purple"></i>
              </a>
            </div>
          </div>

        </div>

        {/* Section 3: Linimasa Pelaksanaan Makesta */}
        <div className="pt-6 border-t border-slate-100 space-y-4">
          <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Linimasa Pelaksanaan & Tindak Lanjut</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Pra-Makesta */}
            <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-100/50 space-y-2">
              <span className="text-[9px] font-extrabold text-amber-700 bg-amber-100/60 px-2 py-0.5 rounded uppercase tracking-wider">
                Tahap 1: Pra-MAKESTA
              </span>
              <div className="text-xs space-y-1 font-semibold text-slate-500 pt-1 leading-relaxed">
                <p><span className="text-slate-400">Waktu:</span> {makestaData.praMakesta.tanggal}</p>
                <p><span className="text-slate-400">Tempat:</span> {makestaData.praMakesta.tempat}</p>
                <p><span className="text-slate-400">Peserta:</span> {makestaData.praMakesta.peserta} Orang</p>
              </div>
            </div>

            {/* Makesta Utama */}
            <div className="p-5 rounded-2xl bg-emerald-55 bg-opacity-10 border border-emerald-100 space-y-2">
              <span className="text-[9px] font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded uppercase tracking-wider">
                Tahap 2: MAKESTA Utama
              </span>
              <div className="text-xs space-y-1 font-semibold text-slate-500 pt-1 leading-relaxed">
                <p><span className="text-slate-400">Waktu:</span> {makestaData.makesta.tanggal}</p>
                <p><span className="text-slate-400">Tempat:</span> {makestaData.makesta.tempat}</p>
                <p><span className="text-slate-400">Lulus Pelantikan:</span> {makestaData.makesta.peserta} Anggota</p>
              </div>
            </div>

            {/* RTL */}
            <div className="p-5 rounded-2xl bg-violet-50 border border-violet-100 space-y-2">
              <span className="text-[9px] font-extrabold text-brand-purple bg-violet-100/80 px-2 py-0.5 rounded uppercase tracking-wider">
                Tahap 3: RTL-MAKESTA (3x)
              </span>
              <div className="text-xs space-y-1 font-semibold text-slate-500 pt-1 leading-relaxed">
                <p><span className="text-slate-400">RTL I:</span> {makestaData.rtl[0].tanggal} ({makestaData.rtl[0].peserta} Hadir)</p>
                <p><span className="text-slate-400">RTL II:</span> {makestaData.rtl[1].tanggal} ({makestaData.rtl[1].peserta} Hadir)</p>
                <p><span className="text-slate-400">RTL III:</span> {makestaData.rtl[2].tanggal} ({makestaData.rtl[2].peserta} Hadir)</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
