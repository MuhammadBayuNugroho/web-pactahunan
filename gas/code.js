/**
 * Google Apps Script - Database Backend untuk PAC IPNU IPPNU Tahunan Portal Satu Pintu
 * 
 * Cara Penggunaan:
 * 1. Buka Google Spreadsheet baru.
 * 2. Klik menu Ekstensi -> Apps Script.
 * 3. Hapus kode bawaan dan tempel kode berikut ini.
 * 4. Klik ikon Simpan (disk).
 * 5. Klik Penerapan (Deploy) -> Penerapan Baru (New Deployment).
 * 6. Pilih Jenis Penerapan: Aplikasi Web (Web App).
 * 7. Konfigurasi:
 *    - Jalankan sebagai (Execute as): Saya (Me / Akun Google Anda)
 *    - Siapa yang memiliki akses (Who has access): Siapa saja (Anyone / Siapa saja bahkan tanpa login)
 * 8. Klik Terapkan (Deploy). Salin URL Aplikasi Web yang diberikan dan masukkan ke menu Pengaturan di Website.
 */

// =========================================================================
// KONFIGURASI ADMIN — Ganti nilai di bawah dengan PIN rahasia Anda
var ADMIN_PIN = "admin1234";
// =========================================================================

// Menangani permintaan GET (Membaca data SP)
function doGet(e) {
  // Cegah error jika fungsi dijalankan secara manual dengan tombol "Run" di editor Apps Script
  if (!e || !e.parameter) {
    return ContentService.createTextOutput(JSON.stringify({ 
      status: "info", 
      message: "doGet dijalankan secara manual di editor. Gunakan Web App URL untuk integrasi website.",
      testData: readSpData() 
    })).setMimeType(ContentService.MimeType.JSON);
  }

  var action = e.parameter.action;
  
  // Endpoint khusus: verifikasi PIN admin
  if (action === 'verifyPin') {
    var pin = e.parameter.pin || '';
    return ContentService.createTextOutput(JSON.stringify({ valid: pin === ADMIN_PIN }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  if (action === 'getSpData') {
    return ContentService.createTextOutput(JSON.stringify(readSpData()))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  return ContentService.createTextOutput(JSON.stringify({ status: "error", message: "Action tidak dikenal" }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Menangani permintaan POST (Menyimpan form submission)
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var action = data.action;
    
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    
    if (action === 'submitSp') {
      var sheet = getOrCreateSheet(ss, "pengajuan_sp", [
        "Timestamp", "Banom", "Nama Pimpinan", "Nomor Surat Permohonan", 
        "Tanggal Surat", "Nama Pengirim", "WhatsApp Pengirim", 
        "Berkas Permohonan (Drive Link)", "Susunan Pengurus (Drive Link)"
      ]);
      
      var linkBerkas = saveFileToDrive(data.fileBerkasData, data.fileBerkasName, data.fileBerkasType);
      var linkPengurus = saveFileToDrive(data.filePengurusData, data.filePengurusName, data.filePengurusType);
      
      sheet.appendRow([
        data.timestamp,
        data.banom,
        data.unitName,
        data.spNumber,
        data.spDate,
        data.senderName,
        data.senderPhone,
        linkBerkas || data.fileBerkasName,
        linkPengurus || data.filePengurusName
      ]);
      return createJsonResponse({ status: "success", message: "Form SP berhasil direkam" });
    }
    
    if (action === 'submitUndangan') {
      var sheet = getOrCreateSheet(ss, "undangan", [
        "Timestamp", "Asal Pimpinan", "Nomor Surat Undangan", 
        "Nama Pengirim", "WhatsApp Pengirim", "Agenda/Perihal", 
        "Tempat/Lokasi", "Waktu Pelaksanaan", "Berkas Undangan (Drive Link)"
      ]);
      
      var linkUndangan = saveFileToDrive(data.fileData, data.fileName, data.fileType);
      
      sheet.appendRow([
        data.timestamp,
        data.pimpinan,
        data.nomorSurat,
        data.pengirim,
        data.nohp,
        data.agenda,
        data.tempat,
        data.waktu,
        linkUndangan || data.fileName
      ]);
      return createJsonResponse({ status: "success", message: "Form Undangan berhasil direkam" });
    }
    
    if (action === 'submitKaderisasi') {
      var sheet = getOrCreateSheet(ss, "kaderisasi", [
        "Timestamp", "Asal Pimpinan", "Perihal Permohonan", 
        "Nama Pengirim", "WhatsApp Pengirim", "Tanggal Agenda", "Keterangan Tambahan", "Berkas Pendukung (Drive Link)"
      ]);
      
      var linkKaderisasi = saveFileToDrive(data.fileData, data.fileName, data.fileType);
      
      sheet.appendRow([
        data.timestamp,
        data.asal,
        data.perihal,
        data.pengirim,
        data.nohp,
        data.tanggal,
        data.keterangan,
        linkKaderisasi || data.fileName
      ]);
      return createJsonResponse({ status: "success", message: "Form Kaderisasi berhasil direkam" });
    }
    
    // ---- Admin CRUD Actions ----
    if (action === 'adminAddSp')       return handleAdminAddSp(ss, data);
    if (action === 'adminDeleteSp')    return handleAdminDeleteSp(ss, data);
    if (action === 'adminUpdateSp')    return handleAdminUpdateSp(ss, data);
    if (action === 'adminAddMakesta')  return handleAdminAddMakesta(ss, data);
    if (action === 'adminDeleteMakesta') return handleAdminDeleteMakesta(ss, data);
    if (action === 'adminUpdateMakesta') return handleAdminUpdateMakesta(ss, data);
    if (action === 'adminAddRepo')     return handleAdminAddRepo(ss, data);
    if (action === 'adminDeleteRepo')  return handleAdminDeleteRepo(ss, data);
    if (action === 'adminUpdateRepo')  return handleAdminUpdateRepo(ss, data);
    if (action === 'adminAddBerita')   return handleAdminAddBerita(ss, data);
    if (action === 'adminDeleteBerita') return handleAdminDeleteBerita(ss, data);
    if (action === 'adminUpdateBerita') return handleAdminUpdateBerita(ss, data);
    if (action === 'submitLike')       return handleSubmitLike(ss, data);
    if (action === 'submitView')       return handleSubmitView(ss, data);
    if (action === 'submitKomentar')   return handleSubmitKomentar(ss, data);
    
    return createJsonResponse({ status: "error", message: "Action POST tidak dikenal" });

  } catch (error) {
    return createJsonResponse({ status: "error", message: error.toString() });
  }
}

// =========================================================================
// ADMIN CRUD HANDLERS
// =========================================================================

// Validasi PIN admin sebelum setiap aksi
function validateAdminPin(data) {
  return data && data.adminPin === ADMIN_PIN;
}

function handleAdminAddSp(ss, data) {
  if (!validateAdminPin(data)) return createJsonResponse({ status: "error", message: "PIN tidak valid!" });
  var sheetName = data.banom === 'ipnu' ? 'sp_ipnu' : 'sp_ippnu';
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) return createJsonResponse({ status: "error", message: "Sheet tidak ditemukan." });
  sheet.appendRow([data.name, data.type, data.spNumber, data.expiryDate, data.phone || "", data.email || ""]);
  return createJsonResponse({ status: "success", message: "SP baru berhasil ditambahkan." });
}

function handleAdminDeleteSp(ss, data) {
  if (!validateAdminPin(data)) return createJsonResponse({ status: "error", message: "PIN tidak valid!" });
  var sheetName = data.banom === 'ipnu' ? 'sp_ipnu' : 'sp_ippnu';
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) return createJsonResponse({ status: "error", message: "Sheet tidak ditemukan." });
  var rowIndex = Number(data.index) + 2; // +1 header, +1 untuk 1-based
  if (rowIndex > 1 && rowIndex <= sheet.getLastRow()) {
    sheet.deleteRow(rowIndex);
    return createJsonResponse({ status: "success", message: "Baris berhasil dihapus." });
  }
  return createJsonResponse({ status: "error", message: "Baris tidak ditemukan." });
}

function handleAdminUpdateSp(ss, data) {
  if (!validateAdminPin(data)) return createJsonResponse({ status: "error", message: "PIN tidak valid!" });
  var sheetName = data.banom === 'ipnu' ? 'sp_ipnu' : 'sp_ippnu';
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) return createJsonResponse({ status: "error", message: "Sheet tidak ditemukan." });
  var rowIndex = Number(data.index) + 2;
  if (rowIndex > 1 && rowIndex <= sheet.getLastRow()) {
    sheet.getRange(rowIndex, 1).setValue(data.name);
    sheet.getRange(rowIndex, 2).setValue(data.type);
    sheet.getRange(rowIndex, 3).setValue(data.spNumber);
    sheet.getRange(rowIndex, 4).setValue(data.expiryDate);
    sheet.getRange(rowIndex, 5).setValue(data.phone || "");
    sheet.getRange(rowIndex, 6).setValue(data.email || "");
    return createJsonResponse({ status: "success", message: "SP berhasil diperbarui." });
  }
  return createJsonResponse({ status: "error", message: "Baris tidak ditemukan." });
}

function handleAdminAddMakesta(ss, data) {
  if (!validateAdminPin(data)) return createJsonResponse({ status: "error", message: "PIN tidak valid!" });
  var sheet = ss.getSheetByName('makesta');
  if (!sheet) return createJsonResponse({ status: "error", message: "Sheet makesta tidak ditemukan." });
  sheet.appendRow([
    data.penyelenggara, data.tanggal, data.tempat, data.peserta,
    data.praMakesta?.penyelenggara || data.penyelenggara, data.praMakesta?.tanggal || '-', data.praMakesta?.tempat || '-', Number(data.praMakesta?.peserta) || 0,
    data.makesta?.penyelenggara || data.penyelenggara, data.makesta?.tanggal || data.tanggal, data.makesta?.tempat || data.tempat, Number(data.makesta?.peserta) || data.peserta,
    data.rtl?.[0]?.penyelenggara || data.penyelenggara, data.rtl?.[0]?.tanggal || '-', data.rtl?.[0]?.tempat || '-', Number(data.rtl?.[0]?.peserta) || 0,
    data.rtl?.[1]?.penyelenggara || data.penyelenggara, data.rtl?.[1]?.tanggal || '-', data.rtl?.[1]?.tempat || '-', Number(data.rtl?.[1]?.peserta) || 0,
    data.rtl?.[2]?.penyelenggara || data.penyelenggara, data.rtl?.[2]?.tanggal || '-', data.rtl?.[2]?.tempat || '-', Number(data.rtl?.[2]?.peserta) || 0
  ]);
  return createJsonResponse({ status: "success", message: "Rekap Makesta berhasil ditambahkan." });
}

function handleAdminUpdateMakesta(ss, data) {
  if (!validateAdminPin(data)) return createJsonResponse({ status: "error", message: "PIN tidak valid!" });
  var sheet = ss.getSheetByName('makesta');
  if (!sheet) return createJsonResponse({ status: "error", message: "Sheet makesta tidak ditemukan." });
  var rowIndex = Number(data.index) + 2;
  if (rowIndex > 1 && rowIndex <= sheet.getLastRow()) {
    sheet.getRange(rowIndex, 1).setValue(data.penyelenggara);
    sheet.getRange(rowIndex, 2).setValue(data.tanggal);
    sheet.getRange(rowIndex, 3).setValue(data.tempat);
    sheet.getRange(rowIndex, 4).setValue(data.peserta);
    
    sheet.getRange(rowIndex, 5).setValue(data.praMakesta?.penyelenggara || data.penyelenggara);
    sheet.getRange(rowIndex, 6).setValue(data.praMakesta?.tanggal || '-');
    sheet.getRange(rowIndex, 7).setValue(data.praMakesta?.tempat || '-');
    sheet.getRange(rowIndex, 8).setValue(Number(data.praMakesta?.peserta) || 0);

    sheet.getRange(rowIndex, 9).setValue(data.makesta?.penyelenggara || data.penyelenggara);
    sheet.getRange(rowIndex, 10).setValue(data.makesta?.tanggal || data.tanggal);
    sheet.getRange(rowIndex, 11).setValue(data.makesta?.tempat || data.tempat);
    sheet.getRange(rowIndex, 12).setValue(Number(data.makesta?.peserta) || data.peserta);

    sheet.getRange(rowIndex, 13).setValue(data.rtl?.[0]?.penyelenggara || data.penyelenggara);
    sheet.getRange(rowIndex, 14).setValue(data.rtl?.[0]?.tanggal || '-');
    sheet.getRange(rowIndex, 15).setValue(data.rtl?.[0]?.tempat || '-');
    sheet.getRange(rowIndex, 16).setValue(Number(data.rtl?.[0]?.peserta) || 0);

    sheet.getRange(rowIndex, 17).setValue(data.rtl?.[1]?.penyelenggara || data.penyelenggara);
    sheet.getRange(rowIndex, 18).setValue(data.rtl?.[1]?.tanggal || '-');
    sheet.getRange(rowIndex, 19).setValue(data.rtl?.[1]?.tempat || '-');
    sheet.getRange(rowIndex, 20).setValue(Number(data.rtl?.[1]?.peserta) || 0);

    sheet.getRange(rowIndex, 21).setValue(data.rtl?.[2]?.penyelenggara || data.penyelenggara);
    sheet.getRange(rowIndex, 22).setValue(data.rtl?.[2]?.tanggal || '-');
    sheet.getRange(rowIndex, 23).setValue(data.rtl?.[2]?.tempat || '-');
    sheet.getRange(rowIndex, 24).setValue(Number(data.rtl?.[2]?.peserta) || 0);

    return createJsonResponse({ status: "success", message: "Rekap Makesta berhasil diperbarui." });
  }
  return createJsonResponse({ status: "error", message: "Baris tidak ditemukan." });
}

function handleAdminDeleteMakesta(ss, data) {
  if (!validateAdminPin(data)) return createJsonResponse({ status: "error", message: "PIN tidak valid!" });
  var sheet = ss.getSheetByName('makesta');
  if (!sheet) return createJsonResponse({ status: "error", message: "Sheet makesta tidak ditemukan." });
  var rowIndex = Number(data.index) + 2;
  if (rowIndex > 1 && rowIndex <= sheet.getLastRow()) {
    sheet.deleteRow(rowIndex);
    return createJsonResponse({ status: "success", message: "Rekap Makesta berhasil dihapus." });
  }
  return createJsonResponse({ status: "error", message: "Baris tidak ditemukan." });
}

function handleAdminAddRepo(ss, data) {
  if (!validateAdminPin(data)) return createJsonResponse({ status: "error", message: "PIN tidak valid!" });
  var sheet = getOrCreateSheet(ss, 'repository', ['ID', 'Judul', 'Deskripsi', 'Kategori', 'Drive ID', 'Cover Image']);
  sheet.appendRow([data.id, data.title, data.description, data.category, data.driveId, data.coverImage]);
  return createJsonResponse({ status: "success", message: "Dokumen repositori berhasil ditambahkan." });
}

function handleAdminUpdateRepo(ss, data) {
  if (!validateAdminPin(data)) return createJsonResponse({ status: "error", message: "PIN tidak valid!" });
  var sheet = ss.getSheetByName('repository');
  if (!sheet) return createJsonResponse({ status: "error", message: "Sheet repository tidak ditemukan." });
  var rowIndex = Number(data.index) + 2;
  if (rowIndex > 1 && rowIndex <= sheet.getLastRow()) {
    sheet.getRange(rowIndex, 2).setValue(data.title);
    sheet.getRange(rowIndex, 3).setValue(data.description);
    sheet.getRange(rowIndex, 4).setValue(data.category);
    sheet.getRange(rowIndex, 5).setValue(data.driveId);
    sheet.getRange(rowIndex, 6).setValue(data.coverImage);
    return createJsonResponse({ status: "success", message: "Dokumen repositori berhasil diperbarui." });
  }
  return createJsonResponse({ status: "error", message: "Baris tidak ditemukan." });
}

function handleAdminDeleteRepo(ss, data) {
  if (!validateAdminPin(data)) return createJsonResponse({ status: "error", message: "PIN tidak valid!" });
  var sheet = ss.getSheetByName('repository');
  if (!sheet) return createJsonResponse({ status: "error", message: "Sheet repository tidak ditemukan." });
  var rowIndex = Number(data.index) + 2;
  if (rowIndex > 1 && rowIndex <= sheet.getLastRow()) {
    sheet.deleteRow(rowIndex);
    return createJsonResponse({ status: "success", message: "Dokumen repositori berhasil dihapus." });
  }
  return createJsonResponse({ status: "error", message: "Baris tidak ditemukan." });
}

// Helper untuk menyimpan berkas Base64 ke Google Drive dan mengembalikan tautan unduhan publik
function saveFileToDrive(base64Data, fileName, mimeType) {
  if (!base64Data || !fileName) return "";
  
  try {
    // Target folder spesifik yang diberikan oleh user (1JHAH_eeS2504wE6GClRElK_XsaQiDwll)
    var folderId = "1JHAH_eeS2504wE6GClRElK_XsaQiDwll";
    var folder = DriveApp.getFolderById(folderId);
    
    var decoded = Utilities.base64Decode(base64Data);
    var blob = Utilities.newBlob(decoded, mimeType, fileName);
    var file = folder.createFile(blob);
    
    // Atur izin berbagi agar siapa saja yang memiliki link dapat melihat file
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    
    return file.getUrl();
  } catch (err) {
    return "Error saving file: " + err.toString();
  }
}

// Membaca data monitoring SP dari Spreadsheet
function readSpData() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  var defaultIpnu = [
    ["PR IPNU Mantingan", "ranting", "089/IPNU/SP/A/X/2024", "2026-10-15"],
    ["PR IPNU Senenan", "ranting", "042/IPNU/SP/A/III/2025", "2027-03-20"],
    ["PR IPNU Tahunan", "ranting", "102/IPNU/SP/A/I/2024", "2026-01-10"],
    ["PR IPNU Tegalsambi", "ranting", "067/IPNU/SP/A/VIII/2024", "2026-08-05"],
    ["PR IPNU Demangan", "ranting", "115/IPNU/SP/A/XI/2024", "2026-11-20"],
    ["PR IPNU Ngabul", "ranting", "015/IPNU/SP/A/I/2025", "2027-01-15"],
    ["PR IPNU Langon", "ranting", "099/IPNU/SP/A/V/2024", "2026-05-02"],
    ["PR IPNU Sukodono", "ranting", "054/IPNU/SP/A/IV/2025", "2027-04-10"],
    ["PR IPNU Kecapi", "ranting", "078/IPNU/SP/A/VII/2024", "2026-07-28"],
    ["PR IPNU Petekeyan", "ranting", "130/IPNU/SP/A/XII/2024", "2026-12-15"],
    ["PK IPNU MA Hasyim Asy'ari", "komisariat", "034/IPNU/SP/B/II/2025", "2026-02-15"],
    ["PK IPNU SMK NU Tahunan", "komisariat", "049/IPNU/SP/B/VI/2024", "2026-07-15"]
  ];
  
  var defaultIppnu = [
    ["PR IPPNU Mantingan", "ranting", "087/IPPNU/SP/A/X/2024", "2026-10-15"],
    ["PR IPPNU Senenan", "ranting", "041/IPPNU/SP/A/III/2025", "2027-03-20"],
    ["PR IPPNU Tahunan", "ranting", "101/IPPNU/SP/A/I/2024", "2026-01-10"],
    ["PR IPPNU Tegalsambi", "ranting", "065/IPPNU/SP/A/VIII/2024", "2026-08-05"],
    ["PR IPPNU Demangan", "ranting", "112/IPPNU/SP/A/XI/2024", "2026-11-20"],
    ["PR IPPNU Ngabul", "ranting", "014/IPPNU/SP/A/I/2025", "2027-01-15"],
    ["PR IPPNU Langon", "ranting", "098/IPPNU/SP/A/V/2024", "2026-05-02"],
    ["PR IPPNU Sukodono", "ranting", "053/IPPNU/SP/A/IV/2025", "2027-04-10"],
    ["PR IPPNU Kecapi", "ranting", "077/IPPNU/SP/A/VII/2024", "2026-07-25"],
    ["PR IPPNU Petekeyan", "ranting", "128/IPPNU/SP/A/XII/2024", "2026-12-15"],
    ["PK IPPNU MA Hasyim Asy'ari", "komisariat", "033/IPPNU/SP/B/II/2025", "2026-02-15"],
    ["PK IPPNU SMK NU Tahunan", "komisariat", "048/IPPNU/SP/B/VI/2024", "2026-07-15"]
  ];

  var defaultMakesta = [
    [
      "PR Desa Mantingan", "14-15/03/2026", "SDN 2 Mantingan", 35,
      "PR IPNU IPPNU Mantingan", "07/03/2026", "Madin Mantingan", 35,
      "PR IPNU IPPNU Mantingan", "14-15/03/2026", "SDN 2 Mantingan", 35,
      "PR IPNU IPPNU Mantingan", "28/03/2026", "Serambi Masjid Mantingan", 32,
      "PR IPNU IPPNU Mantingan", "11/04/2026", "Rumah Rekan Ketua", 30,
      "PR IPNU IPPNU Mantingan", "25/04/2026", "Balai Desa Mantingan", 28
    ],
    [
      "PK MA Hasyim Asy'ari", "18/04/2026", "Aula Madrasah", 48,
      "PK IPNU IPPNU MA Hasyim Asy'ari", "11/04/2026", "Kelas X MA", 48,
      "PK IPNU IPPNU MA Hasyim Asy'ari", "18/04/2026", "Aula Madrasah", 48,
      "PK IPNU IPPNU MA Hasyim Asy'ari", "25/04/2026", "Perpustakaan Madrasah", 46,
      "PK IPNU IPPNU MA Hasyim Asy'ari", "02/05/2026", "Laboratorium Komputer", 45,
      "PK IPNU IPPNU MA Hasyim Asy'ari", "09/05/2026", "Aula Madrasah", 45
    ],
    [
      "PR Desa Senenan", "09-10/05/2026", "Madin Senenan", 30,
      "PR IPNU IPPNU Senenan", "02/05/2026", "Serambi Masjid Senenan", 30,
      "PR IPNU IPPNU Senenan", "09-10/05/2026", "Madin Senenan", 30,
      "PR IPNU IPPNU Senenan", "23/05/2026", "Madin Senenan", 28,
      "PR IPNU IPPNU Senenan", "06/06/2026", "Rumah Rekan Ketua", 27,
      "PR IPNU IPPNU Senenan", "20/06/2026", "Balai Desa Senenan", 25
    ],
    [
      "PR Desa Tegalsambi", "06-07/06/2026", "MTS Tegalsambi", 42,
      "PR IPNU IPPNU Tegalsambi", "30/05/2026", "Serambi Masjid Tegalsambi", 42,
      "PR IPNU IPPNU Tegalsambi", "06-07/06/2026", "MTS Tegalsambi", 42,
      "PR IPNU IPPNU Tegalsambi", "20/06/2026", "MTS Tegalsambi", 40,
      "PR IPNU IPPNU Tegalsambi", "04/07/2026", "Rumah Rekan Ketua", 38,
      "PR IPNU IPPNU Tegalsambi", "18/07/2026", "Balai Desa Tegalsambi", 38
    ]
  ];
  
  var defaultBerita = [
    [
      "1",
      "2026-06-15T10:00:00.000Z",
      "Sukses Gelar LAKMUD I, PAC Tahunan Siap Cetak Organisatoris Handal",
      "Latihan Kader Muda (LAKMUD) perdana yang diselenggarakan oleh PAC Tahunan sukses menjaring puluhan peserta terbaik se-Tahunan. Acara ini berlangsung dengan khidmat dan diisi oleh pemateri-pemateri handal.",
      "kegiatan",
      "assets/images/cover-modul.png",
      10,
      120
    ],
    [
      "2",
      "2026-06-10T14:30:00.000Z",
      "Silaturahmi Bersama MWC NU Tahunan: Menjaga Sanad Amaliyah",
      "Dalam rangka mempererat ukhuwah nahdliyyah, pengurus PAC berkunjung ke jajaran Syuriah dan Tanfidziyah MWC NU Kecamatan Tahunan. Pertemuan ini menghasilkan beberapa program sinergis bersama.",
      "info",
      "assets/images/logo-bersama.png",
      5,
      85
    ]
  ];
  var defaultKomentar = [
    ["1", "2026-06-15T11:00:00.000Z", "Rekan Ahmad", "Luar biasa! Semangat terus PAC Tahunan!"],
    ["1", "2026-06-15T12:30:00.000Z", "Rekanita Sofia", "LAKMUD I yang sangat berkesan, semoga barokah."],
    ["2", "2026-06-10T15:00:00.000Z", "Zainal Arifin", "Sinergi yang sangat bagus untuk kemajuan banom-banom NU."]
  ];

  var sheetIpnu = getOrCreateSheet(ss, "sp_ipnu", ["Nama", "Tipe", "Nomor SP Resmi", "Masa Berlaku", "No HP Pengurus", "Email Pengurus"], defaultIpnu);
  var sheetIppnu = getOrCreateSheet(ss, "sp_ippnu", ["Nama", "Tipe", "Nomor SP Resmi", "Masa Berlaku", "No HP Pengurus", "Email Pengurus"], defaultIppnu);
  
  var makestaHeaders = [
    "Penyelenggara", "Tanggal", "Tempat", "Peserta",
    "Pra Penyelenggara", "Pra Tanggal", "Pra Tempat", "Pra Peserta",
    "Makesta Penyelenggara", "Makesta Tanggal", "Makesta Tempat", "Makesta Peserta",
    "RTL1 Penyelenggara", "RTL1 Tanggal", "RTL1 Tempat", "RTL1 Peserta",
    "RTL2 Penyelenggara", "RTL2 Tanggal", "RTL2 Tempat", "RTL2 Peserta",
    "RTL3 Penyelenggara", "RTL3 Tanggal", "RTL3 Tempat", "RTL3 Peserta"
  ];
  var sheetMakesta = getOrCreateSheet(ss, "makesta", makestaHeaders, defaultMakesta);
  
  var sheetBerita = getOrCreateSheet(ss, "berita", ["ID", "Timestamp", "Judul", "Konten", "Kategori", "Gambar", "Likes", "Views"], defaultBerita);
  var sheetKomentar = getOrCreateSheet(ss, "komentar", ["NewsID", "Timestamp", "Nama", "Komentar"], defaultKomentar);

  return {
    ipnu: sheetToObjects(sheetIpnu),
    ippnu: sheetToObjects(sheetIppnu),
    makesta: sheetMakestaToObjects(sheetMakesta),
    berita: sheetBeritaToObjects(sheetBerita),
    komentar: sheetKomentarToObjects(sheetKomentar)
  };
}

// Mengambil data sheet dan mengonversi ke array of objects
function sheetToObjects(sheet) {
  var range = sheet.getDataRange();
  var values = range.getValues();
  var objects = [];
  
  if (values.length <= 1) return objects;
  
  for (var i = 1; i < values.length; i++) {
    var row = values[i];
    
    // Format tanggal jika kolom expDate adalah objek Date
    var expiryDate = row[3];
    if (expiryDate instanceof Date) {
      // Ubah format ke YYYY-MM-DD
      expiryDate = expiryDate.toISOString().split('T')[0];
    } else {
      expiryDate = String(expiryDate).trim();
    }
    
    objects.push({
      name: String(row[0]).trim(),
      type: String(row[1]).trim(),
      spNumber: String(row[2]).trim(),
      expiryDate: expiryDate,
      phone: row[4] ? String(row[4]).trim() : "",
      email: row[5] ? String(row[5]).trim() : ""
    });
  }
  return objects;
}

// Menjalankan pengecekan SP kadaluarsa dan mengirim notifikasi email
function checkAndSendSpNotifications() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = [ss.getSheetByName("sp_ipnu"), ss.getSheetByName("sp_ippnu")];
  var today = new Date();
  today.setHours(0, 0, 0, 0);

  for (var s = 0; s < sheets.length; s++) {
    var sheet = sheets[s];
    if (!sheet) continue;
    var values = sheet.getDataRange().getValues();
    if (values.length <= 1) continue;

    for (var i = 1; i < values.length; i++) {
      var row = values[i];
      var name = String(row[0]).trim();
      var spNumber = String(row[2]).trim();
      var expiryVal = row[3];
      var phone = row[4] ? String(row[4]).trim() : "";
      var email = row[5] ? String(row[5]).trim() : "";

      if (!expiryVal) continue;
      var expiryDate = new Date(expiryVal);
      expiryDate.setHours(0, 0, 0, 0);
      
      var diffTime = expiryDate.getTime() - today.getTime();
      var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      // Jika mendekati 2 bulan (kurang dari atau sama dengan 60 hari) dan belum terlewat
      if (diffDays > 0 && diffDays <= 60) {
        // Kirim email peringatan mendekati masa berakhir
        if (email) {
          sendEmailAlert(email, name, spNumber, diffDays, false);
        }
      } 
      // Jika sudah lewat masa berakhir
      else if (diffDays <= 0) {
        var daysPast = Math.abs(diffDays);
        // Setiap 2 minggu (kelipatan 14 hari) kirim peringatan rapat anggota / reorganisasi
        if (daysPast === 0 || daysPast % 14 === 0) {
          if (email) {
            sendEmailAlert(email, name, spNumber, daysPast, true);
          }
        }
      }
    }
  }
}

function sendEmailAlert(toEmail, organizationName, spNumber, days, isExpired) {
  var subject = "";
  var body = "";
  
  if (isExpired) {
    subject = "[PERINGATAN REORGANISASI] SP " + organizationName + " Telah Berakhir";
    body = "Assalamu'alaikum Wr. Wb.\n\n" +
           "Pemberitahuan kepada Pengurus " + organizationName + ",\n\n" +
           "Masa berlaku Surat Keputusan (SP) Anda dengan nomor surat " + spNumber + " telah berakhir sekitar " + days + " hari yang lalu.\n" +
           "Berdasarkan peraturan organisasi, mohon untuk SEGERA melakukan rapat anggota dan proses reorganisasi kepengurusan baru selambat-lambatnya dalam 2 minggu ke depan.\n\n" +
           "Semoga lancar dan berkah.\n" +
           "Wallahul muwaffiq ila aqwamith thariq.\n\n" +
           "PAC IPNU IPPNU Kecamatan Tahunan\n" +
           "Sistem Monitoring Portal Satu Pintu";
  } else {
    subject = "[PENTING] Masa Aktif SP " + organizationName + " Tinggal " + days + " Hari Lagi";
    body = "Assalamu'alaikum Wr. Wb.\n\n" +
           "Pemberitahuan kepada Pengurus " + organizationName + ",\n\n" +
           "Masa berlaku Surat Keputusan (SP) Anda dengan nomor surat " + spNumber + " akan berakhir dalam waktu " + days + " hari lagi.\n" +
           "Mohon segera siapkan berkas-berkas permohonan SP perpanjangan atau persiapkan agenda rapat reorganisasi sebelum masa aktif habis guna menjaga legalitas organisasi.\n\n" +
           "Terima kasih atas perhatiannya.\n" +
           "Wallahul muwaffiq ila aqwamith thariq.\n\n" +
           "PAC IPNU IPPNU Kecamatan Tahunan\n" +
           "Sistem Monitoring Portal Satu Pintu";
  }
  
  try {
    MailApp.sendEmail(toEmail, subject, body);
  } catch (e) {
    Logger.log("Gagal mengirim email ke " + toEmail + ": " + e.toString());
  }
}

// Helper untuk memformat objek Tanggal menjadi string DD/MM/YYYY
function formatDateValue(val) {
  if (val instanceof Date) {
    var day = String(val.getDate());
    if (day.length === 1) day = "0" + day;
    var month = String(val.getMonth() + 1);
    if (month.length === 1) month = "0" + month;
    var year = val.getFullYear();
    return day + "/" + month + "/" + year;
  }
  return String(val).trim();
}

// Mengonversi sheet makesta ke format terstruktur
function sheetMakestaToObjects(sheet) {
  var range = sheet.getDataRange();
  var values = range.getValues();
  var objects = [];
  
  if (values.length <= 1) return objects;
  
  for (var i = 1; i < values.length; i++) {
    var row = values[i];
    objects.push({
      penyelenggara: String(row[0]).trim(),
      tanggal: formatDateValue(row[1]),
      tempat: String(row[2]).trim(),
      peserta: Number(row[3]) || 0,
      praMakesta: {
        penyelenggara: String(row[4]).trim(),
        tanggal: formatDateValue(row[5]),
        tempat: String(row[6]).trim(),
        peserta: Number(row[7]) || 0
      },
      makesta: {
        penyelenggara: String(row[8]).trim(),
        tanggal: formatDateValue(row[9]),
        tempat: String(row[10]).trim(),
        peserta: Number(row[11]) || 0
      },
      rtl: [
        {
          penyelenggara: String(row[12]).trim(),
          tanggal: formatDateValue(row[13]),
          tempat: String(row[14]).trim(),
          peserta: Number(row[15]) || 0
        },
        {
          penyelenggara: String(row[16]).trim(),
          tanggal: formatDateValue(row[17]),
          tempat: String(row[18]).trim(),
          peserta: Number(row[19]) || 0
        },
        {
          penyelenggara: String(row[20]).trim(),
          tanggal: formatDateValue(row[21]),
          tempat: String(row[22]).trim(),
          peserta: Number(row[23]) || 0
        }
      ]
    });
  }
  return objects;
}

// Helper untuk mengambil sheet atau membuatnya jika belum ada
function getOrCreateSheet(ss, name, headers, defaultData) {
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);
    if (defaultData && defaultData.length > 0) {
      sheet.getRange(2, 1, defaultData.length, defaultData[0].length).setValues(defaultData);
    }
    // Percantik header
    sheet.getRange(1, 1, 1, headers.length)
      .setFontWeight("bold")
      .setBackground("#6D28D9")
      .setFontColor("#FFFFFF")
      .setHorizontalAlignment("center");
    sheet.setFrozenRows(1);
    sheet.autoResizeColumns(1, headers.length);
  }
  return sheet;
}

// Helper membuat output JSON
function createJsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// JALANKAN INI SEKALI di editor Apps Script Anda (klik tombol Run pada fungsi ini)
// untuk memaksa Google memunculkan dialog otorisasi izin TULIS/CREATE file di Google Drive.
function triggerOtorisasiLengkap() {
  var root = DriveApp.getRootFolder();
  // Panggilan palsu untuk memaksa Google Apps Script mendeteksi kebutuhan izin menulis file di Drive
  if (false) {
    DriveApp.createFile("dummy.txt", "dummy");
  }
  Logger.log("Otorisasi selesai dipicu. Silakan periksa apakah Anda sudah memberikan izin.");
}

function sheetBeritaToObjects(sheet) {
  var range = sheet.getDataRange();
  var values = range.getValues();
  var objects = [];
  if (values.length <= 1) return objects;
  for (var i = 1; i < values.length; i++) {
    var row = values[i];
    objects.push({
      id: String(row[0]).trim(),
      timestamp: String(row[1]).trim(),
      title: String(row[2]).trim(),
      content: String(row[3]).trim(),
      category: String(row[4]).trim(),
      coverImage: String(row[5]).trim(),
      likes: Number(row[6]) || 0,
      views: Number(row[7]) || 0
    });
  }
  return objects;
}

function sheetKomentarToObjects(sheet) {
  var range = sheet.getDataRange();
  var values = range.getValues();
  var objects = [];
  if (values.length <= 1) return objects;
  for (var i = 1; i < values.length; i++) {
    var row = values[i];
    objects.push({
      newsId: String(row[0]).trim(),
      timestamp: String(row[1]).trim(),
      name: String(row[2]).trim(),
      comment: String(row[3]).trim()
    });
  }
  return objects;
}

function handleAdminAddBerita(ss, data) {
  if (!validateAdminPin(data)) return createJsonResponse({ status: "error", message: "PIN tidak valid!" });
  var sheet = getOrCreateSheet(ss, 'berita', ["ID", "Timestamp", "Judul", "Konten", "Kategori", "Gambar", "Likes", "Views"]);
  
  var imageUrl = data.coverImage;
  if (data.fileData) {
    imageUrl = saveFileToDrive(data.fileData, data.fileName, data.fileType);
  }
  
  sheet.appendRow([
    data.id || String(Date.now()),
    data.timestamp || new Date().toISOString(),
    data.title,
    data.content,
    data.category,
    imageUrl || "",
    0, // Likes
    0  // Views
  ]);
  return createJsonResponse({ status: "success", message: "Berita berhasil ditambahkan." });
}

function handleAdminDeleteBerita(ss, data) {
  if (!validateAdminPin(data)) return createJsonResponse({ status: "error", message: "PIN tidak valid!" });
  var sheet = ss.getSheetByName('berita');
  if (!sheet) return createJsonResponse({ status: "error", message: "Sheet berita tidak ditemukan." });
  var values = sheet.getDataRange().getValues();
  var targetId = String(data.id);
  
  for (var i = 1; i < values.length; i++) {
    if (String(values[i][0]) === targetId) {
      sheet.deleteRow(i + 1);
      
      // Also delete comments associated with this news item
      var commentSheet = ss.getSheetByName('komentar');
      if (commentSheet) {
        var commentValues = commentSheet.getDataRange().getValues();
        for (var j = commentValues.length - 1; j >= 1; j--) {
          if (String(commentValues[j][0]) === targetId) {
            commentSheet.deleteRow(j + 1);
          }
        }
      }
      return createJsonResponse({ status: "success", message: "Berita berhasil dihapus." });
    }
  }
  return createJsonResponse({ status: "error", message: "Berita tidak ditemukan." });
}

function handleAdminUpdateBerita(ss, data) {
  if (!validateAdminPin(data)) return createJsonResponse({ status: "error", message: "PIN tidak valid!" });
  var sheet = ss.getSheetByName('berita');
  if (!sheet) return createJsonResponse({ status: "error", message: "Sheet berita tidak ditemukan." });
  var values = sheet.getDataRange().getValues();
  var targetId = String(data.id);
  
  for (var i = 1; i < values.length; i++) {
    if (String(values[i][0]) === targetId) {
      var imageUrl = data.coverImage || values[i][5];
      if (data.fileData) {
        imageUrl = saveFileToDrive(data.fileData, data.fileName, data.fileType);
      }
      
      sheet.getRange(i + 1, 3).setValue(data.title);
      sheet.getRange(i + 1, 4).setValue(data.content);
      sheet.getRange(i + 1, 5).setValue(data.category);
      sheet.getRange(i + 1, 6).setValue(imageUrl);
      return createJsonResponse({ status: "success", message: "Berita berhasil diperbarui." });
    }
  }
  return createJsonResponse({ status: "error", message: "Berita tidak ditemukan." });
}

function handleSubmitLike(ss, data) {
  var sheet = ss.getSheetByName('berita');
  if (!sheet) return createJsonResponse({ status: "error", message: "Sheet berita tidak ditemukan." });
  var values = sheet.getDataRange().getValues();
  var targetId = String(data.id);
  
  for (var i = 1; i < values.length; i++) {
    if (String(values[i][0]) === targetId) {
      var currentLikes = Number(values[i][6]) || 0;
      sheet.getRange(i + 1, 7).setValue(currentLikes + 1);
      return createJsonResponse({ status: "success", message: "Like berhasil ditambahkan.", likes: currentLikes + 1 });
    }
  }
  return createJsonResponse({ status: "error", message: "Berita tidak ditemukan." });
}

function handleSubmitView(ss, data) {
  var sheet = ss.getSheetByName('berita');
  if (!sheet) return createJsonResponse({ status: "error", message: "Sheet berita tidak ditemukan." });
  var values = sheet.getDataRange().getValues();
  var targetId = String(data.id);
  
  for (var i = 1; i < values.length; i++) {
    if (String(values[i][0]) === targetId) {
      var currentViews = Number(values[i][7]) || 0;
      sheet.getRange(i + 1, 8).setValue(currentViews + 1);
      return createJsonResponse({ status: "success", message: "View berhasil ditambahkan.", views: currentViews + 1 });
    }
  }
  return createJsonResponse({ status: "error", message: "Berita tidak ditemukan." });
}

function handleSubmitKomentar(ss, data) {
  var sheet = getOrCreateSheet(ss, 'komentar', ["NewsID", "Timestamp", "Nama", "Komentar"]);
  sheet.appendRow([
    String(data.newsId),
    data.timestamp || new Date().toISOString(),
    data.name,
    data.comment
  ]);
  return createJsonResponse({ status: "success", message: "Komentar berhasil ditambahkan." });
}
