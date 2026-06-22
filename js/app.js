// MOCK DATABASE RANTING & KOMISARIAT (Anchored reference date: 2026-06-21)
let rawDatabase = {
    ipnu: [
        { name: "PR IPNU Mantingan", type: "ranting", spNumber: "089/IPNU/SP/A/X/2024", expiryDate: "2026-10-15", phone: "6282242147243", email: "pr.ipnu.mantingan@gmail.com" },
        { name: "PR IPNU Senenan", type: "ranting", spNumber: "042/IPNU/SP/A/III/2025", expiryDate: "2027-03-20", phone: "", email: "" },
        { name: "PR IPNU Tahunan", type: "ranting", spNumber: "102/IPNU/SP/A/I/2024", expiryDate: "2026-01-10", phone: "", email: "" },
        { name: "PR IPNU Tegalsambi", type: "ranting", spNumber: "067/IPNU/SP/A/VIII/2024", expiryDate: "2026-08-05", phone: "", email: "" },
        { name: "PR IPNU Demangan", type: "ranting", spNumber: "115/IPNU/SP/A/XI/2024", expiryDate: "2026-11-20", phone: "", email: "" },
        { name: "PR IPNU Ngabul", type: "ranting", spNumber: "015/IPNU/SP/A/I/2025", expiryDate: "2027-01-15", phone: "", email: "" },
        { name: "PR IPNU Langon", type: "ranting", spNumber: "099/IPNU/SP/A/V/2024", expiryDate: "2026-05-02", phone: "", email: "" },
        { name: "PR IPNU Sukodono", type: "ranting", spNumber: "054/IPNU/SP/A/IV/2025", expiryDate: "2027-04-10", phone: "", email: "" },
        { name: "PR IPNU Kecapi", type: "ranting", spNumber: "078/IPNU/SP/A/VII/2024", expiryDate: "2026-07-28", phone: "", email: "" },
        { name: "PR IPNU Petekeyan", type: "ranting", spNumber: "130/IPNU/SP/A/XII/2024", expiryDate: "2026-12-15", phone: "", email: "" },
        { name: "PK IPNU MA Hasyim Asy'ari", type: "komisariat", spNumber: "034/IPNU/SP/B/II/2025", expiryDate: "2026-02-15", phone: "", email: "" },
        { name: "PK IPNU SMK NU Tahunan", type: "komisariat", spNumber: "049/IPNU/SP/B/VI/2024", expiryDate: "2026-07-15", phone: "", email: "" }
    ],
    ippnu: [
        { name: "PR IPPNU Mantingan", type: "ranting", spNumber: "087/IPPNU/SP/A/X/2024", expiryDate: "2026-10-15", phone: "6282242147243", email: "pr.ippnu.mantingan@gmail.com" },
        { name: "PR IPPNU Senenan", type: "ranting", spNumber: "041/IPPNU/SP/A/III/2025", expiryDate: "2027-03-20", phone: "", email: "" },
        { name: "PR IPPNU Tahunan", type: "ranting", spNumber: "101/IPPNU/SP/A/I/2024", expiryDate: "2026-01-10", phone: "", email: "" },
        { name: "PR IPPNU Tegalsambi", type: "ranting", spNumber: "065/IPPNU/SP/A/VIII/2024", expiryDate: "2026-08-05", phone: "", email: "" },
        { name: "PR IPPNU Demangan", type: "ranting", spNumber: "112/IPPNU/SP/A/XI/2024", expiryDate: "2026-11-20", phone: "", email: "" },
        { name: "PR IPPNU Ngabul", type: "ranting", spNumber: "014/IPPNU/SP/A/I/2025", expiryDate: "2027-01-15", phone: "", email: "" },
        { name: "PR IPPNU Langon", type: "ranting", spNumber: "098/IPPNU/SP/A/V/2024", expiryDate: "2026-05-02", phone: "", email: "" },
        { name: "PR IPPNU Sukodono", type: "ranting", spNumber: "053/IPPNU/SP/A/IV/2025", expiryDate: "2027-04-10", phone: "", email: "" },
        { name: "PR IPPNU Kecapi", type: "ranting", spNumber: "077/IPPNU/SP/A/VII/2024", expiryDate: "2026-07-25", phone: "", email: "" },
        { name: "PR IPPNU Petekeyan", type: "ranting", spNumber: "128/IPPNU/SP/A/XII/2024", expiryDate: "2026-12-15", phone: "", email: "" },
        { name: "PK IPPNU MA Hasyim Asy'ari", type: "komisariat", spNumber: "033/IPPNU/SP/B/II/2025", expiryDate: "2026-02-15", phone: "", email: "" },
        { name: "PK IPPNU SMK NU Tahunan", type: "komisariat", spNumber: "048/IPPNU/SP/B/VI/2024", expiryDate: "2026-07-15", phone: "", email: "" }
    ]
};

// MOCK DATABASE BERITA
let beritaDatabase = [
    {
        id: "1",
        timestamp: "2026-06-15T10:00:00.000Z",
        title: "Sukses Gelar LAKMUD I, PAC Tahunan Siap Cetak Organisatoris Handal",
        content: `Latihan Kader Muda (LAKMUD) perdana yang diselenggarakan oleh PAC Tahunan sukses menjaring puluhan peserta terbaik se-Tahunan. Acara ini berlangsung dengan khidmat dan diisi oleh pemateri-pemateri handal.

Dalam sambutannya, ketua PAC IPNU Tahunan menyampaikan bahwa LAKMUD ini adalah wadah regenerasi vital untuk melahirkan kader-kader yang tangguh dan memiliki visi yang jelas di masa depan.

Peserta diajarkan materi kepemimpinan, keorganisasian, ke-NU-an, ke-Aswaja-an, serta materi analisis sosial untuk membekali mereka menghadapi problematika di masyarakat. Diharapkan dengan selesainya LAKMUD I ini, para alumni dapat langsung berkontribusi di ranting dan komisariat masing-masing.`,
        category: "kegiatan",
        coverImage: "assets/images/cover-modul.png",
        likes: 10,
        views: 120
    },
    {
        id: "2",
        timestamp: "2026-06-10T14:30:00.000Z",
        title: "Silaturahmi Bersama MWC NU Tahunan: Menjaga Sanad Amaliyah",
        content: `Dalam rangka mempererat ukhuwah nahdliyyah, pengurus PAC berkunjung ke jajaran Syuriah dan Tanfidziyah MWC NU Kecamatan Tahunan. Pertemuan ini menghasilkan beberapa program sinergis bersama.

Kunjungan ini merupakan bagian dari silaturahmi berkala untuk menyelaraskan arah pergerakan pelajar NU dengan induk organisasi. Rais Syuriah MWC NU Tahunan memberikan nasihat penting mengenai integritas kader serta pentingnya menjaga sanad keilmuan dan amaliyah Ahlussunnah wal Jamaah.`,
        category: "info",
        coverImage: "assets/images/logo-bersama.png",
        likes: 5,
        views: 85
    }
];

// MOCK DATABASE KOMENTAR
let komentarDatabase = [
    { newsId: "1", timestamp: "2026-06-15T11:00:00.000Z", name: "Rekan Ahmad", comment: "Luar biasa! Semangat terus PAC Tahunan!" },
    { newsId: "1", timestamp: "2026-06-15T12:30:00.000Z", name: "Rekanita Sofia", comment: "LAKMUD I yang sangat berkesan, semoga barokah." },
    { newsId: "2", timestamp: "2026-06-10T15:00:00.000Z", name: "Zainal Arifin", comment: "Sinergi yang sangat bagus untuk kemajuan banom-banom NU." }
];

// MOCK DATABASE MAKESTA DETAIL
let makestaDatabase = [
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

// Router & View States
const defaultSecName = "Rekanita Erna Kumala";
const defaultSecWa = "6282242147243"; // Default test number for Secretariat General
let currentSecName = localStorage.getItem("secName") || defaultSecName;
let currentSecWa = localStorage.getItem("secWa") || defaultSecWa;
let appsScriptUrl = localStorage.getItem("appsScriptUrl") || "https://script.google.com/macros/s/AKfycbwkcijUZyu64TO2Z_aIf3qxr3bnrlj3YNFS2kOHm1yNmU2c6_aTzLhrySrSTwM_3clH/exec";

// Google Forms Configurable Links
let formSpIpnuUrl = localStorage.getItem("formSpIpnuUrl") || "https://docs.google.com/forms/d/e/1FAIpQLScGbdwuQsoxbBn2YaVpeKd774_n8cqT-xzhI5g288Dr9d3fpQ/viewform";
let formSpIppnuUrl = localStorage.getItem("formSpIppnuUrl") || "https://docs.google.com/forms/d/e/1FAIpQLSdGVXyKVDCDrexFTvrbrgX4RUMSt49AfwtjNvW4P9sa9uzdMA/viewform";
let formUndanganUrl = localStorage.getItem("formUndanganUrl") || "https://docs.google.com/forms/d/e/1FAIpQLSd-EQmH6kalK6ah9oDBb1rjCVKhqKSAxhlLlM4MNeP--m8OUw/viewform";
let formKaderisasiUrl = localStorage.getItem("formKaderisasiUrl") || "#";

let selectedSpBanom = 'ipnu';
let currentDraftMessage = '';

// App Initializer
window.onload = function () {
    handleNavigation(); // Route to URL Hash on page refresh
    window.addEventListener('hashchange', handleNavigation);

    // Populate Dropdown Options
    populateDropdownPimpinan();
    // Refresh database indicators
    refreshBentoStats();
    // Update link hrefs
    updateFormLinks();

    // Fetch dynamic data from Google Apps Script if URL exists
    if (appsScriptUrl) {
        fetchDynamicSpData();
    }
}

// Fetch dynamic monitoring data from Google Apps Script Web App
function fetchDynamicSpData() {
    console.log("Fetching dynamic SP, Makesta, and News data from Apps Script...");
    fetch(`${appsScriptUrl}?action=getSpData`)
        .then(response => response.json())
        .then(data => {
            if (data && (data.ipnu || data.ippnu || data.makesta || data.berita || data.komentar)) {
                if (data.ipnu) rawDatabase.ipnu = data.ipnu;
                if (data.ippnu) rawDatabase.ippnu = data.ippnu;
                if (data.makesta) makestaDatabase = data.makesta;
                if (data.berita) beritaDatabase = data.berita;
                if (data.komentar) komentarDatabase = data.komentar;
                
                // Repopulate & refresh views
                populateDropdownPimpinan();
                refreshBentoStats();
                renderSpTable();
                renderMakestaTable();
                renderBeritaListHome();
                renderBerita();
                console.log("Database updated from Google Sheets.");
            }
        })
        .catch(err => {
            console.error("Gagal mengambil data dari Google Sheets, menggunakan data cadangan (mock).", err);
        });
}

// Send Form Data to Google Sheets via Apps Script Web App
function sendFormToAppsScript(payload) {
    if (!appsScriptUrl) return Promise.resolve();
    
    return fetch(appsScriptUrl, {
        method: 'POST',
        mode: 'no-cors', // standard workaround for web app redirect CORS issues
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).catch(err => {
        console.error("Gagal mengirim data ke Google Sheets:", err);
    });
}

// HASH-BASED ROUTER CONTROLLER (100% Client-Side multi page)
function handleNavigation() {
    const hash = window.location.hash || '#home';
    const hashBase = hash.split('?')[0];
    const targets = ['home', 'kaderisasi', 'administrasi', 'repository', 'admin', 'berita', 'berita-detail'];

    let matched = false;
    targets.forEach(t => {
        const view = document.getElementById(`view-${t}`);
        if (view) {
            if (hashBase === `#${t}`) {
                view.classList.remove('hidden');
                matched = true;
            } else {
                view.classList.add('hidden');
            }
        }
    });

    if (!matched) {
        // Redirect invalid hashes back to home
        window.location.hash = '#home';
    }

    // Sync navigation styles visually
    syncNavbarState(hashBase);
    
    // Always render SP table when on Home (Beranda)
    renderSpTable();

    // Always render dynamic news list on Home
    renderBeritaListHome();

    // Always render MAKESTA table when on Kaderisasi page
    renderMakestaTable();

    // Always render Repository when on Repository page
    if (hashBase === '#repository') {
        renderRepository();
    }

    // Always render News when on News page
    if (hashBase === '#berita') {
        renderBerita();
    }

    // Render detail page dynamically
    if (hashBase === '#berita-detail') {
        const params = new URLSearchParams(hash.split('?')[1] || '');
        const newsId = params.get('id');
        renderBeritaDetail(newsId);
    }

    // Render admin tables when visiting admin page
    if (hashBase === '#admin') {
        renderAdminSpTable('ipnu');
        renderAdminSpTable('ippnu');
        renderAdminMakestaTable();
        renderAdminRepoTable();
        renderAdminBeritaTable();
    }

    // Scroll safely back to top
    window.scrollTo(0, 0);
}

// Highlight Active Tab in Navigation
function syncNavbarState(activeHash) {
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href === activeHash) {
            link.className = "nav-link text-brand-purple border-b-2 border-brand-purple py-2";
        } else {
            link.className = "nav-link text-slate-500 hover:text-brand-purple py-2";
        }
    });
}

// Toggle mobile hamburger layout menu
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const icon = document.getElementById('menu-icon');
    if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
        icon.className = "fas fa-times text-lg";
    } else {
        menu.classList.add('hidden');
        icon.className = "fas fa-bars text-lg";
    }
}

// Parse & Cluster SP Validity Dates
function analyzeSpLegality(dateString) {
    const simToday = new Date(); // Dynamic date for real-time monitoring
    const expDate = new Date(dateString);
    const diffInTime = expDate - simToday;
    const diffInDays = Math.ceil(diffInTime / (1000 * 60 * 60 * 24));

    let cluster = "aman";
    let statusLabel = "SP Aktif (Aman)";
    let badgeClass = "bg-emerald-50 text-emerald-600 border border-emerald-100";

    if (diffInDays < 0) {
        cluster = "habis";
        statusLabel = "Masa Berlaku Habis";
        badgeClass = "bg-red-50 text-red-600 border border-red-100";
    } else if (diffInDays <= 90) { // Under 3 months warning
        cluster = "kritis";
        statusLabel = "Kritis (< 3 Bulan)";
        badgeClass = "bg-amber-50 text-amber-600 border border-amber-100";
    }

    return { diffInDays, cluster, statusLabel, badgeClass };
}

// Populate Dropdowns in forms with the unique list of branches
function populateDropdownPimpinan() {
    const allBranches = [...rawDatabase.ipnu, ...rawDatabase.ippnu];
    // Extract clean names, remove org abbreviations
    const cleanUniqueNames = [...new Set(allBranches.map(x => {
        return x.name.replace("PR IPNU ", "").replace("PR IPPNU ", "").replace("PK IPNU ", "").replace("PK IPPNU ", "");
    }))].sort();

    const dropDowns = document.querySelectorAll('.pimpinan-dropdown, #kd-asal-pimpinan');
    dropDowns.forEach(dd => {
        dd.innerHTML = `<option value="" disabled selected>Pilih pimpinan ranting/komisariat...</option>`;
        cleanUniqueNames.forEach(name => {
            dd.innerHTML += `<option value="${name}">${name}</option>`;
        });
    });
}

// Renders statistics on home bento grid and monitoring summary
function refreshBentoStats() {
    const allBranches = [...(rawDatabase.ipnu || []), ...(rawDatabase.ippnu || [])];
    const rantings = new Set();
    const komisariats = new Set();
    
    allBranches.forEach(b => {
        const cleanName = b.name.replace("PR IPNU ", "").replace("PR IPPNU ", "").replace("PK IPNU ", "").replace("PK IPPNU ", "");
        if (b.type === "ranting") {
            rantings.add(cleanName);
        } else if (b.type === "komisariat") {
            komisariats.add(cleanName);
        }
    });
    
    const totalRanting = rantings.size;
    const totalKomisariat = komisariats.size;
    
    // Update Ranting & Komisariat UI
    const rantingEl = document.getElementById("stat-total-ranting");
    const komisariatEl = document.getElementById("stat-total-komisariat");
    if (rantingEl) rantingEl.innerText = `${totalRanting} Ranting`;
    if (komisariatEl) komisariatEl.innerText = `${totalKomisariat} Komisariat`;
    
    // Sum participants of MAKESTA
    let totalPeserta = 0;
    makestaDatabase.forEach(m => {
        totalPeserta += m.peserta || 0;
    });
    
    // Check overrides
    const localOverrideIpnu = localStorage.getItem("kaderIpnuOverride");
    const localOverrideIppnu = localStorage.getItem("kaderIppnuOverride");
    
    const ipnuCount = localOverrideIpnu !== null && localOverrideIpnu !== "" ? parseInt(localOverrideIpnu) : Math.round(totalPeserta * 0.46);
    const ippnuCount = localOverrideIppnu !== null && localOverrideIppnu !== "" ? parseInt(localOverrideIppnu) : (totalPeserta - Math.round(totalPeserta * 0.46));
    const calculatedTotalKader = (localOverrideIpnu !== null && localOverrideIpnu !== "") || (localOverrideIppnu !== null && localOverrideIppnu !== "") ? (ipnuCount + ippnuCount) : totalPeserta;

    // Update Kader Terdata UI
    const kaderEl = document.getElementById("stat-total-kader");
    const detailKaderEl = document.getElementById("stat-detail-kader");
    const totalMakestaEl = document.getElementById("stat-total-makesta");
    
    if (kaderEl) {
        kaderEl.innerText = `${calculatedTotalKader} Anggota`;
    }
    if (detailKaderEl) {
        detailKaderEl.innerHTML = `
            <span class="text-emerald-600"><i class="fas fa-mars mr-0.5"></i> IPNU: ${ipnuCount}</span>
            <span class="mx-1 text-slate-300">|</span>
            <span class="text-pink-600"><i class="fas fa-venus mr-0.5"></i> IPPNU: ${ippnuCount}</span>
        `;
    }
    if (totalMakestaEl) {
        totalMakestaEl.innerText = `${makestaDatabase.length} Kegiatan`;
    }
}

// Filter Controls for Monitoring SP Page
function switchSpBanom(banom) {
    selectedSpBanom = banom;
    const btnIpnu = document.getElementById('sp-tab-ipnu');
    const btnIppnu = document.getElementById('sp-tab-ippnu');

    if (banom === 'ipnu') {
        btnIpnu.className = "px-4 py-1.5 rounded-lg text-xs font-bold transition duration-200 bg-brand-purple text-white shadow-sm flex items-center gap-1.5";
        btnIppnu.className = "px-4 py-1.5 rounded-lg text-xs font-bold transition duration-200 text-slate-500 hover:text-slate-800 flex items-center gap-1.5";
    } else {
        btnIpnu.className = "px-4 py-1.5 rounded-lg text-xs font-bold transition duration-200 text-slate-500 hover:text-slate-800 flex items-center gap-1.5";
        btnIppnu.className = "px-4 py-1.5 rounded-lg text-xs font-bold transition duration-200 bg-brand-purple text-white shadow-sm flex items-center gap-1.5";
    }

    renderSpTable();
}

function applyTableFiltering() {
    renderSpTable();
}

// Main Table Generator - Shows top 5 critical or expired SP items, or filtered list if searching
function renderSpTable() {
    const list = rawDatabase[selectedSpBanom] || [];
    const keyword = (document.getElementById('sp-search-input')?.value || '').toLowerCase().trim();
    const tbody = document.getElementById('sp-table-body');
    const emptyState = document.getElementById('sp-empty-state');

    if (!tbody) return; // Guard in case page is not active yet

    tbody.innerHTML = '';

    // Calculate legality analysis
    let analyzedList = list.map(item => {
        const analysis = analyzeSpLegality(item.expiryDate);
        return { ...item, analysis };
    });

    // Apply search filter if keyword is present
    if (keyword) {
        analyzedList = analyzedList.filter(item => 
            item.name.toLowerCase().includes(keyword) || 
            item.spNumber.toLowerCase().includes(keyword)
        );
    }

    // Sort by diffInDays ascending (most critical/expired first)
    analyzedList.sort((a, b) => a.analysis.diffInDays - b.analysis.diffInDays);

    // Limit to top 5 items only if there is NO search query.
    // If searching, show all matches so they can find their specific branch.
    const displayList = keyword ? analyzedList : analyzedList.slice(0, 5);

    displayList.forEach(item => {
        const analysis = item.analysis;
        const formattedDate = new Date(item.expiryDate).toLocaleDateString('id-ID', {
            day: 'numeric', month: 'long', year: 'numeric'
        });

        let remainingMarkup = "";
        if (analysis.diffInDays < 0) {
            remainingMarkup = `<span class="text-red-605 font-bold">Habis ${Math.abs(analysis.diffInDays)} hari lalu</span>`;
        } else {
            remainingMarkup = `<span class="${analysis.cluster === 'kritis' ? 'text-amber-600 font-bold' : 'text-slate-700'}">${analysis.diffInDays} hari lagi</span>`;
        }

        tbody.innerHTML += `
            <tr class="hover:bg-slate-50 transition duration-150">
                <td class="p-4 font-bold text-brand-textDark text-sm sm:text-base">${item.name}</td>
                <td class="p-4 font-mono text-slate-400 text-xs">${item.spNumber}</td>
                <td class="p-4 text-slate-500 font-medium text-xs sm:text-sm">${formattedDate}</td>
                <td class="p-4 text-xs sm:text-sm">${remainingMarkup}</td>
                <td class="p-4">
                    <span class="px-2 py-0.5 rounded text-[10px] sm:text-xs font-extrabold uppercase tracking-widest ${analysis.badgeClass}">
                        ${analysis.statusLabel}
                    </span>
                </td>
            </tr>
        `;
    });

    if (displayList.length === 0) {
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');
    }
}

// Sub-Tab Switcher inside Administrasi Page
function switchAdminSubTab(targetTab) {
    const tabs = ['sp-ipnu', 'sp-ippnu', 'undangan'];
    tabs.forEach(t => {
        const form = document.getElementById(`adm-form-${t}`);
        const btn = document.getElementById(`adm-btn-${t}`);

        if (t === targetTab) {
            form.classList.remove('hidden');
            if (t === 'sp-ipnu') {
                btn.className = "p-6 text-left rounded-2xl bg-gradient-to-br from-white to-violet-50/20 border-2 active-card-glow text-brand-textDark shadow-md transition-all duration-300 flex flex-col gap-4 relative overflow-hidden group cursor-pointer";
            } else if (t === 'sp-ippnu') {
                btn.className = "p-6 text-left rounded-2xl bg-gradient-to-br from-white to-emerald-50/20 border-2 active-card-glow text-brand-textDark shadow-md transition-all duration-300 flex flex-col gap-4 relative overflow-hidden group cursor-pointer";
            } else if (t === 'undangan') {
                btn.className = "p-6 text-left rounded-2xl bg-gradient-to-br from-white to-indigo-50/20 border-2 active-card-glow text-brand-textDark shadow-md transition-all duration-300 flex flex-col gap-4 relative overflow-hidden group cursor-pointer";
            }
        } else {
            form.classList.add('hidden');
            if (t === 'sp-ipnu') {
                btn.className = "p-6 text-left rounded-2xl bg-gradient-to-br from-white to-violet-50/20 border border-slate-150 text-brand-textDark shadow-sm hover:shadow-md hover:border-brand-purple/40 transition-all duration-300 flex flex-col gap-4 relative overflow-hidden group cursor-pointer";
            } else if (t === 'sp-ippnu') {
                btn.className = "p-6 text-left rounded-2xl bg-gradient-to-br from-white to-emerald-50/20 border border-slate-150 text-brand-textDark shadow-sm hover:shadow-md hover:border-brand-purple/40 transition-all duration-300 flex flex-col gap-4 relative overflow-hidden group cursor-pointer";
            } else if (t === 'undangan') {
                btn.className = "p-6 text-left rounded-2xl bg-gradient-to-br from-white to-indigo-50/20 border border-slate-150 text-brand-textDark shadow-sm hover:shadow-md hover:border-brand-purple/40 transition-all duration-300 flex flex-col gap-4 relative overflow-hidden group cursor-pointer";
            }
        }
    });
}

// Helper untuk mengonversi berkas menjadi string Base64
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        if (!file) {
            resolve({ name: "", type: "", data: "" });
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            const base64Data = reader.result.split(',')[1];
            resolve({
                name: file.name,
                type: file.type,
                data: base64Data
            });
        };
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
}

// FORM SUBMISSION: SP REKOMENDASI (IPNU / IPPNU)
async function handleFormSpSubmit(event, banomType) {
    event.preventDefault();
    const form = event.target;

    const unitName = form.querySelector('.pimpinan-dropdown').value;
    const spNumber = form.querySelector('input[placeholder*="Contoh: 01"]').value;
    const spDate = form.querySelector('input[type="date"]').value;
    const senderName = form.querySelector('input[placeholder*="Nama lengkap"]').value;
    const senderPhone = form.querySelector('input[type="tel"]').value;
    
    const fileInputs = form.querySelectorAll('input[type="file"]');
    const berkasFile = fileInputs[0] ? fileInputs[0].files[0] : null;
    const pengurusFile = fileInputs[1] ? fileInputs[1].files[0] : null;

    showToast("Mengunggah Berkas", "Mohon tunggu sebentar, sedang memproses dokumen...", true);

    try {
        const berkasBase64 = await fileToBase64(berkasFile);
        const pengurusBase64 = await fileToBase64(pengurusFile);

        const formattedDate = new Date(spDate).toLocaleDateString('id-ID', {
            day: 'numeric', month: 'long', year: 'numeric'
        });

        const draft = `*PENGAJUAN SP BARU (${banomType})* 📜\n\nAssalamu'alaikum Wr. Wb. Rekan/Rekanita Sekretaris Umum PAC,\n\nTelah masuk pengajuan rekomendasi Surat Pengesahan (SP) baru dari:\n\n🔹 *Pimpinan:* PR/PK ${banomType} ${unitName}\n🔹 *Nomor Surat:* ${spNumber}\n🔹 *Tanggal Surat:* ${formattedDate}\n🔹 *Pengirim:* ${senderName} (${senderPhone})\n🔹 *Perihal:* Pengajuan Rekomendasi SP\n\n*Berkas Terlampir:* \n1. ${berkasBase64.name}\n2. ${pengurusBase64.name}\n\nMohon segera diverifikasi berkas fisiknya. Terima kasih!`;

        // Save to Google Sheet & Google Drive
        await sendFormToAppsScript({
            action: 'submitSp',
            timestamp: new Date().toISOString(),
            banom: banomType,
            unitName: `PR/PK ${banomType} ${unitName}`,
            spNumber: spNumber,
            spDate: formattedDate,
            senderName: senderName,
            senderPhone: senderPhone,
            fileBerkasName: berkasBase64.name,
            fileBerkasData: berkasBase64.data,
            fileBerkasType: berkasBase64.type,
            filePengurusName: pengurusBase64.name,
            filePengurusData: pengurusBase64.data,
            filePengurusType: pengurusBase64.type
        });

        triggerWaDraft(draft);
        form.reset();
    } catch (err) {
        console.error("Gagal mengunggah dokumen:", err);
        showToast("Gagal Unggah", "Terjadi kesalahan saat memproses dokumen.", false);
    }
}

// FORM SUBMISSION: UNDANGAN KEGIATAN
async function handleFormUndanganSubmit(event) {
    event.preventDefault();
    const form = event.target;

    const pimpinan = document.getElementById('form-und-pimpinan').value;
    const nomorSurat = document.getElementById('form-und-nomor').value;
    const pengirim = document.getElementById('form-und-pengirim').value;
    const nohp = document.getElementById('form-und-nohp').value;
    const agenda = document.getElementById('form-und-perihal').value;
    const tempat = document.getElementById('form-und-tempat').value;
    const waktu = document.getElementById('form-und-waktu').value;
    
    const fileInput = form.querySelector('input[type="file"]');
    const invitationFile = fileInput ? fileInput.files[0] : null;

    showToast("Mengunggah Berkas", "Mohon tunggu sebentar, sedang memproses surat undangan...", true);

    try {
        const fileBase64 = await fileToBase64(invitationFile);

        const draft = `*KONFIRMASI UNDANGAN KEGIATAN* ✉️\n\nAssalamu'alaikum Wr. Wb. Rekan/Rekanita Sekretaris Umum PAC,\n\nTelah masuk konfirmasi undangan kegiatan dari pimpinan bawah:\n\n🔹 *Asal Pimpinan:* PR/PK ${pimpinan}\n🔹 *Nomor Surat:* ${nomorSurat}\n🔹 *Pengirim:* ${pengirim} (${nohp})\n🔹 *Agenda/Perihal:* ${agenda}\n🔹 *Tempat/Lokasi:* ${tempat}\n🔹 *Waktu Pelaksanaan:* ${waktu}\n\n*Berkas Terlampir:* ${fileBase64.name}\n\nMohon dicatat dalam buku agenda kegiatan kesekretariatan PAC!`;

        // Save to Google Sheet & Google Drive
        await sendFormToAppsScript({
            action: 'submitUndangan',
            timestamp: new Date().toISOString(),
            pimpinan: pimpinan,
            nomorSurat: nomorSurat,
            pengirim: pengirim,
            nohp: nohp,
            agenda: agenda,
            tempat: tempat,
            waktu: waktu,
            fileName: fileBase64.name,
            fileData: fileBase64.data,
            fileType: fileBase64.type
        });

        triggerWaDraft(draft);
        form.reset();
    } catch (err) {
        console.error("Gagal mengunggah dokumen:", err);
        showToast("Gagal Unggah", "Terjadi kesalahan saat memproses surat undangan.", false);
    }
}

// FORM SUBMISSION: KADERISASI
async function handleKaderisasiSubmit(event) {
    event.preventDefault();
    const form = event.target;

    const asal = document.getElementById('kd-asal-pimpinan').value;
    const perihal = document.getElementById('kd-perihal').value;
    const pengirim = document.getElementById('kd-pengirim').value;
    const nohp = document.getElementById('kd-nohp').value;
    const tanggal = document.getElementById('kd-tanggal').value;
    const keterangan = document.getElementById('kd-keterangan').value;
    
    const fileInput = document.getElementById('kd-berkas');
    const pdfFile = fileInput ? fileInput.files[0] : null;

    showToast("Mengunggah Berkas", "Mohon tunggu sebentar, sedang memproses dokumen...", true);

    try {
        const fileBase64 = await fileToBase64(pdfFile);

        const formattedDate = new Date(tanggal).toLocaleDateString('id-ID', {
            day: 'numeric', month: 'long', year: 'numeric'
        });

        const draft = `*LAYANAN PERSURATAN DEPT. KADERISASI* 🎓\n\nAssalamu'alaikum Wr. Wb. Rekan/Rekanita,\n\nTelah masuk permohonan administrasi baru perihal kaderisasi:\n\n🔹 *Asal Pimpinan:* PR/PK ${asal}\n🔹 *Perihal:* ${perihal}\n🔹 *Pengirim:* ${pengirim} (${nohp})\n🔹 *Tanggal Agenda:* ${formattedDate}\n🔹 *Keterangan Tambahan:* ${keterangan}\n🔹 *Berkas Pendukung:* ${fileBase64.name}\n\nMohon pengurus Departemen Kaderisasi segera mengkoordinasikan tim instruktur/pendamping!`;

        // Save to Google Sheet & Google Drive
        await sendFormToAppsScript({
            action: 'submitKaderisasi',
            timestamp: new Date().toISOString(),
            asal: asal,
            perihal: perihal,
            pengirim: pengirim,
            nohp: nohp,
            tanggal: formattedDate,
            keterangan: keterangan,
            fileName: fileBase64.name,
            fileData: fileBase64.data,
            fileType: fileBase64.type
        });

        triggerWaDraft(draft);
        form.reset();
        closeKaderisasiFormModal();
    } catch (err) {
        console.error("Gagal mengunggah dokumen:", err);
        showToast("Gagal Unggah", "Terjadi kesalahan saat memproses berkas pendukung.", false);
    }
}

// Trigger WhatsApp Draft Popup
function triggerWaDraft(messageText) {
    currentDraftMessage = messageText;
    document.getElementById('wa-message-preview').innerText = messageText;
    document.getElementById('wa-modal').classList.remove('hidden');
}

// Close WhatsApp Modal
function closeWaModal() {
    document.getElementById('wa-modal').classList.add('hidden');
}

// Open WhatsApp Web Link with payload
function triggerWaBlast() {
    const encoded = encodeURIComponent(currentDraftMessage);
    const apiLink = `https://api.whatsapp.com/send?phone=${currentSecWa}&text=${encoded}`;
    window.open(apiLink, '_blank');
    closeWaModal();
    showToast("Diteruskan!", `Draft pemberitahuan berhasil dikirimkan ke WhatsApp Sekretaris Umum.`);
}

// Settings Contacts Control
function openSettingsModal() {
    document.getElementById('cfg-sec-name').value = currentSecName;
    document.getElementById('cfg-sec-wa').value = currentSecWa;
    document.getElementById('cfg-apps-script-url').value = appsScriptUrl;
    
    document.getElementById('cfg-form-sp-ipnu-url').value = formSpIpnuUrl === "#" ? "" : formSpIpnuUrl;
    document.getElementById('cfg-form-sp-ippnu-url').value = formSpIppnuUrl === "#" ? "" : formSpIppnuUrl;
    document.getElementById('cfg-form-undangan-url').value = formUndanganUrl === "#" ? "" : formUndanganUrl;
    document.getElementById('cfg-form-kaderisasi-url').value = formKaderisasiUrl === "#" ? "" : formKaderisasiUrl;

    document.getElementById('cfg-kader-ipnu-override').value = localStorage.getItem("kaderIpnuOverride") || "";
    document.getElementById('cfg-kader-ippnu-override').value = localStorage.getItem("kaderIppnuOverride") || "";
    
    document.getElementById('settings-modal').classList.remove('hidden');
}

function closeSettingsModal() {
    document.getElementById('settings-modal').classList.add('hidden');
}

function saveSecretariatContacts() {
    const name = document.getElementById('cfg-sec-name').value;
    const wa = document.getElementById('cfg-sec-wa').value;
    const url = document.getElementById('cfg-apps-script-url').value;
    
    const spIpnu = document.getElementById('cfg-form-sp-ipnu-url').value || "#";
    const spIppnu = document.getElementById('cfg-form-sp-ippnu-url').value || "#";
    const und = document.getElementById('cfg-form-undangan-url').value || "#";
    const kad = document.getElementById('cfg-form-kaderisasi-url').value || "#";

    const overrideIpnu = document.getElementById('cfg-kader-ipnu-override').value.trim();
    const overrideIppnu = document.getElementById('cfg-kader-ippnu-override').value.trim();

    if (!wa.startsWith('62')) {
        showToast("Gagal Menyimpan", "Pastikan nomor HP berawalan kode negara 62 (contoh: 62822xxxx)", false);
        return;
    }

    currentSecName = name;
    currentSecWa = wa;
    appsScriptUrl = url;
    formSpIpnuUrl = spIpnu;
    formSpIppnuUrl = spIppnu;
    formUndanganUrl = und;
    formKaderisasiUrl = kad;

    localStorage.setItem("secName", name);
    localStorage.setItem("secWa", wa);
    localStorage.setItem("appsScriptUrl", url);
    localStorage.setItem("formSpIpnuUrl", spIpnu);
    localStorage.setItem("formSpIppnuUrl", spIppnu);
    localStorage.setItem("formUndanganUrl", und);
    localStorage.setItem("formKaderisasiUrl", kad);
    
    if (overrideIpnu !== "") localStorage.setItem("kaderIpnuOverride", overrideIpnu);
    else localStorage.removeItem("kaderIpnuOverride");

    if (overrideIppnu !== "") localStorage.setItem("kaderIppnuOverride", overrideIppnu);
    else localStorage.removeItem("kaderIppnuOverride");

    showToast("Pengaturan Disimpan", `Semua kontak, overrides, dan tautan formulir berhasil diperbarui.`);
    closeSettingsModal();

    updateFormLinks();
    refreshBentoStats();

    // Trigger immediate fetch if URL was configured
    if (url) {
        fetchDynamicSpData();
    }
}

// Update DOM form links dynamically
function updateFormLinks() {
    const lnkSpIpnu = document.getElementById('lnk-form-sp-ipnu');
    const lnkSpIppnu = document.getElementById('lnk-form-sp-ippnu');
    const lnkUndangan = document.getElementById('lnk-form-undangan');
    const lnkKaderisasi = document.getElementById('lnk-form-kaderisasi');

    if (lnkSpIpnu) lnkSpIpnu.href = formSpIpnuUrl;
    if (lnkSpIppnu) lnkSpIppnu.href = formSpIppnuUrl;
    if (lnkUndangan) lnkUndangan.href = formUndanganUrl;
    if (lnkKaderisasi) lnkKaderisasi.href = formKaderisasiUrl;
}

// Trigger WA Chat for support
function triggerWaSupport(serviceName) {
    const draft = `Assalamu'alaikum Wr. Wb. Rekan/Rekanita Sekretaris Umum PAC,\n\nSaya ingin bertanya perihal pengisian formulir pengajuan *${serviceName}* di Website Portal Satu Pintu PAC Tahunan. Mohon bantuannya.`;
    const encoded = encodeURIComponent(draft);
    const apiLink = `https://api.whatsapp.com/send?phone=${currentSecWa}&text=${encoded}`;
    window.open(apiLink, '_blank');
}

// Lightweight Toast system
function showToast(title, desc, isSuccess = true) {
    const toast = document.getElementById('toast');
    const icon = document.getElementById('toast-icon');

    document.getElementById('toast-title').innerText = title;
    document.getElementById('toast-desc').innerText = desc;

    if (isSuccess) {
        toast.className = "fixed bottom-5 right-5 z-50 bg-white text-slate-800 px-5 py-3.5 rounded-2xl shadow-xl border border-emerald-500 flex items-center gap-3 max-w-sm transition-all duration-300";
        icon.className = "fas fa-check-circle text-emerald-500 text-lg";
    } else {
        toast.className = "fixed bottom-5 right-5 z-50 bg-white text-slate-800 px-5 py-3.5 rounded-2xl shadow-xl border border-red-500 flex items-center gap-3 max-w-sm transition-all duration-300";
        icon.className = "fas fa-exclamation-circle text-red-500 text-lg";
    }

    toast.classList.remove('hidden');
    setTimeout(() => {
        toast.className = toast.className.replace("translate-y-20 opacity-0", "translate-y-0 opacity-100");
    }, 50);

    setTimeout(() => {
        toast.className = toast.className.replace("translate-y-0 opacity-100", "translate-y-20 opacity-0");
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 300);
    }, 3500);
}

// Simulated direct download link tracker
function triggerSimulatedDownload(bookName) {
    showToast("Mengunduh Arsip", `Berkas "${bookName}" sedang diproses untuk diunduh langsung dari repositori.`, true);
}

// RENDER MAKESTA TABLE DYNAMICALLY
function renderMakestaTable() {
    const tbody = document.getElementById('makesta-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';
    
    const keyword = (document.getElementById('makesta-search-input')?.value || '').toLowerCase().trim();
    let filteredList = makestaDatabase;

    if (keyword) {
        filteredList = makestaDatabase.filter(item => 
            item.penyelenggara.toLowerCase().includes(keyword) || 
            item.tempat.toLowerCase().includes(keyword) ||
            item.tanggal.toLowerCase().includes(keyword)
        );
    }

    // Update total count indicator
    const totalCountEl = document.getElementById('makesta-total-count');
    if (totalCountEl) {
        totalCountEl.innerText = `${filteredList.length} Kegiatan`;
    }

    filteredList.forEach((item) => {
        // Find real index in original database for the modal
        const realIndex = makestaDatabase.indexOf(item);
        tbody.innerHTML += `
            <tr class="border-b border-slate-50 hover:bg-slate-50/50 transition duration-150">
                <td class="py-3 font-bold text-brand-textDark text-xs sm:text-sm">${item.penyelenggara}</td>
                <td class="py-3 text-xs sm:text-sm text-slate-600">${item.tanggal}</td>
                <td class="py-3 text-xs sm:text-sm text-slate-600">${item.tempat}</td>
                <td class="py-3 text-right font-bold text-brand-purple text-xs sm:text-sm">${item.peserta} Org</td>
                <td class="py-3 text-right">
                    <button onclick="openMakestaDetailModal(${realIndex})" class="w-8 h-8 rounded-lg bg-violet-50 text-brand-purple hover:bg-brand-purple hover:text-white transition duration-200 flex items-center justify-center ml-auto" title="Lihat Detail">
                        <i class="fas fa-eye text-xs"></i>
                    </button>
                </td>
            </tr>
        `;
    });

    const emptyState = document.getElementById('makesta-empty-state');
    if (emptyState) {
        if (filteredList.length === 0) {
            emptyState.classList.remove('hidden');
        } else {
            emptyState.classList.add('hidden');
        }
    }
}

// OPEN DETAIL MODAL WITH TABS/TIMELINE FOR PRA, MAIN, & RTL
function openMakestaDetailModal(index) {
    const item = makestaDatabase[index];
    if (!item) return;

    document.getElementById('md-detail-title').innerText = `Detail Proses MAKESTA - ${item.penyelenggara}`;

    // Fill Pra-MAKESTA
    document.getElementById('md-pra-penyelenggara').innerText = item.praMakesta.penyelenggara;
    document.getElementById('md-pra-tanggal').innerText = item.praMakesta.tanggal;
    document.getElementById('md-pra-tempat').innerText = item.praMakesta.tempat;
    document.getElementById('md-pra-peserta').innerText = `${item.praMakesta.peserta} Orang`;

    // Fill MAKESTA
    document.getElementById('md-mak-penyelenggara').innerText = item.makesta.penyelenggara;
    document.getElementById('md-mak-tanggal').innerText = item.makesta.tanggal;
    document.getElementById('md-mak-tempat').innerText = item.makesta.tempat;
    document.getElementById('md-mak-peserta').innerText = `${item.makesta.peserta} Orang`;

    // Fill RTLs
    const rtlContainer = document.getElementById('md-rtl-container');
    rtlContainer.innerHTML = '';
    item.rtl.forEach((rtlItem, idx) => {
        rtlContainer.innerHTML += `
            <div class="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2 relative overflow-hidden">
                <span class="absolute top-2 right-3 text-[9px] font-extrabold text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full uppercase tracking-wider">RTL ${idx + 1}</span>
                <div class="space-y-1">
                    <span class="text-[9px] uppercase tracking-wider font-extrabold text-slate-400 block">Penyelenggara</span>
                    <span class="text-xs font-semibold text-brand-textDark block">${rtlItem.penyelenggara}</span>
                </div>
                <div class="grid grid-cols-3 gap-2 pt-1 border-t border-slate-100/50">
                    <div>
                        <span class="text-[8px] uppercase tracking-wider font-bold text-slate-400 block">Tanggal</span>
                        <span class="text-[10px] font-semibold text-slate-600">${rtlItem.tanggal}</span>
                    </div>
                    <div>
                        <span class="text-[8px] uppercase tracking-wider font-bold text-slate-400 block">Tempat</span>
                        <span class="text-[10px] font-semibold text-slate-600 truncate block" title="${rtlItem.tempat}">${rtlItem.tempat}</span>
                    </div>
                    <div>
                        <span class="text-[8px] uppercase tracking-wider font-bold text-slate-400 block">Peserta</span>
                        <span class="text-[10px] font-semibold text-slate-600">${rtlItem.peserta} Org</span>
                    </div>
                </div>
            </div>
        `;
    });

    document.getElementById('makesta-detail-modal').classList.remove('hidden');
}

function closeMakestaDetailModal() {
    document.getElementById('makesta-detail-modal').classList.add('hidden');
}

function openKaderisasiFormModal() {
    document.getElementById('kd-form-modal').classList.remove('hidden');
}

function closeKaderisasiFormModal() {
    document.getElementById('kd-form-modal').classList.add('hidden');
}

// =========================================================================
// ADMIN PANEL SYSTEM
// =========================================================================

// Default fallback PIN (only for offline/no-GAS mode). Real PIN lives in Apps Script.
const ADMIN_LOCAL_PIN = "admin1234";
let isAdminLoggedIn = false;
let adminCurrentTab = 'sp-ipnu';

function adminLogin() {
    const pin = document.getElementById('admin-pin-input').value.trim();
    const errorEl = document.getElementById('admin-login-error');
    const btn = document.getElementById('admin-login-btn');

    if (!pin) {
        errorEl.classList.remove('hidden');
        return;
    }

    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memverifikasi...';
    btn.disabled = true;

    // Jika Apps Script URL dikonfigurasi, verifikasi ke server
    if (appsScriptUrl) {
        fetch(`${appsScriptUrl}?action=verifyPin&pin=${encodeURIComponent(pin)}`)
            .then(r => r.json())
            .then(data => {
                if (data.valid) {
                    onAdminLoginSuccess(pin);
                } else {
                    onAdminLoginFail(errorEl, btn);
                }
            })
            .catch(() => {
                // Fallback: verifikasi lokal jika GAS tidak bisa dihubungi
                if (pin === ADMIN_LOCAL_PIN) {
                    onAdminLoginSuccess(pin);
                } else {
                    onAdminLoginFail(errorEl, btn);
                }
            });
    } else {
        // Mode offline: verifikasi lokal
        setTimeout(() => {
            if (pin === ADMIN_LOCAL_PIN) {
                onAdminLoginSuccess(pin);
            } else {
                onAdminLoginFail(errorEl, btn);
            }
        }, 600);
    }
}

function onAdminLoginSuccess(pin) {
    isAdminLoggedIn = true;
    document.getElementById('admin-login-screen').classList.add('hidden');
    document.getElementById('admin-dashboard-screen').classList.remove('hidden');
    document.getElementById('admin-pin-input').value = '';
    document.getElementById('admin-login-error').classList.add('hidden');
    const btn = document.getElementById('admin-login-btn');
    btn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Masuk ke Admin Panel';
    btn.disabled = false;

    renderAdminSpTable('ipnu');
    renderAdminSpTable('ippnu');
    renderAdminMakestaTable();
    renderAdminRepoTable();
    renderAdminBeritaTable();
    showToast('Login Berhasil', 'Selamat datang, Administrator.');
}

function onAdminLoginFail(errorEl, btn) {
    errorEl.classList.remove('hidden');
    btn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Masuk ke Admin Panel';
    btn.disabled = false;
    document.getElementById('admin-pin-input').value = '';
    document.getElementById('admin-pin-input').focus();
}

function adminLogout() {
    isAdminLoggedIn = false;
    document.getElementById('admin-login-screen').classList.remove('hidden');
    document.getElementById('admin-dashboard-screen').classList.add('hidden');
    showToast('Logout Berhasil', 'Sesi admin telah diakhiri.');
}

function switchAdminTab(tab) {
    adminCurrentTab = tab;
    const tabs = ['sp-ipnu', 'sp-ippnu', 'makesta', 'repository', 'berita', 'pengaturan'];
    tabs.forEach(t => {
        const btn = document.getElementById(`adm-tab-${t}`);
        const panel = document.getElementById(`adm-panel-${t}`);
        if (t === tab) {
            panel.classList.remove('hidden');
            btn.className = 'admin-tab-btn px-4 py-2.5 rounded-xl text-xs font-extrabold transition duration-200 bg-brand-purple text-white shadow-sm';
            const icons = { 'sp-ipnu': 'fa-mars', 'sp-ippnu': 'fa-venus', 'makesta': 'fa-graduation-cap', 'repository': 'fa-book-open', 'berita': 'fa-newspaper', 'pengaturan': 'fa-cog' };
            const labels = { 'sp-ipnu': 'SP IPNU', 'sp-ippnu': 'SP IPPNU', 'makesta': 'Rekap Makesta', 'repository': 'Repositori Dok.', 'berita': 'Kelola Berita', 'pengaturan': 'Pengaturan' };
            btn.innerHTML = `<i class="fas ${icons[t]} mr-1.5"></i> ${labels[t]}`;
        } else {
            panel.classList.add('hidden');
            btn.className = 'admin-tab-btn px-4 py-2.5 rounded-xl text-xs font-bold transition duration-200 text-slate-500 bg-white border border-slate-100 hover:bg-slate-50';
            const icons = { 'sp-ipnu': 'fa-mars', 'sp-ippnu': 'fa-venus', 'makesta': 'fa-graduation-cap', 'repository': 'fa-book-open', 'berita': 'fa-newspaper', 'pengaturan': 'fa-cog' };
            const labels = { 'sp-ipnu': 'SP IPNU', 'sp-ippnu': 'SP IPPNU', 'makesta': 'Rekap Makesta', 'repository': 'Repositori Dok.', 'berita': 'Kelola Berita', 'pengaturan': 'Pengaturan' };
            btn.innerHTML = `<i class="fas ${icons[t]} mr-1.5"></i> ${labels[t]}`;
        }
    });
    // Pre-fill settings tab when opened
    if (tab === 'pengaturan') {
        document.getElementById('cfg-sec-name').value = currentSecName;
        document.getElementById('cfg-sec-wa').value = currentSecWa;
        document.getElementById('cfg-apps-script-url').value = appsScriptUrl;
        document.getElementById('cfg-form-sp-ipnu-url').value = formSpIpnuUrl === '#' ? '' : formSpIpnuUrl;
        document.getElementById('cfg-form-sp-ippnu-url').value = formSpIppnuUrl === '#' ? '' : formSpIppnuUrl;
        document.getElementById('cfg-form-undangan-url').value = formUndanganUrl === '#' ? '' : formUndanganUrl;
        document.getElementById('cfg-form-kaderisasi-url').value = formKaderisasiUrl === '#' ? '' : formKaderisasiUrl;
    }
}

// ---- Render Admin Tables ----

function renderAdminSpTable(banom) {
    const tbody = document.getElementById(`admin-sp-${banom}-tbody`);
    const emptyEl = document.getElementById(`admin-sp-${banom}-empty`);
    if (!tbody) return;
    tbody.innerHTML = '';
    const list = rawDatabase[banom] || [];
    if (list.length === 0) {
        emptyEl.classList.remove('hidden');
        return;
    }
    emptyEl.classList.add('hidden');
    list.forEach((item, idx) => {
        const expiryFormatted = new Date(item.expiryDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
        tbody.innerHTML += `
            <tr class="hover:bg-slate-50 transition">
                <td class="py-3 font-bold text-brand-textDark">${item.name}</td>
                <td class="py-3 text-slate-500 capitalize">${item.type}</td>
                <td class="py-3 text-slate-500 font-mono text-[11px]">${item.spNumber}</td>
                <td class="py-3 text-slate-500">${expiryFormatted}</td>
                <td class="py-3 text-slate-500 font-medium">${item.phone || "-"}</td>
                <td class="py-3 text-slate-500 truncate max-w-[120px]" title="${item.email || ""}">${item.email || "-"}</td>
                <td class="py-3 text-center">
                    <button onclick="openEditSpModal('${banom}', ${idx})" class="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-100 transition flex items-center justify-center mx-auto" title="Edit">
                        <i class="fas fa-pencil-alt text-xs"></i>
                    </button>
                </td>
                <td class="py-3 text-center">
                    <button onclick="adminDeleteSp('${banom}', ${idx})" class="w-8 h-8 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition flex items-center justify-center mx-auto" title="Hapus">
                        <i class="fas fa-trash-alt text-xs"></i>
                    </button>
                </td>
            </tr>`;
    });
}

function renderAdminMakestaTable() {
    const tbody = document.getElementById('admin-makesta-tbody');
    const emptyEl = document.getElementById('admin-makesta-empty');
    if (!tbody) return;
    tbody.innerHTML = '';
    if (makestaDatabase.length === 0) {
        emptyEl.classList.remove('hidden');
        return;
    }
    emptyEl.classList.add('hidden');
    makestaDatabase.forEach((item, idx) => {
        tbody.innerHTML += `
            <tr class="hover:bg-slate-50 transition">
                <td class="py-3 font-bold text-brand-textDark">${item.penyelenggara}</td>
                <td class="py-3 text-slate-500">${item.tanggal}</td>
                <td class="py-3 text-slate-500">${item.tempat}</td>
                <td class="py-3 text-right font-bold text-brand-purple">${item.peserta} Org</td>
                <td class="py-3 text-center">
                    <button onclick="openEditMakestaModal(${idx})" class="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-100 transition flex items-center justify-center mx-auto" title="Edit">
                        <i class="fas fa-pencil-alt text-xs"></i>
                    </button>
                </td>
                <td class="py-3 text-center">
                    <button onclick="adminDeleteMakesta(${idx})" class="w-8 h-8 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition flex items-center justify-center mx-auto" title="Hapus">
                        <i class="fas fa-trash-alt text-xs"></i>
                    </button>
                </td>
            </tr>`;
    });
}

function renderAdminRepoTable() {
    const tbody = document.getElementById('admin-repo-tbody');
    const emptyEl = document.getElementById('admin-repo-empty');
    if (!tbody) return;
    tbody.innerHTML = '';
    if (repoDatabase.length === 0) {
        emptyEl.classList.remove('hidden');
        return;
    }
    emptyEl.classList.add('hidden');
    const catLabels = { buku: 'Buku Wajib', modul: 'Modul Pelatihan', surat: 'Template Administrasi' };
    repoDatabase.forEach((doc, idx) => {
        tbody.innerHTML += `
            <tr class="hover:bg-slate-50 transition">
                <td class="py-3 font-bold text-brand-textDark max-w-xs truncate" title="${doc.title}">${doc.title}</td>
                <td class="py-3">
                    <span class="text-[9px] font-extrabold uppercase tracking-widest text-brand-purple bg-violet-50 px-2 py-0.5 rounded">${catLabels[doc.category] || doc.category}</span>
                </td>
                <td class="py-3 font-mono text-[11px] text-slate-400 max-w-[120px] truncate" title="${doc.driveId}">${doc.driveId}</td>
                <td class="py-3 text-center">
                    <button onclick="openEditRepoModal(${idx})" class="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-100 transition flex items-center justify-center mx-auto" title="Edit">
                        <i class="fas fa-pencil-alt text-xs"></i>
                    </button>
                </td>
                <td class="py-3 text-center">
                    <button onclick="adminDeleteRepo(${idx})" class="w-8 h-8 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition flex items-center justify-center mx-auto" title="Hapus">
                        <i class="fas fa-trash-alt text-xs"></i>
                    </button>
                </td>
            </tr>`;
    });
}

// ---- Admin CRUD Actions ----

async function adminAddSp(banom) {
    const name = document.getElementById(`adm-${banom}-name`).value.trim();
    const type = document.getElementById(`adm-${banom}-type`).value;
    const spNumber = document.getElementById(`adm-${banom}-spnumber`).value.trim();
    const expiry = document.getElementById(`adm-${banom}-expiry`).value;
    const phone = document.getElementById(`adm-${banom}-phone`).value.trim();
    const email = document.getElementById(`adm-${banom}-email`).value.trim();

    if (!name || !spNumber || !expiry) {
        showToast('Data Tidak Lengkap', 'Harap isi semua kolom yang wajib diisi.', false);
        return;
    }

    const newEntry = { name, type, spNumber, expiryDate: expiry, phone, email };
    rawDatabase[banom].push(newEntry);

    // Coba kirim ke GAS jika URL tersedia
    if (appsScriptUrl) {
        const pin = ADMIN_LOCAL_PIN;
        await sendFormToAppsScript({ action: 'adminAddSp', adminPin: pin, banom, ...newEntry })
            .catch(() => {});
    }

    // Reset form
    document.getElementById(`adm-${banom}-name`).value = '';
    document.getElementById(`adm-${banom}-spnumber`).value = '';
    document.getElementById(`adm-${banom}-expiry`).value = '';
    document.getElementById(`adm-${banom}-phone`).value = '';
    document.getElementById(`adm-${banom}-email`).value = '';

    renderAdminSpTable(banom);
    renderSpTable();
    refreshBentoStats();
    populateDropdownPimpinan();
    showToast('Data Disimpan', `SP ${banom.toUpperCase()} berhasil ditambahkan.`);
}

async function adminDeleteSp(banom, index) {
    if (!confirm(`Yakin ingin menghapus data ini?`)) return;
    rawDatabase[banom].splice(index, 1);

    if (appsScriptUrl) {
        await sendFormToAppsScript({ action: 'adminDeleteSp', adminPin: ADMIN_LOCAL_PIN, banom, index })
            .catch(() => {});
    }

    renderAdminSpTable(banom);
    renderSpTable();
    refreshBentoStats();
    populateDropdownPimpinan();
    showToast('Data Dihapus', `Entri SP ${banom.toUpperCase()} berhasil dihapus.`);
}

async function adminAddMakesta() {
    const penyelenggara = document.getElementById('adm-mk-penyelenggara').value.trim();
    const tanggal = document.getElementById('adm-mk-tanggal').value.trim();
    const tempat = document.getElementById('adm-mk-tempat').value.trim();
    const peserta = parseInt(document.getElementById('adm-mk-peserta').value) || 0;

    if (!penyelenggara || !tanggal || !tempat) {
        showToast('Data Tidak Lengkap', 'Harap isi penyelenggara, tanggal, dan tempat.', false);
        return;
    }

    const newEntry = {
        penyelenggara, tanggal, tempat, peserta,
        praMakesta: { penyelenggara, tanggal: '-', tempat: '-', peserta: 0 },
        makesta: { penyelenggara, tanggal, tempat, peserta },
        rtl: [
            { penyelenggara, tanggal: '-', tempat: '-', peserta: 0 },
            { penyelenggara, tanggal: '-', tempat: '-', peserta: 0 },
            { penyelenggara, tanggal: '-', tempat: '-', peserta: 0 }
        ]
    };
    makestaDatabase.push(newEntry);

    if (appsScriptUrl) {
        await sendFormToAppsScript({ action: 'adminAddMakesta', adminPin: ADMIN_LOCAL_PIN, ...newEntry })
            .catch(() => {});
    }

    document.getElementById('adm-mk-penyelenggara').value = '';
    document.getElementById('adm-mk-tanggal').value = '';
    document.getElementById('adm-mk-tempat').value = '';
    document.getElementById('adm-mk-peserta').value = '';

    renderAdminMakestaTable();
    renderMakestaTable();
    refreshBentoStats();
    showToast('Rekap Disimpan', 'Data Makesta baru berhasil ditambahkan.');
}

async function adminDeleteMakesta(index) {
    if (!confirm(`Yakin ingin menghapus rekap Makesta ini?`)) return;
    makestaDatabase.splice(index, 1);

    if (appsScriptUrl) {
        await sendFormToAppsScript({ action: 'adminDeleteMakesta', adminPin: ADMIN_LOCAL_PIN, index })
            .catch(() => {});
    }

    renderAdminMakestaTable();
    renderMakestaTable();
    refreshBentoStats();
    showToast('Rekap Dihapus', 'Entri Makesta berhasil dihapus.');
}

async function adminAddRepo() {
    const title = document.getElementById('adm-repo-title').value.trim();
    const description = document.getElementById('adm-repo-desc').value.trim();
    const category = document.getElementById('adm-repo-category').value;
    const driveId = document.getElementById('adm-repo-driveid').value.trim();
    const coverImage = document.getElementById('adm-repo-cover').value.trim() || 'assets/images/logo-bersama.png';

    if (!title || !driveId) {
        showToast('Data Tidak Lengkap', 'Judul dokumen dan Google Drive ID wajib diisi.', false);
        return;
    }

    const newDoc = {
        id: String(Date.now()),
        title, description, category, coverImage, driveId
    };
    repoDatabase.push(newDoc);

    if (appsScriptUrl) {
        await sendFormToAppsScript({ action: 'adminAddRepo', adminPin: ADMIN_LOCAL_PIN, ...newDoc })
            .catch(() => {});
    }

    document.getElementById('adm-repo-title').value = '';
    document.getElementById('adm-repo-desc').value = '';
    document.getElementById('adm-repo-driveid').value = '';
    document.getElementById('adm-repo-cover').value = '';

    renderAdminRepoTable();
    renderRepository();
    showToast('Dokumen Ditambahkan', `"${title}" berhasil masuk ke repositori.`);
}

async function adminDeleteRepo(index) {
    if (!confirm(`Yakin ingin menghapus dokumen ini dari repositori?`)) return;
    const title = repoDatabase[index]?.title || 'dokumen ini';
    repoDatabase.splice(index, 1);

    if (appsScriptUrl) {
        await sendFormToAppsScript({ action: 'adminDeleteRepo', adminPin: ADMIN_LOCAL_PIN, index })
            .catch(() => {});
    }

    renderAdminRepoTable();
    renderRepository();
    showToast('Dokumen Dihapus', `"${title}" berhasil dihapus dari repositori.`);
}

// =========================================================================
// EDIT MODAL CONTROLLER
// =========================================================================

let editModalContext = null; // stores { type, index, banom }

function openEditModal() {
    document.getElementById('admin-edit-modal').classList.remove('hidden');
}

function closeEditModal() {
    document.getElementById('admin-edit-modal').classList.add('hidden');
    editModalContext = null;
}

function openEditSpModal(banom, index) {
    const item = rawDatabase[banom][index];
    if (!item) return;
    editModalContext = { type: 'sp', banom, index };
    document.getElementById('edit-modal-title').innerHTML = `<i class="fas fa-pencil-alt text-brand-purple"></i> Edit SP ${banom.toUpperCase()}`;
    document.getElementById('edit-modal-body').innerHTML = `
        <div class="space-y-1">
            <label class="block text-[9px] font-extrabold text-slate-400 uppercase">Nama Pimpinan</label>
            <input type="text" id="edit-sp-name" value="${item.name}"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-brand-textDark focus:outline-none focus:border-brand-purple transition">
        </div>
        <div class="space-y-1">
            <label class="block text-[9px] font-extrabold text-slate-400 uppercase">Tipe</label>
            <select id="edit-sp-type" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-brand-textDark focus:outline-none focus:border-brand-purple transition">
                <option value="ranting" ${item.type === 'ranting' ? 'selected' : ''}>Ranting</option>
                <option value="komisariat" ${item.type === 'komisariat' ? 'selected' : ''}>Komisariat</option>
            </select>
        </div>
        <div class="space-y-1">
            <label class="block text-[9px] font-extrabold text-slate-400 uppercase">Nomor SP Resmi</label>
            <input type="text" id="edit-sp-number" value="${item.spNumber}"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-brand-textDark focus:outline-none focus:border-brand-purple transition">
        </div>
        <div class="space-y-1">
            <label class="block text-[9px] font-extrabold text-slate-400 uppercase">Masa Berlaku (Tanggal)</label>
            <input type="date" id="edit-sp-expiry" value="${item.expiryDate}"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-brand-textDark focus:outline-none focus:border-brand-purple transition">
        </div>
        <div class="space-y-1">
            <label class="block text-[9px] font-extrabold text-slate-400 uppercase">No HP Ketua / Sekretaris</label>
            <input type="text" id="edit-sp-phone" value="${item.phone || ''}"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-brand-textDark focus:outline-none focus:border-brand-purple transition">
        </div>
        <div class="space-y-1">
            <label class="block text-[9px] font-extrabold text-slate-400 uppercase">Email Organisasi / Sekretaris</label>
            <input type="email" id="edit-sp-email" value="${item.email || ''}"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-brand-textDark focus:outline-none focus:border-brand-purple transition">
        </div>`;
    document.getElementById('edit-modal-save-btn').onclick = adminUpdateSp;
    openEditModal();
}

async function adminUpdateSp() {
    if (!editModalContext || editModalContext.type !== 'sp') return;
    const { banom, index } = editModalContext;
    const name = document.getElementById('edit-sp-name').value.trim();
    const type = document.getElementById('edit-sp-type').value;
    const spNumber = document.getElementById('edit-sp-number').value.trim();
    const expiryDate = document.getElementById('edit-sp-expiry').value;
    const phone = document.getElementById('edit-sp-phone').value.trim();
    const email = document.getElementById('edit-sp-email').value.trim();
    if (!name || !spNumber || !expiryDate) {
        showToast('Data Tidak Lengkap', 'Nama, Nomor SP, dan Masa Berlaku wajib diisi.', false);
        return;
    }
    rawDatabase[banom][index] = { name, type, spNumber, expiryDate, phone, email };
    if (appsScriptUrl) {
        await sendFormToAppsScript({ action: 'adminUpdateSp', adminPin: ADMIN_LOCAL_PIN, banom, index, name, type, spNumber, expiryDate, phone, email })
            .catch(() => {});
    }
    closeEditModal();
    renderAdminSpTable(banom);
    renderSpTable();
    refreshBentoStats();
    populateDropdownPimpinan();
    showToast('Data Diperbarui', `SP ${banom.toUpperCase()} berhasil diubah.`);
}

function openEditMakestaModal(index) {
    const item = makestaDatabase[index];
    if (!item) return;
    editModalContext = { type: 'makesta', index };
    document.getElementById('edit-modal-title').innerHTML = `<i class="fas fa-pencil-alt text-brand-purple"></i> Edit Rekap Makesta & RTL`;
    document.getElementById('edit-modal-body').innerHTML = `
        <div class="space-y-3 divide-y divide-slate-100 max-h-[50vh] overflow-y-auto pr-1">
            <div class="space-y-2">
                <h5 class="text-[10px] font-black text-brand-purple">MAKESTA UTAMA</h5>
                <div class="space-y-1">
                    <label class="block text-[9px] font-extrabold text-slate-400 uppercase">Penyelenggara</label>
                    <input type="text" id="edit-mk-penyelenggara" value="${item.penyelenggara}"
                        class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-brand-textDark focus:outline-none focus:border-brand-purple transition">
                </div>
                <div class="space-y-1">
                    <label class="block text-[9px] font-extrabold text-slate-400 uppercase">Tanggal Pelaksanaan</label>
                    <input type="text" id="edit-mk-tanggal" value="${item.tanggal}"
                        class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-brand-textDark focus:outline-none focus:border-brand-purple transition">
                </div>
                <div class="space-y-1">
                    <label class="block text-[9px] font-extrabold text-slate-400 uppercase">Tempat Pelaksanaan</label>
                    <input type="text" id="edit-mk-tempat" value="${item.tempat}"
                        class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-brand-textDark focus:outline-none focus:border-brand-purple transition">
                </div>
                <div class="space-y-1">
                    <label class="block text-[9px] font-extrabold text-slate-400 uppercase">Jumlah Peserta Lulus</label>
                    <input type="number" id="edit-mk-peserta" value="${item.peserta}"
                        class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-brand-textDark focus:outline-none focus:border-brand-purple transition">
                </div>
            </div>

            <div class="space-y-2 pt-3">
                <h5 class="text-[10px] font-black text-amber-600">PRA-MAKESTA</h5>
                <div class="space-y-1">
                    <label class="block text-[9px] font-extrabold text-slate-400 uppercase">Tanggal Pra-Makesta</label>
                    <input type="text" id="edit-mk-pra-tanggal" value="${item.praMakesta?.tanggal || '-'}"
                        class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-brand-textDark focus:outline-none focus:border-brand-purple transition">
                </div>
                <div class="space-y-1">
                    <label class="block text-[9px] font-extrabold text-slate-400 uppercase">Tempat Pra-Makesta</label>
                    <input type="text" id="edit-mk-pra-tempat" value="${item.praMakesta?.tempat || '-'}"
                        class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-brand-textDark focus:outline-none focus:border-brand-purple transition">
                </div>
                <div class="space-y-1">
                    <label class="block text-[9px] font-extrabold text-slate-400 uppercase">Peserta Pra-Makesta</label>
                    <input type="number" id="edit-mk-pra-peserta" value="${item.praMakesta?.peserta || 0}"
                        class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-brand-textDark focus:outline-none focus:border-brand-purple transition">
                </div>
            </div>

            <div class="space-y-2 pt-3">
                <h5 class="text-[10px] font-black text-indigo-600">RTL I</h5>
                <div class="space-y-1">
                    <label class="block text-[9px] font-extrabold text-slate-400 uppercase">Tanggal RTL I</label>
                    <input type="text" id="edit-mk-rtl1-tanggal" value="${item.rtl?.[0]?.tanggal || '-'}"
                        class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-brand-textDark focus:outline-none focus:border-brand-purple transition">
                </div>
                <div class="space-y-1">
                    <label class="block text-[9px] font-extrabold text-slate-400 uppercase">Tempat RTL I</label>
                    <input type="text" id="edit-mk-rtl1-tempat" value="${item.rtl?.[0]?.tempat || '-'}"
                        class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-brand-textDark focus:outline-none focus:border-brand-purple transition">
                </div>
                <div class="space-y-1">
                    <label class="block text-[9px] font-extrabold text-slate-400 uppercase">Peserta RTL I</label>
                    <input type="number" id="edit-mk-rtl1-peserta" value="${item.rtl?.[0]?.peserta || 0}"
                        class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-brand-textDark focus:outline-none focus:border-brand-purple transition">
                </div>
            </div>

            <div class="space-y-2 pt-3">
                <h5 class="text-[10px] font-black text-indigo-600">RTL II</h5>
                <div class="space-y-1">
                    <label class="block text-[9px] font-extrabold text-slate-400 uppercase">Tanggal RTL II</label>
                    <input type="text" id="edit-mk-rtl2-tanggal" value="${item.rtl?.[1]?.tanggal || '-'}"
                        class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-brand-textDark focus:outline-none focus:border-brand-purple transition">
                </div>
                <div class="space-y-1">
                    <label class="block text-[9px] font-extrabold text-slate-400 uppercase">Tempat RTL II</label>
                    <input type="text" id="edit-mk-rtl2-tempat" value="${item.rtl?.[1]?.tempat || '-'}"
                        class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-brand-textDark focus:outline-none focus:border-brand-purple transition">
                </div>
                <div class="space-y-1">
                    <label class="block text-[9px] font-extrabold text-slate-400 uppercase">Peserta RTL II</label>
                    <input type="number" id="edit-mk-rtl2-peserta" value="${item.rtl?.[1]?.peserta || 0}"
                        class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-brand-textDark focus:outline-none focus:border-brand-purple transition">
                </div>
            </div>

            <div class="space-y-2 pt-3">
                <h5 class="text-[10px] font-black text-indigo-600">RTL III</h5>
                <div class="space-y-1">
                    <label class="block text-[9px] font-extrabold text-slate-400 uppercase">Tanggal RTL III</label>
                    <input type="text" id="edit-mk-rtl3-tanggal" value="${item.rtl?.[2]?.tanggal || '-'}"
                        class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-brand-textDark focus:outline-none focus:border-brand-purple transition">
                </div>
                <div class="space-y-1">
                    <label class="block text-[9px] font-extrabold text-slate-400 uppercase">Tempat RTL III</label>
                    <input type="text" id="edit-mk-rtl3-tempat" value="${item.rtl?.[2]?.tempat || '-'}"
                        class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-brand-textDark focus:outline-none focus:border-brand-purple transition">
                </div>
                <div class="space-y-1">
                    <label class="block text-[9px] font-extrabold text-slate-400 uppercase">Peserta RTL III</label>
                    <input type="number" id="edit-mk-rtl3-peserta" value="${item.rtl?.[2]?.peserta || 0}"
                        class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-brand-textDark focus:outline-none focus:border-brand-purple transition">
                </div>
            </div>
        </div>`;
    document.getElementById('edit-modal-save-btn').onclick = adminUpdateMakesta;
    openEditModal();
}

async function adminUpdateMakesta() {
    if (!editModalContext || editModalContext.type !== 'makesta') return;
    const { index } = editModalContext;
    const penyelenggara = document.getElementById('edit-mk-penyelenggara').value.trim();
    const tanggal = document.getElementById('edit-mk-tanggal').value.trim();
    const tempat = document.getElementById('edit-mk-tempat').value.trim();
    const peserta = parseInt(document.getElementById('edit-mk-peserta').value) || 0;

    const praTanggal = document.getElementById('edit-mk-pra-tanggal').value.trim();
    const praTempat = document.getElementById('edit-mk-pra-tempat').value.trim();
    const praPeserta = parseInt(document.getElementById('edit-mk-pra-peserta').value) || 0;

    const rtl1Tanggal = document.getElementById('edit-mk-rtl1-tanggal').value.trim();
    const rtl1Tempat = document.getElementById('edit-mk-rtl1-tempat').value.trim();
    const rtl1Peserta = parseInt(document.getElementById('edit-mk-rtl1-peserta').value) || 0;

    const rtl2Tanggal = document.getElementById('edit-mk-rtl2-tanggal').value.trim();
    const rtl2Tempat = document.getElementById('edit-mk-rtl2-tempat').value.trim();
    const rtl2Peserta = parseInt(document.getElementById('edit-mk-rtl2-peserta').value) || 0;

    const rtl3Tanggal = document.getElementById('edit-mk-rtl3-tanggal').value.trim();
    const rtl3Tempat = document.getElementById('edit-mk-rtl3-tempat').value.trim();
    const rtl3Peserta = parseInt(document.getElementById('edit-mk-rtl3-peserta').value) || 0;

    if (!penyelenggara || !tanggal || !tempat) {
        showToast('Data Tidak Lengkap', 'Penyelenggara, tanggal, dan tempat wajib diisi.', false);
        return;
    }

    const updatedEntry = {
        penyelenggara,
        tanggal,
        tempat,
        peserta,
        praMakesta: { penyelenggara, tanggal: praTanggal, tempat: praTempat, peserta: praPeserta },
        makesta: { penyelenggara, tanggal, tempat, peserta },
        rtl: [
            { penyelenggara, tanggal: rtl1Tanggal, tempat: rtl1Tempat, peserta: rtl1Peserta },
            { penyelenggara, tanggal: rtl2Tanggal, tempat: rtl2Tempat, peserta: rtl2Peserta },
            { penyelenggara, tanggal: rtl3Tanggal, tempat: rtl3Tempat, peserta: rtl3Peserta }
        ]
    };

    makestaDatabase[index] = updatedEntry;

    if (appsScriptUrl) {
        await sendFormToAppsScript({ action: 'adminUpdateMakesta', adminPin: ADMIN_LOCAL_PIN, index, ...updatedEntry })
            .catch(() => {});
    }
    closeEditModal();
    renderAdminMakestaTable();
    renderMakestaTable();
    refreshBentoStats();
    showToast('Data Diperbarui', 'Rekap Makesta & RTL berhasil diubah.');
}

function openEditRepoModal(index) {
    const doc = repoDatabase[index];
    if (!doc) return;
    editModalContext = { type: 'repo', index };
    document.getElementById('edit-modal-title').innerHTML = `<i class="fas fa-pencil-alt text-brand-purple"></i> Edit Dokumen Repositori`;
    document.getElementById('edit-modal-body').innerHTML = `
        <div class="space-y-1">
            <label class="block text-[9px] font-extrabold text-slate-400 uppercase">Judul Dokumen</label>
            <input type="text" id="edit-repo-title" value="${doc.title}"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-brand-textDark focus:outline-none focus:border-brand-purple transition">
        </div>
        <div class="space-y-1">
            <label class="block text-[9px] font-extrabold text-slate-400 uppercase">Deskripsi</label>
            <input type="text" id="edit-repo-desc" value="${doc.description || ''}"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-brand-textDark focus:outline-none focus:border-brand-purple transition">
        </div>
        <div class="space-y-1">
            <label class="block text-[9px] font-extrabold text-slate-400 uppercase">Kategori</label>
            <select id="edit-repo-category" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-brand-textDark focus:outline-none focus:border-brand-purple transition">
                <option value="buku" ${doc.category === 'buku' ? 'selected' : ''}>Buku Wajib</option>
                <option value="modul" ${doc.category === 'modul' ? 'selected' : ''}>Modul Pelatihan</option>
                <option value="surat" ${doc.category === 'surat' ? 'selected' : ''}>Template Administrasi</option>
            </select>
        </div>
        <div class="space-y-1">
            <label class="block text-[9px] font-extrabold text-slate-400 uppercase">Google Drive File ID</label>
            <input type="text" id="edit-repo-driveid" value="${doc.driveId}"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono text-brand-textDark focus:outline-none focus:border-brand-purple transition">
        </div>
        <div class="space-y-1">
            <label class="block text-[9px] font-extrabold text-slate-400 uppercase">URL Gambar Sampul (opsional)</label>
            <input type="text" id="edit-repo-cover" value="${doc.coverImage || ''}"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-brand-textDark focus:outline-none focus:border-brand-purple transition">
        </div>`;
    document.getElementById('edit-modal-save-btn').onclick = adminUpdateRepo;
    openEditModal();
}

async function adminUpdateRepo() {
    if (!editModalContext || editModalContext.type !== 'repo') return;
    const { index } = editModalContext;
    const title = document.getElementById('edit-repo-title').value.trim();
    const description = document.getElementById('edit-repo-desc').value.trim();
    const category = document.getElementById('edit-repo-category').value;
    const driveId = document.getElementById('edit-repo-driveid').value.trim();
    const rawCover = document.getElementById('edit-repo-cover').value.trim() || repoDatabase[index].coverImage;
    if (!title || !driveId) {
        showToast('Data Tidak Lengkap', 'Judul dan Drive ID wajib diisi.', false);
        return;
    }
    const coverImage = convertToDirectDriveLink(rawCover);
    repoDatabase[index] = { ...repoDatabase[index], title, description, category, driveId, coverImage };
    if (appsScriptUrl) {
        await sendFormToAppsScript({ action: 'adminUpdateRepo', adminPin: ADMIN_LOCAL_PIN, index, title, description, category, driveId, coverImage })
            .catch(() => {});
    }
    closeEditModal();
    renderAdminRepoTable();
    renderRepository();
    showToast('Dokumen Diperbarui', `"${title}" berhasil diubah.`);
}

// =========================================================================
// REPOSITORY LIBRARY SYSTEM (Dynamic Preview & Download)
// =========================================================================

let currentRepoFilter = 'all';
let currentRepoSearch = '';

let repoDatabase = [
    {
        id: "1",
        title: "PD/PRT IPNU IPPNU Hasil Kongres",
        description: "Buku wajib pedoman landasan konstitusi organisasi, aturan dasar, serta hak dan kewajiban anggota resmi se-Indonesia.",
        category: "buku",
        coverImage: "assets/images/cover-pdprt.png",
        driveId: "1AQ00D1srOr53Jjf5w377NkFgLD5V-8e2"
    },
    {
        id: "2",
        title: "Modul Kaderisasi MAKESTA & LAKMUD",
        description: "Panduan lengkap instrumen wajib penyelenggaraan pengkaderan dasar (Masa Kesetiaan Anggota) & menengah (Latihan Kader Muda).",
        category: "modul",
        coverImage: "assets/images/cover-modul.png",
        driveId: "1B0ci-oiR9-izbp-sn0Zhy_sQJ8hRuoqC"
    },
    {
        id: "3",
        title: "Buku Saku Administrasi & Kop Surat Word",
        description: "Pedoman tata cara surat-menyurat resmi, nomor surat, administrasi kesekretariatan, serta template draf kop Microsoft Word.",
        category: "surat",
        coverImage: "assets/images/cover-bukusaku.png",
        driveId: "1B0ci-oiR9-izbp-sn0Zhy_sQJ8hRuoqC"
    }
];

function renderRepository() {
    const grid = document.getElementById('repo-grid');
    const emptyState = document.getElementById('repo-empty-state');
    if (!grid) return;

    grid.innerHTML = '';

    const filtered = repoDatabase.filter(doc => {
        const matchesCategory = currentRepoFilter === 'all' || doc.category === currentRepoFilter;
        const matchesSearch = doc.title.toLowerCase().includes(currentRepoSearch.toLowerCase()) || 
                              doc.description.toLowerCase().includes(currentRepoSearch.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    filtered.forEach(doc => {
        grid.innerHTML += `
            <div class="bg-white border border-slate-100 rounded-3xl p-5 hover:border-brand-purple/40 shadow-sm transition-all duration-300 flex flex-col justify-between group hover:shadow-md">
                <div class="space-y-4">
                    <!-- Elegant Book Cover with Hover Overlay -->
                    <div class="w-full h-56 bg-slate-50 rounded-2xl overflow-hidden relative flex items-center justify-center border border-slate-100/50">
                        <img src="${doc.coverImage}" alt="${doc.title}" 
                             class="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                             onerror="this.src='assets/images/logo-bersama.png'; this.className='w-16 h-16 object-contain opacity-20';">
                        
                        <!-- Premium Hover Action Overlay -->
                        <div class="absolute inset-0 bg-violet-950/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center gap-2 backdrop-blur-[2px]">
                            <button onclick="openPreviewModal('${doc.title}', '${doc.driveId}')" 
                                    class="px-4 py-2 rounded-xl bg-white/95 text-brand-purple hover:bg-white hover:scale-105 transition text-xs font-extrabold flex items-center gap-1.5 shadow-md">
                                <i class="fas fa-eye"></i> Pratinjau
                            </button>
                        </div>
                    </div>
                    
                    <div class="space-y-2">
                        <span class="text-[8px] font-extrabold uppercase tracking-widest text-brand-purple bg-violet-50 px-2 py-0.5 rounded-md inline-block">
                            ${doc.category === 'buku' ? 'Buku Wajib' : doc.category === 'modul' ? 'Modul Pelatihan' : 'Template Administrasi'}
                        </span>
                        <h4 class="font-extrabold text-sm text-brand-textDark group-hover:text-brand-purple transition duration-200 line-clamp-1" title="${doc.title}">${doc.title}</h4>
                        <p class="text-xs text-slate-500 leading-relaxed line-clamp-2">${doc.description}</p>
                    </div>
                </div>
                
                <a href="https://drive.google.com/uc?export=download&id=${doc.driveId}" target="_blank"
                   class="w-full mt-5 py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-150 rounded-xl text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5 transition">
                    <i class="fas fa-download text-slate-500"></i> Unduh Berkas
                </a>
            </div>
        `;
    });

    if (filtered.length === 0) {
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');
    }
}

function filterRepo(category) {
    currentRepoFilter = category;
    
    // Sync active class styles in buttons
    const categories = ['all', 'buku', 'modul', 'surat'];
    categories.forEach(cat => {
        const btn = document.getElementById(`repo-cat-${cat}`);
        if (btn) {
            if (cat === category) {
                btn.className = "px-4 py-2 rounded-xl text-xs font-extrabold transition duration-200 bg-brand-purple text-white shadow-sm";
            } else {
                btn.className = "px-4 py-2 rounded-xl text-xs font-bold transition duration-200 text-slate-500 hover:text-slate-800 bg-white border border-slate-100 hover:bg-slate-50";
            }
        }
    });

    renderRepository();
}

function searchRepo() {
    currentRepoSearch = document.getElementById('repo-search-input')?.value || '';
    renderRepository();
}

function openPreviewModal(title, driveId) {
    const iframe = document.getElementById('preview-iframe');
    const modal = document.getElementById('preview-modal');
    const modalTitle = document.getElementById('preview-modal-title');
    
    if (modalTitle) modalTitle.innerText = `Pratinjau: ${title}`;
    if (iframe) iframe.src = `https://drive.google.com/file/d/${driveId}/preview`;
    
    if (modal) {
        modal.classList.remove('hidden');
        setTimeout(() => {
            modal.querySelector('.transform').classList.remove('scale-95');
            modal.querySelector('.transform').classList.add('scale-100');
        }, 50);
    }
}

function closePreviewModal() {
    const iframe = document.getElementById('preview-iframe');
    const modal = document.getElementById('preview-modal');
    
    if (modal) {
        modal.querySelector('.transform').classList.remove('scale-100');
        modal.querySelector('.transform').classList.add('scale-95');
        setTimeout(() => {
            modal.classList.add('hidden');
            if (iframe) iframe.src = '';
        }, 200);
    }
}

// =========================================================================
// BERITA & INFORMASI SYSTEM (Dynamic News & Interactive Comments)
// =========================================================================

let currentBeritaFilter = 'all';
let currentBeritaSearch = '';
let currentOpenBeritaId = null;

// Helper to format ISO date to readable Indonesian date
function formatIndonesianDate(isoString) {
    if (!isoString) return '';
    try {
        const date = new Date(isoString);
        return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch (e) {
        return isoString;
    }
}

// Render News on Homepage
function renderBeritaListHome() {
    const container = document.getElementById('home-news-list');
    if (!container) return;
    container.innerHTML = '';

    // Take top 3 recent news
    const sorted = [...beritaDatabase].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 3);

    if (sorted.length === 0) {
        container.innerHTML = `<p class="text-xs text-slate-400 font-medium">Belum ada berita terpublikasi.</p>`;
        return;
    }

    sorted.forEach(news => {
        const iconClass = news.category === 'kegiatan' ? 'fa-newspaper text-violet-300' : news.category === 'info' ? 'fa-info-circle text-emerald-300' : 'fa-bullhorn text-amber-300';
        const bgClass = news.category === 'kegiatan' ? 'bg-violet-50 text-brand-purple' : news.category === 'info' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600';
        const badgeColor = news.category === 'kegiatan' ? 'bg-brand-purple/10 text-brand-purple' : news.category === 'info' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700';
        
        container.innerHTML += `
            <div onclick="navigateToBeritaDetail('${news.id}')"
                class="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-brand-purple/20 transition duration-200 flex flex-col sm:flex-row gap-4 items-start cursor-pointer group">
                <div class="w-full sm:w-32 h-24 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl font-extrabold overflow-hidden border border-slate-50">
                    ${news.coverImage ? `<img src="${news.coverImage}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300" onerror="this.outerHTML='<i class=\\\'fas ${iconClass}\\\'></i>'">` : `<div class="${bgClass} w-full h-full flex items-center justify-center"><i class="fas ${iconClass}"></i></div>`}
                </div>
                <div class="space-y-1.5 flex-grow">
                    <span class="px-2 py-0.5 rounded-md ${badgeColor} text-[8px] font-extrabold uppercase tracking-widest">${news.category}</span>
                    <h4 class="font-extrabold text-xs sm:text-sm text-brand-textDark hover:text-brand-purple transition duration-200 line-clamp-2">
                        ${news.title}
                    </h4>
                    <p class="text-xs text-slate-500 line-clamp-2">${news.content.replace(/<[^>]*>/g, '')}</p>
                    <div class="text-[9px] text-slate-400 font-bold flex items-center gap-3 pt-1">
                        <span class="flex items-center gap-1"><i class="far fa-calendar-alt"></i> ${formatIndonesianDate(news.timestamp)}</span>
                        <span class="flex items-center gap-1"><i class="far fa-eye"></i> ${news.views || 0}</span>
                        <span class="flex items-center gap-1"><i class="far fa-thumbs-up"></i> ${news.likes || 0}</span>
                    </div>
                </div>
            </div>
        `;
    });

    // Also populate home agenda list from berita of category 'kegiatan' or 'pengumuman'
    renderAgendaListHome();
}

// Render dynamic agendas
function renderAgendaListHome() {
    const container = document.getElementById('home-agenda-list');
    if (!container) return;
    container.innerHTML = '';

    // Agendas are events, we can display them based on news of category 'kegiatan' or 'pengumuman'
    const agendas = beritaDatabase.filter(n => n.category === 'kegiatan' || n.category === 'pengumuman')
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 3);

    if (agendas.length === 0) {
        container.innerHTML = `<p class="text-xs text-slate-400 font-medium">Belum ada agenda terdekat.</p>`;
        return;
    }

    agendas.forEach((agenda, idx) => {
        const dateObj = new Date(agenda.timestamp);
        const day = dateObj.getDate();
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agt", "Sep", "Okt", "Nov", "Des"];
        const month = monthNames[dateObj.getMonth()];
        
        const gradients = [
            'from-violet-600 to-indigo-700 shadow-violet-200',
            'from-indigo-500 to-blue-600 shadow-indigo-100',
            'from-emerald-500 to-teal-600 shadow-emerald-100'
        ];
        const grad = gradients[idx % gradients.length];

        container.innerHTML += `
            <div onclick="navigateToBeritaDetail('${agenda.id}')" class="flex gap-4 items-start border-b border-slate-100 pb-3 last:border-b-0 last:pb-0 cursor-pointer hover:bg-slate-50 p-2 rounded-xl transition group">
                <div class="bg-gradient-to-br ${grad} text-white rounded-xl w-12 h-12 flex flex-col items-center justify-center flex-shrink-0 font-extrabold shadow-sm">
                    <span class="text-sm leading-none">${day}</span>
                    <span class="text-[8px] uppercase tracking-wider mt-0.5">${month}</span>
                </div>
                <div class="space-y-0.5 flex-grow">
                    <h5 class="font-bold text-xs text-brand-textDark group-hover:text-brand-purple transition duration-200 line-clamp-1">${agenda.title}</h5>
                    <p class="text-xs text-slate-500 flex items-center gap-1"><i class="fas fa-map-marker-alt text-slate-400"></i> Kantor PAC Tahunan / Kegiatan</p>
                    <p class="text-[9px] text-brand-purple font-semibold">Klik untuk detail lengkap</p>
                </div>
            </div>
        `;
    });
}

function navigateToBeritaDetail(id) {
    window.location.hash = `#berita-detail?id=${id}`;
}

// Render News Portal Page Grid
function renderBerita() {
    const grid = document.getElementById('berita-grid');
    const emptyState = document.getElementById('berita-empty-state');
    if (!grid) return;
    grid.innerHTML = '';

    const filtered = beritaDatabase.filter(news => {
        const matchesCategory = currentBeritaFilter === 'all' || news.category === currentBeritaFilter;
        const matchesSearch = news.title.toLowerCase().includes(currentBeritaSearch.toLowerCase()) || 
                              news.content.toLowerCase().includes(currentBeritaSearch.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
        emptyState.classList.remove('hidden');
        return;
    }
    emptyState.classList.add('hidden');

    filtered.forEach(news => {
        const iconClass = news.category === 'kegiatan' ? 'fa-newspaper text-violet-300' : news.category === 'info' ? 'fa-info-circle text-emerald-300' : 'fa-bullhorn text-amber-300';
        const bgClass = news.category === 'kegiatan' ? 'bg-violet-50 text-brand-purple' : news.category === 'info' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600';
        const badgeColor = news.category === 'kegiatan' ? 'bg-brand-purple/10 text-brand-purple' : news.category === 'info' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700';

        grid.innerHTML += `
            <div class="bg-white border border-slate-100 rounded-3xl p-5 hover:border-brand-purple/40 shadow-sm transition-all duration-300 flex flex-col justify-between group hover:shadow-md">
                <div class="space-y-4">
                    <div class="w-full h-48 bg-slate-50 rounded-2xl overflow-hidden relative flex items-center justify-center border border-slate-100/50">
                        ${news.coverImage ? `<img src="${news.coverImage}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" onerror="this.outerHTML='<i class=\\\'fas ${iconClass} text-slate-350 text-4xl\\\'></i>'">` : `<div class="${bgClass} w-full h-full flex items-center justify-center"><i class="fas ${iconClass} text-4xl"></i></div>`}
                        
                        <div class="absolute inset-0 bg-violet-950/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center gap-2 backdrop-blur-[2px]">
                            <button onclick="navigateToBeritaDetail('${news.id}')" 
                                    class="px-4 py-2 rounded-xl bg-white/95 text-brand-purple hover:bg-white hover:scale-105 transition text-xs font-extrabold flex items-center gap-1.5 shadow-md">
                                <i class="fas fa-eye"></i> Baca Selengkapnya
                            </button>
                        </div>
                    </div>
                    
                    <div class="space-y-2">
                        <span class="text-[8px] font-extrabold uppercase tracking-widest ${badgeColor} px-2 py-0.5 rounded-md inline-block">
                            ${news.category}
                        </span>
                        <h4 class="font-extrabold text-sm text-brand-textDark group-hover:text-brand-purple transition duration-200 line-clamp-2" title="${news.title}">${news.title}</h4>
                        <p class="text-xs text-slate-500 leading-relaxed line-clamp-2">${news.content.replace(/<[^>]*>/g, '')}</p>
                    </div>
                </div>
                
                <div class="mt-5 pt-4 border-t border-slate-50 flex items-center justify-between text-[10px] text-slate-400 font-bold">
                    <span><i class="far fa-calendar-alt"></i> ${formatIndonesianDate(news.timestamp)}</span>
                    <div class="flex items-center gap-3">
                        <span><i class="far fa-eye"></i> ${news.views || 0}</span>
                        <span><i class="far fa-thumbs-up"></i> ${news.likes || 0}</span>
                    </div>
                </div>
            </div>
        `;
    });
}

function filterBerita(category) {
    currentBeritaFilter = category;
    
    const categories = ['all', 'kegiatan', 'info', 'pengumuman'];
    categories.forEach(cat => {
        const btn = document.getElementById(`berita-cat-${cat}`);
        if (btn) {
            if (cat === category) {
                btn.className = "px-4 py-2 rounded-xl text-xs font-extrabold transition duration-200 bg-brand-purple text-white shadow-sm";
            } else {
                btn.className = "px-4 py-2 rounded-xl text-xs font-bold transition duration-200 text-slate-500 hover:text-slate-800 bg-white border border-slate-100 hover:bg-slate-50";
            }
        }
    });

    renderBerita();
}

function searchBerita() {
    currentBeritaSearch = document.getElementById('berita-search-input')?.value || '';
    renderBerita();
}

// Render Detailed News Article
async function renderBeritaDetail(newsId) {
    currentOpenBeritaId = newsId;
    const news = beritaDatabase.find(n => n.id === String(newsId));
    if (!news) {
        showToast('Error', 'Berita tidak ditemukan', false);
        window.location.hash = '#berita';
        return;
    }

    // Increment view count (send to apps script backend)
    if (!sessionStorage.getItem(`viewed_berita_${newsId}`)) {
        news.views = (news.views || 0) + 1;
        sessionStorage.setItem(`viewed_berita_${newsId}`, 'true');
        
        if (appsScriptUrl) {
            sendFormToAppsScript({ action: 'submitView', id: newsId }).catch(() => {});
        }
    }

    // Fill UI elements
    document.getElementById('detail-berita-category').innerText = news.category;
    document.getElementById('detail-berita-date').innerHTML = `<i class="far fa-calendar-alt"></i> ${formatIndonesianDate(news.timestamp)}`;
    document.getElementById('detail-berita-title').innerText = news.title;
    document.getElementById('detail-berita-views').innerText = news.views || 0;
    document.getElementById('detail-berita-likes').innerText = news.likes || 0;
    document.getElementById('detail-berita-content').innerText = news.content;

    const imgEl = document.getElementById('detail-berita-img');
    if (news.coverImage) {
        imgEl.src = news.coverImage;
        imgEl.classList.remove('hidden');
    } else {
        imgEl.src = 'assets/images/logo-bersama.png';
    }

    // Render comments list
    renderComments(newsId);
    
    // Clear comment inputs
    document.getElementById('comment-name').value = '';
    document.getElementById('comment-text').value = '';
}

function renderComments(newsId) {
    const list = document.getElementById('detail-comments-list');
    const countEl = document.getElementById('detail-comments-count');
    if (!list) return;
    list.innerHTML = '';

    const comments = komentarDatabase.filter(c => String(c.newsId) === String(newsId));
    countEl.innerText = comments.length;

    if (comments.length === 0) {
        list.innerHTML = `<p class="py-4 text-xs text-slate-400 text-center font-medium">Belum ada komentar. Jadilah yang pertama memberikan masukan!</p>`;
        return;
    }

    comments.forEach(c => {
        list.innerHTML += `
            <div class="py-4 first:pt-0 space-y-1">
                <div class="flex items-center justify-between text-xs">
                    <span class="font-extrabold text-brand-textDark">${c.name}</span>
                    <span class="text-slate-400 font-semibold">${formatIndonesianDate(c.timestamp)}</span>
                </div>
                <p class="text-xs text-slate-600 leading-relaxed font-normal">${c.comment}</p>
            </div>
        `;
    });
}

function goBackToBerita() {
    window.location.hash = '#berita';
}

async function likeCurrentNews() {
    if (!currentOpenBeritaId) return;
    const news = beritaDatabase.find(n => n.id === String(currentOpenBeritaId));
    if (!news) return;

    if (localStorage.getItem(`liked_berita_${currentOpenBeritaId}`)) {
        showToast('Info', 'Anda sudah menyukai berita ini.', true);
        return;
    }

    news.likes = (news.likes || 0) + 1;
    localStorage.setItem(`liked_berita_${currentOpenBeritaId}`, 'true');
    document.getElementById('detail-berita-likes').innerText = news.likes;

    showToast('Berhasil Menyukai', 'Terima kasih atas tanggapan Anda!');

    if (appsScriptUrl) {
        sendFormToAppsScript({ action: 'submitLike', id: currentOpenBeritaId }).catch(() => {});
    }
}

async function postComment() {
    if (!currentOpenBeritaId) return;
    const name = document.getElementById('comment-name').value.trim();
    const comment = document.getElementById('comment-text').value.trim();

    if (!name || !comment) {
        showToast('Data Tidak Lengkap', 'Nama dan isi komentar wajib diisi.', false);
        return;
    }

    const newComment = {
        newsId: currentOpenBeritaId,
        timestamp: new Date().toISOString(),
        name,
        comment
    };

    komentarDatabase.push(newComment);
    renderComments(currentOpenBeritaId);

    document.getElementById('comment-name').value = '';
    document.getElementById('comment-text').value = '';

    showToast('Komentar Dikirim', 'Komentar Anda berhasil diterbitkan.');

    if (appsScriptUrl) {
        sendFormToAppsScript({ action: 'submitKomentar', ...newComment }).catch(() => {});
    }
}

// =========================================================================
// ADMIN PORTAL - BERITA MANAGEMENT (CRUD + Drive Image Upload)
// =========================================================================

let adminBeritaEditIndex = null;

function renderAdminBeritaTable() {
    const tbody = document.getElementById('admin-berita-tbody');
    const emptyEl = document.getElementById('admin-berita-empty');
    if (!tbody) return;
    tbody.innerHTML = '';

    if (beritaDatabase.length === 0) {
        emptyEl.classList.remove('hidden');
        return;
    }
    emptyEl.classList.add('hidden');

    beritaDatabase.forEach((news, idx) => {
        tbody.innerHTML += `
            <tr class="hover:bg-slate-50 transition">
                <td class="py-3 font-bold text-brand-textDark max-w-xs truncate" title="${news.title}">${news.title}</td>
                <td class="py-3">
                    <span class="text-[9px] font-extrabold uppercase tracking-widest text-brand-purple bg-violet-50 px-2 py-0.5 rounded">${news.category}</span>
                </td>
                <td class="py-3 text-right font-bold text-slate-500">${news.likes || 0}</td>
                <td class="py-3 text-right font-bold text-slate-500">${news.views || 0}</td>
                <td class="py-3 text-center">
                    <button onclick="openEditBeritaForm(${idx})" class="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-100 transition flex items-center justify-center mx-auto" title="Edit">
                        <i class="fas fa-pencil-alt text-xs"></i>
                    </button>
                </td>
                <td class="py-3 text-center">
                    <button onclick="adminDeleteBerita(${idx})" class="w-8 h-8 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition flex items-center justify-center mx-auto" title="Hapus">
                        <i class="fas fa-trash-alt text-xs"></i>
                    </button>
                </td>
            </tr>`;
    });
}

function openEditBeritaForm(index) {
    const news = beritaDatabase[index];
    if (!news) return;

    adminBeritaEditIndex = index;
    document.getElementById('adm-berita-form-title').innerHTML = `<i class="fas fa-pencil-alt text-brand-purple"></i> Edit Berita`;
    document.getElementById('adm-berita-id').value = news.id;
    document.getElementById('adm-berita-title').value = news.title;
    document.getElementById('adm-berita-category').value = news.category;
    document.getElementById('adm-berita-content').value = news.content;
    document.getElementById('adm-berita-image-url').value = news.coverImage || '';
    
    document.getElementById('adm-berita-submit-btn').innerHTML = `<i class="fas fa-save"></i> Perbarui Berita`;
    document.getElementById('adm-berita-cancel-btn').classList.remove('hidden');

    // Scroll to form
    document.getElementById('adm-berita-form-title').scrollIntoView({ behavior: 'smooth' });
}

// Helper to convert Google Drive share links to direct viewable links
function convertToDirectDriveLink(url) {
    if (!url) return '';
    const reg1 = /\/file\/d\/([a-zA-Z0-9_-]+)/;
    const reg2 = /[?&]id=([a-zA-Z0-9_-]+)/;
    let fileId = '';
    if (reg1.test(url)) {
        fileId = url.match(reg1)[1];
    } else if (reg2.test(url)) {
        fileId = url.match(reg2)[1];
    }
    
    if (fileId) {
        return `https://lh3.googleusercontent.com/d/${fileId}`;
    }
    return url;
}

function adminCancelEditBerita() {
    adminBeritaEditIndex = null;
    document.getElementById('adm-berita-form-title').innerHTML = `<i class="fas fa-plus-circle"></i> Tambah Berita Baru`;
    document.getElementById('adm-berita-id').value = '';
    document.getElementById('adm-berita-title').value = '';
    document.getElementById('adm-berita-category').value = 'kegiatan';
    document.getElementById('adm-berita-content').value = '';
    document.getElementById('adm-berita-image-url').value = '';

    document.getElementById('adm-berita-submit-btn').innerHTML = `<i class="fas fa-plus"></i> Simpan Berita`;
    document.getElementById('adm-berita-cancel-btn').classList.add('hidden');
}

// Save or Update Berita
async function adminSaveBerita() {
    const title = document.getElementById('adm-berita-title').value.trim();
    const category = document.getElementById('adm-berita-category').value;
    const content = document.getElementById('adm-berita-content').value.trim();
    const rawImgUrl = document.getElementById('adm-berita-image-url').value.trim();

    if (!title || !content) {
        showToast('Data Tidak Lengkap', 'Judul dan isi berita wajib diisi.', false);
        return;
    }

    const submitBtn = document.getElementById('adm-berita-submit-btn');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Menyimpan...';
    submitBtn.disabled = true;

    // Convert Drive link to direct display link if applicable
    const finalImageUrl = convertToDirectDriveLink(rawImgUrl);

    try {
        let payload = {
            title,
            category,
            content,
            coverImage: finalImageUrl,
            adminPin: ADMIN_LOCAL_PIN
        };

        if (adminBeritaEditIndex !== null) {
            // Edit mode
            const news = beritaDatabase[adminBeritaEditIndex];
            payload.id = news.id;
            payload.action = 'adminUpdateBerita';
            
            // Local update fallback
            news.title = title;
            news.category = category;
            news.content = content;
            news.coverImage = finalImageUrl;

            if (appsScriptUrl) {
                await sendFormToAppsScript(payload);
            }
            showToast('Berita Diperbarui', 'Berita berhasil diedit.');
        } else {
            // Add mode
            payload.id = String(Date.now());
            payload.timestamp = new Date().toISOString();
            payload.action = 'adminAddBerita';

            // Local fallback
            let newNews = {
                id: payload.id,
                timestamp: payload.timestamp,
                title,
                category,
                content,
                coverImage: finalImageUrl,
                likes: 0,
                views: 0
            };
            beritaDatabase.push(newNews);

            if (appsScriptUrl) {
                await sendFormToAppsScript(payload);
            }
            showToast('Berita Disimpan', 'Berita baru berhasil ditambahkan.');
        }

        adminCancelEditBerita();
        renderAdminBeritaTable();
        renderBerita();
        renderBeritaListHome();
    } catch (err) {
        console.error(err);
        showToast('Gagal Menyimpan', 'Terjadi kesalahan saat memproses data.', false);
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = adminBeritaEditIndex !== null ? `<i class="fas fa-save"></i> Perbarui Berita` : `<i class="fas fa-plus"></i> Simpan Berita`;
    }
}

async function adminDeleteBerita(index) {
    if (!confirm('Yakin ingin menghapus berita ini secara permanen beserta komentarnya?')) return;
    
    const news = beritaDatabase[index];
    if (!news) return;

    const newsId = news.id;
    beritaDatabase.splice(index, 1);
    
    // clean comments locally too
    komentarDatabase = komentarDatabase.filter(c => String(c.newsId) !== String(newsId));

    if (appsScriptUrl) {
        sendFormToAppsScript({ action: 'adminDeleteBerita', adminPin: ADMIN_LOCAL_PIN, id: newsId }).catch(() => {});
    }

    renderAdminBeritaTable();
    renderBerita();
    renderBeritaListHome();
    showToast('Berita Dihapus', 'Berita berhasil dihapus secara permanen.');
}

