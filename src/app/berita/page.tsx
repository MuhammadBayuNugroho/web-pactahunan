"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useApp } from "@/lib/context/AppContext";

export default function BeritaPage() {
  const { appData, dataLoading } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = [
    { key: "all", label: "Semua" },
    { key: "kegiatan", label: "Kegiatan" },
    { key: "info", label: "Informasi" },
    { key: "pengumuman", label: "Pengumuman" },
    { key: "opini", label: "Opini" }
  ];

  const filteredNews = appData.berita.filter((item) => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.excerpt && item.excerpt.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.tags && item.tags.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

      {/* Filter & Search Controls */}
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
            placeholder="Cari berita atau topik..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-9 pr-4 text-xs text-slate-900 focus:outline-none focus:border-brand-purple transition"
          />
        </div>
      </div>

      {/* News Grid */}
      {dataLoading ? (
        <p className="text-xs text-slate-400 text-center py-12 font-medium">Memuat portal berita...</p>
      ) : filteredNews.length === 0 ? (
        <div className="py-12 text-center space-y-3 bg-white border border-slate-100 rounded-3xl shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 mx-auto text-lg">
            <i className="fas fa-newspaper"></i>
          </div>
          <div>
            <p className="font-bold text-slate-700 text-sm">Berita Tidak Ditemukan</p>
            <p className="text-xs text-slate-400 mt-1">Coba sesuaikan kata kunci pencarian atau kategori filter Anda.</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((item) => (
            <Link
              href={`/berita/${item.id}`}
              key={item.id}
              className="group flex flex-col bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover-card-glow"
            >
              <div className="w-full aspect-video bg-slate-50 relative overflow-hidden">
                <Image
                  src={item.coverImage}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="inline-block text-[9px] font-extrabold text-brand-purple bg-violet-50 px-2 py-0.5 rounded uppercase tracking-widest">
                      {item.category}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium truncate max-w-[140px]">
                      <i className="far fa-user mr-1 text-slate-350"></i>
                      {item.author || "Redaksi PAC"}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-sm text-slate-800 leading-snug group-hover:text-brand-purple transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                    {item.excerpt || item.content}
                  </p>
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold pt-2 border-t border-slate-50">
                  <span>{new Date(item.timestamp).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}</span>
                  <div className="flex items-center gap-2">
                    <span><i className="far fa-eye mr-0.5"></i> {item.views}</span>
                    <span><i className="far fa-thumbs-up mr-0.5"></i> {item.likes}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
