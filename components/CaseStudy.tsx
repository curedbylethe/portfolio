import type { ReactNode } from 'react'

interface CaseStudyStation {
  title: string
  content: ReactNode
}

interface CaseStudyProps {
  id: string
  label: string
  title: string
  sources: string
  status: string
  stations: CaseStudyStation[]
}

export default function CaseStudy({ id, label, title, sources, status, stations }: CaseStudyProps) {
  return (
    <article className="fp-project-case-study" aria-labelledby={`${id}-title`}>
      <header className="fp-project-case-title">
        <div>
          <span className="fp-project-case-label">{label}</span>
          <h3 id={`${id}-title`}>{title}</h3>
        </div>
        <dl>
          <dt>Sources</dt>
          <dd>{sources}</dd>
          <dt>Status</dt>
          <dd>{status}</dd>
        </dl>
      </header>
      <div className="fp-project-case-grid">
        <nav className="fp-project-case-nav" aria-label="Case study stations">
          <ol>
            {stations.map((station, index) => (
              <li key={station.title}>
                <a href={`#${id}-${index + 1}`}>
                  <span aria-hidden="true">{index + 1}</span>
                  {station.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="fp-project-case-stations">
          {stations.map((station, index) => (
            <section
              key={station.title}
              id={`${id}-${index + 1}`}
              className="fp-project-case-station"
              aria-labelledby={`${id}-${index + 1}-title`}
            >
              <h4 id={`${id}-${index + 1}-title`}>
                <span aria-hidden="true">{index + 1}</span>
                <span>{station.title}</span>
              </h4>
              <div className="fp-project-case-body">{station.content}</div>
            </section>
          ))}
        </div>
      </div>
    </article>
  )
}
