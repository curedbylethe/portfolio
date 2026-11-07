import { createContext } from 'react'
import type {
  BoardIndex,
  BoardTrace,
  EdgeRenderers,
  FlowBoardActions,
  NodeRenderers,
  TraceHighlight,
} from '../types'

/** Immutable graph data, lookup indexes and renderer registries. Changes only with `data`. */
export interface BoardDataValue {
  index: BoardIndex
  nodeRenderers: NodeRenderers
  edgeRenderers: EdgeRenderers
}

export interface BoardSelectionValue {
  selectedNodeId: string | null
  activeStepId: string | null
}

export interface BoardTraceValue {
  activeTraceId: string | null
  activeTrace: BoardTrace | undefined
  highlight: TraceHighlight
}

// One context per slice, so a component that reads only actions never re-renders on selection.
export const BoardDataContext = createContext<BoardDataValue | null>(null)
export const BoardSelectionContext = createContext<BoardSelectionValue | null>(null)
export const BoardTraceContext = createContext<BoardTraceValue | null>(null)
export const BoardActionsContext = createContext<FlowBoardActions | null>(null)
