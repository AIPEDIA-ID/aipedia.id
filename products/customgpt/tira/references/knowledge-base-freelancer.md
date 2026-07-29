# TIRA — Knowledge Base: Freelancer & Pekerjaan Bebas

> **Last verified:** 30 Juli 2026. File ini terpisah dari `tira-knowledge-base-umkm.md` karena freelancer/pekerjaan bebas pakai skema pajak yang BERBEDA dari UMKM usaha dagang/jasa umum — jangan dicampur, keduanya punya rumus dan aturan sendiri-sendiri.

---

## 0. Kenapa File Ini Terpisah dari UMKM

**Pekerjaan bebas TIDAK BOLEH pakai PPh Final 0,5%** sejak PP 20/2026. Kalau Tira mencampur logika UMKM dan freelancer, risiko paling umum: user freelancer (programmer, desainer, konsultan, content creator) dikasih hitungan pakai formula PPh Final 0,5% padahal seharusnya pakai NPPN + tarif progresif — selisihnya bisa puluhan juta rupiah (lihat contoh di Section 4).

**Aturan wajib untuk Tira:** begitu user menyebut kata kunci berikut, langsung alihkan ke logika file ini, BUKAN logika UMKM:
- freelance, freelancer, pekerja lepas, remote worker
- programmer, developer, IT consultant, desainer grafis, penulis lepas
- content creator, YouTuber, influencer, musisi
- dokter, pengacara, notaris, akuntan, arsitek (praktik mandiri)
- klien di luar negeri / dibayar dalam mata uang asing
- honorarium, fee, komisi (bukan "omzet usaha")

---

## 1. Siapa yang Masuk Kategori "Pekerjaan Bebas"

Bukan "usaha dagang/jasa umum" (itu domain UMKM), tapi profesi berbasis keahlian individual, dijalankan mandiri, dibayar dalam bentuk fee/honorarium/komisi. Termasuk:
- Jasa profesional bersertifikat: dokter, pengacara, notaris, akuntan, arsitek, konsultan
- **Jasa teknis/IT: programmer, web developer, IT consultant, desainer grafis**
- Profesi seni & media: content creator (YouTuber/TikToker/blogger), musisi, penulis
- Perantara berbasis komisi/fee

**Dasar hukum pengecualian dari PPh Final UMKM:** PP Nomor 20 Tahun 2026, Pasal 57 — pekerjaan bebas secara eksplisit dikecualikan dari skema PPh Final 0,5%, wajib pakai tarif normal.

---

## 2. Skema Perhitungan Pajak untuk Pekerjaan Bebas — 2 Opsi

### Opsi A: Norma Penghitungan Penghasilan Neto (NPPN) — paling umum dipakai freelancer

Gak perlu pembukuan lengkap, cukup pencatatan omzet & biaya sederhana.

**Syarat pakai NPPN:**
- Omzet/peredaran bruto setahun < Rp4,8 miliar
- **Wajib lapor pemberitahuan pemakaian NPPN ke KPP dalam 3 bulan pertama tahun pajak.** Kalau tidak lapor, otomatis dianggap wajib pembukuan lengkap.

**Formula:**
```
Penghasilan Neto = Persentase Norma × Omzet Bruto Setahun
Penghasilan Kena Pajak (PKP) = Penghasilan Neto − PTKP
PPh Terutang = Tarif Progresif Pasal 17 × PKP
```

**Persentase norma untuk profesi terkait teknologi (berdasarkan PER-17/PJ/2015, berlaku sama di semua wilayah):**

| Profesi | Kode KLU/Norma | Persentase Norma |
|---|---|---|
| **Programmer / pengembang web / Kegiatan Pemrograman Komputer** | KLU 62010, Norma 1151 | **50%** |
| Desainer grafis / jasa perancangan khusus | KLU 74100, Norma 1233 | 32% (10 kota besar) / 31% (ibukota provinsi lain) / 29% (daerah lain) |
| Konsultan (umum) | bervariasi per jenis | cek lampiran PER-17/PJ/2015 lengkap — Tira tidak boleh menebak angka untuk profesi yang tidak eksplisit ada di tabel ini |

**Kalau profesi user tidak ada di tabel di atas:** jangan menebak persentase norma. Katakan bahwa daftar lengkap ada 1435 jenis pekerjaan di lampiran PER-17/PJ/2015 dan sarankan user cek langsung ke KPP/konsultan pajak untuk kode KLU yang tepat.

### Opsi B: Pembukuan Lengkap

Penghasilan Neto = Omzet − Biaya riil (sesuai laporan laba rugi). Wajib kalau tidak mendaftar NPPN atau omzet ≥ Rp4,8 miliar. **Ini di luar scope kalkulasi simpel Tira** — arahkan ke akuntan/konsultan pajak.

---

## 3. PTKP dan Tarif Progresif (Dasar Perhitungan Setelah Penghasilan Neto)

### PTKP (Penghasilan Tidak Kena Pajak) — Pengurang Sebelum Kena Tarif

| Status | PTKP/Tahun |
|---|---|
| TK/0 (lajang, tanpa tanggungan) | Rp54.000.000 |
| TK/1 | Rp58.500.000 |
| TK/2 | Rp63.000.000 |
| TK/3 | Rp67.500.000 |
| K/0 (kawin, tanpa tanggungan) | Rp58.500.000 |
| K/1 | Rp63.000.000 |
| K/2 | Rp67.500.000 |
| K/3 (maksimal 3 tanggungan dihitung) | Rp72.000.000 |

*Basis: PMK 101/PMK.010/2016, masih berlaku hingga 2026. Maksimal 3 tanggungan dihitung untuk PTKP meski tanggungan riil lebih banyak.*

### Tarif Progresif PPh Pasal 17 (untuk PKP setelah dikurangi PTKP)

| Lapisan PKP | Tarif |
|---|---|
| Rp0 – Rp60.000.000 | 5% |
| > Rp60.000.000 – Rp250.000.000 | 15% |
| > Rp250.000.000 – Rp500.000.000 | 25% |
| > Rp500.000.000 – Rp5.000.000.000 | 30% |
| > Rp5.000.000.000 | 35% |

*Dasar hukum: Pasal 17 ayat (1) huruf a UU PPh sebagaimana diubah UU HPP No. 7/2021. Berlaku sejak tahun pajak 2022. Tarif ini progresif berlapis — setiap lapisan dihitung terpisah, bukan flat rate atas keseluruhan PKP.*

---

## 4. Contoh Perhitungan Lengkap — Freelancer Programmer dengan Klien Asing

Omzet setahun Rp598.089.580 (dari ¥5.437.178 × Rp110), status TK/0 (lajang tanpa tanggungan):

```
1. Penghasilan Neto (NPPN 50%) = 50% × Rp598.089.580 = Rp299.044.790
2. PKP = Rp299.044.790 − Rp54.000.000 (PTKP TK/0) = Rp245.044.790
3. PPh Terutang (progresif):
   Lapisan 1: 5% × Rp60.000.000            = Rp3.000.000
   Lapisan 2: 15% × (Rp245.044.790 − Rp60.000.000)
            = 15% × Rp185.044.790           = Rp27.756.719
   ─────────────────────────────────────────────────────
   Total PPh Terutang                       = Rp30.756.719
```

**Perbandingan kalau salah pakai formula PPh Final UMKM 0,5%:**
```
(Rp598.089.580 − Rp500.000.000) × 0,5% = Rp490.448
```

**Selisih ≈ Rp30 juta.** Ini bukan detail kecil — ini bukti kenapa freelancer/pekerjaan bebas wajib dipisah logikanya dari UMKM biasa.

---

## 5. Penghasilan dari Luar Negeri — Kredit Pajak Pasal 24 UU PPh

Kalau klien pembayar ada di luar negeri (misal perusahaan Jepang, Amerika, Singapura, dll.) dan WP berstatus **Subjek Pajak Dalam Negeri** (tinggal >183 hari/tahun di Indonesia), penghasilan luar negeri **tetap masuk objek pajak Indonesia** (prinsip worldwide income). Kalau sudah dipotong pajak di negara asal, ada mekanisme kredit supaya tidak kena pajak dua kali.

**Cara kerja kredit pajak luar negeri (Pasal 24):**
```
Batas Maksimum Kredit = (Penghasilan LN / Total PKP) × Total PPh Terutang
Kredit yang bisa diklaim = nilai TERENDAH antara:
  (a) Batas Maksimum Kredit di atas, atau
  (b) Pajak riil yang sudah dipotong/dibayar di luar negeri
```

Sisa pajak luar negeri yang melebihi batas kredit **hangus** — tidak bisa direstitusi, dibiayakan, atau digeser ke tahun berikutnya.

**Catatan untuk Tira:**
- Bisa jelaskan mekanisme dan hitung batas maksimum kredit KALAU user kasih tahu berapa pajak yang sudah dipotong di negara asal.
- Kalau user belum tahu apakah kliennya memotong pajak (withholding tax) atau tidak, arahkan untuk cek kontrak/invoice.
- Indonesia punya tax treaty (P3B — Persetujuan Penghindaran Pajak Berganda) dengan banyak negara termasuk Jepang, yang bisa mempengaruhi tarif potongan di negara asal. Detail treaty spesifik per negara **di luar scope Tira** — arahkan ke konsultan pajak untuk baca P3B yang relevan.

---

## 6. Status WP Asing vs Dalam Negeri (Penting untuk Cek Awal)

Sebelum menghitung apapun untuk kasus freelancer dengan klien asing, klarifikasi status WP:

- **Subjek Pajak Dalam Negeri (SPDN):** tinggal di Indonesia >183 hari dalam 12 bulan, atau berniat menetap di Indonesia → kena pajak atas worldwide income (termasuk penghasilan dari klien asing), dapat PTKP.
- **Subjek Pajak Luar Negeri (SPLN):** tidak memenuhi kriteria di atas → skema beda, biasanya kena tarif final 20% dari bruto atau sesuai tax treaty, TIDAK dapat PTKP. Ini di luar scope kalkulasi standar Tira — arahkan ke konsultan pajak.

**Default asumsi Tira:** kalau user tidak menyebutkan status ini dan tinggal di Indonesia sebagai kegiatan utama, asumsikan SPDN — tapi selalu tanyakan/klarifikasi kalau ada indikasi user sering di luar negeri atau baru pindah ke Indonesia.

---

## 7. Red Flag — Kapan Tira HARUS Redirect ke Konsultan, Bukan Hitung Sendiri

- User tidak yakin statusnya "usaha" vs "pekerjaan bebas" dan nominalnya besar (>Rp500jt) → klasifikasi salah = selisih pajak besar (lihat Section 4)
- Profesi user tidak ada di tabel norma yang dimiliki Tira — jangan menebak persentase
- Ada penghasilan luar negeri dengan pajak sudah dipotong di negara asal dan user tidak tahu detail treaty (P3B)
- Status SPDN vs SPLN tidak jelas (user sering pindah negara, baru pindah ke Indonesia, dll.)
- Omzet gabungan keluarga/multi-entitas mendekati atau melebihi Rp4,8 miliar
- Kombinasi lebih dari satu jenis pekerjaan/usaha dengan norma berbeda-beda
- Kasus yang menyinggung indikasi sengaja tidak lapor (Pasal 39 UU KUP) — ini ranah pidana, bukan edukasi pajak

---

## 8. Sumber Referensi Utama

- PP Nomor 20 Tahun 2026 — Pasal 57, pengecualian pekerjaan bebas dari PPh Final UMKM
- Peraturan Dirjen Pajak Nomor PER-17/PJ/2015 — Norma Penghitungan Penghasilan Neto (NPPN), termasuk lampiran 1435 jenis pekerjaan dengan kode KLU
- Pasal 14, Pasal 17, Pasal 24 UU Nomor 36 Tahun 2008 tentang Pajak Penghasilan sebagaimana diubah UU HPP No. 7/2021
- PMK Nomor 101/PMK.010/2016 — besaran PTKP (masih berlaku)
- Portal resmi: pajak.go.id, coretaxdjp.pajak.go.id
- Kring Pajak: **1500200**

---

## 9. Maintenance Note untuk Aji

File ini butuh review berkala terutama untuk:
- Perubahan besaran PTKP (belum berubah sejak 2016, tapi ada dorongan revisi — cek tiap awal tahun pajak)
- Update lampiran norma NPPN kalau ada revisi PER-17/PJ/2015 atau penggantinya
- Perubahan skema Pasal 24 kredit pajak luar negeri atau update tax treaty (P3B) Indonesia dengan negara mitra dagang utama (Jepang, Singapura, AS, dll.)

**Kalau ada laporan dari test user bahwa Tira masih mencampur logika UMKM dan freelancer** (misal kasih PPh Final 0,5% ke freelancer), cek dulu apakah system prompt Tira benar-benar mengarahkan ke file ini duluan begitu keyword freelancer/pekerjaan bebas terdeteksi — ini kemungkinan besar penyebab utama kalau masih terjadi salah klasifikasi.