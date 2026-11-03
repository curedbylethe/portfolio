import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'

export default function Home() {
  return (
    <div className="fp-home">
      <section className="fp-intro" aria-labelledby="home-title">
        <h1 id="home-title" className="fp-home-title">{siteMetadata.headerTitle}</h1>
        <span className="fp-rule" aria-hidden="true" />
        <p>{siteMetadata.description}</p>
      </section>
      <nav className="fp-index" aria-label="Sections">
        <Link href="/projects"><span>Projects</span><span>01</span></Link>
        <Link href="/blog"><span>Blog</span><span>02</span></Link>
        <Link href="/about"><span>About</span><span>03</span></Link>
      </nav>
    </div>
  )
}
