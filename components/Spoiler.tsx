'use client'

import { KeyboardEvent, ReactNode, useState } from 'react'

export default function Spoiler({ children }: { children: ReactNode }) {
  const [revealed, setRevealed] = useState(false)

  const reveal = () => setRevealed(true)
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      reveal()
    }
  }

  if (revealed) return <span>{children}</span>

  return (
    <span
      role="button"
      tabIndex={0}
      onClick={reveal}
      onKeyDown={onKeyDown}
      className="relative inline-block cursor-pointer"
    >
      <span className="spoiler-pixels">{children}</span>
      <span aria-hidden className="spoiler-foil pointer-events-none absolute inset-0" />
    </span>
  )
}
