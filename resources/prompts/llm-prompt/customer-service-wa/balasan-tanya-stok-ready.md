---
title: "Balasan Chat 'Halo Kak, Barang Ready?'"
description: "Jangan membalas pertanyaan ketersediaan stok hanya dengan kata 'Ready kak'. Ubah pertanyaan sepele ini menjadi pancingan agar mereka langsung Check Out."
category: "llm-prompt"
tools: ["Generic"]
topics: ["Customer Support", "Sales & Closing"]
delivery_type: "text"
access_level: "starter"
uses: 0
prompt_preview: |-
  You are an expert Sales Chat Closer.
  Customers frequently ask "Is this item ready/in stock?" and I usually just reply "Yes, it's ready." I want to improve this to increase immediate sales.

  - The Product: [INSERT PRODUCT NAME]
  - Current Stock Status: [INSERT STATUS, e.g., Ready but limited, Ready in all colors, Only 3 left]

  Please write 3 variations of a reply that not only confirms the stock is available but also encourages them to buy immediately.
  Use techniques like:
  1. Urgency (Fast selling/limited stock).
  2. The Assumptive Close (Assuming they will buy and asking which variation they want).
  3. The Value Add (Reminding them of free shipping or today's promo if they order now).
steps:
  - "Salin teks prompt di atas."
  - "Buka AI apa saja."
  - "Isi nama barangnya dan sebutkan status stok Anda saat ini dengan jujur (misal: *Sisa 5 warna hitam*)."
  - "Tekan *enter*."
tips:
  - "Prinsip *Closing* di Chat: Setiap kali Anda menjawab pertanyaan pelanggan, Anda **wajib** mengakhirinya dengan kalimat pertanyaan balik (misalnya: *'Jadi mau dikirim yang warna hitam atau putih kak?'*)."
---

# Output yang Diharapkan dari AI:

Teks Balasan *Stock-Ready* bertenaga *Sales*:
- **Assumptive Close:** Teknik membalas yang memaksa pelanggan memilih (Hitam/Putih) daripada sekadar menjawab "Ya/Tidak".
- Mengandung elemen urgensi halus agar mereka segera mentransfer hari itu juga sebelum kehabisan.
