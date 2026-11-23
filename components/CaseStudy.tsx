'use client'

import { useRef, useState, type KeyboardEvent, type ReactNode } from 'react'

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
  /** One-line result shown above the tabs, so a skimmer need not open "What shipped". */
  outcome?: ReactNode
  stations: CaseStudyStation[]
}

export default function CaseStudy({
  id,
  label,
  title,
  sources,
  status,
  outcome,
  stations,
}: CaseStudyProps) {
  const [selected, setSelected] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number
    switch (event.key) {
      case 'ArrowRight':
        next = (index + 1) % stations.length
        break
      case 'ArrowLeft':
        next = (index + stations.length - 1) % stations.length
        break
      case 'Home':
        next = 0
        break
      case 'End':
        next = stations.length - 1
        break
      default:
        return
    }
    event.preventDefault()
    setSelected(next)
    tabs.current[next]?.focus()
  }

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
      {outcome && (
        <p className="fp-project-case-outcome">
          <b>Outcome</b>
          {outcome}
        </p>
      )}
      <div className="fp-project-case-nav" role="tablist" aria-label="Case study stations">
        {stations.map((station, index) => (
          <button
            key={station.title}
            ref={(element) => {
              tabs.current[index] = element
            }}
            type="button"
            role="tab"
            id={`${id}-tab-${index + 1}`}
            aria-controls={`${id}-${index + 1}`}
            aria-selected={selected === index}
            tabIndex={selected === index ? 0 : -1}
            onClick={() => setSelected(index)}
            onKeyDown={(event) => onKeyDown(event, index)}
          >
            <small aria-hidden="true">{String(index + 1).padStart(2, '0')}</small>
            {station.title}
          </button>
        ))}
      </div>
      {stations.map((station, index) => (
        <section
          key={station.title}
          id={`${id}-${index + 1}`}
          className="fp-project-case-station"
          role="tabpanel"
          aria-labelledby={`${id}-tab-${index + 1}`}
          hidden={selected !== index}
          tabIndex={0}
        >
          <div className="fp-project-case-body">{station.content}</div>
        </section>
      ))}
    </article>
  )
}
