import { experience } from '../data/profile'
import { Section, Reveal } from './Section'

export default function Experience() {
  return (
    <Section id="experience" kicker="02 · Experience" title="Where I’ve been building." intro="From lab research on collaborative robots to production firmware for on-device ML.">
      <div className="relative">
        <div className="clock-line absolute bottom-0 left-[7px] top-2 w-0.5 opacity-40 md:left-[calc(12rem+7px)]" />
        <div className="space-y-10">
          {experience.map((e, i) => (
            <Reveal key={e.org} delay={i * 0.1}>
              <div className="relative grid gap-4 pl-9 md:grid-cols-[12rem_1fr] md:gap-10 md:pl-0">
                <div className="md:pt-5 md:text-right md:pr-8">
                  <div className="font-mono text-sm text-copper">{e.period}</div>
                  {e.current && <div className="mt-1 inline-flex items-center gap-1.5 font-mono text-xs text-signal"><span className="h-1.5 w-1.5 rounded-full bg-signal" />current</div>}
                </div>
                <span className={`absolute left-0 top-1.5 h-4 w-4 rounded-full border-2 border-signal bg-bg md:left-[12rem] md:top-6 ${e.current ? 'shadow-[0_0_16px_rgba(62,224,143,0.8)]' : ''}`} />
                <div className="card card-hover p-6 md:ml-8">
                  <h3 className="font-display text-xl font-semibold">{e.role} <span className="text-muted">·</span> <span className="text-signal">{e.org}</span></h3>
                  <p className="mt-1 text-sm text-muted">{e.team}</p>
                  <ul className="mt-5 space-y-2.5">
                    {e.points.map((p) => (
                      <li key={p} className="flex gap-3 text-[15px] leading-relaxed text-soft">
                        <span className="mt-2.5 h-px w-3 shrink-0 bg-copper" />{p}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-2">{e.tags.map((t) => <span key={t} className="chip-tag">{t}</span>)}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
