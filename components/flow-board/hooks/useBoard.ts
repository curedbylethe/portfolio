import { useContext, type Context } from 'react'
import {
  BoardActionsContext,
  BoardDataContext,
  BoardSelectionContext,
  BoardTraceContext,
} from '../context/contexts'

function useRequired<T>(context: Context<T | null>, name: string): T {
  const value = useContext(context)
  if (value === null) throw new Error(`${name} must be used inside <FlowBoard.Root>.`)
  return value
}

export const useBoardData = () => useRequired(BoardDataContext, 'useBoardData')
export const useBoardSelection = () => useRequired(BoardSelectionContext, 'useBoardSelection')
export const useBoardTrace = () => useRequired(BoardTraceContext, 'useBoardTrace')
export const useBoardActions = () => useRequired(BoardActionsContext, 'useBoardActions')
