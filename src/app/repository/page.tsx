"use client";

import React, { useState, useEffect } from "react";
import { getSpData, RepoItem } from "@/lib/api/client";

export default function RepositoryPage() {
  const [loading, setLoading] = useState(true);
  const [docs, setDocs] = useState<RepoItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Modal Preview states
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  useEffect(() => {
    async function loadDocs() {
      try {
        const data = await getSpData();
        setDocs(data.repository || [
          {
            id: "pedoman-1",
            title: "Buku Pedoman Kaderisasi IPNU IPPNU",
            description: "Buku panduan kurikulum kaderisasi formal resmi hasil Kongres.",
            category: "buku",
            driveId: "1AQ00D1srOr53Jjf5w377NkFgLD5V-8e2",
            coverImage: "/assets/images/cover-modul.png"
          },
          {
            id: "art-1",
            title: "AD / ART Hasil Kongres Terbaru",
            description: "Landasan konstitusional organisasi tingkat nasional.",
            category: "buku",
            driveId: "1B0ci-oiR9-izbp-sn0Zhy_sQJ8hRuoqC",
            coverImage: "/assets/images/logo-bersama.png"
          },
          {
            id: "template-1",
            title: "Template Surat Permohonan SP Rekomendasi",
            description: "Format resmi pengajuan rekomendasi Surat Pengesahan (SP).",
            category: "surat",
            driveId: "1JHAH_eeS2504wE6GClRElK_XsaQiDwll",
            coverImage: "/assets/images/logo-ipnu.png"
          }
        ]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadDocs();
  }, []);

  const categories = [
    { key: "all", label: "Semua" },
    { key: "buku", label: "Buku Wajib & AD ART" },
    { key: "modul", label: "Modul Pelatihan" },
    { key: "surat", label: "Template Administrasi" }
  ];

  const filteredDocs = docs.filter((doc) => {
    const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory;
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const openPreview = (doc: RepoItem) => {
    // Standard Google Drive PDF preview URL pattern
    const url = `https://drive.google.com/file/d/${doc.driveId}/preview`;
    setPreviewUrl(url);
    setPreviewTitle(doc.title);
    setPreviewOpen(true);
  };

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="space-y-2 border-b border-slate-100 pb-5">
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900">
          Pusat Repositori & Knowledge Center
        </h2>
        <p className="text-xs text-slate-500">
          Akses digital terintegrasi untuk mengunduh buku pedoman resmi, AD/ART terbaru, serta template persuratan administrasi se-Kecamatan Tahunan.
        </p>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Categories Tab */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition duration-200 ${
                selectedCategory === cat.key
                  ? "bg-brand-purple text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-800 bg-white border border-slate-100 hover:bg-slate-50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
          <input
            type="text"
            placeholder="Cari dokumen..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-9 pr-4 text-xs text-slate-900 focus:outline-none focus:border-brand-purple transition"
          />
        </div>
      </div>

      {/* Repository Cards Grid */}
      {loading ? (
        <p className="text-xs text-slate-400 text-center py-12 font-medium">Memuat pusat dokumen...</p>
      ) : filteredDocs.length === 0 ? (
        <p className="text-xs text-slate-400 text-center py-12 font-medium">Dokumen tidak ditemukan.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover-card-glow"
            >
              <div className="p-5 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-50 text-brand-purple flex items-center justify-center text-lg flex-shrink-0">
                    <i className="fas fa-file-pdf"></i>
                  </div>
                  <div>
                    <span className="inline-block text-[9px] font-extrabold text-brand-purple bg-violet-50 px-2 py-0.5 rounded uppercase tracking-widest">
                      {doc.category}
                    </span>
                    <h4 className="font-extrabold text-xs sm:text-sm text-slate-800 leading-snug mt-1">
                      {doc.title}
                    </h4>
                  </div>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-semibold">
                  {doc.description}
                </p>
              </div>

              <div className="px-5 pb-5 pt-2 flex gap-2">
                <button
                  onClick={() => openPreview(doc)}
                  className="w-full py-2 px-3 rounded-lg bg-violet-50 text-brand-purple hover:bg-violet-100 transition text-[10px] font-extrabold uppercase tracking-wider flex items-center justify-center gap-1.5"
                >
                  <i className="fas fa-eye text-xs"></i> Pratinjau
                </button>
                <a
                  href={`https://drive.google.com/open?id=${doc.driveId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2 px-3 rounded-lg bg-brand-purple hover:bg-brand-purpleDark text-white transition text-[10px] font-extrabold uppercase tracking-wider flex items-center justify-center gap-1.5"
                >
                  <i className="fas fa-external-link-alt text-xs"></i> Buka Link
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Preview Modal */}
      {previewOpen && (
        <div className="fixed inset-0 bg-slate-900/65 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white border border-slate-100 rounded-3xl w-full max-w-5xl h-[85vh] shadow-2xl flex flex-col overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-100 p-4 sm:px-6">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-4 bg-brand-purple rounded-full"></span>
                <h4 className="font-extrabold text-xs sm:text-sm uppercase tracking-wider text-slate-800 truncate max-w-md sm:max-w-xl">
                  Pratinjau: {previewTitle}
                </h4>
              </div>
              <button onClick={() => setPreviewOpen(false)} className="text-slate-400 hover:text-slate-650 transition">
                <i className="fas fa-times text-lg"></i>
              </button>
            </div>
            <div className="flex-grow bg-slate-100 relative">
              <iframe src={previewUrl} className="w-full h-full border-0" allow="autoplay"></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
