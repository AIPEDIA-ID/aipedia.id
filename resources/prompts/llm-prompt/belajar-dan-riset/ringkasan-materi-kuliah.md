---
title: "Ringkasan Materi Kuliah (Slide to Text)"
description: "Dosen membagikan slide PDF ratusan halaman? Biarkan AI membaca semuanya dan menyarikannya menjadi catatan belajar yang ringkas."
category: "llm-prompt"
tools: ["Claude", "ChatGPT"]
topics: ["Education / Learning"]
delivery_type: "text"
access_level: "free"
uses: 0
prompt_preview: |-
  You are an expert tutor and academic summarizer.
  I am going to provide you with my college lecture materials / slides. 
  
  Please read through the material and summarize it clearly. 
  Format your summary using the following structure:
  1. **Core Concept:** A 1-2 sentence explanation of the main topic.
  2. **Key Theories / Frameworks:** List the most important theories or frameworks mentioned, explaining each briefly.
  3. **Important Terminology:** A mini-glossary of new/important terms.
  4. **Conclusion/Summary:** The main takeaway from this lecture.

  Here is the lecture material:
  [INSERT LECTURE MATERIAL HERE]
steps:
  - "Salin prompt di atas."
  - "Gunakan AI yang memiliki fitur *upload file* (seperti Claude atau ChatGPT)."
  - "Unggah (Upload) file materi/slide kuliah Anda (PDF/Word/PPT)."
  - "Tempelkan prompt ini, kosongi bagian `[INSERT LECTURE MATERIAL HERE]` karena file sudah diunggah, lalu tekan *enter*."
tips:
  - "Claude lebih tangguh dalam membaca PDF panjang tanpa kehilangan konteks dibandingkan versi gratis dari AI lainnya."
  - "Jika materi berupa teks panjang di web, cukup *copy-paste* semua teksnya ke bagian `[INSERT...]`."
---

# Output yang Diharapkan dari AI:

Buku catatan digital yang sangat rapi untuk ujian:
- **Core Concept:** Inti sari mata kuliah hari itu.
- **Key Theories:** Pemahaman atas teori-teori rumit yang diajarkan, dijabarkan dengan bahasa yang jauh lebih santai.
- **Important Terminology:** Daftar istilah akademis (jargon) beserta artinya (sangat berguna untuk persiapan ujian).
