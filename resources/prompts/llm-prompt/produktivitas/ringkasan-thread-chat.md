---
title: "Ringkasan Thread Chat Grup Panjang"
description: "Rangkum puluhan hingga ratusan pesan berantakan di grup WhatsApp/Slack menjadi satu notulen keputusan yang terstruktur."
category: "llm-prompt"
tools: ["Claude"]
topics: ["Productivity & Admin", "Copywriting & Communication"]
delivery_type: "text"
access_level: "free"
uses: 0
prompt_preview: |-
  You are a meticulous secretary and information synthesizer.
  I am going to paste a long, messy chat thread from our team group (WhatsApp/Slack). 
  
  Please analyze the conversation and extract the following:
  1. **Core Topic:** What was mainly discussed?
  2. **Key Decisions:** What final agreements or decisions were made?
  3. **Action Items:** Who needs to do what? (Format as: [Name] - [Task])
  4. **Open Questions:** What issues were left unresolved?

  Please ignore the small talk, jokes, or irrelevant messages. Here is the chat log:
  [INSERT CHAT LOG HERE]
steps:
  - "Salin prompt di atas."
  - "Buka Claude (Sangat direkomendasikan karena lebih pandai menyortir konteks obrolan panjang ketimbang ChatGPT)."
  - "Buka WhatsApp/Slack Anda, *copy* seluruh percakapan yang ingin diringkas, lalu *paste* ke bagian `[INSERT CHAT LOG HERE]`."
  - "Tekan *enter*."
tips:
  - "Terkadang Anda akan menempel (*paste*) teks lengkap dengan *timestamp* (jam) dan nama pengirim. Jangan khawatir menghapusnya; biarkan saja berantakan, AI bisa membaca pola *chat* tersebut dengan sendirinya."
  - "Pastikan tidak ada informasi sensitif (password/data rahasia nasabah) yang ikut ter-copy ke dalam AI."
---

# Output yang Diharapkan dari AI:

AI akan menyaring semua "wkwkwk", stiker, dan obrolan basa-basi, lalu mengubahnya menjadi:
- **Core Topic:** Ringkasan 1 kalimat tentang inti perdebatan/obrolan.
- **Key Decisions:** Keputusan final yang sudah disetujui bersama.
- **Action Items:** Daftar tugas beserta penanggung jawabnya (sangat berguna jika ada pembagian tugas di dalam chat).
- **Open Questions:** Topik menggantung yang belum ada kesimpulannya.
