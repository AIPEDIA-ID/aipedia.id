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
  cp "$PRODUCTS_DIR/ASISTANT.md" /tmp/aipedia_asistant_backup.md
  sed 's|\.\./public|../../public|g' /tmp/aipedia_asistant_backup.md > "$PRODUCTS_DIR/ASISTANT.md"
fi

# Ensure cleanup happens even if the script fails
cleanup() {
  if [ -f /tmp/aipedia_asistant_backup.md ]; then
    mv /tmp/aipedia_asistant_backup.md "$PRODUCTS_DIR/ASISTANT.md"
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

# Prepare skills as individual zips
mkdir -p "$PRO_OUT/skills"
for skill_path in "$SKILLS_DIR"/*; do
  if [ -d "$skill_path" ]; then
    skill_name=$(basename "$skill_path")
    # Create a temporary folder for the zip contents
    tmp_skill_dir="/tmp/aipedia_skill_$skill_name"
    rm -rf "$tmp_skill_dir"
    mkdir -p "$tmp_skill_dir"
    
    # Copy skill contents
    cp -r "$skill_path"/* "$tmp_skill_dir/"
    
    # Copy icon as icon.png so users can upload it to Custom GPT
    if [ -f "$PROJECT_ROOT/$PUBLIC_CHAR_DIR/$skill_name.png" ]; then
      cp "$PROJECT_ROOT/$PUBLIC_CHAR_DIR/$skill_name.png" "$tmp_skill_dir/icon.png"
    fi
    
    # Zip it
    cd "$tmp_skill_dir"
    zip -r "$PROJECT_ROOT/$PRO_OUT/skills/$skill_name.zip" ./*
    cd "$PROJECT_ROOT"
    rm -rf "$tmp_skill_dir"
  fi
done

echo "=> Zipping Pro Package..."
cd "$PRO_OUT"
rm -f aipedia-asistant_v1.1.zip
zip -r aipedia-asistant_v1.1.zip GUIDE_Pro.pdf ASISTANT.pdf skills
rm -rf GUIDE_Pro.pdf ASISTANT.pdf skills
cd "$PROJECT_ROOT"

echo "=================================================="
echo "    Build Complete! Packages are ready.           "
echo "=================================================="
