# Master Blueprint: Arsitektur Navigasi, Struktur Routing `/app/`, & Ownership AIPEDIA

> **Prinsip Utama:** *"Dipangkas Kompleksitasnya, Dibuat Tampil 'Wah'!"*  
> Menghilangkan kebingungan switching layout dengan **Pemisahan Jalur Tegas (Routing Separation)**: Semua yang memakai Side Nav berada di dalam prefix `/app/`, sedangkan halaman publik memakai Top Nav.

---

## 1. Pemisahan Jalur Tegas: Publik vs `/app/` (The Two Domains)

Dengan memindahkan seluruh workspace ke dalam prefix `/app/`, batasan layout menjadi **100% hitam-putih dan tanpa ambiguitas**:

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ DOMAIN 1: THE STORE & SHOWCASE (Route Publik) — 100% TOP NAV                 │
│ • Tidak ada sidebar yang tiba-tiba muncul atau hilang                         │
│ • URL:                                                                       │
│   - /                  (Beranda / Landing Page)                              │
│   - /catalog           (Toko Resmi: Beli Toolkit, Course, All-Access)        │
│   - /products/[slug]   (Sales Page & Silabus Lengkap per Produk)             │
│   - /tools             (Utilitas AI Gratis)                                  │
│   - /news              (Updates, Studi Kasus, & Edukasi)                     │
│   - /services          (Layanan Custom AI & Software Dev)                    │
└──────────────────────────────────────┬───────────────────────────────────────┘
                                       │ Login / Klik "Buka Workspace"
┌──────────────────────────────────────▼───────────────────────────────────────┐
│ DOMAIN 2: THE APP WORKSPACE (Prefix /app/) — 100% MACOS SIDEBAR              │
│ • Sidebar persisten di desktop (tidak pernah hilang saat navigasi internal)  │
│ • URL:                                                                       │
│   - /app/dashboard     (Mission Control, status tier, materi terakhir)       │
│   - /app/my-library    (⭐️ KOLEKSI SAYA / OWNERSHIP HUB)                     │
│   - /app/library       (Direktori Lengkap / The Vault: 100+ Prompt)          │
│   - /app/library/...   (Kategori Vault: LLM, Visual, SOP, Tutorial, dll)     │
│   - /app/r/[...slug]   (Materi Viewer / Video Player Player)                 │
│   - /app/account       (Profil Pengguna, Billing, Lisensi)                   │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Menjawab Dilema Ownership: "My Library" vs "Direktori Vault"

> **Pertanyaan Kritis:**  
> *"Jika user beli per-produk (Course/Toolkit satuan) atau beli UNLOCK ALL, di mana tempat melihat apa yang mereka miliki agar ekspektasinya pas?"*

### Konsep Solusi: Memisahkan "Koleksi Saya" vs "Jelajah Direktori"

Kita membedakan dua kebutuhan mental user:
1. **Mental Model 1 (Kepemilikan):** *"Tunjukkan hanya produk dan kelas yang SUDAH SAYA BELI agar saya bisa langsung belajar!"*  
   👉 Dijawab oleh halaman **`/app/my-library` (Koleksi Saya)**.
2. **Mental Model 2 (Eksplorasi):** *"Saya ingin mencari contekan prompt dan materi baru dari ratusan database AIPEDIA."*  
   👉 Dijawab oleh halaman **`/app/library` (Direktori Vault)**.

---

### A. Halaman Koleksi Saya (`/app/my-library`) — The Ownership Hub

Halaman ini menjadi **rumah kepemilikan user**. Tampilannya otomatis beradaptasi dengan apa yang dibeli user:

#### Skenario 1: User Beli Produk/Kursus Satuan (Per-Product Owner)
* **Tampilan Header:**  
  `Halo, [Nama]! Kamu memiliki 2 Aset Pembelajaran Aktif.`
* **Grid Produk yang Dimiliki:**
  - Card 1: `[🎬 Video Course] Mahir Automasi AI Bisnis`  
    *Progress:* `3/8 Modul Selesai (38%)` • `[ ▶ Lanjutkan Belajar ]`
  - Card 2: `[⚡ Toolkit] Starter Pack Prompt Bisnis & CS WA`  
    *Format:* `50+ Prompt Siap Pakai` • `[ Buka Template ]`
* **Upsell Banner di Bawah:**  
  *"Ingin akses ke 98+ materi lainnya? [Upgrade ke All-Access Pass (Hemat 50%)]"*

#### Skenario 2: User Membeli "UNLOCK ALL" (All-Access Pass Owner)
* **Tampilan Header Emas (VIP Status):**  
  `👑 Status Akun: ALL-ACCESS LIFETIME MEMBER`  
  *"Kamu memiliki akses tak terbatas ke seluruh Library, Update Masa Depan, dan Semua Video Course."*
* **Tampilan:**  
  Semua materi, toolkit, dan course terbuka dengan status `Akses Penuh / Unlocked`.

#### Skenario 3: User Gratisan (Free Member / Belum Beli Apa-apa)
* **Empty State Inspiratif:**  
  Menampilkan ilustrasi rapi: *"Koleksi belajarmu masih kosong. Buka [Katalog Produk](/catalog) untuk memilih kelas pertamamu, atau nikmati prompt gratisan di [Direktori Vault](/app/library)."*

---

### B. Halaman Direktori Vault (`/app/library`) — The Library Directory

Halaman ini adalah **gudang eksplorasi 100+ materi**:
* User bisa mencari prompt dengan search bar, filter kategori, dan pagination.
* **Status Badge pada Item:**
  - Item Free: `● Gratis` (Bisa dibuka dan dicopy siapa saja).
  - Item Pro/Paid yang **SUDAH DIBELI**: `🔓 Dimiliki (Unlocked)` (Bisa dibuka langsung).
  - Item Pro/Paid yang **BELUM DIBELI**: `🔒 Terkunci (Pro/Course)` (Menampilkan tombol *"Buka Akses via Katalog"*).

---

## 3. Struktur Navigasi Baru

### A. Top Nav (Halaman Publik)
Hanya muncul di luar `/app/`:
* `Katalog` (`/catalog`)
* `Tools` (`/tools`)
* `Updates` (`/news`)
* `Services` (`/services`)
* **Tombol Akses:**
  - Guest: `Masuk` | `[ Beli Akses Pro ✦ ]`
  - Logged In: `[ 🚀 Buka Workspace / Dashboard ]` -> Mengarahkan langsung ke `/app/dashboard`

---

### B. Side Nav (Halaman di Dalam `/app/`)
Selalu ada dan terkunci rapi di dalam `/app/`:

```
┌───────────────────────────────────────────────┐
│ [AIPEDIA Logo]                   [⌘B Minimize]│
│ Workspace: Member Active                      │
├───────────────────────────────────────────────┤
│ UTAMA                                         │
│ 🏠 Dashboard             (/app/dashboard)     │
│ ⭐️ Koleksi Saya          (/app/my-library) ⭐️ │
├───────────────────────────────────────────────┤
│ DIREKTORI MATERI (THE VAULT)                  │
│ 📚 Semua Materi          (/app/library)       │
│ 📄 LLM Prompt            (/app/library/llm)   │
│ 🎨 Visual Prompt         (/app/library/visual)│
│ ⚡ Custom AI & GPTs      (/app/library/custom)│
│ 📦 Resource & SOP        (/app/library/res)   │
│ 📖 Tutorial & Workflow   (/app/library/tutor) │
│ 🎬 Kursus Video          (/app/library/course)│
│ 💼 Founder Space         (/app/library/founder│
├───────────────────────────────────────────────┤
│ FOOTER                                        │
│ 🛍 Katalog Toko          (/catalog)           │
│ 👤 Pengaturan Akun       (/app/account)       │
└───────────────────────────────────────────────┘
```

---

## 4. Efisiensi Arsitektur & Import Code (Sesuai Syarat #1)

Agar duplikasi halaman tidak membuat bundle size membengkak atau kode berantakan:

1. **Shared Presentation Components (Dipakai Bersama):**
   - Komponen card seperti `ResourceCard.astro`, `ProductCard.astro`, `CopyButton.astro`, `Pagination.astro` tetap berada di `src/components/`.
   - Halaman `/app/library/index.astro` dan `/app/my-library/index.astro` hanya mengimpor komponen ini tanpa menulis ulang UI-nya.
2. **Shared Data Engine:**
   - Logika penentuan hak akses dipusatkan di `src/lib/access.ts` (`canAccess(userGrants, resourceId)`).
   - Filter kepemilikan untuk `/app/my-library`:
     ```typescript
     // Efisien & reaktif: ambil produk/resource yang id-nya ada di user grants
     const myGrants = await getGrants(user.id);
     const myProducts = allProducts.filter(p => myGrants.includes(p.slug) || myGrants.includes("bundle-all-access"));
     ```
3. **Redirect Cerdas:**
   - Kunjungan ke `/dashboard` otomatis redirect 301 ke `/app/dashboard`.
   - Kunjungan ke `/library` oleh user yang sudah login bisa langsung diarahkan ke `/app/library`.

---

## 5. Rangkuman Jawaban & Roadmap Eksekusi

1. **Pemisahan Folder `/app/`:**  
   👉 Sangat tepat. Ini menghilangkan 100% bug layout tabrakan, karena layout ditentukan murni oleh prefix URL.
2. **Penamaan "My Library" vs "Direktori":**  
   👉 Kita gunakan **"Koleksi Saya" (`/app/my-library`)** untuk produk yang sudah dibeli (Ownership Hub), dan **"Semua Materi" (`/app/library`)** untuk direktori database lengkap (Vault).
3. **Penanganan Beli Satuan vs UNLOCK ALL:**  
   👉 Di halaman **"Koleksi Saya"**, pembeli satuan melihat produk yang mereka beli secara fokus, sedangkan pembeli UNLOCK ALL melihat status badge VIP Emas dengan semua materi terbuka.
