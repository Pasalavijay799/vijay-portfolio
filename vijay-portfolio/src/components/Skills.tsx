import { skills } from '../data/profile'
import { Section, Reveal } from './Section'

export default function Skills() {
  return (
    <Section id="skills" kicker="05 · Skills" title="Toolchain.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((g, i) => (
          <Reveal key={g.group} delay={(i % 4) * 0.06} className="h-full">
            <div className="card card-hover h-full p-5">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-display text-base font-semibold">{g.group}</h3>
                <span className="font-mono text-[10px] text-muted">J{i + 1}</span>
              </div>
              {/* pin-header style list */}
              <ul className="space-y-1.5">
                {g.items.map((s) => (
                  <li key={s} className="group flex items-center gap-3 text-sm text-soft">
                    <span className="h-2.5 w-2.5 shrink-0 rounded-[2px] border border-copper/70 bg-copper/20 transition group-hover:bg-copper" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
