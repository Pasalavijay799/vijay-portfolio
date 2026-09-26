import { useState } from 'react'
import { profile } from '../data/profile'

/** Profile photo with an initials fallback until public/profile.jpg exists. */
export default function Avatar({ className = '' }: { className?: string }) {
  const [failed, setFailed] = useState(false)
  if (failed)
    return (
      <div className={`@container grid place-items-center bg-gradient-to-br from-surface-2 to-bg font-display font-semibold text-signal ${className}`}>
        <span className="text-[34cqw] leading-none tracking-tight">VK</span>
      </div>
    )
  return <img src={profile.photo} alt={profile.name} onError={() => setFailed(true)} className={`object-cover ${className}`} />
}
