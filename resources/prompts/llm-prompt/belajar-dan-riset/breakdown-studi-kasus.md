---
title: "Breakdown Analisis Studi Kasus Bisnis"
description: "Ubah studi kasus puluhan halaman (seperti dari Harvard Business Review) menjadi poin analisis taktis berupa masalah, solusi, dan hasil."
category: "llm-prompt"
tools: ["Claude"]
topics: ["Education / Learning", "Business & Operations"]
delivery_type: "text"
access_level: "free"
uses: 0
prompt_preview: |-
  Act as an elite MBA professor and business analyst.
  I need to analyze a business case study for my assignment. 
  
  Please read the provided case study and break it down into the following structured framework:
  1. **Company Background:** A brief overview of the company and industry.
  2. **Core Dilemma / Problem:** What is the main issue the protagonist/company is facing?
  3. **SWOT Analysis:** A quick summary of Strengths, Weaknesses, Opportunities, and Threats based on the text.
  4. **Proposed Solutions:** 2-3 logical recommendations to solve the problem.

  Here is the case study text:
  [INSERT CASE STUDY TEXT HERE]
steps:
  - "Salin prompt di atas."
  - "Sangat disarankan menggunakan Claude (karena limit teksnya besar dan analisis bisnisnya sangat tajam)."
  - "Salin isi tulisan studi kasus Anda, tempelkan di area `[INSERT...]`."
  - "Tekan *enter* dan dapatkan analisis level MBA seketika."
tips:
  - "Gunakan hasil analisis ini sebagai fondasi presentasi atau tugas kelompok Anda. Sangat disarankan untuk memodifikasi *Proposed Solutions* (solusi yang ditawarkan) dengan ide unik Anda sendiri agar tugas terasa orisinal."
---

# Output yang Diharapkan dari AI:

AI akan membedah kasus bisnis yang ruwet menjadi kerangka presentasi yang jelas:
- **Core Dilemma:** Identifikasi masalah paling fundamental dari perusahaan tersebut.
- **SWOT Analisis:** Peta kekuatan dan kelemahan otomatis berdasarkan data yang ada di teks.
- **Solusi Taktis:** Saran pemecahan masalah (ini sangat membantu *brainstorming* tugas mahasiswa manajemen/bisnis).
