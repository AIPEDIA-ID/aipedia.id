export interface NewsArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: "Updates" | "Tips" | "Studi Kasus";
  badge?: string;
  date: string;
  readTime: string;
  thumbnail: string;
  author: {
    name: string;
    role: string;
  };
  content: string;
}

export const newsArticles: NewsArticle[] = [
  {
    slug: "chatgpt-canvas-sop-bisnis-umkm",
    title: "Cara Memanfaatkan ChatGPT Canvas untuk Menyusun SOP Usaha dalam 15 Menit",
    excerpt: "Fitur Canvas di ChatGPT memudahkan pembuatan dokumen panjang seperti SOP toko, kontrak kerja, dan alur operasional tanpa harus bolak-balik copy-paste.",
    category: "Tips",
    date: "22 Oktober 2026",
    readTime: "4 menit baca",
    thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Tim Riset AIPEDIA",
      role: "AI Workflow Specialist",
    },
    content: `
      <p class="lead">Banyak pemilik usaha kecil dan menengah (UMKM) kesulitan mendokumentasikan SOP (Standar Operasional Prosedur) karena merasa prosesnya memakan waktu berminggu-minggu. Dengan hadirnya mode <strong>ChatGPT Canvas</strong>, Anda kini bisa membuat dan merevisi draf dokumen panjang secara visual dan bertahap.</p>

      <h2>Apa itu Mode Canvas dan Mengapa Cocok untuk Dokumen Bisnis?</h2>
      <p>Tidak seperti antarmuka chat standar yang bersifat linier dari atas ke bawah, Canvas membuka panel kerja terpisah di sisi kanan layar. Di panel ini, teks bisa diedit langsung per paragraf, disorot untuk diperbaiki tone bahasanya, atau diperluas poin-poinnya tanpa mengganggu prompt awal.</p>

      <div class="block-gold my-6">
        <h4 class="font-bold text-sm mb-1 text-[var(--color-gold-text)]">💡 Prompt Praktis untuk Mulai:</h4>
        <code class="text-xs font-mono block bg-white/80 p-3 rounded border border-[var(--color-gold-border)] mt-2">
          "Buka Canvas dan buatkan draf SOP Pelayanan Pelanggan WhatsApp untuk toko fashion online. Sertakan: 1) Salam pembuka sesuai jam, 2) Alur pengecekan stok, 3) Penanganan retur barang rusak, 4) Format konfirmasi transfer bank."
        </code>
      </div>

      <h2>3 Langkah Cepat Eksekusi SOP</h2>
      <ol class="space-y-3 pl-5 list-decimal my-4">
        <li><strong>Spesifikasikan Peran:</strong> Awali prompt dengan memberi tahu AI skala bisnis Anda, jenis produk, dan masalah pelanggan yang paling sering muncul.</li>
        <li><strong>Gunakan Tombol 'Adjust Reading Level':</strong> Di Canvas, klik icon slider untuk mengatur agar bahasa yang digunakan mudah dipahami oleh staf baru atau admin toko.</li>
        <li><strong>Ekspor ke PDF / Dokumen:</strong> Setelah selesai, salin hasil akhir langsung ke template Google Docs atau Notion toko Anda.</li>
      </ol>

      <p>Mendokumentasikan operasional toko bukan lagi pekerjaan membosankan. Kuncinya adalah memberikan konteks nyata tentang kebiasaan pelanggan Anda di Indonesia.</p>
    `,
  },
  {
    slug: "midjourney-v6-foto-produk-kuliner",
    title: "Eksperimen Foto Produk Kuliner Realistis Menggunakan Midjourney: Hemat Jutaan Biaya Studio",
    excerpt: "Bagaimana sebuah brand kopi lokal di Bandung berhasil menghemat budget foto katalog bulanan dengan parameter pencahayaan dan depth of field AI.",
    category: "Studi Kasus",
    date: "19 Oktober 2026",
    readTime: "5 menit baca",
    thumbnail: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Rian Hendrawan",
      role: "Visual Creator & Mentor",
    },
    content: `
      <p class="lead">Bagi pebisnis F&B, foto produk adalah penentu apakah calon pembeli akan mengklik menu di GoFood/GrabFood atau melewatinya. Namun menyewa fotografer kuliner, food stylist, dan studio pencahayaan bisa menelan biaya 3 hingga 5 juta rupiah per sesi.</p>

      <h2>Solusi: Parameter Natural Lighting AI</h2>
      <p>Dengan teknik prompt yang tepat, Anda dapat menghasilkan visual minuman dingin dengan tetesan embun realistis, pencahayaan alami jendela (morning soft light), dan tekstur kayu meja yang alami.</p>

      <div class="block-gold my-6">
        <h4 class="font-bold text-sm mb-1 text-[var(--color-gold-text)]">📸 Formula Prompt Parameter Kamera:</h4>
        <code class="text-xs font-mono block bg-white/80 p-3 rounded border border-[var(--color-gold-border)] mt-2">
          iced caramel macchiato in a clear glass, condensation drops on glass, rustic wooden cafe table, soft window morning sunlight, shot on 85mm lens, f/1.8 aperture, photorealistic, commercial advertising photography --v 6.1 --style raw
        </code>
      </div>

      <h2>Hasil dan Dampak Bisnis</h2>
      <p>Berdasarkan pengujian A/B testing pada banner promosi digital, visual yang dihasilkan AI dengan komposisi tepat menghasilkan rasio klik (CTR) 38% lebih tinggi dibanding foto manual yang diambil dengan kamera ponsel tanpa pencahayaan teratur.</p>
    `,
  },
  {
    slug: "whatsapp-closing-handling-kemahalan",
    title: "Mengatasi Keberatan 'Harganya Kemahalan ya Sis': 3 Skrip AI untuk Admin WhatsApp",
    excerpt: "Jangan langsung kasih diskon ketika pelanggan mengeluh harga. Gunakan skrip psikologi nilai tambah ini agar margin profit Anda tetap aman.",
    category: "Updates",
    date: "15 Oktober 2026",
    readTime: "3 menit baca",
    thumbnail: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Sarah Amalia",
      role: "E-Commerce Strategy Lead",
    },
    content: `
      <p class="lead">Keberatan harga adalah penolakan paling umum dalam penjualan online via chat WhatsApp di Indonesia. Reaksi spontan banyak admin toko adalah langsung memotong harga atau menawarkan gratis ongkir yang memakan laba bersih.</p>

      <h2>Prinsip: Geser Pembicaraan dari Biaya ke Manfaat Jangka Panjang</h2>
      <p>Pelanggan yang bilang kemahalan biasanya bukan tidak punya uang, melainkan belum melihat mengapa harga tersebut sepadan dengan nilai yang mereka dapatkan.</p>

      <div class="block-gold my-6">
        <h4 class="font-bold text-sm mb-1 text-[var(--color-gold-text)]">💬 Skrip 1: Komparasi Biaya Harian</h4>
        <p class="text-sm italic text-gray-700 bg-white/80 p-3 rounded border border-[var(--color-gold-border)] mt-2">
          "Paham banget Kak! Kalau dilihat di awal memang terasa besar, tapi sebenarnya produk ini tahan 6 bulan Kak, jadi per harinya cuma sekitar Rp1.500 aja-lebih hemat dari sebutir permen untuk kulit yang lebih sehat dan bebas kusam."
        </p>
      </div>

      <div class="block-gold my-6">
        <h4 class="font-bold text-sm mb-1 text-[var(--color-gold-text)]">💬 Skrip 2: Garansi dan Ketenangan Hati</h4>
        <p class="text-sm italic text-gray-700 bg-white/80 p-3 rounded border border-[var(--color-gold-border)] mt-2">
          "Betul Kak, di luar sana mungkin ada yang lebih murah. Tapi di kami ada garansi ganti baru 100% jika barang sampai dalam kondisi cacat tanpa ribet, plus panduan pemakaian langsung didampingi tim kami sampai berhasil."
        </p>
      </div>

      <p>Simpan skrip ini di fitur Quick Reply WhatsApp Business admin Anda untuk merespons dengan cepat dan ramah.</p>
    `,
  },
];
