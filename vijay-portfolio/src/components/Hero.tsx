import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Mail, Cpu } from 'lucide-react'
import { profile, experience } from '../data/profile'
import Avatar from './Avatar'
import SafeCanvas, { hasWebGL } from './SafeCanvas'

const HeroScene = lazy(() => import('../three/Scenes').then((m) => ({ default: m.HeroScene })))

function useTyped(words: string[], speed = 70, hold = 1600) {
  const [i, setI] = useState(0)
  const [txt, setTxt] = useState('')
  const [del, setDel] = useState(false)
  useEffect(() => {
    const word = words[i % words.length]
    const t = setTimeout(
      () => {
        if (!del && txt === word) return setDel(true)
        if (del && txt === '') {
          setDel(false)
          return setI(i + 1)
        }
        setTxt(del ? word.slice(0, txt.length - 1) : word.slice(0, txt.length + 1))
      },
      !del && txt === word ? hold : del ? speed / 2 : speed,
    )
    return () => clearTimeout(t)
  }, [txt, del, i, words, speed, hold])
  return txt
}

const fade = (d: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay: d, ease: [0.22, 1, 0.36, 1] as const },
})

export default function Hero() {
  const typed = useTyped(profile.rotatingRoles)
  const current = experience.find((e) => e.current)
  // pause the WebGL render loop when the hero is off-screen
  const ref = useRef<HTMLElement>(null)
  const [active, setActive] = useState(true)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting))
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  return (
    <section ref={ref} id="top" className="relative flex min-h-[100svh] items-center overflow-hidden">
      <div className="glow-top pointer-events-none absolute inset-0" />
      {/* 3D board scene */}
      <div className="absolute inset-0 opacity-45 lg:left-[40%] lg:opacity-100">
        {hasWebGL && (
          <SafeCanvas>
            <Suspense fallback={null}>
              <HeroScene active={active} />
            </Suspense>
          </SafeCanvas>
        )}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-bg via-bg/70 to-transparent lg:via-bg/30" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />

      <div className="relative mx-auto w-full max-w-[1440px] px-4 pt-24 sm:px-6 lg:px-12">
        <div className="max-w-xl">
          {current && (
            <motion.div {...fade(0.1)} className="mb-7 inline-flex items-center gap-3 rounded-full border border-line bg-surface/70 py-1.5 pl-1.5 pr-4 backdrop-blur">
              <Avatar face className="h-8 w-8 shrink-0 rounded-full ring-1 ring-signal/50" />
              <span className="text-xs text-muted sm:text-sm">
                <span className="pulse-dot mr-2 inline-block h-1.5 w-1.5 rounded-full bg-signal align-middle text-signal" />
                {current.role} @ <span className="text-ink">{current.org}</span>
              </span>
            </motion.div>
          )}
          <motion.p {...fade(0.2)} className="kicker mb-4">// firmware · robotics · on-device AI</motion.p>
          <motion.h1 {...fade(0.3)} className="font-display text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl">
            Vijay Kumar
            <br />
            <span className="bg-gradient-to-r from-signal via-[#9af0c4] to-copper bg-clip-text text-transparent">Pasala</span>
          </motion.h1>
          <motion.div {...fade(0.45)} className="mt-6 flex items-center gap-3 font-mono text-base text-ink sm:text-lg">
            <Cpu size={18} className="text-copper" />
            <span className="caret">{typed}</span>
          </motion.div>
          <motion.p {...fade(0.55)} className="mt-5 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
            {profile.tagline}
          </motion.p>
          <motion.div {...fade(0.7)} className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#projects" className="rounded-xl bg-signal px-5 py-3 text-sm font-semibold text-bg transition hover:brightness-110">View projects</a>
            <a href="#lab" className="rounded-xl border border-line bg-surface/70 px-5 py-3 text-sm font-medium text-ink backdrop-blur transition hover:border-signal/50">Explore the hardware lab</a>
            <div className="ml-1 flex items-center gap-1">
              {[
                { href: profile.socials.github, Icon: Github, label: 'GitHub', external: true },
                { href: profile.socials.linkedin, Icon: Linkedin, label: 'LinkedIn', external: true },
                { href: `mailto:${profile.email}`, Icon: Mail, label: 'Email', external: false },
              ].map(({ href, Icon, label, external }) => (
                <a key={label} href={href} {...(external && { target: '_blank', rel: 'noreferrer' })} aria-label={label} className="rounded-lg p-2.5 text-muted transition hover:bg-surface hover:text-ink">
                  <Icon size={19} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div {...fade(0.9)} className="mt-16 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
          {profile.stats.map((s) => (
            <div key={s.label} className="bg-bg/80 px-4 py-4 backdrop-blur">
              <div className="font-display text-2xl font-semibold text-ink">{s.value}</div>
              <div className="mt-1 text-xs leading-snug text-muted">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <a href="#about" aria-label="Scroll down" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 animate-bounce text-muted md:block">
        <ArrowDown size={20} />
      </a>
    </section>
  )
}
