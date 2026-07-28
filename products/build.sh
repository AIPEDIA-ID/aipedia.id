#!/bin/bash

# Build script for Aipedia Specialist (Basic & Pro) and Campaign Specific

set -e

# Base Directories
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PRODUCTS_DIR="$PROJECT_ROOT/products"
PUBLIC_CHAR_DIR="$PROJECT_ROOT/public/character"
SKILLS_SRC_DIR="$PRODUCTS_DIR/skills/codex/skills"
CODEX_PLUGIN_DIR="$PRODUCTS_DIR/skills/codex"
DELIVERY_DIR="$PROJECT_ROOT/delivery"

CAMPAIGN="bundle"
ONLY_IDS=""

while [[ "$#" -gt 0 ]]; do
    case $1 in
        --campaign) CAMPAIGN="$2"; shift ;;
        --only) ONLY_IDS="$2"; shift ;;
        *) echo "Unknown parameter passed: $1"; exit 1 ;;
    esac
    shift
done

# Ensure output directories exist
OUT_DIR="$DELIVERY_DIR/$CAMPAIGN"
BASIC_OUT="$OUT_DIR/basic"
PRO_OUT="$OUT_DIR/pro"

mkdir -p "$BASIC_OUT"
mkdir -p "$PRO_OUT"
mkdir -p "$PRO_OUT/skills"
mkdir -p "$PRO_OUT/character"

echo "=================================================="
echo "    Building Aipedia Products ($CAMPAIGN)         "
echo "=================================================="

# Generate docs based on --only flag
if [ -n "$ONLY_IDS" ]; then
    echo "=> Generating ASISTANT.md for: $ONLY_IDS"
    python3 "$PROJECT_ROOT/scripts/manager.py" generate-docs --only "$ONLY_IDS"
else
    echo "=> Generating full ASISTANT.md"
    python3 "$PROJECT_ROOT/scripts/manager.py" generate-docs
fi

# Fix image paths in ASISTANT.md temporarily for PDF generation
echo "=> Adjusting image paths in ASISTANT.md for PDF generation..."
if grep -q '\.\./public' "$PRODUCTS_DIR/guide/ASISTANT.md"; then
  cp "$PRODUCTS_DIR/guide/ASISTANT.md" /tmp/aipedia_asistant_backup.md
  sed 's|\.\./public|../../../public|g' /tmp/aipedia_asistant_backup.md > "$PRODUCTS_DIR/guide/ASISTANT.md"
fi

# Ensure cleanup happens even if the script fails
cleanup() {
  if [ -f /tmp/aipedia_asistant_backup.md ]; then
    mv /tmp/aipedia_asistant_backup.md "$PRODUCTS_DIR/guide/ASISTANT.md"
  fi
}
trap cleanup EXIT

echo "=> Installing Chrome for Puppeteer if needed..."
npx -y puppeteer browsers install chrome

echo "=> Generating PDFs (This might take a while on first run due to Puppeteer)..."
npx -y md-to-pdf "$PRODUCTS_DIR/guide/GUIDE_Basic.md"
npx -y md-to-pdf "$PRODUCTS_DIR/guide/ASISTANT.md"
npx -y md-to-pdf "$PRODUCTS_DIR/guide/GUIDE_Pro.md"


echo "=> Assembling Basic Package..."
cp "$PRODUCTS_DIR/guide/GUIDE_Basic.pdf" "$BASIC_OUT/"
cp "$PRODUCTS_DIR/guide/ASISTANT.pdf" "$BASIC_OUT/"

cd "$BASIC_OUT"
rm -f "aipedia-basic-${CAMPAIGN}.zip"
zip -r "aipedia-basic-${CAMPAIGN}.zip" ./*.pdf
rm -f ./*.pdf
cd "$PROJECT_ROOT"

echo "=> Assembling Pro Package..."
cp "$PRODUCTS_DIR/guide/GUIDE_Pro.pdf" "$PRO_OUT/"
cp "$PRODUCTS_DIR/guide/ASISTANT.pdf" "$PRO_OUT/"

# Prepare skills as individual zips
mkdir -p "$PRO_OUT/skills"
for skill_path in "$SKILLS_SRC_DIR"/*; do
  if [ -d "$skill_path" ]; then
    skill_name=$(basename "$skill_path")
    # Create a temporary folder for the zip contents
    tmp_skill_dir="/tmp/aipedia_skill_$skill_name"
    rm -rf "$tmp_skill_dir"
    mkdir -p "$tmp_skill_dir"
    
    # Copy skill contents
    cp -r "$skill_path"/* "$tmp_skill_dir/"
    
    # Copy icon as icon.png so users can upload it to Custom GPT
    if [ -f "$PUBLIC_CHAR_DIR/$skill_name.png" ]; then
      cp "$PUBLIC_CHAR_DIR/$skill_name.png" "$tmp_skill_dir/icon.png"
    fi
    
    # Zip it
    cd "$tmp_skill_dir"
    zip -r "$PRO_OUT/skills/$skill_name.zip" ./*
    cd "$PROJECT_ROOT"
    rm -rf "$tmp_skill_dir"
  fi
done

echo "=> Assembling Codex plugin marketplace..."
TMP_MARKETPLACE="/tmp/aipedia_marketplace_$CAMPAIGN"
rm -rf "$TMP_MARKETPLACE"
# Copy the entire codex plugin directory
cp -R "$CODEX_PLUGIN_DIR" "$TMP_MARKETPLACE"

# Verify plugin logic
python3 -m json.tool "$TMP_MARKETPLACE/.codex-plugin/plugin.json" >/dev/null
for skill_path in "$TMP_MARKETPLACE/skills"/*; do
  [ -f "$skill_path/SKILL.md" ] || {
    echo "Error: missing SKILL.md in bundled skill: $skill_path" >&2
    exit 1
  }
done

rm -rf "$PRO_OUT/codex-plugin-marketplace"
# Copy the assembled plugin as codex-plugin-marketplace (so users just see that name when they extract)
cp -R "$TMP_MARKETPLACE" "$PRO_OUT/codex-plugin-marketplace"

echo "=> Zipping Pro Package..."
cd "$PRO_OUT"
rm -f "aipedia-asistant-${CAMPAIGN}.zip"
if [ -f install.sh ]; then
    zip -r "aipedia-asistant-${CAMPAIGN}.zip" GUIDE_Pro.pdf ASISTANT.pdf skills codex-plugin-marketplace install.sh install.bat
else
    zip -r "aipedia-asistant-${CAMPAIGN}.zip" GUIDE_Pro.pdf ASISTANT.pdf skills codex-plugin-marketplace
fi
rm -rf GUIDE_Pro.pdf ASISTANT.pdf skills codex-plugin-marketplace
cd "$PROJECT_ROOT"

echo "=================================================="
echo "    Build Complete! Packages are ready in:        "
echo "    $OUT_DIR                                      "
echo "=================================================="
