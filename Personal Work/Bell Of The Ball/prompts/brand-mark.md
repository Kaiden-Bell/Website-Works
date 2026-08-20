# Brand mark / favicon — image-gen prompt

**Where this is used:** browser tab icon (`site/public/favicon.svg`) and the sidebar/mobile nav wordmark ("BOTB"). A functional placeholder is already shipped (a flat diagonal-cut bottle-green square with an ochre "B") — this prompt is for a more considered replacement once real brand art exists.

**Why it's a gap:** Bell of the Ball has no designed logo mark yet — the site currently carries the name as plain text only. Everything else on the site (hero, about, services, portfolio) uses real event photography; this is the one asset that has to be invented rather than sourced, so it's the one place image generation is appropriate here.

## Prompt

> A minimalist flat vector emblem/monogram logo mark for an event-planning brand called "Bell of the Ball." Deep bottle-green (#1f3d2e) as the dominant field, warm ochre-rust (#a8672a) as the single accent color, on a warm parchment (#efe6d3) or transparent background. The mark should be built from a single asymmetric diagonal-cut facet — no rounded corners, no circles, no soft gradients — echoing a paper-cut or cleanly clipped photograph edge. Work either a stylized bell silhouette or a monogram "B" into that facet, kept simple enough to read clearly at 32×32px browser-tab scale. Flat color only, no drop shadows, no 3D bevels, no glossy highlights, no photorealistic rendering. Square canvas, centered composition, generous padding so the mark isn't cropped when scaled down.

**Sizes needed:** a 512×512 master (flatten to transparent PNG), then exported down to 32×32 and 16×16 for `favicon.ico`/`favicon.png`, plus a 1200×630 canvas with the mark centered on a solid bottle-green field for `og:image` fallback use if the photo-based social card (already wired in `Layout.astro`) isn't the preferred share image.

**Drop the final file at:** `site/public/favicon.svg` (or `.png`, adjusting the `<link rel="icon">` in `site/src/layouts/Layout.astro`) — swap it in and the whole site picks it up automatically.
