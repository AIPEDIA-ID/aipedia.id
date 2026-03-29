# Plan AIPEDIA.ID — Launch Meta Ads

## Prasyarat Website (Wajib Sebelum Iklan)
- [x] **Privacy Policy**: Buat `src/pages/privacy-policy.astro` (wajib Meta Ads). Isi: data collection, third-party (Meta/Google), user rights. Link di footer.
- [x] **Meta Pixel**: Buat Pixel di Business Manager → install base code di `Layout.astro` `<head>`. GTM sudah ada (`G-GVV8KYYQFZ`).
- [x] **Event Tracking**: Setup ViewContent, InitiateCheckout, Purchase. Test di Events Manager → semua "Ready".
- [x] **Checkout Test**: Test `aipedia.myr.id/pl/business-pack` & `/marketing-pack` — flow benar, mobile responsive.
- [] **Social Proof**: Verifikasi `public/screenshots/` (1-6.png) adalah screenshot asli Chat UI, bukan placeholder.

## Setup Pixel & Tracking
- [x] Setup Ad Account
- [x] Install Pixel base code di Layout.astro
- [x] Test ViewContent: buka website → cek Events Manager
- [x] Test InitiateCheckout: klik pricing link → cek Events Manager
- [x] Verifikasi semua event status "Ready"

## Creative
- [ ] **Video**: Script (hook 3s → problem → demo chat → CTA) → rekam screen → edit + text overlay + branding → export 9:16 & 1:1
- [ ] **Ad Copy**: Primary text (max 125 chars), headline (max 27 chars), description. Buat 2-3 variasi A/B test.

## Campaign Launch
- [ ] Campaign: Conversion objective
- [ ] Ad Set: audience (digital marketing, AI tools, UMKM), budget harian
- [ ] Ads: upload creative + copy
- [ ] Launch & monitor ROAS/CAC hari pertama
