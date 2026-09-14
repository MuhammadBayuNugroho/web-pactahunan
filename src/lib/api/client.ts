export interface SpItem {
  name: string;
  type: "ranting" | "komisariat";
  spNumber: string;
  expiryDate: string;
  phone?: string;
  email?: string;
}

export interface MakestaDetail {
  penyelenggara: string;
  tanggal: string;
  tempat: string;
  peserta: number;
}

export interface MakestaItem {
  penyelenggara: string;
  tanggal: string;
  tempat: string;
  peserta: number;
  praMakesta: MakestaDetail;
  makesta: MakestaDetail;
  rtl: [MakestaDetail, MakestaDetail, MakestaDetail];
}

export interface BeritaItem {
  id: string;
  timestamp: string;
  title: string;
  content: string;
  category: "kegiatan" | "info" | "pengumuman";
  coverImage: string;
  likes: number;
  views: number;
}

export interface KomentarItem {
  newsId: string;
  timestamp: string;
  name: string;
  comment: string;
}

export interface RepoItem {
  id: string;
  title: string;
  description: string;
  category: "buku" | "modul" | "surat";
  driveId: string;
  coverImage: string;
}

export interface SettingsObj {
  pdfIpnuUrl?: string;
  pdfIppnuUrl?: string;
  secName?: string;
  secWa?: string;
}

export interface SpLegalityAnalysis {
  diffInDays: number;
  cluster: "aman" | "kritis" | "habis";
  statusLabel: string;
  badgeClass: string;
}

// Fallback Mock Data — matches GAS default data (12 ranting/komisariat)
export const mockSpData: { ipnu: SpItem[]; ippnu: SpItem[] } = {
  ipnu: [
    { name: "PR IPNU Mantingan",       type: "ranting",     spNumber: "089/IPNU/SP/A/X/2024",   expiryDate: "2026-10-15", phone: "6282242147243", email: "pr.ipnu.mantingan@gmail.com" },
    { name: "PR IPNU Senenan",         type: "ranting",     spNumber: "042/IPNU/SP/A/III/2025",  expiryDate: "2027-03-20" },
    { name: "PR IPNU Tahunan",         type: "ranting",     spNumber: "102/IPNU/SP/A/I/2024",   expiryDate: "2026-01-10" },
    { name: "PR IPNU Tegalsambi",      type: "ranting",     spNumber: "067/IPNU/SP/A/VIII/2024", expiryDate: "2026-08-05" },
    { name: "PR IPNU Demangan",        type: "ranting",     spNumber: "115/IPNU/SP/A/XI/2024",  expiryDate: "2026-11-20" },
    { name: "PR IPNU Ngabul",          type: "ranting",     spNumber: "015/IPNU/SP/A/I/2025",   expiryDate: "2027-01-15" },
    { name: "PR IPNU Langon",          type: "ranting",     spNumber: "099/IPNU/SP/A/V/2024",   expiryDate: "2026-05-02" },
    { name: "PR IPNU Sukodono",        type: "ranting",     spNumber: "054/IPNU/SP/A/IV/2025",  expiryDate: "2027-04-10" },
    { name: "PR IPNU Kecapi",          type: "ranting",     spNumber: "078/IPNU/SP/A/VII/2024",  expiryDate: "2026-07-28" },
    { name: "PR IPNU Petekeyan",       type: "ranting",     spNumber: "130/IPNU/SP/A/XII/2024", expiryDate: "2026-12-15" },
    { name: "PK IPNU MA Hasyim Asy'ari", type: "komisariat", spNumber: "034/IPNU/SP/B/II/2025",  expiryDate: "2026-02-15" },
    { name: "PK IPNU SMK NU Tahunan",  type: "komisariat", spNumber: "049/IPNU/SP/B/VI/2024",  expiryDate: "2026-07-15" },
  ],
  ippnu: [
    { name: "PR IPPNU Mantingan",       type: "ranting",     spNumber: "087/IPPNU/SP/A/X/2024",   expiryDate: "2026-10-15", phone: "6282242147243", email: "pr.ippnu.mantingan@gmail.com" },
    { name: "PR IPPNU Senenan",         type: "ranting",     spNumber: "041/IPPNU/SP/A/III/2025",  expiryDate: "2027-03-20" },
    { name: "PR IPPNU Tahunan",         type: "ranting",     spNumber: "101/IPPNU/SP/A/I/2024",   expiryDate: "2026-01-10" },
    { name: "PR IPPNU Tegalsambi",      type: "ranting",     spNumber: "065/IPPNU/SP/A/VIII/2024", expiryDate: "2026-08-05" },
    { name: "PR IPPNU Demangan",        type: "ranting",     spNumber: "112/IPPNU/SP/A/XI/2024",  expiryDate: "2026-11-20" },
    { name: "PR IPPNU Ngabul",          type: "ranting",     spNumber: "014/IPPNU/SP/A/I/2025",   expiryDate: "2027-01-15" },
    { name: "PR IPPNU Langon",          type: "ranting",     spNumber: "098/IPPNU/SP/A/V/2024",   expiryDate: "2026-05-02" },
    { name: "PR IPPNU Sukodono",        type: "ranting",     spNumber: "053/IPPNU/SP/A/IV/2025",  expiryDate: "2027-04-10" },
    { name: "PR IPPNU Kecapi",          type: "ranting",     spNumber: "077/IPPNU/SP/A/VII/2024",  expiryDate: "2026-07-25" },
    { name: "PR IPPNU Petekeyan",       type: "ranting",     spNumber: "128/IPPNU/SP/A/XII/2024", expiryDate: "2026-12-15" },
    { name: "PK IPPNU MA Hasyim Asy'ari", type: "komisariat", spNumber: "033/IPPNU/SP/B/II/2025",  expiryDate: "2026-02-15" },
    { name: "PK IPPNU SMK NU Tahunan",  type: "komisariat", spNumber: "048/IPPNU/SP/B/VI/2024",  expiryDate: "2026-07-15" },
  ]
};

export const mockMakestaData: MakestaItem[] = [
  {
    penyelenggara: "PR Desa Mantingan",
    tanggal: "14-15/03/2026",
    tempat: "SDN 2 Mantingan",
    peserta: 35,
    praMakesta: { penyelenggara: "PR IPNU IPPNU Mantingan", tanggal: "07/03/2026", tempat: "Madin Mantingan", peserta: 35 },
    makesta: { penyelenggara: "PR IPNU IPPNU Mantingan", tanggal: "14-15/03/2026", tempat: "SDN 2 Mantingan", peserta: 35 },
    rtl: [
      { penyelenggara: "PR IPNU IPPNU Mantingan", tanggal: "28/03/2026", tempat: "Serambi Masjid Mantingan", peserta: 32 },
      { penyelenggara: "PR IPNU IPPNU Mantingan", tanggal: "11/04/2026", tempat: "Rumah Rekan Ketua", peserta: 30 },
      { penyelenggara: "PR IPNU IPPNU Mantingan", tanggal: "25/04/2026", tempat: "Balai Desa Mantingan", peserta: 28 }
    ]
  },
  {
    penyelenggara: "PK MA Hasyim Asy'ari",
    tanggal: "18/04/2026",
    tempat: "Aula Madrasah",
    peserta: 48,
    praMakesta: { penyelenggara: "PK IPNU IPPNU MA Hasyim Asy'ari", tanggal: "11/04/2026", tempat: "Kelas X MA", peserta: 48 },
    makesta: { penyelenggara: "PK IPNU IPPNU MA Hasyim Asy'ari", tanggal: "18/04/2026", tempat: "Aula Madrasah", peserta: 48 },
    rtl: [
      { penyelenggara: "PK IPNU IPPNU MA Hasyim Asy'ari", tanggal: "25/04/2026", tempat: "Perpustakaan Madrasah", peserta: 46 },
      { penyelenggara: "PK IPNU IPPNU MA Hasyim Asy'ari", tanggal: "02/05/2026", tempat: "Laboratorium Komputer", peserta: 45 },
      { penyelenggara: "PK IPNU IPPNU MA Hasyim Asy'ari", tanggal: "09/05/2026", tempat: "Aula Madrasah", peserta: 45 }
    ]
  },
  {
    penyelenggara: "PR Desa Senenan",
    tanggal: "09-10/05/2026",
    tempat: "Madin Senenan",
    peserta: 30,
    praMakesta: { penyelenggara: "PR IPNU IPPNU Senenan", tanggal: "02/05/2026", tempat: "Serambi Masjid Senenan", peserta: 30 },
    makesta: { penyelenggara: "PR IPNU IPPNU Senenan", tanggal: "09-10/05/2026", tempat: "Madin Senenan", peserta: 30 },
    rtl: [
      { penyelenggara: "PR IPNU IPPNU Senenan", tanggal: "23/05/2026", tempat: "Madin Senenan", peserta: 28 },
      { penyelenggara: "PR IPNU IPPNU Senenan", tanggal: "06/06/2026", tempat: "Rumah Rekan Ketua", peserta: 27 },
      { penyelenggara: "PR IPNU IPPNU Senenan", tanggal: "20/06/2026", tempat: "Balai Desa Senenan", peserta: 25 }
    ]
  },
  {
    penyelenggara: "PR Desa Tegalsambi",
    tanggal: "06-07/06/2026",
    tempat: "MTS Tegalsambi",
    peserta: 42,
    praMakesta: { penyelenggara: "PR IPNU IPPNU Tegalsambi", tanggal: "30/05/2026", tempat: "Serambi Masjid Tegalsambi", peserta: 42 },
    makesta: { penyelenggara: "PR IPNU IPPNU Tegalsambi", tanggal: "06-07/06/2026", tempat: "MTS Tegalsambi", peserta: 42 },
    rtl: [
      { penyelenggara: "PR IPNU IPPNU Tegalsambi", tanggal: "20/06/2026", tempat: "MTS Tegalsambi", peserta: 40 },
      { penyelenggara: "PR IPNU IPPNU Tegalsambi", tanggal: "04/07/2026", tempat: "Rumah Rekan Ketua", peserta: 38 },
      { penyelenggara: "PR IPNU IPPNU Tegalsambi", tanggal: "18/07/2026", tempat: "Balai Desa Tegalsambi", peserta: 38 }
    ]
  }
];

export const mockBeritaData: BeritaItem[] = [
  {
    id: "1",
    timestamp: "2026-06-15T10:00:00.000Z",
    title: "Sukses Gelar LAKMUD I, PAC Tahunan Siap Cetak Organisatoris Handal",
    content: "Latihan Kader Muda (LAKMUD) perdana yang diselenggarakan oleh PAC Tahunan sukses menjaring puluhan peserta terbaik se-Tahunan. Acara ini berlangsung dengan khidmat dan diisi oleh pemateri-pemateri handal.",
    category: "kegiatan",
    coverImage: "/assets/images/cover-modul.png",
    likes: 12,
    views: 145
  },
  {
    id: "2",
    timestamp: "2026-06-10T14:30:00.000Z",
    title: "Silaturahmi Bersama MWC NU Tahunan: Menjaga Sanad Amaliyah",
    content: "Dalam rangka mempererat ukhuwah nahdliyyah, pengurus PAC berkunjung ke jajaran Syuriah dan Tanfidziyah MWC NU Kecamatan Tahunan. Pertemuan ini menghasilkan beberapa program sinergis bersama.",
    category: "info",
    coverImage: "/assets/images/logo-bersama.png",
    likes: 5,
    views: 85
  }
];

export const mockRepoData: RepoItem[] = [
  {
    id: "pedoman-1",
    title: "Buku Pedoman Kaderisasi IPNU IPPNU",
    description: "Buku panduan kurikulum kaderisasi formal resmi hasil Kongres.",
    category: "buku",
    driveId: "1AQ00D1srOr53Jjf5w377NkFgLD5V-8e2",
    coverImage: "/assets/images/cover-modul.png"
  },
  {
    id: "art-1",
    title: "AD / ART Hasil Kongres Terbaru",
    description: "Landasan konstitusional organisasi tingkat nasional.",
    category: "buku",
    driveId: "1B0ci-oiR9-izbp-sn0Zhy_sQJ8hRuoqC",
    coverImage: "/assets/images/logo-bersama.png"
  },
  {
    id: "template-1",
    title: "Template Surat Permohonan SP Rekomendasi",
    description: "Format resmi pengajuan rekomendasi Surat Pengesahan (SP).",
    category: "surat",
    driveId: "1JHAH_eeS2504wE6GClRElK_XsaQiDwll",
    coverImage: "/assets/images/logo-ipnu.png"
  }
];

// Legality Analyzer Utility
export function analyzeSpLegality(dateString: string): SpLegalityAnalysis {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expDate = new Date(dateString);
  expDate.setHours(0, 0, 0, 0);
  const diffInTime = expDate.getTime() - today.getTime();
  const diffInDays = Math.ceil(diffInTime / (1000 * 60 * 60 * 24));

  let cluster: SpLegalityAnalysis["cluster"] = "aman";
  let statusLabel = "SP Aktif (Aman)";
  let badgeClass = "bg-emerald-50 text-emerald-600 border border-emerald-100";

  if (diffInDays < 0) {
    cluster = "habis";
    statusLabel = "Masa Berlaku Habis";
    badgeClass = "bg-red-50 text-red-650 border border-red-100";
  } else if (diffInDays <= 90) {
    cluster = "kritis";
    statusLabel = `Kritis (< 3 Bulan)`;
    badgeClass = "bg-amber-50 text-amber-600 border border-amber-100";
  }

  return { diffInDays, cluster, statusLabel, badgeClass };
}

// Get appsScriptUrl safely (client-side only helper)
function getAppsScriptUrl(): string {
  if (typeof window !== "undefined") {
    return localStorage.getItem("appsScriptUrl") || "https://script.google.com/macros/s/AKfycbwkcijUZyu64TO2Z_aIf3qxr3bnrlj3YNFS2kOHm1yNmU2c6_aTzLhrySrSTwM_3clH/exec";
  }
  return "https://script.google.com/macros/s/AKfycbwkcijUZyu64TO2Z_aIf3qxr3bnrlj3YNFS2kOHm1yNmU2c6_aTzLhrySrSTwM_3clH/exec";
}

// Fetch all database records
export async function getSpData() {
  const url = getAppsScriptUrl();
  try {
    const res = await fetch(`${url}?action=getSpData`, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
    const data = await res.json();
    // Ensure all fields are present — GAS may not return repository yet
    return {
      ipnu:       (data.ipnu       || []) as SpItem[],
      ippnu:      (data.ippnu      || []) as SpItem[],
      makesta:    (data.makesta    || []) as MakestaItem[],
      berita:     (data.berita     || []) as BeritaItem[],
      komentar:   (data.komentar   || []) as KomentarItem[],
      settings:   (data.settings   || {}) as SettingsObj,
      repository: (data.repository || mockRepoData) as RepoItem[],
    };
  } catch (err) {
    console.warn("Gagal memuat data dari Google Sheets. Menggunakan data mock.", err);
    return {
      ipnu:       mockSpData.ipnu,
      ippnu:      mockSpData.ippnu,
      makesta:    mockMakestaData,
      berita:     mockBeritaData,
      komentar:   [],
      settings:   {},
      repository: mockRepoData,
    };
  }
}

// Post form submit helper
async function postToBackend(payload: any) {
  const url = getAppsScriptUrl();
  try {
    const res = await fetch(url, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return { status: "success", message: "Form berhasil diproses" };
  } catch (err) {
    console.error("Gagal mengirim payload ke backend Google Sheets", err);
    throw err;
  }
}

// Submit SP Form
export async function submitSpForm(data: {
  banom: "ipnu" | "ippnu";
  unitName: string;
  spNumber: string;
  spDate: string;
  senderName: string;
  senderPhone: string;
  fileBerkasName: string;
  fileBerkasData: string;
  fileBerkasType: string;
  filePengurusName: string;
  filePengurusData: string;
  filePengurusType: string;
}) {
  return postToBackend({
    action: "submitSp",
    timestamp: new Date().toISOString(),
    ...data,
  });
}

// Submit Undangan Form
export async function submitUndanganForm(data: {
  pimpinan: string;
  nomorSurat: string;
  pengirim: string;
  nohp: string;
  agenda: string;
  tempat: string;
  waktu: string;
  fileName: string;
  fileData: string;
  fileType: string;
}) {
  return postToBackend({
    action: "submitUndangan",
    timestamp: new Date().toISOString(),
    ...data,
  });
}

// Submit Kaderisasi Form
export async function submitKaderisasiForm(data: {
  asal: string;
  perihal: string;
  pengirim: string;
  nohp: string;
  tanggal: string;
  keterangan: string;
  fileName: string;
  fileData: string;
  fileType: string;
}) {
  return postToBackend({
    action: "submitKaderisasi",
    timestamp: new Date().toISOString(),
    ...data,
  });
}

// Admin Action helper
async function postAdminAction(action: string, payload: any, pin: string) {
  return postToBackend({
    action,
    adminPin: pin,
    ...payload,
  });
}

export async function adminAddSp(banom: "ipnu" | "ippnu", item: SpItem, pin: string) {
  return postAdminAction("adminAddSp", { banom, ...item }, pin);
}

export async function adminUpdateSp(banom: "ipnu" | "ippnu", index: number, item: SpItem, pin: string) {
  return postAdminAction("adminUpdateSp", { banom, index, ...item }, pin);
}

export async function adminDeleteSp(banom: "ipnu" | "ippnu", index: number, pin: string) {
  return postAdminAction("adminDeleteSp", { banom, index }, pin);
}

export async function adminAddMakesta(item: MakestaItem, pin: string) {
  return postAdminAction("adminAddMakesta", item, pin);
}

export async function adminUpdateMakesta(index: number, item: MakestaItem, pin: string) {
  return postAdminAction("adminUpdateMakesta", { index, ...item }, pin);
}

export async function adminDeleteMakesta(index: number, pin: string) {
  return postAdminAction("adminDeleteMakesta", { index }, pin);
}

export async function adminAddRepo(item: RepoItem, pin: string) {
  return postAdminAction("adminAddRepo", item, pin);
}

export async function adminUpdateRepo(index: number, item: RepoItem, pin: string) {
  return postAdminAction("adminUpdateRepo", { index, ...item }, pin);
}

export async function adminDeleteRepo(index: number, pin: string) {
  return postAdminAction("adminDeleteRepo", { index }, pin);
}

export async function adminAddBerita(item: Partial<BeritaItem>, pin: string) {
  return postAdminAction("adminAddBerita", item, pin);
}

export async function adminUpdateBerita(index: number, item: Partial<BeritaItem>, pin: string) {
  return postAdminAction("adminUpdateBerita", { index, ...item }, pin);
}

export async function adminDeleteBerita(index: number, pin: string) {
  return postAdminAction("adminDeleteBerita", { index }, pin);
}

export async function adminUpdateSettings(settings: SettingsObj, pin: string) {
  return postAdminAction("adminUpdateSettings", settings, pin);
}

export async function submitLike(newsId: string) {
  return postToBackend({ action: "submitLike", newsId });
}

export async function submitView(newsId: string) {
  return postToBackend({ action: "submitView", newsId });
}

export async function submitKomentar(newsId: string, name: string, comment: string) {
  return postToBackend({
    action: "submitKomentar",
    newsId,
    timestamp: new Date().toISOString(),
    name,
    comment,
  });
}
