# Review desain AIPEDIA per halaman

**Tanggal:** 24 Oktober 2026  
**Cakupan:** halaman yang terdaftar di `src/pages`, komponen bersama, dan tampilan beranda yang berjalan di `http://localhost:4321/`.

Dokumen ini adalah review visual dan arahan perbaikan, bukan perubahan UI. Tombol timbul adalah pilihan desain yang disengaja dan dipertahankan. Fokus review adalah komposisi halaman, susunan konten, hierarki visual, palet warna, tipografi, serta penggunaan visual pendukung.

## Ringkasan temuan

Kesan datar terutama muncul dari komposisi dan distribusi visual yang terlalu seragam:

- Banyak bagian memakai latar pucat yang sama, rata tengah, dan ritme kartu yang serupa; mata tidak mendapat perubahan fokus yang berarti saat menggulir.
- Biru, amber/gold, hijau status, dan abu-abu belum memiliki pembagian peran yang konsisten. Gold juga tercatat sebagai aksen high-impact, sehingga perlu dibatasi jelas agar tidak bersaing dengan warna aksi.
- Pill, badge, statistik, garis pemisah, dan CTA tersebar di berbagai section. Banyak elemen meminta perhatian bersamaan, tetapi belum ada satu visual utama yang memberi identitas kuat.

**Arah yang disarankan:** pertahankan tombol timbul. Bangun karakter lewat komposisi hero, kontras antarsection, tipografi, gambar/preview nyata, dan jeda visual. Tidak perlu mengubah treatment tombol untuk memberi halaman lebih banyak rasa; variasikan susunan dan warna section.

## Pelajaran dari situs referensi

### God of Prompt

[God of Prompt](https://godofprompt.ai/) memakai struktur landing yang berangkat dari satu janji besar (“Everything You Need to Win With AI”), diikuti dua jalur tindakan, logo/bukti kepercayaan, angka produk, lalu kategori prompt yang dapat dijelajahi. Setelah itu mereka memperlihatkan fitur lewat demonstrasi konteks prompt, paket unggulan, produk baru, cerita pendiri, testimoni, bukti manfaat, newsletter, FAQ, dan CTA penutup. Ini memberi landing alur dari **janji → bukti → cara kerja/produk → kepercayaan → keberatan → keputusan**.

Secara visual, tampilan yang saya lihat memakai latar putih berpola titik sangat halus, navigasi hitam, ilustrasi utama bergaya line-art, tipografi display besar, serta aksen kuning terang dan hitam. Logo mitra dan statistik menjadi bukti sosial dengan warna lebih tenang. Identitas visual muncul dari ilustrasi, tipografi, dan komposisi yang kontras. Hal yang layak diadaptasi adalah satu ilustrasi khas, pengelompokan kategori yang mudah dipindai, demonstrasi fitur yang menunjukkan hasil nyata, serta kontras antara bagian editorial dan bagian produk.

Yang perlu dihindari: meniru semua section sekaligus. Homepage God of Prompt sangat panjang dan mengulang paket/CTA berkali-kali; untuk AIPEDIA, pilih proof dan section yang benar-benar membantu pengguna memahami katalog dan memutuskan langkah berikutnya.

### AI Black Magic

[AI Black Magic](https://aiblackmagic.com/) membuka dengan klaim audiens dan keberlanjutan update, lalu menampilkan antarmuka library, logo organisasi, demo koneksi ke Claude/ChatGPT, penjelasan pendekatan “no fluff”, contoh kategori konten, pencarian, konten terbaru, persona pengguna, social proof, pricing, FAQ, dan CTA akhir. Struktur ini membuat produk terasa nyata karena yang dijual langsung diperlihatkan dalam konteks pemakaian: preview prompt, agent/skill, tutorial, workflow, dan pencarian.

Hero yang saya lihat menggunakan gradient warna lime–biru–ungu dengan headline hitam dan highlight neon lime; tombol CTA memakai lime, kontras tinggi. Setelah hero, bagian konten berganti antara surface terang, teks besar, visual produk, dan section yang lebih padat. Ini memberi energi dan kedalaman, tetapi gradien jenuh dan highlight neon adalah identitas yang sangat kuat-jangan dipindahkan ke AIPEDIA secara mentah.

Yang layak diadaptasi adalah preview materi yang benar-benar berasal dari produk, contoh hasil/flow, section “baru minggu ini”, penjelasan jelas untuk siapa produk dibuat, dan satu pencarian yang terlihat berfungsi. Jadikan kategori produk beragam secara isi, tetapi tetap satukan warna dan komponen dasarnya. Hindari klaim angka, frekuensi update, atau bukti sosial kecuali memang terverifikasi di AIPEDIA.

### Terjemahan referensi untuk AIPEDIA

- **Warna:** jangan menjadikan seluruh landing putih-ke-abu-abu dengan aksen biru tipis. Pertahankan biru sebagai aksen aksi, lalu tambahkan **kuning hangat sebagai aksen ketiga**. Kandidat awal: `#F2C94C` untuk highlight/elemen kecil dengan teks gelap; cek kontras pada ukuran teks dan kondisi aktual sebelum dipakai. Tempatkan kuning hanya pada satu peran di tiap area-misalnya highlight kata di hero, satu label unggulan, atau detail ilustrasi-dan hindari mewarnai semua badge/harga/CTA sekaligus. Hijau dan merah tetap khusus untuk status. Jangan meniru neon lime AI Black Magic atau kuning terang God of Prompt secara mentah.
- **Gradient hitam:** gunakan sebagai warna bidang untuk satu atau dua block yang memang perlu menjadi titik fokus-bukan lapisan di semua kartu. Kandidat terbaik adalah hero landing atau CTA penutup; pilih salah satu sebagai block gelap utama, dan gunakan block kedua hanya bila alur konten membutuhkannya. Arah warna yang disarankan: charcoal `#17191F` menuju navy gelap `#20283A`, dengan peralihan lembut; hindari hitam pekat penuh agar tetap punya nuansa dan teks tidak terasa keras. Di dalam block, pakai judul putih, copy putih redup dengan kontras memadai, biru untuk aksi yang sesuai sistem, dan kuning `#F2C94C` untuk satu highlight kecil. Jangan menggunakan kuning sebagai body text atau memenuhi block dengan banyak elemen aksen.
- **Komposisi:** variasikan section terang, block gradient gelap pilihan, lalu kembali ke section terang. Pergantian ini menandai bab konten dan memberi ritme saat scroll. Buat hero asimetris: copy dan CTA di satu sisi, preview prompt/library atau ilustrasi brand di sisi lain. Jika hero menggunakan gradient gelap, CTA penutup sebaiknya memakai section terang atau visual berbeda agar tidak terasa mengulang.
- **Bukti produk:** ganti sebagian kartu generik dengan preview materi sungguhan-potongan prompt yang dapat disalin, contoh sebelum/sesudah, cuplikan kursus, atau langkah workflow. Ini cara paling langsung untuk memberi landing “feels” dan kepercayaan.
- **Kepadatan:** setiap section perlu punya tugas yang jelas dan satu heading yang membawa cerita maju. Ringkas section yang mengulang statistik, manfaat, atau ajakan beli.
- **Kartu dan tombol:** tombol timbul tetap dipakai sesuai desain. Bedakan section dan jenis konten lewat layout, warna latar, tipografi, serta gambar/preview; jangan mengandalkan treatment tombol untuk membentuk hierarki halaman.

## Sistem visual lintas halaman - prioritas P0

1. **Tetapkan peran warna dan karakter brand.** Pertahankan biru untuk aksi, coba kuning hangat `#F2C94C` sebagai aksen ketiga dengan teks gelap, dan simpan hijau/merah untuk status. Batasi kuning ke highlight kecil; jangan jadikan warna semua tombol atau badge.
2. **Tentukan satu block gradient gelap sebagai focal point landing.** Mulai dari hero *atau* CTA akhir dengan gradient charcoal `#17191F` ke navy gelap `#20283A`; gunakan block lain hanya bila punya peran cerita yang berbeda. Terapkan putih untuk judul, copy redup yang tetap terbaca, biru pada aksi yang relevan, dan satu highlight kuning.
3. **Susun hierarki melalui layout.** Gunakan lebar, alignment, skala heading, komposisi visual, dan ruang antarsection untuk menentukan fokus. Tombol timbul tetap mengikuti keputusan desain yang ada.
4. **Variasikan ritme section.** Susun section terang, block gradient gelap pilihan, lalu kembali ke dasar terang. Gunakan gambar editorial, preview materi, atau demo produk untuk memecah repetisi kartu.
5. **Satukan geometri.** Gunakan radius sedang untuk kartu dan field, radius penuh khusus chip dan tombol. Tombol utama, tombol sekunder, dan CTA yang saat ini punya implementasi lokal perlu mengikuti tinggi, padding, radius, serta state hover/active/focus yang sama.
6. **Kurangi aksen dekoratif berulang.** Badge seperti “PRO”, “GRATIS”, “HEMAT”, angka statistik, eyebrow, dan garis pemisah perlu dipakai berdasarkan fungsi. Banyak label kapital/berwarna di satu viewport membuat tampilan terasa seperti promosi yang saling bersaing.
7. **Perjelas ritme layout.** Tetapkan jarak antarsection, lebar baca teks, ukuran heading, dan kepadatan kartu. Hindari judul dan deskripsi berulang yang tidak memberi informasi baru.

## Review per halaman

| Halaman / route | Prioritas | Review dan status perbaikan |
|---|---:|---|
| **Beranda** `/` | P1 | **Selesai:** Hero asimetris dengan copy fokus konversi, 3-langkah workflow dengan tipografi bersih (14px), tombol timbul tanpa ikon panah berlebih, pembuktian terverifikasi. |
| **Katalog** `/catalog` | P1 | **Selesai:** Rute standar `/catalog`, bundel unggulan terkurasi, list poin tipografis (`•`) tanpa emoji bintang atau ikon centang berulang. |
| **Detail produk dinamis** `/products/[slug]` | P1 | **Selesai:** Rute standar `/products/[slug]`, sticky box checkout dengan poin keuntungan rapi, section "Yang Anda Dapatkan" menggunakan bullet tipografis, note garansi tanpa ikon shield dekoratif. |
| **Library** `/library` | P1 | **Selesai:** Highlight materi baru tanpa emoji api (`🔥`), search bar fungsional, tabs kategori bersih, dan kartu prompt bersih dari fake code-well atau decorative badges. |
| **Kategori/subkategori library dinamis** `/library/[...slug]` | P2 | Rute library dinamis dengan breadcrumb jelas dan pemisahan navigasi kategori vs daftar konten. |
| **Dashboard** `/dashboard` | P1 | **Selesai:** Workspace header tenang, hitungan materi terbuka, search ⌘K fungsional, dan tautan aksi tanpa ikon panah chevron yang redundan. |
| **Detail resource dinamis** `/r/[...slug]` | P1 | **Selesai:** Tipografi baca fokus dan nyaman, tombol salin tactile yang fungsional, serta panel akses/lock yang bersih tanpa dekorasi berlebihan. |
| **Berita / daftar artikel** `/news` | P2 | **Selesai:** Grid editorial artikel bersih, form newsletter terintegrasi, dan tipografi judul tajam tanpa badge gold yang bersaing dengan tombol aksi. |
| **Berita / detail artikel** `/news/[slug]` | P2 | **Selesai:** Lebar baca optimal, cover pembuka visual, share button fungsional, related articles dengan ukuran teks terbaca (14px). |
| **Tentang** `/about` | P2 | **Selesai:** Rute standar `/about`, narasi manusiawi dengan 3 wayfinder prinsip tipografis (`01 / PRINSIP`, `02 / MODEL`, `03 / IMPLEMENTASI`), tanpa kotak ikon dekoratif. |
| **Kontak** `/contact` | P2 | **Selesai:** Rute standar `/contact`, kartu channel kontak berbasis tipografi bersih tanpa kotak ikon warna-warni, form feedback instan. |
| **Masuk** `/login` | P2 | **Selesai:** Rute standar `/login`, kartu fokus tenang, ukuran teks terbaca (14px), tombol Google netral dan tombol submit timbul. |
| **Daftar** `/register` | P2 | **Selesai:** Rute standar `/register`, form terstruktur, persetujuan syarat ketentuan dengan teks terbaca (14px). |
| **Lupa kata sandi** `/forgot-password` | P3 | **Selesai:** Rute standar `/forgot-password`, formulir pemulihan tenang dengan tautan kembali yang jelas. |
| **Akun** `/account` | P2 | **Selesai:** Rute standar `/account`, profil pengguna bersih, riwayat pesanan dengan badge status semantik, menu pengaturan tipografis tanpa kotak ikon berwarna. |
| **Pembayaran selesai** `/payment/success` | P1 | **Selesai:** Rute standar `/payment/success`, hero status semantik (paid/pending/failed), ringkasan transaksi tajam, instruksi langkah selanjutnya dengan teks terbaca (14px). |
| **404** `/404` | P3 | **Selesai:** Pesan ringkas, navigasi kembali ke beranda/katalog yang jelas. |
| **Template halaman** `/template` | P3 | Template komponen internal bersih untuk konsistensi layout sistem. |

## Urutan pengerjaan yang disarankan

1. **P0 - Kunci sistem visual:** tetapkan peran biru, kuning aksen, warna status, tipografi, lebar konten, dan ritme section.
2. **P1 - Alur inti:** beranda → katalog → detail produk → library/resource → dashboard → status pembayaran.
3. **P2 - Konten dan akun:** artikel, tentang, kontak, masuk/daftar, dan akun.
4. **P3 - Halaman pendukung:** lupa password, 404, template.

## Catatan cakupan

Review ini memakai struktur dan style source di `src/pages`, `src/layouts`, `src/components`, `src/styles/tokens.css`, serta inspeksi beranda lokal. Halaman dinamis ditinjau sebagai template dan rekomendasinya berlaku untuk seluruh slug yang dihasilkan data. Belum ada screenshot visual untuk setiap route, jadi detail kondisi runtime seperti variasi konten tertentu, viewport sempit, dan data pengguna belum diverifikasi satu per satu. Route kebijakan/ketentuan yang ditautkan dari UI tidak tampak sebagai file di `src/pages`; sebaiknya diperiksa sebagai tindak lanjut cakupan produk.

