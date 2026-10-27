# AIPEDIA Resources (Plug & Play)

Git-native business assets. 100% portable, framework-agnostic, and zero-dependency.

---

## 1. Quick Start (Plug & Play)

Folder ini memiliki engine TypeScript mandiri di [resources/index.ts](file:///Users/aji/Projects/aipedia-hub/resources/index.ts) tanpa dependency eksternal. Copy folder ini ke project mana pun (Astro, Next.js, Express, CLI) dan panggil langsung:

```typescript
import { getAllResources, getResourceById, getCatalog, checkEntitlementAccess } from './resources/index';

const all = getAllResources(); // 100+ resources
const item = getResourceById('course/ai-for-beginners'); // id = path tanpa .md
const catalog = getCatalog(); // products & bundles dari catalog.yaml
const isAllowed = checkEntitlementAccess('course/ai-for-beginners', ['course']); // true
```

Untuk Astro Content Collections, re-export dari [resources/schema.ts](file:///Users/aji/Projects/aipedia-hub/resources/schema.ts):
```typescript
// src/content.config.ts
export { collections } from '../resources/schema';
```

---

## 2. Directory Structure & Path Rules

File path relatif terhadap `resources/` (tanpa ekstensi `.md`) adalah **Universal ID**.
Setiap sub-folder otomatis dirender sebagai kartu subkategori di UI web (`/library/[category]/[subcategory]`). Gunakan format `kebab-case`.

```
resources/
├── index.ts               # Standalone backend engine (zero-dependency)
├── schema.ts              # Zod schema & Astro collection loaders
├── catalog.yaml           # Source of truth: produk, harga & includes entitlement
│
├── course/                # Kursus terstruktur berbasis modul & video
│   └── [slug].md
│
├── prompts/               # Koleksi prompt siap pakai
│   ├── llm-prompt/        # Text prompt (ChatGPT, Claude, Gemini)
│   │   ├── belajar-dan-riset/
│   │   ├── bisnis-umkm/
│   │   ├── copywriting-marketing/
│   │   ├── customer-service-wa/
│   │   ├── konten-media-sosial/
│   │   ├── produktivitas/
│   │   └── [slug].md
│   ├── visual-prompt/     # Midjourney, Stable Diffusion, Flux (wajib visual)
│   └── custom-ai/         # Custom GPT, Claude System Prompts, AI Agents
│
├── tutorial/              # Panduan teknis & step-by-step workflow praktis
│   └── [slug].md
│
├── downloads/             # File unduhan, template, checklist (ZIP, Sheets, PDF)
│   └── resource/
│       └── [slug].md
│
└── founder-space/         # Framework, playbook, dan artikel strategis founder
    └── [slug].md
```

### Universal ID Mapping (1:1 Tanpa Mapping DB):
| File Path di Repo | Universal ID | Web Route | Entitlement / Catalog `includes` |
|---|---|---|---|
| `resources/course/ai-for-beginners.md` | `course/ai-for-beginners` | `/course/ai-for-beginners` | `- course/ai-for-beginners` |
| `resources/prompts/llm-prompt/bisnis-umkm/analisis.md` | `prompts/llm-prompt/bisnis-umkm/analisis` | `/prompts/llm-prompt/bisnis-umkm/analisis` | `- prompts/llm-prompt/bisnis-umkm` *(buka 1 folder)* |
| `resources/downloads/resource/content-calendar-2024.md` | `downloads/resource/content-calendar-2024` | `/downloads/resource/content-calendar-2024` | `- downloads/resource` |

---

## 3. Frontmatter Schemas

### Standard Resource (`llm-prompt`, `visual-prompt`, `custom-ai`, `resource`, `tutorial`, `founder-space`)
```yaml
---
title: "Analisis Pasar UMKM"
description: "Prompt riset kompetitor lokal."
category: "llm-prompt" # [llm-prompt | visual-prompt | custom-ai | resource | tutorial | founder-space]
tools: ["ChatGPT", "Claude"] # [ChatGPT | Claude | Gemini | Perplexity | Nano Banana | Generic]
topics: ["Business & Operations"] # [Marketing & Content | Business & Operations | Productivity & Admin | ...]
delivery_type: "text" # [text | link | file]
access_level: "starter" # [free | starter | pro]
thumbnail: "/images/resources/sample.webp" # Optional
prompt_preview: "You are an elite business analyst..." # WAJIB ENGLISH
steps: ["Salin prompt di atas", "Isi variabel [NAMA BISNIS]"]
tips: ["Gunakan model Claude 3.5 Sonnet untuk hasil maksimal"]
---
```

### Course (`category: "course"`)
```yaml
---
category: "course"
title: "AI untuk Pemula"
description: "Panduan dasar LLM."
access_level: "starter"
tools: ["ChatGPT"]
topics: ["Education / Learning"]
modules:
  - title: "Modul 1: Konsep LLM"
    video_url: "https://www.youtube.com/embed/xyz" # Opsional jika modul memiliki video
    sequence: 1
---
```

---

## 4. Golden Rules
1. **Language Split**: `prompt_preview` **wajib English** (akurasi LLM). Metadata (`title`, `description`, `steps`, `tips`) **wajib Bahasa Indonesia** (empati user).
2. **No DB Coupling**: Database hanya menyimpan string entitlement user (`user_id`, `resource_path`). Konten 100% di Git.
3. **No Price in Content**: Harga hanya ada di `catalog.yaml`. Resource hanya menentukan `access_level`.
