#!/usr/bin/env python3
"""
Aipedia Content Generator Engine
Transforms Markdown into high-converting Carousels (HTML/PDF/PNG) and Multi-Platform Captions.
"""

import os
import sys
import re
import yaml
import argparse
from captions import format_all_captions

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
TEMPLATES_DIR = os.path.join(SCRIPT_DIR, "templates")
CONTENT_DIR = os.path.join(SCRIPT_DIR, "content")
OUTPUT_DIR = os.path.join(SCRIPT_DIR, "output")

def parse_markdown_content(file_path):
    """Parses frontmatter and slide sections from a markdown document."""
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"Content file not found: {file_path}")

    with open(file_path, "r", encoding="utf-8") as f:
        text = f.read()

    meta = {}
    content_body = text

    # Parse YAML frontmatter if present
    if text.startswith("---"):
        parts = text.split("---", 2)
        if len(parts) >= 3:
            try:
                meta = yaml.safe_load(parts[1]) or {}
                content_body = parts[2]
            except Exception as e:
                print(f"Warning: Failed to parse frontmatter: {e}")

    # Split slides by Markdown headings or horizontal rules
    raw_slides = re.split(r'\n(?=##\s+Slide\b)|(?:\n---\n)', content_body)
    slides = []

    for raw in raw_slides:
        raw = raw.strip()
        if not raw:
            continue

        slide = {
            "type": "content",
            "heading": "",
            "pill": "",
            "desc": "",
            "bullets": [],
            "tip": "",
            "cta_button": "",
        }

        lines = raw.split("\n")
        body_lines = []

        for line in lines:
            line_str = line.strip()
            if line_str.startswith("## Slide"):
                # Header line like: ## Slide 1 (Hook) or ## Slide 2
                continue
            elif line_str.startswith("# ") and not slide["heading"]:
                slide["heading"] = line_str[2:].strip()
            elif line_str.startswith("### ") and not slide["heading"]:
                slide["heading"] = line_str[4:].strip()
            elif line_str.startswith("Pill:"):
                slide["pill"] = line_str.replace("Pill:", "").strip()
            elif line_str.startswith("Type:"):
                slide["type"] = line_str.replace("Type:", "").strip().lower()
            elif line_str.startswith("Tip:"):
                slide["tip"] = line_str.replace("Tip:", "").strip()
            elif line_str.startswith("CTA:"):
                slide["cta_button"] = line_str.replace("CTA:", "").strip()
            elif line_str.startswith("- ") or line_str.startswith("* "):
                slide["bullets"].append(line_str[2:].strip())
            else:
                body_lines.append(line)

        slide["desc"] = "\n".join(body_lines).strip()
        if not slide["heading"] and body_lines:
            slide["heading"] = body_lines[0].strip()
            slide["desc"] = "\n".join(body_lines[1:]).strip()

        slides.append(slide)

    # Infer slide types if not explicitly given
    if slides:
        if slides[0]["type"] == "content":
            slides[0]["type"] = "hook"
        if len(slides) > 1 and slides[-1]["type"] == "content":
            slides[-1]["type"] = "cta"

    return meta, slides

def format_text_html(text):
    """Converts bold and gradients in markdown to HTML"""
    text = re.sub(r'\*\*(.*?)\*\*', r'<strong>\1</strong>', text)
    text = re.sub(r'\[highlight\](.*?)\[/highlight\]', r'<span class="gradient-text">\1</span>', text)
    return text.replace("\n", "<br>")

def render_slide_html(slide, index, total, meta):
    """Generates the HTML markup for a single slide."""
    slide_type = slide.get("type", "content")
    heading = format_text_html(slide.get("heading", ""))
    desc = format_text_html(slide.get("desc", ""))
    pill = slide.get("pill", meta.get("category", "TIPS BISNIS & AI"))
    tip = format_text_html(slide.get("tip", ""))
    bullets = slide.get("bullets", [])
    cta_btn = slide.get("cta_button", "Pelajari Selengkapnya di aipedia.id")

    counter_str = f"<span>{str(index).zfill(2)}</span> / {str(total).zfill(2)}"

    if slide_type == "hook":
        content_html = f"""
        <div class="slide-body slide-hook">
          <div class="hook-pill">🔥 {pill}</div>
          <h2>{heading}</h2>
          <p class="subtitle">{desc}</p>
          <div class="swipe-prompt">
            <span>Geser untuk membaca</span>
            <span class="swipe-icon">👉</span>
          </div>
        </div>
        """
    elif slide_type == "cta":
        content_html = f"""
        <div class="slide-body slide-cta">
          <div class="cta-icon">🚀</div>
          <h2>{heading or 'Siap Mengotomasi Bisnis Anda?'}</h2>
          <p class="cta-desc">{desc or 'Dapatkan akses ke 17+ AI Asisten spesialis untuk eksekusi marketing, pajak, konten, dan riset.'}</p>
          <div class="cta-button-card">
            <span>{cta_btn}</span>
            <span>→</span>
          </div>
          <div class="action-badges">
            <div class="action-badge">💾 Simpan Postingan</div>
            <div class="action-badge">🔗 Bagikan ke Tim</div>
          </div>
        </div>
        """
    else:
        # Standard content slide
        point_num = str(index).zfill(2)
        bullets_html = ""
        if bullets:
            items = "".join([f'<div class="bullet-item"><div class="bullet-dot"></div><div>{format_text_html(b)}</div></div>' for b in bullets])
            bullets_html = f'<div class="bullet-list">{items}</div>'

        tip_html = ""
        if tip:
            tip_html = f"""
            <div class="pro-tip-box">
              <div class="tip-icon">💡</div>
              <div class="tip-text"><strong>Tips Praktis:</strong> {tip}</div>
            </div>
            """

        content_html = f"""
        <div class="slide-body slide-content">
          <div class="point-badge">POIN {point_num}</div>
          <h2>{heading}</h2>
          <div class="glass-card">
            <p class="description">{desc}</p>
            {bullets_html}
          </div>
          {tip_html}
        </div>
        """

    slide_html = f"""
    <div class="slide slide-{slide_type}" id="slide-{index}">
      <div class="grid-overlay"></div>
      
      <!-- Slide Header -->
      <div class="slide-header">
        <div class="badge-category">{pill}</div>
        <div class="slide-counter">{counter_str}</div>
      </div>

      <!-- Slide Body -->
      {content_html}

      <!-- Slide Footer -->
      <div class="slide-footer">
        <div class="footer-brand">
          <div class="brand-logo-circle">A</div>
          <div>
            <div class="brand-handle">@aipedia.id</div>
            <div class="brand-sub">Katalog AI Spesialis Bisnis</div>
          </div>
        </div>
        <div class="footer-interactive">
          <div class="interactive-item"><span>❤️</span></div>
          <div class="interactive-item"><span>💬</span></div>
          <div class="interactive-item"><span>💾</span></div>
        </div>
      </div>
    </div>
    """
    return slide_html

def build_content(file_path):
    """Main build function: generates HTML carousel and multi-platform captions."""
    meta, slides = parse_markdown_content(file_path)
    total_slides = len(slides)

    title = meta.get("title", os.path.splitext(os.path.basename(file_path))[0])
    slug = re.sub(r'[^a-zA-Z0-9_\-]+', '-', title.lower()).strip('-')

    target_dir = os.path.join(OUTPUT_DIR, slug)
    os.makedirs(target_dir, exist_ok=True)

    # 1. Render HTML Carousel
    with open(os.path.join(TEMPLATES_DIR, "carousel.html"), "r", encoding="utf-8") as f:
        template = f.read()

    slides_markup = []
    for idx, slide in enumerate(slides, 1):
        slides_markup.append(render_slide_html(slide, idx, total_slides, meta))

    rendered_html = template.replace("{{TITLE}}", title).replace("{{SLIDES_HTML}}", "\n".join(slides_markup))
    html_output_path = os.path.join(target_dir, "carousel.html")
    with open(html_output_path, "w", encoding="utf-8") as f:
        f.write(rendered_html)

    # 2. Render Captions
    captions_md = format_all_captions(meta, slides)
    captions_output_path = os.path.join(target_dir, "captions.md")
    with open(captions_output_path, "w", encoding="utf-8") as f:
        f.write(captions_md)

    print("==================================================")
    print(f" ✨ Generated Carousel & Captions for: {title}")
    print("==================================================")
    print(f"📄 HTML Carousel  : {html_output_path}")
    print(f"📝 Captions Doc   : {captions_output_path}")
    print(f"📊 Total Slides   : {total_slides} slides")
    print("\n👉 Buka file HTML di browser kamu untuk melihat preview, atau klik Cetak PDF untuk ekspor!")
    return html_output_path, captions_output_path

def scaffold_new_draft(title):
    """Creates a new markdown draft template."""
    slug = re.sub(r'[^a-zA-Z0-9_\-]+', '-', title.lower()).strip('-')
    target_path = os.path.join(CONTENT_DIR, "drafts", f"{slug}.md")

    template = f"""---
title: "{title}"
category: "AI PRODUCTIVITY"
tags: ["ai", "produktivitas", "bisnis", "chatgpt"]
cta: "Coba 17+ AI Asisten spesialis bisnis di aipedia.id"
---

## Slide 1 (Hook)
Type: hook
Pill: PANDUAN PRAKTIS
# [highlight]{title}[/highlight]
Jangan habiskan waktu berjam-jam untuk kerjaan manual. Ini alur otomatisasi cepat yang bisa kamu pakai hari ini.

## Slide 2
Type: content
# 01. Riset & Analisis Pasar
Gunakan AI untuk mengekstrak sentimen pelanggan dan riset kompetitor dalam hitungan menit.
- Analisis ribuan review produk kompetitor
- Buat rangkuman pain point audiens
Tip: Gunakan prompt berbasis persona untuk hasil riset yang lebih mendalam.

## Slide 3
Type: content
# 02. Pembuatan Konten & Copywriting
Buat variasi hook iklan dan copywriting tanpa creative block.
- 5 opsi angle copywriting dalam hitungan detik
- Formula AIDA & PAS otomatis
Tip: Uji minimal 3 variasi angle sebelum menjalankan iklan berbayar.

## Slide 4
Type: content
# 03. Pengawasan Alur Kas & Pajak
Gunakan asisten kalkulator bisnis untuk pantau margin keuntungan harian.
- Hitung PPh Final UMKM instan
- Simulasi skenario cashflow bulanan

## Slide 5 (CTA)
Type: cta
# Tingkatkan Produktivitas Tim dengan AI Spesialis
Dapatkan akses ke 17 AI Assistant khusus bisnis Indonesia di AIPEDIA.
CTA: Kunjungi aipedia.id
"""
    with open(target_path, "w", encoding="utf-8") as f:
        f.write(template)

    print(f"✓ Draf konten baru berhasil dibuat di: {target_path}")
    print(f"👉 Jalankan 'python3 generator.py render {target_path}' setelah selesai mengisi teks.")
    return target_path

def main():
    parser = argparse.ArgumentParser(description="Aipedia Content & Carousel Generator")
    subparsers = parser.add_subparsers(dest="command")

    # Command: render
    render_parser = subparsers.add_parser("render", help="Render Markdown into HTML Carousel & Captions")
    render_parser.add_argument("file", help="Path to markdown content file")

    # Command: new
    new_parser = subparsers.add_parser("new", help="Scaffold a new draft content file")
    new_parser.add_argument("title", help="Title of the content")

    args = parser.parse_args()

    if args.command == "render":
        build_content(args.file)
    elif args.command == "new":
        scaffold_new_draft(args.title)
    else:
        parser.print_help()

if __name__ == "__main__":
    main()
