import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function AuthorLayout({ children }: Props) {
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
          </div>
        </div>
      </div>
    </>
  )
}
