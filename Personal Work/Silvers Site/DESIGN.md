# Design System Specification: Silver's Site

## 1. Visual Language & Aesthetics
Silver's Site utilizes an ultra-sleek **Obsidian Platinum** design system. The system emphasizes high contrast, crisp glassmorphism (`backdrop-filter: blur(16px)`), subtle radial specular highlights, and high-frequency CSS grid dynamics.

## 2. Color Tokens & Theme Palette

### Core Palette
- `--bg-obsidian`: `#090D16` (Primary Deep Background)
- `--bg-surface-glass`: `rgba(15, 23, 42, 0.70)` (Card Glass Surface)
- `--bg-surface-elevated`: `rgba(30, 41, 59, 0.85)` (Hover / Raised Surface)
- `--border-glass`: `rgba(255, 255, 255, 0.08)` (Subtle Glass Edge)
- `--border-highlight`: `rgba(226, 232, 240, 0.25)` (Active / Hover Highlight)

### Accent & Glow Palette
- `--text-platinum`: `#F8FAFC` (Primary Headings)
- `--text-silver`: `#CBD5E1` (Body / Secondary Text)
- `--text-muted`: `#64748B` (Captions & Meta)
- `--accent-cyan`: `#38BDF8` (Tech Accent Glow)
- `--accent-indigo`: `#818CF8` (Secondary Gradient Accent)
- `--accent-emerald`: `#34D399` (Status & Active Indicator)

## 3. Typography Scale
- **Display Headings**: `'Outfit'`, sans-serif (Font weights: 600, 700, 800)
- **Body & Controls**: `'Plus Jakarta Sans'`, sans-serif (Font weights: 400, 500, 600)
- **Code & Metadata**: `'JetBrains Mono'`, monospace (Font weights: 400, 500)

### Fluid Sizes
- `display-hero`: `clamp(2.5rem, 6vw, 4.5rem)` | Line Height: 1.1 | Tracking: `-0.03em`
- `heading-1`: `clamp(1.75rem, 3.5vw, 2.5rem)` | Line Height: 1.2
- `heading-2`: `clamp(1.25rem, 2.2vw, 1.75rem)` | Line Height: 1.3
- `body-large`: `1.125rem` | Line Height: 1.6
- `body-base`: `1rem` | Line Height: 1.5
- `caption`: `0.875rem` | Line Height: 1.4

## 4. Layout & Grid Architecture
- **Max Container Width**: `1280px` (`max-w-7xl`)
- **Outer Padding**: `1.5rem` on mobile, `3rem` on desktop
- **Grid Layouts**: Auto-fit minmax responsive grids (`grid-template-columns: repeat(auto-fit, minmax(320px, 1fr))`)

## 5. Components & Micro-Interactions
- **Glassmorphic Cards**:
  - `background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)`
  - `border: 1px solid var(--border-glass)`
  - `backdrop-filter: blur(16px)`
  - `transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1)`
- **Buttons**:
  - Primary: Gradient silver background (`linear-gradient(135deg, #F8FAFC 0%, #CBD5E1 100%)`) with dark text, subtle shine on hover (`transform: translateY(-2px)`).
  - Secondary: Glass outline with cyan border glow on hover.
- **Interactive Badges & Tags**:
  - Pill shape with subtle border glow and monospace typography.

## 6. Motion & Accessibility
- Respect `prefers-reduced-motion`.
- Focus outlines use explicit `--accent-cyan` ring offset.
- Target contrast ratios strictly adhere to WCAG AA standards (4.5:1 minimum).
