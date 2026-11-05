import { ReactNode } from 'react'
import type { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import ScrollTop from '@/components/ScrollTop'

interface LayoutProps {
  content: CoreContent<Blog>
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
}

export default function PostLayout({ content, next, prev, children }: LayoutProps) {
  const { date, title, tags } = content

  return (
    <SectionContainer>
      <ScrollTop />
      <article className="fp-article">
        <header className="fp-article-heading">
          <Link href="/blog" className="fp-detail-back">
            ← Back to Blog
          </Link>
          <p className="fp-detail-date">
            <time dateTime={date}>
              {new Date(date).toISOString().slice(0, 10).replaceAll('-', '.')}
            </time>
          </p>
          <PageTitle>{title}</PageTitle>
          {tags && (
            <div className="fp-detail-tags" aria-label="Post topics">
              {tags.map((tag) => (
                <Tag key={tag} text={tag} />
              ))}
            </div>
          )}
        </header>
        <div className="fp-article-content">
          <div className="prose max-w-none">{children}</div>
          {(next || prev) && (
            <nav className="fp-post-pagination" aria-label="Post navigation">
              {prev?.path && <Link href={`/${prev.path}`}>{prev.title}</Link>}
              {next?.path && <Link href={`/${next.path}`}>{next.title}</Link>}
            </nav>
          )}
        </div>
      </article>
    </SectionContainer>
  )
}
