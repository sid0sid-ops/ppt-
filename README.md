# 🧬 BioAlign-Pro — Presentation Engine Documentation

> A cinematic, dual-monitor presentation system built natively into the BioAlign-Pro SPA.
> No PowerPoint. No dependencies. Pure HTML, CSS, and JavaScript.

---

## 📁 File Locations at a Glance

```
BioAlign-Pro template/
│
├── index.html                           ← Master SPA container (All 3 views live here)
│
├── assets_global/
│   └── js/
│       ├── core/
│       │   ├── app.js                   ← App bootstrapper (boots the Engine on DOMContentLoaded)
│       │   ├── presentationEngine.js    ← 🔥 The Core Engine (ALL presentation logic)
│       │   └── router.js               ← Legacy SPA router (patched to skip Engine routes)
│       │
│       └── features/
│           └── content.js              ← 📋 Slide Content Manifest (edit your slides HERE)
│
└── ppt/
    └── assets/
        ├── thumb_1.webp                ← Slide 1 thumbnail (paste after slide is done)
        ├── thumb_2.webp                ← Slide 2 thumbnail
        └── ...                         ← thumb_N.webp for each slide
```

---

## 🧠 Architecture Overview

The presentation system uses **three views** injected statically inside `index.html`:

| View ID | Purpose | Visible When |
|---|---|---|
| `#view-dashboard` | Slide Pipeline + Preview browser | Default on load |
| `#view-stage` | Full-screen Projector Stage | `F` key or "Start Presentation" click |
| `#view-presenter` | Presenter HUD (notes + next slide) | `S` key (spawns window + switches local tab) |

All views are toggled via `display: none / block` — **zero page reloads, zero fetch calls.**

---

## ⚙️ Core Engine Functions — `presentationEngine.js`

### Constructor
Runs on boot. Stores slide index from `sessionStorage` (survives page refreshes), creates the `BroadcastChannel` for cross-window sync, and registers a `ResizeObserver` for real-time scaling.

### `init()`
Determines which view to show based on context:
- `window.name === 'Projector'` → Show Stage (spawned projector popup)
- `hash === '#presenter_view'` → Show Presenter HUD
- Default → Show Dashboard

### `prepareDashboardDOM()`
Renders the Slide Pipeline sidebar with thumbnail cards and loads the active slide preview. Called whenever returning to the dashboard.

### `prepareStageDOM()`
Shows `#view-stage` and renders the active slide's full HTML into `#slide-injection-point`.

### `prepareHUDDOM()`
Shows `#view-presenter` and renders the current slide as live DOM (main pane) plus the next slide as a `thumb_N.webp` image (memory-optimized).

### `enterStage()`
Triggered by button click or `F` key. Shows the Stage, then requests true fullscreen on `#view-stage`. Recalculates scale via `requestAnimationFrame` AFTER fullscreen viewport is confirmed.

### `exitPresentation(broadcast = true)`
- Exits fullscreen
- Clears Stage DOM innerHTML (memory cleanup)
- Resets `currentIndex` to 0
- Routes back to Dashboard
- If `broadcast = true`, sends `EXIT` signal to the Projector popup to close it

### `setSlide(index)`
Navigates to a slide by index. Persists to `sessionStorage`. Broadcasts `NAVIGATE` to Projector.

### `syncAllViews()`
Called when `BroadcastChannel` receives navigation updates. Updates whichever view is currently visible.

### `getSlideHTML(slide, context)`
Wraps a slide's HTML content inside the **PPT-style scaling wrapper**:
- Outer wrapper: `position: absolute; inset: 0; background: #000` (fills full viewport)
- Inner canvas: `1920px × 1080px`, centered using `translate(-50%,-50%) scale(X)`
- `context = 'stage'` → pointer events ON | `context = 'hud'` → events OFF (read-only preview)

### `scaleCanvases()`
The PowerPoint-identical scaling algorithm:
```
scale = Math.min(viewportWidth / 1920, viewportHeight / 1080)
canvas.transform = `translate(-50%, -50%) scale(${scale})`
```
Registered to a `ResizeObserver` for automatic re-scaling on any window resize or projector disconnect.

### `renderDashboardPreview(index)`
Loads a `thumb_N.webp` thumbnail into the Dashboard preview window.

### `renderHUD(index)`
- Main left pane → Live HTML DOM rendering of current slide
- Right "Next" pane → `thumb_(N+1).webp` image only (saves GPU/RAM)

### `bindEvents()`
Registers all keyboard and fullscreen listeners (see Hotkeys section below).

### `startHUDTimers()`
Drives the session elapsed timer and real-time clock displayed in the Presenter HUD.

---

## 📋 How to Edit Slides — `content.js`

Each slide is an object in the `SLIDES` array:

```js
{
  id: 1,                         // Slide number
  title: "Your Slide Title",     // Used in Pipeline sidebar
  htmlContent: `                 // Full custom HTML (recommended for designed slides)
    <!-- Your 1920x1080 HTML here -->
  `,
  content: [],                   // Fallback bullet points (used only if htmlContent is null)
  figure: null,                  // Reserved for future figure embedding
  notes: "Presenter notes..."    // Shown in Presenter HUD notes pane
}
```

### Slides 1–2
Fully hand-crafted with the **Cinematic Space-Glassmorphism** theme (`htmlContent` is set).

### Slides 3–14
Auto-generated from a `for` loop at the bottom of `content.js`. Replace the loop entry with a full `htmlContent` block to customize each one.

---

## 🎨 How to Change a Slide Design

1. Open `assets_global/js/features/content.js`
2. Find the slide object by `id`
3. Replace the `htmlContent` template literal with your own HTML
4. The slide canvas is always `1920px × 1080px` — design for this resolution
5. Use `absolute`/`relative` positioning within the canvas
6. Use the standard glassmorphism base template:

```html
<!-- COSMIC BACKGROUND -->
<div class="absolute inset-0 z-0 bg-[#060410] overflow-hidden">
  <!-- Grid overlay -->
  <div class="absolute inset-0 opacity-20" style="
    background-image: linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px);
    background-size: 60px 60px;
    -webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%);
  "></div>
</div>

<!-- GLASS PANEL (Content Area) -->
<div class="absolute inset-0 z-10 flex items-center justify-center p-8 pointer-events-none">
  <main class="w-full max-w-[1750px] h-full max-h-[980px] flex flex-col p-16
    bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[3rem]
    shadow-[0_0_80px_rgba(0,0,0,0.6)] relative overflow-hidden pointer-events-auto">

    <!-- YOUR CONTENT HERE -->

  </main>
</div>
```

---

## ⌨️ Hotkeys Reference

| Key | Where | Action |
|---|---|---|
| `F` | Dashboard | Launch fullscreen presentation from selected slide |
| `→` / `Space` / `Page Down` | Stage | Next slide |
| `←` / `Page Up` | Stage | Previous slide |
| `Escape` | Stage / HUD | Exit presentation → return to Dashboard |
| `S` | Dashboard / Stage | Spawn Projector window + switch to Presenter HUD |

---

## 🖥️ Dual-Monitor Setup (Presenter Mode)

1. Open the Dashboard
2. Press `S` — a new Projector window spawns on your second monitor
3. Click once inside the Projector to lock it to fullscreen
4. Your laptop screen becomes the **Presenter HUD** showing:
   - Current slide (live DOM render)
   - Next slide (WEBP thumbnail)
   - Speaker notes
   - Session timer + real-time clock
5. Navigate using `→` / `←` on either window — they stay in sync via `BroadcastChannel`
6. Press `Escape` → both windows exit simultaneously

---

## 🖼️ Adding Slide Thumbnails

After a slide design is finalized:
1. Take a screenshot of the slide in fullscreen
2. Convert to `.webp` format (use Squoosh, cwebp, or any tool)
3. Place in `ppt/assets/` folder as `thumb_1.webp`, `thumb_2.webp`, etc.
4. The Dashboard Pipeline and HUD "Next Slide" pane will automatically display them

---

## 🚀 Running the Project

```bat
# Option 1: Use the included batch file
start-bioalign.bat

# Option 2: Manual
npm run dev
```

Access at: **http://localhost:8080**

> ⚠️ The presentation engine requires a local server (not `file://`) for ES Module imports to work.

---

## ✅ Engine Status Summary

| Feature | Status |
|---|---|
| Dashboard with Slide Pipeline | ✅ Working |
| True PPT-style fullscreen scaling | ✅ Working |
| Escape → Dashboard (all cases) | ✅ Working (fullscreenchange listener) |
| Dual-monitor BroadcastChannel sync | ✅ Working |
| Memory cleanup on exit | ✅ Working |
| WEBP thumbnail previews | ✅ Working (paste thumbs in `ppt/assets/`) |
| Slides 1–2 (custom designed) | ✅ Complete |
| Slides 3–14 (template placeholders) | ✅ Ready for content |
| Grid background on all slides | ✅ Working |
| Clickable DOI / Location links | ✅ Working (Slide 1) |
