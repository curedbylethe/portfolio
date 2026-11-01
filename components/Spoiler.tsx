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

  if (revealed) return <span className="transition-[filter] duration-300">{children}</span>

  return (
    <span
      role="button"
      tabIndex={0}
      onClick={reveal}
      onKeyDown={onKeyDown}
      className="cursor-pointer blur-xl transition-[filter] duration-300"
    >
      {children}
    </span>
  )
}
