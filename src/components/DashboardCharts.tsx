"use client";

import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie
} from "recharts";

// Member growth mock data
const memberGrowthData = [
  { year: "2022", kader: 480 },
  { year: "2023", kader: 690 },
  { year: "2024", kader: 890 },
  { year: "2025", kader: 1120 },
  { year: "2026", kader: 1250 }
];

// SP Status mock data (based on analysis)
const spStatusData = [
  { name: "Aktif (Aman)", value: 16, color: "#10B981" },
  { name: "Kritis (< 3 Bln)", value: 4, color: "#F59E0B" },
  { name: "Habis Berlaku", value: 4, color: "#EF4444" }
];

// Active entities mock data (Makesta counts)
const activeEntitiesData = [
  { name: "Mantingan", makesta: 4 },
  { name: "Senenan", makesta: 3 },
  { name: "Tegalsambi", makesta: 3 },
  { name: "Demangan", makesta: 2 },
  { name: "Tahunan", makesta: 2 },
  { name: "Kecapi", makesta: 1 }
];

export const MemberGrowthChart: React.FC = () => {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={memberGrowthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorKader" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6D28D9" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#6D28D9" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="year" stroke="#94A3B8" fontSize={10} tickLine={false} axisLine={false} />
          <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              background: "#FFFFFF",
              border: "1px solid #E2E8F0",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              fontSize: "11px",
              fontFamily: "Plus Jakarta Sans"
            }}
          />
          <Area type="monotone" dataKey="kader" name="Total Anggota" stroke="#6D28D9" strokeWidth={2} fillOpacity={1} fill="url(#colorKader)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export const SpStatusChart: React.FC = () => {
  return (
    <div className="w-full h-64 flex flex-col justify-between items-center">
      <div className="w-full h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={spStatusData}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={70}
              paddingAngle={4}
              dataKey="value"
            >
              {spStatusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                fontSize: "11px"
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
        {spStatusData.map((d) => (
          <div key={d.name} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }}></span>
            <span>{d.name} ({d.value})</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ActivityChart: React.FC = () => {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={activeEntitiesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <XAxis dataKey="name" stroke="#94A3B8" fontSize={9} tickLine={false} axisLine={false} />
          <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              background: "#FFFFFF",
              border: "1px solid #E2E8F0",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              fontSize: "11px"
            }}
          />
          <Bar dataKey="makesta" name="Kegiatan Makesta" fill="#10B981" radius={[4, 4, 0, 0]}>
            {activeEntitiesData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#6D28D9" : "#10B981"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
