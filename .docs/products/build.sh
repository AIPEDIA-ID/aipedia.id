#!/bin/bash

# Build script for Aipedia Assistant (Basic & Pro)

set -e

# Base Directories
PROJECT_ROOT="$(pwd)"
PRODUCTS_DIR=".docs/products"
BASIC_OUT="$PRODUCTS_DIR/delivery/basic"
PRO_OUT="$PRODUCTS_DIR/delivery/pro"
SKILLS_DIR="$PRODUCTS_DIR/skills"
PUBLIC_CHAR_DIR="public/character"

# Ensure output directories exist
mkdir -p "$BASIC_OUT"
mkdir -p "$PRO_OUT"
mkdir -p "$PRO_OUT/skills"
mkdir -p "$PRO_OUT/character"

echo "=================================================="
echo "    Building Aipedia Products (Basic & Pro)       "
echo "=================================================="

# Fix image paths in ASISTANT.md temporarily for PDF generation
echo "=> Adjusting image paths in ASISTANT.md for PDF generation..."
if grep -q '\.\./public' "$PRODUCTS_DIR/ASISTANT.md"; then
  sed -i.bak 's|\.\./public|../../public|g' "$PRODUCTS_DIR/ASISTANT.md"
fi

# Ensure cleanup of .bak file happens even if the script fails
cleanup() {
  if [ -f "$PRODUCTS_DIR/ASISTANT.md.bak" ]; then
    mv "$PRODUCTS_DIR/ASISTANT.md.bak" "$PRODUCTS_DIR/ASISTANT.md"
  fi
}
trap cleanup EXIT

echo "=> Installing Chrome for Puppeteer if needed..."
npx -y puppeteer browsers install chrome

echo "=> Generating PDFs (This might take a while on first run due to Puppeteer)..."
npx -y md-to-pdf "$PRODUCTS_DIR/GUIDE_Basic.md"
npx -y md-to-pdf "$PRODUCTS_DIR/ASISTANT.md"
npx -y md-to-pdf "$PRODUCTS_DIR/GUIDE_Pro.md"



echo "=> Assembling Basic Package..."
mv "$PRODUCTS_DIR/GUIDE_Basic.pdf" "$BASIC_OUT/"
cp "$PRODUCTS_DIR/ASISTANT.pdf" "$BASIC_OUT/"

cd "$BASIC_OUT"
rm -f aipedia-basic_v1.1.zip
zip -r aipedia-basic_v1.1.zip ./*.pdf
rm -f ./*.pdf
cd "$PROJECT_ROOT"

echo "=> Assembling Pro Package..."
mv "$PRODUCTS_DIR/GUIDE_Pro.pdf" "$PRO_OUT/"
mv "$PRODUCTS_DIR/ASISTANT.pdf" "$PRO_OUT/"

# Copy skills folder
cp -r "$SKILLS_DIR"/* "$PRO_OUT/skills/" || true

# Copy character icons
cp -r "$PUBLIC_CHAR_DIR"/* "$PRO_OUT/character/" || true

echo "=> Zipping Pro Package..."
cd "$PRO_OUT"
rm -f aipedia-asistant_v1.1.zip
zip -r aipedia-asistant_v1.1.zip GUIDE_Pro.pdf ASISTANT.pdf skills character
rm -rf GUIDE_Pro.pdf ASISTANT.pdf skills character
cd "$PROJECT_ROOT"

echo "=================================================="
echo "    Build Complete! Packages are ready.           "
echo "=================================================="
