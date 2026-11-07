import type { ReactNode } from 'react'

interface DecisionRecordProps {
  id: string
  title: string
  choice: string
  cost: string
  children: ReactNode
}

export default function DecisionRecord({ id, title, choice, cost, children }: DecisionRecordProps) {
  return (
    <details id={id.toLowerCase()} className="fp-project-record">
      <summary>
        <span className="fp-project-record-id">{id}</span>
        <span className="fp-project-record-title">{title}</span>
        <span className="fp-project-record-gist">
          <b>Chose</b> {choice} <b>Cost</b> {cost}
        </span>
      </summary>
      <div className="fp-project-record-body">{children}</div>
    </details>
  )
}
