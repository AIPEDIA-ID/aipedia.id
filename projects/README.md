# AIPEDIA Assistant Workflow

## 📁 Struktur Direktori
- `config/variables.csv` -> **Master Data (SSOT)** (Edit HANYA di sini).
- `prompts/system/` -> System Prompts untuk Custom GPT.
- `prompts/midjourney_prompts.txt` -> Hasil generate teks prompt gambar.
- `assets/raw_icons/` -> Folder dropzone untuk gambar transparan dari Midjourney.

---

## 🚀 Flow: Menambah Asisten Baru

### 1. Update Data (variables.csv)
**Semua data berpusat di `config/variables.csv`.** Setiap kolom punya peran spesifik yang menyebar ke seluruh sistem (Front-End web, Midjourney, dan Prompt):
- `id`: Nama unik (contoh: `budi`). Menentukan penamaan file `.png` dan `.txt`.
- `name`: Nama karakter yang tampil di website.
- `role`: Jabatan (contoh: *Business Strategist*). Tampil di web & jadi instruksi gaya visual Midjourney.
- `themeColor`: Kode Hex (contoh: `#F97300`). Menentukan warna aksen web & warna robot 3D.
- `gender`: Male/Female. Menentukan bentuk dasar robot di Midjourney.
- `description` & `examplePrompt`: **Copy Marketing** yang akan langsung tampil di katalog *Landing Page*.
- `category` & `price`: Digunakan untuk filter dan tabel harga di *Landing Page*.

**Langkah:**
- Tambahkan 1 baris baru ke paling bawah di file `projects/config/variables.csv`.
- Jalankan di terminal: `make project-sync` (Otomatis update `characters.json` untuk Front-End).

### 2. Generate Prompt Gambar
- Jalankan di terminal: `make project-prompt`
- Copy teks prompt dari file `projects/prompts/midjourney_prompts.txt`.
- Paste ke Midjourney (via Discord) atau AI sejenis.
- Download gambar hasil jadinya (pastikan background transparan).
- Simpan dengan nama `[id].png` ke folder `projects/assets/raw_icons/`.

### 3. Kompres Aset
- Jalankan di terminal: `make project-compress` (Gambar akan dikecilkan & dipindah ke folder public web).
- Jalankan di terminal: `make project-status` (Untuk memverifikasi apakah semua aset sudah lengkap).

### 4. Buat Custom GPT
- Buat file `.txt` baru di `projects/prompts/system/[id].txt` untuk instruksi GPT.
- Tambahkan dokumen PDF/teks ke folder `projects/knowledge-base/[id]/` (opsional).
- Buka ChatGPT UI -> Create Custom GPT.
- Paste instruksi dari file `[id].txt`, upload icon yang sudah dikompres dari `public/character/[id].png`, lalu upload file *knowledge-base* (jika ada).
