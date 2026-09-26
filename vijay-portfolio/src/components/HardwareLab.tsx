import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Layers, Boxes, MousePointer2 } from 'lucide-react'
import { LAB_BOARDS } from '../three/labBoards'
import { Section } from './Section'
import SafeCanvas, { hasWebGL } from './SafeCanvas'

const LabScene = lazy(() => import('../three/Scenes').then((m) => ({ default: m.LabScene })))

const NoGL = () => (
  <div className="grid h-full place-items-center p-6 text-center font-mono text-xs text-muted">3D preview needs WebGL — enable hardware acceleration to explore the boards.</div>
)

export default function HardwareLab() {
  const [id, setId] = useState(LAB_BOARDS[0].id)
  const [exploded, setExploded] = useState(false)
  const [visible, setVisible] = useState(false)
  const [mounted, setMounted] = useState(false)
  const box = useRef<HTMLDivElement>(null)
  const board = LAB_BOARDS.find((b) => b.id === id)!

  // Mount the WebGL canvas the first time the section nears the viewport, then keep it
  // (remounting would create a new GL context each time) and just pause it off-screen.
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      setVisible(e.isIntersecting)
      if (e.isIntersecting) setMounted(true)
    }, { rootMargin: '200px' })
    if (box.current) io.observe(box.current)
    return () => io.disconnect()
  }, [])

  return (
    <Section id="lab" kicker="04 · Hardware Lab" title="The boards behind the work." intro="Interactive 3D models of the hardware I build on. Drag to orbit, then explode a board to see what’s inside.">
      <div className="mb-5 flex flex-wrap gap-2">
        {LAB_BOARDS.map((b) => (
          <button
            key={b.id}
            onClick={() => { setId(b.id); setExploded(false) }}
            className={`rounded-xl border px-4 py-2.5 text-sm transition ${id === b.id ? 'border-transparent text-bg' : 'border-line bg-surface/60 text-muted hover:text-ink'}`}
            style={id === b.id ? { background: b.accent } : undefined}
          >
            {b.name}
          </button>
        ))}
      </div>

      <div ref={box} className="card grid overflow-hidden lg:grid-cols-[1.55fr_1fr]">
        <div className="relative h-[380px] border-b border-line sm:h-[460px] lg:h-[540px] lg:border-b-0 lg:border-r" style={{ background: `radial-gradient(60% 60% at 50% 45%, ${board.accent}1f, transparent 70%)` }}>
          {mounted && hasWebGL ? (
            <SafeCanvas fallback={<NoGL />}>
              <Suspense fallback={<div className="grid h-full place-items-center font-mono text-xs text-muted">loading 3D…</div>}>
                <LabScene boardId={id} exploded={exploded} active={visible} />
              </Suspense>
            </SafeCanvas>
          ) : !hasWebGL ? <NoGL /> : null}
          <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 font-mono text-[11px] text-muted"><MousePointer2 size={13} /> drag to orbit</div>
          <button
            onClick={() => setExploded((v) => !v)}
            className="absolute bottom-4 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 rounded-full border border-line bg-bg/80 px-4 py-2.5 text-sm font-medium backdrop-blur transition hover:border-signal/60"
          >
            {exploded ? <Boxes size={16} /> : <Layers size={16} />}
            {exploded ? 'Assemble' : 'Explode view'}
          </button>
        </div>

        <div className="p-6 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div key={board.id} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.3 }}>
              <p className="font-mono text-xs uppercase tracking-wider" style={{ color: board.accent }}>{board.kicker}</p>
              <h3 className="mt-2 font-display text-2xl font-semibold">{board.name}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{board.blurb}</p>
              <div className="mt-6 font-mono text-[11px] uppercase tracking-wider text-muted">What I did with it</div>
              <ul className="mt-3 space-y-2">
                {board.specs.map((s) => (
                  <li key={s} className="flex items-center gap-3 text-sm text-soft"><span className="h-1.5 w-1.5 rounded-sm" style={{ background: board.accent }} />{s}</li>
                ))}
              </ul>
              <div className="mt-6 font-mono text-[11px] uppercase tracking-wider text-muted">Used in</div>
              <div className="mt-3 flex flex-wrap gap-2">{board.usedIn.map((u) => <span key={u} className="chip-tag">{u}</span>)}</div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <p className="mt-3 text-center font-mono text-[11px] text-muted/70">Procedurally modelled, unbranded boards — rendered live with React Three Fiber.</p>
    </Section>
  )
}
