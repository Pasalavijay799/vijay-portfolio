import { GraduationCap, MapPin } from 'lucide-react'
import { about, education, profile } from '../data/profile'
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

export default function About() {
  return (
    <Section id="about" kicker="01 · About" title="Engineer who ships to real hardware.">
      <div className="grid items-center gap-12 md:grid-cols-[0.9fr_1.1fr]">
        <Reveal><ChipFrame /></Reveal>
        <div>
          {about.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p className="mb-5 text-base leading-relaxed text-muted md:text-lg [&:first-child]:text-ink">{p}</p>
            </Reveal>
          ))}
          <Reveal delay={0.25}>
            <p className="mb-8 flex items-center gap-2 text-sm text-muted"><MapPin size={15} className="text-copper" /> {profile.location}</p>
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2">
            {education.map((e, i) => (
              <Reveal key={e.degree} delay={0.3 + i * 0.08} className="h-full">
                <div className="card h-full p-5">
                  <GraduationCap size={18} className="mb-3 text-signal" />
                  <div className="font-display text-base font-semibold">{e.degree}</div>
                  <div className="mt-1 text-sm text-muted">{e.school} · {e.period}</div>
                  <div className="mt-3 inline-block font-mono text-xs text-copper">{e.score}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
