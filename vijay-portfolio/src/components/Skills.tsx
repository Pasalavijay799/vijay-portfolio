import { Bot, Code2, Cpu, Eye, Radio, Waves, Wrench } from 'lucide-react'
import { skills, type SkillIcon } from '../data/profile'
import { Section, Reveal } from './Section'

const ICONS: Record<SkillIcon, typeof Cpu> = { code: Code2, cpu: Cpu, radio: Radio, bot: Bot, wave: Waves, eye: Eye, wrench: Wrench }

export default function Skills() {
  return (
    <Section id="skills" kicker="05 · Skills" title="Toolchain.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((g, i) => {
          const Icon = ICONS[g.icon]
          return (
            <Reveal key={g.group} delay={(i % 4) * 0.06} className={`h-full ${i === skills.length - 1 && skills.length % 4 === 3 ? 'sm:col-span-2 lg:col-span-2' : ''}`}>
              <div className="card card-hover h-full p-5">
                <div className="mb-4 flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-copper/10 text-copper"><Icon size={18} /></span>
                  <h3 className="font-display text-base font-semibold">{g.group}</h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {g.items.map((s) => <span key={s} className="chip-tag">{s}</span>)}
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
