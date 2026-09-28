import { Award, Trophy, Radio } from 'lucide-react'
import { achievements, workshops } from '../data/profile'
import { Section, Reveal } from './Section'

export default function Achievements() {
  return (
    <Section id="achievements" kicker="06 · Recognition" title="Wins & training.">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {achievements.map((a, i) => (
          <Reveal key={a.title} delay={i * 0.06} className="h-full">
            <div className={`card card-hover flex h-full items-start gap-4 p-5 ${i === 0 ? 'border-copper/50' : ''}`}>
              <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${i === 0 ? 'bg-copper/15 text-copper' : 'bg-signal/10 text-signal'}`}>
                {i === 0 ? <Trophy size={20} /> : <Award size={20} />}
              </span>
              <div className="min-w-0">
                <div className="font-mono text-[10.5px] uppercase tracking-wider text-signal">{a.badge}{a.year && <span className="text-muted"> · {a.year}</span>}</div>
                <div className="mt-0.5 font-display text-lg font-semibold leading-tight">{a.title}</div>
                <p className="mt-1 text-[13px] leading-snug text-muted">{a.detail}</p>
              </div>
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
