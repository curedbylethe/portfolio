'use client'

import { usePathname } from 'next/navigation'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import MobileNav from './MobileNav'

const Header = () => {
  const pathname = usePathname()
  let headerClass = 'fp-header flex items-center w-full justify-between py-6'
  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 z-50'
  }

  return (
    <header className={headerClass}>
      <Link href="/" aria-label={siteMetadata.headerTitle} className="fp-wordmark">
        {siteMetadata.headerTitle}
      </Link>
      <div className="flex items-center gap-4 leading-5 sm:space-x-6">
        <nav aria-label="Sections" className="fp-nav flex flex-wrap items-center gap-x-6">
          {headerNavLinks
            .filter((link) => link.href !== '/')
            .map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="fp-nav-link m-1 font-medium"
                aria-current={pathname === link.href ? 'page' : undefined}
              >
                {link.title}
              </Link>
            ))}
        </nav>
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
