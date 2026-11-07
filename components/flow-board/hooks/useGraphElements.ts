import { useMemo } from 'react'
import { MarkerType, type Edge, type Node } from '@xyflow/react'
import type { BoardIndex } from '../types'
import { groupBounds, nodeSize } from '../utils'

// React Flow shapes stay inside the adapter. Their data carries only an id; presentation
// reads the board contexts, so selection never rebuilds these arrays.
export type FlowNode = Node<{ nodeId: string }, 'board'>
export type FlowGroupNode = Node<{ groupId: string }, 'board-group'>
export type FlowEdge = Edge<{ edgeId: string }, 'board'>

const READ_ONLY = {
  draggable: false,
  selectable: false,
  connectable: false,
  focusable: false,
} as const

export const groupNodeId = (groupId: string) => `group:${groupId}`

export function toFlowElements(index: BoardIndex) {
  const groups: FlowGroupNode[] = []
  for (const group of index.data.groups ?? []) {
    const b = groupBounds(group.id, index)
    if (!b) continue
    groups.push({
      ...READ_ONLY,
      id: groupNodeId(group.id),
      type: 'board-group',
      position: { x: b.x, y: b.y },
      width: b.width,
      height: b.height,
      zIndex: 0,
      data: { groupId: group.id },
    })
  }

  const nodes: FlowNode[] = index.data.nodes.map((node) => {
    const size = nodeSize(node)
    return {
      ...READ_ONLY,
      id: node.id,
      type: 'board',
      position: index.positions.get(node.id) ?? { x: 0, y: 0 },
      width: size.width,
      height: size.height,
      zIndex: 1,
      data: { nodeId: node.id },
    }
  })

  const edges: FlowEdge[] = index.data.edges.map((edge) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    type: 'board',
    selectable: false,
    focusable: false,
    markerEnd:
      edge.directed === false ? undefined : { type: MarkerType.ArrowClosed, color: 'var(--text)' },
    data: { edgeId: edge.id },
  }))

  return { nodes: [...groups, ...nodes], edges }
}

export function useGraphElements(index: BoardIndex) {
  return useMemo(() => toFlowElements(index), [index])
}
