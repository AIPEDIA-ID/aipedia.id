# AIPEDIA Design System & Style Guidelines (`styles.md`)

> **Scope**: Standardized Design, Typography, Color Palette, Spacing, and UI Component guidelines for all AIPEDIA.id landing pages & components.
> **Objective**: Ensure visual consistency across all pages (e.g., `index.astro`, `tira.astro`, `mita.astro`, `fina.astro`, `privacy-policy.astro`) and establish a foundation for scaling the Design System in the future.

---

## 1. TYPOGRAPHY SYSTEM

### 1.1 Font Family
- **Primary Font**: `Plus Jakarta Sans`, with fallback `Helvetica Neue, Helvetica, Arial, sans-serif`.
- Configured via CSS Custom Property `:root { --font-custom: "Plus Jakarta Sans", ... }` in `Layout.astro`.

### 1.2 Hierarchy & Headings
| Level | Desktop Class | Mobile Class | Font Weight | Extra Utilities | Usage Example |
|---|---|---|---|---|---|
| **H1 (Hero Title)** | `text-4xl md:text-5xl lg:text-6xl` | `text-4xl` | `font-bold` / `font-extrabold` | `leading-tight`, `tracking-tight` | Main Hero Headline |
| **H2 (Section Header)** | `text-3xl md:text-4xl` | `text-3xl` | `font-bold` | `mb-4` to `mb-6` | Main Section Heading |
| **H3 (Card / Subheader)** | `text-xl` to `text-2xl` | `text-lg` to `text-xl` | `font-semibold` / `font-bold` | `mb-2` to `mb-4` | Card / Feature Heading |
| **Body Lead / Subtitle** | `text-base md:text-lg` | `text-base` | `font-normal` | `text-gray-600 dark:text-gray-300` | Subtitle under H1/H2 |
| **Body Text (Standard)** | `text-base` or `text-sm` | `text-sm` | `font-normal` / `font-medium` | `text-gray-600 dark:text-gray-300` | Paragraphs, list items, card descriptions |
| **Small / Captions** | `text-xs` or `text-sm` | `text-xs` | `font-normal` | `text-gray-500 dark:text-gray-400` | Disclaimers, notes, timestamps |
| **Micro Badge / Tag** | `text-[9px]` or `text-xs` | `text-[9px]` | `font-bold` | `uppercase tracking-widest` | Category tags on cards |

### 1.3 Text Highlights & Gradient Text
- **Brand Default Gradient Highlight**:
  ```html
  <span class="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
    Highlighted Text
  </span>
  ```
- **Specialist Custom Gradient (e.g., TIRA Tax Specialist)**:
  ```html
  <span class="bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
    Let TIRA Handle It
  </span>
  ```

---

## 2. COLOR SYSTEM & PALETTE

### 2.1 Centralized Palette (`src/styles/theme.js`)
- **Primary Scale (Violet / Purple)**:
  - `500`: `#8b5cf6` (Main Brand Color)
  - `400`: `#a78bfa` (Light Accent Gradient / Dark Mode Highlight)
  - `600`: `#7c3aed` (Dark Accent Gradient)
  - Utility classes: `text-primary-400`, `bg-primary-500`, `from-primary-400 to-primary-600`, `border-primary-500/30`.
- **Secondary Accent Scale (Orange)**:
  - `500`: `#f97316` (Secondary Accent)
  - `400`: `#fb923c` / `600`: `#ea580c`
- **Neutral Dark / Light Scale**:
  - Light mode base: `bg-gray-50`, text `text-gray-900` / `text-gray-600`.
  - Dark mode base: `dark:bg-black`, text `dark:text-white` / `dark:text-gray-300` / `dark:text-gray-400`.

### 2.2 Semantic Colors
- **Success / Positive (Comparison / Feature Check)**:
  - Background tint: `bg-green-50 dark:bg-green-500/5`
  - Border: `border-green-200 dark:border-green-500/20`
  - Text / Icon: `text-green-700 dark:text-green-300`, `text-green-500`
- **Expense / Warning / Negative (Traditional Hiring Cost)**:
  - Background tint: `bg-red-50 dark:bg-red-500/5`
  - Border: `border-red-200 dark:border-red-500/20`
  - Text / Icon: `text-red-700 dark:text-red-300`, `text-red-500`

### 2.3 Specialist Character Theme Colors (Dynamic Theme Color)
- Each AI Specialist has a specific theme color stored in SSOT (`_docs/database/assistants.json` -> `themeColor`).
- Examples: TIRA Red (`#E53935`), FINA Yellow (`#FFD400`), MITA Pink (`#EC4899`).
- Implemented dynamically via inline CSS Variables / Styles:
  ```html
  <div style="--theme-color: ${character.themeColor};">
    <img style="border: 2px solid ${character.themeColor}60;" />
    <h3 style="color: ${character.themeColor}">${character.name}</h3>
  </div>
  ```

---

## 3. SPACING & CONTAINER SYSTEM

### 3.1 Section Vertical Padding
- **Standard Section**: `py-12 md:py-16 px-4 md:px-6 relative overflow-hidden`
- **Hero / High-Impact Section**: `py-16 md:py-24 px-4 relative overflow-hidden`
- **Compact Section**: `py-8 md:py-12 px-4`

### 3.2 Container Max-Widths (`max-w-*`)
- **Text Centered / Form / Legal**: `max-w-3xl mx-auto` (e.g., `privacy-policy.astro`, `FAQ.astro`).
- **Hero / Standard Copy**: `max-w-4xl mx-auto` (e.g., `Hero.astro`, `CTA.astro`).
- **Section Grid (Features / Characters)**: `max-w-5xl mx-auto` (e.g., `Characters.astro`, `Comparison.astro`).
- **Full Showcase / Pricing**: `max-w-6xl mx-auto` (e.g., `Pricing.astro`, `SeeInAction.astro`).

### 3.3 Grid & Gap Spacing
- **Standard Card Grid**: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
- **Compact Media Grid**: `grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4`
- **Section Header Margin Bottom**: `mb-10` to `mb-16`

---

## 4. UI COMPONENT PATTERNS

### 4.1 Buttons & Action Controls

1. **Primary CTA Button (`btn-cta`)**:
   - Defined globally in `Layout.astro` (`@layer components`):
     ```css
     .btn-cta {
       @apply bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white shadow-[0_4px_0_rgb(185,28,28),0_10px_15px_rgba(239,68,68,0.3)] active:shadow-[0_0px_0_rgb(185,28,28),0_0px_0px_rgba(239,68,68,0)] active:translate-y-[4px] transition-all duration-150;
     }
     ```
   - Class usage in HTML:
     ```html
     <a href="#pricing" class="btn-cta group inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 font-semibold rounded-xl">
       Get Access Now
     </a>
     ```

2. **Secondary Glass Button**:
   ```html
   <a href="#features" class="inline-flex items-center gap-2 px-6 py-3 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-gray-900 dark:text-white font-medium rounded-lg border border-black/10 dark:border-white/20 hover:border-black/20 dark:hover:border-white/30 transition-all duration-200 backdrop-blur-sm hover:border-primary-500/30">
     Explore Features
   </a>
   ```

### 4.2 Badges & Pills

1. **Hero Top Indicator Badge**:
   ```html
   <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/5 dark:bg-white/5 backdrop-blur-sm border border-black/10 dark:border-white/10 mb-4">
     <span class="w-2 h-2 bg-primary-400 rounded-full animate-pulse"></span>
     <span class="text-sm text-gray-600 dark:text-gray-300">17+ AI Specialists Ready</span>
   </div>
   ```

2. **Popular Tag / Pricing Ribbon**:
   ```html
   <div class="absolute top-3 right-3 px-3 py-1.5 bg-gradient-to-r from-primary-400 to-primary-600 text-white text-xs font-bold rounded-full animate-pulse-subtle">
     Best Value
   </div>
   ```

### 4.3 Cards & Glassmorphism Surfaces

1. **Standard Glass Card**:
   ```html
   <div class="p-4 md:p-6 rounded-xl bg-white/60 dark:bg-white/5 backdrop-blur-sm border border-gray-200 dark:border-white/10 hover:border-primary-500/30 dark:hover:border-primary-500/30 transition-all duration-300">
     <!-- Card Content -->
   </div>
   ```

2. **Animated Rotating Glassy Border Card**:
   - Used for highlighting key cards in Hero / CTA.
   - Utilizes CSS Custom Property `@property --angle` with `animation: rotate 8s linear infinite`.
   - CSS Pattern:
     ```css
     .glassy-border::before {
       content: "";
       position: absolute;
       inset: 0;
       border-radius: inherit;
       padding: 2px;
       background: linear-gradient(var(--angle, 0deg), rgba(255, 255, 255, 0.05), rgba(139, 92, 246, 0.3), rgba(255, 255, 255, 0.1), rgba(139, 92, 246, 0.2));
       -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
       -webkit-mask-composite: xor;
       mask-composite: exclude;
       pointer-events: none;
       animation: rotate 8s linear infinite;
     }
     ```

### 4.4 Background Glow Orbs & Gradient Backgrounds

- Standard Section Background:
  ```html
  <div class="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/50 dark:from-gray-900 dark:via-black dark:to-gray-900"></div>
  ```
- Ambient Glowing Circles (Blobs):
  ```html
  <!-- Top Left Glow -->
  <div class="absolute top-20 left-10 w-64 h-64 bg-primary-500/10 rounded-full blur-[100px] animate-pulse-slow"></div>
  <!-- Bottom Right Glow -->
  <div class="absolute bottom-20 right-10 w-80 h-80 bg-primary-400/5 rounded-full blur-[120px] animate-float"></div>
  ```

### 4.5 Icons & Feature Boxes
- **Icon Box Container**:
  ```html
  <div class="w-10 h-10 rounded-lg flex items-center justify-center border border-primary-300 dark:border-primary-500/30 bg-primary-50 dark:bg-primary-500/10">
    <svg class="w-5 h-5 text-primary-500 dark:text-primary-400">...</svg>
  </div>
  ```

---

## 5. DESIGN SYSTEM SCALABILITY & RECOMMENDATIONS

1. **Reusability / Tokenization**:
   - When constructing new components or specialist landing pages, always utilize the standardized `primary-*`, `accent-*` color tokens and utility classes specified in this document.
2. **High-Contrast Dark Mode Enforcement**:
   - Avoid using `text-gray-500` for long paragraph text in dark mode. Always use high-contrast combinations like `text-gray-600 dark:text-gray-300` to ensure optimal sales readability.
3. **Prevent Hardcoding Component Data**:
   - In accordance with the Golden Rule in `AGENTS.md`, all component text, list items, character colors, and pricing MUST be ingested directly from generated JSON files (`src/data/*.json`) synchronized from the SSOT (`_docs/database/assistants.json`).
