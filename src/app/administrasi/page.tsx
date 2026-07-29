"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/context/AppContext";
import {
  submitSpForm,
  submitUndanganForm,
  submitKaderisasiForm
} from "@/lib/api/client";

export default function AdministrasiPage() {
  const { showToast } = useApp();
  const [activeTab, setActiveTab] = useState<"sp" | "undangan" | "tracking">("sp");
  const [banom, setBanom] = useState<"ipnu" | "ippnu">("ipnu");

  // Form states - SP
  const [spPimpinan, setSpPimpinan] = useState("");
  const [spNoSurat, setSpNoSurat] = useState("");
  const [spTglSurat, setSpTglSurat] = useState("");
  const [spPengirim, setSpPengirim] = useState("");
  const [spWa, setSpWa] = useState("");
  const [spFile1, setSpFile1] = useState<File | null>(null);
  const [spFile2, setSpFile2] = useState<File | null>(null);
  const [submittingSp, setSubmittingSp] = useState(false);

  // Form states - Undangan
  const [undPimpinan, setUndPimpinan] = useState("");
  const [undNoSurat, setUndNoSurat] = useState("");
  const [undPengirim, setUndPengirim] = useState("");
  const [undWa, setUndWa] = useState("");
  const [undAgenda, setUndAgenda] = useState("");
  const [undTempat, setUndTempat] = useState("");
  const [undWaktu, setUndWaktu] = useState("");
  const [undFile, setUndFile] = useState<File | null>(null);
  const [submittingUnd, setSubmittingUnd] = useState(false);

  // Tracking states
  const [trackQuery, setTrackQuery] = useState("");
  const [trackedItem, setTrackedItem] = useState<{
    id: string;
    pimpinan: string;
    tipe: string;
    noSurat: string;
    tanggal: string;
    status: "Draft" | "Diajukan" | "Diverifikasi" | "Perlu Revisi" | "Disetujui" | "Selesai";
    catatan?: string;
    history: { status: string; date: string; note?: string }[];
  } | null>(null);

  // WA Modal Draft states
  const [waModalOpen, setWaModalOpen] = useState(false);
  const [waDraftText, setWaDraftText] = useState("");

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = (reader.result as string).split(",")[1];
        resolve(base64);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!spPimpinan || !spNoSurat || !spTglSurat || !spPengirim || !spWa || !spFile1 || !spFile2) {
      showToast("Gagal Pengajuan", "Lengkapi seluruh isian dan unggah berkas wajib.", "error");
      return;
    }

    try {
      setSubmittingSp(true);
      showToast("Mengunggah Berkas", "Mohon tunggu sebentar, sedang mengirim data...", "info");

      const file1Base64 = await fileToBase64(spFile1);
      const file2Base64 = await fileToBase64(spFile2);

      const payload = {
        banom,
        unitName: spPimpinan,
        spNumber: spNoSurat,
        spDate: spTglSurat,
        senderName: spPengirim,
        senderPhone: spWa,
        fileBerkasName: spFile1.name,
        fileBerkasData: file1Base64,
        fileBerkasType: spFile1.type,
        filePengurusName: spFile2.name,
        filePengurusData: file2Base64,
        filePengurusType: spFile2.type,
      };

      await submitSpForm(payload);

      const draftMsg = `*PENGAJUAN SP BARU (${banom.toUpperCase()})* 📜\n\nAssalamu'alaikum Wr. Wb. Rekan/Rekanita Sekretaris Umum PAC,\n\nTelah masuk pengajuan rekomendasi Surat Pengesahan (SP) baru dari:\n\n🔹 *Pimpinan:* PR/PK ${banom.toUpperCase()} ${spPimpinan}\n🔹 *Nomor Surat:* ${spNoSurat}\n🔹 *Tanggal Surat:* ${spTglSurat}\n🔹 *Pengirim:* ${spPengirim} (${spWa})\n\n*Berkas Terlampir:* \n1. Permohonan: ${spFile1.name}\n2. Susunan Pengurus: ${spFile2.name}\n\nMohon segera diverifikasi berkas fisiknya. Terima kasih!`;
      setWaDraftText(draftMsg);
      setWaModalOpen(true);

      // Reset
      setSpPimpinan("");
      setSpNoSurat("");
      setSpTglSurat("");
      setSpPengirim("");
      setSpWa("");
      setSpFile1(null);
      setSpFile2(null);
    } catch (err) {
      showToast("Gagal Mengirim", "Terjadi kesalahan saat menghubungi server database.", "error");
    } finally {
      setSubmittingSp(false);
    }
  };

  const handleUndanganSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!undPimpinan || !undNoSurat || !undPengirim || !undWa || !undAgenda || !undTempat || !undWaktu || !undFile) {
      showToast("Gagal Pengajuan", "Lengkapi seluruh isian dan unggah berkas surat undangan.", "error");
      return;
    }

    try {
      setSubmittingUnd(true);
      showToast("Mengunggah Berkas", "Mohon tunggu sebentar, sedang mengirim surat undangan...", "info");

      const fileBase64 = await fileToBase64(undFile);

      const payload = {
        pimpinan: undPimpinan,
        nomorSurat: undNoSurat,
        pengirim: undPengirim,
        nohp: undWa,
        agenda: undAgenda,
        tempat: undTempat,
        waktu: undWaktu,
        fileName: undFile.name,
        fileData: fileBase64,
        fileType: undFile.type
      };

      await submitUndanganForm(payload);

      const draftMsg = `*KONFIRMASI UNDANGAN KEGIATAN* ✉️\n\nAssalamu'alaikum Wr. Wb. Rekan/Rekanita Sekretaris Umum PAC,\n\nTelah masuk konfirmasi undangan kegiatan dari pimpinan bawah:\n\n🔹 *Asal Pimpinan:* PR/PK ${undPimpinan}\n🔹 *Nomor Surat:* ${undNoSurat}\n🔹 *Pengirim:* ${undPengirim} (${undWa})\n🔹 *Agenda/Perihal:* ${undAgenda}\n🔹 *Tempat:* ${undTempat}\n🔹 *Waktu:* ${undWaktu}\n\n*Berkas Undangan:* ${undFile.name}\n\nMohon dicatat dalam buku agenda kegiatan kesekretariatan PAC!`;
      setWaDraftText(draftMsg);
      setWaModalOpen(true);

      // Reset
      setUndPimpinan("");
      setUndNoSurat("");
      setUndPengirim("");
      setUndWa("");
      setUndAgenda("");
      setUndTempat("");
      setUndWaktu("");
      setUndFile(null);
    } catch (err) {
      showToast("Gagal Mengirim", "Terjadi kesalahan saat memposting berkas undangan.", "error");
    } finally {
      setSubmittingUnd(false);
    }
  };

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackQuery.trim()) return;

    // Mock tracking query matching pimpinan name or ID
    setTrackedItem({
      id: "REQ-2026-0891",
      pimpinan: trackQuery,
      tipe: "Pengajuan Rekomendasi SP IPNU",
      noSurat: "012/PR/IPNU/VII/2026",
      tanggal: "28 Juli 2026",
      status: "Diverifikasi",
      catatan: "Berkas fisik surat permohonan sedang diteliti keabsahannya oleh Sekretaris PAC.",
      history: [
        { status: "Draft", date: "26 Juli 2026 - 10:00 WIB" },
        { status: "Diajukan", date: "27 Juli 2026 - 14:30 WIB", note: "Surat berhasil masuk ke sistem" },
        { status: "Diverifikasi", date: "28 Juli 2026 - 09:15 WIB", note: "Sedang diproses oleh Departemen Organisasi PAC" }
      ]
    });
    showToast("Hasil Pelacakan", "Status pengajuan berhasil ditemukan.", "success");
  };

  const sendWhatsApp = () => {
    const encoded = encodeURIComponent(waDraftText);
    const num = "6282242147243"; // Default secretary number
    window.open(`https://api.whatsapp.com/send?phone=${num}&text=${encoded}`, "_blank");
    setWaModalOpen(false);
  };

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="space-y-2 border-b border-slate-100 pb-5">
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900">
          Pusat Layanan Administrasi & Persuratan Digital
        </h2>
        <p className="text-xs text-slate-500">
          Kirim pengajuan rekomendasi Surat Pengesahan (SP) Ranting/Komisariat, laporkan undangan kegiatan, dan pantau workflow status pengesahan berkas Anda secara real-time.
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="flex gap-2 border-b border-slate-100 pb-2">
        <button
          onClick={() => setActiveTab("sp")}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition ${
            activeTab === "sp"
              ? "bg-brand-purple text-white shadow-sm"
              : "text-slate-500 hover:text-slate-800 bg-white border border-slate-150"
          }`}
        >
          <i className="fas fa-file-signature mr-1.5"></i> Pengajuan SP Ranting/Komisariat
        </button>
        <button
          onClick={() => setActiveTab("undangan")}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition ${
            activeTab === "undangan"
              ? "bg-brand-purple text-white shadow-sm"
              : "text-slate-500 hover:text-slate-800 bg-white border border-slate-150"
          }`}
        >
          <i className="fas fa-envelope-open-text mr-1.5"></i> Konfirmasi Surat Undangan
        </button>
        <button
          onClick={() => setActiveTab("tracking")}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition ${
            activeTab === "tracking"
              ? "bg-brand-purple text-white shadow-sm"
              : "text-slate-500 hover:text-slate-800 bg-white border border-slate-150"
          }`}
        >
          <i className="fas fa-search-location mr-1.5"></i> Pelacakan Status Berkas
        </button>
      </div>

      {/* Content Panels */}
      {activeTab === "sp" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* SP Form Card */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm lg:col-span-2 space-y-6">
            <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider border-b border-slate-50 pb-3">
              Formulir Rekomendasi SP Baru
            </h3>
            
            <form onSubmit={handleSpSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[9px] font-extrabold text-slate-400 uppercase">Badan Otonom</label>
                  <div className="bg-slate-100 p-1 rounded-xl flex border border-slate-200">
                    <button
                      type="button"
                      onClick={() => setBanom("ipnu")}
                      className={`w-full py-1.5 rounded-lg text-xs font-bold transition ${
                        banom === "ipnu" ? "bg-brand-purple text-white shadow-sm" : "text-slate-500"
                      }`}
                    >
                      IPNU (Pelajar Putra)
                    </button>
                    <button
                      type="button"
                      onClick={() => setBanom("ippnu")}
                      className={`w-full py-1.5 rounded-lg text-xs font-bold transition ${
                        banom === "ippnu" ? "bg-brand-purple text-white shadow-sm" : "text-slate-500"
                      }`}
                    >
                      IPPNU (Pelajar Putri)
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[9px] font-extrabold text-slate-400 uppercase">Nama Ranting/Komisariat</label>
                  <input
                    type="text"
                    required
                    value={spPimpinan}
                    onChange={(e) => setSpPimpinan(e.target.value)}
                    placeholder="Contoh: Mantingan, SMK NU, dll."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-purple transition"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[9px] font-extrabold text-slate-400 uppercase">Nomor Surat Permohonan</label>
                  <input
                    type="text"
                    required
                    value={spNoSurat}
                    onChange={(e) => setSpNoSurat(e.target.value)}
                    placeholder="Contoh: 01/PR/IPNU/VIII/2026"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-purple transition"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[9px] font-extrabold text-slate-400 uppercase">Tanggal Surat</label>
                  <input
                    type="date"
                    required
                    value={spTglSurat}
                    onChange={(e) => setSpTglSurat(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-purple transition"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[9px] font-extrabold text-slate-400 uppercase">Nama Lengkap Pengirim</label>
                  <input
                    type="text"
                    required
                    value={spPengirim}
                    onChange={(e) => setSpPengirim(e.target.value)}
                    placeholder="Masukkan nama lengkap Anda..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-purple transition"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[9px] font-extrabold text-slate-400 uppercase">WhatsApp Pengirim (Awalan 62)</label>
                  <input
                    type="text"
                    required
                    value={spWa}
                    onChange={(e) => setSpWa(e.target.value)}
                    placeholder="Contoh: 6282242147243"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-purple transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-50 pt-4">
                <div className="space-y-1">
                  <label className="block text-[9px] font-extrabold text-slate-400 uppercase">Berkas Surat Permohonan (PDF)</label>
                  <input
                    type="file"
                    required
                    accept="application/pdf"
                    onChange={(e) => setSpFile1(e.target.files ? e.target.files[0] : null)}
                    className="w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-violet-50 file:text-brand-purple hover:file:bg-violet-100"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[9px] font-extrabold text-slate-400 uppercase">Susunan Pengurus (PDF/Word)</label>
                  <input
                    type="file"
                    required
                    accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={(e) => setSpFile2(e.target.files ? e.target.files[0] : null)}
                    className="w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-violet-50 file:text-brand-purple hover:file:bg-violet-100"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submittingSp}
                className="w-full py-3.5 rounded-2xl bg-brand-purple hover:bg-brand-purpleDark text-white font-extrabold text-xs uppercase tracking-widest transition duration-300 shadow-sm shadow-violet-100 flex items-center justify-center gap-2"
              >
                {submittingSp ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> Memproses Pengajuan...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane"></i> Kirim Berkas Pengajuan SP
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Sekretaris WhatsApp Card */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4 self-start">
            <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Kontak Person Sekretaris PAC</h4>
            <div className="space-y-3">
              <a
                href="https://wa.me/62895395236035"
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-brand-purple/40 hover:shadow-sm transition flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-violet-50 text-brand-purple flex items-center justify-center text-base">
                    <i className="fab fa-whatsapp"></i>
                  </div>
                  <div>
                    <span className="block text-xs font-extrabold text-slate-800">Rekan Wafa</span>
                    <span className="block text-[10px] text-slate-500">Sekretaris IPNU PAC Tahunan</span>
                  </div>
                </div>
                <i className="fas fa-arrow-right text-[10px] text-slate-450 group-hover:translate-x-0.5 transition-transform"></i>
              </a>

              <a
                href="https://wa.me/62895326847883"
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-brand-purple/40 hover:shadow-sm transition flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-violet-50 text-brand-purple flex items-center justify-center text-base">
                    <i className="fab fa-whatsapp"></i>
                  </div>
                  <div>
                    <span className="block text-xs font-extrabold text-slate-800">Rekanita Sasa</span>
                    <span className="block text-[10px] text-slate-500">Sekretaris IPPNU PAC Tahunan</span>
                  </div>
                </div>
                <i className="fas fa-arrow-right text-[10px] text-slate-450 group-hover:translate-x-0.5 transition-transform"></i>
              </a>
            </div>
          </div>
        </div>
      )}

      {activeTab === "undangan" && (
        <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm max-w-3xl mx-auto space-y-6">
          <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider border-b border-slate-50 pb-3">
            Formulir Konfirmasi Undangan Kegiatan
          </h3>

          <form onSubmit={handleUndanganSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-[9px] font-extrabold text-slate-400 uppercase">Nama Ranting/Komisariat Asal</label>
                <input
                  type="text"
                  required
                  value={undPimpinan}
                  onChange={(e) => setUndPimpinan(e.target.value)}
                  placeholder="Contoh: PR Desa Mantingan"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-purple transition"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[9px] font-extrabold text-slate-400 uppercase">Nomor Surat Undangan</label>
                <input
                  type="text"
                  required
                  value={undNoSurat}
                  onChange={(e) => setUndNoSurat(e.target.value)}
                  placeholder="Contoh: 10/PR/IPNU-IPPNU/VIII/2026"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-purple transition"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[9px] font-extrabold text-slate-400 uppercase">Nama Pengirim Undangan</label>
                <input
                  type="text"
                  required
                  value={undPengirim}
                  onChange={(e) => setUndPengirim(e.target.value)}
                  placeholder="Nama sekretaris/panitia..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-purple transition"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[9px] font-extrabold text-slate-400 uppercase">WhatsApp Pengirim (Awalan 62)</label>
                <input
                  type="text"
                  required
                  value={undWa}
                  onChange={(e) => setUndWa(e.target.value)}
                  placeholder="Contoh: 628123456789"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-purple transition"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="block text-[9px] font-extrabold text-slate-400 uppercase">Agenda / Perihal Acara</label>
                <input
                  type="text"
                  required
                  value={undAgenda}
                  onChange={(e) => setUndAgenda(e.target.value)}
                  placeholder="Contoh: Pelantikan Pengurus / Rapat Anggota Ranting"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-purple transition"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[9px] font-extrabold text-slate-400 uppercase">Tempat / Lokasi Acara</label>
                <input
                  type="text"
                  required
                  value={undTempat}
                  onChange={(e) => setUndTempat(e.target.value)}
                  placeholder="Contoh: Balai Desa Mantingan"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-purple transition"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[9px] font-extrabold text-slate-400 uppercase">Waktu Pelaksanaan (Hari/Tanggal/Jam)</label>
                <input
                  type="text"
                  required
                  value={undWaktu}
                  onChange={(e) => setUndWaktu(e.target.value)}
                  placeholder="Contoh: Ahad, 16 Agustus 2026 | 08:00 WIB"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-purple transition"
                />
              </div>
            </div>

            <div className="space-y-1 pt-2">
              <label className="block text-[9px] font-extrabold text-slate-400 uppercase">Unggah Berkas Fisik Undangan (PDF)</label>
              <input
                type="file"
                required
                accept="application/pdf"
                onChange={(e) => setUndFile(e.target.files ? e.target.files[0] : null)}
                className="w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-violet-50 file:text-brand-purple hover:file:bg-violet-100"
              />
            </div>

            <button
              type="submit"
              disabled={submittingUnd}
              className="w-full py-3.5 rounded-2xl bg-brand-purple hover:bg-brand-purpleDark text-white font-extrabold text-xs uppercase tracking-widest transition duration-300 shadow-sm shadow-violet-100 flex items-center justify-center gap-2"
            >
              {submittingUnd ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Mengunggah Undangan...
                </>
              ) : (
                <>
                  <i className="fas fa-paper-plane"></i> Kirim Surat Undangan
                </>
              )}
            </button>
          </form>
        </div>
      )}

      {activeTab === "tracking" && (
        <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm max-w-3xl mx-auto space-y-6">
          <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider border-b border-slate-50 pb-3">
            Lacak Status Pengajuan Administrasi
          </h3>

          <form onSubmit={handleTrackSubmit} className="flex gap-2">
            <input
              type="text"
              required
              value={trackQuery}
              onChange={(e) => setTrackQuery(e.target.value)}
              placeholder="Masukkan nama ranting (cth: Mantingan)..."
              className="flex-grow bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-purple transition"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-brand-purple hover:bg-brand-purpleDark text-white font-extrabold text-xs uppercase tracking-wider transition"
            >
              Lacak Berkas
            </button>
          </form>

          {trackedItem && (
            <div className="space-y-6 pt-4 border-t border-slate-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-slate-500">
                <p><span className="text-slate-400">Pimpinan:</span> {trackedItem.pimpinan}</p>
                <p><span className="text-slate-400">Jenis Layanan:</span> {trackedItem.tipe}</p>
                <p><span className="text-slate-400">Nomor Surat:</span> {trackedItem.noSurat}</p>
                <p><span className="text-slate-400">Tanggal Pengajuan:</span> {trackedItem.tanggal}</p>
              </div>

              {/* Progress Timeline */}
              <div className="space-y-3">
                <span className="block text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">Workflow Status</span>
                
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {["Draft", "Diajukan", "Diverifikasi", "Perlu Revisi", "Disetujui", "Selesai"].map((step, idx) => {
                    const steps = ["Draft", "Diajukan", "Diverifikasi", "Perlu Revisi", "Disetujui", "Selesai"];
                    const currentIdx = steps.indexOf(trackedItem.status);
                    const stepIdx = steps.indexOf(step);
                    const isCompleted = stepIdx <= currentIdx;

                    return (
                      <div key={step} className="flex items-center gap-2">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          isCompleted ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-500"
                        }`}>
                          {stepIdx + 1}
                        </span>
                        <span className={`text-[10px] font-bold uppercase ${
                          isCompleted ? "text-emerald-600" : "text-slate-400"
                        }`}>
                          {step}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* History list */}
              <div className="space-y-3 pt-2">
                <span className="block text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">Riwayat Catatan Verifikator</span>
                <div className="relative border-l-2 border-slate-100 pl-6 ml-3 space-y-4">
                  {trackedItem.history.map((hist, idx) => (
                    <div key={idx} className="relative">
                      <span className="absolute -left-[30px] top-0.5 w-4 h-4 rounded-full bg-slate-200 border-2 border-white"></span>
                      <div className="text-xs space-y-0.5">
                        <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">{hist.date}</span>
                        <p className="font-extrabold text-slate-800">Status: {hist.status}</p>
                        {hist.note && <p className="text-slate-500 font-medium">{hist.note}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* WA Draft Modal */}
      {waModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs uppercase tracking-widest font-extrabold text-brand-purple flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Notifikasi Siap Dikirim
              </span>
              <button onClick={() => setWaModalOpen(false)} className="text-slate-400 hover:text-slate-650 transition">
                <i className="fas fa-times text-lg"></i>
              </button>
            </div>

            <div className="space-y-2">
              <h4 className="font-black text-base sm:text-lg text-slate-900">Form Pengajuan Berhasil Diproses!</h4>
              <p className="text-xs text-slate-500">
                Surat/Berkas berhasil diupload ke Google Drive organisasi. Silakan klik tombol di bawah ini untuk mengarahkan pesan draf WhatsApp otomatis ke Sekretaris Umum PAC Tahunan:
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700 leading-relaxed max-h-48 overflow-y-auto">
              <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-400 block border-b border-slate-150 pb-1 mb-2">
                Draft Pesan WhatsApp:
              </span>
              <p className="whitespace-pre-line text-slate-700 font-semibold">{waDraftText}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <button
                onClick={() => setWaModalOpen(false)}
                className="w-full py-2.5 rounded-xl bg-slate-100 text-slate-500 font-bold text-xs hover:text-slate-800 transition uppercase tracking-wider"
              >
                Tutup
              </button>
              <button
                onClick={sendWhatsApp}
                className="w-full py-2.5 rounded-xl bg-emerald-500 text-white font-black text-xs hover:bg-emerald-600 transition uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm shadow-emerald-100"
              >
                <i className="fab fa-whatsapp text-sm"></i> Kirim Ke WA Sekretaris
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
