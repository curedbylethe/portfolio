'use client'

import '@xyflow/react/dist/base.css'
import { ReactFlowProvider } from '@xyflow/react'
import { BoardCanvas } from './components/BoardCanvas'
import { BoardLayout, BoardSidebar } from './components/BoardLayout'
import { BoardLegend } from './components/BoardLegend'
import { BoardToolbar } from './components/BoardToolbar'
import { NodeInspector } from './components/NodeInspector'
import { TracePicker } from './components/TracePicker'
import { TraceSteps } from './components/TraceSteps'
import { FlowBoardProvider } from './context/FlowBoardProvider'
import { cx } from './styles'
import type { FlowBoardRootProps } from './types'

/** One board instance: its own React Flow store and its own semantic state. */
function Root({ className, children, ...props }: FlowBoardRootProps) {
  return (
    <ReactFlowProvider>
      <FlowBoardProvider {...props}>
        <div className={cx('fb', className)}>{children}</div>
      </FlowBoardProvider>
    </ReactFlowProvider>
  )
}

export const FlowBoard = {
  Root,
  Layout: BoardLayout,
  Canvas: BoardCanvas,
  Sidebar: BoardSidebar,
  Toolbar: BoardToolbar,
  Legend: BoardLegend,
  TracePicker,
  TraceSteps,
  NodeInspector,
}
