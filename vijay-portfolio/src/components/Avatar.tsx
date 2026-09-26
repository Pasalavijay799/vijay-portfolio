import { useState } from 'react'
import { profile } from '../data/profile'

/**
 * Profile photo with an initials fallback until public/profile.jpg exists.
 * `face` zooms in on the head — for small circular badges where a full portrait would be tiny.
 */
export default function Avatar({ className = '', face = false }: { className?: string; face?: boolean }) {
  const [failed, setFailed] = useState(false)
  if (failed)
    return (
      <div className={`@container grid place-items-center bg-gradient-to-br from-surface-2 to-bg font-display font-semibold text-signal ${className}`}>
        <span className="text-[34cqw] leading-none tracking-tight">VK</span>
      </div>
    )
  const img = (
    <img
      src={profile.photo}
      alt={profile.name}
      onError={() => setFailed(true)}
      className={face ? 'h-full w-full origin-[50%_28%] scale-[1.9] object-cover' : `object-cover ${className}`}
    />
  )
  return face ? <div className={`overflow-hidden bg-white ${className}`}>{img}</div> : img
}
