"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/context/AppContext";
import {
  SpItem,
  MakestaItem,
  MakestaDetail,
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
  const { user, logout, showToast, appData, dataLoading, refreshData } = useApp();
  
  // Tab control
  const [activeTab, setActiveTab] = useState<"sp" | "makesta" | "repo" | "berita" | "settings">("sp");

  // Database lists
  const [spIpnu, setSpIpnu] = useState<SpItem[]>([]);
  const [spIppnu, setSpIppnu] = useState<SpItem[]>([]);
  const [makestaList, setMakestaList] = useState<MakestaItem[]>([]);
  const [repoList, setRepoList] = useState<RepoItem[]>([]);
  const [beritaList, setBeritaList] = useState<BeritaItem[]>([]);

  // Search queries per tab
  const [spSearch, setSpSearch] = useState("");
  const [makestaSearch, setMakestaSearch] = useState("");
  const [repoSearch, setRepoSearch] = useState("");
  const [beritaSearch, setBeritaSearch] = useState("");

  // Modal State for SP
  const [spModalOpen, setSpModalOpen] = useState(false);
  const [spBanom, setSpBanom] = useState<"ipnu" | "ippnu">("ipnu");
  const [spName, setSpName] = useState("");
  const [spType, setSpType] = useState<"ranting" | "komisariat">("ranting");
  const [spNumber, setSpNumber] = useState("");
  const [spExpiry, setSpExpiry] = useState("");
  const [spPhone, setSpPhone] = useState("");
  const [spEmail, setSpEmail] = useState("");
  const [editingSpIdx, setEditingSpIdx] = useState<number | null>(null);

  // Modal State for Makesta
  const [makestaModalOpen, setMakestaModalOpen] = useState(false);
  const [makestaPenyelenggara, setMakestaPenyelenggara] = useState("");
  const [makestaTanggal, setMakestaTanggal] = useState("");
  const [makestaTempat, setMakestaTempat] = useState("");
  const [makestaPeserta, setMakestaPeserta] = useState<number>(30);
  const [editingMakestaIdx, setEditingMakestaIdx] = useState<number | null>(null);

  // Modal State for Repo
  const [repoModalOpen, setRepoModalOpen] = useState(false);
  const [repoTitle, setRepoTitle] = useState("");
  const [repoDesc, setRepoDesc] = useState("");
  const [repoCategory, setRepoCategory] = useState("buku");
  const [repoDriveId, setRepoDriveId] = useState("");
  const [editingRepoIdx, setEditingRepoIdx] = useState<number | null>(null);

  // Modal State for Berita
  const [beritaModalOpen, setBeritaModalOpen] = useState(false);
  const [beritaTitle, setBeritaTitle] = useState("");
  const [beritaCategory, setBeritaCategory] = useState<"kegiatan" | "info" | "pengumuman" | "opini">("kegiatan");
  const [beritaAuthor, setBeritaAuthor] = useState("Tim Media PAC");
  const [beritaDate, setBeritaDate] = useState("");
  const [beritaExcerpt, setBeritaExcerpt] = useState("");
  const [beritaContent, setBeritaContent] = useState("");
  const [beritaCoverImage, setBeritaCoverImage] = useState("/assets/images/cover-modul.png");
  const [beritaCaption, setBeritaCaption] = useState("");
  const [beritaTags, setBeritaTags] = useState("");
  const [beritaStatus, setBeritaStatus] = useState<"published" | "draft">("published");
  const [beritaFileData, setBeritaFileData] = useState("");
  const [beritaFileName, setBeritaFileName] = useState("");
  const [beritaFileType, setBeritaFileType] = useState("");
  const [editingBeritaIdx, setEditingBeritaIdx] = useState<number | null>(null);
  const [isSubmittingBerita, setIsSubmittingBerita] = useState(false);

  // Settings Configuration states
  const [secName, setSecName] = useState("Rekanita Erna Kumala");
  const [secWa, setSecWa] = useState("6282242147243");
  const [pdfIpnuUrl, setPdfIpnuUrl] = useState("");
  const [pdfIppnuUrl, setPdfIppnuUrl] = useState("");

  const localPin = "admin1234";

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

    if (dataLoading) return;

    setSpIpnu(appData.ipnu || []);
    setSpIppnu(appData.ippnu || []);
    setMakestaList(appData.makesta || []);
    setBeritaList(appData.berita || []);
    setRepoList(appData.repository && appData.repository.length > 0 ? appData.repository : [
      { id: "1", title: "Buku Pedoman Kaderisasi IPNU IPPNU", description: "Buku panduan kurikulum kaderisasi formal Makesta & Lakmud.", category: "buku", driveId: "1AQ00D1srOr53Jjf5w377NkFgLD5V-8e2", coverImage: "/assets/images/cover-modul.png" },
      { id: "2", title: "AD / ART Hasil Kongres Terbaru", description: "Landasan konstitusional organisasi tingkat nasional.", category: "buku", driveId: "1B0ci-oiR9-izbp-sn0Zhy_sQJ8hRuoqC", coverImage: "/assets/images/logo-bersama.png" }
    ]);

    if (appData.settings) {
      if (appData.settings.pdfIpnuUrl) setPdfIpnuUrl(appData.settings.pdfIpnuUrl);
      if (appData.settings.pdfIppnuUrl) setPdfIppnuUrl(appData.settings.pdfIppnuUrl);
    }
  }, [user, router, appData, dataLoading]);

  // ─── SP Actions ─────────────────────────────────────────────────────────────
  const openAddSpModal = () => {
    setSpName("");
    setSpType("ranting");
    setSpNumber("");
    setSpExpiry("");
    setSpPhone("");
    setSpEmail("");
    setEditingSpIdx(null);
    setSpModalOpen(true);
  };

  const openEditSpModal = (item: SpItem, idx: number) => {
    setSpName(item.name);
    setSpType(item.type);
    setSpNumber(item.spNumber);
    setSpExpiry(item.expiryDate);
    setSpPhone(item.phone || "");
    setSpEmail(item.email || "");
    setEditingSpIdx(idx);
    setSpModalOpen(true);
  };

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
        showToast("SP Berhasil Diperbarui", "Data berhasil diperbarui di database.", "success");
      } else {
        await adminAddSp(spBanom, newItem, localPin);
        if (spBanom === "ipnu") setSpIpnu([...spIpnu, newItem]);
        else setSpIppnu([...spIppnu, newItem]);
        showToast("SP Berhasil Ditambahkan", "Data berhasil ditambahkan ke database.", "success");
      }
      setSpModalOpen(false);
      refreshData();
    } catch {
      showToast("Gagal Menyimpan", "Terjadi kesalahan pada backend API.", "error");
    }
  };

  const handleSpDelete = async (banom: "ipnu" | "ippnu", index: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus data SP ini?")) return;
    try {
      showToast("Menghapus Data", "Sedang menghapus...", "info");
      await adminDeleteSp(banom, index, localPin);
      if (banom === "ipnu") {
        setSpIpnu(spIpnu.filter((_, idx) => idx !== index));
      } else {
        setSpIppnu(spIppnu.filter((_, idx) => idx !== index));
      }
      showToast("Data Dihapus", "SP berhasil dihapus secara permanen.", "success");
      refreshData();
    } catch {
      showToast("Gagal Menghapus", "Kesalahan koneksi database.", "error");
    }
  };

  // ─── Makesta Actions ────────────────────────────────────────────────────────
  const openAddMakestaModal = () => {
    setMakestaPenyelenggara("");
    setMakestaTanggal("");
    setMakestaTempat("");
    setMakestaPeserta(30);
    setEditingMakestaIdx(null);
    setMakestaModalOpen(true);
  };

  const openEditMakestaModal = (item: MakestaItem, idx: number) => {
    setMakestaPenyelenggara(item.penyelenggara);
    setMakestaTanggal(item.tanggal);
    setMakestaTempat(item.tempat);
    setMakestaPeserta(item.peserta || 0);
    setEditingMakestaIdx(idx);
    setMakestaModalOpen(true);
  };

  const handleMakestaSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!makestaPenyelenggara || !makestaTanggal) return;

    const detail: MakestaDetail = {
      penyelenggara: makestaPenyelenggara,
      tanggal: makestaTanggal,
      tempat: makestaTempat,
      peserta: Number(makestaPeserta)
    };
    const emptyDetail: MakestaDetail = {
      penyelenggara: makestaPenyelenggara,
      tanggal: "",
      tempat: "",
      peserta: 0
    };

    const newItem: MakestaItem = {
      penyelenggara: makestaPenyelenggara,
      tanggal: makestaTanggal,
      tempat: makestaTempat,
      peserta: Number(makestaPeserta),
      praMakesta: emptyDetail,
      makesta: detail,
      rtl: [emptyDetail, emptyDetail, emptyDetail]
    };

    try {
      showToast("Menyimpan Makesta", "Memproses penyimpanan...", "info");
      if (editingMakestaIdx !== null) {
        await adminUpdateMakesta(editingMakestaIdx, newItem, localPin);
        const list = [...makestaList];
        list[editingMakestaIdx] = newItem;
        setMakestaList(list);
        showToast("Makesta Diperbarui", "Data berhasil disimpan.", "success");
      } else {
        await adminAddMakesta(newItem, localPin);
        setMakestaList([...makestaList, newItem]);
        showToast("Makesta Ditambahkan", "Data berhasil direkam.", "success");
      }
      setMakestaModalOpen(false);
      refreshData();
    } catch {
      showToast("Gagal Menyimpan", "Terjadi kesalahan.", "error");
    }
  };

  const handleMakestaDelete = async (index: number) => {
    if (!confirm("Hapus catatan Makesta ini?")) return;
    try {
      showToast("Menghapus...", "Sedang memproses...", "info");
      await adminDeleteMakesta(index, localPin);
      setMakestaList(makestaList.filter((_, idx) => idx !== index));
      showToast("Berhasil Dihapus", "Catatan Makesta telah dihapus.", "success");
      refreshData();
    } catch {
      showToast("Gagal Menghapus", "Terjadi kesalahan.", "error");
    }
  };

  // ─── Repo Actions ───────────────────────────────────────────────────────────
  const openAddRepoModal = () => {
    setRepoTitle("");
    setRepoDesc("");
    setRepoCategory("buku");
    setRepoDriveId("");
    setEditingRepoIdx(null);
    setRepoModalOpen(true);
  };

  const openEditRepoModal = (item: RepoItem, idx: number) => {
    setRepoTitle(item.title);
    setRepoDesc(item.description);
    setRepoCategory(item.category);
    setRepoDriveId(item.driveId);
    setEditingRepoIdx(idx);
    setRepoModalOpen(true);
  };

  const handleRepoSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!repoTitle || !repoDriveId) return;

    const newItem: RepoItem = {
      id: editingRepoIdx !== null ? repoList[editingRepoIdx].id : `doc-${Date.now()}`,
      title: repoTitle,
      description: repoDesc,
      category: repoCategory as "buku" | "modul" | "surat",
      driveId: repoDriveId,
      coverImage: "/assets/images/cover-modul.png"
    };

    try {
      showToast("Menyimpan Dokumen", "Memproses...", "info");
      if (editingRepoIdx !== null) {
        await adminUpdateRepo(editingRepoIdx, newItem, localPin);
        const list = [...repoList];
        list[editingRepoIdx] = newItem;
        setRepoList(list);
      } else {
        await adminAddRepo(newItem, localPin);
        setRepoList([...repoList, newItem]);
      }
      setRepoModalOpen(false);
      showToast("Dokumen Disimpan", "Repositori berhasil diperbarui.", "success");
      refreshData();
    } catch {
      showToast("Gagal", "Terjadi kesalahan penyimpanan.", "error");
    }
  };

  const handleRepoDelete = async (index: number) => {
    if (!confirm("Hapus dokumen repositori ini?")) return;
    try {
      await adminDeleteRepo(index, localPin);
      setRepoList(repoList.filter((_, idx) => idx !== index));
      showToast("Dihapus", "Dokumen repositori dihapus.", "success");
      refreshData();
    } catch {
      showToast("Gagal", "Terjadi kesalahan.", "error");
    }
  };

  // ─── Berita Actions ─────────────────────────────────────────────────────────
  const openAddBeritaModal = () => {
    setBeritaTitle("");
    setBeritaCategory("kegiatan");
    setBeritaAuthor(user?.name || "Tim Media PAC");
    const now = new Date();
    const localIso = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    setBeritaDate(localIso);
    setBeritaExcerpt("");
    setBeritaContent("");
    setBeritaCoverImage("/assets/images/cover-modul.png");
    setBeritaCaption("");
    setBeritaTags("");
    setBeritaStatus("published");
    setBeritaFileData("");
    setBeritaFileName("");
    setBeritaFileType("");
    setEditingBeritaIdx(null);
    setBeritaModalOpen(true);
  };

  const openEditBeritaModal = (item: BeritaItem, idx: number) => {
    setBeritaTitle(item.title);
    setBeritaCategory(item.category || "kegiatan");
    setBeritaAuthor(item.author || user?.name || "Tim Media PAC");
    const itemDate = item.timestamp ? new Date(item.timestamp) : new Date();
    const localIso = new Date(itemDate.getTime() - itemDate.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    setBeritaDate(localIso);
    setBeritaExcerpt(item.excerpt || "");
    setBeritaContent(item.content);
    setBeritaCoverImage(item.coverImage || "/assets/images/cover-modul.png");
    setBeritaCaption(item.caption || "");
    setBeritaTags(item.tags || "");
    setBeritaStatus(item.status || "published");
    setBeritaFileData("");
    setBeritaFileName("");
    setBeritaFileType("");
    setEditingBeritaIdx(idx);
    setBeritaModalOpen(true);
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      showToast("File Terlalu Besar", "Maksimal ukuran foto adalah 5MB.", "error");
      return;
    }
    setBeritaFileName(file.name);
    setBeritaFileType(file.type);
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setBeritaCoverImage(result);
      const base64Data = result.split(",")[1];
      setBeritaFileData(base64Data);
    };
    reader.readAsDataURL(file);
  };

  const handleBeritaSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!beritaTitle.trim() || !beritaContent.trim()) {
      showToast("Form Belum Lengkap", "Judul berita dan isi artikel wajib diisi.", "error");
      return;
    }

    setIsSubmittingBerita(true);
    const timestamp = beritaDate ? new Date(beritaDate).toISOString() : new Date().toISOString();

    const newItem: BeritaItem = {
      id: editingBeritaIdx !== null ? beritaList[editingBeritaIdx].id : `news-${Date.now()}`,
      timestamp,
      title: beritaTitle.trim(),
      category: beritaCategory,
      coverImage: beritaCoverImage || "/assets/images/cover-modul.png",
      content: beritaContent.trim(),
      author: beritaAuthor.trim(),
      excerpt: beritaExcerpt.trim() || (beritaContent.trim().slice(0, 150) + (beritaContent.trim().length > 150 ? "..." : "")),
      caption: beritaCaption.trim(),
      tags: beritaTags.trim(),
      status: beritaStatus,
      views: editingBeritaIdx !== null ? beritaList[editingBeritaIdx].views : 0,
      likes: editingBeritaIdx !== null ? beritaList[editingBeritaIdx].likes : 0
    };

    const payload = {
      ...newItem,
      ...(beritaFileData ? { fileData: beritaFileData, fileName: beritaFileName, fileType: beritaFileType } : {})
    };

    try {
      showToast("Menyimpan Berita", "Sedang memproses publikasi...", "info");
      if (editingBeritaIdx !== null) {
        await adminUpdateBerita(editingBeritaIdx, payload, localPin);
        const list = [...beritaList];
        list[editingBeritaIdx] = newItem;
        setBeritaList(list);
      } else {
        await adminAddBerita(payload, localPin);
        setBeritaList([newItem, ...beritaList]);
      }
      setBeritaModalOpen(false);
      showToast("Berita Tersimpan", "Publikasi berita berhasil diperbarui.", "success");
      refreshData();
    } catch {
      showToast("Gagal", "Terjadi kesalahan publikasi berita.", "error");
    } finally {
      setIsSubmittingBerita(false);
    }
  };

  const handleBeritaDelete = async (index: number) => {
    if (!confirm("Hapus artikel berita ini?")) return;
    try {
      await adminDeleteBerita(index, localPin);
      setBeritaList(beritaList.filter((_, idx) => idx !== index));
      showToast("Dihapus", "Artikel berita berhasil dihapus.", "success");
      refreshData();
    } catch {
      showToast("Gagal", "Terjadi kesalahan.", "error");
    }
  };

  // ─── Settings Actions ───────────────────────────────────────────────────────
  const handleSettingsSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      showToast("Menyimpan Pengaturan", "Sedang memperbarui konfigurasi sistem...", "info");
      await adminUpdateSettings({ pdfIpnuUrl, pdfIppnuUrl }, localPin);
      showToast("Pengaturan Disimpan", "Tautan PDF dan identitas pengurus diperbarui.", "success");
      refreshData();
    } catch {
      showToast("Gagal Menyimpan", "Terjadi kesalahan.", "error");
    }
  };

  // Filtered lists
  const currentSpList = spBanom === "ipnu" ? spIpnu : spIppnu;
  const filteredSpList = useMemo(() => {
    return currentSpList.filter(
      (s) => s.name.toLowerCase().includes(spSearch.toLowerCase()) || s.spNumber.toLowerCase().includes(spSearch.toLowerCase())
    );
  }, [currentSpList, spSearch]);

  const filteredMakestaList = useMemo(() => {
    return makestaList.filter(
      (m) => m.penyelenggara.toLowerCase().includes(makestaSearch.toLowerCase()) || m.tempat.toLowerCase().includes(makestaSearch.toLowerCase())
    );
  }, [makestaList, makestaSearch]);

  const filteredRepoList = useMemo(() => {
    return repoList.filter(
      (r) => r.title.toLowerCase().includes(repoSearch.toLowerCase()) || r.description.toLowerCase().includes(repoSearch.toLowerCase())
    );
  }, [repoList, repoSearch]);

  const filteredBeritaList = useMemo(() => {
    return beritaList.filter(
      (b) => b.title.toLowerCase().includes(beritaSearch.toLowerCase()) || b.content.toLowerCase().includes(beritaSearch.toLowerCase())
    );
  }, [beritaList, beritaSearch]);

  if (!user) return null;
  if (dataLoading) {
    return (
      <div className="py-16 text-center text-xs text-slate-400 font-medium">
        <i className="fas fa-spinner fa-spin mr-2 text-brand-purple text-base"></i> Membuka Dasbor PAC...
      </div>
    );
  }

  return (
    <div className="py-6 sm:py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      
      {/* ─── Executive Header Bar ────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-150 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
              Konsol Manajemen PAC Tahunan
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-violet-50 text-brand-purple text-[10px] font-black uppercase tracking-wider border border-violet-100">
              Admin Harian
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            Panel kendali data legalitas 17 Ranting, 15 Komisariat, rekapitulasi kaderisasi, repositori, dan warta kegiatan.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            target="_blank"
            className="px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 transition flex items-center gap-1.5"
          >
            <i className="fas fa-external-link-alt text-[10px] text-slate-400"></i>
            <span>Portal Publik</span>
          </Link>
          <button
            onClick={logout}
            className="px-3.5 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold border border-red-100 transition flex items-center gap-1.5"
          >
            <i className="fas fa-sign-out-alt text-[11px]"></i>
            <span>Keluar</span>
          </button>
        </div>
      </div>

      {/* ─── Summary KPI Cards (17 Ranting & 15 Komisariat) ─────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-white border border-slate-100 rounded-2xl shadow-sm space-y-1">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Pimpinan Ranting</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900">17 <span className="text-xs font-bold text-slate-400">Desa</span></span>
            <span className="text-xs font-bold text-brand-purple bg-violet-50 px-2 py-0.5 rounded">Se-Kecamatan</span>
          </div>
        </div>

        <div className="p-5 bg-white border border-slate-100 rounded-2xl shadow-sm space-y-1">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Pimpinan Komisariat</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900">15 <span className="text-xs font-bold text-slate-400">Sekolah</span></span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">MTs/SMP & MA/SMK</span>
          </div>
        </div>

        <div className="p-5 bg-white border border-slate-100 rounded-2xl shadow-sm space-y-1">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Kegiatan & Berita</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900">{makestaList.length} Makesta</span>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{beritaList.length} Berita</span>
          </div>
        </div>
      </div>

      {/* ─── Navigation Tabs ─────────────────────────────────────────────────── */}
      <div className="flex gap-1.5 border-b border-slate-150 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab("sp")}
          className={`px-3.5 py-2 rounded-xl text-xs font-black transition flex items-center gap-2 flex-shrink-0 ${
            activeTab === "sp"
              ? "bg-brand-purple text-white shadow-sm"
              : "text-slate-500 hover:text-slate-800 bg-white border border-slate-150"
          }`}
        >
          <i className="fas fa-file-contract text-xs"></i>
          <span>Kelola SK / SP</span>
        </button>
        <button
          onClick={() => setActiveTab("makesta")}
          className={`px-3.5 py-2 rounded-xl text-xs font-black transition flex items-center gap-2 flex-shrink-0 ${
            activeTab === "makesta"
              ? "bg-brand-purple text-white shadow-sm"
              : "text-slate-500 hover:text-slate-800 bg-white border border-slate-150"
          }`}
        >
          <i className="fas fa-graduation-cap text-xs"></i>
          <span>Kelola Makesta</span>
        </button>
        <button
          onClick={() => setActiveTab("repo")}
          className={`px-3.5 py-2 rounded-xl text-xs font-black transition flex items-center gap-2 flex-shrink-0 ${
            activeTab === "repo"
              ? "bg-brand-purple text-white shadow-sm"
              : "text-slate-500 hover:text-slate-800 bg-white border border-slate-150"
          }`}
        >
          <i className="fas fa-book-open text-xs"></i>
          <span>Dokumen Repositori</span>
        </button>
        <button
          onClick={() => setActiveTab("berita")}
          className={`px-3.5 py-2 rounded-xl text-xs font-black transition flex items-center gap-2 flex-shrink-0 ${
            activeTab === "berita"
              ? "bg-brand-purple text-white shadow-sm"
              : "text-slate-500 hover:text-slate-800 bg-white border border-slate-150"
          }`}
        >
          <i className="fas fa-newspaper text-xs"></i>
          <span>Kelola Berita</span>
        </button>
        <button
          onClick={() => setActiveTab("settings")}
          className={`px-3.5 py-2 rounded-xl text-xs font-black transition flex items-center gap-2 flex-shrink-0 ${
            activeTab === "settings"
              ? "bg-brand-purple text-white shadow-sm"
              : "text-slate-500 hover:text-slate-800 bg-white border border-slate-150"
          }`}
        >
          <i className="fas fa-cog text-xs"></i>
          <span>Pengaturan</span>
        </button>
      </div>

      {/* ─── TAB 1: KELOLA SP ────────────────────────────────────────────────── */}
      {activeTab === "sp" && (
        <div className="bg-white border border-slate-100 rounded-3xl p-5 sm:p-7 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-50 pb-4">
            <div className="flex items-center gap-3">
              <div className="bg-slate-100 p-1 rounded-xl flex border border-slate-200">
                <button
                  onClick={() => setSpBanom("ipnu")}
                  className={`px-3 py-1 rounded-lg text-xs font-black transition ${
                    spBanom === "ipnu" ? "bg-brand-purple text-white shadow-sm" : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  IPNU ({spIpnu.length})
                </button>
                <button
                  onClick={() => setSpBanom("ippnu")}
                  className={`px-3 py-1 rounded-lg text-xs font-black transition ${
                    spBanom === "ippnu" ? "bg-emerald-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  IPPNU ({spIppnu.length})
                </button>
              </div>

              <div className="relative w-48 sm:w-60">
                <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                <input
                  type="text"
                  placeholder="Cari nama / nomor SP..."
                  value={spSearch}
                  onChange={(e) => setSpSearch(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-1.5 pl-8 pr-3 text-xs text-slate-900 focus:outline-none focus:border-brand-purple"
                />
              </div>
            </div>

            <button
              onClick={openAddSpModal}
              className="px-4 py-2 rounded-xl bg-brand-purple hover:bg-brand-purpleDark text-white text-xs font-black shadow-sm flex items-center gap-1.5 transition self-start sm:self-auto"
            >
              <i className="fas fa-plus text-[10px]"></i>
              <span>Tambah SP Baru</span>
            </button>
          </div>

          {/* SP Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-100">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50/80 text-[10px] text-slate-400 uppercase tracking-widest font-extrabold border-b border-slate-100">
                  <th className="p-3 pl-4">Pimpinan</th>
                  <th className="p-3">Tipe</th>
                  <th className="p-3">Nomor SP</th>
                  <th className="p-3">Masa Berlaku</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right pr-4">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-semibold">
                {filteredSpList.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-6 text-center text-slate-400 text-xs">
                      Tidak ada data SP yang cocok.
                    </td>
                  </tr>
                ) : (
                  filteredSpList.map((item, idx) => {
                    const analysis = analyzeSpLegality(item.expiryDate);
                    return (
                      <tr key={idx} className="hover:bg-slate-50/70 transition">
                        <td className="p-3 pl-4 font-bold text-slate-900">{item.name}</td>
                        <td className="p-3 capitalize text-slate-500">{item.type}</td>
                        <td className="p-3 font-mono text-[11px] text-slate-400">{item.spNumber}</td>
                        <td className="p-3 text-slate-600">{item.expiryDate}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider ${analysis.badgeClass}`}>
                            {analysis.statusLabel}
                          </span>
                        </td>
                        <td className="p-3 text-right pr-4 space-x-1">
                          <button
                            onClick={() => openEditSpModal(item, idx)}
                            className="p-1.5 rounded-lg text-brand-purple hover:bg-violet-50 transition"
                            title="Edit"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            onClick={() => handleSpDelete(spBanom, idx)}
                            className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition"
                            title="Hapus"
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ─── TAB 2: KELOLA MAKESTA ───────────────────────────────────────────── */}
      {activeTab === "makesta" && (
        <div className="bg-white border border-slate-100 rounded-3xl p-5 sm:p-7 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-50 pb-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-black text-slate-800">
                Total: {makestaList.length} Kegiatan Makesta
              </span>
              <div className="relative w-48 sm:w-60">
                <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                <input
                  type="text"
                  placeholder="Cari penyelenggara..."
                  value={makestaSearch}
                  onChange={(e) => setMakestaSearch(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-1.5 pl-8 pr-3 text-xs text-slate-900 focus:outline-none focus:border-brand-purple"
                />
              </div>
            </div>

            <button
              onClick={openAddMakestaModal}
              className="px-4 py-2 rounded-xl bg-brand-purple hover:bg-brand-purpleDark text-white text-xs font-black shadow-sm flex items-center gap-1.5 transition self-start sm:self-auto"
            >
              <i className="fas fa-plus text-[10px]"></i>
              <span>Tambah Makesta</span>
            </button>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-100">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50/80 text-[10px] text-slate-400 uppercase tracking-widest font-extrabold border-b border-slate-100">
                  <th className="p-3 pl-4">Penyelenggara</th>
                  <th className="p-3">Tanggal Pelaksanaan</th>
                  <th className="p-3">Tempat</th>
                  <th className="p-3 text-right">Peserta Lulus</th>
                  <th className="p-3 text-right pr-4">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-semibold">
                {filteredMakestaList.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-6 text-center text-slate-400 text-xs">
                      Tidak ada catatan Makesta.
                    </td>
                  </tr>
                ) : (
                  filteredMakestaList.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70 transition">
                      <td className="p-3 pl-4 font-bold text-slate-900">{item.penyelenggara}</td>
                      <td className="p-3 text-slate-500">{item.tanggal}</td>
                      <td className="p-3 text-slate-500">{item.tempat}</td>
                      <td className="p-3 text-right font-black text-brand-purple">{item.peserta} Kader</td>
                      <td className="p-3 text-right pr-4 space-x-1">
                        <button
                          onClick={() => openEditMakestaModal(item, idx)}
                          className="p-1.5 rounded-lg text-brand-purple hover:bg-violet-50 transition"
                          title="Edit"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          onClick={() => handleMakestaDelete(idx)}
                          className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition"
                          title="Hapus"
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ─── TAB 3: DOKUMEN REPOSITORI ────────────────────────────────────────── */}
      {activeTab === "repo" && (
        <div className="bg-white border border-slate-100 rounded-3xl p-5 sm:p-7 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-50 pb-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-black text-slate-800">
                Total: {repoList.length} Dokumen
              </span>
              <div className="relative w-48 sm:w-60">
                <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                <input
                  type="text"
                  placeholder="Cari dokumen..."
                  value={repoSearch}
                  onChange={(e) => setRepoSearch(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-1.5 pl-8 pr-3 text-xs text-slate-900 focus:outline-none focus:border-brand-purple"
                />
              </div>
            </div>

            <button
              onClick={openAddRepoModal}
              className="px-4 py-2 rounded-xl bg-brand-purple hover:bg-brand-purpleDark text-white text-xs font-black shadow-sm flex items-center gap-1.5 transition self-start sm:self-auto"
            >
              <i className="fas fa-plus text-[10px]"></i>
              <span>Tambah Dokumen</span>
            </button>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-100">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50/80 text-[10px] text-slate-400 uppercase tracking-widest font-extrabold border-b border-slate-100">
                  <th className="p-3 pl-4">Judul Dokumen</th>
                  <th className="p-3">Kategori</th>
                  <th className="p-3">Drive ID</th>
                  <th className="p-3 text-right pr-4">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-semibold">
                {filteredRepoList.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-6 text-center text-slate-400 text-xs">
                      Tidak ada dokumen repositori.
                    </td>
                  </tr>
                ) : (
                  filteredRepoList.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70 transition">
                      <td className="p-3 pl-4 font-bold text-slate-900">
                        <span>{item.title}</span>
                        <span className="block text-[10px] font-normal text-slate-400 line-clamp-1">{item.description}</span>
                      </td>
                      <td className="p-3 capitalize">
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-bold">
                          {item.category}
                        </span>
                      </td>
                      <td className="p-3 font-mono text-[10px] text-slate-400">{item.driveId}</td>
                      <td className="p-3 text-right pr-4 space-x-1">
                        <a
                          href={`https://drive.google.com/file/d/${item.driveId}/preview`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 transition inline-block"
                          title="Buka Drive"
                        >
                          <i className="fas fa-external-link-alt"></i>
                        </a>
                        <button
                          onClick={() => openEditRepoModal(item, idx)}
                          className="p-1.5 rounded-lg text-brand-purple hover:bg-violet-50 transition"
                          title="Edit"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          onClick={() => handleRepoDelete(idx)}
                          className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition"
                          title="Hapus"
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ─── TAB 4: KELOLA BERITA ────────────────────────────────────────────── */}
      {activeTab === "berita" && (
        <div className="bg-white border border-slate-100 rounded-3xl p-5 sm:p-7 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-50 pb-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-black text-slate-800">
                Total: {beritaList.length} Berita Terbit
              </span>
              <div className="relative w-48 sm:w-60">
                <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                <input
                  type="text"
                  placeholder="Cari berita..."
                  value={beritaSearch}
                  onChange={(e) => setBeritaSearch(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-1.5 pl-8 pr-3 text-xs text-slate-900 focus:outline-none focus:border-brand-purple"
                />
              </div>
            </div>

            <button
              onClick={openAddBeritaModal}
              className="px-4 py-2 rounded-xl bg-brand-purple hover:bg-brand-purpleDark text-white text-xs font-black shadow-sm flex items-center gap-1.5 transition self-start sm:self-auto"
            >
              <i className="fas fa-plus text-[10px]"></i>
              <span>Tulis Berita Baru</span>
            </button>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-100">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50/80 text-[10px] text-slate-400 uppercase tracking-widest font-extrabold border-b border-slate-100">
                  <th className="p-3 pl-4 w-14">Foto</th>
                  <th className="p-3">Judul Berita & Kutipan</th>
                  <th className="p-3">Kategori</th>
                  <th className="p-3">Penulis</th>
                  <th className="p-3">Tanggal Terbit</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right pr-4">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-semibold">
                {filteredBeritaList.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-6 text-center text-slate-400 text-xs">
                      Belum ada berita yang dipublikasikan.
                    </td>
                  </tr>
                ) : (
                  filteredBeritaList.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70 transition">
                      <td className="p-3 pl-4">
                        <div className="w-12 h-8 rounded-lg bg-slate-100 relative overflow-hidden border border-slate-200/60 flex-shrink-0">
                          {item.coverImage ? (
                            <Image src={item.coverImage} alt={item.title} fill className="object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-300 text-xs">
                              <i className="fas fa-image"></i>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-3 font-bold text-slate-900 max-w-sm">
                        <Link href={`/berita/${item.id}`} target="_blank" className="hover:text-brand-purple line-clamp-1">
                          {item.title}
                        </Link>
                        {item.excerpt && (
                          <p className="text-[11px] text-slate-400 font-normal line-clamp-1 mt-0.5">
                            {item.excerpt}
                          </p>
                        )}
                      </td>
                      <td className="p-3 capitalize">
                        <span className="px-2 py-0.5 rounded bg-violet-50 text-brand-purple text-[10px] font-bold">
                          {item.category}
                        </span>
                      </td>
                      <td className="p-3 text-slate-500">{item.author || "Tim Media PAC"}</td>
                      <td className="p-3 text-slate-400 text-[11px]">
                        {item.timestamp ? new Date(item.timestamp).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "-"}
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${
                          item.status === "draft"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        }`}>
                          {item.status === "draft" ? "Draf" : "Terbit"}
                        </span>
                      </td>
                      <td className="p-3 text-right pr-4 space-x-1 whitespace-nowrap">
                        <button
                          onClick={() => openEditBeritaModal(item, idx)}
                          className="p-1.5 rounded-lg text-brand-purple hover:bg-violet-50 transition"
                          title="Edit"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          onClick={() => handleBeritaDelete(idx)}
                          className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition"
                          title="Hapus"
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ─── TAB 5: PENGATURAN SISTEM ────────────────────────────────────────── */}
      {activeTab === "settings" && (
        <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="space-y-1 border-b border-slate-50 pb-3">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
              Konfigurasi Ekosistem Portal
            </h3>
            <p className="text-[11px] text-slate-400">Pengaturan identitas kesekretariatan dan tautan arsip resmi</p>
          </div>

          <form onSubmit={handleSettingsSave} className="space-y-4 max-w-2xl">
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

              <div className="space-y-1 sm:col-span-2">
                <label className="block text-[9px] font-extrabold text-slate-400 uppercase">Tautan PDF Susunan Pengurus IPNU (Drive)</label>
                <input
                  type="url"
                  value={pdfIpnuUrl}
                  onChange={(e) => setPdfIpnuUrl(e.target.value)}
                  placeholder="https://drive.google.com/file/d/..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-purple transition"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
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
              className="px-6 py-2.5 rounded-xl bg-brand-purple hover:bg-brand-purpleDark text-white font-black text-xs uppercase tracking-wider transition shadow-sm"
            >
              Simpan Konfigurasi
            </button>
          </form>
        </div>
      )}

      {/* ─── MODAL: Tambah / Edit SP ─────────────────────────────────────────── */}
      {spModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-sm text-slate-900 uppercase tracking-wider">
                {editingSpIdx !== null ? "Edit Data SK / SP" : "Tambah Data SK / SP Baru"}
              </h3>
              <button onClick={() => setSpModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <i className="fas fa-times text-sm"></i>
              </button>
            </div>

            <form onSubmit={handleSpSave} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-[9px] font-extrabold text-slate-400 uppercase">Nama Pimpinan</label>
                  <input
                    type="text"
                    required
                    value={spName}
                    onChange={(e) => setSpName(e.target.value)}
                    placeholder="PR IPNU Mantingan"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-purple"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[9px] font-extrabold text-slate-400 uppercase">Tipe</label>
                  <select
                    value={spType}
                    onChange={(e) => setSpType(e.target.value as "ranting" | "komisariat")}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-purple"
                  >
                    <option value="ranting">Ranting</option>
                    <option value="komisariat">Komisariat</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-[9px] font-extrabold text-slate-400 uppercase">Nomor SP</label>
                  <input
                    type="text"
                    required
                    value={spNumber}
                    onChange={(e) => setSpNumber(e.target.value)}
                    placeholder="089/IPNU/SP/A/X/2026"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-purple"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[9px] font-extrabold text-slate-400 uppercase">Batas Berlaku</label>
                  <input
                    type="date"
                    required
                    value={spExpiry}
                    onChange={(e) => setSpExpiry(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-purple"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-[9px] font-extrabold text-slate-400 uppercase">WhatsApp</label>
                  <input
                    type="text"
                    value={spPhone}
                    onChange={(e) => setSpPhone(e.target.value)}
                    placeholder="6282242147243"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-purple"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[9px] font-extrabold text-slate-400 uppercase">Email</label>
                  <input
                    type="email"
                    value={spEmail}
                    onChange={(e) => setSpEmail(e.target.value)}
                    placeholder="pr.ipnu@gmail.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-purple"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSpModalOpen(false)}
                  className="w-1/3 py-2 rounded-xl bg-slate-100 text-slate-600 font-bold text-xs"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2 rounded-xl bg-brand-purple text-white font-black text-xs"
                >
                  Simpan SP
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL: Tambah / Edit Makesta ────────────────────────────────────── */}
      {makestaModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-sm text-slate-900 uppercase tracking-wider">
                {editingMakestaIdx !== null ? "Edit Catatan Makesta" : "Tambah Kegiatan Makesta"}
              </h3>
              <button onClick={() => setMakestaModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <i className="fas fa-times text-sm"></i>
              </button>
            </div>

            <form onSubmit={handleMakestaSave} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="block text-[9px] font-extrabold text-slate-400 uppercase">Penyelenggara</label>
                <input
                  type="text"
                  required
                  value={makestaPenyelenggara}
                  onChange={(e) => setMakestaPenyelenggara(e.target.value)}
                  placeholder="Contoh: PR IPNU IPPNU Mantingan"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-purple"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-[9px] font-extrabold text-slate-400 uppercase">Tanggal Pelaksanaan</label>
                  <input
                    type="text"
                    required
                    value={makestaTanggal}
                    onChange={(e) => setMakestaTanggal(e.target.value)}
                    placeholder="Contoh: 14-15/03/2026"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-purple"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[9px] font-extrabold text-slate-400 uppercase">Jumlah Kader Lulus</label>
                  <input
                    type="number"
                    required
                    value={makestaPeserta}
                    onChange={(e) => setMakestaPeserta(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-purple"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[9px] font-extrabold text-slate-400 uppercase">Lokasi / Tempat</label>
                <input
                  type="text"
                  required
                  value={makestaTempat}
                  onChange={(e) => setMakestaTempat(e.target.value)}
                  placeholder="Contoh: Gedung MWC NU Tahunan"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-purple"
                />
              </div>

              <div className="flex gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setMakestaModalOpen(false)}
                  className="w-1/3 py-2 rounded-xl bg-slate-100 text-slate-600 font-bold text-xs"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2 rounded-xl bg-brand-purple text-white font-black text-xs"
                >
                  Simpan Makesta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL: Tambah / Edit Repo ───────────────────────────────────────── */}
      {repoModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-sm text-slate-900 uppercase tracking-wider">
                {editingRepoIdx !== null ? "Edit Dokumen Repositori" : "Tambah Dokumen Baru"}
              </h3>
              <button onClick={() => setRepoModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <i className="fas fa-times text-sm"></i>
              </button>
            </div>

            <form onSubmit={handleRepoSave} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="block text-[9px] font-extrabold text-slate-400 uppercase">Judul Dokumen</label>
                <input
                  type="text"
                  required
                  value={repoTitle}
                  onChange={(e) => setRepoTitle(e.target.value)}
                  placeholder="Contoh: Modul Pelatihan Kaderisasi"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-purple"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[9px] font-extrabold text-slate-400 uppercase">Kategori</label>
                <select
                  value={repoCategory}
                  onChange={(e) => setRepoCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-purple"
                >
                  <option value="buku">Buku Wajib & AD/ART</option>
                  <option value="modul">Modul Pelatihan</option>
                  <option value="surat">Template Administrasi</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-[9px] font-extrabold text-slate-400 uppercase">Google Drive File ID</label>
                <input
                  type="text"
                  required
                  value={repoDriveId}
                  onChange={(e) => setRepoDriveId(e.target.value)}
                  placeholder="Contoh: 1AQ00D1srOr53Jjf5w377NkFgLD5V-8e2"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-purple font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[9px] font-extrabold text-slate-400 uppercase">Keterangan Singkat</label>
                <textarea
                  rows={2}
                  value={repoDesc}
                  onChange={(e) => setRepoDesc(e.target.value)}
                  placeholder="Deskripsi berkas..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-purple"
                />
              </div>

              <div className="flex gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setRepoModalOpen(false)}
                  className="w-1/3 py-2 rounded-xl bg-slate-100 text-slate-600 font-bold text-xs"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2 rounded-xl bg-brand-purple text-white font-black text-xs"
                >
                  Simpan Dokumen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL: Tambah / Edit Berita (Standar Jurnalistik) ───────────────── */}
      {beritaModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-purple"></span>
                  <h3 className="font-black text-sm text-slate-900 uppercase tracking-wider">
                    {editingBeritaIdx !== null ? "Edit Naskah Berita" : "Tulis Berita & Publikasi Baru"}
                  </h3>
                </div>
                <p className="text-[11px] text-slate-400 font-medium">
                  Standar redaksi portal media PAC IPNU IPPNU Kecamatan Tahunan
                </p>
              </div>
              <button
                onClick={() => setBeritaModalOpen(false)}
                className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition"
              >
                <i className="fas fa-times text-xs"></i>
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleBeritaSave} className="flex flex-col flex-1 overflow-hidden">
              <div className="p-6 overflow-y-auto flex-1 space-y-5">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                  {/* ─── Kolom Kiri: Naskah & Teks Redaksional (7 Col) ──────────── */}
                  <div className="lg:col-span-7 space-y-4">
                    {/* Judul Berita (Headline) */}
                    <div className="space-y-1">
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider">
                        Judul Berita (Headline) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={beritaTitle}
                        onChange={(e) => setBeritaTitle(e.target.value)}
                        placeholder="Contoh: Sukses Gelar LAKMUD I, PAC Tahunan Siap Cetak Organisatoris Handal"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:border-brand-purple focus:bg-white transition"
                      />
                    </div>

                    {/* Kutipan Singkat (Lead / Ringkasan) */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider">
                          Kutipan Singkat (Lead / Excerpt)
                        </label>
                        <span className="text-[10px] text-brand-purple font-extrabold bg-violet-50 px-2 py-0.5 rounded">
                          Tampil di Beranda & Kartu Berita
                        </span>
                      </div>
                      <textarea
                        rows={3}
                        value={beritaExcerpt}
                        onChange={(e) => setBeritaExcerpt(e.target.value)}
                        placeholder="Ringkasan 1-2 kalimat pemikat yang merangkum inti berita untuk ditampilkan pada cuplikan kartu berita di halaman utama..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-brand-purple focus:bg-white transition leading-relaxed"
                      />
                      <p className="text-[10px] text-slate-400">
                        *Jika dikosongkan, sistem otomatis mengambil 150 karakter pertama dari naskah berita.
                      </p>
                    </div>

                    {/* Isi Naskah Berita Lengkap */}
                    <div className="space-y-1">
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider">
                        Isi Naskah Berita Lengkap <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        rows={10}
                        required
                        value={beritaContent}
                        onChange={(e) => setBeritaContent(e.target.value)}
                        placeholder="Tuliskan isi berita secara runtut dan lengkap (mencakup 5W + 1H: Apa, Siapa, Di mana, Kapan, Mengapa, dan Bagaimana kegiatan berlangsung)..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-purple focus:bg-white transition leading-relaxed whitespace-pre-line"
                      />
                    </div>

                    {/* Tagar & Topik Terkait */}
                    <div className="space-y-1">
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider">
                        Tagar / Topik Terkait (Pisahkan dengan koma)
                      </label>
                      <input
                        type="text"
                        value={beritaTags}
                        onChange={(e) => setBeritaTags(e.target.value)}
                        placeholder="Contoh: Kaderisasi, Makesta, PAC Tahunan, Mantingan"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-brand-purple focus:bg-white transition"
                      />
                    </div>
                  </div>

                  {/* ─── Kolom Kanan: Media Foto & Pengaturan Publikasi (5 Col) ─── */}
                  <div className="lg:col-span-5 space-y-4">
                    
                    {/* Media Foto Utama (Cover Image) */}
                    <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-200/80 space-y-3">
                      <label className="block text-[10px] font-black text-slate-600 uppercase tracking-wider">
                        Foto Utama (Cover Image)
                      </label>

                      {/* Image Preview Box */}
                      <div className="w-full aspect-video rounded-xl bg-slate-100 border border-slate-200 overflow-hidden relative group">
                        {beritaCoverImage ? (
                          <Image
                            src={beritaCoverImage}
                            alt="Preview Cover"
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 gap-1">
                            <i className="fas fa-image text-2xl"></i>
                            <span className="text-[10px] font-bold">Belum ada foto</span>
                          </div>
                        )}
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 text-white text-[9px] font-extrabold backdrop-blur-xs">
                          Preview 16:9
                        </span>
                      </div>

                      {/* File Upload Button */}
                      <div>
                        <input
                          type="file"
                          id="beritaCoverFileInput"
                          accept="image/*"
                          onChange={handleImageFileChange}
                          className="hidden"
                        />
                        <label
                          htmlFor="beritaCoverFileInput"
                          className="w-full py-2 px-3 rounded-xl bg-white border border-slate-200 hover:border-brand-purple hover:bg-violet-50/30 text-brand-purple text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition shadow-2xs"
                        >
                          <i className="fas fa-cloud-arrow-up"></i>
                          <span>{beritaFileName ? "Ganti Foto Perangkat" : "Unggah Foto dari Perangkat"}</span>
                        </label>
                        {beritaFileName && (
                          <p className="text-[10px] text-emerald-600 font-bold mt-1 truncate">
                            <i className="fas fa-check-circle mr-1"></i> {beritaFileName}
                          </p>
                        )}
                      </div>

                      {/* Atau Gunakan URL Gambar */}
                      <div className="space-y-1 pt-1">
                        <label className="block text-[9px] font-extrabold text-slate-400 uppercase">
                          Atau Tautan URL Gambar
                        </label>
                        <input
                          type="url"
                          value={beritaCoverImage}
                          onChange={(e) => setBeritaCoverImage(e.target.value)}
                          placeholder="https://..."
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-[11px] text-slate-800 focus:outline-none focus:border-brand-purple"
                        />
                      </div>

                      {/* Keterangan Foto (Caption) */}
                      <div className="space-y-1 pt-1">
                        <label className="block text-[9px] font-extrabold text-slate-400 uppercase">
                          Keterangan Foto (Photo Caption)
                        </label>
                        <input
                          type="text"
                          value={beritaCaption}
                          onChange={(e) => setBeritaCaption(e.target.value)}
                          placeholder="Contoh: Foto dokumentasi pelantikan pengurus di MWC NU..."
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-[11px] text-slate-800 focus:outline-none focus:border-brand-purple"
                        />
                      </div>
                    </div>

                    {/* Metadata Penerbitan */}
                    <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-200/80 space-y-3">
                      <label className="block text-[10px] font-black text-slate-600 uppercase tracking-wider">
                        Metadata & Jadwal Publikasi
                      </label>

                      {/* Kategori Berita */}
                      <div className="space-y-1">
                        <label className="block text-[9px] font-extrabold text-slate-400 uppercase">Kategori</label>
                        <select
                          value={beritaCategory}
                          onChange={(e) => setBeritaCategory(e.target.value as "kegiatan" | "info" | "pengumuman" | "opini")}
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-brand-purple"
                        >
                          <option value="kegiatan">Kegiatan Organisasi</option>
                          <option value="info">Informasi & Warta</option>
                          <option value="pengumuman">Pengumuman Resmi</option>
                          <option value="opini">Opini & Esai Kader</option>
                        </select>
                      </div>

                      {/* Penulis / Pewarta */}
                      <div className="space-y-1">
                        <label className="block text-[9px] font-extrabold text-slate-400 uppercase">
                          Penulis / Wartawan / Kontributor
                        </label>
                        <input
                          type="text"
                          required
                          value={beritaAuthor}
                          onChange={(e) => setBeritaAuthor(e.target.value)}
                          placeholder="Nama pewarta..."
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-brand-purple"
                        />
                      </div>

                      {/* Tanggal & Waktu Upload */}
                      <div className="space-y-1">
                        <label className="block text-[9px] font-extrabold text-slate-400 uppercase">
                          Tanggal & Waktu Publikasi
                        </label>
                        <input
                          type="datetime-local"
                          required
                          value={beritaDate}
                          onChange={(e) => setBeritaDate(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-brand-purple"
                        />
                      </div>

                      {/* Status Penerbitan */}
                      <div className="space-y-1 pt-1">
                        <label className="block text-[9px] font-extrabold text-slate-400 uppercase">Status Artikel</label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setBeritaStatus("published")}
                            className={`py-2 px-3 rounded-xl text-xs font-black transition border ${
                              beritaStatus === "published"
                                ? "bg-emerald-600 text-white border-emerald-600 shadow-2xs"
                                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                            }`}
                          >
                            <i className="fas fa-globe mr-1.5 text-[10px]"></i> Terbitkan
                          </button>
                          <button
                            type="button"
                            onClick={() => setBeritaStatus("draft")}
                            className={`py-2 px-3 rounded-xl text-xs font-black transition border ${
                              beritaStatus === "draft"
                                ? "bg-amber-500 text-white border-amber-500 shadow-2xs"
                                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                            }`}
                          >
                            <i className="fas fa-file-lines mr-1.5 text-[10px]"></i> Simpan Draf
                          </button>
                        </div>
                      </div>

                    </div>

                  </div>

                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/50">
                <div className="text-[11px] text-slate-400 hidden sm:block">
                  Status: <span className="font-bold text-slate-700">{beritaStatus === "published" ? "Siap Terbit" : "Draf Tersimpan"}</span>
                </div>
                <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={() => setBeritaModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs transition"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingBerita}
                    className="px-6 py-2.5 rounded-xl bg-brand-purple hover:bg-brand-purpleDark text-white font-black text-xs shadow-md transition flex items-center gap-2 disabled:opacity-50"
                  >
                    {isSubmittingBerita ? (
                      <>
                        <i className="fas fa-spinner fa-spin text-xs"></i>
                        <span>Menyimpan...</span>
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane text-xs"></i>
                        <span>{editingBeritaIdx !== null ? "Perbarui Berita" : "Terbitkan Berita"}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}
