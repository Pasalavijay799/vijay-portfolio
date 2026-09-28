import { useState } from 'react'
import { Check, Copy, Github, Linkedin, Mail, FileDown } from 'lucide-react'
import { profile } from '../data/profile'
import { Section, Reveal } from './Section'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try { await navigator.clipboard.writeText(profile.email); setCopied(true); setTimeout(() => setCopied(false), 1600) } catch { /* ignore */ }
  }
  return (
    <>
      <Section id="contact" kicker="07 · Contact" title="Let’s build something that runs on real hardware." intro="Open to embedded, robotics and edge-AI roles, internships and research collaborations.">
        <Reveal>
          <div className="card overflow-hidden">
            <div className="flex items-center gap-2 border-b border-line px-4 py-2.5 font-mono text-[11px] text-muted">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" /><span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" /><span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-2">vijay@uart0 — 115200 baud</span>
            </div>
            <div className="space-y-2 p-6 font-mono text-sm md:p-8 md:text-base">
              <div className="text-muted">$ ./contact --all</div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-signal">email</span>
                <a href={`mailto:${profile.email}`} className="text-ink hover:underline">{profile.email}</a>
                <button onClick={copy} className="rounded-md border border-line p-1.5 text-muted hover:text-ink" aria-label="Copy email">{copied ? <Check size={14} /> : <Copy size={14} />}</button>
              </div>
              {profile.phone && <div><span className="text-signal">phone</span> <span className="ml-3 text-ink">{profile.phone}</span></div>}
              <div><span className="text-signal">github</span> <a className="ml-3 text-ink hover:underline" href={profile.socials.github} target="_blank" rel="noreferrer">{profile.socials.github.replace('https://', '')}</a></div>
              <div><span className="text-signal">linkedin</span> <a className="ml-3 break-all text-ink hover:underline" href={profile.socials.linkedin} target="_blank" rel="noreferrer">{profile.socials.linkedin.replace('https://www.', '')}</a></div>
              <div className="caret text-muted">$ </div>
            </div>
            <div className="flex flex-wrap gap-3 border-t border-line p-6 md:px-8">
              <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 rounded-xl bg-signal px-5 py-3 text-sm font-semibold text-bg hover:brightness-110"><Mail size={16} /> Say hello</a>
              <a href={profile.resume} download className="inline-flex items-center gap-2 rounded-xl border border-line px-5 py-3 text-sm font-medium hover:border-signal/50"><FileDown size={16} /> Resume</a>
              <a href={profile.socials.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-line px-5 py-3 text-sm font-medium hover:border-signal/50"><Github size={16} /> GitHub</a>
              <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-line px-5 py-3 text-sm font-medium hover:border-signal/50"><Linkedin size={16} /> LinkedIn</a>
            </div>
          </div>
        </Reveal>
      </Section>
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-2 px-4 py-8 text-xs text-muted sm:flex-row sm:px-6 lg:px-12">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span className="font-mono">built with React · Three.js · R3F</span>
        </div>
      </footer>
    </>
  )
}
