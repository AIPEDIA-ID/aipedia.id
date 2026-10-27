---
title: "To-Do List Prioritas Harian (Eisenhower Matrix)"
description: "Ubah tumpukan daftar tugas Anda yang acak menjadi jadwal prioritas terstruktur berdasarkan tingkat urgensi dan kepentingan."
category: "llm-prompt"
tools: ["Generic"]
topics: ["Productivity & Admin"]
delivery_type: "text"
access_level: "free"
uses: 0
prompt_preview: |-
  Act as a highly effective productivity coach. I am going to give you my random, unsorted list of tasks for today.
  
  Please organize these tasks using the Eisenhower Matrix methodology. Categorize them clearly into:
  1. Do First (Urgent and Important)
  2. Schedule (Important, Not Urgent)
  3. Delegate (Urgent, Not Important)
  4. Eliminate / Don't Do (Neither Urgent nor Important)
  
  After categorizing, please provide a suggested time-blocked schedule for the "Do First" and "Schedule" tasks, assuming I start working at [INSERT START TIME] and end at [INSERT END TIME].

  My random tasks for today:
  [INSERT YOUR RANDOM TASKS HERE]
steps:
  - "Salin prompt di atas."
  - "Buka AI favorit Anda (ChatGPT, Claude, dsb)."
  - "Ganti `[INSERT START TIME]` dan `[INSERT END TIME]` dengan jam mulai dan jam selesai kerja Anda hari ini (contoh: 09:00 AM dan 05:00 PM)."
  - "Tulis semua tugas yang ada di kepala Anda (tidak perlu berurutan) di bagian `[INSERT YOUR RANDOM TASKS HERE]`."
  - "Tekan *enter* dan dapatkan rencana kerja harian Anda."
tips:
  - "Tulis sedetail mungkin tugas Anda, termasuk estimasi waktu jika ada (misal: 'Balas email klien (butuh 30 menit)'). Ini akan membuat rekomendasi *time-blocking* dari AI jauh lebih akurat."
  - "Gunakan hasil ini sebagai panduan awal, bukan aturan kaku. Sesuaikan dengan energi Anda di hari tersebut."
---

# Output yang Diharapkan dari AI:

AI akan membantu mengurai kekacauan pikiran Anda dengan memberikan:
- **Matriks Prioritas:** Daftar tugas Anda akan dipecah menjadi 4 kuadran (Yang harus segera dikerjakan, yang bisa dijadwalkan, yang bisa didelegasikan, dan yang sebaiknya dihapus).
- **Rencana Jadwal Harian (Time-Blocking):** AI akan membuatkan simulasi jadwal dari pagi hingga sore berdasarkan tingkat prioritas tugas, lengkap dengan saran jam kerjanya.
