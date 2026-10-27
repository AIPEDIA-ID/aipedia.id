---
title: "Ringkasan Artikel Panjang Menjadi Poin Penting"
description: "Tidak punya waktu membaca dokumen atau artikel berhalaman-halaman? Biarkan AI menyarikan intisarinya menjadi poin-poin yang mudah dicerna."
category: "llm-prompt"
tools: ["Claude", "ChatGPT"]
topics: ["Productivity & Admin", "Education / Learning"]
delivery_type: "text"
access_level: "free"
uses: 0
prompt_preview: |-
  You are an expert speed reader and information analyst. 
  I will provide you with a long text/document. Please read it thoroughly and summarize it so that I can understand the core message in under 2 minutes.

  Please structure your output as follows:
  1. **TL;DR:** A one-sentence summary of the entire text.
  2. **Key Takeaways:** 3-5 bullet points highlighting the most crucial information, data, or arguments.
  3. **Actionable Insights:** If applicable, what are the next steps or practical takeaways from this text?

  The text to summarize:
  [INSERT LONG TEXT OR DOCUMENT CONTENT HERE]
steps:
  - "Salin prompt di atas."
  - "Buka AI pilihan Anda (Claude sangat direkomendasikan untuk teks yang sangat panjang)."
  - "Tempel (*paste*) dokumen, laporan, atau artikel panjang Anda ke bagian `[INSERT LONG TEXT OR DOCUMENT CONTENT HERE]`."
  - "Tekan *enter* dan AI akan langsung memberikan ringkasannya."
tips:
  - "Claude memiliki kapasitas input (context window) yang jauh lebih besar daripada ChatGPT gratis, sehingga sangat cocok untuk melahap dokumen berpuluh-puluh halaman sekaligus."
  - "Jika dokumennya berupa file PDF, Anda bisa langsung mengunggah file PDF tersebut (di Claude atau ChatGPT Plus) dan cukup mengetikkan prompt-nya tanpa bagian `[INSERT...]`."
---

# Output yang Diharapkan dari AI:

AI akan membuang semua narasi panjang dan hanya menyajikan:
- **TL;DR (Too Long; Didn't Read):** 1 kalimat yang merangkum keseluruhan isi dokumen.
- **Key Takeaways:** Intisari data, fakta, atau argumen penting dalam bentuk daftar poin (bullet points).
- **Actionable Insights:** Insight praktis yang bisa langsung Anda aplikasikan atau tindak lanjuti setelah membaca ringkasan tersebut.
