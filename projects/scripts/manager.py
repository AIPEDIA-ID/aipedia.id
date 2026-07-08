#!/usr/bin/env python3

import os
import json
import csv
import argparse
from PIL import Image

# ==========================================
# PATH CONFIGURATION
# ==========================================
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
AGENTS_DIR = os.path.dirname(SCRIPT_DIR)
PROJECT_ROOT = os.path.dirname(AGENTS_DIR)
DATA_JSON_PATH = os.path.join(PROJECT_ROOT, "src", "data", "characters.json")
RAW_ICONS_DIR = os.path.join(AGENTS_DIR, "assets", "raw_icons")
PUBLIC_ICONS_DIR = os.path.join(PROJECT_ROOT, "public", "character")
SYSTEM_PROMPTS_DIR = os.path.join(AGENTS_DIR, "prompts", "system")
MIDJOURNEY_PROMPTS_TXT = os.path.join(AGENTS_DIR, "prompts", "midjourney_prompts.txt")
CSV_PATH = os.path.join(AGENTS_DIR, "config", "variables.csv")

# ==========================================
# PROMPT TEMPLATE
# ==========================================
PROMPT_GENERATOR = """
Create a glossy, chibi 3D robot mascot named "{name}", infer gender expression as "{gender}" and persona from the name; keep it friendly, competent, and trustworthy for an AI Employee Assistant brand used in tools like "{role}" [7][10][16].
Primary theme color = {themeColor} (hex); apply as dominant body panels, trims, and accents with neutral complements (charcoal gray, slate, white) for contrast and accessibility [16][10][7].
Design: rounded shapes, soft bevels, face as black glass calm display with cyan glow eyes, welcoming open-arm pose, clean silhouette readable at small sizes (icon usage) [16][10][7].
Accessories driven by '{description}': add optional tools/props, UI glyphs, or wearables that communicate the role without text (e.g., analytics icons, dashboards, checklists), but keep minimalist and brand-safe [16][10][7].
Background/output: isolated subject on transparent background, export as PNG RGBA with real alpha channel; no backdrop, no floor, no drop shadow, no watermark, no text, no logo [3][12][9].
Lighting/render: studio softbox reflections, subtle rim light, high dynamic range look, crisp edges, 4k detail; avoid noisy patterns that break alpha edges [3][6][9].
Framing: centered, full-body, slight 3/4 angle, ample padding for cropping into square/round app icons [16][10][7].
If the model cannot output native transparency, generate on solid white or green and prepare clean matting for downstream background removal (keep hard separation from background) [3][15][4].
Style constraints: no weapons, no text, no letters, no background scenes; focus on a reusable, modular mascot asset with consistent proportions for a design system [16][10][7].
"""

def load_characters():
    if not os.path.exists(DATA_JSON_PATH):
        print(f"Error: Single Source of Truth not found at {DATA_JSON_PATH}")
        return []
    with open(DATA_JSON_PATH, 'r', encoding='utf-8') as f:
        data = json.load(f)
    return data.get('characters', [])

def _has_transparency(img):
    return img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info)

def generate_prompts():
    characters = load_characters()
    os.makedirs(os.path.dirname(MIDJOURNEY_PROMPTS_TXT), exist_ok=True)
    
    with open(MIDJOURNEY_PROMPTS_TXT, mode='w', encoding='utf-8') as outfile:
        for char in characters:
            prompt = PROMPT_GENERATOR.format(
                name=char.get('name', ''),
                role=char.get('role', ''),
                description=char.get('description', ''),
                themeColor=char.get('themeColor', ''),
                gender=char.get('gender', '')
            ).strip()
            outfile.write(f"--- Prompt for {char.get('name', '')} ---\n")
            outfile.write(prompt)
            outfile.write('\n\n\n')
            
    print(f"✓ Midjourney prompts generated successfully in {MIDJOURNEY_PROMPTS_TXT}")

def compress_icons(max_width=800, max_height=800, quality=85, target_size_kb=100):
    characters = load_characters()
    os.makedirs(PUBLIC_ICONS_DIR, exist_ok=True)
    
    # We only compress characters that are in the SSOT
    processed = 0
    for char in characters:
        char_id = char.get('id')
        filename = f"{char_id}.png"
        source_path = os.path.join(RAW_ICONS_DIR, filename)
        dest_path = os.path.join(PUBLIC_ICONS_DIR, filename)
        
        if not os.path.exists(source_path):
            continue
            
        try:
            with Image.open(source_path) as img:
                original_size = os.path.getsize(source_path)
                if img.width > max_width or img.height > max_height:
                    img.thumbnail((max_width, max_height), Image.Resampling.LANCZOS)
                
                best_img, best_size, best_format = None, float('inf'), None
                
                if img.mode in ('RGBA', 'LA', 'P'):
                    png_img = img.convert('RGBA')
                else:
                    png_img = img.convert('RGB')
                
                temp_png = dest_path.replace('.png', '_temp.png')
                png_img.save(temp_png, 'PNG', optimize=True, compress_level=9)
                png_size = os.path.getsize(temp_png)
                
                if png_size < best_size:
                    best_size = png_size
                    best_img = temp_png
                    best_format = 'PNG'
                
                if img.mode != 'RGBA' or not _has_transparency(img):
                    rgb_img = img.convert('RGB')
                    temp_jpg = dest_path.replace('.png', '_temp.jpg')
                    rgb_img.save(temp_jpg, 'JPEG', quality=quality, optimize=True)
                    jpg_size = os.path.getsize(temp_jpg)
                    if jpg_size < best_size:
                        if best_img and best_img != temp_jpg: os.remove(best_img)
                        best_size = jpg_size
                        best_img = temp_jpg
                        best_format = 'JPEG'
                    else:
                        os.remove(temp_jpg)
                
                if best_img:
                    final_dest = dest_path.replace('.png', '.jpg') if best_format.startswith('JPEG') else dest_path
                    os.rename(best_img, final_dest)
                    for temp_file in [temp_png]:
                        if os.path.exists(temp_file) and temp_file != final_dest:
                            os.remove(temp_file)
                    
                    final_size = os.path.getsize(final_dest)
                    reduction = (1 - final_size / original_size) * 100
                    print(f"✓ {filename} → {original_size:,}b to {final_size:,}b ({reduction:.1f}% reduction) [{best_format}]")
                    processed += 1
                else:
                    print(f"✗ Failed to compress {filename}")
        except Exception as e:
            print(f"✗ Error processing {filename}: {str(e)}")
            
    print(f"✓ Compressed {processed} icons successfully.")

def status():
    characters = load_characters()
    print("===============================================")
    print("🤖 AIPEDIA ASSISTANTS - STATUS (SSOT SYNC)")
    print("===============================================\n")
    
    all_good = True
    for char in characters:
        char_id = char.get('id')
        name = char.get('name')
        print(f"[{name}]")
        
        # Check raw icon
        raw_icon = os.path.join(RAW_ICONS_DIR, f"{char_id}.png")
        if os.path.exists(raw_icon):
            print("  ✓ Raw Icon found")
        else:
            print("  ✗ Raw Icon MISSING")
            all_good = False
            
        # Check public compressed icon
        public_icon = os.path.join(PUBLIC_ICONS_DIR, f"{char_id}.png")
        if os.path.exists(public_icon):
            print("  ✓ Compressed Icon found in web public")
        else:
            print("  ✗ Compressed Icon MISSING in web public")
            all_good = False
            
        # Check system prompt
        sys_prompt = os.path.join(SYSTEM_PROMPTS_DIR, f"{char_id}.txt")
        if os.path.exists(sys_prompt):
            print("  ✓ System Prompt (.txt) found")
        else:
            print("  ✗ System Prompt MISSING")
            all_good = False
            
        print("")
        
    if all_good:
        print("✅ ALL SYNCED: All characters in characters.json have full assets & prompts!")
    else:
        print("⚠️ ACTION REQUIRED: Some assets or prompts are missing.")

def sync_csv_to_json():
    """Reads variables.csv and updates characters.json"""
    if not os.path.exists(CSV_PATH):
        print(f"Error: CSV not found at {CSV_PATH}")
        return
        
    with open(CSV_PATH, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        new_chars = []
        for row in reader:
            char = {
                "id": row.get('id', '').strip(),
                "name": row.get('name', '').strip(),
                "role": row.get('role', '').strip(),
                "themeColor": row.get('themeColor', '').strip(),
                "gender": row.get('gender', '').strip(),
                "image": f"/character/{row.get('id', '').strip()}.png",
                "description": row.get('description', '').strip(),
                "examplePrompt": row.get('examplePrompt', '').strip(),
                "category": row.get('category', '').strip(),
                "price": row.get('price', '').strip()
            }
            new_chars.append(char)
            
    if not os.path.exists(DATA_JSON_PATH):
        print(f"Error: JSON not found at {DATA_JSON_PATH}")
        return
        
    with open(DATA_JSON_PATH, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    data['characters'] = new_chars
    
    with open(DATA_JSON_PATH, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2)
        
    print(f"✓ Synced {len(new_chars)} characters from CSV to JSON successfully!")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Aipedia Assistant Manager")
    subparsers = parser.add_subparsers(dest='command', help='Available commands')
    
    subparsers.add_parser('status', help='Check sync status between SSOT and files')
    subparsers.add_parser('generate-prompts', help='Generate Midjourney prompts based on SSOT')
    subparsers.add_parser('compress-icons', help='Compress raw icons to web public folder')
    subparsers.add_parser('sync-csv', help='Update characters.json from variables.csv')
    
    args = parser.parse_args()
    
    if args.command == 'status':
        status()
    elif args.command == 'generate-prompts':
        generate_prompts()
    elif args.command == 'compress-icons':
        compress_icons()
    elif args.command == 'sync-csv':
        sync_csv_to_json()
    else:
        parser.print_help()
