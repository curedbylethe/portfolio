'use client'

import { useBoardData } from '../hooks/useBoard'
import { cx, evidenceClass, evidenceLabel } from '../styles'
import type { BoardEvidence, EvidenceStatus } from '../types'

const STATUS_TEXT: Record<EvidenceStatus, string> = {
  documented: 'Stated in the source.',
  inferred: 'Inferred; not stated directly.',
  illustrative: 'Explanatory; not a claim about the code.',
}

/** Explains only the kinds and evidence statuses this board actually uses. */
export function BoardLegend({ className }: { className?: string }) {
  const { data } = useBoardData().index
  const nodeKinds = [...new Set(data.nodes.map((n) => n.kind))]
  const edgeKinds = [...new Set(data.edges.map((e) => e.kind))]
  const evidence: BoardEvidence[] = [
    ...data.nodes.flatMap((n) => n.evidence ?? []),
    ...data.edges.flatMap((e) => e.evidence ?? []),
    ...(data.traces ?? []).flatMap((t) => t.steps.flatMap((s) => s.evidence ?? [])),
  ]
  const statuses = (Object.keys(STATUS_TEXT) as EvidenceStatus[]).filter((s) =>
    evidence.some((e) => e.status === s)
  )
  const hasTraces = (data.traces?.length ?? 0) > 0

  return (
    <dl className={cx('fb-legend', className)}>
      {nodeKinds.map((kind) => {
        const meta = data.nodeKinds?.[kind]
        return (
          <div key={`n-${kind}`}>
            <dt>
              <span
                className={cx('fb-legend-node', meta?.stroke === 'dashed' && 'fb-node--dashed')}
                aria-hidden="true"
              />
              {meta?.label ?? kind}
            </dt>
            {meta?.description && <dd>{meta.description}</dd>}
          </div>
        )
      })}
      {edgeKinds.map((kind) => {
        const meta = data.edgeKinds?.[kind]
        return (
          <div key={`e-${kind}`}>
            <dt>
              <span
                className={cx(
                  'fb-legend-edge',
                  meta?.stroke === 'dashed' && 'fb-legend-edge--dashed'
                )}
                aria-hidden="true"
              />
              {meta?.label ?? kind}
            </dt>
            {meta?.description && <dd>{meta.description}</dd>}
          </div>
        )
      })}
      {statuses.map((status) => (
        <div key={status}>
          <dt>
            <span className={evidenceClass[status]}>{evidenceLabel[status]}</span>
          </dt>
          <dd>{STATUS_TEXT[status]}</dd>
        </div>
      ))}
      {hasTraces && (
        <div>
          <dt>
            <span className="fb-legend-badge" aria-hidden="true">
              2·4
            </span>
            Step numbers
          </dt>
          <dd>Order in the active trace. A node visited twice shows two numbers.</dd>
        </div>
      )}
    </dl>
  )
}
