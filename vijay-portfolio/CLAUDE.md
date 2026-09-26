# CLAUDE.md — instructions for Claude Code

Personal portfolio for Vijay Kumar Pasala. Read `PLAN.md` first — it lists what's done and the next phases.

## Commands
- `npm install` — install deps
- `npm run dev` — dev server at http://localhost:5173
- `npm run build` — type-check + production build (must pass before finishing any task)
- `npm run preview` — serve `dist/`

## Rules
- **Content lives in `src/data/profile.ts`.** Never hard-code resume text inside components.
- Keep the design tokens in `src/index.css` (`@theme`). Use `text-signal`, `text-copper`, `bg-surface`, `border-line`, `text-muted` etc. — don't invent new hex colours inline unless for a 3D material.
- 3D boards are procedural (`src/three/parts.tsx` primitives). Do NOT add external .glb/.hdr assets or drei `<Text>` (it fetches fonts from a CDN). Use `useSilkscreen` canvas textures for board text, and `<Html>` for overlay labels.
- No brand logos (Raspberry Pi, Nordic, Espressif, Hailo). Boards stay generic/unbranded.
- Anything that animates every frame goes in `useFrame` and mutates refs — never `setState` per frame.
- Wrap any new `<Canvas>` in `<SafeCanvas>` and lazy-load it with `React.lazy`.
- Respect `prefers-reduced-motion` (MotionConfig is already set to `reducedMotion="user"`).
- Test at 390px and 1440px widths. No horizontal scroll.
- The user reviews rendered results iteratively — after UI changes, run the dev server and describe/screenshot what changed.
