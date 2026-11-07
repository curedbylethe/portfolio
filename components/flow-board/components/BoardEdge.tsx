'use client'

import { BaseEdge, type EdgeProps } from '@xyflow/react'
import { useBoardData, useBoardSelection, useBoardTrace } from '../hooks/useBoard'
import type { FlowEdge } from '../hooks/useGraphElements'
import { edgeClass } from '../styles'
import type { BoardEdgeRendererProps } from '../types'
import { edgeEmphasis, polylinePath, routeMidpoint } from '../utils'

/** Generic relationship line. Dashed when its evidence is inferred or its kind says so. */
export function DefaultBoardEdge({
  edge,
  kind,
  path,
  labelPosition,
  emphasis,
  markerEnd,
}: BoardEdgeRendererProps) {
  const dashed =
    kind?.stroke === 'dashed' || edge.evidence?.some((e) => e.status !== 'documented') === true
  return (
    <>
      <BaseEdge
        path={path}
        markerEnd={markerEnd}
        className={edgeClass(emphasis, dashed)}
        interactionWidth={0}
      />
      {edge.label && (
        <text
          className="fb-edge-label"
          x={labelPosition.x}
          y={labelPosition.y}
          textAnchor="middle"
          dy="-0.4em"
        >
          {edge.label}
        </text>
      )}
    </>
  )
}

/** React Flow edge type. Draws the hand-drawn route when given, a straight line otherwise. */
export function BoardEdgeHost({
  data,
  sourceX,
  sourceY,
  targetX,
  targetY,
  markerEnd,
}: EdgeProps<FlowEdge>) {
  const { index, edgeRenderers } = useBoardData()
  const { selectedNodeId } = useBoardSelection()
  const { activeTrace, highlight } = useBoardTrace()

  const edge = data && index.edges.get(data.edgeId)
  if (!edge) return null
  const points = edge.points ?? [
    { x: sourceX, y: sourceY },
    { x: targetX, y: targetY },
  ]
  const Renderer = edgeRenderers[edge.kind] ?? DefaultBoardEdge

  return (
    <Renderer
      edge={edge}
      kind={index.data.edgeKinds?.[edge.kind]}
      path={polylinePath(points)}
      labelPosition={routeMidpoint(points)}
      emphasis={edgeEmphasis(edge, activeTrace, highlight, selectedNodeId)}
      markerEnd={markerEnd}
    />
  )
}
