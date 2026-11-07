'use client'

import { useEffect, useId, useRef, type ReactNode } from 'react'
import { ReactFlow } from '@xyflow/react'
import { useBoardData, useBoardSelection } from '../hooks/useBoard'
import { useGraphElements } from '../hooks/useGraphElements'
import { useCoarsePointer, useFitBoard, useRevealNode } from '../hooks/useViewport'
import { cx, ZOOM } from '../styles'
import { graphBounds } from '../utils'
import { BoardEdgeHost } from './BoardEdge'
import { BoardGroupHost } from './BoardGroup'
import { BoardNodeHost } from './BoardNode'

const nodeTypes = { board: BoardNodeHost, 'board-group': BoardGroupHost }
const edgeTypes = { board: BoardEdgeHost }

export interface BoardCanvasProps {
  /** Accessible name of the drawing. Defaults to the board title. */
  label?: string
  className?: string
  /** Overlays such as `<FlowBoard.Toolbar />`. */
  children?: ReactNode
}

/**
 * The drawing surface. Read-only: nodes are buttons, nothing drags or connects.
 * Wheel and one-finger touch scroll the page; drag pans with a mouse, the toolbar zooms.
 */
export function BoardCanvas({ label, className, children }: BoardCanvasProps) {
  const { index } = useBoardData()
  const { selectedNodeId } = useBoardSelection()
  const { nodes, edges } = useGraphElements(index)
  const coarse = useCoarsePointer()
  const fit = useFitBoard(index)
  const reveal = useRevealNode(index)
  const flowId = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const hostRef = useRef<HTMLDivElement>(null)
  const bounds = graphBounds(index)

  // Keep the whole drawing in view as the container resizes.
  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    let width = host.clientWidth
    const observer = new ResizeObserver(() => {
      if (host.clientWidth === width) return
      width = host.clientWidth
      fit(false)
    })
    observer.observe(host)
    return () => observer.disconnect()
  }, [fit])

  useEffect(() => {
    if (selectedNodeId) reveal(selectedNodeId)
  }, [selectedNodeId, reveal])

  if (index.data.nodes.length === 0) {
    return <p className="fb-empty">This board has no nodes yet.</p>
  }

  return (
    <div
      ref={hostRef}
      className={cx('fb-canvas', coarse && 'fb-canvas--touch', className)}
      style={{ aspectRatio: `${Math.max(bounds.width, 1)} / ${Math.max(bounds.height, 1)}` }}
      role="group"
      aria-label={label ?? index.data.title ?? 'Diagram'}
    >
      <ReactFlow
        id={flowId}
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onInit={() => fit(false)}
        minZoom={ZOOM.min}
        maxZoom={ZOOM.max}
        nodesDraggable={false}
        nodesConnectable={false}
        nodesFocusable={false}
        edgesFocusable={false}
        elementsSelectable={false}
        panOnDrag={!coarse}
        panOnScroll={false}
        zoomOnScroll={false}
        zoomOnPinch={!coarse}
        zoomOnDoubleClick={false}
        preventScrolling={false}
        deleteKeyCode={null}
        selectionKeyCode={null}
        multiSelectionKeyCode={null}
        disableKeyboardA11y
        proOptions={{ hideAttribution: true }}
      />
      {children}
    </div>
  )
}
