import { ExternalLink, Globe, Bot, Bluetooth, CircuitBoard, ScanEye, Cpu } from 'lucide-react'
import { projects, type BoardKind, type Project } from '../data/profile'
import { Section, Reveal } from './Section'

const ICONS: Record<BoardKind, typeof Globe> = { web: Globe, arm: Bot, nrf: Bluetooth, mcu: CircuitBoard, vision: ScanEye, sbc: Cpu }
const ACCENT: Record<BoardKind, string> = { web: '#3ee08f', arm: '#d9a64e', nrf: '#4da3ff', mcu: '#ff7a59', vision: '#c792ea', sbc: '#3ee08f' }

/** Browser-frame preview for the live ECE portal. Put a real screenshot at public/projects/ece-portal.png */
function PortalPreview() {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-[#0a1410]">
      <div className="flex items-center gap-2 border-b border-line px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" /><span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" /><span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <div className="ml-3 flex-1 truncate rounded-md bg-white/5 px-3 py-1 font-mono text-[11px] text-muted">https://ece.rguktrkv.ac.in</div>
      </div>
      <div className="relative aspect-[16/9]">
        <img src="/projects/ece-portal.png" alt="ECE portal screenshot" className="absolute inset-0 h-full w-full object-cover object-top" onError={(e) => ((e.currentTarget.style.display = 'none'))} />
        {/* skeleton shown under the image (visible if screenshot missing) */}
        <div className="grid h-full grid-cols-[1fr_2.2fr] gap-3 p-4">
          <div className="space-y-2">{Array.from({ length: 6 }).map((_, i) => <div key={i} className={`h-3 rounded ${i === 1 ? 'bg-signal/40' : 'bg-white/8'}`} />)}</div>
          <div className="space-y-3">
            <div className="h-5 w-1/2 rounded bg-white/12" />
            <div className="grid grid-cols-3 gap-2">{['Attendance', 'Schedule', 'Alerts'].map((t) => <div key={t} className="rounded-md border border-line bg-white/[0.03] p-2 font-mono text-[10px] text-muted">{t}<div className="mt-2 h-6 rounded bg-signal/15" /></div>)}</div>
            <div className="h-16 rounded-md bg-white/[0.04]" />
          </div>
        </div>
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
      {p.board === 'web' && big && <div className="mt-6"><PortalPreview /></div>}
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
