import { ReactNode } from 'react'
import type { Authors } from 'contentlayer/generated'
import SocialIcon from '@/components/social-icons'
import BracketLink from '@/components/BracketLink'

interface Props {
  children: ReactNode
  content: Omit
}

export default function AuthorLayout({ children, content }: Props) {
  const { email, twitter, bluesky, linkedin, github } = content

  return (
    <>
      <div className="fp-about">
        <div>
          <div className="fp-section-head">
            <span className="fp-section-ghost" aria-hidden="true">
              03
            </span>
            <span className="fp-section-num">03</span>
            <h1 className="fp-page-title">About</h1>
          </div>
        </div>
        <div className="fp-about-content">
          <div className="fp-about-prose">
            <div className="fp-about-overview">{children}</div>
            <h2>Now</h2>
            <div className="fp-about-now">
              Solo-building Catlog, a Telegram-based music platform for communities. I pick up side
              projects when an idea lands and use whatever fits. Open to open-source work,
              especially projects I use.
            </div>
            <h2>Facts</h2>
            <dl className="fp-facts">
              <dt>Based</dt>
              <dd>Tehran (UTC+03:30)</dd>
              <dt>Stack</dt>
              <dd>React/Next.js, Node, Fastify, PostgreSQL, Redis, BullMQ, Rust, Docker, Linux</dd>
              <dt>Availability</dt>
              <dd>Available</dd>
              <dt>Social links</dt>
              <dd className="fp-facts-social">
                <SocialIcon kind="mail" href={`mailto:${email}`} />
                {github && (
                  <BracketLink href={github} target="_blank" rel="noopener noreferrer">
                    GITHUB
                  </BracketLink>
                )}
                <SocialIcon kind="linkedin" href={linkedin} />
                <SocialIcon kind="x" href={twitter} />
                <SocialIcon kind="bluesky" href={bluesky} />
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </>
  )
}
