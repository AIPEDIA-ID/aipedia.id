export interface Assistant {
  id: string;
  name: string;
  role: string;
  themeColor: string;
  gender: "Male" | "Female";
  image: string;
  description: string;
  examplePrompt: string;
  category: "marketing" | "business";
  price: string;
  link?: string;
  conversationStarters: string[];
}

export interface AssistantCategory {
  name: string;
  color: string;
  description: string;
}

export const assistantCategories: Record<"marketing" | "business", AssistantCategory> = {
  marketing: {
    name: "Marketing & Growth",
    color: "#0071e3",
    description: "Ads, copywriting, konten sosial media, SEO, dan konversi penjualan.",
  },
  business: {
    name: "Business & Finance",
    color: "#f59e0b",
    description: "Pajak, cashflow, SOP operasional, strategi bisnis, dan CS.",
  },
};

export const assistants: Assistant[] = [
  {
    id: "mita",
    name: "Mita",
    role: "Meta Ads & Funnel Specialist",
    themeColor: "#0164e0",
    gender: "Female",
    image: "/character/mita.png",
    description: "Evaluasi funnel (Ads -> Landing Page -> Offer) dan optimasi Meta Ads untuk konversi maksimal.",
    examplePrompt: "Kenapa CTR iklanku tinggi tapi konversi rendah? Bantu evaluasi offer-nya.",
    category: "marketing",
    price: "86k",
    link: "https://chatgpt.com/g/g-6888d99930a081918b80e7ae73122e89-mita-meta-ads-indonesian-market",
    conversationStarters: [
      "CTR iklan saya bagus tapi sales sepi, apa yang salah di funnel saya?",
      "Bantu evaluasi angle creative dan penawaran (offer) untuk produk skincare.",
      "Buatkan struktur campaign Meta Ads lengkap dengan budget dan targeting.",
    ],
  },
  {
    id: "teja",
    name: "Teja",
    role: "Pajak UMKM Specialist",
    themeColor: "#e53935",
    gender: "Female",
    image: "/character/teja.png",
    description: "Bantu paham kewajiban pajak UMKM, PPh Final 0.5%, panduan Coretax, dan simulasi denda.",
    examplePrompt: "Jelaskan cara hitung PPh Final 0.5% untuk usaha katering dengan omzet 300 juta/tahun.",
    category: "business",
    price: "86k",
    link: "https://chatgpt.com/g/g-6a6a80018d288191bfbf0c84ff6573ab-tira-pajak-umkm-specialist",
    conversationStarters: [
      "Bantu saya menghitung PPh Final 0.5% untuk UMKM bulan ini.",
      "Apa saja syarat dan cara lapor pajak tahunan untuk badan usaha CV?",
      "Jelaskan alur Coretax DJP terbaru yang perlu diketahui pengusaha online.",
    ],
  },
  {
    id: "wita",
    name: "Wita",
    role: "Copywriting & Content Specialist",
    themeColor: "#8a6ef0",
    gender: "Female",
    image: "/character/wita.png",
    description: "Copywriting convert untuk landing page, headline sales, dan angle short-form ads.",
    examplePrompt: "Tulis 5 varian hero landing page dan 3 angle short-form ads.",
    category: "marketing",
    price: "86k",
    link: "https://chatgpt.com/g/g-6999c3c0487c8191aee990eac5c3c1a1-wita-copywriting-content",
    conversationStarters: [
      "Tulis 3 variasi headline landing page untuk kelas online marketing.",
      "Bantu saya menulis copy email promosi diskon akhir tahun.",
      "Buatkan copy iklan Meta Ads yang fokus pada pain point pelanggan.",
    ],
  },
  {
    id: "gita",
    name: "Gita",
    role: "Visual Ads & Design Specialist",
    themeColor: "#29b6f6",
    gender: "Female",
    image: "/character/gita.png",
    description: "Bikin konsep visual iklan dan design brief untuk Meta Ads, TikTok, dan banner promosi.",
    examplePrompt: "Buat konsep visual ads untuk promo diskon akhir tahun produk skincare.",
    category: "marketing",
    price: "86k",
    link: "https://chatgpt.com/g/g-6a6bceec7c5481918dd5a7e4d5304e73-gita-visual-ads-design-specialist",
    conversationStarters: [
      "Buatkan konsep visual ads yang menarik untuk promo hari kemerdekaan.",
      "Bantu saya menulis design brief untuk banner website promo Ramadhan.",
      "Ide visual kreatif apa yang cocok untuk iklan TikTok produk makanan?",
    ],
  },
  {
    id: "wilo",
    name: "Wilo",
    role: "Website Specialist",
    themeColor: "#00c875",
    gender: "Male",
    image: "/character/wilo.png",
    description: "Bantu rancang struktur landing page dan website bisnis tanpa perlu skill teknis rumit.",
    examplePrompt: "Rancang struktur halaman landing page untuk jasa katering, lengkap dengan section dan copy placeholder.",
    category: "business",
    price: "86k",
    conversationStarters: [
      "Bantu saya merancang struktur landing page untuk jasa desain interior.",
      "Apa saja section yang wajib ada di halaman 'About Us' perusahaan?",
      "Buatkan struktur website e-commerce yang SEO-friendly.",
    ],
  },
  {
    id: "fina",
    name: "Fina",
    role: "Finance Specialist",
    themeColor: "#f59e0b",
    gender: "Female",
    image: "/character/fina.png",
    description: "Analisis keuangan, cash flow forecast 3 bulan, dan break-even point bisnis.",
    examplePrompt: "Buat cash flow forecast 3 bulan dan break-even analysis untuk café.",
    category: "business",
    price: "86k",
    link: "https://chatgpt.com/g/g-689263c606388191ac66964263d1c40b-fina-financial-analysis-planning",
    conversationStarters: [
      "Buatkan saya template cash flow forecast untuk 3 bulan ke depan.",
      "Bantu hitung break-even point (BEP) untuk bisnis kopi susu.",
      "Apa metrik keuangan utama yang perlu saya pantau bulan ini?",
    ],
  },
  {
    id: "wanda",
    name: "Wanda",
    role: "WhatsApp Business Specialist",
    themeColor: "#00acc1",
    gender: "Female",
    image: "/character/wanda.png",
    description: "Rancang broadcast, katalog, dan auto-reply WhatsApp Business biar closing lebih cepat.",
    examplePrompt: "Buat template broadcast promo baru dan alur auto-reply untuk FAQ pelanggan.",
    category: "marketing",
    price: "86k",
    link: "https://chatgpt.com/g/g-6a6bcfbb6cc4819191634c06d46793cd-wanda-wa-business-specialist",
    conversationStarters: [
      "Buatkan template broadcast WhatsApp untuk menyapa pelanggan lama.",
      "Bantu merancang alur auto-reply WhatsApp Business untuk pertanyaan FAQ.",
      "Bagaimana cara membuat katalog WhatsApp yang menarik pembeli?",
    ],
  },
  {
    id: "sona",
    name: "Sona",
    role: "Social Media Specialist",
    themeColor: "#e91e63",
    gender: "Female",
    image: "/character/sona.png",
    description: "Ide konten, hook pembuka, script reels/TikTok, dan kalender konten bulanan.",
    examplePrompt: "Rancang kalender konten Instagram 30 hari untuk brand fashion lokal.",
    category: "marketing",
    price: "86k",
    link: "https://chatgpt.com/g/g-6999c156aa988191909c4dde3cf59e0c-sola-social-media-content",
    conversationStarters: [
      "Buatkan ide konten Instagram Reels selama seminggu untuk klinik kecantikan.",
      "Tuliskan hook dan CTA yang menarik untuk postingan TikTok tentang promo sepatu.",
      "Bantu saya merancang kalender konten sosial media bulan depan.",
    ],
  },
  {
    id: "loka",
    name: "Loka",
    role: "E-Commerce & Marketplace Specialist",
    themeColor: "#7cb342",
    gender: "Male",
    image: "/character/loka.png",
    description: "Optimasi listing produk di Shopee, Tokopedia, dan TikTok Shop biar produk ranking atas.",
    examplePrompt: "Optimasi judul dan deskripsi produk tas kulit untuk marketplace Shopee.",
    category: "marketing",
    price: "86k",
    link: "https://chatgpt.com/g/g-6a6bd05c67d88191a8b549c2d381438a-loka-e-commerce-marketplace-specialist",
    conversationStarters: [
      "Bantu optimasi judul dan deskripsi produk agar mudah dicari di Shopee.",
      "Strategi apa yang efektif untuk ikut campaign tanggal kembar di Tokopedia?",
      "Bagaimana cara meningkatkan conversion rate toko di TikTok Shop?",
    ],
  },
  {
    id: "dany",
    name: "Dany",
    role: "Data Analyst Specialist",
    themeColor: "#ff4b00",
    gender: "Male",
    image: "/character/dany.png",
    description: "Analisis data dengan insight actionable untuk keputusan bisnis cepat dan akurat.",
    examplePrompt: "Analisis CSV cohort retention dan temukan churn drivers utama.",
    category: "business",
    price: "86k",
    link: "https://chatgpt.com/g/g-689d1f5fb8c08191904746d2946135bd-dany-data-analysis",
    conversationStarters: [
      "Bantu saya menganalisis data cohort retention ini dan temukan insight-nya.",
      "Apa faktor utama penyebab churn rate yang tinggi bulan lalu?",
      "Bagaimana cara mengukur LTV (Life Time Value) pelanggan yang benar?",
    ],
  },
  {
    id: "beny",
    name: "Beny",
    role: "Business Strategist",
    themeColor: "#f97300",
    gender: "Male",
    image: "/character/beny.png",
    description: "Mapping ide bisnis ke Business Model Canvas lengkap dengan analisis risiko dan strategi channel.",
    examplePrompt: "Map ide skincare DTC ke Business Model Canvas dengan risiko dan strategi channel.",
    category: "business",
    price: "86k",
    link: "https://chatgpt.com/g/g-695509ece64c8191b7c4630d0e283bb7-beny-business-strategy-planning",
    conversationStarters: [
      "Bantu saya membuat Business Model Canvas untuk ide bisnis baru.",
      "Bagaimana cara memetakan risiko untuk peluncuran produk SaaS?",
      "Saran strategi channel distribusi untuk brand clothing lokal?",
    ],
  },
  {
    id: "selo",
    name: "Selo",
    role: "SEO Specialist",
    themeColor: "#20a944",
    gender: "Male",
    image: "/character/selo.png",
    description: "Strategi SEO menyeluruh dengan topical mapping, riset keyword, dan arsitektur internal linking.",
    examplePrompt: "Buat topical map dan internal linking blog niche travel.",
    category: "marketing",
    price: "86k",
    link: "https://chatgpt.com/g/g-689d22285c28819182cfc3781536d11f-selo-seo",
    conversationStarters: [
      "Buatkan topical map untuk blog bertema investasi saham pemula.",
      "Bantu rancang strategi internal linking untuk artikel-artikel SEO saya.",
      "Apa saja keyword potensial dengan search volume tinggi dan kompetisi rendah?",
    ],
  },
  {
    id: "hima",
    name: "Hima",
    role: "Local SEO Specialist",
    themeColor: "#163b92",
    gender: "Female",
    image: "/character/hima.png",
    description: "Optimasi Google Profil Bisnis (Google Maps) agar bisnis lokalmu tampil nomor 1 di pencarian terdekat.",
    examplePrompt: "Buat strategi optimasi Google Maps untuk klinik gigi agar masuk 3 besar di Jakarta Selatan.",
    category: "marketing",
    price: "86k",
    link: "https://chatgpt.com/g/g-687e2b9983b48191ae9ce8f5703389ff-hima-human-resources",
    conversationStarters: [
      "Bagaimana cara agar toko saya muncul nomor 1 di pencarian Google Maps terdekat?",
      "Bantu optimasi profil Google My Business untuk bisnis coffee shop.",
      "Apa saja strategi mendapatkan review positif di Google Maps secara organik?",
    ],
  },
  {
    id: "cisa",
    name: "Cisa",
    role: "Customer Relationship Specialist",
    themeColor: "#ff003e",
    gender: "Female",
    image: "/character/cisa.png",
    description: "Sistem customer support dengan macro response, penanganan komplain, dan escalation rules.",
    examplePrompt: "Rancang CS macro untuk inquiry Tier-1 dan escalation refund.",
    category: "business",
    price: "86k",
    link: "https://chatgpt.com/g/g-689f08f7eba481919b0b715c7e655135-cisa-customer-support-relations",
    conversationStarters: [
      "Bantu saya merancang macro response untuk keluhan pengiriman telat.",
      "Buatkan aturan eskalasi refund untuk tim customer service.",
      "Bagaimana cara merespons review negatif pelanggan dengan santun dan solutif?",
    ],
  },
  {
    id: "viko",
    name: "Viko",
    role: "Video Script Writer Specialist",
    themeColor: "#eb4ec3",
    gender: "Male",
    image: "/character/viko.png",
    description: "Naskah video engaging untuk iklan TikTok, Reels, YouTube Shorts, dan UGC kreator.",
    examplePrompt: "Outline script UGC 60 detik dengan hooks dan CTA produk herbal.",
    category: "marketing",
    price: "86k",
    link: "https://chatgpt.com/g/g-6999c34d49688191b9c18d2ec06c34dc-viko-video-script-writing",
    conversationStarters: [
      "Buatkan outline script video UGC berdurasi 60 detik untuk produk skincare.",
      "Tuliskan naskah video YouTube Shorts tentang tips produktivitas kerja.",
      "Bantu buat script iklan Meta Ads dengan format hook-story-offer.",
    ],
  },
  {
    id: "lila",
    name: "Lila",
    role: "Live Selling Specialist",
    themeColor: "#8e24aa",
    gender: "Female",
    image: "/character/lila.png",
    description: "Susun script host dan flow live streaming interaktif untuk TikTok Live dan Shopee Live.",
    examplePrompt: "Buat script live selling 30 menit untuk jualan produk fashion muslim.",
    category: "marketing",
    price: "86k",
    link: "https://chatgpt.com/g/g-6a6bd0e5b3688191a980aa67eb1dcdbd-lila-live-selling-specialist",
    conversationStarters: [
      "Buatkan script live selling berdurasi 1 jam untuk jualan baju anak.",
      "Bantu saya menyusun flow interaksi host agar penonton tidak bosan saat live.",
      "Apa saja taktik FOMO yang bisa digunakan saat sesi flash sale di live streaming?",
    ],
  },
  {
    id: "prima",
    name: "Prima",
    role: "Operations & SOP Specialist",
    themeColor: "#bb6653",
    gender: "Female",
    image: "/character/prima.png",
    description: "Susun SOP operasional dan workflow harian agar operasional bisnis jalan konsisten tanpa owner pantau terus.",
    examplePrompt: "Buat SOP alur pesanan online dari order masuk sampai pengiriman untuk bisnis F&B.",
    category: "business",
    price: "86k",
    link: "https://chatgpt.com/g/g-6999c498a318819194060ad31ca7b0d5-prima-prompt-engineering",
    conversationStarters: [
      "Buatkan SOP standar untuk alur penerimaan pesanan di restoran.",
      "Bantu saya menyusun workflow harian yang efisien untuk admin gudang.",
      "Bagaimana cara membuat SOP yang mudah dipahami oleh karyawan baru?",
    ],
  },
];

export function getAssistant(id: string): Assistant | undefined {
  return assistants.find((a) => a.id === id);
}

export function getAssistantsByCategory(category: "marketing" | "business"): Assistant[] {
  return assistants.filter((a) => a.category === category);
}
