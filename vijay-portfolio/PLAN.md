# Portfolio — Build Plan

Personal portfolio for **Vijay Kumar Pasala** (ECE, RGUKT RK Valley · Embedded Engineer @ GlassData).
Goal: a clean, fast, dark "PCB" themed site with **live 3D hardware** (boards rendered in the browser) that feels as polished as the production ECE portal (ece.rguktrkv.ac.in).

---

## 1. Stack

| Layer | Choice | Why |
|---|---|---|
| Build | Vite 6 + React 18 + TypeScript | Fast dev, simple static output |
| Styling | Tailwind CSS v4 (`@theme` tokens in `src/index.css`) | Design tokens in one place |
| 3D | three.js + @react-three/fiber + @react-three/drei | Declarative 3D, easy animation |
| Motion | framer-motion | Scroll reveals, tab transitions |
| Icons | lucide-react | Clean line icons |
| Deploy | Vercel / Netlify / GitHub Pages (static `dist/`) | Free, custom domain |

All 3D boards are **procedurally modelled** in code (`src/three/`) — no .glb downloads, no HDR files, no branded logos. Lighting uses drei `Lightformer`s, so it works fully offline.

---

## 2. What's already done (v0.1 — in this zip)

- [x] Project scaffold, builds clean (`npm run build`)
- [x] All content pulled from both resumes into **`src/data/profile.ts`** (single source of truth)
- [x] Sections: Navbar · Hero · About · Experience · Projects · Hardware Lab · Skills · Recognition · Contact · Footer
- [x] **Hero 3D scene**: ARM64 SBC with animated signal pulses running along copper traces, blinking LEDs, an M.2 NPU module that flies in and "docks", and an nRF board floating behind. Reacts to mouse (parallax) and scroll (rotates/sinks)
- [x] **Hardware Lab**: 4 interactive boards (nRF5340 · ARM64 SBC · M.2 NPU · ESP32) — orbit with mouse, **Explode view** lifts components apart with labels
- [x] Profile photo slot with "IC chip" frame (falls back to "VK" initials until photo is added)
- [x] ECE Portal as the featured project with "in production" badge + live link
- [x] Resume download (latest resume in `public/`)
- [x] Performance: 3D code lazy-loaded, hero render loop pauses off-screen, lab canvas mounts only when scrolled near, adaptive DPR
- [x] Safety: WebGL error boundary — site still renders if 3D fails
- [x] Accessibility: `prefers-reduced-motion` respected, semantic sections, aria labels
- [x] Responsive (tested 390px mobile + 1440px desktop)

Screenshots of the current build are in `docs/screenshots/`.

---

## 3. What YOU need to provide

1. **Profile photo** → `public/profile.jpg` (square, ≥ 800×800, face centred, plain background works best)
2. **ECE portal screenshot** → `public/projects/ece-portal.png` (16:9, top of the dashboard/home). Shown automatically inside the browser frame
3. (Optional) Project photos/GIFs for the robotic arm, RPM machine, LifeBand, EyeNtra → `public/projects/*.jpg`
4. Confirm facts flagged below

### Facts to confirm
- GlassData start month (currently "2026 — Present")
- EyeNtra: resume says "Arvind Eye Hospital" — site uses **Aravind Eye Hospital** (the actual hospital name). Change in `profile.ts` if wrong
- Are you OK with the NPU / heterogeneous-AI mention in the Hardware Lab (`src/three/boards.tsx` → `LAB_BOARDS`)? Remove if it's confidential to GlassData
- Phone is hidden by default (`showPhone: false`)
- Achievement years for Astronics 6.0 / Peekuthon

---

## 4. Next steps (do these in Claude Code, in order)

### Phase A — Content polish (30 min)
- [ ] Add photo + ECE screenshot (section 3)
- [ ] Add a `year` for each achievement; add GitHub repo links to projects (`links: [{label:'Code', href:...}]`)
- [ ] Replace stat tiles in `profile.stats` if you want different numbers

### Phase B — Project detail pages (2–3 h)
- [ ] Add `react-router-dom` (or keep single page + modal)
- [ ] Clicking a project card opens a detail view: problem → architecture diagram → hardware → results → media
- [ ] Architecture diagrams as inline SVG (block diagrams: sensor → MCU → BLE → host)

### Phase C — 3D upgrades (optional, 2–4 h)
- [ ] **Robotic arm model**: a simple 6-DOF arm from cylinders/boxes with animated joint angles (inverse-kinematics-lite) — add as 5th Lab item or a dedicated section for the ROS2 project
- [ ] **Signal oscilloscope**: tiny canvas/SVG scope in the nRF card showing a live-looking 1 kHz IMU waveform
- [ ] Click a component in exploded view → side panel shows what it does (raycast `onClick` on `<Layer>`)
- [ ] Postprocessing bloom on LEDs/pulses (`@react-three/postprocessing`) — check mobile FPS first

### Phase D — Ship (30 min)
- [ ] `npm run build` → deploy `dist/` to Vercel (import GitHub repo, framework = Vite)
- [ ] Custom domain (e.g. `vijaypasala.dev`) or `pasalavijay799.github.io`
- [ ] Add `public/og-image.png` (1200×630) and `<meta property="og:image">` in `index.html`
- [ ] Lighthouse: aim ≥ 90 performance on desktop
- [ ] Add the portfolio link to LinkedIn, GitHub profile README and resume header

---

## 5. File map

```
src/
  data/profile.ts        ← ALL text content. Edit here first.
  components/
    Navbar, Hero, About, Experience, Projects, HardwareLab, Skills, Achievements, Contact
    Section.tsx          ← section wrapper + <Reveal> scroll animation
    Avatar.tsx           ← profile photo with initials fallback
    SafeCanvas.tsx       ← WebGL error boundary + detection
  three/
    parts.tsx            ← procedural part kit: Substrate, Chip, Header, USB, RJ45, LED, Traces(+pulses), Layer(explode)…
    boards.tsx           ← SBCBoard, ESP32Board, NRFBoard, NPUModule + LAB_BOARDS metadata
    Scenes.tsx           ← HeroScene, LabScene, studio lighting
  index.css              ← design tokens (@theme), PCB grid bg, utility classes
public/
  Vijay_Kumar_Pasala_Resume.pdf, favicon.svg, profile.jpg (add), projects/ (add)
```

## 6. Design system

- Background `#07110d` (soldermask-black), surfaces `#0c1914 / #10211a`
- Accents: signal green `#3ee08f`, copper `#d9a64e`, BLE blue `#4da3ff`, alert `#ff7a59`
- Fonts: Space Grotesk (display), Inter (body), JetBrains Mono (labels/code)
- Motifs: PCB dot-grid, IC-pin photo frame, clock-signal timeline, pin-header skill lists, UART terminal contact card
