import { useEffect, useState } from 'react'
import { Menu, X, FileDown } from 'lucide-react'
import { profile } from '../data/profile'

const links = [
  ['About', '#about'],
  ['Experience', '#experience'],
  ['Projects', '#projects'],
  ['Hardware Lab', '#lab'],
  ['Skills', '#skills'],
  ['Recognition', '#achievements'],
  ['Contact', '#contact'],
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'border-b border-line bg-bg/75 backdrop-blur-xl' : ''}`}>
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="group flex items-center gap-2.5" aria-label="Home">
          <span className="relative grid h-9 w-9 place-items-center rounded-lg border border-copper/60 bg-surface font-mono text-xs font-semibold text-signal">
            VK
            <span className="absolute -left-1 top-2 h-0.5 w-1 bg-copper" />
            <span className="absolute -left-1 bottom-2 h-0.5 w-1 bg-copper" />
            <span className="absolute -right-1 top-2 h-0.5 w-1 bg-copper" />
            <span className="absolute -right-1 bottom-2 h-0.5 w-1 bg-copper" />
          </span>
          <span className="font-display text-sm font-semibold tracking-tight">{profile.name}</span>
        </a>
        <div className="hidden items-center gap-1 lg:flex">
          {links.map(([l, h]) => (
            <a key={h} href={h} className="rounded-md px-3 py-2 text-sm text-muted transition-colors hover:text-ink">{l}</a>
          ))}
          <a href={profile.resume} download className="ml-2 inline-flex items-center gap-2 rounded-lg border border-signal/40 bg-signal/10 px-3.5 py-2 text-sm font-medium text-signal transition hover:bg-signal/20">
            <FileDown size={15} /> Resume
          </a>
        </div>
        <button className="lg:hidden rounded-md p-2 text-ink" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
      {open && (
        <div id="mobile-menu" className="border-t border-line bg-bg/95 px-4 pb-4 backdrop-blur-xl lg:hidden">
          {links.map(([l, h]) => (
            <a key={h} href={h} onClick={() => setOpen(false)} className="block border-b border-line py-3 text-sm text-muted">{l}</a>
          ))}
          <a href={profile.resume} download className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-signal"><FileDown size={15} /> Download resume</a>
        </div>
      )}
    </header>
  )
}
