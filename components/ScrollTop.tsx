'use client'

import { useEffect, useState } from 'react'

const ScrollTop = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handleWindowScroll = () => setShow(window.scrollY > 50)
    window.addEventListener('scroll', handleWindowScroll)
    return () => window.removeEventListener('scroll', handleWindowScroll)
  }, [])

  return (
    <div className={`fixed right-8 bottom-8 hidden ${show ? 'md:block' : 'md:hidden'}`}>
      <button
        aria-label="Scroll To Top"
        onClick={() => window.scrollTo({ top: 0 })}
        className="rounded-full bg-[var(--bg-sunk)] p-2 text-[var(--text-muted)] transition-all hover:bg-[var(--state-hover)]"
      >
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  )
}

export default ScrollTop
