@echo off
setlocal

set "SCRIPT_DIR=%~dp0"
set "MARKETPLACE_DIR=%SCRIPT_DIR%codex-plugin-marketplace"

echo =========================================
echo  Menginstall AIPEDIA Specialists Plugin  
echo =========================================
echo.

if not exist "%MARKETPLACE_DIR%" (
    echo [X] Error: Folder 'codex-plugin-marketplace' tidak ditemukan di %SCRIPT_DIR%.
    echo Pastikan Anda mengekstrak seluruh isi file zip dengan benar.
    pause
    exit /b 1
)

echo 1. Mendaftarkan marketplace lokal...
call codex plugin marketplace add "%MARKETPLACE_DIR%"
if %ERRORLEVEL% NEQ 0 (
    echo [X] Gagal mendaftarkan marketplace. Pastikan Codex sudah terinstall dan perintah 'codex' tersedia.
    pause
    exit /b %ERRORLEVEL%
) else (
    echo [OK] Local marketplace berhasil didaftarkan.
)

echo.
echo 2. Menginstall plugin aipedia-specialists...
call codex plugin add aipedia-specialists@aipedia
if %ERRORLEVEL% NEQ 0 (
    echo [X] Gagal menginstall plugin.
    pause
    exit /b %ERRORLEVEL%
) else (
    echo [OK] Plugin berhasil diinstall!
    echo.
    echo Selesai! Silakan buka project Anda di Codex dan buat task baru.
    echo Seluruh AI Specialists dari AIPEDIA sudah siap membantu Anda.
)

pause
