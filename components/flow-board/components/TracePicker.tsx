'use client'

import { useBoardActions, useBoardData, useBoardTrace } from '../hooks/useBoard'
import { cx } from '../styles'

/** One toggle button per trace. Renders nothing for a board without traces. */
export function TracePicker({
  label = 'Traces',
  className,
}: {
  label?: string
  className?: string
}) {
  const { index } = useBoardData()
  const { activeTraceId } = useBoardTrace()
  const { selectTrace } = useBoardActions()
  const traces = index.data.traces ?? []
  if (traces.length === 0) return null

  return (
    <div className={cx('fb-picker', className)} role="group" aria-label={label}>
      {traces.map((trace) => (
        <button
          key={trace.id}
          type="button"
          className="fb-picker-button"
          aria-pressed={trace.id === activeTraceId}
          onClick={() => selectTrace(trace.id)}
          title={trace.description}
        >
          {trace.trigger &&
            (trace.triggerKind === 'event' ? (
              <span className="fb-prov fb-prov--sm">{trace.trigger}</span>
            ) : (
              <kbd>{trace.trigger}</kbd>
            ))}
          <span>{trace.label}</span>
        </button>
      ))}
    </div>
  )
}
