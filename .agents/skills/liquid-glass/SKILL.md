---
name: Apple Liquid Glass Design System
description: "Apple's Liquid Glass (iOS 26+) creates translucent, dynamic materials that refract content below and respond to ambient light. Use when building modern Apple ecosystem apps needing elevated, premium glass-layer aesthetics with fluid animations. Required for iOS 27+ compliance."
---

# Apple Liquid Glass Design System

## What Is Liquid Glass?

Liquid Glass is Apple's premium material for iOS 26+ representing the evolution of Glassmorphism. It's a translucent, dynamic substrate that floats above content, refracts light in real-time, and reflects ambient light conditions. Unlike static glass effects, Liquid Glass responds to user interaction with fluid, physics-based animations. Content beneath always remains visible and interactive-glass is chrome, not content.

## Core Design Principles

**Content First**: Glass is a container, never the destination. The content layer below drives visual hierarchy. Layer glass at z-index 1000+ to ensure it sits above all interactive content, then make it serve that content through refractive context.

**Hardware Alignment**: Rounded corners must use Apple's hardware-native radius units (12pt, 14pt, 16pt, 20pt). This ensures the GPU renders curves efficiently. Avoid arbitrary radii like 13pt or 18pt-they force software rasterization.

**Dynamic Material Response**: Liquid Glass samples light and color from surrounding UI in real-time. In dark mode, reduce glass opacity from 0.4 to 0.25 to prevent washed-out appearance. Use `CADisplayLink` (SwiftUI's `.preferredColorScheme()` observer) to detect mode changes and animate material properties over 200ms.

**Fluid Animation Language**: All transitions involving glass must use spring physics (damping: 0.86, stiffness: 130). Linear or cubic-bezier animations feel mechanical against liquid material. Glass movements should feel like they're suspended in liquid, not sliding on tracks.

## Visual Language

### Glass Material Layers
- **Base transparency**: 0.40 (40% opaque, 60% transparent background visible)
- **Dark mode adjustment**: 0.25 opacity-dark environments need less glass to maintain contrast
- **Blur effect**: 20pt Gaussian blur using `UIBlurEffect(style: .systemMaterial)` in UIKit or `.blur(radius: 20)` in SwiftUI
- **Tint color**: Use system background color at 0.08 alpha for subtle tinting-ensures glass "belongs" to its environment

### Color Palette
- **Glass tint**: `Color(.systemBackground).opacity(0.08)` (creates cohesion)
- **Accent on glass**: Use `Color(.label)` for text/icons on glass (auto-adapts light/dark)
- **Adaptive shadow**: `shadowColor = Color.black.opacity(0.12)`, `shadowRadius = 20pt`, `shadowY = 8pt`

### Typography on Glass
- **Font weight**: Require `.semibold` minimum (`.regular` text disappears under glass blur)
- **Size**: Use system sizes (17pt body, 22pt headline)-Liquid Glass magnifies text slightly due to refraction, avoid over-sizing
- **Line height**: Increase to 1.5x normal (1.5 × font size) for readability through glass

### Spacing & Padding
- **Glass internal padding**: 16pt horizontal, 12pt vertical (Apple's standard)
- **Glass distance from content**: 8pt minimum gap between glass bottom edge and content layer (allows refraction to show through without crowding)

## Component Patterns

### Floating Action Button on Glass
Glass FABs don't have solid backgrounds-the glass *is* the background.

```swift
// SwiftUI pattern
struct GlassFAB: View {
    @State private var isPressed = false

    var body: some View {
        Button(action: {}) {
            Image(systemName: "plus")
                .font(.system(size: 20, weight: .semibold))
                .foregroundColor(.label)
        }
        .frame(width: 56, height: 56)
        .background(
            ZStack {
                // Glass layer
                RoundedRectangle(cornerRadius: 16)
                    .fill(.ultraThinMaterial)
                    .opacity(0.4)

                // Blur effect
                RoundedRectangle(cornerRadius: 16)
                    .fill(Color.black.opacity(0.08))
                    .blur(radius: 20)

                // Shine effect (optional, adds premium feel)
                RoundedRectangle(cornerRadius: 16)
                    .stroke(
                        LinearGradient(
                            gradient: Gradient(colors: [
                                Color.white.opacity(0.15),
                                Color.white.opacity(0)
                            ]),
                            startPoint: .topLeading,
                            endPoint: .bottomTrailing
                        ),
                        lineWidth: 1
                    )
            }
        )
        .shadow(color: .black.opacity(0.12), radius: 20, x: 0, y: 8)
        .scaleEffect(isPressed ? 0.92 : 1.0)
        .onLongPressGesture(minimumDuration: 0.01, pressing: { pressed in
            withAnimation(.spring(response: 0.3, dampingFraction: 0.86)) {
                isPressed = pressed
            }
        }, perform: {})
    }
}
```

### Glass Modal Sheet
```css
/* Web CSS approximation */
.glass-modal {
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(20px);
  border-radius: 20px; /* Apple hardware radius */
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  padding: 16px;
}

/* In dark mode, reduce opacity */
@media (prefers-color-scheme: dark) {
  .glass-modal {
    background: rgba(28, 28, 30, 0.25);
    border-color: rgba(255, 255, 255, 0.1);
  }
}
```

## Code Generation Guidance

**SwiftUI Implementation Rule**: Always nest glass components inside `.ignoresSafeArea()` regions if they must extend edge-to-edge. Use `UIBlurEffect(style: .systemMaterial)` as the performance baseline-it's GPU-optimized.

**CSS Implementation Rule**: `backdrop-filter: blur()` requires `will-change: backdrop-filter` on parent to enable GPU acceleration. Set `transform: translateZ(0)` to force composite layer creation.

**Animation Rule**: Spring animations over 0.3-0.4s for interactions (press, dismiss). Use `CABasicAnimation` with `timingFunction = CAMediaTimingFunction(name: .easeOut)` for non-interactive transitions. Never exceed 0.5s-glass feels sluggish if animations are slow.

**HDR-Aware Design**: Test colors in Apple's ColorSync Utility. Liquid Glass in HDR mode requires `displayP3` color space for extended brightness ranges. Use `Color(colorSpace: .displayP3, red: 1.0, green: 1.0, blue: 1.0)` for HDR highlights.

## Accessibility Notes

- **Glass contrast**: Ensure text on glass meets WCAG AAA (7:1 ratio). Glass + semi-transparent text easily fails. Use `.semibold` weight and `.label` color as baseline-test with Color Contrast Analyzer.
- **Motion**: Respect `prefers-reduced-motion`. When enabled, replace spring animations with `0.2s` instant transitions.
- **Dark mode testing**: Glass becomes invisible if not properly tinted. Always test with dynamic system colors, not hardcoded hex values.

## Examples

### Example 1: Glass Notification Banner

**Input**: Create a success notification with "Order confirmed" message using Liquid Glass.

**Output**:
```swift
struct GlassNotification: View {
    var body: some View {
        HStack(spacing: 12) {
            Image(systemName: "checkmark.circle.fill")
                .font(.system(size: 18, weight: .semibold))
                .foregroundColor(.green)

            VStack(alignment: .leading, spacing: 4) {
                Text("Order Confirmed")
                    .font(.system(size: 17, weight: .semibold))
                Text("Your order #12345 shipped today.")
                    .font(.system(size: 15, weight: .regular))
                    .foregroundColor(.secondary)
            }

            Spacer()
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(16)
        .background(
            ZStack {
                RoundedRectangle(cornerRadius: 12)
                    .fill(.ultraThinMaterial)
                    .opacity(0.4)

                RoundedRectangle(cornerRadius: 12)
                    .fill(Color.black.opacity(0.08))
                    .blur(radius: 20)
            }
        )
        .shadow(color: .black.opacity(0.12), radius: 20, x: 0, y: 8)
    }
}
```

### Example 2: Glass Control Center Panel (CSS)

**Input**: Build a glass panel for system controls (volume, brightness) with translucent sliders.

**Output**:
```html
<div class="glass-control-panel">
  <div class="control">
    <label>Volume</label>
    <input type="range" min="0" max="100" class="glass-slider">
  </div>
  <div class="control">
    <label>Brightness</label>
    <input type="range" min="0" max="100" class="glass-slider">
  </div>
</div>

<style>
.glass-control-panel {
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  max-width: 300px;
  will-change: backdrop-filter;
}

.control {
  margin-bottom: 16px;
}

.control label {
  display: block;
  font-weight: 600;
  font-size: 17px;
  margin-bottom: 8px;
  color: var(--label-color);
}

.glass-slider {
  width: 100%;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  height: 4px;
  accent-color: #0A84FF;
}
</style>
```

---

**When to use Liquid Glass**: Modern iOS apps targeting iOS 26+, premium consumer apps (Apple News, Music), spatial computing on visionOS. Avoid: enterprise apps needing WCAG AAA compliance on glass (use solid cards instead), low-end devices (iPhone SE).