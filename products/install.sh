#!/bin/bash

# Dapatkan path absolut dari direktori tempat script ini berada
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
MARKETPLACE_DIR="$SCRIPT_DIR/codex-plugin-marketplace"

echo "========================================="
echo " Menginstall AIPEDIA Specialists Plugin  "
echo "========================================="
echo ""

# Periksa apakah direktori marketplace ada
if [ ! -d "$MARKETPLACE_DIR" ]; then
    echo "❌ Error: Folder 'codex-plugin-marketplace' tidak ditemukan di $SCRIPT_DIR."
    echo "Pastikan Anda mengekstrak seluruh isi file zip dengan benar."
    exit 1
fi

echo "1. Mendaftarkan marketplace lokal..."
if codex plugin marketplace add "$MARKETPLACE_DIR"; then
    echo "✅ Local marketplace berhasil didaftarkan."
else
    echo "❌ Gagal mendaftarkan marketplace. Pastikan Codex sudah terinstall dan perintah 'codex' tersedia."
    exit 1
fi

echo ""
echo "2. Menginstall plugin aipedia-specialists..."
if codex plugin add aipedia-specialists@aipedia; then
    echo "✅ Plugin berhasil diinstall!"
    echo ""
    echo "🎉 Selesai! Silakan buka project Anda di Codex dan buat task baru."
    echo "Seluruh AI Specialists dari AIPEDIA sudah siap membantu Anda."
else
    echo "❌ Gagal menginstall plugin."
    exit 1
fi
