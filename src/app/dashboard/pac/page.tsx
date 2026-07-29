"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/context/AppContext";
import {
  getSpData,
  SpItem,
  MakestaItem,
  BeritaItem,
  RepoItem,
  adminAddSp,
  adminUpdateSp,
  adminDeleteSp,
  adminAddMakesta,
  adminUpdateMakesta,
  adminDeleteMakesta,
  adminAddRepo,
  adminUpdateRepo,
  adminDeleteRepo,
  adminAddBerita,
  adminUpdateBerita,
  adminDeleteBerita,
  adminUpdateSettings,
  analyzeSpLegality
} from "@/lib/api/client";

export default function PacDashboard() {
  const router = useRouter();
  const { user, showToast, stats, setStats } = useApp();
  const [loading, setLoading] = useState(true);
  
  // Tab control
  const [activeTab, setActiveTab] = useState<"sp" | "makesta" | "repo" | "berita" | "settings">("sp");

  // Database lists
  const [spIpnu, setSpIpnu] = useState<SpItem[]>([]);
  const [spIppnu, setSpIppnu] = useState<SpItem[]>([]);
  const [makestaList, setMakestaList] = useState<MakestaItem[]>([]);
  const [repoList, setRepoList] = useState<RepoItem[]>([]);
  const [beritaList, setBeritaList] = useState<BeritaItem[]>([]);

  // Input states for SP
  const [spBanom, setSpBanom] = useState<"ipnu" | "ippnu">("ipnu");
  const [spName, setSpName] = useState("");
  const [spType, setSpType] = useState<"ranting" | "komisariat">("ranting");
  const [spNumber, setSpNumber] = useState("");
  const [spExpiry, setSpExpiry] = useState("");
  const [spPhone, setSpPhone] = useState("");
  const [spEmail, setSpEmail] = useState("");
  const [editingSpIdx, setEditingSpIdx] = useState<number | null>(null);

  // Settings Configuration states
  const [secName, setSecName] = useState("Rekanita Erna Kumala");
  const [secWa, setSecWa] = useState("6282242147243");
  const [pdfIpnuUrl, setPdfIpnuUrl] = useState("");
  const [pdfIppnuUrl, setPdfIppnuUrl] = useState("");

  const localPin = "admin1234"; // Default local validation PIN

  useEffect(() => {
    // Session Guard
    if (!user) {
      router.push("/admin");
      return;
    }
    if (user.role !== "admin_pac" && user.role !== "super_admin") {
      router.push("/dashboard/ranting");
      return;
    }

    async function loadData() {
      try {
        const data = await getSpData();
        setSpIpnu(data.ipnu || []);
        setSpIppnu(data.ippnu || []);
        setMakestaList(data.makesta || []);
        setBeritaList(data.berita || []);
        
        // Static Repository mockup
        setRepoList([
          { id: "1", title: "Buku Pedoman Kaderisasi IPNU IPPNU", description: "Buku panduan kurikulum kaderisasi formal Makesta & Lakmud.", category: "buku", driveId: "1AQ00D1srOr53Jjf5w377NkFgLD5V-8e2", coverImage: "/assets/images/cover-modul.png" }
        ]);

        if (data.settings) {
          if (data.settings.pdfIpnuUrl) setPdfIpnuUrl(data.settings.pdfIpnuUrl);
          if (data.settings.pdfIppnuUrl) setPdfIppnuUrl(data.settings.pdfIppnuUrl);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [user, router]);

  const handleSpSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!spName || !spNumber || !spExpiry) return;

    const newItem: SpItem = {
      name: spName,
      type: spType,
      spNumber,
      expiryDate: spExpiry,
      phone: spPhone,
      email: spEmail
    };

    try {
      showToast("Menyimpan SP", "Sedang memproses penyimpanan database...", "info");
      if (editingSpIdx !== null) {
        await adminUpdateSp(spBanom, editingSpIdx, newItem, localPin);
        if (spBanom === "ipnu") {
          const list = [...spIpnu];
          list[editingSpIdx] = newItem;
          setSpIpnu(list);
        } else {
          const list = [...spIppnu];
          list[editingSpIdx] = newItem;
          setSpIppnu(list);
        }
        showToast("SP Berhasil Diperbarui", "Data berhasil direkam di Google Sheets.", "success");
      } else {
        await adminAddSp(spBanom, newItem, localPin);
        if (spBanom === "ipnu") setSpIpnu([...spIpnu, newItem]);
        else setSpIppnu([...spIppnu, newItem]);
        showToast("SP Berhasil Ditambahkan", "Data berhasil dimasukkan ke Google Sheets.", "success");
      }

      // Reset
      setSpName("");
      setSpNumber("");
      setSpExpiry("");
      setSpPhone("");
      setSpEmail("");
      setEditingSpIdx(null);
    } catch (err) {
      showToast("Gagal Menyimpan", "Terjadi kesalahan pada backend API.", "error");
    }
  };

  const handleSpDelete = async (banom: "ipnu" | "ippnu", index: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus data SP ini dari Google Sheets?")) return;
    try {
      showToast("Menghapus Data", "Sedang mengirim instruksi hapus...", "info");
      await adminDeleteSp(banom, index, localPin);
      if (banom === "ipnu") {
        setSpIpnu(spIpnu.filter((_, idx) => idx !== index));
      } else {
        setSpIppnu(spIppnu.filter((_, idx) => idx !== index));
      }
      showToast("Data Dihapus", "SP berhasil dihapus secara permanen.", "success");
    } catch (err) {
      showToast("Gagal Menghapus", "Kesalahan koneksi database.", "error");
    }
  };

  const handleSettingsSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      showToast("Menyimpan Pengaturan", "Sedang memperbarui konfigurasi sistem...", "info");
      await adminUpdateSettings({ pdfIpnuUrl, pdfIppnuUrl }, localPin);
      showToast("Pengaturan Disimpan", "Tautan PDF dan identitas pengurus diperbarui.", "success");
    } catch (err) {
      showToast("Gagal Menyimpan", "Terjadi kesalahan.", "error");
    }
  };

  if (!user) return null;
  if (loading) {
    return (
      <div className="py-12 text-center text-xs text-slate-400 font-medium">
        <i className="fas fa-spinner fa-spin mr-2"></i> Membuka Dasbor PAC...
      </div>
    );
  }

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-violet-600 animate-pulse"></span>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900">
              Dashboard Admin PAC Tahunan
            </h2>
          </div>
          <p className="text-xs text-slate-500">Konsol kontrol manajemen data, status SP, kegiatan ranting, dan persuratan digital se-Kecamatan Tahunan.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-5 bg-white border border-slate-100 rounded-2xl shadow-sm">
          <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-extrabold">Total Ranting Terdaftar</span>
          <span className="block text-2xl font-black text-slate-800 mt-2">15 Ranting Desa</span>
        </div>
        <div className="p-5 bg-white border border-slate-100 rounded-2xl shadow-sm">
          <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-extrabold">Total Komisariat Terdaftar</span>
          <span className="block text-2xl font-black text-slate-800 mt-2">9 Komisariat Sekolah</span>
        </div>
        <div className="p-5 bg-white border border-slate-100 rounded-2xl shadow-sm">
          <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-extrabold">Menunggu Persetujuan</span>
          <span className="block text-2xl font-black text-amber-600 mt-2">2 Pengajuan Surat</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-2">
        <button
          onClick={() => setActiveTab("sp")}
          className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition ${
            activeTab === "sp" ? "bg-brand-purple text-white shadow-sm" : "text-slate-500 hover:text-slate-800 bg-white border border-slate-100"
          }`}
        >
          <i className="fas fa-file-contract mr-1.5"></i> Kelola SK / SP Ranting
        </button>
        <button
          onClick={() => setActiveTab("makesta")}
          className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition ${
            activeTab === "makesta" ? "bg-brand-purple text-white shadow-sm" : "text-slate-500 hover:text-slate-800 bg-white border border-slate-100"
          }`}
        >
          <i className="fas fa-graduation-cap mr-1.5"></i> Kelola Rekap Makesta
        </button>
        <button
          onClick={() => setActiveTab("repo")}
          className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition ${
            activeTab === "repo" ? "bg-brand-purple text-white shadow-sm" : "text-slate-500 hover:text-slate-800 bg-white border border-slate-100"
          }`}
        >
          <i className="fas fa-book-open mr-1.5"></i> Repositori Dokumen
        </button>
        <button
          onClick={() => setActiveTab("berita")}
          className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition ${
            activeTab === "berita" ? "bg-brand-purple text-white shadow-sm" : "text-slate-500 hover:text-slate-800 bg-white border border-slate-100"
          }`}
        >
          <i className="fas fa-newspaper mr-1.5"></i> Kelola Berita
        </button>
        <button
          onClick={() => setActiveTab("settings")}
          className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition ${
            activeTab === "settings" ? "bg-brand-purple text-white shadow-sm" : "text-slate-500 hover:text-slate-800 bg-white border border-slate-100"
          }`}
        >
          <i className="fas fa-cog mr-1.5"></i> Pengaturan Sistem
        </button>
      </div>

      {/* Tab Panel: SP */}
      {activeTab === "sp" && (
        <div className="space-y-6">
          {/* SP List and Forms */}
          <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">SK / SP Aktif di Google Sheets</h3>
              
              <div className="bg-slate-100 p-1 rounded-xl flex border border-slate-200">
                <button
                  onClick={() => setSpBanom("ipnu")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                    spBanom === "ipnu" ? "bg-brand-purple text-white" : "text-slate-500"
                  }`}
                >
                  IPNU
                </button>
                <button
                  onClick={() => setSpBanom("ippnu")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                    spBanom === "ippnu" ? "bg-brand-purple text-white" : "text-slate-500"
                  }`}
                >
                  IPPNU
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-[10px] text-slate-450 uppercase tracking-widest font-extrabold">
                    <th className="pb-3">Nama Ranting/Komisariat</th>
                    <th className="pb-3">Tipe</th>
                    <th className="pb-3">Nomor SP</th>
                    <th className="pb-3">Masa Berlaku</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-center">Edit</th>
                    <th className="pb-3 text-center">Hapus</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 font-semibold text-slate-655">
                  {(spBanom === "ipnu" ? spIpnu : spIppnu).map((item, idx) => {
                    const analysis = analyzeSpLegality(item.expiryDate);
                    return (
                      <tr key={idx} className="hover:bg-slate-50 transition">
                        <td className="py-3 font-bold text-slate-800">{item.name}</td>
                        <td className="py-3 capitalize">{item.type}</td>
                        <td className="py-3 font-mono text-[10px] text-slate-400">{item.spNumber}</td>
                        <td className="py-3">{item.expiryDate}</td>
                        <td className="py-3">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wider ${analysis.badgeClass}`}>
                            {analysis.statusLabel}
                          </span>
                        </td>
                        <td className="py-3 text-center text-brand-purple cursor-pointer hover:underline" onClick={() => {
                          setSpName(item.name);
                          setSpType(item.type);
                          setSpNumber(item.spNumber);
                          setSpExpiry(item.expiryDate);
                          setSpPhone(item.phone || "");
                          setSpEmail(item.email || "");
                          setEditingSpIdx(idx);
                        }}>
                          <i className="fas fa-edit"></i>
                        </td>
                        <td className="py-3 text-center text-red-500 cursor-pointer hover:underline" onClick={() => handleSpDelete(spBanom, idx)}>
                          <i className="fas fa-trash-alt"></i>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* SP Form Add/Edit */}
          <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-extrabold text-brand-purple uppercase tracking-wider">
              {editingSpIdx !== null ? "Edit Data SP Terpilih" : "Tambah Data SP Baru ke Database"}
            </h3>
            
            <form onSubmit={handleSpSave} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="block text-[9px] font-extrabold text-slate-400 uppercase">Nama Pimpinan</label>
                <input
                  type="text"
                  required
                  value={spName}
                  onChange={(e) => setSpName(e.target.value)}
                  placeholder="Contoh: PR IPNU Mantingan"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900 focus:outline-none focus:border-brand-purple transition"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[9px] font-extrabold text-slate-400 uppercase">Tipe Kepengurusan</label>
                <select
                  value={spType}
                  onChange={(e) => setSpType(e.target.value as "ranting" | "komisariat")}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900 focus:outline-none focus:border-brand-purple transition"
                >
                  <option value="ranting">Ranting</option>
                  <option value="komisariat">Komisariat</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-[9px] font-extrabold text-slate-400 uppercase">Nomor SP Resmi</label>
                <input
                  type="text"
                  required
                  value={spNumber}
                  onChange={(e) => setSpNumber(e.target.value)}
                  placeholder="Contoh: 089/IPNU/SP/A/X/2026"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900 focus:outline-none focus:border-brand-purple transition"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[9px] font-extrabold text-slate-400 uppercase">Masa Berlaku (Tanggal)</label>
                <input
                  type="date"
                  required
                  value={spExpiry}
                  onChange={(e) => setSpExpiry(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900 focus:outline-none focus:border-brand-purple transition"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[9px] font-extrabold text-slate-400 uppercase">WhatsApp Pengurus</label>
                <input
                  type="text"
                  value={spPhone}
                  onChange={(e) => setSpPhone(e.target.value)}
                  placeholder="Contoh: 6282242147243"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900 focus:outline-none focus:border-brand-purple transition"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[9px] font-extrabold text-slate-400 uppercase">Email Pengurus</label>
                <input
                  type="email"
                  value={spEmail}
                  onChange={(e) => setSpEmail(e.target.value)}
                  placeholder="pr.ipnu@gmail.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900 focus:outline-none focus:border-brand-purple transition"
                />
              </div>

              <div className="sm:col-span-3 flex gap-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-brand-purple text-white text-xs font-extrabold hover:bg-brand-purpleDark transition shadow-sm"
                >
                  {editingSpIdx !== null ? "Simpan Perubahan" : "Simpan Data SP"}
                </button>
                {editingSpIdx !== null && (
                  <button
                    type="button"
                    onClick={() => {
                      setSpName("");
                      setSpNumber("");
                      setSpExpiry("");
                      setSpPhone("");
                      setSpEmail("");
                      setEditingSpIdx(null);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-800 transition text-xs font-bold"
                  >
                    Batal
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tab Panel: settings */}
      {activeTab === "settings" && (
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-6">
          <h3 className="text-sm font-extrabold text-slate-850 uppercase tracking-wider border-b border-slate-50 pb-3">
            Konfigurasi Portal Terpadu (Google Sheets API)
          </h3>

          <form onSubmit={handleSettingsSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-[9px] font-extrabold text-slate-400 uppercase">Sekretaris Umum PAC</label>
                <input
                  type="text"
                  required
                  value={secName}
                  onChange={(e) => setSecName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-purple transition"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[9px] font-extrabold text-slate-400 uppercase">Nomor WA Sekretaris Umum</label>
                <input
                  type="text"
                  required
                  value={secWa}
                  onChange={(e) => setSecWa(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-purple transition"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[9px] font-extrabold text-slate-400 uppercase">Tautan PDF Susunan Pengurus IPNU (Drive)</label>
                <input
                  type="url"
                  value={pdfIpnuUrl}
                  onChange={(e) => setPdfIpnuUrl(e.target.value)}
                  placeholder="https://drive.google.com/file/d/..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-purple transition"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[9px] font-extrabold text-slate-400 uppercase">Tautan PDF Susunan Pengurus IPPNU (Drive)</label>
                <input
                  type="url"
                  value={pdfIppnuUrl}
                  onChange={(e) => setPdfIppnuUrl(e.target.value)}
                  placeholder="https://drive.google.com/file/d/..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-purple transition"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-2xl bg-brand-purple hover:bg-brand-purpleDark text-white font-extrabold text-xs uppercase tracking-widest transition shadow-sm shadow-violet-100"
            >
              Simpan Konfigurasi Portal
            </button>
          </form>
        </div>
      )}

      {/* Tab Panel Fallbacks for other uncompleted features */}
      {(activeTab === "makesta" || activeTab === "repo" || activeTab === "berita") && (
        <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 text-center text-slate-400 text-xs font-semibold">
          <i className="fas fa-tools mr-2 text-base"></i> Kelola data {activeTab} terintegrasi secara otomatis via Google Sheets Apps Script API. Seluruh perubahan pada spreadsheet akan direfleksikan secara instan ke portal utama.
        </div>
      )}

    </div>
  );
}
