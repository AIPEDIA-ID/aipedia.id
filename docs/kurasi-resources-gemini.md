# Kriteria Kurasi Resources dan Prompt Riset Gemini

Dokumen ini menjadi panduan untuk mengumpulkan resource baru bagi Directory AIPEDIA. Tujuannya bukan menambah jumlah item, tetapi menambah materi yang berguna, dapat dipakai, dan aman untuk dikurasi.

## Peta kebutuhan Directory

Resource AIPEDIA ditujukan terutama untuk pemilik UMKM, pebisnis, kreator, freelancer, dan tim kecil di Indonesia. Setiap resource sebaiknya membantu menyelesaikan satu tugas nyata, dengan bahasa yang mudah dipahami dan hasil yang bisa langsung dicoba.

Per 25 Oktober 2026, folder `resources/` berisi **101 file resource**: 92 `llm-prompt`, 1 `visual-prompt`, 1 `custom-ai`, 4 tutorial, 1 course, 1 resource unduhan, dan 1 founder-space. Karena koleksi sangat berat ke prompt teks, riset berikutnya perlu memprioritaskan format dan kebutuhan yang masih tipis, bukan menambah prompt generik yang mirip.

Prioritas riset awal:

1. Template, checklist, worksheet, dan resource file/link yang benar-benar bisa digunakan.
2. Tutorial praktis dengan langkah yang bisa diverifikasi dan hasil akhir yang jelas.
3. Visual prompt dengan spesifikasi tool dan parameter yang sudah dicek.
4. Custom AI atau workflow yang memiliki konfigurasi dan contoh pengujian nyata.
5. Course mini yang punya urutan modul, latihan, dan hasil belajar terukur.
6. Prompt teks hanya jika memecahkan kebutuhan spesifik yang belum tercakup koleksi saat ini.

## Kriteria penilaian

Beri nilai 0–5 untuk setiap kriteria, lalu hitung skor berbobot: `nilai / 5 × bobot`.

| Kriteria | Bobot | Yang dicari |
|---|---:|---|
| Relevansi audiens | 20 | Berguna untuk konteks bisnis, kreator, atau kerja sehari-hari di Indonesia. |
| Keterpakaian | 20 | Langkah, input, output, atau file jelas sehingga pengguna bisa langsung mencoba. |
| Nilai kurasi | 15 | Spesifik, punya sudut atau metode yang berguna, bukan prompt generik yang mudah ditemukan di mana-mana. |
| Kualitas dan keterlacakan sumber | 15 | Sumber primer atau sumber ahli yang bisa dibuka dan mendukung materi. |
| Kelengkapan konten | 10 | Ada konteks, prasyarat, instruksi, contoh, dan batasan sesuai jenis resource. |
| Lokalisasi | 10 | Istilah, contoh, mata uang, kanal, dan skenario sesuai Indonesia bila relevan. |
| Ketepatan tool dan kebaruan | 5 | Nama tool, parameter, tautan, dan instruksi masih berlaku; tanggal pemeriksaan dicatat. |
| Hak penggunaan | 5 | Lisensi atau izin penggunaan dapat diketahui; adaptasi tidak menyalin karya berhak cipta. |

**Keputusan:** 75–100 masuk shortlist; 60–74 perlu riset atau edit lagi; di bawah 60 tidak dipilih. Nilai tinggi tidak mengesampingkan alasan gugur berikut.

### Gugur atau tahan untuk klarifikasi

- Tidak ada sumber yang bisa diverifikasi, sumber mati, atau klaim penting tidak didukung bukti.
- Duplikat atau variasi tipis dari resource yang sudah ada.
- Karya GitHub tidak memiliki lisensi eksplisit, atau lisensinya tidak mengizinkan penggunaan yang direncanakan.
- Isi menyalin prompt, artikel, template, atau file pihak lain secara substansial tanpa izin.
- Memuat klaim hasil, angka, testimoni, statistik, atau performa yang dibuat-buat.
- Bergantung pada fitur/tool yang tidak ada atau belum bisa diverifikasi.
- Meminta data sensitif, membagikan kredensial, atau berpotensi mendorong tindakan berbahaya.

## Aturan sumber

1. Utamakan dokumentasi resmi tool, repositori resmi, repositori GitHub dengan lisensi yang jelas, standar terbuka, dan materi praktisi yang menyebut penulis serta sumbernya.
2. Perlakukan halaman prompt publik sebagai **referensi ide**, bukan materi untuk disalin. Tulis ulang sebagai materi orisinal dan catat inspirasi/sumbernya.
3. Untuk GitHub, catat URL repositori dan file, nama pemilik, lisensi yang terbaca, tanggal update/release jika tersedia, serta batasan lisensinya. Jangan menyimpulkan lisensi hanya dari status “public”.
4. Untuk web, catat judul sumber, penerbit/penulis, URL langsung, tanggal terbit atau update, dan tanggal akses.
5. Pisahkan bukti faktual dari saran kurasi. Jangan menyebut hasil pencarian, volume penggunaan, atau performa resource kecuali sumber benar-benar menyediakannya.
6. Simpan atribusi dan catatan sumber di laporan riset terpisah. Schema resource saat ini tidak memiliki field `source_url`; jangan menambah field frontmatter baru tanpa perubahan schema.

## Bentuk resource yang diterima repository

Sebelum membuat draft, cocokkan kategori dan field dengan `resources/schema.ts` dan contoh Markdown yang ada di `resources/`.

- Kategori: `llm-prompt`, `visual-prompt`, `custom-ai`, `resource`, `tutorial`, `founder-space`, `course`.
- Tools yang valid: `ChatGPT`, `Claude`, `Gemini`, `Perplexity`, `Nano Banana`, `Generic`.
- Topics yang valid: `Marketing & Content`, `Business & Operations`, `Productivity & Admin`, `Career & CV`, `Education / Learning`, `Copywriting & Communication`, `Customer Support`, `Sales & Closing`.
- `delivery_type`: `text`, `link`, atau `file`.
- `access_level`: `free`, `starter`, atau `pro`. Usulkan level beserta alasannya; keputusan final tetap perlu dicocokkan dengan katalog dan aturan akses.
- Resource standar memakai `title`, `description`, `category`, `delivery_type`, dan `access_level`; field opsional yang didukung mencakup `tools`, `topics`, `thumbnail`, `url`, `file`, `uses`, `author`, `prompt_preview`, `steps`, dan `tips`.
- Course memakai `modules` dengan `title`, `sequence`, serta `video_url`/`notes` opsional.
- Isi Markdown harus orisinal, praktis, dan cukup lengkap untuk dipakai tanpa menebak langkah penting. Jangan mengarang URL file, video, author, `uses`, atau hak akses.
- Ikuti pedoman bahasa dalam `resources/README.md`, tetapi tandai bila contoh resource yang ada tidak konsisten dengan pedoman tersebut. Jangan diam-diam menerjemahkan isi teknis yang seharusnya dipertahankan.

## Prompt siap pakai untuk Gemini

Lampirkan repository atau minimal folder `resources/`, `resources/schema.ts`, dan `resources/README.md` saat menjalankan prompt ini. Jika Gemini tidak dapat membaca lampiran, minta daftar file resource terlebih dahulu dan jangan mengklaim sudah memeriksa duplikasi.

```text
Kamu adalah peneliti dan kurator konten untuk AIPEDIA, sebuah Directory berisi prompt, workflow, tutorial, course, dan resource praktis bagi pemilik UMKM, pebisnis, kreator, freelancer, dan tim kecil di Indonesia.

TUGAS
Riset GitHub dan sumber internet untuk menemukan kandidat resource yang layak dikurasi ke Directory AIPEDIA. Jangan hanya membuat daftar prompt generik. Cari kebutuhan dan format yang belum tercukupi oleh koleksi yang dilampirkan.

KONTEKS KOLEKSI
- Baca file yang dilampirkan, terutama resources/**/*.md, resources/schema.ts, dan resources/README.md.
- Buat daftar topik, judul, kategori, dan slug yang sudah tercakup. Bandingkan setiap kandidat dengan daftar ini untuk menghindari duplikasi atau variasi tipis.
- Jika file repository tidak tersedia atau tidak lengkap, nyatakan batasan itu. Jangan mengaku sudah melakukan pemeriksaan duplikasi.
- Koleksi saat ini sangat dominan prompt teks. Prioritaskan template/checklist/worksheet, tutorial langkah demi langkah, visual prompt teruji, Custom AI/workflow, dan course mini. Tambah prompt teks hanya bila kasus penggunaannya spesifik dan belum ada.

STANDAR RISET
1. Cari sumber primer dan tepercaya: dokumentasi resmi, repo resmi, repo GitHub dengan lisensi yang terbaca, standar terbuka, atau materi praktisi yang punya penulis dan sumber.
2. Untuk setiap kandidat, buka dan verifikasi sumber langsung. Catat URL spesifik, judul, pemilik/penulis, tanggal update/akses, dan bukti yang membuatnya relevan.
3. Untuk GitHub, periksa file LICENSE atau informasi lisensi resmi. Public repository tanpa lisensi eksplisit bukan izin untuk menyalin atau menggunakan ulang kontennya.
4. Jangan menyalin prompt, artikel, template, atau file sumber. Gunakan sumber untuk memverifikasi konsep dan menemukan kebutuhan; tulis materi AIPEDIA secara orisinal. Jika lisensi tidak jelas atau konten terlalu dekat dengan sumber, tandai HOLD/REJECT dan jangan membuat versi yang menyamarkan salinan.
5. Verifikasi nama tool, fitur, parameter, dan tautan yang sensitif terhadap perubahan. Catat tanggal pemeriksaan. Jangan membuat klaim statistik, penggunaan, hasil, testimoni, atau bukti yang tidak ada pada sumber.
6. Pertimbangkan konteks Indonesia: bahasa yang alami, skenario lokal, UMKM, kanal yang relevan, dan asumsi akses/tool yang realistis. Jelaskan jika kandidat memerlukan tool berbayar.

PENILAIAN
Beri nilai 0–5 dan skor berbobot /100 dengan bobot:
- relevansi audiens 20
- keterpakaian 20
- nilai kurasi/orisinalitas 15
- kualitas dan keterlacakan sumber 15
- kelengkapan konten 10
- lokalisasi Indonesia 10
- ketepatan tool dan kebaruan 5
- kejelasan hak penggunaan 5

Interpretasi: 75–100 shortlist, 60–74 perlu perbaikan/verifikasi, di bawah 60 tidak dipilih. Tetap beri keputusan REJECT atau HOLD jika duplikat, sumber tak terverifikasi, lisensi tak jelas untuk penggunaan yang direncanakan, ada klaim rekaan, atau konten berisiko—apa pun nilai totalnya.

SKEMA REPOSITORY
Gunakan hanya nilai yang ada di resources/schema.ts:
- category: llm-prompt | visual-prompt | custom-ai | resource | tutorial | founder-space | course
- tools: ChatGPT | Claude | Gemini | Perplexity | Nano Banana | Generic
- topics: Marketing & Content | Business & Operations | Productivity & Admin | Career & CV | Education / Learning | Copywriting & Communication | Customer Support | Sales & Closing
- delivery_type: text | link | file
- access_level: free | starter | pro
Resource standar mendukung field title, description, category, tools, topics, delivery_type, access_level, thumbnail, url, file, uses, author, prompt_preview, steps, tips, serta isi Markdown. Course memakai modules. Jangan menambah field yang tidak ada di schema. Jangan mengarang uses, author, thumbnail, URL unduhan/video, atau entitlement. Beri rekomendasi access_level dan alasannya sebagai usulan, bukan fakta.

FORMAT HASIL
A. Ringkasan riset
- Tanggal riset dan kata kunci/query yang digunakan.
- Kesenjangan Directory yang ditemukan berdasarkan file repo.
- Batasan riset atau sumber yang tidak bisa diverifikasi.

B. Shortlist maksimal 10 kandidat dalam tabel:
Nama kandidat | masalah pengguna | format | kategori/topic yang diusulkan | tool | sumber langsung | penulis/pemilik | lisensi/izin | tanggal sumber | kemiripan dengan koleksi | skor /100 | keputusan (SHORTLIST/HOLD/REJECT) | alasan.

C. Dossier untuk maksimal 3 kandidat teratas:
- Jelaskan bukti kebutuhan dan cara sumber mendukung riset; pisahkan fakta dan interpretasi.
- Rancang outline asset AIPEDIA yang orisinal dan cara pengguna memakainya.
- Catat prasyarat, tool/biaya, risiko, hal yang perlu diuji manusia, serta sumber yang masih perlu izin.
- Jangan menulis draft penuh jika lisensi/izin atau fakta inti belum jelas.

D. Draft maksimal 3 resource teratas yang lolos:
- Berikan Markdown siap direview dengan frontmatter yang valid sesuai schema repository dan isi yang orisinal.
- Buat metadata, langkah, dan tips dalam Bahasa Indonesia yang jelas. Untuk prompt_preview, ikuti pedoman bahasa resources/README.md dan tandai bila pedoman bertentangan dengan contoh aktual di repository.
- Prompt harus memiliki peran/konteks, input yang perlu diisi, tugas, batasan, dan format output. Sertakan instruksi agar model tidak mengarang data; minta pengguna memberi data bila diperlukan.
- Tutorial/template/course harus dapat diuji langkah demi langkah dan menyebutkan hasil akhir yang diharapkan.
- Setelah setiap draft, sertakan catatan sumber dan lisensi DI LUAR frontmatter, karena schema tidak memiliki source_url.

Jangan menulis atau mengubah file repository. Berikan temuan dan draft untuk ditinjau manusia. Utamakan kualitas dan keterlacakan daripada kuantitas.
```

## Alur kerja yang disarankan

1. Berikan Gemini repo/folder resources dan minta shortlist riset dahulu.
2. Tinjau duplikasi, relevansi, sumber, dan lisensi; tolak kandidat lemah sebelum meminta draft.
3. Pilih maksimal tiga kandidat; minta draft orisinal dan periksa langkahnya secara manual.
4. Baru setelah lolos review, masukkan Markdown ke lokasi `resources/` yang sesuai dan validasi dengan schema.
