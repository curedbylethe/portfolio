'use client'

import { useReactFlow } from '@xyflow/react'
import { useBoardActions, useBoardData } from '../hooks/useBoard'
import { useFitBoard } from '../hooks/useViewport'
import { motionDuration } from '../styles'

/** Viewport controls. "Fit" changes only the view; "Reset" also restores the initial selection and trace. */
export function BoardToolbar({ label = 'Diagram view' }: { label?: string }) {
  const { zoomIn, zoomOut } = useReactFlow()
  const { index } = useBoardData()
  const { reset } = useBoardActions()
  const fit = useFitBoard(index)

  return (
    <div className="fb-toolbar" role="toolbar" aria-label={label}>
      <button
        type="button"
        onClick={() => void zoomIn({ duration: motionDuration() })}
        aria-label="Zoom in"
      >
        +
      </button>
      <button
        type="button"
        onClick={() => void zoomOut({ duration: motionDuration() })}
        aria-label="Zoom out"
      >
        −
      </button>
      <button type="button" onClick={() => fit()} aria-label="Fit the whole diagram">
        Fit
      </button>
      <button type="button" onClick={reset} aria-label="Reset view and selection">
        Reset
      </button>
    </div>
  )
}
