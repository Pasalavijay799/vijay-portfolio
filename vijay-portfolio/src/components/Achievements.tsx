import { Trophy, Radio } from 'lucide-react'
import { achievements, workshops } from '../data/profile'
import { Section, Reveal } from './Section'

export default function Achievements() {
  return (
    <Section id="achievements" kicker="06 · Recognition" title="Wins & training.">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {achievements.map((a, i) => (
          <Reveal key={a.title} delay={i * 0.06} className="h-full">
            <div className="card card-hover h-full p-5">
              <Trophy size={18} className={i === 0 ? 'text-copper' : 'text-muted'} />
              <div className="mt-4 font-mono text-[11px] uppercase tracking-wider text-signal">{a.badge}</div>
              <div className="mt-1 font-display text-lg font-semibold">{a.title}</div>
              <p className="mt-2 text-sm leading-relaxed text-muted">{a.detail}</p>
              {a.year && <div className="mt-3 font-mono text-xs text-muted">{a.year}</div>}
            </div>
          </Reveal>
        ))}
      </div>
      {workshops.map((w) => (
        <Reveal key={w.title}>
          <div className="card mt-4 flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-ble/10 text-ble"><Radio size={20} /></span>
            <div>
              <div className="font-display text-lg font-semibold">{w.title}</div>
              <p className="mt-1 text-sm leading-relaxed text-muted">{w.detail}</p>
            </div>
          </div>
        </Reveal>
      ))}
    </Section>
  )
}
