"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useApp } from "@/lib/context/AppContext";
import { MakestaItem } from "@/lib/api/client";

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
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

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

    // Convert completed Makesta database to agendas
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
    return matchesType && matchesStatus;
  });

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header controls & Period Indicator */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-3 items-center">
          {/* Period Badge */}
          <div className="space-y-1">
            <span className="block text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">Masa Khidmat</span>
            <div className="bg-violet-50 text-brand-purple border border-violet-100 px-3 py-1.5 rounded-xl text-xs font-black tracking-wide flex items-center gap-1.5">
              <i className="fas fa-history text-[10px]"></i>
              <span>Periode 2025 – 2027</span>
            </div>
          </div>

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
      </div>

      {/* Agenda Timeline List */}
      {dataLoading ? (
        <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center shadow-sm">
          <i className="fas fa-spinner fa-spin text-brand-purple text-xl mb-3 block"></i>
          <p className="text-xs text-slate-400 font-medium">Memuat agenda organisasi...</p>
        </div>
      ) : filteredAgendas.length === 0 ? (
        <p className="text-xs text-slate-400 text-center py-12 font-medium">Tidak ada agenda kegiatan yang cocok.</p>
      ) : (
        <div className="space-y-4">
          {filteredAgendas.map((item) => {
            const formattedDate = new Date(item.date).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            });

            return (
              <div
                key={item.id}
                className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover-card-glow"
              >
                <div className="flex items-start gap-4">
                  {/* Calendar Date Icon Box */}
                  <div className="w-12 h-12 rounded-xl bg-violet-50 text-brand-purple flex flex-col items-center justify-center flex-shrink-0 font-bold border border-violet-100/50">
                    <span className="text-[10px] uppercase leading-none font-extrabold">
                      {new Date(item.date).toLocaleDateString("id-ID", { month: "short" })}
                    </span>
                    <span className="text-lg leading-none font-black mt-1">
                      {new Date(item.date).toLocaleDateString("id-ID", { day: "numeric" })}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-extrabold text-base text-slate-900 leading-snug">{item.title}</h4>
                      <span
                        className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-widest ${
                          item.organizerType === "PAC"
                            ? "bg-violet-50 text-brand-purple border border-violet-100"
                            : item.organizerType === "PR"
                            ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                            : "bg-blue-50 text-blue-600 border border-blue-100"
                        }`}
                      >
                        {item.organizerType} Organizer
                      </span>
                    </div>

                    <div className="text-[10px] sm:text-xs text-slate-500 font-semibold space-y-1">
                      <p>
                        <i className="far fa-calendar-alt text-slate-400 mr-2 w-4 text-center"></i>
                        {formattedDate} | {item.time}
                      </p>
                      <p>
                        <i className="fas fa-map-marker-alt text-slate-400 mr-2 w-4 text-center"></i>
                        {item.location}
                      </p>
                      <p>
                        <i className="far fa-user text-slate-400 mr-2 w-4 text-center"></i>
                        PIC: {item.pic} ({item.organizer})
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
                          className="px-4 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-750 text-white text-xs font-extrabold transition shadow-sm"
                        >
                          Arsip Kegiatan
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
  );
}
