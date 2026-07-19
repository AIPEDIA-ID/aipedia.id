# Single Campaign Style Guide & Rules

Panduan ini mengatur standarisasi UI/UX dan estetika (*Style Guide*) untuk halaman *Single Campaign* atau *Landing Page* individual produk (contoh: `tira.astro`, `mita.astro`). Semua pengembangan halaman campaign wajib mengikuti sistem desain ini agar terlihat konsisten, modern, dan **premium**.

## 1. Typography & Headlines
- **Gradient Text:** Jangan gunakan warna solid biasa untuk *headline* utama. Gunakan efek gradient yang di-clip ke text.
  - *Contoh Class:* `bg-gradient-to-r from-[color]-500 to-[color]-400 bg-clip-text text-transparent`.
  - Sesuaikan warna `from` dan `to` berdasarkan identitas (tema) AI Specialist yang bersangkutan (misal: merah/orange untuk TIRA, biru untuk MITA).
- Gunakan hierarki teks yang proporsional. Hindari teks berukuran raksasa yang tidak rapi; selalu tambahkan *responsive sizing* (contoh: `text-3xl md:text-4xl`).

## 2. Glassmorphism & Card Styles
- Halaman campaign mengusung gaya *glassmorphism* (kaca tembus pandang).
- **Background Cards:** Gunakan `bg-white/60 dark:bg-white/5 backdrop-blur-sm`.
- **Borders:** Tambahkan border tipis dengan warna yang sangat transparan (`border border-white/10` atau `border-[color]-900/30` di dark mode) agar elemen menyatu dengan *background gradient*.
- Jangan gunakan *box shadow* yang tebal dan solid; gunakan `shadow-sm` atau *glowing border* yang halus.

## 3. Interactive Elements & Micro-Animations
- Semua elemen interaktif harus memiliki *affordance* yang premium. Hindari transisi mendadak.
- **Transisi Dasar:** Selalu sematkan `transition-all duration-300` atau `transition-opacity`.
- **Hover States:** 
  - Pada *link* teks: Tambahkan `hover:translate-x-1` untuk efek geser halus, alih-alih sekadar ganti warna atau garis bawah.
  - Pada *button* atau *summary*: Gunakan `hover:opacity-80` atau penggelapan *background*.
- **Accordion:** Gunakan tag HTML natif `<details>` dan `<summary>`. Tambahkan panah interaktif yang memutar saat terbuka (`group-open/accordion:rotate-90 transition-transform`).

## 4. Layouting & Proportions
- **Grid System (Lebih Baik dari Flex 50:50):** Jika perlu membuat layout *side-by-side* (contoh: Teks di kiri, Screenshot di kanan), jangan otomatis membagi 50:50 jika teksnya sedikit. Gunakan **Grid Cols 10** (`grid-cols-10`) untuk proporsi kustom yang lebih rapi (misalnya 30:70 dengan `col-span-3` dan `col-span-7`).
- Jaga agar *wrapper* tidak terlalu melebar (`max-w-5xl` atau `max-w-6xl`) sehingga konten tetap *compact* di desktop.
- Kurangi *padding* internal yang berlebihan (`p-6` -> `p-4` atau `px-5 py-4`) jika elemen terasa memakan terlalu banyak ruang (*bulky*).

## 5. Media & Screenshots
- Gambar *screenshot* produk harus dipaksa masuk ke dalam proporsi rasio yang rapi agar tidak mengganggu layout keseluruhan.
- **Aspect Ratio:** Selalu gunakan `aspect-[4/3]`, `aspect-video`, atau rasio absolut dengan `object-contain`.
- Bungkus *image* dengan *wrapper* bergaya *glassmorphism* kecil agar tidak menempel langsung ke background utama.
