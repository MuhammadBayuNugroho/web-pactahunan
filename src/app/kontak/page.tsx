"use client";

import React, { useState, useEffect } from "react";
import { getSpData, SettingsObj } from "@/lib/api/client";

export default function KontakPage() {
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<SettingsObj>({});

  useEffect(() => {
    async function loadSettings() {
      try {
        const data = await getSpData();
        setSettings(data.settings || {});
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const contactList = [
    { name: "Muhammad Bayu Nugroho", role: "Ketua PAC IPNU Tahunan", num: "6282330449041", roleType: "IPNU" },
    { name: "Linda Qurrotul Aini", role: "Ketua PAC IPPNU Tahunan", num: "6285803228303", roleType: "IPPNU" }
  ];

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="space-y-2 border-b border-slate-100 pb-5">
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900">
          Hubungi Kami & Kesekretariatan
        </h2>
        <p className="text-xs text-slate-500">
          Informasi kontak pengurus harian PAC IPNU IPPNU Kecamatan Tahunan beserta koordinasi alamat sekretariat resmi.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Contact List & Maps */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {contactList.map((contact, idx) => (
              <a
                href={`https://wa.me/${contact.num}`}
                key={idx}
                target="_blank"
                rel="noreferrer"
                className="p-5 rounded-3xl bg-white border border-slate-100 hover:border-brand-purple/40 hover:shadow-md transition-all duration-300 flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${
                    contact.roleType === "IPNU" ? "bg-violet-50 text-brand-purple" : "bg-emerald-50 text-emerald-600"
                  }`}>
                    <i className="fab fa-whatsapp"></i>
                  </div>
                  <div>
                    <span className="block text-xs font-black text-slate-800">{contact.name}</span>
                    <span className="block text-[9px] text-slate-400 font-extrabold uppercase tracking-wider mt-0.5">{contact.role}</span>
                    <span className={`block text-[10px] font-mono mt-1 ${
                      contact.roleType === "IPNU" ? "text-brand-purple" : "text-emerald-650"
                    }`}>+{contact.num}</span>
                  </div>
                </div>
                <span className={`text-xs font-bold transition-transform group-hover:translate-x-0.5 flex items-center gap-1 ${
                  contact.roleType === "IPNU" ? "text-brand-purple" : "text-emerald-650"
                }`}>
                  Chat <i className="fas fa-arrow-right text-[10px]"></i>
                </span>
              </a>
            ))}

            {/* Email card */}
            <a
              href="mailto:pacipnuippnutahunan@gmail.com"
              className="p-5 rounded-3xl bg-white border border-slate-100 hover:border-brand-purple/45 hover:shadow-md transition-all duration-300 flex items-center justify-between group sm:col-span-2"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl">
                  <i className="fas fa-envelope"></i>
                </div>
                <div>
                  <span className="block text-xs font-black text-slate-800">Email Resmi Organisasi</span>
                  <span className="block text-[9px] text-slate-400 font-extrabold uppercase tracking-wider mt-0.5">Surat Menyurat & Kerjasama</span>
                  <span className="block text-xs text-indigo-650 font-semibold mt-1">pacipnuippnutahunan@gmail.com</span>
                </div>
              </div>
              <span className="text-xs font-bold text-indigo-600 transition-transform group-hover:translate-x-0.5 flex items-center gap-1">
                Kirim Email <i className="fas fa-arrow-right text-[10px]"></i>
              </span>
            </a>
          </div>

          {/* Secretariat Address and Embedded Map */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <i className="fas fa-map-marker-alt text-brand-purple"></i> Kantor Sekretariat Resmi
            </h3>
            <div className="space-y-3">
              <p className="text-xs text-slate-800 font-extrabold leading-relaxed">
                Gedung MWCNU Kecamatan Tahunan
              </p>
              <p className="text-xs text-slate-400 leading-relaxed font-semibold">
                Jl. Taman Siswa, Pekeng, Kauman, Tahunan, Kec. Tahunan, Kabupaten Jepara, Jawa Tengah 59451
              </p>
              <div className="w-full h-52 rounded-2xl overflow-hidden border border-slate-100 mt-2">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.267675661448!2d110.6865239!3d-6.613670699999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e711faf6c9b3d0d%3A0xe543e4983fb00109!2sGedung%20MWCNU%20Tahunan!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        {/* Susunan Pengurus Preview Side cards */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-5">
            <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <i className="fas fa-file-pdf text-brand-purple"></i> Berkas Kepengurusan
            </h3>
            <p className="text-xs text-slate-500 font-semibold leading-relaxed">
              Lihat dan pratinjau lembar keputusan susunan lengkap pengurus PAC IPNU & PAC IPPNU Kecamatan Tahunan periode aktif.
            </p>

            {/* IPNU Card */}
            <div className="border border-slate-100 rounded-2xl p-4 space-y-3 bg-slate-50">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-800">Susunan Pengurus IPNU</span>
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-brand-purple bg-violet-50 px-2 py-0.5 rounded">PDF</span>
              </div>
              <a
                href={settings.pdfIpnuUrl || "#"}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-3 rounded-lg bg-brand-purple hover:bg-brand-purpleDark text-white font-extrabold text-[10px] uppercase tracking-wider transition flex items-center justify-center gap-1.5 shadow-sm"
              >
                <i className="fas fa-eye text-xs"></i> Buka Susunan Pengurus
              </a>
            </div>

            {/* IPPNU Card */}
            <div className="border border-slate-100 rounded-2xl p-4 space-y-3 bg-slate-50">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-800">Susunan Pengurus IPPNU</span>
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">PDF</span>
              </div>
              <a
                href={settings.pdfIppnuUrl || "#"}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-3 rounded-lg bg-emerald-650 hover:bg-emerald-700 text-white font-extrabold text-[10px] uppercase tracking-wider transition flex items-center justify-center gap-1.5 shadow-sm"
              >
                <i className="fas fa-eye text-xs"></i> Buka Susunan Pengurus
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
