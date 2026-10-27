import type { Resource } from "../data/types";

export const resources: Resource[] = [
  {
    id: "llm-prompt/chatgpt-pemasaran-umkm",
    title: "Prompt ChatGPT untuk Pemasaran UMKM",
    description:
      "Kumpulan prompt siap pakai untuk membuat konten pemasaran, caption media sosial, dan ide promosi dengan ChatGPT.",
    category: "llm-prompt",
    access_level: "free",
    teaser:
      "Mulai buat caption menarik dan ide konten promosi hanya dengan menyalin prompt ini ke ChatGPT.",
    tools: ["ChatGPT", "Google Gemini"],
    topics: ["pemasaran", "media-sosial", "umkm"],
    thumbnail: "https://images.pexels.com/photos/5361088/pexels-photo-5361088.jpeg?auto=compress&cs=tinysrgb&h=300&w=400",
    prompt_preview:
      "You are a marketing expert for a small Indonesian business. Create 5 engaging Instagram captions for a product called [PRODUCT NAME]. Use a friendly tone, include relevant hashtags, and add a clear call-to-action.",
  },
  {
    id: "llm-prompt/email-penjualan-otomatis",
    title: "Prompt Email Penjualan Otomatis",
    description:
      "Prompt untuk menyusun rangkaian email penjualan yang conversing, dari cold email hingga follow-up.",
    category: "llm-prompt",
    access_level: "paid",
    teaser:
      "Susun rangkaian email penjualan lengkap dengan subjek yang menarik dan isi yang membuat calon pembeli ingin membalas.",
    tools: ["ChatGPT", "Claude"],
    topics: ["penjualan", "email", "otomatisasi"],
    thumbnail: "https://images.pexels.com/photos/15635241/pexels-photo-15635241.jpeg?auto=compress&cs=tinysrgb&h=300&w=400",
    prompt_preview:
      "You are a sales copywriter. Write a 5-email sequence for [PRODUCT] targeting [AUDIENCE]. Email 1: introduction and pain point. Email 2: solution overview. Email 3: case study. Email 4: objection handling. Email 5: urgency and call-to-action. Keep each email under 200 words.",
    steps: [
      "Salin prompt di atas ke ChatGPT atau Claude",
      "Ganti [PRODUCT] dengan nama produk Anda dan [AUDIENCE] dengan target pelanggan",
      "Generate rangkaian email pertama, lalu revisi sesuai brand voice Anda",
      "Uji kirim ke 10 calon pelanggan dan catat tingkat balasannya",
    ],
    tips: [
      "Sesuaikan nada email dengan brand Anda sebelum mengirim",
      "Gunakan subjek yang singkat dan menimbulkan rasa penasaran",
      "Kirim follow-up 2-3 hari setelah email pertama, bukan keesokan harinya",
    ],
  },
  {
    id: "visual-prompt/midjourney-banner-promosi",
    title: "Prompt Midjourney untuk Banner Promosi",
    description:
      "Prompt visual untuk membuat banner promosi yang menarik menggunakan Midjourney, lengkap dengan parameter dan gaya.",
    category: "visual-prompt",
    access_level: "paid",
    teaser:
      "Buat banner promosi profesional dengan Midjourney menggunakan prompt yang sudah dioptimalkan untuk berbagai gaya visual.",
    tools: ["Midjourney", "DALL-E"],
    topics: ["desain", "banner", "promosi"],
    thumbnail: "https://images.pexels.com/photos/17774503/pexels-photo-17774503.jpeg?auto=compress&cs=tinysrgb&h=300&w=400",
    prompt_preview:
      "A vibrant promotional banner for an Indonesian food product, clean modern layout, soft natural lighting, appetizing food photography style, white background with subtle gradient, space for text overlay --ar 16:9 --v 6 --style raw",
    steps: [
      "Salin prompt ke Midjourney Discord atau web interface",
      "Sesuaikan nama produk dan gaya visual sesuai kebutuhan",
      "Generate 4 variasi, lalu pilih yang paling sesuai",
      "Tambahkan teks promosi menggunakan Canva atau Figma",
    ],
    tips: [
      "Gunakan parameter --ar 16:9 untuk banner horizontal dan --ar 1:1 untuk Instagram",
      "Tambahkan --style raw untuk hasil yang lebih realistis",
      "Simpan parameter yang menghasilkan gambar terbaik untuk digunakan lagi",
    ],
  },
  {
    id: "custom-ai/assistant-cs-umkm",
    title: "Custom AI Assistant untuk Customer Service UMKM",
    description:
      "Panduan membangun asisten AI khusus untuk menjawab pertanyaan pelanggan UMKM secara otomatis.",
    category: "custom-ai",
    access_level: "paid",
    teaser:
      "Buat asisten AI yang menjawab pertanyaan pelanggan tentang produk, harga, dan pengiriman tanpa perlu coding.",
    tools: ["Custom GPT", "Claude Projects", "OpenAI Assistants"],
    topics: ["customer-service", "otomatisasi", "umkm"],
    thumbnail: "https://images.pexels.com/photos/8439093/pexels-photo-8439093.jpeg?auto=compress&cs=tinysrgb&h=300&w=400",
    prompt_preview:
      "You are a customer service assistant for [BUSINESS NAME], an Indonesian small business selling [PRODUCTS]. Answer customer questions about products, pricing, shipping, and returns. Be polite, concise, and helpful. If you don't know something, direct the customer to contact the owner via WhatsApp.",
    steps: [
      "Kumpulkan 10-20 pertanyaan pelanggan yang sering masuk",
      "Salin prompt di atas dan sesuaikan dengan detail bisnis Anda",
      "Buat Custom GPT di ChatGPT Plus atau gunakan Claude Projects",
      "Uji dengan pertanyaan pelanggan nyata dan perbaiki jawaban yang kurang tepat",
      "Integrasikan ke WhatsApp atau website menggunakan platform seperti Voiceflow atau Botpress",
    ],
    tips: [
      "Selalu sertakan FAQ bisnis Anda di system prompt",
      "Tambahkan instruksi untuk mengarahkan ke manusia jika pertanyaan terlalu kompleks",
      "Perbarui pengetahuan asisten setiap kali ada produk atau harga baru",
    ],
  },
  {
    id: "resource/template-proposal-bisnis",
    title: "Template Proposal Bisnis dengan AI",
    description:
      "Template siap isi untuk membuat proposal bisnis profesional dengan bantuan AI.",
    category: "resource",
    access_level: "free",
    teaser:
      "Unduh template proposal bisnis dan generate isinya dengan AI dalam hitungan menit.",
    tools: ["ChatGPT", "Google Docs"],
    topics: ["proposal", "bisnis", "template"],
    thumbnail: "https://images.pexels.com/photos/7413916/pexels-photo-7413916.jpeg?auto=compress&cs=tinysrgb&h=300&w=400",
    prompt_preview:
      "Generate a professional business proposal for [BUSINESS NAME] targeting [INVESTOR/CLIENT]. Include: executive summary, problem statement, solution, market analysis, revenue model, team, and financial projections. Format in clean markdown.",
  },
  {
    id: "resource/daftar-200-prompt-produktivitas",
    title: "Daftar 200 Prompt Produktivitas Harian",
    description:
      "Kompilasi 200 prompt untuk berbagai tugas harian: email, rapat, ringkasan, brainstorming, dan lainnya.",
    category: "resource",
    access_level: "paid",
    teaser:
      "200 prompt terorganisir per kategori yang siap dipakai untuk menghemat waktu kerja harian Anda.",
    tools: ["ChatGPT", "Claude", "Gemini"],
    topics: ["produktivitas", "prompt", "komunikasi"],
    thumbnail: "https://images.pexels.com/photos/97080/pexels-photo-97080.jpeg?auto=compress&cs=tinysrgb&h=300&w=400",
    body: "Daftar ini mencakup prompt untuk: menulis email, membuat ringkasan rapat, brainstorming ide konten, menyusun jadwal harian, menganalisis data, menulis laporan, membuat presentasi, dan banyak lagi. Setiap prompt dilengkapi dengan contoh input dan output yang diharapkan.",
  },
  {
    id: "tutorial/chatgpt-untuk-pemula",
    title: "Tutorial ChatGPT untuk Pemula",
    description:
      "Panduan langkah demi langkah memulai ChatGPT dari nol, khusus untuk pengguna baru yang belum pernah mencoba AI.",
    category: "tutorial",
    access_level: "free",
    teaser:
      "Belajar menggunakan ChatGPT dari daftar akun hingga menulis prompt pertama Anda dalam 15 menit.",
    tools: ["ChatGPT"],
    topics: ["pemula", "chatgpt", "dasar"],
    thumbnail: "https://images.pexels.com/photos/5934556/pexels-photo-5934556.jpeg?auto=compress&cs=tinysrgb&h=300&w=400",
    body: "Tutorial ini membahas: cara membuat akun ChatGPT, mengenal antarmuka, menulis prompt pertama, memahami batasan AI, dan tips mendapatkan hasil terbaik. Cocok untuk siapa saja yang baru mengenal AI.",
    steps: [
      "Buka chat.openai.com dan buat akun gratis",
      "Ketik prompt sederhana seperti 'Jelaskan apa itu AI dalam 3 kalimat'",
      "Coba variasi prompt dan perhatikan perbedaan hasilnya",
      "Simpan prompt yang menghasilkan jawaban baik untuk digunakan lagi",
    ],
  },
  {
    id: "tutorial/automation-zapier-ai",
    title: "Otomatisasi Tugas dengan Zapier dan AI",
    description:
      "Pelajari cara menghubungkan AI dengan alat kerja sehari-hari menggunakan Zapier untuk otomatisasi yang hemat waktu.",
    category: "tutorial",
    access_level: "paid",
    teaser:
      "Hubungkan AI dengan Gmail, Google Sheets, dan Slack untuk otomatisasi alur kerja tanpa coding.",
    tools: ["Zapier", "OpenAI API", "Google Sheets"],
    topics: ["otomatisasi", "zapier", "produktivitas"],
    thumbnail: "https://images.pexels.com/photos/8849295/pexels-photo-8849295.jpeg?auto=compress&cs=tinysrgb&h=300&w=400",
    body: "Tutorial ini mencakup: membuat akun Zapier, menghubungkan OpenAI API, membuat zap pertama untuk auto-reply email, membuat zap untuk merangkum Slack, dan zap untuk mencatat data ke Google Sheets otomatis.",
    steps: [
      "Buat akun Zapier gratis dan dapatkan OpenAI API key",
      "Buat zap pertama: trigger Gmail + action OpenAI + action Gmail reply",
      "Uji dengan email nyata dan periksa hasil auto-reply",
      "Buat zap kedua untuk merangkum pesan Slack harian",
    ],
    tips: [
      "Mulai dengan zap sederhana sebelum membuat alur kompleks",
      "Gunakan filter untuk membatasi zap hanya pada email tertentu",
      "Monitor penggunaan API untuk mengontrol biaya",
    ],
  },
  {
    id: "founder-space/strategi-go-to-market-ai",
    title: "Strategi Go-to-Market dengan AI untuk Founder",
    description:
      "Rangkaian prompt dan kerangka pikir untuk menyusun strategi go-to-market menggunakan AI sebagai co-pilot.",
    category: "founder-space",
    access_level: "paid",
    teaser:
      "Gunakan AI untuk meneliti pasar, menentukan positioning, dan menyusun rencana peluncuran produk Anda.",
    tools: ["ChatGPT", "Claude", "Perplexity"],
    topics: ["strategi", "go-to-market", "founder"],
    thumbnail: "https://images.pexels.com/photos/7413908/pexels-photo-7413908.jpeg?auto=compress&cs=tinysrgb&h=300&w=400",
    prompt_preview:
      "You are a startup strategist. Help me create a go-to-market plan for [PRODUCT] targeting [MARKET] in Indonesia. Include: market sizing, competitive analysis, positioning statement, pricing strategy, channel strategy, and 90-day launch plan. Be specific to the Indonesian market context.",
    steps: [
      "Isi template prompt dengan detail produk dan target pasar Anda",
      "Generate analisis pasar dan kompetitor terlebih dahulu",
      "Susun positioning statement berdasarkan hasil analisis",
      "Buat rencana 90 hari dengan milestone yang terukur",
      "Validasi rencana dengan mentor atau advisor sebelum eksekusi",
    ],
    tips: [
      "Gunakan Perplexity untuk riset pasar real-time",
      "Bandingkan output dari ChatGPT dan Claude untuk sudut pandang berbeda",
      "Sesuaikan strategi dengan kondisi pasar Indonesia, bukan template global",
    ],
  },
  {
    id: "founder-space/pitch-deck-ai",
    title: "Membuat Pitch Deck dengan AI",
    description:
      "Panduan menyusun pitch deck yang menarik investor menggunakan AI untuk setiap slide.",
    category: "founder-space",
    access_level: "paid",
    teaser:
      "Susun 10 slide pitch deck yang siap ditampilkan ke investor dengan bantuan AI dari awal hingga akhir.",
    tools: ["ChatGPT", "Gamma", "Tome"],
    topics: ["pitch-deck", "investor", "presentasi"],
    thumbnail: "https://images.pexels.com/photos/7413908/pexels-photo-7413908.jpeg?auto=compress&cs=tinysrgb&h=300&w=400",
    prompt_preview:
      "Create a 10-slide pitch deck outline for [STARTUP NAME] seeking [AMOUNT] in seed funding. Slides: Problem, Solution, Market Size, Product, Traction, Business Model, Competition, Team, Financials, Ask. For each slide, provide a headline, 3 key points, and a visual suggestion.",
    steps: [
      "Generate outline pitch deck menggunakan prompt di atas",
      "Isi setiap slide dengan data dan angka riil bisnis Anda",
      "Buat visual menggunakan Gamma atau desain manual di Figma",
      "Latih pitch dengan bantuan AI sebagai simulator investor",
    ],
    tips: [
      "Investor menghabiskan rata-rata 3 menit per pitch deck, buat slide pertama yang kuat",
      "Gunakan angka dan data spesifik, hindari klaim generik",
      "Siapkan versi 5 slide untuk pitch singkat dan 10 slide untuk full deck",
    ],
  },
  {
    id: "course/ai-untuk-pemula",
    title: "Kursus AI untuk Pemula: Dari Nol hingga Produktif",
    description:
      "Kursus lengkap untuk pemula yang ingin menguasai AI tools secara praktis. 4 modul, video, dan latihan.",
    category: "course",
    access_level: "paid",
    teaser:
      "Belajar AI dari nol: mengenal ChatGPT, menulis prompt efektif, otomatisasi tugas, dan menerapkan AI di pekerjaan harian.",
    tools: ["ChatGPT", "Claude", "Midjourney", "Zapier"],
    topics: ["pemula", "kursus", "produktivitas", "ai"],
    thumbnail: "https://images.pexels.com/photos/8849295/pexels-photo-8849295.jpeg?auto=compress&cs=tinysrgb&h=300&w=400",
    modules: [
      { title: "Modul 1: Mengenal AI dan ChatGPT", sequence: 1 },
      { title: "Modul 2: Menulis Prompt yang Efektif", sequence: 2 },
      { title: "Modul 3: Otomatisasi Tugas dengan AI", sequence: 3 },
      { title: "Modul 4: Menerapkan AI di Pekerjaan", sequence: 4 },
    ],
    body: "Kursus ini dirancang untuk pemula yang belum pernah menggunakan AI. Setiap modul berisi video penjelasan, latihan praktik, dan tugas akhir. Anda akan belajar dari membuat akun hingga mengotomatiskan tugas harian dengan AI.",
    steps: [
      "Selesaikan setiap modul secara berurutan",
      "Ikuti latihan praktik di akhir setiap video",
      "Kerjakan tugas akhir modul sebelum lanjut ke modul berikutnya",
      "Akses komunitas Discord untuk bertanya dan berdiskusi",
    ],
    tips: [
      "Sediakan 2-3 jam per minggu untuk menyelesaikan setiap modul",
      "Praktik langsung dengan tugas nyata Anda, bukan contoh dari video",
      "Jangan loncat modul walau merasa sudah paham dasarnya",
    ],
  },
  {
    id: "llm-prompt/konten-blog-seo",
    title: "Prompt Konten Blog SEO",
    description:
      "Prompt untuk menulis artikel blog yang SEO-friendly dengan struktur heading dan kata kunci yang tepat.",
    category: "llm-prompt",
    access_level: "free",
    teaser:
      "Tulis artikel blog yang naik di Google dengan prompt yang menghasilkan struktur SEO lengkap.",
    tools: ["ChatGPT", "Claude", "Gemini"],
    topics: ["seo", "konten", "blog"],
    thumbnail: "https://images.pexels.com/photos/15635241/pexels-photo-15635241.jpeg?auto=compress&cs=tinysrgb&h=300&w=400",
    prompt_preview:
      "Write a 1500-word SEO-optimized blog post about [TOPIC] for [AUDIENCE]. Include: a compelling title with the main keyword, meta description under 160 characters, H2 and H3 headings, introduction with a hook, 3-5 main sections with actionable advice, and a conclusion with call-to-action. Use the keyword [KEYWORD] naturally throughout.",
  },
  {
    id: "custom-ai/analisis-data-gpt",
    title: "Custom AI untuk Analisis Data Bisnis",
    description:
      "Panduan membuat asisten AI khusus untuk menganalisis data penjualan, pelanggan, dan keuangan.",
    category: "custom-ai",
    access_level: "paid",
    teaser:
      "Buat asisten AI yang membaca data bisnis Anda dan memberikan insight yang dapat ditindaklanjuti.",
    tools: ["ChatGPT Advanced Data Analysis", "Claude", "Google Sheets"],
    topics: ["analisis-data", "bisnis", "insight"],
    thumbnail: "https://images.pexels.com/photos/97080/pexels-photo-97080.jpeg?auto=compress&cs=tinysrgb&h=300&w=400",
    prompt_preview:
      "You are a business analyst assistant. I will upload sales data in CSV format. Analyze the data and provide: 1) Top 5 best-selling products, 2) Monthly revenue trend, 3) Customer segmentation, 4) Recommendations for increasing sales. Present findings in clear tables and bullet points.",
    steps: [
      "Ekspor data penjualan Anda ke format CSV",
      "Upload ke ChatGPT dengan Advanced Data Analysis atau Claude",
      "Gunakan prompt di atas untuk memulai analisis",
      "Iterasi dengan pertanyaan lanjutan berdasarkan hasil awal",
    ],
    tips: [
      "Bersihkan data sebelum upload: hapus baris kosong dan standardisasi format tanggal",
      "Mulai dengan pertanyaan spesifik, bukan 'analisis semua data'",
      "Simpan prompt yang menghasilkan insight terbaik untuk digunakan bulanan",
    ],
  },
  {
    id: "tutorial/midjourney-pemula",
    title: "Tutorial Midjourney untuk Pemula",
    description:
      "Panduan memulai Midjourney dari pendaftaran hingga membuat gambar pertama yang menarik.",
    category: "tutorial",
    access_level: "paid",
    teaser:
      "Mulai membuat gambar dengan AI menggunakan Midjourney dalam 20 menit, tanpa pengalaman desain.",
    tools: ["Midjourney", "Discord"],
    topics: ["midjourney", "desain", "pemula"],
    thumbnail: "https://images.pexels.com/photos/17774503/pexels-photo-17774503.jpeg?auto=compress&cs=tinysrgb&h=300&w=400",
    body: "Tutorial ini mencakup: cara mendaftar Midjourney, menghubungkan ke Discord, menulis prompt gambar pertama, memahami parameter dasar (--ar, --v, --style), dan tips memilih hasil terbaik dari 4 variasi yang diberikan.",
    steps: [
      "Daftar akun Midjourney di midjourney.com",
      "Join Discord server Midjourney atau gunakan web interface",
      "Ketik /imagine diikuti deskripsi gambar yang Anda inginkan",
      "Pilih salah satu dari 4 variasi atau buat variasi dari salah satu",
      "Upgrade gambar pilihan Anda dengan tombol U1-U4",
    ],
    tips: [
      "Gunakan bahasa Inggris untuk hasil terbaik",
      "Sertakan gaya visual seperti 'photorealistic', 'illustration', atau 'watercolor'",
      "Eksperimen dengan parameter --ar untuk berbagai rasio aspek",
    ],
  },
];
