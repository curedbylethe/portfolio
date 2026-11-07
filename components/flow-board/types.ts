import type { ComponentType, ReactNode } from 'react'

/** Inline content: a string or React elements such as `<code>` and `<kbd>`. */
export type RichText = ReactNode

export interface BoardSource {
  label: string
  url?: string
}

export interface BoardPosition {
  x: number
  y: number
}

export interface BoardSize {
  width: number
  height: number
}

export interface BoardKind {
  label: string
  description?: string
  /** Outline style, so kinds differ by more than colour. Defaults to `solid`. */
  stroke?: 'solid' | 'dashed'
}

export type EvidenceStatus = 'documented' | 'inferred' | 'illustrative'

export interface BoardEvidence {
  status: EvidenceStatus
  /** Link text, for example a file name. */
  label?: string
  url?: string
  description?: string
}

export interface InspectorSection {
  id?: string
  label: string
  content: RichText
}

export interface BoardNode {
  id: string
  kind: string
  label: string
  subtitle?: string
  /** Inspector heading line. Defaults to "<kind label> · <subtitle>". */
  eyebrow?: string
  /** Short annotation drawn under the node on the map. */
  note?: string

  /** Top-left corner in graph coordinates. Give every node a position, or none. */
  position?: BoardPosition
  size?: BoardSize
  groupId?: string

  details?: InspectorSection[]
  evidence?: BoardEvidence[]
}

export interface BoardEdge {
  id: string
  source: string
  target: string

  kind: string
  label?: string
  /** Defaults to true. */
  directed?: boolean
  /** Hand-drawn route in graph coordinates, first point to last. Straight line when absent. */
  points?: BoardPosition[]

  evidence?: BoardEvidence[]
}

export interface BoardGroup {
  id: string
  label: string
  description?: string
}

export interface BoardTraceStep {
  id: string
  nodeId: string

  title?: string
  description: RichText

  /** Graph edges this step travels along. Edges are never inferred from step order. */
  edgeIds?: string[]
  evidence?: BoardEvidence[]
}

export interface BoardTraceNote {
  label: string
  content: RichText
}

export interface BoardTrace {
  id: string
  /** Short name for the picker. */
  label: string
  /** Heading above the steps. Defaults to `label`. */
  title?: string
  description?: string
  /** What starts the behaviour: a key, a command, an event. */
  trigger?: string
  /** `input` draws the trigger as a key cap, `event` as a tag. Defaults to `input`. */
  triggerKind?: 'input' | 'event'

  steps: BoardTraceStep[]

  constraint?: BoardTraceNote
}

export interface FlowBoardData {
  id: string
  title?: string
  description?: string

  source?: BoardSource

  nodes: BoardNode[]
  edges: BoardEdge[]
  groups?: BoardGroup[]
  traces?: BoardTrace[]

  /** Display names for node and edge kinds, used by the inspector and legend. */
  nodeKinds?: Record<string, BoardKind>
  edgeKinds?: Record<string, BoardKind>
}

// ---------- state ----------

export interface FlowBoardState {
  selectedNodeId: string | null
  activeTraceId: string | null
  activeStepId: string | null
}

export type FlowBoardAction =
  | { type: 'SELECT_NODE'; nodeId: string | null }
  | { type: 'SELECT_TRACE'; traceId: string | null }
  | { type: 'SELECT_STEP'; stepId: string }
  | { type: 'RESET' }

export interface FlowBoardActions {
  selectNode: (nodeId: string | null) => void
  selectTrace: (traceId: string | null) => void
  selectStep: (stepId: string) => void
  clearSelection: () => void
  /** Restores the initial semantic state and the initial viewport. */
  reset: () => void
}

// ---------- derived ----------

export interface BoardIndex {
  data: FlowBoardData
  nodes: ReadonlyMap<string, BoardNode>
  edges: ReadonlyMap<string, BoardEdge>
  groups: ReadonlyMap<string, BoardGroup>
  traces: ReadonlyMap<string, BoardTrace>
  /** Node positions, supplied or computed by the fallback layout. */
  positions: ReadonlyMap<string, BoardPosition>
}

export type EdgeEmphasis = 'on' | 'dim' | 'idle'

export interface TraceHighlight {
  /** 1-based step numbers per node. A node visited twice has two numbers. */
  nodeSteps: ReadonlyMap<string, readonly number[]>
  /** Edges named by the trace's steps. */
  edgeIds: ReadonlySet<string>
}

export interface BoardIssue {
  code:
    | 'duplicate-id'
    | 'missing-node'
    | 'missing-edge'
    | 'missing-group'
    | 'mixed-positions'
    | 'empty-trace'
  message: string
}

// ---------- renderers ----------

export interface BoardNodeRendererProps {
  node: BoardNode
  kind: BoardKind | undefined
  selected: boolean
  /** The node is outside the active trace. */
  dimmed: boolean
  /** Step numbers in the active trace. */
  steps: readonly number[]
  onSelect: () => void
}

export interface BoardEdgeRendererProps {
  edge: BoardEdge
  kind: BoardKind | undefined
  /** SVG path data in graph coordinates. */
  path: string
  /** Midpoint of the route, for a label. */
  labelPosition: BoardPosition
  emphasis: EdgeEmphasis
  /** URL reference for the arrow marker, when directed. */
  markerEnd: string | undefined
}

export type NodeRenderers = Record<string, ComponentType<BoardNodeRendererProps>>
export type EdgeRenderers = Record<string, ComponentType<BoardEdgeRendererProps>>

// ---------- root ----------

export interface FlowBoardRootProps {
  data: FlowBoardData
  children?: ReactNode
  className?: string

  /**
   * A controlled value (anything but `undefined`) wins over the default and the
   * internal state. Pass `null` to control "nothing selected".
   */
  selectedNodeId?: string | null
  defaultSelectedNodeId?: string | null
  onSelectedNodeChange?: (nodeId: string | null) => void

  activeTraceId?: string | null
  defaultTraceId?: string | null
  onActiveTraceChange?: (traceId: string | null) => void

  activeStepId?: string | null
  defaultStepId?: string | null
  onActiveStepChange?: (stepId: string | null) => void

  nodeRenderers?: NodeRenderers
  edgeRenderers?: EdgeRenderers
}
