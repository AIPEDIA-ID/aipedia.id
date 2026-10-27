---
title: "Template Konfirmasi Pesanan & Pengiriman"
description: "Mencegah pembeli terus-terusan bertanya 'Resinya mana kak?'. Kirimkan format konfirmasi pesanan yang sangat detail sesaat setelah mereka transfer."
category: "llm-prompt"
tools: ["Generic"]
topics: ["Customer Support"]
delivery_type: "text"
access_level: "starter"
uses: 0
prompt_preview: |-
  Act as a highly organized Customer Success Agent.
  I need a template to send to customers immediately after they pay for their order via WhatsApp or Social Media.

  Business/Shipping Details:
  - Estimated processing time: [INSERT E.g., 1-2 working days]
  - Courier used: [INSERT COURIER, e.g., JNE, GoSend]
  - Tracking Number policy: [INSERT WHEN TRACKING WILL BE GIVEN, e.g., Tonight at 9 PM]

  Please write a warm and reassuring "Order Confirmation" template.
  Include placeholders (like [Customer Name], [Order Items]) so I can easily fill them in.
  The message must clearly explain the next steps (packing and shipping) to prevent the customer from asking "When will my item be shipped?".
steps:
  - "Salin prompt di atas."
  - "Gunakan AI apa saja."
  - "Tuliskan aturan toko Anda (misalnya: *Dikirim besoknya, resi baru ada malam hari, kurir pakai JNT*)."
  - "Tekan *enter*."
tips:
  - "Rasa cemas pembeli *online* memuncak pada saat setelah mereka transfer namun sebelum resi diberikan. Naskah ini akan memberi tahu jadwal pasti pengiriman agar mereka tenang dan tidak meneror Anda."
---

# Output yang Diharapkan dari AI:

Template *Copy-Paste* Siap Pakai:
- **Tanda Terima Virtual:** Konfirmasi bahwa uang telah masuk dan pesanan aman (*Reassuring*).
- **Manajemen Ekspektasi:** Menjawab langsung pertanyaan kapan barang dikemas, kapan diserahkan ke kurir, dan kapan resi bisa dilacak.
