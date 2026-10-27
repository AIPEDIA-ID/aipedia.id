/**
 * AIPEDIA Auth Configuration & Mock Control
 * 
 * Central switch for authentication behavior:
 * - mockBypass:
 *   - true: Akses semua materi & halaman bebas tanpa perlu login (mode demo/review).
 *   - false: Wajib login. Halaman khusus memeriksa sesi pengguna.
 * 
 * Anda juga dapat mengubah bypass ini secara interaktif di browser kapan saja:
 * - Nyalakan akses bebas: /api/auth/mock-toggle?enable=true
 * - Matikan akses bebas:  /api/auth/mock-toggle?enable=false
 */
export const AUTH_CONFIG = {
  // Ganti ke false jika ingin default wajib login
  mockBypass: true,
};

export const MOCK_BYPASS_COOKIE = 'aipedia_bypass';
