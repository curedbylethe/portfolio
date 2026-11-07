import type {
  BoardEdge,
  BoardIndex,
  BoardIssue,
  BoardNode,
  BoardPosition,
  BoardSize,
  BoardTrace,
  EdgeEmphasis,
  FlowBoardAction,
  FlowBoardData,
  FlowBoardState,
  TraceHighlight,
} from './types'

export const DEFAULT_NODE_SIZE: BoardSize = { width: 200, height: 56 }
const GROUP_PADDING = 30
const GRID_GAP = { x: 80, y: 80 }
// Room for text drawn outside a box: a group label above it, a node note below it.
const LABEL_SPACE = 28
const NOTE_SPACE = 56

export const nodeSize = (node: BoardNode): BoardSize => node.size ?? DEFAULT_NODE_SIZE

function byId<T extends { id: string }>(items: readonly T[] = []): Map<string, T> {
  return new Map(items.map((item) => [item.id, item]))
}

/**
 * Fallback layout for graphs without positions: a near-square grid in data order.
 * shortcut: no edge-aware placement; plug in a real layout when a generated graph needs one.
 */
export function layoutGrid(nodes: readonly BoardNode[]): Map<string, BoardPosition> {
  const columns = Math.max(1, Math.ceil(Math.sqrt(nodes.length)))
  return new Map(
    nodes.map((node, i) => [
      node.id,
      {
        x: (i % columns) * (DEFAULT_NODE_SIZE.width + GRID_GAP.x),
        y: Math.floor(i / columns) * (DEFAULT_NODE_SIZE.height + GRID_GAP.y),
      },
    ])
  )
}

function resolvePositions(nodes: readonly BoardNode[]): Map<string, BoardPosition> {
  if (nodes.every((node) => node.position)) {
    return new Map(nodes.map((node) => [node.id, node.position as BoardPosition]))
  }
  return layoutGrid(nodes)
}

export function buildIndex(data: FlowBoardData): BoardIndex {
  return {
    data,
    nodes: byId(data.nodes),
    edges: byId(data.edges),
    groups: byId(data.groups),
    traces: byId(data.traces),
    positions: resolvePositions(data.nodes),
  }
}

function duplicates(scope: string, ids: readonly string[]): BoardIssue[] {
  const seen = new Set<string>()
  const issues: BoardIssue[] = []
  for (const id of ids) {
    if (seen.has(id))
      issues.push({ code: 'duplicate-id', message: `${scope} id "${id}" is used more than once.` })
    seen.add(id)
  }
  return issues
}

/** Reports every malformed reference. Cycles and repeated trace visits are valid. */
export function validateBoard(data: FlowBoardData): BoardIssue[] {
  const nodeIds = new Set(data.nodes.map((n) => n.id))
  const edgeIds = new Set(data.edges.map((e) => e.id))
  const groupIds = new Set((data.groups ?? []).map((g) => g.id))
  const traces = data.traces ?? []

  const issues: BoardIssue[] = [
    ...duplicates(
      'Node',
      data.nodes.map((n) => n.id)
    ),
    ...duplicates(
      'Edge',
      data.edges.map((e) => e.id)
    ),
    ...duplicates(
      'Group',
      (data.groups ?? []).map((g) => g.id)
    ),
    ...duplicates(
      'Trace',
      traces.map((t) => t.id)
    ),
  ]

  for (const node of data.nodes) {
    if (node.groupId && !groupIds.has(node.groupId)) {
      issues.push({
        code: 'missing-group',
        message: `Node "${node.id}" names missing group "${node.groupId}".`,
      })
    }
  }
  for (const edge of data.edges) {
    for (const end of [edge.source, edge.target]) {
      if (!nodeIds.has(end)) {
        issues.push({
          code: 'missing-node',
          message: `Edge "${edge.id}" names missing node "${end}".`,
        })
      }
    }
  }
  const positioned = data.nodes.filter((n) => n.position).length
  if (positioned > 0 && positioned < data.nodes.length) {
    issues.push({
      code: 'mixed-positions',
      message: `${positioned} of ${data.nodes.length} nodes have positions. Position every node, or none.`,
    })
  }
  for (const trace of traces) {
    if (trace.steps.length === 0) {
      issues.push({ code: 'empty-trace', message: `Trace "${trace.id}" has no steps.` })
    }
    issues.push(
      ...duplicates(
        `Step (trace "${trace.id}")`,
        trace.steps.map((s) => s.id)
      )
    )
    for (const step of trace.steps) {
      if (!nodeIds.has(step.nodeId)) {
        issues.push({
          code: 'missing-node',
          message: `Step "${trace.id}/${step.id}" names missing node "${step.nodeId}".`,
        })
      }
      for (const edgeId of step.edgeIds ?? []) {
        if (!edgeIds.has(edgeId)) {
          issues.push({
            code: 'missing-edge',
            message: `Step "${trace.id}/${step.id}" names missing edge "${edgeId}".`,
          })
        }
      }
    }
  }
  return issues
}

/** Drops references the current data cannot resolve. Pure: never fires callbacks. */
export function sanitizeState(state: FlowBoardState, index: BoardIndex): FlowBoardState {
  const selectedNodeId =
    state.selectedNodeId && index.nodes.has(state.selectedNodeId) ? state.selectedNodeId : null
  const trace = state.activeTraceId ? index.traces.get(state.activeTraceId) : undefined
  const step =
    trace && state.activeStepId ? trace.steps.find((s) => s.id === state.activeStepId) : undefined
  return {
    selectedNodeId,
    activeTraceId: trace ? trace.id : null,
    activeStepId: step ? step.id : null,
  }
}

/**
 * State transitions. Policies:
 * - SELECT_NODE keeps the trace. It keeps the active step only when the step is on that node.
 * - SELECT_TRACE clears the active step and keeps the selected node.
 * - SELECT_STEP selects the step's node. Steps outside the active trace are ignored.
 * - RESET returns to `initial`.
 * Transitions keep the active step on the selected node. `sanitizeState` only checks that
 * references resolve, so a controlled step need not match a controlled selection.
 */
export function transition(
  state: FlowBoardState,
  action: FlowBoardAction,
  index: BoardIndex,
  initial: FlowBoardState
): FlowBoardState {
  switch (action.type) {
    case 'SELECT_NODE': {
      const nodeId = action.nodeId && index.nodes.has(action.nodeId) ? action.nodeId : null
      const step = activeStep(state, index)
      return {
        ...state,
        selectedNodeId: nodeId,
        activeStepId: step && step.nodeId === nodeId ? step.id : null,
      }
    }
    case 'SELECT_TRACE': {
      const traceId = action.traceId && index.traces.has(action.traceId) ? action.traceId : null
      return { ...state, activeTraceId: traceId, activeStepId: null }
    }
    case 'SELECT_STEP': {
      const trace = state.activeTraceId ? index.traces.get(state.activeTraceId) : undefined
      const step = trace?.steps.find((s) => s.id === action.stepId)
      if (!step) return state
      return { ...state, activeStepId: step.id, selectedNodeId: step.nodeId }
    }
    case 'RESET':
      return sanitizeState(initial, index)
  }
}

function activeStep(state: FlowBoardState, index: BoardIndex) {
  const trace = state.activeTraceId ? index.traces.get(state.activeTraceId) : undefined
  return trace?.steps.find((s) => s.id === state.activeStepId)
}

const EMPTY_HIGHLIGHT: TraceHighlight = { nodeSteps: new Map(), edgeIds: new Set() }

/** Numbers each node by the steps that visit it. Edges come only from `edgeIds`. */
export function traceHighlight(trace: BoardTrace | undefined): TraceHighlight {
  if (!trace) return EMPTY_HIGHLIGHT
  const nodeSteps = new Map<string, number[]>()
  const edgeIds = new Set<string>()
  trace.steps.forEach((step, i) => {
    nodeSteps.set(step.nodeId, [...(nodeSteps.get(step.nodeId) ?? []), i + 1])
    step.edgeIds?.forEach((id) => edgeIds.add(id))
  })
  return { nodeSteps, edgeIds }
}

/**
 * With a trace: its named edges are on and the rest dim; a trace that names none leaves edges idle.
 * Without a trace: the selected node's edges are on and the rest dim.
 */
export function edgeEmphasis(
  edge: BoardEdge,
  trace: BoardTrace | undefined,
  highlight: TraceHighlight,
  selectedNodeId: string | null
): EdgeEmphasis {
  if (trace) {
    if (highlight.edgeIds.size === 0) return 'idle'
    return highlight.edgeIds.has(edge.id) ? 'on' : 'dim'
  }
  if (!selectedNodeId) return 'idle'
  return edge.source === selectedNodeId || edge.target === selectedNodeId ? 'on' : 'dim'
}

export function polylinePath(points: readonly BoardPosition[]): string {
  return points.map((p, i) => `${i ? 'L' : 'M'}${p.x} ${p.y}`).join(' ')
}

export interface Bounds {
  x: number
  y: number
  width: number
  height: number
}

/** Point halfway along a polyline's length. */
export function routeMidpoint(points: readonly BoardPosition[]): BoardPosition {
  const lengths = points.slice(1).map((p, i) => Math.hypot(p.x - points[i].x, p.y - points[i].y))
  let remaining = lengths.reduce((a, b) => a + b, 0) / 2
  for (let i = 0; i < lengths.length; i++) {
    if (remaining <= lengths[i] && lengths[i] > 0) {
      const t = remaining / lengths[i]
      return {
        x: points[i].x + (points[i + 1].x - points[i].x) * t,
        y: points[i].y + (points[i + 1].y - points[i].y) * t,
      }
    }
    remaining -= lengths[i]
  }
  return points[0]
}

/** Box holding every node, group and hand-drawn edge route. */
export function graphBounds(index: BoardIndex): Bounds {
  const xs: number[] = []
  const ys: number[] = []
  const add = (b: Bounds) => {
    xs.push(b.x, b.x + b.width)
    ys.push(b.y, b.y + b.height)
  }
  for (const node of index.data.nodes) {
    const p = index.positions.get(node.id) as BoardPosition
    const size = nodeSize(node)
    add({ ...p, width: size.width, height: size.height + (node.note ? NOTE_SPACE : 0) })
  }
  for (const group of index.data.groups ?? []) {
    const b = groupBounds(group.id, index)
    if (b) add({ ...b, y: b.y - LABEL_SPACE, height: b.height + LABEL_SPACE })
  }
  for (const edge of index.data.edges)
    edge.points?.forEach((p) => add({ ...p, width: 0, height: 0 }))
  if (xs.length === 0) return { x: 0, y: 0, width: 0, height: 0 }
  const x = Math.min(...xs)
  const y = Math.min(...ys)
  return { x, y, width: Math.max(...xs) - x, height: Math.max(...ys) - y }
}

/** Box around a group's member nodes, with padding. Null for an empty group. */
export function groupBounds(groupId: string, index: BoardIndex): Bounds | null {
  const members = index.data.nodes.filter((n) => n.groupId === groupId)
  if (members.length === 0) return null
  const boxes = members.map((n) => {
    const p = index.positions.get(n.id) as BoardPosition
    const s = nodeSize(n)
    return { x0: p.x, y0: p.y, x1: p.x + s.width, y1: p.y + s.height }
  })
  const x = Math.min(...boxes.map((b) => b.x0)) - GROUP_PADDING
  const y = Math.min(...boxes.map((b) => b.y0)) - GROUP_PADDING
  return {
    x,
    y,
    width: Math.max(...boxes.map((b) => b.x1)) + GROUP_PADDING - x,
    height: Math.max(...boxes.map((b) => b.y1)) + GROUP_PADDING - y,
  }
}
