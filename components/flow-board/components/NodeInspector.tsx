'use client'

import { useBoardData, useBoardSelection } from '../hooks/useBoard'
import { cx } from '../styles'
import { Evidence } from './Evidence'

export interface NodeInspectorProps {
  className?: string
  emptyLabel?: string
}

/** Details of the selected node, read from data. Announced politely; never takes focus. */
export function NodeInspector({
  className,
  emptyLabel = 'Select a node to see what it does.',
}: NodeInspectorProps) {
  const { index } = useBoardData()
  const { selectedNodeId } = useBoardSelection()
  const node = selectedNodeId ? index.nodes.get(selectedNodeId) : undefined

  return (
    <div className={cx('fb-inspector', className)} aria-live="polite">
      {node ? (
        <div className="fb-inspect">
          <span className="fb-mono fb-muted">
            {node.eyebrow ??
              [index.data.nodeKinds?.[node.kind]?.label ?? node.kind, node.subtitle]
                .filter(Boolean)
                .join(' · ')}
          </span>
          <h3>{node.label}</h3>
          {node.groupId && index.groups.has(node.groupId) && (
            <span className="fb-sr">Inside {index.groups.get(node.groupId)?.label}.</span>
          )}
          {node.details?.length ? (
            <dl>
              {node.details.map((section, i) => (
                <div key={section.id ?? i}>
                  <dt>{section.label}</dt>
                  <dd>{section.content}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="fb-muted">No description recorded.</p>
          )}
          {node.evidence?.length ? (
            <p className="fb-evidence">
              {node.evidence.map((evidence, i) => (
                <Evidence key={i} evidence={evidence} />
              ))}
            </p>
          ) : null}
        </div>
      ) : (
        <p className="fb-empty">{emptyLabel}</p>
      )}
    </div>
  )
}
