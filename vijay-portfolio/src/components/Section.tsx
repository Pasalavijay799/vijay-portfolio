import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

export function Section({ id, kicker, title, intro, children, className = '' }: {
  id: string; kicker: string; title: string; intro?: string; children: ReactNode; className?: string
}) {
  return (
    <section id={id} className={`relative mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-32 ${className}`}>
      <motion.header
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-12 max-w-2xl"
      >
        <p className="kicker mb-3">{kicker}</p>
        <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">{title}</h2>
        {intro && <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">{intro}</p>}
      </motion.header>
      {children}
    </section>
  )
}

export function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
