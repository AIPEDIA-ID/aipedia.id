---
title: "Review Kelogisan Argumen (Proof-reader Kritis)"
description: "Sebelum mengumpulkan essay atau tugas akhir, biarkan AI mencari kelemahan dan celah dalam argumen tulisan Anda layaknya dosen penguji."
category: "llm-prompt"
tools: ["Claude"]
topics: ["Education / Learning", "Copywriting & Communication"]
delivery_type: "text"
access_level: "free"
uses: 0
prompt_preview: |-
  Act as a highly critical but constructive academic peer reviewer.
  I am about to submit an essay/paper, and I need you to review the logic of my arguments. 
  
  Please read my text and identify:
  1. Logical fallacies or weak assumptions in my arguments.
  2. Claims that lack sufficient evidence or examples.
  3. Contradictions within the text.
  4. Suggestions on how to strengthen my core argument (Thesis).

  Do not rewrite the essay for me. Only provide critique and feedback.
  Here is my text:
  [INSERT YOUR ESSAY/TEXT HERE]
steps:
  - "Salin teks prompt di atas."
  - "Buka Claude (Sangat disarankan karena reasoning Claude lebih superior untuk teks panjang)."
  - "Paste seluruh draf tugas, essay, atau bab skripsi Anda ke dalam area `[INSERT YOUR ESSAY...]`."
  - "Tekan *enter*."
tips:
  - "Jangan kaget jika AI memberikan kritik yang cukup tajam. Gunakan poin-poin kritikan tersebut untuk mencari referensi jurnal tambahan sebelum tugas benar-benar diserahkan ke dosen."
---

# Output yang Diharapkan dari AI:

AI tidak akan menuliskan ulang tugas Anda (demi menghindari plagiasi AI), melainkan memberi *feedback* kritis:
- **Logical Fallacies:** Menemukan cacat logika dalam tulisan Anda (misal: "Di paragraf 2 kamu bilang A, tapi di paragraf 4 kamu menyimpulkan B tanpa ada jembatan penjelasan").
- **Missing Evidence:** Memberi tahu bagian mana yang argumennya terasa seperti opini pribadi karena kurang data pendukung.
- **Suggestions:** Saran taktis untuk membuat argumen utama Anda lebih *bulletproof* (kebal dari kritikan penguji).
