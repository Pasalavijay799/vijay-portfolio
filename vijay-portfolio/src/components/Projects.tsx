import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ExternalLink, Globe, Bot, Bluetooth, CircuitBoard, ScanEye, Cpu } from 'lucide-react'
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

function Card({ p, big = false }: { p: Project; big?: boolean }) {
  const Icon = ICONS[p.board]
  const accent = ACCENT[p.board]
  const live = p.links?.some((l) => l.label.toLowerCase().includes('live'))
  return (
    <article className={`card card-hover group flex h-full flex-col p-6 ${big ? 'md:p-8' : ''}`}>
      <div className="mb-5 flex items-start justify-between gap-4">
        <span className="grid h-11 w-11 place-items-center rounded-xl border border-line" style={{ color: accent, background: `${accent}14` }}>
          <Icon size={20} />
        </span>
        <div className="flex items-center gap-2">
          {live && <span className="inline-flex items-center gap-1.5 rounded-full border border-signal/40 bg-signal/10 px-2.5 py-1 font-mono text-[11px] text-signal"><span className="pulse-dot h-1.5 w-1.5 rounded-full bg-signal text-signal" />in production</span>}
          <span className="font-mono text-xs text-muted">{p.year}</span>
        </div>
      </div>
      <p className="font-mono text-xs uppercase tracking-wider" style={{ color: accent }}>{p.subtitle}</p>
      <h3 className={`mt-1.5 font-display font-semibold tracking-tight ${big ? 'text-2xl md:text-3xl' : 'text-xl'}`}>{p.title}</h3>
      <p className="mt-3 text-[15px] leading-relaxed text-muted">{p.description}</p>
      {p.gallery && <div className="mt-6"><Gallery shots={p.gallery} /></div>}
      <ul className="mt-5 space-y-2">
        {p.highlights.map((h) => (
          <li key={h} className="flex gap-2.5 text-sm leading-relaxed text-soft"><span className="mt-[9px] h-1 w-1 shrink-0 rounded-full" style={{ background: accent }} />{h}</li>
        ))}
      </ul>
      <div className="mt-auto pt-6">
        <div className="flex flex-wrap gap-2">{p.tags.map((t) => <span key={t} className="chip-tag">{t}</span>)}</div>
        {p.links && (
          <div className="mt-5 flex gap-4">
            {p.links.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-signal hover:underline">
                {l.label} <ExternalLink size={14} />
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

export default function Projects() {
  const featured = projects.filter((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)
  return (
    <Section id="projects" kicker="03 · Projects" title="Selected work." intro="Firmware, robotics, vision and full-stack — each built and tested on real hardware or in production.">
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
