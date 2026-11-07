'use client'

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { useFitBoard } from '../hooks/useViewport'
import type {
  FlowBoardAction,
  FlowBoardActions,
  FlowBoardRootProps,
  FlowBoardState,
} from '../types'
import { buildIndex, sanitizeState, traceHighlight, transition, validateBoard } from '../utils'
import {
  BoardActionsContext,
  BoardDataContext,
  BoardSelectionContext,
  BoardTraceContext,
  type BoardDataValue,
} from './contexts'

type ProviderProps = Omit<FlowBoardRootProps, 'className'> & { children?: ReactNode }

const pick = <T,>(controlled: T | undefined, internal: T): T =>
  controlled !== undefined ? controlled : internal

const NO_RENDERERS = {}

/**
 * Owns one board's semantic state. Each slice is controlled when its prop is not `undefined`;
 * otherwise it lives in internal state seeded from its `default*` prop on first render.
 */
export function FlowBoardProvider(props: ProviderProps) {
  const { data, children, nodeRenderers = NO_RENDERERS, edgeRenderers = NO_RENDERERS } = props
  const index = useMemo(() => buildIndex(data), [data])

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') return
    const issues = validateBoard(data)
    if (issues.length)
      console.error(`FlowBoard "${data.id}":\n${issues.map((i) => `  ${i.message}`).join('\n')}`)
  }, [data])

  const [initial] = useState<FlowBoardState>(() => ({
    selectedNodeId: props.defaultSelectedNodeId ?? null,
    activeTraceId: props.defaultTraceId ?? null,
    activeStepId: props.defaultStepId ?? null,
  }))
  const [internal, setInternal] = useState<FlowBoardState>(initial)

  const selectedNodeId = pick(props.selectedNodeId, internal.selectedNodeId)
  const activeTraceId = pick(props.activeTraceId, internal.activeTraceId)
  const activeStepId = pick(props.activeStepId, internal.activeStepId)
  // Derived, never written back: values the data cannot resolve read as null.
  const state = useMemo(
    () => sanitizeState({ selectedNodeId, activeTraceId, activeStepId }, index),
    [index, selectedNodeId, activeTraceId, activeStepId]
  )

  const latest = useRef({ state, index, props })
  useLayoutEffect(() => {
    latest.current = { state, index, props }
  })

  const fitBoard = useFitBoard(index)

  const dispatch = useCallback(
    (action: FlowBoardAction) => {
      const { state: current, index: idx, props: p } = latest.current
      const next = transition(current, action, idx, initial)
      // Keep the ref ahead of the re-render, so two actions in one event compose.
      latest.current = { ...latest.current, state: next }

      setInternal((prev) => ({
        selectedNodeId: p.selectedNodeId === undefined ? next.selectedNodeId : prev.selectedNodeId,
        activeTraceId: p.activeTraceId === undefined ? next.activeTraceId : prev.activeTraceId,
        activeStepId: p.activeStepId === undefined ? next.activeStepId : prev.activeStepId,
      }))
      if (next.selectedNodeId !== current.selectedNodeId)
        p.onSelectedNodeChange?.(next.selectedNodeId)
      if (next.activeTraceId !== current.activeTraceId) p.onActiveTraceChange?.(next.activeTraceId)
      if (next.activeStepId !== current.activeStepId) p.onActiveStepChange?.(next.activeStepId)
    },
    [initial]
  )

  const actions = useMemo<FlowBoardActions>(
    () => ({
      selectNode: (nodeId) => dispatch({ type: 'SELECT_NODE', nodeId }),
      selectTrace: (traceId) => dispatch({ type: 'SELECT_TRACE', traceId }),
      selectStep: (stepId) => dispatch({ type: 'SELECT_STEP', stepId }),
      clearSelection: () => dispatch({ type: 'SELECT_NODE', nodeId: null }),
      reset: () => {
        dispatch({ type: 'RESET' })
        fitBoard()
      },
    }),
    [dispatch, fitBoard]
  )

  const dataValue = useMemo<BoardDataValue>(
    () => ({ index, nodeRenderers, edgeRenderers }),
    [index, nodeRenderers, edgeRenderers]
  )
  const selectionValue = useMemo(
    () => ({ selectedNodeId: state.selectedNodeId, activeStepId: state.activeStepId }),
    [state.selectedNodeId, state.activeStepId]
  )
  const traceValue = useMemo(() => {
    const activeTrace = state.activeTraceId ? index.traces.get(state.activeTraceId) : undefined
    return {
      activeTraceId: state.activeTraceId,
      activeTrace,
      highlight: traceHighlight(activeTrace),
    }
  }, [index, state.activeTraceId])

  return (
    <BoardDataContext.Provider value={dataValue}>
      <BoardActionsContext.Provider value={actions}>
        <BoardTraceContext.Provider value={traceValue}>
          <BoardSelectionContext.Provider value={selectionValue}>
            {children}
          </BoardSelectionContext.Provider>
        </BoardTraceContext.Provider>
      </BoardActionsContext.Provider>
    </BoardDataContext.Provider>
  )
}
