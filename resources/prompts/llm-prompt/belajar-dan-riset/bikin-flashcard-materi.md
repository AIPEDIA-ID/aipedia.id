---
title: "Bikin Flashcard dari Materi Panjang"
description: "Persiapan ujian lebih efektif dengan mengubah berlembar-lembar catatan materi menjadi set Flashcard interaktif (Tanya-Jawab) untuk dihafal."
category: "llm-prompt"
tools: ["Generic"]
topics: ["Education / Learning"]
delivery_type: "text"
access_level: "free"
uses: 0
prompt_preview: |-
  You are an expert in cognitive science and active recall learning.
  I want to memorize the following study material efficiently using the Flashcard method (Active Recall).

  Please extract the most important facts, dates, definitions, and concepts from the text below, and format them as a two-column table.
  - Column 1: "Front of Card (Question / Term)"
  - Column 2: "Back of Card (Answer / Definition)"

  Keep the answers concise and easy to memorize. 
  Here is the study material:
  [INSERT STUDY MATERIAL HERE]
steps:
  - "Salin prompt di atas."
  - "Buka AI (ChatGPT, Claude, atau Gemini)."
  - "Tempelkan materi yang harus Anda hafal (bisa catatan sejarah, biologi, atau pasal-pasal hukum)."
  - "Tekan *enter*."
  - "(Opsional) Salin tabel hasilnya ke aplikasi *Flashcard* seperti Anki atau Quizlet untuk latihan harian."
tips:
  - "Gunakan metode ini dipadukan dengan teknik *Spaced Repetition* (mengulang hafalan dengan jeda waktu tertentu) agar memori jangka pendek berubah menjadi memori jangka panjang."
---

# Output yang Diharapkan dari AI:

AI akan membaca materi teks Anda dan menyajikannya dalam format **Tabel**:
- **Kolom Kiri (Front):** Berisi pancingan berupa istilah, nama tokoh, atau pertanyaan singkat.
- **Kolom Kanan (Back):** Berisi definisi atau jawaban singkat padat yang harus Anda ingat.
