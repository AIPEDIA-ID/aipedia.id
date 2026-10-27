# Apple HIG Quick Reference & Cheat Sheet

This quick reference provides exact values, tokens, and CSS snippets based on Apple's Human Interface Guidelines.

## 1. System Colors (Hex & Roles)

### Light Theme Surfaces & Text
```css
/* Backgrounds */
--apple-bg-base: #f5f5f7;        /* System Canvas */
--apple-bg-card: #ffffff;        /* Primary Card / Table View */
--apple-bg-inset: #e8e8ed;       /* Inset / Control Fill */
--apple-bg-secondary: #fbfbfd;   /* Subtle Alternate */

/* Labels */
--apple-label-primary: #1d1d1f;   /* Titles & Main Content */
--apple-label-secondary: #6e6e73; /* Captions & Subtitles */
--apple-label-tertiary: #86868b;  /* Placeholders & Metadata */
--apple-label-quaternary: #d2d2d7;/* Hairlines & Dividers */

/* System Accents */
--apple-blue: #0071e3;           /* Apple Accent Blue */
--apple-blue-hover: #0077ed;
--apple-green: #34c759;
--apple-red: #ff3b30;
--apple-orange: #ff9500;
--apple-purple: #af52de;
```

---

## 2. CSS Utility Snippets

### Apple Glass Header (Translucent Blur)
```css
.apple-glass {
  background-color: rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}
```

### Apple Card (Grouped Inset)
```css
.apple-card {
  background-color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 14px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04), 0 4px 12px rgba(0, 0, 0, 0.02);
  transition: transform 0.2s cubic-bezier(0.25, 0.1, 0.25, 1),
              box-shadow 0.2s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.apple-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.04), 0 12px 24px rgba(0, 0, 0, 0.06);
}
```

### Apple Button Primary
```css
.apple-btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.2;
  padding: 8px 16px;
  border-radius: 9999px; /* or 10px */
  background-color: #0071e3;
  color: #ffffff;
  border: none;
  cursor: pointer;
  transition: background-color 0.15s ease, transform 0.1s ease;
}

.apple-btn-primary:hover {
  background-color: #0077ed;
}

.apple-btn-primary:active {
  background-color: #0062c4;
  transform: scale(0.98);
}
```

### Apple Sidebar Nav Item
```css
.apple-sidebar-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #1d1d1f;
  text-decoration: none;
  transition: background-color 0.15s ease, color 0.15s ease;
}

.apple-sidebar-link:hover {
  background-color: rgba(0, 0, 0, 0.04);
}

.apple-sidebar-link.active {
  background-color: rgba(0, 113, 227, 0.12);
  color: #0071e3;
  font-weight: 600;
}
```
