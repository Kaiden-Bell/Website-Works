---
name: Bell of the Ball — Botanical Ledger
description: An heirloom field-guide crossed with an accountant's precision — bottle-green and ochre-rust cut into faceted diagonal blocks, captioned in a tracked ledger-label mono.
colors:
  bottle-green: "#1f3d2e"
  ochre-rust: "#a8672a"
  parchment: "#efe6d3"
  paper-white: "#faf6ec"
  warm-ink: "#221d15"
  warm-taupe: "#7a6748"
typography:
  display:
    fontFamily: "Libre Caslon Display, Georgia, serif"
    fontSize: "clamp(4rem, 12vw, 14rem)"
    fontWeight: 500
    lineHeight: 0.85
    letterSpacing: "normal"
  headline:
    fontFamily: "Libre Caslon Display, Georgia, serif"
    fontSize: "clamp(2.5rem, 6vw, 5rem)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "normal"
  body:
    fontFamily: "Public Sans, -apple-system, sans-serif"
    fontSize: "1.1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Fragment Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.25em"
  scale:
    headline-sm: "3.5rem"
    headline-md: "4.5rem"
    headline-lg: "5rem"
    headline-feature-floor: "3rem"
    headline-feature-ceiling: "6rem"
    display-cta-ceiling: "8rem"
    body-tight: "1.15rem"
    title: "1.75rem"
    label-button: "0.85rem"
    label-nav-mobile: "1.5rem"
    label-meta: "0.9rem"
rounded:
  none: "0"
spacing:
  xs: "0.5rem"
  sm: "1rem"
  md: "2rem"
  lg: "4rem"
  xl: "10rem"
components:
  button-primary:
    backgroundColor: "{colors.ochre-rust}"
    textColor: "{colors.paper-white}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "1rem 2rem"
  button-primary-hover:
    backgroundColor: "{colors.bottle-green}"
  button-secondary:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.warm-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "1rem 2rem"
  button-secondary-hover:
    backgroundColor: "{colors.warm-ink}"
    textColor: "{colors.paper-white}"
---

# Design System: Bell of the Ball — Botanical Ledger

## Overview

**Creative North Star: "The Botanical Ledger"**

The system reads as a field naturalist's notebook run through an editorial studio: deep bottle-green and warm parchment carry the weight of a pressed-plant catalog, ochre-rust marks the one actionable color on every page, and a tracked monospace ledger-label captions everything the way a specimen card captions a leaf. Nothing is rounded — every media block, button, and hero frame is sliced by an asymmetric diagonal facet instead, so the page never settles into the soft, evenly-pastel, icon-grid rhythm the brief explicitly ruled out. Motion is a single organic ease (`cubic-bezier(0.25, 1, 0.35, 1)`) used everywhere something reveals or shifts, never a bounce or a linear snap.

This is the client-approved evolution of Direction 3 (*Dynamic Organic Avant-Garde*) from `BOTB-Prompt.md`: the layout, structure, and copy are locked from that approved build; this palette-and-type pass (`v3/b`, "Botanical Ledger") is the one the client chose to carry forward. Confirmed visual rejections carried from `PRODUCT.md`: no ASCII art or structural linework, no bright neon, no untextured stock photography, no rounded-everything, no generic icon-grid rows, no Inter/system-only stacks, no evenly-pastel or overly safe palettes.

**Key Characteristics:**
- Diagonal clip-path facets replace every corner radius and every rectangular photo crop.
- One accent color (ochre-rust) carries every actionable moment; it appears nowhere decorative.
- A tracked uppercase mono label is the system's only wayfinding device — section numbers, nav, captions.
- Flat color throughout; depth comes from overlap and multiply-blend, never a shadow.

## Colors

Warm and earthbound, weighted toward the dark end so the ochre accent reads as the page's one hot note.

### Primary
- **Ochre Rust** (`#a8672a`): the sole call-to-action color. CTA button fill, active nav-link, hover accents, the rental section's service number. Used nowhere else — its rarity is what makes "Book Consultation" findable at a glance.

### Secondary
- **Bottle Green** (`#1f3d2e`): the system's structural dark. Mobile menu fill, CTA hover state, one end of every media-placeholder gradient, the tint source for hairline borders and the rentals overlay (via `color-mix()` off this token, never a hard-coded value).

### Neutral
- **Parchment** (`#efe6d3`): main page ground (body background, services section, sidebar nav).
- **Paper White** (`#faf6ec`): the lighter alternate ground (about section, portfolio section) and CTA text color.
- **Warm Ink** (`#221d15`): primary text color for headings and body copy — a near-black ink-brown, not a true black.
- **Warm Taupe** (`#7a6748`): secondary/muted text — labels, captions, paragraph copy, footer links.

### Named Rules
**The One Accent Rule.** Ochre rust is the only color permitted on an actionable element (button, active link, hover state). If a second element on the same viewport wants ochre, it is competing with the CTA and loses.

## Typography

**Display Font:** Libre Caslon Display (with Georgia, serif fallback)
**Body Font:** Public Sans (with system sans-serif fallback)
**Label/Mono Font:** Fragment Mono (with ui-monospace fallback)

**Character:** An editorial caslon carries every heading at oversized scale — confident, slightly antique, never twee — paired with a workhorse humanist sans for reading copy and a tracked ledger-mono for structural labels. The mono is the system's only "technical" note, reserved entirely for wayfinding.

### Hierarchy
- **Display** (500, `clamp(4rem, 12vw, 14rem)`, line-height 0.85): the hero title only. Runs past the viewport edge on purpose (`margin-left: -2vw`).
- **Headline** (500, line-height 1–1.1): a stepped editorial family, not one flat size — `headline-sm` (3.5rem, `about-text h2`), `headline-md` (4.5rem, `service-text h3`), `headline-lg` (5rem, `.portfolio-title`), and a feature clamp (`clamp(3rem, 7vw, 6rem)`, the Event Design service's oversized `h3`). `.cta-title` fluidly scales `clamp(4rem, 8vw, 8rem)`, bridging Headline and Display.
- **Title** (500, `title` 1.75rem, line-height 1.2): the display face at compact scale, for repeating list/card headings that aren't full section headlines — e.g. the About page's numbered "What We Believe" principles.
- **Body** (400, line-height 1.6, ~45–65ch measure): 1.1rem is the base (`about-text p`); `body-tight` (1.15rem) is the slightly denser variant under service headings (`service-text p`). Both colored Warm Taupe.
- **Label** (400, letter-spacing 0.25em, uppercase): 0.75rem is the base — section numbers ("01. HERITAGE & SCOPE"), nav links, portfolio captions, the logo mark, the menu button. Three sized variants share its mono/tracked/uppercase treatment: `label-button` (0.85rem, the CTA buttons), `label-nav-mobile` (1.5rem, the full-screen mobile menu links), and `label-meta` (0.9rem, non-tracked, footer copyright/links). This label family is a named, brief-pinned feature of Direction 3 ("Raw Monospaced Accents") — not a generic eyebrow, and it never appears above a headline as a kicker; it stands alone as its own wayfinding element (nav, numbered section marker, photo caption).

### Named Rules
**The Ledger Label Rule.** Fragment Mono is reserved for structural wayfinding only — section numbers, nav, captions. It never appears in a heading or in body prose; the moment it does, it stops reading as a specimen tag and starts reading as a costume.

## Layout

Desktop carries a fixed 60px vertical sidebar (logo + nav, `writing-mode: vertical-rl`) with all content offset `margin-left: 60px`; at 768px the sidebar collapses into a top bar plus a full-screen overlay menu. Sections run at generous scale — `10rem 4rem` padding on desktop, dropping to `4rem 1.5rem` at 768px. The portfolio uses a 12-column grid with items given deliberately uneven spans and negative top-margins (`-10rem`, `-5rem`) so images overlap rather than align to a strict row. Services alternate media-left/media-right per item, with the "Rentals" service breaking the pattern entirely into a full-bleed centered banner. Breakpoints: 1024px (grids stack, service rows go vertical) and 768px (sidebar → mobile nav).

## Elevation & Depth

Flat throughout — no `box-shadow` anywhere in the system. Depth is implied two ways instead: `mix-blend-mode: multiply` on the hero content where it sits over the media block, and physical overlap (negative margins, absolute-positioned media blocks) that lets elements stack in front of one another. State depth (like a button lift) is a `translateY` on hover, never a shadow.

### Named Rules
**The Flat-By-Default Rule.** Nothing casts a shadow. If a component needs to feel lifted, move it (translate, overlap, scale) — don't shade it.

## Shapes

No rounded corners exist anywhere in the system (`border-radius` is never set). Every media block, the hero frame, and both CTA buttons are cut by an asymmetric `clip-path` polygon — a shallow diagonal facet, 5–15% skew, unique per instance (ten named `.shape-1` … `.shape-10` variants so no two media blocks share an identical cut). Facet direction is not decorative noise: it alternates across the page to keep the eye moving downward.

### Named Rules
**The Facet Rule.** Every media placeholder and every button is a diagonal-cut polygon, never a plain rectangle and never a rounded rectangle. A new component that needs a distinct silhouette gets its own named shape variant in this same family — it does not fall back to a straight edge.

## Components

### Buttons
- **Shape:** diagonal-cut polygon (`clip-path: polygon(10% 0, 100% 0, 90% 100%, 0% 100%)`), never rounded.
- **Primary:** Ochre Rust fill, Paper White text, Fragment Mono label caps, `1rem 2rem` padding.
- **Hover:** primary fills Bottle Green and lifts `translateY(-5px)`; secondary inverts fill/text between Paper White and Warm Ink. Transition is the shared fast-organic ease (0.4s).
- **Secondary (ghost-on-light):** Paper White fill, Warm Ink text — used for the closing CTA against the Ochre Rust section background.

### Media Placeholders
- **Shape:** one of ten named diagonal-facet clip-paths, sized to the section (hero: 35vw × 75vh; about blocks: fixed 300×450px; service media: ~40vw × 70vh; portfolio: variable grid spans).
- **Fill:** a two-stop linear gradient between two palette tokens (never a flat fill), sized and positioned so a real photograph can drop in with zero layout shift once client assets land.

### Navigation
- **Desktop:** fixed 60px vertical sidebar, logo rotated `vertical-rl` at top, nav links rotated the same way, Fragment Mono label style, Ochre Rust on hover/active.
- **Mobile (<768px):** collapses to a top bar (logo + "MENU" text button) that opens a full-screen Bottle Green overlay with centered Paper White links.

### Section Label (signature component)
The tracked mono line ("01. HERITAGE & SCOPE", "PAST EVENT 01") is the system's recurring wayfinding signature — Warm Taupe, uppercase, 0.25em tracking. It marks structure (a numbered section, a captioned photo), never restates a headline above it.

## Do's and Don'ts

### Do:
- **Do** cut every media block and button with a diagonal `clip-path` facet — no rectangles, no rounded corners.
- **Do** keep Ochre Rust exclusive to actionable elements; everything else stays in bottle-green, parchment, ink, or taupe.
- **Do** reserve Fragment Mono for structural labels only (nav, section numbers, captions).
- **Do** size every media placeholder gradient to its final image's slot so a real photo drops in with zero layout shift.

### Don't:
- **Don't** add a `box-shadow` anywhere — depth comes from overlap and blend mode, not shading.
- **Don't** round a corner. Zero `border-radius` is a system invariant, not an oversight.
- **Don't** use Fragment Mono in a heading or in body prose — it is a caption face, not a display face.
- **Don't** add icon-grid feature rows, glassmorphism, or a second saturated accent color competing with Ochre Rust.
