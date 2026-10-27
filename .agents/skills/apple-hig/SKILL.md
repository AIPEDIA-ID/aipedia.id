---
name: apple-hig
description: Apple Human Interface Guidelines (HIG) specification and design system skill for web and app development. Use this skill whenever designing, styling, reviewing, or developing interfaces following authentic Apple design principles, typography, colors, layout, materials, and interactions.
---

# Apple Human Interface Guidelines (HIG) Design System Skill

This skill defines the definitive, authentic implementation of Apple's Human Interface Guidelines (HIG) for web applications and user interfaces.

---

## 1. Core Principles (Apple Design Philosophy)

Apple interface design is built on three fundamental design pillars:

1. **Clarity (Kejelasan):**
   - Text is legible at every size.
   - Icons are precise and lucid.
   - Adornments are subtle and appropriate.
   - A heightened focus on functionality motivates every design decision.
   - Negative space, typography, color, and materials subtly highlight important content and convey interactive affordance.

2. **Deference (Mengutamakan Konten):**
   - Fluid motion and a crisp, beautiful interface help people understand and interact with the content, without ever competing with it.
   - Content fills the screen, while translucency and blur (vibrancy) hint at more.
   - Minimal use of bezels, heavy borders, and thick shadows ensures the content remains the primary focus.

3. **Depth (Kedalaman Berlapis):**
   - Distinct visual layers and realistic motion impart vitality and heighten users' understanding of hierarchy.
   - Touch and discoverability heighten delight and facilitate access to functionality and additional content without losing context.

---

## 2. Color System & Semantic Palette

### Light Theme (Default & Primary Standard)
All interfaces must be **Light theme by default** with a clean, high-contrast, distraction-free environment.

| Token / Role | Hex Value | Usage / Description |
| :--- | :--- | :--- |
| **System Background (Base)** | `#F5F5F7` / `#FBFBFD` | Primary canvas background (macOS / iOS settings style) |
| **Secondary Background** | `#FFFFFF` | Grouped views, content cards, sidebars |
| **Tertiary Background** | `#E8E8ED` / `#E5E5EA` | Inset elements, search bars, pill controls |
| **Label (Primary Text)** | `#1D1D1F` | Headlines, primary text, high contrast |
| **Secondary Label** | `#6E6E73` | Subtitles, helper text, timestamps |
| **Tertiary Label** | `#86868B` | Placeholder text, disabled labels |
| **Quaternary Label** | `#A1A1A6` | Subtle separators, watermarks |
| **System Blue (Classic Aqua Accent)** | `#197BFE` / `#007AFF` | Primary action buttons, glossy tabs, active links |
| **System Blue Hover/Active** | `#1268DE` / `#0B5EC4` | Interactive pressed & bevel states |
| **System Green** | `#34C759` | Success indicators, verified badges, active states |
| **System Red** | `#FF3B30` | Destructive actions, error alerts, badges |
| **System Orange** | `#FF9500` | Warnings, intermediate highlights, star ratings |
| **System Purple** | `#AF52DE` | Featured items, AI tags, creative categories |
| **Hairline Border / Separator** | `rgba(0, 0, 0, 0.08)` or `#D2D2D7` | 0.5px to 1px hairline borders |
| **Subtle Hover Fill** | `rgba(0, 0, 0, 0.04)` | Button and row hover backgrounds |
| **Active/Pressed Fill** | `rgba(0, 0, 0, 0.08)` | Button press and list item active states |

### Dark Theme (When explicitly requested or toggled)
| Token / Role | Hex Value |
| :--- | :--- |
| **System Background** | `#000000` |
| **Secondary Background** | `#1C1C1E` |
| **Tertiary Background** | `#2C2C2E` |
| **Label (Primary Text)** | `#F5F5F7` |
| **Secondary Label** | `#86868B` |
| **System Blue** | `#2997FF` |
| **Hairline Border** | `rgba(255, 255, 255, 0.12)` |

---

## 3. Typography (San Francisco & Dynamic Type)

Apple interfaces utilize **San Francisco (SF Pro Text & SF Pro Display)** with proportional letter tracking (kerning).

### Font Stack:
```css
font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif;
```

### Type Scale & Hierarchy:
| Style | Size | Weight | Line Height | Tracking (Letter Spacing) |
| :--- | :--- | :--- | :--- | :--- |
| **Large Title** | `34px` (`2.125rem`) | Bold (`700`) | `41px` (`1.2`) | `-0.022em` |
| **Title 1** | `28px` (`1.75rem`) | Bold / Semi-bold (`700`/`600`) | `34px` (`1.22`) | `-0.021em` |
| **Title 2** | `22px` (`1.375rem`) | Semi-bold (`600`) | `28px` (`1.27`) | `-0.018em` |
| **Title 3** | `20px` (`1.25rem`) | Semi-bold (`600`) | `25px` (`1.25`) | `-0.017em` |
| **Headline** | `17px` (`1.0625rem`) | Semi-bold (`600`) | `22px` (`1.3`) | `-0.015em` |
| **Body** | `17px` (`1.0625rem`) | Regular (`400`) | `22px` (`1.3`) | `-0.015em` |
| **Callout** | `16px` (`1.0rem`) | Regular (`400`) | `21px` (`1.31`) | `-0.013em` |
| **Subheadline** | `15px` (`0.9375rem`)| Regular (`400`) | `20px` (`1.33`) | `-0.010em` |
| **Footnote** | `13px` (`0.8125rem`)| Regular / Medium (`400`/`500`) | `18px` (`1.38`) | `-0.005em` |
| **Caption 1** | `12px` (`0.75rem`) | Regular / Medium (`400`/`500`) | `16px` (`1.33`) | `0em` |
| **Caption 2** | `11px` (`0.6875rem`)| Medium (`500`) | `13px` (`1.18`) | `+0.006em` |

---

## 4. Layout, Radii, and Spacing

Apple adheres to continuous corner curves (squircle / superellipse) and consistent spacing multiples (4px / 8px).

### Corner Radii (`border-radius`):
- **Continuous Curvature:** Apple uses smoothed curves (`corner-smoothing: continuous` where supported, or balanced border radii).
- **Control / Pill Tag:** `8px` to `10px` (or `9999px` for pill search bars and chips).
- **Buttons / Inputs:** `10px` - `12px`.
- **Cards & Content Blocks:** `14px` - `16px` (e.g. `border-radius: 14px`).
- **Modals / Sheets / Large Panels:** `18px` - `22px`.

### Hairline Borders & Shadows:
- **Borders:** Thin, crisp hairline borders:
  ```css
  border: 1px solid rgba(0, 0, 0, 0.08); /* or 0.5px on high-DPI retina displays */
  ```
- **Shadows:** Never muddy or black heavy drop-shadows. Use soft, multi-layered ambient diffusion:
  ```css
  /* Apple Card Ambient Shadow */
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04), 0 4px 12px rgba(0, 0, 0, 0.03);

  /* Hover Lift Shadow */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04), 0 8px 24px rgba(0, 0, 0, 0.06);
  ```

---

## 5. Navigation & Sidebar Patterns (macOS & iPadOS Style)

### Sidebar Specification:
- **Surface:** Translucent or clean solid secondary surface (`#FFFFFF` or `rgba(245, 245, 247, 0.8)` with `backdrop-filter: blur(20px)`).
- **Divider:** Subtle right border `1px solid rgba(0, 0, 0, 0.06)`.
- **Item Heights:** Minimum 34px - 38px for desktop sidebar items, 44px on touch.
- **Item States:**
  - **Default:** Transparent background, `#1D1D1F` label, `#6E6E73` icon.
  - **Hover:** `background-color: rgba(0, 0, 0, 0.04)`.
  - **Selected / Active:**
    - Background: `rgba(0, 113, 227, 0.1)` (accent tint) or `#0071E3` with white text.
    - Text: `#0071E3` (or `#FFFFFF` if solid blue background).
    - Corner radius: `8px` - `10px`.
- **Sidebar Headers / Section Titles:**
  - Font size: `11px` - `12px`.
  - Weight: Semi-bold / Bold (`600`/`700`).
  - Text: Uppercase tracking `0.06em`, color `#86868B`.
  - Padding: `8px 12px 4px`.

### Header / Navbar:
- Compact height (`52px` - `56px`).
- Glassmorphic backdrop blur:
  ```css
  background-color: rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  ```

---

## 6. Components & Controls (Apple Standard)

### 1. Buttons
- **Filled Primary Button:**
  - Background: `#0071E3`.
  - Color: `#FFFFFF`.
  - Radius: `10px` or `9999px` (capsule).
  - Hover: `#0077ED`.
  - Transition: `all 0.15s cubic-bezier(0.25, 0.1, 0.25, 1)`.
- **Tonal / Secondary Button:**
  - Background: `rgba(0, 113, 227, 0.1)` or `#E8E8ED`.
  - Color: `#0071E3` or `#1D1D1F`.
  - Hover: `rgba(0, 113, 227, 0.15)` or `#DEDEE3`.
- **Plain / Ghost Button:**
  - Transparent background, `#0071E3` text.
  - Hover: `text-decoration: underline` or subtle pill hover.

### 2. Segmented Controls & Pills
- Background container: `#E5E5EA` or `rgba(0, 0, 0, 0.06)` with `8px` padding.
- Selected segment: `#FFFFFF` card, subtle shadow `0 1px 3px rgba(0,0,0,0.1)`, `radius: 7px`.
- Unselected segment: Transparent, color `#6E6E73`.

### 3. Cards (Grouped Inset Style)
- Background: `#FFFFFF`.
- Border: `1px solid rgba(0, 0, 0, 0.06)` to `rgba(0, 0, 0, 0.08)`.
- Radius: `14px` or `16px`.
- Padding: `16px` to `24px`.
- Content: Clear separation with 0.5px dividers (`#F0F0F2`).

### 4. Search Bar
- Pill-shaped (`border-radius: 9999px`) or `10px` rounded rect.
- Background: `#E8E8ED` or `#F0F0F4`.
- Left-aligned magnifying glass icon in `#86868B`.
- Clean clear button on right.

---

## 7. Strict Dos and Don'ts

### DO:
- **Do** prioritize Light Theme by default with crisp `#F5F5F7` system background and `#FFFFFF` cards.
- **Do** use San Francisco typography (`-apple-system`) with tight letter-spacing for headlines.
- **Do** use the standard Apple Blue `#0071E3` for interactive elements.
- **Do** use high-contrast primary text (`#1D1D1F`) and secondary labels (`#6E6E73`).
- **Do** use hairline borders (`0.5px` - `1px`) and gentle, multi-stop ambient shadows.
- **Do** keep animations quick, responsive, and spring-like (`cubic-bezier(0.25, 0.1, 0.25, 1)` or `ease-out`).

### DON'T:
- **Don't** force dark mode or pitch-black `#000000` cards unless dark mode is intentionally toggled.
- **Don't** use generic saturated colors (like raw `#0000FF` or `#FF0000`).
- **Don't** use heavy, muddy drop-shadows (e.g. `box-shadow: 0 10px 20px #000`).
- **Don't** clutter interfaces with excess borders, thick badges, or decorative fluff.
- **Don't** use non-Apple font stacks or heavy serif fonts unless for editorial pull quotes.
- **Don't** let icons overwhelm labels; icons in Apple HIG are subtle guides (monoline, 1.5px - 2px stroke, SF Symbols style).
