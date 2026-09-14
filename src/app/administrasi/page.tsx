"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/context/AppContext";
import {
  submitSpForm,
  submitUndanganForm,
} from "@/lib/api/client";

export default function AdministrasiPage() {
  const { showToast } = useApp();
  const [activeTab, setActiveTab] = useState<"sp" | "undangan" | "tracking">("sp");
  const [banom, setBanom] = useState<"ipnu" | "ippnu">("ipnu");

  // Multi-step state for SP
  const [spStep, setSpStep] = useState<1 | 2>(1);

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

  const rantingQuickList = ["Mantingan", "Tahunan", "Krapyak", "Senenan", "Demangan", "Tegalsambi"];

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

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!spPimpinan.trim() || !spNoSurat.trim() || !spTglSurat || !spPengirim.trim() || !spWa.trim()) {
      showToast("Data Belum Lengkap", "Mohon isi semua data surat dan identitas pengirim.", "error");
      return;
    }
    setSpStep(2);
  };

  const handleSpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!spFile1 || !spFile2) {
      showToast("Berkas Belum Diunggah", "Unggah surat permohonan dan susunan pengurus.", "error");
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
      setSpStep(1);
      setSpPimpinan("");
      setSpNoSurat("");
      setSpTglSurat("");
      setSpPengirim("");
      setSpWa("");
      setSpFile1(null);
      setSpFile2(null);
    } catch {
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
    } catch {
      showToast("Gagal Mengirim", "Gagal mengunggah berkas surat undangan.", "error");
    } finally {
      setSubmittingUnd(false);
    }
  };

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    doSearchTrack(trackQuery);
  };

  const doSearchTrack = (q: string) => {
    if (!q.trim()) return;

    // Mock tracking result
    setTrackedItem({
      id: `TRK-${Math.floor(1000 + Math.random() * 9000)}`,
      pimpinan: `PR IPNU ${q.trim()}`,
      tipe: "Rekomendasi Surat Pengesahan (SP)",
      noSurat: "03/PR/IPNU/VII/2026",
      tanggal: "12 Agustus 2026",
      status: "Diverifikasi",
      catatan: "Berkas susunan pengurus telah lengkap, sedang menunggu penomoran rekomendasi PAC.",
      history: [
        { status: "Draft", date: "12 Ags 2026, 09:30", note: "Formulir online dibuat oleh pengirim." },
        { status: "Diajukan", date: "12 Ags 2026, 10:15", note: "Berkas digital berhasil diunggah ke Google Drive." },
        { status: "Diverifikasi", date: "13 Ags 2026, 14:00", note: "Berkas diverifikasi oleh Sekretaris PAC." }
      ]
    });
  };

  const sendWhatsApp = () => {
    const waUrl = `https://wa.me/6282242147243?text=${encodeURIComponent(waDraftText)}`;
    window.open(waUrl, "_blank");
    setWaModalOpen(false);
  };

  return (
    <div className="py-6 sm:py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      
      {/* ─── Tab Switcher ────────────────────────────────────────────────────── */}
      <div className="flex gap-2 border-b border-slate-150 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab("sp")}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition flex-shrink-0 ${
            activeTab === "sp"
              ? "bg-brand-purple text-white shadow-sm"
              : "text-slate-500 hover:text-slate-800 bg-white border border-slate-150"
          }`}
        >
          <i className="fas fa-file-signature mr-1.5"></i> Pengajuan Rekomendasi SP
        </button>
        <button
          onClick={() => setActiveTab("undangan")}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition flex-shrink-0 ${
            activeTab === "undangan"
              ? "bg-brand-purple text-white shadow-sm"
              : "text-slate-500 hover:text-slate-800 bg-white border border-slate-150"
          }`}
        >
          <i className="fas fa-envelope-open-text mr-1.5"></i> Konfirmasi Undangan
        </button>
        <button
          onClick={() => setActiveTab("tracking")}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition flex-shrink-0 ${
            activeTab === "tracking"
              ? "bg-brand-purple text-white shadow-sm"
              : "text-slate-500 hover:text-slate-800 bg-white border border-slate-150"
          }`}
        >
          <i className="fas fa-search-location mr-1.5"></i> Pelacakan Status Berkas
        </button>
      </div>

      {/* ─── Content Tab 1: SP Multi-Step Wizard ──────────────────────────────── */}
      {activeTab === "sp" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* SP Form Card */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm lg:col-span-2 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-50 pb-4">
              <div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                  Formulir Rekomendasi SP Baru
                </h3>
                <p className="text-[11px] text-slate-400">Pengajuan Surat Pengesahan tingkat Ranting dan Komisariat</p>
              </div>

              {/* Wizard Step Indicators */}
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider transition ${
                  spStep === 1
                    ? "bg-violet-100 text-brand-purple border border-violet-200"
                    : "bg-slate-100 text-slate-500"
                }`}>
                  1. Data Surat
                </span>
                <i className="fas fa-chevron-right text-[9px] text-slate-300"></i>
                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider transition ${
                  spStep === 2
                    ? "bg-violet-100 text-brand-purple border border-violet-200"
                    : "bg-slate-100 text-slate-400"
                }`}>
                  2. Berkas Persyaratan
                </span>
              </div>
            </div>

            {/* STEP 1: Data Surat & Identitas */}
            {spStep === 1 && (
              <form onSubmit={handleNextStep} className="space-y-4">
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
                          banom === "ippnu" ? "bg-emerald-600 text-white shadow-sm" : "text-slate-500"
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
                      placeholder="Contoh: Mantingan / SMK NU"
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
                      placeholder="Nama ketua / sekretaris..."
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

                <div className="pt-3">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-2xl bg-brand-purple hover:bg-brand-purpleDark text-white font-black text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-sm"
                  >
                    Lanjutkan ke Unggah Berkas &rarr;
                  </button>
                </div>
              </form>
            )}

            {/* STEP 2: Unggah Berkas Persyaratan */}
            {spStep === 2 && (
              <form onSubmit={handleSpSubmit} className="space-y-5">
                {/* Summary Pill */}
                <div className="p-3.5 bg-violet-50/60 border border-violet-100 rounded-2xl flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div>
                    <span className="font-extrabold text-brand-purple">PR/PK {banom.toUpperCase()} {spPimpinan}</span>
                    <span className="text-slate-400 text-[11px] block">{spNoSurat} &bull; {spPengirim}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSpStep(1)}
                    className="text-[11px] font-bold text-brand-purple underline hover:text-brand-purpleDark"
                  >
                    Ubah Data Surat
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[9px] font-extrabold text-slate-400 uppercase">Berkas Surat Permohonan (PDF)</label>
                    <input
                      type="file"
                      required
                      accept="application/pdf"
                      onChange={(e) => setSpFile1(e.target.files ? e.target.files[0] : null)}
                      className="w-full text-xs text-slate-400 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-violet-50 file:text-brand-purple hover:file:bg-violet-100"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[9px] font-extrabold text-slate-400 uppercase">Susunan Pengurus / Berita Acara</label>
                    <input
                      type="file"
                      required
                      accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={(e) => setSpFile2(e.target.files ? e.target.files[0] : null)}
                      className="w-full text-xs text-slate-400 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-violet-50 file:text-brand-purple hover:file:bg-violet-100"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setSpStep(1)}
                    className="w-1/3 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs transition"
                  >
                    &larr; Kembali
                  </button>
                  <button
                    type="submit"
                    disabled={submittingSp}
                    className="w-2/3 py-3 rounded-2xl bg-brand-purple hover:bg-brand-purpleDark text-white font-black text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-sm"
                  >
                    {submittingSp ? (
                      <>
                        <i className="fas fa-spinner fa-spin"></i> Mengirim Berkas...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane"></i> Kirim Berkas Pengajuan SP
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
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
                <i className="fas fa-arrow-right text-[10px] text-slate-400 group-hover:translate-x-0.5 transition-transform"></i>
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
                <i className="fas fa-arrow-right text-[10px] text-slate-400 group-hover:translate-x-0.5 transition-transform"></i>
              </a>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl text-[11px] text-slate-400 space-y-1">
              <span className="font-bold text-slate-600 block">Catatan Pelayanan:</span>
              <p>Pastikan berkas permohonan telah ditandatangani oleh Ketua & Sekretaris pimpinan terkait.</p>
            </div>
          </div>
        </div>
      )}

      {/* ─── Content Tab 2: Undangan ─────────────────────────────────────────── */}
      {activeTab === "undangan" && (
        <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm max-w-3xl mx-auto space-y-6">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider border-b border-slate-50 pb-3">
            Formulir Konfirmasi Surat Undangan Kegiatan
          </h3>

          <form onSubmit={handleUndanganSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-[9px] font-extrabold text-slate-400 uppercase">Pimpinan Penyelenggara</label>
                <input
                  type="text"
                  required
                  value={undPimpinan}
                  onChange={(e) => setUndPimpinan(e.target.value)}
                  placeholder="Contoh: PR Krapyak"
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
                  placeholder="Contoh: 12/UND/PR/VIII/2026"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-purple transition"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[9px] font-extrabold text-slate-400 uppercase">Nama Pengirim Surat</label>
                <input
                  type="text"
                  required
                  value={undPengirim}
                  onChange={(e) => setUndPengirim(e.target.value)}
                  placeholder="Nama pengirim..."
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
                  placeholder="Contoh: Balai Desa Krapyak"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-purple transition"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[9px] font-extrabold text-slate-400 uppercase">Waktu Pelaksanaan</label>
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
              <label className="block text-[9px] font-extrabold text-slate-400 uppercase">Unggah Berkas Undangan (PDF)</label>
              <input
                type="file"
                required
                accept="application/pdf"
                onChange={(e) => setUndFile(e.target.files ? e.target.files[0] : null)}
                className="w-full text-xs text-slate-400 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-violet-50 file:text-brand-purple hover:file:bg-violet-100"
              />
            </div>

            <button
              type="submit"
              disabled={submittingUnd}
              className="w-full py-3 rounded-2xl bg-brand-purple hover:bg-brand-purpleDark text-white font-black text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-sm"
            >
              {submittingUnd ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Mengirim Undangan...
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

      {/* ─── Content Tab 3: Pelacakan Status Berkas ───────────────────────────── */}
      {activeTab === "tracking" && (
        <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm max-w-3xl mx-auto space-y-6">
          <div className="space-y-1 border-b border-slate-50 pb-3">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
              Pelacakan Status Berkas Pengajuan
            </h3>
            <p className="text-[11px] text-slate-400">Pantau proses pengesahan rekomendasi SP atau surat masuk secara real-time</p>
          </div>

          <form onSubmit={handleTrackSubmit} className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                required
                value={trackQuery}
                onChange={(e) => setTrackQuery(e.target.value)}
                placeholder="Ketik nama ranting (cth: Mantingan, Krapyak, dll.)..."
                className="flex-grow bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-purple transition"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-brand-purple hover:bg-brand-purpleDark text-white font-black text-xs uppercase tracking-wider transition"
              >
                Lacak
              </button>
            </div>

            {/* Quick Suggestions */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] text-slate-400 font-semibold">Cari cepat:</span>
              {rantingQuickList.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => {
                    setTrackQuery(r);
                    doSearchTrack(r);
                  }}
                  className="px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-violet-50 text-[10px] font-bold text-slate-600 hover:text-brand-purple transition"
                >
                  PR {r}
                </button>
              ))}
            </div>
          </form>

          {trackedItem && (
            <div className="space-y-6 pt-4 border-t border-slate-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
                <p><span className="text-slate-400 font-semibold">Pimpinan:</span> <span className="font-bold text-slate-900">{trackedItem.pimpinan}</span></p>
                <p><span className="text-slate-400 font-semibold">Layanan:</span> <span className="font-bold text-slate-900">{trackedItem.tipe}</span></p>
                <p><span className="text-slate-400 font-semibold">No. Surat:</span> <span className="font-mono text-slate-600">{trackedItem.noSurat}</span></p>
                <p><span className="text-slate-400 font-semibold">Tanggal:</span> <span className="font-medium text-slate-700">{trackedItem.tanggal}</span></p>
              </div>

              {/* Progress Timeline */}
              <div className="space-y-2">
                <span className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">Tahapan Status</span>
                
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  {["Draft", "Diajukan", "Diverifikasi", "Disetujui", "Selesai"].map((step, idx) => {
                    const steps = ["Draft", "Diajukan", "Diverifikasi", "Disetujui", "Selesai"];
                    const currentIdx = steps.indexOf(trackedItem.status);
                    const stepIdx = steps.indexOf(step);
                    const isCompleted = stepIdx <= currentIdx;

                    return (
                      <div key={step} className="flex items-center gap-1.5 p-1">
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black ${
                          isCompleted ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-400"
                        }`}>
                          {isCompleted ? "✓" : idx + 1}
                        </span>
                        <span className={`text-[10px] font-bold ${
                          isCompleted ? "text-emerald-700 font-black" : "text-slate-400"
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
                <span className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">Catatan Verifikator</span>
                <div className="relative border-l-2 border-slate-100 pl-5 ml-2 space-y-3">
                  {trackedItem.history.map((hist, idx) => (
                    <div key={idx} className="relative">
                      <span className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-violet-400 border-2 border-white"></span>
                      <div className="text-xs space-y-0.5">
                        <span className="block text-[9px] font-bold text-slate-400">{hist.date}</span>
                        <p className="font-black text-slate-800">Status: {hist.status}</p>
                        {hist.note && <p className="text-slate-500 text-[11px] font-medium">{hist.note}</p>}
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
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Berkas Terkirim
              </span>
              <button onClick={() => setWaModalOpen(false)} className="text-slate-400 hover:text-slate-650 transition">
                <i className="fas fa-times text-base"></i>
              </button>
            </div>

            <div className="space-y-1">
              <h4 className="font-black text-base text-slate-900">Pengajuan Berhasil Disimpan!</h4>
              <p className="text-xs text-slate-500">
                Data telah tersimpan di sistem. Tekan tombol di bawah untuk membuka WhatsApp Sekretaris PAC Tahunan:
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700 leading-relaxed max-h-40 overflow-y-auto">
              <p className="whitespace-pre-line text-slate-700 font-semibold">{waDraftText}</p>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setWaModalOpen(false)}
                className="w-1/3 py-2.5 rounded-xl bg-slate-100 text-slate-600 font-bold text-xs hover:bg-slate-200 transition"
              >
                Tutup
              </button>
              <button
                onClick={sendWhatsApp}
                className="w-2/3 py-2.5 rounded-xl bg-emerald-600 text-white font-black text-xs hover:bg-emerald-700 transition flex items-center justify-center gap-1.5 shadow-sm"
              >
                <i className="fab fa-whatsapp text-sm"></i> Kirim WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
