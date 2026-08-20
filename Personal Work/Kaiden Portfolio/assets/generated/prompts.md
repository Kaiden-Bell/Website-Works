# Nano Banana image prompts

Run these in Nano Banana, save the output into this folder using the filename noted under each prompt, and let me know when they're in — I'll wire them into the hero placeholder and swap out the flat gradient.

Target shape for every hero portrait: portrait orientation, roughly 2:3 aspect ratio (e.g. 1024×1536). All three variants share the same person and pose direction so they read as one shoot styled three ways — feed the same reference photo of Kaiden into each prompt if you have one, or drop it as an edit/restyle input rather than a pure text-to-image generation.

---

## v1a — Editorial Serif
**File:** `v1a-hero.jpg`

> Editorial black-and-white portrait photograph of a young man, direct confident gaze at camera, shot on 85mm at f/2, single dramatic side-key light source with deep falloff into black, high contrast printed-film grain, minimal retouching. Styling: dark structured tailored jacket, no jewelry, clean neutral background falling to pure black. Mood: quiet, literary, high-fashion magazine cover — restrained not aggressive. Portrait orientation, tight crop from chest up.

## v1b — Structural Grotesk
**File:** `v1b-hero.jpg`

> Studio portrait photograph of a young man against a flat deep charcoal-black backdrop, bold geometric hard-edged lighting creating a sharp graphic contrast between lit and shadowed halves of the face, crimson-red gelled rim light on one edge, direct camera gaze, structured dark technical outerwear with clean angular lines, high-fashion architectural mood, crisp modern digital clarity (no grain). Portrait orientation, chest-up crop.

## v1c — Poster Condensed
**File:** `v1c-hero.jpg`

> High-contrast black-and-white poster-style portrait photograph of a young man, head turned slightly off-axis, intense direct gaze, hard single-source flash lighting with crushed blacks and blown highlights like a vintage concert poster, dark plain background, minimal wardrobe distraction (plain dark crew-neck), raw and immediate energy rather than polished. Portrait orientation, chest-up crop, leave headroom above for type to overlap.

---

**Status: wired in.** All three images are placed (also copied to `v1a/hero.jpg`, `v1b/hero.jpg`, `v1c/hero.jpg` so each variant stays self-contained) and rendering in the hero portrait slot in place of the gradient placeholder. v1c's `object-position` was tuned to `center 90%` since that shot's face sits low in the frame with headroom above, per the prompt — the other two use `top center`. These are still real photos of a generated stand-in model, not Kaiden; swap the files (same filenames) whenever real photos of Kaiden are ready and no CSS changes should be needed.
