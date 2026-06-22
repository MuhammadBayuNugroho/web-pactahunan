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
    
    return createJsonResponse({ status: "error", message: "Action POST tidak dikenal" });
    
  } catch (error) {
    return createJsonResponse({ status: "error", message: error.toString() });
  }
}

// Helper untuk menyimpan berkas Base64 ke Google Drive dan mengembalikan tautan unduhan publik
function saveFileToDrive(base64Data, fileName, mimeType) {
  if (!base64Data || !fileName) return "";
  
  try {
    // Target folder spesifik yang diberikan oleh user
    var folderId = "1Oe9Jie92JvDFMLlAGghe3ZhHpM3_OF0-";
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
  
  var sheetIpnu = getOrCreateSheet(ss, "sp_ipnu", ["Nama", "Tipe", "Nomor SP Resmi", "Masa Berlaku"], defaultIpnu);
  var sheetIppnu = getOrCreateSheet(ss, "sp_ippnu", ["Nama", "Tipe", "Nomor SP Resmi", "Masa Berlaku"], defaultIppnu);
  
  var makestaHeaders = [
    "Penyelenggara", "Tanggal", "Tempat", "Peserta",
    "Pra Penyelenggara", "Pra Tanggal", "Pra Tempat", "Pra Peserta",
    "Makesta Penyelenggara", "Makesta Tanggal", "Makesta Tempat", "Makesta Peserta",
    "RTL1 Penyelenggara", "RTL1 Tanggal", "RTL1 Tempat", "RTL1 Peserta",
    "RTL2 Penyelenggara", "RTL2 Tanggal", "RTL2 Tempat", "RTL2 Peserta",
    "RTL3 Penyelenggara", "RTL3 Tanggal", "RTL3 Tempat", "RTL3 Peserta"
  ];
  var sheetMakesta = getOrCreateSheet(ss, "makesta", makestaHeaders, defaultMakesta);
  
  return {
    ipnu: sheetToObjects(sheetIpnu),
    ippnu: sheetToObjects(sheetIppnu),
    makesta: sheetMakestaToObjects(sheetMakesta)
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
      expiryDate: expiryDate
    });
  }
  return objects;
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
