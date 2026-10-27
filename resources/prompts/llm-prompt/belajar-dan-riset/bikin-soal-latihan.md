---
title: "Generate Soal Latihan dari Materi (Bikin Quiz)"
description: "Ubah teks materi pelajaran Anda menjadi soal-soal latihan pilihan ganda dan esai lengkap dengan kunci jawaban untuk persiapan ujian."
category: "llm-prompt"
tools: ["ChatGPT"]
topics: ["Education / Learning"]
delivery_type: "text"
access_level: "free"
uses: 0
prompt_preview: |-
  Act as a strict but helpful exam creator.
  I want to test my knowledge on the following study material. 
  
  Please generate a practice quiz based strictly on the text provided below.
  The quiz should include:
  - 5 Multiple Choice Questions (with A, B, C, D options)
  - 2 Short Essay / Concept Questions

  Do NOT provide the answer key immediately. Wait for me to answer first, then evaluate my answers and provide the correct answer key with brief explanations.

  Here is my study material:
  [INSERT STUDY MATERIAL HERE]
steps:
  - "Salin prompt di atas."
  - "Buka ChatGPT."
  - "Tempel (*paste*) bab buku, catatan, atau artikel panjang yang sedang Anda pelajari ke bagian `[INSERT...]`."
  - "Tekan *enter*."
  - "Jawab pertanyaan yang diberikan AI. Jika sudah, suruh AI mengoreksinya."
tips:
  - "Teknik belajar menggunakan soal tes (Retrieval Practice) secara ilmiah terbukti lebih ampuh memasukkan informasi ke memori jangka panjang dibanding sekadar membaca ulang buku."
  - "Jika Anda ingin level yang lebih sulit, tambahkan perintah: 'Make the questions university-level difficulty'."
---

# Output yang Diharapkan dari AI:

**Interaksi Dua Arah (Tanya-Jawab):**
- AI akan membaca materi Anda dan merumuskan soal ujian *Multiple Choice* dan Esai pendek.
- Kunci jawaban **tidak akan langsung diberikan** (agar Anda tidak *cheating*). Setelah Anda mengetikkan jawaban Anda, barulah AI akan mengoreksi, memberi nilai, dan membeberkan kunci jawaban yang benar.
