#!/usr/bin/env python3
"""
Multi-Platform Caption Generator
Formats markdown content into optimized captions for:
- Instagram (Hook + bullets + swipe CTA + hashtags)
- LinkedIn (Professional insight + discussion prompt)
- Twitter / X (Threaded tweets with character counter)
- TikTok / Reels / Shorts (Audio/visual video script with timecodes)
"""

import re

def clean_markdown(text):
    """Strip basic markdown tags for clean plain text output"""
    text = re.sub(r'\[highlight\](.*?)\[/highlight\]', r'\1', text)
    text = re.sub(r'\*\*(.*?)\*\*', r'\1', text)
    text = re.sub(r'\*(.*?)\*', r'\1', text)
    text = re.sub(r'\[(.*?)\]\(.*?\)', r'\1', text)
    return text.strip()

def generate_instagram_caption(meta, slides):
    title = meta.get("title", "")
    category = meta.get("category", "AI Tips")
    tags = meta.get("tags", ["ai", "bisnis", "produktivitas", "chatgpt"])
    cta = meta.get("cta", "Kunjungi aipedia.id untuk tools AI spesialis bisnis kamu!")
    
    # Grab hook & key points
    hook_slide = slides[0] if slides else {}
    hook_desc = hook_slide.get("desc", "") or hook_slide.get("content", "")
    
    body_points = []
    for s in slides[1:-1]:
        h2 = clean_markdown(s.get("heading", ""))
        desc = clean_markdown(s.get("desc", ""))
        if h2:
            body_points.append(f"• {h2}: {desc[:100]}..." if len(desc) > 100 else f"• {h2}: {desc}")

    points_str = "\n".join(body_points) if body_points else ""
    hashtags = " ".join([f"#{t.replace(' ', '')}" for t in tags])
    if "#aipedia" not in hashtags.lower():
        hashtags += " #aipedia #indonesiaai #digitalbusiness"

    caption = f"""🔥 {title.upper()}

{clean_markdown(hook_desc)}

Rangkuman poin penting:
{points_str}

👉 Geser slide sampai akhir untuk panduan lengkapnya!

💬 Pertanyaan untuk kamu: dari poin di atas, mana yang paling relevan dengan rutinitas kerjamu saat ini? Tulis di komentar ya!

💾 SAVE postingan ini biar gak hilang saat kamu butuh nanti.
📤 SHARE ke tim atau rekan kerjamu yang butuh tips ini.

🔗 {cta}
.
.
{hashtags}
"""
    return caption.strip()

def generate_linkedin_caption(meta, slides):
    title = meta.get("title", "")
    tags = meta.get("tags", ["AI", "Productivity", "Innovation"])
    cta = meta.get("cta", "Pelajari katalog AI Specialists untuk otomasi bisnis di aipedia.id")

    hook_slide = slides[0] if slides else {}
    hook_desc = clean_markdown(hook_slide.get("desc", "") or hook_slide.get("content", ""))

    body_points = []
    for i, s in enumerate(slides[1:-1], 1):
        h2 = clean_markdown(s.get("heading", ""))
        desc = clean_markdown(s.get("desc", ""))
        body_points.append(f"{i}. {h2}\n   {desc}")

    points_str = "\n\n".join(body_points)
    hashtags = " ".join([f"#{t.replace(' ', '')}" for t in tags[:5]])

    caption = f"""{title}

{hook_desc}

Banyak profesional menghabiskan jam demi jam untuk hal teknis yang sebetulnya bisa diotomasi. Berikut intisari kerangka kerja yang kami rangkum:

{points_str}

---
💡 Kuncinya bukan menggantikan peran manusia, tapi melipatgandakan kapabilitas kita dengan agen cerdas yang tepat.

Bagaimana pengalaman rekan-rekan di industri saat menerapkan AI dalam alur kerja sehari-hari? Mari diskusi di kolom komentar.

📌 {cta}

{hashtags}
"""
    return caption.strip()

def generate_twitter_thread(meta, slides):
    title = meta.get("title", "")
    cta = meta.get("cta", "Cek tools AI spesialis di aipedia.id")
    
    tweets = []
    total = len(slides)

    # Tweet 1: Hook
    hook_slide = slides[0] if slides else {}
    hook_desc = clean_markdown(hook_slide.get("desc", "") or hook_slide.get("content", ""))
    t1 = f"🧵 {title}\n\n{hook_desc}\n\nSebuah rangkuman alur kerja praktis (A Thread 👇) [1/{total}]"
    tweets.append(t1)

    # Middle tweets
    for idx, s in enumerate(slides[1:-1], 2):
        h2 = clean_markdown(s.get("heading", ""))
        desc = clean_markdown(s.get("desc", ""))
        bullets = s.get("bullets", [])
        
        tw = f"[{idx}/{total}] {h2}\n\n{desc}\n"
        for b in bullets:
            tw += f"\n- {clean_markdown(b)}"
        
        # Enforce tweet length safety
        if len(tw) > 270:
            tw = tw[:267] + "..."
        tweets.append(tw)

    # Final Tweet: CTA
    final_tweet = f"[{total}/{total}] Rangkuman:\n\nKalau kamu merasa thread ini bermanfaat:\n1. Follow @aipedia_id untuk insight AI & otomasi bisnis berkala\n2. Retweet tweet pertama untuk simpan & bagikan ke tim kamu!\n\n🔗 {cta}"
    tweets.append(final_tweet)

    separator = "\n\n" + ("—" * 30) + "\n\n"
    return separator.join(tweets)

def generate_video_script(meta, slides):
    title = meta.get("title", "")
    hook_slide = slides[0] if slides else {}
    hook_heading = clean_markdown(hook_slide.get("heading", title))
    hook_desc = clean_markdown(hook_slide.get("desc", ""))

    script = f"""🎬 SKRIP VIDEO VERTICAL (TikTok / Reels / Shorts)
Judul: {title}
Durasi Estimasi: 50 - 60 Detik

[00:00 - 00:03] 🔥 HOOK (Visual & Verbal)
• Visual: Tunjukkan layar / ekspresi bingung dengan teks besar di layar: "{hook_heading}"
• Voiceover (Lantang): "Stop buang-buang waktu kerja manual! Ini cara cerdas kelola alur kerja kamu..."

[00:03 - 00:15] 📌 PROBLEM & SET-UP
• Visual: Layar desktop yang penuh tab atau tumpukan spreadsheet.
• Voiceover: "{hook_desc[:120]}"

[00:15 - 00:45] ⚡ CORE POINTS (To-the-point)
"""
    for i, s in enumerate(slides[1:-1], 1):
        h2 = clean_markdown(s.get("heading", ""))
        desc = clean_markdown(s.get("desc", ""))
        script += f"""• Point {i} ({h2}):
  - Visual: Screen record aksi / infografis slide {i+1}.
  - Voiceover: "Pertama/Berikutnya, {h2}. {desc[:100]}."

"""

    script += """[00:45 - 00:60] 🎯 CALL TO ACTION (CTA)
• Visual: Buka browser ke website aipedia.id atau tunjukkan tombol Save.
• Voiceover: "Simpan video ini biar kamu gak lupa, dan cek link di bio buat coba AI asisten spesialis langsung!"
"""
    return script

def format_all_captions(meta, slides):
    ig = generate_instagram_caption(meta, slides)
    li = generate_linkedin_caption(meta, slides)
    tw = generate_twitter_thread(meta, slides)
    vo = generate_video_script(meta, slides)

    output = f"""# 📝 Multi-Platform Captions & Video Script
**Konten**: {meta.get('title', 'Carousel Content')}  
**Kategori**: {meta.get('category', 'AI / Bisnis')}

---

## 📸 1. Instagram Caption
```text
{ig}
```

---

## 💼 2. LinkedIn Post
```text
{li}
```

---

## 🐦 3. Twitter / X Thread
```text
{tw}
```

---

## 🎥 4. TikTok / Reels / Shorts Script
```text
{vo}
```
"""
    return output
