import { evidenceClass, evidenceLabel } from '../styles'
import type { BoardEvidence } from '../types'

/** A source link, when there is one, followed by its provenance tag. */
export function Evidence({ evidence }: { evidence: BoardEvidence }) {
  return (
    <>
      {evidence.url ? (
        <a className="fb-link" href={evidence.url}>
          {evidence.label ?? evidence.url}
        </a>
      ) : (
        evidence.label && <span className="fb-source">{evidence.label}</span>
      )}
      <span className={evidenceClass[evidence.status]} title={evidence.description}>
        {evidenceLabel[evidence.status]}
      </span>
    </>
  )
}
