import { Bot, BrainCircuit, Cpu, Globe, GraduationCap, MapPin } from 'lucide-react'
import { about, education, profile, type FocusIcon } from '../data/profile'
import { Section, Reveal } from './Section'
import Avatar from './Avatar'

/** Photo framed as an IC package: copper pins on all four sides. */
function ChipFrame() {
  const pins = Array.from({ length: 7 })
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[340px] p-6">
      {/* pins */}
      {(['top', 'bottom'] as const).map((side) => (
        <div key={side} className={`absolute inset-x-12 flex justify-between ${side === 'top' ? 'top-0' : 'bottom-0'}`}>
          {pins.map((_, i) => <span key={i} className="h-6 w-2 rounded-sm bg-gradient-to-b from-copper to-[#8a6424]" />)}
        </div>
      ))}
      {(['left', 'right'] as const).map((side) => (
        <div key={side} className={`absolute inset-y-12 flex flex-col justify-between ${side === 'left' ? 'left-0' : 'right-0'}`}>
          {pins.map((_, i) => <span key={i} className="h-2 w-6 rounded-sm bg-gradient-to-r from-copper to-[#8a6424]" />)}
        </div>
      ))}
      <div className="relative h-full w-full overflow-hidden rounded-2xl border border-[#2a2d2f] bg-[#121314] p-2.5 shadow-[0_30px_80px_-30px_rgba(62,224,143,0.35)]">
        <Avatar className="h-full w-full rounded-xl" />
        <span className="absolute left-4 top-4 h-2.5 w-2.5 rounded-full bg-[#2c2e30] ring-1 ring-black" />
        <div className="absolute inset-x-2.5 bottom-2.5 rounded-b-xl bg-gradient-to-t from-black/85 to-transparent px-4 pb-3 pt-10 font-mono text-[11px] text-[#cfd8d3]">
          VKP-2027 · ECE · RGUKT
        </div>
      </div>
    </div>
  )
}

const FOCUS_ICONS: Record<FocusIcon, typeof Cpu> = { cpu: Cpu, bot: Bot, brain: BrainCircuit, globe: Globe }

export default function About() {
  return (
    <Section id="about" kicker="01 · About" title="Engineer who ships to real hardware.">
      <div className="grid items-center gap-10 md:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal><ChipFrame /></Reveal>
        <div>
          <Reveal>
            <p className="font-display text-xl leading-snug text-ink md:text-2xl">{about.lead}</p>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1.5 text-sm text-muted">
              <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-signal text-signal" />{about.now}
            </p>
          </Reveal>

          <div className="mt-8 grid grid-cols-2 gap-3">
            {about.focus.map((f, i) => {
              const Icon = FOCUS_ICONS[f.icon]
              return (
                <Reveal key={f.title} delay={0.08 + i * 0.06} className="h-full">
                  <div className="card card-hover h-full p-4 sm:p-5">
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-signal/10 text-signal"><Icon size={18} /></span>
                    <div className="mt-3 font-display text-[15px] font-semibold sm:text-base">{f.title}</div>
                    <div className="mt-1 font-mono text-[11px] leading-snug text-muted">{f.detail}</div>
                  </div>
                </Reveal>
              )
            })}
          </div>

          <Reveal delay={0.35}>
            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              {education.map((e) => (
                <span key={e.degree} className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface/60 px-3 py-2 text-sm">
                  <GraduationCap size={15} className="text-signal" />
                  <span className="font-medium">{e.degree}</span>
                  <span className="text-muted">{e.period}</span>
                  <span className="font-mono text-xs text-copper">{e.score}</span>
                </span>
              ))}
              <span className="inline-flex items-center gap-1.5 px-1 text-sm text-muted"><MapPin size={14} className="text-copper" />{profile.location}</span>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
