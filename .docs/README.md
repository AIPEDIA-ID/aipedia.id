# AIPEDIA Assistant Workflow

## 📁 Struktur Direktori
- `database/assistants.json` -> **Master Data (SSOT)** (Edit HANYA di sini).
- `prompts/system/` -> System Prompts untuk Custom GPT.
- `prompts/character_image_prompts.txt` -> Hasil generate teks visual prompt gambar karakter.
- `assets/raw_icons/` -> Folder dropzone untuk gambar transparan dari AI Image Generator.

---

## 🚀 Flow: Menambah Asisten Baru

### 1. Update Master Data (assistants.json)
**Semua data berpusat di `.docs/database/assistants.json`.** Setiap *field* punya peran spesifik yang menyebar ke seluruh sistem (Front-End web, AI Image Generator, dan Prompt internal):
- `id`: Nama unik (contoh: `budi`). Menentukan penamaan file `.png` dan index.
- `name`: Nama karakter yang tampil di website.
- `role`: Jabatan (contoh: *Business Strategist*). Tampil di web & jadi instruksi gaya visual Image Generator.
- `themeColor`: Kode Hex (contoh: `#F97300`). Menentukan warna aksen web & warna robot 3D.
- `gender`: Male/Female. Menentukan bentuk dasar robot.
- `description` & `examplePrompt`: **Copy Marketing** yang akan langsung tampil di katalog *Landing Page*.
- `category` & `price`: Digunakan untuk filter dan tabel harga di *Landing Page*.
- `link`: URL ChatGPT untuk asisten.
- `conversationStarters`: List prompt interaksi (ditulis dalam format Array).

**Langkah:**
- Tambahkan 1 block JSON baru ke `.docs/database/assistants.json`.
- Jalankan di terminal: `make project-generate-all` (Otomatis update Web, ASISTANT.md, dan dokumen internal).

### 2. Generate Visual Prompt Gambar
- Jalankan di terminal: `make project-visual-prompt`
- Copy teks prompt dari file `.docs/prompts/character_image_prompts.txt`.
- Paste ke AI Image Generator pilihanmu.
- Download gambar hasil jadinya (pastikan background transparan).
- Simpan dengan nama `[id].png` ke folder `.docs/assets/raw_icons/`.

### 3. Kompres Aset
- Jalankan di terminal: `make project-compress` (Gambar akan dikecilkan & dipindah ke folder public web).
- Jalankan di terminal: `make project-status` (Untuk memverifikasi apakah semua aset sudah sinkron).

### 4. Buat Custom GPT
- Setup instruksi Custom GPT dengan menyontek `conversationStarters` di `.docs/prompts/system/index.md`.
- Buka ChatGPT UI -> Create Custom GPT.
- Upload icon yang sudah dikompres dari `public/character/[id].png`, lalu upload file *knowledge-base* (jika ada).
