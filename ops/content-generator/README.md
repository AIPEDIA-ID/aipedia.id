# 🎨 Aipedia Content & Carousel Generator

Content engine untuk otomatisasi pembuatan materi sosial media dari draf Markdown menjadi:
1. **Carousel Visual (HTML / PDF / PNG)**: Aspect ratio 4:5 (1080x1350) dengan desain modern Apple Liquid Glass / Dark Mode.
2. **Multi-Platform Captions**: Siap pakai untuk Instagram, LinkedIn, Twitter/X Threads, dan TikTok/Reels Script.

---

## 🚀 Cara Penggunaan Cepat

### 1. Buat Draf Ide Baru
Gunakan perintah `new` untuk membuat kerangka slide otomatis:
```bash
python3 ops/content-generator/generator.py new "5 Kesalahan Iklan Meta yang Bikin Boncos"
```
File draf markdown baru akan dibuat di `ops/content-generator/content/drafts/`.

### 2. Tulis / Edit Konten di Markdown
Buka file draf markdown dan sesuaikan isi per slide:
```markdown
---
title: "5 Kesalahan Iklan Meta"
category: "MARKETING & ADS"
tags: ["metaads", "bisnisdigital", "marketing"]
cta: "Pelajari framework Mita di aipedia.id"
---

## Slide 1 (Hook)
Type: hook
Pill: STRATEGI ADS
# [highlight]5 Kesalahan Iklan Meta[/highlight]
Jangan habiskan budget tanpa hasil. Cek 5 poin penting ini.

## Slide 2
Type: content
# 01. Creative Fatigue
Iklan yang sama jalan berminggu-minggu tanpa refresh...
- CTR menurun drastis
- Biaya per klik meroket
Tip: Refresh minimal 1x seminggu.

## Slide 3 (CTA)
Type: cta
# Siap Naikkan ROAS Iklan Anda?
Gunakan Mita, AI Spesialis Meta Ads dari AIPEDIA.
CTA: Akses Mita di aipedia.id
```

### 3. Render Menjadi Slide & Captions
Jalankan perintah `render`:
```bash
python3 ops/content-generator/generator.py render ops/content-generator/content/drafts/cara-mudah-audit-iklan-meta.md
```

Hasil akan otomatis tersedia di folder `ops/content-generator/output/[slug]/`:
- `carousel.html`: Preview interaktif slide 1080x1350. Buka di browser dan klik tombol **🖨️ Cetak PDF** untuk simpan sebagai dokumen LinkedIn Carousel!
- `captions.md`: Kumpulan caption lengkap untuk Instagram, LinkedIn, Twitter/X thread, dan video script TikTok/Reels.

---

## 📂 Struktur Direktori

```text
ops/content-generator/
├── generator.py          # CLI utama (render & new)
├── captions.py           # Engine format caption multi-platform
├── templates/
│   └── carousel.html     # Template visual HTML & CSS 1080x1350
├── content/
│   ├── drafts/           # Tempat draf konten baru
│   └── samples/          # Contoh konten siap render
├── output/               # Hasil render (HTML & captions.md)
└── README.md
```
