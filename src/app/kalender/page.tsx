"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useApp } from "@/lib/context/AppContext";
import { MakestaItem } from "@/lib/api/client";
import KaderisasiCalendar from "@/components/KaderisasiCalendar";

interface Agenda {
  id: string;
  title: string;
  organizer: string;
  organizerType: "PAC" | "PR" | "PK";
  date: string;
  time: string;
  location: string;
  pic: string;
  status: "Selesai" | "Mendatang";
  slug?: string;
}

export default function KalenderPage() {
  const { appData, dataLoading } = useApp();
  const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const agendas = useMemo<Agenda[]>(() => {
    // Static PAC agenda for 2025–2027 period
    const staticAgendas: Agenda[] = [
      {
        id: "rakor-2025-09",
        title: "Rapat Koordinasi PAC & Ranting",
        organizer: "PAC Tahunan",
        organizerType: "PAC",
        date: "2025-09-05",
        time: "19:30 WIB",
        location: "Gedung MWC NU Tahunan",
        pic: "Rekan Wafa",
        status: "Selesai"
      },
      {
        id: "pelantikan-pac-2025",
        title: "Pelantikan Pengurus PAC Periode 2025–2027",
        organizer: "PAC Tahunan",
        organizerType: "PAC",
        date: "2025-10-12",
        time: "08:00 WIB",
        location: "Aula MWC NU Tahunan",
        pic: "Ketua PAC",
        status: "Selesai"
      },
      {
        id: "rakor-2026-02",
        title: "Rapat Koordinasi PAC & Ranting",
        organizer: "PAC Tahunan",
        organizerType: "PAC",
        date: "2026-02-07",
        time: "19:30 WIB",
        location: "Gedung MWC NU Tahunan",
        pic: "Rekan Wafa",
        status: "Selesai"
      },
      {
        id: "rakor-2026-08",
        title: "Rapat Koordinasi PAC & Ranting",
        organizer: "PAC Tahunan",
        organizerType: "PAC",
        date: "2026-08-05",
        time: "19:30 WIB",
        location: "Gedung MWC NU Tahunan",
        pic: "Rekan Wafa",
        status: "Mendatang"
      },
      {
        id: "lakmud-1",
        title: "LAKMUD I (Latihan Kader Muda)",
        organizer: "PAC Tahunan",
        organizerType: "PAC",
        date: "2026-08-14",
        time: "08:00 WIB",
        location: "Madrasah Hasyim Asy'ari",
        pic: "Rekanita Sofia",
        status: "Mendatang"
      },
      {
        id: "lakmad-2026",
        title: "LAKMAD PAC IPNU IPPNU Tahunan",
        organizer: "PAC Tahunan",
        organizerType: "PAC",
        date: "2026-11-20",
        time: "08:00 WIB",
        location: "Madrasah Hasyim Asy'ari",
        pic: "Dept. Kaderisasi PAC",
        status: "Mendatang"
      },
      {
        id: "rakor-2027-02",
        title: "Rapat Koordinasi PAC & Ranting",
        organizer: "PAC Tahunan",
        organizerType: "PAC",
        date: "2027-02-05",
        time: "19:30 WIB",
        location: "Gedung MWC NU Tahunan",
        pic: "Rekan Wafa",
        status: "Mendatang"
      },
      {
        id: "konferancab-2027",
        title: "Konferensi Anak Cabang IPNU IPPNU Tahunan",
        organizer: "PAC Tahunan",
        organizerType: "PAC",
        date: "2027-09-15",
        time: "08:00 WIB",
        location: "Gedung MWC NU Tahunan",
        pic: "Ketua PAC",
        status: "Mendatang"
      }
    ];

    // Convert Makesta database into agendas
    const makestaAgendas: Agenda[] = (appData.makesta || []).map((m: MakestaItem, idx: number) => {
      let isoDate = "2026-03-14";
      try {
        const parts = m.tanggal.split("/");
        const days = parts[0].split("-");
        isoDate = `${parts[2]}-${parts[1]}-${days[0].padStart(2, "0")}`;
      } catch {}

      const slug = `makesta-${m.penyelenggara.toLowerCase().replace(/ /g, "-").replace(/[^a-z0-9-]/g, "")}`;

      return {
        id: `makesta-${idx}`,
        title: `MAKESTA ${m.penyelenggara}`,
        organizer: m.penyelenggara,
        organizerType: (m.penyelenggara.includes("PR") || m.penyelenggara.includes("Desa") ? "PR" : "PK") as "PR" | "PK",
        date: isoDate,
        time: "07:30 WIB",
        location: m.tempat,
        pic: "Ketua Pimpinan",
        status: "Selesai" as const,
        slug: slug
      };
    });

    return [...staticAgendas, ...makestaAgendas].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }, [appData.makesta]);

  const filteredAgendas = agendas.filter((item) => {
    const matchesType = filterType === "all" || item.organizerType === filterType;
    const matchesStatus = filterStatus === "all" || item.status === filterStatus;
    const matchesQuery =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.organizer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesStatus && matchesQuery;
  });

  return (
    <div className="py-6 sm:py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      
      {/* ─── Top Control Bar: View Toggle & Period ───────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-150 pb-4">
        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <div className="bg-slate-100 p-1 rounded-xl flex border border-slate-200">
            <button
              onClick={() => setViewMode("calendar")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-extrabold transition flex items-center gap-2 ${
                viewMode === "calendar"
                  ? "bg-white text-brand-purple shadow-sm border border-slate-100"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <i className="fas fa-calendar-alt text-xs"></i>
              <span>Kalender Grid</span>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-extrabold transition flex items-center gap-2 ${
                viewMode === "list"
                  ? "bg-white text-brand-purple shadow-sm border border-slate-100"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <i className="fas fa-list-ul text-xs"></i>
              <span>Daftar Jadwal ({agendas.length})</span>
            </button>
          </div>

          {/* Period Badge */}
          <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-violet-50 text-brand-purple border border-violet-100 text-xs font-black">
            <i className="fas fa-check-circle text-[11px]"></i> Masa Khidmat 2025–2027
          </span>
        </div>

        {/* Search for List Mode */}
        {viewMode === "list" && (
          <div className="relative w-full sm:w-64">
            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
            <input
              type="text"
              placeholder="Cari agenda / lokasi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-1.5 pl-8 pr-4 text-xs text-slate-900 focus:outline-none focus:border-brand-purple transition"
            />
          </div>
        )}
      </div>

      {/* ─── View 1: Interactive Monthly Calendar Grid ────────────────────────── */}
      {viewMode === "calendar" && (
        <div className="space-y-4">
          {dataLoading ? (
            <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center shadow-sm">
              <i className="fas fa-spinner fa-spin text-brand-purple text-xl mb-3 block"></i>
              <p className="text-xs text-slate-400 font-medium">Memuat kalender organisasi...</p>
            </div>
          ) : (
            <KaderisasiCalendar makestaList={appData.makesta || []} />
          )}
        </div>
      )}

      {/* ─── View 2: Chronological Agenda List ─────────────────────────────────── */}
      {viewMode === "list" && (
        <div className="space-y-5">
          {/* Filters */}
          <div className="flex flex-wrap gap-3 items-center">
            {/* Organizer Filter */}
            <div className="space-y-1">
              <span className="block text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">Penyelenggara</span>
              <div className="bg-slate-100 p-1 rounded-xl flex border border-slate-200">
                {["all", "PAC", "PR", "PK"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setFilterType(t)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                      filterType === t
                        ? "bg-brand-purple text-white shadow-sm"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    {t === "all" ? "Semua" : t}
                  </button>
                ))}
              </div>
            </div>

            {/* Status Filter */}
            <div className="space-y-1">
              <span className="block text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">Status Agenda</span>
              <div className="bg-slate-100 p-1 rounded-xl flex border border-slate-200">
                {["all", "Mendatang", "Selesai"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setFilterStatus(s)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                      filterStatus === s
                        ? "bg-brand-purple text-white shadow-sm"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    {s === "all" ? "Semua" : s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Agenda Cards */}
          {dataLoading ? (
            <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center shadow-sm">
              <i className="fas fa-spinner fa-spin text-brand-purple text-xl mb-3 block"></i>
              <p className="text-xs text-slate-400 font-medium">Memuat daftar agenda...</p>
            </div>
          ) : filteredAgendas.length === 0 ? (
            <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center shadow-sm text-xs text-slate-400">
              <i className="far fa-calendar-times text-2xl text-slate-300 block mb-2"></i>
              Tidak ada agenda kegiatan yang cocok dengan kriteria pencarian.
            </div>
          ) : (
            <div className="space-y-3">
              {filteredAgendas.map((item) => {
                const formattedDate = new Date(item.date).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                });

                return (
                  <div
                    key={item.id}
                    className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5 hover-card-glow transition"
                  >
                    <div className="flex items-start gap-4">
                      {/* Calendar Date Box */}
                      <div className="w-12 h-12 rounded-xl bg-violet-50 text-brand-purple flex flex-col items-center justify-center flex-shrink-0 font-bold border border-violet-100/60">
                        <span className="text-[10px] uppercase leading-none font-extrabold">
                          {new Date(item.date).toLocaleDateString("id-ID", { month: "short" })}
                        </span>
                        <span className="text-lg leading-none font-black mt-1">
                          {new Date(item.date).toLocaleDateString("id-ID", { day: "numeric" })}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="font-extrabold text-sm sm:text-base text-slate-900 leading-snug">{item.title}</h4>
                          <span
                            className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-widest ${
                              item.organizerType === "PAC"
                                ? "bg-violet-50 text-brand-purple border border-violet-100"
                                : item.organizerType === "PR"
                                ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                                : "bg-blue-50 text-blue-600 border border-blue-100"
                            }`}
                          >
                            {item.organizerType}
                          </span>
                        </div>

                        <div className="text-[11px] text-slate-500 font-semibold space-y-0.5">
                          <p>
                            <i className="far fa-clock text-slate-400 mr-1.5 w-3.5 text-center"></i>
                            {formattedDate} &bull; {item.time}
                          </p>
                          <p>
                            <i className="fas fa-map-marker-alt text-slate-400 mr-1.5 w-3.5 text-center"></i>
                            {item.location}
                          </p>
                          <p className="text-slate-400 text-[10px]">
                            <i className="far fa-user text-slate-400 mr-1.5 w-3.5 text-center"></i>
                            Penanggung Jawab: {item.pic} ({item.organizer})
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-start md:self-center">
                      {item.status === "Selesai" ? (
                        <>
                          <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-xs font-bold border border-slate-200">
                            Selesai
                          </span>
                          {item.slug && (
                            <Link
                              href={`/kegiatan/${item.slug}`}
                              className="px-3.5 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-extrabold transition shadow-sm"
                            >
                              Arsip
                            </Link>
                          )}
                        </>
                      ) : (
                        <span className="px-3 py-1 rounded-full bg-violet-50 text-brand-purple text-xs font-extrabold border border-violet-100">
                          Mendatang
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
