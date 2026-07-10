#!/usr/bin/env python3

import os
import json
import argparse
import copy
from PIL import Image

# ==========================================
# PATH CONFIGURATION
# ==========================================
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(SCRIPT_DIR)
AGENTS_DIR = os.path.join(PROJECT_ROOT, ".docs")

# MASTER DATABASE (SSOT)
DATA_JSON_PATH = os.path.join(AGENTS_DIR, "database", "assistants.json")

# TARGET OUTPUTS
WEB_JSON_PATH = os.path.join(PROJECT_ROOT, "src", "data", "characters.json")
RAW_ICONS_DIR = os.path.join(AGENTS_DIR, "assets", "raw_icons")
PUBLIC_ICONS_DIR = os.path.join(PROJECT_ROOT, "public", "character")
SYSTEM_PROMPTS_DIR = os.path.join(AGENTS_DIR, "prompts", "system")
VISUAL_PROMPTS_TXT = os.path.join(AGENTS_DIR, "prompts", "character_image_prompts.txt")

# ==========================================
# PROMPT TEMPLATE
# ==========================================
PROMPT_GENERATOR = """
Create a matte-glossy, chibi 3D robot mascot named "{name}", infer gender expression as "{gender}" and persona from the name; keep it friendly, competent, and trustworthy for an AI Employee Assistant brand used in tools like "{role}".
Primary theme color = {themeColor} (hex); apply as dominant body panels, trims, and accents with neutral complements (charcoal gray, slate, white) for contrast and accessibility.
Design: rounded shapes, soft bevels, face as black matte frosted glass display with cyan glow eyes, welcoming open-arm pose, clean silhouette readable at small sizes (icon usage).
Accessories driven by '{description}': but keep simple, add optional tools/props, UI glyphs, or wearables that communicate the role without text (e.g., analytics icons, dashboards, checklists), but keep minimalist and brand-safe.
Background/output: isolated subject on transparent background, export as PNG RGBA with real alpha channel; no backdrop, no floor, no drop shadow, no watermark, no text, no logo.
Lighting/render: studio softbox reflections, subtle rim light, high dynamic range look, crisp edges, 4k detail; avoid noisy patterns that break alpha edges, matte reflections.
Framing: centered, full-body, slight 3/4 angle, ample padding for cropping into square/round app icons.
If the model cannot output native transparency, generate on solid white or green and prepare clean matting for downstream background removal (keep hard separation from background).
Style constraints: no weapons, no text, no letters, no background scenes; focus on a reusable, modular mascot asset with consistent proportions for a design system.
"""

def load_database():
    if not os.path.exists(DATA_JSON_PATH):
        print(f"Error: Master Database (SSOT) not found at {DATA_JSON_PATH}")
        return {}
    with open(DATA_JSON_PATH, 'r', encoding='utf-8') as f:
        data = json.load(f)
    return data

def load_characters():
    data = load_database()
    return data.get('characters', [])

def _has_transparency(img):
    return img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info)

def generate_visual_prompts():
    characters = load_characters()
    os.makedirs(os.path.dirname(VISUAL_PROMPTS_TXT), exist_ok=True)
    
    with open(VISUAL_PROMPTS_TXT, mode='w', encoding='utf-8') as outfile:
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
            
    print(f"✓ Visual prompts generated successfully in {VISUAL_PROMPTS_TXT}")

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
        # Just check index.md instead since we moved to 1 file, or keep it if individual files exist
        # We'll skip individual txt check for now since we use index.md
            
        print("")
        
    if all_good:
        print("✅ ALL SYNCED: All characters in database have full assets!")
    else:
        print("⚠️ ACTION REQUIRED: Some assets are missing.")

def generate_web():
    """Query A: Generates compiled JSON for Astro Website (public data only)"""
    db_data = load_database()
    if not db_data: return
    
    web_data = copy.deepcopy(db_data)
    web_chars = []
    
    for char in web_data.get('characters', []):
        web_char = copy.deepcopy(char)
        # EXCLUDING link and conversationStarters for privacy
        web_char.pop('link', None)
        web_char.pop('conversationStarters', None)
        web_chars.append(web_char)
        
    web_data['characters'] = web_chars
    
    os.makedirs(os.path.dirname(WEB_JSON_PATH), exist_ok=True)
    with open(WEB_JSON_PATH, 'w', encoding='utf-8') as f:
        json.dump(web_data, f, indent=2)
        
    print(f"✓ Generated Web Compiled Output (Filtered): {WEB_JSON_PATH}")

def generate_docs():
    """Query B & C: Generates ASISTANT.md and prompts/system/index.md"""
    characters = load_characters()
    os.makedirs(AGENTS_DIR, exist_ok=True)
    os.makedirs(SYSTEM_PROMPTS_DIR, exist_ok=True)
    
    # Query B: Generate ASISTANT.md
    assistant_md_path = os.path.join(AGENTS_DIR, "ASISTANT.md")
    with open(assistant_md_path, 'w', encoding='utf-8') as f:
        f.write("# List of Assistant\n\n")
        f.write("Pilih asisten AI spesialis yang sesuai dengan kebutuhan bisnis dan marketing kamu.\n\n")
        for char in characters:
            name = char.get("name", "")
            role = char.get("role", "")
            desc = char.get("description", "")
            link = char.get("link", "#")
            char_id = char.get("id", "")
            
            f.write("---\n\n")
            f.write(f"### {name} — {role}\n\n")
            f.write("| | Informasi Asisten |\n")
            f.write("|:---:|:---|\n")
            f.write(f'| <img src="../public/character/{char_id}.png" width="100"> | {desc}<br><br>**[🔗 Akses Asisten]({link})** |\n\n')
            
    print(f"✓ Generated Product Markdown: {assistant_md_path}")
    
    # Query C: Generate prompts/system/index.md
    prompts_index_path = os.path.join(SYSTEM_PROMPTS_DIR, "index.md")
    with open(prompts_index_path, 'w', encoding='utf-8') as f:
        f.write("# Conversation Starter in Custom GPT\n\n")
        f.write("Usually, there are 3 conversation related with Custom GPT:\n")
        f.write("1. Use Bahasa Indonesia\n")
        f.write("2. Must be related with assistant domain\n\n")
        
        for char in characters:
            name = char.get("name", "")
            role = char.get("role", "")
            desc = char.get("description", "")
            
            f.write("---\n\n")
            f.write(f"# {name} - {role}\n")
            f.write(f"{desc}\n")
            
            starters = char.get("conversationStarters", [])
            for i, starter in enumerate(starters, start=1):
                f.write(f"{i}. {starter}\n")
            f.write("\n")
            
        f.write("---\n\n")
        f.write("Setup CustomGPT\n")
        for char in characters:
            f.write(f"[x] {char.get('id', '')}\n")
            
    print(f"✓ Generated Prompt Index: {prompts_index_path}")

def generate_all():
    generate_web()
    generate_docs()
    generate_visual_prompts()
    print("✅ All artifacts generated successfully from SSOT!")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Aipedia Assistant Manager")
    subparsers = parser.add_subparsers(dest='command', help='Available commands')
    
    subparsers.add_parser('status', help='Check sync status between SSOT and files')
    subparsers.add_parser('generate-visual-prompts', help='Generate visual prompts based on SSOT')
    subparsers.add_parser('compress-icons', help='Compress raw icons to web public folder')
    subparsers.add_parser('generate-docs', help='Generate ASISTANT.md and index.md from SSOT')
    subparsers.add_parser('generate-web', help='Generate characters.json for Astro Website')
    subparsers.add_parser('generate-all', help='Generate ALL outputs (web, docs, prompts)')
    
    args = parser.parse_args()
    
    if args.command == 'status':
        status()
    elif args.command == 'generate-visual-prompts':
        generate_visual_prompts()
    elif args.command == 'compress-icons':
        compress_icons()
    elif args.command == 'generate-docs':
        generate_docs()
    elif args.command == 'generate-web':
        generate_web()
    elif args.command == 'generate-all':
        generate_all()
    else:
        parser.print_help()
