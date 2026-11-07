'use client'

import { Handle, Position, type NodeProps } from '@xyflow/react'
import { useBoardActions, useBoardData, useBoardSelection, useBoardTrace } from '../hooks/useBoard'
import { useRevealNode } from '../hooks/useViewport'
import type { FlowNode } from '../hooks/useGraphElements'
import { cx } from '../styles'
import type { BoardNodeRendererProps } from '../types'

const stepsText = (steps: readonly number[]) =>
  steps.length === 1
    ? `step ${steps[0]}`
    : `steps ${steps.slice(0, -1).join(', ')} and ${steps[steps.length - 1]}`

/** Generic node: label, subtitle, selection, trace step badge and an optional note. */
export function DefaultBoardNode({
  node,
  kind,
  selected,
  dimmed,
  steps,
  onSelect,
}: BoardNodeRendererProps) {
  return (
    <>
      <button
        type="button"
        className={cx(
          'fb-node',
          kind?.stroke === 'dashed' && 'fb-node--dashed',
          dimmed && 'is-off'
        )}
        aria-pressed={selected}
        onClick={onSelect}
        data-kind={node.kind}
      >
        {node.label}
        {node.subtitle && <small>{node.subtitle}</small>}
        {steps.length > 0 && (
          <>
            <span className="fb-badge" aria-hidden="true">
              {steps.join('·')}
            </span>
            <span className="fb-sr">, {stepsText(steps)}</span>
          </>
        )}
        {dimmed && <span className="fb-sr">, not in this trace</span>}
      </button>
      {node.note && (
        <span className="fb-node-note" aria-hidden="true">
          {node.note}
        </span>
      )}
    </>
  )
}

/** React Flow node type. Resolves the board node and its state, then calls the renderer for its kind. */
export function BoardNodeHost({ data }: NodeProps<FlowNode>) {
  const { index, nodeRenderers } = useBoardData()
  const { selectedNodeId } = useBoardSelection()
  const { activeTrace, highlight } = useBoardTrace()
  const { selectNode } = useBoardActions()
  const reveal = useRevealNode(index)

  const node = index.nodes.get(data.nodeId)
  if (!node) return null
  const steps = highlight.nodeSteps.get(node.id) ?? []
  const Renderer = nodeRenderers[node.kind] ?? DefaultBoardNode

  return (
    // Focus can land on an off-screen node; pan to it instead of letting the browser scroll the pane.
    <div
      className="fb-node-host"
      onFocus={(e) => {
        e.currentTarget.closest('.react-flow')?.scrollTo(0, 0)
        reveal(node.id)
      }}
    >
      <Handle type="target" position={Position.Top} isConnectable={false} className="fb-handle" />
      <Renderer
        node={node}
        kind={index.data.nodeKinds?.[node.kind]}
        selected={selectedNodeId === node.id}
        dimmed={activeTrace !== undefined && steps.length === 0}
        steps={steps}
        onSelect={() => selectNode(node.id)}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={false}
        className="fb-handle"
      />
    </div>
  )
}
