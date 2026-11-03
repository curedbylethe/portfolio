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
  let headerClass = 'fp-header flex items-center w-full justify-between py-6'
  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 z-50'
  }

  return (
    <header className={headerClass}>
      <Link href="/" aria-label={siteMetadata.headerTitle} className="fp-wordmark">
        {siteMetadata.headerTitle}
      </Link>
      <nav aria-label="Sections" className="fp-nav flex flex-wrap items-center gap-x-6">
        {sections.map((link) => (
          <Link
            key={link.title}
            href={link.href}
            className="fp-nav-link m-1 font-medium"
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
    </header>
  )
}

export default Header
