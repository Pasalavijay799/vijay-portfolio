import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, ExternalLink, Globe, Bot, Bluetooth, CircuitBoard, ScanEye, Cpu } from 'lucide-react'
import { projects, type BoardKind, type Project } from '../data/profile'
import { Section, Reveal } from './Section'

const ICONS: Record<BoardKind, typeof Globe> = { web: Globe, arm: Bot, nrf: Bluetooth, mcu: CircuitBoard, vision: ScanEye, sbc: Cpu }
const ACCENT: Record<BoardKind, string> = { web: '#3ee08f', arm: '#d9a64e', nrf: '#4da3ff', mcu: '#ff7a59', vision: '#c792ea', sbc: '#3ee08f' }

/** Browser-frame screenshot gallery (images listed in profile.ts → project.gallery). */
function Gallery({ shots }: { shots: NonNullable<Project['gallery']> }) {
  const [i, setI] = useState(0)
  const shot = shots[i]
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-bg">
      <div className="flex items-center gap-2 border-b border-line px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" /><span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" /><span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <div className="ml-3 flex-1 truncate rounded-md bg-white/5 px-3 py-1 font-mono text-[11px] text-muted">{shot.url}</div>
      </div>
      <div className="relative aspect-[16/9] bg-surface">
        <AnimatePresence initial={false}>
          <motion.img
            key={shot.src}
            src={shot.src}
            alt={`ECE portal — ${shot.label}`}
            loading="lazy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
        </AnimatePresence>
      </div>
      <div className="flex gap-1.5 overflow-x-auto border-t border-line p-2" role="tablist" aria-label="Portal screenshots">
        {shots.map((s, k) => (
          <button
            key={s.src}
            role="tab"
            aria-selected={k === i}
            onClick={() => setI(k)}
            className={`shrink-0 rounded-md px-3 py-1.5 font-mono text-[11px] transition ${k === i ? 'bg-signal/15 text-signal' : 'text-muted hover:text-ink'}`}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  )
}

/** Block diagram: nodes left → right with a signal pulse travelling each link. */
function Flow({ nodes, accent }: { nodes: string[]; accent: string }) {
  return (
    <div className="flex items-center" aria-label={`Data flow: ${nodes.join(' → ')}`}>
      {nodes.map((n, i) => (
        <div key={n} className="contents">
          {i > 0 && (
            <span className="relative h-px w-3 shrink-0 sm:w-4" style={{ background: `${accent}66` }}>
              <span className="flow-dot" style={{ background: accent, animationDelay: `${i * 0.35}s` }} />
            </span>
          )}
          <span
            title={n}
            className="min-w-0 flex-1 truncate rounded-md border px-1.5 py-1.5 text-center font-mono text-[10.5px] text-soft"
            style={{ borderColor: `${accent}40`, background: `${accent}0d` }}
          >
            {n}
          </span>
        </div>
      ))}
    </div>
  )
}

function Card({ p, big = false }: { p: Project; big?: boolean }) {
  const Icon = ICONS[p.board]
  const accent = ACCENT[p.board]
  return (
    <article className={`card card-hover group flex h-full flex-col p-5 ${big ? 'md:p-7' : ''}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line" style={{ color: accent, background: `${accent}14` }}>
            <Icon size={19} />
          </span>
          <div className="font-mono text-[11px] uppercase leading-tight tracking-wider" style={{ color: accent }}>
            {p.subtitle}
            <div className="mt-0.5 normal-case tracking-normal text-muted">{p.year}</div>
          </div>
        </div>
        <div className="shrink-0 text-right">
          <div className="font-display text-2xl font-semibold leading-none" style={{ color: accent }}>{p.metric.value}</div>
          <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted">{p.metric.label}</div>
        </div>
      </div>

      <h3 className={`mt-4 font-display font-semibold tracking-tight ${big ? 'text-2xl md:text-3xl' : 'text-lg'}`}>{p.title}</h3>
      <p className="mt-1.5 text-sm leading-snug text-muted">{p.summary}</p>

      {p.gallery && <div className="mt-5"><Gallery shots={p.gallery} /></div>}

      <div className="mt-5"><Flow nodes={p.flow} accent={accent} /></div>

      <ul className={`mt-4 grid gap-1.5 ${big ? 'sm:grid-cols-3 sm:gap-3' : ''}`}>
        {p.highlights.map((h) => (
          <li key={h} className="flex items-start gap-2 text-[13px] leading-snug text-soft">
            <Check size={14} className="mt-0.5 shrink-0" style={{ color: accent }} />{h}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
        {p.tags.map((t) => <span key={t} className="chip-tag">{t}</span>)}
        {p.links?.map((l) => (
          <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-signal/10 px-3 py-1.5 text-sm font-medium text-signal transition hover:bg-signal/20">
            {l.label} <ExternalLink size={14} />
          </a>
        ))}
      </div>
    </article>
  )
}

export default function Projects() {
  const featured = projects.filter((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)
  return (
    <Section id="projects" kicker="03 · Projects" title="Selected work." intro="Built on real hardware — or running in production.">
      <div className="grid gap-5 lg:grid-cols-2">
        <Reveal className="h-full lg:row-span-2"><Card p={featured[0]} big /></Reveal>
        {featured.slice(1).map((p, i) => <Reveal key={p.title} delay={0.1 + i * 0.08} className="h-full"><Card p={p} /></Reveal>)}
      </div>
      <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {rest.map((p, i) => <Reveal key={p.title} delay={i * 0.06} className="h-full"><Card p={p} /></Reveal>)}
      </div>
    </Section>
  )
}
