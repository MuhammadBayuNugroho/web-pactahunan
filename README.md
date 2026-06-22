# Panduan Konfigurasi Website PAC IPNU IPPNU Tahunan

Website ini dirancang untuk dihosting di **GitHub Pages** dan menggunakan **Google Sheets** sebagai database-nya melalui perantara **Google Apps Script**.

---

## 📁 Struktur Folder Proyek

```text
web-pac-tahunan/
├── assets/
│   ├── images/      # Folder untuk menampung gambar/logo (.png, .jpg)
│   └── docs/        # Folder untuk menampung dokumen unduhan (.pdf)
├── css/
│   └── style.css    # Custom CSS tambahan
├── js/
│   └── app.js       # Logika utama JavaScript website
├── gas/
│   └── code.js      # Kode Apps Script (untuk Google Sheets)
├── index.html       # Halaman utama portal
└── README.md        # Panduan penggunaan (file ini)
```

> [!NOTE]
> Pastikan Anda telah memindahkan file logo (`7. LOGO IPNU RESMI.png` dan `Logo IPPNU Official.jpg`) ke dalam folder `assets/images/` agar logo muncul di website.

---

## 🛠️ Langkah 1: Setup Google Spreadsheet & Apps Script

Untuk mengaktifkan fitur database real-time:

1. Buat Google Spreadsheet baru di Google Drive Anda.
2. Pada Spreadsheet tersebut, buka **Ekstensi** -> **Apps Script**.
3. Buka file [gas/code.js](file:///d:/Pemrograman/web-pac-tahunan/gas/code.js), salin seluruh isinya, lalu tempel (paste) ke dalam editor Apps Script.
4. Klik tombol **Simpan** (ikon disket) di atas.

---

## 🚀 Langkah 2: Deploy Google Apps Script sebagai Web App

Agar website dapat mengakses data Spreadsheet Anda:

1. Di pojok kanan atas editor Apps Script, klik tombol **Terapkan (Deploy)** -> **Penerapan Baru (New Deployment)**.
2. Klik ikon gerigi (Pilih Jenis) lalu pilih **Aplikasi Web (Web App)**.
3. Konfigurasikan detail berikut:
   - **Deskripsi**: `Backend Portal Satu Pintu PAC Tahunan`
   - **Jalankan sebagai (Execute as)**: `Saya (Me)` (menggunakan akun Google Anda)
   - **Siapa yang memiliki akses (Who has access)**: `Siapa saja (Anyone)` (Pilihan paling bawah, agar API bisa dipanggil tanpa token login Google).
4. Klik **Terapkan (Deploy)**.
5. Anda mungkin diminta memberikan izin keamanan oleh Google. Izinkan akses tersebut.
6. Setelah berhasil, salin **URL Aplikasi Web (Web App URL)** yang berakhiran `/exec`.

---

## ⚙️ Langkah 3: Konfigurasi Web App URL di Website

Setelah mendapatkan Web App URL:

1. Buka website Anda (secara lokal atau setelah dihosting).
2. Klik tombol **Sekretaris Utama** di pojok kanan atas untuk membuka Pengaturan.
3. Tempel URL yang sudah disalin ke kolom **URL Google Apps Script Web App**.
4. Klik **Simpan**.
5. Halaman monitoring akan langsung memuat data dari Spreadsheet secara dinamis! Jika Spreadsheet masih kosong, Google Apps Script akan membuatkan tabel monitoring default secara otomatis di Spreadsheet Anda.

---

## 🌐 Langkah 4: Hosting di GitHub Pages

1. Buat repository baru di GitHub (misal: `web-pac-tahunan`).
2. Unggah (push) seluruh struktur folder proyek ini ke repository Anda.
3. Masuk ke tab **Settings** di repository GitHub Anda.
4. Buka menu **Pages** di panel kiri.
5. Pada bagian **Build and deployment**, pilih branch `main` (atau branch utama Anda), lalu klik **Save**.
6. Tunggu beberapa menit, GitHub akan memberikan link URL hosting gratis Anda (misal: `https://username.github.io/web-pac-tahunan/`).
