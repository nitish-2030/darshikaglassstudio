# Darshika Glass Studio — Website

## Live

| URL | Purpose |
|---|---|
| **https://darshikaglassstudio.web.app/** | **Business URL** — the one to actually share with clients/customers |
| https://nitish-2030.github.io/darshikaglassstudio/ | Testing only — used to check things on a real phone during development |

> Custom domain (e.g. `darshikaglassstudio.com\in`) will be added later — once
> needed, or once the client asks for it. Firebase URL is the main one for
> now.

---

## What I learned (real problems, not a feature list)

- Basically i face the major problem is same thing build many times on chasing perfection so after making this - i learned that make the architecture or plan before implementing so that after that the rest work is building with code. Every minor or major thing should be planned before making or make its preview, that's why in modern time every fresher should have a knowledge of SYSTEM DESIGN .  
- OR one more thing in Localhost vs actual deploy the loading or any type of network issue we not measure accurately so the thing sometimes may not work as like in localhost so try to do one task at a time or just breakdown it. Issues which i face is like---
- **Video stutter on slow internet** — loading only on tap meant the
  download and the tap happened at the same time. Fixed with a background
  preload queue: nearby video cards quietly load one at a time ahead of
  time, fully skipped on Data Saver / slow connections.
- **Drag feature silently broke tap-to-play** — `setPointerCapture`
  redirects where the resulting click lands, not just the drag itself.
  Removed it, tracked the drag manually instead.
- **Full-screen mobile menu hid its own content** — centering content in a
  fixed-height panel breaks on any viewport it wasn't tested on. Rebuilt as
  a side panel that just flows top-to-bottom — nothing left to clip.
- **Gallery/video cards were mouse-only** — plain `<div>`s with a click
  listener aren't reachable by keyboard. Added `tabindex`, `role="button"`,
  and Enter/Space handling.
- **`.webp` files that were secretly uncompressed PNGs** — a filename says
  what something's called, not what it actually is. Worth checking real
  file bytes, not just the extension, especially for the hero image.
- **Brand gold looked fine, failed contrast checks** — readable-to-the-eye
  and WCAG-contrast-compliant are different bars. Added a darker
  "on-contrast" gold for small text on white, left the original untouched
  everywhere it already worked (dark backgrounds).

---

*Updated as real problems came up — not written from a plan ahead of time.*
