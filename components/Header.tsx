'use client'

import { usePathname } from 'next/navigation'
import siteMetadata from '@/data/siteMetadata'
import Link from './Link'

const sections = [
  { href: '/projects', title: 'Projects', index: '01' },
  { href: '/blog', title: 'Blog', index: '02' },
  { href: '/about', title: 'About', index: '03' },
]

const Header = () => {
  const pathname = usePathname()
  if (pathname === '/') return null
  let headerClass = 'fp-header'
  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 z-50'
  }

  return (
    <header className={headerClass}>
      <div className="fp-header-inner">
        <Link href="/" aria-label={siteMetadata.headerTitle} className="fp-wordmark">
          {siteMetadata.headerTitle}
        </Link>
        <nav aria-label="Sections" className="fp-nav">
          {sections.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="fp-nav-link"
              aria-current={
                pathname === link.href || pathname.startsWith(`${link.href}/`) ? 'page' : undefined
              }
            >
              <span className="fp-nav-index" aria-hidden="true">
                {link.index}
              </span>
              {link.title}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Header
