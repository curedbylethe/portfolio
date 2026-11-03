import Link from './Link'
import siteMetadata from '@/data/siteMetadata'

export default function Footer() {
  return (
    <footer className="fp-footer">
      <div className="mx-auto flex w-full max-w-5xl flex-col justify-between gap-3 px-5 py-6 sm:flex-row sm:items-center">
        {siteMetadata.email && <a href={`mailto:${siteMetadata.email}`}>{siteMetadata.email}</a>}
        <div className="flex flex-wrap gap-2">
          <div>{siteMetadata.author}</div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <Link href="/">{siteMetadata.title}</Link>
        </div>
      </div>
    </footer>
  )
}
