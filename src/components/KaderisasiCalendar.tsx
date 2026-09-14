"use client";

import React, { useState, useCallback } from "react";
import { MakestaItem } from "@/lib/api/client";

// ─── Types ──────────────────────────────────────────────────────────────────

export type CalendarEventType =
  | "makesta"
  | "pra-makesta"
  | "rtl"
  | "lakmud"
  | "rakor"
  | "pelantikan";

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // ISO format "YYYY-MM-DD"
  type: CalendarEventType;
  organizer: string;
  location: string;
  peserta?: number;
  time?: string;
  description?: string;
}

interface KaderisasiCalendarProps {
  makestaList: MakestaItem[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const EVENT_STYLES: Record<CalendarEventType, { dot: string; badge: string; icon: string }> = {
  makesta:       { dot: "bg-violet-500",  badge: "bg-violet-50 text-violet-700 border-violet-200",   icon: "fa-graduation-cap" },
  "pra-makesta": { dot: "bg-indigo-400",  badge: "bg-indigo-50 text-indigo-700 border-indigo-200",   icon: "fa-chalkboard-teacher" },
  rtl:           { dot: "bg-blue-400",    badge: "bg-blue-50 text-blue-700 border-blue-200",         icon: "fa-redo" },
  lakmud:        { dot: "bg-emerald-500", badge: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: "fa-award" },
  rakor:         { dot: "bg-amber-400",   badge: "bg-amber-50 text-amber-700 border-amber-200",      icon: "fa-users" },
  pelantikan:    { dot: "bg-rose-400",    badge: "bg-rose-50 text-rose-700 border-rose-200",         icon: "fa-star" },
};

const EVENT_LABELS: Record<CalendarEventType, string> = {
  makesta:       "MAKESTA",
  "pra-makesta": "Pra-Makesta",
  rtl:           "RTL",
  lakmud:        "LAKMUD / LAKMAD",
  rakor:         "Rapat Koordinasi",
  pelantikan:    "Pelantikan",
};

const MONTHS_ID = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

const DAYS_ID = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

/** Parse date string from makesta format "DD-DD/MM/YYYY" or "DD/MM/YYYY" → ISO "YYYY-MM-DD" */
function parseIndonesianDate(raw: string): string | null {
  try {
    const parts = raw.split("/");
    if (parts.length < 3) return null;
    const dayPart = parts[0].split("-")[0].padStart(2, "0");
    const month = parts[1].padStart(2, "0");
    const year = parts[2].trim();
    return `${year}-${month}-${dayPart}`;
  } catch {
    return null;
  }
}

/** Build static PAC programme events for 2025–2027 period */
const STATIC_PAC_EVENTS: CalendarEvent[] = [
  // 2025
  { id: "rakor-2025-09", title: "Rapat Koordinasi PAC & Ranting", date: "2025-09-05", type: "rakor", organizer: "PAC Tahunan", location: "Gedung MWC NU Tahunan", time: "19:30 WIB" },
  { id: "pelantikan-pac-2025", title: "Pelantikan Pengurus PAC Periode 2025–2027", date: "2025-10-12", type: "pelantikan", organizer: "PAC Tahunan", location: "Aula MWC NU Tahunan", time: "08:00 WIB" },
  // 2026
  { id: "rakor-2026-02", title: "Rapat Koordinasi PAC & Ranting", date: "2026-02-07", type: "rakor", organizer: "PAC Tahunan", location: "Gedung MWC NU Tahunan", time: "19:30 WIB" },
  { id: "lakmud-1-2026", title: "LAKMUD I PAC IPNU IPPNU Tahunan", date: "2026-08-14", type: "lakmud", organizer: "PAC Tahunan", location: "Madrasah Hasyim Asy'ari", time: "08:00 WIB", description: "Latihan Kader Muda tingkat PAC, sasaran kader Ranting & Komisariat." },
  { id: "rakor-2026-08", title: "Rapat Koordinasi PAC & Ranting", date: "2026-08-05", type: "rakor", organizer: "PAC Tahunan", location: "Gedung MWC NU Tahunan", time: "19:30 WIB" },
  { id: "lakmad-2026", title: "LAKMAD PAC IPNU IPPNU Tahunan", date: "2026-11-20", type: "lakmud", organizer: "PAC Tahunan", location: "Madrasah Hasyim Asy'ari", time: "08:00 WIB", description: "Latihan Kader Madya tingkat PAC untuk kader aktif." },
  // 2027
  { id: "rakor-2027-02", title: "Rapat Koordinasi PAC & Ranting", date: "2027-02-05", type: "rakor", organizer: "PAC Tahunan", location: "Gedung MWC NU Tahunan", time: "19:30 WIB" },
  { id: "konfercab-2027", title: "Konferensi Cabang IPNU IPPNU Tahunan", date: "2027-09-15", type: "pelantikan", organizer: "PAC Tahunan", location: "Gedung MWC NU Tahunan", time: "08:00 WIB", description: "Musyawarah akhir periode untuk pemilihan pengurus baru." },
];

/** Convert MakestaItem[] to CalendarEvent[] — includes pra-makesta, makesta, and RTL steps */
function buildMakestaEvents(list: MakestaItem[]): CalendarEvent[] {
  const events: CalendarEvent[] = [];

  list.forEach((m, idx) => {
    const base = idx.toString();

    // Makesta main event
    const makestaDate = parseIndonesianDate(m.makesta.tanggal || m.tanggal);
    if (makestaDate) {
      events.push({
        id: `makesta-${base}`,
        title: `MAKESTA ${m.penyelenggara}`,
        date: makestaDate,
        type: "makesta",
        organizer: m.penyelenggara,
        location: m.tempat,
        peserta: m.peserta,
        time: "07:30 WIB",
      });
    }

    // Pra-Makesta
    const praDate = parseIndonesianDate(m.praMakesta.tanggal);
    if (praDate) {
      events.push({
        id: `pra-makesta-${base}`,
        title: `Pra-Makesta ${m.penyelenggara}`,
        date: praDate,
        type: "pra-makesta",
        organizer: m.penyelenggara,
        location: m.praMakesta.tempat,
        peserta: m.praMakesta.peserta,
        time: "08:00 WIB",
      });
    }

    // RTL steps
    m.rtl.forEach((rtl, rtlIdx) => {
      const rtlDate = parseIndonesianDate(rtl.tanggal);
      if (rtlDate) {
        events.push({
          id: `rtl-${base}-${rtlIdx + 1}`,
          title: `RTL ${rtlIdx + 1} — ${m.penyelenggara}`,
          date: rtlDate,
          type: "rtl",
          organizer: m.penyelenggara,
          location: rtl.tempat,
          peserta: rtl.peserta,
          time: "08:00 WIB",
        });
      }
    });
  });

  return events;
}

// ─── Component ────────────────────────────────────────────────────────────────

const KaderisasiCalendar: React.FC<KaderisasiCalendarProps> = ({ makestaList }) => {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear() < 2025 ? 2025 : today.getFullYear() > 2027 ? 2027 : today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth()); // 0-indexed
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [activeTypeFilter, setActiveTypeFilter] = useState<CalendarEventType | "all">("all");

  // Build all events (static + dynamic from makesta data)
  const allEvents: CalendarEvent[] = [
    ...STATIC_PAC_EVENTS,
    ...buildMakestaEvents(makestaList),
  ];

  // Filter by year period
  const periodEvents = allEvents.filter((e) => {
    const year = parseInt(e.date.split("-")[0]);
    return year >= 2025 && year <= 2027;
  });

  // Filter by selected type
  const filteredEvents = activeTypeFilter === "all"
    ? periodEvents
    : periodEvents.filter((e) => e.type === activeTypeFilter);

  // Build calendar grid
  const firstDay = new Date(currentYear, currentMonth, 1).getDay(); // 0 = Sunday
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;

  // Map events to dates for quick lookup
  const eventsByDate = useCallback(() => {
    const map: Record<string, CalendarEvent[]> = {};
    filteredEvents.forEach((e) => {
      const [y, m, d] = e.date.split("-").map(Number);
      if (y === currentYear && m - 1 === currentMonth) {
        const key = d.toString();
        if (!map[key]) map[key] = [];
        map[key].push(e);
      }
    });
    return map;
  }, [filteredEvents, currentYear, currentMonth])();

  const prevMonth = () => {
    if (currentMonth === 0) {
      if (currentYear > 2025) { setCurrentYear(y => y - 1); setCurrentMonth(11); }
    } else {
      setCurrentMonth(m => m - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      if (currentYear < 2027) { setCurrentYear(y => y + 1); setCurrentMonth(0); }
    } else {
      setCurrentMonth(m => m + 1);
    }
  };

  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  return (
    <div className="space-y-4">
      {/* Calendar Header */}
      <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden">
        {/* Top Controls */}
        <div className="bg-gradient-to-r from-violet-950 to-indigo-900 text-white p-5 flex items-center justify-between">
          <button
            onClick={prevMonth}
            disabled={currentYear === 2025 && currentMonth === 0}
            className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <i className="fas fa-chevron-left text-sm"></i>
          </button>

          <div className="text-center">
            <p className="text-lg font-black tracking-tight">{MONTHS_ID[currentMonth]} {currentYear}</p>
            <p className="text-[10px] text-violet-300 font-semibold uppercase tracking-widest">Periode Masa Khidmat 2025 – 2027</p>
          </div>

          <button
            onClick={nextMonth}
            disabled={currentYear === 2027 && currentMonth === 11}
            className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <i className="fas fa-chevron-right text-sm"></i>
          </button>
        </div>

        {/* Year Quick Jump */}
        <div className="flex items-center justify-center gap-2 px-5 py-3 border-b border-slate-100 bg-slate-50">
          {[2025, 2026, 2027].map((y) => (
            <button
              key={y}
              onClick={() => setCurrentYear(y)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                currentYear === y
                  ? "bg-brand-purple text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-200"
              }`}
            >
              {y}
            </button>
          ))}
        </div>

        {/* Type Filter Chips */}
        <div className="flex flex-wrap gap-2 px-5 py-3 border-b border-slate-100">
          <button
            onClick={() => setActiveTypeFilter("all")}
            className={`px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wide transition border ${
              activeTypeFilter === "all"
                ? "bg-slate-800 text-white border-slate-800"
                : "text-slate-500 border-slate-200 hover:border-slate-400"
            }`}
          >
            Semua
          </button>
          {(Object.keys(EVENT_LABELS) as CalendarEventType[]).map((type) => (
            <button
              key={type}
              onClick={() => setActiveTypeFilter(type)}
              className={`px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wide transition border ${
                activeTypeFilter === type
                  ? `${EVENT_STYLES[type].badge} border-current`
                  : "text-slate-500 border-slate-200 hover:border-slate-400"
              }`}
            >
              <i className={`fas ${EVENT_STYLES[type].icon} mr-1`}></i>
              {EVENT_LABELS[type]}
            </button>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="p-4">
          {/* Day Headers */}
          <div className="grid grid-cols-7 mb-2">
            {DAYS_ID.map((d) => (
              <div key={d} className="text-center text-[10px] font-extrabold text-slate-400 uppercase tracking-wider py-1">
                {d}
              </div>
            ))}
          </div>

          {/* Day Cells */}
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: totalCells }).map((_, idx) => {
              const dayNum = idx - firstDay + 1;
              const isValidDay = dayNum >= 1 && dayNum <= daysInMonth;
              const dayStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;
              const isToday = dayStr === todayStr;
              const events = isValidDay ? (eventsByDate[dayNum.toString()] || []) : [];
              const maxDots = 3;

              return (
                <div
                  key={idx}
                  className={`relative min-h-[56px] sm:min-h-[64px] rounded-xl p-1.5 transition ${
                    !isValidDay
                      ? "opacity-0 pointer-events-none"
                      : events.length > 0
                      ? "cursor-pointer hover:bg-violet-50 hover:border-violet-200 border border-transparent"
                      : "border border-transparent"
                  } ${isToday ? "bg-violet-50 border-violet-300 border" : ""}`}
                  onClick={() => events.length > 0 && setSelectedEvent(events[0])}
                >
                  {isValidDay && (
                    <>
                      <span className={`text-xs font-bold block text-center leading-none mb-1 ${
                        isToday
                          ? "w-5 h-5 rounded-full bg-brand-purple text-white flex items-center justify-center mx-auto"
                          : events.length > 0
                          ? "text-slate-800"
                          : "text-slate-400"
                      }`}>
                        {dayNum}
                      </span>
                      {/* Event dots */}
                      <div className="flex flex-wrap gap-0.5 justify-center">
                        {events.slice(0, maxDots).map((ev, evIdx) => (
                          <span
                            key={evIdx}
                            className={`w-1.5 h-1.5 rounded-full ${EVENT_STYLES[ev.type].dot}`}
                            title={ev.title}
                          />
                        ))}
                        {events.length > maxDots && (
                          <span className="text-[8px] font-black text-slate-400 leading-none">+{events.length - maxDots}</span>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 px-5 py-3 border-t border-slate-100 bg-slate-50/60">
          {(Object.keys(EVENT_STYLES) as CalendarEventType[]).map((type) => (
            <span key={type} className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-500">
              <span className={`w-2 h-2 rounded-full ${EVENT_STYLES[type].dot}`}></span>
              {EVENT_LABELS[type]}
            </span>
          ))}
        </div>
      </div>

      {/* Events This Month Summary */}
      {Object.keys(eventsByDate).length > 0 && (
        <div className="space-y-2">
          <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
            Agenda {MONTHS_ID[currentMonth]} {currentYear} ({Object.values(eventsByDate).flat().length} kegiatan)
          </p>
          <div className="space-y-2">
            {Object.entries(eventsByDate)
              .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
              .flatMap(([day, events]) =>
                events.map((ev) => (
                  <button
                    key={ev.id}
                    onClick={() => setSelectedEvent(ev)}
                    className="w-full text-left bg-white border border-slate-100 rounded-xl p-3 hover:border-violet-200 hover:shadow-sm transition flex items-center gap-3"
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs ${EVENT_STYLES[ev.type].badge} border`}>
                      <i className={`fas ${EVENT_STYLES[ev.type].icon}`}></i>
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="text-xs font-extrabold text-slate-800 truncate">{ev.title}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{parseInt(day)} {MONTHS_ID[currentMonth]} · {ev.location}</p>
                    </div>
                    <span className={`flex-shrink-0 px-2 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wide border ${EVENT_STYLES[ev.type].badge}`}>
                      {EVENT_LABELS[ev.type]}
                    </span>
                  </button>
                ))
              )}
          </div>
        </div>
      )}

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) setSelectedEvent(null); }}
        >
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border ${EVENT_STYLES[selectedEvent.type].badge}`}>
                  <i className={`fas ${EVENT_STYLES[selectedEvent.type].icon}`}></i>
                </div>
                <div>
                  <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-widest border ${EVENT_STYLES[selectedEvent.type].badge}`}>
                    {EVENT_LABELS[selectedEvent.type]}
                  </span>
                  <h4 className="font-black text-slate-900 text-sm mt-0.5 leading-snug">{selectedEvent.title}</h4>
                </div>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-800 hover:bg-slate-200 flex items-center justify-center flex-shrink-0 transition"
              >
                <i className="fas fa-times text-xs"></i>
              </button>
            </div>

            {/* Modal Details */}
            <div className="space-y-2.5 text-xs text-slate-600 font-medium">
              <div className="flex items-center gap-2.5">
                <i className="far fa-calendar-alt text-slate-400 w-4 text-center"></i>
                <span>
                  {new Date(selectedEvent.date).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                  {selectedEvent.time && ` | ${selectedEvent.time}`}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <i className="fas fa-map-marker-alt text-slate-400 w-4 text-center"></i>
                <span>{selectedEvent.location}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <i className="fas fa-sitemap text-slate-400 w-4 text-center"></i>
                <span>Penyelenggara: {selectedEvent.organizer}</span>
              </div>
              {selectedEvent.peserta && (
                <div className="flex items-center gap-2.5">
                  <i className="fas fa-users text-slate-400 w-4 text-center"></i>
                  <span>Peserta: {selectedEvent.peserta} orang</span>
                </div>
              )}
              {selectedEvent.description && (
                <div className="flex items-start gap-2.5 pt-1 border-t border-slate-100">
                  <i className="fas fa-info-circle text-slate-400 w-4 text-center mt-0.5"></i>
                  <p className="leading-relaxed">{selectedEvent.description}</p>
                </div>
              )}
            </div>

            <button
              onClick={() => setSelectedEvent(null)}
              className="w-full py-2.5 rounded-xl bg-slate-100 text-slate-600 font-bold text-xs hover:bg-slate-200 transition uppercase tracking-wider"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default KaderisasiCalendar;
